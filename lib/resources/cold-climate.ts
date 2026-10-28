/**
 * Cold-Climate & Arctic Readiness Checklist: five sheets from specification to winter operation
 * for switchgear, transformers and e-houses at cold, remote or northern sites. Rendered on
 * /resources/cold-climate-checklist and as a print/PDF version.
 */
import type { Sheet } from '@/lib/resources/fat-pack'

export const COLD_TITLE = 'Cold-Climate & Arctic Readiness Checklist'
export const COLD_PDF = '/downloads/candron-cold-climate-checklist.pdf'
export const COLD_REFS = 'CSA C22.1, CSA C22.2 equipment standards, CSA C57 / IEEE C57 transformer standards and NETA ATS'

export const COLD_SHEETS: Sheet[] = [
  {
    id: 'cold-spec',
    code: 'A',
    title: 'Specify for the Cold',
    when: 'Design and procurement',
    intro: 'Most cold-weather failures are decided on paper. State the site conditions plainly, and make every supplier confirm each item in writing before the order is placed.',
    groups: [
      { title: 'Site conditions on every specification', items: [
        { t: 'Minimum and maximum design ambient stated', d: 'For example −45 °C to +35 °C. Use the site record, not a regional average.' },
        { t: 'Snow load, drifting, ice and wind stated' },
        { t: 'Altitude, salt, dust and wildlife exposure stated where relevant' },
        { t: 'Foundation conditions known: frost heave, permafrost or muskeg' },
        { t: 'Access stated: all-season road, winter road window, barge or air' },
      ] },
      { title: 'Equipment ratings', items: [
        { t: 'Every device rated for the minimum ambient, or heated', d: 'Relays, meters, PLCs, HMIs and chargers are often rated to −20 °C or −40 °C only.' },
        { t: 'Breaker and switch mechanisms use lubricants rated for the low temperature' },
        { t: 'Enclosure steel, hardware and hinges suitable for low-temperature impact' },
        { t: 'Gaskets and seals rated for the low temperature, typically silicone' },
        { t: 'Nameplates and labels mechanically fixed, not adhesive only' },
      ] },
      { title: 'Heat and moisture control', items: [
        { t: 'Space heaters in every compartment, with thermostat and humidistat' },
        { t: 'Heaters fed from a reliable source, with a heater-failure alarm' },
        { t: 'Battery compartment heated, or battery sized for cold capacity loss' },
        { t: 'Hooded, snow-shielded vents and filters that can be changed in winter' },
      ] },
      { title: 'Transformers', items: [
        { t: 'Liquid-filled: fluid pour point checked against the minimum ambient', d: 'Natural ester fluids have higher pour points than mineral oil. Ask for the cold-start guidance.' },
        { t: 'Liquid-filled: tank and gauges suit the full temperature range, with level marks for cold' },
        { t: 'Dry-type: cast coil considered where the unit may sit de-energized in the cold' },
        { t: 'Cooling fans and controls rated for the cold, or locked out below a set temperature' },
      ] },
      { title: 'Layout and remote-site support', items: [
        { t: 'Equipment raised above expected snow depth; doors swing clear of drifts' },
        { t: 'E-houses and walk-in gear have a vestibule or arctic entry' },
        { t: 'Shipping splits sized for the road, barge or aircraft' },
        { t: 'Spare parts list agreed, including heaters, thermostats, fuses and relays' },
      ] },
    ],
  },
  {
    id: 'cold-factory',
    code: 'B',
    title: 'Factory Test & Shipping',
    when: 'At the manufacturer, before release for shipment',
    intro: 'Add these to the normal factory acceptance test. Problems with heaters, seals and packaging are cheap to fix in the factory and very expensive at a fly-in site.',
    groups: [
      { title: 'At the factory test', items: [
        { t: 'Every space heater and thermostat energized and checked' },
        { t: 'Heater-failure and low-temperature alarms proven' },
        { t: 'Low-temperature ratings of all devices confirmed against the bill of materials' },
        { t: 'Cold-chamber or low-temperature operation tests witnessed, where specified' },
        { t: 'Gaskets, vent hoods and cable entry seals inspected' },
      ] },
      { title: 'Packing and shipping', items: [
        { t: 'Desiccant inside, and openings sealed for the trip' },
        { t: 'A temporary supply point for space heaters during storage' },
        { t: 'Impact and tilt recorders fitted to transformers and large sections' },
        { t: 'Lifting points, centre of gravity and weights marked on each split' },
        { t: 'Delivery booked inside the winter road or barge window with margin' },
      ] },
    ],
  },
  {
    id: 'cold-site',
    code: 'C',
    title: 'Receiving, Storage & Installation',
    when: 'On site, before energization',
    intro: 'Cold sites punish open enclosures and cold cables. Keep the equipment dry and warm from the day it arrives until it is energized.',
    groups: [
      { title: 'Receiving and storage', items: [
        { t: 'Impact and tilt recorders read and photographed on arrival' },
        { t: 'Equipment inspected for damage and moisture before acceptance' },
        { t: 'Stored indoors, or covered, off the ground and with heaters energized' },
        { t: 'Liquid-filled units checked for leaks and correct fluid level for the temperature' },
      ] },
      { title: 'Installation', items: [
        { t: 'Enclosures opened only inside a tent or hoarding with temporary heat' },
        { t: 'Cable warmed above its minimum installation temperature before pulling', d: 'Check the cable data sheet. Storing reels in a heated space for a day is a common approach.' },
        { t: 'Conduit and cable entries sealed against cold air and condensation' },
        { t: 'Anchors and foundations suited to frost heave or permafrost' },
        { t: 'Bolted joints torqued and recorded; re-check plan agreed for spring' },
      ] },
    ],
  },
  {
    id: 'cold-energize',
    code: 'D',
    title: 'Energization in the Cold',
    when: 'Before and during first energization',
    intro: 'Run this after the normal pre-energization checklist. Moisture and cold fluid are the two things that make a cold start go wrong.',
    groups: [
      { title: 'Before closing in', items: [
        { t: 'Space heaters running long enough to dry the equipment', d: 'Agree the time with the manufacturer; a day or more is common after cold storage.' },
        { t: 'Insulation resistance measured and compared with factory values; dry out if low' },
        { t: 'Liquid-filled: fluid level and temperature recorded; cold-start guidance followed' },
        { t: 'Breakers operated and timed at site temperature' },
        { t: 'DC battery voltage and charger output checked in the cold' },
        { t: 'Relay and HMI displays readable and responsive at site temperature' },
      ] },
      { title: 'After energization', items: [
        { t: 'Load built up gradually where the fluid or windings are very cold' },
        { t: 'Heaters and thermostats confirmed working on permanent power' },
        { t: 'Infrared scan once the equipment is carrying load' },
        { t: 'All readings recorded for the winter baseline' },
      ] },
    ],
  },
  {
    id: 'cold-winter',
    code: 'E',
    title: 'Winter Operation & Maintenance',
    when: 'Every year, before freeze-up and through the winter',
    intro: 'A short routine each autumn and a few checks through the winter keep cold-climate equipment reliable for decades.',
    groups: [
      { title: 'Before freeze-up', items: [
        { t: 'Every space heater, thermostat and humidistat tested' },
        { t: 'Door seals, vent hoods and filters inspected and replaced as needed' },
        { t: 'Standby generator block heaters, batteries and fuel checked' },
        { t: 'Spare heaters, fuses and relays on site and stored warm' },
        { t: 'Winter access plan confirmed for emergency response' },
      ] },
      { title: 'Through the winter', items: [
        { t: 'Snow and ice cleared from vents, doors and pad-mounted cabinets' },
        { t: 'Inside of enclosures checked for frost, condensation or tracking' },
        { t: 'Liquid-filled fluid levels and temperatures logged' },
        { t: 'Heater-failure alarms tested' },
      ] },
    ],
  },
]
