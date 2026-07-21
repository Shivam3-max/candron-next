import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Cast Coil Transformer',
  description: 'Epoxy resin encapsulated cast coil dry-type transformers for harsh environments. 300 kVA to 30 MVA at 2.4 kV to 36 kV. IEC 60076-11 and IEEE C57.12 certified.',
}

export default function CastCoilPage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="MV Dry-Type Transformers"
      categoryHref="/products/transformers/dry-type-mv"
      typeName="Cast Coil Transformer"
      eyebrow="Epoxy Resin Encapsulated — Harsh Environments"
      subtitle="Epoxy resin cast coil dry-type transformers rated from 300 kVA to 30 MVA for coastal, chemical, mining, and high-humidity environments where maximum moisture and contamination resistance is required."
      heroImage="/images/tx-placeholder.svg"
      badges={['300 kVA – 30 MVA', '2.4 kV – 36 kV Primary', 'Epoxy Cast Coil', 'IEC 60076-11', 'IP34 Standard']}
      kpis={[
        { value: '30 MVA', label: 'Max Rating' },
        { value: '36 kV', label: 'Max Primary' },
        { value: 'IP54', label: 'Max Enclosure' },
        { value: 'Class F/H', label: 'Insulation' },
      ]}
      overviewTitle="Total Encapsulation for Harsh Conditions"
      overviewText="Cast coil transformers encase both the primary and secondary windings in solid epoxy resin, creating fully encapsulated coil assemblies that are impervious to moisture, condensation, salt spray, and chemical vapour. This construction provides a fundamental immunity to environmental contamination that VPI transformers — where the winding is only surface-impregnated — cannot match."
      overviewPoints={[
        'Complete epoxy resin encapsulation of all HV and LV windings',
        'Immunity to moisture, salt spray, and corrosive vapours',
        'Self-extinguishing resin (F1 fire classification per IEC 60076-11)',
        'IP34 standard enclosure; IP54 fully sealed option',
        'Class F (155°C) or Class H (180°C) insulation system',
        'Preferred for coastal, chemical, tropical, and underground installations',
      ]}
      features={[
        'Epoxy resin vacuum cast windings — primary and secondary',
        'Self-extinguishing resin (fire resistant, no flame propagation)',
        'Grain-oriented silicon steel core (step-lap construction)',
        'IP34 enclosure standard (IP54 optional)',
        'Class F (155°C) insulation system standard',
        'Primary taps: ±5% (FCAN/FCBN) on de-energized tap changer',
        'PT100 winding temperature sensors (standard)',
        'Copper or aluminum embedded winding conductors',
      ]}
      upgrades={[
        'Class H (180°C) insulation — higher continuous temperature rating',
        'IP54 fully sealed enclosure (no ventilation openings)',
        'Forced air cooling (AF) for increased continuous rating',
        'On-load tap changer (LTC) for voltage regulation under load',
        'Extended tap range (±7.5%, ±10% DETC)',
        'Partial discharge measurement at factory',
        'Tropical coating (additional anti-corrosion treatment)',
        'Embedded fibre optic winding temperature sensors (DTS)',
      ]}
      specRows={[
        { label: 'kVA / MVA Range', value: '300 kVA – 30 MVA' },
        { label: 'Primary Voltage (HV)', value: '2.4 kV – 36 kV' },
        { label: 'Secondary Voltage (LV)', value: '120 V – 15 kV (custom available)' },
        { label: 'Winding Configuration', value: 'Three-phase (two-winding standard)' },
        { label: 'Construction', value: 'Epoxy resin vacuum cast coil' },
        { label: 'Insulation Class', value: 'Class F (155°C) standard / Class H (180°C) optional' },
        { label: 'Temperature Rise', value: '80°C or 100°C (Class F); 100°C or 125°C (Class H)' },
        { label: 'Cooling', value: 'AN standard; AF optional' },
        { label: 'Enclosure', value: 'IP34 standard; IP54 optional' },
        { label: 'Fire Classification', value: 'F1 per IEC 60076-11 (self-extinguishing)' },
        { label: 'HV Taps', value: '±5% DETC standard; LTC optional' },
        { label: 'Primary Standard', value: 'IEC 60076-11 / IEEE C57.12.01' },
        { label: 'Canadian Certification', value: 'CSA C22.2' },
        { label: 'Frequency', value: '60 Hz' },
      ]}
      standards={[
        { name: 'IEC 60076-11', desc: 'International standard for dry-type transformers — fire classification and encapsulation requirements', logo: null },
        { name: 'IEEE C57.12.01', desc: 'Standard for dry-type distribution and power transformers', logo: '/images/IEEE.png' },
        { name: 'CSA C22.2', desc: 'Canadian electrical certification standard', logo: '/images/csa.png' },
        { name: 'IEC 60076-3', desc: 'Insulation levels, dielectric tests and external clearances in air', logo: null },
        { name: 'ANSI C57.12.01', desc: 'American National Standard for dry-type transformers', logo: '/images/ansi.png' },
      ]}
      applications={[
        'Coastal and marine facilities (salt spray environments)',
        'Chemical processing plants (corrosive vapour exposure)',
        'Tropical and high-humidity climate installations',
        'Mining operations (dust, moisture, underground)',
        'Wastewater treatment plants and pumping stations',
        'Oil and gas offshore platforms',
        'Steel mills and smelter environments',
        'Underground transit system substations',
      ]}
      relatedTypes={[
        { name: 'Standard MV Dry-Type', sub: '300 kVA – 20 MVA', href: '/products/transformers/dry-type-mv/standard' },
        { name: 'Power Substation Transformer', sub: '1 MVA – 100+ MVA', href: '/products/transformers/substation/power' },
        { name: 'Three-Phase Padmount', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/padmount/three-phase' },
      ]}
      faqs={[
        {
          q: 'What is the fire classification of cast coil transformers?',
          a: 'Cast coil transformers using self-extinguishing epoxy resin achieve Fire Classification F1 per IEC 60076-11, which means the material does not sustain combustion and does not propagate flame. This makes them acceptable under most electrical codes for installation inside occupied buildings, tunnels, and underground facilities without the fire separation distances required for liquid-filled transformers.',
        },
        {
          q: 'How does cast coil compare to VPI in salt spray environments?',
          a: 'VPI-impregnated windings have a surface resin coating but the underlying winding insulation can still absorb moisture if the surface coating is breached. Cast coil windings are fully encapsulated in a solid block of epoxy resin — there is no accessible surface for salt mist, condensation, or liquid water to reach the conductor insulation. For coastal or marine environments, cast coil is the technically correct choice.',
        },
        {
          q: 'Can cast coil transformers be operated outdoors without a building?',
          a: 'With an IP44 or IP54 enclosure and appropriate thermal design for the ambient temperature range, cast coil transformers can be operated outdoors. However, exposure to ultraviolet light, extreme temperature cycling, and physical impact should be considered in the enclosure and mounting design. Contact our engineering team to review your specific outdoor installation requirements.',
        },
        {
          q: 'What partial discharge levels are typical, and can factory PD testing be performed?',
          a: 'Factory partial discharge (PD) testing is available as an optional test per IEC 60076-11. PD values below 10 pC at 1.3 × Um/√3 are typically achievable for cast coil designs at voltages up to 36 kV. PD test results are included in the factory test report when this test is specified.',
        },
      ]}
      quoteItems={[
        'Required kVA / MVA and voltage ratio',
        'Primary voltage (HV) and BIL requirement',
        'Secondary voltage (LV) and connection',
        'Insulation class (Class F or H)',
        'Enclosure IP rating (IP34 or IP54)',
        'Environment description (coastal, chemical, indoor, etc.)',
        'Temperature monitoring requirements',
        'Applicable standards (IEC 60076-11 or IEEE C57.12.01)',
      ]}
    />
  )
}
