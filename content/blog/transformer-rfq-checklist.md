---
title: How to Write a Transformer RFQ: The Checklist That Gets Comparable Quotes
seoTitle: Transformer RFQ Checklist: What to Include
description: What to put in a transformer RFQ: ratings, voltages, impedance, losses, accessories, tests, lead-time basis and delivery terms, plus how to compare the bids.
date: 2026-11-22
category: project-planning
keywords: transformer RFQ, transformer request for quotation, how to buy a transformer, transformer specification checklist, transformer procurement, transformer quote comparison, transformer bid evaluation
related: RFQ template and bid scorecard | /resources/rfq-scorecard; How to size a transformer | /blog/how-to-size-a-transformer; Transformer no-load vs load losses | /blog/transformer-no-load-vs-load-losses; Long-lead equipment planner | /resources/lead-time-planner
cta: Use the RFQ template and bid scorecard | /resources/rfq-scorecard
---

**A good transformer RFQ states the rating (kVA/MVA), primary and secondary voltages, winding connection, impedance, cooling class, insulation and temperature rise, taps, enclosure or tank type, accessories, required tests and standards, delivery date and location, and how losses will be valued. It also asks every bidder to quote on the same basis: lead time from approved drawings, the same delivery terms and the same warranty.** Without those, you get quotes that cannot be compared, and the cheapest-looking bid often turns out to be the most expensive.

With transformer lead times still long, a clear RFQ also saves weeks: fewer clarification rounds, faster approval drawings, and an order placed on time.

## Part 1: the electrical rating

| Item | Example | Why it matters |
|---|---|---|
| Rating | 2,500 kVA (ONAN), or 20/26.7/33.3 MVA (ONAN/ONAF/ONAF) | Sets size, cost and losses; give fan ratings if wanted |
| Primary voltage | 13.8 kV, 25 kV (24.94 kV), 27.6 kV, 44 kV | Must match the utility or upstream system exactly |
| Secondary voltage | 600Y/347 V, 480Y/277 V, 4.16 kV | Canadian 600 V vs US 480 V equipment matters (see our [600 V to 480 V guide](/blog/600v-to-480v-transformer)) |
| Connection / vector group | Delta primary, grounded wye secondary | Affects grounding, harmonics and paralleling |
| Impedance | 5.75% ±7.5% tolerance | Sets fault current and voltage regulation; match existing units if paralleling |
| Taps | ±2 × 2.5% de-energized taps on the primary | Lets you adjust for utility voltage |
| BIL | 95 kV (15 kV class), 150 kV (25 kV class) | Must suit the system and surge protection |
| Temperature rise / insulation | 65 °C rise (liquid); 150 °C or 80 °C rise (dry-type) | Affects size, life and overload capacity |
| Frequency | 60 Hz | Obvious, but state it |

If you are not sure of the rating, size it first with the [kVA calculator](/resources/kva-calculator) or our [transformer sizing guide](/blog/how-to-size-a-transformer).

## Part 2: type, construction and accessories

- **Type:** liquid-filled padmount, substation (unit or power), polemount, or dry-type (VPI or cast coil).
- **Fluid:** mineral oil or natural ester (state if FR3-type fluid is required for fire safety or indoor use).
- **Winding material:** copper or aluminum, or "supplier's choice" with losses guaranteed.
- **Location:** indoor or outdoor; altitude; ambient extremes (for example −40 °C).
- **Padmount specifics:** loop or radial feed, dead-front or live-front, bushing wells or inserts, fusing (bayonet plus current-limiting), load-break switch.
- **Substation specifics:** throat or cable box connections, conservator or sealed tank, on-load or de-energized tap changer, bushing CTs, surge arresters.
- **Accessories and gauges:** liquid level, top-oil and winding temperature indicators, pressure-relief device, sudden-pressure relay, DGA monitor if wanted.
- **Special duties:** K-factor or harmonic loads, inverter duty (solar/BESS), drive isolation, electrostatic shield.
- **Seismic or special requirements** if the site needs them.

## Part 3: standards, approvals and tests

- **Standards:** CSA C88 and ANSI/IEEE C57.12 series for liquid-filled; CSA C9 and NEMA ST-20/UL 1561 for dry-type (as applicable); CSA C802 / NRCan efficiency requirements where they apply.
- **Certification:** CSA or cUL marking for Canadian installation, or ESA field evaluation if required.
- **Routine tests** (on every unit): ratio, polarity and phase relation, winding resistance, no-load and load losses, impedance, applied and induced voltage, insulation resistance.
- **Type or special tests** if required: temperature rise (heat run), impulse (BIL), sound level, insulation power factor, SFRA baseline.
- **Witnessed factory test:** state whether you want to witness it in person or remotely. Our [factory witness inspection guide](/blog/transformer-factory-witness-inspection) covers what to look at.

## Part 4: losses and how you will value them

Two transformers with the same rating can have very different losses. Ask every bidder for **guaranteed no-load and load losses** and state how you will evaluate them, for example a loss capitalization rate in dollars per kW. That turns losses into a cost you can compare. Our [losses guide](/blog/transformer-no-load-vs-load-losses) explains how, and the [savings and payback calculator](/resources/savings-payback-calculator) does the arithmetic.

## Part 5: commercial terms that make quotes comparable

| Ask every bidder for | Why |
|---|---|
| **Lead time from approved drawings**, and drawing submittal time after PO | "12 weeks" means nothing unless you know when the clock starts |
| **Delivery terms** (for example DDP site, or FCA factory) | Freight, duty and offloading can be large items |
| **Price validity and any metal-price adjustment clause** | Copper and steel prices move; know who carries the risk |
| **Warranty period and start** (from energization or from shipment) | Warranties of the same length can start at different times |
| **Payment terms and milestones** | Affect cash flow and cost |
| **Deviations and exclusions**, listed clearly | Hidden exclusions are the usual reason a low bid is not low |
| **Country of manufacture** | Affects tariffs, lead time and support |
| **Spare parts and recommended spares list** | Gaskets, fuses, fans and gauges |
| **Documentation**: drawings, test reports, O&M manual | Needed for approval, commissioning and maintenance |

Plan the order date against the required on-site date with the [long-lead equipment planner](/resources/lead-time-planner).

## Worked example: a one-page RFQ summary

> - **Item:** one three-phase padmount transformer, liquid-filled, mineral oil
> - **Rating:** 1,500 kVA ONAN, 65 °C rise, 60 Hz
> - **Voltages:** 25 kV (24.94 kV) delta primary, 600Y/347 V secondary
> - **Impedance:** 5.75% ±7.5%; **BIL:** 150 kV HV / 30 kV LV
> - **Taps:** ±2 × 2.5% DETC
> - **Configuration:** loop feed, dead-front, 6 bushing wells, bayonet + partial-range CL fusing, two-position load-break switch
> - **Standards:** CSA C88, ANSI/IEEE C57.12.34, CSA C802 efficiency
> - **Tests:** routine tests per C57.12.90, test report with guaranteed and measured losses
> - **Delivery:** DDP site, Ontario; required on site week 32
> - **Quote basis:** lead time from approved drawings, warranty from energization, losses capitalized at $X/kW no-load and $Y/kW load

A summary like this, with the single-line diagram attached, is enough for most suppliers to give a firm, comparable price. CANDRON returns same-day budget quotes on clear RFQs, and can quote units from stock where the ratings match.

## Frequently asked questions

### What information do I need to get a transformer quote?
At minimum: kVA rating, primary and secondary voltages, winding connection, liquid-filled or dry-type, indoor or outdoor, and the required delivery date. Impedance, taps, accessories and tests make the quote firm rather than budgetary.

### How do I compare transformer quotes fairly?
Put every bid on the same basis: the same scope and exclusions, lead time from approved drawings, the same delivery terms and warranty start, and losses converted to dollars using a capitalization rate. A scorecard helps make the comparison visible.

### Should I specify copper or aluminum windings?
You can specify either, or allow the supplier to choose as long as losses, temperature rise and dimensions are guaranteed. Aluminum is usually cheaper; copper is more compact. Losses matter more than the metal.

### How long is the lead time for a transformer in Canada?
It varies widely by type and rating, from days for stocked dry-type units to many months for large power transformers. Always ask for lead time from approved drawings, and check current figures in the Lead-Time Index.

### Do I need a witnessed factory test?
For larger or critical units, it is good practice. Witnessing (in person or remotely) lets you confirm routine test results, losses and workmanship before the transformer ships.
