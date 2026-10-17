"""Capability-page drawings: engineering, field service, manufacturing, testing, processes.

Each scene has three views. 2D views use draw2d.Dwg; 3D views use the Iso engine.
Numbers on these drawings are illustrative labels (no ratings or claims).
"""
import math

import draw2d
import products_art as pa
from draw2d import Dwg, _brk, _tx, _floor, INK, THIN, BLUE
from iso import Iso, shade

PLINTH = "#8E9BB0"
DOOR = "#E4EAF2"
DARK = "#16264A"
ACC = BLUE


# ───────────────────────────────────────────────────────── 2D helpers
def arrow(d, x1, y1, x2, y2, stroke=INK, sw=.9, head=4):
    d.line(x1, y1, x2, y2, sw, stroke)
    a = math.atan2(y2 - y1, x2 - x1)
    p1 = (x2 - head * math.cos(a - .45), y2 - head * math.sin(a - .45))
    p2 = (x2 - head * math.cos(a + .45), y2 - head * math.sin(a + .45))
    d.path(f"M{p1[0]:.1f},{p1[1]:.1f} L{x2:.1f},{y2:.1f} L{p2[0]:.1f},{p2[1]:.1f}", sw, stroke=stroke, pts=(p1, p2))


def block(d, x, y, w, h, title, sub="", accent=False, num=None):
    d.rect(x, y, w, h, 1.1 if accent else .9, "#fff", ACC if accent else INK, rx=4)
    ty = y + h / 2 + (0 if sub else 3)
    if num:
        d.circle(x + 11, y + 11, 6.5, .8, "#fff", ACC)
        d.text(x + 11, y + 13.6, num, 6.5, fill=ACC, weight=700, ls="0")
    cx = x + w / 2 + (6 if num else 0)
    d.text(cx, ty - (3 if sub else 0), title, 7.4 if len(title) < 8 else 6.6, fill=INK, weight=700, ls=".04em")
    if sub:
        d.text(cx, ty + 8, sub, 6, ls=".02em")


def check(d, x, y, s=6):
    d.path(f"M{x - s * .6:.1f},{y:.1f} L{x - s * .1:.1f},{y + s * .5:.1f} L{x + s * .7:.1f},{y - s * .55:.1f}",
           1.2, stroke=ACC, pts=((x - s, y - s), (x + s, y + s)))


def ground(d, x, y):
    d.line(x, y, x, y + 6, .9)
    for k, w in enumerate((8, 5, 2)):
        d.line(x - w, y + 6 + k * 2.6, x + w, y + 6 + k * 2.6, .9)


def coil(d, x, y, n=4, r=4, vertical=True):
    """winding symbol: n semicircles down from (x, y)"""
    segs = "".join(f" a{r},{r} 0 0 1 0,{2 * r}" for _ in range(n))
    d.path(f"M{x},{y}{segs}", 1, pts=((x, y), (x + r, y + 2 * r * n)))


# ───────────────────────────────────────────────────────── 3D helpers
def cone(s, x, y, z=0):
    s.box(x - 5, y - 5, z, 10, 10, 1.5, top="#E8A317", front="#D18E0E", side="#B87B0B", sw=.5)
    for k in range(4):
        s.vcyl(x, y, z + 1.5 + k * 5, 5, 3.6 - k * .8, fill="#E8A317", top="#F2C15A", sw=.5)


def post(s, x, y, h=56):
    s.vcyl(x, y, 0, h, 1.6, fill="#C9D3E0", sw=.5)


def rope(s, a, b, h=50):
    s.line(s.P(a[0], a[1], h), s.P(b[0], b[1], h), ACC, .7)


def cart(s, x, y, label_screen=True):
    """portable test set on a wheeled cart"""
    for (u, t) in [(4, 4), (40, 4), (4, 28), (40, 28)]:
        s.vcyl(x + u, y + t, 0, 4, 3, fill=DARK, sw=.5)
    s.box(x, y, 4, 46, 34, 30)
    b = s.box(x + 2, y + 2, 34, 42, 30, 26)
    s.frect(b, 4, 4, 38, 22, "#1B3566", sw=.5)
    s.frect(b, 6, 7, 26, 19, "#3F7BEA", sw=.25)
    for k in range(3):
        s.fcircle(b, 31, 8 + k * 5, 1.8, "#fff", sw=.4)
    return b


# ═════════════════════════════════════════════════════════ ENGINEERING
def eng_sld():
    d = Dwg()
    d.circle(60, 0, 11, 1.1, "#fff")
    d.path("M53,0 q3.5,-6 7,0 t7,0", .9, pts=((53, -6), (67, 6)))
    d.text(60, -18, "UTILITY 13.8 kV", 6.6, fill=INK, weight=700)
    d.line(60, 11, 60, 22, 1)
    _brk(d, 60, 22, "drawout", 24)
    d.text(46, 37, "52-M", 6, anchor="end", fill=INK)
    d.line(60, 46, 60, 58, 1)
    d.line(10, 58, 230, 58, 2.6)
    d.text(236, 61, "BUS 1", 6.4, anchor="start", fill=ACC, weight=700)
    for k, x in enumerate((40, 110, 180)):
        d.line(x, 58, x, 70, 1)
        _brk(d, x, 70, "cb", 20)
        d.line(x, 90, x, 100, 1)
        _tx(d, x, 100)
        d.line(x, 129, x, 140, 1)
        d.line(x - 22, 140, x + 22, 140, 2)
        for f in (-14, 0, 14):
            d.line(x + f, 140, x + f, 152, .8)
            d.circle(x + f, 158, 6, .8, "#fff")
            d.text(x + f, 160.4, "M", 5.6, fill=INK, weight=700, ls="0")
    # fault point + study tags
    d.path("M118,47 l-6,6 h6 l-6,7", 1.3, stroke=ACC, pts=((110, 46), (120, 62)))
    d.rect(128, 26, 64, 22, .9, "#fff", ACC, rx=3)
    d.text(160, 35, "F1 · ISC 3Ø", 6.4, fill=ACC, weight=700)
    d.text(160, 44, "fault duty check", 5.4)
    for x in (40, 180):
        arrow(d, x + 8, 112, x + 8, 124, ACC, .8, 3)
    d.text(196, 118, "LOAD FLOW", 5.6, anchor="start", fill=ACC)
    # study table
    tx, ty = 250, 82
    d.rect(tx, ty, 104, 66, .9, "#fff")
    for k, (a, b) in enumerate((("BUS", "STUDY"), ("BUS 1", "SC · LF"), ("BUS 2", "ARC FLASH"), ("BUS 3", "COORD."))):
        yy = ty + 12 + k * 15
        d.text(tx + 6, yy, a, 6, anchor="start", fill=INK, weight=700 if k == 0 else 500)
        d.text(tx + 46, yy, b, 6, anchor="start", fill=INK, weight=700 if k == 0 else 500)
        if k:
            check(d, tx + 96, yy - 2, 4)
        d.line(tx, ty + 16 + k * 15, tx + 104, ty + 16 + k * 15, .4, THIN)
    d.line(tx + 42, ty, tx + 42, ty + 66, .4, THIN)
    d.label(170, 190, "POWER SYSTEM STUDY — SINGLE-LINE")
    return d.svg()


def eng_tcc():
    d = Dwg()
    X0, Y0, W, H = 0, 0, 260, 200
    d.rect(X0, Y0, W, H, 1)
    for k in range(1, 4):                                    # decades
        d.line(X0 + W * k / 4, Y0, X0 + W * k / 4, Y0 + H, .5, THIN)
        d.line(X0, Y0 + H * k / 4, X0 + W, Y0 + H * k / 4, .5, THIN)
        for m in (.3, .48, .6, .7, .78, .85, .9, .95):
            xx = X0 + W * (k - 1 + m) / 4
            d.line(xx, Y0 + H - 3, xx, Y0 + H, .4, THIN)
    for k, t in enumerate(("10", "100", "1k", "10k", "100k")):
        d.text(X0 + W * k / 4, Y0 + H + 10, t, 6)
    for k, t in enumerate(("1000", "100", "10", "1", "0.1")):
        d.text(X0 - 5, Y0 + H * k / 4 + 2, t, 6, anchor="end")
    d.text(X0 + W / 2, Y0 + H + 22, "CURRENT (A)", 6.6, fill=INK, weight=700)
    d.text(X0, Y0 - 9, "TIME (s)", 6.6, anchor="start", fill=INK, weight=700)
    # curves
    d.path("M40,6 C60,70 80,120 150,150 S215,168 250,172", 1.5, stroke=ACC, pts=((40, 6), (250, 172)))
    d.text(160, 140, "51 RELAY", 6.4, fill=ACC, weight=700)
    d.path("M22,20 C34,80 50,130 96,168 L120,196", 1.1, pts=((22, 20), (120, 196)))
    d.text(48, 128, "FUSE", 6.2, anchor="end", fill=INK, weight=700)
    d.path("M90,4 C120,40 170,70 248,88", 1, stroke=THIN, pts=((90, 4), (248, 88)))
    d.text(196, 64, "CABLE DAMAGE", 6, fill=INK)
    d.circle(120, 108, 2.6, 1, "#fff", ACC)
    d.text(126, 105, "INRUSH", 5.8, anchor="start", fill=ACC)
    d.line(150, 150, 150, 196, .6, ACC, "3 2")
    d.text(152, 192, "ISC", 5.6, anchor="start", fill=ACC)
    d.label(W / 2, H + 40, "TIME-CURRENT COORDINATION")
    return d.svg()


def eng_iso(s):
    pa.draw_switchboard(s, 0, 0, False)
    W = 54 * 3
    zone = [s.P(-10, 46 + 8, 0), s.P(W + 10, 46 + 8, 0), s.P(W + 10, 46 + 108, 0), s.P(-10, 46 + 108, 0)]
    s.poly(zone, "none", ACC, .9)
    for k in range(1, 6):
        y = 46 + 8 + k * 16
        s.line(s.P(-10, y, 0), s.P(W + 10, y, 0), ACC, .4)
    arc = [s.P(W / 2 + 120 * math.cos(a), 46 + 120 * math.sin(a), 0) for a in [i * math.pi / 24 for i in range(0, 25)]]
    for a, b in zip(arc, arc[1:]):
        s.line(a, b, "#0756EE", .8)
    s.label(s.P(W / 2, 46 + 60, 0), "WORKING CLEARANCE", 70, 50, "front of equipment")
    s.label(s.P(W / 2 + 85, 46 + 85, 0), "ARC-FLASH BOUNDARY", 60, 20, "from study results")


# ═════════════════════════════════════════════════════════ FIELD SERVICE
def field_iso(s):
    pa.draw_padmount(s, 0, 0, False)
    # barrier behind-right side first (painter order: far to near)
    side = [(215, -20), (215, 110), (215, 245)]
    for p_ in side:
        post(s, *p_)
    for a_, c_ in zip(side, side[1:]):
        rope(s, a_, c_)
    cart(s, -40, 205)
    # test leads: cart terminals → cabinet doors
    for k in range(3):
        a_ = s.P(-6 + k * 6, 239, 56)
        m_ = s.P(10 + k * 14, 225, 14)
        e_ = s.P(30 + k * 26, 146, 50)
        s.line(a_, m_, "#0756EE", .8)
        s.line(m_, e_, "#0756EE", .8)
    front = [(-90, 262), (60, 262), (215, 262)]
    for p_ in front:
        post(s, *p_)
    for a_, c_ in zip(front, front[1:]):
        rope(s, a_, c_)
    rope(s, (215, 245), (215, 262))
    for p_ in [(-90, 285), (238, 270)]:
        cone(s, *p_)
    s.callout(s.P(-20, 215, 64), 1, -60, -30)
    s.callout(s.P(18, 225, 14), 2, -40, 46)
    s.callout(s.P(140, 262, 50), 3, 40, 40)
    s.callout(s.P(80, 120, 120), 4, -40, -60)


def field_hookup():
    d = Dwg()
    # transformer windings
    d.rect(0, 0, 120, 150, 1, rx=4)
    d.text(60, -8, "TRANSFORMER UNDER TEST", 6.6, fill=INK, weight=700)
    for x, lab in ((30, "H"), (90, "X")):
        coil(d, x, 30, 5, 6)
        d.text(x, 22, f"{lab}1", 6.2, fill=INK, weight=700)
        d.text(x, 104, f"{lab}2", 6.2, fill=INK, weight=700)
    d.line(55, 30, 55, 90, 1.4); d.line(65, 30, 65, 90, 1.4)             # core
    # test set
    d.rect(220, 30, 110, 90, 1.1, "#fff", ACC, rx=6)
    d.text(275, 48, "TTR / WR TEST SET", 6.6, fill=ACC, weight=700)
    d.rect(232, 56, 86, 28, .9, "#fff")
    d.text(275, 74, "RATIO 120.04 : 1", 6.6, fill=INK, weight=700)
    for k in range(4):
        d.circle(240 + k * 22, 102, 4, .9, "#fff")
    # leads
    for (sx, sy, tx, ty, lab) in ((30, 22, 240, 102, "H1"), (30, 104, 262, 102, "H2"), (90, 22, 284, 102, "X1"), (90, 104, 306, 102, "X2")):
        d.path(f"M{sx},{sy} C{sx + 80},{sy - 30} {tx - 60},{ty + 50} {tx},{ty + 4}", .9, stroke=ACC, pts=((sx, sy), (tx, ty)))
    ground(d, 120, 150)
    ground(d, 275, 120)
    # megohmmeter
    d.rect(150, 160, 90, 44, 1, "#fff", rx=5)
    d.text(195, 176, "MEGOHMMETER", 6.4, fill=INK, weight=700)
    d.path("M168,196 A27,27 0 0 1 222,196", .9, pts=((168, 170), (222, 196)))
    d.line(195, 196, 210, 180, 1.2, ACC)
    d.label(170, 230, "TEST HOOK-UP — RATIO & INSULATION")
    return d.svg()


def field_flow():
    d = Dwg()
    steps = [("VISUAL", "inspection"), ("IR", "insulation"), ("TTR", "turns ratio"), ("WR", "winding res."),
             ("SFRA", "frequency resp."), ("DGA", "oil sample"), ("ENERGIZE", "into service")]
    for i, (t, sub) in enumerate(steps):
        row, col = divmod(i, 4)
        x = col * 92 if row == 0 else (3 - col) * 92 - 46
        y = row * 92
        block(d, x, y, 76, 46, t, sub, accent=(t == "ENERGIZE"), num=f"{i + 1:02d}")
        check(d, x + 66, y + 10, 4)
        if i < len(steps) - 1:
            if col < 3 and row == 0:
                arrow(d, x + 78, y + 23, x + 90, y + 23)
            elif row == 0:
                arrow(d, x + 38, y + 48, x + 38 - 46, y + 90)
            else:
                arrow(d, x - 2, y + 23, x - 14, y + 23)
    d.label(160, 168, "FIELD TEST SEQUENCE")
    return d.svg()


# ═════════════════════════════════════════════════════════ MANUFACTURING
def mfg_iso(s):
    s.box(-30, -30, 0, 430, 260, 3, top="#EEF2F7", front="#D9E0EA", side="#C3CDDA")       # shop floor
    for x in range(0, 400, 40):
        s.line(s.P(-20 + x, -20, 3), s.P(-20 + x, 220, 3), "#7A8AA5", .35)
    # gantry crane — rear legs and rail first, front legs after the load (painter order)
    s.box(-10, -10, 3, 10, 10, 220)
    s.box(300, -10, 3, 10, 10, 220)
    s.box(-10, -10, 223, 320, 10, 10)
    # core & coil on the hook
    s.box(100, 85, 60, 56, 22, 10)
    for k in range(3):
        s.vcyl(108 + k * 20, 96, 70, 64, 9, bands=4)
    s.box(100, 85, 134, 56, 22, 10)
    s.box(110, 80, 152, 34, 30, 6)                                                        # lifting beam
    for k in range(2):
        s.line(s.P(112 + k * 32, 96, 144), s.P(127, 95, 152), sw=.6)
    s.line(s.P(127, 95, 222), s.P(127, 95, 158), sw=.8)
    s.box(120, -10, 233, 14, 220, 10)                                                       # bridge
    s.box(118, 86, 222, 18, 18, 12)                                                       # hoist
    s.box(-10, 200, 3, 10, 10, 220)
    s.box(300, 200, 3, 10, 10, 220)
    s.box(-10, 200, 223, 320, 10, 10)
    # assembly cabinet + bench + steel stack
    cab = s.box(300, 40, 3, 60, 50, 150)
    s.frect(cab, 6, 10, 54, 140, "none")
    for v in range(30, 140, 22):
        s.fline(cab, 10, v, 50, v, sw=.4)
    bench = s.box(280, 150, 40, 90, 36, 6)
    for (u, t) in [(282, 152), (364, 152), (282, 180), (364, 180)]:
        s.box(u, t, 3, 4, 4, 37)
    for k in range(5):
        s.box(40, 150 + 0, 3 + k * 4, 60, 40, 4, sw=.5)
    s.callout(s.P(127, 95, 236), 1, -40, -40)
    s.callout(s.P(128, 96, 100), 2, -70, 10)
    s.callout(s.P(330, 65, 120), 3, 50, -30)
    s.callout(s.P(70, 190, 20), 4, -50, 30)


def mfg_flow():
    d = Dwg()
    stations = [("CNC PUNCH", "sheet metal"), ("BEND", "press brake"), ("WELD", "frames"), ("PAINT", "powder coat"),
                ("ASSEMBLE", "bus & devices"), ("WIRE", "control"), ("TEST", "FAT"), ("SHIP", "crate & load")]
    SP, BW = 100, 76
    for row in range(2):
        y = row * 104
        d.line(-10, y + 72, 3 * SP + BW + 10, y + 72, 1.6)                     # conveyor
        d.line(-10, y + 78, 3 * SP + BW + 10, y + 78, .6)
        for k in range(-10, 3 * SP + BW + 10, 14):
            d.circle(k, y + 75, 2, .5)
    for i, (t, sub) in enumerate(stations):
        row, col = divmod(i, 4)
        x = col * SP if row == 0 else (3 - col) * SP
        y = row * 104
        block(d, x, y, BW, 44, t, sub, accent=(t in ("TEST", "SHIP")), num=f"{i + 1}")
        d.line(x + BW / 2, y + 44, x + BW / 2, y + 60, .7, THIN)
        d.rect(x + BW / 2 - 14, y + 60, 28, 10, .8, "#fff")
        if i == 3:
            d.path(f"M{x + BW + 4},{y + 22} C{x + BW + 40},{y + 22} {x + BW + 40},{y + 126} {x + BW + 4},{y + 126}",
                   1, stroke=ACC, pts=((x + BW, y), (x + BW + 40, y + 126)))
        elif i < 7:
            if row == 0:
                arrow(d, x + BW + 2, y + 22, x + SP - 2, y + 22, ACC, .9, 3)
            else:
                arrow(d, x - 2, y + 22, x - (SP - BW) + 2, y + 22, ACC, .9, 3)
    d.label((3 * SP + BW) / 2, 212, "PRODUCTION FLOW — ONE ROOF, TORONTO")
    return d.svg()


def mfg_ga():
    return draw2d.ga_castcoil()


# ═════════════════════════════════════════════════════════ TESTING
def test_iso(s):
    def rails(a_, b_):
        for h in (40, 80, 120):
            s.line(s.P(a_[0], a_[1], h), s.P(b_[0], b_[1], h), "#7A8AA5", .45)

    back = [(-40, 150), (-40, -40), (210, -40)]                  # far side of the cage first
    for x, y in back:
        post(s, x, y, 120)
    rails(back[0], back[1])
    rails(back[1], back[2])
    pa.draw_cast_coil(s, 0, 0, False)
    post(s, 210, 150, 120)                                       # near corner, drawn over the unit
    rails((210, -40), (210, 150))
    rails((-40, 150), (210, 150))
    s.vcyl(210, 150, 120, 10, 4, fill="#D9342B", top="#F07A73")  # test-in-progress beacon
    sign = s.box(60, 150, 70, 50, 2, 30)
    s.frect(sign, 4, 4, 46, 26, "#E8A317", sw=.5)
    cart(s, 250, 200)
    for k in range(2):
        a_ = s.P(252 + k * 6, 202, 56)
        m_ = s.P(212, 150 - k * 6, 128)
        e_ = s.P(130 + k * 24, 60, 140)
        s.line(a_, m_, "#0756EE", .8)
        s.line(m_, e_, "#0756EE", .8)
    s.callout(s.P(80, 50, 120), 1, -50, -50)
    s.callout(s.P(270, 210, 60), 2, 40, -30)
    s.callout(s.P(85, 152, 85), 3, -40, 40)
    s.callout(s.P(210, 150, 130), 4, 40, -40)


def test_circuit():
    d = Dwg()
    d.circle(0, 60, 14, 1.1, "#fff")
    d.path("M-8,60 q4,-7 8,0 t8,0", .9, pts=((-8, 53), (8, 67)))
    d.text(0, 90, "AC SUPPLY", 6.2, fill=INK, weight=700)
    d.line(14, 60, 40, 60, 1)
    d.circle(56, 60, 16, 1.1, "#fff")
    arrow(d, 44, 74, 70, 46, ACC, 1, 4)
    d.text(56, 90, "VARIAC", 6.2, fill=INK, weight=700)
    d.line(72, 60, 96, 60, 1)
    coil(d, 104, 34, 4, 6); coil(d, 130, 34, 4, 6)
    d.line(114, 30, 114, 86, 1.3); d.line(120, 30, 120, 86, 1.3)
    d.text(117, 100, "STEP-UP", 6.2, fill=INK, weight=700)
    d.line(96, 60, 104, 34, .9)
    d.line(130, 34, 180, 34, 1)
    d.circle(180, 60, 12, 1, "#fff", ACC)
    d.text(180, 63, "kV", 6.6, fill=ACC, weight=700, ls="0")
    d.line(180, 34, 180, 48, 1); d.line(180, 72, 180, 86, 1)
    d.line(180, 34, 240, 34, 1)
    d.rect(240, 14, 70, 92, 1.2, "#fff", ACC, rx=5)
    d.text(275, 52, "EQUIPMENT", 6.8, fill=ACC, weight=700)
    d.text(275, 62, "UNDER TEST", 6.8, fill=ACC, weight=700)
    d.line(275, 106, 275, 118, 1)
    ground(d, 275, 118)
    d.line(130, 82, 130, 118, 1); ground(d, 130, 118)
    d.line(180, 86, 180, 118, 1); ground(d, 180, 118)
    d.label(150, 156, "APPLIED-POTENTIAL (HI-POT) TEST CIRCUIT")
    return d.svg()


def test_chart():
    d = Dwg()
    W, H = 240, 150
    d.rect(0, 0, W, H, 1)
    for k in range(1, 5):
        d.line(W * k / 5, 0, W * k / 5, H, .45, THIN)
        d.line(0, H * k / 5, W, H * k / 5, .45, THIN)
    for k, t in enumerate(("0", "2", "4", "6", "8", "10")):
        d.text(W * k / 5, H + 10, t, 6)
    d.text(W / 2, H + 22, "TIME (min)", 6.6, fill=INK, weight=700)
    d.text(-22, H / 2, "IR (GΩ)", 6.6, fill=INK, weight=700)
    d.path("M0,138 C20,80 50,58 96,46 S190,30 240,24", 1.6, stroke=ACC, pts=((0, 138), (240, 24)))
    for (x, y, lab) in ((24, 92, "R1"), (240, 24, "R10")):
        d.circle(x, y, 3, 1, "#fff", ACC)
        d.text(x + 6, y - 5, lab, 6.2, anchor="start", fill=ACC, weight=700)
    d.rect(150, 96, 84, 46, .9, "#fff", rx=4)
    d.text(192, 112, "PI = R10 / R1", 6.6, fill=INK, weight=700)
    d.text(192, 124, "polarization index", 5.6)
    check(d, 170, 134, 4); d.text(178, 136, "PASS", 6, anchor="start", fill=ACC, weight=700)
    d.label(W / 2, H + 42, "INSULATION RESISTANCE — RESULT CURVE")
    return d.svg()


# ═════════════════════════════════════════════════════════ PROCESSES
PROCESS = ["CONSULT", "ENGINEER", "SIMULATE", "BUILD", "TEST", "DELIVER", "COMMISSION"]


def proc_flow():
    d = Dwg()
    pts = []
    for i, t in enumerate(PROCESS):
        row, col = divmod(i, 4)
        x = col * 86 if row == 0 else (3 - col) * 86 + 43
        y = row * 100
        pts.append((x + 34, y + 24))
        block(d, x, y, 68, 48, t, "", accent=(i in (0, 6)), num=f"{i + 1:02d}")
    for (a, b) in zip(pts, pts[1:]):
        if a[1] == b[1]:
            arrow(d, a[0] + (36 if b[0] > a[0] else -36), a[1], b[0] + (-36 if b[0] > a[0] else 36), b[1], ACC)
        else:
            d.path(f"M{a[0]},{a[1] + 26} C{a[0]},{a[1] + 60} {b[0]},{b[1] - 60} {b[0]},{b[1] - 28}", 1, stroke=ACC,
                   pts=(a, b))
    d.text(170, 186, "ONE ACCOUNTABLE TEAM, END TO END", 6.2, fill=ACC, weight=700)
    d.label(170, 204, "PROJECT FLOW")
    return d.svg()


def proc_gantt():
    d = Dwg()
    L, W = 74, 250
    for k in range(9):
        x = L + W * k / 8
        d.line(x, 0, x, 7 * 20 + 6, .45 if k % 2 else .7, THIN)
        d.text(x, -6, f"W{k * 2}", 5.8)
    spans = [(0, 1.2), (.8, 3), (2.6, 3.6), (3.2, 6.2), (5.8, 6.8), (6.6, 7.4), (7.2, 8)]
    for i, (t, (a, b)) in enumerate(zip(PROCESS, spans)):
        y = 6 + i * 20
        d.text(L - 6, y + 10, t, 6.2, anchor="end", fill=INK, weight=700)
        d.rect(L + W * a / 8, y + 2, W * (b - a) / 8, 11, 1, "#fff", ACC if i in (3, 6) else INK, rx=3)
    for x, lab in ((L + W * 3.6 / 8, "DRAWINGS APPROVED"), (L + W * 6.8 / 8, "FAT")):
        d.path(f"M{x},{150} l5,5 l-5,5 l-5,-5 z", 1, stroke=ACC, pts=((x - 5, 150), (x + 5, 160)))
        d.text(x, 172, lab, 5.6, fill=ACC, weight=700)
    d.label(L + W / 2, 194, "PROJECT SCHEDULE")
    return d.svg()


def proc_iso(s):
    # flatbed truck carrying a crated lineup; the cab faces the viewer's right (+x)
    deck = s.box(0, 0, 22, 262, 70, 8)
    crate = s.box(18, 6, 30, 200, 58, 110)
    for u in (0, 50, 100, 150, 200):
        s.fline(crate, u, 0, u, 110, sw=.5)
    s.fline(crate, 0, 55, 200, 55, sw=.5)
    for u in (40, 160):                                                                 # straps
        s.fline(crate, u, 0, u, 110, "#0756EE", .9)
        s.line(s.P(18 + u, 6, 140), s.P(18 + u, 64, 140), "#0756EE", .9)
    s.frect(crate, 70, 70, 130, 96, "#fff", sw=.5)
    cab = s.box(268, 2, 14, 64, 66, 76)
    s.box(268, 2, 90, 40, 66, 14)                                                       # sleeper roof
    s.frect(cab, 6, 30, 40, 58, "#C7D6EA", sw=.6)                                       # door window
    s.frect(cab, 8, 34, 58, 64, "#C7D6EA", sw=.6, face="s")                             # windshield
    s.frect(cab, 10, 6, 56, 24, "none", sw=.5, face="s")                                # grille
    s.louvers(cab, 12, 8, 54, 22, 5, face="s")
    for x in (34, 130, 210, 298):                                                       # near-side wheels
        w = s.box(x - 12, 66, 0, 24, 6, 24, sw=.5)
        s.fcircle(w, 12, 12, 10, "#3A4C6E", sw=.6)
        s.fcircle(w, 12, 12, 4, "#C9D3E0", sw=.4)
    s.callout(s.P(118, 64, 110), 1, -40, -40)
    s.callout(s.P(240, 70, 28), 2, 20, 50)
    s.callout(s.P(300, 68, 60), 3, 50, -30)


# kind → (title, code, legend, [(key, label, fn, kind)]) — kind: "iso" (Iso scene fn) or "dwg" (returns svg)
SCENES = {
    "cap-eng": ("Power System Study", "CE-ENG-01", [],
                [("sld", "Fault Study", eng_sld, "dwg"), ("tcc", "Coordination", eng_tcc, "dwg"), ("iso", "3D Layout", eng_iso, "iso")]),
    "cap-field": ("On-Site Commissioning", "CE-FLD-01", ["Portable test set", "Test leads to windings", "Safety barrier", "Transformer under test"],
                  [("iso", "On Site", field_iso, "iso"), ("hookup", "Test Hook-Up", field_hookup, "dwg"), ("flow", "Test Sequence", field_flow, "dwg")]),
    "cap-mfg": ("Toronto Production Floor", "CE-MFG-01", ["Overhead gantry crane", "Core & coil assembly", "Switchboard assembly", "Sheet-steel stock"],
                [("iso", "Factory Floor", mfg_iso, "iso"), ("flow", "Production Flow", mfg_flow, "dwg"), ("ga", "Core & Coil", mfg_ga, "dwg")]),
    "cap-test": ("HV Test Bay", "CE-TST-01", ["Unit under test", "HV test set", "Warning signage", "Test-in-progress beacon"],
                 [("iso", "Test Bay", test_iso, "iso"), ("circuit", "Test Circuit", test_circuit, "dwg"), ("chart", "Results", test_chart, "dwg")]),
    "cap-proc": ("Project Delivery", "CE-PRC-01", ["Crated, strapped equipment", "Flatbed trailer", "Tractor unit"],
                 [("flow", "Project Flow", proc_flow, "dwg"), ("gantt", "Schedule", proc_gantt, "dwg"), ("iso", "Delivery", proc_iso, "iso")]),
}


def render(fn, kind):
    if kind == "dwg":
        return fn()
    s = Iso(sw=.8)
    fn(s)
    return s.svg(pad=26, cls="", mode="line")
