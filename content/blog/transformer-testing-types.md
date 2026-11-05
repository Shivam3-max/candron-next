---
title: Transformer Testing Explained: Insulation Resistance, TTR, Winding Resistance, Power Factor and SFRA
seoTitle: Transformer Tests Explained: IR, TTR, SFRA
description: What each common transformer test measures — insulation resistance and polarization index, turns ratio (TTR), winding resistance, power factor (tan delta), excitation current, SFRA and oil tests — what a good result looks like, and when to run them.
date: 2026-11-05
category: testing-maintenance
keywords: transformer testing, transformer tests list, TTR test, insulation resistance test transformer, winding resistance test, power factor test transformer, tan delta test, SFRA test, transformer acceptance testing
related: Transformer testing services | /testing; Field service & commissioning | /commissioning; FAT & commissioning pack | /resources/fat-commissioning-pack; Free oil-test (DGA) read-out | /resources/oil-test-readout
cta: Book transformer testing | /testing
---

**Transformer tests check two things: whether the insulation is healthy, and whether the windings and core are electrically and mechanically intact.** The most common field tests are insulation resistance, turns ratio (TTR), winding resistance, power factor (tan delta), excitation current and sweep frequency response analysis (SFRA). Liquid-filled units add oil tests and dissolved gas analysis. No single test tells the whole story. They are run as a set and, ideally, compared with earlier results for the same transformer.

## When transformers are tested

| Stage | Purpose |
|---|---|
| Factory routine tests | Prove the transformer meets its design: ratio, polarity, resistance, losses, impedance, applied and induced voltage |
| Factory acceptance test (FAT) | The buyer witnesses key tests before shipment |
| Receipt and acceptance tests | Confirm nothing was damaged in shipping, before energization |
| Commissioning | Final checks with protection, settings and wiring complete |
| Routine maintenance | Track trends every few years, or yearly for critical units |
| After a fault or event | Decide whether the transformer is safe to re-energize |

Acceptance and maintenance testing in North America commonly follows the NETA ATS and MTS specifications. Factory test values are the baseline for everything that follows, so keep the test report with the transformer.

## The main tests

### Insulation resistance (IR) and polarization index (PI)

A high DC voltage (often 1,000–5,000 V, depending on the rating) is applied between windings and from each winding to ground, and the resistance is read in megohms.

- **What it finds:** moisture, contamination or damaged insulation
- **Polarization index (PI):** the 10-minute reading divided by the 1-minute reading. A PI around 2 or more generally indicates dry, healthy insulation. Values near 1 suggest moisture or contamination.
- **Watch for:** temperature. IR falls as temperature rises, so correct readings to a common base before comparing them.

### Transformer turns ratio (TTR)

Measures the voltage ratio on every tap and phase, and confirms polarity and phase relationship (vector group).

- **What it finds:** shorted turns, open windings, wrong tap connections, wrong vector group
- **Good result:** within ±0.5% of the nameplate ratio

### Winding resistance

A DC current is passed through each winding and the resistance is measured, on every tap.

- **What it finds:** loose or high-resistance connections, broken strands, problems in tap changers
- **Good result:** phases agree closely with each other (often within about 2%) and match factory values once corrected to the same temperature
- **Note:** DC testing magnetizes the core. Demagnetize before energizing, or the next inrush can be larger. See our guide to [transformer inrush current](/blog/transformer-inrush-current).

### Power factor (dissipation factor, tan delta)

An AC test voltage is applied to the insulation, and the small losses in it are measured. Lower is better.

- **What it finds:** general deterioration, moisture and contamination in winding insulation and bushings
- **Use it for:** trending. A rising power factor over the years is a warning sign even if the value is still acceptable.

### Excitation current

Each phase is energized from the high-voltage side with the others open, and the small current drawn is measured.

- **What it finds:** core problems and shorted turns
- **Good result:** a consistent pattern between phases. On a three-phase core-type transformer, the middle phase is normally lower than the two outer phases.

### Sweep frequency response analysis (SFRA)

The transformer's response to a range of frequencies is recorded and compared with a baseline fingerprint.

- **What it finds:** winding movement, core shifts and deformation from shipping, short circuits or seismic events
- **Best practice:** take a baseline at the factory or on arrival. SFRA is far more useful when you have something to compare against.

### Oil tests and DGA (liquid-filled units)

A small oil sample tells you about moisture, breakdown strength, acidity and, through **dissolved gas analysis**, whether something inside is overheating or arcing. Our guide to [transformer oil testing and DGA](/blog/transformer-oil-testing-dga-explained) explains how to read a report.

## Which tests answer which question

| Question | Tests that answer it |
|---|---|
| Is the insulation dry and healthy? | Insulation resistance, PI, power factor, oil moisture |
| Are the windings intact and correctly connected? | TTR, winding resistance, excitation current |
| Did it move or get damaged in shipping or a fault? | SFRA compared with the baseline, plus TTR and winding resistance |
| Is something overheating or arcing inside? | DGA, infrared scan in service |

## After a fault: before you re-energize

If a transformer trips on a fault, run at least insulation resistance, TTR, winding resistance and (for liquid-filled units) a DGA sample before re-energizing. Add SFRA if you have a baseline. Re-energizing a transformer with internal damage can turn a repair into a write-off.

Our [testing team](/testing) runs these tests in the field and witnesses factory tests for Canadian projects. If you only need a second opinion on an oil report, the [free DGA read-out](/resources/oil-test-readout) is a good place to start.

## Frequently asked questions

### What tests are done on a new transformer before energization?

Typically insulation resistance, turns ratio, winding resistance and visual and mechanical checks, plus oil tests for liquid-filled units. Power factor and SFRA baselines are recommended for larger transformers.

### What is an acceptable TTR result?

The measured ratio should be within ±0.5% of the calculated nameplate ratio on every tap and phase.

### What is a good polarization index?

A PI around 2 or higher generally indicates dry, clean insulation. Results near 1 point to moisture or contamination.

### How often should transformers be tested?

Critical transformers are commonly tested every one to three years, with oil sampled yearly. Less critical units may be tested less often. Follow the NETA maintenance intervals and your insurer's requirements.

### What does SFRA detect?

Mechanical changes inside the transformer, such as winding movement or core displacement after shipping, faults or seismic events, by comparing the response with a baseline.
