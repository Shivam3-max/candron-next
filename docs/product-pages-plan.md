# CANDRON product pages: brainstorm and rebuild plan (October 2026)

The client liked the dry-type range, which was data-driven, plain-English and illustrated with our own 3D drawings. This plan applies the same approach to the rest of the catalogue, using the references the client supplied:

| Area | References | What we take from them |
|---|---|---|
| Liquid-filled transformers | purceepower.com (substation, 3φ/1φ padmount, polemount), ptitransformers.com, maddox.com (padmount, substation, polemount) | Ratings and options, standard vs. optional feature lists, the stock / custom / remanufactured framing, and FAQ topics. PTI adds portable substations (PODS), high-voltage padmounts and visible-break padmounts. |
| Switchboards and switchgear | iemfg.com products | Grouping everything as **Low Voltage, Medium Voltage and Integrated**, plus the rating envelopes for each line (UL 891 / UL 1558 / metal-clad / metal-enclosed / ATS / integrated switchboards / walk-in enclosures). |
| Load banks | universalloadbanks.com | Splitting the range by type and form factor (portable, stationary, resistive-reactive, DC, trailer, containerized/MV, data centre). |
| Whole site | ttpowergroup.com custom switchgear | A repeatable pattern for each product (headline → badges → quote CTA), Canadian credibility, standards shown early, and a long SEO-friendly FAQ. |

**Rules:** all wording is rewritten from scratch, and nothing is copied: no images, item codes/SKUs, brand claims or testimonials from any reference. Every page is written for CANDRON, the Toronto manufacturer, and uses Canadian standards first (CSA, then IEEE/ANSI/UL). No "IEC" anywhere.

---

## 1. What's wrong with the current pages

### Liquid-filled transformers
- **One hard-coded page per product**, each written separately. Ranges and wording don't match across pages (for example, the 3φ padmount stops at 3,000 kVA, while the substation page claims 345 kV).
- **The URLs mix things up:** polemount sits under `/substation/polemount`.
- **Every padmount uses the same drawing**, so 1φ and 3φ look identical. Nothing shows loop vs. radial feed, dead-front vs. live-front, or the cooling classes.
- **No way to choose:** no "which one do I need?" finder, no comparison table and no plain-English explanation of the products.
- **Real products are missing:**
  - inverter-duty / step-up padmounts, even though CANDRON has built one (the 3 MVA project);
  - unit (secondary) substation transformers;
  - portable substations / power skids, which the client's change list names;
  - three-phase polemounts.
- **CANDRON's own project photos** (6 MVA FR3, 15/20 MVA Arctic, 3 MVA inverter-duty) are not used on the product pages they belong to.

### Switchboards and switchgear
- **Products are organized by page history, not by how buyers search.** IEM's split (LV / MV / Integrated) is how engineers think about this equipment.
- **Duplicate pages:** `/products/lv-switchgear` and `/products/switchgear/low-voltage` cover the same product, and `/products/mv-switchgear` exists only as a redirect stub.
- **Gaps:**
  - no pad-mounted switchgear page (the menu points "Pad-Mounted" at the metal-enclosed page);
  - no arc-resistant metal-clad, MV utility metering cabinet, automatic transfer switch, integrated switchboard or walk-in power house (e-house) pages.
- **Switchboard pages** (distribution, main-breaker, main-tie-main, utility-approved) are near-identical templates with generic copy.
- **The MV hub** is a 586-line one-off page whose content doesn't line up with its subpages.

### Load banks
- **One page covers everything**, with a vague "1 kW – 30 MW" claim and no types.
- **No explanation of why a load bank is needed.** In Canada that is CSA C282's annual load test for emergency generators, which is the strongest selling point.

### Junction boxes and splitters
- The client asked for this page to be removed. It's linked from the menu, footer, products page, sitemap and other pages.

### Dry-type range
- **19 product pages and 4 family pages show "Product photo coming soon" boxes.** There are 23 empty boxes in total, which make the range look unfinished.

---

## 2. What we'll build

### 2.1 One range engine for every product family
The dry-type system is generalized into a shared **range engine**:
- `lib/ranges/` holds each range as data;
- `components/range/` holds the hub, family and product templates, the finder, the comparison table, the "In plain words" strip, the full-range navigation and the art/photo slot.

Dry-type is rebuilt on the same engine, so every range behaves the same:

- **Hub page:** what the range is, a need-based finder, a comparison of every product, the basics, an FAQ, and why CANDRON.
- **Family pages:** a plain overview, cards with a live 3D drawing for each product, a comparison table, other families, and full-range navigation.
- **Product pages:** a 3D drawing in the hero, specs and KPIs, a second animated drawing beside the overview (schematic or wiring), "In plain words" (what it does, pick it when, better choice if…), features and upgrades, the full spec table, standards, applications, related products, an FAQ, a checklist of what to send for a quote, and links to the rest of the range.

### 2.2 Liquid-filled transformer range (new hub: `/products/transformers/liquid-filled`)

| Family | Products | Range (CANDRON's offer) |
|---|---|---|
| **Padmount** (`/products/transformers/padmount`) | Three-phase padmount · Single-phase padmount · Inverter-duty / step-up padmount | 3φ 45 – 10,000 kVA ≤ 46 kV · 1φ 10 – 250 kVA ≤ 34.5 kV · step-up 500 – 7,500 kVA |
| **Substation** (`/products/transformers/substation`) | Unit substation transformer · Power transformer · Portable substation & power skid | 300 – 5,000 kVA ≤ 35 kV · 5 – 100 MVA ≤ 230 kV · skid/trailer up to 12.5 MVA |
| **Polemount** (`/products/transformers/polemount`) | Single-phase polemount · Three-phase polemount | 5 – 333 kVA · 15 – 300 kVA |

Existing URLs (`padmount/three-phase`, `padmount/single-phase`, `substation/power`) keep working. `substation/polemount` redirects to its new home. The power and inverter-duty pages show CANDRON's own project photos.

### 2.3 Switchboards & switchgear, as Low Voltage / Medium Voltage / Integrated (new hub: `/products/power-distribution`)

| Family | Products |
|---|---|
| **Low voltage** (`/products/switchboards`) | Distribution switchboard · Service-entrance (main-breaker) switchboard · Main-tie-main switchboard · Utility-metered switchboard · Integrated switchboard (new) · LV draw-out switchgear · Automatic transfer switch (new) |
| **Medium voltage** (`/products/switchgear`) | Metal-clad · Metal-enclosed load-interrupter · Pad-mounted switchgear (new) · Arc-resistant metal-clad (new) · Service-entrance MV · Utility metering cabinet (new) |
| **Integrated power** (`/products/integrated-power`) | Walk-in power house / e-house (new) · Power distribution unit · Remote power panel |

The duplicate LV switchgear page redirects. The menu's "Pad-Mounted" item finally gets its own page.

### 2.4 Load banks (hub: `/products/load-banks`)

| Family | Products |
|---|---|
| **AC load banks** | Portable resistive · Stationary outdoor resistive · Resistive-reactive · Trailer-mounted · Containerized & medium-voltage |
| **DC & data centre** | DC / battery load bank · Data-centre heat-load bank |

Each page explains the test it performs: CSA C282 annual testing, wet-stacking, UPS/battery discharge or data-hall commissioning.

### 2.5 Drawings: our own 3D animation everywhere
- **New isometric 3D models and schematics** are generated with the existing CANDRON drawing engine (`scripts/lineart/`), so every new product has its own animated drawing. This adds about 30 drawings: padmount 1φ/3φ/step-up, unit substation with throats, power transformer with fans/LTC, trailer substation, polemount 1φ/3φ, each switchboard variant, LV switchgear, ATS, metal-clad, metal-enclosed, pad-mounted, arc-resistant, metering cabinet, e-house, and each load bank form factor.
- **Every empty photo box becomes a live animated drawing.** On product pages the box beside the overview shows a different view from the hero (the schematic or wiring), so it adds information. Family cards play each product's 3D model. A real photo still replaces the drawing automatically if one is added to `public/images/<range>/<slug>.webp`.

### 2.6 Removing junction boxes & splitters
Delete the page and its drawing. Remove every link (menu, footer, products page, featured products, sitemap, inventory vocabulary if present). The old URL redirects permanently to `/products`.

### 2.7 Site-wide
- Rebuild the products mega-menu around the new structure: Liquid-filled, Dry-type, LV, MV, Integrated and Load banks.
- Update the sitemap and `/products`.

---

## 3. What we deliberately won't do
- **No reference imagery or wording.** Specs are industry-standard rating envelopes; every sentence is new.
- **No made-up reviews, stock counts, "thousands in stock" claims or warranty terms.** We keep CANDRON's real claims only: Toronto, made in Canada, in-house testing, same-day quotes and 24/7 response.
- **No IEC references.** Canadian standards come first.
