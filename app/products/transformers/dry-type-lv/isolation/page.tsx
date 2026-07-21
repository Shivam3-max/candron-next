import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Isolation Transformer',
  description: 'Electrostatic shielded isolation transformers for medical facilities, data centres, and sensitive laboratory environments. 0.5 kVA to 1,000 kVA. UL 1561 and CSA certified.',
}

export default function IsolationTransformerPage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="LV Dry-Type Transformers"
      categoryHref="/products/transformers/dry-type-lv"
      typeName="Isolation Transformer"
      eyebrow="Electrostatic Shielded — Medical / IT / Lab"
      subtitle="Faraday-shielded dry-type isolation transformers for noise suppression, ground loop elimination, and sensitive equipment protection. Available from 0.5 kVA to 1,000 kVA for medical, data, and laboratory environments."
      heroImage="/images/tx-placeholder.svg"
      badges={['0.5 kVA – 1,000 kVA', 'Faraday Shielded', 'UL 1561 Listed', 'Medical Grade Available', 'CSA Certified']}
      kpis={[
        { value: '1,000 kVA', label: 'Max Rating' },
        { value: '120 dB', label: 'Noise Attenuation' },
        { value: 'Class H', label: 'Insulation' },
        { value: 'UL / CSA', label: 'Listed & Certified' },
      ]}
      overviewTitle="Pure Power for Sensitive Environments"
      overviewText="Isolation transformers provide galvanic separation between the power supply and the load, breaking ground loops and attenuating common-mode electrical noise. The electrostatic (Faraday) shield between primary and secondary windings intercepts and directs capacitively coupled interference to ground rather than allowing it to pass to the secondary circuit — critical in environments where electrical noise affects sensitive instruments, communications equipment, or medical devices."
      overviewPoints={[
        'Electrostatic (Faraday) shield between primary and secondary windings',
        'Galvanic isolation between supply and load circuits',
        'Common-mode noise attenuation — typically 100–120 dB',
        'Ground loop elimination for audio and data system protection',
        'Independently configurable primary and secondary voltages',
        '1:1 ratio standard; other ratios available',
      ]}
      features={[
        'Single-layer electrostatic (Faraday) shield — grounded',
        'Separate primary and secondary winding bays',
        'Double-shielded option (primary-secondary and inter-winding)',
        'Class H insulation (180°C rated)',
        'NEMA 1 or NEMA 3R enclosure',
        'Primary taps: ±5% (2 × 2.5%)',
        'UL 1561 listed; CSA certified',
        'Copper or aluminum winding conductors',
      ]}
      upgrades={[
        'Double electrostatic shield (primary to shield, shield to secondary)',
        'Medical-grade isolation per UL 60601-1 or IEC 60601-1',
        'K-factor rated winding (K-4 to K-20)',
        'Low capacitance construction for maximum CMR (common mode rejection)',
        '115°C temperature rise for lower operating temperature',
        'Balanced-secondary (centre-tapped) secondary output',
        'NEMA 3R weatherproof outdoor enclosure',
        'Custom primary/secondary voltage combinations',
      ]}
      specRows={[
        { label: 'kVA Range', value: '0.5 kVA – 1,000 kVA' },
        { label: 'Primary Voltage', value: '120 V – 600 V (standard range)' },
        { label: 'Secondary Voltage', value: '120 V – 600 V (1:1 standard; custom ratios available)' },
        { label: 'Shield', value: 'Electrostatic (Faraday) — single or double' },
        { label: 'Noise Attenuation (CMR)', value: '100–120 dB (typical)' },
        { label: 'Winding Configuration', value: 'Single-phase or three-phase' },
        { label: 'Cooling', value: 'Ventilated air-cooled (AN)' },
        { label: 'Winding Material', value: 'Copper (standard) / Aluminum (option)' },
        { label: 'Insulation Class', value: 'Class H (180°C)' },
        { label: 'Temperature Rise', value: '150°C (standard) / 115°C (option)' },
        { label: 'Enclosure', value: 'NEMA 1 or NEMA 3R' },
        { label: 'UL Listing', value: 'UL 1561' },
        { label: 'Canadian Certification', value: 'CSA C22.2 No. 66.2' },
      ]}
      standards={[
        { name: 'UL 1561', desc: 'Dry-type general purpose and power transformers', logo: '/images/ugSolutions.png' },
        { name: 'CSA C22.2 No. 66.2', desc: 'Dry-type transformers — Canadian certification standard', logo: '/images/csa.png' },
        { name: 'NEMA ST-20', desc: 'Dry-type transformers for general applications', logo: null },
        { name: 'IEC 60601-1', desc: 'Medical electrical equipment — safety requirements (medical-grade option)', logo: null },
      ]}
      applications={[
        'Healthcare facilities — operating theatres, ICUs, imaging',
        'Data centres and server room UPS isolation',
        'Laboratory and research instrument power supplies',
        'Recording studios and professional audio installations',
        'Telecommunications switching and radio site power',
        'Sensitive industrial measurement and control systems',
        'Defense and secure facility power systems',
        'Educational and scientific facility electrical distribution',
      ]}
      relatedTypes={[
        { name: 'Standard LV Dry-Type', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/dry-type-lv/standard' },
        { name: 'Standard MV Dry-Type', sub: '300 kVA – 20 MVA', href: '/products/transformers/dry-type-mv/standard' },
        { name: 'Three-Phase Padmount', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/padmount/three-phase' },
      ]}
      faqs={[
        {
          q: 'How does an electrostatic (Faraday) shield work?',
          a: 'An electrostatic shield is a grounded conductive layer placed between the primary and secondary windings. Capacitive coupling between windings normally allows high-frequency electrical noise to pass from primary to secondary. The shield intercepts this capacitively coupled noise and diverts it to ground before it reaches the secondary circuit — achieving common-mode rejection ratios of 100 dB or more.',
        },
        {
          q: 'What is the difference between single and double shielding?',
          a: 'A single Faraday shield is placed between the primary and secondary windings, which provides attenuation of noise from the utility supply. A double shield adds a second conductive layer inside the secondary winding, providing additional rejection of noise injected from the load side back toward the supply. Double shielding is recommended for bidirectional noise isolation between the supply and load.',
        },
        {
          q: 'Can isolation transformers be used in medical facilities?',
          a: 'Yes, but medical-grade isolation transformers for patient care areas (line isolation monitors in operating theatres and wet procedure rooms) must meet IEC 60601-1 or the applicable national electrical code requirements for medical grade isolation. These require specific insulation levels, ground fault monitoring, and leakage current limits. Contact our engineering team to discuss your specific healthcare application.',
        },
        {
          q: 'What is a centre-tapped (balanced) secondary and when is it needed?',
          a: 'A centre-tapped secondary provides a neutral midpoint between the two secondary terminals, creating balanced ±half-voltage outputs relative to the grounded neutral. This is commonly used in medical isolation panels, audio studio power distribution, and some laboratory supply systems where balanced power reduces ground referenced noise on both power conductors simultaneously.',
        },
      ]}
      quoteItems={[
        'Required kVA and phase (single or three-phase)',
        'Primary voltage and connection',
        'Secondary voltage (1:1 or custom ratio)',
        'Shielding requirement (single or double Faraday)',
        'Medical-grade specification requirements (if applicable)',
        'K-factor requirements (if non-linear loads present)',
        'Enclosure type (NEMA 1 or 3R)',
        'Applicable listing (UL, CSA, or both)',
      ]}
    />
  )
}
