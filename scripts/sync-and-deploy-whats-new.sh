#!/usr/bin/env bash
# Hourly automated sync of XRM's and XLOGIC's public_facing release notes
# into xgrcsoftware.com's "What's New" feed. Unlike scheduled-deploy-post.sh
# (a one-shot, self-removing job for a single reviewed commit), this is a
# recurring job with no human review step per run -- content is gated
# upstream, by whoever ticks "Publish to website" in each product's release
# notes admin UI, not by a person reviewing this script's output. Runs
# scripts/sync-release-notes.mjs, and only rebuilds (which deploys live
# via dist/ and pings IndexNow -- see scripts/indexnow-submit.sh) if that
# script actually changed src/data/whatsNew.js; otherwise it's a silent
# no-op, so an average hour produces no build, no push, no email.
#
# IMPORTANT: the canonical, executed copy of this script lives OUTSIDE the
# git repo at /opt/www/xgrc-scheduled-deploys/, alongside notify-team-email.py
# -- same rationale as scheduled-deploy-post.sh: a cron job invokes a literal
# file path with no awareness of git branches.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NOTIFY_SCRIPT="$SCRIPT_DIR/notify-team-email.py"

REPO=/opt/www/XGRC_WEBSITE
LOG="$REPO/scripts/scheduled-deploy-logs/whats-new-sync.log"
mkdir -p "$(dirname "$LOG")"

log() { echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*" >> "$LOG"; }

notify() {
  # $1 = subject, $2 = body html. Best-effort: never fails the run.
  if [ ! -f "$NOTIFY_SCRIPT" ]; then
    log "WARNING: notify script not found at $NOTIFY_SCRIPT, skipping email."
    return
  fi
  sudo -n bash -c 'set -a; . /etc/xgrc/forms.env; set +a; exec python3 "$0" "$1" "$2"' \
    "$NOTIFY_SCRIPT" "$1" "$2" >> "$LOG" 2>&1 \
    || log "WARNING: notification email failed to send (result above still stands)."
}

cd "$REPO" || { log "FATAL: cannot cd to $REPO"; exit 1; }

log "=== Starting hourly What's New sync ==="

git fetch origin >> "$LOG" 2>&1
git checkout main >> "$LOG" 2>&1
git pull --ff-only origin main >> "$LOG" 2>&1

if ! node scripts/sync-release-notes.mjs >> "$LOG" 2>&1; then
  log "FAILED: sync-release-notes.mjs did not run cleanly. Site left unchanged."
  notify "XGRC What's New sync FAILED" \
    "<p>The hourly release-notes sync failed to run. Check $LOG on the box.</p>"
  exit 1
fi

if git diff --quiet -- src/data/whatsNew.js; then
  log "No new public-facing release notes. Nothing to build or deploy."
  exit 0
fi

log "New entries found in whatsNew.js -- committing and deploying."
git add src/data/whatsNew.js
git commit -m "chore: sync release notes to What's New feed" >> "$LOG" 2>&1
git push origin main >> "$LOG" 2>&1

log "Running production build (this deploys live via dist/ and submits to IndexNow)..."
if ! CI=true npm run build >> "$LOG" 2>&1; then
  log "FAILED: build did not complete successfully. Site may be in a partially-built state -- check manually."
  notify "XGRC What's New deploy FAILED" \
    "<p>The hourly sync found new release notes and pushed the commit, but the production build failed. The site may be in a partially-built state. Check $LOG on the box right away.</p>"
  exit 1
fi

sleep 5
ALL_OK=true
CHECK_LINKS=""
for PRODUCT in xrm xlogic; do
  URL="https://www.xgrcsoftware.com/whats-new/$PRODUCT"
  CODE=$(curl -s -o /dev/null -w '%{http_code}' -L "$URL")
  if [ "$CODE" = "200" ]; then
    log "SUCCESS: $URL returned $CODE."
    CHECK_LINKS="$CHECK_LINKS<p><a href=\"$URL\">$URL</a></p>"
  elif [ "$CODE" = "404" ]; then
    log "$URL returned 404 (no public-facing entries for this product yet -- not an error)."
  else
    log "WARNING: $URL returned $CODE. Check manually."
    ALL_OK=false
  fi
done

if [ "$ALL_OK" = "true" ]; then
  notify "XGRC What's New updated" "<p>New release notes are now live:</p>$CHECK_LINKS"
else
  notify "XGRC What's New — please check" \
    "<p>The hourly sync built and deployed successfully, but at least one page's verification looked off. Please check the log ($LOG) and the site manually.</p>"
fi

log "=== Done ==="
