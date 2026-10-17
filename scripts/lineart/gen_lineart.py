"""Generate animated line-art drawings for candron-next from the collateral drawing engine.

Usage (from the candron-next root):
  PYTHONPATH=scripts/lineart python3 scripts/lineart/gen_lineart.py ../candron-collateral/build .

Needs the collateral drawing engine (iso.py, draw2d.py, products_art.py, content.py) from
the candron-collateral project. Writes public/lineart/<kind>-<view>.svg and lib/lineart-meta.ts.

Each drawing becomes a stroke-only SVG with per-element animation delays so the web
component (components/LineArt*) can 'draw' it like a pen plotter.
"""
import json
import re
import sys

if __name__ == '__main__':
    sys.path.insert(0, sys.argv[1])
import draw2d  # noqa: E402
import products_art as pa  # noqa: E402
from iso import Iso  # noqa: E402
import extra_art  # noqa: E402  (pole-mount drawing + legends, next to this script)


INK = "#13213F"
STROKE_TAGS = ("polygon", "line", "polyline", "path", "circle", "ellipse", "rect")


def iso_svg(draw, call=True):
    s = Iso(sw=.8)
    draw(s, call)
    return s.svg(pad=26, cls="", mode="line")


def animate(svg, total=2600, dur=900):
    """Strip colours to CSS classes and stamp each stroke with pathLength + a delay."""
    svg = re.sub(r'<svg class="[^"]*" style="[^"]*"', "<svg", svg)
    svg = re.sub(r'<svg class="[^"]*"', "<svg", svg)
    svg = svg.replace(' xmlns="http://www.w3.org/2000/svg"', "")
    # drop shadows / gradients, keep the arrow marker
    svg = re.sub(r'<radialGradient.*?</radialGradient>', "", svg)
    svg = re.sub(r'<polygon[^>]*fill="url\(#isoShadow\)"[^>]*/>', "", svg)
    svg = re.sub(r'<ellipse[^>]*fill="url\(#isoShadow\)"[^>]*/>', "", svg)

    def classify(tag):
        stroke = re.search(r'stroke="([^"]+)"', tag)
        stroke = stroke.group(1).upper() if stroke else ""
        cls = "a" if stroke in ("#0756EE", "#4A6FB5") else ("t" if stroke in ("#7A8AA5", "#8EA0BC", "#5E6E88") else "k")
        return cls

    defs = re.findall(r"<defs>.*?</defs>", svg)
    svg = re.sub(r"<defs>.*?</defs>", "<!--DEFS-->", svg)
    elems = list(re.finditer(r"<(%s)\b[^>]*?/>" % "|".join(STROKE_TAGS), svg))
    n = max(1, len(elems))
    out, last = [], 0
    for i, m in enumerate(elems):
        tag = m.group(0)
        cls = classify(tag)
        filled = re.search(r'fill="(?!none)[^"]+"', tag) is not None
        tag = re.sub(r'\s(stroke|fill)="[^"]*"', "", tag)
        delay = int(i / n * total)
        extra = f' pathLength="1" class="{cls}{" f" if filled else ""}" style="--d:{delay}ms"'
        tag = tag[:-2].rstrip() + extra + "/>"
        out.append(svg[last:m.start()])
        out.append(tag)
        last = m.end()
    out.append(svg[last:])
    svg = "".join(out)
    svg = svg.replace("<!--DEFS-->", "".join(d for d in defs if "marker" in d), 1).replace("<!--DEFS-->", "")
    # text: strip colour, mark as annotation, fade in near the end
    svg = re.sub(r'<text([^>]*?)\sfill="[^"]*"', r'<text\1', svg)
    svg = svg.replace("<text ", f'<text class="x" style="--d:{total}ms" ')
    svg = re.sub(r'font-family="[^"]*"', "", svg)
    # callout groups appear last, one after another
    k = 0

    def co(m):
        nonlocal k
        k += 1
        return f'<g class="co" style="--d:{total + 200 + k * 260}ms">'
    svg = re.sub(r'<g class="callout">|<g>', co, svg)
    return svg, len(elems)


def viewbox(svg):
    return re.search(r'viewBox="([^"]+)"', svg).group(1)


def main():
    DRAWINGS = {
        # kind: (iso draw fn, ga svg fn, sld kind, legend, title, dwg code)
        "mv": (lambda s, c: pa.draw_mv_switchgear(s, call=c), lambda: draw2d.ga_lineup("mv"), "mv",
               ["Relay & control compartment", "Draw-out breaker door", "Racking port", "Arc plenum", "Ventilated side sheets"],
               "MV Metal-Clad Switchgear", "CE-MVS-01"),
        "lv": (lambda s, c: pa.draw_lv_switchgear(s, call=c), lambda: draw2d.ga_lineup("lv"), "lv", None,
               "LV Switchgear Lineup", "CE-LVS-01"),
        "swbd": (lambda s, c: pa.draw_switchboard(s, call=c), lambda: draw2d.ga_lineup("swbd"), "swbd", None,
                 "Distribution Switchboard", "CE-SWB-01"),
        "padmount": (lambda s, c: pa.draw_padmount(s, call=c), lambda: draw2d.ga_box("padmount"), "tx", None,
                     "Padmount Transformer", "CE-PMT-01"),
        "substation": (lambda s, c: pa.draw_substation_tx(s, call=c), draw2d.ga_substation, "tx", None,
                       "Substation Transformer", "CE-SUB-01"),
        "polemount": (lambda s, c: extra_art.draw_polemount(s, call=c), extra_art.ga_polemount, "tx", None,
                      "Pole-Mount Transformer", "CE-PLM-01"),
        "castcoil": (lambda s, c: pa.draw_cast_coil(s, call=c), draw2d.ga_castcoil, "tx", None,
                     "Cast-Coil Dry-Type Transformer", "CE-DTT-02"),
        "dry": (lambda s, c: pa.draw_dry_enclosure(s, call=c), lambda: draw2d.ga_box("dry"), "tx", None,
                "Ventilated Dry-Type Transformer", "CE-DTT-01"),
        "control": (lambda s, c: pa.draw_control_panel(s, call=c), lambda: draw2d.ga_box("control"), "control", None,
                    "Industrial Control Panel", "CE-CTP-01"),
        "jbox": (lambda s, c: pa.draw_junction_box(s, call=c), lambda: draw2d.ga_box("jbox"), "jbox", None,
                 "Power Junction Box", "CE-JBX-01"),
        "loadbank": (lambda s, c: pa.draw_load_bank(s, call=c), lambda: draw2d.ga_box("loadbank"), "loadbank", None,
                     "Resistive Load Bank", "CE-LDB-01"),
        "pdu": (lambda s, c: pa.draw_pdu(s, call=c), lambda: draw2d.ga_box("pdu"), "pdu", None,
                "Power Distribution Unit", "CE-PDU-01"),
        "rpp": (lambda s, c: extra_art.draw_rpp_solo(s, call=c), lambda: draw2d.ga_box("pdu"), "pdu", None,
                "Remote Power Panel", "CE-RPP-01"),
        "plant": (lambda s, c: pa._hero(s, drawing=True), lambda: draw2d.ga_lineup("mv"), "mv", None,
                  "Power Distribution Package", "CE-SYS-01"),
    }

    # Legends for the numbered balloons, from the brochure copy (content.py) where the figure matches.
    import content  # noqa: E402
    by_fig = {p["fig"]: [c[0] for c in p["callouts"]] for p in content.PRODUCTS}

    result = {}
    for kind, (iso_fn, ga_fn, sld_kind, legend, title, code) in DRAWINGS.items():
        raw_iso = iso_svg(iso_fn)
        n_calls = raw_iso.count('class="callout"')
        leg = legend or extra_art.LEGENDS.get(kind) or by_fig.get(kind) or []
        leg = leg[:n_calls]
        iso, n1 = animate(raw_iso)
        ga, n2 = animate(ga_fn(), total=2200)
        sld, n3 = animate(draw2d.sld(sld_kind), total=2000)
        result[kind] = dict(title=title, code=code, legend=leg, iso=iso, ga=ga, sld=sld)
        print(f"{kind:11s} iso:{n1:4d} ga:{n2:4d} sld:{n3:4d} calls:{n_calls} legend:{len(leg)} bytes:{len(iso) + len(ga) + len(sld)}")

    import os
    OUT = sys.argv[2]
    os.makedirs(os.path.join(OUT, "public/lineart"), exist_ok=True)
    meta = {}
    for kind, r in result.items():
        for v in ("iso", "ga", "sld"):
            svg = r[v].replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
            with open(os.path.join(OUT, "public/lineart", f"{kind}-{v}.svg"), "w") as fh:
                fh.write(svg)
        meta[kind] = dict(title=r["title"], code=r["code"], legend=r["legend"])

    # Capability-page scenes (capability_art.SCENES) carry their own view names.
    import capability_art
    import resources_art
    for kind, (title, code, legend, views) in {**capability_art.SCENES, **resources_art.SCENES}.items():
        mviews = []
        for key, label, fn, how in views:
            raw = capability_art.render(fn, how)
            if how == "iso":
                legend_n = raw.count('class="callout"')
                assert legend_n == len(legend), f"{kind}: {legend_n} balloons vs {len(legend)} legend rows"
            svg, n = animate(raw, total=2400)
            svg = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
            with open(os.path.join(OUT, "public/lineart", f"{kind}-{key}.svg"), "w") as fh:
                fh.write(svg)
            mviews.append(dict(key=key, label=label))
            print(f"{kind:11s} {key:8s} strokes:{n:4d} bytes:{len(svg)}")
        meta[kind] = dict(title=title, code=code, legend=legend, views=mviews)

    with open(os.path.join(OUT, "lib/lineart-meta.ts"), "w") as f:
        f.write("// Generated by scripts/lineart/gen_lineart.py from the CANDRON collateral drawing engine.\n")
        f.write("// The drawings themselves live in public/lineart/<kind>-<view>.svg and load on demand.\n\n")
        f.write("export type LineArtKind = " + " | ".join(f"'{k}'" for k in meta) + "\n\n")
        f.write("export interface LineArtMeta { title: string; code: string; legend: string[]; views?: { key: string; label: string }[] }\n\n")
        f.write("export const LINEART_META: Record<LineArtKind, LineArtMeta> = " + json.dumps(meta, ensure_ascii=False, indent=2) + "\n")


if __name__ == '__main__':
    main()
