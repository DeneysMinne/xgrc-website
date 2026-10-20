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

Cron runs the report every Monday 06:00 UTC from 26 Oct 2026, plus 31 Oct
(see crontab). Since 20 Oct it also has a "Marketing results" table from XRM:
spend, leads and qualified leads by channel, cost per qualified lead, upload
status and data quality, week on week.
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
# closed-loop measurement brief (XRM ENH-162). Read-only. Leads are counted
# by the week they arrived (a lead qualified later still counts in its own
# week), excluding deleted and Disqualified leads.
XRM_CLIENT_ID = 9
CHANNEL_SQL = """
  CASE WHEN COALESCE(l.gclid, l.gbraid, l.wbraid) IS NOT NULL THEN 'Google Ads'
       WHEN l.msclkid IS NOT NULL OR (l.utm_source ILIKE 'bing' AND l.utm_medium ILIKE 'cpc') THEN 'Microsoft Ads'
       WHEN l.li_fat_id IS NOT NULL OR l.utm_source ILIKE 'linkedin%' THEN 'LinkedIn'
       WHEN l.fbclid IS NOT NULL OR l.utm_source ILIKE ANY (ARRAY['facebook%','instagram%','meta%']) THEN 'Meta'
       WHEN s.name IN ('Referral', 'Partner', 'Event', 'Cold Outreach', 'Inbound Call') THEN s.name
       WHEN s.name = 'Social Media' THEN 'Social media (unpaid)'
       WHEN l.first_referrer ~* '(google|bing|duckduckgo|yahoo|ecosia)\\.' THEN 'Organic search'
       WHEN l.first_referrer = '(direct)' THEN 'Direct'
       WHEN l.first_referrer IS NOT NULL THEN 'Other website'
       ELSE 'Unknown' END"""
MARKETING_SQL = f"""
WITH w AS (SELECT now() - interval '7 days' AS t7, now() - interval '14 days' AS t14,
                  date_trunc('month', now()) AS mtd),
q AS (SELECT qualified_status_id AS qs FROM xrm_ad_conversion_settings
      WHERE client_id = {XRM_CLIENT_ID} AND qualified_status_id IS NOT NULL LIMIT 1),
leads AS (
  SELECT l.created_at, {CHANNEL_SQL} AS channel,
         (l.converted_to_opportunity_id IS NOT NULL OR l.status_id = (SELECT qs FROM q)) AS qualified,
         l.converted_to_opportunity_id IS NOT NULL AS opportunity
  FROM xrm_lead l
  LEFT JOIN xrm_lead_source s ON s.id = l.source_id AND s.client_id = l.client_id
  LEFT JOIN xrm_lead_status st ON st.id = l.status_id AND st.client_id = l.client_id
  WHERE l.client_id = {XRM_CLIENT_ID} AND l.is_active AND COALESCE(st.name, '') <> 'Disqualified'),
spend AS (
  SELECT CASE provider WHEN 'google_ads' THEN 'Google Ads' WHEN 'linkedin' THEN 'LinkedIn'
                       WHEN 'microsoft_ads' THEN 'Microsoft Ads' WHEN 'meta' THEN 'Meta' END AS channel,
         metric_date, spend
  FROM xrm_marketing_metric_daily
  WHERE client_id = {XRM_CLIENT_ID} AND provider IN ('google_ads', 'linkedin', 'microsoft_ads', 'meta'))
SELECT json_build_object(
  'leads', (SELECT json_agg(x) FROM (
      SELECT channel,
             count(*) FILTER (WHERE created_at >= w.t7) AS l7,
             count(*) FILTER (WHERE created_at >= w.t14 AND created_at < w.t7) AS p7,
             count(*) FILTER (WHERE created_at >= w.mtd) AS mtd,
             count(*) FILTER (WHERE qualified AND created_at >= w.t7) AS q7,
             count(*) FILTER (WHERE qualified AND created_at >= w.t14 AND created_at < w.t7) AS qp7,
             count(*) FILTER (WHERE qualified AND created_at >= w.mtd) AS qmtd,
             count(*) FILTER (WHERE opportunity AND created_at >= w.mtd) AS ommtd
      FROM leads, w WHERE created_at >= LEAST(w.t14, w.mtd) GROUP BY channel ORDER BY channel) x),
  'spend', (SELECT json_agg(x) FROM (
      SELECT channel,
             COALESCE(sum(spend) FILTER (WHERE metric_date >= current_date - 7), 0) AS s7,
             COALESCE(sum(spend) FILTER (WHERE metric_date >= current_date - 14 AND metric_date < current_date - 7), 0) AS p7,
             COALESCE(sum(spend) FILTER (WHERE metric_date >= date_trunc('month', current_date)), 0) AS mtd
      FROM spend GROUP BY channel ORDER BY channel) x),
  'uploads', (SELECT json_agg(x) FROM (
      SELECT status, count(*) AS n FROM xrm_ad_conversion_event
      WHERE client_id = {XRM_CLIENT_ID} AND created_at >= now() - interval '7 days' GROUP BY status) x),
  'qualified_status_set', (SELECT count(*) FROM q) > 0)
"""


def marketing():
    """Spend, leads, qualified leads and uploads from XRM (read-only)."""
    out = run('sudo', '-n', 'bash', '-c',
              'set -a; . /etc/xrm/api.env; exec psql "$DATABASE_URL" -X -A -t -v ON_ERROR_STOP=1 -c "$0"',
              MARKETING_SQL)
    return json.loads(out.strip() or '{}')


def marketing_rows(m):
    """Rows for the marketing table: measure | previous 7 days | last 7 days | month to date."""
    def r(label, prev, now, mtd, better='up', money=False):
        fmt = (lambda v: f'R{v:,.0f}') if money else (lambda v: f'{v:,}' if isinstance(v, int) else f'{v:,.1f}')
        show = lambda v: 'n/a' if v is None else fmt(v)
        mark = ''
        if None not in (prev, now) and now != prev:
            mark = ' style="color:#0a7d3c"' if (now > prev) == (better == 'up') else ' style="color:#b3261e"'
        return f'<tr><td>{html.escape(label)}</td><td>{show(prev)}</td><td{mark}><b>{show(now)}</b></td><td>{show(mtd)}</td></tr>'

    leads = m.get('leads') or []
    spend = {s['channel']: s for s in (m.get('spend') or [])}
    by = {l['channel']: l for l in leads}
    rows = ['<tr><th colspan=4 align=left>Spend by platform</th></tr>']
    for ch in ('Google Ads', 'LinkedIn', 'Microsoft Ads', 'Meta'):
        s = spend.get(ch)
        if s:
            rows.append(r(ch, float(s['p7']), float(s['s7']), float(s['mtd']), 'down', money=True))
        else:
            rows.append(f'<tr><td>{ch}</td><td colspan=3>not connected to XRM, spend unknown</td></tr>')
    rows.append('<tr><th colspan=4 align=left>Leads by channel (by the week they arrived), and how many are now qualified</th></tr>')
    for l in leads:
        rows.append(r(f'{l["channel"]}', l['p7'], l['l7'], l['mtd']))
        if l['q7'] or l['qp7'] or l['qmtd']:
            rows.append(r(f'{l["channel"]}: qualified', l['qp7'], l['q7'], l['qmtd']))
    tot = lambda k: sum(l[k] for l in leads)
    rows.append(r('All leads', tot('p7'), tot('l7'), tot('mtd')))
    rows.append(r('All qualified leads', tot('qp7'), tot('q7'), tot('qmtd')))
    rows.append(r('Opportunities created from this month\'s leads', None, None, tot('ommtd')))
    rows.append('<tr><th colspan=4 align=left>Cost per qualified lead (month to date)</th></tr>')
    for ch, s in spend.items():
        q = by.get(ch, {}).get('qmtd', 0)
        cost = float(s['mtd'])
        label = f'R{cost / q:,.0f}' if q else f'no qualified leads yet (R{cost:,.0f} spent)'
        rows.append(f'<tr><td>{html.escape(ch)}</td><td colspan=3>{label}</td></tr>')
    up = {u['status']: u['n'] for u in (m.get('uploads') or [])}
    rows.append('<tr><th colspan=4 align=left>Results sent back to ad platforms (last 7 days)</th></tr>')
    rows.append(f'<tr><td>Uploads</td><td colspan=3>{up.get("sent", 0)} sent, {up.get("failed", 0)} failed, '
                f'{up.get("pending", 0)} waiting, {up.get("expired", 0)} expired</td></tr>')
    unknown = by.get('Unknown', {})
    share = lambda k, n: (100.0 * unknown.get(k, 0) / n) if n else None
    rows.append('<tr><th colspan=4 align=left>Data quality</th></tr>')
    rows.append(r('Leads with unknown source (%)', share('p7', tot('p7')), share('l7', tot('l7')),
                  share('mtd', tot('mtd')), 'down'))
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


if __name__ == '__main__':
    if sys.argv[1:2] == ['baseline']:
        BASELINE.write_text(json.dumps(snapshot(), indent=2) + '\n')
        print(BASELINE.read_text())
    elif sys.argv[1:2] == ['report']:
        report(sys.argv[2], '--dry-run' in sys.argv)
    else:
        print(__doc__)
