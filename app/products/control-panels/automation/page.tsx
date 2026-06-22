import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Control Panels',
  categoryHref: '/products/control-panels',
  typeName: 'Automation Control Panels',
  eyebrow: 'UL 508A • CSA C22.2 • PLC / HMI',
  subtitle: 'Custom PLC and HMI control panels engineered for process automation, machine control, and industrial monitoring. Built to UL 508A with full documentation packages for commissioning and maintenance.',
  heroImage: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
  badges: ['UL 508A Listed', 'PLC Integration', 'HMI Ready', 'Full Documentation'],
  kpis: [
    { value: 'UL 508A', label: 'Standard' },
    { value: 'PLC + HMI', label: 'Technology' },
    { value: 'Custom Built', label: 'Engineering' },
    { value: 'CSA C22.2', label: 'Canada' },
  ],
  overviewTitle: 'Custom Automation from Engineering to Commissioning',
  overviewText: 'Our automation control panels are engineered from the I/O list up — PLC program, HMI screen development, field wiring, and site commissioning are all in scope. We work with Rockwell Allen-Bradley, Siemens, Schneider, and other major platforms.',
  overviewPoints: [
    'PLC programming: Allen-Bradley (Studio 5000), Siemens (TIA Portal), Schneider (EcoStruxure)',
    'HMI screen development with alarm management and trending',
    'I/O list, control narrative, and functional description included',
    'UL 508A listed panel with UL labelled components',
    'NEMA 12 (standard indoor) or NEMA 4X (washdown / outdoor)',
    'Full shop acceptance testing before shipment',
  ],
  features: [
    'PLC rack with CPU, power supply, and I/O modules',
    'HMI touchscreen (7"–21") mounted or remote-mount option',
    'Ethernet switch for plant network integration',
    'UL 508A listed panel — NFPA 79 compliant wiring',
    'Terminal block wiring with ferrule-terminated field connections',
    'Main disconnect and branch protection per NEC/CEC',
    'Control power transformer (CPT) with fused secondary',
    'Door-mounted operator interface (pushbuttons, pilot lights)',
    'Structured wiring: power in conduit duct, signals in separate duct',
  ],
  upgrades: [
    'Redundant PLC CPU configuration for critical processes',
    'Remote I/O rack at field equipment (distributed I/O)',
    'UPS (24 VDC or 120 VAC) for power failure ride-through',
    'Ethernet/IP to Modbus TCP gateway',
    'Cellular or fibre modem for remote access (VPN)',
    'Vision inspection camera integration',
    'SCADA host software and historian integration',
    'Witnessed factory acceptance testing (FAT) with client',
  ],
  specRows: [
    { label: 'PLC Platforms', value: 'Rockwell Allen-Bradley, Siemens, Schneider, Omron, Beckhoff' },
    { label: 'HMI Platforms', value: 'FactoryTalk View (AB), WinCC (Siemens), Wonderware, Ignition' },
    { label: 'Control Voltage', value: '24 VDC (standard); 120 VAC available' },
    { label: 'I/O Types', value: 'DI, DO, AI (4–20 mA), AO, RTD, TC, encoder, high-speed counter' },
    { label: 'Communication', value: 'Ethernet/IP, Modbus TCP/RTU, Profinet, DeviceNet, BACnet' },
    { label: 'Enclosure', value: 'NEMA 12 (standard), NEMA 4X stainless (washdown), NEMA 7 (hazloc)' },
    { label: 'Standard', value: 'UL 508A (Industrial Control Panel), NFPA 79, CSA C22.2 No. 14' },
    { label: 'Documentation', value: 'I/O list, P&ID, ladder logic, HMI screens, as-built drawings' },
    { label: 'Lead Time', value: '4–10 weeks from approved scope' },
  ],
  standards: [
    { name: 'UL 508A', desc: 'Industrial control panel standard — required for U.S. and Canada', logo: null },
    { name: 'CSA C22.2 No. 14', desc: 'Canadian industrial control equipment standard', logo: '/images/csa.png' },
    { name: 'NFPA 79', desc: 'Electrical standard for industrial machinery — wiring and safeguarding', logo: null },
    { name: 'IEC 62443', desc: 'Industrial automation and control system (IACS) cybersecurity framework', logo: '/images/IEC.png' },
    { name: 'ISA-88 / ISA-95', desc: 'Batch process and enterprise-control integration standards', logo: null },
    { name: 'NETA ATS', desc: 'Acceptance testing for control panel verification and commissioning', logo: '/images/neta.svg' },
  ],
  applications: [
    'Water treatment plant process control (SCADA integration)',
    'Manufacturing line automation and machine control',
    'Building automation HVAC and BAS control panels',
    'Oil & gas pipeline SCADA remote terminal units (RTU)',
    'Mining conveyor, crusher, and plant control systems',
    'Pharmaceutical cleanroom environmental monitoring',
    'Food and beverage process automation (HACCP)',
    'Power generation plant auxiliary control systems',
  ],
  relatedTypes: [
    { name: 'Motor Control Centres (MCC)', sub: 'VFD & Full-Voltage Starters', href: '/products/control-panels/mcc' },
    { name: 'Process Control Panels', sub: 'SCADA & Field I/O', href: '/products/control-panels/process' },
    { name: 'SCADA Integration Panels', sub: 'Remote Monitoring', href: '/products/control-panels/scada' },
  ],
  faqs: [
    {
      q: 'Do you write the PLC program, or do we supply it?',
      a: 'Both options are available. We can write the full PLC program from your control narrative and P&ID (functional design specification), or we can wire and test a panel using your supplied PLC program. We can also support existing programs with modifications and testing.',
    },
    {
      q: 'What does UL 508A listed mean and why does it matter?',
      a: 'UL 508A is the North American standard for industrial control panels. A UL 508A listed panel has been inspected and tested by a nationally recognized testing laboratory (NRTL) and meets the component and wiring requirements of the standard. Most jurisdictions in the U.S. and Canada require this listing for industrial control panels.',
    },
    {
      q: 'Can you commission the panel on-site?',
      a: 'Yes — commissioning support is available and typically includes loop testing, I/O check-out, PLC sequence verification, and operator training. We can provide commissioning services at any site in Canada or the United States.',
    },
  ],
  quoteItems: [
    'Control narrative or functional design specification (FDS)',
    'I/O list (number and type of digital and analog I/O)',
    'PLC platform preference (Allen-Bradley, Siemens, etc.)',
    'HMI size and screen count requirement',
    'SCADA or network integration protocol',
    'Environmental requirement (NEMA 12, 4X, 7)',
  ],
}

export const metadata = {
  title: 'Automation Control Panels | Candron Energy',
  description: 'UL 508A custom PLC and HMI control panels for process automation and machine control. Allen-Bradley, Siemens, Schneider. Built in Toronto, Ontario.',
}

export default function AutomationPanelPage() {
  return <ProductTypePage {...data} />
}
