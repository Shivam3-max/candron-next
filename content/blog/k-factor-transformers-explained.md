---
title: What Is a K-Factor Transformer, and When Do You Need One?
seoTitle: K-Factor Transformers Explained
description: Harmonics from drives, UPS systems, LED lighting and IT loads overheat ordinary transformers. Here is what K-factor means, how to pick K-4, K-13 or K-20, and when a harmonic-mitigating transformer is the better choice.
date: 2026-10-29
category: transformers
keywords: k factor transformer, what is k factor transformer, k-13 transformer, k-4 vs k-13, harmonic mitigating transformer, transformer harmonics, non-linear loads transformer
related: K-factor transformers | /products/transformers/dry-type-lv/k-factor; Harmonic-mitigating transformers | /products/transformers/dry-type-lv/harmonic-mitigating; Harmonic & K-factor calculator | /resources/harmonic-calculator; Line reactor calculator | /resources/harmonic-reactor-calculator
cta: Calculate your K-factor | /resources/harmonic-calculator
---

A transformer rated 75 kVA can carry 75 kVA of a **clean, sinusoidal** load all day. Modern buildings rarely give it one. Variable-frequency drives, UPS systems, LED drivers, computers and chargers draw current in short pulses. Those pulses contain **harmonics** — currents at multiples of 60 Hz — and harmonics heat a transformer far more than their share of the kVA suggests.

A **K-factor transformer** is built to carry that extra heat safely.

## Why harmonics overheat a transformer

Two things happen when harmonic current flows:

1. **Eddy-current losses rise sharply.** Stray losses in the windings increase roughly with the square of the harmonic number. A 5th-harmonic current heats the windings far more than the same current at 60 Hz.
2. **Neutral currents pile up.** On a 120/208 V system, the 3rd, 9th and 15th harmonics ("triplens") from single-phase electronic loads add together in the neutral instead of cancelling. The neutral can carry more current than any phase.

An ordinary transformer running these loads at its nameplate rating can overheat even though the ammeter says it is within rating.

## What K-factor means

**K-factor** is a number that describes how much extra heating a load's harmonic content causes, compared with a pure 60 Hz load. It is calculated from the harmonic spectrum (the method is described in IEEE C57.110 and in the UL and CSA K-rating practice):

- **K-1:** a linear load — no extra heating
- **K-4:** moderate harmonics, such as a building with some electronic loads
- **K-9 to K-13:** heavy electronic loads — offices full of IT equipment, labs, schools
- **K-20 and above:** very heavy non-linear loads — data centres, large UPS or drive rooms

A K-rated transformer is designed so that it can carry its full nameplate kVA at a load with that K-factor without overheating. Typical design features include:

- smaller, transposed or parallel conductors to cut eddy-current losses
- a **neutral rated at 200%** of phase current
- an electrostatic shield between windings in many designs
- a core designed for lower flux density

## How to choose a K-rating

The best method is to measure. A power-quality analyser on the existing feeder gives the harmonic spectrum, and the [harmonic and K-factor calculator](/resources/harmonic-calculator) turns it into THD and K-factor.

Without measurements, these rules of thumb are common:

| Load mix | Typical choice |
|---|---|
| Mostly motors, heating, older lighting | Standard (K-1) |
| Mixed office, some VFDs and LED lighting | K-4 |
| Offices dense with IT, labs, schools, healthcare | K-13 |
| Data centres, UPS outputs, large drive rooms | K-13 to K-20 |

When in doubt, choose the next K-rating up. The price difference between K-4 and K-13 is small compared with an overheated transformer.

## K-factor vs harmonic-mitigating transformers

A K-rated transformer **survives** harmonics. It does not reduce them — the distorted current still flows upstream and still distorts the voltage for other equipment.

A [harmonic-mitigating transformer](/products/transformers/dry-type-lv/harmonic-mitigating) **cancels** some harmonics. Its secondary winding is arranged so that triplen harmonics cancel in the core instead of piling up in the neutral, and phase-shifted outputs cancel the 5th and 7th harmonics between transformers. The result is lower losses, cooler neutrals and a cleaner voltage.

| | K-factor transformer | Harmonic-mitigating transformer |
|---|---|---|
| What it does | Tolerates harmonic heating | Cancels some harmonics |
| Upstream distortion | Unchanged | Reduced |
| Losses | Normal | Lower under non-linear load |
| Cost | Moderate premium | Higher |
| Best for | Moderate harmonic loads | Heavy single-phase electronic loads, data rooms |

## Other ways to deal with harmonics

- **Line reactors** in front of drives lower the current distortion of each drive. Size one with the [line reactor calculator](/resources/harmonic-reactor-calculator).
- **Drive isolation transformers** feed individual large drives and are braced for drive duty.
- **Active harmonic filters** inject cancelling current for large or critical systems.

## Frequently asked questions

### What does K-13 mean on a transformer?

It means the transformer can deliver its full nameplate kVA to a load whose harmonic content produces up to 13 times the eddy-current heating of a pure 60 Hz load, without exceeding its temperature rating.

### Is K-4 enough for an office building?

Often yes for general office loads with a mix of lighting and some electronics. Floors dense with computers, servers or UPS-fed loads usually justify K-13.

### Can I use a bigger standard transformer instead of a K-rated one?

Derating a standard transformer can work for moderate harmonics, but it does not provide the 200% neutral and the winding design of a K-rated unit. For heavy non-linear loads, a K-rated or harmonic-mitigating transformer is the safer choice.

### Do LED lights need a K-factor transformer?

Large LED lighting loads add harmonics, especially triplens on 120 V and 347 V circuits. Combined with other electronic loads, they often push the K-factor high enough to justify K-4 or K-13.
