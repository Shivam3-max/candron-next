import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchgear',
  categoryHref: '/products/switchgear',
  typeName: 'Service-Entrance Rated Switchgear',
  eyebrow: 'CSA C22.2 • ESA-Ready • Utility-Coordinated',
  subtitle: 'Utility-coordinated service entrance equipment with revenue metering cubicles and ESA-accepted layouts. Main and tie breaker configurations with protection relay packages for the utility point of delivery.',
  heroImage: '/images/products/switchgear/service-entrance.jpg',
  badges: ['Utility-Approved', 'Revenue Metering', 'ESA Accepted', 'CT / PT Cubicles'],
  kpis: [
    { value: 'Up to 29 kV', label: 'Voltage Class' },
    { value: 'Site-Specific', label: 'Current Rating' },
    { value: 'CSA / ESA', label: 'Compliance' },
    { value: 'Revenue Grade', label: 'Metering' },
  ],
  overviewTitle: 'The Utility Interface, Engineered Right',
  overviewText: 'Service entrance switchgear is the critical interface between the electrical utility and your facility. Our service entrance lineups are designed with the utility interface protection, revenue metering, and inspection access that ESA and local utilities require — with coordination studies included.',
  overviewPoints: [
    'Main and tie breaker with ground fault protection',
    'Revenue metering cubicles with CT/PT compartments',
    'Utility interface protection: 27/59 (voltage), 81 (frequency)',
    'ESA and authority-having-jurisdiction (AHJ) accepted layouts',
    'Coordination studies and relay setting documentation',
    'As-built drawings and factory test reports included',
  ],
  features: [
    'Main breaker / tie breaker with ground fault protection (ANSI 50G/51G)',
    'Revenue metering cubicle — lockable CT/PT sections',
    'Voltage and frequency relay (ANSI 27/59/81) for utility interface',
    'ESA and AHJ-accepted layout drawings',
    'Utility nameplate and inspection access per requirements',
    'Interlocked sequence of operations (main/tie)',
    'Sealable compartment windows for meter reading without de-energizing',
    'Manual or motorized main breaker operation',
    'Full-height walk-in sections for large installations',
  ],
  upgrades: [
    'Arc-flash study with PPE category labels',
    'Witnessed factory acceptance testing (FAT) with test reports',
    'Remote annunciation and SCADA communication gateway',
    'On-site commissioning and utility protection relay setting',
    'Power quality analyser (flicker, harmonics, unbalance)',
    'Utility coordination study and submission package',
    'Standby generator interface (paralleling breaker/relay)',
    'Automatic bus transfer (ABT) scheme',
  ],
  specRows: [
    { label: 'Voltage Class', value: 'LV (600 V) through MV (up to 29 kV)' },
    { label: 'Main Breaker Rating', value: 'Site-specific (utility requirement dependent)' },
    { label: 'Metering', value: 'Revenue-grade: Class 0.2S CT/PT, ANSI C12 meters' },
    { label: 'Utility Protection', value: 'ANSI 27/59 (voltage), 81 (frequency), 50/51 (overcurrent)' },
    { label: 'Metering Access', value: 'Lockable, sealable; utility inspector access without de-energizing' },
    { label: 'Bus Material', value: 'Copper; silver-plated contact surfaces' },
    { label: 'Enclosure', value: 'NEMA 1 or custom to utility specification' },
    { label: 'Compliance', value: 'CSA C22.2, ESA, utility service requirements' },
    { label: 'Documentation', value: 'As-built drawings, test reports, relay setting record' },
    { label: 'Lead Time', value: '8–14 weeks from drawing approval' },
  ],
  standards: [
    { name: 'CSA C22.2', desc: 'Canadian electrical safety standard for MV and LV assemblies', logo: '/images/csa.png' },
    { name: 'ESA Ontario', desc: 'Ontario Electrical Safety Authority inspection and acceptance requirements', logo: null },
    { name: 'ANSI C12 Series', desc: 'American National Standard for electricity metering — revenue accuracy', logo: '/images/ansi.png' },
    { name: 'IEEE C37 Series', desc: 'Circuit breaker, protection relay, and utility interface standards', logo: '/images/IEEE.png' },
    { name: 'Utility Requirements', desc: 'Alectra, Hydro One, ATCO, BC Hydro, and other utility specifications', logo: null },
    { name: 'NETA ATS', desc: 'Acceptance testing specifications applied at FAT and commissioning', logo: '/images/neta.svg' },
  ],
  applications: [
    'Utility service entrance for industrial facilities',
    'Commercial building service entrance at 27.6 kV or 4.16 kV',
    'Data centre utility interface and main distribution',
    'Hospital service entrance with utility coordination',
    'Municipal and government building service entrances',
    'Renewable energy facility utility interconnection',
    'Mining portal substations — utility point of delivery',
    'Multi-tenant commercial and industrial campuses',
  ],
  relatedTypes: [
    { name: 'Low Voltage Switchgear', sub: 'UL 1558 • Up to 600 V', href: '/products/switchgear/low-voltage' },
    { name: 'Metal-Clad Medium Voltage', sub: 'IEC 62271-200 • 5–29 kV', href: '/products/switchgear/metal-clad' },
    { name: 'Metal-Enclosed Load-Interrupter', sub: 'CSA C22.2 • 5–27.6 kV', href: '/products/switchgear/load-interrupter' },
  ],
  faqs: [
    {
      q: 'What does ESA-accepted mean for service entrance switchgear?',
      a: 'The Ontario Electrical Safety Authority (ESA) must approve electrical equipment installed in Ontario. For service entrance switchgear, this means the layout, labeling, metering access, and protection relay settings must meet ESA requirements and be accepted by the local authority having jurisdiction (AHJ) before energization.',
    },
    {
      q: 'Can you coordinate the protection relay settings with our utility?',
      a: 'Yes — we provide relay coordination studies and setting files, and our team can interface directly with the utility (Hydro One, Alectra, and others) to obtain protection setting approvals as part of the project scope.',
    },
    {
      q: 'What documentation is provided with the service entrance switchgear?',
      a: 'We provide a complete documentation package: as-built drawings, relay setting records, CT/PT test reports, primary injection test results, insulation resistance records, and a commissioning sign-off checklist — formatted for utility inspection.',
    },
  ],
  quoteItems: [
    'Utility name and service voltage class',
    'Required CT/PT ratios and metering accuracy class',
    'Main breaker type (ACB, VCB) and rating',
    'Protection relay functions and SCADA protocol',
    'Indoor or outdoor; single or double-ended',
    'Timeline and local AHJ coordination required',
  ],
}

export const metadata = {
  title: 'Service-Entrance Rated Switchgear | Candron Energy',
  description: 'CSA and ESA-accepted service entrance switchgear with revenue metering and utility coordination. Built in Toronto, Ontario.',
}

export default function ServiceEntrancePage() {
  return <ProductTypePage {...data} />
}
