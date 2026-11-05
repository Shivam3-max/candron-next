---
title: Transformer Inrush Current: What Causes It and How to Stop Nuisance Trips
seoTitle: Transformer Inrush Current Explained
description: Why transformers draw a large current spike when energized, how big and how long inrush typically is, how to keep breakers and fuses from tripping on it, and what to watch on generator-backed and weak supplies.
date: 2026-11-05
category: transformers
keywords: transformer inrush current, transformer inrush current calculation, inrush current breaker tripping, magnetizing inrush, 12 times inrush 0.1 second, transformer energization, inrush current protection
related: Dry-type transformers | /products/transformers/dry-type; Fault current calculator | /resources/fault-current-calculator; Field service & commissioning | /commissioning; Transformer testing | /testing
cta: Talk to our commissioning team | /commissioning
---

**Inrush current is the short, large surge a transformer draws in the first few cycles after it is switched on — often 8 to 12 times its full-load current, and sometimes more, dying away within about a tenth of a second to a second.** It is not a fault. It happens because the transformer's steel core briefly saturates while its magnetic flux settles into a steady pattern. The practical problem is that a breaker or fuse set too tightly will see the spike and trip, so the transformer will not stay on.

## Why it happens

In normal running, the flux in the core swings smoothly up and down with the supply voltage. When you energize a transformer, the flux has to start from wherever it was left last time (the **residual flux**). If you happen to close the switch at an unlucky point on the voltage wave, the flux needed can reach almost twice its normal peak, plus the residual. The core saturates, its inductance collapses, and the transformer behaves almost like a short circuit for part of each cycle until the flux recentres.

How big the inrush is depends on:

- **Point on the voltage wave** when the switch closes. Closing near a voltage zero is the worst case.
- **Residual flux** left in the core from the last de-energization.
- **Core design.** Modern, very efficient cores run closer to saturation and can have *higher* inrush than older designs.
- **Source strength.** A stiff utility supply delivers more inrush current than a small generator.
- **Transformer size.** Small transformers have a higher inrush multiple; large ones have longer-lasting inrush.

## Typical magnitude and duration

| Quantity | Typical value |
|---|---|
| Peak inrush, distribution and dry-type transformers | 8–12 × full-load current |
| Small dry-type, first half-cycle | Can be higher, sometimes 20× or more |
| Time to decay | Mostly gone within 0.1 s; tails can last up to about a second on large units |
| Harmonic content | Rich in 2nd harmonic |

For protection coordination, engineers commonly plot an **inrush point at 12 × full-load current for 0.1 s** on the time-current curve (and 25× for 0.01 s for small dry-types). The primary breaker or fuse curve must sit to the right of and above that point. Use the manufacturer's figure when you have it.

### Example

A 500 kVA dry-type transformer at 600 V has a full-load primary current of about 481 A. At 12×, inrush can reach roughly **5,800 A for about 0.1 s**. A primary breaker with its instantaneous trip set at 5× (2,400 A) will trip every time you energize it.

## How to avoid nuisance tripping

1. **Check the instantaneous setting.** The primary breaker's instantaneous pickup must be above the inrush point. Electronic trip units let you raise it, or add a short delay.
2. **Use the right fuse.** Time-delay or transformer-rated fuses are designed to ride through inrush. Fast-acting fuses are not.
3. **Stay inside the code limits.** The Canadian Electrical Code, Section 26, sets the maximum primary and secondary overcurrent ratings for transformers. Raising a setting to ride through inrush must keep you within those limits, so have the engineer of record confirm it.
4. **Energize unloaded where possible.** Close the transformer first, then pick up downstream load in steps.
5. **Mind differential relays.** Transformer differential protection uses **2nd-harmonic restraint** to tell inrush from an internal fault. Confirm it is enabled and set.

## Generators and weak supplies

On a generator or a weak rural supply, inrush shows up as a **voltage dip** rather than a trip. Energizing a large transformer from a standby generator can drop the voltage enough to stall motors or drop contactors. If you need to energize big transformers from a generator:

- Energize the largest transformer first, before other loads
- Sequence multiple transformers a few seconds apart
- Ask about **soft energization**: pre-insertion resistors, point-on-wave controlled switching, or a ramped generator start

**Sympathetic inrush** is a related effect. When you energize a second transformer next to one that is already running, the running one can also draw a burst of current. Stagger energization where transformers share a bus.

## Testing and inrush

Some field tests, especially **winding resistance tests**, push DC through the windings and leave residual magnetism in the core. That can make the next energization's inrush worse. Good practice is to demagnetize the core after DC testing. Our [field service and commissioning](/commissioning) crews include this in the sequence before first energization.

## Frequently asked questions

### How long does transformer inrush current last?

Most of it decays within about 0.1 seconds (six cycles at 60 Hz). On large transformers a smaller tail can last up to about a second.

### How do you calculate transformer inrush current?

A common estimate is 8 to 12 times the full-load current. For protection coordination, engineers often use a point at 12 × full-load current for 0.1 s, or the manufacturer's published value.

### Why does my breaker trip when I turn on a transformer?

The breaker's instantaneous trip is set below the inrush current. Raising the instantaneous pickup or adding a short delay, within code limits, usually solves it.

### Is inrush current dangerous for the transformer?

Occasional inrush is normal and the transformer is designed for it. Very frequent switching adds mechanical stress to the windings, so avoid energizing large transformers repeatedly in a short time.

### Does inrush current get worse with efficient transformers?

It can. Low-loss cores operate closer to saturation, which tends to increase inrush. Check the manufacturer's inrush data rather than assuming older values.
