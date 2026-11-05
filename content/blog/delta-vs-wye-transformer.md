---
title: Delta vs Wye Transformer Connections: How They Differ and Which One to Use
seoTitle: Delta vs Wye Transformer Connections
description: A plain guide to delta and wye transformer windings — delta-wye, wye-wye, delta-delta and wye-delta — with the voltages, neutrals, grounding, harmonics and 30° phase shift that decide which connection a Canadian project needs.
date: 2026-11-05
category: transformers
keywords: delta vs wye transformer, delta wye transformer, wye wye transformer, delta delta transformer, transformer winding connections, 600Y/347 transformer, transformer phase shift 30 degrees
related: Standard dry-type transformers | /products/transformers/dry-type-lv/standard; Isolation transformers | /products/transformers/dry-type-lv/isolation; Grounding transformers | /products/transformers/dry-type-mv/grounding-transformer; Three-phase padmount transformers | /products/transformers/padmount/three-phase
cta: Browse dry-type transformers | /products/transformers/dry-type
---

**In a delta (Δ) winding the three coils are connected end to end in a triangle, so there is no neutral. In a wye (Y, or star) winding one end of each coil is joined at a common point, which gives you a neutral.** The combination on each side of a transformer — delta-wye, wye-wye, delta-delta or wye-delta — decides which voltages you get, whether you can serve single-phase loads, how the system is grounded and what happens to harmonics.

The most common building and plant transformer in North America is **delta primary, grounded-wye secondary**. Here is why, and when the others make sense.

## The two connections side by side

| | Delta (Δ) | Wye (Y) |
|---|---|---|
| Neutral point | No | Yes |
| Voltage across each coil | Full line-to-line voltage | Line-to-line ÷ 1.732 |
| Current in each coil | Line current ÷ 1.732 | Full line current |
| Serves single-phase (line-to-neutral) loads | No | Yes, for example 347 V lighting or 120 V receptacles |
| Grounding | Needs a grounding transformer or a corner ground | Neutral can be solidly or resistance grounded |
| Triplen harmonics (3rd, 9th…) | Circulate inside the delta and stay out of the supply | Flow in the neutral |

## Delta-wye: the default choice

A **delta-wye** transformer takes a three-wire supply on the primary and creates a four-wire, grounded system on the secondary. Typical Canadian examples:

- **600 V delta to 208Y/120 V** — the dry-type transformer that feeds receptacles and small loads in commercial buildings
- **25 kV or 13.8 kV delta to 600Y/347 V** — a unit substation or padmount serving a building's main switchboard
- **4,160 V delta to 600Y/347 V** in industrial plants

It is the default for good reasons:

- **A new neutral and ground reference.** The secondary is a separately derived system, so you can bond its neutral to ground right at the transformer.
- **Ground faults stay local.** A line-to-ground fault on the secondary is not seen as ground current on the primary, which simplifies protection upstream.
- **Harmonics are contained.** Triplen harmonics from computers, LED drivers and other single-phase electronics circulate in the delta and do not pass back to the supply.
- **Unbalanced loads are handled well**, because the delta lets currents redistribute.

### The 30° phase shift

A delta-wye transformer shifts the secondary voltages by 30° relative to the primary. North American standards fix the direction: the **low-voltage side lags the high-voltage side by 30°**. You only need to care when you **parallel** transformers or **tie** two sources together. Both sides must have the same phase shift, or large circulating currents will flow the moment you close the tie.

## Wye-wye: utility distribution and its catches

Many utility padmount and polemount transformers are **grounded-wye to grounded-wye**, because they connect to a four-wire, multi-grounded distribution network. Wye-wye has no phase shift and is efficient, but it has caveats:

- Both neutrals must be properly grounded, or the neutral can shift and voltages become unbalanced.
- Triplen harmonics and zero-sequence currents pass straight through from one side to the other.
- A ground fault on the secondary is seen on the primary, which affects how upstream protection is set.

That is why wye-wye is mainly a **utility** choice, set by the utility's own standards. For a customer-owned transformer inside a facility, delta-wye is usually preferred.

## Delta-delta: three-wire power for motors

**Delta-delta** transformers serve three-wire systems with no neutral, such as **600 V motor loads** in older plants. One useful property: if one of three single-phase units in a delta bank fails, the remaining two can keep running in "open delta" at about 58% of the bank's capacity.

The drawback is grounding. A delta-delta secondary has no natural ground point, so it is either left **ungrounded** (with ground-fault detection), **corner-grounded**, or grounded through a separate **grounding transformer**.

## Wye-delta: step-up and special cases

**Wye-delta** connects a grounded wye on the high-voltage side to a delta on the low-voltage side. It shows up in generator step-up units and some inverter transformers, where the utility side needs a grounded reference and the generator or inverter side should not pass zero-sequence current.

## How to choose

| Situation | Usual connection |
|---|---|
| Building or plant transformer feeding 600Y/347 V or 208Y/120 V | Delta primary, grounded-wye secondary |
| Utility-owned distribution padmount on a four-wire system | Grounded-wye to grounded-wye (utility standard) |
| Three-wire 600 V motor load, no neutral needed | Delta-delta, or delta to resistance-grounded wye |
| Drive isolation, harmonic control | Delta-wye, or phase-shifting designs for harmonic cancellation |
| Solar or battery inverter step-up | Set by the inverter maker and utility; often grounded-wye MV with a delta or ungrounded-wye LV |

When in doubt, the **single-line diagram** and the **utility's interconnection requirements** decide the connection. The vector group (for example Dyn1) on the drawing must match the nameplate on delivery.

## Frequently asked questions

### Why is delta-wye the most common transformer connection?

It creates a new grounded neutral for line-to-neutral loads, keeps secondary ground faults from appearing on the primary, and traps triplen harmonics inside the delta winding.

### Can I get 347 V from a delta transformer?

Not from a pure delta secondary, because there is no neutral. You need a wye secondary, such as 600Y/347 V, to serve 347 V lighting.

### What does the 30 degree phase shift mean?

On a delta-wye transformer the secondary voltages lag the primary by 30°. It only matters when paralleling transformers or tying sources together, which must have matching phase shifts.

### Is wye-wye bad?

No. It is standard for utility distribution, but it needs well-grounded neutrals and passes harmonics and ground faults between the two sides, so customer-owned transformers usually use delta-wye instead.

### What is a grounding transformer for?

It creates a neutral and a ground reference on an otherwise ungrounded delta system, so ground faults can be detected and cleared.
