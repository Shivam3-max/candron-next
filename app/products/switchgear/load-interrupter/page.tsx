import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Switchgear',
  categoryHref: '/products/switchgear',
  typeName: 'Metal-Enclosed Load-Interrupter Switchgear',
  eyebrow: 'CSA C22.2 • IEEE C37.20.3 • 5–27.6 kV',
  subtitle: 'Compact, weatherproof medium-voltage switchgear for feeder switching and transformer protection. Load-break switches and current-limiting fuses for indoor and outdoor pad or skid installations.',
  heroImage: 'https://images.pexels.com/photos/36695590/pexels-photo-36695590.jpeg?auto=compress&cs=tinysrgb&w=1200',
  badges: ['Load-Break Switches', 'IP54+ Rated', 'Outdoor Weatherproof', 'CSA C22.2'],
  kpis: [
    { value: '5–27.6 kV', label: 'Voltage Class' },
    { value: '600–2000 A', label: 'Switch Rating' },
    { value: '20 kA', label: 'Fault Closing' },
    { value: 'IP54+', label: 'Weatherproofing' },
  ],
  overviewTitle: 'Compact MV Switching for Feeder Distribution',
  overviewText: 'Metal-enclosed load-interrupter switchgear combines load-break switches and current-limiting fuses in a compact, weatherproof enclosure — suitable for pad mounting, skid mounting, or installation in underground vaults and distribution substations.',
  overviewPoints: [
    'Gang-operated or independent load-break switches per section',
    'Current-limiting fuses for transformer and feeder protection',
    'Outdoor NEMA 3R weatherproof enclosure (IP54 or better)',
    'Suitable for pad, skid, or vault installation',
    'Accessible cable termination compartments (elbow type)',
    'IEEE C37.20.3 and CSA C22.2 compliant',
  ],
  features: [
    'Load-break switches — gang or independent operation',
    'Current-limiting fuses for transformer protection',
    'Outdoor weatherproof enclosure (NEMA 3R / IP54)',
    'Accessible elbow-type cable termination compartments',
    'Full-voltage switch ratings (continuous and load-break)',
    'Ground-and-test switch option for safe maintenance',
    'Stainless steel hardware for corrosion resistance',
    'Padlockable switch handles per NFPA 70E',
    'Nameplate and warning labels per ESA requirements',
  ],
  upgrades: [
    'Motor-operated switch actuators (remote SCADA operation)',
    'Fault indicator LEDs with self-resetting capability',
    'Remote monitoring SCADA gateway (Modbus RTU/TCP)',
    'Additional cable termination bay/section',
    'Fuse-saving scheme with upstream recloser coordination',
    'Stainless steel 316L enclosure for marine/coastal environments',
    'Overhead line arresters and wildlife guards',
    'Vault or underground installation package',
  ],
  specRows: [
    { label: 'Voltage Class', value: '5 kV, 15 kV, 25 kV (27.6 kV BIL)' },
    { label: 'Switch Current Rating', value: '200 A, 400 A, 600 A, 900 A, 1200 A' },
    { label: 'Fault Closing Rating', value: 'Up to 20 kA symmetrical (switch-rated)' },
    { label: 'Fuse Type', value: 'Current-limiting (CLF), power, or arc-strangling' },
    { label: 'Enclosure Type', value: 'NEMA 3R standard; NEMA 4X stainless available' },
    { label: 'Installation', value: 'Pad-mount, skid, vault, or surface' },
    { label: 'Cable Termination', value: 'Elbow connectors (200 A or 600 A class)' },
    { label: 'Operating Mechanism', value: 'Manual; motor-operated SCADA option' },
    { label: 'Bus Material', value: 'Copper, tinned contact surfaces' },
    { label: 'Standards', value: 'CSA C22.2, IEEE C37.20.3, IEEE C37.74' },
    { label: 'Lead Time', value: '6–12 weeks typical' },
  ],
  standards: [
    { name: 'CSA C22.2', desc: 'Canadian switchgear standard for MV metal-enclosed assemblies', logo: '/images/csa.png' },
    { name: 'IEEE C37.20.3', desc: 'Metal-enclosed interrupter switchgear — 1 to 38 kV', logo: '/images/IEEE.png' },
    { name: 'IEEE C37.74', desc: 'Load-break switches and current-limiting fuses for underground systems', logo: '/images/IEEE.png' },
    { name: 'ANSI / NEMA', desc: 'Enclosure and equipment ratings for outdoor installations', logo: '/images/ansi.png' },
    { name: 'ESA / AHJ', desc: 'Ontario ESA and authority-having-jurisdiction acceptance', logo: null },
    { name: 'NETA ATS', desc: 'Factory acceptance and field testing specifications', logo: '/images/neta.svg' },
  ],
  applications: [
    'Pad-mounted switching for underground distribution networks',
    'Industrial feeder switching and transformer protection',
    'Renewable energy MV collector switching',
    'Mining surface distribution for feeder sectionalizing',
    'Commercial plaza and campus MV switching',
    'Utility loop schemes and normally-open tie points',
    'Oil field and pipeline station distribution',
    'Transit and rail yard switching',
  ],
  relatedTypes: [
    { name: 'Low Voltage Switchgear', sub: 'UL 1558 • Up to 600 V', href: '/products/switchgear/low-voltage' },
    { name: 'Metal-Clad Medium Voltage', sub: 'IEC 62271-200 • 5–29 kV', href: '/products/switchgear/metal-clad' },
    { name: 'Service-Entrance Rated', sub: 'ESA & Utility-Ready', href: '/products/switchgear/service-entrance' },
  ],
  faqs: [
    {
      q: 'When should I choose load-interrupter switchgear over metal-clad?',
      a: 'Load-interrupter switchgear is simpler, more compact, and cost-effective for applications requiring feeder switching and transformer protection without automatic reclosing or complex protection relay functions. Metal-clad with VCBs is preferred when fault interrupting capability, arc-resistant options, or protective relaying are required.',
    },
    {
      q: 'Can load-interrupter switchgear be installed outdoors?',
      a: 'Yes. Our standard enclosures are NEMA 3R (weatherproof) and can be pad-mounted or skid-mounted in outdoor environments. NEMA 4X stainless steel enclosures are available for coastal, marine, or extreme weather installations.',
    },
    {
      q: 'What is the difference between load-break and fault-interrupting capability?',
      a: 'Load-break switches can interrupt normal load current but are not rated to interrupt fault current. The current-limiting fuses (CLF) in the same compartment handle fault interruption. This combination covers the full range of normal and fault conditions without requiring a circuit breaker.',
    },
  ],
  quoteItems: [
    'Nominal voltage class and number of switch sections',
    'Load-break switch current rating per section',
    'Transformer kVA (for fuse sizing)',
    'Available fault current (kA) at the feeder',
    'Pad-mount, skid, or vault installation',
    'Motor-operator and SCADA requirements',
  ],
}

export const metadata = {
  title: 'Metal-Enclosed Load-Interrupter Switchgear | Candron Energy',
  description: 'CSA C22.2 and IEEE C37.20.3 metal-enclosed load-interrupter switchgear from 5 kV to 27.6 kV. Compact outdoor-rated designs for feeder distribution.',
}

export default function LoadInterrupterPage() {
  return <ProductTypePage {...data} />
}
