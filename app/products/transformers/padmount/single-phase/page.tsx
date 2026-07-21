import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Single-Phase Padmount Transformer',
  description: 'Single-phase liquid-filled padmount transformers from 10 kVA to 500 kVA at 2.4 kV to 34.5 kV primary voltage. ANSI C57.12.25 and CSA certified.',
}

export default function SinglePhasePadmountPage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="Padmount Transformers"
      categoryHref="/products/transformers/padmount"
      typeName="Single-Phase Padmount Transformer"
      eyebrow="Liquid-Filled Distribution Transformer"
      subtitle="Single-phase tamper-resistant padmount transformers for residential subdivision loops, streetlighting, and light commercial underground distribution. 10 kVA to 500 kVA."
      heroImage="/images/tx-placeholder.svg"
      badges={['10 kVA – 500 kVA', '2.4 kV – 34.5 kV Primary', 'ANSI C57.12.25', 'CSA Certified', '120/240 V Secondary']}
      kpis={[
        { value: '500 kVA', label: 'Max Rating' },
        { value: '34.5 kV', label: 'Max Primary' },
        { value: '120/240 V', label: 'Standard Secondary' },
        { value: 'ANSI / CSA', label: 'Standards' },
      ]}
      overviewTitle="Single-Phase Underground Distribution"
      overviewText="Single-phase padmount transformers distribute power from underground medium-voltage feeders to residential subdivisions, rural residential services, and light commercial applications. Their compact, tamper-resistant design suits locations in front yards, easements, and public rights-of-way where overhead pole-mounted construction is not permitted."
      overviewPoints={[
        'Compact footprint for residential right-of-way installation',
        'Standard 120/240 V or custom secondary voltage',
        'Series-multiple or additive-subtractive winding options',
        'Radial or loop-feed high-voltage configuration',
        'Conventional or current-limiting fuse options',
        'Integral streetlighting tap available',
      ]}
      features={[
        'NEMA 3R-equivalent tamper-resistant enclosure',
        'Single lockable HV/LV compartment with hinged cover',
        'Mineral oil or FR3 natural ester fluid options',
        'Copper winding conductor (standard)',
        'Standard voltage taps ±5% and ±2.5%',
        'Pressure relief device on tank',
        'Stainless steel hardware and locking provisions',
        'Ground boss and arrester provision',
      ]}
      upgrades={[
        'FR3 natural ester fluid (fire-safe and biodegradable)',
        'Streetlighting secondary tap (120 V or 240 V)',
        'Current-limiting fuse for close-in fault protection',
        'Stainless steel enclosure for corrosive environments',
        'Extended secondary terminal options',
        'Custom tank colour and nameplate language',
        'PME (protective multiple earth) secondary arrangement',
        'Low-loss amorphous core for energy efficiency',
      ]}
      specRows={[
        { label: 'kVA Range', value: '10 kVA – 500 kVA' },
        { label: 'Primary Voltage (HV)', value: '2.4 kV – 34.5 kV' },
        { label: 'Secondary Voltage (LV)', value: '120/240 V (standard), custom available' },
        { label: 'Winding Configuration', value: 'Single-phase, 2-winding' },
        { label: 'Cooling Class', value: 'ONAN (natural oil / natural air)' },
        { label: 'Insulating Fluid', value: 'Mineral oil or FR3 natural ester' },
        { label: 'Winding Material', value: 'Copper' },
        { label: 'HV Taps', value: '2 × 5% FCAN, 2 × 2.5% FCBN (standard)' },
        { label: 'Temperature Rise', value: '65°C (standard)' },
        { label: 'Enclosure', value: 'Tamper-resistant painted steel' },
        { label: 'Primary Standard', value: 'ANSI C57.12.25 / IEEE C57.12.00' },
        { label: 'Canadian Certification', value: 'CSA C88 / CSA C22.2' },
        { label: 'Frequency', value: '60 Hz' },
      ]}
      standards={[
        { name: 'ANSI C57.12.25', desc: 'Standard for single-phase padmounted distribution transformers', logo: '/images/ansi.png' },
        { name: 'IEEE C57.12.00', desc: 'General requirements for liquid-immersed distribution transformers', logo: '/images/IEEE.png' },
        { name: 'CSA C88', desc: 'Power transformers and reactors — Canadian certification', logo: '/images/csa.png' },
        { name: 'NEMA TR1', desc: 'Transformers, regulators and reactors standard', logo: null },
      ]}
      applications={[
        'Residential subdivision underground loops',
        'Rural residential underground services',
        'Streetlighting distribution circuits',
        'Light commercial underground services',
        'Mobile home parks and recreational vehicle parks',
        'Agricultural and farm service connections',
      ]}
      relatedTypes={[
        { name: 'Three-Phase Padmount', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/padmount/three-phase' },
        { name: 'Polemount Transformer', sub: '3 kVA – 167 kVA', href: '/products/transformers/substation/polemount' },
        { name: 'Standard LV Dry-Type', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/dry-type-lv/standard' },
      ]}
      faqs={[
        {
          q: 'What is the difference between series-multiple and additive-subtractive winding connections?',
          a: 'Series-multiple refers to a single-phase transformer with two secondary coils that can be connected in series (240 V) or parallel (120 V) to provide dual-voltage capability. Additive and subtractive refer to the standard polarity conventions for single-phase transformer connections, which determine the phase relationship of the secondary with respect to the primary.',
        },
        {
          q: 'Can a streetlighting tap be integrated into the padmount unit?',
          a: 'Yes. A dedicated secondary lighting tap (typically 120 V or 240 V, rated separately from the main load) can be provided on single-phase padmount transformers to serve streetlighting loads on the same circuit without a separate distribution transformer.',
        },
        {
          q: 'What is the typical lead time for single-phase padmount transformers?',
          a: 'Lead times vary based on kVA rating, voltage configuration, and order volume. Contact our engineering team for a project-specific lead time estimate. We maintain detailed availability information and can often accommodate tight project timelines.',
        },
      ]}
      quoteItems={[
        'Required kVA rating',
        'Primary voltage and system grounding',
        'Secondary voltage and connection type',
        'Radial or loop-feed HV configuration',
        'Streetlighting tap requirements (if any)',
        'Fluid preference (mineral oil or FR3)',
        'Site location and environmental conditions',
        'Applicable standards (ANSI or CSA)',
      ]}
    />
  )
}
