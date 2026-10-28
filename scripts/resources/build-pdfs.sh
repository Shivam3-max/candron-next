#!/bin/sh
# Rebuild the downloadable resource PDFs from their print pages.
# Usage (dev server running on 3530):  sh scripts/resources/build-pdfs.sh
set -e
BASE="${BASE:-http://localhost:3530}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="public/downloads"
mkdir -p "$OUT"
pdf() {
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
    --print-to-pdf="$OUT/$2" "$BASE$1" >/dev/null 2>&1
  echo "$OUT/$2 ($(du -h "$OUT/$2" | cut -f1))"
}
pdf /resources/fat-commissioning-pack/print candron-fat-commissioning-pack.pdf
pdf /resources/generator-test-planner/print candron-generator-test-logbook.pdf
pdf /resources/cold-climate-checklist/print candron-cold-climate-checklist.pdf
