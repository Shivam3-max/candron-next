---
title: How to Read a Single-Line Diagram: Symbols, Ratings and ANSI Device Numbers
seoTitle: How to Read a Single-Line Diagram (SLD)
description: How to read an electrical single-line diagram: common symbols, the ratings to check, ANSI device numbers like 52, 50/51 and 87, and a worked walk-through.
date: 2026-11-22
category: switchgear
keywords: how to read a single line diagram, single line diagram symbols, one line diagram, SLD electrical, ANSI device numbers, 50/51 relay, electrical single line diagram
related: Switchgear | /products/switchgear; Switchboards | /products/switchboards; Fault-current calculator | /resources/fault-current-calculator; Switchboard vs switchgear vs panelboard | /blog/switchboard-vs-switchgear-vs-panelboard
cta: Send us your single-line for a quote | /contact
---

**A single-line diagram (SLD, or one-line) shows how power flows through an electrical system using one line to represent all three phases. Read it from the top (the utility or generator source) down through the main protection, transformers and buses to the feeders and loads, and note the rating written beside every device: voltage, current, kVA, impedance and interrupting rating.** The small numbers in circles are ANSI/IEEE device numbers that tell you what each relay or switch does.

The SLD is the most important drawing on any power project. It is what a supplier quotes from, what the utility approves, what the coordination and arc-flash studies are built on, and what an electrician uses to isolate equipment safely.

## How an SLD is laid out

Most SLDs follow the same logic:

1. **Source** at the top: the utility service (with the available fault level) or a generator.
2. **Service equipment**: metering, the main disconnect or main breaker.
3. **Transformation**: step-down transformers between voltage levels.
4. **Distribution buses**: switchgear or switchboards, drawn as a thick horizontal line.
5. **Feeders** dropping down from each bus to panels, motors, MCCs and other loads.

Power flows down the page. Each voltage level is usually grouped together, so a 13.8 kV section sits above the 600 V section.

## Common SLD symbols

| Symbol (as usually drawn) | Meaning | Ratings to read beside it |
|---|---|---|
| Square box, often labelled 52 | Circuit breaker | Frame/trip amps, interrupting rating (kA), draw-out or fixed |
| Two interlocking circles | Two-winding transformer | kVA/MVA, primary and secondary voltage, %Z, connection (delta–wye), grounding |
| Thick horizontal line | Bus | Continuous amps, short-circuit (withstand) rating in kA |
| Angled line with a pivot | Disconnect or load-break switch | Amps, voltage, fused or unfused |
| Small rectangle in a line | Fuse | Amp rating, type (current-limiting or expulsion) |
| Circle around a line | Current transformer (CT) | Ratio, for example 1200:5, accuracy class |
| Two small circles, or a transformer symbol to a meter | Potential transformer (PT/VT) | Ratio, for example 14,400:120 |
| Circle with M | Motor | HP or kW, voltage |
| Circle with G | Generator | kW/kVA, voltage, subtransient reactance |
| Circle with a number | Protective relay function | ANSI device number (see below) |
| Ground symbol or resistor to ground | System grounding | Solid, or resistor current (for example 5 A or 400 A) |

Symbols vary a little between drafting standards and firms, so always check the legend sheet first.

## ANSI device numbers you will see most

Relays and switches are identified by standard numbers from IEEE C37.2. A suffix shows what is being measured, for example **N** for neutral or ground, and **G** for ground.

| Number | Function |
|---|---|
| 25 | Synchronism check |
| 27 | Undervoltage |
| 32 | Directional power (reverse power) |
| 46 | Negative sequence (current unbalance) |
| 49 | Thermal overload |
| 50 | Instantaneous overcurrent |
| 51 | Time overcurrent |
| 50/51N, 51G | Ground fault overcurrent |
| 52 | AC circuit breaker |
| 59 | Overvoltage |
| 63 | Pressure (for example a transformer sudden-pressure relay) |
| 67 | Directional overcurrent |
| 81 | Frequency (over/under) |
| 86 | Lockout relay |
| 87 | Differential (87T transformer, 87B bus) |
| 89 | Line switch / disconnect |

A note such as **"50/51, 50N/51N → 52-M"** means an overcurrent and ground-fault relay trips the main breaker.

## Worked walk-through: a typical 13.8 kV to 600 V service

Imagine an SLD for a commercial building. Reading it top to bottom:

1. **Utility source, 13.8 kV, 250 MVA available fault.** This sets the fault current the first piece of equipment must interrupt.
2. **Utility metering:** CTs 300:5 and PTs 8,400:120 feeding a revenue meter.
3. **MV switch and fuse** (or a 52 breaker with 50/51 relay) protecting the transformer.
4. **Transformer: 2,000 kVA, 13.8 kV delta to 600Y/347 V, 5.75% Z, solidly grounded.** Secondary full-load current is 2,000 ÷ (√3 × 0.6) = **1,925 A**. The %Z sets the secondary fault current: about 1,925 ÷ 0.0575 ≈ **33.5 kA** with an infinite source (our [transformer impedance guide](/blog/transformer-impedance-explained) explains the calculation).
5. **Main switchboard, 2,500 A bus, 42 kA rated**, with a 2,500 A main breaker and ground-fault protection. The 42 kA rating is chosen because it exceeds the ~33.5 kA available.
6. **Feeders:** 800 A to a mechanical MCC, 400 A to a 600–120/208 V dry-type transformer and lighting panels, and spare breakers.

What a reviewer checks on this drawing: that every device's interrupting rating exceeds the available fault at its location, that the transformer and main breaker ampacities match, that the grounding method is shown, and that the relays and breakers can be coordinated. You can check step 4 yourself with the [fault-current calculator](/resources/fault-current-calculator).

## What an SLD does not show

- Physical layout or dimensions (that is the general arrangement drawing).
- Control wiring (that is the three-line and schematic/elementary diagrams).
- Cable routing (that is the cable schedule and plans).

For a quote, a sketch-level SLD with voltages, ratings and the available fault current is usually enough to start. CANDRON's engineers can turn a hand-sketched single-line into a priced lineup and drawings for approval.

## Frequently asked questions

### What is the difference between a single-line and a three-line diagram?
A single-line shows all three phases as one line and is used for system overview, studies and quoting. A three-line shows each phase, neutral and ground conductor separately and is used for detailed wiring, metering and CT/PT connections.

### What does 52 mean on a single-line diagram?
Device 52 is an AC circuit breaker. A label such as 52-M or 52-F1 identifies the main breaker or a specific feeder breaker.

### What does 50/51 mean?
50 is instantaneous overcurrent and 51 is time overcurrent. Together they are the basic phase overcurrent protection on most feeders and mains. 50N/51N is the same function for ground (neutral) current.

### Who prepares the single-line diagram?
The electrical engineer of record prepares the design SLD. Equipment suppliers then produce their own detailed single-lines and three-lines as part of the approval drawings, which must match the design.

### Why does the SLD need the available fault current?
Every breaker, fuse and bus must be able to interrupt or withstand the fault current at its location. Without the utility's available fault level, equipment ratings cannot be checked and the arc-flash study cannot be done.
