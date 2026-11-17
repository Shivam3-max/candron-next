---
title: Transformer No-Load vs Load Losses: Where the Energy Goes and How to Compare Quotes
seoTitle: Transformer No-Load vs Load Losses Explained
description: The difference between transformer no-load (core) losses and load (copper) losses, how each changes with loading, where peak efficiency occurs, and how to use guaranteed losses and loss capitalization to compare bids.
date: 2026-11-16
category: transformers
keywords: transformer no load loss, transformer load loss, core loss vs copper loss, transformer losses explained, transformer loss evaluation, transformer loss capitalization, transformer efficiency at 50 percent load
related: Transformer efficiency calculator | /resources/efficiency-calculator; Savings and payback calculator | /resources/savings-payback-calculator; Transformer efficiency regulations in Canada | /blog/transformer-efficiency-regulations-canada; Transformer core construction | /blog/transformer-core-construction
cta: Calculate transformer losses | /resources/efficiency-calculator
---

**Every transformer wastes a small share of the energy that passes through it, in two forms: no-load losses, which run constantly whenever it is energized, and load losses, which rise with the square of the current.** Efficiency figures hide the difference. Guaranteed losses in watts show it, and over a 30-plus-year life those watts can cost more than the transformer itself.

## No-load (core) losses

No-load loss is the energy used to magnetize the core. It is present whenever the transformer is energized, **whether or not anything is connected to it**.

- Caused by **hysteresis** and **eddy currents** in the core steel.
- Roughly constant regardless of load.
- Set by steel grade, lamination thickness, joint design and flux density. See [core construction](/blog/transformer-core-construction).
- Measured in the factory by the **excitation (no-load) test**.

Because no-load loss runs 8,760 hours a year, a few hundred watts adds up to thousands of kilowatt-hours.

## Load (copper) losses

Load loss is the heat produced as current flows through the windings.

- Mostly **I²R** loss in the conductors, plus stray and eddy losses in windings and structural parts.
- Varies with the **square of the load**: at half load, load losses are one quarter of full-load value.
- Set by conductor size and material, and design. See [copper vs aluminum windings](/blog/copper-vs-aluminum-transformer-windings).
- Measured by the **impedance (load loss) test**.

## Where efficiency peaks

A transformer is most efficient where **load losses equal no-load losses**. For most distribution designs this falls somewhere between about 35% and 50% of rated load, which is why Canadian and U.S. efficiency rules for distribution transformers are set at **50% load**. See [transformer efficiency regulations in Canada](/blog/transformer-efficiency-regulations-canada).

## A worked example

A 1,500 kVA transformer with:

- no-load loss: **1,800 W**
- load loss at full load: **12,000 W**

At an average 40% load, load loss = 12,000 × 0.4² = **1,920 W**.

Annual losses ≈ (1,800 + 1,920) W × 8,760 h ≈ **32,600 kWh**.

At $0.12/kWh that is about **$3,900 a year**, or over $100,000 across a 30-year life before inflation. Two bids that differ by a few hundred watts can differ by tens of thousands of dollars in life-cycle cost.

## Comparing bids: loss evaluation

Utilities and many large owners compare transformers by **total owning cost**:

**Total owning cost = purchase price + (A × no-load loss) + (B × load loss)**

- **A** = present value of 1 W of no-load loss over the life ($/W), usually higher because it runs all year.
- **B** = present value of 1 W of load loss ($/W), reduced to reflect the actual load profile.

Typical A factors run several dollars per watt; B factors are usually lower. Put A and B in the RFQ and require **guaranteed losses** with penalties for exceeding them. Our [RFQ scorecard](/resources/rfq-scorecard) helps structure the comparison.

## How to reduce losses

| Lower no-load loss | Lower load loss |
|---|---|
| Better steel grade, thinner laminations | Larger conductor cross-section |
| Step-lap joints | Copper instead of aluminum (same size) |
| Lower design flux density | Lower temperature rise design |
| Amorphous metal core | Reduced stray-loss design |

Which side to improve depends on your load profile:

- **Lightly loaded, always on** (utility distribution, standby): focus on no-load loss.
- **Heavily loaded, long hours** (data centres, process plants): focus on load loss.

## Frequently asked questions

### What is the difference between no-load loss and load loss?

No-load loss is the constant energy needed to magnetize the core whenever the transformer is energized. Load loss is heat in the windings that rises with the square of the load current.

### Why are transformer efficiency standards set at 50% load?

Because most distribution transformers operate well below full load on average, and 50% load is close to where their efficiency peaks.

### How do I compare transformer quotes on losses?

Ask for guaranteed no-load and load losses in watts, then calculate total owning cost using loss evaluation factors (A and B) that reflect your energy cost and load profile.

### Do losses increase as a transformer ages?

Core and winding losses stay broadly stable. Losses rise in practice when cooling deteriorates or harmonics increase, which raises operating temperature.
