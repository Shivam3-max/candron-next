---
title: Padmount Transformer Fusing Explained: Bayonet, Current-Limiting and Weak-Link Fuses
seoTitle: Padmount Transformer Fusing Explained
description: How padmount transformer primary fuses work: bayonet expulsion and current-limiting backup fuses, how they coordinate, how they are sized and safely replaced.
date: 2026-11-22
category: transformers
keywords: padmount transformer fuse, bayonet fuse, bay-o-net fuse, current limiting fuse transformer, partial range current limiting fuse, padmount fuse sizing, transformer primary fuse
related: Three-phase padmount transformers | /products/transformers/padmount/three-phase; Padmount transformer guide | /blog/padmount-transformer-guide; Transformer inrush current | /blog/transformer-inrush-current; Pad-mounted switchgear | /products/switchgear/pad-mounted
cta: See three-phase padmount transformers | /products/transformers/padmount/three-phase
---

**Most padmount transformers are protected on the primary by two fuses in series inside the tank: a bayonet-type expulsion fuse that clears overloads and low-level faults, and a partial-range current-limiting (backup) fuse that clears high-current internal faults very fast. The bayonet fuse can be replaced from outside the tank with a hot stick; the backup fuse is meant to operate only when the transformer itself has failed.** Together they cover the full range of fault current while keeping costs low.

Getting the fuse combination and ratings right protects the transformer, coordinates with the utility or upstream switchgear, and avoids nuisance blowing on energization.

## The fuses inside a padmount

| Fuse | Where | What it clears | Replaceable in the field? |
|---|---|---|---|
| **Bayonet expulsion fuse** (often called by the trade name Bay-O-Net) | In a holder that slides into the tank from the HV compartment; the fuse link sits under oil | Secondary faults, overloads, low-current internal faults | Yes, with a hot stick, after de-energizing or following the maker's load-break limits |
| **Partial-range current-limiting (CL) fuse** | In series with the bayonet, mounted inside the tank under oil | High-current faults, typically internal transformer failures | No. If it has operated, the transformer usually has an internal fault and must be tested or replaced |
| **Weak-link cartridge** | Used instead of a bayonet on some smaller and single-phase units | Overloads and secondary faults | Requires opening the tank on some designs |
| **Isolation link** | Used in some designs in place of a CL fuse | Isolates a failed unit; not a current-limiting device | No |

Some units, especially larger ones, use **external fusing** instead: fuses in upstream pad-mounted switchgear or a switch-fuse compartment.

## Types of bayonet fuse element

Bayonet links come in several characteristics. The supplier or utility chooses based on the duty:

- **Current-sensing:** responds to current only.
- **Dual-sensing:** responds to current **and oil temperature**, so it opens on long, moderate overloads that heat the oil. This gives better overload protection.
- **Dual-element:** combines a time-delay element (to ride through inrush and cold-load pickup) with a fast element for faults.
- **High-amperage overload:** for larger units and higher primary currents.

## How the two fuses coordinate

The partial-range CL fuse has a **minimum interrupting current**. Below that level it cannot interrupt safely, so it must never be asked to. The design makes sure:

1. For **low currents** (overloads and secondary faults), the **bayonet fuse operates first**, well below the CL fuse's minimum interrupting current.
2. For **high currents** (internal faults), the **CL fuse operates** in under half a cycle and limits the energy, protecting the tank from rupture.
3. The crossover point of the two curves sits between these two regions.

This is why the bayonet and CL fuse ratings are always selected **as a matched pair** from the manufacturer's coordination tables. Never change one without checking the other.

## How fuses are sized

Fuse size is based on the transformer's primary full-load current, then chosen from the supplier's tables to:

- **Carry the normal load and permissible overloads** without blowing.
- **Withstand inrush** at energization (typically assessed as about 12 × full-load current for 0.1 s and 25 × for 0.01 s); see our [inrush current guide](/blog/transformer-inrush-current).
- **Withstand cold-load pickup** after an outage.
- **Protect the transformer** against secondary faults within its through-fault capability.
- **Coordinate** with the upstream utility fuse or switchgear.

### Example primary full-load currents

| Three-phase padmount | Primary at 13.8 kV | Primary at 25 kV (24.94 kV) |
|---|---|---|
| 500 kVA | 20.9 A | 11.6 A |
| 1,000 kVA | 41.8 A | 23.1 A |
| 1,500 kVA | 62.8 A | 34.7 A |
| 2,500 kVA | 104.6 A | 57.9 A |

Formula: kVA ÷ (√3 × kV). The bayonet rating chosen is typically above these values by a margin set by the maker's tables; utilities in Canada often specify their own standard fuse tables for padmounts on their system, so check the LDC's requirements first.

## Three-phase units and single-phasing

On a three-phase padmount, **one blown primary fuse leaves the transformer single-phased**. Three-phase motors downstream then run on two phases, overheat and can be damaged unless they have phase-loss protection. Good practice:

- Provide **phase-loss / phase-unbalance protection** (device 46 or 47) on critical motors.
- When one fuse blows, **replace all three** if the others may have been stressed, and find the cause before re-energizing.

## Replacing a bayonet fuse safely

The exact procedure comes from the transformer supplier and the utility's operating rules, but the principles are:

1. **Wear the PPE** required by the arc-flash label and follow CSA Z462 procedures.
2. **Vent the tank** using the pressure-relief valve before pulling the fuse holder, so hot oil does not spray out.
3. **Unlatch and withdraw** the holder with a hot stick, standing to the side; allow oil to drip back into the tank (many units have a drip shield).
4. **Inspect and replace** the fuse link with the **same rating and type** shown on the nameplate or fuse label.
5. If the replacement blows again on energization, **stop**: there is likely an internal fault, and the transformer needs testing (insulation resistance, TTR and possibly a DGA oil sample; see our [transformer testing guide](/blog/transformer-testing-types)).

Whether the bayonet may be pulled under load depends on the product's rating and the utility's rules; many operators de-energize first. If the fuse rating is unreadable, send a photo of the nameplate and fuse label to CANDRON and our engineers will help identify the correct replacement.

## Frequently asked questions

### What is a bayonet fuse in a padmount transformer?
A bayonet fuse is an expulsion fuse held in a cartridge that slides into the transformer tank through the high-voltage compartment. It clears overloads and secondary faults and can be replaced with a hot stick without opening the tank.

### Why does a padmount have two fuses in series?
The bayonet fuse handles low-level faults and overloads, while the partial-range current-limiting fuse handles high-current internal faults that the bayonet cannot interrupt safely. Together they cover the full range of fault current.

### What does it mean if the current-limiting fuse has blown?
It usually means the transformer has an internal fault. The transformer should be tested before any attempt to re-energize, and in many cases it must be repaired or replaced.

### Can I use a larger bayonet fuse to stop nuisance blowing?
Not without checking. A larger fuse may no longer protect the transformer or coordinate with the current-limiting fuse and upstream devices. Find the cause (inrush, cold-load pickup, overload or a real fault) and select the fuse from the manufacturer's tables.

### Are dual-sensing bayonet fuses better?
For transformers that see long overloads, often yes, because they respond to oil temperature as well as current and give better overload protection. The choice depends on the load and the utility's standards.
