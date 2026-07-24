#!/usr/bin/env bash
#
# bing-webmaster.sh — thin wrapper over the Bing Webmaster API for this site.
#
# Reads the API key from .secrets/bing-webmaster-api-key (gitignored, this VM
# only). Get/renew the key from https://www.bing.com/webmasters -> Settings
# (gear icon) -> API Access.
#
# Usage:
#   ./scripts/bing-webmaster.sh sites                    # list verified sites
#   ./scripts/bing-webmaster.sh submit-url <url>         # submit a single URL
#   ./scripts/bing-webmaster.sh submit-sitemap <feedUrl> # register/resubmit a sitemap
#   ./scripts/bing-webmaster.sh feeds                    # list registered sitemaps + status
#   ./scripts/bing-webmaster.sh query-stats              # clicks/impressions, last ~6mo
#   ./scripts/bing-webmaster.sh crawl-stats              # crawl errors/blocked/etc
#
# Set up 2026-07-24 alongside the Bing Webmaster account for xgrcsoftware.com.
# See memory: xgrc-domain-cutover-2026-07.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KEY_FILE="${HERE}/.secrets/bing-webmaster-api-key"
SITE="https://xgrcsoftware.com"
BASE="https://ssl.bing.com/webmaster/api.svc/json"

if [ ! -f "$KEY_FILE" ]; then
    echo "Missing ${KEY_FILE} — get a key from bing.com/webmasters -> Settings -> API Access." >&2
    exit 1
fi
KEY="$(cat "$KEY_FILE")"

urlencode() { jq -rn --arg s "$1" '$s|@uri'; }

cmd="${1:-}"
case "$cmd" in
    sites)
        curl -s "${BASE}/GetUserSites?apikey=${KEY}"
        ;;
    feeds)
        curl -s "${BASE}/GetFeeds?apikey=${KEY}&siteUrl=$(urlencode "$SITE")"
        ;;
    submit-url)
        url="${2:?Usage: submit-url <url>}"
        curl -s -X POST "${BASE}/SubmitUrl?apikey=${KEY}" \
            -H "Content-Type: application/json; charset=utf-8" \
            -d "$(jq -n --arg s "$SITE" --arg u "$url" '{siteUrl:$s, url:$u}')"
        ;;
    submit-sitemap)
        feed="${2:-${SITE}/sitemap-index.xml}"
        curl -s -X POST "${BASE}/SubmitFeed?apikey=${KEY}" \
            -H "Content-Type: application/json; charset=utf-8" \
            -d "$(jq -n --arg s "$SITE" --arg f "$feed" '{siteUrl:$s, feedUrl:$f}')"
        ;;
    query-stats)
        curl -s "${BASE}/GetQueryStats?apikey=${KEY}&siteUrl=$(urlencode "$SITE")"
        ;;
    crawl-stats)
        curl -s "${BASE}/GetCrawlStats?apikey=${KEY}&siteUrl=$(urlencode "$SITE")"
        ;;
    *)
        echo "Usage: $0 {sites|feeds|submit-url <url>|submit-sitemap [feedUrl]|query-stats|crawl-stats}" >&2
        exit 1
        ;;
esac
echo
