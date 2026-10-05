#!/usr/bin/env bash
#
# ads-watchdog.sh — weekly Google Ads spend-concentration guard.
#
# Built 2026-09-15 after a broad-match keyword ("egrc") was found to have
# silently burned ~88% of a month's budget on zero-conversion template/
# competitor searches, unnoticed for weeks. This catches that pattern early
# instead of waiting for the next manual status check. See memory:
# xgrc-google-ads-2026-08 (2026-09-15 entries).
#
# Logic (last 7 days, per keyword, via google-ads-api.sh):
#   - total campaign spend and click count
#   - any single keyword responsible for >35% of spend AND 0 conversions
#     -> flag as a possible runaway broad-match / mismatched keyword
#   - daily spend pace vs the approved cap (R164/day, from the 2026-08-06
#     campaign build — update CAP_PER_DAY below if the budget is ever changed)
# Always emails a short digest (even when clean) so silence never gets
# mistaken for "nobody's watching" — same alerting principle as
# linkedin-share-post.mjs's ALERT: convention.
#
# Cron (added 2026-09-15): weekly, Monday 06:30 UTC.
#   30 6 * * 1 /opt/www/XGRC_WEBSITE/scripts/ads-watchdog.sh
#
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CAP_PER_DAY_RAND=164

RAW="$("${HERE}/scripts/google-ads-api.sh" query "SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, campaign.name, ad_group.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM keyword_view WHERE segments.date DURING LAST_7_DAYS ORDER BY metrics.cost_micros DESC")"

DIGEST="$(RAW="$RAW" python3 - "$CAP_PER_DAY_RAND" <<'PYEOF'
import json, os, sys, html

cap_per_day = float(sys.argv[1])
data = json.loads(os.environ["RAW"])
rows = data.get("results", [])

total_cost = sum(int(r["metrics"].get("costMicros", 0)) for r in rows) / 1_000_000
total_clicks = sum(int(r["metrics"].get("clicks", 0)) for r in rows)
total_conv = sum(float(r["metrics"].get("conversions", 0)) for r in rows)

flags = []
for r in rows:
    cost = int(r["metrics"].get("costMicros", 0)) / 1_000_000
    conv = float(r["metrics"].get("conversions", 0))
    clicks = int(r["metrics"].get("clicks", 0))
    if total_cost > 0 and cost / total_cost > 0.35 and conv == 0 and cost > 100:
        kw = r.get("adGroupCriterion", {}).get("keyword", {})
        flags.append(
            f"<li><b>{html.escape(kw.get('text',''))}</b> ({kw.get('matchType','')}, "
            f"{html.escape(r.get('adGroup',{}).get('name',''))}) — R{cost:,.2f} "
            f"({cost/total_cost*100:.0f}% of 7-day spend), {clicks} clicks, 0 conversions</li>"
        )

pace_flag = total_cost > cap_per_day * 7 * 1.15  # >15% over the weekly-equivalent cap

status = "NEEDS A LOOK" if (flags or pace_flag) else "CLEAN"
lines = [f"<h3>Google Ads weekly watchdog — {status}</h3>"]
lines.append(f"<p>Last 7 days: R{total_cost:,.2f} spend, {total_clicks} clicks, {total_conv:.0f} conversions "
             f"(cap-equivalent: R{cap_per_day*7:,.2f}/week).</p>")
if pace_flag:
    lines.append(f"<p><b>⚠ Spend pace is running over the approved daily cap</b> (R{cap_per_day}/day).</p>")
if flags:
    lines.append("<p><b>⚠ Possible runaway keyword(s):</b></p><ul>" + "".join(flags) + "</ul>")
else:
    lines.append("<p>No single keyword is eating a disproportionate, zero-conversion share of spend.</p>")

print("\n".join(lines))
print(f"STATUS_MARKER:{status}")
PYEOF
)"

STATUS="$(echo "$DIGEST" | grep -o 'STATUS_MARKER:.*' | cut -d: -f2)"
BODY_HTML="$(echo "$DIGEST" | grep -v 'STATUS_MARKER:')"

SUBJECT="XGRC Google Ads weekly check — ${STATUS}"
sudo -n bash -c 'set -a; . /etc/xgrc/forms.env; set +a; exec python3 /opt/www/xgrc-scheduled-deploys/notify-team-email.py "$1" "$2"' _ "$SUBJECT" "$BODY_HTML"
