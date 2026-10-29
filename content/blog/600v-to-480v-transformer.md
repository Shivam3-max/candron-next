---
title: 600 V to 480 V Transformers: How to Run US Equipment in Canada
seoTitle: 600 V to 480 V Transformers for US Equipment
description: Why US machinery rated 480 V needs a transformer on a Canadian 600 V system, how to choose between an isolation transformer and an autotransformer, how to size it, and what to check before you order.
date: 2026-10-29
category: transformers
keywords: 600V to 480V transformer, 480V equipment in Canada, 600V to 480V autotransformer, step down transformer 600 to 480, 575V vs 600V, imported machinery transformer Canada
related: Dry-type autotransformers | /products/transformers/dry-type-lv/autotransformer; Standard dry-type transformers | /products/transformers/dry-type-lv/standard; Drive isolation transformers | /products/transformers/dry-type-lv/drive-isolation; Transformer kVA calculator | /resources/kva-calculator
cta: See dry-type autotransformers | /products/transformers/dry-type-lv/autotransformer
---

Canada and the United States share most electrical standards, but not their most common industrial voltage. Large Canadian buildings and plants usually distribute power at **600 V**. In the US the equivalent is **480 V**. So when a plant buys a machine, chiller, compressor or production line built for the US market, it very often arrives with a 480 V nameplate.

The fix is simple and very common: a **600 V to 480 V transformer** in front of the equipment. This guide explains how to choose and size one.

## Why 600 V and 480 V don't mix

A motor or drive rated 480 V connected straight to a 600 V supply sees 25% overvoltage. Motors overheat, insulation is stressed, drives trip on overvoltage and the manufacturer's warranty is usually void.

A note on nameplates: Canadian motors are typically rated **575 V** for a 600 V system, and US motors **460 V** for a 480 V system. The motor rating is a little below the system voltage to allow for voltage drop. So "575 V" on a nameplate means the equipment belongs on a Canadian 600 V system, and "460 V" means it needs a transformer.

Also check that the equipment carries a **Canadian certification mark** (CSA, cUL, cETL or similar) or has been field-evaluated. A transformer fixes the voltage, not the approval.

## Isolation transformer or autotransformer?

There are two ways to get from 600 V to 480 V.

### Isolation transformer

Separate primary and secondary windings. The 480 V side is a new, separately derived system with its own neutral and grounding.

- Blocks noise and some harmonics between the plant and the machine
- Lets you create a grounded 480Y/277 V supply if the equipment needs a neutral
- Larger, heavier and more expensive for the same load

### Autotransformer

One shared winding with a tap. Only the difference between 600 V and 480 V is transformed, so a much smaller unit can carry the load.

- For 600 V to 480 V, only about a fifth of the power is actually transformed, so the unit is a fraction of the size and cost of an isolation transformer
- **No isolation**: the 480 V side is electrically tied to the 600 V system and shares its grounding
- Not suitable where the equipment needs a neutral, or where the system grounding arrangements don't allow it

| | Isolation transformer | Autotransformer |
|---|---|---|
| Size and cost | Larger | Much smaller for the same load |
| Electrical isolation | Yes | No |
| Can provide a neutral | Yes (wye secondary) | Only if the system already has one |
| Noise and fault separation | Better | Limited |
| Best for | Drives, sensitive controls, equipment needing 277 V | Simple motor loads on a compatible system |

The right choice depends on how the 600 V system is grounded and what the equipment needs. Check with the engineer of record and the electrical inspector before ordering an autotransformer — the Canadian Electrical Code places conditions on where they can be used.

## Sizing the transformer

Use the equipment's full-load amps at 480 V:

`kVA = 480 × FLA × 1.732 ÷ 1,000`

**Example:** a US chiller with 110 A full-load current at 480 V.

`480 × 110 × 1.732 ÷ 1,000 = 91.4 kVA`

Add margin and round up: an isolation transformer of **112.5 kVA**. For an autotransformer, the rating is usually stated as the load kVA it can carry, so check how the supplier quotes it. Our [kVA calculator](/resources/kva-calculator) handles the arithmetic.

Size up further if:

- the machine has a large motor that starts across the line
- the load includes VFDs or other harmonic sources (consider a [drive isolation transformer](/products/transformers/dry-type-lv/drive-isolation))
- more equipment will be added later

## What to tell your supplier

1. Primary voltage and system grounding (for example 600 V, three-phase, three-wire, resistance grounded)
2. Secondary voltage and whether you need a neutral (480 V delta, or 480Y/277 V)
3. Load: full-load amps, largest motor and any drives
4. Location: indoor or outdoor, ambient temperature, available space
5. Enclosure type and any mounting constraints

## Frequently asked questions

### Can I run 480 V equipment on 600 V without a transformer?

No. A 25% overvoltage overheats motors, stresses insulation and trips drives. Use a 600 V to 480 V transformer, or order the equipment with a 575 V rating for Canada.

### Is a 600 V to 480 V autotransformer allowed in Canada?

Autotransformers are allowed in many applications, but the Canadian Electrical Code sets conditions, especially around system grounding. Confirm with the engineer of record and the local inspector before choosing one.

### What size transformer do I need for 480 V equipment?

Multiply the equipment's full-load amps at 480 V by 480 and by 1.732, divide by 1,000 to get kVA, then add margin and round up to the next standard size.

### Can the same transformer feed 400 V European equipment?

Not directly. European machinery is usually rated 400 V, 50 Hz. You need a transformer with a 400 V secondary, and you must also confirm the equipment runs correctly at 60 Hz.
