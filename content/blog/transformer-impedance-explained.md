---
title: Transformer Impedance (%Z) Explained: Fault Current, Voltage Drop and Paralleling
seoTitle: Transformer Impedance (%Z) Explained
description: What percent impedance on a transformer nameplate means, how to use it to calculate available fault current and voltage drop, typical %Z values by size, and why it matters when you replace or parallel transformers.
date: 2026-11-05
category: transformers
keywords: transformer impedance, percent impedance transformer, transformer %Z, transformer impedance fault current, typical transformer impedance, transformer impedance voltage drop, paralleling transformers impedance
related: Fault current calculator | /resources/fault-current-calculator; Inductance & reactance calculator | /resources/inductance-calculator; Dry-type transformers | /products/transformers/dry-type; Three-phase padmount transformers | /products/transformers/padmount/three-phase
cta: Calculate fault current from %Z | /resources/fault-current-calculator
---

**Transformer impedance (%Z) is the percentage of rated voltage needed on the primary to push full-load current through the transformer when its secondary is short-circuited.** A transformer stamped 5.75% Z needs 5.75% of its rated voltage to drive rated current into a dead short. That one number sets how much fault current the transformer can deliver, how much its voltage sags under load, and whether it can share load with another unit.

It is printed on every nameplate, and it is one of the first things an engineer asks for when replacing a transformer.

## Where the number comes from

Impedance is measured in the factory during the **short-circuit (impedance) test**. The secondary is shorted, and the primary voltage is raised slowly until rated current flows. That voltage, as a percentage of rated voltage, is the %Z.

It combines two parts:

- **Resistance (R)** — the copper or aluminium in the windings, which produces load losses as heat
- **Leakage reactance (X)** — magnetic flux that does not link both windings

In distribution transformers X is usually much larger than R, and the **X/R ratio** rises with size. That ratio matters for breaker interrupting ratings and for arc-flash studies.

## Using %Z to find available fault current

For a quick, conservative estimate, assume the utility source is infinitely strong (an "infinite bus"). Then:

**Fault current = full-load current × 100 ÷ %Z**

where three-phase full-load current = kVA × 1,000 ÷ (1.732 × secondary volts).

### Worked example: 1,500 kVA at 600 V

- Full-load current = 1,500,000 ÷ (1.732 × 600) = **1,443 A**
- Impedance = 5.75%
- Available fault current ≈ 1,443 × 100 ÷ 5.75 = **25,100 A**

Every breaker, fuse and switchboard downstream must be rated to interrupt or withstand at least that much. Real fault current is a little lower, because the utility source has impedance too. The infinite-bus figure is the safe ceiling for equipment ratings, not the number to use for arc-flash calculations. You can run the numbers for any size in our [fault current calculator](/resources/fault-current-calculator).

## Lower vs higher impedance: the trade-off

| | Lower %Z | Higher %Z |
|---|---|---|
| Available fault current | Higher, so downstream gear needs higher kA ratings | Lower, so lighter and cheaper downstream gear |
| Voltage drop under load | Smaller | Larger |
| Motor-starting voltage dip | Smaller | Larger |
| Arc-flash incident energy | Depends; higher current can clear faster | Lower current can mean longer clearing times |

Neither is "better". The right value balances the fault rating of the switchboard you want to use against the voltage regulation your loads can tolerate.

## Typical impedance values

These are typical ranges; manufacturers and utilities have their own standard values.

| Transformer | Typical %Z |
|---|---|
| Small dry-type, 15–150 kVA | 2–5% |
| Dry-type, 225–1,000 kVA | 4–6% |
| Liquid-filled padmount, 750–2,500 kVA | about 5.75% (a common standard value) |
| Unit substation, 1,000–3,000 kVA | 5.75–7% |
| Power transformers, 10 MVA and up | 7–12% or more |

Nameplate impedance has a manufacturing tolerance. For two-winding transformers it is commonly ±7.5% of the specified value, so a unit specified at 5.75% may test anywhere from about 5.3% to 6.2%. Use the tested value from the nameplate or test report, not the specified one.

## Impedance and voltage drop

A transformer's impedance also causes voltage to sag as load increases. At full load and a lagging power factor, the drop is roughly:

**% voltage drop ≈ %R × cos θ + %X × sin θ**

For a typical 5.75% unit with an X/R ratio of about 5, feeding a 0.85 power factor load, that works out to roughly 4% at full load. Taps on the primary (commonly ±2 × 2.5%) let you compensate for a supply that runs consistently high or low.

## Replacing a transformer: keep the impedance close

When you replace a unit, match the old impedance as closely as practical:

- **Much lower %Z** raises fault current. Existing breakers and panels may then be under-rated, which is a safety problem.
- **Much higher %Z** increases voltage drop and motor-starting dips, and can upset protection settings.

If the new impedance differs, have the short-circuit, coordination and arc-flash studies updated. A clear photo of the old nameplate is usually enough to get started.

## Paralleling transformers

Two transformers can share a load in parallel only if they have:

1. The same voltage ratio and tap setting
2. The same phase shift (vector group) and polarity
3. **Closely matched impedance**, typically within about ±7.5% of each other, with similar X/R ratios

If the impedances differ, the lower-impedance unit takes more than its share and overloads first. Paralleling also roughly doubles available fault current, which the downstream equipment must be rated for.

## Frequently asked questions

### What is a good impedance for a transformer?

There is no single good value. Small dry-types are typically 2–5% and padmounts around 5.75%. The best value balances fault current against voltage drop for your system.

### How do you calculate fault current from transformer impedance?

Divide full-load current by the per-unit impedance: fault current = full-load amps × 100 ÷ %Z. This assumes an infinite utility source, so it gives the maximum value.

### Does higher impedance mean higher losses?

Not directly. Impedance is mostly leakage reactance, which does not consume real power. Load losses come from winding resistance, which is only part of the impedance.

### Can I parallel two transformers with different impedances?

Only if they are close, typically within about 7.5% of each other, and match in ratio, taps and phase shift. Otherwise the lower-impedance unit overloads.

### Why does the replacement transformer impedance matter?

A lower impedance raises available fault current above what existing breakers may be rated for. A higher one increases voltage drop. Either change can require updated short-circuit and arc-flash studies.
