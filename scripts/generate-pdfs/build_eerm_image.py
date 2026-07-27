#!/usr/bin/env python3
"""
Hero image for the Extended Enterprise Risk Management article: the supplied
boardroom/handshake photo, graded to the site's cool navy palette, with the
open left side darkened and a cyan hub-and-spoke network overlaid there (a
couple of spokes reach toward the people — the extended enterprise connecting
to real partners). Matches the site's "photo + branded overlay" style.

Source photo recovered from the chat transcript to scratchpad/handshake.png.
Run: /opt/www/xrm/xrm-backend/.venv/bin/python3 scripts/generate-pdfs/build_eerm_image.py
"""
import math, os, random
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.join(os.path.dirname(__file__), "sources", "extended-enterprise-src.png")
OUT = os.path.join(ROOT, 'public', 'assets', 'images', 'insights', 'extended-enterprise-risk-management-v2.jpg')

W, H = 1200, 630
S = 2                       # overlay supersample
CYAN = (48, 226, 244)
GREEN = (47, 232, 138)
random.seed(11)

# ---- photo: cover-crop to 1200x630 ----
im = Image.open(SRC).convert('RGB')
scale = max(W / im.width, H / im.height)
im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
left = (im.width - W) // 2
top = (im.height - H) // 2
im = im.crop((left, top, left + W, top + H))

# ---- cool navy grade (match the site's tone) ----
im = ImageEnhance.Color(im).enhance(0.80)
im = ImageEnhance.Brightness(im).enhance(0.94)
im = ImageEnhance.Contrast(im).enhance(1.03)
im = Image.blend(im, Image.new('RGB', (W, H), (12, 22, 38)), 0.16)

# ---- left-to-right navy gradient (darkens the open left for the overlay) ----
grad = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gpx = grad.load()
for x in range(W):
    a = int(max(0.0, 1 - x / (0.56 * W)) * 220)
    for y in range(H):
        gpx[x, y] = (6, 13, 24, a)
im = Image.alpha_composite(im.convert('RGBA'), grad)

# ---- overlay layer (2x for anti-aliasing) ----
ov = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0))
d = ImageDraw.Draw(ov)
glow = Image.new('RGB', (W * S, H * S), (0, 0, 0))
gd = ImageDraw.Draw(glow)

def P(x, y):
    return (x * S, y * S)

hub = (300, 345)
# left-clustered network nodes (x, y, r, kind)
nodes = [
    (176, 205, 11, 'cyan'), (150, 455, 9, 'ring'), (298, 150, 12, 'green'),
    (438, 280, 10, 'cyan'), (250, 540, 9, 'ring'),  (470, 480, 11, 'cyan'),
    (92, 330, 7, 'ring'),   (395, 405, 8, 'ring'),
]
# spokes that reach toward the people (end near the group, not on faces)
reach = [(700, 360, 7, 'green'), (620, 235, 6, 'cyan')]

# faint constellation over the darkened left
for _ in range(26):
    x, y = random.randint(0, int(W * 0.5)), random.randint(0, H)
    r = random.choice([2, 2, 3])
    col = random.choice([CYAN, GREEN, (150, 175, 195)])
    a = random.randint(28, 70)
    d.ellipse([P(x - r, y - r), P(x + r, y + r)], fill=col + (a,))

def spoke(a, b, col, alpha, w=1.4):
    d.line([P(*a), P(*b)], fill=col + (alpha,), width=max(1, int(w * S)))
    gd.line([P(*a), P(*b)], fill=tuple(int(c * 0.3) for c in col), width=max(1, int(w * S)))

def node(x, y, r, kind):
    if kind == 'ring':
        d.ellipse([P(x - r, y - r), P(x + r, y + r)], outline=(180, 205, 225, 200), width=int(1.6 * S))
    else:
        col = GREEN if kind == 'green' else CYAN
        d.ellipse([P(x - r, y - r), P(x + r, y + r)], fill=col + (255,))
        gd.ellipse([P(x - r - 3, y - r - 3), P(x + r + 3, y + r + 3)], fill=col)

# draw spokes first
for x, y, r, kind in nodes:
    col = GREEN if kind == 'green' else CYAN
    spoke(hub, (x, y), col, 150 if kind == 'green' else 95)
for x, y, r, kind in reach:                   # reaching toward the people, fainter
    spoke(hub, (x, y), (GREEN if kind == 'green' else CYAN), 70, 1.3)
# then nodes
for x, y, r, kind in nodes:
    node(x, y, r, kind)
for x, y, r, kind in reach:
    node(x, y, r, kind)

# hub (the enterprise) — bright with halo
HR = 26
gd.ellipse([P(hub[0] - HR - 6, hub[1] - HR - 6), P(hub[0] + HR + 6, hub[1] + HR + 6)], fill=CYAN)
d.ellipse([P(hub[0] - HR - 11, hub[1] - HR - 11), P(hub[0] + HR + 11, hub[1] + HR + 11)], outline=CYAN + (110,), width=int(1.6 * S))
d.ellipse([P(hub[0] - HR, hub[1] - HR), P(hub[0] + HR, hub[1] + HR)], fill=CYAN + (255,))
d.ellipse([P(hub[0] - HR + 7, hub[1] - HR + 7), P(hub[0] + HR - 7, hub[1] + HR - 7)], fill=(232, 252, 255, 255))

# bloom the glow layer, downscale overlay, composite
glow = glow.filter(ImageFilter.GaussianBlur(6 * S)).resize((W, H), Image.LANCZOS)
ov = ov.resize((W, H), Image.LANCZOS)
im = ImageChops.screen(im.convert('RGB'), glow)
im = Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
im.save(OUT, 'JPEG', quality=86, optimize=True)
print(f"Wrote {OUT} ({os.path.getsize(OUT)//1024} KB)")
