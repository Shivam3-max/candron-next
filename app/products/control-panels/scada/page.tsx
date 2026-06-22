import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Control Panels',
  categoryHref: '/products/control-panels',
  typeName: 'SCADA Integration Panels',
  eyebrow: 'UL 508A • IEC 62443 • Remote Monitoring',
  subtitle: 'Remote monitoring and control panels with secure network integration, industrial communication protocols, and cybersecurity hardening for mission-critical infrastructure.',
  heroImage: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
  badges: ['IEC 62443 Hardened', 'OPC-UA', 'Remote Access', 'UL 508A'],
  kpis: [
    { value: 'IEC 62443', label: 'Cybersecurity' },
    { value: 'OPC-UA', label: 'Protocol' },
    { value: 'Real-Time', label: 'Monitoring' },
    { value: 'UL 508A', label: 'Standard' },
  ],
  overviewTitle: 'Secure, Real-Time Visibility Across Every Site',
  overviewText: 'SCADA integration panels are the network edge node for industrial monitoring — aggregating data from field devices, protocols, and networks into a secure, structured data feed for SCADA hosts, historians, and cloud platforms. We harden every panel to IEC 62443 and provide end-to-end commissioning support.',
  overviewPoints: [
    'Industrial data concentrator: Modbus, DNP3, IEC 61850, OPC-UA',
    'Managed industrial Ethernet switch with VLAN segmentation',
    'IEC 62443 cybersecurity hardening: firewall, DMZ, role-based access',
    'Cellular / fibre / satellite WAN communication',
    'UPS and battery backup for 24/7 uptime',
    'Remote access gateway (VPN) for secure engineering access',
  ],
  features: [
    'Industrial data concentrator / gateway (protocol bridging)',
    'Managed Ethernet switch with port-level access control',
    'Firewall / UTM appliance for OT/IT network segmentation',
    'Industrial-grade VPN router for secure remote access',
    'OPC-UA server for historian and cloud platform integration',
    'Cellular 4G LTE / 5G modem for WAN communication',
    'UPS module with battery backup (1–8 hr)',
    'GPS time synchronization (optional)',
    'Power supply: 120/240 VAC to 24 VDC (dual redundant option)',
  ],
  upgrades: [
    'Redundant WAN connection (primary: fibre, backup: cellular)',
    'IEC 62443-3-3 Security Level 2 documented hardening report',
    'Asset inventory and change detection monitoring',
    'Cloud historian integration (Azure IoT, AWS Greengrass)',
    'SIEM syslog forwarding for security event monitoring',
    'Time series database (InfluxDB, OSIsoft PI) local historian',
    'KVM-over-IP for remote field panel access and troubleshooting',
    'Witnessed factory acceptance testing with SCADA host',
  ],
  specRows: [
    { label: 'Gateway Platforms', value: 'Moxa, Advantech, Red Lion, ProSoft, Kepware' },
    { label: 'Industrial Protocols', value: 'Modbus RTU/TCP, DNP3, IEC 61850, IEC 60870-5, BACnet, OPC-UA' },
    { label: 'WAN Communication', value: 'Fibre Ethernet, 4G LTE / 5G cellular, satellite' },
    { label: 'Network Security', value: 'Next-gen firewall, DMZ, VLAN, role-based access control (RBAC)' },
    { label: 'Cybersecurity Standard', value: 'IEC 62443-3-3 Security Level 1/2 hardening' },
    { label: 'Time Sync', value: 'NTP server sync; GPS PPS option for sub-millisecond accuracy' },
    { label: 'Power Supply', value: '24 VDC industrial with UPS; dual-redundant option' },
    { label: 'Enclosure', value: 'NEMA 12 (standard), NEMA 4X (outdoor/corrosive)' },
    { label: 'Operating Temp', value: '-20°C to +70°C (industrial grade components)' },
    { label: 'Standard', value: 'UL 508A, IEC 62443, CSA C22.2 No. 14' },
    { label: 'Lead Time', value: '4–8 weeks from approved network design' },
  ],
  standards: [
    { name: 'UL 508A', desc: 'Industrial control panel standard for SCADA and monitoring assemblies', logo: null },
    { name: 'IEC 62443', desc: 'Industrial automation and control system (IACS) cybersecurity standard', logo: '/images/IEC.png' },
    { name: 'CSA C22.2 No. 14', desc: 'Canadian industrial control equipment standard', logo: '/images/csa.png' },
    { name: 'IEC 61850', desc: 'Communication networks for power utility automation — GOOSE and MMS', logo: '/images/IEC.png' },
    { name: 'NERC CIP', desc: 'Cybersecurity standards for bulk electric system assets (CIP-005, CIP-007)', logo: null },
    { name: 'NETA ATS', desc: 'Acceptance testing for SCADA communication and security verification', logo: '/images/neta.svg' },
  ],
  applications: [
    'Electricity distribution utility SCADA remote station',
    'Water/wastewater SCADA master station and field panels',
    'Oil & gas pipeline monitoring and control (SCADA RTU)',
    'Critical infrastructure site monitoring (government, defence)',
    'Renewable energy SCADA site aggregation (wind/solar farm)',
    'Transit and rail SCADA communications interface',
    'Mining site-wide monitoring and control network',
    'Smart grid AMI head-end and data aggregation',
  ],
  relatedTypes: [
    { name: 'Automation Control Panels', sub: 'PLC / HMI Integration', href: '/products/control-panels/automation' },
    { name: 'Motor Control Centres (MCC)', sub: 'VFD & Starters', href: '/products/control-panels/mcc' },
    { name: 'Process Control Panels', sub: 'Field I/O & Telemetry', href: '/products/control-panels/process' },
  ],
  faqs: [
    {
      q: 'What is IEC 62443 and why does it matter for SCADA panels?',
      a: 'IEC 62443 is the international cybersecurity standard for industrial automation and control systems (IACS). As utilities and industrial facilities face increasing cyber threats, regulators and asset owners are requiring Security Level 1 or 2 hardening for any equipment connected to a SCADA network. We document hardening measures for each panel and can provide a compliance report.',
    },
    {
      q: 'Can the panel communicate over both fibre and cellular simultaneously?',
      a: 'Yes — we configure a dual-WAN industrial router with primary and backup WAN ports. Primary traffic routes over the fibre (or Ethernet) link; the cellular modem activates automatically on primary link failure. Failover time is typically under 30 seconds.',
    },
    {
      q: 'How do you handle network security between the OT and IT networks?',
      a: 'We implement a DMZ architecture with a next-generation firewall between the OT (operational technology) and IT/cloud networks. SCADA data is published to an OPC-UA server in the DMZ, where the IT historian or cloud platform pulls data without direct access to the OT network.',
    },
  ],
  quoteItems: [
    'Field device types and protocols (Modbus, DNP3, IEC 61850, etc.)',
    'SCADA host software and integration method',
    'WAN communication available at site (fibre, cellular)',
    'Cybersecurity level required (IEC 62443 SL1 / SL2)',
    'Number of field sites or panels in the system',
    'Cloud platform target if applicable (Azure, AWS, OSIsoft PI)',
  ],
}

export const metadata = {
  title: 'SCADA Integration Panels | Candron Energy',
  description: 'UL 508A SCADA integration panels with IEC 62443 cybersecurity hardening, OPC-UA, and remote monitoring. Built in Toronto, Ontario.',
}

export default function SCADAPanelPage() {
  return <ProductTypePage {...data} />
}
