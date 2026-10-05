# xgrcsoftware.com: server migration checklist

Written 2026-10-05, before the VM move. Lists everything the website needs
that is NOT in git, so nothing is lost. Secret VALUES are never in this file,
only where they live.

## 1. Copy from the old server (not in git)

| What | Old location | Notes |
|---|---|---|
| API secrets | `/opt/www/XGRC_WEBSITE/.secrets/` (chmod 600) | bing-webmaster-api-key, google-ads-client-secret.json, google-ads-developer-token, google-ads-refresh-token, google-datamanager-refresh-token, gsc-service-account.json, linkedin-app-client-secret.json, linkedin-org-app-client-secret.json, linkedin-org-refresh-token, linkedin-personal-refresh-token, linkedin-personal-urn |
| Form handler env | `/etc/xgrc/forms.env` (root, 600) | Variables: MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_SENDER, FORM_TO, FORM_LOG, GA4 measurement ID + MP secret, XRM_LEAD_API_URL, XRM_LEAD_API_KEY, GOOGLE_ADS_DM_CLIENT_ID, GOOGLE_ADS_DM_CLIENT_SECRET, GOOGLE_ADS_DM_REFRESH_TOKEN, GOOGLE_ADS_DM_CONVERSION_ACTION_ID |
| TLS certificate | `/etc/nginx/ssl/xgrcsoftware.com/fullchain.pem` + `privkey.pem` | Referenced by the vhost |
| Form handler service | systemd `xgrc-forms.service` | User XGRC_Admin, WorkingDirectory `/opt/www/XGRC_WEBSITE/form-handler`, EnvironmentFile `/etc/xgrc/forms.env`. **ExecStart uses XRM's venv** `/opt/www/xrm/xrm-backend/.venv/bin/gunicorn`: move XRM first, or give the form handler its own venv. gunicorn on 127.0.0.1:5002 |
| Scheduled-deploy scripts | `/opt/www/xgrc-scheduled-deploys/` (NOT a git repo) | Identical copies are in this repo's `scripts/` (checked 2026-10-05). Recreate the folder from `scripts/scheduled-deploy-post-v2.sh`, `scheduled-deploy-post.sh`, `sync-and-deploy-whats-new.sh`, `notify-team-email.py` (the repo copy of notify is newer and backwards compatible) |
| Crontab | `crontab -l` as XGRC_Admin | See section 3 |
| Claude memory | `~/.claude/projects/-opt-www/memory/` | Copy the whole `~/.claude/projects/-opt-www/` folder. Keep the site at `/opt/www/...`: the memory folder name is derived from that path |
| nginx access logs (optional) | `/var/log/nginx/xgrcsoftware-access.log*` | Only needed for history. The check-in emails compare 7-day log counts, so expect a jump in those rows after the move |

## 2. Install on the new server

1. `git clone` DeneysMinne/xgrc-website to `/opt/www/XGRC_WEBSITE` (branch `main`), then `npm ci`.
2. nginx: install **`deploy/nginx/xgrcsoftware.conf` from the repo** as `/etc/nginx/sites-enabled/xgrcsoftware`.
   **Do NOT copy `/etc/nginx/sites-available/xgrcsoftware` from the old server**: it is a stale 28 Sep version that includes `docs/domain-cutover-redirects.conf` (moved) and serves soft 404s. The vhost includes `deploy/nginx/redirects.conf` from the repo path, so the repo must be at `/opt/www/XGRC_WEBSITE`.
3. `sudo nginx -t && sudo systemctl reload nginx`.
4. Copy `.secrets/`, `/etc/xgrc/forms.env`, the TLS files; install and start `xgrc-forms.service`.
5. Sudo: the scripts call `sudo -n` (nginx reload, reading nginx logs, sourcing forms.env). XGRC_Admin needs passwordless sudo as today (cloud-init `90-cloud-init-users`).
6. Recreate `/opt/www/xgrc-scheduled-deploys/` from the repo copies (section 1), `chmod +x`.
7. Install the crontab (section 3).
8. `CI=true timeout 600 npm run build` (builds into dist/ via scripts/build-atomic.sh, then IndexNow).
9. Point Cloudflare DNS for xgrcsoftware.com to the new IP (the API tokens on the server cannot do this; the Cloudflare admin must).

## 3. Crontab (website jobs; times are UTC)

```
0 * * * * /opt/www/xgrc-scheduled-deploys/sync-and-deploy-whats-new.sh
30 6 * * 1 /opt/www/XGRC_WEBSITE/scripts/ads-watchdog.sh >> /opt/www/XGRC_WEBSITE/scripts/scheduled-deploy-logs/ads-watchdog.log 2>&1
0 7 6 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh dbb1bcc ai-agent-security-api-keys blog-cadence-oct2026-2
0 7 8 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh 02d61b2 building-a-culture-of-cyber-resilience blog-cadence-oct2026-3
0 7 12 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh f283385 what-should-go-in-a-grc-board-pack seo-tour-cadence-2026-10-2
0 7 13 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh 9b442d4 what-would-an-ai-sheq-agent-actually-do blog-cadence-oct2026-4
0 7 15 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh 8ce089c why-integrated-assurance-matters-in-the-age-of-ai blog-cadence-oct2026-5
0 7 19 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh 97cd195 esg-kpi-dashboard-what-to-track seo-tour-cadence-2026-10-3
0 7 20 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh 9237e7a iso-42001-implementation-ai-governance blog-cadence-oct2026-6
0 7 27 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh 5de7246 iso-42001-vs-iso-27001 blog-cadence-oct2026-7
0 7 29 10 * /opt/www/xgrc-scheduled-deploys/scheduled-deploy-post-v2.sh fddb7a3 king-v-and-the-rise-of-ai-governance blog-cadence-oct2026-8
0 6 10 10 * /opt/www/XGRC_WEBSITE/scripts/seo-checkin.py report 10oct >> /opt/www/XGRC_WEBSITE/scripts/scheduled-deploy-logs/seo-checkin.log 2>&1
0 6 17 10 * /opt/www/XGRC_WEBSITE/scripts/seo-checkin.py report 17oct >> /opt/www/XGRC_WEBSITE/scripts/scheduled-deploy-logs/seo-checkin.log 2>&1
0 6 31 10 * /opt/www/XGRC_WEBSITE/scripts/seo-checkin.py report 31oct >> /opt/www/XGRC_WEBSITE/scripts/scheduled-deploy-logs/seo-checkin.log 2>&1
```

Each blog line removes itself after it runs. Drop any line whose date has passed.
The blog commits live on branch `content/oct-2026-schedule` (pushed); `git fetch` before the first run.
The crontab also holds XRM jobs (backup_db.sh, the 03:00 fetch): those belong to the XRM move.

**Cutover rule: once DNS points at the new server, clear the website lines from the OLD server's crontab.**
Otherwise both servers publish the same post, and the old one pushes to `main` from a stale tree.

## 4. Check after the move

- `curl -sI https://xgrcsoftware.com/` is 200; `/contact-2/` is a 301 to `/contact/`; `/does-not-exist` is a 404.
- `node scripts/check-redirects.mjs dist` passes; `scripts/seo-check.sh` passes.
- Submit a test on /demo/ and confirm the email and the XRM lead arrive (then delete the test lead).
- The cookie banner shows on first visit; Clarity loads only after Accept.
- `scripts/seo-checkin.py report test --dry-run` prints the table (proves the Bing, GA4, Ads and GSC secrets work).
- `crontab -l` shows the section 3 lines.
