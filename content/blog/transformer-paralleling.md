---
title: Paralleling Transformers: The Five Conditions, Load Sharing and Common Pitfalls
seoTitle: Paralleling Transformers: Conditions and Pitfalls
description: How to parallel two transformers safely: matching ratio, polarity, phase shift and impedance, how load splits, circulating current and the fault-level trap.
date: 2026-11-22
category: transformers
keywords: parallel transformers, transformer paralleling, conditions for parallel operation of transformers, transformer load sharing, circulating current transformers, paralleling transformers impedance
related: Fault-current calculator | /resources/fault-current-calculator; Transformer impedance explained | /blog/transformer-impedance-explained; Substation transformers | /products/transformers/substation; Main-tie-main switchboards | /products/switchboards/main-tie-main
cta: Calculate the combined fault current | /resources/fault-current-calculator
---

**Two transformers can be connected in parallel when they have the same voltage ratio, the same polarity, the same phase shift (angular displacement), the same phase sequence and closely matched percent impedance. If the ratio or phase shift differs, large circulating currents flow even with no load; if the impedances differ, the transformers share load unequally and one overloads before the other is fully used.** Paralleling also roughly doubles the fault current on the common bus, which is the pitfall most often missed.

Paralleling is used to add capacity, to provide redundancy (for example in a main-tie-main arrangement), or to keep supply during maintenance. It works well when the units are matched and the downstream equipment is rated for the higher fault level.

## The five conditions

| Condition | What must match | What happens if it doesn't |
|---|---|---|
| **1. Voltage ratio** | Same primary and secondary voltages, and the **same tap position** | Circulating current flows between the units, even at no load |
| **2. Polarity** | Same polarity (additive or subtractive, on single-phase units) | A dead short between the secondaries |
| **3. Phase shift** | Same angular displacement (for example, both delta–wye with the standard 30° shift) | Large circulating current; effectively a short circuit. **Never parallel units with different phase shifts.** |
| **4. Phase sequence** | Phases connected A-B-C to A-B-C | Short circuit between phases |
| **5. Impedance** | Percent impedance within a close tolerance (a common guideline is within about 7.5–10% of each other) and similar X/R ratio | Unequal load sharing; one unit overloads first |

Conditions 2, 3 and 4 are absolute: get them wrong and protection trips the moment you close the tie. Conditions 1 and 5 are about degree: small mismatches are acceptable, large ones are not.

A common rule of thumb also limits the **kVA ratio of paralleled units to about 3:1** or less, because a small transformer paralleled with a large one tends to take more than its share.

## How load divides: the impedance rule

Paralleled transformers share load **in inverse proportion to their percent impedance** (when based on their own kVA ratings). The unit with the lower %Z takes more than its share.

### Worked example: two 1,500 kVA units, 5.75% and 5.0% Z

Total load is 3,000 kVA, exactly the combined nameplate.

- Share of unit A (5.75%) = 3,000 × (1/5.75) ÷ (1/5.75 + 1/5.0) = 3,000 × 0.174 ÷ 0.374 ≈ **1,395 kVA** (93%)
- Share of unit B (5.0%) = 3,000 − 1,395 ≈ **1,605 kVA** (107%)

Unit B is 7% overloaded while unit A has spare capacity. To keep B within its rating, total load must be limited to about 1,500 × 0.374 ÷ 0.2 ≈ **2,805 kVA**, so you lose almost 200 kVA of the 3,000 kVA you paid for. With identical impedances, each unit would carry exactly 1,500 kVA.

That is why, when buying a second unit to parallel with an existing one, the specification should state the **existing unit's %Z and X/R ratio** and ask for a match.

## Circulating current from a ratio or tap mismatch

If the two units' open-circuit secondary voltages differ, a current circulates between them that is set by the voltage difference and the sum of their impedances:

**Circulating current (% of rated) ≈ voltage difference (%) ÷ (Z1% + Z2%)**

Example: one unit on a tap 2.5% higher than the other, both 5.75% Z:
2.5 ÷ (5.75 + 5.75) ≈ **22% of rated current** circulating at no load. That current heats both units, adds losses, and uses up capacity. Always check that taps match before closing the tie, and that on-load tap changers on paralleled units are controlled together (master–follower or circulating-current control). Our [tap changer guide](/blog/transformer-tap-changers-detc-vs-oltc) explains both types.

## The fault-level problem

Each transformer limits fault current through its impedance. Two in parallel present **half the impedance**, so the fault current on the common bus roughly **doubles**.

Example: one 2,000 kVA, 600 V, 5.75% unit gives about 33.5 kA at its secondary (infinite source). Two in parallel can deliver about **67 kA**. Switchgear rated 42 kA or 50 kA, fine for one transformer, is now under-rated.

Ways to handle it:

- **Normally open tie** (main-tie-main): the two transformers do not run in parallel; the tie closes only when one main is open, with interlocks that prevent all three closing at once. This is the most common arrangement in Canadian buildings and data centres.
- **Closed transition with a brief parallel** (only for a few cycles during transfer), if the gear's rating and the utility allow it.
- **Higher-rated switchgear** if continuous paralleling is required.
- **Current-limiting reactors** or higher-impedance transformers.

Check the combined fault level with the [fault-current calculator](/resources/fault-current-calculator) before deciding.

## Checklist before paralleling

1. Confirm nameplate voltage ratios, phase shift and polarity are identical.
2. Set both units to the **same tap**.
3. Compare %Z and X/R ratios; calculate the load split.
4. Recalculate the fault current at the common bus and check every downstream rating.
5. Do a **phasing check** with a voltmeter across the open tie before closing it the first time: the reading between like phases should be close to zero.
6. Review protection settings (differential and directional relays may be needed for MV units).

When CANDRON sources a transformer to parallel with an existing one, we specify the ratio, phase shift and impedance to match the existing nameplate, and the factory test report states the tested %Z.

## Frequently asked questions

### Can transformers with different kVA ratings be paralleled?
Yes, if the other conditions are met and their percent impedances are close. A common guideline is to keep the kVA ratio within about 3:1, because load sharing becomes poor beyond that.

### Can a delta–wye transformer be paralleled with a wye–wye transformer?
No. They have different phase shifts (30° vs 0°), which causes very large circulating current. Only units with the same angular displacement can be paralleled.

### What impedance difference is acceptable for paralleling?
A common guideline is that percent impedances should be within about 7.5–10% of each other (for example 5.75% and 5.5%). Closer is better; larger differences mean the lower-impedance unit overloads first.

### Why does paralleling transformers increase fault current?
Each transformer's impedance limits fault current. In parallel, the combined impedance is lower, so more fault current flows. Two identical units roughly double the fault current at the common bus.

### What is a main-tie-main arrangement?
Two transformers each feed their own bus through a main breaker, with a normally open tie breaker between the buses. If one source fails, its main opens and the tie closes, so the other transformer carries both buses. Interlocks usually prevent both transformers from being in parallel.
