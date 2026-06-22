'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CanadaFlag from '@/components/CanadaFlag'

const products = [
  {
    id: 'mv-switchgear',
    num: '01',
    name: 'MV Switchgear',
    tagline: '1 kV to 36 kV',
    image: '/images/switchgear.jpg',
    eyebrow: 'Medium Voltage — 1 kV to 36 kV',
    standards: ['CSA C22.2', 'UL 508A', 'IEEE C37.20.2', 'IEC 62271'],
    desc1: "Custom medium voltage switchgear from 1 kV to 36 kV — designed, manufactured, and tested in-house at our Toronto facility. Metal-clad, metal-enclosed, and pad-mounted configurations built to your project's exact single-line diagram.",
    desc2: "Every MV switchgear lineup is engineered by our team, assembled with copper busbars and vacuum circuit breakers rated to your fault current, and fully factory-tested before delivery — no outsourced fabrication, no third-party unknowns.",
    kpis: [
      { value: '1–36 kV', label: 'Voltage Range' },
      { value: 'Up to 4000 A', label: 'Current Rating' },
      { value: 'Arc-Rated', label: 'Construction' },
      { value: 'CSA / UL', label: 'Certified' },
    ],
    features: [
      'Metal-clad (draw-out VCBs) and metal-enclosed (load-break/fused) configurations',
      'Pad-mounted outdoor enclosures — NEMA 3R or NEMA 4X rated',
      'Arc fault protection rated (ARST) construction with compartmentalization',
      'Protection relay integration: 50/51, 27/59, 67, 81, 87 functions',
      'CT/PT revenue metering compartment per single-line requirements',
      'SCADA/IEC 61850 gateway integration available per section',
    ],
    quickSpecs: [
      ['Type', 'Metal-Clad & Metal-Enclosed MV'],
      ['Standards', 'CSA C22.2, IEEE C37.20.2/.3'],
      ['Voltage Range', '1 kV to 36 kV'],
      ['Current Rating', '600 A to 4000 A'],
      ['Short Circuit', 'Up to 50 kA sym.'],
      ['Testing', 'Full FAT In-House'],
      ['Origin', 'Canadian Manufactured'],
    ],
    applications: ['Industrial Plants', 'Oil & Gas Facilities', 'Utility Substations', 'Mining Sites', 'Renewable Energy'],
    link: '/products/mv-switchgear',
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
    desc2: "Candron LV switchgear integrates air circuit breakers, copper busbars, CT/PT metering, and digital power monitoring in free-standing or wall-mount lineups. Every unit is manufactured and tested in-house in Toronto.",
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
      ['Voltage Range', 'Up to 600 V (NA); 1000 V (IEC)'],
      ['Current Rating', '400 A to 3200 A main bus'],
      ['Short Circuit', 'Up to 100 kA AIC'],
      ['Testing', 'Factory Acceptance Testing'],
      ['Origin', 'Canadian Manufactured'],
    ],
    applications: ['Industrial PDCs', 'Service Entrance', 'Data Centres', 'Generator Paralleling', 'Water Treatment'],
    link: '/products/lv-switchgear',
  },
  {
    id: 'junction-box-splitters',
    num: '03',
    name: 'Junction Box & Splitters',
    tagline: 'LV & MV Power Distribution',
    image: '/images/switchgear.jpg',
    eyebrow: 'LV to 35 kV Power Distribution',
    standards: ['CSA C22.2', 'UL Listed', 'NEMA Standards'],
    desc1: "Industrial power junction boxes and splitters for organized, safe distribution of power from a single source to multiple circuits — built for oil & gas, mining, manufacturing, and utility environments.",
    desc2: "LV junction boxes up to 1,000 V and MV units rated to 35 kV. Weatherproof (NEMA 3R/4X), explosion-proof (Class I Div 1/2), fibreglass, and stainless steel enclosures available — all with door limit switch safety interlocks as standard.",
    kpis: [
      { value: 'Up to 35 kV', label: 'MV Rated' },
      { value: 'NEMA 3R / 4X', label: 'Enclosure' },
      { value: 'LV & MV', label: 'Voltage Range' },
      { value: 'CSA / UL', label: 'Certified' },
    ],
    features: [
      'Copper busbar with 2-hole NEMA pads — pre-drilled for mechanical or compression lugs',
      'Door limit switch interlock — trips upstream breaker if opened energized',
      'Weatherproof (NEMA 3R/4X), explosion-proof (Div 1/2), and fibreglass options',
      'Posi Pin connectors for visible open-air isolation (hot-stick operable)',
      'Non-ferrous aluminum gland plates — top, bottom, or side cable entry',
      'IR windows for thermographic inspection without opening the enclosure',
    ],
    quickSpecs: [
      ['LV Rating', 'Up to 1,000 V AC'],
      ['MV Rating', '1 kV to 35 kV (5, 8, 15 kV common)'],
      ['Bus Material', 'Copper, 2-hole NEMA pads'],
      ['Enclosure', 'NEMA 12, 3R, 4X; fibreglass; SS'],
      ['Safety', 'Door limit switch — upstream trip'],
      ['Connectors', 'Posi Pin, Burndy, Ilsco compression'],
      ['Origin', 'Canadian Manufactured'],
    ],
    applications: ['Oil & Gas Wellsites', 'Mining Sites', 'Utility Cable Splice', 'Renewable Energy', 'Industrial Skids'],
    link: '/products/junction-box-splitters',
  },
  {
    id: 'switchboards',
    num: '04',
    name: 'Switchboards',
    tagline: 'Low Voltage Distribution',
    image: '/images/switchboards.jpg',
    eyebrow: 'Low Voltage Power Distribution',
    standards: ['UL 891', 'CSA C22.2', 'ESA-Ready'],
    desc1: "Custom-engineered switchboards designed to provide safe and efficient power distribution for commercial, industrial, and infrastructure applications. Built to your exact requirements, assembled and tested in-house at our Toronto facility.",
    desc2: "With full in-house engineering and manufacturing, Candron delivers switchboards that fit your project's specific electrical requirements — not off-the-shelf compromises. Main-tie-main, utility metering, and distribution configurations available.",
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
      ['Origin', 'Canadian Manufactured'],
    ],
    applications: ['Commercial Buildings', 'Manufacturing Facilities', 'Healthcare', 'Institutional Projects', 'Infrastructure'],
    link: '/products/switchboards',
  },
]

export default function ProductsClient() {
  const [sel, setSel] = useState(0)
  const p = products[sel]

  return (
    <div className="section bg-white">
      <div className="container">

        {/* Product tab selector */}
        <div className="prod-nav-v2">
          {products.map((prod, i) => (
            <button
              key={prod.id}
              onClick={() => setSel(i)}
              className={sel === i ? 'active' : ''}
            >
              {prod.name}
            </button>
          ))}
        </div>

        {/* Detail view — split layout: image+specs left, content right */}
        <div className="split split-2-3" style={{ alignItems: 'start' }}>

          {/* Left column: image + quick specs */}
          <div>
            <div className="prod-detail-img">
              <Image
                src={p.image}
                alt={p.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:1024px) 100vw, 40vw"
                priority
              />
            </div>
            <div style={{ marginTop: '1.5rem', padding: '1.75rem', background: 'var(--off)', borderRadius: '12px' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'var(--blue)', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '.85rem' }}>Quick Specs</div>
              <div className="specs-table-wrap">
                <table className="specs-table">
                  <tbody>
                    {p.quickSpecs.map(([label, value]) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{label === 'Origin' ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}><CanadaFlag height={20} />{value}</span> : value}</td>
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
            <h2 style={{ marginBottom: '.5rem' }}>{p.name}</h2>
            <p style={{ fontSize: '.88rem', fontFamily: 'var(--fm)', color: 'var(--blue)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>{p.eyebrow}</p>

            {/* Standards badges */}
            <div className="product-standard-row" style={{ marginBottom: '1.5rem' }}>
              {p.standards.map(s => <span key={s} className="product-standard">{s}</span>)}
            </div>

            {/* KPI stat grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '.85rem', marginBottom: '1.75rem' }}>
              {p.kpis.map(k => (
                <div key={k.label} style={{ padding: '.9rem .65rem', background: 'var(--off)', borderRadius: '10px', textAlign: 'center', border: '1px solid #E8ECF5' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.75rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '.04em', marginBottom: '.2rem' }}>{k.value}</div>
                  <div style={{ fontFamily: 'var(--ft)', fontSize: '.5rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray)', fontWeight: 700 }}>{k.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="body" style={{ marginBottom: '1rem' }}>{p.desc1}</p>
            <p className="body" style={{ marginBottom: '1.75rem' }}>{p.desc2}</p>

            {/* Key features */}
            <h4 style={{ fontFamily: 'var(--ft)', fontSize: '.72rem', fontWeight: 700, color: 'var(--gray)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '.75rem' }}>Key Features</h4>
            <ul className="feature-list" style={{ marginBottom: '1.75rem' }}>
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>

            {/* Applications */}
            <h4 style={{ fontFamily: 'var(--ft)', fontSize: '.72rem', fontWeight: 700, color: 'var(--gray)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '.75rem' }}>Applications</h4>
            <div className="industry-tags" style={{ marginBottom: '2rem' }}>
              {p.applications.map(a => <span key={a} className="industry-tag">{a}</span>)}
            </div>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary mag">Request a Quote</Link>
              <Link href={p.link} className="btn btn-outline-blue mag">Full Product Page →</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
