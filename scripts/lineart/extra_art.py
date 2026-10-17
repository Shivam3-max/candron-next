"""Drawings the collateral engine lacks: pole-mount transformer (iso + GA) and solo RPP callouts."""
import draw2d
import products_art as pa
from draw2d import Dwg, _base, _floor, INK, THIN
from iso import shade

LEGENDS = {
    "padmount": ["Primary (HV) compartment", "Penta-head security lock", "Cooling fins", "Lifting lugs"],
    "substation": ["HV bushings", "LV bushings", "Radiators", "Control cabinet", "Conservator"],
    "castcoil": ["Cast-resin HV coil", "Core & clamping frame", "Tap links", "Base channels"],
    "dry": ["Ventilated NEMA enclosure"],
    "pdu": ["Monitoring display", "Ventilated PDU base"],
    "rpp": ["RPP branch panels", "Branch-circuit meter"],
    "polemount": ["HV bushing", "Sealed tank & cover", "Pole-mount brackets", "Crossarm & insulators", "Surge arrester"],
}

POLE = "#D8D2C4"


def draw_polemount(s, ox=0, oy=0, call=False):
    # pole, crossarm and line insulators (behind the tank)
    s.vcyl(ox, oy, 0, 340, 9, fill=POLE, top=shade(POLE, 1.05))
    arm = s.box(ox - 80, oy - 6, 300, 160, 12, 10)
    for k, x in enumerate((-66, 0, 66)):
        s.bushing(ox + x, oy, 310, 20, 5, sheds=2)
    # brackets
    for z in (170, 214):
        s.box(ox - 4, oy + 6, z, 8, 20, 8)
    # tank
    s.vcyl(ox, oy + 40, 140, 104, 30, bands=3)
    s.top_ellipse(ox, oy + 40, 248, 31, "#EEF2F7")
    s.vcyl(ox, oy + 40, 244, 6, 32)
    # HV bushing on the cover, LV bushings on the side
    s.bushing(ox, oy + 40, 250, 30, 6, sheds=3)
    for k in range(3):
        s.vcyl(ox + 26, oy + 52 + k * 2, 214 - k * 18, 6, 3.4)
    # surge arrester + fuse cutout on the crossarm
    s.vcyl(ox + 48, oy + 8, 262, 36, 3.5, bands=3)
    cut = s.box(ox - 52, oy + 4, 262, 8, 8, 36)
    # drop leads
    s.line(s.P(ox - 66, oy, 334), s.P(ox - 48, oy + 8, 298), sw=.7)
    s.line(s.P(ox - 48, oy + 8, 262), s.P(ox, oy + 40, 282), sw=.7)
    s.line(s.P(ox + 66, oy, 334), s.P(ox + 48, oy + 8, 298), sw=.7)
    if call:
        s.callout(s.P(ox, oy + 40, 276), 1, 48, -40)
        s.callout(s.P(ox - 30, oy + 60, 190), 2, -70, 10)
        s.callout(s.P(ox, oy + 16, 218), 3, 64, -14)
        s.callout(s.P(ox - 40, oy, 305), 4, -46, -34)
        s.callout(s.P(ox + 48, oy + 8, 280), 5, 56, -10)
        s.dim_z(ox + 34, oy + 40, 140, 250, "tank per kVA", off=34)
    return arm, cut


def ga_polemount():
    d = Dwg()
    # pole
    d.rect(-7, -10, 14, 380, 1.1)
    d.centre(0, -24, 0, 384)
    # crossarm + insulators
    d.rect(-90, 12, 180, 10, 1)
    for x in (-74, 0, 74):
        d.rect(x - 3, -10, 6, 22, .8, "#F1F4F8")
        for k in range(2):
            d.rect(x - 7, -6 + k * 8, 14, 3, .6)
    # cutout + arrester
    d.rect(-62, 26, 10, 38, .8); d.text(-57, 76, "FCO", 5.4)
    d.rect(50, 26, 8, 40, .8); d.text(54, 76, "LA", 5.4)
    # brackets
    for y in (150, 196):
        d.rect(7, y, 24, 8, .8)
    # tank
    d.rect(31, 110, 82, 118, 1.2, rx=6)
    d.rect(27, 102, 90, 10, 1, rx=2)
    for y in (140, 170, 200):
        d.line(31, y, 113, y, .5, THIN)
    d.rect(68, 70, 8, 32, .8, "#F5F3ED")
    for k in range(3):
        d.rect(63, 76 + k * 8, 18, 3, .6)
        d.rect(113, 132 + k * 22, 10, 6, .7)
    d.text(130, 142, "X1  X2  X3", 5.6, anchor="start", fill=INK)
    # leads
    d.line(-74, -10, -57, 26, .7)
    d.line(-57, 64, 72, 70, .7)
    d.line(74, -10, 54, 26, .7)
    _floor(d, -40, 40, 372)
    d.dim_v(140, 102, 228, "tank height per kVA", off=26)
    d.dim_h(31, 113, 228, "Ø tank", off=18)
    d.label(0, 404, "FRONT ELEVATION")
    return d.svg()


def draw_rpp_solo(s, ox=0, oy=0, call=False):
    b = pa.draw_rpp(s, ox, oy, False)
    if call:
        s.callout(s.fpt(b, 30, 60), 1, -56, 10)
        s.callout(s.fpt(b, 30, 182), 2, 30, -40)
    return b
