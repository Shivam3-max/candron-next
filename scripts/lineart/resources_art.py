"""Resources-page drawings: one technical sketch per calculator, matching its formula."""
import math

from draw2d import Dwg, _tx, INK, THIN, BLUE
from capability_art import arrow, ground, coil, block

ACC = BLUE


def _poly(d, pts, sw=1, stroke=INK):
    path = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    d.path(path, sw, stroke=stroke, pts=pts)


def _formula(d, x, y, w, text, sub=""):
    d.rect(x, y, w, 30 if sub else 22, .9, "#fff", ACC, rx=4)
    d.text(x + w / 2, y + 14, text, 6.6, fill=ACC, weight=700, ls=".02em")
    if sub:
        d.text(x + w / 2, y + 25, sub, 5.4)


def _axes(d, W, H, xlab, ylab, xt=(), yt=()):
    d.rect(0, 0, W, H, 1)
    for k in range(1, 5):
        d.line(W * k / 5, 0, W * k / 5, H, .4, THIN)
        d.line(0, H * k / 5, W, H * k / 5, .4, THIN)
    for i, t in enumerate(xt):
        d.text(W * i / (len(xt) - 1), H + 10, t, 6)
    for i, t in enumerate(yt):
        d.text(-5, H - H * i / (len(yt) - 1) + 2, t, 6, anchor="end")
    d.text(W / 2, H + 22, xlab, 6.6, fill=INK, weight=700)
    d.text(0, -9, ylab, 6.6, anchor="start", fill=INK, weight=700)


# ───────────────────────────────────────────────── power triangle family
def power_triangle(title="POWER TRIANGLE", pf_corr=False):
    d = Dwg()
    A, B = (0, 150), (220, 150)
    C = (220, 30)
    _poly(d, [A, B], 1.6)
    _poly(d, [B, C], 1.6)
    _poly(d, [A, C], 1.8, ACC)
    d.path("M48,150 A48,48 0 0 0 45.3,129", 1, stroke=ACC, pts=((40, 125), (50, 150)))
    d.text(58, 142, "φ", 9, fill=ACC, weight=700)
    d.text(110, 166, "REAL POWER  kW", 6.8, fill=INK, weight=700)
    d.text(232, 94, "kVAR", 6.8, anchor="start", fill=INK, weight=700)
    d.text(96, 80, "APPARENT  kVA", 6.8, fill=ACC, weight=700)
    d.rect(212, 142, 8, 8, .7)
    if pf_corr:
        C2 = (220, 90)
        _poly(d, [A, C2], 1.2, INK)
        arrow(d, 236, 36, 236, 86, ACC, 1, 4)
        d.text(242, 64, "+ CAPACITOR kVAR", 5.8, anchor="start", fill=ACC, weight=700)
        d._b(312, 64)                                # keep the label inside the viewBox
        d.text(130, 112, "corrected kVA", 5.8, fill=INK)
        _formula(d, 0, 184, 240, "kVAR(c) = kW × (tan φ1 − tan φ2)", "power-factor correction")
        d.label(120, 236, "POWER-FACTOR CORRECTION")
    else:
        _formula(d, 0, 184, 240, "kVA = kW ÷ PF     PF = cos φ", "kVAR = √(kVA² − kW²)")
        d.label(120, 236, title)
    return d.svg()


def phasors():
    d = Dwg()
    cx, cy, r = 120, 110, 86
    d.circle(cx, cy, r, .5, "none", THIN)
    for k, (lab, ang) in enumerate((("Va", -90), ("Vb", 30), ("Vc", 150))):
        a = math.radians(ang)
        x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        arrow(d, cx, cy, x, y, ACC if k == 0 else INK, 1.5, 7)
        d.text(cx + (r + 14) * math.cos(a), cy + (r + 14) * math.sin(a) + 3, lab, 7.4, fill=ACC if k == 0 else INK, weight=700)
    d.path(f"M{cx},{cy - 34} A34,34 0 0 1 {cx + 34 * math.cos(math.radians(30)):.1f},{cy + 17:.1f}", .9, stroke=ACC,
           pts=((cx, cy - 34), (cx + 30, cy + 17)))
    d.text(cx + 38, cy - 22, "120°", 6.4, anchor="start", fill=ACC, weight=700)
    d.circle(cx, cy, 2.4, .8, "#fff")
    _formula(d, 0, 222, 240, "V(L-L) = √3 × V(L-N)", "balanced three-phase system")
    d.label(120, 274, "THREE-PHASE PHASORS")
    return d.svg()


def kva_circuit():
    d = Dwg()
    d.circle(10, 70, 18, 1.1, "#fff")
    d.text(10, 73, "3Ø", 7.4, fill=INK, weight=700, ls="0")
    for k, y in enumerate((40, 70, 100)):
        d.line(28 if k == 1 else 22, y, 230, y, 1.2)
        d.text(36, y - 4, f"L{k + 1}", 6.2, fill=INK, weight=700)
    d.circle(110, 40, 11, 1, "#fff", ACC)
    d.text(110, 43, "A", 7.4, fill=ACC, weight=700, ls="0")
    d.line(160, 40, 160, 58, .9); d.line(160, 82, 160, 100, .9)
    d.circle(160, 70, 11, 1, "#fff", ACC)
    d.text(160, 73, "V", 7.4, fill=ACC, weight=700, ls="0")
    d.rect(230, 26, 70, 88, 1.2, "#fff", rx=4)
    _tx(d, 265, 40)
    d.text(265, 92, "LOAD", 6.8, fill=INK, weight=700)
    d.text(265, 104, "kVA ?", 6.6, fill=ACC, weight=700)
    _formula(d, 0, 140, 300, "kVA = √3 × V × I ÷ 1000", "single-phase: kVA = V × I ÷ 1000")
    d.label(150, 196, "TRANSFORMER SIZING")
    return d.svg()


# ───────────────────────────────────────────────── fault current
def fault_sld():
    d = Dwg()
    d.line(60, -10, 60, 6, 1)
    _tx(d, 60, 6)
    d.text(84, 22, "kVA · %Z", 6.6, anchor="start", fill=INK, weight=700)
    d.line(60, 35, 60, 52, 1)
    d.line(0, 52, 200, 52, 2.6)
    d.text(206, 55, "SECONDARY BUS", 6, anchor="start", fill=ACC, weight=700)
    for x in (30, 90, 150):
        d.line(x, 52, x, 74, 1)
        d.rect(x - 6, 74, 12, 14, 1, "#fff")
        d.line(x, 88, x, 104, 1)
    d.path("M98,40 l-8,8 h8 l-8,10", 1.5, stroke=ACC, pts=((88, 38), (100, 60)))
    d.text(108, 36, "BOLTED FAULT", 6, anchor="start", fill=ACC, weight=700)
    _formula(d, -10, 124, 300, "AFC = (kVA × 1000 ÷ (√3 × V)) ÷ (%Z ÷ 100)", "available fault current at the secondary")
    d.label(140, 180, "AVAILABLE FAULT CURRENT")
    return d.svg()


def fault_wave():
    d = Dwg()
    W, H = 260, 150
    d.line(0, H / 2, W, H / 2, .6, THIN)
    d.line(0, 0, 0, H, .8)
    pts = []
    for i in range(261):                       # i(t) = −cos ωt + e^(−t/τ): asymmetrical first peak, decaying offset
        t = i / 260 * 6 * math.pi
        pts.append((i, H / 2 - 34 * (math.exp(-t / 5) - math.cos(t))))
    _poly(d, pts, 1.4, ACC)
    env = [(i, H / 2 - math.exp(-(i / 260 * 6 * math.pi) / 5) * 34) for i in range(0, 261, 4)]
    _poly(d, env, .7, THIN)
    d.text(W - 2, H / 2 - 6, "steady-state", 5.8, anchor="end")
    d.text(6, 10, "peak (asymmetrical)", 5.8, anchor="start", fill=ACC, weight=700)
    d.text(140, 26, "DC offset decays", 5.8, fill=INK)
    d.text(W / 2, H + 14, "TIME →", 6.4, fill=INK, weight=700)
    d.label(W / 2, H + 34, "FAULT CURRENT WAVEFORM")
    return d.svg()


# ───────────────────────────────────────────────── harmonics
def _sine(W, H, amp, harm=()):
    pts = []
    for i in range(W + 1):
        t = i / W * 4 * math.pi
        y = math.sin(t) + sum(a * math.sin(n * t + ph) for n, a, ph in harm)
        pts.append((i, H / 2 - y * amp))
    return pts


def harmonic_wave():
    d = Dwg()
    W, H = 260, 130
    d.line(0, H / 2, W, H / 2, .6, THIN)
    _poly(d, _sine(W, H, 44), .8, THIN)
    _poly(d, _sine(W, H, 44, ((3, .22, 0), (5, .16, .4), (7, .09, .8))), 1.5, ACC)
    d.text(4, 12, "DISTORTED CURRENT", 6, anchor="start", fill=ACC, weight=700)
    d.text(4, H - 4, "fundamental (60 Hz)", 5.8, anchor="start")
    _formula(d, 0, H + 16, W, "THD = √(I₂² + I₃² + … + Iₙ²) ÷ I₁ × 100%")
    d.label(W / 2, H + 62, "HARMONIC DISTORTION")
    return d.svg()


def spectrum(filtered=False):
    d = Dwg()
    W, H = 240, 130
    orders = [1, 3, 5, 7, 9, 11, 13]
    raw = [1, .32, .24, .14, .07, .08, .06]
    after = [1, .12, .07, .04, .03, .02, .02]
    d.line(0, H, W, H, 1)
    d.line(0, 0, 0, H, .8)
    for k, (n, a) in enumerate(zip(orders, raw)):
        x = 14 + k * 32
        h = a * (H - 10)
        if filtered:
            d.rect(x, H - h, 9, h, .7, "none", THIN)
            h2 = after[k] * (H - 10)
            d.rect(x + 11, H - h2, 9, h2, 1, "#fff", ACC)
        else:
            d.rect(x, H - h, 18, h, 1, "#fff", ACC if n > 1 else INK)
        d.text(x + 10, H + 10, f"h{n}", 6)
    if filtered:
        d.rect(W - 92, 4, 90, 26, .8, "#fff", rx=3)
        d.rect(W - 86, 10, 6, 6, .6, "none", THIN); d.text(W - 76, 16, "without reactor", 5.6, anchor="start")
        d.rect(W - 86, 20, 6, 6, .8, "#fff", ACC); d.text(W - 76, 26, "with reactor", 5.6, anchor="start", fill=ACC)
    d.text(W / 2, H + 24, "HARMONIC ORDER", 6.6, fill=INK, weight=700)
    d.label(W / 2, H + 44, "CURRENT SPECTRUM" + (" — FILTERED" if filtered else ""))
    return d.svg()


def reactor():
    d = Dwg()
    d.rect(0, 0, 180, 16, 1)
    d.text(90, 11, "CORE YOKE", 5.6)
    for k in range(3):
        x = 12 + k * 58
        d.rect(x, 16, 40, 110, 1.1, "#fff")
        for t in range(10):
            d.line(x, 22 + t * 10.5, x + 40, 26 + t * 10.5, .45, THIN)
        d.text(x + 20, 76, ["A", "B", "C"][k], 9, fill=INK, weight=700)
        d.circle(x + 20, 4 - 6, 2.4, .8, "#fff", ACC)
    d.rect(0, 126, 180, 16, 1)
    d.line(-6, 142, 186, 142, 1.2)
    d.dim_h(0, 180, 142, "3-phase iron-core line reactor", off=14)
    _formula(d, -10, 172, 200, "XL = %Z × V² ÷ (kVA × 1000)", "L = XL ÷ (2π f)")
    d.label(90, 226, "HARMONIC LINE REACTOR")
    return d.svg()


# ───────────────────────────────────────────────── efficiency & losses
def efficiency_curve():
    d = Dwg()
    W, H = 240, 140
    _axes(d, W, H, "LOAD (% of rating)", "EFFICIENCY η (%)", ("0", "25", "50", "75", "100", "125"), ("97", "98", "99", "100"))
    pts = []
    for i in range(1, 241):
        L = i / 240 * 1.25
        eta = L / (L + .004 + .012 * L * L)
        y = H - (eta - .97) / .03 * H
        if y <= H:                                   # light-load points fall below the 97 % floor
            pts.append((i, y))
    _poly(d, pts, 1.6, ACC)
    Lopt = math.sqrt(.004 / .012)
    x = Lopt / 1.25 * W
    eta = Lopt / (Lopt + .004 + .012 * Lopt ** 2)
    y = H - (eta - .97) / .03 * H
    d.circle(x, y, 3, 1, "#fff", ACC)
    d.line(x, y + 4, x, H, .6, ACC, "3 2")
    d.text(x + 6, y - 6, "η max at L = √(Pcore ÷ Pcu)", 5.8, anchor="start", fill=ACC, weight=700)
    d.label(W / 2, H + 42, "EFFICIENCY vs LOAD")
    return d.svg()


def loss_chart():
    d = Dwg()
    W, H = 240, 140
    _axes(d, W, H, "LOAD (% of rating)", "LOSSES (W)", ("0", "25", "50", "75", "100", "125"))
    d.line(0, H - 36, W, H - 36, 1.4)
    d.text(4, H - 40, "core (no-load) loss", 5.8, anchor="start", fill=INK, weight=700)
    pts = [(i, H - (i / W) ** 2 * 150) for i in range(0, W + 1, 4) if (i / W) ** 2 * 150 < H]
    _poly(d, pts, 1.5, ACC)
    d.text(150, 30, "copper loss ∝ L²", 5.8, fill=ACC, weight=700)
    x = W * math.sqrt(36 / 150)
    d.circle(x, H - 36, 3, 1, "#fff", ACC)
    d.line(x, H - 33, x, H, .6, ACC, "3 2")
    d.text(x + 5, H - 24, "equal losses", 5.6, anchor="start", fill=ACC)
    d.label(W / 2, H + 42, "TRANSFORMER LOSSES")
    return d.svg()


def payback_chart():
    d = Dwg()
    W, H = 250, 140
    _axes(d, W, H, "YEARS IN SERVICE", "CUMULATIVE COST ($)", ("0", "2", "4", "6", "8", "10"))
    _poly(d, [(0, H - 30), (W, H - 30 - 110)], 1.3)                 # unit A: cheaper, higher losses
    _poly(d, [(0, H - 56), (W, H - 56 - 62)], 1.6, ACC)             # unit B: pricier, efficient
    x = 26 / 48 * W
    y = H - 30 - 110 * x / W
    d.circle(x, y, 3.2, 1, "#fff", ACC)
    d.line(x, y + 4, x, H, .6, ACC, "3 2")
    d.text(x + 6, H - 6, "PAYBACK", 6, anchor="start", fill=ACC, weight=700)
    d.text(W - 4, H - 146, "standard unit", 5.8, anchor="end")
    d.text(W - 4, H - 124, "high-efficiency unit", 5.8, anchor="end", fill=ACC, weight=700)
    _formula(d, 0, H + 32, W, "Payback = (Price B − Price A) ÷ Annual Savings")
    d.label(W / 2, H + 76, "SAVINGS & PAYBACK")
    return d.svg()


# ───────────────────────────────────────────────── inductance & motors
def inductance_coil():
    d = Dwg()
    d.line(0, 40, 40, 40, 1.1)
    coil_pts = "".join(f" a9,9 0 0 1 18,0" for _ in range(5))
    d.path(f"M40,40{coil_pts}", 1.4, stroke=ACC, pts=((40, 30), (130, 40)))
    d.line(40, 22, 130, 22, 1.4); d.line(40, 18, 130, 18, 1.4)
    d.text(85, 12, "IRON CORE", 5.6)
    d.line(130, 40, 180, 40, 1.1)
    d.text(85, 62, "L (henries)", 6.6, fill=ACC, weight=700)
    _formula(d, -10, 84, 200, "XL = 2π × f × L", "L = XL ÷ (2π × f)")
    _formula(d, -10, 124, 200, "XL = (%Z ÷ 100) × V² ÷ (kVA × 1000)")
    d.label(90, 166, "INDUCTANCE & REACTANCE")
    return d.svg()


def impedance_triangle():
    d = Dwg()
    A, B, C = (0, 130), (200, 130), (200, 20)
    _poly(d, [A, B], 1.5)
    _poly(d, [B, C], 1.5)
    _poly(d, [A, C], 1.8, ACC)
    d.rect(192, 122, 8, 8, .7)
    d.text(100, 146, "R  (resistance)", 6.8, fill=INK, weight=700)
    d.text(208, 78, "XL", 7, anchor="start", fill=INK, weight=700)
    d.text(84, 66, "Z  (impedance)", 6.8, fill=ACC, weight=700)
    _formula(d, 0, 166, 220, "Z = √(R² + XL²)")
    d.label(110, 206, "IMPEDANCE TRIANGLE")
    return d.svg()


def motor():
    d = Dwg()
    d.rect(40, 30, 150, 90, 1.2, "#fff", rx=10)
    for k in range(9):
        d.line(52 + k * 15, 30, 52 + k * 15, 120, .5, THIN)
    d.rect(10, 44, 30, 62, 1, "#fff", rx=4)                      # fan cover
    d.line(190, 75, 236, 75, 2.2)                                 # shaft
    d.rect(232, 70, 10, 10, .8)
    d.rect(96, 8, 46, 22, 1, "#fff", rx=2)                        # terminal box
    d.text(119, 22, "T1 T2 T3", 5.4, fill=INK, weight=700, ls="0")
    for x in (56, 160):
        d.rect(x - 12, 120, 24, 10, 1)
    d.line(20, 130, 210, 130, 1.2)
    d.text(115, 80, "M  3~", 9, fill=ACC, weight=700)
    _formula(d, 0, 146, 240, "kW = HP × 0.7457 ÷ η     kVA = kW ÷ PF")
    d.label(120, 190, "MOTOR LOAD CONVERSION")
    return d.svg()


# kind → (title, code, legend, [(key, label, fn, "dwg")])
SCENES = {
    "res-hub": ("Engineering Toolbox", "CE-RES-00", [],
                [("triangle", "Power Triangle", power_triangle, "dwg"), ("wave", "Harmonics", harmonic_wave, "dwg"), ("phasor", "Phasors", phasors, "dwg")]),
    "res-kva": ("Transformer Sizing", "CE-RES-01", [],
                [("circuit", "Sizing Circuit", kva_circuit, "dwg"), ("phasor", "Phasors", phasors, "dwg")]),
    "res-fault": ("Available Fault Current", "CE-RES-02", [],
                  [("sld", "Fault One-Line", fault_sld, "dwg"), ("wave", "Fault Waveform", fault_wave, "dwg")]),
    "res-harmonic": ("Harmonic Distortion", "CE-RES-03", [],
                     [("wave", "Waveform", harmonic_wave, "dwg"), ("spectrum", "Spectrum", lambda: spectrum(False), "dwg")]),
    "res-reactor": ("Harmonic Line Reactor", "CE-RES-04", [],
                    [("reactor", "Reactor", reactor, "dwg"), ("spectrum", "Filtered Spectrum", lambda: spectrum(True), "dwg")]),
    "res-efficiency": ("Transformer Efficiency", "CE-RES-05", [],
                       [("curve", "Efficiency Curve", efficiency_curve, "dwg"), ("losses", "Losses", loss_chart, "dwg")]),
    "res-inductance": ("Inductance & Reactance", "CE-RES-06", [],
                       [("coil", "Coil", inductance_coil, "dwg"), ("impedance", "Impedance", impedance_triangle, "dwg")]),
    "res-kwkva": ("kW ↔ kVA", "CE-RES-07", [],
                  [("triangle", "Power Triangle", power_triangle, "dwg"), ("pf", "PF Correction", lambda: power_triangle(pf_corr=True), "dwg")]),
    "res-hpkva": ("HP ↔ kVA", "CE-RES-08", [],
                  [("motor", "Motor", motor, "dwg"), ("triangle", "Power Triangle", power_triangle, "dwg")]),
    "res-payback": ("Savings & Payback", "CE-RES-09", [],
                    [("payback", "Payback", payback_chart, "dwg"), ("losses", "Losses", loss_chart, "dwg")]),
}
