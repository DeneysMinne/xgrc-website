#!/usr/bin/env python3
"""
Build the ERM infographic PDF (A4 portrait, single page) in the modern XGRC
brand style — deep navy, teal→cyan→blue gradients, Outfit/Inter type — to
replace the dated purple recovered infographic.

Content is grounded in solutionDetails.erm (site.js): the risk cycle, the three
module groups, the real stats and lede. No fabricated capability.

Run with the WeasyPrint venv:
  /opt/www/xrm/xrm-backend/.venv/bin/python3 scripts/generate-pdfs/build_erm_infographic.py
"""
import base64, os
from weasyprint import HTML

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
FONTS = os.path.join(os.path.dirname(__file__), 'fonts')
BRAND = os.path.join(ROOT, 'public', 'assets', 'logos', 'brand')
OUT = os.path.join(ROOT, 'public', 'assets', 'infographics', 'erm-infographic-v2.pdf')


def b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode()


def font_face(family, file, weight, style='normal'):
    return (f"@font-face{{font-family:'{family}';font-weight:{weight};font-style:{style};"
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

CYCLE = [
    ('01', 'Identify', 'Register risks and capture events as they emerge'),
    ('02', 'Analyse &amp; Quantify', 'Score likelihood and impact consistently'),
    ('03', 'Assess &amp; Prioritise', 'Rank exposure against defined risk appetite'),
    ('04', 'Monitor &amp; Review', 'Track KRIs, breaches and residual risk'),
]

GROUPS = [
    ('Risk Identification', ['Risk Register', 'Risk Categorisation', 'Emerging Risk Tracking', 'Risk Event Capture']),
    ('Assessment &amp; Appetite', ['Likelihood &amp; Impact Scoring', 'Risk Appetite Thresholds', 'Tolerance Monitoring', 'Heat Map Visualisation']),
    ('Treatment &amp; Action', ['Treatment Plans', 'Action Accountability', 'Escalation &amp; Breach Alerts', 'Residual Risk Tracking']),
]

STATS = [
    ('ISO 31000', '&amp; COSO ERM aligned'),
    ('Real-time', 'Board-level dashboards'),
    ('Full', 'Risk-to-assurance linkage'),
]

CHALLENGES = [
    ('Registers nobody maintains', 'Annual reviews go stale before they are presented, and residual risk is never re-assessed.'),
    ('Appetite set, not enforced', 'The board sets thresholds; operational decisions ignore them, with no breach escalation.'),
    ('KRIs reported in isolation', 'Early-warning indicators sit apart from the risks they monitor, so signals go unnoticed.'),
    ('Risk and assurance apart', 'The audit plan bears no relation to the risk register, so high-risk areas go untested.'),
]

probs_html = ''.join(
    f'''<div class="prob">
          <div class="prob-title">{title}</div>
          <div class="prob-body">{body}</div>
        </div>''' for title, body in CHALLENGES)

cycle_html = ''.join(
    f'''<div class="step">
          <div class="step-num">{n}</div>
          <div class="step-name">{name}</div>
          <div class="step-desc">{desc}</div>
        </div>''' for n, name, desc in CYCLE)

groups_html = ''.join(
    f'''<div class="card">
          <div class="card-head">{title}</div>
          <ul>{''.join(f'<li>{m}</li>' for m in mods)}</ul>
        </div>''' for title, mods in GROUPS)

stats_html = ''.join(
    f'''<div class="stat">
          <div class="stat-val">{v}</div>
          <div class="stat-lbl">{l}</div>
        </div>''' for v, l in STATS)

HTML_DOC = f"""<!doctype html><html><head><meta charset="utf-8"><style>
{FONTS_CSS}
@page {{ size: A4; margin: 0; }}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ font-family: 'Inter', sans-serif; color: #e8f2ff;
  background: #060f1c; width: 210mm; height: 297mm; position: relative; overflow: hidden; }}
.bg-glow {{ position: absolute; top: -140px; right: -160px; width: 620px; height: 620px;
  background: radial-gradient(circle at 50% 50%, rgba(48,226,244,0.20) 0%, rgba(30,111,168,0.10) 40%, transparent 68%);
  z-index: 0; }}
.wrap {{ position: relative; z-index: 1; padding: 30px 34px 0; }}

/* ── Hero ── */
.hero {{ position: relative; padding-bottom: 22px; margin-bottom: 22px;
  border-bottom: 1px solid rgba(255,255,255,0.09); }}
.diamond {{ position: absolute; top: -74px; right: -74px; width: 210px; height: 210px;
  transform: rotate(45deg); border-radius: 34px;
  background: linear-gradient(135deg, #5eeaff 0%, #30e2f4 32%, #1e6fa8 100%);
  box-shadow: 0 20px 60px rgba(48,226,244,0.30); z-index: 0; }}
.diamond-txt {{ position: absolute; top: 34px; right: 30px; z-index: 2;
  font-family: 'Outfit'; font-weight: 700; font-size: 20px; color: #04121d; letter-spacing: 1px; }}
.brandrow {{ display: flex; align-items: center; gap: 9px; margin-bottom: 26px; position: relative; z-index: 2; }}
.brandrow img {{ height: 30px; }}
.brandrow .rmark {{ font-family: 'Outfit'; font-weight: 700; font-size: 15px; letter-spacing: .5px; }}
.brandrow .rmark span {{ color: #30e2f4; }}
.eyebrow {{ font-family: 'JetBrains Mono'; font-size: 9.5px; letter-spacing: 3px; text-transform: uppercase;
  color: #30e2f4; margin-bottom: 10px; position: relative; z-index: 2; }}
h1 {{ font-family: 'Outfit'; font-weight: 700; font-size: 38px; line-height: 1.03;
  letter-spacing: -0.02em; margin-bottom: 12px; max-width: 78%; position: relative; z-index: 2; }}
.headline {{ font-family: 'Outfit'; font-weight: 600; font-size: 15px; color: #7fe9f6;
  margin-bottom: 12px; position: relative; z-index: 2; }}
.lede {{ font-size: 10.5px; line-height: 1.6; color: #9fb3c8; max-width: 92%; position: relative; z-index: 2; }}

/* ── Section label ── */
.seclabel {{ font-family: 'JetBrains Mono'; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
  color: #5a7089; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }}
.seclabel::before {{ content: ''; width: 20px; height: 2px; background: #30e2f4; border-radius: 2px; }}

/* ── Cycle ── */
.cycle {{ display: flex; gap: 10px; margin-bottom: 26px; }}
.step {{ flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
  border-top: 2px solid #30e2f4; border-radius: 12px; padding: 14px 13px 15px; position: relative; }}
.step-num {{ font-family: 'Outfit'; font-weight: 700; font-size: 30px; line-height: 1;
  color: rgba(48,226,244,0.22); margin-bottom: 7px; }}
.step-name {{ font-family: 'Outfit'; font-weight: 600; font-size: 12.5px; color: #e8f2ff; margin-bottom: 5px; }}
.step-desc {{ font-size: 8.8px; line-height: 1.45; color: #8ba3ba; }}

/* ── Capability cards ── */
.cards {{ display: flex; gap: 12px; margin-bottom: 26px; }}
.card {{ flex: 1; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px; overflow: hidden; }}
.card-head {{ font-family: 'Outfit'; font-weight: 700; font-size: 12.5px; color: #04121d;
  padding: 11px 15px; background: linear-gradient(120deg, #8bf2ff, #30e2f4 55%, #22c3e0); }}
.card ul {{ list-style: none; padding: 13px 15px 15px; }}
.card li {{ font-size: 10px; color: #c3d3e4; padding: 5px 0 5px 16px; position: relative; line-height: 1.35; }}
.card li::before {{ content: ''; position: absolute; left: 0; top: 9px; width: 6px; height: 6px;
  border-radius: 50%; background: #30e2f4; box-shadow: 0 0 6px rgba(48,226,244,0.7); }}

/* ── Stats ── */
.stats {{ display: flex; gap: 12px; margin-bottom: 24px; }}
.stat {{ flex: 1; background: linear-gradient(150deg, rgba(48,226,244,0.10), rgba(30,111,168,0.05));
  border: 1px solid rgba(48,226,244,0.22); border-radius: 12px; padding: 15px 16px; }}
.stat-val {{ font-family: 'Outfit'; font-weight: 700; font-size: 22px; color: #30e2f4; line-height: 1; margin-bottom: 6px; }}
.stat-lbl {{ font-size: 9.5px; color: #9fb3c8; letter-spacing: .3px; }}

/* ── Problems it solves ── */
.probs {{ display: flex; gap: 12px; margin-bottom: 24px; }}
.prob {{ flex: 1; padding-left: 13px; border-left: 2px solid rgba(48,226,244,0.55); }}
.prob-title {{ font-family: 'Outfit'; font-weight: 600; font-size: 11px; color: #e8f2ff; margin-bottom: 6px; line-height: 1.2; }}
.prob-body {{ font-size: 9px; line-height: 1.5; color: #8ba3ba; }}

/* ── Closing platform band ── */
.closing {{ background: linear-gradient(120deg, rgba(48,226,244,0.12), rgba(30,111,168,0.05));
  border: 1px solid rgba(48,226,244,0.22); border-radius: 14px; padding: 20px 24px; }}
.closing-eyebrow {{ font-family: 'JetBrains Mono'; font-size: 9px; letter-spacing: 2.5px;
  text-transform: uppercase; color: #30e2f4; margin-bottom: 9px; }}
.closing-text {{ font-family: 'Outfit'; font-weight: 600; font-size: 14px; line-height: 1.45; color: #e8f2ff; }}

/* ── Footer ── */
.footer {{ position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 34px 20px;
  border-top: 1px solid rgba(255,255,255,0.09);
  display: flex; align-items: center; justify-content: space-between; }}
.footer .flogo {{ height: 26px; opacity: 0.92; }}
.footer .site {{ font-family: 'JetBrains Mono'; font-size: 9.5px; color: #6f8599; letter-spacing: .5px; }}
.footer .tag {{ font-family: 'Outfit'; font-weight: 600; font-size: 10.5px; color: #7fe9f6; }}
</style></head><body>
  <div class="bg-glow"></div>
  <div class="wrap">
    <div class="hero">
      <div class="diamond"></div><div class="diamond-txt">ERM</div>
      <div class="brandrow">
        <img src="{ICON}" alt=""><span class="rmark">XGRC<span>&reg;</span></span>
      </div>
      <div class="eyebrow">Enterprise Risk Intelligence</div>
      <h1>Enterprise Risk Management</h1>
      <div class="headline">Risk managed at enterprise scale, not spreadsheet scale.</div>
      <div class="lede">A structured, auditable approach to enterprise, operational and project risk, aligned to ISO 31000 and COSO ERM, with board-level dashboards, risk appetite monitoring and corrective action tracking built in.</div>
    </div>

    <div class="seclabel">A continuous risk cycle &middot; aligned to ISO 31000</div>
    <div class="cycle">{cycle_html}</div>

    <div class="seclabel">What XGRC&reg; ERM delivers</div>
    <div class="cards">{groups_html}</div>

    <div class="seclabel">The risk-management failures it fixes</div>
    <div class="probs">{probs_html}</div>

    <div class="seclabel">Built for the enterprise</div>
    <div class="stats">{stats_html}</div>

    <div class="closing">
      <div class="closing-eyebrow">Part of the XGRC&reg; platform</div>
      <div class="closing-text">Enterprise risk connects to compliance, audit and assurance on one secure, auditable data foundation, so risk is governed as part of the whole, not in a silo.</div>
    </div>
  </div>

  <div class="footer">
    <img class="flogo" src="{WORDMARK}" alt="XGRC Software">
    <span class="site">www.xgrcsoftware.com</span>
    <span class="tag">Synergy in Assurance, Strength in Compliance&reg;</span>
  </div>
</body></html>"""

HTML(string=HTML_DOC).write_pdf(OUT)
print(f"Wrote {OUT} ({os.path.getsize(OUT)//1024} KB)")
