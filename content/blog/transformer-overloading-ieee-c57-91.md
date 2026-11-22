---
title: Can You Overload a Transformer? Loading Above Nameplate Under IEEE C57.91
seoTitle: Transformer Overload Capacity: IEEE C57.91
description: How far an oil-filled transformer can run above nameplate: hot-spot limits, aging factor, IEEE C57.91 loading types, cold-climate gains and what limits first.
date: 2026-11-22
category: transformers
keywords: transformer overload capacity, transformer overloading, IEEE C57.91, loading transformer above nameplate, hot spot temperature transformer, aging acceleration factor, transformer emergency loading
related: Transformer temperature rise and insulation class | /blog/transformer-temperature-rise-insulation-class; Transformer cooling classes | /blog/transformer-cooling-classes-onan-onaf; Substation transformers | /products/transformers/substation; Transformer oil testing and DGA | /blog/transformer-oil-testing-dga-explained
cta: Ask an engineer about overload capability | /contact
---

**Yes. An oil-filled transformer can carry more than its nameplate kVA for hours or even continuously in cold weather, as long as the winding hot-spot and top-oil temperatures stay within safe limits. IEEE C57.91 is the guide for this: at the rated hot-spot temperature of 110 °C (for a 65 °C rise unit), insulation ages at its normal rate; every few degrees hotter roughly doubles the aging rate.** Overloading is a trade between extra capacity now and some loss of insulation life, and it is limited just as often by bushings, tap changers, cables and fuses as by the windings.

The nameplate kVA is not a hard wall. It is the load the transformer can carry continuously at a 30 °C average ambient while reaching its rated temperature rise. Real loads vary through the day and the year, and real ambients are often colder, especially in Canada.

## What actually limits a transformer: temperature

The life of a transformer is the life of its **paper insulation**, and paper ages faster at higher temperature. The hottest point in the winding, the **hot spot**, is what matters.

For a modern **65 °C rise** liquid-filled transformer:

- Average ambient: 30 °C
- Average winding rise at rated load: 65 °C
- Hot-spot allowance: a further 15 °C
- **Rated hot spot: 30 + 65 + 15 = 110 °C**

At a constant 110 °C hot spot, the insulation reaches its normal design life. Our [temperature rise guide](/blog/transformer-temperature-rise-insulation-class) explains the rise ratings in detail.

## The aging acceleration factor

IEEE C57.91 gives an **aging acceleration factor (F_AA)** relative to a 110 °C hot spot:

**F_AA = exp( 15,000 / 383 − 15,000 / (θH + 273) )**, where θH is the hot-spot temperature in °C.

| Hot-spot temperature | Aging rate vs normal | One day at this temperature uses… |
|---|---|---|
| 90 °C | about 0.12× | about 3 hours of normal life |
| 100 °C | about 0.35× | about 8 hours |
| **110 °C** | **1.0×** | **24 hours (normal)** |
| 120 °C | about 2.7× | about 2.7 days |
| 130 °C | about 7× | about 7 days |
| 140 °C | about 17× | about 17 days |

The key point: **life used is cumulative**. A transformer that runs at 90–100 °C most of the time banks unused life, which can be spent during short peaks above 110 °C without shortening its total life.

## IEEE C57.91 loading categories

The guide describes several types of loading, with suggested temperature limits for each:

| Loading type | Purpose | Suggested hot-spot limit | Suggested top-oil limit |
|---|---|---|---|
| Normal life expectancy | Daily cycles, including some time above nameplate | 120 °C | 105 °C |
| Planned loading beyond nameplate | Accepted, repeated overloads with some extra aging | 130 °C | 110 °C |
| Long-time emergency | Outage of another unit, lasting weeks or months | 140 °C | 110 °C |
| Short-time emergency | Severe contingency for a short period (about half an hour or less) | 180 °C | 110 °C |

These are the guide's suggested values; confirm them against the edition you use and the owner's risk tolerance. Above about 140 °C there is also a risk of **gas bubbles** forming from wet insulation, which can lead to dielectric failure. That risk rises with moisture content, so the condition of the insulation (see our [oil testing guide](/blog/transformer-oil-testing-dga-explained)) matters.

## The Canadian advantage: cold ambient

The 30 °C average ambient behind the nameplate is far warmer than most Canadian sites for most of the year. When the ambient is colder, the hot spot is colder at the same load, so the transformer can carry more for the same aging.

An older rule of thumb for self-cooled (ONAN) units is roughly **1% more kVA for each °C of average ambient below 30 °C** (less for forced-cooled units). On a 0 °C winter day, that suggests capacity well above nameplate. The proper way to confirm it is with the C57.91 thermal model and the unit's test data, but it explains why many Canadian utilities rate transformers seasonally, with higher winter ratings. Treat any figure from a rule of thumb as indicative.

## Worked example: a daily peak

A 2,500 kVA ONAN padmount serving a commercial building sees:

- 1,500 kVA (60%) for 16 hours a day
- 2,900 kVA (116%) for 4 hours in the afternoon
- 2,000 kVA (80%) for the remaining 4 hours
- Summer ambient averaging 25 °C

At 60% load the hot spot runs far below 110 °C, aging at a fraction of the normal rate. During the 4-hour peak, the hot spot may rise above 110 °C (the exact value depends on the unit's thermal time constants and test data). Over the 24-hour cycle, the **total** aging is likely to be at or below one normal day, so the peak is acceptable under "normal life expectancy" loading, as long as no ancillary component limits it. An engineer confirms this with the C57.91 calculation using the unit's heat-run data.

## What limits first: ancillary components

Windings are often not the weakest link. Check:

- **Bushings**: rated current is often close to the winding rating.
- **Tap changers**: contacts have their own current limits.
- **Bushing CTs, leads and internal connections.**
- **Primary fuses** (on padmounts): a long overload can blow them.
- **Secondary cables, busway and switchgear** downstream.
- **Cooling equipment:** an ONAF unit only reaches its fan rating if the fans work.

For these reasons many owners and utilities cap overloads at **around 150% of nameplate** unless every component is known to handle more.

## Dry-type transformers

Dry-type units follow a different loading guide (**IEEE C57.96**). They have much lower thermal mass, so they heat up faster, and their insulation class (for example 220 °C) sets the limit. Short overloads are possible, but the margin is generally smaller than for oil-filled units. Fan cooling (AF) can add capacity on units built for it.

## Monitoring overloads

If a transformer will be loaded above nameplate regularly:

- Fit a **winding temperature indicator** and top-oil thermometer with alarms (see our [gauges guide](/blog/transformer-gauges-and-protective-devices)).
- Log load and temperatures, or use a monitor that calculates loss of life.
- Take regular **DGA oil samples**, since overheating shows up as gases.

When specifying a new unit for a site with known peaks, it is often cheaper to choose a fan-cooled (ONAF) rating than to buy a larger unit. CANDRON's engineers can check a load profile against a unit's capability before you order.

## Frequently asked questions

### How much can a transformer be overloaded?
It depends on the load cycle, ambient temperature, cooling and the condition of the insulation. Short daily peaks of 110–130% are often acceptable for oil-filled units without extra aging, while many owners cap overloads at around 150% because of bushings and other components. Each case should be calculated.

### What is the hot-spot temperature of a transformer?
The hottest point in the winding. For a 65 °C rise oil-filled transformer at rated load and 30 °C ambient, it is 110 °C. Insulation aging is calculated from the hot spot.

### Does overloading a transformer reduce its life?
Only if the hot spot runs above 110 °C long enough that the cumulative aging exceeds normal. Running below rated temperature most of the time banks life that can be used during peaks.

### Can a transformer carry more load in winter?
Yes. A colder ambient lowers the winding temperature at the same load, so an oil-filled transformer can carry more for the same aging. Many Canadian utilities use seasonal ratings for this reason.

### Does IEEE C57.91 apply to dry-type transformers?
No. Dry-type transformer loading is covered by IEEE C57.96.
