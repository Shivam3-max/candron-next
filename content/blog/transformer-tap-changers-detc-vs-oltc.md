---
title: Transformer Tap Changers: De-Energized (DETC) vs On-Load (OLTC) Explained
seoTitle: Transformer Tap Changers: DETC vs OLTC
description: How transformer taps adjust output voltage, the difference between de-energized and on-load tap changers, typical tap ranges, when to specify an OLTC, and how to change taps safely.
date: 2026-11-16
category: transformers
keywords: transformer tap changer, DETC vs OLTC, de-energized tap changer, on load tap changer, transformer taps explained, no load tap changer, transformer voltage regulation taps
related: Substation power transformers | /products/transformers/substation/power; Three-phase padmount transformers | /products/transformers/padmount/three-phase; 600 V to 480 V transformers | /blog/600v-to-480v-transformer; Parts of a transformer | /blog/parts-of-a-transformer
cta: Ask an engineer about tap ranges | /contact
---

**A tap changer adjusts a transformer's turns ratio so the output voltage stays where you need it when the supply voltage is high or low.** A de-energized tap changer (DETC) is set by hand with the transformer switched off, usually once at commissioning. An on-load tap changer (OLTC) changes taps automatically while the transformer carries load, to hold voltage steady as conditions change.

## Why taps exist

Utility voltage is rarely exactly nominal. At the end of a long feeder it may sag; close to a substation it may run high. Taps on the HV winding add or remove turns:

- **Raise the output** by selecting fewer HV turns (a minus tap, such as −2.5%) when supply voltage is low.
- **Lower the output** by selecting more HV turns (a plus tap, such as +2.5%) when supply voltage is high.

The labelling can feel backwards, so always check the nameplate tap table. It lists the HV voltage for each position.

## De-energized tap changer (DETC)

Also called a no-load tap changer or off-circuit tap changer.

- **Typical range:** ±5% in four 2.5% steps (two above and two below nominal), giving five positions.
- **Operation:** an external handle on the tank (liquid-filled) or bolted links on the coils (dry-type).
- **Use:** set once to match the site's normal supply voltage, then left alone.
- **Rule:** the transformer must be **de-energized and isolated** before the handle is moved. Operating a DETC under voltage can arc across the contacts and destroy the winding.

Almost every distribution, padmount and dry-type transformer has a DETC.

## On-load tap changer (OLTC)

Also called a load tap changer (LTC).

- **Typical range:** ±10% in 32 steps of 5/8% (16 raise, 16 lower) on North American utility designs; other ranges are available.
- **Operation:** a motor drive controlled by an **automatic voltage regulator** relay, which measures secondary voltage and raises or lowers taps.
- **How it avoids interrupting load:** a diverter switch with transition resistors or reactors bridges the two taps briefly while the selector moves, so current never breaks.
- **Use:** substation transformers feeding variable loads, utility distribution, renewables and industrial plants with large voltage swings.

Modern OLTCs often use **vacuum interrupters**, which keep arcing out of the oil and greatly extend maintenance intervals.

## DETC vs OLTC at a glance

| | DETC | OLTC |
|---|---|---|
| Changes taps under load | No | Yes |
| Typical range | ±5% (5 positions) | ±10% (33 positions) |
| Control | Manual, offline | Automatic, motor-driven |
| Cost | Low | Significant (adds cost, size, maintenance) |
| Maintenance | Exercise during outages | Periodic inspection, contact wear, oil or vacuum checks |
| Typical use | Distribution, padmount, dry-type | Substation and power transformers |

## When to specify an OLTC

Consider an OLTC when:

- supply voltage varies by more than a few percent over the day,
- the load is sensitive to voltage, such as large motors or process equipment,
- the transformer connects renewables or storage that push voltage up and down,
- the utility interconnection agreement requires voltage regulation.

For most commercial and light industrial sites, a DETC set correctly at commissioning is enough.

## Changing a DETC tap safely

1. De-energize, isolate and lock out both HV and LV sides.
2. Verify absence of voltage and ground per your safety procedure.
3. Unlock the tap handle, move it to the required position and confirm it seats fully.
4. On dry-type units, move the links on **every phase** to the same position.
5. Measure turns ratio on the new tap if the procedure requires it.
6. Re-lock, re-energize and check secondary voltage.

## Frequently asked questions

### What is a tap changer on a transformer?

A switch that changes the number of active turns on one winding, usually the HV winding, to adjust the output voltage.

### Can I change taps while the transformer is energized?

Only on an on-load tap changer. A de-energized tap changer must never be operated with voltage applied.

### What tap should a new transformer be set on?

Usually the nominal tap, then adjusted at commissioning to suit the measured supply voltage.

### Why does a transformer have five tap positions?

The common standard is ±5% in 2.5% steps: two above nominal, nominal, and two below, which covers normal supply variation.
