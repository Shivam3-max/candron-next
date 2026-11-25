---
title: Current Transformers vs Potential Transformers: How CTs and PTs Work in Metering and Protection
seoTitle: CT vs PT: Current vs Potential Transformers
description: What current transformers (CTs) and potential transformers (PTs) do, and how ratio, burden and accuracy class work for metering and protective relaying.
date: 2026-11-22
category: switchgear
keywords: current transformer vs potential transformer, CT and PT, instrument transformers, current transformer ratio, CT accuracy class, voltage transformer, CT burden, C400 CT
related: Metering cabinets | /products/switchgear/metering-cabinet; Utility-approved switchboards | /products/switchboards/utility-approved; Metal-clad switchgear | /products/switchgear/metal-clad; Transformer testing explained | /blog/transformer-testing-types
cta: See metering cabinets | /products/switchgear/metering-cabinet
---

**A current transformer (CT) steps a large primary current down to a small, proportional secondary current (usually 5 A) so meters and relays can measure it safely. A potential transformer (PT), also called a voltage transformer (VT), steps a high system voltage down to a standard secondary voltage (usually 120 V).** Together they are called *instrument transformers*. They isolate meters and relays from the power circuit and give them standard signals, whatever the system voltage or current.

Every revenue meter on a medium-voltage service, and every protective relay in a switchgear lineup, depends on them. If they are wrongly sized, a meter bills incorrectly or a relay misreads a fault.

## CT vs PT at a glance

| | Current transformer (CT) | Potential / voltage transformer (PT/VT) |
|---|---|---|
| Measures | Current | Voltage |
| Connected | In **series** with the load (the conductor passes through it) | In **parallel** across the phases (or phase to ground) |
| Typical secondary | 5 A (1 A where CT leads are very long) | 120 V (or 69.3 V / 115 V on some systems) |
| Example ratio | 1200:5 | 14,400:120 (120:1) |
| Dangerous condition | **Open secondary** while the primary carries current | **Short-circuited secondary** |
| Protection on secondary | Shorting terminal block, never a fuse | Fuses on the secondary (and often the primary) |
| Burden | Must stay *below* the rated burden (ohms) | Rated in VA; stay within the rated burden |

## How a current transformer works

A CT is a transformer whose primary is the power conductor itself (one turn, for a window or bushing CT) and whose secondary has many turns. The secondary current is the primary current divided by the turns ratio. A 1200:5 CT has a 240:1 ratio, so 960 A in the bus produces 4 A at the meter.

### Why you must never open a CT secondary

The CT is a current source. It will push its secondary current through whatever is connected. If the secondary is opened while primary current flows, there is no path, and the core drives the secondary voltage up to thousands of volts. That is a shock hazard and can destroy the CT's insulation. This is why CT circuits use **shorting terminal blocks**: short the secondary before you remove a meter or relay.

### CT accuracy classes (IEEE C57.13)

CTs are made either for metering or for relaying, and the classes mean different things.

- **Metering class**, for example **0.3B0.5** or **0.15B1.8**: the first number is the accuracy (±0.3%), the "B" number is the maximum burden in ohms at which that accuracy holds. Revenue metering commonly uses 0.3 or 0.15 class.
- **Relaying class**, for example **C400**: "C" means the accuracy can be calculated from the winding (a "T" class is determined by test). The number is the secondary terminal voltage the CT can deliver at **20 times rated current** (100 A on a 5 A CT) without exceeding 10% ratio error. A C400 CT can drive 100 A into a 4 Ω burden (400 V ÷ 100 A).

Metering CTs are designed to be accurate at normal load and to saturate during faults (which protects the meter). Relay CTs are designed to stay accurate through a fault, when the relay needs it most.

### Rating factor

A CT's **rating factor (RF)**, for example 1.5, 2.0 or 4.0, is how far above its nameplate primary current it can run continuously without overheating while keeping accuracy. A 400:5 CT with RF 2.0 can carry 800 A continuously. This lets one CT ratio cover a wide load range.

## How a potential (voltage) transformer works

A PT is a small, very accurate step-down transformer connected across the system voltage. On a 25 kV system (14.4 kV line to ground), a 14,400:120 PT feeds 120 V to the meter and relays. PTs are usually fused on the primary, and the secondary is fused because a short-circuited PT secondary will draw a large current and burn out.

PT accuracy is also given as a class with a burden letter, for example **0.3W, 0.3X, 0.3Y, 0.3Z** (standard burdens of increasing VA). On low-voltage services (600 V and below), meters are often connected directly to the voltage and only CTs are used.

## Worked example: CTs and PTs for a 13.8 kV service

A plant takes service at 13.8 kV with a 5 MVA transformer.

1. **Full-load current:** 5,000 kVA ÷ (√3 × 13.8 kV) = **209 A**.
2. **Metering CT ratio:** choose a primary close to, but above, normal load: **300:5** with RF 1.5 covers up to 450 A continuously.
3. **Relaying CT:** the relay needs accuracy at fault current. If the available fault is 12 kA, that is 40 times a 300 A rating, so a larger ratio (for example **600:5**) with a **C200 or C400** class is typically chosen, after checking the burden of the relay and the CT leads.
4. **PTs:** two or three **8,400:120** (or 14,400:120 for a 25 kV system) PTs, connected open-delta or wye depending on the meter form the utility requires.

These are illustrative choices. The utility sets the metering requirements, and the protection engineer confirms relay CTs with a CT saturation check.

## Revenue metering in Canada

Revenue metering is regulated federally. Meters and instrument transformers used for billing must be approved under **Measurement Canada** rules, and your local distribution company (LDC) specifies the meter socket form, CT/PT ratios and the metering cabinet or compartment layout. That is why utility-approved switchboards and metering sections are built to the LDC's drawings and sealed by the utility. Protection CTs inside switchgear are a separate design decision made by the project's engineer.

## Where CTs and PTs live in equipment

- **Metal-clad switchgear:** bushing-type or window CTs around the breaker spouts; draw-out PT trays with primary fuses.
- **Switchboards and LV switchgear:** window CTs around the bus for metering and ground-fault sensing.
- **Liquid-filled transformers:** bushing CTs inside the tank for winding-temperature indication and differential protection (see our guide to [transformer gauges and protective devices](/blog/transformer-gauges-and-protective-devices)).
- **Metering cabinets:** utility CTs and PTs in a sealed enclosure ahead of the main breaker.

When CANDRON supplies a metering cabinet or utility-approved switchboard, the CT and PT data comes from the LDC's requirements and is checked on the drawings before release.

## Frequently asked questions

### Is a PT the same as a VT?
Yes. "Potential transformer" (PT) is the older North American term; "voltage transformer" (VT) is the term used in current IEEE standards. Both describe the same device.

### What happens if a CT secondary is left open?
The secondary voltage rises to very high levels because the CT keeps trying to push current. It can injure workers and damage the CT. Always short the secondary with the shorting block before disconnecting a meter or relay.

### Can one CT serve both metering and protection?
It can, but it is usually a poor compromise. Metering needs accuracy at normal load; protection needs accuracy at fault current. Most switchgear uses separate CTs, or a multi-core CT with separate metering and relaying windings.

### What does C400 mean on a CT?
It is a relaying accuracy class. The CT can deliver 400 V at its secondary terminals at 20 times rated current without more than 10% ratio error. A higher number means the CT can drive a larger burden without saturating.

### How are CTs and PTs tested?
Ratio, polarity, excitation (saturation) curve and insulation resistance tests are standard at factory test and commissioning. Polarity marks (H1 on the primary, X1 on the secondary) must be respected, or directional and differential relays will misoperate.
