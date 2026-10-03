#!/usr/bin/env python3
"""Search and site health check-in, emailed to Deneys.

Set up 2026-10-03 after the Bing Webmaster work (legacy redirects, meta
lengths, /login/ indexed, atomic builds, cookie consent, Clarity). Compares
the current numbers with the baseline captured that day
(scripts/seo-checkin-baseline.json) so each check-in shows whether the
changes worked.

Usage:
  scripts/seo-checkin.py baseline          # capture today's numbers (run once)
  scripts/seo-checkin.py report <label>    # build the report and email it
  scripts/seo-checkin.py report <label> --dry-run   # print, don't email

Cron runs the report on 10, 17 and 31 Oct 2026 (see crontab).
"""
import datetime as dt
import glob
import html
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASELINE = ROOT / 'scripts/seo-checkin-baseline.json'
NOTIFY = ROOT / 'scripts/notify-team-email.py'
TO = 'deneysm@strategix.co.za'
LOGIN_QUERIES = re.compile(r'(sheqx|xgrc|sheq x).*(log ?in|sign ?in)|login', re.I)
WATCH_QUERIES = ['sheqx log in', 'xgrc login', 'sheqx', 'grc software', 'sheq', 'erm software', 'what is sheq']


def run(*cmd):
    return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=120).stdout


def bing(method):
    key = (ROOT / '.secrets/bing-webmaster-api-key').read_text().strip()
    out = run('curl', '-s', f'https://ssl.bing.com/webmaster/api.svc/json/{method}?apikey={key}'
              '&siteUrl=https%3A%2F%2Fxgrcsoftware.com%2F')
    return json.loads(out)['d']


def bdate(s):
    return dt.date.fromtimestamp(int(re.search(r'-?\d+', s).group()) / 1000)


def since(rows, start, end=None):
    end = end or dt.date.today()
    return [r for r in rows if start <= bdate(r['Date']) < end]


def ga4(days):
    data = json.loads(run('scripts/ga4-api.sh', 'summary', str(days)))
    names = [h['name'] for h in data['metricHeaders']]
    vals = data.get('rows', [{}])[0].get('metricValues', [])
    return {n: float(v['value']) for n, v in zip(names, vals)}


def ads(days):
    data = json.loads(run('scripts/google-ads-api.sh', 'campaign-performance', str(days)))
    tot = {'clicks': 0, 'conversions': 0.0, 'cost': 0.0}
    for r in data.get('results', []):
        m = r['metrics']
        tot['clicks'] += int(m.get('clicks', 0))
        tot['conversions'] += float(m.get('conversions', 0))
        tot['cost'] += int(m.get('costMicros', 0)) / 1e6
    return tot


def week_over_week(fetch):
    """This 7 days and the 7 before, from 7- and 14-day totals."""
    a, b = fetch(7), fetch(14)
    return a, {k: b[k] - a[k] for k in a if isinstance(a[k], (int, float))}


def nginx_7d():
    raw = run('sudo', '-n', 'bash', '-c', 'zcat -f /var/log/nginx/xgrcsoftware-access.log*')
    cutoff = dt.datetime.now(dt.timezone.utc).replace(tzinfo=None) - dt.timedelta(days=7)
    s5 = 0
    legacy = {'301': 0, '404': 0}
    legacy_paths = {l.strip() for l in (ROOT / 'deploy/nginx/legacy-urls.txt').read_text().splitlines()
                    if l.strip() and not l.startswith('#')}
    for line in raw.splitlines():
        m = re.search(r'\[(\d+/\w+/\d+:\d+:\d+:\d+)[^\]]*\] "(\w+) (\S+)[^"]*" (\d{3})', line)
        if not m:
            continue
        when = dt.datetime.strptime(m.group(1), '%d/%b/%Y:%H:%M:%S')
        if when < cutoff:
            continue
        status = m.group(4)
        if status.startswith('5'):
            s5 += 1
        if m.group(3).split('?')[0] in legacy_paths and status in legacy:
            legacy[status] += 1
    return {'5xx': s5, 'legacy_301': legacy['301'], 'legacy_404': legacy['404']}


def site_audit():
    bad = []
    for f in glob.glob(str(ROOT / 'dist/**/index.html'), recursive=True):
        s = open(f, encoding='utf-8', errors='ignore').read()
        if re.search(r'name="robots"[^>]+noindex', s):
            continue
        d = re.search(r'name="description"[^>]*content="([^"]*)"', s)
        t = re.search(r'<title>(.*?)</title>', s, re.S)
        d = html.unescape(d.group(1)) if d else ''
        t = html.unescape(t.group(1)) if t else ''
        if not (120 <= len(d) <= 160) or len(t) > 70 or not re.search(r'<h1[\s>]', s):
            bad.append(f.split('/dist')[1].replace('index.html', ''))
    return bad


def query_totals(rows):
    out = {}
    for q in WATCH_QUERIES:
        hits = [r for r in rows if r['Query'].lower() == q]
        out[q] = [sum(r['Impressions'] for r in hits), sum(r['Clicks'] for r in hits)]
    login = [r for r in rows if LOGIN_QUERIES.search(r['Query'])]
    out['ALL login searches'] = [sum(r['Impressions'] for r in login), sum(r['Clicks'] for r in login)]
    return out


def snapshot():
    crawl = bing('GetCrawlStats')[-1]
    q = bing('GetQueryStats')
    today = dt.date.today()
    return {
        'date': today.isoformat(),
        'bing_crawl': {k: crawl[k] for k in ('InIndex', 'Code4xx', 'Code5xx', 'CrawlErrors', 'Code301')},
        'bing_crawl_date': bdate(crawl['Date']).isoformat(),
        'bing_crawl_issues': len(bing('GetCrawlIssues')),
        'bing_queries_28d': query_totals(since(q, today - dt.timedelta(days=28))),
        'ga4_7d': ga4(7),
        'ads_7d': ads(7),
        'nginx_7d': nginx_7d(),
    }


def row(label, now, base, better='up'):
    if isinstance(now, float):
        now_s, base_s = f'{now:,.1f}', f'{base:,.1f}' if base is not None else 'n/a'
    else:
        now_s, base_s = f'{now:,}', f'{base:,}' if base is not None else 'n/a'
    mark = ''
    if base is not None and now != base:
        good = (now > base) == (better == 'up')
        mark = ' style="color:#0a7d3c"' if good else ' style="color:#b3261e"'
    return f'<tr><td>{html.escape(label)}</td><td>{base_s}</td><td{mark}><b>{now_s}</b></td></tr>'


def report(label, dry):
    base = json.loads(BASELINE.read_text())
    now = snapshot()
    bad = site_audit()
    b, n = base, now
    rows = []
    rows.append('<tr><th colspan=3 align=left>Bing crawl (latest day reported)</th></tr>')
    rows.append(row('Pages in Bing index', n['bing_crawl']['InIndex'], b['bing_crawl']['InIndex']))
    rows.append(row('Server errors (5xx) seen by Bing', n['bing_crawl']['Code5xx'], b['bing_crawl']['Code5xx'], 'down'))
    rows.append(row('Not found (4xx) seen by Bing', n['bing_crawl']['Code4xx'], b['bing_crawl']['Code4xx'], 'down'))
    rows.append(row('URLs with crawl issues', n['bing_crawl_issues'], b['bing_crawl_issues'], 'down'))
    rows.append('<tr><th colspan=3 align=left>Bing searches, last 28 days (impressions / clicks)</th></tr>')
    for q, (imp, clk) in n['bing_queries_28d'].items():
        bi, bc = b['bing_queries_28d'].get(q, [None, None])
        rows.append(row(f'"{q}" clicks', clk, bc))
        rows.append(row(f'"{q}" impressions', imp, bi))
    rows.append('<tr><th colspan=3 align=left>Google, last 7 days</th></tr>')
    rows.append(row('GA4 sessions (falls after consent banner, expected)', n['ga4_7d'].get('sessions', 0), b['ga4_7d'].get('sessions')))
    rows.append(row('Google Ads clicks', n['ads_7d']['clicks'], b['ads_7d']['clicks']))
    rows.append(row('Google Ads conversions', n['ads_7d']['conversions'], b['ads_7d']['conversions']))
    rows.append('<tr><th colspan=3 align=left>Our server, last 7 days</th></tr>')
    rows.append(row('Server errors (5xx)', n['nginx_7d']['5xx'], b['nginx_7d']['5xx'], 'down'))
    rows.append(row('Old WordPress URLs redirected (301)', n['nginx_7d']['legacy_301'], b['nginx_7d']['legacy_301']))
    rows.append(row('Old WordPress URLs still 404', n['nginx_7d']['legacy_404'], b['nginx_7d']['legacy_404'], 'down'))
    rows.append(row('Indexable pages failing title/description/H1 checks', len(bad), 0, 'down'))

    asks = {
        '10oct': 'Please check Clarity (clarity.microsoft.com, project XGRC Software) shows recordings, and tell Claude if Google Ads conversions look broken rather than just lower.',
        '17oct': 'Please run a new Bing Site Scan and send Claude the issues CSV, plus the Recommendations page if anything is still listed.',
        '31oct': 'Please export the Bing AI Performance queries report again and send it to Claude for comparison with 3 Oct, and ask Claude to review the Clarity heatmaps for /demo/ and the pricing pages.',
    }
    body = (f'<p>XGRC website check-in <b>{html.escape(label)}</b>, comparing {b["date"]} (baseline) with {n["date"]}. '
            f'Green is better, red is worse.</p><table border=1 cellpadding=5 cellspacing=0 style="border-collapse:collapse;font-family:Arial;font-size:13px">'
            '<tr><th align=left>Measure</th><th>Baseline</th><th>Now</th></tr>' + ''.join(rows) + '</table>'
            + (f'<p>Pages failing checks: {html.escape(", ".join(bad[:20]))}</p>' if bad else '')
            + f'<p><b>Your action:</b> {html.escape(asks.get(label, "Forward this email to Claude for a review."))}</p>'
            '<p>Forward this email to Claude to get an analysis and next steps.</p>')
    subject = f'XGRC website check-in {label}: search, crawl and ads'
    if dry:
        print(subject)
        print(re.sub(r'<[^>]+>', ' ', body.replace('</tr>', '\n')))
        return
    subprocess.run(['sudo', '-n', 'bash', '-c',
                    'set -a; . /etc/xgrc/forms.env; set +a; exec python3 "$0" "$1" "$2" "$3"',
                    str(NOTIFY), subject, body, TO], check=True, timeout=60)


if __name__ == '__main__':
    if sys.argv[1:2] == ['baseline']:
        BASELINE.write_text(json.dumps(snapshot(), indent=2) + '\n')
        print(BASELINE.read_text())
    elif sys.argv[1:2] == ['report']:
        report(sys.argv[2], '--dry-run' in sys.argv)
    else:
        print(__doc__)
