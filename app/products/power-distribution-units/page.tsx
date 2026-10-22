import ProductTypePage from '@/components/ProductTypePage'
import { HeroArt } from '@/components/LineArt'

export const metadata = {
  title: 'Power Distribution Units',
  description: 'Transformer-based power distribution units for data centres and critical facilities, with voltage transformation, isolation, branch distribution, and monitoring.',
}

export default function PowerDistributionUnitsPage() {
  return (
    <ProductTypePage heroArt={<HeroArt kind="pdu" />}
      parentName="Products"
      parentHref="/products"
      categoryName="Critical Power Distribution"
      categoryHref="/products/power-distribution"
      typeName="Power Distribution Units"
      eyebrow="Transformer-Based Critical Power Distribution"
      subtitle="Floor-standing PDUs that combine voltage transformation, electrical isolation, protection, monitoring, and branch distribution in one coordinated assembly."
      heroImage="/images/products/power-distribution/power-distribution-unit.webp"
      applicationImage="/images/products/power-distribution/power-distribution-unit-application.webp"
      badges={['15–500 kVA', 'Up to 600 V', 'Isolation Transformer', 'Integrated Monitoring']}
      kpis={[
        { value: '15–500 kVA', label: 'Capacity Range' },
        { value: 'Up to 600 V', label: 'Input Voltage' },
        { value: 'K-Rated', label: 'Options' },
        { value: 'CSA / UL', label: 'Available' },
      ]}
      overviewTitle="One Coordinated Critical-Power Assembly"
      overviewText="A power distribution unit brings the transformer, primary protection, secondary distribution, metering, and communications into one factory-assembled enclosure. CANDRON designs each PDU around the upstream UPS or switchboard, downstream load schedule, harmonic profile, grounding method, fault current, room constraints, and monitoring platform."
      overviewPoints={[
        'Voltage transformation and galvanic isolation close to critical loads',
        'Integrated primary breaker, transformer, panelboards, and main metering',
        'K-rated and low-temperature-rise transformer options for nonlinear loads',
        'Factory-coordinated wiring reduces field installation time and risk',
      ]}
      features={[
        'Energy-efficient dry-type isolation transformer',
        'Primary main breaker with project-specific interrupting rating',
        'Copper secondary bus feeding one or more panelboards',
        'Digital input and output metering with local display',
        'Front-access sections for routine operation and maintenance',
        'Factory electrical and functional testing with documented results',
      ]}
      upgrades={[
        'K-4, K-13, or K-20 transformer for harmonic-rich loads',
        'Electrostatic shield and 200% rated neutral',
        'Branch circuit monitoring with alarm and trend data',
        'Dual-input, maintenance bypass, or redundant distribution arrangements',
        'Surge protection, ground-fault monitoring, and harmonic filtering',
        'Modbus TCP, BACnet/IP, or SNMP communications',
      ]}
      specRows={[
        { label: 'Capacity', value: '15 to 500 kVA typical; custom ratings available' },
        { label: 'Primary Voltage', value: '208 V, 480 V, 600 V, or project-specific' },
        { label: 'Secondary Voltage', value: '208/120 V, 480/277 V, or project-specific' },
        { label: 'Frequency', value: '60 Hz standard; 50 Hz available' },
        { label: 'Transformer', value: 'Dry-type isolation, energy-efficient, K-rated options' },
        { label: 'Temperature Rise', value: '150°C standard; 115°C or 80°C options' },
        { label: 'Secondary Distribution', value: 'One or more panelboards or custom distribution sections' },
        { label: 'Monitoring', value: 'Input/output metering; optional per-branch monitoring' },
        { label: 'Enclosure', value: 'Indoor NEMA 1 standard; custom environmental ratings available' },
        { label: 'Communications', value: 'Modbus RTU/TCP, BACnet/IP, SNMP, or hardwired I/O' },
      ]}
      standards={[
        { name: 'UL 1561', desc: 'Dry-type general-purpose and power transformers', logo: '/images/ugSolutions.png' },
        { name: 'CSA C22.2 No. 66.2', desc: 'Canadian dry-type transformer requirements', logo: '/images/csa.png' },
        { name: 'NEMA ST-20', desc: 'Dry-type transformer application and performance guidance', logo: null },
        { name: 'IEEE C57.12.01', desc: 'General requirements for dry-type distribution and power transformers', logo: '/images/IEEE.png' },
      ]}
      applications={[
        'Enterprise and hyperscale data centres',
        'Colocation and edge-computing facilities',
        'Healthcare and clinical infrastructure',
        'Financial and telecommunications facilities',
        'Industrial control and process systems',
        'Broadcast, transit, and public-safety facilities',
      ]}
      relatedTypes={[
        { name: 'Remote Power Panels', sub: 'Up to 600 V', href: '/products/remote-power-panels' },
        { name: 'Load Banks', sub: '1 kW–30 MW', href: '/products/load-banks' },
        { name: 'LV Dry-Type Transformers', sub: '3 – 1,000 kVA', href: '/products/transformers/dry-type-lv' },
      ]}
      faqs={[
        { q: 'What is the difference between a PDU and an RPP?', a: 'A PDU normally includes an isolation transformer that changes voltage and feeds integrated distribution. An RPP generally receives power at the utilization voltage and provides branch distribution closer to the loads without a transformer.' },
        { q: 'When should a K-rated transformer be specified?', a: 'K-rated transformers are used where nonlinear electronic loads create significant harmonic current. The appropriate K-factor and neutral rating should be based on the expected load profile and harmonic study rather than selected only from connected kVA.' },
        { q: 'Can the PDU integrate with a DCIM or building management system?', a: 'Yes. Main and branch metering can communicate voltage, current, power, energy, loading, and alarms over protocols such as Modbus TCP, BACnet/IP, or SNMP, depending on the selected monitoring platform.' },
      ]}
      quoteItems={[
        'Primary and secondary voltage, frequency, and required kVA',
        'Load profile, harmonic content, K-factor, and neutral requirements',
        'Primary protection and downstream panel schedules',
        'Main and branch monitoring points and communications protocol',
        'Available fault current, enclosure dimensions, access, and cable entry',
      ]}
    />
  )
}
