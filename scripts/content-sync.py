#!/usr/bin/env python3
"""Tell XRM's Content Pipeline what the website's posts are doing.

Set up 26 Oct 2026 (XRM ENH-134 Phase 3, lite). Posts are published by one-off
crontab entries (scheduled-deploy-post-v2.sh <commit> <slug> <marker>) that
remove themselves once they run, so XRM cannot see the schedule. This script
works it out and posts it to XRM (/api/integrations/content-items, form
handler's XRM key):

  scheduled  a crontab entry is still waiting for it (date = the cron date);
             title from site.js at that commit
  published  /insights/<slug>/ answers 200; published_at = the deploy log's
             finishing time, else the article date at 07:00 UTC (the slot
             every scheduled post uses)
  failed     no crontab entry, not live, and its date has passed

Covers every article dated on or after START (when the pipeline began).

Usage:
  scripts/content-sync.py            # post to XRM
  scripts/content-sync.py --dry-run  # print what would be sent
"""
import datetime as dt
import json
import re
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

ROOT = Path('/opt/www/XGRC_WEBSITE')
NODE = '/home/XGRC_Admin/.nvm/versions/node/v22.23.1/bin/node'
LOGS = ROOT / 'scripts/scheduled-deploy-logs'
START = '2026-09-01'
SITE = 'https://xgrcsoftware.com'
CRON_RE = re.compile(r'^(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\*\s+\S*scheduled-deploy-post(?:-v2)?\.sh\s+([0-9a-f]{7,40})\s+(\S+)')
DONE_RE = re.compile(r'^\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\] (?:=== Done ===|Manual recovery complete)')


def articles(site_js_text):
    """slug -> {title, date} from a site.js source text."""
    with tempfile.NamedTemporaryFile('w', suffix='.mjs', delete=False) as f:
        f.write(site_js_text)
    out = subprocess.run([NODE, '-e', f"import('{f.name}').then(m => console.log(JSON.stringify("
                          "m.articles.map(a => ({slug: a.slug, title: a.title, date: a.date})))))"],
                         capture_output=True, text=True, timeout=60)
    Path(f.name).unlink()
    if out.returncode:
        raise RuntimeError(out.stderr.strip()[:300])
    return {a['slug']: a for a in json.loads(out.stdout)}


def git_show(ref):
    return subprocess.run(['git', '-C', str(ROOT), 'show', ref], capture_output=True, text=True, timeout=60).stdout


def pending_crons(today):
    """slug -> (date, commit) for crontab entries still waiting to run."""
    tab = subprocess.run(['crontab', '-l'], capture_output=True, text=True).stdout
    out = {}
    for line in tab.splitlines():
        m = CRON_RE.match(line.strip())
        if not m:
            continue
        day, month, commit, slug = int(m.group(3)), int(m.group(4)), m.group(5), m.group(6)
        when = dt.date(today.year, month, day)
        if when < today:  # one-off entries remove themselves; a past date means next year's
            when = dt.date(today.year + 1, month, day)
        out[slug] = (when, commit)
    return out


def is_live(slug):
    req = urllib.request.Request(f'{SITE}/insights/{slug}/', method='HEAD',
                                 headers={'User-Agent': 'xgrc-content-sync'})
    try:
        return urllib.request.urlopen(req, timeout=20).status == 200
    except Exception:
        return False


def published_at(slug, date):
    log = LOGS / f'{slug}.log'
    if log.exists():
        stamps = [m.group(1) for line in log.read_text(errors='ignore').splitlines() if (m := DONE_RE.match(line))]
        if stamps:
            return stamps[-1].replace('Z', '+00:00')
    return f'{date}T07:00:00+00:00'


def build(today):
    live_articles = articles((ROOT / 'src/data/site.js').read_text())
    crons = pending_crons(today)
    items = {}
    for slug, (when, commit) in crons.items():
        a = articles(git_show(f'{commit}:src/data/site.js')).get(slug) or live_articles.get(slug)
        if not a:
            continue  # nothing to name it by; leave it out rather than guess
        items[slug] = {'slug': slug, 'title': a['title'], 'status': 'scheduled',
                       'scheduled_for': when.isoformat(), 'commit_sha': commit}
    for slug, a in live_articles.items():
        if slug in items or (a.get('date') or '') < START:
            continue
        if is_live(slug):
            items[slug] = {'slug': slug, 'title': a['title'], 'status': 'published',
                           'scheduled_for': a['date'], 'published_at': published_at(slug, a['date'])}
        elif a['date'] < today.isoformat():
            items[slug] = {'slug': slug, 'title': a['title'], 'status': 'failed', 'scheduled_for': a['date']}
        else:
            items[slug] = {'slug': slug, 'title': a['title'], 'status': 'scheduled', 'scheduled_for': a['date']}
    return sorted(items.values(), key=lambda i: (i['scheduled_for'], i['slug']))


def main(dry):
    items = build(dt.datetime.now(dt.timezone.utc).date())
    body = json.dumps({'source': 'xgrcsoftware.com content-sync', 'items': items})
    if dry:
        for i in items:
            print(f"{i['scheduled_for']}  {i['status']:<9}  {i['slug']}")
        print(len(items), 'items')
        return
    out = subprocess.run(
        ['sudo', '-n', 'bash', '-c',
         'set -a; . /etc/xgrc/forms.env; set +a; '
         'exec curl -sS --max-time 60 -X POST -H "Content-Type: application/json" '
         '-H "X-Integration-Key: $XRM_LEAD_API_KEY" --data-binary @- '
         '"${XRM_LEAD_API_URL%/website-lead}/content-items"'],
        input=body, capture_output=True, text=True, timeout=90)
    print(out.stdout.strip() or out.stderr.strip())
    if '"unchanged"' not in out.stdout:
        sys.exit(1)


if __name__ == '__main__':
    main('--dry-run' in sys.argv)
