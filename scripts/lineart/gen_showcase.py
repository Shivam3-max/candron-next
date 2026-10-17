"""Generate the homepage Featured Products showcase drawings.

Usage (from the candron-next root):
  PYTHONPATH=scripts/lineart python3 scripts/lineart/gen_showcase.py ../candron-collateral/build .

Writes public/lineart/showcase/<key>.svg — one animated drawing per reel entry in
showcase_art.REELS. Reel order and labels are mirrored in components/FeaturedProducts.tsx.
"""
import os
import sys

sys.path.insert(0, sys.argv[1])
from iso import Iso  # noqa: E402
from gen_lineart import animate  # noqa: E402
import showcase_art  # noqa: E402

out_dir = os.path.join(sys.argv[2], "public/lineart/showcase")
os.makedirs(out_dir, exist_ok=True)
for reel, items in showcase_art.REELS.items():
    for key, label, fn in items:
        s = Iso(sw=.8)
        fn(s)
        svg, n = animate(s.svg(pad=28, cls="", mode="line"), total=2600)
        svg = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
        with open(os.path.join(out_dir, f"{key}.svg"), "w") as fh:
            fh.write(svg)
        print(f"{reel:15s} {key:16s} strokes:{n:4d} bytes:{len(svg)}")
