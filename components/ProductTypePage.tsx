'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import TrustBar from '@/components/TrustBar'

export interface KPI { value: string; label: string }
export interface Standard { name: string; desc: string; logo?: string | null }
export interface FAQ { q: string; a: string }
export interface SpecRow { label: string; value: string }
export interface RelatedType { name: string; sub: string; href: string }

export interface ProductTypePageProps {
  parentName: string
  parentHref: string
  categoryName?: string
  categoryHref?: string
  typeName: string
  eyebrow: string
  subtitle: string
  heroImage: string
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
}

export default function ProductTypePage({
  parentName, parentHref,
  categoryName, categoryHref,
  typeName, eyebrow, subtitle, heroImage, badges, kpis,
  overviewTitle, overviewText, overviewPoints,
  features, upgrades, specRows,
  standards, applications, relatedTypes, faqs, quoteItems,
}: ProductTypePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showTabNav, setShowTabNav] = useState(false)
  const [activeTab, setActiveTab] = useState('#overview')
  const heroRef = useRef<HTMLDivElement>(null)

  const tabLinks: [string, string][] = [
    ['#overview', 'Overview'],
    ['#features', 'Features'],
    ['#specs', 'Specifications'],
    ['#standards', 'Standards'],
    ['#applications', 'Applications'],
    ['#faq', 'FAQ'],
    ['#quote', 'Get a Quote'],
  ]

  // Show tab nav once hero scrolls out of view
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

  // Track which section is active
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
      <div className="page-hero" ref={heroRef} style={{ minHeight: 'calc(100vh - 165px)' }}>
        <div className="page-hero-bg" style={{ background: `url('${heroImage}') center/cover` }} />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href={parentHref}>{parentName}</Link>{categoryName && categoryHref ? <> / <Link href={categoryHref}>{categoryName}</Link></> : null} / <span>{typeName}</span>
          </div>
          <div className="label label-white">{eyebrow}</div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>{typeName}</h1>
          <p className="lead" style={{ marginTop: '1rem', maxWidth: '600px' }}>{subtitle}</p>
          <div style={{ display: 'flex', gap: '.65rem', flexWrap: 'wrap', marginTop: '1.4rem' }}>
            {badges.map(b => (
              <span key={b} style={{ padding: '.38rem .9rem', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', borderRadius: '999px', fontSize: '.72rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--fm)', letterSpacing: '.04em' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI STRIP ── */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        <div className="container">
          <div className="ptype-kpi-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${kpis.length}, 1fr)` }}>
            {kpis.map((k, i) => (
              <div key={k.label} style={{ padding: '1.1rem 1rem', textAlign: 'center', borderRight: i < kpis.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.05rem', color: '#fff', letterSpacing: '.03em', marginBottom: '.2rem' }}>{k.value}</div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: '.52rem', color: 'rgba(255,255,255,.4)', letterSpacing: '.16em', textTransform: 'uppercase' }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <TrustBar />

      {/* ── TAB NAV (fixed, appears after hero exits viewport) ── */}
      <div style={{
        position: 'fixed',
        top: '72px',
        left: 0,
        right: 0,
        zIndex: 39,
        background: '#fff',
        borderBottom: '1px solid #E8ECF5',
        boxShadow: '0 4px 24px rgba(5,9,31,.07)',
        opacity: showTabNav ? 1 : 0,
        transform: showTabNav ? 'translateY(0)' : 'translateY(-6px)',
        transition: 'opacity .22s ease, transform .22s ease',
        pointerEvents: showTabNav ? 'all' : 'none',
      }}>
        <div className="container">
          <div className="ptype-tab-scroll" style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
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
      <div id="overview" className="section bg-white" style={{ scrollMarginTop: '135px' }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'start', gap: '3.5rem' }}>
            <div className="rv-l">
              <div className="label">Overview</div>
              <h2 style={{ marginBottom: '1.25rem' }}>{overviewTitle}</h2>
              <p className="body" style={{ marginBottom: '1.5rem' }}>{overviewText}</p>
              <ul className="check-list" style={{ marginBottom: '2rem' }}>
                {overviewPoints.map(p => <li key={p}>{p}</li>)}
              </ul>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={`/contact?product=${encodeURIComponent(typeName)}`} className="btn btn-primary mag">Request a Quote</Link>
                <Link href="#specs" className="btn btn-outline-blue mag">View Specs →</Link>
              </div>
            </div>
            <div className="rv-r">
              <div className="prod-detail-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImage} alt={typeName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '14px' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(5,9,31,.65) 100%)', pointerEvents: 'none', borderRadius: '14px' }} />
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.68rem', fontWeight: 800, color: '#fff', letterSpacing: '.08em', textTransform: 'uppercase', opacity: .85 }}>{categoryName}</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'rgba(255,255,255,.55)', letterSpacing: '.06em', marginTop: '.18rem' }}>{eyebrow}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES & UPGRADES ── */}
      <div id="features" className="section bg-off" style={{ scrollMarginTop: '135px' }}>
        <div className="container">
          <div className="label rv">Features &amp; Upgrades</div>
          <h2 className="rv" style={{ marginBottom: '2.5rem' }}>What&apos;s Included</h2>
          <div className="ptype-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="rv" style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E8ECF5', padding: '1.75rem', boxShadow: '0 2px 12px rgba(5,9,31,.05)' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.55rem', color: 'var(--blue)', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.1rem' }}>Standard Features</div>
              <ul className="check-list" style={{ margin: 0 }}>
                {features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className="rv" style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E8ECF5', padding: '1.75rem', boxShadow: '0 2px 12px rgba(5,9,31,.05)' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.55rem', color: '#059669', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.1rem' }}>Optional Upgrades</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                {upgrades.map(u => (
                  <li key={u} style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', fontSize: '.85rem', color: 'var(--gray)', lineHeight: 1.55, fontFamily: 'var(--fm)' }}>
                    <span style={{ color: '#059669', fontWeight: 800, flexShrink: 0, fontSize: '.95rem', lineHeight: 1.4 }}>+</span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── SPECIFICATIONS ── */}
      <div id="specs" className="section bg-white" style={{ scrollMarginTop: '135px' }}>
        <div className="container">
          <div className="label rv">Technical Specifications</div>
          <h2 className="rv" style={{ marginBottom: '2rem' }}>Full Specifications</h2>
          <div className="rv ptype-spec-wrap" style={{ background: '#fff', border: '1px solid #E8ECF5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(5,9,31,.06)' }}>
            <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: '.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--navy)' }}>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'left', fontFamily: 'var(--fm)', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', width: '35%' }}>Parameter</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'left', fontFamily: 'var(--ft)', fontSize: '.82rem', fontWeight: 700, color: 'rgba(255,255,255,.85)' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? '#fff' : '#F8FAFF' }}>
                    <td style={{ padding: '.85rem 1.25rem', borderBottom: '1px solid #E8ECF5', fontFamily: 'var(--fm)', fontSize: '.78rem', fontWeight: 600, color: 'var(--gray)', letterSpacing: '.02em' }}>{row.label}</td>
                    <td style={{ padding: '.85rem 1.25rem', borderBottom: '1px solid #E8ECF5', fontFamily: 'var(--ft)', fontSize: '.85rem', fontWeight: 700, color: 'var(--navy)' }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── STANDARDS ── */}
      <div id="standards" className="section bg-off" style={{ scrollMarginTop: '135px' }}>
        <div className="container">
          <div className="label rv">Standards &amp; Compliance</div>
          <h2 className="rv" style={{ marginBottom: '2.5rem' }}>Built to Standard</h2>
          <div className="cert-grid cert-grid-3">
            {standards.map((s, i) => (
              <div key={s.name} className={`cert-item rv rv-l`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.9rem' }}>
                  {s.logo
                    ? <img src={s.logo} alt={s.name} style={{ maxHeight: '44px', maxWidth: '110px', width: 'auto', objectFit: 'contain', display: 'block' }} />
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
      <div id="applications" className="section bg-white" style={{ scrollMarginTop: '135px' }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'start', gap: '3rem' }}>
            <div className="rv-l">
              <div className="label">Applications</div>
              <h2 style={{ marginBottom: '1.5rem' }}>Where It&apos;s Used</h2>
              <ul className="check-list">
                {applications.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div className="rv-r" style={{ background: 'var(--off)', borderRadius: '16px', padding: '2rem', border: '1px solid #E8ECF5' }}>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '.75rem' }}>End-to-End Services</div>
              <p className="body" style={{ marginBottom: '1.25rem' }}>From design and specification through factory testing, commissioning, and ongoing maintenance — Candron delivers at every phase.</p>
              <ul className="check-list">
                <li>Engineering drawings and coordination studies</li>
                <li>Factory acceptance testing (FAT) with full reports</li>
                <li>Site commissioning and protection settings</li>
                <li>Spare parts, training, and maintenance support</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <Link href="/contact" className="btn btn-primary">Get a Project Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div id="faq" className="section bg-off" style={{ scrollMarginTop: '135px' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="label rv">FAQ</div>
          <h2 className="rv" style={{ marginBottom: '2rem' }}>Common Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="rv" style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E8ECF5', overflow: 'hidden', boxShadow: openFaq === i ? '0 4px 20px rgba(5,9,31,.08)' : 'none', transition: 'box-shadow .2s' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.1rem 1.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer' }}
                >
                  <span style={{ fontFamily: 'var(--ft)', fontWeight: 700, color: 'var(--ink)', fontSize: '.88rem', lineHeight: 1.4 }}>{faq.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .25s', flexShrink: 0, color: 'var(--gray)' }}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div style={{ maxHeight: openFaq === i ? '400px' : 0, overflow: 'hidden', transition: 'max-height .4s ease' }}>
                  <p style={{ padding: '0 1.35rem 1.1rem', fontFamily: 'var(--fm)', fontSize: '.85rem', color: 'var(--gray)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GET A QUOTE ── */}
      <div id="quote" className="section" style={{ background: 'var(--navy)', scrollMarginTop: '135px' }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'start', gap: '3.5rem' }}>
            <div>
              <div className="label" style={{ color: 'var(--blue)' }}>Get a Quote</div>
              <h2 style={{ color: '#fff', marginBottom: '1.25rem' }}>Ready to Spec<br />Your Project?</h2>
              <p style={{ fontFamily: 'var(--fm)', color: 'rgba(255,255,255,.6)', fontSize: '.92rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                Our engineering team responds with specs, lead times, and pricing the same day. Tell us what you need:
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
                {quoteItems.map(q => (
                  <li key={q} style={{ display: 'flex', gap: '.7rem', alignItems: 'flex-start', fontFamily: 'var(--fm)', fontSize: '.85rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.5 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: '.15rem' }}>
                      <path d="M2 7l4 4 6-7" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '16px', padding: '2rem' }}>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '.6rem' }}>Same-Day Response</div>
              <p style={{ fontFamily: 'var(--fm)', fontSize: '.82rem', color: 'rgba(255,255,255,.55)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Send us your project details and we&apos;ll respond with a price, lead time, and any clarifying questions — typically within a few hours.
              </p>
              <Link href={`/contact?product=${encodeURIComponent(typeName)}`} className="btn btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', marginBottom: '.85rem' }}>
                Request a Quote →
              </Link>
              <a href="tel:+14168001234" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', fontFamily: 'var(--fm)', fontSize: '.78rem', color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.17 12 19.79 19.79 0 011.12 3.54 2 2 0 013.09 1.36h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                Or call us directly
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
            <h2 className="rv" style={{ marginBottom: '2rem' }}>Explore {categoryName}</h2>
            <div className="ptype-related-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(relatedTypes.length, 4)}, 1fr)`, gap: '1rem' }}>
              {relatedTypes.map((t, i) => (
                <Link key={t.href} href={t.href} className="rv" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '.6rem', padding: '1.4rem', borderRadius: '12px', background: 'var(--off)', border: '1px solid #E8ECF5', transition: 'border-color .15s, box-shadow .15s', animationDelay: `${i * 0.06}s` }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--blue)'; el.style.boxShadow = '0 4px 20px rgba(0,71,255,.1)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#E8ECF5'; el.style.boxShadow = 'none' }}
                >
                  <div style={{ fontFamily: 'var(--ft)', fontWeight: 700, fontSize: '.88rem', color: 'var(--navy)', lineHeight: 1.3 }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.72rem', color: 'var(--blue)', letterSpacing: '.06em' }}>{t.sub}</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.68rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 'auto', paddingTop: '.5rem' }}>View specs →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
