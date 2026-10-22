'use client'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import TrustBar from '@/components/TrustBar'
import { PHONE } from '@/lib/inventory'

export interface KPI { value: string; label: string }
export interface Standard { name: string; desc: string; logo?: string | null }
export interface FAQ { q: string; a: string }
export interface SpecRow { label: string; value: string }
export interface RelatedType { name: string; sub: string; href: string }
export interface ProjectSpotlight {
  eyebrow: string
  title: string
  emphasis: string
  description: string
  image: string
  imageAlt: string
  secondaryImage?: string
  secondaryImageAlt?: string
  secondaryImageLabel?: string
  badges: string[]
  stats: KPI[]
  features: string[]
  ctaLabel: string
  ctaHref: string
  imageAspect?: 'landscape' | 'portrait'
}

export interface ProductTypePageProps {
  parentName: string
  parentHref: string
  categoryName?: string
  categoryHref?: string
  typeName: string
  eyebrow: string
  subtitle: string
  /** Background photo for the hero; omit for a plain drawing-sheet hero. */
  heroImage?: string
  applicationImage?: string
  badges: string[]
  kpis: KPI[]
  overviewTitle: string
  overviewText: string
  overviewPoints: string[]
  features: string[]
  upgrades: string[]
  specRows: SpecRow[]
  standards: Standard[]
  applications: string[]
  relatedTypes: RelatedType[]
  faqs: FAQ[]
  quoteItems: string[]
  projectSpotlight?: ProjectSpotlight
  /** Animated technical drawing shown in the right half of the hero. */
  heroArt?: ReactNode
  /** Replaces the overview photo (e.g. a photo slot with a placeholder). */
  overviewAside?: ReactNode
  /** Extra section rendered right after the overview. */
  afterOverview?: ReactNode
  /** Title over the related-types grid; defaults to "Explore {categoryName}". */
  relatedTitle?: string
}

export default function ProductTypePage({
  parentName, parentHref,
  categoryName, categoryHref,
  typeName, eyebrow, subtitle, heroImage, applicationImage, badges, kpis,
  overviewTitle, overviewText, overviewPoints,
  features, upgrades, specRows,
  standards, applications, relatedTypes, faqs, quoteItems,
  projectSpotlight,
  heroArt, overviewAside, afterOverview, relatedTitle,
}: ProductTypePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showTabNav, setShowTabNav] = useState(false)
  const [activeTab, setActiveTab] = useState('#overview')
  const heroRef = useRef<HTMLDivElement>(null)

  const tabLinks: [string, string][] = [
    ['#overview', 'Overview'],
    ...(projectSpotlight ? [['#project', 'Project Spotlight'] as [string, string]] : []),
    ['#features', 'Features'],
    ['#specs', 'Specifications'],
    ['#standards', 'Standards'],
    ['#applications', 'Applications'],
    ['#faq', 'FAQ'],
    ['#quote', 'Get a Quote'],
  ]

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setShowTabNav(!entry.isIntersecting),
      { rootMargin: '-72px 0px 0px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const ids = tabLinks.map(([href]) => href.slice(1))
    const els = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActiveTab(`#${visible[0].target.id}`)
      },
      { rootMargin: '-130px 0px -50% 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const shieldIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <>
      {/* ── HERO ── */}
      <div className="page-hero min-h-[calc(100vh-165px)]" ref={heroRef}>
        <div className="page-hero-bg" style={heroImage ? { background: `url('${heroImage}') center/cover` } : undefined} />
        {heroArt}
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href={parentHref}>{parentName}</Link>{categoryName && categoryHref ? <> / <Link href={categoryHref}>{categoryName}</Link></> : null} / <span>{typeName}</span>
          </div>
          <div className="label label-white">{eyebrow}</div>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)]">{typeName}</h1>
          <p className="lead mt-4 max-w-[600px]">{subtitle}</p>
          <div className="flex gap-[.65rem] flex-wrap mt-[1.4rem]">
            {badges.map(b => (
              <span key={b} className="py-[.38rem] px-[.9rem] bg-white/[.12] border border-white/25 rounded-full text-[.9375rem] font-bold text-white font-mono tracking-[.04em]">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI STRIP ── */}
      <div className="bg-navy border-b border-white/[.08]">
        <div className="container">
          <div className="ptype-kpi-grid grid" style={{ gridTemplateColumns: `repeat(${kpis.length}, 1fr)` }}>
            {kpis.map((k, i) => (
              <div key={k.label} className={`py-[1.1rem] max-md:py-3 px-4 max-md:px-2 text-center ${i < kpis.length - 1 ? 'border-r border-white/[.08]' : ''}`}>
                <div className="font-display font-black text-[1.1875rem] max-md:text-[1.0625rem] text-white tracking-[.03em] mb-[.2rem]">{k.value}</div>
                <div className="font-mono text-[.8125rem] max-md:text-[.8125rem] text-white/[.4] tracking-[.16em] max-md:tracking-[.08em] uppercase">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <TrustBar />

      {/* ── TAB NAV (fixed, appears after hero exits viewport) ── */}
      <div className={`fixed top-[72px] left-0 right-0 z-[39] bg-white border-b border-[#E8ECF5] shadow-[0_4px_24px_rgba(5,9,31,.07)] transition-[opacity,transform] duration-[.22s] ease-[ease] ${showTabNav ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-[6px] pointer-events-none'}`}>
        <div className="container">
          <div className="flex overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
            {tabLinks.map(([href, label]) => {
              const isActive = activeTab === href
              return (
                <a
                  key={href}
                  href={href}
                  className={`ptype-tab-link${isActive ? ' active' : ''}`}
                >
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      <div id="overview" className="section bg-white scroll-mt-[135px]">
        <div className="container">
          <div className="split items-start gap-[3.5rem]">
            <div className="rv-l">
              <div className="label">Overview</div>
              <h2 className="mb-5">{overviewTitle}</h2>
              <p className="body mb-6">{overviewText}</p>
              <ul className="check-list mb-8">
                {overviewPoints.map(p => <li key={p}>{p}</li>)}
              </ul>
              <div className="flex gap-4 flex-wrap">
                <Link href={`/contact?product=${encodeURIComponent(typeName)}`} className="btn btn-primary mag">Request a Quote</Link>
                <Link href="#specs" className="btn btn-outline-blue mag">View Specs →</Link>
              </div>
            </div>
            <div className="rv-r w-full">
              {overviewAside ?? (
              <div className="prod-detail-img w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImage} alt={typeName} className="w-full h-full object-cover block rounded-[14px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(5,9,31,.65)_100%)] pointer-events-none rounded-[14px]" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-display text-[.9375rem] font-extrabold text-white tracking-[.08em] uppercase opacity-[.85]">{categoryName}</div>
                  <div className="font-mono text-[.8125rem] text-white/[.55] tracking-[.06em] mt-[.18rem]">{eyebrow}</div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {afterOverview}

      {/* ── PROJECT SPOTLIGHT ── */}
      {projectSpotlight && (
        <section id="project" className="bg-navy py-20 max-md:py-14 scroll-mt-[135px]" aria-labelledby="project-spotlight-title">
          <div className="container">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
              <div className={`grid ${projectSpotlight.secondaryImage ? 'grid-cols-[1.08fr_.92fr] max-sm:grid-cols-1' : 'grid-cols-1'} gap-3 rv-l`}>
                <figure
                  className="relative w-full overflow-hidden rounded-[18px] border border-white/[.12] bg-white/[.04]"
                  style={{
                    aspectRatio: projectSpotlight.imageAspect === 'portrait' ? '3 / 4' : '4 / 3',
                    maxWidth: projectSpotlight.imageAspect === 'portrait' ? '570px' : undefined,
                    justifySelf: projectSpotlight.imageAspect === 'portrait' ? 'center' : undefined,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={projectSpotlight.image} alt={projectSpotlight.imageAlt} className="absolute inset-0 w-full h-full object-cover block" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.62),transparent_45%)] pointer-events-none" />
                  <figcaption className="absolute left-4 bottom-4 flex flex-wrap gap-2">
                    {projectSpotlight.badges.map((badge) => (
                      <span key={badge} className="rounded-full border border-white/25 bg-navy/80 px-3 py-2 font-mono text-[.8125rem] font-bold uppercase tracking-[.07em] text-white backdrop-blur-sm">{badge}</span>
                    ))}
                  </figcaption>
                </figure>
                {projectSpotlight.secondaryImage && projectSpotlight.secondaryImageAlt && (
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-white/[.12] bg-white/[.04]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={projectSpotlight.secondaryImage} alt={projectSpotlight.secondaryImageAlt} className="absolute inset-0 w-full h-full object-cover block" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.62),transparent_45%)] pointer-events-none" />
                    {projectSpotlight.secondaryImageLabel && (
                      <figcaption className="absolute left-4 bottom-4 rounded-full border border-white/25 bg-navy/80 px-3 py-2 font-mono text-[.8125rem] font-bold uppercase tracking-[.07em] text-white backdrop-blur-sm">
                        {projectSpotlight.secondaryImageLabel}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>

              <div className="rv-r">
                <div className="label label-white">{projectSpotlight.eyebrow}</div>
                <h2 id="project-spotlight-title" className="text-white mt-4 !leading-[1.08]">
                  {projectSpotlight.title}<br />
                  <em>{projectSpotlight.emphasis}</em>
                </h2>
                <p className="text-white/[.68] text-[1.125rem] leading-[1.8] mt-6 max-w-[620px]">{projectSpotlight.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                  {projectSpotlight.stats.map((item) => (
                    <div key={item.label} className="rounded-[12px] border border-white/[.1] bg-white/[.045] px-3 py-4 min-w-0">
                      <div className="font-display text-[1.0625rem] font-black text-white break-words">{item.value}</div>
                      <div className="font-mono text-[.8125rem] uppercase tracking-[.08em] text-white/[.68] mt-1.5">{item.label}</div>
                    </div>
                  ))}
                </div>

                <ul className="mt-8 p-0 list-none grid gap-3">
                  {projectSpotlight.features.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/[.68] text-[1.0625rem] leading-[1.55]">
                      <span className="mt-[.35rem] w-2 h-2 rounded-full bg-blue shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <Link href={projectSpotlight.ctaHref} className="btn btn-primary mag">{projectSpotlight.ctaLabel} →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES & UPGRADES ── */}
      <div id="features" className="section bg-off scroll-mt-[135px]">
        <div className="container">
          <div className="label rv">Features &amp; Upgrades</div>
          <h2 className="rv mb-10">What&apos;s Included</h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
            <div className="rv bg-white rounded-[14px] border border-[#E8ECF5] p-[1.75rem] shadow-[0_2px_12px_rgba(5,9,31,.05)]">
              <div className="font-mono text-[.8125rem] text-blue tracking-[.18em] uppercase font-bold mb-[1.1rem]">Standard Features</div>
              <ul className="check-list m-0">
                {features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className="rv bg-white rounded-[14px] border border-[#E8ECF5] p-[1.75rem] shadow-[0_2px_12px_rgba(5,9,31,.05)]">
              <div className="font-mono text-[.8125rem] text-[#059669] tracking-[.18em] uppercase font-bold mb-[1.1rem]">Optional Upgrades</div>
              <ul className="m-0 p-0 list-none flex flex-col gap-[.6rem]">
                {upgrades.map(u => (
                  <li key={u} className="flex gap-[.55rem] items-start text-[1.0625rem] text-gray leading-[1.55] font-mono">
                    <span className="text-[#059669] font-extrabold shrink-0 text-[1.125rem] leading-[1.4]">+</span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── SPECIFICATIONS ── */}
      <div id="specs" className="section bg-white scroll-mt-[135px]">
        <div className="container">
          <div className="label rv">Technical Specifications</div>
          <h2 className="rv mb-8">Full Specifications</h2>
          <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <div className="rv bg-white border border-[#E8ECF5] rounded-[14px] overflow-hidden shadow-[0_2px_16px_rgba(5,9,31,.06)]">
            <table className="ptype-spec-table w-full border-collapse text-[1.125rem] max-md:text-[1rem]">
              <thead>
                <tr className="bg-navy">
                  <th className="py-4 max-md:py-3 px-5 max-md:px-3 text-left font-mono text-[.8125rem] max-md:text-[.8125rem] font-bold tracking-[.14em] uppercase text-white/[.55] w-[35%] max-md:w-[30%]">Parameter</th>
                  <th className="py-4 max-md:py-3 px-5 max-md:px-3 text-left font-title text-[1.0625rem] max-md:text-[.9375rem] font-bold text-white/[.85]">Value</th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFF]'}>
                    <td className="py-[.85rem] max-md:py-2 px-5 max-md:px-3 border-b border-[#E8ECF5] font-mono text-[1rem] max-md:text-[.875rem] font-semibold text-gray tracking-[.02em]">{row.label}</td>
                    <td className="py-[.85rem] max-md:py-2 px-5 max-md:px-3 border-b border-[#E8ECF5] font-title text-[1.0625rem] max-md:text-[.9375rem] font-bold text-navy break-words">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>

      {/* ── STANDARDS ── */}
      <div id="standards" className="section bg-off scroll-mt-[135px]">
        <div className="container">
          <div className="label rv">Standards &amp; Compliance</div>
          <h2 className="rv mb-10">Built to Standard</h2>
          <div className="cert-grid cert-grid-3">
            {standards.map((s, i) => (
              <div key={s.name} className="cert-item rv rv-l" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="h-[52px] flex items-center justify-center mb-[.9rem]">
                  {s.logo
                    ? <img src={s.logo} alt={s.name} className="max-h-[44px] max-w-[110px] w-auto object-contain block" />
                    : shieldIcon
                  }
                </div>
                <div className="cert-name">{s.name}</div>
                <div className="cert-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── APPLICATIONS ── */}
      <div id="applications" className="section bg-white scroll-mt-[135px]">
        <div className="container">
          <div className="split items-start gap-12">
            <div className="rv-l">
              <div className="label">Applications</div>
              <h2 className="mb-6">Where It&apos;s Used</h2>
              <ul className="check-list">
                {applications.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div className="rv-r w-full flex flex-col gap-5">
              {applicationImage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[16px] border border-[#E8ECF5] shadow-[0_4px_24px_rgba(0,71,255,.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={applicationImage} alt={`${typeName} installed in a working facility`} className="w-full h-full object-cover block" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.3),transparent_45%)] pointer-events-none" />
                  <div className="absolute bottom-4 left-4 font-mono text-[.8125rem] font-bold tracking-[.14em] uppercase text-white/[.9]">Application View</div>
                </div>
              )}
              <div className="bg-off max-md:bg-transparent rounded-[16px] max-md:rounded-none !p-8 max-md:!p-0 border border-[#E8ECF5] max-md:border-0 shadow-[0_4px_24px_rgba(0,71,255,.06)] max-md:shadow-none">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[10px] bg-blue/10 flex items-center justify-center text-blue shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <div className="font-display font-extrabold text-[1.1875rem] text-navy">End-to-End Services</div>
              </div>
              <p className="body mb-5">From design and specification through factory testing, commissioning, and ongoing maintenance — CANDRON delivers at every phase.</p>
              <ul className="check-list">
                <li>Engineering drawings and coordination studies</li>
                <li>Factory acceptance testing (FAT) with full reports</li>
                <li>Site commissioning and protection settings</li>
                <li>Spare parts, training, and maintenance support</li>
              </ul>
              <div className="mt-6">
                <Link href="/contact" className="btn btn-primary">Get a Project Quote</Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div id="faq" className="section bg-off scroll-mt-[135px]">
        <div className="container max-w-[780px]">
          <div className="label">FAQ</div>
          <h2 className="mb-6 max-md:mb-4">Common Questions</h2>
          <div className="flex flex-col gap-[.6rem]">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-white rounded-[12px] border border-[#E8ECF5] overflow-hidden transition-[box-shadow] duration-200 ${openFaq === i ? 'shadow-[0_4px_20px_rgba(5,9,31,.08)]' : ''}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left bg-transparent border-0 py-[1.1rem] px-[1.35rem] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-title font-bold text-navy text-[1.125rem] leading-[1.4]">{faq.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 text-gray transition-[transform] duration-[.25s] ${openFaq === i ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div className={`overflow-hidden transition-[max-height] duration-[.3s] ease-[ease] ${openFaq === i ? 'max-h-[600px]' : 'max-h-0'}`}>
                  <p className="py-0 px-[1.35rem] max-md:px-4 pb-[1.1rem] max-md:pb-3 font-mono text-[1.0625rem] max-md:text-[1rem] text-gray leading-[1.7] m-0">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GET A QUOTE ── */}
      <div id="quote" className="section bg-navy scroll-mt-[135px]">
        <div className="container">
          <div className="split items-start gap-[3.5rem]">
            <div>
              <div className="label text-blue">Get a Quote</div>
              <h2 className="text-white mb-5">Ready to Spec<br />Your Project?</h2>
              <p className="font-mono text-white/[.6] text-[1.125rem] leading-[1.75] mb-7">
                Our engineering team responds with specs, lead times, and pricing the same day. Tell us what you need:
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-[.65rem]">
                {quoteItems.map(q => (
                  <li key={q} className="flex gap-[.7rem] items-start font-mono text-[1.0625rem] text-white/[.7] leading-[1.5]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-[.15rem]">
                      <path d="M2 7l4 4 6-7" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/[.04] border border-white/[.1] rounded-[16px] p-8">
              <div className="font-display font-extrabold text-[1.125rem] text-white mb-[.6rem]">Same-Day Response</div>
              <p className="font-mono text-[1.0625rem] text-white/[.55] mb-6 leading-[1.7]">
                Send us your project details and we&apos;ll respond with a price, lead time, and any clarifying questions — typically within a few hours.
              </p>
              <Link href={`/contact?product=${encodeURIComponent(typeName)}`} className="btn btn-primary inline-flex w-full justify-center mb-[.85rem]">
                Request a Quote →
              </Link>
              <a href={PHONE.href} className="flex items-center justify-center gap-2 font-mono text-[1rem] text-white/[.45] no-underline">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.17 12 19.79 19.79 0 011.12 3.54 2 2 0 013.09 1.36h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                Or call {PHONE.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED TYPES ── */}
      {relatedTypes.length > 0 && (
        <div className="section bg-white">
          <div className="container">
            <div className="label rv">Other Types</div>
            <h2 className="rv mb-8">{relatedTitle ?? `Explore ${categoryName}`}</h2>
            <div className="ptype-related-grid grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(relatedTypes.length, 4)}, 1fr)` }}>
              {relatedTypes.map((t, i) => (
                <Link key={t.href} href={t.href} className="rv no-underline flex flex-col gap-[.6rem] p-[1.4rem] rounded-[12px] bg-off border border-[#E8ECF5] transition-[border-color,box-shadow] duration-150 hover:border-blue hover:shadow-[0_4px_20px_rgba(0,71,255,.1)]" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="font-title font-bold text-[1.125rem] text-navy leading-[1.3]">{t.name}</div>
                  <div className="font-mono text-[.9375rem] text-blue tracking-[.06em]">{t.sub}</div>
                  <div className="font-mono text-[.9375rem] font-bold text-blue tracking-[.08em] uppercase mt-auto pt-2">View specs →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
