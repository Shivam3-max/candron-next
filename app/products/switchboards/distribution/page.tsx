import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchboards',
  categoryHref: '/products/switchboards',
  typeName: 'Distribution Switchboards',
  eyebrow: 'UL 891 • CSA C22.2 • Industrial & Commercial',
  subtitle: 'Multi-feeder distribution switchboards for the downstream distribution of power across industrial facilities, commercial towers, and large campuses. Designed for selective coordination and easy expansion.',
  heroImage: '/images/products/switchboards/distribution.jpg',
  badges: ['Multi-Feeder', 'UL 891 Listed', 'Expansion Ready', 'Selective Coordination'],
  kpis: [
    { value: '800–3200 A', label: 'Main Rating' },
    { value: '600 V', label: 'Voltage' },
    { value: '42+ Poles', label: 'Feeder Capacity' },
    { value: 'UL 891', label: 'Standard' },
  ],
  overviewTitle: 'Distribute Power Across the Entire Facility',
  overviewText: 'Distribution switchboards serve as the central node for breaking a large feeder into sub-feeders serving MCCs, panelboards, and individual equipment. Our designs are laid out for accessibility, selective coordination, and future expansion — with spare breaker spaces and spare bus capacity built in.',
  overviewPoints: [
    'Multiple feeder MCCBs and ACBs in a single lineup',
    'Full-capacity copper bus with spare space for expansion',
    'Selective coordination between main and all feeders',
    'Panelboard sub-feed lugs and section breaks available',
    'MCC interface (large-frame MCCBs or starters)',
    'Branch circuit metering and sub-metering options',
  ],
  features: [
    'Multi-feeder MCCB and ACB sections (up to 42+ poles)',
    'Full-capacity copper bus — spare capacity for expansion',
    'Selective coordination report available on request',
    'Panelboard sub-feed lugs (bolt-on and plug-in style)',
    'Top and bottom cable entry; conduit fill calculations available',
    'Section breakers for load grouping and isolation',
    'Tie lugs for future paralleling',
    'Ground bus run-length and equipment bonding points',
    'Labeling and directory per NEC/CEC requirements',
  ],
  upgrades: [
    'Branch circuit metering module (per-feeder kWh)',
    'Power quality analyser on main bus',
    'SCADA/BMS integration via Modbus or BACnet',
    'Bus plug (plug-in bus duct) takeoff sections',
    'Fusible disconnect switches for motor branch circuits',
    'Harmonic-rated copper bus for VFD-heavy loads',
    'Spare breaker stabs populated for future use',
    'Witnessed factory acceptance testing (FAT)',
  ],
  specRows: [
    { label: 'Voltage', value: '120/208 V, 277/480 V, 347/600 V (3Ø, 4W)' },
    { label: 'Main Bus Rating', value: '800 A–3200 A (continuous)' },
    { label: 'AIC Rating', value: 'Up to 65 kA symmetrical' },
    { label: 'Feeder Devices', value: 'MCCB (15–1200 A), ACB (800–4000 A)' },
    { label: 'Bus Material', value: 'Copper, silver-plated contacts; optional aluminum' },
    { label: 'Enclosure', value: 'NEMA 1; NEMA 3R available for service entrances' },
    { label: 'Sub-Feed Options', value: 'Panelboard sub-feed lugs, bus duct tap, cable' },
    { label: 'Finish', value: 'ANSI 61 powder coat' },
    { label: 'Standards', value: 'UL 891, CSA C22.2 No. 29, NEMA PB 2' },
    { label: 'Lead Time', value: '4–8 weeks typical' },
  ],
  standards: [
    { name: 'UL 891', desc: 'U.S. deadfront switchboard standard', logo: null },
    { name: 'CSA C22.2 No. 29', desc: 'Canadian switchboard construction and performance standard', logo: '/images/csa.png' },
    { name: 'NEMA PB 2', desc: 'Deadfront distribution switchboard application standard', logo: null },
    { name: 'ANSI C37', desc: 'Circuit breaker ratings and application standards', logo: '/images/ansi.png' },
    { name: 'ESA Ontario', desc: 'Ontario Electrical Safety Authority requirements', logo: null },
    { name: 'NETA ATS', desc: 'Factory and field acceptance testing specifications', logo: '/images/neta.svg' },
  ],
  applications: [
    'Industrial plant distribution to MCCs and panelboards',
    'Office tower floor-by-floor electrical distribution',
    'Hospital and healthcare facility power distribution',
    'University campus multi-building distribution',
    'Retail mall distribution to tenant service panels',
    'Airport concourse and terminal power distribution',
    'Wastewater treatment plant electrical distribution',
    'Transit station and maintenance facility distribution',
  ],
  relatedTypes: [
    { name: 'Main Breaker Switchboards', sub: 'Single Main • Up to 4000 A', href: '/products/switchboards/main-breaker' },
    { name: 'Main-Tie-Main Switchboards', sub: 'N+1 Redundancy', href: '/products/switchboards/main-tie-main' },
    { name: 'Utility-Approved Switchboards', sub: 'Revenue Metering & ESA', href: '/products/switchboards/utility-approved' },
  ],
  faqs: [
    {
      q: 'How do I determine the correct bus rating for a distribution switchboard?',
      a: 'The bus rating must equal or exceed the sum of all connected load diversity, with the main breaker rated at or below the bus. We perform load calculations per CEC/NEC Section 220 or your single-line diagram and recommend the correct bus rating — including spare capacity for future loads.',
    },
    {
      q: 'Can you provide a coordination study with the switchboard?',
      a: 'Yes — we can deliver a time-current curve coordination study showing that feeder breakers will clear before the main, ensuring maximum service continuity. This is particularly important for facilities with VFDs, motors, or sensitive process loads.',
    },
    {
      q: 'How much spare space should we build into the switchboard?',
      a: 'As a rule of thumb, we recommend 20–25% spare bus capacity and at least 4–6 spare breaker positions in the initial design. Electrical loads in facilities typically grow by 10–15% within the first five years of occupancy.',
    },
  ],
  quoteItems: [
    'Nominal voltage and bus rating required',
    'List of feeders: rating (A), trip type, load description',
    'Any sub-feed panelboard or bus duct connections',
    'Metering or sub-metering requirements',
    'Expansion requirements (spare spaces, future bus capacity)',
    'Installation location and AHJ',
  ],
}

export const metadata = {
  title: 'Distribution Switchboards | Candron Energy',
  description: 'UL 891 multi-feeder distribution switchboards for industrial, commercial, and institutional facilities. Built in Toronto, Ontario.',
}

export default function DistributionSwitchboardPage() {
  return <ProductTypePage {...data} />
}
