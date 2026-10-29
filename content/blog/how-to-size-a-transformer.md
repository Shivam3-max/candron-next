---
title: How to Size a Transformer: kVA Formula, Worked Examples and Standard Sizes
seoTitle: How to Size a Transformer: kVA Formula & Examples
description: A step-by-step guide to transformer sizing for Canadian projects — the kVA formulas for single- and three-phase loads, worked examples at 600 V and 208 V, standard sizes and the margins engineers actually use.
date: 2026-10-29
category: transformers
keywords: how to size a transformer, transformer kVA calculation, transformer sizing, three phase transformer kVA formula, 600V transformer sizing, standard transformer sizes
related: Transformer kVA Calculator | /resources/kva-calculator; HP to kVA Calculator | /resources/hp-kva-calculator; Dry-type transformers | /products/transformers/dry-type; Padmount transformers | /products/transformers/padmount
cta: Size it with the kVA calculator | /resources/kva-calculator
---

Sizing a transformer comes down to one question: **how much apparent power (kVA) will the load draw, and how much room do you need on top of it?** Get it too small and the transformer runs hot, ages fast and trips on motor starts. Get it too big and you pay more up front, lose a little efficiency at light load and raise the fault current downstream.

This guide walks through the method we use when we size a transformer for a quote: the formulas, worked examples at Canadian voltages, the standard sizes you will actually be able to buy, and the factors that push a size up or down.

## The two kVA formulas

Transformers are rated in **kVA** (kilovolt-amperes), not kW, because the transformer has to carry the full current whatever the power factor of the load.

**Single-phase:**

`kVA = V × I ÷ 1,000`

**Three-phase:**

`kVA = V × I × 1.732 ÷ 1,000`

Where:

- **V** is the line-to-line voltage (for example 600 V, 480 V or 208 V)
- **I** is the line current in amps
- **1.732** is √3, which accounts for the three phases

The most common mistake is using the line-to-neutral voltage (347 V or 120 V) in the three-phase formula. That undersizes the transformer by a factor of 1.732.

If you know the load in **kW** rather than amps, convert it first: `kVA = kW ÷ power factor`. A 100 kW load at 0.85 power factor needs about 118 kVA. Our [kW to kVA converter](/resources/kw-kva-calculator) does this for you.

## Step-by-step sizing method

1. **List the connected load.** Use the panel schedules or the single-line diagram. Separate motors from lighting, receptacles and electronic loads.
2. **Apply demand factors.** Not everything runs at once. Use the Canadian Electrical Code demand factors for the occupancy, or measured data if the building already exists.
3. **Convert to kVA.** Use the formulas above, or convert motor horsepower with the [HP to kVA calculator](/resources/hp-kva-calculator).
4. **Add growth margin.** Most designers add 15 to 25% for future load.
5. **Check motor starting.** A large motor starting across the line can draw six to eight times its running current. If the largest motor is a big share of the transformer rating, the voltage dip may be the deciding factor, not the steady load.
6. **Check harmonics.** Drives, UPS systems, LED lighting and IT loads distort the current and heat the transformer more than their kVA suggests. See [K-factor transformers](/blog/k-factor-transformers-explained) for how to handle this.
7. **Round up to the next standard size.**

## Worked example: a 600 V three-phase load

A small manufacturing line has a measured demand of 85 A at 600 V, three-phase.

`kVA = 600 × 85 × 1.732 ÷ 1,000 = 88.3 kVA`

Add 20% for growth: `88.3 × 1.2 = 106 kVA`.

The next standard size up is **112.5 kVA**. That is the transformer to specify.

## Worked example: 208 V lighting and receptacles

A tenant floor needs 160 A at 208Y/120 V, three-phase.

`kVA = 208 × 160 × 1.732 ÷ 1,000 = 57.6 kVA`

With 20% growth: `69 kVA`. The next standard size is **75 kVA**, typically fed at 600 V from the building's main switchboard.

Run the same numbers in seconds with the [transformer kVA calculator](/resources/kva-calculator).

## Standard transformer sizes

You cannot buy a 106 kVA transformer off the shelf. These are the common standard ratings:

| Type | Common standard kVA ratings |
|---|---|
| Single-phase dry-type | 3, 5, 7.5, 10, 15, 25, 37.5, 50, 75, 100, 167 |
| Three-phase dry-type | 15, 30, 45, 75, 112.5, 150, 225, 300, 500, 750, 1,000 |
| Three-phase padmount | 75, 112.5, 150, 225, 300, 500, 750, 1,000, 1,500, 2,000, 2,500, 3,000, 3,750, 5,000 |

Custom ratings are possible, but a standard size is usually cheaper and quicker to get — and quicker to replace if it ever fails.

## Full-load current at common Canadian voltages

Once you have picked a size, check the full-load current so the breakers, cables and bus are sized to match. For a three-phase transformer, `I = kVA × 1,000 ÷ (V × 1.732)`.

| kVA | 600 V | 480 V | 208 V |
|---|---|---|---|
| 45 | 43 A | 54 A | 125 A |
| 75 | 72 A | 90 A | 208 A |
| 112.5 | 108 A | 135 A | 312 A |
| 150 | 144 A | 180 A | 416 A |
| 225 | 217 A | 271 A | 625 A |
| 300 | 289 A | 361 A | 833 A |
| 500 | 481 A | 601 A | 1,388 A |

## What else changes the size

- **Ambient temperature and altitude.** Transformers are rated for a standard ambient and altitude. Hot electrical rooms, enclosures in the sun and high sites reduce the capacity you can use.
- **Ventilation.** A ventilated dry-type transformer in a cramped room with no airflow will run hotter than its rating assumes.
- **Continuous loading.** Many designers keep continuous load at or below about 80% of nameplate so the transformer runs cooler and lasts longer.
- **Temperature rise.** A dry-type transformer with an 80 °C or 115 °C rise has more overload headroom and lower losses than a standard 150 °C rise unit of the same kVA.
- **Fault current.** A larger transformer, or one with lower impedance, delivers more fault current to the downstream equipment. Check the short-circuit ratings with the [fault current calculator](/resources/fault-current-calculator).

## Frequently asked questions

### How much bigger than the load should a transformer be?

A common practice is to size for the calculated demand plus 15 to 25% for growth, then round up to the next standard size. Keeping continuous load near 80% of the nameplate rating gives a cooler, longer-lived transformer.

### Can I size a transformer from the breaker size?

Only as a rough check. The breaker protects the conductors, not the transformer, and it is usually larger than the actual demand. Size from the calculated or measured load instead.

### What size transformer do I need for a motor?

Convert the motor horsepower to kVA using its efficiency and power factor, then check the voltage dip during starting. For a large motor started across the line, the transformer often needs to be noticeably larger than the running kVA suggests.

### Is it bad to oversize a transformer?

Slightly oversizing is normal and gives room to grow. Heavily oversizing raises the purchase price, increases no-load losses as a share of the load and raises the available fault current downstream.
