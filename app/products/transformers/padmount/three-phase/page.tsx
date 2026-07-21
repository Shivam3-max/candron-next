import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Three-Phase Padmount Transformer',
  description: 'Three-phase liquid-filled padmount transformers from 15 kVA to 2,500 kVA at 5 kV to 34.5 kV primary voltage. ANSI C57.12.26, IEEE, and CSA certified.',
}

export default function ThreePhasePadmountPage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="Padmount Transformers"
      categoryHref="/products/transformers/padmount"
      typeName="Three-Phase Padmount Transformer"
      eyebrow="Liquid-Filled Distribution Transformer"
      subtitle="Tamper-resistant three-phase padmount transformers for underground commercial and industrial distribution systems. Available from 15 kVA to 2,500 kVA at primary voltages from 5 kV to 34.5 kV."
      heroImage="/images/tx-placeholder.svg"
      badges={['15 kVA – 2,500 kVA', '5 kV – 34.5 kV Primary', 'ANSI C57.12.26', 'CSA Certified', 'Oil-Immersed']}
      kpis={[
        { value: '2,500 kVA', label: 'Max Rating' },
        { value: '34.5 kV', label: 'Max Primary' },
        { value: 'ONAN', label: 'Cooling Class' },
        { value: 'ANSI / CSA', label: 'Standards' },
      ]}
      overviewTitle="Three-Phase Underground Distribution"
      overviewText="Three-phase padmount transformers serve as the final voltage conversion stage in underground distribution systems, stepping medium-voltage utility power down to the utilization voltage required by commercial buildings, industrial facilities, and large residential developments. Their locked, tamper-resistant enclosures meet public-access installation requirements."
      overviewPoints={[
        'Liquid-filled ONAN cooling for maximum thermal efficiency',
        'Compartmentalized design with separate HV and LV sections',
        'Radial or loop-feed high-voltage configuration',
        'Custom secondary voltage and winding arrangements',
        'Integral overcurrent protection options (fused or non-fused)',
        'Tank-mounted arresters, pressure relief, and ground provisions',
      ]}
      features={[
        'NEMA 3R-equivalent tamper-resistant enclosure',
        'Separate lockable HV and LV compartments',
        'Mineral oil or FR3 natural ester fluid options',
        'Copper or aluminum winding conductor',
        'Standard 2.5% FCAN and 5.0% FCBN voltage taps',
        'Welded tank with pressure relief device',
        'Stainless steel hardware and locking bars',
        'Ground boss provision on tank',
      ]}
      upgrades={[
        'FR3 natural ester fluid (fire-safe, biodegradable)',
        'Stainless steel enclosure for coastal environments',
        'Bay-O-Net fuses with built-in expulsion element',
        'S&C T-Link, ABB loadbuster, or equivalent HV protection',
        'Automatic sectionalizing switch (loop feed)',
        'SCADA-compatible monitoring accessories',
        'Custom paint colour and nameplate requirements',
        'Thermal imaging port for predictive maintenance',
      ]}
      specRows={[
        { label: 'kVA Range', value: '15 kVA – 2,500 kVA' },
        { label: 'Primary Voltage (HV)', value: '5 kV – 34.5 kV' },
        { label: 'Secondary Voltage (LV)', value: '208 V – 15 kV (custom available)' },
        { label: 'Winding Configuration', value: 'Three-phase, 2- or 3-winding' },
        { label: 'Cooling Class', value: 'ONAN (natural oil / natural air)' },
        { label: 'Insulating Fluid', value: 'Mineral oil or FR3 natural ester' },
        { label: 'Winding Material', value: 'Copper (standard) / Aluminum (option)' },
        { label: 'HV Taps', value: '2 × 2.5% FCAN, 2 × 2.5% FCBN' },
        { label: 'Temperature Rise', value: '65°C (standard)' },
        { label: 'Enclosure', value: 'Tamper-resistant, painted steel' },
        { label: 'Primary Standard', value: 'ANSI C57.12.26 / IEEE C57.12.00' },
        { label: 'Canadian Certification', value: 'CSA C88 / CSA C22.2' },
        { label: 'Frequency', value: '60 Hz' },
      ]}
      standards={[
        { name: 'ANSI C57.12.26', desc: 'Standard for three-phase padmounted distribution transformers', logo: '/images/ansi.png' },
        { name: 'IEEE C57.12.00', desc: 'General requirements for liquid-immersed distribution transformers', logo: '/images/IEEE.png' },
        { name: 'CSA C88', desc: 'Power transformers and reactors — Canadian certification', logo: '/images/csa.png' },
        { name: 'NEMA TR1', desc: 'Transformers, regulators and reactors standard', logo: null },
        { name: 'DOE 2016', desc: 'U.S. Department of Energy efficiency requirements', logo: null },
      ]}
      applications={[
        'Commercial building complexes (underground service entry)',
        'Industrial plant distribution substations',
        'Solar and wind farm interconnection points',
        'Shopping centres and retail developments',
        'Data centre utility feed points',
        'Multi-unit residential developments',
        'Campus distribution networks (hospitals, universities)',
        'Transit facilities and EV charging infrastructure',
      ]}
      relatedTypes={[
        { name: 'Single-Phase Padmount', sub: '10 kVA – 500 kVA', href: '/products/transformers/padmount/single-phase' },
        { name: 'Power Substation Transformer', sub: '1 MVA – 100+ MVA', href: '/products/transformers/substation/power' },
        { name: 'Standard LV Dry-Type', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/dry-type-lv/standard' },
        { name: 'Standard MV Dry-Type', sub: '300 kVA – 20 MVA', href: '/products/transformers/dry-type-mv/standard' },
      ]}
      faqs={[
        {
          q: 'What is the difference between radial and loop-feed configurations?',
          a: 'A radial-feed padmount has a single HV cable connection in and is protected by a fuse. A loop-feed configuration has two HV cable connections — one in and one out — allowing the distribution loop to continue past the transformer. Loop feed provides redundancy and is standard for commercial underground distribution systems.',
        },
        {
          q: 'Can you supply FR3 or biodegradable fluid in place of mineral oil?',
          a: 'Yes. FR3 natural ester fluid is available as an upgrade and is recommended for installations near water bodies, in environmentally sensitive areas, or where fire-safe fluid is required. FR3 transformers are self-certified as less-flammable fluid-filled equipment under most electrical codes.',
        },
        {
          q: 'What overcurrent protection options are available?',
          a: 'Padmount transformers can be supplied with conventional expulsion fuses, current-limiting fuses, Bay-O-Net fuses with partial range current-limiting elements, or fully coordinated HV protection schemes including vacuum fault interrupters (VFI) for loop-feed applications.',
        },
        {
          q: 'What tap range is standard, and can custom taps be provided?',
          a: 'Standard taps are 2 × 2.5% FCAN (full capacity above nominal) and 2 × 2.5% FCBN (full capacity below nominal) on the HV winding. Custom tap positions and expanded tap ranges can be specified for applications with wide primary voltage variation.',
        },
      ]}
      quoteItems={[
        'Required kVA rating',
        'Primary voltage (HV) and system grounding',
        'Secondary voltage (LV) and connection type',
        'Radial or loop-feed HV configuration',
        'Required overcurrent protection type',
        'Fluid preference (mineral oil or FR3)',
        'Site location and environmental conditions',
        'Applicable standards (ANSI or CSA)',
      ]}
    />
  )
}
