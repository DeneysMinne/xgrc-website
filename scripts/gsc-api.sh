#!/usr/bin/env bash
#
# gsc-api.sh — thin wrapper over the Google Search Console API for this site.
#
# Auth: Google's OAuth2 service-account flow. No refresh-token/browser step —
# we self-sign a JWT with the service account's private key and exchange it
# for a short-lived access token on every run. Needs the service account to
# be added as a user (Full) on the xgrcsoftware.com property in Search
# Console itself; GCP-level IAM roles are irrelevant to that grant.
#
# Key file: .secrets/gsc-service-account.json (gitignored, this VM only).
# Get/renew it from console.cloud.google.com -> IAM & Admin -> Service
# Accounts -> (the account) -> Keys -> Add Key -> JSON.
#
# Usage:
#   ./scripts/gsc-api.sh sites                        # list sites this account can access
#   ./scripts/gsc-api.sh sitemaps                     # list sitemaps for xgrcsoftware.com
#   ./scripts/gsc-api.sh submit-sitemap [feedUrl]      # register/resubmit a sitemap
#   ./scripts/gsc-api.sh delete-sitemap <feedUrl>      # unregister a sitemap
#   ./scripts/gsc-api.sh search-analytics [days]       # top queries, last N days (default 28)
#   ./scripts/gsc-api.sh inspect-url <url>             # URL Inspection API (index status)
#
# Set up 2026-07-25 alongside the Search Console API service account.
# See memory: xgrc-domain-cutover-2026-07.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KEY_FILE="${HERE}/.secrets/gsc-service-account.json"
SITE="https://xgrcsoftware.com/"

if [ ! -f "$KEY_FILE" ]; then
    echo "Missing ${KEY_FILE} — get a key from console.cloud.google.com -> IAM & Admin -> Service Accounts." >&2
    exit 1
fi

b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }
urlencode() { jq -rn --arg s "$1" '$s|@uri'; }

get_access_token() {
    local client_email token_uri private_key now header claim signing_input signature jwt resp
    client_email="$(jq -r '.client_email' "$KEY_FILE")"
    token_uri="$(jq -r '.token_uri' "$KEY_FILE")"
    private_key="$(jq -r '.private_key' "$KEY_FILE")"
    now="$(date +%s)"

    header='{"alg":"RS256","typ":"JWT"}'
    claim="$(jq -cn --arg iss "$client_email" --arg aud "$token_uri" --arg iat "$now" --arg exp "$((now + 3600))" \
        '{iss:$iss, scope:"https://www.googleapis.com/auth/webmasters", aud:$aud, iat:($iat|tonumber), exp:($exp|tonumber)}')"

    signing_input="$(printf '%s' "$header" | b64url).$(printf '%s' "$claim" | b64url)"
    signature="$(printf '%s' "$signing_input" | openssl dgst -sha256 -sign <(printf '%s' "$private_key") | b64url)"
    jwt="${signing_input}.${signature}"

    resp="$(curl -s -X POST "$token_uri" \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
        --data-urlencode "assertion=${jwt}")"

    jq -r '.access_token // empty' <<<"$resp" | {
        read -r tok
        if [ -z "$tok" ]; then
            echo "Token exchange failed: $resp" >&2
            exit 1
        fi
        printf '%s' "$tok"
    }
}

TOKEN="$(get_access_token)"
AUTH_HEADER="Authorization: Bearer ${TOKEN}"

cmd="${1:-}"
case "$cmd" in
    sites)
        curl -s -H "$AUTH_HEADER" "https://www.googleapis.com/webmasters/v3/sites"
        ;;
    sitemaps)
        curl -s -H "$AUTH_HEADER" "https://www.googleapis.com/webmasters/v3/sites/$(urlencode "$SITE")/sitemaps"
        ;;
    submit-sitemap)
        feed="${2:-${SITE}sitemap-index.xml}"
        curl -s -X PUT -H "$AUTH_HEADER" \
            "https://www.googleapis.com/webmasters/v3/sites/$(urlencode "$SITE")/sitemaps/$(urlencode "$feed")"
        ;;
    delete-sitemap)
        feed="${2:?Usage: delete-sitemap <feedUrl>}"
        curl -s -X DELETE -o /dev/null -w '%{http_code}\n' -H "$AUTH_HEADER" \
            "https://www.googleapis.com/webmasters/v3/sites/$(urlencode "$SITE")/sitemaps/$(urlencode "$feed")"
        ;;
    search-analytics)
        days="${2:-28}"
        start="$(date -u -d "-${days} days" +%F)"
        end="$(date -u -d "-1 day" +%F)"
        body="$(jq -cn --arg s "$start" --arg e "$end" '{startDate:$s, endDate:$e, dimensions:["query"], rowLimit:25}')"
        curl -s -X POST -H "$AUTH_HEADER" -H 'Content-Type: application/json' \
            -d "$body" \
            "https://www.googleapis.com/webmasters/v3/sites/$(urlencode "$SITE")/searchAnalytics/query"
        ;;
    inspect-url)
        url="${2:?Usage: inspect-url <url>}"
        body="$(jq -cn --arg u "$url" --arg s "$SITE" '{inspectionUrl:$u, siteUrl:$s}')"
        curl -s -X POST -H "$AUTH_HEADER" -H 'Content-Type: application/json' \
            -d "$body" \
            "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
        ;;
    *)
        echo "Usage: $0 {sites|sitemaps|submit-sitemap [feedUrl]|search-analytics [days]|inspect-url <url>}" >&2
        exit 1
        ;;
esac
echo
