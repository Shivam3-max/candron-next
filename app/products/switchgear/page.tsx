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
      image: '/images/products/switchgear/metal-clad.jpg',
      items: [
        'Withdrawable VCBs with three-position isolation',
        'Full bus compartmentalization',
        'Protection relays: 50/51, 27/59, 67, 87',
        'Voltage range: 2.4–38 kV, up to 2000 A',
        'Interlocked safety shutters',
        'NGR/HRG grounding-system integration',
      ],
      upgrades: [
        'Arc-resistant type (ARST) construction',
        'Motor-operated racking mechanism',
        'PT cubicle with revenue metering',
        'Partial discharge monitoring',
        'Battery-backed control power',
        'SCADA / IEC 61850 gateway',
        'Commissioning, P&C studies, arc-flash studies and labels',
      ],
      specs: { Voltage: '2.4–38 kV', Current: 'Up to 2000 A', 'Interrupting Rating': 'Up to 40 kA symmetrical', Features: 'Withdrawable VCBs, arc-rated', Standards: 'IEC 62271-200, IEEE C37' },
    },
    {
      title: 'Metal-Enclosed Load-Interrupter',
      sub: '5–27.6 kV • Compact',
      href: '/products/switchgear/load-interrupter',
      image: '/images/products/switchgear/load-interrupter.jpg',
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
      image: '/images/products/switchgear/service-entrance.jpg',
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
      specs: { Voltage: 'Up to 38 kV', Current: 'Up to 2000 A', 'Interrupting Rating': 'Up to 40 kA symmetrical', Features: 'Utility-approved, revenue metering', Standards: 'CSA, ESA, UL' },
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
    {
      q: 'What is the difference between metal-clad and metal-enclosed switchgear?',
      a: 'Metal-clad switchgear uses draw-out vacuum circuit breakers with full compartmentalization between breaker, bus, cable, and control sections. Metal-enclosed switchgear typically uses fixed load-break switches and current-limiting fuses, making it compact and cost-effective for feeder applications.',
    },
    {
      q: 'Can medium-voltage switchgear be installed outdoors?',
      a: 'Yes. CANDRON supplies pad-mounted outdoor switchgear with NEMA 4 and NEMA 4X enclosure options, including moisture control, protected cable compartments, and project-specific corrosion protection.',
    },
    {
      q: 'Can MV switchgear be customized for non-standard voltage ratings?',
      a: 'Yes. Our medium-voltage switchgear covers 2.4 kV to 38 kV, including common 5 kV, 13.8 kV, 15 kV, 27.6 kV, and 34.5 kV systems. Insulation, bus, protection, and fault-current ratings are selected for the project.',
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
          <p className="lead mt-4">
            One complete range of low- and medium-voltage switchgear: MV from 2.4–38 kV and up to 2000 A, plus LV systems up to 600 V and 6000 A.
          </p>
          <div className="flex gap-[.75rem] flex-wrap mt-6">
            {['Arc-Flash Ready', 'Withdrawable Breakers', 'SCADA Integration', 'ESA Compliant'].map(b => (
              <span key={b} className="py-[.4rem] px-4 bg-white/[.12] border border-white/25 rounded-full text-[.78rem] font-bold text-white">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <TrustBar />

      {/* STICKY TAB NAV */}
      <div className="product-sticky-tabs sticky top-16 bg-white border-b border-[#E8ECF5] z-40">
        <div className="container">
          <div className="product-sticky-tabs-track flex gap-1 flex-wrap py-[.6rem]">
            {[['#overview', 'Overview'], ['#stock', 'Toronto Stock'], ['#product-range', 'Product Range'], ['#types-specs', 'Types & Specs'], ['#standards', 'Standards'], ['#applications', 'Applications'], ['#faq', 'FAQ'], ['#quote', 'Get a Quote']].map(([href, label]) => (
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
              <h2 className="mb-5">Built for Protection,<br />Designed for Uptime</h2>
              <p className="body mb-6">Switchgear isolates faults, protects equipment, and keeps your process running. Our designs align protection settings with utility requirements and downstream coordination. We support indoor arc-resistant lineups and outdoor weatherproof enclosures.</p>
              <ul className="check-list mb-8">
                <li>Voltage ranges: LV up to 600 V; MV from 2.4 kV to 38 kV</li>
                <li>MV ratings: up to 2000 A and 40 kA symmetrical</li>
                <li>Outdoor enclosures: NEMA 4 and NEMA 4X options</li>
                <li>Breaker technologies: ACB, VCB, SF6 alternatives</li>
                <li>Relaying: ANSI/IEC curves, differential and distance options</li>
                <li>NGR/HRG, remote operation, and SCADA/IEC 61850 integration</li>
              </ul>
              <div className="flex gap-4 flex-wrap">
                <Link href="/contact?product=switchgear" className="btn btn-primary mag">Request a Quote</Link>
                <Link href="#types-specs" className="btn btn-outline-blue mag">Explore Types →</Link>
              </div>
            </div>
            <div className="switchgear-overview-visual rv-r relative">
              <div className="switchgear-overview-image prod-detail-img">
                {/* A native image keeps this key product visual available on static hosting too. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/switchgear.jpg" alt="CANDRON switchgear assembly" loading="eager" decoding="async" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(5,9,31,.72)_100%)] pointer-events-none" />
              </div>
              <div className="switchgear-overview-metrics product-image-metrics absolute bottom-0 left-0 right-0 grid grid-cols-4 bg-transparent border-t border-white/[.12] rounded-b-[14px]">
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.95rem] font-black text-white tracking-[.04em] mb-[.2rem]"><span data-count={38} data-suffix=" kV">38 kV</span></div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">MV Voltage</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.95rem] font-black text-white tracking-[.04em] mb-[.2rem]"><span data-count={2000} data-suffix=" A">2000 A</span></div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">MV Current</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center border-r border-white/[.08]">
                  <div className="font-display text-[.85rem] font-black text-white tracking-[.04em] mb-[.2rem]">40 kA</div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">Symmetrical</div>
                </div>
                <div className="py-[.95rem] px-[.5rem] text-center">
                  <div className="font-display text-[.85rem] font-black text-white tracking-[.04em] mb-[.2rem]">4–16 Wks</div>
                  <div className="font-mono text-[.5rem] text-white/[.45] tracking-[.16em] uppercase">ARAD Lead Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 35 KV TORONTO STOCK */}
      <section id="stock" className="section bg-off scroll-mt-[110px]" aria-labelledby="toronto-stock-title">
        <div className="container">
          <div className="grid grid-cols-[.9fr_1.1fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 items-center">
            <div className="rv-l">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="label m-0">Available Inventory · Toronto</div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#A7E6C4] bg-[#EAFBF2] px-3 py-1.5 font-mono text-[.58rem] font-bold uppercase tracking-[.09em] text-[#087A43]">
                  <span className="h-2 w-2 rounded-full bg-[#12A861]" />
                  4 Units Available
                </span>
              </div>
              <h2 id="toronto-stock-title" className="!leading-[1.08]">
                35 kV Switchgear.<br />
                <em>In Stock in Toronto.</em>
              </h2>
              <p className="lead mt-6 max-w-[620px]">
                Four 35 kV-class switchgear units are available in Toronto, Ontario for projects requiring accelerated delivery. These pre-certified units provide a ready-to-deploy option when project timelines are tight.
              </p>

              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-3 mt-8">
                {[
                  { value: '4 Units', label: 'Current Availability' },
                  { value: '35 kV Class', label: 'Application Rating' },
                  { value: 'Toronto, ON', label: 'Stock Location' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[12px] border border-[#DCE3F2] bg-white px-4 py-4 min-w-0">
                    <div className="font-display text-[.88rem] font-black text-navy break-words">{item.value}</div>
                    <div className="font-mono text-[.5rem] uppercase tracking-[.1em] text-slate mt-1.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[14px] border border-[#DCE3F2] bg-white p-6">
                <div className="font-display text-[.86rem] font-black text-navy mb-4">CANDRON Verification Process</div>
                <ul className="m-0 p-0 list-none grid gap-3">
                  {[
                    '50-point physical inspection checklist',
                    'Electrical testing and verification',
                    'Mechanical testing and verification',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate text-[.84rem] leading-[1.55]">
                      <span className="mt-[.35rem] w-2 h-2 rounded-full bg-blue shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/contact?product=35kv-switchgear-toronto-stock" className="btn btn-primary mag">Request Specifications & Pricing →</Link>
                <Link href="/products/switchgear/metal-clad" className="btn btn-outline-blue mag">View MV Switchgear</Link>
              </div>
              <p className="font-mono text-[.56rem] uppercase tracking-[.08em] text-slate mt-4">Availability is subject to confirmation at the time of inquiry.</p>
            </div>

            <div className="grid grid-cols-[1.08fr_.92fr] max-sm:grid-cols-1 gap-4 rv-r">
              <figure className="relative aspect-[3/4] overflow-hidden rounded-[18px] border border-[#DCE3F2] bg-white shadow-[0_12px_35px_rgba(5,9,31,.1)]">
                <Image
                  src="/images/projects/35kv-switchgear-toronto-stock/35kv-switchgear-front.jpg"
                  alt="Front control and switching compartment of a 35 kV-class switchgear unit in Toronto stock"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 55vw, 31vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.55),transparent_42%)] pointer-events-none" />
                <figcaption className="absolute left-4 bottom-4 rounded-full border border-white/30 bg-navy/80 px-3 py-2 font-mono text-[.53rem] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">Pre-Certified Unit</figcaption>
              </figure>
              <figure className="relative aspect-[3/4] overflow-hidden rounded-[18px] border border-[#DCE3F2] bg-white shadow-[0_12px_35px_rgba(5,9,31,.1)]">
                <Image
                  src="/images/projects/35kv-switchgear-toronto-stock/35kv-switchgear-nameplate.jpg"
                  alt="Switchgear nameplate showing a 38 kV rated maximum voltage for the available 35 kV-class equipment"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 45vw, 27vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.55),transparent_42%)] pointer-events-none" />
                <figcaption className="absolute left-4 bottom-4 rounded-full border border-white/30 bg-navy/80 px-3 py-2 font-mono text-[.53rem] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">38 kV Maximum Rating</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* SWITCHGEAR TYPES GRID */}
      <div id="product-range" className="bg-navy py-16 scroll-mt-[110px]">
        <div className="container">
          <div className="mb-10">
            <div className="label !text-blue mb-3">Product Range</div>
            <h2 className="text-white m-0 text-[clamp(1.5rem,3vw,2rem)]">
              Low- and Medium-Voltage<br className="max-md:hidden" /> Switchgear
            </h2>
          </div>
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 max-sm:gap-4">
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
                desc: 'Fully compartmented draw-out VCBs with arc-resistant options. Rated 2.4–38 kV and up to 2000 A for utility and infrastructure applications.',
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
                className="min-w-0 no-underline flex flex-col gap-[.85rem] p-[1.6rem] max-sm:p-5 rounded-[16px] bg-white/[.05] border border-white/[.1] transition-[background-color,border-color] duration-200 cursor-pointer hover:bg-[rgba(0,71,255,.18)] hover:border-[rgba(0,71,255,.45)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[.55rem] font-bold tracking-[.18em] text-blue uppercase">{t.n}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-[.4]">
                    <path d="M3 11L11 3M11 3H5M11 3v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-display font-extrabold text-base text-white leading-[1.3] break-words">{t.title}</div>
                <div className="font-mono text-[.8rem] text-white/[.55] leading-[1.65] flex-1 break-words">{t.desc}</div>
                <div className="font-mono text-[.65rem] font-bold tracking-[.08em] text-blue uppercase mt-[.25rem]">
                  View specs →
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* TYPES & SPECIFICATIONS */}
      <div id="types-specs" className="section bg-off scroll-mt-[110px]">
        <div className="container">
          <div className="label rv">Types &amp; Specifications</div>
          <h2 className="rv mb-3">Switchgear Configurations</h2>
          <p className="rv text-gray text-[.95rem] mb-10 max-w-[640px]">
            Explore our range of switchgear configurations engineered for protection, safety, and continuous uptime.
          </p>
          <div className="flex flex-col gap-3">
            {types.map((t, i) => (
              <div key={i} className={`product-type-accordion rv bg-white rounded-[14px] border border-[#E8ECF5] overflow-hidden transition-[box-shadow] duration-200 ${openAcc === i ? 'shadow-[0_8px_32px_rgba(5,9,31,.1)]' : ''}`}>
                <button
                  type="button"
                  id={`switchgear-trigger-${i}`}
                  aria-expanded={openAcc === i}
                  aria-controls={`switchgear-content-${i}`}
                  onClick={() => setOpenAcc(openAcc === i ? null : i)}
                  className="product-type-accordion-trigger w-full text-left bg-transparent border-0 py-5 px-6 flex items-center gap-4 cursor-pointer"
                >
                  <div className={`product-type-accordion-index w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-[background,color] duration-200 font-mono text-[.58rem] font-bold tracking-[.1em] ${openAcc === i ? 'bg-blue text-white' : 'bg-[rgba(0,71,255,.08)] text-blue'}`}>
                    0{i + 1}
                  </div>
                  <div className="product-type-accordion-summary flex-1 min-w-0">
                    <div className="font-title font-bold text-navy text-[.9rem] tracking-[.02em]">{t.title}</div>
                    <div className="font-mono text-[.6rem] text-blue tracking-[.08em] mt-[.15rem]">{t.sub}</div>
                  </div>
                  <div className="product-type-accordion-badges flex gap-[.4rem] shrink-0 mr-[.25rem]">
                    <span className="bg-[rgba(0,71,255,.07)] text-blue font-mono text-[.55rem] font-bold tracking-[.04em] py-[.22rem] px-[.6rem] rounded-[5px]">{t.specs.Voltage}</span>
                    <span className="bg-[rgba(0,71,255,.07)] text-blue font-mono text-[.55rem] font-bold tracking-[.04em] py-[.22rem] px-[.6rem] rounded-[5px]">{t.specs.Current}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`product-type-accordion-chevron shrink-0 text-gray transition-[transform] duration-[.25s] ${openAcc === i ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div id={`switchgear-content-${i}`} role="region" aria-labelledby={`switchgear-trigger-${i}`} className={`overflow-hidden transition-[max-height] duration-[.4s] ease-in-out ${openAcc === i ? 'max-h-[2400px]' : 'max-h-0'}`}>
                  <div className="border-t border-[#E8ECF5] bg-off">
                    {/* Top: image + features + upgrades */}
                    <div className="product-type-accordion-body flex gap-8 pt-[1.75rem] px-[1.75rem] pb-6 items-start flex-wrap">
                      <div className="product-type-accordion-image w-[260px] shrink-0 rounded-xl overflow-hidden h-[220px] shadow-[0_2px_12px_rgba(5,9,31,.1)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.image} alt={t.title} className="w-full h-full object-cover block" />
                      </div>
                      <div className="product-type-accordion-column flex-1 min-w-[200px]">
                        <div className="font-mono text-[.55rem] text-blue tracking-[.18em] uppercase font-bold mb-4">Standard Features</div>
                        <ul className="check-list m-0">
                          {t.items.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                      <div className="product-type-accordion-column flex-1 min-w-[200px]">
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
                    <div className="product-type-spec-grid border-t border-[#E8ECF5] grid grid-cols-5 bg-white">
                      {specCols.map((col, ci) => (
                        <div key={col} className={`product-type-spec-cell py-4 px-5 ${ci < specCols.length - 1 ? 'border-r border-[#E8ECF5]' : ''}`}>
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
          <h2 className="rv mb-10">Where Our Switchgear is Deployed</h2>
          <div className="split items-start gap-14">
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
            <div className="rv-r bg-navy rounded-[16px] py-8 px-[2.25rem] border border-blue/[.2]">
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">End-to-End Services</div>
              <h3 className="text-white mb-4 text-[1.05rem]">One team. Design to commissioning.</h3>
              <p className="text-white/[.6] text-[.88rem] leading-[1.75] mb-6">
                Protection settings, coordination studies, factory testing, site commissioning, and ongoing maintenance — all from the same team that built your equipment.
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
              <h2 className="mb-6">Request Switchgear Pricing</h2>
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-3">What to Include in Your Inquiry</div>
              <ul className="check-list">
                <li>Site voltage and main current rating</li>
                <li>One-line diagram or utility requirements</li>
                <li>Indoor / outdoor, arc-rated needs</li>
                <li>SCADA or relay protection preferences</li>
                <li>Required delivery timeline</li>
                <li>Witnessed FAT requirements</li>
              </ul>
            </div>
            <div className="rv-r bg-navy rounded-[20px] p-10 border border-blue/[.2] flex flex-col gap-5">
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase">Response within 1 business day</div>
              <h3 className="text-white m-0 text-[1.05rem]">Same-day lead time quote.<br />Speak directly with our engineers.</h3>
              <p className="text-white/[.6] text-[.88rem] leading-[1.75] m-0">Our engineering team reviews every inquiry personally — no automated responses, no gatekeeping.</p>
              <Link href="/contact?product=switchgear" className="btn btn-primary btn-lg mag">Request a Quote →</Link>
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
