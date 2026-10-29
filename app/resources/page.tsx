import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/seo'

export const metadata = { alternates: { canonical: '/resources' },
  title: 'Resources',
  description: 'Free tools for electrical teams: transformer and fault-current calculators, a lead-time planner, CSA C282 test planner, checklists and Division 26 specs.',
}

const toolkit = [
  {
    href: '/resources/lead-time-planner',
    title: 'Long-Lead Equipment Planner',
    desc: 'Work back from your energization date to an order-by date for every piece of long-lead gear.',
    kind: 'Interactive tool',
    tags: ['Order-by dates', 'Schedule risk', 'CSV / PDF'],
  },
  {
    href: '/resources/fat-commissioning-pack',
    title: 'FAT & Commissioning Pack',
    desc: 'Witness agendas, pre-energization checklists and a punch list for MV switchgear and transformers.',
    kind: 'PDF checklists',
    tags: ['Factory testing', 'Energization', 'Punch list'],
  },
  {
    href: '/resources/rfq-scorecard',
    title: 'RFQ & Bid Scorecard',
    desc: 'An RFQ template that makes quotes comparable, plus a weighted scorecard for up to five bidders.',
    kind: 'Excel workbook',
    tags: ['Procurement', 'Bid comparison', 'Weighted scoring'],
  },
  {
    href: '/resources/projects-radar',
    title: 'Canada Power Projects Radar',
    desc: 'Newly announced Canadian data centre, storage, renewable, transmission and mining projects, every month.',
    kind: 'Monthly digest',
    tags: ['Project pipeline', 'Business development', 'Free email'],
  },
  {
    href: '/resources/lead-time-index',
    title: 'Lead-Time Index',
    desc: 'Quarterly lead-time ranges for transformers, switchgear and standby power equipment in Canada.',
    kind: 'Quarterly report',
    tags: ['Q4 2026', 'Market lead times', 'Free email'],
  },
  {
    href: '/resources/generator-test-planner',
    title: 'CSA C282 Generator Test Planner',
    desc: 'A 12-month inspection and load-test calendar for an emergency generator, with a printable logbook.',
    kind: 'Interactive tool',
    tags: ['CSA C282', 'Calendar file', 'PDF logbook'],
  },
  {
    href: '/resources/oil-test-readout',
    title: 'Free Oil-Test (DGA) Read-Out',
    desc: 'Send your transformer oil test and an engineer emails a plain-English read-out. Duval Triangle check included.',
    kind: 'Free engineering review',
    tags: ['Dissolved gas analysis', 'Any make', 'Duval Triangle'],
  },
  {
    href: '/resources/cold-climate-checklist',
    title: 'Cold-Climate & Arctic Checklist',
    desc: 'What to specify, test, ship, install and maintain so electrical gear works at −45 °C.',
    kind: 'PDF checklists',
    tags: ['Northern sites', 'Specification', 'Winter O&M'],
  },
  {
    href: '/resources/division-26-specs',
    title: 'Division 26 Guide Specifications',
    desc: 'Editable Word sections for padmounts, metal-clad switchgear, dry-type transformers and switchboards.',
    kind: 'Word documents',
    tags: ['Consulting engineers', 'CSA references', '.docx'],
  },
]

const resourceLinks = [
  {
    href: '#toolkit',
    title: 'Project Toolkit',
    desc: 'Planners, checklists, specifications, templates and market reports for electrical teams.',
    action: `Explore ${toolkit.length} tools`,
    icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/></svg>,
  },
  {
    href: '#calculators',
    title: 'Calculators',
    desc: 'Sizing, conversion, protection, harmonics, and energy-analysis tools.',
    action: 'Explore 9 calculators',
    icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h2m4 0h2M8 15h2m4 0h2M8 19h2m4 0h2"/></svg>,
  },
  {
    href: '/terms-and-conditions',
    title: 'Terms & Conditions',
    desc: 'Find out how to obtain the terms applicable to your quotation, order, or project.',
    action: 'View document information',
    icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5M9 12h7M9 16h7"/></svg>,
  },
  {
    href: '/warranty',
    title: 'Warranty',
    desc: 'Warranty document guidance, claim preparation, and direct support from our team.',
    action: 'Get warranty support',
    icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  },
  {
    href: '/blog',
    title: 'Blogs',
    desc: 'Technical guidance, industry insights, inventory updates, and company news.',
    action: 'Visit the blog',
    icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 19.5V5a2 2 0 012-2h12a2 2 0 012 2v14.5a1.5 1.5 0 01-2.25 1.3L12 17.5l-5.75 3.3A1.5 1.5 0 014 19.5z"/><path d="M8 7h8M8 11h8"/></svg>,
  },
]

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
      <JsonLd data={breadcrumbLd([{ name: 'Resources', href: '/resources' }])} />
      {/* HERO */}
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '5rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <HeroArt kind="res-hub" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Resources</span>
          </div>
          <div className="label label-white">Knowledge &amp; Support</div>
          <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.15rem)' }}>
            Resources for Every
            <br /><em>Project Stage</em>
          </h1>
          <p className="lead mt-4" style={{ width: 'min(560px, 100%)' }}>
            Access electrical engineering calculators, project documents, warranty support, and practical insights from the CANDRON team.
          </p>
        </div>
      </div>

      <section className="res-links-section bg-white border-b border-[#E8ECF5]">
        <div className="container">
          <div className="res-links">
            {resourceLinks.map(resource => (
              <Link key={resource.href} href={resource.href} className="res-link group no-underline rounded-[16px] border border-[#E3E8F2] bg-white flex flex-col transition-all duration-200 hover:border-blue hover:shadow-[0_8px_28px_rgba(0,71,255,.09)]">
                <div className="res-link-icon rounded-[11px] bg-blue/[.07] text-blue flex items-center justify-center transition-colors duration-200 group-hover:bg-blue group-hover:text-white">{resource.icon}</div>
                <div className="res-link-text">
                  <h2 className="font-title font-bold text-navy m-0">{resource.title}</h2>
                  <p className="font-mono text-gray m-0">{resource.desc}</p>
                </div>
                <span className="res-link-action font-mono uppercase font-bold text-blue mt-auto">{resource.action} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT TOOLKIT */}
      <section id="toolkit" className="res-section bg-white scroll-mt-[100px]">
        <div className="container">
          <div className="res-intro">
            <div className="label">Project Toolkit</div>
            <h2 className="mb-4">Free Tools for Electrical Project Teams</h2>
            <p className="body">Practical resources for planning, buying, testing and commissioning electrical equipment, from the people who supply it. No sign-up needed.</p>
          </div>
          <div className="res-tools">
            {toolkit.map(t => (
              <Link key={t.href} href={t.href} className="group no-underline">
                <div className="res-tool h-full rounded-[20px] border border-[#E8ECF5] bg-off flex flex-col transition-all duration-200 group-hover:border-blue group-hover:shadow-[0_8px_32px_rgba(0,71,255,.10)]">
                  <span className="font-mono text-[.8125rem] font-bold tracking-[.14em] uppercase text-blue">{t.kind}</span>
                  <div className="res-tool-text flex flex-col flex-1">
                    <h3 className="font-title font-bold text-navy m-0">{t.title}</h3>
                    <p className="text-gray m-0">{t.desc}</p>
                  </div>
                  <div className="res-tags flex flex-wrap gap-2">
                    {t.tags.map(tag => <span key={tag} className="font-mono text-[.8125rem] font-bold tracking-[.1em] uppercase text-blue/80 bg-blue/[.07] px-3 py-[.3rem] rounded-full">{tag}</span>)}
                  </div>
                  <span className="res-open font-mono font-semibold text-blue">Open →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATORS */}
      <div id="calculators" className="res-section res-section-calc bg-off scroll-mt-[100px]">
        <div className="container">
          <div className="res-intro">
            <div className="label">Engineering Calculators</div>
            <h2 className="mb-4">Nine Practical Tools for Faster Decisions</h2>
            <p className="body">Free sizing, conversion, and analysis tools for transformer specification, protection coordination, harmonic mitigation, and energy economics.</p>
          </div>
          <div className="res-groups">
            {groups.map(g => (
              <div key={g.heading}>
                <div className="res-group-head">
                  <div className="label mb-2">{g.heading}</div>
                  <p className="font-mono text-gray m-0">{g.desc}</p>
                </div>
                <div className="res-calcs">
                  {g.items.map(c => (
                    <Link key={c.href} href={c.href} className="group no-underline">
                      <div className="res-calc bg-white rounded-[20px] border border-[#E8ECF5] h-full flex flex-col transition-all duration-200 group-hover:border-blue group-hover:shadow-[0_8px_32px_rgba(0,71,255,.10)]">
                        <div className="res-calc-icon rounded-[14px] bg-blue/[.07] flex items-center justify-center text-blue transition-colors duration-200 group-hover:bg-blue group-hover:text-white">
                          {c.icon}
                        </div>
                        <div className="res-calc-text flex flex-col flex-1">
                          <h2 className="font-title font-bold text-navy m-0">{c.title}</h2>
                          <p className="font-mono text-gray m-0">{c.desc}</p>
                        </div>
                        <div className="res-tags flex flex-wrap gap-2">
                          {c.tags.map(t => (
                            <span key={t} className="font-mono text-[.8125rem] font-bold tracking-[.1em] uppercase text-blue/80 bg-blue/[.07] px-3 py-[.3rem] rounded-full">{t}</span>
                          ))}
                        </div>
                        <div className="res-open flex items-center gap-2 font-mono font-semibold text-blue">
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
          <div className="resources-help-card bg-navy rounded-[20px] flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="min-w-0">
              <div className="font-mono text-[.8125rem] text-blue tracking-[.22em] uppercase mb-3">Need More Help?</div>
              <h3 className="font-display font-black text-white text-[1.54rem] leading-[1.3] m-0">Talk to a CANDRON Engineer</h3>
              <p className="font-mono text-[1.0625rem] text-white/[.68] mt-2 leading-[1.65] m-0 max-w-[420px]">
                Our engineering team can review your specifications, confirm sizing, and provide same-day quotes on stock and custom-built transformers.
              </p>
            </div>
            <div className="resources-help-actions flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact" className="btn btn-primary whitespace-nowrap">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline whitespace-nowrap">View Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
