---
title: Arc-Resistant Switchgear Explained: IEEE C37.20.7 Accessibility Types, Ratings and Venting
seoTitle: Arc-Resistant Switchgear: IEEE C37.20.7 Guide
description: What arc-resistant switchgear is, how IEEE C37.20.7 testing works, what Type 1, 2, 2B and 2C mean, how arc gases are vented and what it does not protect.
date: 2026-11-22
category: switchgear
keywords: arc resistant switchgear, IEEE C37.20.7, arc resistant switchgear type 2B, arc resistant accessibility type, arc plenum, internal arc switchgear, arc resistant metal clad
related: Arc-resistant switchgear | /products/switchgear/arc-resistant; Metal-clad switchgear | /products/switchgear/metal-clad; Arc flash and CSA Z462 | /blog/arc-flash-csa-z462; Metal-clad vs metal-enclosed switchgear | /blog/metal-clad-vs-metal-enclosed-switchgear
cta: See arc-resistant switchgear | /products/switchgear/arc-resistant
---

**Arc-resistant switchgear is switchgear that has been tested to contain an internal arcing fault and direct its hot gases, pressure and molten metal away from people standing around it, as long as all doors and covers are closed and latched. In North America it is tested to IEEE C37.20.7, and the "accessibility type" (Type 1, 2, 2B, 2C and so on) tells you which sides of the gear are protected.** It reduces the risk to workers near energized gear in normal operation; it does not remove arc-flash hazards when doors are open.

An internal arc in medium-voltage gear can reach temperatures far hotter than the surface of the sun and build pressure in milliseconds. In conventional gear, that pressure can blow doors open. Arc-resistant designs use reinforced structures, pressure-relief flaps and ducting to channel the blast up and out, usually into a plenum and then outside the room.

## How IEEE C37.20.7 testing works

The gear is fitted with **cotton indicators** (squares of black cotton cloth on frames) around the accessible sides at set distances. An arc is then ignited inside each compartment type at the rated arc current for the rated duration. To pass, the gear must meet five criteria:

1. Properly latched doors, covers and panels do not open.
2. No parts are ejected that could hurt someone (fragmentation within the test zone is limited).
3. The arc does not burn holes in the accessible sides.
4. The cotton indicators do not ignite (from hot gas or burning particles).
5. All grounding connections remain effective.

The standard covers both **medium-voltage metal-clad and metal-enclosed switchgear** and **low-voltage switchgear**. In Canada the assembly is also certified to the applicable CSA C22.2 standard; older Canadian specifications sometimes cite the EEMAC G14-1 test procedure that preceded wide use of C37.20.7.

## Accessibility types

| Type | What is protected |
|---|---|
| **Type 1** | The **front** of the equipment only |
| **Type 2** | The **front, back and sides** (the full perimeter) |
| **Suffix B** | Also protected with the **low-voltage control/instrument compartment door open** (for example Type 2B), so relay technicians can work on the LV compartment while the gear is live |
| **Suffix C** | Arc is contained to the compartment where it starts; **adjacent compartments are protected** from the arc (for example Type 2C) |
| **2BC** | Combines both: perimeter, LV door open and compartment isolation |

Recent editions of the standard add further designations (for example for gear where only specified sides are accessible). Use the exact designation from the edition your specification references.

**Practical choice:** Type 2B is the most commonly specified for MV metal-clad gear in industrial plants, utilities and data centres, because relay technicians routinely open the LV compartment. Type 1 can make sense where gear sits against a wall and nobody can reach the back.

## The two ratings you must specify

- **Rated arc short-circuit current (kA):** should be at least the available fault current at the gear, the same as the short-circuit rating (for example 40 kA).
- **Arc duration (seconds):** commonly 0.5 s for MV gear. The upstream protection must clear an arcing fault faster than this duration, or the rating does not apply. On LV gear, durations depend on the main breaker's clearing time.

Check both against the coordination study. A 40 kA / 0.5 s rating is not met if an upstream relay takes 0.8 s to clear.

## Venting: plenums, ducts and the room

The gases have to go somewhere. Options include:

- **Plenum and exhaust duct** to the outside of the building: the most common for indoor MV lineups. The duct route, length and exit point are part of the tested design; do not change them in the field without the supplier's approval.
- **Venting into the room** with a minimum ceiling height and clearances (only where the design allows it, and only with no one above or near the vent).
- **Arc chimneys or absorbers** on some designs, which cool the gases inside the gear.

Coordinate the duct exit early with the architect: it needs a safe discharge zone that people do not walk through. This is one of the details that gets missed when arc-resistant gear is added late. For outdoor and walk-in enclosures, see our guide on [e-houses](/blog/what-is-an-e-house).

## What arc-resistant gear does not do

- **Doors open = no protection.** Racking a breaker or working in a compartment with the door open puts you back in an arc-flash zone. The arc-flash label and CSA Z462 PPE still apply (see our [arc flash guide](/blog/arc-flash-csa-z462)).
- It does not reduce the incident energy; it redirects it. To reduce the energy, use **arc-flash relays (light detection plus current), zone-selective interlocking, maintenance switches** or faster upstream protection.
- It does not stop the fault from damaging the gear. Expect the faulted section to need repair.

Many owners combine arc-resistant construction with **remote racking** and **remote breaker operation**, so routine switching happens from outside the arc-flash boundary.

## Cost and space

Arc-resistant gear typically costs more than standard gear and adds height (the plenum) and sometimes depth. The extra cost is usually small compared with the total project, which is why many owners now specify it as standard for MV gear in occupied buildings. CANDRON can supply Canadian-made metal-clad lineups with an arc-resistant option; confirm the accessibility type, arc rating, duration and venting arrangement with our engineering team at quote stage.

## Frequently asked questions

### Is arc-resistant switchgear required by code in Canada?
Not universally. It is usually required by the owner's specification or risk assessment under CSA Z462, and is increasingly standard for MV gear in industrial, utility and data-centre projects.

### What does Type 2B arc-resistant mean?
The gear protects people at the front, back and sides, and also when the low-voltage instrument compartment door is open, so relay and metering work can be done with the gear energized.

### Does arc-resistant switchgear eliminate the need for arc-flash PPE?
No. It protects people only with all doors and covers closed and latched. Tasks with doors open, such as racking without remote racking or opening compartments, still require the PPE on the arc-flash label.

### Can arc-resistant gear vent into the electrical room?
Only if the specific tested design allows it, with the required ceiling height and clearances. Most indoor MV installations use a plenum and duct to the outside.

### Can existing switchgear be made arc-resistant?
Generally not to a tested rating, because the rating applies to the tested design. Retrofits such as arc-flash relays, remote racking and faster protection are the usual ways to reduce risk on existing gear.
