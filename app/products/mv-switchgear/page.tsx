import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchgear',
  categoryHref: '/products/switchgear',
  typeName: 'Medium Voltage Switchgear',
  eyebrow: 'CSA C22.2 • UL 508A • 1 kV to 36 kV',
  subtitle: 'Custom MV switchgear solutions for control, protection, and distribution of power systems from 1 kV to 36 kV in industrial, utility, and commercial applications.',
  heroImage: 'https://images.pexels.com/photos/18468536/pexels-photo-18468536.jpeg?auto=compress&cs=tinysrgb&w=1200',
  badges: ['1–36 kV', 'Metal-Clad', 'Pad-Mounted', 'Arc-Fault Rated'],
  kpis: [
    { value: '1–36 kV', label: 'Voltage Range' },
    { value: 'Up to 4000 A', label: 'Current Rating' },
    { value: 'Arc-Rated', label: 'Construction' },
    { value: 'CSA / UL', label: 'Certified' },
  ],
  overviewTitle: 'MV Switchgear Built for Industrial Power Systems',
  overviewText: 'Medium Voltage Switchgear controls, protects, and isolates electrical circuits in power systems operating from 1 kV to 36 kV. Our custom MV switchgear is engineered to your site — from single-cell outdoor pad-mounted units to multi-section metal-clad lineups with protection relays, arc flash mitigation, and SCADA integration.',
  overviewPoints: [
    'Voltage range 1 kV to 36 kV — custom rated per project',
    'Metal-clad (draw-out VCBs) and metal-enclosed (load-break/fused) types',
    'Pad-mounted outdoor enclosures with NEMA 3R or IP54+ rating',
    'Protection relays: 50/51, 27/59, 67, 81, 87 — fully integrated',
    'PT compartments with revenue metering cubicles (CT/PT)',
    'Forced-air heaters for moisture control in outdoor installations',
  ],
  features: [
    'Vacuum circuit breakers (VCBs) with draw-out isolation',
    'Load break switches with current-limiting fuses',
    'Full compartmentalization — breaker, bus, cable, control',
    'Arc fault protection rated (ARST) enclosures',
    'Sloped roof with double doors for outdoor sections',
    'Epoxy powder coating (C5M) with stainless steel hardware',
    'Low voltage control compartment per section',
    'CPT (control power transformer) per section',
    'NGR (neutral grounding resistor) relay integration',
  ],
  upgrades: [
    'Motor-operated racking mechanism for draw-out breakers',
    'Partial discharge (PD) monitoring system',
    'IEC 61850 / SCADA gateway per section',
    'Remote racking device (NFPA 70E arc flash compliance)',
    'Battery-backed UPS for control power',
    'GPS time synchronization for protection relays',
    'Redundant protection relay (primary / backup scheme)',
    'Third-party commissioning and relay coordination study',
  ],
  specRows: [
    { label: 'Voltage Range', value: '1 kV to 36 kV (common: 5 kV, 13.8 kV, 15 kV, 27.6 kV)' },
    { label: 'Current Rating', value: '600 A to 4000 A continuous' },
    { label: 'Short Circuit Rating', value: 'Up to 50 kA symmetrical' },
    { label: 'Breaker Type', value: 'Vacuum circuit breaker (VCB), draw-out or fixed' },
    { label: 'Switch Type', value: 'Load break switch (LBS) with current-limiting fuses' },
    { label: 'Enclosure Type', value: 'Metal-clad (indoor), pad-mounted (outdoor NEMA 3R / 4X)' },
    { label: 'Control Voltage', value: '120 VAC or 125 VDC with CPT / battery backup' },
    { label: 'Metering', value: 'CT/PT compartment, revenue-grade meters available' },
    { label: 'Paint Finish', value: 'C5M epoxy powder coat; stainless steel hardware standard' },
    { label: 'Standards', value: 'CSA C22.2, UL 508A, IEEE C37.20.2/.3, IEC 62271' },
    { label: 'Lead Time', value: '8–16 weeks from approved drawings' },
  ],
  standards: [
    { name: 'CSA C22.2', desc: 'Canadian electrical equipment standard for MV switchgear assemblies', logo: '/images/csa.png' },
    { name: 'UL 508A', desc: 'Industrial control panel standard applied to LV control sections', logo: null },
    { name: 'IEEE C37.20.2', desc: 'Standard for metal-clad and station-type cubicle switchgear', logo: '/images/IEEE.png' },
    { name: 'IEEE C37.20.3', desc: 'Standard for metal-enclosed interrupter switchgear', logo: '/images/IEEE.png' },
    { name: 'IEC 62271', desc: 'High-voltage switchgear and controlgear standards series', logo: '/images/IEC.png' },
    { name: 'NETA ATS', desc: 'Acceptance testing specifications for commissioning and verification', logo: '/images/neta.svg' },
  ],
  applications: [
    'Industrial plant feeder and motor protection',
    'Oil & gas compressor and pump station switchgear',
    'Utility substation distribution switchgear',
    'Power generation plant auxiliary systems',
    'Mining site electrical distribution',
    'Renewable energy (wind / solar) collector substation',
    'Commercial campus and data centre main distribution',
    'Municipal water and wastewater treatment facilities',
  ],
  relatedTypes: [
    { name: 'Low Voltage Switchgear', sub: 'Up to 1000 V', href: '/products/lv-switchgear' },
    { name: 'Switchboards', sub: 'LV Power Distribution', href: '/products/switchboards' },
    { name: 'Junction Box & Splitters', sub: 'LV & MV Power Distribution', href: '/products/junction-box-splitters' },
  ],
  faqs: [
    {
      q: 'What is the difference between metal-clad and metal-enclosed switchgear?',
      a: 'Metal-clad switchgear uses draw-out vacuum circuit breakers with full compartmentalization — the breaker, bus, and cable compartments are all separated by metal barriers. Metal-enclosed (load-interrupter) switchgear uses fixed load break switches and current-limiting fuses without draw-out capability, making it more compact and cost-effective for simpler feeder applications.',
    },
    {
      q: 'Can medium voltage switchgear be installed outdoors?',
      a: 'Yes — we build pad-mounted outdoor switchgear rated NEMA 3R (rainproof) or NEMA 4X (watertight and corrosion-resistant). Outdoor enclosures include sloped roofs, sealed cable compartments, forced-air heaters, and epoxy powder coating for long-term weathering resistance.',
    },
    {
      q: 'What protection relays do you typically include?',
      a: 'Protection relay selection depends on the application and system study. Common functions include overcurrent (50/51), voltage (27/59), frequency (81), directional (67), differential (87), and ground fault protection. We coordinate with the system engineer to specify relays appropriate for the fault current levels and protection scheme.',
    },
    {
      q: 'Can your MV switchgear be customized for non-standard voltage ratings?',
      a: 'Yes. We build to standard ratings (5 kV, 15 kV, 27.6 kV) and non-standard voltage levels (4.16 kV, 13.8 kV, 34.5 kV). All insulation, bus, and component ratings are selected for the specific system voltage and available fault current.',
    },
  ],
  quoteItems: [
    'System voltage (kV) and nominal current rating (A)',
    'Available fault current (kA symmetrical)',
    'Number of sections and breaker / switch configuration',
    'Indoor or outdoor (pad-mounted) installation',
    'Protection relay requirements (functions, make / model preference)',
    'SCADA / metering integration requirements',
  ],
}

export const metadata = {
  title: 'Medium Voltage Switchgear | Candron Energy',
  description: 'Custom MV switchgear from 1 kV to 36 kV — metal-clad, pad-mounted, and metal-enclosed configurations. CSA and UL certified. Built in Toronto, Ontario.',
}

export default function MVSwitchgearPage() {
  return <ProductTypePage {...data} />
}
