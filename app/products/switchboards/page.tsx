'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import TrustBar from '@/components/TrustBar'

const specCols = ['Voltage', 'Current', 'Short Circuit Rating', 'Features', 'Standards']

export default function SwitchboardsPage() {
  const [openAcc, setOpenAcc] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const types = [
    {
      title: 'Main Breaker Switchboards',
      sub: 'UL 891 • Up to 4000 A',
      href: '/products/switchboards/main-breaker',
      image: '/images/switchboards.jpg',
      items: [
        'Single-section or multi-section lineups',
        'Integrated revenue metering',
        'Copper bus bar — continuous, welded or bolted',
        'Front or rear cable entry options',
        'High short-circuit withstand capability',
        'As-built drawings and test reports included',
      ],
      upgrades: [
        'Digital power monitoring (ION / Shark meter)',
        'Surge protective device (SPD) module',
        'Infrared inspection windows',
        'Remote trip / lock-out provisions',
        'Cable management accessories',
        'Outdoor / weatherproof enclosure option',
      ],
      specs: { Voltage: 'Up to 600 V', Current: 'Up to 4000 A', 'Short Circuit Rating': 'Up to 65 kA', Features: 'ACB or MCCB, integrated metering', Standards: 'UL 891, CSA C22.2' },
    },
    {
      title: 'Main-Tie-Main Configuration',
      sub: 'Dual Feeder • Redundancy',
      href: '/products/switchboards/main-tie-main',
      image: 'https://images.pexels.com/photos/28265032/pexels-photo-28265032.jpeg?auto=compress&cs=tinysrgb&w=800',
      items: [
        'Automatic or manual source transfer',
        'Source-interlocking for reliability',
        'Closed or open transition logic',
        'Bus coupler circuit breaker',
        'Suitable for critical and mission-critical loads',
        'Generator paralleling capability',
      ],
      upgrades: [
        'Automatic transfer switch (ATS) logic module',
        'Generator paralleling relay (25A sync-check)',
        'Power quality metering per source',
        'Battery-backed control power (UPS)',
        'Remote monitoring and alarm annunciation',
        'Load-shedding relay integration',
      ],
      specs: { Voltage: 'Up to 600 V', Current: 'Up to 4000 A', 'Short Circuit Rating': 'Up to 65 kA', Features: 'Automatic/manual transfer, interlocking', Standards: 'UL 891, CSA C22.2' },
    },
    {
      title: 'Distribution Switchboards',
      sub: 'Feeder Section Distribution',
      href: '/products/switchboards/distribution',
      image: 'https://images.pexels.com/photos/3306057/pexels-photo-3306057.jpeg?auto=compress&cs=tinysrgb&w=800',
      items: [
        'Multiple feeder circuits with MCCBs or fuses',
        'Custom bus ratings to 4000 A',
        'Separate meter sections',
        'NEC and CSA C22.1 compliant',
        'Emergency power off (EPO) provisions',
        'Accessible top and bottom cable entry',
      ],
      upgrades: [
        'Sub-metering per feeder circuit',
        'Surge protective device (SPD)',
        'Bus extensions for future circuit expansion',
        'Digital circuit monitoring (Shark / ION)',
        'Dedicated lighting and HVAC sections',
        'Witnessed factory acceptance testing',
      ],
      specs: { Voltage: 'Up to 600 V', Current: 'Up to 4000 A', 'Short Circuit Rating': 'Up to 65 kA', Features: 'Multi-feeder, custom bus ratings', Standards: 'UL 891, CSA C22.2' },
    },
    {
      title: 'Utility-Approved / ESA-Ready',
      sub: 'Revenue Grade • Utility Metering',
      href: '/products/switchboards/utility-approved',
      image: 'https://images.pexels.com/photos/11924298/pexels-photo-11924298.jpeg?auto=compress&cs=tinysrgb&w=800',
      items: [
        'CT/PT compartments for revenue metering',
        'Tamper-resistant sealing provisions',
        'ESA inspection-ready layouts',
        'Utility metering form 9S and 16S',
        'Sight glasses and sealing provisions',
        'Coordinated with local utility requirements',
      ],
      upgrades: [
        'Demand metering and interval data logging',
        'Remote meter reading (AMI module)',
        'Load profiling hardware',
        'Tamper-detection alarm outputs',
        'Dual-element (bi-directional) metering for solar/DG',
        'Utility-specific custom form factors',
      ],
      specs: { Voltage: 'Up to 600 V', Current: 'Site-specific', 'Short Circuit Rating': 'Site-specific', Features: 'CT/PT cubicle, tamper-proof, ESA-ready', Standards: 'CSA, ESA, UL 891' },
    },
  ]

  const standards = [
    { std: 'UL 891', desc: 'U.S. switchboard product standard', logo: null },
    { std: 'CSA C22.2', desc: 'Canadian electrical product standards', logo: '/images/csa.png' },
    { std: 'ANSI / NETA', desc: 'Factory acceptance testing protocols', logo: '/images/ansi.png' },
    { std: 'ESA', desc: 'Ontario authority acceptance layouts', logo: null },
    { std: 'Revenue Metering', desc: 'Local utility meter requirements', logo: null },
    { std: 'NFPA 70 / NEC', desc: 'U.S. electrical installation code', logo: null },
  ]

  const faqs = [
    {
      q: 'What is the maximum rating for your switchboards?',
      a: 'Our switchboards are rated up to 4000 A at 600 V AC, built to UL 891 and CSA C22.2. Higher ratings are available with custom bus configurations — contact our engineering team for site-specific requirements.',
    },
    {
      q: 'Can switchboards include revenue metering?',
      a: 'Yes. We design utility-approved meter sections with CT/PT cubicles, tamper-proof windows, and sealing provisions to meet revenue metering requirements from major Canadian and U.S. utilities.',
    },
    {
      q: 'Do you offer witnessed factory acceptance testing?',
      a: 'Yes. Full FAT is performed including insulation resistance, contact resistance, and functional testing of all breakers and metering. Witnessed FAT is available for your project team or a third-party inspector.',
    },
  ]

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background: "url('/images/switchboards.jpg') center/cover" }}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span>Switchboards</span>
          </div>
          <div className="label label-white">UL 891 + CSA C22.2 • ESA-Ready • Canada &amp; United States</div>
          <h1>Switchboards — Heavy-Duty<br />Low Voltage Distribution</h1>
          <p className="lead" style={{ marginTop: '1rem' }}>
            Custom switchboards up to 4000 A at 600 V. Built for commercial, industrial, and infrastructure applications with robust copper bus, safe maintenance clearances, and utility metering options.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            {['UL 891', 'ESA-Ready', 'Utility Metering', 'Main-Tie-Main'].map(b => (
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
            {[['#overview', 'Overview'], ['#types-specs', 'Types & Specs'], ['#standards', 'Standards'], ['#applications', 'Applications'], ['#faq', 'FAQ'], ['#quote', 'Get a Quote']].map(([href, label]) => (
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
              <h2 style={{ marginBottom: '1.25rem' }}>Engineered for Heavy-Duty<br />LV Distribution</h2>
              <p className="body" style={{ marginBottom: '1.5rem' }}>Candron switchboards are engineered for reliable low-voltage distribution in commercial, industrial, and infrastructure applications. Heavy-duty copper bus, wide maintenance clearances, and metering-ready designs built to UL 891 and CSA C22.2.</p>
              <ul className="check-list" style={{ marginBottom: '2rem' }}>
                <li>Up to 4000 A at 600 V</li>
                <li>11-gauge cold-rolled steel enclosures</li>
                <li>C5M outdoor paint standard available</li>
                <li>Front and rear accessible configurations</li>
              </ul>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact?product=switchboards" className="btn btn-primary mag">Request a Quote</Link>
                <Link href="#types-specs" className="btn btn-outline-blue mag">Explore Types →</Link>
              </div>
            </div>
            <div className="rv-r" style={{ position: 'relative' }}>
              <div className="prod-detail-img">
                <Image src="/images/switchboards.jpg" alt="Candron switchboard assembly" fill style={{ objectFit: 'cover' }} sizes="(max-width:1024px) 100vw,50vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(5,9,31,.72) 100%)', pointerEvents: 'none' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: 'transparent', borderTop: '1px solid rgba(255,255,255,.12)', borderRadius: '0 0 14px 14px' }}>
                <div style={{ padding: '.95rem .5rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', fontWeight: 900, color: '#fff', letterSpacing: '.04em', marginBottom: '.2rem' }}><span data-count={4000} data-suffix=" A">4000 A</span></div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.16em', textTransform: 'uppercase' }}>Max Current</div>
                </div>
                <div style={{ padding: '.95rem .5rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', fontWeight: 900, color: '#fff', letterSpacing: '.04em', marginBottom: '.2rem' }}><span data-count={600} data-suffix=" V">600 V</span></div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.16em', textTransform: 'uppercase' }}>Rated Voltage</div>
                </div>
                <div style={{ padding: '.95rem .5rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.85rem', fontWeight: 900, color: '#fff', letterSpacing: '.04em', marginBottom: '.2rem' }}>UL 891</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.16em', textTransform: 'uppercase' }}>U.S. Compliance</div>
                </div>
                <div style={{ padding: '.95rem .5rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '.85rem', fontWeight: 900, color: '#fff', letterSpacing: '.04em', marginBottom: '.2rem' }}>CSA / ESA</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '.5rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.16em', textTransform: 'uppercase' }}>Canadian</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TYPES & SPECIFICATIONS */}
      <div id="types-specs" className="section bg-off" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="label rv">Types &amp; Specifications</div>
          <h2 className="rv" style={{ marginBottom: '.75rem' }}>Switchboard Configurations</h2>
          <p className="rv" style={{ color: 'var(--gray)', fontSize: '.95rem', marginBottom: '2.5rem', maxWidth: '640px' }}>
            Explore our range of switchboard configurations engineered for safety, reliability, and performance.
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
          <h2 className="rv" style={{ marginBottom: '2.5rem' }}>Where Our Switchboards Are Deployed</h2>
          <div className="split" style={{ alignItems: 'start', gap: '3.5rem' }}>
            <div className="rv-l">
              <ul className="check-list">
                <li>Commercial buildings &amp; campuses</li>
                <li>Healthcare facilities</li>
                <li>Data centers</li>
                <li>Industrial plants</li>
                <li>Utilities &amp; substations</li>
                <li>EV charging infrastructure</li>
                <li>Multi-unit residential</li>
                <li>Port electrification</li>
              </ul>
            </div>
            <div className="rv-r" style={{ background: 'var(--navy)', borderRadius: '16px', padding: '2rem 2.25rem', border: '1px solid rgba(0,71,255,.2)' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'var(--blue)', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '1rem' }}>End-to-End Services</div>
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.05rem' }}>From specification to commissioning.</h3>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.88rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Specification review, engineering design, factory testing, site commissioning — the same team that built your switchboard supports it through its full lifecycle.
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
              <h2 style={{ marginBottom: '1.5rem' }}>Request Switchboard Pricing</h2>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'var(--blue)', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '.75rem' }}>What to Include in Your Inquiry</div>
              <ul className="check-list">
                <li>Main current rating and voltage</li>
                <li>Number of feeder circuits</li>
                <li>Indoor / outdoor installation</li>
                <li>Utility metering requirements</li>
                <li>Required delivery timeline</li>
                <li>Applicable standards (UL, CSA, ESA)</li>
              </ul>
            </div>
            <div className="rv-r" style={{ background: 'var(--navy)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(0,71,255,.2)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '.6rem', color: 'var(--blue)', letterSpacing: '.22em', textTransform: 'uppercase' }}>Response within 1 business day</div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.05rem' }}>Same-day lead time quote.<br />Speak directly with our engineers.</h3>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.88rem', lineHeight: 1.75, margin: 0 }}>Our engineering team reviews every inquiry personally — no automated responses, no gatekeeping.</p>
              <Link href="/contact?product=switchboards" className="btn btn-primary btn-lg mag">Request a Quote →</Link>
              <a href="tel:+16476162595" style={{ color: 'rgba(255,255,255,.35)', fontSize: '.78rem', textDecoration: 'none', letterSpacing: '.04em' }}>Or call +1 (647) 616-2595</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Built for Your Project. Tested Before Shipment.</h2>
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
