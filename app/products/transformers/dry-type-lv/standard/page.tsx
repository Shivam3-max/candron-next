import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Standard LV Dry-Type Transformer',
  description: 'General-purpose ventilated low voltage dry-type transformers from 15 kVA to 2,500 kVA. UL 1561 listed and CSA certified for indoor commercial and industrial distribution.',
}

export default function StandardLVDryTypePage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="LV Dry-Type Transformers"
      categoryHref="/products/transformers/dry-type-lv"
      typeName="Standard LV Dry-Type Transformer"
      eyebrow="Ventilated Indoor Distribution Transformer"
      subtitle="General-purpose ventilated dry-type transformers for commercial buildings, industrial plants, and institutional facilities. UL 1561 listed and CSA certified from 15 kVA to 2,500 kVA."
      heroImage="/images/tx-placeholder.svg"
      badges={['15 kVA – 2,500 kVA', 'UL 1561 Listed', 'CSA Certified', 'Class H Insulation', 'NEMA ST-20']}
      kpis={[
        { value: '2,500 kVA', label: 'Max Rating' },
        { value: '600 V', label: 'Max Primary' },
        { value: '150°C', label: 'Temp Rise (Option)' },
        { value: 'UL / CSA', label: 'Listed & Certified' },
      ]}
      overviewTitle="Safe, Efficient Indoor Power Distribution"
      overviewText="Standard LV dry-type transformers are the workhorse of commercial and light industrial power distribution, stepping down 480 V or 600 V supply voltage to 120/208 V or 120/240 V for general building loads. Ventilated air-cooled design makes them suitable for installation inside electrical rooms, mechanical mezzanines, and above-ceiling spaces without fire suppression or oil containment requirements."
      overviewPoints={[
        'UL 1561 listed and CSA certified for both U.S. and Canadian projects',
        'Class H insulation system (180°C rated) for long service life',
        'Standard 150°C or 115°C temperature rise options',
        'Multiple primary and secondary voltage options',
        'Electrostatic (Faraday) shield option for noise suppression',
        'DOE 2016 minimum efficiency compliance',
      ]}
      features={[
        'Open ventilated enclosure (Class H, 150°C rise standard)',
        'Core: grain-oriented silicon steel, step-lap construction',
        'Windings: copper or aluminum, Class H insulation',
        'Primary taps: ±5% (2 × 2.5%) standard',
        'Sheet steel NEMA 1 or NEMA 3R enclosure',
        'Colour: ANSI 61 light grey (standard)',
        'Grounding provisions on enclosure and core-coil',
        'DOE 2016 and CSA C802.2 compliant efficiency',
      ]}
      upgrades={[
        'Electrostatic (Faraday) shield between primary and secondary',
        'K-factor rated windings (K-4, K-13, K-20) for harmonic loads',
        'Extra primary taps (±7.5%, ±10%)',
        '115°C temperature rise (lower-loss design)',
        'NEMA 3R outdoor rated enclosure',
        'Low audible sound level design (NEMA ST-20)',
        'Fan cooling for higher kVA in restricted space',
        'Custom primary/secondary voltage combinations',
      ]}
      specRows={[
        { label: 'kVA Range', value: '15 kVA – 2,500 kVA' },
        { label: 'Primary Voltage', value: '208 V – 600 V (other on request)' },
        { label: 'Secondary Voltage', value: '120 V – 600 V (custom available)' },
        { label: 'Winding Configuration', value: 'Single-phase or three-phase' },
        { label: 'Cooling', value: 'Ventilated air-cooled (AN)' },
        { label: 'Winding Material', value: 'Copper (standard) / Aluminum (option)' },
        { label: 'Primary Taps', value: '2 × 2.5% FCAN, 2 × 2.5% FCBN (standard)' },
        { label: 'Insulation Class', value: 'Class H (180°C)' },
        { label: 'Temperature Rise', value: '150°C (standard) / 115°C (option)' },
        { label: 'Enclosure', value: 'NEMA 1 standard; NEMA 3R optional' },
        { label: 'UL Listing', value: 'UL 1561' },
        { label: 'Canadian Certification', value: 'CSA C22.2 No. 66.2 / CSA C802.2' },
        { label: 'Frequency', value: '60 Hz' },
      ]}
      standards={[
        { name: 'UL 1561', desc: 'Dry-type general purpose and power transformers — U.S. listing', logo: '/images/ugSolutions.png' },
        { name: 'CSA C22.2 No. 66.2', desc: 'Dry-type transformers — Canadian certification standard', logo: '/images/csa.png' },
        { name: 'NEMA ST-20', desc: 'Dry-type transformers for general applications', logo: null },
        { name: 'DOE 2016', desc: 'U.S. Department of Energy minimum efficiency requirements', logo: null },
        { name: 'IEEE C57.12.01', desc: 'Standard for dry-type distribution and power transformers', logo: '/images/IEEE.png' },
      ]}
      applications={[
        'Commercial office buildings and high-rise towers',
        'Retail centres and shopping malls',
        'Healthcare facilities and hospitals',
        'Universities and institutional buildings',
        'Industrial plant distribution boards',
        'Government and municipal facilities',
        'Hotel and hospitality properties',
        'Airport and transit facilities',
      ]}
      relatedTypes={[
        { name: 'Isolation Transformer', sub: '0.5 kVA – 1,000 kVA', href: '/products/transformers/dry-type-lv/isolation' },
        { name: 'Standard MV Dry-Type', sub: '300 kVA – 20 MVA', href: '/products/transformers/dry-type-mv/standard' },
        { name: 'Three-Phase Padmount', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/padmount/three-phase' },
      ]}
      faqs={[
        {
          q: 'What does K-factor rated mean, and when is it required?',
          a: 'K-factor rating quantifies a transformer\'s ability to handle harmonic currents produced by non-linear loads such as variable frequency drives, UPS systems, computers, and LED lighting. A standard transformer is K-1 rated. Facilities with heavy harmonic loads should specify K-4, K-13, or K-20 rated transformers to prevent overheating and premature insulation failure.',
        },
        {
          q: 'What is the difference between 150°C and 115°C temperature rise?',
          a: 'A 150°C temperature rise transformer runs hotter (and is smaller and less expensive), while a 115°C rise unit runs cooler — it has larger conductors and a lower-loss core. The 115°C rise design has longer insulation life, lower audible noise, and better efficiency. It is the better choice for continuously loaded transformers or applications where noise matters.',
        },
        {
          q: 'Do Candron LV dry-type transformers meet DOE 2016 efficiency requirements?',
          a: 'Yes. All standard LV dry-type transformers from Candron are designed to meet or exceed the U.S. Department of Energy 2016 minimum energy efficiency requirements (10 CFR Part 431) and Canadian CSA C802.2 equivalent requirements. Actual efficiency values at rated load are provided in the test report for each unit.',
        },
      ]}
      quoteItems={[
        'Required kVA and phase (single or three-phase)',
        'Primary voltage and connection',
        'Secondary voltage and connection',
        'K-factor requirements (if non-linear loads present)',
        'Electrostatic shield requirements',
        'Temperature rise preference (150°C or 115°C)',
        'Enclosure type (NEMA 1 or NEMA 3R)',
        'Applicable listing/certification (UL, CSA, or both)',
      ]}
    />
  )
}
