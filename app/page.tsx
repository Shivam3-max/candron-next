import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroCanvas from "@/components/HeroCanvas";
import CanadaFlag from "@/components/CanadaFlag";
import ProcessSection from "@/components/ProcessSection";
import IndustryCarousel from "@/components/IndustryCarousel";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-home">
        <HeroCanvas />
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span></span>Canadian Power Distribution Equipment
              </div>
              <h1>
                Engineered.
                <br />
                <em>Manufactured.</em>
                <br />
                Tested. Delivered.
              </h1>
              <p className="lead">
                Candron Energy designs, manufactures, assembles, and tests
                electrical power distribution equipment entirely in-house —
                delivering reliable, Canadian-made solutions with faster lead
                times and a team you can always reach directly.
              </p>
              <div className="hero-btns">
                <Link href="/contact" className="btn btn-primary btn-lg mag">
                  Request a Quote
                </Link>
                <Link href="/products" className="btn btn-outline btn-lg mag">
                  View Products
                </Link>
              </div>
              <div className="trust-logos">
                <span className="trust-lbl">Built for</span>
                <div className="trust-marquee">
                  <div className="trust-track">
                    {[
                      'Utilities', 'Data Centers', 'Oil & Gas', 'Mining',
                      'Healthcare', 'Renewables', 'Manufacturing', 'Water Treatment',
                      'Infrastructure', 'Commercial', 'Traction Power', 'Transit',
                      'EV Charging', 'Ports & Marine',
                    ].flatMap((item, i) => [
                      <span key={`a-${i}`} className="trust-item">{item}</span>,
                      <span key={`a-sep-${i}`} className="trust-sep" aria-hidden="true" />,
                    ]).concat(
                      ['Utilities', 'Data Centers', 'Oil & Gas', 'Mining',
                        'Healthcare', 'Renewables', 'Manufacturing', 'Water Treatment',
                        'Infrastructure', 'Commercial', 'Traction Power', 'Transit',
                        'EV Charging', 'Ports & Marine',
                      ].flatMap((item, i) => [
                        <span key={`b-${i}`} className="trust-item">{item}</span>,
                        <span key={`b-sep-${i}`} className="trust-sep" aria-hidden="true" />,
                      ])
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-stat-float top">
                <strong>100%</strong>
                <span>In-House Built</span>
              </div>
              <div className="hero-visual-img">
                <Image
                  src="/images/hero.webp"
                  alt="Candron In-House Manufacturing"
                  width={1280}
                  height={853}
                  priority
                  sizes="(max-width:1024px) 0px, 50vw"
                  className="w-full h-full object-contain object-[center_bottom] opacity-[.92]"
                />
              </div>
              <div className="hero-cert-strip">
                {['CSA C22.2', 'UL 508A', 'IEEE C37', 'IEC 62271', 'NETA'].map(s => (
                  <span key={s} className="hero-cert-badge">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT BAR */}
      <div className="bg-[#EEF2FF] pt-8">
        <div className="container">
          <div className="home-stat-bar responsive-override-exempt bg-[linear-gradient(135deg,#1252FF_0%,#0038CC_100%)] rounded-[20px] max-md:rounded-[14px] py-10 px-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] max-md:grid-cols-3 max-md:px-2 max-md:py-4 items-center">
            {/* 100% In-House Engineering */}
            <div className="flex flex-col items-center text-center px-6 max-md:px-1">
              <div className="w-[68px] h-[68px] max-md:w-[32px] max-md:h-[32px] bg-white/[.13] rounded-[18px] max-md:rounded-[8px] flex items-center justify-center mx-auto mb-[1.1rem] max-md:mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  className="w-8 h-8 max-md:w-4 max-md:h-4"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </div>
              <div className="font-display text-[2.6rem] max-md:text-[1.1rem] font-black text-white leading-none mb-[.45rem] max-md:mb-0">
                100%
              </div>
              <div className="font-mono text-[.58rem] max-md:text-[.42rem] tracking-[.2em] max-md:tracking-[.08em] uppercase text-white/[.6]">
                In-House Engineering
              </div>
            </div>

            {/* Divider */}
            <div className="home-stat-divider w-px h-[90px] bg-white/[.18] max-md:hidden" />

            {/* Canadian Manufacturing */}
            <div className="flex flex-col items-center text-center px-6 max-md:px-1">
              <div className="w-[76px] h-[68px] max-md:w-[32px] max-md:h-[32px] rounded-[18px] max-md:rounded-[8px] flex items-center justify-center mx-auto mb-[1.1rem] max-md:mb-1 overflow-hidden">
                {/* Full flag component on desktop, flag-icons on mobile */}
                <span className="hidden max-md:flex items-center justify-center">
                  <span className="fi fi-ca text-[1.4rem]"></span>
                </span>
                <span className="max-md:hidden">
                  <CanadaFlag height={68} />
                </span>
              </div>
              <div className="font-display text-[1.15rem] max-md:text-[.65rem] font-black text-white leading-[1.25] tracking-[.01em] mb-[.45rem] max-md:mb-0">
                Canadian
                <br />
                Manufacturing
              </div>
              <div className="font-mono text-[.58rem] max-md:text-[.42rem] tracking-[.2em] max-md:tracking-[.08em] uppercase text-white/[.6]">
                Toronto, Ontario
              </div>
            </div>

            {/* Divider */}
            <div className="home-stat-divider w-px h-[90px] bg-white/[.18] max-md:hidden" />

            {/* Factory Testing */}
            <div className="flex flex-col items-center text-center px-6 max-md:px-1">
              <div className="w-[68px] h-[68px] max-md:w-[32px] max-md:h-[32px] bg-white/[.13] rounded-[18px] max-md:rounded-[8px] flex items-center justify-center mx-auto mb-[1.1rem] max-md:mb-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/neta.svg"
                  alt="NETA"
                  className="h-[30px] max-md:h-[14px] w-auto max-w-[56px] brightness-0 invert"
                />
              </div>
              <div className="font-display text-[1.15rem] max-md:text-[.65rem] font-black text-white leading-[1.25] tracking-[.01em] mb-[.45rem] max-md:mb-0">
                Factory Testing
              </div>
              <div className="font-mono text-[.58rem] max-md:text-[.42rem] tracking-[.2em] max-md:tracking-[.08em] uppercase text-white/[.6]">
                To NETA Standards
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS BAND */}
      <div className="bg-[#EEF2FF] pt-10 pb-8">
        <div className="container">
          <div className="relative pt-[1.75rem] px-6 pb-6">
            {/* Decorative frame */}
            <div className="absolute inset-0 border-[1.5px] border-[#93C5FD] rounded-[20px] pointer-events-none" />

            {/* Left dot */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-blue" />

            {/* Right dot */}
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-blue" />

            {/* "BUILT TO STANDARD" pill */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EEF2FF] border-[1.5px] border-[#93C5FD] rounded-full py-[.28rem] px-[1.1rem] font-mono text-[.8rem] tracking-[.2em] uppercase text-blue whitespace-nowrap">
              Built to Standard
            </div>

            {/* Logo cards */}
            <div className="flex gap-4 justify-center flex-wrap">
              {(
                [
                  { src: "/images/ansi.png", alt: "ANSI" },
                  { src: "/images/neta.svg", alt: "NETA" },
                  { src: "/images/csa.png", alt: "CSA Group" },
                  { src: "/images/IEEE.png", alt: "IEEE" },
                  { src: "/images/ugSolutions.png", alt: "UL Solutions" },
                  { src: "/images/IEC.png", alt: "IEC" },
                ] as { src: string; alt: string }[]
              ).map(({ src, alt }) => (
                <div key={alt} className="flex flex-col items-center gap-[.55rem]">
                  <div className="bg-white border border-[#E0E7FF] rounded-[14px] py-[.65rem] px-[1.3rem] inline-flex items-center justify-center h-16 min-w-24 shadow-[0_2px_8px_rgba(0,47,255,.07)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={alt}
                      className="h-7 w-auto max-w-[90px] block object-contain"
                    />
                  </div>
                  <span className="font-mono text-[.58rem] tracking-[.12em] uppercase text-[#6B7280] font-semibold">
                    {alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="section bg-off">
        <div className="container">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-14">
            <div className="rv">
              <div className="label">Featured Products</div>
              <h2>Power Distribution Solutions</h2>
            </div>
            <Link href="/products" className="btn btn-outline-blue rv">
              All Products →
            </Link>
          </div>
          <div className="prod-highlights-3">
            <div className="prod-card rv">
              <div className="prod-card-img">
                <Image
                  src="/images/switchgear.jpg"
                  alt="Electrical Switchgear"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                <div className="prod-card-overlay"></div>
                <div className="prod-card-cat">Switchgear</div>
              </div>
              <div className="prod-card-body">
                <div className="prod-name">Switchgear</div>
                <div className="prod-type">
                  Medium Voltage &amp; Low Voltage
                </div>
                <ul className="prod-specs">
                  <li>Safe power distribution &amp; protection</li>
                  <li>ANSI/IEEE C37 &amp; CSA Standards</li>
                  <li>Arc resistant options available</li>
                </ul>
                <Link href="/products/switchgear" className="card-link">
                  View Details →
                </Link>
              </div>
            </div>
            <div className="prod-card rv d2">
              <div className="prod-card-img">
                <Image
                  src="/images/switchboards.jpg"
                  alt="Switchboards and Panelboards"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                <div className="prod-card-overlay"></div>
                <div className="prod-card-cat">Switchboards</div>
              </div>
              <div className="prod-card-body">
                <div className="prod-name">Switchboards &amp; Panelboards</div>
                <div className="prod-type">Engineered Distribution Systems</div>
                <ul className="prod-specs">
                  <li>Commercial, industrial &amp; infrastructure</li>
                  <li>UL891 &amp; CSA C22.2 Standards</li>
                  <li>Custom layouts &amp; integrated metering</li>
                </ul>
                <Link href="/products/switchboards" className="card-link">
                  View Details →
                </Link>
              </div>
            </div>
            <div className="prod-card rv d3">
              <div className="prod-card-img">
                <Image
                  src="/images/control-panels.jpg"
                  alt="Control Panels"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                <div className="prod-card-overlay"></div>
                <div className="prod-card-cat">Control Panels</div>
              </div>
              <div className="prod-card-body">
                <div className="prod-name">Control Panels</div>
                <div className="prod-type">UL 508A Industrial</div>
                <ul className="prod-specs">
                  <li>Automation, monitoring &amp; process control</li>
                  <li>UL 508A Standards</li>
                  <li>PLC, HMI &amp; SCADA integration</li>
                </ul>
                <Link href="/products/control-panels" className="card-link">
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CANDRON */}
      <div className="section bg-white">
        <div className="container">
          {/* ── Top split: headline + image ── */}
          <div className="split items-center gap-0 mb-14">
            <div className="rv-l pr-12 max-md:pr-0">
              <div className="label">Why Candron</div>
              <h2 className="leading-[1.08] mb-6">
                Power Distribution.
                <br />
                Built Different.
                <br />
                <span className="text-blue">Built Better.</span>
              </h2>
              <div className="w-12 h-[3px] bg-blue rounded-[2px] mb-7" />
              <p className="text-gray text-[.95rem] leading-[1.85] m-0">
                At Candron Energy, every product is engineered, manufactured,
                assembled, and tested under one roof. Combining extensive
                academic expertise with decades of industrial experience, we
                utilize advanced design software, detailed simulations,
                multi-stage engineering reviews, and highly automated
                manufacturing processes to ensure exceptional accuracy and
                reliability. We never compromise on quality. From premium-grade
                materials and components to rigorous testing procedures and
                high-build powder coating systems, every detail is selected to
                maximize performance and longevity.
              </p>
            </div>

            <div className="rv-r relative max-md:hidden">
              <div className="rounded-[14px] overflow-hidden h-[360px] max-sm:h-[220px] relative bg-[#111827]">
                <Image
                  src="/images/switchgear.jpg"
                  alt="Candron power distribution equipment"
                  fill
                  className="object-cover opacity-[.88]"
                  sizes="50vw"
                />
                {/* gradient scrim so text is legible over the light image */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(5,9,31,.72)_100%)] rounded-[14px] pointer-events-none" />
              </div>
              <div className="hero-img-grid absolute bottom-0 left-0 right-0 grid grid-cols-4 bg-transparent rounded-b-[14px] border-t border-white/[.12]">
                {(
                  [
                    {
                      l1: "Engineered",
                      l2: "In-House",
                      icon: (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          key="a"
                        >
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                          <polyline points="9 12 11 14 15 10" />
                        </svg>
                      ),
                    },
                    {
                      l1: "Manufactured",
                      l2: "In Canada",
                      icon: <CanadaFlag key="b" height={24} />,
                    },
                    {
                      l1: "Tested",
                      l2: "Before Shipment",
                      icon: (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          key="c"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                    },
                    {
                      l1: "Delivered",
                      l2: "Worldwide",
                      icon: (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          key="d"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                        </svg>
                      ),
                    },
                  ] as { l1: string; l2: string; icon: React.ReactNode }[]
                ).map((item, i) => (
                  <div
                    key={i}
                    className={`py-4 px-[.6rem] text-center flex flex-col items-center gap-[.4rem] text-blue${i < 3 ? " border-r border-white/[.12]" : ""}`}
                  >
                    {item.icon}
                    <div className="font-title text-[.58rem] font-semibold text-white leading-[1.4]">
                      {item.l1}
                      <br />
                      {item.l2}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Card grid ── */}
          <div className="why-grid mb-8">
            {(
              [
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  ),
                  title: "Complete In-House Control",
                  desc: "Engineering, manufacturing, assembly, and testing performed under one roof. No outsourced production, no third-party delays, no accountability gaps.",
                  d: "",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  ),
                  title: "Expedited Lead Times",
                  desc: "Direct project management and in-house manufacturing control means faster delivery. Expedited work in 1–2 weeks — vs. the 12+ week industry average.",
                  d: "d2",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.92z" />
                    </svg>
                  ),
                  title: "Always Accessible",
                  desc: "Whether you're a contractor, consultant, utility, or project owner — you can reach our team directly. No gatekeepers. Just the engineers who build your equipment.",
                  d: "d3",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M8 21V10h8v11" />
                    </svg>
                  ),
                  rawIcon: <CanadaFlag height={30} />,
                  title: "Canadian Manufacturing",
                  flag: "🇨🇦",
                  desc: "Proudly engineered and manufactured in Canada for Canadian utilities, contractors, industrial facilities, and infrastructure projects.",
                  d: "d4",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                    </svg>
                  ),
                  title: "Proven Quality",
                  desc: "Every system undergoes comprehensive factory acceptance testing against ANSI, IEEE, NETA, CSA, and UL requirements before shipment.",
                  d: "d5",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  ),
                  title: "Technical Expertise",
                  desc: "Experienced engineering and commissioning support throughout your project lifecycle — from initial design through field startup.",
                  d: "d6",
                },
              ] as {
                icon: React.ReactNode;
                rawIcon?: React.ReactNode;
                title: string;
                desc: string;
                d: string;
                flag?: string;
              }[]
            ).map((card, i) => (
              <div
                key={i}
                className={`why-card-new rv${card.d ? " " + card.d : ""}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="wc-icon">
                    {card.rawIcon
                      ? card.rawIcon
                      : React.cloneElement(
                          card.icon as React.ReactElement<{
                            className?: string;
                          }>,
                          {
                            className: "w-[22px] h-[22px] block",
                          },
                        )}
                  </div>
                  <div className="font-title font-bold text-navy text-base leading-[1.25]">
                    {card.title}
                  </div>
                </div>
                <div className="w-7 h-[2.5px] bg-blue rounded-[2px] mb-[1.1rem]" />
                <p className="text-gray text-[.88rem] leading-[1.82] m-0">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <ProcessSection />

      {/* INDUSTRIES — full viewport height */}
      <div className="section bg-white home-industries-section h-screen min-h-fit flex flex-col !pt-14 !pb-0 max-md:!pb-12">
        {/* everything inside the standard container */}
        <div className="container flex-1 min-h-0 flex flex-col pb-8">
          <div className="flex justify-between items-end flex-wrap gap-6 shrink-0 mb-8">
            <div className="rv">
              <div className="label">Industries Served</div>
              <h2>
                Critical Infrastructure
                <br />
                Across{" "}
                <span className="text-blue">North America</span>
              </h2>
            </div>
            <Link href="/industries" className="btn btn-outline-blue rv">
              All Industries →
            </Link>
          </div>
          {/* carousel fills remaining column space */}
          <IndustryCarousel />
        </div>
      </div>

      {/* TESTIMONIALS — commented out until real client quotes are available
      <div className="section bg-off">
        <div className="container">
          <div
            style={{
              textAlign: "center",
              maxWidth: "560px",
              margin: "0 auto 3.5rem",
            }}
            className="rv"
          >
            <div className="label" style={{ justifyContent: "center" }}>
              Client Feedback
            </div>
            <h2>
              What Engineers &amp;
              <br />
              Project Teams Say
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "1.5rem",
            }}
          >
            ...testimonial cards...
          </div>
        </div>
      </div>
      */}

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <div className="label label-white rv justify-center">
              Get In Touch
            </div>
            <h2 className="rv">
              Need a Reliable Electrical
              <br />
              Manufacturing Partner?
            </h2>
            <p className="lead rv !text-white/[.6] !max-w-[560px] mx-auto mb-10">
              Work directly with the engineers building your equipment. Get
              factory-direct pricing, faster turnaround times, and tested
              solutions you can trust.
            </p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact" className="btn btn-primary btn-lg mag">
                Request a Quote
              </Link>
              <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">
                +1 (647) 616-2595
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
