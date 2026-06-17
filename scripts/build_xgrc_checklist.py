"""
XGRC® Checklist PDF builder — white background, 2-page layout matching reference.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (Spacer, Table, TableStyle, Paragraph,
                                  PageBreak, BaseDocTemplate,
                                  PageTemplate, Frame)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import io, os

NAVY       = colors.HexColor('#060f1c')
CYAN       = colors.HexColor('#30e2f4')
BLUE       = colors.HexColor('#269ec6')
WHITE      = colors.HexColor('#ffffff')
DARK_TEXT  = colors.HexColor('#1a2535')
MUTED      = colors.HexColor('#4a6070')
LIGHT_CYAN = colors.HexColor('#e8f8fc')
RULE_LINE  = colors.HexColor('#d0dfe8')
FOOTER_CLR = colors.HexColor('#7a8a98')

W, H = A4

LOGO_PATH = '/Users/deneysminne/Downloads/xgrc-website 2/public/assets/xgrc-logo-header.png'
FONT_DIR  = '/tmp/xgrc-fonts'

HEADER_H = 64   # keep header compact
FOOTER_H = 24
SUBHDR_H = 34

_fonts_registered = False
def ensure_fonts():
    global _fonts_registered
    if _fonts_registered:
        return
    needed = {
        'XOutfit':   'outfit-400.ttf',
        'XOutfitSB': 'outfit-600.ttf',
        'XOutfitB':  'outfit-700.ttf',
        'XInter':    'inter-400.ttf',
        'XInterSB':  'inter-600.ttf',
        'XMono':     'jetbrains-400.ttf',
    }
    for name, fname in needed.items():
        path = os.path.join(FONT_DIR, fname)
        if os.path.exists(path):
            try:
                pdfmetrics.registerFont(TTFont(name, path))
            except Exception as e:
                print(f'  WARN font {name}: {e}')
    _fonts_registered = True

def PS(name, **kw):
    d = dict(fontName='XInter', fontSize=9, leading=13,
             textColor=DARK_TEXT, spaceAfter=0, spaceBefore=0)
    d.update(kw)
    return ParagraphStyle(name, **d)

def _draw_footer(c, doc):
    fy = 8
    c.setFont('XMono', 7)
    c.setFillColor(FOOTER_CLR)
    c.drawString(15*mm, fy, 'v1.0  \xb7  Classification: Public')
    c.drawCentredString(W/2, fy, 'XGRC\xae Software  \xb7  Driving Compliance\xae')
    c.drawRightString(W - 15*mm, fy, f'Page {doc.page}')
    c.setStrokeColor(RULE_LINE)
    c.setLineWidth(0.5)
    c.line(15*mm, fy + 10, W - 15*mm, fy + 10)

def _draw_page1(c, doc, title):
    c.saveState()
    c.setFillColor(WHITE); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(NAVY);  c.rect(0, H - HEADER_H, W, HEADER_H, fill=1, stroke=0)
    c.setFillColor(CYAN);  c.rect(0, H - 2, W, 2, fill=1, stroke=0)
    if os.path.exists(LOGO_PATH):
        logo_h = 34
        logo_w = min(logo_h * (565 / 168), 140)
        c.drawImage(LOGO_PATH,
                    15*mm, H - HEADER_H + (HEADER_H - logo_h) / 2,
                    width=logo_w, height=logo_h,
                    preserveAspectRatio=True, mask='auto')
    bw, bh, br = 30, 16, 4
    bx = W - 15*mm - bw
    by = H - HEADER_H + (HEADER_H - bh) / 2
    c.setFillColor(BLUE)
    c.roundRect(bx, by, bw, bh, br, fill=1, stroke=0)
    c.setFont('XMono', 7.5); c.setFillColor(WHITE)
    c.drawCentredString(bx + bw/2, by + 4.5, 'v1.0')
    _draw_footer(c, doc)
    c.restoreState()

def _draw_page_n(c, doc, title):
    c.saveState()
    c.setFillColor(WHITE); c.rect(0, 0, W, H, fill=1, stroke=0)
    if os.path.exists(LOGO_PATH):
        logo_h = 21
        logo_w = logo_h * (565 / 168)
        c.drawImage(LOGO_PATH,
                    15*mm, H - SUBHDR_H + (SUBHDR_H - logo_h) / 2,
                    width=logo_w, height=logo_h,
                    preserveAspectRatio=True, mask='auto')
    c.setFont('XOutfitSB', 10); c.setFillColor(MUTED)
    c.drawRightString(W - 15*mm, H - SUBHDR_H + (SUBHDR_H - 10) / 2 + 2, title)
    c.setFillColor(BLUE); c.rect(0, H - SUBHDR_H - 2,   W, 2.5, fill=1, stroke=0)
    c.setFillColor(CYAN); c.rect(0, H - SUBHDR_H - 4.5, W, 2,   fill=1, stroke=0)
    _draw_footer(c, doc)
    c.restoreState()

def section_block(letter, title, items):
    ensure_fonts()
    inner_w = W - 30*mm
    sTitle = PS('sT', fontName='XOutfitSB', fontSize=11.5, textColor=DARK_TEXT, leading=14)
    sItem  = PS('sI', fontName='XInter',    fontSize=9.5, textColor=DARK_TEXT, leading=13)
    sCB    = PS('sC', fontName='XInter',    fontSize=12, textColor=BLUE, leading=13, alignment=TA_CENTER)
    badge_size = 16
    badge = Table(
        [[Paragraph(letter, PS('bl', fontName='XMono', fontSize=8,
                               textColor=WHITE, leading=10, alignment=TA_CENTER))]],
        colWidths=[badge_size], rowHeights=[badge_size])
    badge.setStyle(TableStyle([
        ('BACKGROUND',    (0,0),(0,0), CYAN),
        ('ALIGN',         (0,0),(0,0), 'CENTER'),
        ('VALIGN',        (0,0),(0,0), 'MIDDLE'),
        ('TOPPADDING',    (0,0),(0,0), 3),
        ('BOTTOMPADDING', (0,0),(0,0), 0),
        ('LEFTPADDING',   (0,0),(0,0), 0),
        ('RIGHTPADDING',  (0,0),(0,0), 0),
    ]))
    gap = 5*mm
    hdr = Table([[badge, Paragraph(title, sTitle)]],
                colWidths=[badge_size + gap, inner_w - badge_size - gap])
    hdr.setStyle(TableStyle([
        ('VALIGN',        (0,0),(-1,-1), 'MIDDLE'),
        ('LEFTPADDING',   (0,0),(0,0), 0),
        ('LEFTPADDING',   (1,0),(1,0), 3),
        ('TOPPADDING',    (0,0),(-1,-1), 0),
        ('BOTTOMPADDING', (0,0),(-1,-1), 5),
        ('RIGHTPADDING',  (0,0),(-1,-1), 0),
    ]))
    rows = [[Paragraph('□', sCB), Paragraph(it, sItem)] for it in items]
    tbl  = Table(rows, colWidths=[7*mm, inner_w - 7*mm])
    tbl.setStyle(TableStyle([
        ('VALIGN',        (0,0),(-1,-1), 'MIDDLE'),
        ('LEFTPADDING',   (0,0),(0,-1), 2),
        ('LEFTPADDING',   (1,0),(1,-1), 5),
        ('RIGHTPADDING',  (0,0),(-1,-1), 4),
        ('TOPPADDING',    (0,0),(-1,-1), 5),   # tighter padding
        ('BOTTOMPADDING', (0,0),(-1,-1), 5),
        ('LINEBELOW',     (0,0),(-1,-2), 0.4, RULE_LINE),
    ]))
    sep = Table([['']], colWidths=[inner_w], rowHeights=[1])
    sep.setStyle(TableStyle([
        ('LINEABOVE',     (0,0),(0,0), 0.8, RULE_LINE),
        ('TOPPADDING',    (0,0),(0,0), 0),
        ('BOTTOMPADDING', (0,0),(0,0), 0),
    ]))
    return [hdr, tbl, Spacer(1, 2*mm), sep, Spacer(1, 3*mm)]

def intro_box(text):
    ensure_fonts()
    inner_w = W - 30*mm
    sI = PS('intro', fontName='XInter', fontSize=9, textColor=DARK_TEXT, leading=13)
    t = Table([[Paragraph(text, sI)]], colWidths=[inner_w])
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0,0),(0,0), LIGHT_CYAN),
        ('LINEABOVE',     (0,0),(0,0), 2.5, BLUE),
        ('TOPPADDING',    (0,0),(0,0), 9),
        ('BOTTOMPADDING', (0,0),(0,0), 9),
        ('LEFTPADDING',   (0,0),(0,0), 12),
        ('RIGHTPADDING',  (0,0),(0,0), 12),
    ]))
    return [t, Spacer(1, 5*mm)]

def iso_tags_row(tags):
    ensure_fonts()
    sTag = PS('tag', fontName='XMono', fontSize=8, textColor=CYAN, leading=10)
    return [Paragraph('  \xb7  '.join(tags), sTag), Spacer(1, 4*mm)]

def legal_block():
    ensure_fonts()
    sL = PS('legal', fontName='XMono', fontSize=7, textColor=MUTED, leading=10)
    text = ('\xa9 XGRC\xae Software, a Strategix product. '
            'Strategix Application Solutions (Pty) Ltd, Reg No. 2015/192960/07. '
            'ISO 27001:2022 certified. info@xgrcsoftware.com')
    return [Spacer(1, 8*mm), Paragraph(text, sL)]

def build_checklist(cfg):
    ensure_fonts()
    out   = cfg['out']
    title = cfg['title']
    inner_w = W - 30*mm

    sTitleStyle = PS('dt', fontName='XOutfitB',  fontSize=22, textColor=DARK_TEXT, leading=27, spaceAfter=3)
    sSubTitle   = PS('ds', fontName='XInter',    fontSize=9.5, textColor=MUTED,   leading=14, spaceAfter=5)

    # Frame heights calculated to fit A-D on page 1, E-G+legal on page 2
    f1_h = H - HEADER_H - FOOTER_H - 14
    f2_h = H - SUBHDR_H - 6 - FOOTER_H - 14

    f1 = Frame(15*mm, FOOTER_H + 6, inner_w, f1_h,
               leftPadding=0, rightPadding=0, topPadding=8, bottomPadding=0)
    f2 = Frame(15*mm, FOOTER_H + 6, inner_w, f2_h,
               leftPadding=0, rightPadding=0, topPadding=8, bottomPadding=0)

    t1 = PageTemplate(id='p1', frames=[f1],
                      onPage=lambda c, d: _draw_page1(c, d, title))
    t2 = PageTemplate(id='pn', frames=[f2],
                      onPage=lambda c, d: _draw_page_n(c, d, title))

    doc = BaseDocTemplate(out, pagesize=A4,
                          pageTemplates=[t1, t2],
                          leftMargin=15*mm, rightMargin=15*mm,
                          topMargin=HEADER_H + 10, bottomMargin=FOOTER_H + 6)

    story = []
    story.append(Paragraph(title, sTitleStyle))
    story.append(Paragraph(cfg.get('subtitle', ''), sSubTitle))
    story += iso_tags_row(cfg.get('iso_tags', []))
    story += intro_box(cfg.get('intro', ''))
    pb_after = cfg.get('page_break_after', '')
    for letter, sec_title, items in cfg['sections']:
        story += section_block(letter, sec_title, items)
        if letter == pb_after:
            story.append(PageBreak())
    story += legal_block()
    doc.build(story)

    import pypdf
    r = pypdf.PdfReader(out)
    w = pypdf.PdfWriter()
    for page in r.pages:
        w.add_page(page)
    w.add_metadata(cfg['metadata'])
    buf = io.BytesIO()
    w.write(buf)
    with open(out, 'wb') as f:
        f.write(buf.getvalue())
    print(f'Built {len(r.pages)} pages: {out}')


# ── SHEQX Safety Management ────────────────────────────────────
build_checklist({
    'out': '/Users/deneysminne/Downloads/xgrc-website 2/public/Safety-Management-Checklist-SHEQX-v1.0.pdf',
    'title':    'Safety Management Checklist',
    'subtitle': 'ISO-aligned safety management process, from incident capture to continuous improvement',
    'iso_tags': ['ISO 45001', 'ISO 14001', 'ISO 9001'],
    'intro': (
        'Use this checklist to run a structured safety management process end to end. '
        'It mirrors the SHEQX\xae safety lifecycle, covering incident management, '
        'inspections, hazard identification, corrective actions and performance monitoring. '
        'Tick each item as you complete it.'
    ),
    'page_break_after': 'D',
    'sections': [
        ('A', 'Incident Management', [
            'Capture incidents and near misses',
            'Record incident details and evidence',
            'Classify incidents by type and severity',
            'Investigate root causes',
        ]),
        ('B', 'Inspections', [
            'Conduct routine inspections',
            'Use structured inspection checklists',
            'Record findings and observations',
            'Capture supporting evidence',
        ]),
        ('C', 'Hazard Identification', [
            'Identify hazards in the workplace',
            'Assess associated risks',
            'Record hazards in a central register',
            'Review hazards regularly',
        ]),
        ('D', 'Corrective Actions', [
            'Define corrective and preventive actions',
            'Assign responsible owners',
            'Set target dates',
            'Track progress to closure',
        ]),
        ('E', 'Monitoring and Performance', [
            'Monitor safety performance indicators',
            'Track incidents and trends over time',
            'Review inspection outcomes',
            'Identify recurring issues',
        ]),
        ('F', 'Reporting', [
            'Generate safety reports',
            'Provide management dashboards',
            'Report on compliance status',
            'Highlight high-risk areas',
        ]),
        ('G', 'Continuous Improvement', [
            'Identify improvement opportunities',
            'Implement changes',
            'Review effectiveness of changes',
            'Update safety processes',
        ]),
    ],
    'metadata': {
        '/Title':    'Safety Management Checklist (ISO-aligned) | XGRC\xae Software',
        '/Author':   'XGRC\xae Software',
        '/Subject':  'ISO-aligned safety management checklist for the SHEQX\xae module of the XGRC\xae GRC platform',
        '/Keywords': ('safety management, SHEQX, incident management, inspections, hazard identification, '
                      'corrective actions, ISO 45001, ISO 14001, ISO 9001, GRC, governance risk compliance, '
                      'XGRC, XGRC Software, occupational health and safety, OHS'),
        '/Creator':  'XGRC\xae Software',
        '/Producer': 'XGRC\xae Software',
        '/Company':  'XGRC\xae Software, a Strategix product',
    },
})

# ── ESG Reporting ──────────────────────────────────────────────
build_checklist({
    'out': '/Users/deneysminne/Downloads/xgrc-website 2/public/ESG-Reporting-Checklist-XGRC-v1.0.pdf',
    'title':    'ESG Reporting Checklist',
    'subtitle': 'Framework-aligned ESG process, from data collection to disclosure and reporting',
    'iso_tags': ['GRI Standards', 'IFRS Sustainability', 'ISO 14001', 'ISO 45001', 'ISO 26000'],
    'intro': (
        'Use this checklist to run a structured ESG reporting process end to end. '
        'It mirrors the XGRC\xae ESG lifecycle, covering data collection, governance, '
        'environmental and social metrics, reporting and assurance. '
        'Tick each item as you complete it.'
    ),
    'page_break_after': 'D',
    'sections': [
        ('A', 'Governance and Oversight', [
            'Define ESG governance structure',
            'Assign ESG responsibilities and ownership',
            'Establish ESG policies and commitments',
            'Integrate ESG into risk management',
        ]),
        ('B', 'Data Collection', [
            'Identify relevant ESG metrics and indicators',
            'Define data sources and collection methods',
            'Collect environmental data (emissions, energy, water, waste)',
            'Collect social data (workforce, safety, community)',
        ]),
        ('C', 'Environmental Performance', [
            'Measure and record GHG emissions (Scope 1, 2, 3)',
            'Track energy consumption and intensity',
            'Monitor water usage and recycling',
            'Record waste generation and disposal',
        ]),
        ('D', 'Social Performance', [
            'Track workforce diversity and inclusion metrics',
            'Record safety incidents and lost-time rates',
            'Monitor employee training and development',
            'Document community engagement activities',
        ]),
        ('E', 'Reporting and Disclosure', [
            'Map disclosures to GRI, IFRS S1/S2 or applicable framework',
            'Prepare ESG report content and narrative',
            'Review and approve ESG disclosures',
            'Publish and distribute ESG report',
        ]),
        ('F', 'Assurance and Verification', [
            'Identify data requiring third-party assurance',
            'Engage assurance provider',
            'Address findings and restate data if required',
            'Document assurance conclusion',
        ]),
        ('G', 'Continuous Improvement', [
            'Review ESG performance against targets',
            'Identify gaps and improvement actions',
            'Update ESG targets for next reporting period',
            'Embed learnings into the ESG process',
        ]),
    ],
    'metadata': {
        '/Title':    'ESG Reporting Checklist (Framework-aligned) | XGRC\xae Software',
        '/Author':   'XGRC\xae Software',
        '/Subject':  'Framework-aligned ESG reporting checklist for the XGRC\xae GRC platform',
        '/Keywords': ('ESG reporting, sustainability, GRI, IFRS Sustainability, IFRS S1, IFRS S2, '
                      'ISO 14001, ISO 45001, ISO 26000, environmental social governance, '
                      'carbon emissions, GHG, Scope 1 Scope 2 Scope 3, XGRC, XGRC Software'),
        '/Creator':  'XGRC\xae Software',
        '/Producer': 'XGRC\xae Software',
        '/Company':  'XGRC\xae Software, a Strategix product',
    },
})

print('All PDFs built successfully.')
