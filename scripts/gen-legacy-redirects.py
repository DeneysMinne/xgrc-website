#!/usr/bin/env python3
"""Generate the legacy WordPress catch-up section of deploy/nginx/redirects.conf.

Bing Webmaster (2026-10-03) still knew ~170 old WordPress URLs that the
GSC-derived map in section 1 missed: the same posts under different dates,
the old undated permalinks, and WordPress leftovers (archives, cart, demo
pages). This script routes each one to the best live page and also adds a
date-agnostic rule per known post slug, so any other dated variant of a
post resolves too.

Input:  deploy/nginx/legacy-urls.txt (one path per line, from Bing exports)
Output: rewrites the block between the BEGIN/END markers in redirects.conf.
Re-run after adding paths, then: node scripts/check-redirects.mjs dist
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONF = ROOT / 'deploy/nginx/redirects.conf'
LIST = ROOT / 'deploy/nginx/legacy-urls.txt'
DIST = ROOT / 'dist'
BEGIN = '# ---- BEGIN generated legacy catch-up (scripts/gen-legacy-redirects.py) ----'
END = '# ---- END generated legacy catch-up ----'

DATED = re.compile(r'^/(\d{4})/(\d{2})/(\d{2})/([^/]+)/?$')

# Old WordPress slug -> new article slug, where the wording changed.
ALIASES = {
    'preparing-your-organisation-for-iso-140012026': 'preparing-your-organisation-for-iso-14001-2026',
    'esg-reporting-is-no-longer-optional-south-african-context': 'esg-reporting-is-no-longer-optional-its-strategic',
    'cultivating-a-risk-aware-culture-tackling-the-people-risk-in-enterprise-risk-management-2': 'cultivating-a-risk-aware-culture-tackling-the-people-risk-in-enterprise-risk-management',
    'what-is-sheq-software-a-complete-guide-to-modern-sheq-management-systems': 'what-is-sheq-software-complete-guide',
    'from-traditional-to-proactive-enterprise-risk-management': 'enterprise-risk-management-vs-traditional-risk-management',
    'what-is-extended-enterprise-risk-management': 'extended-enterprise-risk-management',
    'what-is-pas-99-for-integrated-management-systems': 'what-is-pas-99',
}

# Fixed targets for non-article leftovers.
FIXED = {
    '/about-us': '/about/',
    '/contact-/': '/contact/', '/contact-2/': '/contact/', '/contact-page-v-2/': '/contact/',
    '/contact-us-old': '/contact/', '/contact-us-old/': '/contact/', '/contacts/': '/contact/',
    '/investment': '/about/', '/investment/': '/about/',
    '/5-reasons-to-become-an-xgrc-software-partner': '/become-a-partner/',
    '/partner-signup': '/become-a-partner/',
    '/members': '/login/', '/my-account': '/login/', '/activity': '/login/',
    '/cart': '/', '/checkout': '/', '/home-ii': '/', '/home-iii': '/', '/home-old': '/',
    '/landing-page': '/', '/landing/': '/', '/test-one-page': '/', '/portfolio': '/customers/',
    '/dt_portfolios/donec-in-maximus-augue': '/customers/',
    '/blog': '/insights/', '/blog-2': '/insights/', '/blog-5': '/insights/',
    '/blog-with-load-more-button': '/insights/',
    '/services-2/': '/solutions/', '/products/1': '/solutions/', '/occx': '/solutions/',
    '/products/esg/': '/esg/', '/products/msxcyber/': '/msxcyber/',
    '/erm-2/': '/erm/', '/vcm/': '/compliance-hub/', '/status': '/trust/',
    '/trust/subprocessor/': '/trust/subprocessors/',
    '/qa-strategix-exec-director-jacob-obrien': '/about/',
    '/wp-content/themes/finance': '/',
    '/assets/infographics/msx-infographic.pdf': '/assets/infographics/msx-infographic-v3.pdf',
    '/wp-content/uploads/2022/03/ESG-Infographic.pdf': '/assets/infographics/esg-infographic-v4.pdf',
    '/wp-content/uploads/2022/03/MSX-Infographic.pdf': '/assets/infographics/msx-infographic-v3.pdf',
    '/wp-content/uploads/2022/03/MSXCYBER-Infographic.pdf': '/assets/infographics/msxcyber-infographic-v3.pdf',
    '/wp-content/uploads/2022/03/SHEQX-Infographic.pdf': '/assets/infographics/sheqx-infographic-v3.pdf',
    '/wp-content/uploads/2024/10/ENVIREX-Infographic.pdf': '/assets/infographics/envirx-infographic-v3.pdf',
    '/wp-content/uploads/2024/10/PIX-Infographic.pdf': '/solutions/',
    '/wp-content/uploads/2025/10/Interwaste-Case-Study_V3.pdf': '/case-studies/interwaste.pdf',
    '/wp-content/uploads/2026/02/Vican-Case-Study.pdf': '/case-studies/vican-manufacturing.pdf',
    '/wp-content/uploads/2026/05/Maverick-Holding-Case-Study.pdf': '/customers/',
    '/3-ways-to-reduce-the-risk-of-falls-around-the-office': '/sheqx/',
    '/3-ways-to-improve-risk-identification-within-your-isms': '/msxcyber/',
    '/3-essential-medical-functions-of-a-well-designed-occupational-health-system': '/sheqx/',
    '/the-strategic-benefits-of-implementing-an-integrated-occupational-health-system': '/sheqx/',
    '/is-your-business-iso-45001-ready': '/use-cases/iso-45001-readiness/',
    '/iso-45001-versus-ohsas-18001': '/use-cases/iso-45001-readiness/',
    '/iso-22000-food-safety-management-how-safe-is-your-product': '/insights/strengthening-haccp-and-iso-22000-through-digital-food-safety-governance/',
    '/the-benefits-of-haccp-planning-in-food-safety-management': '/insights/strengthening-haccp-and-iso-22000-through-digital-food-safety-governance/',
    '/the-iso-14001-framework-for-environmental-management': '/use-cases/iso-14001-readiness/',
    '/updates-to-the-iso-140012015-environmental-standard': '/insights/preparing-your-organisation-for-iso-14001-2026/',
    '/principles-to-improve-quality-management-part-1': '/use-cases/iso-9001-readiness/',
    '/what-is-quality-assurance': '/use-cases/iso-9001-readiness/',
    '/benefits-of-iso-9001-compliance-for-the-manufacturing-industry': '/use-cases/iso-9001-readiness/',
    '/the-future-of-business-ai-and-ml-for-management-systems': '/maia/',
}

# Topic routing for old posts with no article equivalent (first match wins).
TOPICS = [
    (r'iso-27001|isms|cyber|gdpr|popi|security|siem|data-breach|sensitive-data|heist', '/msxcyber/'),
    (r'\bai\b|-ai-|^ai-|artificial-intelligence|-ml-', '/maia/'),
    (r'carbon|eco|environment|waste|iso-14001|iso-140012015|zero-waste', '/esg/'),
    (r'esg|sustainab', '/esg/'),
    (r'continuity|reputational|facilities|risk|erm|grc', '/erm/'),
    (r'quality|iso-9001|iso-22000|haccp|integrated-management|ims|iso-standard|iso-systems|business-management-system|pas-99', '/msx/'),
    (r'safety|health|sheq|incident|ppe|mine|mining|ehs|ergonomic|drowsy|falls|accident|hazard|iso-45001|ohsas|sop|occupational', '/sheqx/'),
    (r'securex|4sight|xgrc-highlights|industry-4-0', '/about/'),
]


def articles():
    d = DIST / 'insights'
    return {p.name for p in d.iterdir() if p.is_dir()}


def existing_slug_targets(conf_text):
    """Slug -> target from section 1's dated exact rules."""
    out = {}
    for m in re.finditer(r'location = "?(/\d{4}/\d{2}/\d{2}/([^/"]+)/)"? \{ return 301 ([^;]+);', conf_text):
        out.setdefault(m.group(2), m.group(3))
    return out


def route(slug, arts, known):
    if '/' + slug in FIXED:
        return FIXED['/' + slug]
    s = ALIASES.get(slug, slug)
    if s in arts:
        return f'/insights/{s}/'
    if slug in known:
        return known[slug]
    for pat, target in TOPICS:
        if re.search(pat, slug):
            return target
    return '/insights/'


def main():
    conf = CONF.read_text()
    head, _, rest = conf.partition(BEGIN)
    tail = rest.partition(END)[2] if rest else ''
    base = head + tail
    exact_sources = set(re.findall(r'location = "?([^"\s{]+)"? \{', base))
    arts = articles()
    known = existing_slug_targets(base)

    exact, slug_rules = [], {}
    for path in [l.strip() for l in LIST.read_text().splitlines() if l.strip() and not l.startswith('#')]:
        m = DATED.match(path)
        if m:
            slug_rules[m.group(4)] = route(m.group(4), arts, known)
            continue
        if path in FIXED or path.rstrip('/') in FIXED:
            target = FIXED.get(path) or FIXED[path.rstrip('/')]
        elif re.fullmatch(r'/\d{4}(/\d{2})?(/page/\d+)?/?', path):
            continue  # handled by the archive regex below
        else:
            target = route(path.strip('/'), arts, known)
        variants = {path, path.rstrip('/') or '/', path.rstrip('/') + '/'} if not path.endswith(('.pdf', '.xml')) else {path}
        for v in sorted(variants):
            if v not in exact_sources and v != target:
                exact.append((v, target))
                exact_sources.add(v)

    # Every post slug already mapped in section 1 also gets a date-agnostic rule.
    for slug, target in known.items():
        slug_rules.setdefault(slug, target)

    lines = [BEGIN,
             '# Old URLs Bing still crawls that section 1 (built from GSC) missed.',
             '# Exact rules for the undated permalinks and WordPress leftovers:']
    lines += [f'    location = "{src}" {{ return 301 {dst}; }}' for src, dst in exact]
    lines += ['# Any date in front of a known post slug (WordPress resolved posts by slug):']
    lines += [f'    location ~ "^/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]/{re.escape(slug)}/?$" {{ return 301 {dst}; }}'
              for slug, dst in sorted(slug_rules.items())]
    lines += ['# Remaining dated posts, and year/month archives, go to the insights index:',
              '    location ~ "^/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]/" { return 301 /insights/; }',
              '    location ~ "^/[0-9][0-9][0-9][0-9](/[0-9][0-9])?(/page/[0-9]+)?/?$" { return 301 /insights/; }',
              END]
    block = '\n'.join(lines) + '\n'
    CONF.write_text(head.rstrip('\n') + '\n\n' + block + tail.lstrip('\n') if tail else head.rstrip('\n') + '\n\n' + block)
    print(f'{len(exact)} exact rules, {len(slug_rules)} slug rules')


if __name__ == '__main__':
    main()
