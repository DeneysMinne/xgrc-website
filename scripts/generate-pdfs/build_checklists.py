"""
XGRC® Checklist PDF builder — generic, data-driven.

Reads every *.json file in src/content/checklists/, generates a matching
branded PDF (white background, 2-page layout) into public/resources/, and
writes standard PDF metadata (brief section 15).

Usage (from repo root):
  scripts/generate-pdfs/.venv/bin/python3 scripts/generate-pdfs/build_checklists.py
  scripts/generate-pdfs/.venv/bin/python3 scripts/generate-pdfs/build_checklists.py internal-audit-checklist   # single file

Setup (one-time):
  python3 -m venv scripts/generate-pdfs/.venv
  scripts/generate-pdfs/.venv/bin/pip install reportlab pypdf fonttools
See docs/add-new-use-case.md for the full workflow.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (Spacer, Table, TableStyle, Paragraph,
                                  NextPageTemplate, KeepTogether,
                                  BaseDocTemplate, PageTemplate, Frame)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import io, os, sys, json, glob

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT  = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
LOGO_PATH  = os.path.join(REPO_ROOT, 'public', 'assets', 'xgrc-logo-header.png')
FONT_DIR   = os.path.join(SCRIPT_DIR, 'fonts')
CONTENT_DIR = os.path.join(REPO_ROOT, 'src', 'content', 'checklists')
OUTPUT_DIR  = os.path.join(REPO_ROOT, 'public', 'resources')

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

HEADER_H = 64   # keep header compact
FOOTER_H = 24
SUBHDR_H = 34

_fonts_registered = False
def ensure_fonts():
    global _fonts_registered
    if _fonts_registered:
        return
    needed = {
        'XOutfit':   'Outfit-Regular.ttf',
        'XOutfitSB': 'Outfit-SemiBold.ttf',
        'XOutfitB':  'Outfit-Bold.ttf',
        'XInter':    'Inter-Regular.ttf',
        'XInterSB':  'Inter-SemiBold.ttf',
        'XMono':     'JetBrainsMono-Regular.ttf',
    }
    for name, fname in needed.items():
        path = os.path.join(FONT_DIR, fname)
        if os.path.exists(path):
            try:
                pdfmetrics.registerFont(TTFont(name, path))
            except Exception as e:
                print(f'  WARN font {name}: {e}')
        else:
            print(f'  WARN missing font file: {path}')
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
    c.drawString(15*mm, fy, f'{doc.xgrc_version}  \xb7  Classification: {doc.xgrc_classification}')
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
    c.drawCentredString(bx + bw/2, by + 4.5, doc.xgrc_version)
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
        ('TOPPADDING',    (0,0),(-1,-1), 5),
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
    out     = cfg['out']
    title   = cfg['title']
    version = cfg.get('version', 'v1.0')
    inner_w = W - 30*mm

    sTitleStyle = PS('dt', fontName='XOutfitB',  fontSize=22, textColor=DARK_TEXT, leading=27, spaceAfter=3)
    sSubTitle   = PS('ds', fontName='XInter',    fontSize=9.5, textColor=MUTED,   leading=14, spaceAfter=5)

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
    doc.xgrc_version = version
    doc.xgrc_classification = cfg.get('classification', 'Public')

    story = []
    story.append(Paragraph(title, sTitleStyle))
    story.append(Paragraph(cfg.get('subtitle', ''), sSubTitle))
    story += iso_tags_row(cfg.get('iso_tags', []))
    story += intro_box(cfg.get('intro', ''))
    # Any page after page 1 (whether reached by natural overflow or an explicit
    # break) should use the compact continuation header, not the hero header.
    # Queuing NextPageTemplate once, before any section, makes this robust to
    # variable section lengths instead of guessing a manual page_break_after.
    story.append(NextPageTemplate('pn'))
    for letter, sec_title, items in cfg['sections']:
        story.append(KeepTogether(section_block(letter, sec_title, items)))
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


def load_checklist(path):
    with open(path) as f:
        data = json.load(f)
    slug = data['slug']
    version = data.get('version', 'v1.0')
    version_suffix = version.replace('.', '-').replace('v', 'v')
    out_filename = data.get('pdfFilename', f"xgrc-{slug}-{version_suffix}.pdf")
    out_path = os.path.join(OUTPUT_DIR, out_filename)

    sections = [(s['letter'], s['title'], s['items']) for s in data['sections']]

    keywords = data.get('keywords') or ', '.join(data.get('isoTags', []) + ['XGRC', 'XGRC Software'])

    return {
        'out': out_path,
        'title': data['title'],
        'subtitle': data.get('subtitle', ''),
        'iso_tags': data.get('isoTags', []),
        'intro': data.get('intro', ''),
        'page_break_after': data.get('pageBreakAfter', ''),
        'sections': sections,
        'version': version,
        'classification': data.get('classification', 'Public'),
        'metadata': {
            '/Title':    f"{data['title']} | XGRC\xae Software",
            '/Author':   data.get('author', 'XGRC\xae Software'),
            '/Subject':  data.get('subject', data.get('subtitle', '')),
            '/Keywords': keywords,
            '/Creator':  'XGRC\xae Website Content Engine',
            '/Producer': 'XGRC\xae Software',
            '/Company':  'XGRC\xae Software, a Strategix product',
        },
    }


def main():
    only = sys.argv[1:]
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    files = sorted(glob.glob(os.path.join(CONTENT_DIR, '*.json')))
    if only:
        files = [f for f in files if os.path.splitext(os.path.basename(f))[0] in only]
    if not files:
        print('No checklist JSON files found.')
        return
    for path in files:
        cfg = load_checklist(path)
        build_checklist(cfg)
    print(f'\nDone. {len(files)} checklist(s) processed.')


if __name__ == '__main__':
    main()
