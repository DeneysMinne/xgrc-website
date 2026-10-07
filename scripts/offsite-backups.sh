#!/usr/bin/env bash
# Copies this server's nightly backups OFF the server. One job for every app:
#   /opt/www/xrm/backups/            XRM, written 02:00 by backup_db.sh
#   /opt/www/xlogic/backups/prod/    XLOGIC, written 02:30 by deploy/backup-prod.sh
# Run via cron as XGRC_Admin after both:
#
#   15 3 * * * /opt/www/XGRC_WEBSITE/scripts/offsite-backups.sh >> /opt/www/XGRC_WEBSITE/scripts/scheduled-deploy-logs/offsite-backups.log 2>&1
#
# Destination comes from /etc/xgrc/offsite-backup.env (not in git):
#   OFFSITE_DEST=root@<pve01 address>:      with an rrsync-restricted key (preferred)
#   OFFSITE_DEST=root@<pve01 address>:/tank/backup/xgrc-dc-prod-xrm/
# Each app goes into its own subfolder (xrm/, xlogic/) under that destination.
#
# Never deletes anything at the destination (no --delete): a wiped or encrypted
# server must not be able to wipe its own off-server copies. Pruning there is a
# job for pve01. Before copying, it checks each app's newest backup is under 26
# hours old and not tiny, so a silently failing nightly backup is reported here
# too. Any failure emails the team.
set -uo pipefail

CONF="${OFFSITE_CONF:-/etc/xgrc/offsite-backup.env}"
SSH_KEY="${OFFSITE_SSH_KEY:-/home/XGRC_Admin/.ssh/offsite_backup_ed25519}"
NOTIFY_SCRIPT="/opt/www/XGRC_WEBSITE/scripts/notify-team-email.py"
NOTIFY_ENV="/etc/xgrc/forms.env"
MAX_AGE_MIN=$((26 * 60))

# app | source dir | files to copy | newest-file check pattern | minimum bytes for that file
SOURCES=(
  "xrm|${XRM_BACKUP_DIR:-/opt/www/xrm/backups}|xrm_db_*.sql.gz|xrm_db_*.sql.gz|500000"
  "xlogic|${XLOGIC_BACKUP_DIR:-/opt/www/xlogic/backups/prod}|xlogic_prod_*|xlogic_prod_2*.dump|1000000"
)

log() { echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*"; }
problems=()

log "=== Starting off-server backup copy ==="
if [ ! -r "$CONF" ]; then
  log "Not configured ($CONF missing): nothing copied."
  exit 0
fi
# shellcheck source=/dev/null
. "$CONF"
[ -n "${OFFSITE_DEST:-}" ] || { log "OFFSITE_DEST empty in $CONF: nothing copied."; exit 0; }

SSH="ssh -i $SSH_KEY -o BatchMode=yes -o ConnectTimeout=20 -o StrictHostKeyChecking=accept-new"

for entry in "${SOURCES[@]}"; do
  IFS='|' read -r app dir copy_glob pattern min_bytes <<<"$entry"
  newest=$(find "$dir" -maxdepth 1 -name "$pattern" -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2-)
  if [ -z "$newest" ]; then
    problems+=("$app: no backups found in $dir"); log "FAILED: $app has no backups in $dir"; continue
  fi
  if [ -n "$(find "$newest" -mmin +"$MAX_AGE_MIN")" ]; then
    problems+=("$app: newest backup is older than 26h ($newest)")
  fi
  size=$(stat -c %s "$newest")
  if [ "$size" -lt "$min_bytes" ]; then
    problems+=("$app: newest backup is only $size bytes ($newest)")
  fi
  if rsync -a --mkpath -e "$SSH" "$dir"/ --exclude='*.partial' --include="$copy_glob" --exclude='*' "${OFFSITE_DEST}${app}/"; then
    log "$app: copied to ${OFFSITE_DEST}${app}/ (newest $(basename "$newest"), $size bytes)"
  else
    problems+=("$app: rsync to ${OFFSITE_DEST}${app}/ failed"); log "FAILED: $app rsync"
  fi
done

if [ "${#problems[@]}" -gt 0 ]; then
  for p in "${problems[@]}"; do log "PROBLEM: $p"; done
  body="<p>Off-server backup copy on $(hostname) found problems:</p><ul>"
  for p in "${problems[@]}"; do body+="<li>$p</li>"; done
  body+="</ul><p>Log: /opt/www/XGRC_WEBSITE/scripts/scheduled-deploy-logs/offsite-backups.log</p>"
  if [ -x "$NOTIFY_SCRIPT" ]; then
    sudo -n bash -c 'set -a; . "$1"; set +a; exec python3 "$2" "$3" "$4"' _ \
      "$NOTIFY_ENV" "$NOTIFY_SCRIPT" "Backup problem on $(hostname)" "$body" \
      || log "Could not send the problem email either."
  fi
  log "=== Done with problems ==="
  exit 1
fi
log "=== Done ==="
