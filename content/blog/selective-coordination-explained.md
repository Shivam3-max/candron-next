---
title: Selective Coordination Explained: How to Make Only the Nearest Breaker Trip
seoTitle: Selective Coordination Explained
description: What selective coordination is, how curves, fuse ratios, short-time delay and zone-selective interlocking achieve it, and how it trades off with arc flash.
date: 2026-11-22
category: codes-standards
keywords: selective coordination, protective device coordination study, time current curve, breaker coordination, fuse selectivity ratio, zone selective interlocking, coordination study Canada
related: Fault-current calculator | /resources/fault-current-calculator; Switchboards | /products/switchboards; Low-voltage switchgear | /products/lv-switchgear; Arc flash and CSA Z462 | /blog/arc-flash-csa-z462
cta: Calculate available fault current | /resources/fault-current-calculator
---

**Selective coordination means that when a fault or overload occurs, only the protective device closest to the problem opens, and every device upstream stays closed. A short circuit on a branch circuit should trip that branch breaker, not the panel main, the switchboard feeder or the service main.** It is achieved by choosing breakers, fuses and relay settings whose time-current curves do not overlap across the full range of fault current, and it is proven with a protective device coordination study.

Without it, a single fault in one room can black out a whole floor or building. For hospitals, emergency systems, data centres and process plants, that is not acceptable.

## How it works: time-current curves

Every breaker, fuse and relay has a **time-current curve (TCC)**: a band on a log-log graph showing how long the device takes to trip at each level of current. For two devices in series to be selective, the downstream device's curve must sit entirely **below and to the left** of the upstream device's curve, all the way up to the maximum available fault current at the downstream device.

| Region of the curve | What happens | Typical coordination challenge |
|---|---|---|
| Overload (1–10× rating) | Thermal or long-time element, seconds to minutes | Usually easy: different ratings separate naturally |
| Short circuit, moderate | Short-time element, tenths of a second | Needs time delay on upstream devices |
| Short circuit, high | Instantaneous element, under one cycle | **The hard part:** instantaneous elements of upstream and downstream breakers often overlap |

The high-current, instantaneous region is where most coordination failures happen. If a large fault is close to a panel, both the branch breaker and the panel main may see enough current to trip instantaneously, and both open.

## The tools engineers use to achieve it

### 1. Fuse ratios
Current-limiting fuses of the same family coordinate if the upstream fuse's rating is at least a published multiple of the downstream fuse, often **2:1** for many time-delay fuse classes. Fuse manufacturers publish these selectivity ratio tables. Fuses are one of the simplest ways to achieve full selectivity.

### 2. Short-time delay instead of instantaneous
Upstream breakers (switchboard mains and feeders, LV power circuit breakers) can be set with a **short-time pickup and delay**, and the instantaneous element turned off. This lets the downstream device clear first. The upstream equipment must then be able to withstand the fault for the delay, so check its **short-time withstand rating**.

### 3. Manufacturer selectivity tables
Molded-case breaker manufacturers test combinations and publish tables that state up to which fault current a given upstream/downstream pair is selective. These tables can show selectivity beyond what the published curves alone suggest.

### 4. Zone-selective interlocking (ZSI)
Breakers communicate over a wire: a downstream breaker that sees the fault sends a restraint signal upstream, so the upstream breaker waits. If the fault is between the two (no restraint), the upstream breaker trips with no delay. ZSI gives selectivity and fast clearing at the same time.

### 5. Relays at medium voltage
In MV switchgear, overcurrent relays (50/51) are coordinated by setting pickups and time dials with a **coordination time interval** between curves, commonly around 0.2–0.3 s depending on the breaker and relay type. Differential relays (87) protect a zone instantly without needing to coordinate with others.

## Worked example: a 600 V switchboard feeding a panel

- Service main: 2,000 A, LV power circuit breaker.
- Feeder: 400 A, to a 600 V panelboard.
- Branch: 30 A breaker in the panel.
- Available fault at the panel: 18 kA.

If all three breakers have instantaneous trips, an 18 kA fault on a branch circuit may trip the 30 A, the 400 A and possibly more at the same time. The fix:

1. Set the 2,000 A main with short-time delay and no instantaneous (check its withstand rating).
2. Choose the 400 A and 30 A combination from the manufacturer's selectivity table so it is selective to at least 18 kA, or use fuses in the ratio the fuse maker requires.
3. Plot all three on one TCC to confirm no overlap up to 18 kA.

Fault levels come from the transformer size, %Z and cable lengths; you can estimate them with our [fault-current calculator](/resources/fault-current-calculator).

## Where selective coordination is required

In the US, the NEC makes selective coordination mandatory for emergency systems, legally required standby systems, elevator circuits and critical branches in health care. In Canada, the requirement usually enters a project through **CSA Z32** (essential electrical systems in health care facilities), the consultant's specification, the owner's standards (common for data centres and utilities) and the authority having jurisdiction. Check the edition of the CEC and CSA standards your province enforces, and the project specification, before deciding the level of selectivity required.

## The trade-off with arc flash

Delaying upstream breakers improves selectivity but **raises arc-flash incident energy**, because an arc at the upstream bus lasts longer. Good designs manage both with:

- Zone-selective interlocking
- **Arc-energy reduction maintenance switches** that temporarily switch to fast settings during work
- Arc-flash relays
- Differential protection in MV gear

The coordination study and the arc-flash study should be done together, as explained in our [arc flash guide](/blog/arc-flash-csa-z462). When CANDRON supplies a switchboard or switchgear lineup, the trip units and relay settings are set to the values in the project's coordination study before the factory test.

## Frequently asked questions

### What is a protective device coordination study?
An engineering study that calculates fault currents, plots the time-current curves of every protective device and selects ratings and settings so that only the device nearest a fault operates. It is usually done alongside the short-circuit and arc-flash studies.

### Is full selective coordination always possible?
Not always with every device type and fault level, but it usually is with the right combination of fuses, breakers with short-time settings, selectivity tables and ZSI. It is much easier when it is designed in from the start than when added after equipment is ordered.

### What is the difference between selective coordination and series rating?
Series rating lets a downstream breaker with a lower interrupting rating be protected by an upstream device, which then opens on high faults too. That is the opposite of selectivity: both devices open. Series-rated systems are generally not selectively coordinated.

### Does selective coordination increase arc-flash energy?
It can, because upstream devices are delayed. Zone-selective interlocking, maintenance switches and arc-flash relays are used to keep both the selectivity and the incident energy acceptable.
