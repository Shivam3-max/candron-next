---
title: How to Read a Transformer Nameplate: Every Field Explained
seoTitle: How to Read a Transformer Nameplate
description: A field-by-field guide to transformer nameplates — kVA, voltages, connections, taps, impedance, BIL, temperature rise, cooling class, insulation, weights and fluid — and what to photograph when you need a replacement.
date: 2026-10-29
category: transformers
keywords: transformer nameplate, how to read transformer nameplate, transformer nameplate data, transformer impedance nameplate, transformer BIL, transformer tap settings, replacement transformer
related: Fault current calculator | /resources/fault-current-calculator; Inductance & reactance calculator | /resources/inductance-calculator; Transformers in stock | /inventory; Custom replacement transformers | /products/transformers
cta: Send us a nameplate photo | /contact?product=nameplate
---

A transformer's nameplate is its specification sheet, riveted to the tank or enclosure. When you need to replace a unit, add load, check fault current or set up protection, almost everything you need is on it. Here is what each field means.

## Rating: kVA and phases

- **kVA** is the apparent power the transformer can deliver continuously at its rated conditions. Some liquid-filled units show two or three ratings, such as `1500/2000 kVA` — the higher one applies with cooling fans running.
- **Phase** is single-phase or three-phase.
- **Frequency** is 60 Hz in Canada.

## Voltages and connections

- **High voltage (HV)** and **low voltage (LV)** ratings, for example `13,800 V delta` and `600Y/347 V`.
- **Delta** (Δ) means the windings are connected in a triangle with no neutral. **Wye** (Y) means a star connection with a neutral point, written as line-to-line/line-to-neutral, such as `208Y/120 V`.
- The **vector group** or connection diagram shows the phase shift between the windings — important if you ever parallel transformers.

## Taps

Taps let you adjust the output voltage slightly to suit the actual supply voltage. A typical nameplate shows a tap table such as:

| Tap | HV voltage |
|---|---|
| 1 | 14,490 V (+5%) |
| 2 | 14,145 V (+2.5%) |
| 3 | 13,800 V (nominal) |
| 4 | 13,455 V (−2.5%) |
| 5 | 13,110 V (−5%) |

Most distribution transformers have **de-energized** tap changers: switch them only with the transformer de-energized and isolated.

## Impedance (%Z)

Impedance is the percentage of rated voltage needed to drive full-load current through a short-circuited secondary. It matters for two reasons:

- **Fault current:** lower impedance means higher fault current downstream. Calculate it with the [fault current calculator](/resources/fault-current-calculator).
- **Voltage regulation:** higher impedance means a larger voltage drop under load.

When you replace a transformer, matching the impedance keeps the existing breakers and arc-flash study valid.

## BIL (basic impulse level)

BIL is the lightning-impulse voltage the insulation is designed to withstand, for example `95 kV BIL` on a 13.8 kV winding. A replacement must have at least the same BIL.

## Temperature rise and insulation class

- **Dry-type:** temperature rise of 80, 115 or 150 °C, with an insulation system class such as 220 °C. Lower rise means cooler running and more overload headroom.
- **Liquid-filled:** typically 55 °C or 65 °C average winding rise.

## Cooling class

- **Dry-type:** `AN` (natural air) or `AN/AF` (with fans).
- **Liquid-filled:** `ONAN` (oil natural, air natural), `ONAN/ONAF` (with fans). Older plates may show `OA` or `OA/FA`.

## Weights, fluid and other data

- **Weights:** core and coil, tank and fittings, fluid and total. Needed for lifting and shipping.
- **Fluid:** type and volume (mineral oil or natural ester such as FR3). Older plates may state "non-PCB" — important for disposal.
- **Serial number and year:** essential for warranty, records and finding test reports.
- **Standards:** for example CSA C2.1, CSA C9 or IEEE C57.12.

## What to photograph for a replacement

If you need a replacement or a quote, send:

1. A clear, straight photo of the whole nameplate
2. Photos of the HV and LV terminals or compartments
3. A photo of the whole unit showing size and mounting
4. Pad or floor dimensions and cable entry positions
5. Any recent oil test or test report

With those, a supplier can match the rating, voltages, impedance and footprint — and often find a unit in stock. CANDRON can quote from a nameplate photo the same day.

## Frequently asked questions

### What does 208Y/120 V mean on a nameplate?

It is a three-phase wye-connected winding with 208 V between phases and 120 V from each phase to neutral.

### Why does impedance matter when replacing a transformer?

A different impedance changes the fault current downstream. A lower impedance could exceed the ratings of existing breakers or change the arc-flash study, so matching it keeps the system as designed.

### Can I change the tap on a transformer myself?

Taps on most distribution transformers must only be changed with the transformer de-energized, isolated and locked out, by qualified personnel, following the manufacturer's instructions.

### What does ONAN/ONAF mean?

Oil natural, air natural (no fans) and oil natural, air forced (with cooling fans running). The ONAF rating is the higher kVA available with the fans on.
