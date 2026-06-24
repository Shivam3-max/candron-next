import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchgear',
  categoryHref: '/products/switchgear',
  typeName: 'Low Voltage Switchgear',
  eyebrow: 'CSA C22.2 • UL 508A • Up to 1000 V',
  subtitle: 'Custom low voltage switchgear up to 1,000 V for power distribution, motor control, and service entrance applications in industrial and commercial facilities.',
  heroImage: '/images/products/switchgear/service-entrance.jpg',
  badges: ['Up to 1000 V', 'Service Entrance Rated', 'Modular Design', 'CSA / UL Listed'],
  kpis: [
    { value: 'Up to 1000 V', label: 'Voltage' },
    { value: 'Up to 3200 A', label: 'Max Current' },
    { value: 'UL 508A', label: 'Standard' },
    { value: 'Custom', label: 'Built' },
  ],
  overviewTitle: 'LV Switchgear for Industrial Power Distribution',
  overviewText: 'Low Voltage Switchgear manages and protects electrical circuits operating up to 1,000 V. Our LV switchgear integrates circuit breakers, contactors, busbars, and metering in modular, free-standing or wall-mount enclosures — custom designed from your single-line diagram and site requirements, compliant with CSA C22.2 and UL 508A.',
  overviewPoints: [
    'Voltage range up to 600 V (North America) / 1000 V (IEC)',
    'Main breaker, main-tie-main, and distribution configurations',
    'Service entrance rated with CT / PT metering compartments',
    'Copper busbar — continuous, welded, or bolted-splice',
    'NEMA Type 1, 4, 12, and 4X enclosure ratings',
    'Free-standing or wall-mount multi-section lineups',
  ],
  features: [
    'Molded case circuit breakers (MCCBs) — fixed or plug-in',
    'Air circuit breakers (ACBs) for main and tie sections',
    'Non-fused disconnect switches with full-load rating',
    'Copper busbar — pre-drilled with NEMA 2-hole pads',
    'CT / PT compartment for revenue metering',
    'Solid neutral lug and ground bus per section',
    'Condensation heater and thermostat per section',
    'Infrared (IR) windows for thermographic inspection',
    'Non-ferrous aluminum cable entry gland plates',
  ],
  upgrades: [
    'Digital power monitoring (ION, Shark, PM8000 meters)',
    'Zone-selective interlocking (ZSI) between main and feeders',
    'Ground fault protection relay (50GS / 50N)',
    'Surge protective device (SPD) module (IEEE C62.41)',
    'Bus differential protection relay (87B)',
    'Rear access cable management for parallel terminations',
    'Non-ferrous stainless steel gland plates',
    'Witnessed factory acceptance testing (FAT)',
  ],
  specRows: [
    { label: 'Voltage Range', value: 'Up to 600 V AC (North America); 1000 V (IEC)' },
    { label: 'Phase', value: '3-phase, 4-wire (3P4W); single-phase available' },
    { label: 'Current Rating', value: '400 A to 3200 A main bus' },
    { label: 'Short Circuit Rating', value: 'Up to 100 kA AIC (application-specific)' },
    { label: 'Breaker Type', value: 'MCCB (fixed / plug-in), ACB (draw-out), fused disconnect' },
    { label: 'Enclosure Type', value: 'NEMA 1, NEMA 12, NEMA 4, NEMA 4X (stainless)' },
    { label: 'Bus Material', value: 'Copper (standard); aluminum on request' },
    { label: 'Metering', value: 'CT / PT cubicle, revenue-grade utility meters' },
    { label: 'Standards', value: 'CSA C22.2, UL 508A, NFPA 70 (NEC), CEC' },
    { label: 'Lead Time', value: '6–12 weeks from approved single-line diagram' },
  ],
  standards: [
    { name: 'CSA C22.2', desc: 'Canadian electrical equipment standard for LV switchgear assemblies', logo: '/images/csa.png' },
    { name: 'UL 508A', desc: 'Industrial control panel standard — applied to switchgear assemblies', logo: null },
    { name: 'ANSI / IEEE C37', desc: 'Low voltage AC power circuit breaker performance standards', logo: '/images/IEEE.png' },
    { name: 'NFPA 70 / NEC', desc: 'U.S. national electrical code installation requirements', logo: null },
    { name: 'ESA', desc: 'Ontario Electrical Safety Authority — service entrance and metering layouts', logo: null },
    { name: 'NETA ATS', desc: 'Acceptance testing specifications for commissioning', logo: '/images/neta.svg' },
  ],
  applications: [
    '480 V and 600 V industrial power distribution centres',
    'Service entrance switchgear with utility CT / PT metering',
    'Generator paralleling and synchronizing switchgear',
    'Motor control centre (MCC) feed and tie switchgear',
    'Commercial campus main distribution equipment (MDE)',
    'Data centre main and sub-distribution switchgear',
    'Water and wastewater treatment plant PDCs',
    'Oil & gas facility power distribution centres',
  ],
  relatedTypes: [
    { name: 'Medium Voltage Switchgear', sub: '1–36 kV Control & Protection', href: '/products/mv-switchgear' },
    { name: 'Switchboards', sub: 'LV Power Distribution', href: '/products/switchboards' },
    { name: 'Junction Box & Splitters', sub: 'LV & MV Distribution', href: '/products/junction-box-splitters' },
  ],
  faqs: [
    {
      q: 'What is the difference between LV switchgear and a switchboard?',
      a: 'LV switchgear and switchboards serve similar functions but differ in design and duty. Switchgear typically uses air circuit breakers (ACBs) or molded-case breakers in a fully compartmented, individually isolated design with higher interrupting ratings and draw-out capabilities. Switchboards are a cost-effective alternative where the higher fault-current ratings and draw-out modular features of switchgear are not required.',
    },
    {
      q: 'Can LV switchgear be service entrance rated?',
      a: 'Yes. We design service entrance rated LV switchgear with CT / PT metering compartments, tamper-resistant sealing provisions, and ESA / AHJ acceptance layouts. These are coordinated with the local utility (Hydro One, Alectra, Enbridge) for meter form and landing pad requirements.',
    },
    {
      q: 'What enclosure ratings are available for harsh environments?',
      a: 'We offer NEMA Type 1 (general purpose), Type 12 (dust-tight), Type 4 (watertight), and Type 4X (watertight, corrosion-resistant stainless steel). For outdoor applications we also supply free-standing kiosk enclosures with climate control and HVAC.',
    },
    {
      q: 'Can large lineups be split for restricted installation access?',
      a: 'Yes. Multi-section lineups can be designed to split at predetermined bus joint locations for rigging through stairwells, doorways, or restricted areas. Bus joints use copper splice bars with bolted connections, and the split sections are field-connected during installation.',
    },
  ],
  quoteItems: [
    'System voltage (V) and available fault current (kA)',
    'Main bus current rating (A)',
    'Number of feeder circuits and breaker schedule',
    'Utility metering requirements (CT / PT form and class)',
    'Enclosure type (NEMA 1, 12, 4, or 4X)',
    'Site access constraints (doorway / stairwell dimensions)',
  ],
}

export const metadata = {
  title: 'Low Voltage Switchgear | Candron Energy',
  description: 'Custom LV switchgear up to 1,000 V — service entrance, main-tie-main, and distribution configurations. CSA C22.2 and UL 508A certified. Built in Toronto, Ontario.',
}

export default function LVSwitchgearPage() {
  return <ProductTypePage {...data} />
}
