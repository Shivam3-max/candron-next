---
title: Solidly Grounded vs High-Resistance Grounded Systems: Which One Should You Use?
seoTitle: Solidly Grounded vs High-Resistance Grounding
description: Solid, high-resistance, low-resistance and ungrounded systems compared: fault current, continuity of service, 347 V loads and where each fits in Canada.
date: 2026-11-22
category: codes-standards
keywords: high resistance grounding, solidly grounded vs high resistance grounded, HRG system, neutral grounding resistor, low resistance grounding, ungrounded delta system, system grounding methods
related: Grounding transformers | /products/transformers/dry-type-mv/grounding-transformer; Delta vs wye transformer connections | /blog/delta-vs-wye-transformer; Low-voltage switchgear | /products/lv-switchgear; Arc flash and CSA Z462 | /blog/arc-flash-csa-z462
cta: See grounding transformers | /products/transformers/dry-type-mv/grounding-transformer
---

**A solidly grounded system connects the transformer neutral straight to ground, so a ground fault draws a large current and trips the breaker immediately. A high-resistance grounded (HRG) system connects the neutral through a resistor that limits a ground fault to a few amperes (typically 5 A or less, sometimes 10 A), so the system raises an alarm and keeps running until the fault is found.** Choose solid grounding when you need line-to-neutral loads such as 347 V lighting. Choose HRG when keeping a process running through a first ground fault matters more, as in plants, mines and critical facilities.

How the neutral is grounded affects fault current, arc-flash risk, overvoltages, what loads you can serve and how the protection works, so it is one of the first decisions on any single-line diagram.

## The four grounding methods

| Method | Ground-fault current | First ground fault | Line-to-neutral loads | Typical use |
|---|---|---|---|---|
| **Solidly grounded** | Very high (can approach three-phase fault level) | Trips immediately | Yes (600Y/347 V, 208Y/120 V) | Commercial and institutional buildings, most LV services |
| **High-resistance grounded (HRG)** | Limited to about 1–10 A | Alarms; system keeps running | No | Industrial plants, mines, process facilities, some data centres |
| **Low-resistance grounded (LRG)** | Limited to roughly 100–1,000 A (often 200–400 A) | Trips selectively | No (at MV) | Medium-voltage industrial distribution (for example 4.16 kV, 13.8 kV) |
| **Ungrounded** | Very low (capacitive charging current only) | Keeps running | No | Older plants; now rarely chosen for new work |

## Solid grounding: simple and suited to mixed loads

In a solidly grounded **600Y/347 V** system, the wye-connected transformer neutral is bonded to ground at the service. A ground fault is essentially a short circuit to ground, so phase or ground-fault protection clears it quickly.

**Advantages:** simple, low cost, supports 347 V lighting and 120 V loads (through 600–120/208 V transformers or direct 208Y/120 V services), stable phase-to-ground voltages, and widely understood by electricians and inspectors.

**Disadvantages:** every ground fault causes an outage on that circuit, and an arcing ground fault can release high energy. Large services often need **ground-fault protection (GFP)** on the main, which the CEC requires on certain solidly grounded services; check the rule and threshold in the edition your province enforces.

## High-resistance grounding: keep running through the first fault

In an HRG system, a **neutral grounding resistor (NGR)** connects the transformer neutral to ground. When one phase faults to ground, the fault current is limited to the resistor's let-through, often around 5 A at 600 V. That is too small to damage equipment, so nothing trips. Instead:

1. A relay or monitor detects the neutral current or voltage and **raises an alarm**.
2. Maintenance uses a **pulsing circuit**, which switches the resistor current on and off, and a clamp-on ammeter to follow the pulsing current to the faulted feeder.
3. The fault is repaired at a planned time.

The danger is a **second ground fault on a different phase**: that is a phase-to-phase fault through ground, which trips breakers. So the first fault must be found and fixed promptly. Many HRG systems are set to trip automatically if a second fault occurs.

**Sizing rule:** the resistor current must be **larger than the system's capacitive charging current** (the small current that flows to ground through cable and motor capacitance). If it is smaller, the system can suffer transient overvoltages during arcing ground faults, which defeats one of HRG's main benefits.

**No line-to-neutral loads:** because the neutral sits above ground through the resistor, you cannot serve 347 V loads from an HRG system. Lighting and receptacles are served through separate transformers.

## Low-resistance grounding at medium voltage

On MV industrial systems (for example 4.16 kV or 13.8 kV), a lower-value resistor limits ground faults to a few hundred amperes. That is enough for ground-fault relays to detect and **trip selectively**, while limiting damage to motor and generator windings compared with solid grounding. It is common for MV motor distribution in plants.

## Ungrounded systems: why they fell out of favour

Older Canadian plants often have ungrounded 600 V delta systems. They do keep running through a first ground fault, but **intermittent arcing ground faults can drive phase-to-ground voltages to several times normal**, stressing insulation and causing failures elsewhere. Faults are also hard to locate. HRG gives the same continuity of service without the overvoltage problem, which is why many owners convert ungrounded systems to HRG.

## Grounding a delta system: the grounding transformer

A delta-connected system has no neutral to ground. To add HRG (or LRG) to one, a **grounding transformer**, usually a zig-zag or a wye–broken-delta arrangement, creates an artificial neutral, and the resistor connects to that. This is a common retrofit when converting an ungrounded delta system. CANDRON supplies Canadian-made dry-type grounding transformers sized for the resistor current and duty you specify.

## Worked example: choosing for a 600 V plant

A food plant has a 2,000 kVA, 13.8 kV to 600 V transformer feeding mixers, conveyors and refrigeration compressors. A sudden stop spoils product.

- **Solid grounding:** a single ground fault on a conveyor motor trips that feeder (or, with poor coordination, more). Simple, and allows 347 V lighting directly.
- **HRG with a 5 A resistor:** the same fault raises an alarm; production continues; maintenance finds the fault with the pulsing locator at the next shift change. Lighting is fed from a separate 600–120/208 V transformer.

For this plant HRG is usually the better choice, provided the system charging current is checked (it must be below the 5 A resistor current) and staff are trained to respond to alarms.

## Canadian context

System grounding and bonding are covered by **Section 10 of the Canadian Electrical Code (CSA C22.1)**, including rules for impedance-grounded systems. **Mines** in Canada typically use resistance grounding under **CSA M421**. Utilities and the LDC set rules for the service side. Always confirm the current edition's requirements with the engineer of record and the inspection authority.

## Frequently asked questions

### Can I connect 347 V lighting to a high-resistance grounded system?
No. Line-to-neutral loads require a solidly grounded neutral. Serve lighting and receptacles from a separate solidly grounded transformer.

### What size resistor is used for HRG?
At 600 V, resistors typically limit ground-fault current to around 1–5 A, sometimes up to 10 A. The value must exceed the system's capacitive charging current; the engineer confirms it from cable and motor data or a site measurement.

### What happens if a second ground fault occurs on an HRG system?
A second fault on a different phase creates a phase-to-phase fault through ground and trips overcurrent protection. That is why the first fault must be located and repaired promptly, and why many systems add a second-fault trip.

### Is high-resistance grounding used at medium voltage?
HRG is used on some MV systems with low charging current, such as generator neutrals. Most MV distribution uses low-resistance grounding, which limits fault current to hundreds of amperes and trips selectively.

### Do HRG systems reduce arc-flash hazard?
For line-to-ground faults, yes, because the fault current is very small. They do not reduce the hazard of three-phase arcing faults, which still need to be addressed in the arc-flash study.
