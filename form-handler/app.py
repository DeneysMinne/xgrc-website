"""
XGRC Website — demo request form handler.
Uses Microsoft Graph API (client-credentials) to send mail.
Saves every submission to /var/log/xgrc-forms/submissions.log regardless of mail status.

Required env vars (add to /etc/xgrc/forms.env):
  MS_TENANT_ID      81474a41-...
  MS_CLIENT_ID      c0d0bbf1-...
  MS_CLIENT_SECRET  <secret>
  MS_SENDER         info@xgrcsoftware.com
  FORM_TO           comma-separated list, e.g. deneysm@strategix.co.za,revalisham@strategix.co.za

Optional (server-side GA4 lead tracking via Measurement Protocol):
  GA4_MEASUREMENT_ID  G-XXXXXXXXXX
  GA4_MP_API_SECRET   <secret>   (GA4 Admin > Data Streams > Measurement Protocol API secrets)

Optional (creates a Lead in XRM under Strategix's own tenant, client_id=9, for
every submission — ENH-086):
  XRM_LEAD_API_URL   http://127.0.0.1:5001/api/integrations/website-lead
  XRM_LEAD_API_KEY   <secret, matches XRM's WEBSITE_LEAD_API_KEY>

Optional (server-side Google Ads conversion reporting via the Data Manager
API, for demo/book-a-meeting submissions that carry a gclid — bypasses the
client-side gtag.js pixel, which has been broken since before this campaign
started; see project_xgrc_google_ads_2026_08 in Claude memory):
  GOOGLE_ADS_DM_CLIENT_ID              same OAuth client as scripts/google-ads-api.sh
  GOOGLE_ADS_DM_CLIENT_SECRET          same OAuth client as scripts/google-ads-api.sh
  GOOGLE_ADS_DM_REFRESH_TOKEN          separate token, scoped to .../auth/datamanager only
  GOOGLE_ADS_DM_CONVERSION_ACTION_ID   numeric id of the UPLOAD_CLICKS conversion action
"""

import html
import json
import logging
import os
import random
import sys
import time
from datetime import datetime, timezone

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

LOG_FILE = os.environ.get("FORM_LOG", "/var/log/xgrc-forms/submissions.log")
XRM_LEAD_API_URL = os.environ.get("XRM_LEAD_API_URL", "http://127.0.0.1:5001/api/integrations/website-lead")
XRM_LEAD_API_KEY = os.environ.get("XRM_LEAD_API_KEY", "")
# Known fraud domains and phone numbers, one per line ("#" comments allowed).
# Re-read on every submission, so adding an entry needs no restart.
BLOCKLIST_FILE = os.environ.get(
    "FORM_BLOCKLIST", os.path.join(os.path.dirname(os.path.abspath(__file__)), "blocklist.txt"))

logging.basicConfig(stream=sys.stdout, level=logging.INFO,
                    format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=[
    "https://xgrcwebsite.nucleusapps.online",
    "https://xgrcsoftware.com",
    "http://localhost:4321",
])


def _log_submission(data: dict) -> None:
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    entry = {
        "ts": datetime.now(timezone.utc).isoformat(),
        **data,
    }
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(entry) + "\n")
    log.info("Submission logged: %s <%s>", data.get("firstName"), data.get("email"))


REPEAT_WINDOW_SECONDS = 24 * 3600


def _submission_key(data: dict) -> tuple:
    """Same person asking for the same thing: email + category + download."""
    return (
        (data.get("email") or "").strip().lower(),
        _xrm_lead_category(data),
        (data.get("_download_url") or "").strip(),
    )


def _is_repeat(data: dict) -> bool:
    """True if the same submission (see _submission_key) was logged in the
    last 24 hours. Call BEFORE _log_submission. People were resubmitting the
    demo form because it never visibly changed after a successful submit,
    which created up to three identical XRM leads per person. Reads only the
    tail of the log; any read problem means "not a repeat", so a real lead is
    never dropped."""
    key = _submission_key(data)
    if not key[0]:
        return False
    cutoff = time.time() - REPEAT_WINDOW_SECONDS
    try:
        with open(LOG_FILE, "rb") as f:
            f.seek(0, os.SEEK_END)
            f.seek(max(0, f.tell() - 512 * 1024))
            lines = f.read().decode("utf-8", "replace").splitlines()
    except OSError:
        return False
    for line in reversed(lines):
        try:
            entry = json.loads(line)
            ts = datetime.fromisoformat(entry["ts"]).timestamp()
        except (ValueError, KeyError, TypeError):
            continue
        if ts < cutoff:
            break
        if _submission_key(entry) == key:
            return True
    return False


def _client_meta(req) -> dict:
    """Who actually sent the request. The site sits behind a Cloudflare tunnel,
    so remote_addr is always 127.0.0.1; the visitor's IP and country arrive in
    Cloudflare's headers. Recorded on every submission (not only spam) so a
    suspicious lead can be traced afterwards. Kept in the internal log and
    notification email only, never sent to XRM."""
    return {
        "_ip": req.headers.get("CF-Connecting-IP") or req.headers.get("X-Real-IP") or req.remote_addr or "",
        "_ip_country": req.headers.get("CF-IPCountry") or "",
        "_user_agent": (req.headers.get("User-Agent") or "")[:300],
    }


def _norm_phone(phone: str) -> str:
    """Last 9 digits, so +27 79 720 7472 and 079 720 7472 compare equal."""
    digits = "".join(ch for ch in (phone or "") if ch.isdigit())
    return digits[-9:] if len(digits) >= 9 else ""


def _email_domain(data: dict) -> str:
    return (data.get("email") or "").strip().lower().rsplit("@", 1)[-1]


def _blocked_reason(data: dict) -> str:
    """Return a reason if the email domain or phone is on the blocklist, else ''.
    Any read problem means "not blocked", so a real lead is never lost."""
    try:
        with open(BLOCKLIST_FILE, encoding="utf-8") as f:
            entries = [ln.split("#", 1)[0].strip().lower() for ln in f]
    except OSError:
        return ""
    domain = _email_domain(data)
    phone = _norm_phone(data.get("phone") or "")
    for entry in filter(None, entries):
        if entry.replace("+", "").replace(" ", "").isdigit():
            if phone and _norm_phone(entry) == phone:
                return f"blocked phone {entry}"
        elif domain == entry or domain.endswith("." + entry):
            return f"blocked domain {entry}"
    return ""


def _email_domain_problem(domain: str) -> str:
    """Return a reason if the email domain cannot receive mail, else ''. Uses
    Cloudflare DNS-over-HTTPS (no extra dependency). Any lookup failure means
    "no problem", so a real lead is never flagged because DNS was slow."""
    if not domain or "." not in domain:
        return ""
    try:
        resp = requests.get(
            "https://cloudflare-dns.com/dns-query",
            params={"name": domain, "type": "MX"},
            headers={"Accept": "application/dns-json"},
            timeout=2,
        )
        result = resp.json()
    except Exception as exc:
        log.warning("MX lookup failed for %s: %s", domain, exc)
        return ""
    if result.get("Status") == 3:
        return f"email domain {domain} does not exist"
    if result.get("Status") == 0 and not any(a.get("type") == 15 for a in result.get("Answer") or []):
        return f"email domain {domain} has no mail servers, so replies cannot be delivered"
    return ""


def _seen_before(data: dict) -> str:
    """Date of the first earlier submission (older than the 24-hour repeat
    window) with the same email address or phone number, else ''. Catches a
    lead resubmitting days or weeks later, which _is_repeat deliberately does
    not. Note: the log only goes back to the server move of 7 October 2026."""
    email = (data.get("email") or "").strip().lower()
    phone = _norm_phone(data.get("phone") or "")
    if not email and not phone:
        return ""
    cutoff = time.time() - REPEAT_WINDOW_SECONDS
    try:
        with open(LOG_FILE, "rb") as f:
            f.seek(0, os.SEEK_END)
            f.seek(max(0, f.tell() - 5 * 1024 * 1024))
            lines = f.read().decode("utf-8", "replace").splitlines()
    except OSError:
        return ""
    for line in lines:
        try:
            entry = json.loads(line)
            ts = datetime.fromisoformat(entry["ts"]).timestamp()
        except (ValueError, KeyError, TypeError):
            continue
        if ts >= cutoff:
            break
        same_email = email and (entry.get("email") or "").strip().lower() == email
        same_phone = phone and _norm_phone(entry.get("phone") or "") == phone
        if same_email or same_phone:
            return entry["ts"][:10]
    return ""


def _verification_flags(data: dict) -> list:
    """Reasons a human should verify this lead before engaging. Flagged leads
    still reach XRM and the inbox (the SOP says every enquiry becomes a lead),
    but are clearly marked so nobody quotes or sends documents first."""
    flags = []
    seen = _seen_before(data)
    if seen:
        flags.append(f"Same email or phone already submitted on {seen}")
    problem = _email_domain_problem(_email_domain(data))
    if problem:
        flags.append(problem[0].upper() + problem[1:])
    return flags


def _source_summary(data: dict) -> list:
    """(label, value) pairs saying where this lead came from, from the
    attribution fields every form sends (window.xgrcAttribution() in
    Base.astro) plus the "How did you hear about us?" answer."""
    rows = []
    heard = (data.get("heardAbout") or "").strip()
    if heard:
        rows.append(("Heard about us", heard))
    if data.get("_gclid") or data.get("_gbraid") or data.get("_wbraid"):
        rows.append(("Google Ads", "Yes, arrived from an ad click"))
    utm = " / ".join(v for v in (data.get("_utm_source"), data.get("_utm_medium"), data.get("_utm_campaign")) if v)
    if utm:
        rows.append(("Campaign", utm))
    if data.get("_first_referrer"):
        rows.append(("First came from", data["_first_referrer"]))
    if data.get("_landing_page"):
        rows.append(("First page seen", data["_landing_page"]))
    if data.get("_source_page"):
        rows.append(("Submitted on", data["_source_page"]))
    return rows


def _graph_token() -> str:
    tenant_id     = os.environ["MS_TENANT_ID"]
    client_id     = os.environ["MS_CLIENT_ID"]
    client_secret = os.environ["MS_CLIENT_SECRET"]
    resp = requests.post(
        f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token",
        data={
            "grant_type":    "client_credentials",
            "client_id":     client_id,
            "client_secret": client_secret,
            "scope":         "https://graph.microsoft.com/.default",
        },
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]


def _send_email(data: dict) -> None:
    sender  = os.environ.get("MS_SENDER", "info@xgrcsoftware.com")
    to_raw  = os.environ.get("FORM_TO", "deneysm@strategix.co.za")
    to_list = [addr.strip() for addr in to_raw.split(",") if addr.strip()]

    if not os.environ.get("MS_TENANT_ID"):
        log.warning("Graph API not configured — submission saved to log only.")
        return

    name         = f"{data.get('firstName', '')} {data.get('lastName', '')}".strip()
    company      = data.get("company", "—")
    phone        = data.get("phone", "—")
    message      = data.get("message", "—")
    email        = data.get("email", "")
    download_url = data.get("_download_url", "")
    category     = (data.get("_category") or "").strip()
    repeat       = bool(data.get("_repeat"))
    source_rows  = "".join(
        f'<tr><td style="padding:8px 0;color:#7a9ab5;vertical-align:top">{html.escape(label)}</td>'
        f'<td>{html.escape(str(value))}</td></tr>'
        for label, value in _source_summary(data)
    )

    if download_url:
        download_block = f"""
        <tr><td colspan="2" style="padding-top:20px">
          <div style="background:#0a1729;border:1px solid #1e3a5f;border-radius:8px;padding:16px 20px">
            <p style="margin:0 0 10px;color:#30e2f4;font-weight:600">Requested download</p>
            <a href="{download_url}" style="color:#30e2f4;word-break:break-all">{download_url}</a>
          </div>
        </td></tr>"""
        subject_prefix = "Checklist request"
    elif category:
        download_block = ""
        subject_prefix = category
    else:
        download_block = ""
        subject_prefix = "Demo request"
    if repeat:
        subject_prefix = f"Repeat submission ({subject_prefix})"
    flags = data.get("_verify") or []
    if flags:
        subject_prefix = f"VERIFY FIRST: {subject_prefix}"
    verify_block = ""
    if flags:
        items = "".join(f"<li>{html.escape(f)}</li>" for f in flags)
        verify_block = (
            '<div style="margin:0 0 20px;padding:14px 18px;border:1px solid #f4c430;border-radius:8px;color:#f4c430">'
            '<strong>Verify before engaging.</strong> Phone the company on its own published number before '
            f'sending a quote, pricing or documents.<ul style="margin:8px 0 0 18px;padding:0">{items}</ul></div>'
        )
    ip = data.get("_ip") or ""
    if ip:
        where = f"{ip} ({data['_ip_country']})" if data.get("_ip_country") else ip
        source_rows += (
            '<tr><td style="padding:8px 0;color:#7a9ab5;vertical-align:top">Submitted from</td>'
            f'<td>{html.escape(where)}</td></tr>'
        )

    body_html = f"""
    <div style="font-family:sans-serif;max-width:600px;background:#060f1c;color:#c8d8e8;padding:32px;border-radius:12px">
      <h2 style="color:#30e2f4;margin-top:0">{subject_prefix} — XGRC Website</h2>
      {verify_block}
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px 0;color:#7a9ab5;width:120px">Name</td><td><strong style="color:#e8f2ff">{name}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#7a9ab5">Email</td><td><a href="mailto:{email}" style="color:#30e2f4">{email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#7a9ab5">Company</td><td>{company}</td></tr>
        <tr><td style="padding:8px 0;color:#7a9ab5">Phone</td><td>{phone}</td></tr>
        <tr><td style="padding:8px 0;color:#7a9ab5;vertical-align:top">Message</td><td>{message}</td></tr>
        {source_rows}
        {download_block}
      </table>
      {'<p style="margin-top:20px;color:#f4c430">Same person, same request within 24 hours. No new XRM lead was created; the first one is already there.</p>' if repeat else ''}
      <p style="margin-top:24px;font-size:12px;color:#4a6a8a">
        Submitted {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')} via xgrcwebsite.nucleusapps.online
      </p>
    </div>
    """

    token = _graph_token()
    payload = {
        "message": {
            "subject": f"{subject_prefix}: {name} — {company}",
            "body": {"contentType": "HTML", "content": body_html},
            "toRecipients": [{"emailAddress": {"address": addr}} for addr in to_list],
            "replyTo":      [{"emailAddress": {"address": email}}],
            "from":         {"emailAddress": {"address": sender, "name": "XGRC Website"}},
        },
        "saveToSentItems": False,
    }
    resp = requests.post(
        f"https://graph.microsoft.com/v1.0/users/{sender}/sendMail",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json=payload,
        timeout=15,
    )
    resp.raise_for_status()
    log.info("Email sent via Graph API to %s for %s", ", ".join(to_list), email)


def _send_ga4_event(data: dict) -> None:
    """Fire a server-side GA4 'generate_lead' event via the Measurement Protocol.

    Server-side confirmation means a lead is only counted once it actually
    reaches the backend, immune to ad-blockers that drop the client-side tag.
    Entirely best-effort: any failure is logged and swallowed so it can never
    affect the form response.
    """
    mid = os.environ.get("GA4_MEASUREMENT_ID")
    secret = os.environ.get("GA4_MP_API_SECRET")
    if not mid or not secret:
        return  # GA4 not configured — skip silently.

    if data.get("_download_url"):
        lead_type = "checklist"
    elif (data.get("_category") or "").strip().lower().startswith("partner"):
        lead_type = "partner"
    else:
        lead_type = "demo"

    # Prefer the browser's GA client_id (sent by the form) so the conversion
    # ties to the real session/source; fall back to a synthetic id otherwise.
    client_id = (data.get("_ga_client_id") or "").strip() or f"{random.randint(10**9, 10**10)}.{int(time.time())}"

    payload = {
        "client_id": client_id,
        "events": [{
            "name": "generate_lead",
            "params": {
                "lead_type": lead_type,
                "engagement_time_msec": "1",
            },
        }],
    }
    try:
        requests.post(
            "https://www.google-analytics.com/mp/collect",
            params={"measurement_id": mid, "api_secret": secret},
            json=payload,
            timeout=5,
        )
        log.info("GA4 generate_lead sent (type=%s)", lead_type)
    except Exception as exc:
        log.warning("GA4 MP event failed: %s", exc)


def _send_ads_conversion(data: dict) -> None:
    """Report a Google Ads conversion server-side via the Data Manager API,
    keyed off the gclid the form captured from the landing URL (see the
    cookie-capture script in Base.astro). Entirely independent of the
    client-side gtag.js pixel, which has been silently dropping every
    browser hit since before this campaign started — this is the real
    measurement path while that stays broken, not a duplicate of it.

    Only fires for demo.astro / book-a-meeting.astro submissions (the two
    forms that carry a gclid) — matches _xrm_lead_category's category
    convention below. Best-effort, same pattern as _send_ga4_event: any
    failure is logged and swallowed, never affects the form response.
    """
    gclid = (data.get("_gclid") or "").strip()
    if not gclid:
        return  # no ad click on record for this lead — nothing to report.

    category = (data.get("_category") or "").strip() or "Demo request"
    if category not in ("Demo request", "Meeting request"):
        return

    client_id = os.environ.get("GOOGLE_ADS_DM_CLIENT_ID")
    client_secret = os.environ.get("GOOGLE_ADS_DM_CLIENT_SECRET")
    refresh_token = os.environ.get("GOOGLE_ADS_DM_REFRESH_TOKEN")
    conversion_action_id = os.environ.get("GOOGLE_ADS_DM_CONVERSION_ACTION_ID")
    if not all([client_id, client_secret, refresh_token, conversion_action_id]):
        return  # Data Manager API not configured yet — skip silently.

    try:
        token_resp = requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": client_id,
                "client_secret": client_secret,
                "refresh_token": refresh_token,
                "grant_type": "refresh_token",
            },
            timeout=5,
        )
        access_token = token_resp.json().get("access_token")
        if not access_token:
            log.error("Ads conversion upload: token refresh failed: %s", token_resp.text)
            return

        body = {
            "destinations": [{
                "operatingAccount": {"accountType": "GOOGLE_ADS", "accountId": "9599176549"},
                "loginAccount": {"accountType": "GOOGLE_ADS", "accountId": "8918834747"},
                "productDestinationId": conversion_action_id,
            }],
            "encoding": "HEX",
            "events": [{
                "eventTimestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00"),
                "eventSource": "WEB",
                "adIdentifiers": {"gclid": gclid},
            }],
        }
        resp = requests.post(
            "https://datamanager.googleapis.com/v1/events:ingest",
            headers={"Authorization": f"Bearer {access_token}"},
            json=body,
            timeout=5,
        )
        if resp.status_code == 200:
            log.info("Ads conversion sent (category=%s, gclid=%s...)", category, gclid[:12])
        else:
            log.error("Ads conversion upload FAILED (%s): %s", resp.status_code, resp.text)
    except Exception as exc:
        log.error("Ads conversion upload exception: %s", exc)


def _xrm_lead_category(data: dict) -> str:
    """Same category logic _send_email already uses for its subject line
    (app.py above) — reused here so the XRM lead description and the
    notification email always agree on what kind of submission this was."""
    category = (data.get("_category") or "").strip()
    if data.get("_download_url"):
        return "Resource Download"
    if category:
        return category
    return "Demo Request"


def _create_xrm_lead(data: dict) -> None:
    """Best-effort: create a Lead in XRM (Strategix's own tenant, client_id=9)
    for this submission. Never allowed to affect the form's response — any
    failure is caught by the caller and logged, exactly like _send_email and
    _send_ga4_event. ENH-086."""
    if not XRM_LEAD_API_KEY:
        log.warning("XRM lead integration not configured — skipping.")
        return

    message = data.get("_download_url") or data.get("message", "")
    source = _source_summary(data)
    if source:
        message = (message + "\n\nSource:\n" + "\n".join(f"{k}: {v}" for k, v in source)).strip()
    flags = data.get("_verify") or []
    if flags:
        message = ("[VERIFY FIRST] " + message + "\n\nVerify before engaging:\n"
                   + "\n".join(f"- {f}" for f in flags))
    payload = {
        "first_name": data.get("firstName", ""),
        "last_name": data.get("lastName", ""),
        "email": data.get("email", ""),
        "company": data.get("company", ""),
        "phone": data.get("phone", ""),
        "category": _xrm_lead_category(data),
        "message": message,
        # XRM ENH-132: forward the gclid / utm_* fields captured from the
        # landing URL (see the cookie-capture scripts in Base.astro), if this
        # submission had any. Closes the loop for XRM's own tenant (client_id
        # 9) end to end -- utm_source/medium/campaign added 2026-08-20, found
        # missing during ENH-132's Phase 0 validation (gclid alone misses any
        # non-Google-Ads channel, e.g. LinkedIn or a UTM-tagged newsletter
        # link). XRM's integration route reads these under their plain names
        # (utm_source, not _utm_source) -- see app/integrations/routes.py.
        "gclid": data.get("_gclid") or None,
        # Meta's click id (Facebook/Instagram ads), captured like gclid; XRM stores it on the lead.
        "fbclid": data.get("_fbclid") or None,
        "utm_source": data.get("_utm_source") or None,
        "utm_medium": data.get("_utm_medium") or None,
        "utm_campaign": data.get("_utm_campaign") or None,
        # XRM ENH-140: the rest of the first touch, stored on the lead itself
        # (landing_page, first_referrer, heard_about columns) rather than only
        # in the message text. Older XRM builds ignore unknown keys, so this is
        # safe to deploy before or after XRM's ENH-140.
        "landing_page": data.get("_landing_page") or None,
        "first_referrer": data.get("_first_referrer") or None,
        "heard_about": (data.get("heardAbout") or "").strip() or None,
    }
    resp = requests.post(
        XRM_LEAD_API_URL,
        json=payload,
        headers={"X-Integration-Key": XRM_LEAD_API_KEY},
        timeout=3,
    )
    resp.raise_for_status()
    log.info("XRM lead created: %s", resp.json().get("lead_ref"))


ALLOWED_ORIGINS = {
    "https://xgrcsoftware.com", "https://www.xgrcsoftware.com",
    "https://xgrcwebsite.nucleusapps.online", "http://localhost:4321",
}


def _is_spam(data: dict, req) -> str:
    """Return a reason string if the submission looks like bot spam, else ''.

    Zero-friction, no-CAPTCHA checks. The honeypot + time-trap catch bots that
    drive the real form; the timing-token and Origin checks catch bots that POST
    straight to the API and skip the browser entirely (every genuine submission
    from our forms carries an `_elapsed_ms` token and a browser Origin header).
    """
    # 1. Honeypot: a hidden field real users never fill.
    if (data.get("_hp") or "").strip():
        return "honeypot filled"
    # 2. Timing token must be present (our forms always send it) and plausible.
    if "_elapsed_ms" not in data:
        return "no timing token (direct API post)"
    try:
        elapsed = int(data.get("_elapsed_ms") or 0)
    except (ValueError, TypeError):
        elapsed = 0
    if elapsed < 2000:
        return f"submitted in {elapsed}ms"
    # 3. If an Origin/Referer is present, it must be one of ours. We do NOT drop
    #    when it is absent — a genuine submission carries the timing token above,
    #    and dropping on a missing header risks silently losing real leads if any
    #    proxy in the chain strips it.
    origin = req.headers.get("Origin") or ""
    if not origin:
        ref = req.headers.get("Referer") or ""
        origin = "/".join(ref.split("/")[:3]) if ref else ""
    if origin and origin not in ALLOWED_ORIGINS:
        return f"bad origin {origin}"
    return ""


@app.route("/api/demo", methods=["POST"])
def demo_submit():
    data = request.get_json(silent=True) or {}

    first = (data.get("firstName") or "").strip()
    email = (data.get("email") or "").strip()
    company = (data.get("company") or "").strip()

    spam = _is_spam(data, request)
    if spam:
        ip = request.headers.get("CF-Connecting-IP") or request.remote_addr or "?"
        log.info("Spam dropped (%s) from %s <%s>", spam, ip, email)
        # Return success so the bot believes it worked and does not adapt/retry.
        return jsonify({"ok": True}), 200

    if not first or not email:
        return jsonify({"ok": False, "error": "Missing required fields."}), 400

    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({"ok": False, "error": "Invalid email address."}), 400

    data.update(_client_meta(request))

    blocked = _blocked_reason(data)
    if blocked:
        # Known fraud: keep a record (with IP) but send nothing to XRM or the
        # inbox, and report success so the sender sees nothing different.
        data["_blocked"] = blocked
        _log_submission(data)
        log.info("Blocked submission (%s) from %s <%s>", blocked, data.get("_ip"), email)
        return jsonify({"ok": True}), 200

    data["_repeat"] = _is_repeat(data)
    data["_verify"] = _verification_flags(data)
    _log_submission(data)

    try:
        _send_email(data)
    except Exception as exc:
        log.error("Email send failed: %s", exc)
        # Still return success — submission is saved; email failure is ops-side.

    if data["_repeat"]:
        # Already a lead in XRM and already counted as a conversion; the
        # email above (marked as a repeat) carries anything new they wrote.
        log.info("Repeat submission from <%s>, no new XRM lead", email)
        return jsonify({"ok": True}), 200

    try:
        _create_xrm_lead(data)
    except Exception as exc:
        log.error("XRM lead create failed: %s", exc)
        # Still return success — email is the existing safety net for this submission.

    _send_ga4_event(data)
    if data["_verify"]:
        # Don't teach Google Ads that a suspicious lead is a conversion.
        log.info("Lead from <%s> flagged for verification: %s", email, "; ".join(data["_verify"]))
    else:
        _send_ads_conversion(data)

    return jsonify({"ok": True}), 200


@app.route("/api/demo/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5002)
