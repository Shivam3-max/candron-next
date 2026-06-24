import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchboards',
  categoryHref: '/products/switchboards',
  typeName: 'Main-Tie-Main Switchboards',
  eyebrow: 'UL 891 • ESA-Ready • N+1 Redundancy',
  subtitle: 'Dual-main with tie switchboard lineups for N+1 power continuity. Critical loads stay energized during upstream faults or planned maintenance with automatic or manual bus transfer.',
  heroImage: '/images/products/switchboards/main-tie-main.jpg',
  badges: ['Dual Main ACBs', 'Bus Tie Breaker', 'Auto Transfer Option', 'UL 891'],
  kpis: [
    { value: '2000–4000 A', label: 'Main Rating' },
    { value: '600 V', label: 'Voltage' },
    { value: 'N+1', label: 'Redundancy' },
    { value: 'UL 891', label: 'Standard' },
  ],
  overviewTitle: 'Keep Critical Loads Energized Through Any Fault',
  overviewText: 'Main-tie-main (MTM) switchboards provide power redundancy by connecting two independent utility or generator sources through a bus tie. When one source fails, the tie breaker closes to restore power — automatically or manually, depending on the protection scheme.',
  overviewPoints: [
    'Two main ACBs (one per source) plus a normally-open bus tie',
    'Automatic or manual bus transfer with interlocking logic',
    'Load-shedding relay scheme for limited emergency capacity',
    'Source 1 and Source 2 bus sections with full-capacity feeders',
    'Synchronized source transfer available (closed-transition)',
    'Utility and generator paralleling configurations supported',
  ],
  features: [
    'Two main ACBs — one per independent source (utility, generator, UPS)',
    'Normally-open bus tie ACB with interlocked transfer logic',
    'Automatic bus transfer (ABT) or manual transfer (operator)',
    'Source synchronizing relay for closed-transition transfer',
    'Load-shedding scheme: prioritize critical loads on limited capacity',
    'Per-section feeder distribution with selective coordination',
    'Copper bus — fully rated for either source at 100%',
    'Mimic bus with source status LED indicators',
    'Section labeling per CSA and ESA requirements',
  ],
  upgrades: [
    'Closed-transition (make-before-break) bus transfer with sync check relay',
    'Automatic load-shedding with PLC logic controller',
    'SCADA/BMS gateway for transfer status and alarm reporting',
    'Generator paralleling breaker and AVR/governor interface',
    'Power quality analyser on both source buses',
    'Remote access panel for building automation integration',
    'Witnessed factory acceptance testing of transfer scheme',
    'Commissioning support and transfer scheme testing on-site',
  ],
  specRows: [
    { label: 'Voltage', value: '120/208 V, 277/480 V, 347/600 V (3-phase, 4-wire)' },
    { label: 'Main Breaker Rating', value: '2000 A, 2500 A, 3000 A, 4000 A (each main)' },
    { label: 'Bus Tie Rating', value: 'Equal to main rating' },
    { label: 'AIC Rating', value: 'Up to 85 kA symmetrical (bus dependent)' },
    { label: 'Transfer Type', value: 'Open-transition (standard) or closed-transition (option)' },
    { label: 'Transfer Logic', value: 'Hardwired relay; PLC-based available' },
    { label: 'Bus Configuration', value: 'Dual bus, normally separated at tie' },
    { label: 'Bus Material', value: 'Copper, silver-plated contacts' },
    { label: 'Enclosure', value: 'NEMA 1 standard' },
    { label: 'Standards', value: 'UL 891, CSA C22.2 No. 29, NEMA PB 2' },
    { label: 'Lead Time', value: '5–10 weeks typical' },
  ],
  standards: [
    { name: 'UL 891', desc: 'U.S. deadfront switchboard standard — rated short-circuit performance', logo: null },
    { name: 'CSA C22.2 No. 29', desc: 'Canadian switchboard standard for construction and performance', logo: '/images/csa.png' },
    { name: 'ESA Ontario', desc: 'Ontario ESA requirements for LV service entrance and distribution', logo: null },
    { name: 'IEEE C37', desc: 'Circuit breaker and relay application standards for transfer schemes', logo: '/images/IEEE.png' },
    { name: 'ANSI / NEMA', desc: 'Bus and switchboard enclosure ratings', logo: '/images/ansi.png' },
    { name: 'NETA ATS', desc: 'Acceptance testing for transfer scheme and protection relay testing', logo: '/images/neta.svg' },
  ],
  applications: [
    'Hospitals and healthcare critical power distribution',
    'Mission-critical data centres and co-location facilities',
    'Wastewater treatment plants — continuous process requirements',
    'Airport terminals and aviation ground support facilities',
    'High-rise office and hotel main distribution',
    'Government buildings and emergency services facilities',
    'Industrial facilities with 24/7 continuous production',
    'Transit stations and railway power distribution',
  ],
  relatedTypes: [
    { name: 'Main Breaker Switchboards', sub: 'Single Main • Up to 4000 A', href: '/products/switchboards/main-breaker' },
    { name: 'Distribution Switchboards', sub: 'Industrial & Commercial', href: '/products/switchboards/distribution' },
    { name: 'Utility-Approved Switchboards', sub: 'Revenue Metering & ESA', href: '/products/switchboards/utility-approved' },
  ],
  faqs: [
    {
      q: 'What is the advantage of main-tie-main over two separate switchboards?',
      a: 'MTM puts both sources and the bus tie in one coordinated lineup — interlocking prevents both mains from closing simultaneously, the transfer logic is centralized, and fault clearing on one bus does not affect the other. Two separate switchboards require external coupling and separate transfer control schemes.',
    },
    {
      q: 'Can we transfer loads without an interruption?',
      a: 'Yes — closed-transition (make-before-break) transfer is available when both sources are in synchronism. The tie breaker closes momentarily while both mains are closed before the outgoing main opens. This eliminates the transfer "bump" seen with open-transition schemes.',
    },
    {
      q: 'Do you provide load-shedding with the MTM scheme?',
      a: 'Yes. We can design a load-shedding relay (or PLC) that automatically disconnects non-critical feeders when transferring to a limited-capacity emergency source (e.g., a generator rated at 60% of normal load). Priority loads remain energized throughout.',
    },
  ],
  quoteItems: [
    'Normal and emergency source capacities (kVA or A)',
    'Closed or open-transition transfer requirement',
    'Load-shedding: critical vs. non-critical feeder list',
    'SCADA or BMS integration protocol',
    'Number and ratings of feeder circuits per bus section',
    'Project address and local utility requirements',
  ],
}

export const metadata = {
  title: 'Main-Tie-Main Switchboards | Candron Energy',
  description: 'UL 891 main-tie-main switchboards with dual mains and bus tie for N+1 power redundancy. Automatic transfer options. Built in Toronto, Ontario.',
}

export default function MainTieMainPage() {
  return <ProductTypePage {...data} />
}
