"""Dry-type range drawings: a 3D (isometric) model plus schematics for every product page.

Each scene: (title, drawing code, legend for the numbered balloons, views).
Numbers on the drawings are illustrative labels, not ratings.
"""
import math

import products_art as pa
from draw2d import Dwg, _base, _floor, _brk, INK, THIN, BLUE
from iso import shade
from capability_art import arrow, ground, coil, block
from resources_art import harmonic_wave, spectrum, reactor as reactor_ga, _poly, _formula

ACC = BLUE
STEEL = "#7D8DA7"
COIL = "#2F6FD6"
CU = "#C27A3A"
PAPER = "#FAF8F2"


class DW(Dwg):
    """Dwg whose text also counts its width toward the viewBox (labels never clip)."""
    def text(self, x, y, s, size=9, anchor="middle", **kw):
        w = len(str(s)) * size * .64
        x0 = x - w / 2 if anchor == "middle" else (x - w if anchor == "end" else x)
        self._b(x0, y - size); self._b(x0 + w, y)
        super().text(x, y, s, size, anchor, **kw)


def steel_box(s, x, y, z, w, d, h):
    return s.box(x, y, z, w, d, h, top=STEEL, front=shade(STEEL, .85), side=shade(STEEL, .7))


# ═════════════════════════════════════════════════════════ 3D building blocks
def core_coil(s, ox, oy, z=0, pitch=46, r=18, h=96, bands=6, legs=3, yoke=16):
    """Core-type core with round coils on each leg. Returns geometry for detailing."""
    W = pitch * (legs - 1) + 2 * r + 12
    cy = oy + r
    steel_box(s, ox, cy - 7, z, W, 14, yoke)
    cx = [ox + r + 6 + k * pitch for k in range(legs)]
    for x in cx:
        s.vcyl(x, cy, z + yoke, h, r, fill=COIL, bands=bands)
        s.top_ellipse(x, cy, z + yoke + h, r * .6, "#9AA8BE")
    steel_box(s, ox, cy - 7, z + yoke + h + 2, W, 14, yoke)
    return dict(W=W, cx=cx, cy=cy, r=r, z0=z + yoke, z1=z + yoke + h, top=z + 2 * yoke + h + 2)


def skid(s, ox, oy, w, d, z=0, h=8):
    s.box(ox, oy, z, w, 10, h, top="#5B6E8F", front="#46597A", side="#384A69")
    s.box(ox, oy + d - 10, z, w, 10, h, top="#5B6E8F", front="#46597A", side="#384A69")


def lifted_core(s, ox, oy, variant):
    """Core and coil assembly shown lifted out beside its enclosure."""
    skid(s, ox - 4, oy - 2, 150, 40)
    g = core_coil(s, ox, oy, 8, pitch=46, r=18, h=96)
    cy, top = g["cy"], g["top"]
    # front clamp across the top yoke
    clamp = s.box(ox, cy + 7, top - 12, g["W"], 3, 10, top="#C6CFDC", front="#AEBBCD", side="#97A6BB", sw=.6)
    calls = []
    if variant in ("gp", "shield", "kfactor", "drive", "auto"):
        for k, x in enumerate(g["cx"]):
            s.box(x - 6, cy + 18, 60, 12, 3, 12, top="#EEE", front="#D6D6D6", side="#BBB", sw=.4)   # tap links
        calls.append((s.P(g["cx"][0], cy + 21, 70), (-44, 34)))
    if variant == "shield":
        for x in g["cx"]:
            s.top_ellipse(x, cy, g["z1"] + .5, g["r"] * .82, "none", stroke=ACC, sw=.9)
        s.line(s.P(g["cx"][2] + 14, cy, g["z1"]), s.P(g["cx"][2] + 34, cy + 20, 8), ACC, .8)
        calls.append((s.P(g["cx"][1] + 12, cy, g["z1"]), (34, -40)))
    if variant == "drive":
        for x in (ox + 2, ox + g["W"] - 4):
            s.box(x, cy + 7, 24, 2, 2, top - 36, sw=.5)              # tie rods
        calls.append((s.P(ox + g["W"] - 3, cy + 9, 60), (46, -6)))
    if variant == "kfactor":
        nb = s.box(ox + g["W"] + 6, cy - 4, 20, 10, 8, top - 30, top=shade(CU, 1.2), front=CU, side=shade(CU, .8))
        calls.append((s.fpt(nb, 5, top - 50), (44, -16)))
    if variant == "hmt":
        for k in range(2):
            b = s.box(ox + 10 + k * 70, cy - 4, top, 46, 8, 8, top="#EEE", front="#D6D6D6", side="#BBB", sw=.5)
            for t in range(4):
                s.fcircle(b, 6 + t * 11, 4, 2, "#fff", face="f", sw=.4)
        calls.append((s.P(ox + 33, cy, top + 8), (-30, -34)))
        calls.append((s.P(ox + 103, cy, top + 8), (36, -34)))
    if variant == "auto":
        for x in g["cx"]:
            for k in range(3):
                s.vcyl(x + 8, cy + 14 + k, 40 + k * 22, 3, 3, fill=CU)
        calls.append((s.P(g["cx"][2] + 8, cy + 16, 62), (48, -10)))
    calls.insert(0, (s.P(g["cx"][1], cy + 18, 40), (10, 70)))   # coil
    return g, clamp, calls


def ventilated_scene(variant):
    def fn(s):
        pa.draw_dry_enclosure(s, 0, 0, False)
        s.callout(s.P(60, 80, 125), 1, -50, -30)                    # louvred enclosure
        _, _, calls = lifted_core(s, 170, -16, variant)
        for i, (pt, (dx, dy)) in enumerate(calls):
            s.callout(pt, i + 2, dx, dy)
    return fn


def sealed_box(s, ox, oy, w=96, d=60, h=110, z=34, conduits=False):
    for u in (12, w - 20):
        s.box(ox + u, oy - 5, z - 18, 8, 5, h + 34, sw=.6)               # wall brackets
    if conduits:
        for k in range(3):
            s.vcyl(ox + 22 + k * 24, oy + 30, 0, z - 22, 4.5, fill="#A7B4C6")
            s.vcyl(ox + 22 + k * 24, oy + 30, z - 34, 9, 6.5, fill="#C9D3E0")   # seal fittings
    wb = s.box(ox + 8, oy + 8, z - 22, w - 16, d - 14, 22)
    b = s.box(ox, oy, z, w, d, h)
    s.box(ox - 3, oy - 3, z + h, w + 6, d + 6, 4)
    for k in range(3):
        s.fcircle(wb, 14 + k * 26, 11, 4.2, "#fff", sw=.5)
    return b, wb


def encap_scene(kind):
    def fn(s):
        if kind == "mpc":
            for u in (12, 76):
                s.box(u, -5, 2, 8, 5, 214, sw=.6)
            b = s.box(0, 0, 10, 96, 56, 200)
            s.box(-3, -3, 210, 102, 62, 4)
            s.fline(b, 0, 104, 96, 104)                                # partition
            s.frect(b, 26, 150, 70, 168, "#fff", sw=.5)                # nameplate
            s.frect(b, 26, 162, 70, 168, BLUE, sw=.2)
            s.frect(b, 8, 8, 88, 98, "#E4EAF2")                        # loadcentre door
            for r in range(5):
                for c in range(2):
                    s.frect(b, 22 + c * 30, 20 + r * 12, 44 + c * 30, 28 + r * 12, "#fff", sw=.45)
            s.frect(b, 38, 86, 58, 96, "#2A3A5E", sw=.5)               # main breaker
            s.frect(b, 82, 40, 85, 64, "#2A3A5E", sw=.4)               # latch
            s.callout(s.fpt(b, 48, 150), 1, -60, -26)
            s.callout(s.fpt(b, 48, 91), 2, -70, 10)
            s.callout(s.fpt(b, 33, 44), 3, -64, 30)
            s.callout(s.P(80, -2, 200), 4, 50, -20)
            s.dim_z(96, 0, 10, 210, "wall-mount", off=26)
            return
        b, wb = sealed_box(s, 0, 0, conduits=(kind == "hazloc"))
        s.frect(b, 26, 70, 70, 88, "#fff", sw=.5)
        s.frect(b, 26, 82, 70, 88, BLUE, sw=.2)
        if kind == "hazloc":
            c = (48, 40)
            pts = [s.fpt(b, c[0], c[1] + 14), s.fpt(b, c[0] + 14, c[1]), s.fpt(b, c[0], c[1] - 14), s.fpt(b, c[0] - 14, c[1])]
            s.poly(pts, "#F4C542", BLUE, .9)
            s.fline(b, 48, 46, 48, 36, BLUE, .9)
            s.callout(s.fpt(b, 48, 108), 1, -60, -30)
            s.callout(s.fpt(b, 60, 40), 2, -70, 14)
            s.callout(s.fpt(b, 48, 80), 3, 60, -54)
            s.callout(s.P(22 + 4.5, 30 + 6, 6), 4, -50, 30)
        else:
            # corner cut-away showing the potting compound
            s.frect(b, 66, 20, 92, 56, PAPER, BLUE, .7)
            for k in range(5):
                s.fline(b, 66 + k * 6, 20, 70 + k * 6, 56, BLUE, .4)
            s.callout(s.fpt(b, 48, 108), 1, -60, -30)
            s.callout(s.fpt(b, 80, 38), 2, 60, 26)
            s.callout(s.fpt(b, 48, 80), 3, -66, -6)
            s.callout(s.fpt(wb, 40, 11), 4, -60, 34)
            s.callout(s.P(16, -5, 150), 5, -30, -30)
    return fn


def vpi_scene(cast=False):
    def fn(s):
        skid(s, -6, -4, 236, 70)
        for k in range(3):                                          # fans under the coils
            s.box(26 + k * 72, 46, 8, 24, 16, 12, top="#D0D9E5", front="#B9C6D6", side="#A5B3C6", sw=.5)
        g = core_coil(s, 0, 0, 10, pitch=72, r=28, h=150, bands=0 if cast else 9)
        cy = g["cy"]
        for k in range(len(g["cx"]) - 1):                           # HV delta links
            a, b2 = g["cx"][k], g["cx"][k + 1]
            s.line(s.P(a + 12, cy + 20, g["z1"] - 8), s.P(b2 - 12, cy + 20, g["z1"] - 8), ACC, 1)
        for x in g["cx"]:
            s.box(x - 4, cy + 24, g["z1"] - 40, 8, 4, 22, top=shade(CU, 1.2), front=CU, side=shade(CU, .8), sw=.5)
        stub = s.box(30, cy - 4, g["top"], 150, 8, 22, top="#EEE", front="#D6D6D6", side="#BBB", sw=.5)
        mon = s.box(214, cy + 10, 100, 22, 6, 30, sw=.6)
        s.frect(mon, 3, 14, 19, 26, "#1B3566", sw=.4)
        s.callout(s.P(g["cx"][1], cy + 28, 110), 1, 0, 80)
        s.callout(s.P(g["cx"][0] + 20, cy + 20, g["z1"] - 8), 2, -60, -40)
        s.callout(s.fpt(stub, 75, 22), 3, 30, -40)
        s.callout(s.fpt(mon, 11, 20), 4, 50, 10)
        s.callout(s.P(38, 62, 14), 5, -50, 40)
        s.dim_z(260, 30, 0, g["top"] + 22, "per kVA", off=20)
    return fn


def ground_scene(s):
    skid(s, -4, -2, 160, 40)
    g = core_coil(s, 0, 0, 8, pitch=48, r=18, h=100, bands=5)
    s.bushing(g["cx"][1], g["cy"], g["top"], 34, 7, sheds=3)
    ngr = s.box(200, 10, 0, 60, 46, 90)
    s.louvers(ngr, 8, 10, 52, 80, 9)
    s.louvers(ngr, 6, 10, 40, 80, 9, face="s")
    s.line(s.P(g["cx"][1], g["cy"], g["top"] + 38), s.P(230, 33, 90), ACC, 1)
    s.line(s.P(260, 30, 0), s.P(290, 30, 0), INK, 1)
    s.callout(s.P(g["cx"][0], g["cy"] + 18, 60), 1, -50, 40)
    s.callout(s.P(g["cx"][1], g["cy"], g["top"] + 30), 2, -40, -40)
    s.callout(s.fpt(ngr, 30, 50), 3, 40, 60)
    s.callout(s.P(200, 30, 120), 4, 20, -40)


def ctrl_scene(s):
    s.box(-10, -6, 0, 104, 92, 4)                                   # mounting plate
    for u in (0, 76):
        s.box(u, 4, 4, 8, 72, 6, sw=.6)                              # feet
    s.box(22, 0, 14, 40, 22, 52, top="#E5A06A", front=CU, side=shade(CU, .8))     # coil (rear)
    core = steel_box(s, 0, 22, 10, 84, 34, 70)
    for k in range(1, 7):
        s.fline(core, 0, 10 + k * 9, 84, 10 + k * 9, INK, .35)        # laminations
    s.box(22, 56, 14, 40, 22, 52, top="#E5A06A", front=CU, side=shade(CU, .8))    # coil (front)
    strip = s.box(4, 24, 80, 76, 14, 9, top="#2A3A5E", front="#1E2C4A", side="#16223B", sw=.5)
    for k in range(5):
        s.fcircle(strip, 8 + k * 15, 4.5, 2.4, "#fff", face="f", sw=.4)
    fb = s.box(104, 30, 4, 22, 34, 20, top="#2A3A5E", front="#1E2C4A", side="#16223B", sw=.5)
    for k in range(2):
        s.vcyl(110 + k * 10, 46, 24, 4, 3.2, fill="#E9EDF2")
    s.callout(s.fpt(strip, 38, 8), 1, -40, -40)
    s.callout(s.fpt(core, 10, 40), 2, -60, 6)
    s.callout(s.P(42, 78, 50), 3, -20, 60)
    s.callout(s.fpt(fb, 11, 10), 4, 50, 30)
    s.callout(s.P(4, 80, 8), 5, -56, 30)


def mvcpt_scene(s):
    s.box(-4, -4, 0, 120, 74, 5)
    for u in (0, 104):
        s.box(u, 0, 5, 8, 66, 70, sw=.6)
    body = s.box(14, 6, 10, 84, 54, 70, top="#5A90E6", front="#2F6FD6", side="#2559B0")
    s.frect(body, 8, 8, 76, 62, "none", INK, .5)
    for x in (34, 78):
        s.bushing(x, 30, 80, 40, 9, sheds=4)
    fh = s.box(-34, 10, 5, 22, 50, 10, sw=.6)
    for k in range(2):
        s.vcyl(-23, 22 + k * 24, 15, 60, 6, fill="#E9EDF2", bands=2)
    s.callout(s.P(56, 60, 50), 1, -10, 70)
    s.callout(s.P(78, 30, 116), 2, 50, -30)
    s.callout(s.P(-23, 46, 70), 3, -50, -20)
    s.callout(s.fpt(fh, 11, 5), 4, -40, 40)
    s.dim_z(112, 30, 0, 124, "≤ 7.2 kV", off=22)


def mstart_scene(s):
    skid(s, -4, -2, 160, 40)
    g = core_coil(s, 0, 0, 8, pitch=48, r=18, h=100, bands=6)
    board = s.box(10, g["cy"] + 20, 40, 120, 4, 40, top="#E4EAF2", front="#E4EAF2", side="#C9D3E0", sw=.7)
    for c in range(3):
        for r in range(4):
            s.fcircle(board, 14 + c * 46, 8 + r * 9, 2.4, "#fff", sw=.5)
    s.callout(s.P(g["cx"][1], g["cy"] - 18, 150), 1, 30, -40)
    s.callout(s.fpt(board, 60, 20), 2, -10, 60)
    s.callout(s.P(4, 36, 4), 3, -50, 20)


def reactor3d(s, ox=0, oy=0, scale=1):
    for u in (0, 112):
        s.box(ox + u, oy - 6, 0, 10, 40, 6, sw=.6)                   # feet
    g = core_coil(s, ox, oy, 6, pitch=42 * scale, r=15 * scale, h=62 * scale, bands=4, yoke=14)
    top = g["top"]
    tb = []
    for x in g["cx"]:
        b = s.box(x - 8, g["cy"] - 3, top, 16, 10, 10, top="#2A3A5E", front="#1E2C4A", side="#16223B", sw=.5)
        s.fcircle(b, 5, 5, 2, "#fff", sw=.4)
        s.fcircle(b, 11, 5, 2, "#fff", sw=.4)
        tb.append(b)
    return g, tb


def reactor_scene(s):
    g, tb = reactor3d(s)
    s.callout(s.P(g["cx"][1], g["cy"] + 15, 40), 1, 0, 60)
    s.callout(s.fpt(tb[2], 8, 8), 2, 40, -30)
    s.callout(s.P(g["cx"][0], g["cy"], g["top"] - 8), 3, -50, -30)
    s.callout(s.P(4, 30, 3), 4, -40, 30)


def dvdt_scene(s):
    plate = s.box(-10, -14, 0, 240, 8, 110, sw=.7)
    g, tb = reactor3d(s, 0, 4, .9)
    for k in range(3):                                               # resistor tubes
        s.vcyl(150 + k * 16, 20, 20, 60, 5, fill="#E9EDF2", bands=5)
    for k in range(3):                                               # capacitors
        s.vcyl(206 + k * 14, 26, 10, 40, 6, fill="#C9D3E0")
    s.callout(s.P(g["cx"][1], g["cy"] + 14, 40), 1, -10, 60)
    s.callout(s.P(166, 25, 70), 2, 30, -50)
    s.callout(s.P(220, 32, 40), 3, 50, 20)
    s.callout(s.fpt(plate, 120, 100), 4, 10, -40)


def aircore_scene(s):
    c, r = (60, 60), 40
    posts = [(c[0] + r * .8 * math.cos(a), c[1] + r * .8 * math.sin(a)) for a in (math.radians(225), math.radians(315), math.radians(45), math.radians(135))]
    posts.sort(key=lambda p: p[0] + p[1])
    for x, y in posts:
        s.box(x - 5, y - 5, 0, 10, 10, 4, sw=.5)
        s.bushing(x, y, 4, 56, 6, sheds=4)
    z = 62
    for k in range(3):
        s.vcyl(c[0], c[1], z, 34, r, fill="#E4EAF2", bands=4)
        s.top_ellipse(c[0], c[1], z + 34, r * .72, "#fff")
        for a in (0, 60, 120):
            ra = math.radians(a)
            s.line(s.P(c[0] + r * math.cos(ra), c[1] + r * math.sin(ra), z + 34), s.P(c[0] - r * math.cos(ra), c[1] - r * math.sin(ra), z + 34), INK, .5)
        if k < 2:
            for x, y in posts:
                s.vcyl(x * .5 + c[0] * .5, y * .5 + c[1] * .5, z + 34, 18, 3.5, fill="#E9EDF2")
        z += 52
    s.box(c[0] - 8, c[1] + r - 4, z - 30, 16, 6, 8, top=shade(CU, 1.2), front=CU, side=shade(CU, .8), sw=.5)
    s.callout(s.P(c[0], c[1] + r, 80), 1, -70, 10)
    s.callout(s.P(c[0], c[1], z - 18), 2, 40, -40)
    s.callout(s.P(posts[-1][0], posts[-1][1], 30), 3, -50, 40)
    s.callout(s.P(c[0], c[1] + r, z - 26), 4, 60, 0)
    s.dim_z(c[0] + r + 10, c[1], 0, z - 18, "clearance per kVAR", off=24)


def snubber_scene(s):
    s.box(-4, -4, 0, 108, 68, 8, top="#8E9BB0", front=shade("#8E9BB0", .85), side=shade("#8E9BB0", .7))
    b = s.box(0, 0, 8, 100, 60, 170)
    s.frect(b, 6, 6, 94, 164, "#E4EAF2")
    s.frect(b, 18, 30, 82, 150, "#fff", sw=.6)                     # viewing window
    for k in range(3):
        x = 26 + k * 20
        s.frect(b, x, 118, x + 8, 144, "#E9EDF2", sw=.5)            # fuses
        s.frect(b, x + 1, 74, x + 7, 112, "#fff", BLUE, .6)         # resistors
        s.frect(b, x - 2, 38, x + 10, 66, "#C9D3E0", sw=.5)         # capacitors
    s.frect(b, 88, 80, 91, 104, "#2A3A5E", sw=.4)
    for v in (24, 140):
        s.frect(b, 3, v, 6, v + 10, "#2A3A5E", sw=.3)
    for k in range(3):
        s.bushing(24 + k * 26, 30, 178, 22, 5, sheds=2)
    s.callout(s.fpt(b, 30, 131), 1, -60, -10)
    s.callout(s.fpt(b, 50, 93), 2, -70, 20)
    s.callout(s.fpt(b, 70, 52), 3, 50, 40)
    s.callout(s.P(50, 30, 200), 4, 40, -30)


# ═════════════════════════════════════════════════════════ 2D schematics
def winding(d, x, y, n=4, r=5):
    coil(d, x, y, n, r)


def delta_wye():
    d = DW()
    # primary delta
    pts = [(40, 10), (10, 62), (70, 62)]
    for (a, b) in zip(pts, pts[1:] + pts[:1]):
        d.line(*a, *b, 1.4)
    for (x, y), lab in zip(pts, ("H1", "H2", "H3")):
        d.circle(x, y, 3, .9, "#fff")
        d.text(x, y - 7 if y < 30 else y + 12, lab, 6.4, fill=INK, weight=700)
    d.text(40, 84, "PRIMARY · DELTA", 6.2)
    # secondary wye
    cx, cy = 170, 42
    for k, lab in enumerate(("X1", "X2", "X3")):
        a = math.radians(-90 + k * 120)
        x, y = cx + 30 * math.cos(a), cy + 30 * math.sin(a)
        d.line(cx, cy, x, y, 1.4, ACC)
        d.circle(x, y, 3, .9, "#fff", ACC)
        d.text(x + (10 if k == 1 else -10 if k == 2 else 0), y - 6 if k == 0 else y + 12, lab, 6.4, fill=ACC, weight=700)
    d.circle(cx, cy, 3, .9, "#fff", ACC)
    d.line(cx, cy, cx + 34, cy, .8, ACC)
    d.text(cx + 40, cy + 2, "X0", 6.4, anchor="start", fill=ACC, weight=700)
    ground(d, cx + 34, cy)
    d.text(170, 84, "SECONDARY · WYE", 6.2, fill=ACC)
    arrow(d, 88, 40, 128, 40, INK, .9)
    # tap board
    d.rect(10, 104, 200, 40, .9, "#fff", rx=3)
    for k, t in enumerate(("+5%", "+2.5%", "NOM", "−2.5%", "−5%")):
        x = 34 + k * 38
        d.circle(x, 118, 4, .9, "#fff", ACC if t == "NOM" else INK)
        d.text(x, 136, t, 6, fill=ACC if t == "NOM" else INK, weight=600)
    d.text(110, 98, "PRIMARY TAPS (TYPICAL)", 6, fill=INK, weight=700)
    d.label(110, 166, "WINDING CONNECTION — Δ / Y")
    return d.svg()


def shield_dwg():
    d = DW()
    winding(d, 50, 20, 6, 6)
    winding(d, 150, 20, 6, 6)
    d.text(44, 12, "PRIMARY", 6.4, fill=INK, weight=700)
    d.text(156, 12, "SECONDARY", 6.4, fill=INK, weight=700)
    d.line(100, 10, 100, 100, 1.6, ACC, "4 2")
    d.text(100, 4, "ELECTROSTATIC SHIELD", 6, fill=ACC, weight=700)
    d.line(100, 100, 100, 112, 1, ACC)
    ground(d, 100, 112)
    for y in (40, 62):
        d.path(f"M14,{y} q6,-6 12,0 t12,0", .8, stroke=ACC, pts=((14, y - 6), (38, y + 6)))
        arrow(d, 62, y, 94, y, ACC, .8)
        d.path(f"M98,{y} Q100,{y + 20} 100,{y + 30}", .7, stroke=ACC, pts=((98, y), (100, y + 30)))
    d.text(26, 84, "noise in", 6, fill=ACC)
    d.path("M170,48 h30", 1, pts=((170, 48), (200, 48)))
    d.text(210, 51, "clean", 6, anchor="start", fill=INK, weight=700)
    d.text(100, 140, "Noise is caught by the shield and sent to ground", 6.2)
    d.label(110, 162, "SHIELDED ISOLATION")
    return d.svg()


def chain(d, items, y=40, gap=64):
    """left-to-right one-line chain of labelled blocks"""
    x = 0
    for i, (title, sub, accent) in enumerate(items):
        block(d, x, y - 18, 56, 36, title, sub, accent)
        if i < len(items) - 1:
            arrow(d, x + 58, y, x + gap - 2, y, INK, .9)
        x += gap
    return x


def drive_sld():
    d = DW()
    chain(d, [("SUPPLY", "600 V", False), ("XFMR", "Δ / Y", True), ("VFD", "drive", False), ("MOTOR", "M", False)], gap=72)
    d.path("M150,86 " + " ".join(f"L{150 + i * 3},{86 - (12 if i % 4 in (1, 2) else 0)}" for i in range(1, 20)), .9, stroke=ACC, pts=((150, 70), (210, 90)))
    d.text(180, 102, "pulsed drive current", 6, fill=ACC)
    d.text(100, 70, "isolates & absorbs", 6, fill=INK)
    d.label(130, 130, "DRIVE ISOLATION — ONE-LINE")
    return d.svg()


def neutral_dwg():
    d = DW()
    W = 220
    for k, lab in enumerate(("A", "B", "C")):
        y = 10 + k * 30
        d.text(0, y + 4, lab, 7, fill=INK, weight=700, anchor="start")
        _poly(d, [(14 + i, y - 8 * math.sin(i / 40 * 2 * math.pi + k * 2.09) - 4 * math.sin(3 * (i / 40 * 2 * math.pi))) for i in range(0, 120)], .9, THIN)
    d.text(0, 108, "N", 7, fill=ACC, weight=700, anchor="start")
    _poly(d, [(14 + i, 104 - 12 * math.sin(3 * (i / 40 * 2 * math.pi))) for i in range(0, 120)], 1.6, ACC)
    d.rect(150, 0, 70, 120, .9, "#fff", rx=4)
    d.text(185, 16, "NEUTRAL", 6.2, fill=INK, weight=700)
    d.rect(162, 26, 18, 80, .9, "#fff")
    d.rect(186, 26, 18, 80, 1.2, "#fff", ACC)
    d.text(171, 114, "100%", 5.6)
    d.text(195, 114, "200%", 5.6, fill=ACC, weight=700)
    d.text(110, 138, "3rd harmonics add up in the neutral", 6.2)
    d.label(W / 2, 160, "WHY THE NEUTRAL IS DOUBLED")
    return d.svg()


def zigzag_dwg(title="ZIG-ZAG SECONDARY", ngr=False):
    d = DW()
    cx, cy = 90, 70
    for k in range(3):
        a = math.radians(-90 + k * 120)
        b = math.radians(-90 + k * 120 + 60)
        x1, y1 = cx + 26 * math.cos(a), cy + 26 * math.sin(a)
        x2, y2 = x1 + 26 * math.cos(b), y1 + 26 * math.sin(b)
        d.line(cx, cy, x1, y1, 1.4, INK)
        d.line(x1, y1, x2, y2, 1.4, ACC)
        d.circle(x2, y2, 3, .9, "#fff", ACC)
        d.text(x2 + 8 * math.cos(b), y2 + 8 * math.sin(b) + 3, ("A", "B", "C")[k], 6.6, fill=ACC, weight=700)
    d.circle(cx, cy, 3, .9, "#fff")
    if ngr:
        d.line(cx, cy, cx, cy + 34, 1)
        d.rect(cx - 7, cy + 34, 14, 26, 1, "#fff")
        d.path(f"M{cx},{cy + 36} l-5,3 l10,4 l-10,4 l10,4 l-10,4 l5,3", .8, pts=((cx - 5, cy + 36), (cx + 5, cy + 58)))
        d.text(cx + 12, cy + 50, "NGR", 6.2, anchor="start", fill=INK, weight=700)
        d.line(cx, cy + 60, cx, cy + 66, 1)
        ground(d, cx, cy + 66)
        arrow(d, cx + 40, cy + 70, cx + 40, cy + 20, ACC, .9)
        d.text(cx + 46, cy + 46, "fault current", 6, anchor="start", fill=ACC)
        d.text(cx + 46, cy + 55, "returns here", 6, anchor="start", fill=ACC)
    else:
        d.text(cx + 8, cy + 14, "N", 6.4, anchor="start", fill=INK, weight=700)
        d.text(cx, cy + 50, "each leg = two half-windings", 6)
        d.text(cx, cy + 60, "on different core legs", 6)
    d.label(cx, cy + (110 if ngr else 84), title)
    return d.svg()


def auto_dwg():
    d = DW()
    # two-winding
    winding(d, 30, 20, 7, 6); winding(d, 60, 20, 7, 6)
    d.text(45, 12, "ISOLATION", 6.4, fill=INK, weight=700)
    d.text(45, 116, "all power transformed", 6)
    # autotransformer
    winding(d, 160, 20, 7, 6)
    d.line(160, 20, 130, 20, 1); d.text(124, 23, "IN 600 V", 6.2, anchor="end", fill=INK, weight=700)
    d.line(160, 104, 130, 104, 1); d.line(160, 104, 210, 104, 1)
    d.line(166, 44, 210, 44, 1.2, ACC); d.circle(166, 44, 2, .8, "#fff", ACC)
    d.text(216, 47, "OUT 480 V", 6.2, anchor="start", fill=ACC, weight=700)
    d.text(170, 12, "AUTOTRANSFORMER", 6.4, fill=INK, weight=700)
    d.text(176, 116, "only the difference is transformed", 6, fill=ACC)
    d.label(120, 140, "ISOLATION vs AUTO")
    return d.svg()


def encap_section():
    d = DW()
    W, H = 160, 130
    d.rect(0, 0, W, H, 1.6)
    d.hatch(4, 4, W - 8, H - 8, 6)
    d.rect(40, 18, 80, 94, 1.2, "#fff")
    d.rect(70, 18, 20, 94, 1, "#fff")                       # centre leg
    for x in (46, 94):
        d.rect(x, 26, 20, 78, 1.1, "#fff", ACC)
    d.text(W + 10, 20, "enclosure wall", 6, anchor="start")
    d.text(W + 10, 50, "resin + silica sand", 6, anchor="start", fill=INK, weight=700)
    d.text(W + 10, 80, "coil", 6, anchor="start", fill=ACC, weight=700)
    d.text(W + 10, 110, "core", 6, anchor="start")
    for y, x in ((18, W), (48, 120), (78, 114), (108, 90)):
        d.line(W + 8, y, x - 4, y + 2, .5, THIN)
    d.text(W / 2, H + 18, "no vents · nothing can get in", 6.2)
    d.label(W / 2 + 30, H + 38, "SECTION THROUGH CORE & COIL")
    return d.svg()


def mpc_sld():
    d = DW()
    d.text(40, -8, "480 / 600 V FEED", 6.6, fill=INK, weight=700)
    d.line(40, 0, 40, 12, 1)
    _brk(d, 40, 12, "cb", 22); d.text(52, 26, "PRIMARY MAIN", 6, anchor="start")
    d.line(40, 34, 40, 46, 1)
    d.circle(40, 54, 9, 1.1, "#fff", ACC); d.circle(40, 66, 9, 1.1, "none", ACC)
    d.text(54, 62, "SEALED TRANSFORMER", 6, anchor="start", fill=ACC, weight=700)
    d.line(40, 75, 40, 88, 1)
    d.line(0, 88, 170, 88, 2.4)
    d.text(176, 91, "120/240 V", 6.2, anchor="start", fill=INK, weight=700)
    for k in range(6):
        x = 10 + k * 30
        d.line(x, 88, x, 98, .9)
        _brk(d, x, 98, "cb", 16)
        d.line(x, 114, x, 124, .9)
    d.rect(-10, -20, 200, 154, .8, "none", ACC, rx=6, dash="5 3")
    d.text(90, 148, "ONE ENCLOSURE", 6.4, fill=ACC, weight=700)
    d.label(90, 170, "MINI POWER CENTRE — ONE-LINE")
    return d.svg()


def hazloc_dwg():
    d = DW()
    d.rect(-40, 0, 300, 150, .8, "none", ACC, rx=8, dash="6 4")
    d.text(-34, 12, "CLASS I, DIVISION 2 AREA", 6.6, anchor="start", fill=ACC, weight=700)
    d.rect(10, 60, 70, 80, 1.2, "#fff")                     # tank
    d.path("M10,60 Q45,40 80,60", 1.2, pts=((10, 40), (80, 60)))
    d.text(45, 104, "TANK", 6.4, fill=INK, weight=700)
    d.circle(120, 128, 12, 1, "#fff"); d.text(120, 131, "P", 7, fill=INK, weight=700)
    d.line(80, 128, 108, 128, 1)
    d.rect(180, 80, 50, 60, 1.2, "#fff", ACC)
    d.text(205, 112, "XFMR", 6.4, fill=ACC, weight=700)
    d.text(205, 122, "T3 / T3C", 5.6, fill=ACC)
    d.path("M200,80 l6,-10 l6,10 z", .9, stroke=ACC, pts=((200, 70), (212, 80)))
    _floor(d, -40, 260, 140)
    d.text(110, 172, "gas only present if something goes wrong", 6.2)
    d.label(110, 192, "HAZARDOUS-LOCATION SITING")
    return d.svg()


def vpi_flow():
    d = DW()
    steps = [("WIND", "coils"), ("DRY", "oven"), ("VACUUM", "air out"), ("RESIN", "flood"), ("PRESS", "pressure in"), ("BAKE", "cure"), ("TEST", "IEEE")]
    for i, (t, sub) in enumerate(steps):
        x, y = (i % 4) * 70, (i // 4) * 62
        block(d, x, y, 56, 36, t, sub, t in ("VACUUM", "PRESS"), num=str(i + 1))
        if i % 4 < 3 and i < len(steps) - 1:
            arrow(d, x + 58, y + 18, x + 68, y + 18, INK, .9)
    d.path("M238,38 L238,50 L28,50 L28,60", .9, pts=((28, 38), (238, 60)))
    d.label(140, 124, "VPI PROCESS")
    return d.svg()


def cast_flow():
    d = DW()
    steps = [("WIND", "foil / wire"), ("MOULD", "set in form"), ("VACUUM", "degas"), ("CAST", "epoxy"), ("CURE", "oven"), ("TEST", "+ PD")]
    for i, (t, sub) in enumerate(steps):
        x, y = (i % 3) * 76, (i // 3) * 62
        block(d, x, y, 60, 36, t, sub, t in ("VACUUM", "CAST"), num=str(i + 1))
        if i % 3 < 2:
            arrow(d, x + 62, y + 18, x + 74, y + 18, INK, .9)
    d.path("M182,38 L182,50 L30,50 L30,60", .9, pts=((30, 38), (182, 60)))
    d.label(110, 124, "CAST-COIL PROCESS")
    return d.svg()


def ctrl_wiring():
    d = DW()
    for k, t in enumerate(("H1", "H3", "H2", "H4")):
        x = 20 + k * 30
        d.circle(x, 10, 3, .9, "#fff"); d.text(x, 4, t, 6.2, fill=INK, weight=700)
    d.path("M50,10 Q65,22 80,10", 1, stroke=ACC, pts=((50, 10), (80, 22)))
    d.text(65, 30, "jumper", 5.6, fill=ACC)
    winding(d, 30, 40, 4, 5); winding(d, 90, 40, 4, 5)
    d.line(20, 13, 30, 40, .8); d.line(110, 13, 90, 40, .8)
    d.line(10, 84, 120, 84, 1, INK, "3 2")
    winding(d, 65, 92, 3, 5)
    d.line(65, 122, 65, 132, 1); d.line(65, 92, 150, 92, 1)
    _brk(d, 150, 92, "fuse", 20)
    d.text(160, 104, "X1 fuse", 6, anchor="start")
    d.line(150, 112, 150, 124, 1)
    d.circle(150, 132, 8, 1, "#fff", ACC); d.text(150, 135, "CR", 5.6, fill=ACC, weight=700)
    d.line(150, 140, 150, 150, 1); d.line(65, 150, 150, 150, 1); d.line(65, 132, 65, 150, 1)
    d.text(54, 150, "X2", 6, anchor="end", fill=INK, weight=700)
    d.text(110, 168, "120 V control circuit", 6.2)
    d.label(90, 186, "DUAL-PRIMARY CONTROL TRANSFORMER")
    return d.svg()


def cpt_sld():
    d = DW()
    d.line(0, 0, 200, 0, 2.6); d.text(206, 3, "MV BUS", 6.4, anchor="start", fill=INK, weight=700)
    d.line(40, 0, 40, 12, 1)
    _brk(d, 40, 12, "fuse", 22); d.text(52, 26, "CL fuses", 6, anchor="start")
    d.line(40, 34, 40, 44, 1)
    d.circle(40, 52, 9, 1.1, "#fff", ACC); d.circle(40, 64, 9, 1.1, "none", ACC)
    d.text(54, 60, "CPT", 6.6, anchor="start", fill=ACC, weight=700)
    d.line(40, 73, 40, 86, 1)
    d.line(4, 86, 220, 86, 1.6); d.text(226, 89, "120 V CONTROL", 6.2, anchor="start", fill=INK, weight=700)
    for k, t in enumerate(("SPRING MOTOR", "RELAYS", "HEATERS", "LIGHTS")):
        x = 30 + k * 56
        d.line(x, 86, x, 100, .9)
        d.rect(x - 25, 100, 50, 18, .9, "#fff", rx=3)
        d.text(x, 112, t, 5.2, fill=INK, weight=600)
    d.label(100, 140, "SWITCHGEAR CONTROL POWER")
    return d.svg()


def korndorfer():
    d = DW()
    d.text(80, -10, "L1 · L2 · L3", 6.6, fill=INK, weight=700)
    d.line(80, -4, 80, 8, 1)
    d.line(30, 8, 130, 8, 1.2)
    d.line(30, 8, 30, 20, 1); _brk(d, 30, 20, "switch", 22); d.text(18, 34, "RUN", 6, anchor="end", fill=INK, weight=700)
    d.line(130, 8, 130, 20, 1); _brk(d, 130, 20, "switch", 22); d.text(142, 34, "START", 6, anchor="start", fill=ACC, weight=700)
    d.line(130, 42, 130, 52, 1)
    winding(d, 130, 52, 6, 6)
    for k, t in enumerate(("80%", "65%", "50%")):
        y = 64 + k * 14
        d.line(136, y, 160, y, .8, ACC if t == "65%" else INK)
        d.text(166, y + 2, t, 6, anchor="start", fill=ACC if t == "65%" else INK, weight=700)
    d.line(130, 124, 130, 134, 1); ground(d, 130, 134)
    d.line(30, 42, 30, 100, 1)
    d.path("M30,100 L100,100 L100,78 L136,78", .9, stroke=ACC, pts=((30, 78), (136, 100)))
    d.line(30, 100, 30, 120, 1)
    d.circle(30, 130, 10, 1.1, "#fff"); d.text(30, 133, "M", 7, fill=INK, weight=700)
    d.text(80, 162, "start on a tap, then switch to RUN", 6.2)
    d.label(90, 182, "AUTOTRANSFORMER STARTER")
    return d.svg()


def reactor_sld():
    d = DW()
    chain(d, [("SUPPLY", "600 V", False), ("LINE", "reactor", True), ("VFD", "drive", False), ("LOAD", "reactor", True), ("MOTOR", "M", False)], gap=66)
    d.text(95, 80, "cuts harmonics", 6, fill=ACC); d.text(95, 89, "& input surges", 6, fill=ACC)
    d.text(227, 80, "smooths motor", 6, fill=ACC); d.text(227, 89, "current", 6, fill=ACC)
    d.label(150, 116, "WHERE REACTORS GO")
    return d.svg()


def dvdt_wave():
    d = DW()
    W = 240
    for row, (lab, over) in enumerate((("WITHOUT FILTER", 1), ("WITH dV/dt FILTER", 0))):
        y0 = row * 70
        d.text(0, y0 + 6, lab, 6.4, anchor="start", fill=ACC if over == 0 else INK, weight=700)
        pts = []
        for i in range(W):
            t = i % 60
            base = 30 if t < 30 else 0
            if over:
                ring = 18 * math.exp(-((t % 30) / 4)) * math.cos((t % 30) * 1.4) if t % 30 < 14 else 0
                v = base + (ring if t < 30 else -ring * .2)
            else:
                v = 30 * min(1, (t if t < 30 else 0) / 6) if t < 30 else 30 * max(0, 1 - (t - 30) / 6)
            pts.append((i, y0 + 50 - v))
        _poly(d, pts, 1.2, INK if over else ACC)
        d.line(0, y0 + 20, W, y0 + 20, .4, THIN, "3 3")
        if over:
            d.text(W + 4, y0 + 8, "spike at motor", 6, anchor="start", fill=INK)
    d.text(W + 4, 92, "limit for motor", 6, anchor="start")
    d.text(W + 4, 101, "insulation", 6, anchor="start")
    d.label(W / 2, 150, "VOLTAGE AT THE MOTOR TERMINALS")
    return d.svg()


def dvdt_sld():
    d = DW()
    block(d, 0, 0, 56, 36, "VFD", "drive")
    arrow(d, 58, 18, 76, 18, INK, .9)
    block(d, 78, 0, 56, 36, "FILTER", "dV/dt", True)
    d.line(136, 18, 160, 18, 1)
    d.path("M160,18 C180,0 200,36 220,18 S260,0 280,18", 1, stroke=ACC, pts=((160, 0), (280, 36)))
    d.text(220, 50, "long motor cable", 6, fill=ACC)
    d.circle(300, 18, 14, 1.1, "#fff"); d.text(300, 21, "M", 8, fill=INK, weight=700)
    d.line(280, 18, 286, 18, 1)
    d.label(150, 80, "FILTER AT THE DRIVE OUTPUT")
    return d.svg()


def aircore_sld():
    d = DW()
    d.line(0, 0, 220, 0, 2.6); d.text(226, 3, "MV BUS", 6.4, anchor="start", fill=INK, weight=700)
    for k, (lab, acc) in enumerate((("FEEDER", False), ("WITH REACTOR", True))):
        x = 50 + k * 110
        d.line(x, 0, x, 14, 1)
        _brk(d, x, 14, "drawout", 24)
        d.line(x, 38, x, 50, 1)
        if acc:
            d.path(f"M{x},50 " + " ".join(f"a5,5 0 0 1 0,10" for _ in range(4)), 1.3, stroke=ACC, pts=((x, 50), (x + 5, 90)))
            d.text(x + 12, 72, "AIR-CORE", 6, anchor="start", fill=ACC, weight=700)
        else:
            d.line(x, 50, x, 90, 1)
        d.line(x, 90, x, 104, 1)
        d.path(f"M{x - 6},104 l6,6 h-6 l6,7", 1.2, stroke=ACC if acc else INK, pts=((x - 6, 104), (x + 6, 117)))
        d.text(x, 132, "fault: 40 kA" if not acc else "fault: 25 kA", 6.4, fill=ACC if acc else INK, weight=700)
    d.text(110, 150, "illustrative values", 5.6)
    d.label(110, 170, "CURRENT-LIMITING REACTOR")
    return d.svg()


def snubber_dwg():
    d = DW()
    d.text(30, -8, "VACUUM BREAKER", 6.4, fill=INK, weight=700)
    _brk(d, 30, 0, "drawout", 24)
    d.line(30, 24, 30, 40, 1)
    d.line(30, 40, 150, 40, 1)
    d.text(90, 34, "short cable", 6)
    d.circle(170, 48, 10, 1.1, "#fff"); d.circle(170, 62, 10, 1.1, "none")
    d.line(150, 40, 170, 38, 1)
    d.text(186, 56, "DRY-TYPE", 6.2, anchor="start", fill=INK, weight=700)
    d.line(120, 40, 120, 52, 1, ACC)
    _brk(d, 120, 52, "fuse", 18)
    d.rect(115, 76, 10, 22, 1, "#fff", ACC); d.text(108, 90, "R", 6.4, anchor="end", fill=ACC, weight=700)
    d.line(120, 70, 120, 76, 1, ACC); d.line(120, 98, 120, 106, 1, ACC)
    d.line(112, 106, 128, 106, 1.4, ACC); d.line(112, 111, 128, 111, 1.4, ACC)
    d.text(108, 111, "C", 6.4, anchor="end", fill=ACC, weight=700)
    d.line(120, 111, 120, 120, 1, ACC); ground(d, 120, 120)
    d.rect(100, 46, 40, 92, .7, "none", ACC, rx=4, dash="4 3")
    d.text(152, 120, "per phase", 6, anchor="start", fill=ACC)
    d.label(100, 160, "RC SNUBBER AT THE TRANSFORMER")
    return d.svg()


def hmt_spectrum():
    svg = spectrum(True)
    return svg.replace("without reactor", "standard transformer").replace("with reactor", "harmonic-mitigating")


def overview_dwg():
    d = DW()
    rows = [("LV DISTRIBUTION", "3 kVA – 1,000 kVA · ≤ 1.2 kV"), ("MV POWER", "≤ 15,000 kVA · ≤ 46 kV"),
            ("CONTROL & MOTOR", "25 VA – 3 kVA · 15 – 400 HP"), ("REACTORS & FILTERS", "2 A – 1,250 A · ≤ 34.5 kV")]
    for i, (t, sub) in enumerate(rows):
        block(d, 0, i * 44, 200, 34, t, sub, i == 0, num=str(i + 1))
    d.label(100, 196, "THE CANDRON DRY-TYPE RANGE")
    return d.svg()


SCENES = {
    "dt-gp": ("General-Purpose Dry-Type", "CE-DTL-01", ["Louvred enclosure", "Core & coil (lifted out)", "Tap links"],
              [("iso", "3D Model", ventilated_scene("gp"), "iso"), ("wiring", "Connections", delta_wye, "dwg")]),
    "dt-shield": ("Shielded Isolation Transformer", "CE-DTL-02", ["Louvred enclosure", "Core & coil", "Tap links", "Electrostatic shield"],
                  [("iso", "3D Model", ventilated_scene("shield"), "iso"), ("shield", "How It Works", shield_dwg, "dwg"), ("wiring", "Connections", delta_wye, "dwg")]),
    "dt-drive": ("Drive Isolation Transformer", "CE-DTL-03", ["Louvred enclosure", "Core & coil", "Tap links", "Coil bracing"],
                 [("iso", "3D Model", ventilated_scene("drive"), "iso"), ("sld", "One-Line", drive_sld, "dwg"), ("wave", "Drive Current", harmonic_wave, "dwg")]),
    "dt-kfactor": ("K-Factor Transformer", "CE-DTL-04", ["Louvred enclosure", "Core & coil", "Tap links", "200% neutral bar"],
                   [("iso", "3D Model", ventilated_scene("kfactor"), "iso"), ("neutral", "Neutral Current", neutral_dwg, "dwg"), ("wave", "Harmonics", harmonic_wave, "dwg")]),
    "dt-hmt": ("Harmonic-Mitigating Transformer", "CE-DTL-05", ["Louvred enclosure", "Core & coil", "Output 1 terminals", "Output 2 terminals"],
               [("iso", "3D Model", ventilated_scene("hmt"), "iso"), ("zigzag", "Winding", zigzag_dwg, "dwg"), ("spectrum", "Result", hmt_spectrum, "dwg")]),
    "dt-auto": ("Dry-Type Autotransformer", "CE-DTL-06", ["Louvred enclosure", "Core & coil", "Tap links", "Voltage tap leads"],
               [("iso", "3D Model", ventilated_scene("auto"), "iso"), ("compare", "Auto vs Isolation", auto_dwg, "dwg")]),
    "dt-encap": ("Encapsulated Transformer", "CE-DTL-07", ["Sealed, non-vented enclosure", "Resin & sand compound", "Nameplate", "Wiring compartment", "Wall-mount brackets"],
                 [("iso", "3D Model", encap_scene("encap"), "iso"), ("section", "Section", encap_section, "dwg")]),
    "dt-mpc": ("Mini Power Centre", "CE-DTL-08", ["Sealed transformer section", "Primary main breaker", "Branch-circuit loadcentre", "Wall brackets"],
               [("iso", "3D Model", encap_scene("mpc"), "iso"), ("sld", "One-Line", mpc_sld, "dwg")]),
    "dt-hazloc": ("Hazardous-Location Transformer", "CE-DTL-09", ["Sealed enclosure", "Hazard marking", "T-code nameplate", "Conduit seal fittings"],
                  [("iso", "3D Model", encap_scene("hazloc"), "iso"), ("area", "Siting", hazloc_dwg, "dwg")]),
    "dt-vpi": ("VPI Power Transformer", "CE-DTM-01", ["VPI-treated coils", "HV delta links", "LV bus stubs", "Temperature monitor", "Cooling fans"],
               [("iso", "3D Model", vpi_scene(), "iso"), ("process", "VPI Process", vpi_flow, "dwg"), ("wiring", "Connections", delta_wye, "dwg")]),
    "dt-cast": ("Cast-Coil Power Transformer", "CE-DTM-02", ["Epoxy-cast coils", "HV delta links", "LV bus stubs", "Temperature monitor", "Cooling fans"],
                [("iso", "3D Model", vpi_scene(cast=True), "iso"), ("process", "Casting", cast_flow, "dwg")]),
    "dt-ground": ("Neutral Grounding Transformer", "CE-DTM-03", ["Zig-zag core & coil", "Neutral bushing", "Grounding resistor", "Neutral lead"],
                  [("iso", "3D Model", ground_scene, "iso"), ("ngr", "Fault Path", lambda: zigzag_dwg("GROUNDING THROUGH A RESISTOR", True), "dwg")]),
    "dt-ctrl": ("Industrial Control Transformer", "CE-CTL-01", ["Terminal strip", "Laminated core", "Copper coil", "Fuse block", "Mounting feet"],
                [("iso", "3D Model", ctrl_scene, "iso"), ("wiring", "Wiring", ctrl_wiring, "dwg")]),
    "dt-mvcpt": ("MV Control Power Transformer", "CE-CTL-02", ["Encapsulated coil", "HV bushings", "Current-limiting fuses", "Fuse mounting"],
                 [("iso", "3D Model", mvcpt_scene, "iso"), ("sld", "One-Line", cpt_sld, "dwg")]),
    "dt-mstart": ("Motor-Starting Autotransformer", "CE-CTL-03", ["Core & coil", "Tap terminal board", "Mounting skid"],
                  [("iso", "3D Model", mstart_scene, "iso"), ("circuit", "Starter Circuit", korndorfer, "dwg")]),
    "dt-reactor": ("Line & Load Reactor", "CE-RXF-01", ["Copper coils", "Terminal blocks", "Laminated core", "Mounting feet"],
                   [("iso", "3D Model", reactor_scene, "iso"), ("sld", "Where It Goes", reactor_sld, "dwg"), ("ga", "Elevation", reactor_ga, "dwg")]),
    "dt-dvdt": ("dV/dt Motor Filter", "CE-RXF-02", ["Filter reactor", "Damping resistors", "Capacitors", "Back plate"],
                [("iso", "3D Model", dvdt_scene, "iso"), ("wave", "Motor Voltage", dvdt_wave, "dwg"), ("sld", "One-Line", dvdt_sld, "dwg")]),
    "dt-aircore": ("Air-Core Reactor", "CE-RXF-03", ["Air-core winding", "Spider arms", "Support insulators", "Terminal pad"],
                   [("iso", "3D Model", aircore_scene, "iso"), ("sld", "Fault Limiting", aircore_sld, "dwg")]),
    "dt-snubber": ("RC Surge Snubber", "CE-RXF-04", ["Current-limiting fuses", "Non-inductive resistors", "Surge capacitors", "Line bushings"],
                   [("iso", "3D Model", snubber_scene, "iso"), ("circuit", "Circuit", snubber_dwg, "dwg")]),
    "dt-range": ("Dry-Type Range", "CE-DT-00", ["Louvred enclosure", "Core & coil (lifted out)", "Tap links"],
                 [("iso", "3D Model", ventilated_scene("gp"), "iso"), ("range", "Range", overview_dwg, "dwg"), ("wiring", "Connections", delta_wye, "dwg")]),
}
