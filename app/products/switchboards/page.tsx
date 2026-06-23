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
          <p className="lead mt-4">
            Custom switchboards up to 4000 A at 600 V. Built for commercial, industrial, and infrastructure applications with robust copper bus, safe maintenance clearances, and utility metering options.
          </p>
          <div className="flex gap-[.75rem] flex-wrap mt-6">
            {['UL 891', 'ESA-Ready', 'Utility Metering', 'Main-Tie-Main'].map(b => (
              <span key={b} className="py-[.4rem] px-4 bg-white/[.12] border border-white/25 rounded-full text-[.78rem] font-bold text-white">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <TrustBar />

      {/* STICKY TAB NAV */}
      <div className="sticky top-16 bg-white border-b border-[#E8ECF5] z-40">
        <div className="container">
          <div className="flex gap-1 flex-wrap py-[.6rem]">
            {[['#overview', 'Overview'], ['#types-specs', 'Types & Specs'], ['#standards', 'Standards'], ['#applications', 'Applications'], ['#faq', 'FAQ'], ['#quote', 'Get a Quote']].map(([href, label]) => (
              <a key={href} href={href} className="py-[.45rem] px-[.85rem] rounded-lg border border-[#E8ECF5] text-[.78rem] font-semibold text-navy no-underline whitespace-nowrap transition-[border-color,color] duration-150 hover:border-blue hover:text-blue">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div id="overview" className="section bg-white scroll-mt-[110px]">
        <div className="container">
          <div className="split items-start gap-14">
            <div className="rv-l">
              <div className="label">Overview</div>
              <h2 className="mb-5">Engineered for Heavy-Duty<br />LV Distribution</h2>
              <p className="body mb-6">Candron switchboards are engineered for reliable low-voltage distribution in commercial, industrial, and infrastructure applications. Heavy-duty copper bus, wide maintenance clearances, and metering-ready designs built to UL 891 and CSA C22.2.</p>
              <ul className="check-list mb-8">
                <li>Up to 4000 A at 600 V</li>
                <li>11-gauge cold-rolled steel enclosures</li>
                <li>C5M outdoor paint standard available</li>
                <li>Front and rear accessible configurations</li>
              </ul>
              <div className="flex gap-4 flex-wrap">
                <Link href="/contact?product=switchboards" className="btn btn-primary mag">Request a Quote</Link>
                <Link href="#types-specs" className="btn btn-outline-blue mag">Explore Types →</Link>
              </div>
            </div>
            <div className="rv-r relative">
              <div className="prod-detail-img">
                <Image src="/images/switchboards.jpg" alt="Candron switchboard assembly" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(5,9,31,.72)_100%)] pointer-events-none" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 bg-transparent border-t border-white/[.12] rounded-b-[14px]">
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.95rem] font-black text-white tracking-[.04em] mb-[.2rem]"><span data-count={4000} data-suffix=" A">4000 A</span></div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">Max Current</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.95rem] font-black text-white tracking-[.04em] mb-[.2rem]"><span data-count={600} data-suffix=" V">600 V</span></div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">Rated Voltage</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.85rem] font-black text-white tracking-[.04em] mb-[.2rem]">UL 891</div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">U.S. Compliance</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center">
                  <div className="font-display text-[.85rem] font-black text-white tracking-[.04em] mb-[.2rem]">CSA / ESA</div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">Canadian</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TYPES & SPECIFICATIONS */}
      <div id="types-specs" className="section bg-off scroll-mt-[110px]">
        <div className="container">
          <div className="label rv">Types &amp; Specifications</div>
          <h2 className="rv mb-3">Switchboard Configurations</h2>
          <p className="rv text-gray text-[.95rem] mb-10 max-w-[640px]">
            Explore our range of switchboard configurations engineered for safety, reliability, and performance.
          </p>
          <div className="flex flex-col gap-3">
            {types.map((t, i) => (
              <div key={i} className={`rv bg-white rounded-[14px] border border-[#E8ECF5] overflow-hidden transition-[box-shadow] duration-200 ${openAcc === i ? 'shadow-[0_8px_32px_rgba(5,9,31,.1)]' : ''}`}>
                <button
                  onClick={() => setOpenAcc(openAcc === i ? null : i)}
                  className="w-full text-left bg-transparent border-0 py-5 px-6 flex items-center gap-4 cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-[background,color] duration-200 font-mono text-[.58rem] font-bold tracking-[.1em] ${openAcc === i ? 'bg-blue text-white' : 'bg-[rgba(0,71,255,.08)] text-blue'}`}>
                    0{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-title font-bold text-navy text-[.9rem] tracking-[.02em]">{t.title}</div>
                    <div className="font-mono text-[.6rem] text-blue tracking-[.08em] mt-[.15rem]">{t.sub}</div>
                  </div>
                  <div className="flex gap-[.4rem] shrink-0 mr-[.25rem]">
                    <span className="bg-[rgba(0,71,255,.07)] text-blue font-mono text-[.55rem] font-bold tracking-[.04em] py-[.22rem] px-[.6rem] rounded-[5px] whitespace-nowrap">{t.specs.Voltage}</span>
                    <span className="bg-[rgba(0,71,255,.07)] text-blue font-mono text-[.55rem] font-bold tracking-[.04em] py-[.22rem] px-[.6rem] rounded-[5px] whitespace-nowrap">{t.specs.Current}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 text-gray transition-[transform] duration-[.25s] ${openAcc === i ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div className={`overflow-hidden transition-[max-height] duration-[.4s] ease-in-out ${openAcc === i ? 'max-h-[600px]' : 'max-h-0'}`}>
                  <div className="border-t border-[#E8ECF5] bg-off">
                    {/* Top: image + features + upgrades */}
                    <div className="flex gap-8 pt-[1.75rem] px-[1.75rem] pb-6 items-start flex-wrap">
                      <div className="w-[260px] shrink-0 rounded-xl overflow-hidden h-[220px] shadow-[0_2px_12px_rgba(5,9,31,.1)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.image} alt={t.title} className="w-full h-full object-cover block" />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <div className="font-mono text-[.55rem] text-blue tracking-[.18em] uppercase font-bold mb-4">Standard Features</div>
                        <ul className="check-list m-0">
                          {t.items.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <div className="font-mono text-[.55rem] text-[#059669] tracking-[.18em] uppercase font-bold mb-4">Optional Upgrades</div>
                        <ul className="m-0 p-0 list-none flex flex-col gap-[.55rem]">
                          {t.upgrades.map(u => (
                            <li key={u} className="flex gap-[.55rem] items-start text-[.82rem] text-gray leading-[1.55]">
                              <span className="text-[#059669] font-extrabold shrink-0 text-[.9rem] leading-[1.4]">+</span>
                              {u}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Bottom: specifications strip */}
                    <div className="border-t border-[#E8ECF5] grid grid-cols-5 bg-white">
                      {specCols.map((col, ci) => (
                        <div key={col} className={`py-4 px-5 ${ci < specCols.length - 1 ? 'border-r border-[#E8ECF5]' : ''}`}>
                          <div className="font-mono text-[.5rem] text-gray tracking-[.15em] uppercase mb-[.35rem]">{col}</div>
                          <div className="font-title text-[.82rem] font-bold text-navy leading-[1.3]">{(t.specs as Record<string, string>)[col] ?? ''}</div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#E8ECF5] py-[.9rem] px-6 bg-white flex justify-end">
                      <Link href={t.href} className="font-mono text-[.72rem] font-bold text-blue tracking-[.06em] no-underline flex items-center gap-[.35rem]">
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
      <div id="standards" className="section bg-white scroll-mt-[110px]">
        <div className="container">
          <div className="label rv">Standards &amp; Compliance</div>
          <h2 className="rv mb-10">Built to Standard</h2>
          <div className="cert-grid cert-grid-3">
            {standards.map((s, i) => (
              <div key={s.std} className={`cert-item rv${i % 3 === 1 ? ' d2' : i % 3 === 2 ? ' d3' : ''}`}>
                <div className="h-[52px] flex items-center justify-center mb-[.9rem]">
                  {s.logo
                    ? <img src={s.logo} alt={s.std} className="max-h-[44px] max-w-[110px] w-auto object-contain block" />
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
      <div id="applications" className="section bg-off scroll-mt-[110px]">
        <div className="container">
          <div className="label rv">Applications</div>
          <h2 className="rv mb-10">Where Our Switchboards Are Deployed</h2>
          <div className="split items-start gap-14">
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
            <div className="rv-r bg-navy rounded-[16px] py-8 px-[2.25rem] border border-blue/[.2]">
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">End-to-End Services</div>
              <h3 className="text-white mb-4 text-[1.05rem]">From specification to commissioning.</h3>
              <p className="text-white/[.6] text-[.88rem] leading-[1.75] mb-6">
                Specification review, engineering design, factory testing, site commissioning — the same team that built your switchboard supports it through its full lifecycle.
              </p>
              <Link href="/commissioning" className="btn btn-primary mag">View Commissioning Services →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="section bg-white scroll-mt-[110px]">
        <div className="container">
          <div className="label rv">FAQ</div>
          <h2 className="rv mb-10">Frequently Asked Questions</h2>
          <div className="max-w-[780px] flex flex-col gap-3">
            {faqs.map((f, i) => (
              <div key={i} className={`rv bg-white rounded-[14px] border border-[#E8ECF5] overflow-hidden transition-[box-shadow] duration-200 ${openFaq === i ? 'shadow-[0_8px_32px_rgba(5,9,31,.1)]' : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left bg-transparent border-0 py-5 px-6 flex justify-between items-center cursor-pointer gap-4">
                  <span className="font-title font-bold text-navy text-[.88rem] tracking-[.02em]">{f.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 text-gray transition-[transform] duration-[.25s] ${openFaq === i ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div className={`overflow-hidden transition-[max-height] duration-[.35s] ease-in-out ${openFaq === i ? 'max-h-[400px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6">
                    <p className="text-gray text-[.88rem] leading-[1.75] m-0">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GET A QUOTE */}
      <div id="quote" className="section bg-off scroll-mt-[110px]">
        <div className="container">
          <div className="split items-center gap-14">
            <div className="rv-l">
              <div className="label">Get a Quote</div>
              <h2 className="mb-6">Request Switchboard Pricing</h2>
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-3">What to Include in Your Inquiry</div>
              <ul className="check-list">
                <li>Main current rating and voltage</li>
                <li>Number of feeder circuits</li>
                <li>Indoor / outdoor installation</li>
                <li>Utility metering requirements</li>
                <li>Required delivery timeline</li>
                <li>Applicable standards (UL, CSA, ESA)</li>
              </ul>
            </div>
            <div className="rv-r bg-navy rounded-[20px] p-10 border border-blue/[.2] flex flex-col gap-5">
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase">Response within 1 business day</div>
              <h3 className="text-white m-0 text-[1.05rem]">Same-day lead time quote.<br />Speak directly with our engineers.</h3>
              <p className="text-white/[.6] text-[.88rem] leading-[1.75] m-0">Our engineering team reviews every inquiry personally — no automated responses, no gatekeeping.</p>
              <Link href="/contact?product=switchboards" className="btn btn-primary btn-lg mag">Request a Quote →</Link>
              <a href="tel:+16476162595" className="text-white/[.35] text-[.78rem] no-underline tracking-[.04em]">Or call +1 (647) 616-2595</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Built for Your Project. Tested Before Shipment.</h2>
          <p className="lead rv !text-white/[.6] !max-w-[500px]">Built in Canada — reach our engineering team directly for specs, quotes, and lead times.</p>
          <div className="flex gap-4 justify-center flex-wrap rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
            <Link href="/products" className="btn btn-outline btn-lg mag">All Products →</Link>
          </div>
        </div></div>
      </div>
    </>
  )
}
