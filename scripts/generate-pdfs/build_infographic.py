#!/usr/bin/env python3
"""
Generic XGRC solution-infographic builder (A4 portrait, single page) in the
modern brand style — deep navy, teal->cyan->blue gradients, Outfit/Inter type,
with the solution's own logo. Data-driven from solutions.json (dumped from
solutionDetails in site.js by dump_solutions.mjs).

Usage (WeasyPrint venv):
  node scripts/generate-pdfs/dump_solutions.mjs
  /opt/www/xrm/xrm-backend/.venv/bin/python3 scripts/generate-pdfs/build_infographic.py <slug> [slug...]
  /opt/www/xrm/xrm-backend/.venv/bin/python3 scripts/generate-pdfs/build_infographic.py --all
"""
import base64, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
FONTS = os.path.join(HERE, 'fonts')
BRAND = os.path.join(ROOT, 'public', 'assets', 'logos', 'brand')
OUTDIR = os.path.join(ROOT, 'public', 'assets', 'infographics')
DATA = json.load(open(os.path.join(HERE, 'solutions.json')))

# Which solutions get an infographic (those with a recovered infographic asset).
TARGETS = ['sheqx', 'msx', 'msxcyber', 'erm', 'envirx', 'esg', 'maia', 'libryo', 'hakware']

# Output filename version per slug. Bump when a fresh URL is needed to bust the
# Cloudflare edge cache (a URL already served is cached ~4h and we can't purge).
# erm is v3 because erm-*-v2 was already published+cached with an earlier design.
VERSION = {'erm': 'v3'}
DEFAULT_VERSION = 'v2'


def b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode()


def font_face(family, file, weight):
    return (f"@font-face{{font-family:'{family}';font-weight:{weight};font-style:normal;"
            f"src:url(data:font/ttf;base64,{b64(os.path.join(FONTS, file))}) format('truetype');}}")

FONTS_CSS = ''.join([
    font_face('Outfit', 'Outfit-Regular.ttf', 400),
    font_face('Outfit', 'Outfit-SemiBold.ttf', 600),
    font_face('Outfit', 'Outfit-Bold.ttf', 700),
    font_face('Inter', 'Inter-Regular.ttf', 400),
    font_face('Inter', 'Inter-SemiBold.ttf', 600),
    font_face('JetBrains Mono', 'JetBrainsMono-Regular.ttf', 400),
])

ICON = 'data:image/png;base64,' + b64(os.path.join(BRAND, 'xgrc-icon-white.png'))
WORDMARK = 'data:image/png;base64,' + b64(os.path.join(BRAND, 'xgrc-logo-white-transparent.png'))


def esc(s):
    return (s or '').replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def solution_logo_uri(slug):
    # Prefer the square icon mark (clean in a corner) over the vertical lockup.
    for sub in ('icons', ''):
        p = os.path.join(ROOT, 'public', 'assets', 'logos', 'solutions', sub, f'{slug}.png')
        if os.path.exists(p):
            return 'data:image/png;base64,' + b64(p)
    return None


def build(slug):
    d = DATA[slug]
    name = esc(d['name'])
    tag = esc(d['tag'])
    headline = esc(d['headline'])
    lede = esc(d['lede'])
    groups = d['moduleGroups']
    challenges = d['challenges'][:4]
    stats = d['stats'][:3]
    standards = d['standards'][:6]
    logo = solution_logo_uri(slug)

    # Card column count: 2 (2x2) for exactly 4 groups, else 3 (wraps for 5-6).
    cols = 2 if len(groups) == 4 else 3
    basis = {2: '47%', 3: '31%'}[cols]

    cards = ''.join(
        f'''<div class="card" style="flex-basis:{basis}">
              <div class="card-head">{esc(g['category'])}</div>
              <ul>{''.join(f'<li>{esc(m)}</li>' for m in g['modules'][:4])}</ul>
            </div>''' for g in groups)

    probs = ''.join(
        f'''<div class="prob">
              <div class="prob-title">{esc(c['title'])}</div>
              <div class="prob-body">{esc(c['body'])}</div>
            </div>''' for c in challenges)

    stats_html = ''.join(
        f'''<div class="stat">
              <div class="stat-val">{esc(s['value'])}</div>
              <div class="stat-lbl">{esc(s['label'])}</div>
            </div>''' for s in stats)

    std_html = ''.join(f'<span class="std">{esc(s)}</span>' for s in standards)

    # No solution icon (partner products) -> omit the top-right mark rather than
    # repeat the name that already appears as the h1.
    logo_html = f'<img class="sol-logo" src="{logo}" alt="{name}">' if logo else ''

    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
{FONTS_CSS}
@page {{ size: A4; margin: 0; }}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ font-family: 'Inter', sans-serif; color: #e8f2ff; background: #060f1c;
  width: 210mm; height: 297mm; position: relative; overflow: hidden; }}
.bg-glow {{ position: absolute; top: -150px; right: -170px; width: 640px; height: 640px;
  background: radial-gradient(circle at 50% 50%, rgba(48,226,244,0.18) 0%, rgba(30,111,168,0.09) 40%, transparent 68%); z-index: 0; }}
.wrap {{ position: relative; z-index: 1; padding: 32px 34px 0; }}

.hero {{ position: relative; padding-bottom: 22px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.09); }}
.brandrow {{ display: flex; align-items: center; gap: 9px; margin-bottom: 24px; }}
.brandrow img {{ height: 28px; }}
.brandrow .rmark {{ font-family: 'Outfit'; font-weight: 700; font-size: 14px; letter-spacing: .5px; }}
.brandrow .rmark span {{ color: #30e2f4; }}
.sol-logo {{ position: absolute; top: 0; right: 0; height: 68px; width: auto; object-fit: contain;
  filter: drop-shadow(0 4px 16px rgba(48,226,244,0.28)); z-index: 3; }}
.sol-fallback {{ position: absolute; top: 10px; right: 0; font-family: 'Outfit'; font-weight: 700;
  font-size: 22px; color: #30e2f4; z-index: 3; }}
.eyebrow {{ font-family: 'JetBrains Mono'; font-size: 9.5px; letter-spacing: 3px; text-transform: uppercase; color: #30e2f4; margin-bottom: 10px; }}
h1 {{ font-family: 'Outfit'; font-weight: 700; font-size: 34px; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 12px; max-width: 74%; }}
.headline {{ font-family: 'Outfit'; font-weight: 600; font-size: 14.5px; color: #7fe9f6; margin-bottom: 11px; max-width: 88%; }}
.lede {{ font-size: 10.5px; line-height: 1.6; color: #9fb3c8; max-width: 94%; }}

.seclabel {{ font-family: 'JetBrains Mono'; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: #5a7089; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }}
.seclabel::before {{ content: ''; width: 20px; height: 2px; background: #30e2f4; border-radius: 2px; }}

.cards {{ display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 26px; justify-content: flex-start; }}
.card {{ flex-grow: 1; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; }}
.card-head {{ font-family: 'Outfit'; font-weight: 700; font-size: 12px; color: #04121d; padding: 10px 15px; background: linear-gradient(120deg, #8bf2ff, #30e2f4 55%, #22c3e0); }}
.card ul {{ list-style: none; padding: 12px 15px 13px; }}
.card li {{ font-size: 9.8px; color: #c3d3e4; padding: 4px 0 4px 15px; position: relative; line-height: 1.3; }}
.card li::before {{ content: ''; position: absolute; left: 0; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: #30e2f4; box-shadow: 0 0 6px rgba(48,226,244,0.7); }}

.probs {{ display: flex; gap: 12px; margin-bottom: 26px; }}
.prob {{ flex: 1; padding-left: 13px; border-left: 2px solid rgba(48,226,244,0.55); }}
.prob-title {{ font-family: 'Outfit'; font-weight: 600; font-size: 11px; color: #e8f2ff; margin-bottom: 6px; line-height: 1.2; }}
.prob-body {{ font-size: 8.8px; line-height: 1.5; color: #8ba3ba; }}

.stats {{ display: flex; gap: 12px; margin-bottom: 20px; }}
.stat {{ flex: 1; background: linear-gradient(150deg, rgba(48,226,244,0.10), rgba(30,111,168,0.05)); border: 1px solid rgba(48,226,244,0.22); border-radius: 12px; padding: 15px 16px; }}
.stat-val {{ font-family: 'Outfit'; font-weight: 700; font-size: 21px; color: #30e2f4; line-height: 1.05; margin-bottom: 6px; }}
.stat-lbl {{ font-size: 9.3px; color: #9fb3c8; }}

.stds {{ display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }}
.std {{ font-family: 'JetBrains Mono'; font-size: 9px; letter-spacing: .5px; color: #bfe9f4; padding: 6px 12px; border: 1px solid rgba(48,226,244,0.30); border-radius: 20px; background: rgba(48,226,244,0.06); }}

.closing {{ background: linear-gradient(120deg, rgba(48,226,244,0.12), rgba(30,111,168,0.05)); border: 1px solid rgba(48,226,244,0.22); border-radius: 14px; padding: 20px 24px; }}
.closing-eyebrow {{ font-family: 'JetBrains Mono'; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: #30e2f4; margin-bottom: 9px; }}
.closing-text {{ font-family: 'Outfit'; font-weight: 600; font-size: 13.5px; line-height: 1.45; color: #e8f2ff; }}

.footer {{ position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 34px 20px; border-top: 1px solid rgba(255,255,255,0.09); display: flex; align-items: center; justify-content: space-between; }}
.footer .flogo {{ height: 26px; opacity: 0.92; }}
.footer .site {{ font-family: 'JetBrains Mono'; font-size: 9.5px; color: #6f8599; letter-spacing: .5px; }}
.footer .tag {{ font-family: 'Outfit'; font-weight: 600; font-size: 10.5px; color: #7fe9f6; }}
</style></head><body>
  <div class="bg-glow"></div>
  <div class="wrap">
    <div class="hero">
      {logo_html}
      <div class="brandrow"><img src="{ICON}" alt=""><span class="rmark">XGRC<span>&reg;</span></span></div>
      <div class="eyebrow">{tag}</div>
      <h1>{name}</h1>
      <div class="headline">{headline}</div>
      <div class="lede">{lede}</div>
    </div>

    <div class="seclabel">What {name} delivers</div>
    <div class="cards">{cards}</div>

    <div class="seclabel">The challenges it fixes</div>
    <div class="probs">{probs}</div>

    <div class="seclabel">Built for the enterprise</div>
    <div class="stats">{stats_html}</div>
    <div class="stds">{std_html}</div>

    <div class="closing">
      <div class="closing-eyebrow">Part of the XGRC&reg; platform</div>
      <div class="closing-text">{name} runs on one secure, auditable data foundation with risk, compliance and assurance, so it is governed as part of the whole, not in a silo.</div>
    </div>
  </div>

  <div class="footer">
    <img class="flogo" src="{WORDMARK}" alt="XGRC Software">
    <span class="site">www.xgrcsoftware.com</span>
    <span class="tag">Synergy in Assurance, Strength in Compliance&reg;</span>
  </div>
</body></html>"""


def main():
    from weasyprint import HTML
    args = sys.argv[1:]
    slugs = TARGETS if (not args or args == ['--all']) else args
    for slug in slugs:
        if slug not in DATA:
            print(f"skip {slug}: not in solutions.json"); continue
        ver = VERSION.get(slug, DEFAULT_VERSION)
        out = os.path.join(OUTDIR, f'{slug}-infographic-{ver}.pdf')
        HTML(string=build(slug)).write_pdf(out)
        print(f"  {slug:14} -> {os.path.basename(out)} ({os.path.getsize(out)//1024} KB)")


if __name__ == '__main__':
    main()
