#!/usr/bin/env bash
#
# ga4-api.sh — pull reports from the Google Analytics Data API (GA4).
#
# Auth: reuses the Search Console service-account key
# (.secrets/gsc-service-account.json), self-signing a JWT with the
# analytics.readonly scope. The service account must be a Viewer on the GA4
# property and the "Google Analytics Data API" must be enabled in the GCP
# project. Property ID is numeric (GA4 Admin > Property Settings), NOT the
# G-XXXX measurement ID.
#
# Usage:
#   ./scripts/ga4-api.sh summary  [days]   # sessions/users/views/engagement
#   ./scripts/ga4-api.sh channels [days]   # traffic by channel group
#   ./scripts/ga4-api.sh pages    [days]   # top pages by views
#   ./scripts/ga4-api.sh events   [days]   # event counts (incl. generate_lead)
#   ./scripts/ga4-api.sh countries[days]   # sessions by country
#   ./scripts/ga4-api.sh realtime          # active users in the last 30 min
#
# Set up 2026-07-27. See memory: xgrc-apis-and-secrets.

set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KEY_FILE="${HERE}/.secrets/gsc-service-account.json"
PROPERTY="${GA4_PROPERTY_ID:-549035298}"
SCOPE="https://www.googleapis.com/auth/analytics.readonly"
BASE="https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}"

[ -f "$KEY_FILE" ] || { echo "Missing $KEY_FILE" >&2; exit 1; }
b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }

token() {
  local ce tu pk now hdr clm si sig
  ce=$(jq -r '.client_email' "$KEY_FILE"); tu=$(jq -r '.token_uri' "$KEY_FILE")
  pk=$(jq -r '.private_key' "$KEY_FILE"); now=$(date +%s)
  clm=$(jq -cn --arg iss "$ce" --arg aud "$tu" --arg iat "$now" --arg exp "$((now+3600))" --arg sc "$SCOPE" \
        '{iss:$iss,scope:$sc,aud:$aud,iat:($iat|tonumber),exp:($exp|tonumber)}')
  si="$(printf '%s' '{"alg":"RS256","typ":"JWT"}'|b64url).$(printf '%s' "$clm"|b64url)"
  sig=$(printf '%s' "$si"|openssl dgst -sha256 -sign <(printf '%s' "$pk")|b64url)
  curl -s -X POST "$tu" -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
    --data-urlencode "assertion=${si}.${sig}" | jq -r '.access_token // empty'
}

run() {  # $1 = report body JSON, $2 = endpoint suffix (default :runReport)
  local tok; tok=$(token)
  [ -n "$tok" ] || { echo "token exchange failed" >&2; exit 1; }
  curl -s -X POST "${BASE}:${2:-runReport}" -H "Authorization: Bearer $tok" \
    -H 'Content-Type: application/json' -d "$1"
}

days="${2:-28}"
start=$(date -u -d "-${days} days" +%F); end=$(date -u -d "-1 day" +%F)
dr="\"dateRanges\":[{\"startDate\":\"$start\",\"endDate\":\"$end\"}]"

case "${1:-}" in
  summary)
    run "{$dr,\"metrics\":[{\"name\":\"sessions\"},{\"name\":\"totalUsers\"},{\"name\":\"newUsers\"},{\"name\":\"screenPageViews\"},{\"name\":\"engagementRate\"},{\"name\":\"averageSessionDuration\"}]}" ;;
  channels)
    run "{$dr,\"dimensions\":[{\"name\":\"sessionDefaultChannelGroup\"}],\"metrics\":[{\"name\":\"sessions\"},{\"name\":\"totalUsers\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"sessions\"},\"desc\":true}]}" ;;
  pages)
    run "{$dr,\"dimensions\":[{\"name\":\"pagePath\"}],\"metrics\":[{\"name\":\"screenPageViews\"},{\"name\":\"sessions\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"screenPageViews\"},\"desc\":true}],\"limit\":20}" ;;
  events)
    run "{$dr,\"dimensions\":[{\"name\":\"eventName\"}],\"metrics\":[{\"name\":\"eventCount\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"eventCount\"},\"desc\":true}],\"limit\":25}" ;;
  countries)
    run "{$dr,\"dimensions\":[{\"name\":\"country\"}],\"metrics\":[{\"name\":\"sessions\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"sessions\"},\"desc\":true}],\"limit\":15}" ;;
  realtime)
    run "{\"dimensions\":[{\"name\":\"unifiedScreenName\"}],\"metrics\":[{\"name\":\"activeUsers\"}]}" runRealtimeReport ;;
  *)
    echo "Usage: $0 {summary|channels|pages|events|countries [days]|realtime}" >&2; exit 1 ;;
esac
echo
