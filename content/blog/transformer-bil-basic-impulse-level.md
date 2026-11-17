---
title: Transformer BIL (Basic Impulse Level) Explained: Ratings, Lightning and Coordination
seoTitle: Transformer BIL (Basic Impulse Level) Explained
description: What basic impulse level (BIL) means on a transformer nameplate, typical BIL ratings by voltage class for liquid-filled and dry-type units, how impulse testing works, and how surge arresters coordinate with BIL.
date: 2026-11-16
category: codes-standards
keywords: transformer BIL, basic impulse level, BIL rating transformer, 95 kV BIL, transformer impulse test, surge arrester coordination, dry type transformer BIL, insulation coordination
related: Transformer bushings explained | /blog/transformer-bushings-explained; Dry-type MV transformers | /products/transformers/dry-type-mv; Transformer testing types | /blog/transformer-testing-types; Substation transformers | /products/transformers/substation
cta: Check BIL for your project | /contact
---

**Basic impulse level (BIL) is the peak lightning-surge voltage a transformer's insulation is designed and tested to withstand without breaking down.** Normal operating voltage is a few kilovolts or tens of kilovolts, but a nearby lightning strike or switching event can send a surge of hundreds of kilovolts down the line for a few microseconds. BIL tells you how big a surge the insulation can survive.

## How BIL is defined

BIL is the crest value of a standard **1.2/50 µs** impulse wave: the voltage rises to its peak in 1.2 microseconds and decays to half in 50 microseconds, which mimics a lightning surge. A transformer rated **95 kV BIL** must withstand a 95,000 V peak impulse of that shape.

It is printed on the nameplate for each winding, for example "HV BIL 95 kV, LV BIL 30 kV".

## Typical BIL ratings

Common ratings for North American distribution and medium-voltage equipment:

| System voltage class | Liquid-filled (typical) | Ventilated dry-type (typical) |
|---|---|---|
| 1.2 kV (600 V class) | 30 kV | 10 kV |
| 5 kV | 60 kV | 30 kV |
| 15 kV | 95 kV | 60 kV (95 kV optional) |
| 25 kV | 125–150 kV | 110–125 kV |
| 34.5 kV | 150–200 kV | 150 kV |

These are indicative; confirm against the applicable IEEE C57 standard, CSA requirements and the utility's insulation-coordination rules. Dry-type transformers have lower standard BILs because they are normally installed indoors, protected from direct lightning exposure.

## Why BIL matters on a project

- **Exposure**: transformers fed by overhead lines are more exposed than those fed by underground cable.
- **Altitude**: insulation strength falls at high altitude, above about 1,000 m, so a higher BIL or derating may be needed.
- **Utility requirements**: many utilities specify a minimum BIL for interconnection.
- **Dry-type outdoors or overhead-fed**: often needs the higher optional BIL plus arresters.

## Surge arresters and coordination

Arresters limit the surge voltage that reaches the transformer. **Insulation coordination** means the arrester's protective level must sit comfortably below the transformer's BIL. A common rule of thumb is a **protective margin of at least 20%** between the arrester's discharge voltage and the BIL.

Good practice:

- mount arresters as close to the transformer terminals as possible, because lead length adds voltage,
- ground arresters directly to the transformer tank ground,
- select the arrester rating (MCOV) to suit the system grounding.

## Impulse testing

The **lightning impulse test** applies a reduced wave, then full-wave impulses, and sometimes chopped waves, while recordings are compared to detect any breakdown. It is a **design or type test** on many distribution transformers and a routine test on larger power transformers. See [transformer testing types](/blog/transformer-testing-types).

## BIL and bushings

Bushings must have a BIL at least equal to the winding they serve, and longer creepage in polluted areas. See [transformer bushings explained](/blog/transformer-bushings-explained).

## Frequently asked questions

### What does BIL mean on a transformer?

Basic impulse level: the peak voltage of a standard lightning impulse the insulation is designed and tested to withstand.

### What is the BIL of a 15 kV transformer?

Typically 95 kV for liquid-filled units and 60 kV for ventilated dry-type units, with 95 kV available as an option for dry-type.

### Can I use a lower-BIL transformer if I add surge arresters?

Arresters are required for coordination regardless, but they do not replace an adequate BIL. Specify the BIL the system and utility require, then add arresters to protect it.

### Does altitude affect transformer BIL?

Yes. Air is thinner at high altitude, reducing external insulation strength, so units installed above about 1,000 m may need a higher BIL or derating.
