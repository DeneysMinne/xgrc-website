#!/usr/bin/env bash
# Scheduled deploy for staggered insights articles, v2.
#
# v1 (scheduled-deploy-post.sh) did a bare `git merge --ff-only` and
# aborted the moment main had moved since the content branch was cut.
# It never once completed an automated push -- both the Aug 13 and
# Aug 18 2026 posts hit this and had to be landed by hand (see
# project_xgrc_website_blog_cadence_2026_08 in Claude memory).
#
# v2 keeps the exact same logging/notify/cron-cleanup shape as v1, but
# delegates the "land this one commit onto whatever main looks like
# right now" step to a headless Claude Code agent (claude -p), which
# can rebase/cherry-pick and use judgment on trivial conflicts instead
# of just giving up. It is deliberately boxed in: single repo, single
# commit, strict allowed-tools list, and a required final-line verdict
# it must print. Any ambiguity, denial, or unclear result falls back
# to emailing a human -- same safety net as v1, never silent.
#
# IMPORTANT: the canonical, executed copy of this script lives OUTSIDE
# this git repo at /opt/www/xgrc-scheduled-deploys/, alongside
# notify-team-email.py. A cron job invokes a literal file path with no
# awareness of git branches -- keeping it inside the repo means
# whichever branch happens to be checked out on this box at fire time
# determines whether the file even exists. The copy in scripts/ is
# kept only for visibility/history; edit both, or better, edit the
# canonical copy and re-copy it here.
set -uo pipefail

COMMIT="$1"
SLUG="$2"
CRON_MARKER="$3"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NOTIFY_SCRIPT="$SCRIPT_DIR/notify-team-email.py"

# cron runs with a minimal PATH that doesn't include ~/.local/bin, so a
# bare `claude` call fails with "command not found" and this script
# reads that empty output as a JSON parse error (see the Aug 21 2026
# how-proactive-compliance-reduces-business-risk incident). Use the
# absolute path instead of relying on PATH.
CLAUDE_BIN="/home/XGRC_Admin/.local/bin/claude"

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

share_to_linkedin() {
  # $1 = slug. Best-effort, same discipline as notify(): a LinkedIn outage
  # or API error must never be treated as the blog deploy itself failing --
  # the post is already live on the site regardless of whether this step
  # works. See scripts/linkedin-share-post.mjs's own header for the
  # credentials/flow this depends on.
  if [ ! -f "$REPO/scripts/linkedin-share-post.mjs" ]; then
    log "WARNING: linkedin-share-post.mjs not found, skipping LinkedIn share."
    return
  fi
  ( cd "$REPO" && node scripts/linkedin-share-post.mjs "$1" ) >> "$LOG" 2>&1 \
    || log "WARNING: LinkedIn share failed (blog deploy result above still stands)."
}

cd "$REPO" || { log "FATAL: cannot cd to $REPO"; exit 1; }

log "=== Starting scheduled deploy (claude-assisted v2): commit=$COMMIT slug=$SLUG ==="

PROMPT=$(cat <<PROMPT_EOF
You are completing a pre-approved, already-reviewed scheduled publish for
the XGRC marketing site at $REPO. This exact commit was written and
reviewed days ago; your only job is to land it and deploy it safely, not
to write or judge new content.

Task:
1. cd $REPO, git fetch origin, git checkout main, git pull --ff-only origin main.
2. Try: git merge --ff-only $COMMIT
3. If that fails because main has diverged, instead land ONLY this one
   commit's changes onto current main:
   - git cherry-pick $COMMIT
   - If it applies cleanly (including a trivial auto-merge of purely
     additive changes, e.g. a new entry appended to src/data/site.js or
     src/data/articleContent.js), continue.
   - If cherry-pick hits a conflict that is not an obviously mechanical
     resolution (ambiguous which lines to keep, or unrelated logic
     changed in a way that could break something), run
     'git cherry-pick --abort', do NOT push, do NOT build, and report
     FAILURE with a clear reason. Do not guess on anything ambiguous.
4. If merged/cherry-picked successfully: git push origin main.
5. Run: CI=true npm run build
   (this both builds AND deploys live, and submits to IndexNow via the
   existing postbuild hook -- this is the intended, existing deploy
   mechanism for this site, not a side effect to avoid).
6. If the build fails, do not retry blindly -- report FAILURE with the
   build error.
7. After a successful build, verify with:
   curl -s -o /tmp/scheduled-deploy-check.html -w '%{http_code}' -L "https://www.xgrcsoftware.com/insights/$SLUG"
   and confirm the page title looks like a real article title (not the
   generic site fallback title containing "Driving Compliance").
8. Report your final result as EXACTLY one line, the very last line of
   your entire response, in one of these two forms and nothing else on
   that line:
   DEPLOY_SUCCESS: https://www.xgrcsoftware.com/insights/$SLUG
   DEPLOY_FAILED: <one sentence reason>

Constraints: only touch the repo at $REPO. Do not touch crontab, do not
send any email/notification yourself, do not modify or delete branches,
do not force-push, do not touch any file unrelated to landing this one
commit.
PROMPT_EOF
)

if [ -x "$CLAUDE_BIN" ]; then
  OUTPUT=$("$CLAUDE_BIN" -p "$PROMPT" --output-format json --permission-mode bypassPermissions --allowedTools "Bash,Read,Edit" 2>>"$LOG")
  echo "$OUTPUT" >> "$LOG"
else
  log "FATAL: claude binary not found or not executable at $CLAUDE_BIN"
  OUTPUT=""
fi

RESULT_TEXT=$(echo "$OUTPUT" | python3 -c 'import json,sys
try:
    d=json.load(sys.stdin)
    print(d.get("result","") or "")
except Exception as e:
    print("PARSE_ERROR: " + str(e))
' 2>>"$LOG")
DENIALS=$(echo "$OUTPUT" | python3 -c 'import json,sys
try:
    d=json.load(sys.stdin)
    print(len(d.get("permission_denials",[]) or []))
except Exception:
    print("0")
' 2>>"$LOG")

LAST_LINE=$(printf '%s\n' "$RESULT_TEXT" | tail -1)

if [ "${DENIALS:-0}" != "0" ]; then
  log "ABORT: agent hit $DENIALS permission denial(s) -- needs a human. Last line: $LAST_LINE"
  notify "XGRC blog deploy needs YOU: $SLUG" \
    "<p>The Claude-assisted deploy for <strong>$SLUG</strong> hit a permission denial and stopped rather than guess. Check $LOG on the box and finish it manually.</p>"
elif printf '%s\n' "$LAST_LINE" | grep -q '^DEPLOY_SUCCESS:'; then
  log "SUCCESS: $LAST_LINE"
  notify "XGRC blog deployed: $SLUG" \
    "<p>The scheduled blog post is now live: <a href=\"https://www.xgrcsoftware.com/insights/$SLUG\">https://www.xgrcsoftware.com/insights/$SLUG</a></p>"
  share_to_linkedin "$SLUG"
else
  log "FAILED or unclear result: $LAST_LINE"
  notify "XGRC blog deploy FAILED: $SLUG" \
    "<p>The Claude-assisted deploy for <strong>$SLUG</strong> did not confirm success. Last line reported: $LAST_LINE. Check $LOG on the box and finish manually.</p>"
fi

log "=== Done ==="
cleanup_cron
