'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import TrustBar from '@/components/TrustBar'

const specCols = ['Voltage', 'Controller', 'Protocol', 'Enclosure', 'Standards']

export default function ControlPanelsPage() {
  const [openAcc, setOpenAcc] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const types = [
    {
      title: 'Automation Control Panels',
      sub: 'UL 508A • PLC / HMI Integrated',
      href: '/products/control-panels/automation',
      image: '/images/control-panels.jpg',
      items: [
        'Allen-Bradley, Siemens, or Schneider PLCs',
        'Touch-screen HMI with custom process screens',
        'Motor starter and drive integration',
        'Remote I/O with EtherNet/IP or Profibus',
        'UPS-backed control power',
        'Commented ladder logic and as-built drawings',
      ],
      upgrades: [
        'Redundant PLC (hot-standby) configuration',
        'Remote I/O expansion chassis',
        'OT cybersecurity hardening (IEC 62443)',
        'Panel air conditioning unit',
        'Managed industrial Ethernet switch',
        'Witnessed factory acceptance testing (FAT)',
      ],
      specs: { Voltage: '120/480 V AC', Controller: 'Allen-Bradley / Siemens', Protocol: 'EtherNet/IP, Modbus', Enclosure: 'NEMA 1 / 4X available', Standards: 'UL 508A, CSA C22.2' },
    },
    {
      title: 'Motor Control Centers',
      sub: 'NEMA 4X • Soft Starters & VFDs',
      href: '/products/control-panels/mcc',
      image: '/images/products/control-panels/mcc.jpg',
      items: [
        'Combination motor starters (full voltage & reversing)',
        'Variable frequency drives with bypass',
        'Overload relay and motor protection',
        'Soft-starter integration',
        'In-feed circuit breakers and fused disconnects',
        'Phase monitoring and fault indication',
      ],
      upgrades: [
        'Energy monitoring per motor (kWh / demand)',
        'Dynamic braking resistor assembly',
        'Bus plug-in expansion modules',
        'Arc flash mitigation relay (ARCTEQ)',
        'Explosion-proof motor starters (Class I Div 1)',
        'Remote monitoring via SCADA gateway',
      ],
      specs: { Voltage: '120–600 V AC', Controller: 'Integrated overloads', Protocol: 'DeviceNet, Profinet', Enclosure: 'NEMA 12 / 4X', Standards: 'UL 508A, NFPA 79' },
    },
    {
      title: 'Process Control Panels',
      sub: 'Loop Control • Instrumentation',
      href: '/products/control-panels/process',
      image: '/images/products/control-panels/process.jpg',
      items: [
        'PID loop controllers (temperature, pressure, flow)',
        'Analog and discrete I/O marshalling',
        'Signal conditioning and intrinsic safety barriers',
        'P&ID-matched termination layout',
        'RTD, thermocouple, and 4–20 mA inputs',
        'DCS gateway integration',
      ],
      upgrades: [
        'Redundant I/O modules (1:1 hot standby)',
        'Certified intrinsic safety barriers (Ex ia)',
        'Historian / data logging module',
        'Foundation Fieldbus or PROFIBUS PA segment',
        'Explosion-proof stainless enclosure (Class I Div 1)',
        'Third-party DCS integration and loop check',
      ],
      specs: { Voltage: '24 V DC / 120 V AC', Controller: 'Yokogawa, Honeywell, ABB', Protocol: 'HART, Foundation Fieldbus', Enclosure: 'NEMA 4X stainless', Standards: 'CSA C22.2, ISA 5.1' },
    },
    {
      title: 'SCADA Integration Panels',
      sub: 'Remote Monitoring • OT Cybersecurity',
      href: '/products/control-panels/scada',
      image: '/images/products/control-panels/automation.jpg',
      items: [
        'Data acquisition across PLCs and IEDs',
        'Industrial-grade cellular / fibre gateways',
        'OT cybersecurity hardening (IEC 62443)',
        'Historian, alarming, and reporting',
        'Remote dial-in with role-based access',
        'Multi-site aggregation capability',
      ],
      upgrades: [
        'Redundant communication paths (primary + failover)',
        'Firewall / DMZ network segmentation',
        'Mobile application dashboard',
        'Offline fallback mode with local storage',
        'Video surveillance integration',
        'NERC CIP compliance documentation package',
      ],
      specs: { Voltage: '120 V AC UPS-backed', Controller: 'Inductive Automation Ignition', Protocol: 'DNP3, IEC 61850, MQTT', Enclosure: 'NEMA 1 climate-controlled', Standards: 'IEC 62443, NERC CIP' },
    },
  ]

  const standards = [
    { std: 'UL 508A', desc: 'Industrial control panel standard (U.S.)', logo: null },
    { std: 'CSA C22.2', desc: 'Canadian industrial electrical standard', logo: '/images/csa.png' },
    { std: 'NFPA 79', desc: 'Electrical standard for industrial machinery', logo: null },
    { std: 'IEC 62443', desc: 'OT / industrial cybersecurity framework', logo: '/images/IEC.png' },
    { std: 'ISA 5.1', desc: 'Instrumentation symbols and identification', logo: null },
    { std: 'NERC CIP', desc: 'Critical infrastructure protection standards', logo: null },
  ]

  const faqs = [
    {
      q: 'Do you write PLC code and HMI screens?',
      a: 'Yes — our engineers write, test, and document ladder logic, function blocks, and HMI screens. We deliver commented, version-controlled code with full I/O lists and test records.',
    },
    {
      q: 'Can you integrate with our existing SCADA system?',
      a: "Yes. We support OPC-UA, Modbus TCP, DNP3, IEC 61850, and vendor-specific protocols. We've integrated with Ignition, Wonderware, Citect, iFIX, and custom DCS platforms.",
    },
    {
      q: 'Do you provide factory acceptance testing for control panels?',
      a: 'Yes — FAT is standard on all control panel orders. Tests include power-on verification, I/O loop checks, HMI screen navigation, communication protocol handshake, and emergency stop circuits. Witnessed FAT available on request.',
    },
  ]

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background: "url('/images/control-panels.jpg') center/cover" }}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span>Control Panels</span>
          </div>
          <div className="label label-white">UL 508A • CSA C22.2 • Industrial Control &amp; Automation</div>
          <h1>Control Panels — Automation,<br />Monitoring &amp; Process Control</h1>
          <p className="lead mt-4">
            Custom UL 508A industrial control panels with PLC, HMI, and SCADA integration — engineered, built, and tested in-house.
          </p>
          <div className="flex gap-[.75rem] flex-wrap mt-6">
            {['UL 508A', 'PLC Integration', 'SCADA Ready', 'CSA Compliant'].map(b => (
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
              <h2 className="mb-5">Built to Your Spec,<br />Tested Before It Ships</h2>
              <p className="body mb-6">Every control panel is engineered to your process requirements and assembled in-house. Our team handles mechanical design, electrical schematics, PLC programming, HMI configuration, and full factory acceptance testing — so you receive a panel that is ready to connect.</p>
              <ul className="check-list mb-8">
                <li>UL 508A listed — accepted across Canada and the U.S.</li>
                <li>Allen-Bradley, Siemens, Schneider — any major platform</li>
                <li>Custom schematics and as-built drawings included</li>
                <li>SCADA gateways: EtherNet/IP, Modbus, DNP3, IEC 61850</li>
              </ul>
              <div className="flex gap-4 flex-wrap">
                <Link href="/contact?product=control-panels" className="btn btn-primary mag">Request a Quote</Link>
                <Link href="#types-specs" className="btn btn-outline-blue mag">Explore Types →</Link>
              </div>
            </div>
            <div className="rv-r relative">
              <div className="prod-detail-img">
                <Image src="/images/control-panels.jpg" alt="Candron control panel assembly" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(5,9,31,.72)_100%)] pointer-events-none" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 bg-transparent border-t border-white/[.12] rounded-b-[14px]">
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.85rem] font-black text-white tracking-[.04em] mb-[.2rem]">UL 508A</div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">Listed</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.85rem] font-black text-white tracking-[.04em] mb-[.2rem]">Custom</div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">Built</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.85rem] font-black text-white tracking-[.04em] mb-[.2rem]">PLC / HMI</div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">Integration</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center">
                  <div className="font-display text-[.85rem] font-black text-white tracking-[.04em] mb-[.2rem]">SCADA</div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">Ready</div>
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
          <h2 className="rv mb-3">Control Panel Configurations</h2>
          <p className="rv text-gray text-[.95rem] mb-10 max-w-[640px]">
            Explore our range of control panel configurations engineered for precision automation, motor control, and system-wide integration.
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
                    <span className="bg-[rgba(0,71,255,.07)] text-blue font-mono text-[.55rem] font-bold tracking-[.04em] py-[.22rem] px-[.6rem] rounded-[5px] whitespace-nowrap">{t.specs.Protocol}</span>
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
          <h2 className="rv mb-10">Where Our Panels Are Deployed</h2>
          <div className="split items-start gap-14">
            <div className="rv-l">
              <ul className="check-list">
                <li>Water and wastewater treatment</li>
                <li>Oil &amp; gas processing and pipelines</li>
                <li>Food and beverage manufacturing</li>
                <li>Mining and mineral processing</li>
                <li>Power generation and utilities</li>
                <li>Building automation and HVAC</li>
                <li>Transit and traction power</li>
                <li>EV charging depot management</li>
              </ul>
            </div>
            <div className="rv-r bg-navy rounded-[16px] py-8 px-[2.25rem] border border-blue/[.2]">
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">End-to-End Services</div>
              <h3 className="text-white mb-4 text-[1.05rem]">Engineering to commissioning — one team.</h3>
              <p className="text-white/[.6] text-[.88rem] leading-[1.75] mb-6">
                We handle schematic design, PLC programming, panel build, factory testing, and site commissioning. One team, one scope, no handoffs.
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
              <h2 className="mb-6">Request Control Panel Pricing</h2>
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-3">What to Include in Your Inquiry</div>
              <ul className="check-list">
                <li>Panel type and PLC platform preference</li>
                <li>I/O count and field device list</li>
                <li>Communication protocol requirements</li>
                <li>Enclosure rating (NEMA 1, 4, 4X, 12)</li>
                <li>Required delivery timeline</li>
                <li>Witnessed FAT requirements</li>
              </ul>
            </div>
            <div className="rv-r bg-navy rounded-[20px] p-10 border border-blue/[.2] flex flex-col gap-5">
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase">Response within 1 business day</div>
              <h3 className="text-white m-0 text-[1.05rem]">Same-day lead time quote.<br />Speak directly with our engineers.</h3>
              <p className="text-white/[.6] text-[.88rem] leading-[1.75] m-0">Our engineering team reviews every inquiry personally — no automated responses, no gatekeeping.</p>
              <Link href="/contact?product=control-panels" className="btn btn-primary btn-lg mag">Request a Quote →</Link>
              <a href="tel:+16476162595" className="text-white/[.35] text-[.78rem] no-underline tracking-[.04em]">Or call +1 (647) 616-2595</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">See What We Can Build For You</h2>
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
