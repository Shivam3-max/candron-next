import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Control Panels',
  categoryHref: '/products/control-panels',
  typeName: 'Process Control Panels',
  eyebrow: 'UL 508A • CSA C22.2 • SCADA Ready',
  subtitle: 'SCADA-integrated process control panels with field I/O, telemetry, and remote monitoring for water treatment, oil & gas, and industrial process applications.',
  heroImage: 'https://images.pexels.com/photos/32529354/pexels-photo-32529354.jpeg?auto=compress&cs=tinysrgb&w=1200',
  badges: ['SCADA Integration', 'Field I/O', 'Telemetry Ready', 'UL 508A'],
  kpis: [
    { value: 'UL 508A', label: 'Standard' },
    { value: 'SCADA Ready', label: 'Integration' },
    { value: '4–20 mA / RTD', label: 'Field I/O' },
    { value: 'RTU / PLC', label: 'Controller' },
  ],
  overviewTitle: 'Field Intelligence for Remote Process Monitoring',
  overviewText: 'Process control panels bring the field instruments into the control room — or closer to the process — with a local RTU or PLC, analog I/O modules, and SCADA communication. Designed for unmanned remote stations, pumping stations, and process plants where reliability and remote diagnostics are critical.',
  overviewPoints: [
    'Remote terminal unit (RTU) or PLC with local HMI display',
    'Analog input cards: 4–20 mA, RTD (Pt100/Pt1000), thermocouple',
    'Digital I/O for valve feedback, alarm, and field device status',
    'SCADA communication: Modbus TCP/RTU, DNP3, IEC 60870-5',
    'UPS and battery backup for power interruption ride-through',
    'Environmental rating: NEMA 4X for outdoor, corrosive, or washdown',
  ],
  features: [
    'RTU or PLC with analog and digital I/O modules',
    '4–20 mA signal conditioning and terminal strips',
    'RTD/TC input cards for temperature monitoring',
    'Intrinsically safe (IS) barriers for hazardous area field devices',
    'Fused terminal blocks per instrument loop',
    'SCADA communication card (Modbus, DNP3, IEC 60870)',
    'Panel-mounted HMI display (optional) for local monitoring',
    'UPS module: 30 min to 8 hr battery backup',
    'Heater and thermostat for outdoor panels in cold climates',
  ],
  upgrades: [
    'Cellular / satellite modem for remote sites (no LAN connectivity)',
    'IEC 62443-compliant cybersecurity hardening',
    'Fiber optic media converter for long-distance communication',
    'Redundant RTU or PLC CPU for critical process stations',
    'Surge protection on all analog and digital field cables',
    'Live digital twin integration with asset management platform',
    'Cloud historian integration (OPC-UA to Azure / AWS IoT)',
    'Witnessed factory acceptance testing (FAT) with SCADA host',
  ],
  specRows: [
    { label: 'Controller Type', value: 'RTU (SEL, Schneider), PLC (Allen-Bradley, Siemens, Omron)' },
    { label: 'Analog Inputs', value: '4–20 mA (source/sink), 0–10 V, RTD (2/3/4-wire), TC (J/K/T/E)' },
    { label: 'Analog Outputs', value: '4–20 mA control signals to positioners and drives' },
    { label: 'Digital I/O', value: 'Wet/dry contact DI, relay/transistor DO' },
    { label: 'SCADA Protocol', value: 'Modbus TCP/RTU, DNP3, IEC 60870-5-101/104, OPC-UA' },
    { label: 'Communication Media', value: 'Ethernet, RS-485, fibre optic, cellular (4G LTE / 5G)' },
    { label: 'Power Supply', value: '120/240 VAC input; 24 VDC output with UPS battery backup' },
    { label: 'Enclosure', value: 'NEMA 4X (stainless) standard for outdoor; NEMA 12 for indoor' },
    { label: 'Hazardous Area', value: 'Class I, Div 2 (Zone 2) with IS barriers or Ex-rated components' },
    { label: 'Standard', value: 'UL 508A, CSA C22.2 No. 14, CSA C22.2 No. 213 (Class I Div 2)' },
    { label: 'Lead Time', value: '5–10 weeks from approved I/O list' },
  ],
  standards: [
    { name: 'UL 508A', desc: 'Industrial control panel standard for process control assemblies', logo: null },
    { name: 'CSA C22.2 No. 14', desc: 'Canadian industrial control equipment standard', logo: '/images/csa.png' },
    { name: 'IEC 62443', desc: 'Industrial cybersecurity framework for IACS — applied to SCADA-connected panels', logo: '/images/IEC.png' },
    { name: 'IEC 60870-5', desc: 'Telecontrol protocol for SCADA communication in utility and infrastructure', logo: '/images/IEC.png' },
    { name: 'CSA C22.2 No. 213', desc: 'Canadian standard for Class I, Div 2 hazardous area installations', logo: '/images/csa.png' },
    { name: 'NETA ATS', desc: 'Acceptance testing specifications for I/O verification and commissioning', logo: '/images/neta.svg' },
  ],
  applications: [
    'Municipal water and wastewater pumping stations',
    'Oil & gas pipeline SCADA remote terminal units',
    'Stormwater lift station monitoring and control',
    'District energy heat pump and chiller plant control',
    'Landfill gas monitoring and extraction control',
    'Remote environmental monitoring stations',
    'Mining tailings and water management systems',
    'Renewable energy site monitoring (wind, solar)',
  ],
  relatedTypes: [
    { name: 'Automation Control Panels', sub: 'PLC / HMI Integration', href: '/products/control-panels/automation' },
    { name: 'Motor Control Centres (MCC)', sub: 'VFD & Starters', href: '/products/control-panels/mcc' },
    { name: 'SCADA Integration Panels', sub: 'Remote Monitoring', href: '/products/control-panels/scada' },
  ],
  faqs: [
    {
      q: 'What communication protocols do you support for SCADA?',
      a: 'We support all major industrial communication protocols including Modbus RTU/TCP, DNP3, IEC 60870-5-101/104, OPC-UA, Profinet, EtherNet/IP, and BACnet. We select the protocol based on your SCADA host software and existing infrastructure.',
    },
    {
      q: 'Can you build panels for installation in hazardous (classified) areas?',
      a: 'Yes — we build Class I, Division 2 (Zone 2) panels per CSA C22.2 No. 213. For Zone 1 or Division 1 applications, we can supply panels with Ex-rated enclosures and intrinsically safe barriers for all field connections.',
    },
    {
      q: 'How do you handle power outages at remote monitoring stations?',
      a: 'We integrate a UPS module (typically 24 VDC rack-mount) with battery backup sized for 30 minutes to 8 hours depending on the critical alarm monitoring requirement. Solar charging and external battery bank interfaces are also available for off-grid locations.',
    },
  ],
  quoteItems: [
    'I/O count: number of AI, DI, AO, DO signals',
    'Analog signal types: 4–20 mA, RTD, TC, etc.',
    'SCADA protocol and host software name',
    'Communication medium: Ethernet, cellular, fibre',
    'Hazardous area classification (if applicable)',
    'Power supply available at site (AC or DC)',
  ],
}

export const metadata = {
  title: 'Process Control Panels | Candron Energy',
  description: 'UL 508A SCADA-integrated process control panels with field I/O and telemetry for water, oil & gas, and industrial process applications. Toronto, Ontario.',
}

export default function ProcessControlPanelPage() {
  return <ProductTypePage {...data} />
}
