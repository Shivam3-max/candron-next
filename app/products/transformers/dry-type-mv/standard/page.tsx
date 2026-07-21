import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Standard MV Dry-Type Transformer',
  description: 'Vacuum pressure impregnated (VPI) medium voltage dry-type transformers from 300 kVA to 20 MVA at 2.4 kV to 35 kV. IEEE C57.12.01 and CSA certified.',
}

export default function StandardMVDryTypePage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="MV Dry-Type Transformers"
      categoryHref="/products/transformers/dry-type-mv"
      typeName="Standard MV Dry-Type Transformer"
      eyebrow="VPI Dry-Type — 2.4 kV to 35 kV"
      subtitle="Vacuum pressure impregnated dry-type transformers for industrial, utility, and commercial applications requiring medium-voltage ratings without oil. From 300 kVA to 20 MVA at 2.4 kV to 35 kV primary."
      heroImage="/images/tx-placeholder.svg"
      badges={['300 kVA – 20 MVA', '2.4 kV – 35 kV Primary', 'VPI Construction', 'IEEE C57.12.01', 'CSA Certified']}
      kpis={[
        { value: '20 MVA', label: 'Max Rating' },
        { value: '35 kV', label: 'Max Primary' },
        { value: 'VPI', label: 'Construction' },
        { value: 'Class F / H', label: 'Insulation' },
      ]}
      overviewTitle="Oil-Free Medium Voltage for Indoor Installation"
      overviewText="VPI (vacuum pressure impregnated) dry-type transformers use a resin-impregnated insulation system to eliminate the fire risk and environmental concerns associated with liquid-filled units at medium voltage levels. They are used wherever liquid-filled units cannot be installed inside buildings — substations adjacent to occupied spaces, multi-storey industrial facilities, and below-grade electrical rooms."
      overviewPoints={[
        'VPI (vacuum pressure impregnated) insulation system for solid, void-free windings',
        'Class F (155°C) or Class H (180°C) insulation options',
        'Primary voltages from 2.4 kV to 35 kV with multi-ratio taps',
        'Secondary voltages from 120 V to 15 kV',
        'Indoor IP21 or outdoor IP33 enclosures',
        'No oil — no spill containment or fire suppression required',
      ]}
      features={[
        'VPI winding impregnation — multiple vacuum/pressure cycles',
        'Grain-oriented silicon steel core (step-lap construction)',
        'Class F or Class H insulation system',
        'Primary taps: ±5% (2 FCAN, 2 FCBN) standard',
        'IP21 ventilated enclosure standard (IP33 / IP44 optional)',
        'Copper winding conductors (standard)',
        'Core earthing and case earthing provisions',
        'PT100 winding temperature sensors (standard on units over 2 MVA)',
      ]}
      upgrades={[
        'Class H (180°C) insulation upgrade from standard Class F',
        'IP33 or IP44 higher protection enclosure',
        'Outdoor weatherproof canopy for rooftop installation',
        'Forced air cooling (AF) for higher continuous rating',
        'Extended primary tap range (±7.5%, ±10%)',
        'PT100 sensors with remote temperature monitoring module',
        'Surge arresters on primary bushings',
        'On-load tap changer (LTC) for voltage regulation',
      ]}
      specRows={[
        { label: 'kVA / MVA Range', value: '300 kVA – 20 MVA' },
        { label: 'Primary Voltage (HV)', value: '2.4 kV – 35 kV' },
        { label: 'Secondary Voltage (LV)', value: '120 V – 15 kV (custom available)' },
        { label: 'Winding Configuration', value: 'Three-phase (two-winding standard)' },
        { label: 'Construction', value: 'VPI (vacuum pressure impregnated)' },
        { label: 'Insulation Class', value: 'Class F (155°C) / Class H (180°C)' },
        { label: 'Temperature Rise', value: '80°C or 115°C (Class F) / 100°C or 125°C (Class H)' },
        { label: 'Cooling', value: 'AN (air natural) standard; AF optional' },
        { label: 'HV Taps', value: '±5% (2 × 2.5% FCAN, 2 × 2.5% FCBN)' },
        { label: 'Enclosure', value: 'IP21 standard; IP33 / IP44 optional' },
        { label: 'Primary Standard', value: 'IEEE C57.12.01 / IEC 60076-11' },
        { label: 'Canadian Certification', value: 'CSA C22.2' },
        { label: 'Frequency', value: '60 Hz' },
      ]}
      standards={[
        { name: 'IEEE C57.12.01', desc: 'Standard for dry-type distribution and power transformers', logo: '/images/IEEE.png' },
        { name: 'IEC 60076-11', desc: 'Dry-type transformers international standard', logo: null },
        { name: 'CSA C22.2', desc: 'Canadian electrical certification standard', logo: '/images/csa.png' },
        { name: 'ANSI C57.12.01', desc: 'American National Standard for dry-type transformers', logo: '/images/ansi.png' },
        { name: 'NEMA ST-20', desc: 'Dry-type transformers performance standard', logo: null },
      ]}
      applications={[
        'Industrial plant main power stations',
        'Commercial building medium voltage switchgear supply',
        'Mining and processing plant power distribution',
        'Data centre utility-to-UPS step-down',
        'Wind turbine step-up transformers (MV collection)',
        'Marine and offshore platform installations',
        'Tunnel and underground facility power',
        'Pulp, paper, and chemical process facilities',
      ]}
      relatedTypes={[
        { name: 'Cast Coil Transformer', sub: '300 kVA – 30 MVA', href: '/products/transformers/dry-type-mv/cast-coil' },
        { name: 'Power Substation Transformer', sub: '1 MVA – 100+ MVA', href: '/products/transformers/substation/power' },
        { name: 'Standard LV Dry-Type', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/dry-type-lv/standard' },
        { name: 'Three-Phase Padmount', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/padmount/three-phase' },
      ]}
      faqs={[
        {
          q: 'What does VPI (vacuum pressure impregnation) mean?',
          a: 'VPI is a manufacturing process where the wound coils are placed in a vacuum chamber, then submerged in a liquid resin, and pressurized — forcing the resin into every void within the winding insulation. After curing, the result is a solid, void-free winding with superior dielectric strength, moisture resistance, and mechanical robustness compared to dip-and-bake construction.',
        },
        {
          q: 'When should I choose VPI over cast coil construction?',
          a: 'VPI is appropriate for most indoor industrial and commercial applications where the environment is reasonably clean and dry. Cast coil should be specified when the transformer will be installed in a coastal environment, chemical plant, tropical climate, mining application, or any setting where moisture, condensation, or corrosive chemicals are present. If in doubt about your environment, our engineering team can help you select the right construction.',
        },
        {
          q: 'What enclosure IP rating should I specify?',
          a: 'IP21 is the standard indoor ventilated rating, suitable for protected indoor electrical rooms. IP33 provides protection against rainwater and is suitable for outdoor canopied installations or spaces exposed to occasional water spray. IP44 (often called sealed) provides enhanced particle and water protection for harsh indoor environments. Full outdoor weatherproof enclosures are also available.',
        },
      ]}
      quoteItems={[
        'Required kVA / MVA and voltage ratio',
        'Primary voltage (HV) and BIL',
        'Secondary voltage (LV) and connection',
        'Insulation class preference (Class F or H)',
        'Enclosure IP rating (IP21, IP33, IP44)',
        'Forced air cooling requirement (AN or AF)',
        'Temperature sensor and monitoring requirements',
        'Applicable standards (IEEE/CSA or IEC)',
      ]}
    />
  )
}
