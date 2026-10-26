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
  scripts/seo-checkin.py push [--dry-run]   # send today's figures to XRM

Cron runs the report every Monday 06:00 UTC from 26 Oct 2026, plus 31 Oct
(see crontab). Since 20 Oct it also has a "Marketing results" table from XRM:
spend, leads and qualified leads by channel, cost per qualified lead, upload
status and data quality, week on week.

Since 26 Oct (XRM ENH-164) `push` sends the same snapshot to XRM once a day
(POST /api/integrations/site-metrics with the form handler's XRM key), where
Revenue Copilot > Marketing decisions trends it next to spend and leads.
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


# Marketing results from XRM (Strategix tenant), added 20 Oct 2026 for the
# closed-loop measurement brief (XRM ENH-162). The figures come from XRM's own
# Revenue Copilot calculation (attribution_service), run read-only in XRM's
# environment, so this email and the Revenue Copilot grid can never disagree.
# Leads are counted by the days they arrived (a lead qualified later still
# counts in its own week); windows are whole days up to yesterday.
XRM_CLIENT_ID = 9
XRM_BACKEND = '/opt/www/xrm/xrm-backend'
MARKETING_PY = f"""
import json
from datetime import date, timedelta
from app.services import attribution_service as a
c, today = {XRM_CLIENT_ID}, date.today()
windows = {{'p7': (today - timedelta(days=14), today - timedelta(days=7)),
           'l7': (today - timedelta(days=7), today),
           'mtd': (today.replace(day=1), today + timedelta(days=1))}}
out = {{}}
for k, (s, e) in windows.items():
    rows = a.compute_cohort_metrics(c, s, e, 90)
    out[k] = {{'rows': rows, 'totals': a.cohort_totals(c, s, e, rows), 'quality': a.data_quality(c, s, e)}}
print(json.dumps(out, default=str))
"""
CHANNEL_NAMES = {'google_ads': 'Google Ads', 'linkedin': 'LinkedIn', 'microsoft_ads': 'Microsoft Ads', 'meta': 'Meta'}


def marketing():
    """Revenue Copilot figures for the previous 7 days, last 7 days and month to date."""
    out = run('sudo', '-n', 'bash', '-c',
              'set -a; . /etc/xrm/api.env; cd "$1" && exec .venv/bin/python -c "$0"',
              MARKETING_PY, XRM_BACKEND)
    return json.loads(out.strip() or '{}')


def marketing_rows(m):
    """Rows for the marketing table: measure | previous 7 days | last 7 days | month to date."""
    def r(label, prev, now, mtd, better='up', money=False, percent=False):
        def show(v):
            if v is None:
                return 'n/a'
            if money:
                return f'R{v:,.0f}'
            if percent:
                return f'{100 * v:.0f}%'
            return f'{v:,}' if isinstance(v, int) else f'{v:,.1f}'
        mark = ''
        if None not in (prev, now) and now != prev:
            mark = ' style="color:#0a7d3c"' if (now > prev) == (better == 'up') else ' style="color:#b3261e"'
        return f'<tr><td>{html.escape(label)}</td><td>{show(prev)}</td><td{mark}><b>{show(now)}</b></td><td>{show(mtd)}</td></tr>'

    def by_channel(window):
        return {row['channel']: row for row in m[window]['rows']}
    p7, l7, mtd = by_channel('p7'), by_channel('l7'), by_channel('mtd')
    get = lambda rows, ch, k: (rows.get(ch) or {}).get(k) or 0
    label = lambda ch: CHANNEL_NAMES.get(ch, ch[:1].upper() + ch[1:])

    rows = ['<tr><th colspan=4 align=left>Spend by platform</th></tr>']
    for ch in CHANNEL_NAMES:
        if any(ch in w for w in (p7, l7, mtd)):
            rows.append(r(label(ch), get(p7, ch, 'spend'), get(l7, ch, 'spend'), get(mtd, ch, 'spend'), 'down', money=True))
        else:
            rows.append(f'<tr><td>{label(ch)}</td><td colspan=3>not connected to XRM, spend unknown</td></tr>')
    rows.append('<tr><th colspan=4 align=left>Leads by channel (by the week they arrived), and how many are now qualified</th></tr>')
    channels = sorted({*p7, *l7, *mtd}, key=lambda ch: -get(mtd, ch, 'leads_count'))
    for ch in channels:
        if not (get(p7, ch, 'leads_count') or get(l7, ch, 'leads_count') or get(mtd, ch, 'leads_count')):
            continue
        rows.append(r(label(ch), get(p7, ch, 'leads_count'), get(l7, ch, 'leads_count'), get(mtd, ch, 'leads_count')))
        if get(p7, ch, 'qualified_count') or get(l7, ch, 'qualified_count') or get(mtd, ch, 'qualified_count'):
            rows.append(r(f'{label(ch)}: qualified', get(p7, ch, 'qualified_count'), get(l7, ch, 'qualified_count'),
                          get(mtd, ch, 'qualified_count')))
    t = {w: m[w]['totals'] for w in ('p7', 'l7', 'mtd')}
    rows.append(r('All leads (incl. disqualified)', t['p7']['leads_count'], t['l7']['leads_count'], t['mtd']['leads_count']))
    rows.append(r('All qualified leads', t['p7']['qualified_count'], t['l7']['qualified_count'], t['mtd']['qualified_count']))
    rows.append(r('Deals created from these leads', t['p7']['opportunities_count'], t['l7']['opportunities_count'],
                  t['mtd']['opportunities_count']))
    rows.append('<tr><th colspan=4 align=left>Cost per qualified lead (month to date)</th></tr>')
    for ch in CHANNEL_NAMES:
        if ch in mtd:
            q, cost = get(mtd, ch, 'qualified_count'), get(mtd, ch, 'spend')
            text = f'R{cost / q:,.0f}' if q else f'no qualified leads yet (R{cost:,.0f} spent)'
            rows.append(f'<tr><td>{label(ch)}</td><td colspan=3>{text}</td></tr>')
    q = {w: m[w]['quality'] for w in ('p7', 'l7', 'mtd')}
    rows.append('<tr><th colspan=4 align=left>Results sent back to ad platforms</th></tr>')
    rows.append(r('Uploads sent', q['p7']['uploads_sent'], q['l7']['uploads_sent'], q['mtd']['uploads_sent']))
    rows.append(r('Uploads failed or expired', q['p7']['uploads_failed'] + q['p7']['uploads_expired'],
                  q['l7']['uploads_failed'] + q['l7']['uploads_expired'], q['mtd']['uploads_failed'] + q['mtd']['uploads_expired'], 'down'))
    rows.append('<tr><th colspan=4 align=left>Data quality</th></tr>')
    rows.append(r('Leads with unknown source', q['p7']['unknown_pct'], q['l7']['unknown_pct'], q['mtd']['unknown_pct'], 'down', percent=True))
    rows.append(r('Repeat leads from the same person', q['p7']['repeat_leads'], q['l7']['repeat_leads'], q['mtd']['repeat_leads'], 'down'))
    return rows


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
        # Ignore spacing: Bing reported 'sheqx log in' until Oct 2026, then 'sheq x login'.
        hits = [r for r in rows if r['Query'].lower().replace(' ', '') == q.replace(' ', '')]
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
    # From 19 Oct 2026 the primary conversion is "XRM - Qualified lead", uploaded by
    # XRM when a lead is qualified and dated back to the ad click.
    rows.append(row('Google Ads conversions (qualified leads from 19 Oct)', n['ads_7d']['conversions'], b['ads_7d']['conversions']))
    rows.append('<tr><th colspan=3 align=left>Our server, last 7 days</th></tr>')
    rows.append(row('Server errors (5xx)', n['nginx_7d']['5xx'], b['nginx_7d']['5xx'], 'down'))
    rows.append(row('Old WordPress URLs redirected (301)', n['nginx_7d']['legacy_301'], b['nginx_7d']['legacy_301']))
    rows.append(row('Old WordPress URLs still 404', n['nginx_7d']['legacy_404'], b['nginx_7d']['legacy_404'], 'down'))
    rows.append(row('Indexable pages failing title/description/H1 checks', len(bad), 0, 'down'))

    try:
        mrows = marketing_rows(marketing())
    except Exception as exc:  # never lose the rest of the check-in over this section
        mrows = [f'<tr><td colspan=4>Marketing results unavailable: {html.escape(str(exc)[:200])}</td></tr>']
    marketing_table = ('<h3 style="font-family:Arial">Marketing results (from XRM)</h3>'
                       '<table border=1 cellpadding=5 cellspacing=0 style="border-collapse:collapse;font-family:Arial;font-size:13px">'
                       '<tr><th align=left>Measure</th><th>Previous 7 days</th><th>Last 7 days</th><th>Month to date</th></tr>'
                       + ''.join(mrows) + '</table>')

    asks = {
        '10oct': 'Please check Clarity (clarity.microsoft.com, project XGRC Software) shows recordings, and tell Claude if Google Ads conversions look broken rather than just lower.',
        '17oct': 'Please run a new Bing Site Scan and send Claude the issues CSV, plus the Recommendations page if anything is still listed.',
        '31oct': 'Please export the Bing AI Performance queries report again and send it to Claude for comparison with 3 Oct, and ask Claude to review the Clarity heatmaps for /demo/ and the pricing pages.',
    }
    body = (f'<p>XGRC website check-in <b>{html.escape(label)}</b>, comparing {b["date"]} (baseline) with {n["date"]}. '
            f'Green is better, red is worse.</p><table border=1 cellpadding=5 cellspacing=0 style="border-collapse:collapse;font-family:Arial;font-size:13px">'
            '<tr><th align=left>Measure</th><th>Baseline</th><th>Now</th></tr>' + ''.join(rows) + '</table>'
            + (f'<p>Pages failing checks: {html.escape(", ".join(bad[:20]))}</p>' if bad else '')
            + marketing_table
            + f'<p><b>Your action:</b> {html.escape(asks.get(label, "Forward this email to Claude for a review."))}</p>'
            '<p>Forward this email to Claude to get an analysis and next steps.</p>')
    subject = f'XGRC website check-in {label}: search, crawl, ads and leads'
    if dry:
        print(subject)
        print(re.sub(r'<[^>]+>', ' ', body.replace('</tr>', '\n')))
        return
    subprocess.run(['sudo', '-n', 'bash', '-c',
                    'set -a; . /etc/xgrc/forms.env; set +a; exec python3 "$0" "$1" "$2" "$3"',
                    str(NOTIFY), subject, body, TO], check=True, timeout=60)


def site_metrics(now, bad):
    """The snapshot as XRM site metrics: key, group, label, value, which way is better."""
    day = now['date']
    out = []

    def add(key, group, label, value, better='up'):
        if value is not None:
            out.append({'date': day, 'key': key, 'group': group, 'label': label,
                        'value': value, 'better': better})

    c = now['bing_crawl']
    add('bing.index', 'Bing crawl', 'Pages in Bing index', c['InIndex'])
    add('bing.5xx', 'Bing crawl', 'Server errors (5xx) seen by Bing', c['Code5xx'], 'down')
    add('bing.4xx', 'Bing crawl', 'Not found (4xx) seen by Bing', c['Code4xx'], 'down')
    add('bing.crawl_issues', 'Bing crawl', 'URLs with crawl issues', now['bing_crawl_issues'], 'down')
    for q, (imp, clk) in now['bing_queries_28d'].items():
        slug = re.sub(r'[^a-z0-9]+', '_', q.lower()).strip('_')
        add(f'bing.q.{slug}.impressions', 'Bing searches, last 28 days', f'"{q}" impressions', imp)
        add(f'bing.q.{slug}.clicks', 'Bing searches, last 28 days', f'"{q}" clicks', clk)
    add('ga4.sessions_7d', 'Google, last 7 days', 'GA4 sessions (consented visitors only)', now['ga4_7d'].get('sessions'))
    add('ads.clicks_7d', 'Google, last 7 days', 'Google Ads clicks', now['ads_7d']['clicks'])
    add('ads.conversions_7d', 'Google, last 7 days', 'Google Ads conversions (qualified leads)', now['ads_7d']['conversions'])
    n = now['nginx_7d']
    add('server.5xx_7d', 'Our server, last 7 days', 'Server errors (5xx)', n['5xx'], 'down')
    add('server.legacy_301_7d', 'Our server, last 7 days', 'Old WordPress URLs redirected', n['legacy_301'])
    add('server.legacy_404_7d', 'Our server, last 7 days', 'Old WordPress URLs still 404', n['legacy_404'], 'down')
    add('site.pages_failing_checks', 'Our server, last 7 days', 'Pages failing title/description/H1 checks', len(bad), 'down')
    return out


def push(dry):
    """Send today's snapshot to XRM. The key and URL come from the form
    handler's environment (never printed); the site-metrics endpoint sits
    next to the website-lead one."""
    body = json.dumps({'source': 'xgrcsoftware.com seo-checkin',
                       'metrics': site_metrics(snapshot(), site_audit())})
    if dry:
        print(json.dumps(json.loads(body), indent=2))
        return
    out = subprocess.run(
        ['sudo', '-n', 'bash', '-c',
         'set -a; . /etc/xgrc/forms.env; set +a; '
         'exec curl -sS --max-time 60 -X POST -H "Content-Type: application/json" '
         '-H "X-Integration-Key: $XRM_LEAD_API_KEY" --data-binary @- '
         '"${XRM_LEAD_API_URL%/website-lead}/site-metrics"'],
        input=body, capture_output=True, text=True, timeout=90)
    print(out.stdout.strip() or out.stderr.strip())
    if '"saved"' not in out.stdout:
        sys.exit(1)


if __name__ == '__main__':
    if sys.argv[1:2] == ['baseline']:
        BASELINE.write_text(json.dumps(snapshot(), indent=2) + '\n')
        print(BASELINE.read_text())
    elif sys.argv[1:2] == ['report']:
        report(sys.argv[2], '--dry-run' in sys.argv)
    elif sys.argv[1:2] == ['push']:
        push('--dry-run' in sys.argv)
    else:
        print(__doc__)
