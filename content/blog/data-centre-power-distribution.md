---
title: Data Centre Power Distribution Explained: From the Utility to the Rack
seoTitle: Data Centre Power Distribution Explained
description: How power flows through a data centre — utility service, medium-voltage switchgear, transformers, low-voltage switchgear, generators, UPS, PDUs, remote power panels and rack PDUs — with redundancy levels (N+1, 2N), Canadian voltages and how the system is commissioned.
date: 2026-11-05
category: switchgear
keywords: data centre power distribution, data center electrical design, data center power chain, PDU vs RPP, 2N redundancy data center, data center UPS, data centre electrical Canada, data center commissioning levels
related: Power distribution units (PDUs) | /products/power-distribution-units; Remote power panels | /products/remote-power-panels; Data-centre load banks | /products/load-banks/dc/data-centre; Main-tie-main switchboards | /products/switchboards/main-tie-main
cta: Explore data-centre power equipment | /products/power-distribution-units
---

**A data centre's electrical system is a chain: utility supply → medium-voltage switchgear → transformers → low-voltage switchgear → UPS → power distribution units (PDUs) → remote power panels (RPPs) or busway → rack PDUs → servers, with standby generators ready to take over.** Every link is sized for the IT load plus cooling, and most links are duplicated so that one failure, or one piece of maintenance, does not drop the load. How much is duplicated is what "N+1" and "2N" describe.

## The power chain, link by link

| Link | What it does | Typical Canadian voltage |
|---|---|---|
| Utility service or substation | Brings power to site. Large campuses often have their own high-voltage substation | 13.8–27.6 kV distribution, or 115–240 kV transmission for large campuses |
| Medium-voltage switchgear | Receives utility feeds, switches and protects transformers, transfers between sources | 13.8, 25 or 27.6 kV |
| Unit substation transformers | Step medium voltage down to building voltage | MV to 600Y/347 V (or 480Y/277 V for US-designed equipment) |
| Low-voltage switchgear / switchboards | Distribute power to UPS, cooling and building loads; connect generators | 600 V |
| Standby generators and paralleling gear | Take over when the utility fails | 600 V, or medium voltage on large sites |
| UPS (static, double-conversion) | Rides through the seconds before generators pick up, and conditions power | 600 V in and out |
| Power distribution units (PDUs) | Step down and distribute to the white space | 600 V to 208Y/120 V or 415Y/240 V |
| Remote power panels (RPPs) or overhead busway | Extend branch circuits along rows of racks | 208Y/120 V or 415Y/240 V |
| Rack PDUs | Feed each server's power supplies | 208 V or 240 V single-phase, or three-phase |

Because Canadian buildings distribute at 600 V, the **PDU transformer** step from 600 V to the rack voltage is a defining feature of Canadian data halls. US designs often skip a step by running 480 V to 415Y/240 V. Higher rack voltages such as 415Y/240 V reduce current and losses for dense AI and high-performance computing loads.

## Redundancy: N, N+1, 2N

| Level | Meaning | Example |
|---|---|---|
| N | Exactly enough capacity, no spare | One UPS sized for the full load |
| N+1 | One spare unit beyond what is needed | Four UPS modules where three carry the load |
| 2N | Two complete, independent systems (A and B) | Each server fed from an A path and a B path, each able to carry the full load |
| Distributed redundant (for example 3-to-make-2) | Several systems share the load, and any one can fail | Three blocks each loaded to two-thirds, so the other two absorb a failed block |

**2N** is common in enterprise and colocation facilities: each rack gets an A feed and a B feed from separate UPS, PDUs and, often, separate medium-voltage lineups. **Main-tie-main** switchgear lets two sources back each other up at the medium- and low-voltage levels.

## Generators and transfer

When the utility fails, the UPS batteries (or flywheels) carry the IT load for seconds to minutes while generators start, synchronize and pick up load through **paralleling switchgear** or **automatic transfer switches**. Generators must be tested regularly under load. In Canada, CSA C282 sets the testing regime for emergency generators in many buildings, and data centres typically test well beyond it. Load banks make that possible without risking the live IT load. See our guide to [generator load bank testing](/blog/generator-load-bank-testing).

## Cooling is part of the electrical load

Cooling (chillers, CRAH and CRAC units, pumps, and increasingly liquid cooling) can be a large share of the facility load. It is fed from the same switchgear and generators, and on critical sites from UPS too. That is why facility capacity is quoted in megawatts of IT load, with the electrical system sized for IT load plus cooling and losses.

## How a data centre is commissioned

Data centres are commissioned in levels, usually five:

1. **Level 1 — factory acceptance:** major equipment such as switchgear, UPS and generators is tested at the factory. Our [FAT and commissioning pack](/resources/fat-commissioning-pack) has checklists for this stage.
2. **Level 2 — delivery and installation checks:** equipment arrives undamaged and is installed correctly.
3. **Level 3 — start-up:** each system is energized and started individually.
4. **Level 4 — functional testing:** each system runs through every mode on its own.
5. **Level 5 — integrated systems testing (IST):** the whole facility is tested together, including utility failures, generator transfers and maintenance scenarios, with **load banks** standing in for the IT load and producing real heat.

IST depends on load banks that can be spread across the data hall, often hundreds of small units, so the cooling sees a realistic heat pattern. [Data-centre load banks](/products/load-banks/dc/data-centre) are designed for this.

## Frequently asked questions

### What is the difference between a PDU and an RPP?

A PDU usually contains a transformer that steps 600 V down to rack voltage and distributes it. An RPP is a panel without a transformer that extends branch circuits closer to the racks.

### What does 2N mean in a data centre?

Two fully independent power paths (A and B), each able to carry the entire load, so either can fail or be maintained without interrupting the IT equipment.

### What voltage do Canadian data centres use?

Building distribution is typically 600 V, stepped down by PDUs to 208Y/120 V or 415Y/240 V for racks. Utility service is commonly 13.8 to 27.6 kV, or higher for large campuses.

### Why do data centres use load banks during commissioning?

Load banks replace the IT load before servers are installed. They let the team test UPS, generators, transfers and cooling at full load during integrated systems testing.

### Which data centre equipment has the longest lead time?

Medium-voltage switchgear, large transformers and generators are usually the longest-lead items, so they are ordered first, often before detailed design is finished.
