---
title: Inverter-Duty Transformers for Solar and Battery Storage: What Makes Them Different
seoTitle: Inverter-Duty Transformers for Solar & BESS
description: Why solar and battery energy storage projects use inverter-duty step-up transformers, how they differ from standard padmounts — harmonics, bidirectional flow, thermal cycling, shields, split windings and grounding — and what to put in the specification.
date: 2026-11-05
category: transformers
keywords: inverter duty transformer, solar step up transformer, BESS transformer, battery storage transformer, inverter step up transformer, solar padmount transformer, IEEE C57.159, split winding transformer
related: Inverter-duty padmount transformers | /products/transformers/padmount/inverter-duty; Pad-mounted switchgear | /products/switchgear/pad-mounted; Harmonic & K-factor calculator | /resources/harmonic-calculator; Projects Radar | /resources/projects-radar
cta: See inverter-duty padmounts | /products/transformers/padmount/inverter-duty
---

**An inverter-duty transformer is a step-up transformer designed for the particular stresses of solar inverters and battery storage systems: high-frequency harmonics, power flowing in both directions, daily thermal cycling and the voltage spikes of power electronics.** On a typical project it takes the inverter's low-voltage AC output (often 600–800 V) and steps it up to the medium-voltage collector system (commonly 25 or 34.5 kV) that carries power to the project substation. A standard distribution padmount can fail early in this duty. An inverter-duty unit is designed and tested for it.

## How it fits into a project

A typical solar or battery storage project looks like this:

1. **Inverters** (central or string) convert DC from panels or batteries to low-voltage AC.
2. **Inverter-duty transformers**, usually padmounts or skid-mounted units next to the inverters, step that up to medium voltage.
3. **Pad-mounted switchgear** and an underground **collector system** gather the output of many transformers.
4. A **project substation** with a main power transformer steps up to transmission voltage at the point of interconnection.

Large projects can have dozens of inverter-duty transformers. A design problem therefore repeats across the whole site.

## What makes the duty different

| Stress | Why it happens | How the design handles it |
|---|---|---|
| Harmonics and high-frequency content | Inverter switching produces harmonics and fast voltage edges | Extra margin in winding and core design; additional losses accounted for |
| Electrostatic coupling | Fast voltage changes couple between windings | **Electrostatic shield** between the windings, grounded |
| Bidirectional power flow | Battery storage charges and discharges; solar exports and imports at night | Designed and tested for power flow in both directions |
| Thermal cycling | Solar output rises and falls every day, and BESS may cycle more than once a day | Robust clamping and insulation for repeated heating and cooling |
| Voltage rise at the point of connection | Exporting power raises voltage at the inverter | Taps and impedance chosen with the inverter's voltage range |
| Possible DC component | Small DC offsets from inverters | Core design that tolerates a small DC bias |

Industry guidance for transformers serving photovoltaic systems is set out in IEEE C57.159, and many owners reference it in specifications.

## Split (dual) secondary windings

Many inverter-duty transformers have **two low-voltage windings** feeding two inverters, or two halves of a large inverter. This:

- Lets one transformer serve two inverters, saving pads, cable and cost
- Isolates the two inverters from each other
- Can give a phase shift between the two windings to reduce harmonics seen on the grid

Split windings need the **impedance between the windings** specified as well as the usual high-to-low impedance, so ask the inverter maker what it needs.

## Grounding: get it agreed early

Grounding is where inverter projects most often get stuck:

- The **inverter maker** may require an ungrounded wye or delta low-voltage winding, because many inverters have their own ground-fault detection.
- The **utility** often requires the medium-voltage collector system to be **effectively grounded**, which affects the high-voltage winding connection and may call for **grounding transformers**.

The winding connection (vector group) is therefore a three-way decision between the inverter maker, the utility and the design engineer. Settle it before the transformer is ordered. Our guide to [delta and wye connections](/blog/delta-vs-wye-transformer) explains the options.

## Specification checklist

- kVA rating, including any **overload profile**, and whether the rating applies at a high ambient temperature
- Low-voltage rating(s) matched to the inverter's AC output, and **number of LV windings**
- Medium-voltage rating and **taps**
- **Impedance**, including between split windings
- **Vector group and grounding**, agreed with the inverter maker and utility
- **Electrostatic shield**
- **Bidirectional** operation and the expected cycling profile
- Insulating fluid: many projects choose **natural ester (FR3-type) fluid** for fire safety and environmental reasons
- Cold-climate rating for Canadian sites
- Loss evaluation, because these units run for decades

## Lead times and the market

Utility-scale solar, wind and battery projects compete for the same transformer factories as data centres and utilities, so padmount and substation transformers are among the longest-lead items on a renewable project. Order the inverter-duty transformers from the approved single-line, not after detailed design. Our monthly [Projects Radar](/resources/projects-radar) follows newly announced Canadian storage and renewable projects. It is a useful way to see how busy the market is.

## Frequently asked questions

### What is the difference between an inverter-duty transformer and a standard padmount?

An inverter-duty transformer is designed for harmonics, bidirectional power flow, daily thermal cycling and fast voltage changes from inverters, usually with an electrostatic shield. A standard padmount is designed for ordinary, mostly sinusoidal load.

### Do solar transformers need K-factor ratings?

Usually not. Inverter harmonics are generally low in magnitude and are handled through inverter-duty design rather than K-factor ratings, which are aimed at building loads such as IT equipment.

### Why do battery storage transformers need bidirectional design?

Batteries both charge from the grid and discharge into it, so power flows through the transformer in both directions, often several times a day.

### What voltage is a solar collector system in Canada?

Commonly 25 kV or 34.5 kV, with the inverter side typically between 600 and 800 V.

### What is a split-winding inverter transformer?

A transformer with two low-voltage windings, each feeding a separate inverter or inverter section, so one transformer can serve two inverters.
