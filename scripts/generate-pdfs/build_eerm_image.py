#!/usr/bin/env python3
"""
Generate the hero image for the Extended Enterprise Risk Management article:
a hub-and-spoke network (a core enterprise surrounded by third-party nodes),
in the site's insights style — deep navy, cyan/green nodes, soft glows, a faint
constellation. Drawn at 2x with PIL and downscaled for smooth anti-aliasing.

Run: /opt/www/xrm/xrm-backend/.venv/bin/python3 scripts/generate-pdfs/build_eerm_image.py
"""
import math, os, random
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'public', 'assets', 'images', 'insights', 'extended-enterprise-risk-management.jpg')

S = 2                      # supersample factor
W, H = 1200 * S, 630 * S
CYAN = (48, 226, 244)
GREEN = (47, 232, 138)
random.seed(7)             # deterministic


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


# ---- base: subtle vertical navy gradient ----
img = Image.new('RGB', (W, H))
top, bot = (12, 22, 38), (5, 11, 22)
px = img.load()
for y in range(H):
    row = lerp(top, bot, y / H)
    for x in range(W):
        px[x, y] = row

# ---- soft radial glow behind the hub ----
glow = Image.new('L', (W, H), 0)
gd = ImageDraw.Draw(glow)
cx, cy = int(W * 0.46), int(H * 0.5)
gd.ellipse([cx - 380 * S, cy - 380 * S, cx + 380 * S, cy + 380 * S], fill=70)
glow = glow.filter(ImageFilter.GaussianBlur(180 * S))
tint = Image.new('RGB', (W, H), (18, 90, 120))
img = Image.composite(tint, img, glow)

draw = ImageDraw.Draw(img, 'RGBA')

# ---- faint background constellation (matches the other insights images) ----
for _ in range(46):
    x, y = random.randint(0, W), random.randint(0, H)
    r = random.choice([2, 2, 3]) * S
    col = random.choice([CYAN, GREEN, (120, 150, 175)])
    a = random.randint(30, 90)
    draw.ellipse([x - r, y - r, x + r, y + r], fill=col + (a,))
    if random.random() < 0.4:                       # occasional short link
        x2, y2 = x + random.randint(-70, 70) * S, y + random.randint(-50, 50) * S
        draw.line([x, y, x2, y2], fill=col + (28,), width=S)
        draw.ellipse([x2 - 2 * S, y2 - 2 * S, x2 + 2 * S, y2 + 2 * S], fill=col + (a,))

# ---- the extended-enterprise network: hub + surrounding third-party nodes ----
# (angle deg, distance px @1x, radius px @1x, kind) kind: 'cyan' | 'green' | 'ring'
nodes = [
    (-82, 205, 14, 'cyan'), (-38, 250, 11, 'ring'), (2, 195, 15, 'green'),
    (42, 245, 12, 'cyan'),  (86, 205, 10, 'ring'),  (124, 255, 14, 'cyan'),
    (166, 198, 11, 'green'),(-128, 235, 13, 'ring'),(-165, 210, 10, 'cyan'),
    (200, 150, 8, 'ring'),  (-55, 150, 8, 'ring'),
]

# glow layer for nodes/lines (drawn bright, blurred, screened on top)
gl = Image.new('RGB', (W, H), (0, 0, 0))
gld = ImageDraw.Draw(gl)

pts = []
for ang, dist, r, kind in nodes:
    a = math.radians(ang)
    x = cx + int(math.cos(a) * dist * S)
    y = cy + int(math.sin(a) * dist * S)
    pts.append((x, y, r * S, kind))

# spokes hub -> node
for x, y, r, kind in pts:
    col = GREEN if kind == 'green' else CYAN
    a = 150 if kind == 'green' else 90
    draw.line([cx, cy, x, y], fill=col + (a,), width=max(1, int(1.4 * S)))
    gld.line([cx, cy, x, y], fill=tuple(int(c * 0.35) for c in col), width=max(1, int(1.4 * S)))

# outer nodes
for x, y, r, kind in pts:
    if kind == 'ring':
        draw.ellipse([x - r, y - r, x + r, y + r], outline=(160, 190, 210, 210), width=int(1.6 * S))
        gld.ellipse([x - r, y - r, x + r, y + r], outline=(60, 80, 95))
    else:
        col = GREEN if kind == 'green' else CYAN
        draw.ellipse([x - r, y - r, x + r, y + r], fill=col + (255,))
        gld.ellipse([x - r - 3 * S, y - r - 3 * S, x + r + 3 * S, y + r + 3 * S], fill=col)

# hub (the enterprise) — larger, brightest, with a halo ring
HR = 30 * S
gld.ellipse([cx - HR - 6 * S, cy - HR - 6 * S, cx + HR + 6 * S, cy + HR + 6 * S], fill=CYAN)
draw.ellipse([cx - HR - 12 * S, cy - HR - 12 * S, cx + HR + 12 * S, cy + HR + 12 * S],
             outline=CYAN + (120,), width=int(1.6 * S))
draw.ellipse([cx - HR, cy - HR, cx + HR, cy + HR], fill=CYAN + (255,))
draw.ellipse([cx - HR + 7 * S, cy - HR + 7 * S, cx + HR - 7 * S, cy + HR - 7 * S], fill=(230, 252, 255, 255))

# screen the blurred glow layer over the image for soft bloom
gl = gl.filter(ImageFilter.GaussianBlur(7 * S))
img = Image.blend(img, Image.composite(Image.new('RGB', (W, H), (255, 255, 255)), img,
                  gl.convert('L')), 0.0)  # no-op guard
img = Image.eval(img, lambda v: v)  # keep RGB
# additive screen: img = 255 - (255-img)*(255-glow)/255
from PIL import ImageChops
img = ImageChops.screen(img, gl)

# ---- downscale for anti-aliasing + save ----
img = img.resize((1200, 630), Image.LANCZOS)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, 'JPEG', quality=88, optimize=True)
print(f"Wrote {OUT} ({os.path.getsize(OUT)//1024} KB)")
