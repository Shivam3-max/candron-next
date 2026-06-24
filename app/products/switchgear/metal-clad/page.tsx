import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchgear',
  categoryHref: '/products/switchgear',
  typeName: 'Metal-Clad Medium Voltage Switchgear',
  eyebrow: 'IEC 62271-200 • IEEE C37.20.2 • 5–29 kV',
  subtitle: 'Fully compartmented, draw-out vacuum circuit breaker (VCB) lineups for medium-voltage power distribution. Arc-resistant type (ARST) options and SCADA integration available from 5 kV to 29 kV.',
  heroImage: '/images/products/switchgear/metal-clad.jpg',
  badges: ['Draw-Out VCBs', 'Arc-Resistant Option', 'IEC 62271-200', 'IEEE C37.20.2'],
  kpis: [
    { value: '5–29 kV', label: 'Voltage Class' },
    { value: '600–4000 A', label: 'Main Rating' },
    { value: '40 kA', label: 'Interrupting Rating' },
    { value: 'Arc-Rated', label: 'Safety Option' },
  ],
  overviewTitle: 'Draw-Out VCBs with Full Bus Compartmentalization',
  overviewText: 'Metal-clad switchgear is the most robust MV switchgear classification — every functional element (bus, breaker, cables, instruments) is in a separate grounded compartment. Our lineups meet IEC 62271-200 and IEEE C37.20.2 with full three-position (connected/test/disconnected) isolation.',
  overviewPoints: [
    'Voltage range: 5 kV, 15 kV, 27.6 kV, and 29 kV classes',
    'Vacuum circuit breakers (VCBs) with draw-out chassis',
    'Grounded barriers between all functional compartments',
    'Arc-resistant type A, B, or C construction (optional)',
    'Digital protection relays: 50/51, 27/59, 67, 87T, 87B',
    'Front and rear cable entry; top or bottom bus options',
  ],
  features: [
    'Withdrawable VCBs with three-position isolation',
    'Full compartmentalization (bus, breaker, cable, instrument)',
    'Interlocked safety shutters — breaker cannot close out of position',
    'Protection relays: 50/51, 27/59, 67N, 87 bus differential',
    'Front-accessible control panel with local/remote selector',
    'Voltage indicator lights per NFPA 70E safe work practice',
    'Grounded metal barriers between all compartments',
    'Standard steel or stainless steel enclosure options',
  ],
  upgrades: [
    'Arc-resistant (ARST) type construction with pressure relief ducts',
    'Motor-operated racking mechanism for remote breaker positioning',
    'PT cubicle with revenue-grade metering (class 0.2S)',
    'Partial discharge monitoring system (on-line PD)',
    'Battery-backed DC control power supply',
    'SCADA / IEC 61850 communication gateway',
    'Witnessed factory acceptance testing (FAT)',
    'Arc-flash study and labelling',
  ],
  specRows: [
    { label: 'Voltage Class', value: '5 kV, 15 kV, 27.6 kV, 29 kV' },
    { label: 'Main Bus Rating', value: '600 A, 1200 A, 2000 A, 3000 A, 4000 A' },
    { label: 'Interrupting Rating', value: 'Up to 40 kA symmetrical (class dependent)' },
    { label: 'Breaker Technology', value: 'Vacuum Circuit Breaker (VCB) — draw-out' },
    { label: 'Compartmentalization', value: 'Metal-clad: bus, breaker, cable, instrument — grounded barriers' },
    { label: 'Bus Material', value: 'Copper, silver-plated contact surfaces' },
    { label: 'Protection Relays', value: 'ANSI 50/51, 27/59, 67/67N, 87T, 87B, 81' },
    { label: 'Communication', value: 'Modbus RTU/TCP, IEC 61850, DNP3 (optional)' },
    { label: 'Arc-Resistant Option', value: 'ARST type A, B, or C per IEEE C37.20.7' },
    { label: 'Enclosure', value: 'NEMA 1 indoor; outdoor weatherproof housing available' },
    { label: 'Standards', value: 'IEC 62271-200, IEEE C37.20.2, CSA C22.2' },
    { label: 'Lead Time', value: '8–16 weeks typical; expedited available' },
  ],
  standards: [
    { name: 'IEC 62271-200', desc: 'Metal-enclosed MV switchgear — alternating current up to 52 kV', logo: '/images/IEC.png' },
    { name: 'IEEE C37.20.2', desc: 'Metal-clad switchgear standard — draw-out, fully compartmented', logo: '/images/IEEE.png' },
    { name: 'IEEE C37.20.7', desc: 'Guide for testing metal-enclosed switchgear rated up to 38 kV for internal arcing faults', logo: '/images/IEEE.png' },
    { name: 'CSA C22.2', desc: 'Canadian electrical safety standard for MV switchgear assemblies', logo: '/images/csa.png' },
    { name: 'ANSI C37 Series', desc: 'Circuit breaker and switchgear application and testing standards', logo: '/images/ansi.png' },
    { name: 'NETA ATS', desc: 'Acceptance testing specifications applied at FAT and site commissioning', logo: '/images/neta.svg' },
  ],
  applications: [
    'Utility distribution and substation feeder switching',
    'Mining primary distribution centres (PDC)',
    'Industrial plant main medium-voltage distribution',
    'Oil & gas upstream and midstream power systems',
    'Data centre utility service entrance at 13.8 kV',
    'Renewable energy generation interconnects',
    'Transit traction power substations',
    'University and hospital main campus substations',
  ],
  relatedTypes: [
    { name: 'Low Voltage Switchgear', sub: 'UL 1558 • Up to 600 V', href: '/products/switchgear/low-voltage' },
    { name: 'Metal-Enclosed Load-Interrupter', sub: 'CSA C22.2 • 5–27.6 kV', href: '/products/switchgear/load-interrupter' },
    { name: 'Service-Entrance Rated', sub: 'ESA & Utility-Ready', href: '/products/switchgear/service-entrance' },
  ],
  faqs: [
    {
      q: 'What is the difference between metal-clad and metal-enclosed switchgear?',
      a: 'Metal-clad (IEEE C37.20.2) has individual grounded metal barriers between all functional compartments — bus, breaker, cables, and instruments — with draw-out breakers and interlocked shutters. Metal-enclosed is a broader term covering assemblies where not all compartments are individually separated; load-interrupter switchgear is a common example.',
    },
    {
      q: 'Can you supply arc-resistant switchgear?',
      a: 'Yes. We offer ARST type A, B, and C construction per IEEE C37.20.7, including pressure relief ducts routed to safe discharge zones. Arc-resistant designs are validated through internal arcing fault testing.',
    },
    {
      q: 'What protection relay packages are available?',
      a: 'We work with most major relay manufacturers (Schweitzer, GE/Multilin, ABB, Beckwith, Basler). Standard packages include overcurrent (50/51), voltage (27/59), directional (67), and differential (87). IEC 61850 and DNP3 gateways are available.',
    },
  ],
  quoteItems: [
    'Nominal voltage and number of feeders',
    'Main bus and feeder current ratings',
    'Available fault current (kA) at the bus',
    'Protection relay functions and SCADA protocol',
    'Arc-resistant classification required (if any)',
    'Indoor or outdoor; single-ended or double-ended',
  ],
}

export const metadata = {
  title: 'Metal-Clad Medium Voltage Switchgear | Candron Energy',
  description: 'IEC 62271-200 and IEEE C37.20.2 metal-clad medium voltage switchgear from 5 kV to 29 kV. Draw-out VCBs, arc-resistant option, built in Toronto, Ontario.',
}

export default function MetalCladSwitchgearPage() {
  return <ProductTypePage {...data} />
}
