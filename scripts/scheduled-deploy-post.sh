#!/usr/bin/env bash
# One-shot scheduled deploy for a single already-reviewed insights article
# commit. Invoked by a one-time cron entry (see docs/blog-cadence-2026-08.md
# for the full schedule). Fast-forwards main to the given commit, builds
# (which deploys live via dist/ and pings IndexNow — see
# scripts/indexnow-submit.sh), verifies the article resolves, logs the
# outcome, then removes its own crontab entry so it never fires again.
set -uo pipefail

COMMIT="$1"
SLUG="$2"
CRON_MARKER="$3"

REPO=/opt/www/XGRC_WEBSITE
LOG="$REPO/scripts/scheduled-deploy-logs/$SLUG.log"
mkdir -p "$(dirname "$LOG")"

log() { echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*" >> "$LOG"; }

cleanup_cron() {
  crontab -l 2>/dev/null | grep -vF "$CRON_MARKER" | crontab -
  log "Removed own crontab entry ($CRON_MARKER)."
}

cd "$REPO" || { log "FATAL: cannot cd to $REPO"; exit 1; }

log "=== Starting scheduled deploy: commit=$COMMIT slug=$SLUG ==="

git fetch origin >> "$LOG" 2>&1
git checkout main >> "$LOG" 2>&1
git pull --ff-only origin main >> "$LOG" 2>&1

if ! git merge --ff-only "$COMMIT" >> "$LOG" 2>&1; then
  log "ABORT: fast-forward merge of $COMMIT failed (main has diverged). No build run. Manual intervention needed."
  cleanup_cron
  exit 1
fi

git push origin main >> "$LOG" 2>&1

log "Running production build (this deploys live via dist/ and submits to IndexNow)..."
if ! CI=true npm run build >> "$LOG" 2>&1; then
  log "FAILED: build did not complete successfully. Site may be in a partially-built state — check manually."
  cleanup_cron
  exit 1
fi

sleep 5
CODE=$(curl -s -o /tmp/scheduled-deploy-check.html -w '%{http_code}' -L "https://www.xgrcsoftware.com/insights/$SLUG")
TITLE=$(grep -o '<title>[^<]*</title>' /tmp/scheduled-deploy-check.html || echo "(no title found)")

if [ "$CODE" = "200" ] && echo "$TITLE" | grep -qv "Driving Compliance"; then
  log "SUCCESS: https://www.xgrcsoftware.com/insights/$SLUG returned $CODE, title: $TITLE"
else
  log "WARNING: verification looked off. HTTP $CODE, title: $TITLE. Check manually."
fi

log "=== Done ==="
cleanup_cron
