'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: 'mv-switchgear',
    num: '01',
    name: 'MV Switchgear',
    tagline: '2.4 kV to 38 kV • 3,000 A',
    image: '/images/switchgear.jpg',
    eyebrow: 'Medium Voltage — 2.4 kV to 38 kV',
    standards: ['CSA C22.2 No. 31', 'IEEE C37.20.2', 'IEEE C37.20.3', 'IEEE C37.20.7'],
    desc1: "Custom medium voltage switchgear from 2.4 kV to 38 kV and up to 3,000 A — designed, manufactured, and tested in-house at our Toronto facility. Metal-clad, metal-enclosed, and pad-mounted configurations built to your project's exact single-line diagram.",
    desc2: "Every MV switchgear lineup is engineered by our team, assembled with copper busbars and vacuum circuit breakers rated to your fault current, and fully factory-tested before delivery — no outsourced fabrication, no third-party unknowns.",
    kpis: [
      { value: '2.4–38 kV', label: 'Voltage Range' },
      { value: '3,000 A', label: 'Current Rating' },
      { value: 'Arc-Rated', label: 'Construction' },
      { value: 'CSA / UL', label: 'Certified' },
    ],
    features: [
      'Metal-clad (draw-out VCBs) and metal-enclosed (load-break/fused) configurations',
      'Pad-mounted outdoor enclosures — NEMA 4 or NEMA 4X rated',
      'Arc fault protection rated (ARST) construction with compartmentalization',
      'Protection relay integration: 50/51, 27/59, 67, 81, 87 functions',
      'CT/PT revenue metering compartment per single-line requirements',
      'SCADA gateway integration (Modbus / DNP3) available per section',
    ],
    quickSpecs: [
      ['Type', 'Metal-Clad & Metal-Enclosed MV'],
      ['Standards', 'CSA C22.2, IEEE C37.20.2/.3'],
      ['Voltage Range', '2.4 kV to 38 kV'],
      ['Current Rating', 'Up to 3,000 A'],
      ['Short Circuit', 'Up to 40 kA symmetrical'],
      ['Testing', 'Full FAT In-House'],
      ['Origin', 'Made in Canada'],
    ],
    applications: ['Industrial Plants', 'Oil & Gas Facilities', 'Utility Substations', 'Mining Sites', 'Renewable Energy'],
    link: '/products/switchgear',
  },
  {
    id: 'lv-switchgear',
    num: '02',
    name: 'LV Switchgear',
    tagline: 'Up to 1000 V',
    image: '/images/switchboards.jpg',
    eyebrow: 'Low Voltage — Up to 1000 V',
    standards: ['CSA C22.2', 'UL 508A', 'ANSI/IEEE C37', 'ESA'],
    desc1: "Custom low voltage switchgear up to 1,000 V — main breaker, main-tie-main, service entrance, and distribution configurations built to your cable schedule and site requirements.",
    desc2: "CANDRON LV switchgear integrates air circuit breakers, copper busbars, CT/PT metering, and digital power monitoring in free-standing or wall-mount lineups. Every unit is manufactured and tested in-house in Toronto.",
    kpis: [
      { value: 'Up to 1000 V', label: 'Voltage' },
      { value: 'Up to 3200 A', label: 'Max Current' },
      { value: 'UL 508A', label: 'Standard' },
      { value: 'Custom', label: 'Built' },
    ],
    features: [
      'Main breaker, main-tie-main, and distribution configurations',
      'Air circuit breakers (ACBs) — fixed or draw-out with zone-selective interlocking',
      'Service entrance rated with CT/PT metering compartments (ESA/AHJ layout)',
      'Copper busbar — pre-drilled NEMA 2-hole pads, welded or bolted-splice',
      'NEMA 1, 12, 4, and 4X enclosure options for all environments',
      'Digital power monitoring (ION, Shark, PM8000) as option',
    ],
    quickSpecs: [
      ['Type', 'LV Switchgear — Service Entrance / Dist.'],
      ['Standards', 'CSA C22.2, UL 508A, ESA'],
      ['Voltage Range', 'Up to 1000 V AC (600 V typical)'],
      ['Current Rating', '400 A to 3200 A main bus'],
      ['Short Circuit', 'Up to 100 kA AIC'],
      ['Testing', 'Factory Acceptance Testing'],
      ['Origin', 'Made in Canada'],
    ],
    applications: ['Industrial PDCs', 'Service Entrance', 'Data Centres', 'Generator Paralleling', 'Water Treatment'],
    link: '/products/lv-switchgear',
  },
  {
    id: 'switchboards',
    num: '03',
    name: 'Switchboards',
    tagline: 'Low Voltage Distribution',
    image: '/images/switchboards.jpg',
    eyebrow: 'Low Voltage Power Distribution',
    standards: ['UL 891', 'CSA C22.2', 'ESA-Ready'],
    desc1: "Custom-engineered switchboards designed to provide safe and efficient power distribution for commercial, industrial, and infrastructure applications. Built to your exact requirements, assembled and tested in-house at our Toronto facility.",
    desc2: "With full in-house engineering and manufacturing, CANDRON delivers switchboards that fit your project's specific electrical requirements — not off-the-shelf compromises. Main-tie-main, utility metering, and distribution configurations available.",
    kpis: [
      { value: 'Up to 4000 A', label: 'Max Current' },
      { value: '600 V', label: 'Rated Voltage' },
      { value: 'UL 891', label: 'Standard' },
      { value: 'CSA / ESA', label: 'Compliance' },
    ],
    features: [
      'Custom layouts engineered to project specifications and single-line diagrams',
      'Main-tie-main configurations for redundancy and reliability',
      'Utility-approved CT/PT metering compartments (ESA/AHJ layout)',
      'Flexible configurations for distribution, feeder, and branch circuit applications',
      'Factory tested to UL 891 and CSA C22.2 requirements',
      'Fast lead times enabled by complete in-house manufacturing control',
    ],
    quickSpecs: [
      ['Type', 'Switchboards'],
      ['Standards', 'UL 891, CSA C22.2'],
      ['Voltage', 'Up to 600 V'],
      ['Current', 'Up to 4000 A'],
      ['Features', 'MTM, Utility Metering, Custom'],
      ['Testing', 'Factory Acceptance Testing'],
      ['Origin', 'Made in Canada'],
    ],
    applications: ['Commercial Buildings', 'Manufacturing Facilities', 'Healthcare', 'Institutional Projects', 'Infrastructure'],
    link: '/products/switchboards',
  },
  {
    id: 'transformers',
    num: '04',
    name: 'Transformers',
    tagline: 'Distribution to Power Class',
    image: '/images/products/transformers/padmount-three-phase.webp',
    eyebrow: 'Liquid-Filled & Dry-Type Transformers',
    standards: ['CSA C88', 'IEEE C57', 'UL 1561', 'DOE 2016'],
    desc1: 'Custom and standard transformers from low-voltage dry-type units through medium-voltage padmount and power substation designs — selected around your voltage, kVA, environment, and load profile.',
    desc2: 'CANDRON supports the complete transformer specification process with liquid-filled, VPI, cast-coil, isolation, and K-rated options for industrial, utility, renewable, commercial, and mission-critical applications.',
    kpis: [
      { value: '25 VA – 100 MVA', label: 'Capacity Range' },
      { value: 'Up to 230 kV', label: 'Primary Voltage' },
      { value: 'Liquid / Dry', label: 'Construction' },
      { value: 'CSA / UL', label: 'Certified' },
    ],
    features: [
      'Single- and three-phase padmount transformers for utility and private distribution',
      'Substation and power transformers for industrial and utility applications',
      'Low- and medium-voltage dry-type, VPI, and cast-coil construction',
      'Copper or aluminum windings with application-specific insulation systems',
      'K-rated, isolation, low-temperature-rise, and harmonic-duty options',
      'Application engineering, factory testing, commissioning, and field support',
    ],
    quickSpecs: [
      ['Types', 'Padmount, Substation, Polemount & Dry-Type'],
      ['Capacity', '25 VA to 100 MVA'],
      ['Primary Voltage', 'Up to 230 kV'],
      ['Cooling', 'Liquid, Air, VPI, Cast Coil'],
      ['Standards', 'CSA, UL, IEEE, ANSI'],
      ['Testing', 'Factory Acceptance Testing'],
      ['Origin', 'Made in Canada'],
    ],
    applications: ['Utilities', 'Data Centres', 'Industrial Plants', 'Renewable Energy', 'Commercial Buildings'],
    link: '/products/transformers',
  },
  {
    id: 'load-banks',
    num: '05',
    name: 'Load Banks',
    tagline: 'Resistive, Reactive & Combined',
    image: '/images/products/power-distribution/load-bank.webp',
    eyebrow: 'Generator, UPS & Battery Load Testing',
    standards: ['UL 508A', 'CSA C22.2', 'IEEE 446', 'NFPA 110'],
    desc1: 'Load banks apply a precise, repeatable load so generators, UPS systems, batteries, and complete electrical systems can be proven at operating conditions before they are needed.',
    desc2: 'Portable, trailer-mounted, radiator-mounted, and permanent systems are available with manual or automated load steps, digital metering, remote controls, and test data capture.',
    kpis: [
      { value: '1 kW–30 MW', label: 'Capacity Range' },
      { value: 'Up to 15 kV', label: 'System Voltage' },
      { value: '0.8–1.0 PF', label: 'Load Profiles' },
      { value: 'Auto / Manual', label: 'Controls' },
    ],
    features: [
      'Resistive, reactive, and combined resistive/reactive configurations',
      'Application-specific load steps and continuous or intermittent duty',
      'Forced-air cooling with airflow and overtemperature protection',
      'Portable, skid, trailer, radiator-mounted, and permanent construction',
      'PLC/HMI automatic test sequences and report export available',
      'Low- and medium-voltage systems with coordinated connection equipment',
    ],
    quickSpecs: [
      ['Load Type', 'Resistive, Reactive or Combined'],
      ['Capacity', '1 kW to 30 MW'],
      ['Voltage', '120 V to 15 kV'],
      ['Frequency', '50 / 60 Hz'],
      ['Power Factor', '1.0 or 0.8 typical'],
      ['Mounting', 'Portable, Trailer or Permanent'],
      ['Origin', 'Made in Canada'],
    ],
    applications: ['Generator Testing', 'Data Centres', 'Hospitals', 'Rental Fleets', 'Industrial Commissioning'],
    link: '/products/load-banks',
  },
  {
    id: 'remote-power-panels',
    num: '06',
    name: 'Remote Power Panels',
    tagline: 'Critical Branch Distribution',
    image: '/images/products/power-distribution/remote-power-panel.webp',
    eyebrow: 'Data Centre Branch-Circuit Distribution',
    standards: ['UL 67', 'CSA C22.2', 'UL 50 / 50E', 'NEMA PB 1'],
    desc1: 'Remote power panels bring protected branch-circuit distribution closer to data centre racks and other critical loads, reducing long cable runs and improving capacity visibility.',
    desc2: 'Each RPP can be configured for the project panel schedule, A/B architecture, access constraints, cable entry, monitoring platform, communications protocol, and available floor space.',
    kpis: [
      { value: 'Up to 600 V', label: 'Input Voltage' },
      { value: 'Up to 225 kVA', label: 'Capacity' },
      { value: 'Up to 84', label: 'Branch Circuits' },
      { value: 'Front Access', label: 'Serviceability' },
    ],
    features: [
      'Compact floor-standing enclosures for high-density critical loads',
      'Main-breaker or main-lug-only configurations with copper bus',
      'Front-access panelboards with clear circuit identification',
      'Top, bottom, or mixed cable entry with removable gland plates',
      'Main input metering with optional per-circuit branch monitoring',
      'Modbus, BACnet, SNMP, and hardwired communications options',
    ],
    quickSpecs: [
      ['Voltage', 'Up to 600 V'],
      ['Capacity', 'Up to 225 kVA typical'],
      ['Main Rating', 'Up to 600 A typical'],
      ['Branch Circuits', 'Up to 84 poles per section'],
      ['Access', 'Front Access'],
      ['Monitoring', 'Main & Per-Circuit Options'],
      ['Origin', 'Made in Canada'],
    ],
    applications: ['Data Centres', 'Telecommunications', 'Healthcare', 'Financial Facilities', 'Control Rooms'],
    link: '/products/remote-power-panels',
  },
  {
    id: 'power-distribution-units',
    num: '07',
    name: 'Power Distribution Units',
    tagline: 'Critical Power Distribution',
    image: '/images/products/power-distribution/power-distribution-unit.webp',
    eyebrow: 'Transformer-Based Distribution & Isolation',
    standards: ['UL 1561', 'CSA C22.2', 'NEMA ST-20', 'IEEE C57'],
    desc1: 'Floor-standing PDUs combine voltage transformation, electrical isolation, protection, monitoring, and branch distribution in one factory-coordinated critical-power assembly.',
    desc2: 'Systems are engineered around the upstream UPS or switchboard, downstream load schedule, harmonic profile, grounding method, available fault current, room constraints, and monitoring platform.',
    kpis: [
      { value: '15–500 kVA', label: 'Capacity Range' },
      { value: 'Up to 600 V', label: 'Input Voltage' },
      { value: 'K-Rated', label: 'Options' },
      { value: 'Integrated', label: 'Monitoring' },
    ],
    features: [
      'Energy-efficient dry-type isolation transformer',
      'Primary protection, copper secondary bus, and integrated panelboards',
      'K-4, K-13, and K-20 options for harmonic-rich electronic loads',
      'Electrostatic shield, 200% neutral, and low-temperature-rise options',
      'Input/output metering with optional branch circuit monitoring',
      'Factory-wired and tested to reduce field installation time and risk',
    ],
    quickSpecs: [
      ['Capacity', '15 to 500 kVA typical'],
      ['Primary', '208 V, 480 V or 600 V'],
      ['Secondary', '208/120 V or 480/277 V'],
      ['Transformer', 'Dry-Type Isolation'],
      ['Options', 'K-Rated, 200% Neutral, E-Shield'],
      ['Monitoring', 'Input, Output & Branch'],
      ['Origin', 'Made in Canada'],
    ],
    applications: ['Data Centres', 'Healthcare', 'Telecommunications', 'Financial Facilities', 'Industrial Controls'],
    link: '/products/power-distribution-units',
  },
  {
    id: 'control-panels',
    num: '08',
    name: 'Control Panels',
    tagline: 'Automation & Process Control',
    image: '/images/control-panels.jpg',
    eyebrow: 'UL 508A Industrial Control Systems',
    standards: ['UL 508A', 'CSA C22.2', 'NFPA 79', 'CSA C22.2 No. 14'],
    desc1: 'Custom control panels integrate PLCs, HMIs, VFDs, motor starters, instrumentation, communications, and power supplies into coordinated systems for industrial automation and monitoring.',
    desc2: 'From one-off machine panels to plant-wide process control and SCADA systems, each assembly is engineered, wired, labelled, programmed, and factory-tested around the operating sequence.',
    kpis: [
      { value: 'UL 508A', label: 'Standard' },
      { value: 'PLC / HMI', label: 'Automation' },
      { value: 'NEMA 1–4X', label: 'Enclosures' },
      { value: 'FAT', label: 'Fully Tested' },
    ],
    features: [
      'PLC, HMI, VFD, soft-starter, relay, and instrumentation integration',
      'Motor control centres and process control panels',
      'SCADA gateways, remote I/O, and industrial network architecture',
      'NEMA 1, 12, 3R, 4, and stainless steel 4X enclosures',
      'Detailed schematics, I/O lists, bill of materials, and operating narrative',
      'Factory acceptance testing, commissioning, and operator training',
    ],
    quickSpecs: [
      ['Panel Types', 'Automation, MCC, Process & SCADA'],
      ['Standards', 'UL 508A, CSA C22.2, NFPA 79'],
      ['Enclosures', 'NEMA 1, 12, 3R, 4 & 4X'],
      ['Controllers', 'PLC, HMI, IPC & Relay Logic'],
      ['Networks', 'EtherNet/IP, Modbus, Profinet'],
      ['Testing', 'Documented Factory Acceptance Test'],
      ['Origin', 'Made in Canada'],
    ],
    applications: ['Manufacturing', 'Water & Wastewater', 'Oil & Gas', 'Material Handling', 'Building Systems'],
    link: '/products/control-panels',
  },
]

export default function ProductsClient() {
  const [sel, setSel] = useState(0)
  const p = products[sel]

  return (
    <div className="section bg-white">
      <div className="container">

        {/* Product tab selector */}
        <div className="prod-nav-v2" role="tablist" aria-label="Product categories">
          {products.map((prod, i) => (
            <button
              key={prod.id}
              id={`product-tab-${prod.id}`}
              type="button"
              role="tab"
              aria-selected={sel === i}
              aria-controls="selected-product-panel"
              onClick={() => setSel(i)}
              className={sel === i ? 'active' : ''}
            >
              {prod.name}
            </button>
          ))}
        </div>

        {/* Detail view — split layout: image+specs left, content right */}
        <div
          id="selected-product-panel"
          role="tabpanel"
          aria-labelledby={`product-tab-${p.id}`}
          className="split split-2-3 items-start"
        >

          {/* Left column: image + quick specs */}
          <div>
            <div className="responsive-override-exempt relative w-full h-[480px] max-md:h-[200px] rounded-[14px] overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 40vw"
                priority
              />
            </div>
            <div className="mt-6 p-[1.75rem] bg-off rounded-[12px]">
              <div className="font-mono text-[.8125rem] text-blue tracking-[.22em] uppercase mb-[.85rem]">Quick Specs</div>
              <div className="specs-table-wrap">
                <table className="specs-table">
                  <tbody>
                    {p.quickSpecs.map(([label, value]) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right column: product content */}
          <div>
            <div className="label">Product {p.num}</div>
            <h2 className="mb-2">{p.name}</h2>
            <p className="font-mono text-[1.125rem] text-blue tracking-[.08em] uppercase mb-4">{p.eyebrow}</p>

            {/* Standards badges */}
            <div className="product-standard-row mb-6">
              {p.standards.map(s => <span key={s} className="product-standard">{s}</span>)}
            </div>

            {/* KPI stat grid */}
            <div className="grid grid-cols-4 max-md:grid-cols-2 gap-[.85rem] max-md:gap-[.5rem] mb-7 w-full">
              {p.kpis.map(k => (
                <div key={k.label} className="py-[.9rem] px-[.65rem] bg-off rounded-[10px] text-center border border-[#E8ECF5]">
                  <div className="font-display text-[1rem] font-black text-navy tracking-[.04em] mb-[.2rem]">{k.value}</div>
                  <div className="font-title text-[.8125rem] tracking-[.12em] uppercase text-gray font-bold">{k.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="body mb-4">{p.desc1}</p>
            <p className="body mb-7">{p.desc2}</p>

            {/* Key features */}
            <h4 className="font-title text-[.9375rem] font-bold text-gray tracking-[.14em] uppercase mb-3">Key Features</h4>
            <ul className="feature-list mb-7">
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>

            {/* Applications */}
            <h4 className="font-title text-[.9375rem] font-bold text-gray tracking-[.14em] uppercase mb-3">Applications</h4>
            <div className="industry-tags mb-8">
              {p.applications.map(a => <span key={a} className="industry-tag">{a}</span>)}
            </div>

            {/* CTA row */}
            <div className="flex gap-4 flex-wrap">
              <Link href="/contact" className="btn btn-primary mag">Request a Quote</Link>
              <Link href={p.link} className="btn btn-outline-blue mag">Full Product Page →</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
