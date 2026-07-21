import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Polemount Transformer',
  description: 'Single-phase and three-phase overhead polemount distribution transformers from 3 kVA to 167 kVA at 2.4 kV to 34.5 kV primary. ANSI C57.12 and CSA certified.',
}

export default function PolemountPage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="Substation Transformers"
      categoryHref="/products/transformers/substation"
      typeName="Polemount Transformer"
      eyebrow="Overhead Distribution Transformer"
      subtitle="Single-phase and three-phase liquid-filled polemount transformers for overhead rural and semi-urban distribution lines. Rated from 3 kVA to 167 kVA at primary voltages from 2.4 kV to 34.5 kV."
      heroImage="/images/tx-placeholder.svg"
      badges={['3 kVA – 167 kVA', '2.4 kV – 34.5 kV Primary', 'ANSI C57.12', 'CSA Certified', 'Overhead Mounting']}
      kpis={[
        { value: '167 kVA', label: 'Max Rating' },
        { value: '34.5 kV', label: 'Max Primary' },
        { value: 'ONAN', label: 'Cooling' },
        { value: 'ANSI / CSA', label: 'Standards' },
      ]}
      overviewTitle="Reliable Overhead Distribution Power"
      overviewText="Polemount transformers step down medium-voltage overhead distribution line voltage to the 120/240 V or 120/208 V utilization levels required by residential and light commercial customers. They are the most widely deployed transformer type in rural distribution networks, mounted directly on utility poles along overhead distribution lines."
      overviewPoints={[
        'Lightweight, compact tank design for pole mounting',
        'Standard 120/240 V single-phase output (with neutral)',
        'Three-phase and single-phase configurations',
        'Mineral oil insulation and cooling — maintenance-free operation',
        'Multiple primary voltage taps for feeder voltage variation',
        'Integral primary arrester mounting provisions',
      ]}
      features={[
        'All-welded steel tank with pole-mounting provisions',
        'Primary voltage taps — 2 × 2.5% FCAN, 2 × 2.5% FCBN',
        'Mineral oil insulated and cooled (ONAN)',
        'Copper winding conductor (standard)',
        'CSP (completely self-protecting) option available',
        'Primary current-limiting or expulsion fuse option',
        'Secondary overcurrent protection — standard on CSP units',
        'Oil level sight gauge and drain valve',
      ]}
      upgrades={[
        'Completely Self-Protecting (CSP) package',
        'Low-loss amorphous core for improved efficiency',
        'FR3 natural ester insulating fluid',
        'Integrated surge arrester provisions (primary and secondary)',
        'Corrosion-resistant stainless steel or aluminum tank',
        'Extended primary HV tap range (±10%)',
        'Three-phase delta-wye, wye-wye, or open-delta configurations',
        'Custom nameplate and identification provisions',
      ]}
      specRows={[
        { label: 'kVA Range', value: '3 kVA – 167 kVA (single-phase); up to 500 kVA (3-phase)' },
        { label: 'Primary Voltage (HV)', value: '2.4 kV – 34.5 kV' },
        { label: 'Secondary Voltage (LV)', value: '120/240 V (single-phase standard)' },
        { label: 'Winding Configuration', value: 'Single-phase or three-phase' },
        { label: 'Cooling Class', value: 'ONAN' },
        { label: 'Insulating Fluid', value: 'Mineral oil' },
        { label: 'HV Taps', value: '2 × 2.5% FCAN, 2 × 2.5% FCBN' },
        { label: 'Temperature Rise', value: '65°C (standard) / 55°C (low-loss option)' },
        { label: 'Mounting', value: 'Overhead pole — integral hanger provisions' },
        { label: 'Primary Standard', value: 'ANSI C57.12.20 / IEEE C57.12.00' },
        { label: 'Canadian Certification', value: 'CSA C88 / CSA C22.2' },
        { label: 'Frequency', value: '60 Hz' },
      ]}
      standards={[
        { name: 'ANSI C57.12.20', desc: 'Standard for overhead-type distribution transformers', logo: '/images/ansi.png' },
        { name: 'IEEE C57.12.00', desc: 'General requirements for liquid-immersed distribution transformers', logo: '/images/IEEE.png' },
        { name: 'CSA C88', desc: 'Power transformers and reactors — Canadian certification', logo: '/images/csa.png' },
        { name: 'DOE 2016', desc: 'Energy efficiency requirements for distribution transformers', logo: null },
      ]}
      applications={[
        'Rural residential overhead distribution',
        'Agricultural and farm service connections',
        'Small commercial overhead service connections',
        'Streetlighting and site lighting circuits',
        'Remote telecommunications and radio sites',
        'Temporary construction power supply',
      ]}
      relatedTypes={[
        { name: 'Single-Phase Padmount', sub: '10 kVA – 500 kVA', href: '/products/transformers/padmount/single-phase' },
        { name: 'Three-Phase Padmount', sub: '15 kVA – 2,500 kVA', href: '/products/transformers/padmount/three-phase' },
        { name: 'Power Substation Transformer', sub: '1 MVA – 100+ MVA', href: '/products/transformers/substation/power' },
      ]}
      faqs={[
        {
          q: 'What is a CSP (Completely Self-Protecting) transformer?',
          a: 'A CSP transformer includes three built-in protective features: (1) a primary protective link (fuse) that disconnects the transformer from the distribution feeder on internal faults, (2) an internal secondary circuit breaker to protect against secondary overcurrents, and (3) lightning arresters on the primary terminals. CSP units reduce the need for separate pole-mounted protective equipment.',
        },
        {
          q: 'What voltage taps are provided and can a wider range be supplied?',
          a: 'Standard taps are 2 × 2.5% FCAN and 2 × 2.5% FCBN on the primary winding, giving a total adjustment range of ±5% from nominal. Wider tap ranges (e.g., ±10%) are available as a custom option for lines with significant voltage regulation challenges.',
        },
        {
          q: 'Can amorphous core (low-loss) units be supplied?',
          a: 'Yes. Amorphous core polemount transformers offer significantly lower no-load losses compared to silicon steel core units — typically 60–70% lower. They are recommended for lightly loaded circuits where no-load losses represent a large proportion of total losses, and for utilities targeting loss reduction or carbon reduction goals.',
        },
      ]}
      quoteItems={[
        'Required kVA rating and phase (single-phase or three-phase)',
        'Primary voltage and connection',
        'Secondary voltage and neutral arrangement',
        'CSP or conventional protection preference',
        'Core type (conventional silicon steel or amorphous)',
        'Fluid preference (mineral oil or FR3)',
        'Site location and environmental conditions',
        'Quantity and delivery schedule',
      ]}
    />
  )
}
