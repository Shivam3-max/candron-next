import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchboards',
  categoryHref: '/products/switchboards',
  typeName: 'Utility-Approved Switchboards',
  eyebrow: 'UL 891 • ESA • Alectra / Hydro One Approved',
  subtitle: 'Revenue metering compartments with sealable CT/PT sections and inspection-ready layouts accepted by Ontario utilities. Designed for Alectra, Hydro One, Toronto Hydro, and other LDC requirements.',
  heroImage: '/images/products/switchboards/utility-approved.jpg',
  badges: ['Utility Metering', 'Lockable CT/PT', 'ESA Accepted', 'Hydro One / Alectra'],
  kpis: [
    { value: 'Utility-Spec', label: 'Layout' },
    { value: '600 V', label: 'Voltage' },
    { value: 'Revenue Grade', label: 'Metering Accuracy' },
    { value: 'ESA Approved', label: 'Compliance' },
  ],
  overviewTitle: 'Revenue Metering to Local Utility Standards',
  overviewText: 'Utility-approved switchboards are designed to meet the exact requirements of local distribution companies (LDCs) — from the physical layout and compartment accessibility to the CT/PT ratio, meter type, and sealability. We coordinate directly with Alectra, Hydro One, Toronto Hydro, and other utilities to ensure approval before delivery.',
  overviewPoints: [
    'Utility-specified CT/PT ratios and metering compartment layout',
    'Sealable CT/PT compartment with locked covers and viewing window',
    'Revenue-grade metering: accuracy class 0.2S or better',
    'Utility inspector access without de-energizing the facility',
    'Separate metering section from distribution section',
    'As-built drawings, test reports, and utility submission package',
  ],
  features: [
    'Utility-specified CT/PT section (lockable, sealable)',
    'Revenue-grade kWh meter — approved model per LDC list',
    'Sealable viewing window for meter reading',
    'Utility inspector access clearances per LDC standards',
    'Main breaker below or above metering section as required',
    'Separate metering section with lockable utility door',
    'CT/PT rated for accuracy class per ANSI C12 / IEC 62053',
    'Nameplates and warning labels per ESA and utility requirements',
    'Grounding and bonding per local service requirements',
  ],
  upgrades: [
    'Demand and interval metering (15-min interval data logging)',
    'Advanced metering infrastructure (AMI) compatible meter',
    'Optical fiber or cellular communications for remote meter reading',
    'Sub-metering sections for multi-tenant billing',
    'Power quality monitoring (THD, unbalance, flicker)',
    'SCADA gateway for building energy management integration',
    'Witnessed factory acceptance testing (FAT)',
    'Coordination with utility for pre-energization inspection',
  ],
  specRows: [
    { label: 'Voltage', value: '120/208 V, 277/480 V, 347/600 V — to utility specification' },
    { label: 'CT Ratio', value: 'Per utility specification (e.g., 200:5, 400:5, 800:5)' },
    { label: 'PT Ratio', value: 'Per utility specification (e.g., 120:1 or other)' },
    { label: 'Metering Accuracy', value: 'Class 0.2S (IEC) or 0.3 (ANSI C12) revenue grade' },
    { label: 'Meter Type', value: 'LDC-approved revenue meter (Itron, Landis+Gyr, Elster)' },
    { label: 'Sealability', value: 'Padlock provision on CT/PT door and meter cover' },
    { label: 'Utility Access', value: 'Lockable compartment with inspector access without trip' },
    { label: 'Bus Material', value: 'Copper, silver-plated contacts' },
    { label: 'Standards', value: 'UL 891, CSA C22.2, ESA, ANSI C12, utility service requirements' },
    { label: 'Lead Time', value: '4–8 weeks from utility approval' },
  ],
  standards: [
    { name: 'UL 891', desc: 'U.S. deadfront switchboard standard', logo: null },
    { name: 'CSA C22.2 No. 29', desc: 'Canadian switchboard construction and performance standard', logo: '/images/csa.png' },
    { name: 'ANSI C12 Series', desc: 'Electricity metering accuracy standards — revenue grade equipment', logo: '/images/ansi.png' },
    { name: 'IEC 62053', desc: 'Electricity metering equipment standards — accuracy classes', logo: '/images/IEC.png' },
    { name: 'ESA Ontario', desc: 'Ontario Electrical Safety Authority inspection and approval requirements', logo: null },
    { name: 'LDC Requirements', desc: 'Alectra, Hydro One, Toronto Hydro, and other Ontario LDC specifications', logo: null },
  ],
  applications: [
    'Commercial plaza multi-tenant metering',
    'Industrial campus tenant sub-metering',
    'Mixed-use development utility points of supply',
    'New subdivision electrical service entrance',
    'High-rise condo and apartment utility metering',
    'Data centre utility interconnection metering',
    'Renewable energy facility export metering',
    'Government building utility service point',
  ],
  relatedTypes: [
    { name: 'Main Breaker Switchboards', sub: 'Single Main • Up to 4000 A', href: '/products/switchboards/main-breaker' },
    { name: 'Main-Tie-Main Switchboards', sub: 'N+1 Redundancy', href: '/products/switchboards/main-tie-main' },
    { name: 'Distribution Switchboards', sub: 'Industrial & Commercial', href: '/products/switchboards/distribution' },
  ],
  faqs: [
    {
      q: 'How do you ensure the switchboard will be accepted by Hydro One or Alectra?',
      a: 'We request the utility\'s current service requirements document and design the CT/PT section, metering compartment, and switchboard layout to match exactly. We can also submit drawings for pre-approval by the LDC before manufacturing and arrange a pre-energization inspection at our facility or site.',
    },
    {
      q: 'Can the utility read the meter without entering the customer space?',
      a: 'Yes. The utility CT/PT and meter section is designed with an access door accessible from the utility corridor or exterior, separate from the customer distribution section. The meter reading window allows read without opening any cover.',
    },
    {
      q: 'What information do you need to design a utility-approved switchboard?',
      a: 'Utility name, service voltage, maximum demand (kVA), LDC-specified CT/PT ratios, preferred meter type, and any physical access requirements. The utility service requirements document is the definitive reference — we request this directly if needed.',
    },
  ],
  quoteItems: [
    'Utility/LDC name and service voltage',
    'Maximum demand (kVA) for CT sizing',
    'CT/PT ratios if already specified by utility',
    'Meter type preferred by LDC',
    'Single-line diagram showing metering point',
    'Site address and ESA permit required',
  ],
}

export const metadata = {
  title: 'Utility-Approved Switchboards | Candron Energy',
  description: 'Revenue metering switchboards designed to Alectra, Hydro One, and Ontario LDC requirements. UL 891, CSA, and ESA compliant. Built in Toronto.',
}

export default function UtilityApprovedPage() {
  return <ProductTypePage {...data} />
}
