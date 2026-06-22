import ProductTypePage from '@/components/ProductTypePage'
import type { ProductTypePageProps } from '@/components/ProductTypePage'

const data: ProductTypePageProps = {
  parentName: 'Products',
  parentHref: '/products',
  categoryName: 'Control Panels',
  categoryHref: '/products/control-panels',
  typeName: 'Motor Control Centres (MCC)',
  eyebrow: 'UL 508A • NEMA ICS 18 • VFD Ready',
  subtitle: 'Full-voltage, reduced-voltage, and VFD motor starters in intelligent MCC buckets for industrial motor loads. Custom-engineered for your motor schedule and process requirements.',
  heroImage: 'https://images.pexels.com/photos/10871585/pexels-photo-10871585.jpeg?auto=compress&cs=tinysrgb&w=1200',
  badges: ['Full-Voltage Starters', 'VFD Drives', 'NEMA ICS 18', 'UL 508A'],
  kpis: [
    { value: 'Up to 600 V', label: 'Voltage' },
    { value: '0.5–500 HP', label: 'Motor Range' },
    { value: 'VFD Ready', label: 'Drive Option' },
    { value: 'UL 508A', label: 'Standard' },
  ],
  overviewTitle: 'Motor Control for Every Load on Your Motor Schedule',
  overviewText: 'Motor control centres consolidate starting, protection, and monitoring for all motors in a facility into a single, organized lineup. From small pump starters to 500 HP VFD drives, our MCCs are engineered from your motor schedule with fully coordinated protection.',
  overviewPoints: [
    'Full-voltage (DOL, reversing), soft-starter, and VFD options per bucket',
    'Intelligent motor protection relay — electronic overload, thermistor input',
    'Integrated power monitoring and energy metering per bucket',
    'Network-ready: DeviceNet, Ethernet/IP, Profibus, Modbus',
    'Withdrawable (draw-out) or fixed bucket configurations',
    'NEMA 1 vertical sections; NEMA 12 or 4X available',
  ],
  features: [
    'Full-voltage direct-on-line (DOL) starters — contactor + overload relay',
    'Reversing starters for conveyor and positioning applications',
    'Reduced-voltage soft starters (bypass contactor standard)',
    'Variable frequency drives (VFD) with harmonic filter option',
    'Intelligent motor protection relay (MPR): 50/51, 46, 49, 27/59',
    'Molded case circuit breaker (MCCB) per bucket',
    'Control power transformer (CPT) per bucket',
    'Local pushbutton panel (Run/Stop/Fault) per bucket',
    'Power factor correction capacitors (individual or group)',
  ],
  upgrades: [
    'Smart MCC with Ethernet/IP or Modbus gateway (per bucket)',
    'Active harmonic filter for VFD-heavy MCCs',
    'Power quality meter on main bus',
    'Remote racking for draw-out buckets (NFPA 70E compliance)',
    'Closed-circuit camera for remote visual inspection',
    'Motor temperature and vibration monitoring integration',
    'UPS for 24 VDC control power in power loss events',
    'Witnessed factory acceptance testing (FAT)',
  ],
  specRows: [
    { label: 'Voltage', value: '208 V, 480 V, 600 V (3-phase)' },
    { label: 'Motor HP Range', value: '0.5 HP to 500 HP per bucket (larger via multi-bucket)' },
    { label: 'Starter Types', value: 'DOL, reversing, soft-starter (SSR), VFD drive' },
    { label: 'Motor Protection', value: 'Electronic MPR: overload, phase loss, unbalance, thermistor' },
    { label: 'Drive Brands', value: 'Allen-Bradley (PowerFlex), Siemens (Micromaster), ABB, Danfoss' },
    { label: 'Communication', value: 'Ethernet/IP, DeviceNet, Profibus, Modbus TCP/RTU' },
    { label: 'Bucket Type', value: 'Plug-in (draw-out) or fixed-mount sections' },
    { label: 'Enclosure', value: 'NEMA 1 (standard), NEMA 12, NEMA 4X stainless' },
    { label: 'Standard', value: 'UL 508A, NEMA ICS 18, CSA C22.2 No. 14' },
    { label: 'Lead Time', value: '6–12 weeks typical' },
  ],
  standards: [
    { name: 'UL 508A', desc: 'Industrial control panel standard — motor control centre assemblies', logo: null },
    { name: 'NEMA ICS 18', desc: 'Industrial control and systems — motor control centres', logo: null },
    { name: 'CSA C22.2 No. 14', desc: 'Canadian industrial control equipment standard', logo: '/images/csa.png' },
    { name: 'NFPA 79', desc: 'Electrical standard for industrial machinery', logo: null },
    { name: 'IEEE 519', desc: 'Recommended practice for harmonic control in electrical systems', logo: '/images/IEEE.png' },
    { name: 'NETA ATS', desc: 'Factory acceptance testing specifications for MCC commissioning', logo: '/images/neta.svg' },
  ],
  applications: [
    'Water and wastewater treatment plant pump control',
    'Mining conveyor, crusher, and mill motor control',
    'Oil & gas facility pump, compressor, and fan drives',
    'Manufacturing plant production line motor control',
    'HVAC fans, pumps, and air handling unit control',
    'Data centre cooling water pump and chiller starters',
    'Pulp and paper processing plant motor control',
    'Chemical plant and refinery process motor loads',
  ],
  relatedTypes: [
    { name: 'Automation Control Panels', sub: 'PLC / HMI Integration', href: '/products/control-panels/automation' },
    { name: 'Process Control Panels', sub: 'SCADA & Field I/O', href: '/products/control-panels/process' },
    { name: 'SCADA Integration Panels', sub: 'Remote Monitoring', href: '/products/control-panels/scada' },
  ],
  faqs: [
    {
      q: 'When should I choose a VFD over a soft starter?',
      a: 'Choose a VFD when you need continuous speed control (variable torque loads like pumps and fans) or precise positioning. Choose a soft starter when you just need reduced-voltage starting to minimize inrush current and motor stress, but the motor runs at full speed once started. VFDs are more expensive but offer energy savings at part load.',
    },
    {
      q: 'How do you handle harmonic distortion from VFDs in an MCC?',
      a: 'We size input line reactors or active harmonic filters (AHF) per IEEE 519 current distortion limits at the point of common coupling. For large VFD loads (>30% of transformer kVA), an AHF is typically recommended to meet utility THD requirements.',
    },
    {
      q: 'Can you provide engineering coordination with the VFD vendor?',
      a: 'Yes — we coordinate directly with the drive vendor for parameter settings, bypass contactors, and dynamic braking resistor sizing. We also perform load tests and speed range verification at our facility before shipment.',
    },
  ],
  quoteItems: [
    'Motor schedule (motor tag, HP, voltage, starter type per motor)',
    'VFD or soft starter brands preferred',
    'Communication protocol (Ethernet/IP, Modbus, etc.)',
    'Enclosure requirement (NEMA 1, 12, 4X)',
    'Control voltage (24 VDC or 120 VAC)',
    'Metering and power quality requirements',
  ],
}

export const metadata = {
  title: 'Motor Control Centres (MCC) | Candron Energy',
  description: 'UL 508A and NEMA ICS 18 motor control centres with VFD drives, soft starters, and intelligent motor protection. Built in Toronto, Ontario.',
}

export default function MCCPage() {
  return <ProductTypePage {...data} />
}
