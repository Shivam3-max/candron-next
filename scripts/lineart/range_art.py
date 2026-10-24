"""Drawings for the liquid-filled transformer, switchboard & switchgear and load bank ranges.

Each scene: (title, drawing code, legend for the numbered balloons, views) — same format as
drytype_art.SCENES. Numbers on the drawings are illustrative labels, not ratings.
World axes (iso.py): X runs down-right, Y runs down-left, Z up; the visible faces of a box are
its top, its front (y + d) and its side (x + w), so draw from the back (small x, y) forward.
"""
import products_art as pa
import extra_art
import draw2d
from iso import shade
from capability_art import arrow, ground, coil
from drytype_art import DW, ACC, skid, chain, delta_wye

PAD = ("#E2DED6", "#CFCAC0", "#B9B3A7")
TANK = ("#E0E9DF", "#C9D6C8", "#ABBCAA")
GREY = ("#E8EDF4", "#D3DCE8", "#B6C3D4")
DARKS = ("#5B6E8F", "#46597A", "#384A69")


def tbox(s, x, y, z, w, d, h, c=GREY, sw=None):
    return s.box(x, y, z, w, d, h, top=c[0], front=c[1], side=c[2], sw=sw)


def pad(s, x, y, w, d, h=10):
    return tbox(s, x, y, 0, w, d, h, PAD)


def fins(s, x, y0, z, n, gap=12, depth=20, h=84, axis="y"):
    """radiator fins standing off the side (x+) face of a tank"""
    for k in range(n):
        if axis == "y":
            tbox(s, x, y0 + k * gap, z, depth, 3.4, h, TANK, sw=.55)
        else:
            tbox(s, y0 + k * gap, x, z, 3.4, depth, h, TANK, sw=.55)


def radiators(s, x, y0, z, n, gap=10.5, depth=30, h=116):
    for k in range(n):
        tbox(s, x, y0 + k * gap, z, depth, 3.6, h, GREY, sw=.55)


def fan(s, x, y, z, r=9):
    s.top_ellipse(x, y, z, r, "#C3CEDC")
    s.top_ellipse(x, y, z, r * .7, "#9EAFC6")
    s.top_ellipse(x, y, z, r * .2, "#3A4C6E")


def wheel(s, x, y, r=9):
    s.vcyl(x, y, 0, 4, r, fill="#3A4C6E")


def door_lines(s, b, u0, v0, u1, v1, handle=True, face="f"):
    s.frect(b, u0, v0, u1, v1, "#E4EAF2", face=face)
    if handle:
        s.frect(b, u1 - 7, (v0 + v1) / 2 - 8, u1 - 4, (v0 + v1) / 2 + 8, "#16264A", sw=.4, face=face)


# ═══════════════════════════════════════════════ LIQUID-FILLED TRANSFORMERS ═══
def pm3_scene(s, inverter=False):
    """three-phase padmount, HV door open: loop-feed bushing wells and LV spades"""
    pad(s, -12, -12, 184, 172)
    tank = tbox(s, 12, 0, 10, 136, 96, 112, TANK)
    fins(s, 148, 8, 24, 7)
    for (u, t) in [(18, 12), (118, 12)]:
        s.box(12 + u, t, 122, 6, 6, 8, sw=.5)                       # lifting lugs
    s.vcyl(40, 30, 122, 6, 6)                                        # pressure relief
    cab = tbox(s, 0, 96, 10, 160, 50, 120, TANK)
    s.frect(cab, 82, 6, 156, 114, "#D5E0D4")                        # LV door (closed)
    s.fcircle(cab, 80, 60, 3.2, "#9AA7B7", sw=.5)                   # penta-head lock
    s.frect(cab, 4, 6, 78, 114, "#EEF3EE")                          # HV door opened
    for k in range(3):                                               # 6 bushing wells, 2 rows
        for row, v in enumerate((82, 46)):
            u = 16 + k * 22
            s.fcircle(cab, u, v, 6, "#fff", sw=.6)
            s.fcircle(cab, u, v, 2.6, "#16264A", sw=.4)
            s.fline(cab, u, v - 6, u, 8, "#5E6E88", .7)              # elbow cable down
    hv = s.fpt(cab, 38, 82)
    # open door swung out to the left
    P = s.P
    s.poly([P(0, 146, 16), P(-30, 196, 16), P(-30, 196, 124), P(0, 146, 124)], "#D5E0D4")
    if inverter:
        # inverter skid on the LV side with bus duct into the transformer cabinet
        tbox(s, 200, 70, 0, 96, 76, 8, DARKS)
        inv = tbox(s, 206, 76, 8, 84, 64, 96, GREY)
        s.louvers(inv, 6, 10, 60, 88, 9)
        s.frect(inv, 64, 50, 80, 86, "#1B3566", sw=.5)
        duct = tbox(s, 160, 112, 90, 46, 18, 16, GREY)
        s.callout(hv, 1, -66, -20)
        s.callout(s.fpt(duct, 23, 8), 2, 26, -60)
        s.callout(s.P(168, 40, 90), 3, 30, -70)
        s.callout(s.fpt(inv, 40, 50), 4, 40, 50)
    else:
        for k in range(4):
            s.fcircle(cab, 100 + k * 15, 80, 4.2, "#C27A3A", sw=.5)  # LV spade bushings (behind door line)
        s.callout(hv, 1, -66, -20)
        s.callout(s.fpt(cab, 120, 80), 2, 10, -86)
        s.callout(s.P(168, 40, 90), 3, 52, -30)
        s.callout(s.fpt(cab, 80, 60), 4, 20, 64)
        s.callout(s.tpt(tank, 34, 30), 5, -30, -56)


def pm1_scene(s):
    """single-phase low-profile padmount with the hood lifted"""
    pad(s, -10, -10, 150, 140)
    tank = tbox(s, 14, 0, 10, 100, 70, 62, TANK)
    tbox(s, 0, 70, 10, 128, 50, 10, TANK)
    # front compartment: HV elbows (left), LV bushings (right)
    comp = tbox(s, 0, 70, 20, 128, 50, 48, ("#EEF3EE", "#DDE6DC", "#C3D0C2"))
    for k in range(2):
        s.fcircle(comp, 18 + k * 22, 30, 5.5, "#fff", sw=.6)
        s.fcircle(comp, 18 + k * 22, 30, 2.4, "#16264A", sw=.4)
        s.fline(comp, 18 + k * 22, 24, 18 + k * 22, 4, "#5E6E88", .7)
    for k in range(3):
        s.fcircle(comp, 78 + k * 16, 30, 4, "#C27A3A", sw=.5)
    s.fline(comp, 64, 4, 64, 44, "#5E6E88", .6)                    # barrier
    # hood hinged at the back, lifted
    P = s.P
    s.poly([P(0, 4, 72), P(128, 4, 72), P(128, 60, 150), P(0, 60, 150)], "#D5E0D4")
    s.poly([P(128, 4, 72), P(128, 60, 150), P(128, 64, 146), P(128, 8, 70)], "#ABBCAA")
    s.callout(P(64, 34, 112), 1, -60, -40)
    s.callout(s.fpt(comp, 29, 30), 2, -64, 20)
    s.callout(s.fpt(comp, 94, 30), 3, 40, 40)
    s.callout(s.P(60, 120, 0), 4, 50, 30)


def unitsub_scene(s):
    """primary switch — transformer — secondary switchboard, close-coupled through throats"""
    sw_ = tbox(s, -120, 10, 0, 80, 90, 190, GREY)                  # MV primary switch
    s.frect(sw_, 8, 110, 72, 150, "#E4EAF2")
    s.frect(sw_, 20, 122, 60, 140, "#1B3566", sw=.5)                # viewing window
    s.fcircle(sw_, 40, 70, 7, "#F4C542", sw=.5)                     # operating handle
    tbox(s, -40, 34, 120, 40, 40, 40, GREY)
    tank = tbox(s, 0, 0, 10, 150, 110, 150, GREY)
    for u in (20, 46, 72, 98, 124):
        s.fline(tank, u, 6, u, 140, "#9EAEC4", .8)
    s.frect(tank, 10, 100, 40, 118, "#fff", sw=.4)
    s.fcircle(tank, 64, 112, 7, "#fff", sw=.6)
    radiators(s, 150, 8, 22, 4, gap=10)
    throat2 = tbox(s, 150, 52, 110, 34, 40, 40, GREY)
    lv = tbox(s, 184, 20, 0, 120, 90, 200, GREY)
    for i in range(2):
        s.frect(lv, 6 + i * 58, 8, 56 + i * 58, 192, "#E4EAF2")
    s.frect(lv, 18, 120, 44, 160, "#2A3A5E", sw=.6)
    for r in range(6):
        s.frect(lv, 74, 30 + r * 24, 100, 42 + r * 24, "#2A3A5E", sw=.3)
    s.callout(s.fpt(sw_, 40, 130), 1, -60, -30)
    s.callout(s.P(75, 55, 160), 2, -20, -80)
    s.callout(s.fpt(throat2, 17, 20), 3, 10, -90)
    s.callout(s.fpt(lv, 87, 100), 4, 50, 40)


def power_scene(s, fans_on=True, ltc=True):
    """substation power transformer: conservator, bushings, radiators with fans, LTC cabinet"""
    tbox(s, -6, -6, 0, 162, 122, 10, GREY)
    tank = tbox(s, 0, 0, 10, 150, 110, 150, GREY)
    for u in (20, 46, 72):
        s.fline(tank, u, 6, u, 140, "#9EAEC4", .8)
    s.frect(tank, 10, 100, 40, 118, "#fff", sw=.4)
    s.fcircle(tank, 64, 112, 7, "#fff", sw=.6)
    radiators(s, 150, 8, 22, 9)
    if fans_on:
        for k in range(3):
            fan(s, 196, 22 + k * 30, 30, 11)
            tbox(s, 182, 14 + k * 30, 22, 4, 16, 16, DARKS, sw=.5)
    cc = tbox(s, 92, 110, 40, 44, 16, 62, GREY)
    s.frect(cc, 4, 6, 40, 56, "#E4EAF2")
    if ltc:
        lt = tbox(s, 20, 110, 30, 50, 20, 80, GREY)
        s.frect(lt, 5, 8, 45, 72, "#E4EAF2")
        s.fcircle(lt, 25, 50, 6, "#fff", sw=.5)
    s.box(14, 6, 190, 104, 22, 22)
    for u in (30, 100):
        s.box(u, 14, 160, 4, 4, 30, sw=.5)
    for k in range(3):
        s.bushing(40 + k * 36, 48, 160, 58, 7.5, sheds=5)
    for k in range(4):
        s.bushing(34 + k * 28, 90, 160, 26, 5, sheds=2, color="#D9DEE6")
    s.callout(s.P(76, 48, 216), 1, -40, -36)
    s.callout(s.P(62, 90, 184), 2, -66, -10)
    s.callout(s.P(180, 50, 120), 3, 54, -20)
    s.callout(s.P(196, 82, 30), 4, 60, 30)
    s.callout(s.fpt(lt, 25, 50) if ltc else s.fpt(cc, 22, 30), 5, -40, 60)
    s.callout(s.P(70, 16, 212), 6, 40, -60)


def portable_scene(s):
    """trailer-mounted substation: transformer, HV disconnect, LV switchgear house"""
    # trailer deck, gooseneck and wheels
    for x in (190, 214, 238):
        wheel(s, x, 4)
        wheel(s, x, 96)
    tbox(s, -40, 0, 14, 320, 100, 10, DARKS)
    neck = tbox(s, -110, 22, 34, 74, 56, 8, DARKS)
    for x in (-30, 270):
        tbox(s, x, 100, 0, 8, 8, 14, DARKS, sw=.5)                  # outrigger jacks
    tank = tbox(s, 60, 6, 24, 120, 88, 110, GREY)
    radiators(s, 180, 12, 34, 6, gap=12, depth=18, h=84)
    for k in range(3):
        s.bushing(84 + k * 30, 40, 134, 40, 6, sheds=4)
    hv = tbox(s, -30, 14, 24, 70, 72, 70, GREY)                      # HV disconnect / breaker
    s.frect(hv, 6, 10, 64, 60, "#E4EAF2")
    s.fcircle(hv, 35, 34, 6, "#F4C542", sw=.5)
    house = tbox(s, 210, 6, 24, 70, 88, 112, GREY)                    # LV switchgear house
    s.frect(house, 10, 6, 40, 92, "#E4EAF2")
    s.frect(house, 34, 44, 37, 58, "#16264A", sw=.4)
    s.callout(s.P(114, 40, 176), 1, -30, -50)
    s.callout(s.fpt(hv, 35, 34), 2, -60, -30)
    s.callout(s.fpt(house, 25, 70), 3, 40, -50)
    s.callout(s.fpt(neck, 37, 4), 4, -50, 30)
    s.callout(s.P(274, 108, 4), 5, 40, 30)


def pole3_scene(s):
    """three-phase polemount: rectangular tank, three HV bushings, crossarm"""
    s.vcyl(0, 0, 0, 340, 9, fill="#D8D2C4")
    s.box(-90, -6, 300, 180, 12, 10)
    for x in (-72, 0, 72):
        s.bushing(x, 0, 310, 20, 5, sheds=2)
    for z in (160, 236):
        s.box(-4, 6, z, 8, 22, 8)
    tank = tbox(s, -34, 26, 140, 68, 58, 110, GREY)
    fins(s, 34, 32, 152, 4, gap=12, depth=10, h=80)
    s.box(-36, 24, 250, 72, 62, 5)
    for k in range(3):
        s.bushing(-18 + k * 18, 55, 255, 26, 5, sheds=3)
    for k in range(4):
        s.fcircle(tank, 12 + k * 15, 92, 3.4, "#C27A3A", sw=.5)
    for k, x in enumerate((-72, 0, 72)):
        s.line(s.P(x, 0, 330), s.P(-18 + k * 18, 55, 281), sw=.6)
    s.vcyl(60, 6, 262, 34, 3.5, bands=3)
    s.callout(s.P(0, 55, 290), 1, 50, -40)
    s.callout(s.fpt(tank, 34, 60), 2, -80, 10)
    s.callout(s.fpt(tank, 34, 92), 3, 60, 20)
    s.callout(s.P(0, 10, 200), 4, -70, -10)
    s.callout(s.P(60, 6, 280), 5, 50, -20)


def pole1_scene(s):
    extra_art.draw_polemount(s, call=True)


# ── liquid-filled schematics ──
def feed_dwg(single=False):
    d = DW()
    n = "1" if single else "3"
    # radial
    d.text(60, -8, "RADIAL FEED", 7, fill=INK, weight=700)
    d.line(10, 10, 60, 10, 1.4)
    d.text(10, 4, "MV CABLE IN", 5.6, anchor="start")
    d.line(60, 10, 60, 30, 1)
    d.rect(42, 30, 36, 40, 1.1, "#fff", rx=3)
    coil(d, 54, 36, 3, 4); coil(d, 66, 36, 3, 4)
    d.text(60, 82, f"{n}φ PADMOUNT", 6, fill=INK)
    d.line(60, 70, 60, 96, 1, ACC)
    d.text(60, 106, "LOAD", 6, fill=ACC, weight=700)
    # loop
    ox = 150
    d.text(ox + 60, -8, "LOOP FEED", 7, fill=INK, weight=700)
    d.line(ox, 10, ox + 40, 10, 1.4)
    d.line(ox + 80, 10, ox + 120, 10, 1.4)
    d.text(ox, 4, "IN", 5.6, anchor="start"); d.text(ox + 120, 4, "OUT", 5.6, anchor="end")
    d.line(ox + 40, 10, ox + 40, 30, 1); d.line(ox + 80, 10, ox + 80, 30, 1)
    d.rect(ox + 30, 30, 60, 40, 1.1, "#fff", rx=3)
    d.line(ox + 40, 30, ox + 80, 30, 1.6, ACC)
    coil(d, ox + 54, 38, 3, 4); coil(d, ox + 66, 38, 3, 4)
    d.text(ox + 60, 82, "LOOP STAYS LIVE", 6, fill=ACC, weight=700)
    d.line(ox + 60, 70, ox + 60, 96, 1, ACC)
    d.text(ox + 60, 106, "LOAD", 6, fill=ACC, weight=700)
    d.label(140, 132, "HOW THE MV CABLE CONNECTS")
    return d.svg()


def split_phase_dwg():
    d = DW()
    coil(d, 40, 10, 6, 6)
    d.text(30, 4, "H1", 6.4, anchor="end", fill=INK, weight=700)
    d.text(30, 84, "H2", 6.4, anchor="end", fill=INK, weight=700)
    for x in (66, 70):
        d.line(x, 6, x, 86, .9)
    coil(d, 96, 10, 3, 6); coil(d, 96, 50, 3, 6)
    for y, lab in ((10, "X1"), (48, "X2"), (86, "X3")):
        d.line(96, y, 150, y, 1.2, ACC)
        d.circle(150, y, 3, .9, "#fff", ACC)
        d.text(160, y + 2, lab, 6.4, anchor="start", fill=ACC, weight=700)
    ground(d, 120, 48)
    d.text(196, 31, "120 V", 6.4, fill=ACC, weight=700)
    d.text(196, 69, "120 V", 6.4, fill=ACC, weight=700)
    d.line(184, 10, 184, 86, .6, ACC, "3 2")
    d.text(212, 50, "240 V", 6.4, anchor="start", fill=ACC, weight=700)
    d.label(120, 116, "SPLIT-PHASE 120/240 V SECONDARY")
    return d.svg()


def stepup_dwg():
    d = DW()
    chain(d, [("PV / BESS", "DC", False), ("INVERTER", "AC 600 V", False), ("STEP-UP", "inverter duty", True), ("COLLECTOR", "MV bus", False), ("GRID", "POI", False)], gap=70)
    d.path("M150,74 l6,-8 l6,8 l6,-8 l6,8 l6,-8 l6,8", .9, stroke=ACC, pts=((150, 64), (186, 76)))
    d.text(168, 90, "PWM ripple · reverse flow", 6, fill=ACC)
    d.text(168, 100, "electrostatic shield", 6, fill=INK)
    d.label(170, 126, "STEP-UP FOR SOLAR & STORAGE")
    return d.svg()


def unitsub_sld():
    d = DW()
    d.text(60, -26, "UTILITY / MV FEEDER", 6.6, fill=INK, weight=700)
    d.line(60, -20, 60, 0, 1.2)
    draw2d._brk(d, 60, 0, "switch", 26)
    draw2d._brk(d, 60, 26, "fuse", 20)
    d.line(60, 46, 60, 58, 1)
    d.circle(60, 66, 9, 1.1, "#fff"); d.circle(60, 78, 9, 1.1)
    d.text(80, 74, "TRANSFORMER", 6, anchor="start", fill=ACC, weight=700)
    d.line(60, 87, 60, 100, 1)
    draw2d._brk(d, 60, 100, "drawout", 24)
    d.line(10, 134, 210, 134, 2.4)
    d.line(60, 124, 60, 134, 1)
    for x in (30, 90, 150, 190):
        d.line(x, 134, x, 146, 1)
        draw2d._brk(d, x, 146, "cb", 20)
        d.line(x, 166, x, 176, 1)
    d.text(110, 128, "SECONDARY BUS", 6, fill=ACC)
    d.rect(-14, -4, 100, 54, .6, "none", ACC, dash="4 3")
    d.text(-10, 56, "PRIMARY", 5.6, anchor="start", fill=ACC)
    d.label(100, 200, "UNIT SUBSTATION — ONE-LINE")
    return d.svg()


def cooling_dwg():
    d = DW()
    rows = [("ONAN", "oil natural · air natural", "100%"), ("ONAF", "+ fans on radiators", "133%"), ("ONAF2", "+ second fan stage", "167%")]
    for i, (t, sub, pct) in enumerate(rows):
        y = i * 34
        d.text(0, y + 14, t, 7, anchor="start", fill=INK, weight=700)
        d.text(0, y + 24, sub, 5.6, anchor="start")
        w = [90, 120, 150][i]
        d.rect(100, y + 6, w, 16, 1, "#fff" if i else "#fff", ACC if i else INK, rx=2)
        d.text(104 + w, y + 18, pct, 6.6, anchor="start", fill=ACC if i else INK, weight=700)
    d.text(100, 112, "Typical capacity vs. base rating", 5.8, anchor="start")
    d.label(130, 136, "COOLING CLASSES")
    return d.svg()


def portable_sld():
    d = DW()
    chain(d, [("LINE", "HV", False), ("DISCONNECT", "+ breaker", False), ("XFMR", "on trailer", True), ("LV GEAR", "on board", False), ("LOAD", "site", False)], gap=70)
    d.text(140, 72, "ARRIVES ENERGIZE-READY", 6, fill=ACC, weight=700)
    d.label(170, 104, "PORTABLE SUBSTATION — ONE-LINE")
    return d.svg()


def pole_ga():
    return extra_art.ga_polemount()


# ═══════════════════════════════════════════ SWITCHBOARDS & SWITCHGEAR ═══
def sections(s, n, W=54, D=46, H=206, x0=0):
    s.box(x0, 0, 0, W * n, D, 6, top="#7D8DA7", front=shade("#7D8DA7", .85), side=shade("#7D8DA7", .7))
    return [s.box(x0 + i * W, 0, 6, W, D, H) for i in range(n)]


def feeders(s, b, rows=9, W=54):
    s.frect(b, 3, 6, W - 3, 200, "#E4EAF2")
    for r in range(rows):
        v = 24 + r * 19
        for c in range(2):
            s.frect(b, 10 + c * 20, v, 24 + c * 20, v + 9, "#2A3A5E", sw=.3)


def big_breaker(s, b, v=70, W=54):
    s.frect(b, 3, 6, W - 3, 136, "#E4EAF2")
    s.frect(b, 12, v, 42, v + 44, "#2A3A5E", sw=.6)
    s.frect(b, 22, v + 14, 32, v + 30, "#F4C542", sw=.3)


def meter(s, b, v=160, W=54):
    s.frect(b, 3, 140, W - 3, 202, "#E4EAF2")
    s.frect(b, 12, v, 42, v + 28, "#1B3566", sw=.6)


def svc_entrance_scene(s):
    b = sections(s, 3)
    meter(s, b[0]); big_breaker(s, b[0])
    s.fcircle(b[0], 27, 50, 5, "#fff", sw=.5)                        # ground-fault relay
    for k in (1, 2):
        feeders(s, b[k])
    s.louvers(b[2], 8, 150, 40, 196, 6, face="s")
    s.callout(s.fpt(b[0], 27, 175), 1, -58, -26)
    s.callout(s.fpt(b[0], 27, 92), 2, -60, 10)
    s.callout(s.fpt(b[0], 27, 50), 3, -40, 50)
    s.callout(s.fpt(b[1], 24, 150), 4, -10, -70)


def mtm_scene(s):
    b = sections(s, 5)
    for i in (0, 4):
        meter(s, b[i]); big_breaker(s, b[i])
    big_breaker(s, b[2]); s.frect(b[2], 3, 140, 51, 202, "#E4EAF2")
    for i in (1, 3):
        feeders(s, b[i])
    s.callout(s.fpt(b[0], 27, 92), 1, -60, 10)
    s.callout(s.fpt(b[2], 27, 92), 2, -10, -150)
    s.callout(s.fpt(b[4], 27, 92), 3, 40, 60)
    s.callout(s.fpt(b[1], 24, 160), 4, -30, -80)


def utility_scene(s):
    b = sections(s, 3, W=60)
    s.frect(b[0], 3, 6, 57, 202, "#E4EAF2")                          # sealable CT compartment
    for v in (40, 100):
        s.fcircle(b[0], 50, v, 2.4, "#9AA7B7", sw=.4)                 # seal points
    s.fcircle(b[0], 30, 168, 11, "#fff", sw=.6)                       # meter socket
    s.fcircle(b[0], 30, 168, 6, "#1B3566", sw=.4)
    big_breaker(s, b[1], W=60); meter(s, b[1], W=60)
    feeders(s, b[2], W=60)
    s.callout(s.fpt(b[0], 30, 70), 1, -60, 10)
    s.callout(s.fpt(b[0], 30, 168), 2, -50, -40)
    s.callout(s.fpt(b[1], 30, 92), 3, -10, 80)
    s.callout(s.fpt(b[2], 30, 160), 4, 40, -60)


def integrated_scene(s):
    b = sections(s, 4)
    meter(s, b[0]); big_breaker(s, b[0])
    feeders(s, b[1])
    s.frect(b[2], 3, 6, 51, 202, "#E4EAF2")                          # transformer section
    s.louvers(b[2], 8, 20, 46, 70, 6)
    s.louvers(b[2], 8, 150, 46, 196, 6)
    s.frect(b[3], 3, 6, 51, 202, "#E4EAF2")                          # panelboards
    for k in range(2):
        s.frect(b[3], 8, 20 + k * 92, 46, 100 + k * 92, "#F1F4F8")
        for r in range(6):
            s.fline(b[3], 14, 32 + k * 92 + r * 10, 40, 32 + k * 92 + r * 10, "#5E6E88", .5)
    s.louvers(b[3], 8, 150, 40, 196, 6, face="s")
    s.callout(s.fpt(b[0], 27, 92), 1, -60, 10)
    s.callout(s.fpt(b[1], 24, 160), 2, -20, -80)
    s.callout(s.fpt(b[2], 27, 45), 3, 10, 70)
    s.callout(s.fpt(b[3], 27, 150), 4, 40, -50)


def ats_scene(s):
    s.box(0, 0, 0, 70, 56, 6, top="#7D8DA7", front=shade("#7D8DA7", .85), side=shade("#7D8DA7", .7))
    c = s.box(0, 0, 6, 70, 56, 210)
    s.frect(c, 4, 6, 66, 204, "#E4EAF2")
    for k, v in enumerate((120, 40)):
        s.frect(c, 14, v, 56, v + 50, "#2A3A5E", sw=.6)
        s.frect(c, 30, v + 16, 40, v + 34, "#F4C542", sw=.3)
    s.frect(c, 16, 178, 54, 198, "#1B3566", sw=.5)                    # controller display
    for k in range(3):
        s.fcircle(c, 24 + k * 11, 172, 2.2, ["#2FCF7D", "#F4C542", "#E5484D"][k], sw=.3)
    s.louvers(c, 8, 20, 48, 200, 10, face="s")
    s.callout(s.fpt(c, 35, 145), 1, -60, -20)
    s.callout(s.fpt(c, 35, 65), 2, -60, 20)
    s.callout(s.fpt(c, 35, 188), 3, 40, -50)
    s.callout(s.spt(c, 28, 20), 4, 50, 40)


def lis_scene(s, padmounted=False):
    """metal-enclosed load-interrupter lineup: viewing windows, switch handles, fuse doors"""
    W, D, H = 64, 70, 200
    s.box(0, 0, 0, W * 3, D, 6, top="#7D8DA7", front=shade("#7D8DA7", .85), side=shade("#7D8DA7", .7))
    bays = [s.box(i * W, 0, 6, W, D, H) for i in range(3)]
    for i, b in enumerate(bays):
        s.frect(b, 4, 100, W - 4, 196, "#E4EAF2")                     # upper switch door
        s.frect(b, 16, 140, 48, 176, "#1B3566", sw=.5)                 # viewing window
        s.fline(b, 22, 150, 42, 168, "#F4C542", 1)                     # visible blade
        s.frect(b, 4, 6, W - 4, 96, "#E4EAF2")                         # fuse / cable door
        for k in range(3):
            s.frect(b, 14 + k * 14, 40, 22 + k * 14, 78, "#fff", sw=.4)  # fuses
        s.fcircle(b, W - 10, 120, 5, "#F4C542", sw=.5)                 # operating handle
    s.callout(s.fpt(bays[0], 32, 158), 1, -60, -30)
    s.callout(s.fpt(bays[0], 54, 120), 2, -70, 20)
    s.callout(s.fpt(bays[1], 32, 60), 3, -10, 80)
    s.callout(s.spt(bays[2], 35, 50), 4, 50, 40)


def padsg_scene(s):
    """low-profile pad-mounted switchgear: front and rear doors, switched and fused ways"""
    pad(s, -12, -12, 214, 132)
    b = tbox(s, 0, 0, 10, 190, 108, 96, TANK)
    s.box(-3, -3, 106, 196, 114, 5, top=TANK[0], front=TANK[1], side=TANK[2])
    for k in range(2):
        s.frect(b, 6 + k * 92, 6, 90 + k * 92, 90, "#D5E0D4")
    for k in range(4):
        u = 22 + k * 46
        s.fcircle(b, u, 46, 6, "#fff", sw=.6)
        s.fcircle(b, u, 46, 2.6, "#16264A", sw=.4)
        s.fline(b, u, 40, u, 10, "#5E6E88", .7)
        s.frect(b, u - 9, 66, u + 9, 80, "#fff", sw=.4)               # way label
    s.fcircle(b, 94, 50, 3.2, "#9AA7B7", sw=.5)
    s.callout(s.tpt(b, 90, 30), 1, -40, -60)
    s.callout(s.fpt(b, 22, 73), 2, -60, -30)
    s.callout(s.fpt(b, 160, 73), 3, 40, -60)
    s.callout(s.fpt(b, 68, 46), 4, -20, 80)
    s.callout(s.P(180, 120, 0), 5, 50, 30)


def arc_scene(s):
    """metal-clad lineup with the arc plenum ducted out through the side to a vent chimney"""
    pa.draw_mv_switchgear(s, call=True)
    s.box(248, 2, 240, 46, 26, 16, top="#E6EBF2", front="#C9D3E0", side="#AAB8CB")      # duct off the plenum
    s.box(294, 0, 240, 28, 30, 84, top="#E6EBF2", front="#C9D3E0", side="#AAB8CB")      # vent chimney
    s.box(290, -4, 324, 36, 38, 5)                                                       # rain cap
    s.callout(s.P(308, 15, 300), 6, 50, -20)


def mvse_scene(s):
    W, D, H = 60, 80, 220
    s.box(0, 0, 0, W * 3, D, 6, top="#7D8DA7", front=shade("#7D8DA7", .85), side=shade("#7D8DA7", .7))
    bays = [s.box(i * W, 0, 6, W, D, H) for i in range(3)]
    b0, b1, b2 = bays
    s.frect(b0, 4, 6, W - 4, 214, "#E4EAF2")                          # utility metering cubicle
    for v in (60, 150):
        s.fcircle(b0, W - 10, v, 2.4, "#9AA7B7", sw=.4)
    s.frect(b0, 14, 160, 46, 196, "#fff", sw=.5)
    for b in (b1, b2):
        s.frect(b, 4, 120, W - 4, 214, "#E4EAF2")
        s.frect(b, 12, 150, 48, 200, "#16264A", sw=.5)                # relay panel
        s.frect(b, 4, 6, W - 4, 116, "#E4EAF2")
        s.frect(b, 12, 30, 48, 90, "#2A3A5E", sw=.6)                  # draw-out VCB
    s.callout(s.fpt(b0, 30, 178), 1, -60, -20)
    s.callout(s.fpt(b1, 30, 60), 2, -20, 80)
    s.callout(s.fpt(b1, 30, 175), 3, -10, -80)
    s.callout(s.fpt(b2, 30, 60), 4, 50, 50)


def metering_scene(s):
    s.box(0, 0, 0, 80, 70, 6, top="#7D8DA7", front=shade("#7D8DA7", .85), side=shade("#7D8DA7", .7))
    c = s.box(0, 0, 6, 80, 70, 200)
    s.frect(c, 4, 6, 76, 196, "#E4EAF2")
    for v in (40, 160):
        s.fcircle(c, 70, v, 2.4, "#9AA7B7", sw=.4)
    s.frect(c, 20, 140, 60, 176, "#1B3566", sw=.5)                     # window
    for k in range(3):
        s.fcircle(c, 22 + k * 18, 158, 5, "#fff", sw=.4)               # CTs seen through window
    s.frect(c, 14, 30, 66, 70, "#fff", sw=.5)                          # PT drawer
    s.fcircle(c, 40, 50, 4, "#9AA7B7", sw=.4)
    s.box(80, 30, 120, 10, 26, 40)                                     # meter enclosure on side
    s.callout(s.fpt(c, 40, 158), 1, -60, -30)
    s.callout(s.fpt(c, 40, 50), 2, -60, 20)
    s.callout(s.P(90, 43, 140), 3, 50, -30)
    s.callout(s.fpt(c, 70, 100), 4, 40, 50)


def ehouse_scene(s):
    """walk-in power house on a structural skid"""
    tbox(s, -10, -10, 0, 340, 130, 14, DARKS)                         # skid base
    h = tbox(s, 0, 0, 14, 320, 110, 120, GREY)
    s.box(-6, -6, 134, 332, 122, 6)                                    # roof overhang
    s.frect(h, 30, 6, 64, 100, "#E4EAF2")                             # personnel door
    s.frect(h, 56, 46, 60, 60, "#16264A", sw=.4)
    s.frect(h, 250, 6, 300, 100, "#E4EAF2")                           # equipment double door
    s.fline(h, 275, 6, 275, 100, "#5E6E88", .6)
    s.frect(h, 120, 80, 200, 96, "#fff", sw=.4)                        # nameplate band
    hv = tbox(s, 320, 30, 60, 18, 50, 50, GREY)                        # wall HVAC unit
    s.louvers(hv, 4, 6, 44, 46, 5, face="s")
    for u in (20, 300):
        s.box(u, 110, 14, 10, 10, 6, sw=.5)                            # lifting lugs at base
    tbox(s, 140, 110, 0, 50, 20, 14, DARKS, sw=.6)                     # cable entry box
    s.callout(s.spt(hv, 25, 30), 1, 50, -40)
    s.callout(s.fpt(h, 47, 60), 2, -60, -40)
    s.callout(s.fpt(h, 275, 60), 3, 20, -70)
    s.callout(s.P(165, 130, 7), 4, -10, 60)
    s.callout(s.P(20, 120, 4), 5, -60, 30)


# ── switchgear schematics ──
def sld_service():
    d = DW()
    d.text(60, -28, "UTILITY", 6.6, fill=INK, weight=700)
    d.line(60, -22, 60, -4, 1.2)
    d.circle(60, 2, 5, .9); d.text(72, 5, "CT · METER", 5.8, anchor="start", fill=ACC)
    d.line(60, 8, 60, 16, 1)
    draw2d._brk(d, 60, 16, "cb", 28)
    d.text(46, 32, "MAIN", 6, anchor="end", fill=INK, weight=700)
    d.text(76, 32, "GF", 6, anchor="start", fill=ACC, weight=700)
    d.line(60, 44, 60, 56, 1)
    d.line(10, 56, 210, 56, 2.4)
    for x in (30, 75, 120, 165, 200):
        d.line(x, 56, x, 66, 1); draw2d._brk(d, x, 66, "cb", 20); d.line(x, 86, x, 96, 1)
    d.label(110, 124, "SERVICE ENTRANCE — ONE-LINE")
    return d.svg()


def sld_utility():
    d = DW()
    d.text(40, -28, "UTILITY SERVICE", 6.6, fill=INK, weight=700)
    d.line(40, -22, 40, 0, 1.2)
    d.rect(10, 0, 60, 44, .9, "none", ACC, dash="4 3")
    for k in range(3):
        d.circle(22 + k * 18, 20, 5, .9)
    d.text(40, 54, "SEALED CT · UTILITY ONLY", 5.6, fill=ACC, weight=700)
    d.line(70, 20, 110, 20, .7, ACC, "3 2"); d.circle(118, 20, 8, .9, "#fff", ACC); d.text(118, 22.5, "kWh", 5, fill=ACC)
    d.line(40, 44, 40, 70, 1)
    draw2d._brk(d, 40, 70, "cb", 26)
    d.line(40, 96, 40, 106, 1)
    d.line(10, 106, 200, 106, 2.4)
    for x in (60, 105, 150, 190):
        d.line(x, 106, x, 116, 1); draw2d._brk(d, x, 116, "cb", 20)
    d.label(100, 162, "UTILITY-METERED SERVICE")
    return d.svg()


def sld_integrated():
    d = DW()
    d.text(30, -24, "SERVICE", 6.6, fill=INK, weight=700)
    d.line(30, -18, 30, 0, 1.2)
    draw2d._brk(d, 30, 0, "cb", 26)
    d.line(30, 26, 30, 40, 1)
    d.line(0, 40, 200, 40, 2.4)
    for x in (20, 60):
        d.line(x, 40, x, 50, 1); draw2d._brk(d, x, 50, "cb", 20)
    d.line(140, 40, 140, 50, 1); draw2d._brk(d, 140, 50, "cb", 20); d.line(140, 70, 140, 80, 1)
    d.circle(140, 88, 8, 1.1, "#fff"); d.circle(140, 99, 8, 1.1)
    d.text(156, 96, "600–120/208", 5.6, anchor="start", fill=ACC)
    d.line(140, 107, 140, 120, 1)
    d.rect(110, 120, 60, 40, 1, "#fff", ACC, rx=3)
    for r in range(4):
        d.line(118, 128 + r * 8, 162, 128 + r * 8, .6, ACC)
    d.text(140, 172, "PANELBOARD", 6, fill=ACC, weight=700)
    d.rect(-14, -30, 230, 210, .6, "none", INK, dash="5 3")
    d.text(-10, 192, "ONE FACTORY-WIRED LINEUP", 6, anchor="start", fill=INK, weight=700)
    d.label(100, 216, "INTEGRATED SWITCHBOARD")
    return d.svg()


def sld_ats():
    d = DW()
    for x, lab in ((30, "UTILITY"), (170, "GENERATOR")):
        d.text(x, -24, lab, 6.6, fill=INK, weight=700)
        d.line(x, -18, x, 10, 1.2)
    d.circle(170, -2, 7, .9, "#fff"); d.text(170, 0.5, "G", 6.4, fill=INK, weight=700)
    d.rect(10, 10, 180, 60, 1.1, "#fff", ACC, rx=4)
    d.text(100, 24, "AUTOMATIC TRANSFER SWITCH", 6.2, fill=ACC, weight=700)
    d.line(30, 10, 30, 40, 1); d.line(170, 10, 170, 40, 1)
    d.line(30, 40, 100, 56, 1.4, ACC)
    d.circle(100, 56, 2.4, .9, "#fff", ACC)
    d.line(170, 40, 120, 46, .9, INK, "3 2")
    d.line(100, 56, 100, 96, 1.2)
    d.text(100, 108, "CRITICAL LOAD", 6.4, fill=INK, weight=700)
    d.label(100, 132, "TRANSFER ON LOSS OF UTILITY")
    return d.svg()


def sld_lis():
    d = DW()
    d.text(60, -26, "MV FEEDER", 6.6, fill=INK, weight=700)
    d.line(60, -20, 60, 0, 1.2)
    draw2d._brk(d, 60, 0, "switch", 28)
    d.text(76, 16, "LOAD-BREAK SWITCH", 5.8, anchor="start", fill=ACC, weight=700)
    draw2d._brk(d, 60, 28, "fuse", 24)
    d.text(76, 42, "CURRENT-LIMITING FUSE", 5.8, anchor="start", fill=INK)
    d.line(60, 52, 60, 64, 1)
    d.circle(60, 72, 9, 1.1, "#fff"); d.circle(60, 84, 9, 1.1)
    d.text(76, 80, "TRANSFORMER", 5.8, anchor="start", fill=INK)
    d.line(60, 93, 60, 106, 1)
    d.label(80, 130, "SWITCH + FUSE PROTECTION")
    return d.svg()


def sld_padsg():
    d = DW()
    d.line(0, 20, 220, 20, 2.4)
    d.text(110, 10, "BUS INSIDE THE PAD-MOUNTED UNIT", 6, fill=ACC)
    for i, (x, kind, lab) in enumerate(((20, "switch", "LOOP IN"), (80, "switch", "LOOP OUT"), (140, "fuse", "TAP"), (200, "fuse", "TAP"))):
        d.line(x, 20, x, 30, 1)
        draw2d._brk(d, x, 30, kind, 24)
        d.line(x, 54, x, 70, 1)
        d.text(x, 82, lab, 6, fill=INK, weight=700)
        d.text(x, 92, "WAY " + str(i + 1), 5.4)
    d.label(110, 118, "FOUR-WAY LOOP SWITCHING")
    return d.svg()


def ehouse_plan():
    d = DW()
    d.rect(0, 0, 300, 100, 1.4, "#fff")
    d.rect(10, 8, 120, 26, 1, "#fff", ACC); d.text(70, 24, "MV SWITCHGEAR", 6.2, fill=ACC, weight=700)
    d.rect(150, 8, 140, 26, 1, "#fff"); d.text(220, 24, "LV SWITCHBOARD", 6.2, fill=INK, weight=700)
    d.rect(10, 70, 90, 22, 1, "#fff"); d.text(55, 84, "CONTROLS / RTU", 5.8, fill=INK)
    d.rect(200, 70, 90, 22, 1, "#fff"); d.text(245, 84, "BATTERY / UPS", 5.8, fill=INK)
    d.line(0, 52, 300, 52, .5, "#8EA0BC", "6 3")
    d.text(150, 56, "MAINTENANCE AISLE", 5.8, fill="#5E6E88")
    d.rect(300, 36, 14, 28, 1, "#fff"); d.text(330, 52, "HVAC", 5.8, anchor="start", fill=INK)
    d.line(-1, 74, -1, 96, 2.4, ACC); d.text(-8, 88, "DOOR", 5.4, anchor="end", fill=ACC)
    d.label(150, 126, "WALK-IN POWER HOUSE — PLAN")
    return d.svg()


# ═══════════════════════════════════════════════════════════ LOAD BANKS ═══
def lb_box(s, x, y, z, w, d, h, panel=True):
    b = tbox(s, x, y, z, w, d, h, GREY)
    s.louvers(b, 8, 10, w * .62, h - 10, max(6, int(h / 9)))
    if panel:
        s.frect(b, w * .7, 22, w - 8, h - 16, "#E4EAF2")
        s.frect(b, w * .74, h - 40, w - 14, h - 24, "#1B3566", sw=.5)
    return b


def lb_portable(s):
    for x, y in ((8, 8), (8, 70), (112, 8), (112, 70)):
        wheel(s, x, y, 7)
    b = lb_box(s, 0, 0, 14, 120, 78, 88)
    s.box(-14, 30, 70, 14, 4, 4, sw=.5)                               # push handle
    s.box(-14, 50, 70, 14, 4, 4, sw=.5)
    s.box(-18, 30, 70, 4, 24, 4, sw=.5)
    for k in range(5):
        s.fcircle(b, 96, 28 + k * 9, 2.8, ["#E5484D", "#F4C542", "#3F7BEA", "#16264A", "#2FCF7D"][k], sw=.4, face="s")
    s.top_ellipse(46, 40, 102, 20, "#C3CEDC")
    s.top_ellipse(46, 40, 102, 6, "#3A4C6E")
    s.callout(s.fpt(b, 36, 50), 1, -60, 20)
    s.callout(s.fpt(b, 100, 62), 2, 20, -70)
    s.callout(s.spt(b, 50, 46), 3, 50, 10)
    s.callout(s.P(112, 78, 2), 4, 40, 40)


def lb_rl(s):
    skid(s, -6, 0, 260, 96)
    r = lb_box(s, 0, 0, 10, 120, 96, 112, panel=False)
    for k in range(2):
        fan(s, 30 + k * 60, 48, 122, 20)
    x = tbox(s, 126, 0, 10, 130, 96, 112, GREY)
    s.frect(x, 6, 10, 80, 104, "#E4EAF2")
    for k in range(3):                                                  # reactor coils visible through mesh
        s.fcircle(x, 20 + k * 22, 56, 9, "#fff", sw=.6)
        s.fcircle(x, 20 + k * 22, 56, 4, "#C27A3A", sw=.4)
    s.frect(x, 88, 22, 124, 96, "#E4EAF2")
    s.frect(x, 92, 70, 120, 88, "#1B3566", sw=.5)
    s.callout(s.fpt(r, 40, 60), 1, -60, 20)
    s.callout(s.fpt(x, 42, 56), 2, -10, 80)
    s.callout(s.fpt(x, 106, 79), 3, 40, -60)
    s.callout(s.P(60, 48, 122), 4, -40, -60)


def lb_dc(s):
    s.box(0, 0, 0, 90, 70, 6, top="#7D8DA7", front=shade("#7D8DA7", .85), side=shade("#7D8DA7", .7))
    c = tbox(s, 0, 0, 6, 90, 70, 180, GREY)
    s.louvers(c, 8, 10, 82, 70, 7)
    s.frect(c, 8, 90, 82, 172, "#E4EAF2")
    s.frect(c, 16, 140, 74, 164, "#1B3566", sw=.5)
    for k in range(4):
        s.frect(c, 14 + k * 17, 100, 26 + k * 17, 128, "#2A3A5E", sw=.4)   # step contactors
    for k, col in enumerate(("#E5484D", "#16264A")):
        s.vcyl(98, 24 + k * 22, 60, 12, 5, fill=col)                     # DC +/− studs on side
    s.callout(s.fpt(c, 45, 40), 1, -60, 20)
    s.callout(s.fpt(c, 45, 114), 2, -60, -20)
    s.callout(s.fpt(c, 45, 152), 3, 30, -60)
    s.callout(s.P(98, 35, 72), 4, 50, 20)


def lb_trailer(s):
    for x in (150, 174):
        wheel(s, x, 4, 11)
        wheel(s, x, 90, 11)
    tbox(s, -20, 0, 14, 240, 94, 8, DARKS)
    tbox(s, -80, 40, 22, 60, 14, 6, DARKS)                              # tongue
    s.vcyl(-80, 47, 0, 22, 3)                                            # jack
    b = lb_box(s, 0, 4, 22, 200, 86, 92)
    s.frect(b, 4, 10, 30, 82, "#E4EAF2", face="s")                       # horizontal hot-air outlet
    s.louvers(b, 8, 14, 76, 80, 8, face="s")
    s.callout(s.fpt(b, 60, 50), 1, -60, 30)
    s.callout(s.spt(b, 40, 60), 2, 60, -20)
    s.callout(s.fpt(b, 168, 60), 3, 20, -70)
    s.callout(s.P(-80, 47, 12), 4, -40, 30)


def lb_container(s):
    c = tbox(s, 0, 0, 0, 300, 96, 104, GREY)
    for u in range(12, 300, 12):
        s.fline(c, u, 4, u, 100, "#9EAEC4", .5)                         # corrugation
    s.frect(c, 230, 8, 290, 96, "#E4EAF2")                              # control room door
    s.fline(c, 260, 8, 260, 96, "#5E6E88", .6)
    for k in range(4):
        fan(s, 40 + k * 50, 48, 104, 18)
    for (x, y) in ((0, 0), (296, 0), (0, 92), (296, 92)):
        s.box(x, y, 100, 4, 4, 4, sw=.4)                                  # corner castings
    s.frect(c, 20, 30, 70, 70, "#E4EAF2", face="s")                     # cable entry panel
    s.callout(s.P(90, 48, 104), 1, -40, -60)
    s.callout(s.fpt(c, 260, 60), 2, 40, -60)
    s.callout(s.spt(c, 45, 50), 3, 60, 20)
    s.callout(s.fpt(c, 120, 30), 4, -40, 70)


def lb_datacentre(s):
    for i in range(4):
        r = tbox(s, i * 40, 0, 0, 38, 60, 150, GREY)
        s.frect(r, 3, 6, 35, 144, "#E4EAF2")
        for k in range(10):
            s.frect(r, 6, 12 + k * 13, 32, 22 + k * 13, "#2A3A5E" if k % 3 else "#16264A", sw=.3)
    cart = tbox(s, 180, 70, 10, 50, 40, 60, GREY)
    s.frect(cart, 6, 34, 44, 54, "#1B3566", sw=.4)
    for x, y in ((186, 74), (224, 74), (186, 106), (224, 106)):
        wheel(s, x, y, 5)
    s.callout(s.P(19, 60, 100), 1, -60, -20)
    s.callout(s.P(100, 60, 60), 2, -10, 80)
    s.callout(s.fpt(cart, 25, 44), 3, 40, -40)
    s.callout(s.P(150, 30, 150), 4, 30, -60)


def lb_stationary(s):
    pa.draw_load_bank(s, call=True)


# ── load bank schematics ──
def test_setup():
    d = DW()
    chain(d, [("GENERATOR", "under test", True), ("ATS / BKR", "switch", False), ("LOAD BANK", "resistive", False)], gap=80)
    d.text(80, 70, "kW · kVAR · V · Hz · °C logged", 6, fill=ACC)
    d.label(110, 100, "TYPICAL LOAD TEST HOOK-UP")
    return d.svg()


def load_steps():
    d = DW()
    d.line(0, 100, 240, 100, 1); d.line(0, 100, 0, 0, 1)
    d.text(-4, 4, "kW", 6, anchor="end")
    steps = [(0, 25), (40, 50), (80, 75), (120, 100), (200, 0)]
    path = "M0,100"
    y = 100
    for x, pct in steps[:-1]:
        ny = 100 - pct * .9
        path += f" L{x},{y} L{x},{ny}"
        y = ny
    path += f" L200,{y} L200,100"
    d.path(path, 1.4, stroke=ACC, pts=((0, 0), (200, 100)))
    for x, pct in steps[:-1]:
        d.text(x + 20, 100 - pct * .9 - 4, f"{pct}%", 6, fill=ACC, weight=700)
    d.text(120, 114, "time — hold each step, record readings", 5.8)
    d.label(120, 136, "STEPPED LOAD TEST")
    return d.svg()


def rl_triangle():
    d = DW()
    d.line(0, 80, 160, 80, 1.6)
    d.text(80, 94, "kW (resistive)", 6.4, fill=INK, weight=700)
    d.line(160, 80, 160, -40, 1.6, ACC)
    d.text(168, 22, "kVAR (reactive)", 6.4, anchor="start", fill=ACC, weight=700)
    d.line(0, 80, 160, -40, 1.4)
    d.text(66, 8, "kVA", 6.4, fill=INK, weight=700)
    d.text(30, 72, "0.8 PF", 6, fill=INK)
    d.label(110, 120, "RESISTIVE-REACTIVE = REAL OPERATING LOAD")
    return d.svg()


def dc_discharge():
    d = DW()
    d.line(0, 100, 240, 100, 1); d.line(0, 100, 0, 0, 1)
    d.text(-4, 4, "V", 6, anchor="end")
    d.path("M0,14 C40,20 120,26 180,38 S220,70 232,96", 1.4, stroke=ACC, pts=((0, 14), (232, 96)))
    d.line(0, 70, 240, 70, .6, INK, "4 3")
    d.text(236, 66, "end voltage", 5.6, anchor="end")
    d.text(120, 114, "time at constant current", 5.8)
    d.label(120, 136, "BATTERY DISCHARGE TEST")
    return d.svg()


def dc_layout():
    d = DW()
    for i in range(6):
        d.rect(i * 34, 0, 30, 60, 1, "#fff")
        for k in range(6):
            d.rect(i * 34 + 4, 6 + k * 9, 22, 6, .5, "#fff", ACC if k % 2 else INK)
    d.text(100, 74, "RACK-MOUNTED HEAT LOADS IN THE DATA HALL", 6, fill=ACC, weight=700)
    arrow(d, 210, 30, 250, 30, ACC, 1)
    d.text(256, 32, "heat → cooling plant", 5.8, anchor="start")
    d.label(110, 100, "COMMISSIONING THE WHITE SPACE")
    return d.svg()


INK = "#13213F"

SCENES = {
    # ── liquid-filled ──
    "lq-pm3": ("Three-Phase Padmount", "CE-LQP-01", ["Loop-feed bushing wells", "LV spade bushings", "Cooling fins", "Penta-head lock", "Pressure relief"],
               [("iso", "3D Model", pm3_scene, "iso"), ("feed", "Radial vs Loop", feed_dwg, "dwg"), ("wiring", "Connections", delta_wye, "dwg")]),
    "lq-pm1": ("Single-Phase Padmount", "CE-LQP-02", ["Hinged hood", "HV elbow bushings", "LV bushings", "Concrete pad"],
               [("iso", "3D Model", pm1_scene, "iso"), ("wiring", "120/240 V", split_phase_dwg, "dwg"), ("feed", "Radial vs Loop", lambda: feed_dwg(True), "dwg")]),
    "lq-inv": ("Inverter-Duty Step-Up Padmount", "CE-LQP-03", ["MV collector bushings", "LV bus from inverters", "Cooling fins", "PV / BESS inverter"],
               [("iso", "3D Model", lambda s: pm3_scene(s, inverter=True), "iso"), ("sld", "One-Line", stepup_dwg, "dwg")]),
    "lq-unitsub": ("Unit Substation Transformer", "CE-LQS-01", ["Primary switch", "Transformer & radiators", "Throat connection", "Secondary switchboard"],
                   [("iso", "3D Model", unitsub_scene, "iso"), ("sld", "One-Line", unitsub_sld, "dwg")]),
    "lq-power": ("Power Transformer", "CE-LQS-02", ["HV bushings", "LV bushings", "Radiators", "Cooling fans", "Load tap changer", "Conservator"],
                 [("iso", "3D Model", power_scene, "iso"), ("cooling", "Cooling", cooling_dwg, "dwg"), ("wiring", "Connections", delta_wye, "dwg")]),
    "lq-portable": ("Portable Substation", "CE-LQS-03", ["Transformer", "HV disconnect & breaker", "LV switchgear house", "Gooseneck trailer", "Outrigger jacks"],
                    [("iso", "3D Model", portable_scene, "iso"), ("sld", "One-Line", portable_sld, "dwg")]),
    "lq-pole1": ("Single-Phase Polemount", "CE-LQO-01", extra_art.LEGENDS["polemount"],
                 [("iso", "3D Model", pole1_scene, "iso"), ("ga", "Elevation", pole_ga, "dwg"), ("wiring", "120/240 V", split_phase_dwg, "dwg")]),
    "lq-pole3": ("Three-Phase Polemount", "CE-LQO-02", ["HV bushings", "Sealed tank", "LV bushings", "Pole brackets", "Surge arrester"],
                 [("iso", "3D Model", pole3_scene, "iso"), ("wiring", "Connections", delta_wye, "dwg")]),
    # ── switchboards & switchgear ──
    "ds-svc": ("Service-Entrance Switchboard", "CE-SWB-02", ["Utility metering", "Main breaker", "Ground-fault relay", "Feeder section"],
               [("iso", "3D Model", svc_entrance_scene, "iso"), ("sld", "One-Line", sld_service, "dwg")]),
    "ds-mtm": ("Main-Tie-Main Switchboard", "CE-SWB-03", ["Main A", "Tie breaker", "Main B", "Feeders"],
               [("iso", "3D Model", mtm_scene, "iso"), ("sld", "One-Line", lambda: draw2d.sld("swbd"), "dwg")]),
    "ds-util": ("Utility-Metered Switchboard", "CE-SWB-04", ["Sealable CT compartment", "Meter socket", "Main breaker", "Feeders"],
                [("iso", "3D Model", utility_scene, "iso"), ("sld", "One-Line", sld_utility, "dwg")]),
    "ds-integ": ("Integrated Switchboard", "CE-SWB-05", ["Main section", "Feeder section", "Integral transformer", "Panelboards"],
                 [("iso", "3D Model", integrated_scene, "iso"), ("sld", "One-Line", sld_integrated, "dwg")]),
    "ds-ats": ("Automatic Transfer Switch", "CE-ATS-01", ["Normal source", "Emergency source", "Transfer controller", "Load terminals"],
               [("iso", "3D Model", ats_scene, "iso"), ("sld", "One-Line", sld_ats, "dwg")]),
    "ds-lis": ("Metal-Enclosed Switchgear", "CE-MES-01", ["Viewing window", "Switch operating handle", "Fuse compartment", "Cable compartment"],
               [("iso", "3D Model", lis_scene, "iso"), ("sld", "One-Line", sld_lis, "dwg")]),
    "ds-pad": ("Pad-Mounted Switchgear", "CE-PMS-01", ["Tamper-resistant enclosure", "Switched ways", "Fused ways", "Cable elbows", "Concrete pad"],
               [("iso", "3D Model", padsg_scene, "iso"), ("sld", "One-Line", sld_padsg, "dwg")]),
    "ds-arc": ("Arc-Resistant Switchgear", "CE-ARC-01", ["Relay & control compartment", "Draw-out breaker door", "Racking port", "Arc plenum", "Ventilated side sheets", "Arc exhaust duct"],
               [("iso", "3D Model", arc_scene, "iso"), ("sld", "One-Line", lambda: draw2d.sld("mv"), "dwg")]),
    "ds-mvse": ("MV Service-Entrance Switchgear", "CE-MSE-01", ["Utility metering cubicle", "Main breaker", "Protective relays", "Feeder breaker"],
                [("iso", "3D Model", mvse_scene, "iso"), ("sld", "One-Line", lambda: draw2d.sld("mv"), "dwg")]),
    "ds-meter": ("MV Metering Cabinet", "CE-MMC-01", ["Current transformers", "Voltage transformer drawer", "Meter enclosure", "Sealable door"],
                 [("iso", "3D Model", metering_scene, "iso"), ("sld", "One-Line", sld_utility, "dwg")]),
    "ds-ehouse": ("Walk-In Power House", "CE-EHS-01", ["HVAC unit", "Personnel door", "Equipment door", "Cable entry", "Structural skid"],
                  [("iso", "3D Model", ehouse_scene, "iso"), ("plan", "Floor Plan", ehouse_plan, "dwg")]),
    # ── load banks ──
    "lb-portable": ("Portable Load Bank", "CE-LDB-02", ["Resistor elements", "Control panel", "Cam-lock connections", "Casters"],
                    [("iso", "3D Model", lb_portable, "iso"), ("setup", "Hook-Up", test_setup, "dwg"), ("steps", "Test Steps", load_steps, "dwg")]),
    "lb-stationary": ("Stationary Load Bank", "CE-LDB-03", ["Resistor bank", "Control station", "Vertical-discharge fans", "Structural skid"],
                      [("iso", "3D Model", lb_stationary, "iso"), ("setup", "Hook-Up", test_setup, "dwg"), ("steps", "Test Steps", load_steps, "dwg")]),
    "lb-rl": ("Resistive-Reactive Load Bank", "CE-LDB-04", ["Resistive section", "Reactor coils", "Control panel", "Cooling fans"],
              [("iso", "3D Model", lb_rl, "iso"), ("pf", "Power Factor", rl_triangle, "dwg"), ("setup", "Hook-Up", test_setup, "dwg")]),
    "lb-dc": ("DC Load Bank", "CE-LDB-05", ["Resistor elements", "Step contactors", "Control display", "DC terminals"],
              [("iso", "3D Model", lb_dc, "iso"), ("curve", "Discharge", dc_discharge, "dwg")]),
    "lb-trailer": ("Trailer-Mounted Load Bank", "CE-LDB-06", ["Resistor bank", "Horizontal air outlet", "Control panel", "Tongue & jack"],
                   [("iso", "3D Model", lb_trailer, "iso"), ("setup", "Hook-Up", test_setup, "dwg"), ("steps", "Test Steps", load_steps, "dwg")]),
    "lb-container": ("Containerized Load Bank", "CE-LDB-07", ["Roof discharge fans", "Control room", "Cable entry panel", "ISO container body"],
                     [("iso", "3D Model", lb_container, "iso"), ("setup", "Hook-Up", test_setup, "dwg"), ("steps", "Test Steps", load_steps, "dwg")]),
    "lb-dcenter": ("Data-Centre Heat Load", "CE-LDB-08", ["Rack-mount heat loads", "Hot-aisle exhaust", "Master controller", "Cable feed"],
                   [("iso", "3D Model", lb_datacentre, "iso"), ("layout", "Data Hall", dc_layout, "dwg"), ("steps", "Test Steps", load_steps, "dwg")]),
}
