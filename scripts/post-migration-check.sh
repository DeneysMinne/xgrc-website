#!/usr/bin/env bash
# What is still outstanding after the 6 Oct 2026 move from the Azure VM
# (132.220.218.173) to XGRC-DC-PROD-XRM, plus the fingerprint comparison
# against the list the old-server session left in ~/migration-check on Azure.
#
# READ-ONLY: changes nothing on either server. Run as XGRC_Admin, which has
# docker, its own crontab and the migration ssh key:
#
#   sudo -u XGRC_Admin /opt/www/XGRC_WEBSITE/scripts/post-migration-check.sh
#   sudo -u XGRC_Admin /opt/www/XGRC_WEBSITE/scripts/post-migration-check.sh --live
#
# --live also asks the Claude CLI for a one-word reply, proving the 07:00 blog
# posts can sign in (costs a few cents). Without it, only the login file is checked.
#
# Each line is OK, TODO (a known open item) or FAIL (something broken).
# Full output and the fetched fingerprint list go to /var/tmp/post-migration-check-<stamp>/,
# readable by the XGRC_Admin group so Claude (DM_Admin) can read them afterwards.

set -uo pipefail

AZURE="XGRC_Admin@132.220.218.173"
XH=/home/XGRC_Admin                 # the account that owns the site, cron and keys
AZURE_KEY="$XH/.ssh/migrate_ed25519"
MOVE_DATE="2026-10-06"          # files changed after this were changed on the new server
LIVE=0; [ "${1:-}" = "--live" ] && LIVE=1

STAMP=$(date -u +%Y%m%dT%H%M%SZ)
OUT="/var/tmp/post-migration-check-$STAMP"
umask 007
mkdir -p "$OUT"
exec > >(tee "$OUT/report.txt") 2>&1

ok=0; todo=0; fail=0
OK()   { ok=$((ok+1));     printf '  OK    %s\n' "$*"; }
TODO() { todo=$((todo+1)); printf '  TODO  %s\n' "$*"; }
FAIL() { fail=$((fail+1)); printf '  FAIL  %s\n' "$*"; }
section() { printf '\n== %s ==\n' "$*"; }
age_hours() { echo $(( ( $(date +%s) - $(stat -c %Y "$1") ) / 3600 )); }

echo "Post-migration check on $(hostname) as $(whoami), $STAMP"
[ "$(whoami)" = "XGRC_Admin" ] || echo "  (not XGRC_Admin: docker, crontab and Azure checks will fail)"

AZSSH=(ssh -i "$AZURE_KEY" -o BatchMode=yes -o ConnectTimeout=15 "$AZURE")

# ---------------------------------------------------------------------------
section "1. Fingerprints: Azure ~/migration-check vs this server"
if ! "${AZSSH[@]}" true 2>/dev/null; then
  FAIL "cannot ssh to $AZURE with $AZURE_KEY (VM switched off, or sshd stopped?)"
elif ! "${AZSSH[@]}" 'test -d ~/migration-check'; then
  FAIL "~/migration-check does not exist on Azure"
else
  rsync -a -e "ssh -i $AZURE_KEY -o BatchMode=yes" "$AZURE:migration-check/" "$OUT/migration-check/"
  echo "  Fetched to $OUT/migration-check/ ($(find "$OUT/migration-check" -type f | wc -l) files)"
  : > "$OUT/fingerprint-results.txt"
  parsed=0; good=0; changed=0; changed_after=0; missing=0; unreadable=0
  while IFS= read -r -d '' list; do
    while IFS= read -r line; do
      # Accept `sha256sum`-style lines (also md5/sha1/sha512): <hash>  [*]<path>
      [[ $line =~ ^([0-9a-fA-F]{32}|[0-9a-fA-F]{40}|[0-9a-fA-F]{64}|[0-9a-fA-F]{128})[[:space:]]+\*?(.+)$ ]] || continue
      hash=${BASH_REMATCH[1],,}; path=${BASH_REMATCH[2]}
      case ${#hash} in 32) tool=md5sum;; 40) tool=sha1sum;; 64) tool=sha256sum;; *) tool=sha512sum;; esac
      parsed=$((parsed+1))
      # Relative paths: the old session ran in /opt/www or in ~ (both the same paths here).
      local_path=""
      for c in "$path" "$XH/$path" "/opt/www/$path"; do [ -e "$c" ] && { local_path=$c; break; }; done
      if [ -z "$local_path" ]; then
        missing=$((missing+1)); echo "MISSING     $path" >> "$OUT/fingerprint-results.txt"
      elif [ ! -r "$local_path" ]; then
        unreadable=$((unreadable+1)); echo "UNREADABLE  $local_path" >> "$OUT/fingerprint-results.txt"
      elif [ "$($tool "$local_path" | cut -d' ' -f1)" = "$hash" ]; then
        good=$((good+1))
      elif [ "$(date -r "$local_path" +%F)" \> "$MOVE_DATE" ]; then
        changed_after=$((changed_after+1))
        echo "CHANGED-AFTER-MOVE $(date -r "$local_path" '+%F %H:%M')  $local_path" >> "$OUT/fingerprint-results.txt"
      else
        changed=$((changed+1)); echo "CHANGED     $local_path" >> "$OUT/fingerprint-results.txt"
      fi
    done < "$list"
  done < <(find "$OUT/migration-check" -type f -print0)

  if [ "$parsed" -eq 0 ]; then
    TODO "no checksum lines recognised in ~/migration-check: the copy is in $OUT, give that path to Claude"
  else
    echo "  $parsed entries: $good match, $changed_after changed since the move, $changed differ, $missing missing, $unreadable unreadable"
    [ $((changed + missing)) -eq 0 ] && OK "every file came across intact" \
      || FAIL "$changed differ and $missing missing (list: $OUT/fingerprint-results.txt)"
    [ "$changed_after" -gt 0 ] && echo "        $changed_after edited on this server after $MOVE_DATE: expected (memory notes, logs), see the list"
    [ "$unreadable" -gt 0 ] && TODO "$unreadable not readable as $(whoami) (probably DM_Admin's memory copy, Claude can check those)"
  fi
fi

# ---------------------------------------------------------------------------
section "2. Old Azure VM stood down"
if "${AZSSH[@]}" true 2>/dev/null; then
  n=$("${AZSSH[@]}" 'crontab -l 2>/dev/null | grep -cvE "^[[:space:]]*(#|$)"')
  [ "${n:-0}" -eq 0 ] && OK "Azure crontab empty" || FAIL "Azure crontab still has $n lines (double-publish risk)"
  act=$("${AZSSH[@]}" "systemctl list-units --state=active --no-legend --plain 'xrm*' 'xlogic*' 'xgrc*' 'cloudflared*' | awk '{print \$1}' | paste -sd' '")
  [ -z "$act" ] && OK "no xrm/xlogic/xgrc/cloudflared services active on Azure" || FAIL "still active on Azure: $act"
else
  TODO "Azure not reachable over ssh, so its stand-down could not be re-checked"
fi

# ---------------------------------------------------------------------------
section "3. Crontab on this server"
CRON=$(crontab -l 2>/dev/null)
if [ -z "$CRON" ]; then
  FAIL "crontab is empty or unreadable as $(whoami)"
else
  echo "$CRON" > "$OUT/crontab.txt"
  grep -q 'sync-and-deploy-whats-new.sh' <<<"$CRON" && OK "hourly What's New sync present" || FAIL "hourly What's New sync missing"
  grep -q 'backup_db.sh' <<<"$CRON" && OK "XRM nightly backup present" || FAIL "XRM nightly backup line missing"
  grep -q 'xlogic/deploy/backup-prod.sh' <<<"$CRON" && OK "XLOGIC nightly backup present" \
    || TODO "XLOGIC nightly backup not installed: add  30 2 * * * /opt/www/xlogic/deploy/backup-prod.sh >> /opt/www/xlogic/backups/prod/backup.log 2>&1"
  today=$(date -u +%-d); month=$(date -u +%-m)
  posts=$(grep 'scheduled-deploy-post-v2.sh' <<<"$CRON" | awk -v d="$today" -v m="$month" '$4==m && $3>=d {print $3}' | paste -sd' ')
  [ -n "$posts" ] && OK "blog posts still scheduled this month on day(s): $posts" || TODO "no blog posts left in the crontab for this month"
  grep -q 'seo-checkin.py report' <<<"$CRON" && OK "SEO check-in emails present" || FAIL "SEO check-in lines (10, 17, 31 Oct) missing"
fi

# ---------------------------------------------------------------------------
section "4. Blog publishing can run unattended"
last_sync=$(grep -E '^\[.*\] (FAILED|No new|Deployed|Built)' /opt/www/XGRC_WEBSITE/scripts/scheduled-deploy-logs/whats-new-sync.log 2>/dev/null | tail -1)
[[ $last_sync == *FAILED* ]] && FAIL "last What's New sync failed: $last_sync" || OK "last What's New sync: ${last_sync:0:80}"
if [ -x "$XH/.local/bin/claude" ]; then
  TOKEN_FILE="$XH/.config/claude-unattended-token"
  if [ -r "$TOKEN_FILE" ]; then
    export CLAUDE_CODE_OAUTH_TOKEN=$(tr -d '[:space:]' < "$TOKEN_FILE"); OK "unattended setup-token file present"
  else
    TODO "no setup-token file at $TOKEN_FILE (posts rely on the normal login, which a human session can rotate)"
  fi
  if [ "$LIVE" -eq 1 ]; then
    r=$(timeout 90 "$XH/.local/bin/claude" -p "Reply with the single word ok" 2>&1 | tail -1)
    [[ ${r,,} == *ok* ]] && OK "Claude CLI signed in and answering" || FAIL "Claude CLI did not answer: ${r:0:120}"
  elif [ -s "$XH/.claude/.credentials.json" ]; then
    OK "Claude CLI installed and a login file exists (run with --live to prove it answers)"
  else
    FAIL "Claude CLI has no login file: the 07:00 blog posts will fail. Run  claude  once as XGRC_Admin and sign in"
  fi
else
  FAIL "Claude CLI missing at ~/.local/bin/claude (the scheduled posts need it)"
fi

# ---------------------------------------------------------------------------
section "5. XLOGIC containers"
for c in xlogic-postgres-prod xlogic-minio-prod; do
  s=$(docker inspect -f '{{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{end}}' "$c" 2>/dev/null)
  [[ $s == running* && $s != *unhealthy* ]] && OK "$c $s" || FAIL "$c: ${s:-not found / no docker access}"
done

# ---------------------------------------------------------------------------
section "6. Backups"
x=$(ls -t /opt/www/xrm/backups/xrm_db_*.sql.gz 2>/dev/null | head -1)
if [ -z "$x" ]; then FAIL "no XRM backups in /opt/www/xrm/backups"
else
  sz=$(stat -c %s "$x"); h=$(age_hours "$x")
  if [ "$sz" -lt 500000 ]; then FAIL "latest XRM backup is only $sz bytes: $x"
  elif [ "$h" -gt 26 ]; then FAIL "latest XRM backup is ${h}h old: $x"
  else OK "XRM backup ${h}h old, $(du -h "$x" | cut -f1): $(basename "$x")"; fi
fi
d=$(ls -t /opt/www/xlogic/backups/prod/xlogic_prod_2*.dump 2>/dev/null | head -1)
if [ -z "$d" ]; then TODO "no XLOGIC prod backup yet (run /opt/www/xlogic/deploy/backup-prod.sh once by hand)"
else
  h=$(age_hours "$d")
  [ "$h" -le 26 ] && OK "XLOGIC backup ${h}h old: $(basename "$d")" || FAIL "latest XLOGIC backup is ${h}h old: $d"
fi
if [ -r /etc/xlogic/backup-offsite.env ] && grep -q '^OFFSITE_RSYNC_DEST=.' /etc/xlogic/backup-offsite.env; then
  OK "XLOGIC off-server destination set: $(grep '^OFFSITE_RSYNC_DEST=' /etc/xlogic/backup-offsite.env | cut -d= -f2-)"
else
  TODO "no off-server backup destination (pve01:/tank/backup suggested): /etc/xlogic/backup-offsite.env"
fi
TODO "XRM daily dumps are not copied off this server (same pve01 decision)"

# ---------------------------------------------------------------------------
section "7. Certificates and mail DNS"
end=$(openssl x509 -enddate -noout -in /etc/nginx/ssl/xgrcsoftware.com/fullchain.pem 2>/dev/null | cut -d= -f2)
if [ -n "$end" ]; then
  days=$(( ( $(date -d "$end" +%s) - $(date +%s) ) / 86400 ))
  [ "$days" -gt 30 ] && OK "xgrcsoftware.com origin cert valid $days more days" || FAIL "origin cert expires in $days days"
else FAIL "cannot read /etc/nginx/ssl/xgrcsoftware.com/fullchain.pem"; fi
dig +short TXT _dmarc.xgrcsoftware.com | grep -qi 'v=DMARC1' && OK "DMARC record published" \
  || TODO "no DMARC record for xgrcsoftware.com (Cloudflare admin, open since 15 Sep)"
dig +short CNAME selector1._domainkey.xgrcsoftware.com | grep -q . && OK "DKIM selector1 published" \
  || TODO "no DKIM selector for xgrcsoftware.com (M365 admin + Cloudflare admin)"

# ---------------------------------------------------------------------------
section "8. Odds and ends"
[ -s /opt/www/vendor-assets/materialpro-vue3-v6.1.0.zip ] && OK "MaterialPro template zip present" || TODO "MaterialPro template zip missing"
id -nG DM_Admin | grep -qw docker && OK "DM_Admin (Claude) is in the docker group" \
  || TODO "DM_Admin not in the docker group: sudo usermod -aG docker DM_Admin (lets Claude run and verify backups)"
git -c safe.directory='*' -C /opt/www/xlogic status --porcelain deploy/backup-prod.sh docs/STATE.md | grep -q . \
  && TODO "xlogic backup script and STATE.md note not committed yet"

# ---------------------------------------------------------------------------
section "Needs a person (not checkable from here)"
cat <<'EOF'
  - Rotate the Demo tenant admin test password (it appeared in chat on 5 Oct).
  - Create G2 and Capterra review-site accounts (open since 28 Sep).
  - Connect Bing Webmaster and Search Console inside Clarity AI Visibility.
  - Test the ENH-150 undo fix yourself after the next XRM release.
EOF

printf '\nSummary: %d OK, %d TODO, %d FAIL. Full report: %s/report.txt\n' "$ok" "$todo" "$fail" "$OUT"
chgrp -R XGRC_Admin "$OUT" 2>/dev/null; chmod -R g+rX "$OUT" 2>/dev/null
