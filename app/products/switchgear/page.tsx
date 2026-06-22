'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import TrustBar from '@/components/TrustBar'

const specCols = ['Voltage', 'Current', 'Interrupting Rating', 'Features', 'Standards']

export default function SwitchgearPage() {
  const [openAcc, setOpenAcc] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const types = [
    {
      title: 'Low Voltage Switchgear',
      sub: 'UL 1558 • Up to 6000 A',
      href: '/products/switchgear/low-voltage',
      image: '/images/switchgear.jpg',
      items: [
        'ACBs and MCCBs with selective coordination',
        'Integrated revenue metering',
        'Main-tie-main configurations',
        'Zone-selective interlocking (ZSI)',
        'Ground fault protection',
        'Copper bus bar — continuous rating',
      ],
      upgrades: [
        'Arc-flash resistant (ARST) enclosure',
        'Remote racking device for VCBs',
        'Infrared inspection windows',
        'Bus differential protection relay',
        'High-resistance grounding (HRG) system',
        'Remote monitoring gateway',
      ],
      specs: { Voltage: 'Up to 600 V', Current: 'Up to 6000 A', 'Interrupting Rating': 'Up to 85 kA', Features: 'ACBs, MCCBs, metering', Standards: 'UL 1558, CSA C22.2' },
    },
    {
      title: 'Metal-Clad Medium Voltage',
      sub: 'IEC 62271-200 • IEEE C37.20.2',
      href: '/products/switchgear/metal-clad',
      image: 'https://images.pexels.com/photos/18468536/pexels-photo-18468536.jpeg?auto=compress&cs=tinysrgb&w=800',
      items: [
        'Withdrawable VCBs with three-position isolation',
        'Full bus compartmentalization',
        'Protection relays: 50/51, 27/59, 67, 87',
        'Voltage range: 5–29 kV',
        'Interlocked safety shutters',
        'Front and rear cable entry options',
      ],
      upgrades: [
        'Arc-resistant type (ARST) construction',
        'Motor-operated racking mechanism',
        'PT cubicle with revenue metering',
        'Partial discharge monitoring',
        'Battery-backed control power',
        'SCADA / IEC 61850 gateway',
      ],
      specs: { Voltage: '5–29 kV', Current: '600–4000 A', 'Interrupting Rating': 'Up to 40 kA', Features: 'Withdrawable VCBs, arc-rated', Standards: 'IEC 62271-200, IEEE C37' },
    },
    {
      title: 'Metal-Enclosed Load-Interrupter',
      sub: '5–27.6 kV • Compact',
      href: '/products/switchgear/load-interrupter',
      image: 'https://images.pexels.com/photos/36695590/pexels-photo-36695590.jpeg?auto=compress&cs=tinysrgb&w=800',
      items: [
        'Load-break switches and current-limiting fuses',
        'Outdoor weatherproof enclosure (IP54+)',
        'Pad or skid-mounted installation',
        'Full-voltage transformer protection',
        'Accessible cable termination compartments',
        'CSA and IEEE C37.20.3 compliant',
      ],
      upgrades: [
        'Motor-operated switch actuator',
        'Fault indicator LEDs',
        'Remote monitoring SCADA gateway',
        'Additional cable termination compartment',
        'Fuse-saving scheme with recloser coordination',
        'Stainless steel enclosure option',
      ],
      specs: { Voltage: '5–27.6 kV', Current: '600–2000 A', 'Interrupting Rating': 'Up to 20 kA', Features: 'Fused, outdoor weatherproof', Standards: 'CSA C22.2, IEEE C37.20.3' },
    },
    {
      title: 'Service-Entrance Rated',
      sub: 'ESA & Utility-Ready',
      href: '/products/switchgear/service-entrance',
      image: 'https://images.pexels.com/photos/5767595/pexels-photo-5767595.jpeg?auto=compress&cs=tinysrgb&w=800',
      items: [
        'Main breaker / tie breaker with ground fault',
        'Revenue metering cubicles (CT/PT)',
        'ESA and AHJ acceptance layouts',
        'Custom relay coordination',
        'Utility interface protection (27/59, 81)',
        'As-built drawings and test reports',
      ],
      upgrades: [
        'Arc-flash study and PPE labelling',
        'Witnessed factory acceptance testing (FAT)',
        'Remote annunciation panel',
        'On-site commissioning and protection setting',
        'Power quality analyser integration',
        'Utility coordination study and report',
      ],
      specs: { Voltage: 'Up to 29 kV', Current: 'Site-specific', 'Interrupting Rating': 'Site-specific', Features: 'Utility-approved, revenue metering', Standards: 'CSA, ESA, UL' },
    },
  ]

  const standards = [
    { std: 'UL 1558', desc: 'U.S. low voltage switchgear standard', logo: null },
    { std: 'CSA C22.2', desc: 'Canadian electrical product standards', logo: '/images/csa.png' },
    { std: 'IEC 62271-200', desc: 'Medium voltage AC switchgear', logo: '/images/IEC.png' },
    { std: 'IEEE C37 Series', desc: 'Switchgear standards and testing', logo: '/images/IEEE.png' },
    { std: 'ANSI / NETA', desc: 'Factory acceptance testing protocols', logo: '/images/ansi.png' },
    { std: 'ESA / AHJ', desc: 'Ontario authority acceptance layouts', logo: null },
  ]

  const faqs = [
    {
      q: "What's the difference between LV switchgear and switchboards?",
      a: 'Switchgear supports higher fault current ratings and includes protective relay functions for isolation and fault clearing. Switchboards focus on LV distribution with circuit breakers and metering, without the same fault interruption ratings.',
    },
    {
      q: 'Can you provide arc-flash studies and labels?',
      a: 'Yes — we deliver arc-flash hazard analysis studies, PPE labels, and mitigation strategies such as zone-selective interlocking (ZSI) and high-resistance grounding.',
    },
    {
      q: 'Do you offer witnessed factory acceptance testing?',
      a: 'Yes. Witnessed FAT is available for your project team or third-party inspector. We perform insulation resistance, primary injection, contact resistance, and full functional tests — with a comprehensive report written for both technical and non-technical stakeholders.',
    },
  ]

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background: "url('/images/switchgear.jpg') center/cover" }}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span>Switchgear</span>
          </div>
          <div className="label label-white">UL 1558 + CSA C22.2 • IEEE C37 • Canada &amp; United States</div>
          <h1>Switchgear — Protection,<br />Control, Continuity</h1>
          <p className="lead" style={{ marginTop: '1rem' }}>
            Low- and medium-voltage switchgear engineered for safety, arc-flash mitigation, and operational uptime. Up to 29 kV and 6000 A.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            {['Arc-Flash Ready', 'Withdrawable Breakers', 'SCADA Integration', 'ESA Compliant'].map(b => (
              <span key={b} style={{ padding: '.4rem 1rem', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', borderRadius: '999px', fontSize: '.78rem', fontWeight: 700, color: '#fff' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <TrustBar />

      {/* STICKY TAB NAV */}
      <div style={{ position: 'sticky', top: '64px', background: '#fff', borderBottom: '1px solid #E8ECF5', zIndex: 40 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', padding: '.6rem 0' }}>
            {[['#overview', 'Overview'], ['#product-range', 'Product Range'], ['#types-specs', 'Types & Specs'], ['#standards', 'Standards'], ['#applications', 'Applications'], ['#faq', 'FAQ'], ['#quote', 'Get a Quote']].map(([href, label]) => (
              <a key={href} href={href} style={{ padding: '.45rem .85rem', borderRadius: '8px', border: '1px solid #E8ECF5', fontSize: '.78rem', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'border-color .15s, color .15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--blue)'; el.style.color = 'var(--blue)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#E8ECF5'; el.style.color = 'var(--ink)' }}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div id="overview" className="section bg-white" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'start', gap: '3.5rem' }}>
            <div className="rv-l">
              <div className="label">Overview</div>
              <h2 style={{ marginBottom: '1.25rem' }}>Built for Protection,<br />Designed for Uptime</h2>
              <p className="body" style={{ marginBottom: '1.5rem' }}>Switchgear isolates faults, protects equipment, and keeps your process running. Our designs align protection settings with utility requirements and downstream coordination. We support indoor arc-resistant lineups and outdoor weatherproof enclosures.</p>
              <ul className="check-list" style={{ marginBottom: '2rem' }}>
                <li>Voltage ranges: LV up to 600 V, MV 5–29 kV</li>
                <li>Breaker technologies: ACB, VCB, SF6 alternatives</li>
                <li>Relaying: ANSI/IEC curves, differential and distance options</li>
                <li>Remote operation &amp; SCADA gateways</li>
              </ul>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact?product=switchgear" className="btn btn-primary mag">Request a Quote</Link>
                <Link href="#types-specs" className="btn btn-outline-blue mag">Explore Types →</Link>
              </div>
            </div>
            <div className="rv-r" style={{ position: 'relative' }}>
              <div className="prod-detail-img">
                <Image src="/images/switchgear.jpg" alt="Candron switchgear assembly" fill style={{ objectFit: 'cover' }} sizes="(max-width:1024px) 100vw,50vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(5,9,31,.72) 100%)', pointerEvents: 'none' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: 'transparent', borderTop: '1px solid rgba(255,255,255,.12)', borderRadius: '0 0 14px 14px' }}>
                <div style={{ padding: '.95rem .5rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', fontWeight: 900, color: '#fff', letterSpacing: '.04em', marginBottom: '.2rem' }}><span data-count={29} data-suffix=" kV">29 kV</span></div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.16em', textTransform: 'uppercase' }}>Max Voltage</div>
                </div>
                <div style={{ padding: '.95rem .5rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', fontWeight: 900, color: '#fff', letterSpacing: '.04em', marginBottom: '.2rem' }}><span data-count={6000} data-suffix=" A">6000 A</span></div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.16em', textTransform: 'uppercase' }}>Max Current</div>
                </div>
                <div style={{ padding: '.95rem .5rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.85rem', fontWeight: 900, color: '#fff', letterSpacing: '.04em', marginBottom: '.2rem' }}>UL / CSA</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.16em', textTransform: 'uppercase' }}>Compliance</div>
                </div>
                <div style={{ padding: '.95rem .5rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.85rem', fontWeight: 900, color: '#fff', letterSpacing: '.04em', marginBottom: '.2rem' }}>Arc-Rated</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.16em', textTransform: 'uppercase' }}>Safety</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SWITCHGEAR TYPES GRID */}
      <div id="product-range" style={{ background: 'var(--navy)', padding: '4rem 0', scrollMarginTop: '110px' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="label" style={{ color: 'var(--blue)', marginBottom: '.75rem' }}>Product Range</div>
            <h2 style={{ color: '#fff', margin: 0, fontSize: 'clamp(1.5rem,3vw,2rem)' }}>
              Medium-Voltage Power Distribution<br />Switchgear
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {[
              {
                n: '01',
                title: 'Metal-Enclosed Switchgear',
                desc: 'Secure load-interrupter switches and fuses for indoor or outdoor feeder distribution. Compact and cost-effective.',
                href: '/products/switchgear/load-interrupter',
              },
              {
                n: '02',
                title: 'Metal-Clad Switchgear',
                desc: 'Fully compartmented draw-out VCBs with arc-resistant options. Rated 5–29 kV for utility and infrastructure applications.',
                href: '/products/switchgear/metal-clad',
              },
              {
                n: '03',
                title: 'Pad-Mounted Switchgear',
                desc: 'Low-profile, tamper-resistant enclosures for underground utility networks and industrial outdoor power systems.',
                href: '/products/switchgear/load-interrupter',
              },
              {
                n: '04',
                title: 'Service-Entrance Rated',
                desc: 'Utility-coordinated main and tie breakers with revenue metering cubicles. ESA and AHJ acceptance layouts included.',
                href: '/products/switchgear/service-entrance',
              },
              {
                n: '05',
                title: 'Low Voltage Switchgear',
                desc: 'ACBs and MCCBs up to 600 V / 6000 A with main-tie-main, zone-selective interlocking, and integrated metering.',
                href: '/products/switchgear/low-voltage',
              },
              {
                n: '06',
                title: 'Custom Engineered',
                desc: 'Tailored distribution solutions for unique site footprints, non-standard voltages, and project-specific requirements.',
                href: '/contact?product=custom-switchgear',
              },
            ].map((t) => (
              <a
                key={t.n}
                href={t.href}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '.85rem', padding: '1.6rem', borderRadius: '16px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', transition: 'background .2s, border-color .2s', cursor: 'pointer' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,71,255,.18)'; el.style.borderColor = 'rgba(0,71,255,.45)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.05)'; el.style.borderColor = 'rgba(255,255,255,.1)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '.55rem', fontWeight: 700, letterSpacing: '.18em', color: 'var(--blue)', textTransform: 'uppercase' }}>{t.n}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: .4 }}>
                    <path d="M3 11L11 3M11 3H5M11 3v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1rem', color: '#fff', lineHeight: 1.3 }}>{t.title}</div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: '.8rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.65, flex: 1 }}>{t.desc}</div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em', color: 'var(--blue)', textTransform: 'uppercase', marginTop: '.25rem' }}>
                  View specs →
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* TYPES & SPECIFICATIONS */}
      <div id="types-specs" className="section bg-off" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="label rv">Types &amp; Specifications</div>
          <h2 className="rv" style={{ marginBottom: '.75rem' }}>Switchgear Configurations</h2>
          <p className="rv" style={{ color: 'var(--gray)', fontSize: '.95rem', marginBottom: '2.5rem', maxWidth: '640px' }}>
            Explore our range of switchgear configurations engineered for protection, safety, and continuous uptime.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {types.map((t, i) => (
              <div key={i} className="rv" style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E8ECF5', overflow: 'hidden', boxShadow: openAcc === i ? '0 8px 32px rgba(5,9,31,.1)' : 'none', transition: 'box-shadow .2s' }}>
                <button
                  onClick={() => setOpenAcc(openAcc === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: openAcc === i ? 'var(--blue)' : 'rgba(0,71,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .2s', fontFamily: 'var(--fm)', fontSize: '.58rem', fontWeight: 700, color: openAcc === i ? '#fff' : 'var(--blue)', letterSpacing: '.1em' }}>
                    0{i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--ft)', fontWeight: 700, color: 'var(--ink)', fontSize: '.9rem', letterSpacing: '.02em' }}>{t.title}</div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'var(--blue)', letterSpacing: '.08em', marginTop: '.15rem' }}>{t.sub}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '.4rem', flexShrink: 0, marginRight: '.25rem' }}>
                    <span style={{ background: 'rgba(0,71,255,.07)', color: 'var(--blue)', fontFamily: 'var(--fm)', fontSize: '.55rem', fontWeight: 700, letterSpacing: '.04em', padding: '.22rem .6rem', borderRadius: '5px', whiteSpace: 'nowrap' }}>{t.specs.Voltage}</span>
                    <span style={{ background: 'rgba(0,71,255,.07)', color: 'var(--blue)', fontFamily: 'var(--fm)', fontSize: '.55rem', fontWeight: 700, letterSpacing: '.04em', padding: '.22rem .6rem', borderRadius: '5px', whiteSpace: 'nowrap' }}>{t.specs.Current}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: openAcc === i ? 'rotate(180deg)' : 'none', transition: 'transform .25s', flexShrink: 0, color: 'var(--gray)' }}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div style={{ maxHeight: openAcc === i ? '600px' : 0, overflow: 'hidden', transition: 'max-height .4s ease' }}>
                  <div style={{ borderTop: '1px solid #E8ECF5', background: 'var(--off)' }}>
                    {/* Top: image + features + upgrades */}
                    <div style={{ display: 'flex', gap: '2rem', padding: '1.75rem 1.75rem 1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      <div style={{ width: '260px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden', height: '220px', boxShadow: '0 2px 12px rgba(5,9,31,.1)' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.image} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ fontFamily: 'var(--fm)', fontSize: '.55rem', color: 'var(--blue)', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>Standard Features</div>
                        <ul className="check-list" style={{ margin: 0 }}>
                          {t.items.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ fontFamily: 'var(--fm)', fontSize: '.55rem', color: '#059669', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>Optional Upgrades</div>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
                          {t.upgrades.map(u => (
                            <li key={u} style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', fontSize: '.82rem', color: 'var(--gray)', lineHeight: 1.55 }}>
                              <span style={{ color: '#059669', fontWeight: 800, flexShrink: 0, fontSize: '.9rem', lineHeight: 1.4 }}>+</span>
                              {u}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Bottom: specifications strip */}
                    <div style={{ borderTop: '1px solid #E8ECF5', display: 'grid', gridTemplateColumns: `repeat(${specCols.length}, 1fr)`, background: '#fff' }}>
                      {specCols.map((col, ci) => (
                        <div key={col} style={{ padding: '1rem 1.25rem', borderRight: ci < specCols.length - 1 ? '1px solid #E8ECF5' : 'none' }}>
                          <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'var(--gray)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '.35rem' }}>{col}</div>
                          <div style={{ fontFamily: 'var(--ft)', fontSize: '.82rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{(t.specs as Record<string, string>)[col] ?? ''}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: '1px solid #E8ECF5', padding: '.9rem 1.5rem', background: '#fff', display: 'flex', justifyContent: 'flex-end' }}>
                      <Link href={t.href} style={{ fontFamily: 'var(--fm)', fontSize: '.72rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '.06em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.35rem' }}>
                        View full specifications <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STANDARDS */}
      <div id="standards" className="section bg-white" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="label rv">Standards &amp; Compliance</div>
          <h2 className="rv" style={{ marginBottom: '2.5rem' }}>Built to Standard</h2>
          <div className="cert-grid cert-grid-3">
            {standards.map((s, i) => (
              <div key={s.std} className={`cert-item rv${i % 3 === 1 ? ' d2' : i % 3 === 2 ? ' d3' : ''}`}>
                <div style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.9rem' }}>
                  {s.logo
                    ? <img src={s.logo} alt={s.std} style={{ maxHeight: '44px', maxWidth: '110px', width: 'auto', objectFit: 'contain', display: 'block' }} />
                    : <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  }
                </div>
                <div className="cert-name">{s.std}</div>
                <div className="cert-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* APPLICATIONS */}
      <div id="applications" className="section bg-off" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="label rv">Applications</div>
          <h2 className="rv" style={{ marginBottom: '2.5rem' }}>Where Our Switchgear is Deployed</h2>
          <div className="split" style={{ alignItems: 'start', gap: '3.5rem' }}>
            <div className="rv-l">
              <ul className="check-list">
                <li>Utilities &amp; substations</li>
                <li>Mining &amp; heavy industry</li>
                <li>Oil &amp; gas facilities</li>
                <li>Industrial plants &amp; manufacturing</li>
                <li>Data centers</li>
                <li>Commercial campuses</li>
                <li>Transit &amp; traction power</li>
                <li>Healthcare facilities</li>
              </ul>
            </div>
            <div className="rv-r" style={{ background: 'var(--navy)', borderRadius: '16px', padding: '2rem 2.25rem', border: '1px solid rgba(0,71,255,.2)' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'var(--blue)', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '1rem' }}>End-to-End Services</div>
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.05rem' }}>One team. Design to commissioning.</h3>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.88rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Protection settings, coordination studies, factory testing, site commissioning, and ongoing maintenance — all from the same team that built your equipment.
              </p>
              <Link href="/commissioning" className="btn btn-primary mag">View Commissioning Services →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="section bg-white" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="label rv">FAQ</div>
          <h2 className="rv" style={{ marginBottom: '2.5rem' }}>Frequently Asked Questions</h2>
          <div style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {faqs.map((f, i) => (
              <div key={i} className="rv" style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E8ECF5', overflow: 'hidden', boxShadow: openFaq === i ? '0 8px 32px rgba(5,9,31,.1)' : 'none', transition: 'box-shadow .2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--ft)', fontWeight: 700, color: 'var(--ink)', fontSize: '.88rem', letterSpacing: '.02em' }}>{f.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .25s', flexShrink: 0, color: 'var(--gray)' }}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div style={{ maxHeight: openFaq === i ? '400px' : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
                  <div style={{ padding: '0 1.5rem 1.5rem' }}>
                    <p style={{ color: 'var(--gray)', fontSize: '.88rem', lineHeight: 1.75, margin: 0 }}>{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GET A QUOTE */}
      <div id="quote" className="section bg-off" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div className="rv-l">
              <div className="label">Get a Quote</div>
              <h2 style={{ marginBottom: '1.5rem' }}>Request Switchgear Pricing</h2>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'var(--blue)', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '.75rem' }}>What to Include in Your Inquiry</div>
              <ul className="check-list">
                <li>Site voltage and main current rating</li>
                <li>One-line diagram or utility requirements</li>
                <li>Indoor / outdoor, arc-rated needs</li>
                <li>SCADA or relay protection preferences</li>
                <li>Required delivery timeline</li>
                <li>Witnessed FAT requirements</li>
              </ul>
            </div>
            <div className="rv-r" style={{ background: 'var(--navy)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(0,71,255,.2)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'var(--blue)', letterSpacing: '.22em', textTransform: 'uppercase' }}>Response within 1 business day</div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.05rem' }}>Same-day lead time quote.<br />Speak directly with our engineers.</h3>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.88rem', lineHeight: 1.75, margin: 0 }}>Our engineering team reviews every inquiry personally — no automated responses, no gatekeeping.</p>
              <Link href="/contact?product=switchgear" className="btn btn-primary btn-lg mag">Request a Quote →</Link>
              <a href="tel:+16476162595" style={{ color: 'rgba(255,255,255,.35)', fontSize: '.78rem', textDecoration: 'none', letterSpacing: '.04em' }}>Or call +1 (647) 616-2595</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">See What We Can Build For You</h2>
          <p className="lead rv" style={{ color: 'rgba(255,255,255,.6)', maxWidth: '500px' }}>Built in Canada — reach our engineering team directly for specs, quotes, and lead times.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
            <Link href="/products" className="btn btn-outline btn-lg mag">All Products →</Link>
          </div>
        </div></div>
      </div>
    </>
  )
}
