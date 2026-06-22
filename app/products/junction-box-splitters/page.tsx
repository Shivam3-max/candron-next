import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  typeName: 'Power Junction Boxes & Splitters',
  eyebrow: 'CSA C22.2 • UL Listed • LV & MV',
  subtitle: 'Industrial power junction boxes and splitters for organized, safe, and efficient power distribution in oil & gas, mining, manufacturing, and utility applications.',
  heroImage: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200',
  badges: ['LV to 35 kV', 'NEMA Rated', 'Weatherproof & Explosion-Proof', 'CSA / UL Listed'],
  kpis: [
    { value: 'Up to 35 kV', label: 'MV Rated' },
    { value: 'NEMA 3R / 4X', label: 'Enclosure' },
    { value: 'LV & MV', label: 'Voltage Range' },
    { value: 'CSA / UL', label: 'Certified' },
  ],
  overviewTitle: 'Custom Junction Boxes & Splitters for Industrial Power',
  overviewText: 'Our power junction boxes and splitters provide a central, organized connection point for distributing power from a single source to multiple circuits or loads. Built to withstand extreme temperatures, moisture, corrosion, and mechanical stress, they are engineered for oil & gas, mining, manufacturing, and utility environments where reliability is non-negotiable.',
  overviewPoints: [
    'LV junction boxes: up to 1,000 V — compact, multiple connection points',
    'MV junction boxes: 1 kV to 35 kV — NEMA-rated, corrosion-resistant enclosures',
    'Power splitters: efficient distribution from a single source to multiple outputs',
    'Weatherproof (NEMA 3R / 4X) and explosion-proof (Class I Div 1 / 2) options',
    'Door limit switches for upstream breaker trip on door access',
    'Custom gland plates, busbar sizing, and lug selection per cable schedule',
  ],
  features: [
    'Main copper busbar — pre-drilled for mechanical or compression lugs',
    'Ground busbar with multiple landing points',
    'Voltage-rated insulator standoffs per NEMA spacing requirements',
    'Non-ferrous aluminum gland plates — top and bottom cable entry',
    'Plastic insulation barriers between voltage sections',
    'Door limit switch — trips upstream breaker when door is opened live',
    'Drain breather for moisture management in outdoor enclosures',
    'IR windows for thermographic inspection without opening door',
    'NEMA 12 (indoor) or NEMA 4X (outdoor / corrosive) standard',
  ],
  upgrades: [
    'Posi Pin connectors — hot-stick operable with visible open-air isolation gap',
    'Safety ground check mechanism — confirms de-energization before access',
    'Explosion-proof enclosure (Class I Div 1, Zone 1 IECEx)',
    'Fibreglass enclosure for highly corrosive environments',
    'International Orange or custom RAL colour-coded paint',
    'Compression lugs with torque indicator strips for field connection',
    'Oversized busbar for high-current cable splicing',
    'Third-party witnessed inspection and FAT',
  ],
  specRows: [
    { label: 'LV Rating', value: 'Up to 1,000 V AC' },
    { label: 'MV Rating', value: '1 kV to 35 kV (common: 5 kV, 8 kV, 15 kV)' },
    { label: 'Bus Material', value: 'Copper with 2-hole NEMA pads (standard)' },
    { label: 'Enclosure Rating', value: 'NEMA 12 (indoor), NEMA 3R (rainproof), NEMA 4X (watertight)' },
    { label: 'Enclosure Material', value: 'Painted steel, stainless steel 304 / 316, fibreglass' },
    { label: 'Gland Plates', value: 'Non-ferrous aluminum (standard), stainless steel option' },
    { label: 'Insulators', value: 'Voltage-rated standoff insulators per NEMA phase spacing' },
    { label: 'Safety Interlock', value: 'Door limit switch wired to upstream trip coil (standard)' },
    { label: 'Lugs', value: 'Mechanical or compression (Burndy, Ilsco) — site-specific sizing' },
    { label: 'Standards', value: 'CSA C22.2, UL Listed, NEMA standards' },
    { label: 'Lead Time', value: '3–6 weeks from approved cable schedule' },
  ],
  standards: [
    { name: 'CSA C22.2', desc: 'Canadian electrical equipment standard for junction box assemblies', logo: '/images/csa.png' },
    { name: 'UL Listed', desc: 'Component UL listing for enclosures, lugs, and insulators', logo: null },
    { name: 'NEMA Standards', desc: 'Environmental enclosure rating — Types 1, 3R, 4, 4X, 12', logo: null },
    { name: 'IEEE C37.20.3', desc: 'Metal-enclosed interrupter switchgear — applied to MV JBs', logo: '/images/IEEE.png' },
    { name: 'CSA C22.2 No. 213', desc: 'Class I, Division 2 hazardous-area installations standard', logo: '/images/csa.png' },
    { name: 'NETA ATS', desc: 'Acceptance testing specifications for commissioning and verification', logo: '/images/neta.svg' },
  ],
  applications: [
    'Oil & gas wellsite and pipeline power distribution nodes',
    'Mining site cable splice and distribution junction points',
    'Industrial manufacturing power feed transition points',
    'Utility underground cable splice enclosures',
    'Renewable energy (solar / wind) AC cable junction points',
    'Water and wastewater treatment plant cable distribution boxes',
    'Marine and port shore power distribution',
    'Skid-mounted equipment power feed and distribution',
  ],
  relatedTypes: [
    { name: 'MV Switchgear', sub: '1–36 kV Control & Protection', href: '/products/mv-switchgear' },
    { name: 'LV Switchgear', sub: 'Up to 1000 V Distribution', href: '/products/lv-switchgear' },
    { name: 'Switchboards', sub: 'LV Power Distribution', href: '/products/switchboards' },
  ],
  faqs: [
    {
      q: 'What is the difference between a junction box and a power splitter?',
      a: 'A junction box provides a central enclosure for splicing or connecting multiple cables at a common busbar. A power splitter takes a single input cable and distributes it to multiple output circuits with individual lugs or terminals per output. In practice, many units serve both functions and are custom-designed per the cable schedule.',
    },
    {
      q: 'Can junction boxes be used in hazardous (classified) areas?',
      a: 'Yes. We build Class I, Division 1 (explosion-proof) and Division 2 junction boxes for oil & gas, mining, and chemical plant environments. Division 1 enclosures use CSA / UL-certified explosion-proof housings and conduit fittings. Division 2 units can use standard industrial enclosures with appropriate seals and wiring methods.',
    },
    {
      q: 'What is the door limit switch safety feature?',
      a: 'A door limit switch is a contact inside the junction box that detects when the door is opened. It is wired to the trip coil of the upstream circuit breaker or load break switch — opening the door while the box is energized automatically trips the upstream breaker, de-energizing the junction box before personnel can access the busbars.',
    },
    {
      q: 'Can Posi Pin connectors be used for visual isolation?',
      a: 'Yes. Posi Pin connectors are hot-stick operable and provide a visible open-air gap between the cable and the busbar when disconnected — giving a visual confirmation of isolation without opening the upstream breaker. They are commonly specified for 5 kV and 8 kV mining and oil & gas applications.',
    },
  ],
  quoteItems: [
    'Voltage rating (LV up to 1 kV, or MV rating in kV)',
    'Cable schedule (number of cables, conductor size, entry direction)',
    'Busbar current rating and size required',
    'Enclosure type (NEMA rating, material — steel, SS, fibreglass)',
    'Safety interlock requirements (door limit switch, ground check)',
    'Hazardous area classification (Div 1 / Div 2, Zone 1 / 2) if applicable',
  ],
}

export const metadata = {
  title: 'Power Junction Boxes & Splitters | Candron Energy',
  description: 'Custom industrial power junction boxes and splitters — LV up to 1,000 V and MV up to 35 kV. Weatherproof, explosion-proof, and NEMA-rated. Built in Toronto, Ontario.',
}

export default function JunctionBoxSplittersPage() {
  return <ProductTypePage {...data} />
}
