import ProductTypePage from '@/components/ProductTypePage'
import { HeroArt } from '@/components/LineArt'

export const metadata = {
  title: 'Remote Power Panels',
  description: 'Custom panelboards and compact remote power panels for critical branch-circuit distribution, with front access and configurable breaker arrangements.',
}

export default function RemotePowerPanelsPage() {
  return (
    <ProductTypePage heroArt={<HeroArt kind="rpp" />}
      parentName="Products"
      parentHref="/products"
      categoryName="Critical Power Distribution"
      categoryHref="/products/power-distribution"
      typeName="Remote Power Panels"
      eyebrow="Critical Branch-Circuit Distribution"
      subtitle="Compact, front-access remote power panels that bring protected, monitored branch distribution closer to data centre racks and other critical loads."
      heroImage="/images/products/power-distribution/remote-power-panel.webp"
      applicationImage="/images/products/power-distribution/remote-power-panel-application.webp"
      badges={['Up to 600 V', 'Front Access', 'Branch Monitoring', 'Data Centre Ready']}
      kpis={[
        { value: 'Up to 600 V', label: 'Input Voltage' },
        { value: 'Up to 225 kVA', label: 'Capacity' },
        { value: 'Up to 84', label: 'Branch Circuits' },
        { value: '24/7', label: 'Critical Service' },
      ]}
      overviewTitle="Flexible Distribution Near the Load"
      overviewText="Remote power panels reduce long branch-circuit runs by placing distribution close to the equipment it serves. CANDRON engineers each RPP around feeder voltage, panelboard arrangement, circuit count, redundancy strategy, monitoring platform, access requirements, and available floor space."
      overviewPoints={[
        'Compact floor-standing or wall-adjacent distribution for high-density loads',
        'Front-access construction supports service in space-constrained electrical rooms',
        'Configurable panelboards, breakers, receptacles, and cable-entry arrangements',
        'Optional branch-circuit metering provides capacity and alarm visibility',
      ]}
features={[
        'Main input breaker or main-lug-only configurations',
        'Copper bus and panelboards arranged for safe front access',
        'Clearly identified branch circuits and load schedules',
        'Top or bottom cable entry with removable gland plates',
        'Digital main input metering with local display',
        'Factory wiring, inspection, and functional testing',
      ]}
      upgrades={[
        'Per-branch current, power, energy, and alarm monitoring',
        'Dual-input or A/B distribution arrangements for resilient architectures',
        'Revenue-grade metering and waveform/power-quality capture',
        'Modbus TCP, BACnet/IP, SNMP, or dry-contact communications',
        'Subfeed breakers, surge protective devices, and maintenance bypass options',
        'Custom dimensions, colours, labels, and enclosure construction',
      ]}
      specRows={[
        { label: 'Input Voltage', value: '208/120 V, 480/277 V, 600/347 V, or project-specific' },
        { label: 'Capacity', value: 'Up to 225 kVA typical; engineered to project load schedule' },
        { label: 'Main Rating', value: 'Up to 600 A typical' },
        { label: 'Branch Circuits', value: 'Up to 84 poles per section; multi-section arrangements available' },
        { label: 'Bus Material', value: 'Copper standard; application-specific ratings available' },
        { label: 'Access', value: 'Front-access construction; rear or side access available when required' },
        { label: 'Monitoring', value: 'Main input metering with optional per-circuit branch monitoring' },
        { label: 'Communications', value: 'Modbus RTU/TCP, BACnet/IP, SNMP, or hardwired I/O' },
        { label: 'Enclosure', value: 'Indoor NEMA 1 standard; other ratings by application' },
        { label: 'Cable Entry', value: 'Top, bottom, or mixed entry with removable gland plates' },
      ]}
      standards={[
        { name: 'UL 67', desc: 'Panelboards for branch-circuit distribution', logo: '/images/ugSolutions.png' },
        { name: 'CSA C22.2', desc: 'Canadian panelboard and electrical equipment requirements', logo: '/images/csa.png' },
        { name: 'UL 50 / 50E', desc: 'Enclosures for electrical equipment and environmental considerations', logo: null },
        { name: 'NEMA PB 1', desc: 'Panelboard construction and performance guidance', logo: null },
      ]}
      applications={[
        'Data centres and colocation facilities',
        'Telecommunications and network rooms',
        'Healthcare and laboratory environments',
        'Financial trading and mission-critical offices',
        'Industrial control and automation rooms',
        'Broadcast, transportation, and security infrastructure',
      ]}
      relatedTypes={[
        { name: 'Power Distribution Units', sub: '15–500 kVA', href: '/products/power-distribution-units' },
        { name: 'Load Banks', sub: '1 kW–30 MW', href: '/products/load-banks' },
        { name: 'Switchboards', sub: 'Up to 4000 A', href: '/products/switchboards' },
      ]}
      faqs={[
        { q: 'How is an RPP different from a standard panelboard?', a: 'An RPP packages one or more panelboards in a freestanding critical-power enclosure, often with main metering, branch monitoring, communications, and flexible cable entry. It is designed to be installed close to the loads and integrated into a monitored A/B power architecture.' },
        { q: 'Can every branch circuit be monitored?', a: 'Yes. Branch circuit monitoring can measure current and optionally voltage, power, energy, and breaker status for each circuit. Alarm thresholds and communications can be coordinated with the building or data centre infrastructure management platform.' },
        { q: 'Can the RPP support A and B feeds?', a: 'Yes. Separate A and B sections can be housed in coordinated enclosures or delivered as independent panels, depending on the redundancy, maintenance, and physical-separation requirements of the project.' },
      ]}
      quoteItems={[
        'Input voltage, frequency, feeder size, and available fault current',
        'Branch circuit count, breaker ratings, and panel schedule',
        'A/B redundancy and physical-separation requirements',
        'Main and branch monitoring points and communications protocol',
        'Enclosure dimensions, access, and top/bottom cable entry',
      ]}
    />
  )
}
