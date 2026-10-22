import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'

export const metadata = {
  title: 'Custom Power Transformers',
  description: 'Explore CANDRON custom power transformer projects, including matched replacement units, Arctic mining transformers, and a 6 MVA FR3-filled medium-voltage transformer.',
}


const categories = [
  {
    num: '01',
    name: 'Padmount Transformers',
    sub: 'Liquid-Filled · Underground Distribution',
    desc: 'Tamper-resistant, compartmentalized liquid-filled units for pad-mount underground cable systems. Three-phase and single-phase configurations from 15 kVA to 3,000 kVA.',
    href: '/products/transformers/padmount',
    specs: ['15 kVA – 3,000 kVA', '5 kV – 34.5 kV Primary', 'ANSI C57 / IEEE / CSA'],
    types: ['Three-Phase Padmount', 'Single-Phase Padmount'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="8" width="18" height="12" rx="2"/>
        <path d="M7 8V5a5 5 0 0 1 10 0v3"/>
        <circle cx="8.5" cy="14" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="15.5" cy="14" r="1.5" fill="currentColor" stroke="none"/>
        <line x1="8.5" y1="12.5" x2="15.5" y2="12.5" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    num: '02',
    name: 'Substation Transformers',
    sub: 'Liquid-Filled · Power Transformation',
    desc: 'Oil-immersed power transformers for utility substations and industrial facilities. High-voltage primaries from 34.5 kV to 345 kV with ONAN, ONAF, and OFAF cooling options.',
    href: '/products/transformers/substation',
    specs: ['1 MVA – 100+ MVA', '34.5 kV – 345 kV Primary', 'IEEE C57.12 / CSA C88'],
    types: ['Power Substation Transformer', 'Polemount Transformer'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="6" width="20" height="14" rx="2"/>
        <path d="M7 6V4M12 6V2M17 6V4"/>
        <line x1="7" y1="12" x2="17" y2="12"/>
        <line x1="7" y1="15" x2="17" y2="15"/>
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Low Voltage Dry-Type',
    sub: 'Dry-Type · Indoor Distribution',
    desc: 'Nine low-voltage dry-type designs — general-purpose, shielded isolation, drive isolation, K-factor, harmonic-mitigating, autotransformer, encapsulated, mini power centre and hazardous-location.',
    href: '/products/transformers/dry-type-lv',
    specs: ['3 kVA – 1,000 kVA', 'Up to 1.2 kV class', 'DOE 2016 / NRCan 2019'],
    types: ['General-Purpose', 'Shielded Isolation', 'K-Factor & Harmonic', '+ 6 more'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2 Q7 7 7 12 Q7 17 12 22 Q17 17 17 12 Q17 7 12 2"/>
        <line x1="7" y1="12" x2="3" y2="12"/>
        <line x1="17" y1="12" x2="21" y2="12"/>
      </svg>
    ),
  },
  {
    num: '04',
    name: 'Medium Voltage Dry-Type',
    sub: 'Dry-Type · Industrial / Utility',
    desc: 'VPI/VPE and epoxy cast-coil power transformers up to 46 kV class, plus neutral grounding transformers — oil-free medium voltage for plants, campuses, data centres and renewables.',
    href: '/products/transformers/dry-type-mv',
    specs: ['Up to 15,000 kVA', 'Up to 46 kV · 250 kV BIL', 'IEEE C57.12.01 / CSA C9'],
    types: ['VPI / VPE Power', 'Cast Coil', 'Grounding Transformer'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 12 C2 7 7 4 12 4 C17 4 22 7 22 12 C22 17 17 20 12 20 C7 20 2 17 2 12"/>
        <path d="M6 12 C6 9 9 7 12 7 C15 7 18 9 18 12"/>
        <line x1="12" y1="4" x2="12" y2="2"/>
        <line x1="12" y1="22" x2="12" y2="20"/>
      </svg>
    ),
  },
]

const transformerFamilies = [
  { name: 'Padmount', detail: 'Single- and three-phase underground distribution', href: '/products/transformers/padmount' },
  { name: 'Pole', detail: 'Overhead utility and rural distribution', href: '/products/transformers/substation/polemount' },
  { name: 'Station Class', detail: 'Industrial and utility substation applications', href: '/products/transformers/substation' },
  { name: 'EHV', detail: 'Extra-high-voltage project consultation', href: '/contact?product=ehv-transformer' },
  { name: 'Dry-Type', detail: '19 oil-free products: LV, MV, control, reactors & filters', href: '/products/transformers/dry-type' },
  { name: 'Solid-State Transformers', detail: 'Application review and engineered solutions', href: '/contact?product=solid-state-transformer' },
]

const transformerApplications = [
  { name: 'Control & Lighting', detail: 'Low-voltage dry-type, general-purpose step-up/step-down, isolation, and autotransformers' },
  { name: 'Distribution', detail: 'Utility, commercial, and industrial power distribution' },
  { name: 'Solar, Renewable & Inverter Duty', detail: 'Renewable generation and power-electronic loads' },
  { name: 'Traction', detail: 'Rail and transit power systems' },
  { name: 'Grounding', detail: 'System grounding and neutral-reference applications' },
  { name: 'Residential', detail: 'Underground and overhead residential distribution' },
  { name: 'Rural', detail: 'Long-feeder and remote-service applications' },
  { name: 'Generation', detail: 'Generator step-up and station-service applications' },
  { name: 'Transmission', detail: 'Grid and high-voltage power transfer applications' },
]

export default function TransformersPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background: "url('/images/projects/custom-power-transformers/transformer-ready-to-ship.jpg') center/cover" }}>
          <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <HeroArt kind="substation" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span>Transformers</span>
          </div>
          <div className="label label-white">ANSI · IEEE · CSA · UL</div>
          <h1>
            Transformer Solutions
            <br />
            <em>for Critical Infrastructure</em>
          </h1>
          <p className="lead mt-4">
            Padmount, substation, and dry-type transformers specified, manufactured, and tested in-house. Every unit built to the voltage, kVA, and environmental requirements of your project.
          </p>
          <div className="flex gap-[.65rem] flex-wrap mt-6">
            {['Padmount', 'Substation', 'LV Dry-Type', 'MV Dry-Type', 'Cast Coil', 'Custom Configurations'].map(b => (
              <span key={b} className="py-[.38rem] px-[.9rem] bg-white/[.1] border border-white/20 rounded-full text-[.9375rem] font-bold text-white font-mono tracking-[.04em]">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="bg-navy border-b border-white/[.08]">
        <div className="container">
          <div className="transformer-kpi-grid grid grid-cols-4 max-sm:grid-cols-2">
            {[
              { v: '4', l: 'Transformer Categories' },
              { v: 'CSA / ANSI', l: 'Certified Standards' },
              { v: '100+ MVA', l: 'Max Substation Rating' },
              { v: 'In-House', l: 'FAT & Testing' },
            ].map((k, i) => (
              <div key={k.l} className={`py-[1.1rem] px-4 text-center min-w-0 ${i < 3 ? 'border-r border-white/[.08]' : ''} max-sm:${i === 1 ? 'border-r-0' : ''}`}>
                <div className="font-display font-black text-[1.1875rem] text-white tracking-[.03em] mb-[.2rem] break-words [overflow-wrap:anywhere]">{k.v}</div>
                <div className="font-mono text-[.8125rem] text-white/[.4] tracking-[.14em] uppercase break-words [overflow-wrap:anywhere]">{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div className="section bg-off">
        <div className="container">
          <div className="text-center max-w-[580px] mx-auto mb-14 rv">
            <div className="label justify-center">Product Range</div>
            <h2>Four Transformer Categories.<br />One Manufacturing Source.</h2>
            <p className="lead mt-4">Every category is engineered and built in-house at our Toronto, Ontario facility — no third-party fabricators, no communication gaps.</p>
          </div>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`rv no-underline group flex flex-col gap-5 p-8 rounded-[20px] bg-white border border-[#E8ECF5] shadow-[0_2px_20px_rgba(5,9,31,.05)] transition-[border-color,box-shadow,transform] duration-200 hover:border-blue hover:shadow-[0_8px_40px_rgba(0,71,255,.12)] hover:-translate-y-[2px]${i === 1 ? ' d2' : i === 2 ? ' d3' : i === 3 ? ' d4' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-[12px] bg-blue/[.08] text-blue flex items-center justify-center shrink-0 transition-[background] duration-200 group-hover:bg-blue group-hover:text-white">
                    <div className="w-6 h-6">{cat.icon}</div>
                  </div>
                  <span className="font-mono text-[.8125rem] font-bold tracking-[.18em] text-blue/60 uppercase pt-[.2rem]">{cat.num}</span>
                </div>
                <div>
                  <div className="font-display font-extrabold text-[1.25rem] text-navy leading-[1.2] mb-[.35rem]">{cat.name}</div>
                  <div className="font-mono text-[.875rem] text-blue tracking-[.06em] mb-3">{cat.sub}</div>
                  <p className="font-mono text-[1.0625rem] text-gray leading-[1.65] m-0">{cat.desc}</p>
                </div>
                <div className="flex flex-wrap gap-[.45rem]">
                  {cat.specs.map(s => (
                    <span key={s} className="font-mono text-[.8125rem] font-bold tracking-[.04em] text-navy/70 bg-[#F4F6FA] px-[.7rem] py-[.3rem] rounded-[6px] border border-[#E8ECF5]">{s}</span>
                  ))}
                </div>
                <div className="border-t border-[#E8ECF5] pt-4">
                  <div className="font-mono text-[.8125rem] text-gray/60 uppercase tracking-[.12em] mb-2">Types Available</div>
                  <div className="flex gap-3 flex-wrap">
                    {cat.types.map(t => (
                      <span key={t} className="flex items-center gap-[.4rem] font-mono text-[.9375rem] text-navy font-semibold">
                        <span className="w-[5px] h-[5px] rounded-full bg-blue shrink-0"/>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="font-mono text-[.875rem] font-bold text-blue tracking-[.08em] uppercase mt-auto flex items-center gap-[.4rem] group-hover:gap-[.65rem] transition-[gap] duration-200">
                  Explore {cat.name} <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* TRANSFORMER FAMILIES & APPLICATIONS */}
      <div className="section bg-white">
        <div className="container">
          <div className="max-w-[720px] mb-12 rv">
            <div className="label">Transformer Portfolio</div>
            <h2>Transformer Types and Applications</h2>
            <p className="lead mt-4">
              Explore transformer solutions by construction or by the application they serve. Our engineering team can help translate project requirements into the right configuration.
            </p>
          </div>

          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
            <section className="rounded-[20px] bg-off border border-[#E8ECF5] p-8 max-sm:p-5 rv" aria-labelledby="transformer-families-heading">
              <div className="font-mono text-[.8125rem] font-bold tracking-[.18em] text-blue uppercase mb-3">By Construction</div>
              <h3 id="transformer-families-heading" className="font-display text-[1.375rem] font-black text-navy mb-6">Transformer Families</h3>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                {transformerFamilies.map((family, index) => (
                  <Link
                    key={family.name}
                    href={family.href}
                    className="min-w-0 no-underline group rounded-[14px] bg-white border border-[#E8ECF5] p-4 transition-[border-color,box-shadow] duration-200 hover:border-blue hover:shadow-[0_5px_22px_rgba(0,71,255,.1)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[.8125rem] font-bold tracking-[.12em] text-blue bg-blue/[.08] rounded-[6px] px-2 py-1 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                      <div className="min-w-0">
                        <div className="font-display text-[1.125rem] font-extrabold text-navy leading-[1.3] break-words">{family.name}</div>
                        <p className="font-mono text-[.9375rem] text-gray leading-[1.55] mt-2 mb-0 break-words">{family.detail}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] bg-navy border border-blue/[.18] p-8 max-sm:p-5 rv d2" aria-labelledby="transformer-applications-heading">
              <div className="font-mono text-[.8125rem] font-bold tracking-[.18em] text-blue uppercase mb-3">By Use Case</div>
              <h3 id="transformer-applications-heading" className="font-display text-[1.375rem] font-black text-white mb-6">Applications</h3>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-5 gap-y-4">
                {transformerApplications.map((application, index) => (
                  <div key={application.name} className="min-w-0 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue/[.16] text-blue flex items-center justify-center font-mono text-[.8125rem] font-bold shrink-0">{index + 1}</span>
                    <div className="min-w-0">
                      <div className="font-display text-[1.0625rem] font-bold text-white leading-[1.35] break-words">{application.name}</div>
                      <p className="font-mono text-[.875rem] text-white/[.68] leading-[1.5] mt-1 mb-0 break-words">{application.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* WHY CANDRON TRANSFORMERS */}
      <div className="wt-section">
        <div className="container">
          <div className="wt-header rv">
            <div>
              <div className="label label-white">The CANDRON Difference</div>
              <h2 className="wt-h2">Why Specify <em>CANDRON</em></h2>
            </div>
            <div className="wt-header-right">
              <p className="wt-intro max-w-[440px] text-left">Every transformer we build is specified, engineered, manufactured, and tested under one roof — giving you faster delivery, better documentation, and a single point of accountability.</p>
              <Link href="/contact" className="btn btn-primary mag shrink-0">Request a Quote →</Link>
            </div>
          </div>
          <div className="wt-grid">
            {[
              {
                n: '01', title: 'Specified to Your Project',
                desc: 'We work from your one-line, utility requirements, and site conditions — not a catalogue. Every transformer is specified to match your exact kVA, voltage, and impedance requirements.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
              },
              {
                n: '02', title: 'In-House Factory Testing',
                desc: 'Every unit undergoes applied potential, induced voltage, resistance, ratio, and impedance tests before shipment. Witnessed FAT is available for your team or third-party inspector.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              },
              {
                n: '03', title: 'ANSI, IEEE & CSA Compliance',
                desc: 'Our transformers are built and tested to the applicable standards for your project — including ANSI C57, IEEE C57.12, CSA C88, and UL 1561 for listed dry-type units.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
              },
              {
                n: '04', title: 'Full Documentation Package',
                desc: 'As-built drawings, test reports, nameplate data, connection diagrams, and O&M manuals delivered with every transformer — ready for your commissioning team and project records.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
              },
              {
                n: '05', title: 'Direct Engineering Access',
                desc: 'Reach our engineering team directly — no distributors, no sales layers. Technical questions, specification review, and project coordination are handled by the people who build your equipment.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
              },
              {
                n: '06', title: 'Canadian Manufacturing',
                desc: 'Built at our Toronto, Ontario facility with full in-house capability — electrical design, fabrication, assembly, and testing. No subcontracting, no overseas sourcing of critical components.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
              },
            ].map((item, i) => (
              <div className={`wt-card rv${i > 0 ? ` d${Math.min(i + 1, 6)}` : ''}`} key={item.n}>
                <div className="wt-card-top">
                  <div className="wt-num">{item.n}</div>
                  <div className="wt-icon">{item.icon}</div>
                </div>
                <div className="wt-title">{item.title}</div>
                <p className="wt-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CALCULATOR CTA BAND */}
      <div className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5">
            {[
              { title: 'kVA Calculator', desc: 'Calculate transformer size from load voltage and current.', href: '/resources/kva-calculator', label: 'kVA' },
              { title: 'Fault Current Calculator', desc: 'Determine available short-circuit current from transformer parameters.', href: '/resources/fault-current-calculator', label: 'AFC' },
              { title: 'kW to kVA Converter', desc: 'Convert between real power and apparent power using power factor.', href: '/resources/kw-kva-calculator', label: 'PF' },
            ].map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className={`rv no-underline flex flex-col gap-4 p-7 rounded-[16px] bg-navy border border-blue/[.18] transition-[border-color,box-shadow] duration-200 hover:border-blue hover:shadow-[0_6px_30px_rgba(0,71,255,.2)]${i > 0 ? ` d${i + 1}` : ''}`}
              >
                <div className="w-11 h-11 rounded-[10px] bg-blue/[.15] flex items-center justify-center">
                  <span className="font-display font-black text-[1rem] text-blue tracking-[.04em]">{c.label}</span>
                </div>
                <div>
                  <div className="font-display font-extrabold text-[1.125rem] text-white mb-2">{c.title}</div>
                  <p className="font-mono text-[1rem] text-white/[.68] leading-[1.65] m-0">{c.desc}</p>
                </div>
                <div className="font-mono text-[.875rem] font-bold text-blue tracking-[.1em] uppercase mt-auto">Open Calculator →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">Built for Your Specification</h2>
            <p className="lead rv !text-white/[.6] !max-w-[500px]">
              Tell us your voltage, kVA, and site requirements. Our engineering team will respond with a specification, lead time, and price — typically the same day.
            </p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
