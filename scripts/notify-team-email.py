#!/usr/bin/env python3
"""
Sends a short notification email to the XGRC team via the same Microsoft
Graph API mailbox used by the demo-form handler (form-handler/app.py).

Reads MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_SENDER from the
environment — these live in /etc/xgrc/forms.env (root-only), so this script
is invoked via sudo with that file sourced into the environment first, e.g.:

  sudo -n bash -c 'set -a; . /etc/xgrc/forms.env; set +a; \
    exec python3 notify-team-email.py "$1" "$2"' _ "$SUBJECT" "$BODY_HTML"

Uses only the standard library (no requests/venv dependency) so it runs
under a bare cron environment.
"""
import json
import os
import sys
import urllib.parse
import urllib.request

TO = ["deneysm@strategix.co.za", "revalisham@strategix.co.za"]


def graph_token() -> str:
    tenant_id = os.environ["MS_TENANT_ID"]
    data = urllib.parse.urlencode({
        "grant_type": "client_credentials",
        "client_id": os.environ["MS_CLIENT_ID"],
        "client_secret": os.environ["MS_CLIENT_SECRET"],
        "scope": "https://graph.microsoft.com/.default",
    }).encode()
    req = urllib.request.Request(
        f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token",
        data=data,
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.load(resp)["access_token"]


def send(subject: str, body_html: str) -> None:
    sender = os.environ.get("MS_SENDER", "info@xgrcsoftware.com")
    token = graph_token()
    payload = json.dumps({
        "message": {
            "subject": subject,
            "body": {"contentType": "HTML", "content": body_html},
            "toRecipients": [{"emailAddress": {"address": a}} for a in TO],
            "from": {"emailAddress": {"address": sender, "name": "XGRC Website"}},
        },
        "saveToSentItems": False,
    }).encode()
    req = urllib.request.Request(
        f"https://graph.microsoft.com/v1.0/users/{sender}/sendMail",
        data=payload,
        method="POST",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        print(f"Graph API responded {resp.status}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: notify-team-email.py <subject> <body_html>", file=sys.stderr)
        sys.exit(1)
    send(sys.argv[1], sys.argv[2])
