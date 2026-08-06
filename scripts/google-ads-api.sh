#!/usr/bin/env bash
#
# google-ads-api.sh — thin read-only wrapper over the Google Ads API for this account.
#
# Auth: standard OAuth2 refresh-token flow (not a service account — Google Ads API
# has no service-account auth, needs a real Google login's consent). Exchanges the
# stored refresh token for a short-lived access token on every run.
#
# Deliberately reporting-only (GAQL `search`, no mutate calls) — campaign/budget/bid
# changes stay human-approved-only in the Google Ads UI for now. See memory:
# xgrc-google-ads-2026-08.
#
# Key files (gitignored, this VM only):
#   .secrets/google-ads-client-secret.json  — OAuth2 Desktop client (xgrx-website GCP project)
#   .secrets/google-ads-developer-token     — API Center dev token (Basic access, approved 2026-08-06)
#   .secrets/google-ads-refresh-token       — minted 2026-08-05 via manual auth-code exchange
#
# Account IDs:
#   MANAGER_ID  891-883-4747 — MCC, sent as login-customer-id on every call
#   CUSTOMER_ID 959-917-6549 — the actual advertiser account being reported on
#
# Usage:
#   ./scripts/google-ads-api.sh accounts                  # list accessible customer IDs
#   ./scripts/google-ads-api.sh campaigns                  # all campaigns + status
#   ./scripts/google-ads-api.sh campaign-performance [days] # campaign stats, last N days (default 28)
#   ./scripts/google-ads-api.sh keyword-performance [days]  # keyword stats, last N days (default 28)
#   ./scripts/google-ads-api.sh query <GAQL>                # run an arbitrary GAQL search query
#
# Set up 2026-08-06 alongside gsc-api.sh / bing-webmaster.sh / ga4-api.sh.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLIENT_SECRET_FILE="${HERE}/.secrets/google-ads-client-secret.json"
DEV_TOKEN_FILE="${HERE}/.secrets/google-ads-developer-token"
REFRESH_TOKEN_FILE="${HERE}/.secrets/google-ads-refresh-token"

MANAGER_ID="8918834747"
CUSTOMER_ID="9599176549"
API_VERSION="v22"

for f in "$CLIENT_SECRET_FILE" "$DEV_TOKEN_FILE" "$REFRESH_TOKEN_FILE"; do
    if [ ! -f "$f" ]; then
        echo "Missing ${f}" >&2
        exit 1
    fi
done

get_access_token() {
    local client_id client_secret refresh_token resp token
    client_id="$(jq -r '.installed.client_id' "$CLIENT_SECRET_FILE")"
    client_secret="$(jq -r '.installed.client_secret' "$CLIENT_SECRET_FILE")"
    refresh_token="$(cat "$REFRESH_TOKEN_FILE")"

    resp="$(curl -s -X POST https://oauth2.googleapis.com/token \
        --data-urlencode "client_id=${client_id}" \
        --data-urlencode "client_secret=${client_secret}" \
        --data-urlencode "refresh_token=${refresh_token}" \
        --data-urlencode "grant_type=refresh_token")"

    token="$(jq -r '.access_token // empty' <<<"$resp")"
    if [ -z "$token" ]; then
        echo "Token refresh failed: $resp" >&2
        exit 1
    fi
    printf '%s' "$token"
}

TOKEN="$(get_access_token)"
DEV_TOKEN="$(cat "$DEV_TOKEN_FILE")"

gaql_search() {
    local query="$1"
    local body
    body="$(jq -cn --arg q "$query" '{query: $q}')"
    curl -s -X POST \
        -H "Authorization: Bearer ${TOKEN}" \
        -H "developer-token: ${DEV_TOKEN}" \
        -H "login-customer-id: ${MANAGER_ID}" \
        -H "Content-Type: application/json" \
        -d "$body" \
        "https://googleads.googleapis.com/${API_VERSION}/customers/${CUSTOMER_ID}/googleAds:search"
}

cmd="${1:-}"
case "$cmd" in
    accounts)
        curl -s -H "Authorization: Bearer ${TOKEN}" -H "developer-token: ${DEV_TOKEN}" \
            "https://googleads.googleapis.com/${API_VERSION}/customers:listAccessibleCustomers"
        ;;
    campaigns)
        gaql_search "SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type, campaign_budget.amount_micros FROM campaign ORDER BY campaign.id"
        ;;
    campaign-performance)
        days="${2:-28}"
        start="$(date -u -d "-${days} days" +%F)"
        end="$(date -u -d "-1 day" +%F)"
        gaql_search "SELECT campaign.id, campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.ctr, metrics.average_cpc FROM campaign WHERE segments.date BETWEEN '${start}' AND '${end}' ORDER BY metrics.cost_micros DESC"
        ;;
    keyword-performance)
        days="${2:-28}"
        start="$(date -u -d "-${days} days" +%F)"
        end="$(date -u -d "-1 day" +%F)"
        gaql_search "SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, campaign.name, ad_group.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM keyword_view WHERE segments.date BETWEEN '${start}' AND '${end}' ORDER BY metrics.clicks DESC"
        ;;
    query)
        query="${2:?Usage: query <GAQL string>}"
        gaql_search "$query"
        ;;
    *)
        echo "Usage: $0 {accounts|campaigns|campaign-performance [days]|keyword-performance [days]|query <GAQL>}" >&2
        exit 1
        ;;
esac
echo
