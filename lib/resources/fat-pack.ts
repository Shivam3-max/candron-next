/**
 * FAT & Commissioning Pack: four checklists and a punch list, written from CANDRON's own
 * factory test and field commissioning practice. Rendered on /resources/fat-commissioning-pack
 * and as a print/PDF version.
 */

export interface CheckItem { t: string; d?: string }
export interface CheckGroup { title: string; items: CheckItem[] }
export interface Sheet { id: string; code: string; title: string; when: string; intro: string; groups: CheckGroup[] }

export const PACK_TITLE = 'FAT & Commissioning Pack'
export const PACK_PDF = '/downloads/candron-fat-commissioning-pack.pdf'
export const PACK_REFS = 'NETA ATS, CSA Z462, CSA C22.1, IEEE C37.20.2 and IEEE C57.12.90 / C57.12.91'

export const SHEETS: Sheet[] = [
  {
    id: 'fat-switchgear',
    code: 'A',
    title: 'Factory Acceptance Test: MV Switchgear',
    when: 'At the manufacturer, before release for shipment',
    intro: 'A witness agenda for metal-clad and metal-enclosed switchgear. Agree the sequence with the manufacturer a week ahead so every test you want to see is scheduled while you are on site.',
    groups: [
      { title: 'Before testing starts', items: [
        { t: 'Approved drawings are the latest revision', d: 'General arrangement, single-line, three-line, schematics and wiring diagrams.' },
        { t: 'Test procedure and acceptance criteria shared in advance' },
        { t: 'Calibration certificates for all test instruments are current' },
        { t: 'Relay settings files received and match the approved coordination study' },
        { t: 'Safety briefing held; test area barricaded; roles and sign-off authority agreed' },
      ] },
      { title: 'Visual & mechanical inspection', items: [
        { t: 'Nameplates and ratings match the approved drawings', d: 'Voltage, continuous current, short-circuit rating, BIL, enclosure type.' },
        { t: 'Enclosure, finish, doors, gaskets and hardware are complete and undamaged' },
        { t: 'Compartment barriers and automatic shutters operate freely' },
        { t: 'Bus joints are torque-marked; phase clearances look consistent' },
        { t: 'Ground bus is continuous through every section' },
        { t: 'Breakers rack smoothly to connected, test and disconnected positions' },
        { t: 'Mechanical interlocks prevent racking a closed breaker and opening doors where specified' },
        { t: 'Position indicators, operation counters and charging indicators work' },
        { t: 'Space heaters and thermostats installed and wired' },
        { t: 'Device labels and wire markers match the drawings' },
      ] },
      { title: 'Electrical tests', items: [
        { t: 'Insulation resistance of the main bus, phase-to-phase and phase-to-ground' },
        { t: 'Power-frequency withstand (dielectric) test of the main circuit', d: 'At the level required by the applicable standard; record voltage, duration and result.' },
        { t: 'Contact resistance of breaker main contacts and bolted bus joints' },
        { t: 'Current transformer ratio, polarity and secondary wiring checked' },
        { t: 'Voltage transformer ratio, polarity and fusing checked' },
        { t: 'Control wiring verified point to point against the schematics' },
      ] },
      { title: 'Functional tests', items: [
        { t: 'Breakers close and trip locally and remotely; anti-pump and trip-free work' },
        { t: 'Each protective relay function picks up and trips the correct breaker', d: 'Secondary injection against the settings file.' },
        { t: 'Transfer and interlocking schemes run through every sequence', d: 'Main-tie-main, automatic throw-over, generator transfer.' },
        { t: 'Metering, alarms and annunciation read correctly' },
        { t: 'SCADA and communications points verified end to end' },
        { t: 'Control power transfer and battery or UPS supply tested' },
      ] },
      { title: 'Close-out', items: [
        { t: 'All deviations recorded on the punch list with an owner and a date' },
        { t: 'Test reports signed by the manufacturer and the witness' },
        { t: 'Release-for-shipment decision recorded' },
        { t: 'Shipping splits, packing, lifting points and tie-downs reviewed' },
      ] },
    ],
  },
  {
    id: 'fat-transformer',
    code: 'B',
    title: 'Factory Acceptance Test: Transformers',
    when: 'At the manufacturer, before release for shipment',
    intro: 'Routine tests for dry-type and liquid-filled transformers. Ask which tests will run while you are present and which will be reported; the losses and impedance results are the ones most often disputed later.',
    groups: [
      { title: 'Before testing starts', items: [
        { t: 'Approved drawings and the guaranteed losses, impedance and sound level on hand' },
        { t: 'Test plan lists every routine test, plus any type or special tests ordered' },
        { t: 'Calibration certificates for all test instruments are current' },
      ] },
      { title: 'Visual inspection', items: [
        { t: 'Nameplate matches the order', d: 'kVA, voltages, BIL, impedance, connection and vector group, taps, cooling class.' },
        { t: 'Bushings, terminations and cable or bus provisions are as drawn' },
        { t: 'De-energized tap changer operates through every position and locks' },
        { t: 'Accessories fitted: gauges, pressure relief, thermometers, fans, controls' },
        { t: 'Core and tank or enclosure grounding provisions in place' },
      ] },
      { title: 'Routine tests', items: [
        { t: 'Winding resistance on every tap' },
        { t: 'Turns ratio on every tap, with polarity and phase relation (vector group)' },
        { t: 'Insulation resistance (and polarization index if specified)' },
        { t: 'No-load loss and excitation current' },
        { t: 'Load loss and impedance, corrected to the reference temperature' },
        { t: 'Applied potential (separate-source) test' },
        { t: 'Induced potential test' },
        { t: 'Liquid-filled: leak test, plus fluid dielectric strength and moisture' },
        { t: 'Liquid-filled: dissolved gas analysis baseline sample taken' },
        { t: 'Cast-coil dry-type: partial discharge test, where specified' },
      ] },
      { title: 'Accessories & controls', items: [
        { t: 'Temperature alarms and trips set and tested' },
        { t: 'Cooling fans start and stop on temperature and in manual' },
        { t: 'Bushing CT ratio and polarity checked, where fitted' },
        { t: 'Load tap changer and voltage regulator controls operate, where fitted' },
      ] },
      { title: 'Close-out', items: [
        { t: 'Results compared to guarantees and tolerances; any deviation recorded' },
        { t: 'Test report signed by the manufacturer and the witness' },
        { t: 'Shipping: impact recorder fitted, fluid or nitrogen status recorded, tie-downs reviewed' },
      ] },
    ],
  },
  {
    id: 'pre-switchgear',
    code: 'C',
    title: 'Pre-Energization Checklist: MV Switchgear',
    when: 'On site, after installation and before first energization',
    intro: 'Run this after the lineup is set, joined and cabled, and before the switching order is issued. It catches the problems that factory testing cannot: shipping damage, field joints, cables and settings.',
    groups: [
      { title: 'Receipt & installation', items: [
        { t: 'Shipping damage inspected; impact recorder reviewed and filed' },
        { t: 'Lineup anchored and levelled per the installation drawings' },
        { t: 'Shipping-split bus joints assembled and torqued; values recorded' },
        { t: 'Ground bus connected to the station ground grid' },
        { t: 'All covers and barriers reinstalled; no tools or debris inside' },
      ] },
      { title: 'Cables & terminations', items: [
        { t: 'Terminations made per the termination kit instructions' },
        { t: 'Cable insulation tested as specified (insulation resistance or VLF)' },
        { t: 'Phasing confirmed and phase identification applied' },
        { t: 'Cable shields grounded as designed (one end or both ends)' },
      ] },
      { title: 'Tests & settings', items: [
        { t: 'Insulation resistance of the assembled bus' },
        { t: 'Contact resistance of field bus joints' },
        { t: 'Breakers operated; timing tested where specified' },
        { t: 'Relay settings loaded match the approved settings file; trips verified by injection' },
        { t: 'CT shorting blocks removed and every CT circuit closed through its burden' },
        { t: 'VT fuses installed; trip circuits checked end to end' },
        { t: 'Control power available; source transfer tested' },
      ] },
      { title: 'Safety & approvals', items: [
        { t: 'Arc-flash and equipment labels installed (CSA Z462)' },
        { t: 'Lockouts cleared; energization plan and switching order approved' },
        { t: 'Inspection authority and utility acceptance received' },
        { t: 'As-left settings and test records filed with the owner' },
      ] },
    ],
  },
  {
    id: 'pre-transformer',
    code: 'D',
    title: 'Pre-Energization Checklist: Transformers',
    when: 'On site, after installation and before first energization',
    intro: 'For padmount, substation and dry-type units. Most early-life transformer failures trace back to something on this list: moisture, a missed ground, the wrong tap or a loose termination.',
    groups: [
      { title: 'Receipt', items: [
        { t: 'Impact recorder reading reviewed; no shipping damage or leaks' },
        { t: 'Nitrogen pressure recorded, if shipped under gas' },
        { t: 'Fluid level and temperature gauges read normally' },
        { t: 'Core ground checked, where accessible' },
      ] },
      { title: 'Installation', items: [
        { t: 'Set level on the pad or base; clearances to walls and combustibles meet code' },
        { t: 'Tank or enclosure and neutral grounded per the design' },
        { t: 'Primary and secondary terminations torqued; values recorded' },
        { t: 'Surge arresters installed where specified' },
        { t: 'Dry-type: shipping blocks removed; coils and air ducts clean and clear' },
      ] },
      { title: 'Tests', items: [
        { t: 'Insulation resistance of the windings' },
        { t: 'Turns ratio at the selected tap' },
        { t: 'Winding resistance, if the unit was assembled or moved on site' },
        { t: 'Liquid-filled: fluid sample after filling for dielectric strength and moisture' },
      ] },
      { title: 'Settings', items: [
        { t: 'De-energized tap set for the required secondary voltage and locked' },
        { t: 'Temperature alarms and trips set and tested' },
        { t: 'Fans tested in automatic and manual' },
        { t: 'Pressure relief device and gauge drag pointers reset' },
        { t: 'Load tap changer controls set, where fitted' },
      ] },
      { title: 'First energization', items: [
        { t: 'Secondary breakers open; energize at no load' },
        { t: 'Observe at no load for the period in the energization plan', d: 'Listen for unusual noise; watch temperatures and protection.' },
        { t: 'Secondary voltages and phase rotation confirmed before load is applied' },
        { t: 'First loading, temperatures and gauge readings recorded' },
      ] },
    ],
  },
]

export const PUNCH_CATEGORIES = [
  { code: 'A', label: 'Must close before energization' },
  { code: 'B', label: 'Must close before handover' },
  { code: 'C', label: 'Minor or cosmetic' },
]

export const SIGNOFF_ROLES = ['Manufacturer', 'Electrical contractor', 'Owner / engineer', 'Commissioning agent']
