import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchgear',
  categoryHref: '/products/switchgear',
  typeName: 'Low Voltage Switchgear',
  eyebrow: 'UL 1558 • CSA C22.2 • Up to 600 V / 6000 A',
  subtitle: 'Main, distribution, and end-of-line switchgear up to 600 V and 6000 A — selective coordination, arc-flash protection, and SCADA-ready layouts built to North American standards.',
  heroImage: '/images/switchgear.jpg',
  badges: ['ACBs / MCCBs', 'UL 1558 Listed', 'Arc-Flash Ready', 'ESA Compliant'],
  kpis: [
    { value: 'Up to 600 V', label: 'Voltage Class' },
    { value: 'Up to 6000 A', label: 'Main Rating' },
    { value: '85 kA', label: 'Interrupting Rating' },
    { value: 'UL 1558', label: 'Standard' },
  ],
  overviewTitle: 'Selective Coordination from the Main to the Branch',
  overviewText: 'Our low voltage switchgear lineups are engineered for institutional, industrial, and infrastructure applications where fault clearing speed, coordination integrity, and maintenance safety are non-negotiable. Every lineup is built in-house and tested before shipment.',
  overviewPoints: [
    'Air circuit breakers (ACBs) and moulded case circuit breakers (MCCBs)',
    'Main-tie-main (MTM) and double-ended substation configurations',
    'Zone-selective interlocking (ZSI) for fast, selective fault clearing',
    'Integrated revenue metering and power quality monitoring',
    'Indoor NEMA 1 or outdoor NEMA 3R / 4X enclosures',
    'Copper bus rated for continuous current with thermal bracing',
  ],
  features: [
    'ACBs and MCCBs with selective coordination',
    'Integrated revenue metering cubicle',
    'Main-tie-main configuration options',
    'Zone-selective interlocking (ZSI)',
    'Ground fault protection relay',
    'Copper bus bar — continuous rating with full bracing',
    'Front-accessible cable compartments (top or bottom entry)',
    'Metered and un-metered feeder sections',
    'Mimic bus with LED status indication',
    'Full-voltage control power transformer (CPT)',
  ],
  upgrades: [
    'Arc-flash resistant (ARST) enclosure with pressure relief',
    'Remote racking system for breaker withdrawal',
    'Infrared inspection windows at bus joints',
    'Bus differential protection relay (87B)',
    'High-resistance grounding (HRG) system',
    'Remote monitoring gateway (Modbus / IEC 61850)',
    'Witnessed factory acceptance testing (FAT)',
    'Power quality analyser integration',
    'Emergency power-off (EPO) module',
  ],
  specRows: [
    { label: 'Voltage Class', value: 'Up to 600 V (208/347/480/600 V)' },
    { label: 'Main Current Rating', value: 'Up to 6000 A (continuous)' },
    { label: 'Interrupting Rating', value: 'Up to 85 kA symmetrical' },
    { label: 'Bus Material', value: 'Copper, silver-plated contact surfaces' },
    { label: 'Enclosure', value: 'NEMA 1, 3R, or 4X' },
    { label: 'Breaker Technology', value: 'ACB (Air Circuit Breaker), MCCB' },
    { label: 'Protection Relays', value: 'LSIG, ZSI, ground fault (50/51G)' },
    { label: 'Metering', value: 'Revenue-grade metering, power quality analyser' },
    { label: 'Control Power', value: '120 V AC via CPT; battery backup option' },
    { label: 'Finish', value: 'ANSI 61 grey powder coat; custom colour available' },
    { label: 'Standards', value: 'UL 1558, CSA C22.2 No. 31, NEMA PB 2' },
    { label: 'Lead Time', value: '4–10 weeks typical; expedited available' },
  ],
  standards: [
    { name: 'UL 1558', desc: 'U.S. low voltage switchgear standard — deadfront construction, short-circuit ratings', logo: null },
    { name: 'CSA C22.2 No. 31', desc: 'Canadian switchgear standard for LV deadfront assemblies', logo: '/images/csa.png' },
    { name: 'IEEE C37 Series', desc: 'Circuit breaker testing and application standards', logo: '/images/IEEE.png' },
    { name: 'ANSI C37.20.1', desc: 'Metal-enclosed low voltage power circuit breaker switchgear', logo: '/images/ansi.png' },
    { name: 'ESA / AHJ', desc: 'Ontario Electrical Safety Authority inspection-ready layouts', logo: null },
    { name: 'NETA ATS', desc: 'Acceptance testing specifications for factory and field testing', logo: '/images/neta.svg' },
  ],
  applications: [
    'Main switchgear in hospitals and healthcare facilities',
    'Data centre primary and secondary distribution',
    'University campuses and institutional buildings',
    'Industrial plant main and sub-distribution',
    'Commercial high-rise and mixed-use towers',
    'Transit and transportation facilities',
    'Mining surface substations',
    'Service entrance (utility point of delivery)',
  ],
  relatedTypes: [
    { name: 'Metal-Clad Medium Voltage', sub: 'IEC 62271-200 • 5–29 kV', href: '/products/switchgear/metal-clad' },
    { name: 'Metal-Enclosed Load-Interrupter', sub: 'CSA C22.2 • 5–27.6 kV', href: '/products/switchgear/load-interrupter' },
    { name: 'Service-Entrance Rated', sub: 'ESA & Utility-Ready', href: '/products/switchgear/service-entrance' },
  ],
  faqs: [
    {
      q: 'What is the difference between LV switchgear and a switchboard?',
      a: 'Low voltage switchgear (UL 1558) is designed for higher short-circuit current ratings and includes protective relay functions for selective fault isolation. Switchboards (UL 891) focus on LV branch distribution and metering — they are typically not rated for the same interrupting levels as switchgear.',
    },
    {
      q: 'Can you provide arc-flash studies and labels?',
      a: 'Yes — we deliver arc-flash hazard analysis studies, PPE level labels, and mitigation strategies such as zone-selective interlocking (ZSI) and high-resistance grounding (HRG), coordinated with your utility protection settings.',
    },
    {
      q: 'Do you offer witnessed factory acceptance testing?',
      a: 'Yes. Witnessed FAT is available for your project team or a third-party inspector. Tests include insulation resistance, primary injection, contact resistance, relay functional, and full operational checks — with a comprehensive documentation package.',
    },
    {
      q: 'What lead times can we expect?',
      a: 'Standard lead times are 4–10 weeks from drawing approval, depending on scope and current shop loading. Expedited schedules are available — contact us to discuss your project timeline.',
    },
  ],
  quoteItems: [
    'Service voltage and main current rating',
    'Single-line diagram and utility interconnection requirements',
    'Indoor/outdoor and enclosure type (NEMA 1 / 3R / 4X)',
    'Metering requirements (revenue or sub-metering)',
    'Relay / protection package and SCADA gateway needs',
    'Arc-flash study requirements',
  ],
}

export const metadata = {
  title: 'Low Voltage Switchgear | Candron Energy',
  description: 'Custom UL 1558 and CSA C22.2 low voltage switchgear up to 600 V and 6000 A. Built in Toronto, Ontario for commercial, industrial, and infrastructure projects.',
}

export default function LowVoltageSwitchgearPage() {
  return <ProductTypePage {...data} />
}
