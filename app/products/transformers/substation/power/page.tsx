import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Power Substation Transformer',
  description: 'Oil-immersed power transformers for utility and industrial substations. 1 MVA to 100+ MVA at primary voltages from 34.5 kV to 345 kV. IEEE C57.12 and CSA C88 certified.',
}

export default function PowerSubstationPage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="Substation Transformers"
      categoryHref="/products/transformers/substation"
      typeName="Power Substation Transformer"
      eyebrow="Oil-Immersed Power Transformer"
      subtitle="High-voltage oil-immersed power transformers for utility transmission and distribution substations, industrial facilities, and renewable energy interconnections. Rated from 1 MVA to 100+ MVA at primary voltages from 34.5 kV to 345 kV."
      heroImage="/images/tx-placeholder.svg"
      badges={['1 MVA – 100+ MVA', '34.5 kV – 345 kV Primary', 'IEEE C57.12', 'CSA C88', 'ONAN / ONAF / OFAF']}
      kpis={[
        { value: '345 kV', label: 'Max Primary' },
        { value: '100+ MVA', label: 'Max Rating' },
        { value: 'ONAN–OFAF', label: 'Cooling Options' },
        { value: 'LTC Ready', label: 'Voltage Regulation' },
      ]}
      overviewTitle="Utility-Grade High-Voltage Power Transformation"
      overviewText="Power substation transformers perform the critical step-down of transmission-level voltage to sub-transmission and distribution levels, enabling economical bulk power transfer across the grid while supplying utilization voltage to industrial and commercial loads. They are the most technically demanding class of transformer, operating continuously at high voltage and power levels for decades."
      overviewPoints={[
        'ONAN, ONAF, ONAN/ONAF, ONAN/OFAF cooling arrangements',
        'On-load tap changer (LTC) or de-energized tap changer (DETC)',
        'Standard and non-standard impedance values by specification',
        'Two-winding and autotransformer configurations',
        'Buchholz relay, thermal image, winding temperature monitoring',
        'Full factory testing to IEEE C57.12.90 test procedures',
      ]}
      features={[
        'Conservator tank with Buchholz gas relay',
        'Oil temperature and winding temperature indicators',
        'Pressure relief device and sudden pressure relay',
        'Oil level gauge with alarm contacts',
        'De-energized tap changer (DETC) — standard',
        'Copper or aluminium winding conductors',
        'Core and coil construction to IEEE C57.12.00',
        'High-voltage and low-voltage bushings to IEC / IEEE',
      ]}
      upgrades={[
        'On-load tap changer (LTC) — ±10 taps × 1.25% or 1.5% per step',
        'ONAN/ONAF or ONAN/OFAF forced cooling upgrade',
        'Cooling radiator banks with thermostatic fan control',
        'Nitrogen gas blanketing system',
        'Automatic voltage regulator (AVR) for LTC control',
        'Transformer monitoring system (TMS) with remote SCADA interface',
        'Fibre optic distributed temperature sensing (DTS)',
        'Line surge arresters on HV and LV bushings',
      ]}
      specRows={[
        { label: 'MVA Rating', value: '1 MVA – 100+ MVA (project-specific)' },
        { label: 'Primary Voltage (HV)', value: '34.5 kV – 345 kV' },
        { label: 'Secondary Voltage (LV)', value: '4.16 kV – 69 kV (project-specific)' },
        { label: 'Winding Configuration', value: 'Two-winding or autotransformer' },
        { label: 'Cooling Class', value: 'ONAN / ONAF / ONAN/ONAF / ONAN/OFAF' },
        { label: 'Insulating Fluid', value: 'Mineral oil (standard) / FR3 ester (option)' },
        { label: 'HV Taps', value: 'DETC standard; LTC available' },
        { label: 'Impedance', value: 'Per project specification (IEC / IEEE)' },
        { label: 'Temperature Rise', value: '65°C (oil) / 80°C (winding) — standard' },
        { label: 'Vector Group', value: 'Project-specific (Dyn11, YNyn0, YNd11, etc.)' },
        { label: 'Primary Standard', value: 'IEEE C57.12.00 / IEC 60076' },
        { label: 'Canadian Certification', value: 'CSA C88' },
        { label: 'Frequency', value: '60 Hz (50 Hz available)' },
      ]}
      standards={[
        { name: 'IEEE C57.12', desc: 'Standard general requirements for liquid-immersed distribution, power, and regulation transformers', logo: '/images/IEEE.png' },
        { name: 'CSA C88', desc: 'Power transformers and reactors — Canadian certification authority', logo: '/images/csa.png' },
        { name: 'IEC 60076', desc: 'International standard for power transformers — series applicable to design, testing, and accessories', logo: null },
        { name: 'ANSI C57.12.00', desc: 'American National Standard for general requirements for liquid-immersed transformers', logo: '/images/ansi.png' },
        { name: 'IEEE C57.12.90', desc: 'Test code for liquid-immersed distribution, power, and regulation transformers', logo: '/images/IEEE.png' },
      ]}
      applications={[
        'Utility transmission and distribution substations',
        'Industrial facility main power stations',
        'Mining operations and remote site power supply',
        'Renewable energy plant interconnection (wind, solar, hydro)',
        'Oil and gas upstream and midstream facilities',
        'Steel mills and electric arc furnace supply',
        'Data centre utility supply points',
        'Rail and transit traction substations',
      ]}
      relatedTypes={[
        { name: 'Polemount Transformer', sub: '3 kVA – 167 kVA', href: '/products/transformers/substation/polemount' },
        { name: 'Three-Phase Padmount', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/padmount/three-phase' },
        { name: 'Standard MV Dry-Type', sub: '300 kVA – 20 MVA', href: '/products/transformers/dry-type-mv/standard' },
        { name: 'Cast Coil Transformer', sub: '300 kVA – 30 MVA', href: '/products/transformers/dry-type-mv/cast-coil' },
      ]}
      faqs={[
        {
          q: 'What is the difference between ONAN and OFAF cooling?',
          a: 'ONAN (Oil Natural, Air Natural) is the basic self-cooled rating with no forced cooling. OFAF (Oil Forced, Air Forced) uses oil pumps and air fans to achieve a higher continuous MVA rating from the same core and coil assembly. Most large power transformers are rated at two or three cooling stages (e.g., ONAN/ONAF/OFAF) with automatic staging based on thermal sensors.',
        },
        {
          q: 'When is a load tap changer (LTC) required?',
          a: 'A load tap changer allows voltage regulation under load — adjusting the turns ratio while the transformer is energized. LTCs are specified when the secondary voltage must be held within a narrow band regardless of load variation or primary voltage fluctuation. They add cost and maintenance requirements; for applications with stable utility voltage and predictable loading, a DETC is often sufficient.',
        },
        {
          q: 'What factory acceptance tests are performed on power substation transformers?',
          a: 'Standard factory tests include: winding resistance measurement, turns ratio test, no-load loss and excitation current measurement, load loss and impedance measurement, applied potential (HV) test, and induced potential test. Optional tests include partial discharge, temperature rise, lightning impulse, and audible sound level. Full test reports are provided with every unit.',
        },
        {
          q: 'Can you supply transformers to both ANSI/IEEE and IEC standards?',
          a: 'Yes. We specify and supply transformers to either ANSI/IEEE or IEC standards, or a hybrid specification acceptable to both, depending on your project requirements. Most Canadian utility projects reference IEEE/CSA standards, while many international projects use IEC 60076 series standards.',
        },
      ]}
      quoteItems={[
        'MVA rating (ONAN base, with cooling upgrade ratings if known)',
        'Primary voltage (HV) and BIL',
        'Secondary voltage (LV) and BIL',
        'Vector group / winding connection',
        'Impedance target (% on transformer MVA base)',
        'Tap changer requirements (DETC or LTC, range and steps)',
        'Cooling class and forced cooling requirements',
        'Applicable standards (IEEE/CSA or IEC)',
      ]}
    />
  )
}
