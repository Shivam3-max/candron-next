import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchboards',
  categoryHref: '/products/switchboards',
  typeName: 'Main Breaker Switchboards',
  eyebrow: 'UL 891 • CSA C22.2 • Up to 4000 A',
  subtitle: 'Single main air circuit breaker switchboards up to 4000 A at 600 V. Simple, reliable, and code-compliant — the workhorse of low voltage power distribution.',
  heroImage: '/images/switchboards.jpg',
  badges: ['UL 891 Listed', 'ACB Main', 'Up to 4000 A', 'ESA Ready'],
  kpis: [
    { value: 'Up to 4000 A', label: 'Main Rating' },
    { value: '600 V', label: 'Voltage' },
    { value: '65–85 kA', label: 'AIC Rating' },
    { value: 'UL 891', label: 'Standard' },
  ],
  overviewTitle: 'Simple, Robust Low Voltage Distribution',
  overviewText: 'Main breaker switchboards are the most common form of low-voltage power distribution in commercial and industrial facilities. Our designs feature coordinated overcurrent protection, accessible bus compartments, and a clear field of view for safe maintenance — all to UL 891 and CSA C22.2.',
  overviewPoints: [
    'Single main air circuit breaker (ACB) up to 4000 A',
    'Feeder MCCBs and ACBs with selective coordination',
    'Copper bus bar — continuous current rating with full short-circuit bracing',
    'Top or bottom cable entry with ample cable bend radius',
    'Section-mounted and drawout breaker options',
    'Revenue metering and sub-metering available',
  ],
  features: [
    'Single main ACB (800 A–4000 A) with LSI or LSIG trip unit',
    'Multiple feeder MCCBs and/or ACBs',
    'Copper bus bar, silver-plated contact surfaces',
    'Front-accessible with hinged trim and removable covers',
    'Top or bottom feeder cable entry',
    'Metering section (kWh, demand, power quality)',
    'Ground bus with equipment bonding',
    'Mimic bus or section labeling per AHJ standard',
    'NEMA 1 enclosure standard; NEMA 3R or 4 available',
  ],
  upgrades: [
    'Branch circuit metering (per-feeder kWh monitoring)',
    'Remote monitoring gateway (Modbus TCP/RTU)',
    'Surge protection device (SPD) per NFPA 70 Article 285',
    'Emergency power-off (EPO) module',
    'Key interlocking between main and feeder breakers',
    'Infrared inspection windows at bus joints',
    'Witnessed factory acceptance testing (FAT)',
    'Custom enclosure colour or stainless steel trim',
  ],
  specRows: [
    { label: 'Voltage', value: '120/208 V, 277/480 V, 347/600 V (3-phase, 4-wire)' },
    { label: 'Main Breaker Rating', value: '800 A, 1200 A, 1600 A, 2000 A, 3000 A, 4000 A' },
    { label: 'AIC Rating', value: 'Up to 85 kA symmetrical (class dependent)' },
    { label: 'Bus Material', value: 'Copper, silver-plated contact surfaces' },
    { label: 'Main Breaker Type', value: 'Air circuit breaker (ACB) — fixed or draw-out' },
    { label: 'Feeder Devices', value: 'MCCB, ACB, disconnect switch' },
    { label: 'Enclosure', value: 'NEMA 1 (indoor); NEMA 3R or 4X (outdoor) available' },
    { label: 'Finish', value: 'ANSI 61 powder coat; custom colour available' },
    { label: 'Standards', value: 'UL 891, CSA C22.2 No. 29, NEMA PB 2' },
    { label: 'Lead Time', value: '3–7 weeks typical' },
  ],
  standards: [
    { name: 'UL 891', desc: 'U.S. standard for dead-front switchboards — construction and short-circuit rating', logo: null },
    { name: 'CSA C22.2 No. 29', desc: 'Canadian switchboard standard — construction and performance', logo: '/images/csa.png' },
    { name: 'NEMA PB 2', desc: 'Deadfront distribution switchboards — standard for application and installation', logo: null },
    { name: 'ANSI C37', desc: 'Circuit breaker and switchgear application standards', logo: '/images/ansi.png' },
    { name: 'ESA Ontario', desc: 'Ontario Electrical Safety Authority requirements for LV assemblies', logo: null },
    { name: 'NETA ATS', desc: 'Acceptance testing specifications applied at FAT', logo: '/images/neta.svg' },
  ],
  applications: [
    'Commercial office buildings and retail centres',
    'Industrial manufacturing facilities',
    'Healthcare — hospital main distribution panels',
    'Data centres and server rooms',
    'Municipal water and wastewater facilities',
    'Educational campuses and universities',
    'Hotels and high-rise residential towers',
    'Transit terminals and transportation hubs',
  ],
  relatedTypes: [
    { name: 'Main-Tie-Main Switchboards', sub: 'Redundancy & Continuity', href: '/products/switchboards/main-tie-main' },
    { name: 'Distribution Switchboards', sub: 'Industrial & Commercial', href: '/products/switchboards/distribution' },
    { name: 'Utility-Approved Switchboards', sub: 'Revenue Metering & ESA', href: '/products/switchboards/utility-approved' },
  ],
  faqs: [
    {
      q: 'What is the difference between a switchboard and a panelboard?',
      a: 'Switchboards (UL 891) are larger assemblies typically rated above 800 A, with individually accessible overcurrent devices and a main disconnect. Panelboards (UL 67) are smaller, enclosed assemblies with circuit breakers installed in a load centre pattern. Switchboards are used for main and subdistribution; panelboards serve branch circuit distribution.',
    },
    {
      q: 'Can you supply a switchboard with multiple voltage sections?',
      a: 'Yes — switchboards can include 480 V and 120/208 V sections in one lineup, typically fed by a step-down transformer inside the gear. We also supply mixed voltage switchboards with section segregation per NEC/CEC requirements.',
    },
    {
      q: 'How long does delivery typically take?',
      a: 'Standard main breaker switchboards typically deliver in 3–7 weeks from drawing approval. Expedited schedules are available — we can often accommodate urgent project timelines with advance shop scheduling.',
    },
  ],
  quoteItems: [
    'Nominal voltage and phase configuration',
    'Main breaker rating (A) and AIC requirement',
    'Number and type of feeder devices',
    'Top or bottom cable entry preference',
    'Metering requirements (sub-metering, revenue)',
    'Project address and local ESA AHJ',
  ],
}

export const metadata = {
  title: 'Main Breaker Switchboards | Candron Energy',
  description: 'UL 891 and CSA C22.2 main breaker switchboards up to 4000 A. Built in Toronto, Ontario for commercial and industrial facilities.',
}

export default function MainBreakerPage() {
  return <ProductTypePage {...data} />
}
