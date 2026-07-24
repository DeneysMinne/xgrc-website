#!/usr/bin/env bash
#
# indexnow-submit.sh — notify Bing + Yandex of the site's URLs via IndexNow.
#
# IndexNow needs no portal, login, or API key from a search engine. Ownership is
# proven by a key file hosted at the site root (public/<key>.txt). This script
# reads the live sitemap, builds the payload, and POSTs it to IndexNow.
#
# Usage:
#   ./scripts/indexnow-submit.sh              # submit every URL in the sitemap
#   ./scripts/indexnow-submit.sh <url> ...    # submit only the given URL(s)
#
# Run it after a content deploy so new/changed pages get picked up quickly.
# Set up 2026-07-24 during the domain cutover. See memory: xgrc-domain-cutover-2026-07.

set -euo pipefail

HOST="xgrcsoftware.com"
KEY="06a2592e9ed73aff0e28f2fed07c8925"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
SITEMAP="https://${HOST}/sitemap-0.xml"
ENDPOINT="https://api.indexnow.org/indexnow"   # distributes to Bing, Yandex, etc.

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

if [ "$#" -gt 0 ]; then
    printf '%s\n' "$@" > "$tmp"
else
    curl -s "$SITEMAP" | grep -oE '<loc>[^<]+</loc>' | sed -E 's|</?loc>||g' > "$tmp"
fi

count="$(wc -l < "$tmp")"
if [ "$count" -eq 0 ]; then
    echo "No URLs to submit." >&2
    exit 1
fi

payload="$(jq -Rn --arg host "$HOST" --arg key "$KEY" --arg keyloc "$KEY_LOCATION" \
    '{host:$host, key:$key, keyLocation:$keyloc, urlList:[inputs]}' "$tmp")"

status="$(curl -s -o /dev/null -w '%{http_code}' -X POST "$ENDPOINT" \
    -H 'Content-Type: application/json; charset=utf-8' \
    --data-binary "$payload")"

echo "Submitted ${count} URL(s) to IndexNow -> HTTP ${status}"
case "$status" in
    200|202) echo "OK (accepted)." ;;
    *) echo "Unexpected status. 400=bad request, 403=key not found, 422=host/key mismatch, 429=rate limited." >&2; exit 1 ;;
esac
