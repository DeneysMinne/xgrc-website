#!/usr/bin/env bash
# One-shot scheduled deploy for a single already-reviewed insights article
# commit. Invoked by a one-time cron entry (see
# project_xgrc_website_blog_cadence_2026_08 in Claude memory for the full
# schedule). Fast-forwards main to the given commit, builds (which deploys
# live via dist/ and pings IndexNow — see scripts/indexnow-submit.sh),
# verifies the article resolves, emails deneysm+revalisham@strategix.co.za,
# logs the outcome, then removes its own crontab entry so it never fires
# again.
#
# IMPORTANT: the canonical, executed copy of this script lives OUTSIDE this
# git repo at /opt/www/xgrc-scheduled-deploys/, alongside notify-team-email.py.
# A cron job invokes a literal file path with no awareness of git branches —
# keeping it inside the repo means whichever branch happens to be checked
# out on this box at fire time determines whether the file even exists. This
# copy in scripts/ is kept only for visibility/history; edit both, or better,
# edit the canonical copy and re-copy it here.
set -uo pipefail

COMMIT="$1"
SLUG="$2"
CRON_MARKER="$3"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NOTIFY_SCRIPT="$SCRIPT_DIR/notify-team-email.py"

REPO=/opt/www/XGRC_WEBSITE
LOG="$REPO/scripts/scheduled-deploy-logs/$SLUG.log"
mkdir -p "$(dirname "$LOG")"

log() { echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*" >> "$LOG"; }

notify() {
  # $1 = subject, $2 = body html. Best-effort: never fails the deploy.
  if [ ! -f "$NOTIFY_SCRIPT" ]; then
    log "WARNING: notify script not found at $NOTIFY_SCRIPT, skipping email."
    return
  fi
  sudo -n bash -c 'set -a; . /etc/xgrc/forms.env; set +a; exec python3 "$0" "$1" "$2"' \
    "$NOTIFY_SCRIPT" "$1" "$2" >> "$LOG" 2>&1 \
    || log "WARNING: notification email failed to send (deploy result above still stands)."
}

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
  notify "XGRC blog deploy FAILED: $SLUG" \
    "<p>Scheduled deploy for <strong>$SLUG</strong> could not fast-forward merge commit $COMMIT onto main (main has diverged). No build was run — the site is unchanged. Check $LOG on the box and merge manually.</p>"
  cleanup_cron
  exit 1
fi

git push origin main >> "$LOG" 2>&1

log "Running production build (this deploys live via dist/ and submits to IndexNow)..."
if ! CI=true npm run build >> "$LOG" 2>&1; then
  log "FAILED: build did not complete successfully. Site may be in a partially-built state — check manually."
  notify "XGRC blog deploy FAILED: $SLUG" \
    "<p>Scheduled deploy for <strong>$SLUG</strong> merged commit $COMMIT onto main, but the production build failed. The site may be in a partially-built state. Check $LOG on the box right away.</p>"
  cleanup_cron
  exit 1
fi

sleep 5
CODE=$(curl -s -o /tmp/scheduled-deploy-check.html -w '%{http_code}' -L "https://www.xgrcsoftware.com/insights/$SLUG")
TITLE=$(grep -o '<title>[^<]*</title>' /tmp/scheduled-deploy-check.html || echo "(no title found)")

if [ "$CODE" = "200" ] && echo "$TITLE" | grep -qv "Driving Compliance"; then
  log "SUCCESS: https://www.xgrcsoftware.com/insights/$SLUG returned $CODE, title: $TITLE"
  notify "XGRC blog deployed: $SLUG" \
    "<p>The scheduled blog post is now live: <a href=\"https://www.xgrcsoftware.com/insights/$SLUG\">https://www.xgrcsoftware.com/insights/$SLUG</a></p><p>$TITLE</p>"
else
  log "WARNING: verification looked off. HTTP $CODE, title: $TITLE. Check manually."
  notify "XGRC blog deploy — please check: $SLUG" \
    "<p>Scheduled deploy for <strong>$SLUG</strong> ran and built successfully, but verification looked off (HTTP $CODE, title: $TITLE). Please check <a href=\"https://www.xgrcsoftware.com/insights/$SLUG\">the page</a> manually.</p>"
fi

log "=== Done ==="
cleanup_cron
