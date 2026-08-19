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

    body_html = f"""
    <div style="font-family:sans-serif;max-width:600px;background:#060f1c;color:#c8d8e8;padding:32px;border-radius:12px">
      <h2 style="color:#30e2f4;margin-top:0">{subject_prefix} — XGRC Website</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px 0;color:#7a9ab5;width:120px">Name</td><td><strong style="color:#e8f2ff">{name}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#7a9ab5">Email</td><td><a href="mailto:{email}" style="color:#30e2f4">{email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#7a9ab5">Company</td><td>{company}</td></tr>
        <tr><td style="padding:8px 0;color:#7a9ab5">Phone</td><td>{phone}</td></tr>
        <tr><td style="padding:8px 0;color:#7a9ab5;vertical-align:top">Message</td><td>{message}</td></tr>
        {download_block}
      </table>
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
    payload = {
        "first_name": data.get("firstName", ""),
        "last_name": data.get("lastName", ""),
        "email": data.get("email", ""),
        "company": data.get("company", ""),
        "phone": data.get("phone", ""),
        "category": _xrm_lead_category(data),
        "message": message,
        # XRM ENH-132: forward the gclid captured from the landing URL (see
        # the cookie-capture script in Base.astro), if this submission had
        # one. Closes the loop for XRM's own tenant (client_id 9) end to end.
        "gclid": data.get("_gclid") or None,
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

    _log_submission(data)

    try:
        _send_email(data)
    except Exception as exc:
        log.error("Email send failed: %s", exc)
        # Still return success — submission is saved; email failure is ops-side.

    try:
        _create_xrm_lead(data)
    except Exception as exc:
        log.error("XRM lead create failed: %s", exc)
        # Still return success — email is the existing safety net for this submission.

    _send_ga4_event(data)
    _send_ads_conversion(data)

    return jsonify({"ok": True}), 200


@app.route("/api/demo/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5002)
