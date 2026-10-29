#!/usr/bin/env python3
"""Tell XRM's Marketing Hub what the website publishes, channel by channel.
Set up 29 Oct 2026 (XRM ENH-166 Phase 1, mirror only).

Read-only here: it reads the social share ledger, the scheduled-deploy logs
and the article list, and posts a summary to XRM
(/api/integrations/marketing-mirror, form handler's XRM key). It never
changes the ledger, the crontab, a log or a post.

  channels  the website, the LinkedIn page, Deneys' LinkedIn, the Facebook
            page, Instagram and the Google Business Profile, each with its
            last successful post and a health light
  shares    every ledger entry: published (its time has passed) or scheduled
            (booked ahead, e.g. the Facebook back catalogue)

Usage:
  scripts/xrm-mirror-sync.py            # post to XRM
  scripts/xrm-mirror-sync.py --dry-run  # print what would be sent
"""
import datetime as dt
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path('/opt/www/XGRC_WEBSITE')
NODE = '/home/XGRC_Admin/.nvm/versions/node/v22.23.1/bin/node'
LOGS = ROOT / 'scripts/scheduled-deploy-logs'
LEDGER = Path('/opt/www/xgrc-scheduled-deploys/social-share-ledger.json')

# Ledger platform -> XRM channel. Order is the order XRM lists them in.
CHANNELS = [
    {'key': 'website', 'kind': 'blog', 'display_name': 'Blog · xgrcsoftware.com'},
    {'key': 'linkedin-org', 'kind': 'linkedin_org', 'display_name': 'LinkedIn · XGRC Software page', 'ledger': 'linkedin-org',
     'log': '[org] LinkedIn post created'},
    {'key': 'linkedin-deneys', 'kind': 'linkedin_person', 'display_name': 'LinkedIn · Deneys Minne', 'ledger': 'linkedin-personal',
     'owner_type': 'personal', 'owner_label': 'Deneys Minne', 'log': '[personal] LinkedIn post created'},
    {'key': 'facebook', 'kind': 'facebook_page', 'display_name': 'Facebook · XGRC Software page', 'ledger': 'facebook',
     'log': '[facebook] Page post created'},
    {'key': 'instagram', 'kind': 'instagram', 'display_name': 'Instagram · @xgrcsoftware', 'ledger': 'instagram',
     'log': '[instagram] Post published'},
    {'key': 'google-business', 'kind': 'google_business', 'display_name': 'Google Business Profile', 'ledger': 'google-business',
     'owner_type': 'personal', 'owner_label': 'Deneys (personal Gmail)', 'publisher': 'manual'},
]
STAMP_RE = re.compile(r'^\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\] (SUCCESS|FAILED|=== Done ===)')
NOT_POST_LOGS = {'whats-new-sync', 'content-sync', 'seo-checkin', 'offsite-backups', 'ads-watchdog'}


def utc(s):
    return dt.datetime.fromisoformat(s.replace('Z', '+00:00'))


def titles():
    """slug -> title from the live site.js."""
    with tempfile.NamedTemporaryFile('w', suffix='.mjs', delete=False) as f:
        f.write((ROOT / 'src/data/site.js').read_text())
    out = subprocess.run([NODE, '-e', f"import('{f.name}').then(m => console.log(JSON.stringify("
                          "Object.fromEntries(m.articles.map(a => [a.slug, a.title])))))"],
                         capture_output=True, text=True, timeout=60)
    Path(f.name).unlink()
    if out.returncode:
        raise RuntimeError(out.stderr.strip()[:300])
    return json.loads(out.stdout)


def latest_post_log():
    """(finished_at, succeeded, text) of the most recent scheduled post run."""
    best = None
    for log in LOGS.glob('*.log'):
        if log.stem in NOT_POST_LOGS:
            continue
        text = log.read_text(errors='replace')
        stamps = [(utc(m.group(1)), m.group(2)) for m in map(STAMP_RE.match, text.splitlines()) if m]
        if not stamps:
            continue
        when = max(s[0] for s in stamps)
        ok = any(s[1] == 'SUCCESS' for s in stamps) and not any(s[1] == 'FAILED' for s in stamps)
        if best is None or when > best[0]:
            best = (when, ok, text)
    return best


def build(now):
    ledger = json.loads(LEDGER.read_text())
    names = titles()
    last_log = latest_post_log()
    shares, last_at = [], {}
    for ref, platforms in ledger.items():
        for c in CHANNELS:
            entry = platforms.get(c.get('ledger', ''))
            if not isinstance(entry, dict) or not entry.get('at'):
                continue
            at = utc(entry['at'])
            booked = at > now
            shares.append({'ref': ref, 'channel_key': c['key'], 'status': 'scheduled' if booked else 'published',
                           'shared_at': None if booked else at.isoformat(), 'scheduled_for': at.isoformat() if booked else None,
                           'title': names.get(ref), 'external_id': str(entry.get('id') or '')[:255] or None})
            if not booked:
                last_at[c['key']] = max(last_at.get(c['key'], at), at)

    channels = []
    for i, c in enumerate(CHANNELS):
        ch = {k: c[k] for k in ('key', 'kind', 'display_name') if k in c}
        ch.update({k: c[k] for k in ('owner_type', 'owner_label', 'publisher') if k in c})
        ch['sort_order'] = i
        health, note = 'unknown', None
        if c['key'] == 'website' and last_log:
            ch['last_success_at'] = last_log[0].isoformat() if last_log[1] else None
            health, note = ('healthy', None) if last_log[1] else ('error', 'The last scheduled post did not go live')
        elif c.get('log') and last_log:
            health = 'healthy' if c['log'] in last_log[2] else 'warning'
            note = None if health == 'healthy' else 'The last scheduled post was not shared here'
        if c['key'] == 'google-business':
            health, note = 'warning', 'Managed from a personal Gmail; add a company owner'
        if c['key'] in last_at:
            ch['last_success_at'] = last_at[c['key']].isoformat()
        ch['health'], ch['health_note'] = health, note
        channels.append(ch)
    return {'source': 'website-mirror', 'channels': channels, 'shares': shares}


def main():
    payload = build(dt.datetime.now(dt.timezone.utc))
    if '--dry-run' in sys.argv:
        print(json.dumps(payload, indent=1))
        return
    out = subprocess.run(
        ['bash', '-c',
         'set -a; . /etc/xgrc/forms.env; set +a; '
         'curl -sS -m 30 -X POST -H "Content-Type: application/json" '
         '-H "X-Integration-Key: $XRM_LEAD_API_KEY" --data-binary @- '
         '"${XRM_LEAD_API_URL%/website-lead}/marketing-mirror"'],
        input=json.dumps(payload), capture_output=True, text=True, timeout=60)
    print(out.stdout.strip() or out.stderr.strip())


if __name__ == '__main__':
    main()
