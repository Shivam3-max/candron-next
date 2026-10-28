/** Division 26 guide specification sections. The .docx files are built by scripts/resources/build_div26_specs.py. */

export interface SpecSection {
  number: string
  title: string
  file: string
  covers: string
  standards: string[]
  options: string[]
  product: { label: string; href: string }
}

const DIR = '/downloads/specs'

export const SPEC_SECTIONS: SpecSection[] = [
  {
    number: '26 12 19',
    title: 'Pad-Mounted, Liquid-Filled, Medium-Voltage Transformers',
    file: `${DIR}/26-12-19-pad-mounted-liquid-filled-transformers.docx`,
    covers: 'Three-phase padmounts, loop or radial feed, 75 to 5,000 kVA.',
    standards: ['CSA C2.1', 'CSA C227.4', 'CSA C802.1', 'IEEE C57.12.34'],
    options: ['Mineral oil or natural ester', 'Dead-front or live-front', 'Bay-O-Net and current-limiting fusing', 'Stainless cabinet for coastal sites'],
    product: { label: 'Padmount transformers', href: '/products/transformers/liquid-filled' },
  },
  {
    number: '26 13 13',
    title: 'Medium-Voltage Circuit Breaker Switchgear (Metal-Clad)',
    file: `${DIR}/26-13-13-medium-voltage-metal-clad-switchgear.docx`,
    covers: 'Draw-out vacuum breaker switchgear, 5 to 38 kV, indoor or outdoor.',
    standards: ['CSA C22.2 No. 31', 'IEEE C37.20.2', 'IEEE C37.20.7', 'IEEE C37.06'],
    options: ['Arc-resistant Type 2B', 'Remote racking', 'Relay functions and protocol', 'Battery and charger'],
    product: { label: 'Medium-voltage switchgear', href: '/products/switchgear' },
  },
  {
    number: '26 22 13',
    title: 'Low-Voltage Distribution Transformers (Dry-Type)',
    file: `${DIR}/26-22-13-low-voltage-dry-type-transformers.docx`,
    covers: 'Ventilated 600 V class dry-type transformers, 15 to 1,000 kVA.',
    standards: ['CSA C9', 'CSA C22.2 No. 47', 'CSA C802.2', 'IEEE C57.110'],
    options: ['80, 115 or 150 °C rise', 'K-factor rating', 'Electrostatic shield', 'Indoor or Type 3R enclosure'],
    product: { label: 'Dry-type transformers', href: '/products/transformers/dry-type' },
  },
  {
    number: '26 24 13',
    title: 'Switchboards',
    file: `${DIR}/26-24-13-switchboards.docx`,
    covers: 'Service-entrance and distribution switchboards, 600 V, 400 to 4,000 A.',
    standards: ['CSA C22.2 No. 244', 'UL 891', 'CSA C22.2 No. 5', 'Measurement Canada'],
    options: ['Fully rated 65 or 100 kA', 'Arc-energy reduction switch', 'Utility metering compartment', 'Integrated transformers and panels'],
    product: { label: 'Switchboards', href: '/products/switchboards' },
  },
]
