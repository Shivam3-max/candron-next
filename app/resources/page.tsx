import Link from 'next/link'

export const metadata = {
  title: 'Resources | CANDRON ENERGY INC.',
  description: 'Free electrical engineering calculators for transformer sizing, fault current analysis, harmonics, efficiency, and power factor — built for engineers and procurement teams.',
}

const groups = [
  {
    heading: 'Sizing & Conversion',
    desc: 'Fundamental tools for transformer and load sizing.',
    items: [
      {
        href: '/resources/kva-calculator',
        title: 'Transformer kVA Calculator',
        desc: 'Solve for kVA, Volts, or Amps. Single-phase and three-phase with √3 multiplier.',
        tags: ['kVA Sizing', '1Ø / 3Ø', 'Safety Factor'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="21"/><line x1="3" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="21" y2="12"/></svg>),
      },
      {
        href: '/resources/kw-kva-calculator',
        title: 'kW to kVA Converter',
        desc: 'Convert between real power (kW), apparent power (kVA), and power factor.',
        tags: ['Power Factor', 'kW / kVA / PF', 'Load Analysis'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>),
      },
      {
        href: '/resources/hp-kva-calculator',
        title: 'HP to kVA Calculator',
        desc: 'Convert motor horsepower to transformer kVA accounting for motor efficiency and power factor.',
        tags: ['Motor Sizing', 'HP / kW / kVA', 'NEMA Efficiency'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/><circle cx="12" cy="12" r="3" fill="currentColor" strokeWidth="0" opacity=".25"/></svg>),
      },
    ],
  },
  {
    heading: 'Protection & Power Quality',
    desc: 'Fault current analysis and harmonic distortion tools.',
    items: [
      {
        href: '/resources/fault-current-calculator',
        title: 'Fault Current Calculator',
        desc: 'Calculate available short-circuit current at the transformer secondary from kVA, voltage, and %Z.',
        tags: ['AFC / ASCC', 'Protective Device Sizing', 'Arc Flash'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>),
      },
      {
        href: '/resources/harmonic-calculator',
        title: 'Harmonic Calculator',
        desc: 'Compute THD and K-factor from individual harmonic currents. Determine the correct K-rated transformer.',
        tags: ['THD', 'K-Factor', 'K-Rating Selection'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12c1.5-4 3-6 4-6s2.5 4 4 4 2.5-8 4-8 2.5 6 4 6 1.5-2 2-2"/></svg>),
      },
      {
        href: '/resources/harmonic-reactor-calculator',
        title: 'Harmonic Reactor Calculator',
        desc: 'Size a line reactor for a VFD or non-linear load. Outputs inductance in mH and estimated THD reduction.',
        tags: ['Line Reactor', 'VFD / Drive', 'Inductance (mH)'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 12a2 2 0 0 1 4 0 2 2 0 0 0 4 0 2 2 0 0 1 4 0"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>),
      },
    ],
  },
  {
    heading: 'Performance & Economics',
    desc: 'Transformer efficiency, savings analysis, and impedance tools.',
    items: [
      {
        href: '/resources/efficiency-calculator',
        title: 'Efficiency Calculator',
        desc: 'Calculate transformer efficiency at any load level and all-day efficiency based on no-load and copper losses.',
        tags: ['DOE 2016', 'Core & Copper Losses', 'All-Day Efficiency'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>),
      },
      {
        href: '/resources/savings-payback-calculator',
        title: 'Savings & Payback Calculator',
        desc: 'Compare two transformers by annual energy losses, cost savings, CO₂ reduction, and simple payback period.',
        tags: ['Energy Savings', 'Payback Period', 'CO₂ Reduction'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>),
      },
      {
        href: '/resources/inductance-calculator',
        title: 'Inductance Calculator',
        desc: 'Calculate transformer leakage reactance and inductance from kVA, voltage, and %Z. Includes short-circuit current.',
        tags: ['Leakage Reactance', 'Inductance (mH)', 'Isc'],
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="9" width="20" height="6" rx="3"/><line x1="2" y1="12" x2="2" y2="12"/><line x1="22" y1="12" x2="22" y2="12"/></svg>),
      },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '5rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Resources</span>
          </div>
          <div className="label label-white">Engineering Tools</div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>
            Electrical Engineering
            <br /><em>Calculators</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '560px' }}>
            9 free sizing, conversion, and analysis tools for transformer specification, protection coordination, harmonic mitigation, and energy economics — built for engineers and procurement teams.
          </p>
        </div>
      </div>

      {/* CALCULATORS */}
      <div className="section bg-off" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div className="container">
          <div className="flex flex-col gap-16">
            {groups.map(g => (
              <div key={g.heading}>
                <div className="mb-8">
                  <div className="label mb-2">{g.heading}</div>
                  <p className="font-mono text-[.85rem] text-gray m-0">{g.desc}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
                  {g.items.map(c => (
                    <Link key={c.href} href={c.href} className="group no-underline">
                      <div className="bg-white rounded-[20px] border border-[#E8ECF5] p-8 h-full flex flex-col gap-6 transition-all duration-200 group-hover:border-blue group-hover:shadow-[0_8px_32px_rgba(0,71,255,.10)]">
                        <div className="w-14 h-14 rounded-[14px] bg-blue/[.07] flex items-center justify-center text-blue transition-colors duration-200 group-hover:bg-blue group-hover:text-white">
                          {c.icon}
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                          <h2 className="font-title font-bold text-navy text-[1.05rem] leading-[1.3] m-0">{c.title}</h2>
                          <p className="font-mono text-[.8rem] text-gray leading-[1.7] m-0">{c.desc}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {c.tags.map(t => (
                            <span key={t} className="font-mono text-[.6rem] font-bold tracking-[.1em] uppercase text-blue/80 bg-blue/[.07] px-3 py-[.3rem] rounded-full">{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[.75rem] font-semibold text-blue">
                          Open Calculator
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-150 group-hover:translate-x-[3px]"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* INFO STRIP */}
          <div className="mt-20 bg-navy rounded-[20px] p-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div>
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-3">Need More Help?</div>
              <h3 className="font-display font-black text-white text-[1.4rem] leading-[1.3] m-0">Talk to a CANDRON Engineer</h3>
              <p className="font-mono text-[.82rem] text-white/50 mt-2 leading-[1.65] m-0 max-w-[420px]">
                Our engineering team can review your specifications, confirm sizing, and provide same-day quotes on stock and custom-built transformers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact" className="btn btn-primary whitespace-nowrap">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline whitespace-nowrap">View Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
