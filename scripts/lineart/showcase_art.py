"""Showcase product drawings for the homepage Featured Products stage.

Front three-quarter 'product render' compositions (one product per drawing, no callouts),
drawn with the collateral Iso engine. Each function takes an Iso scene `s`.
"""
import products_art as pa
from iso import shade

STEEL = "#DCE4EE"
DOOR = "#E4EAF2"
DARK = "#16264A"
PLINTH = "#8E9BB0"


def _hinges(s, b, u, v0, v1, n=3):
    for k in range(n):
        v = v0 + (v1 - v0) * (k + .5) / n
        s.frect(b, u - 1.2, v - 5, u + 1.2, v + 5, DARK, sw=.4)


def padmount(s, ox=0, oy=0):
    """Three-phase padmount: tall front cabinet, tank behind, cooling fins on the side."""
    s.box(ox - 6, oy - 6, 0, 152, 172, 6, top=PLINTH, front=shade(PLINTH, .85), side=shade(PLINTH, .7))
    tank = s.box(ox, oy, 6, 140, 104, 150)
    s.box(ox - 2, oy - 2, 156, 144, 108, 4)                      # tank cover lip
    for (u, t) in [(14, 14), (118, 14), (14, 84), (118, 84)]:     # lifting lugs
        s.box(ox + u, oy + t, 160, 8, 6, 9)
    for k in range(9):                                            # cooling fins
        s.box(ox + 140, oy + 8 + k * 10.5, 22, 22, 3.2, 118, sw=.55)
    cab = s.box(ox, oy + 104, 6, 140, 56, 156)
    s.box(ox - 2, oy + 102, 162, 144, 60, 4)                      # cabinet roof lip
    s.frect(cab, 4, 6, 69, 150, DOOR)                             # left (HV) door
    s.frect(cab, 71, 6, 136, 150, DOOR)                           # right (LV) door
    for u in (60, 80):                                            # handles
        s.frect(cab, u, 64, u + 3, 92, DARK, sw=.45)
    s.fcircle(cab, 70, 104, 3.4, "#9AA7B7", sw=.5)                # penta-head lock
    s.fcircle(cab, 70, 104, 1.4, DARK, sw=.3)
    _hinges(s, cab, 6, 14, 142)
    _hinges(s, cab, 134, 14, 142)
    s.frect(cab, 16, 120, 52, 138, "#fff", sw=.45)                # warning label
    s.frect(cab, 16, 120, 52, 126, "#E8A317", sw=.3)
    s.frect(cab, 88, 122, 124, 136, "#fff", sw=.45)               # nameplate
    s.fline(cab, 92, 129, 120, 129, sw=.4)
    s.frect(cab, 4, 6, 136, 12, "none", sw=.4)                    # kick plate
    s.dim_x(ox - 6, ox + 146, oy + 166, 0, "low-profile tamper-resistant cabinet", off=14)


def substation(s, ox=0, oy=0):
    pa.draw_substation_tx(s, ox, oy, False)


def drytype(s, ox=0, oy=0):
    """Ventilated LV dry-type: louvred top hood, front cover, foot channels."""
    for t in (8, 66):                                             # foot channels
        s.box(ox - 4, oy + t, 0, 104, 10, 10)
    b = s.box(ox, oy, 10, 96, 84, 150)
    hood = s.box(ox - 6, oy - 6, 160, 108, 96, 16)                # louvred hood
    s.louvers(hood, 6, 2, 102, 14, 4)
    s.louvers(hood, 6, 2, 90, 14, 4, face="s")
    s.frect(b, 4, 4, 92, 146, DOOR)                               # front cover
    for u in (8, 88):
        for v in (10, 140):
            s.fcircle(b, u, v, 1.6, "#fff", sw=.35)               # cover screws
    s.frect(b, 24, 108, 72, 132, "#fff", sw=.45)                  # nameplate
    for v in (114, 120, 126):
        s.fline(b, 28, v, 68, v, sw=.35)
    s.frect(b, 30, 84, 66, 96, "#fff", sw=.4)                     # warning label
    s.frect(b, 30, 90, 66, 96, "#E8A317", sw=.25)
    s.louvers(b, 10, 10, 74, 46, 9, face="s")                     # side intake
    s.frect(b, 10, 10, 74, 46, "none", sw=.45, face="s")
    s.dim_x(ox - 4, ox + 100, oy + 84, 0, "floor-mounted, ventilated", off=16)


def metal_enclosed(s, ox=0, oy=0, n=2):
    """Metal-enclosed switchgear: instrument door over a breaker door with viewing window."""
    W, D, H = 66, 76, 210
    s.box(ox - 4, oy - 4, 0, W * n + 8, D + 8, 6, top=PLINTH, front=shade(PLINTH, .85), side=shade(PLINTH, .7))
    for i in range(n):
        b = s.box(ox + i * W, oy, 6, W, D, H)
        s.frect(b, 3, 146, W - 3, H - 4, DOOR)                    # instrument door
        s.frect(b, 12, 176, 42, 198, "#1B3566", sw=.55)           # meter / relay
        s.frect(b, 15, 180, 39, 194, "#3F7BEA", sw=.25)
        for k in range(3):
            s.fcircle(b, 16 + k * 8, 164, 2.4, ["#2FB36B", "#D9342B", "#E8A317"][k], sw=.4)
        s.frect(b, 50, 160, 54, 188, DARK, sw=.4)
        s.frect(b, 3, 6, W - 3, 142, DOOR)                        # breaker door
        s.frect(b, 12, 70, 50, 124, "#9FB2CC", sw=.6)             # viewing window
        s.frect(b, 15, 73, 47, 121, "#C7D6EA", sw=.3)
        for v in (89, 105):
            s.fline(b, 15, v, 47, v, sw=.3)
        s.frect(b, 54, 60, 60, 112, DARK, sw=.45)                 # operating handle
        s.fcircle(b, 31, 44, 6, "#fff", sw=.5)                    # position indicator
        s.fline(b, 27, 44, 35, 44, sw=.5)
        s.frect(b, 12, 18, 34, 28, "#fff", sw=.4)                 # nameplate
        _hinges(s, b, 5, 14, 136, 3)
        if i == n - 1:
            s.louvers(b, 10, 20, 66, 60, 8, face="s")
            s.louvers(b, 10, 160, 66, 196, 6, face="s")
    s.box(ox - 3, oy - 3, 6 + H, W * n + 6, D + 6, 5)             # roof cap
    s.dim_x(ox - 4, ox + W * n + 4, oy + D + 4, 0, f"{n} × 762 mm sections", off=14)


def padmount_switchgear(s, ox=0, oy=0):
    """Pad-mounted switchgear: low tamper-resistant kiosk with double doors on two faces."""
    s.box(ox - 8, oy - 8, 0, 196, 136, 6, top=PLINTH, front=shade(PLINTH, .85), side=shade(PLINTH, .7))
    b = s.box(ox, oy, 6, 180, 120, 104)
    s.box(ox - 3, oy - 3, 110, 186, 126, 5)                       # hood lip
    s.frect(b, 4, 6, 89, 98, DOOR)
    s.frect(b, 91, 6, 176, 98, DOOR)
    for u in (80, 100):
        s.frect(b, u, 40, u + 3, 62, DARK, sw=.45)
    s.fcircle(b, 90, 74, 3.2, "#9AA7B7", sw=.5)
    _hinges(s, b, 6, 12, 92, 2)
    _hinges(s, b, 174, 12, 92, 2)
    s.frect(b, 16, 78, 52, 92, "#fff", sw=.4)
    s.frect(b, 16, 78, 52, 83, "#E8A317", sw=.25)
    s.frect(b, 8, 6, 112, 98, DOOR, face="s")                     # side access door
    s.frect(b, 20, 70, 50, 86, "none", sw=.4, face="s")
    s.louvers(b, 20, 70, 50, 86, 5, face="s")
    s.frect(b, 96, 40, 100, 62, DARK, sw=.4, face="s")
    s.dim_x(ox - 8, ox + 188, oy + 128, 0, "front & rear access", off=14)


def switchboard(s, ox=0, oy=0):
    pa.draw_switchboard(s, ox, oy, False)


def load_bank(s, ox=0, oy=0):
    pa.draw_load_bank(s, ox, oy, False)
    s.dim_x(ox - 6, ox + 186, oy + 96, 0, "skid-mounted, forklift ready", off=16)


def rpp(s, ox=0, oy=0):
    pa.draw_rpp(s, ox, oy, False)
    s.dim_x(ox, ox + 60, oy + 60, 0, "front access", off=14)


def pdu(s, ox=0, oy=0):
    pa.draw_pdu(s, ox, oy, False)
    s.dim_x(ox, ox + 84, oy + 84, 0, "floor-standing", off=14)


def control_panel(s, ox=0, oy=0):
    pa.draw_control_panel(s, ox, oy, False)
    s.dim_x(ox, ox + 96, oy + 50, 0, "UL 508A enclosure", off=16)


# Featured product → its reel of drawings (key, label shown under the stage, drawing fn)
REELS = {
    "transformers": [("padmount", "Padmount", padmount), ("substation", "Substation", substation), ("dry-type", "Dry-Type", drytype)],
    "switchgear": [("metal-enclosed", "Metal-Enclosed", metal_enclosed), ("pad-mounted", "Pad-Mounted", padmount_switchgear)],
    "switchboards": [("switchboard", "Distribution Switchboard", switchboard)],
    "load-banks": [("load-bank", "Load Bank", load_bank)],
    "rpp": [("rpp", "Remote Power Panel", rpp)],
    "pdu": [("pdu", "Power Distribution Unit", pdu)],
    "control-panels": [("control-panel", "Control Panel", control_panel)],
}
