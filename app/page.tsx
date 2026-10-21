import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroCanvas from "@/components/HeroCanvas";
import CanadaFlag from "@/components/CanadaFlag";
import ProcessSection from "@/components/ProcessSection";
import IndustryCarousel from "@/components/IndustryCarousel";
import ProjectHighlights from "@/components/ProjectHighlights";
import FeaturedProducts from "@/components/FeaturedProducts";

export const metadata = {
  title: 'Toronto Power Equipment Manufacturer | CANDRON',
  description: 'CANDRON is a leading Toronto manufacturer of switchgear, switchboards, and dry-type transformers, delivering reliable power distribution equipment with shorter lead times.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-home home-hero-v2">
        <HeroCanvas />
        <div className="container home-hero-shell">
          <div className="hero-inner home-hero-main">
            <div className="hero-content">
              <h1 className="hero-made-title">
                Made in Canada —<br />
                <em>Power Distribution</em><br className="home-hero-title-break" /> Equipment.
              </h1>
              <p className="hero-delivery-line">Engineered. Manufactured. Tested. Delivered.</p>
              <p className="lead">
                CANDRON provides high-quality switchgear, switchboards, and
                dry-type transformers built for reliable power distribution
                across commercial, industrial, transit, and EV charging applications.
              </p>
              <div className="hero-btns">
                <Link href="/inventory" className="btn btn-primary btn-lg mag">
                  Shop 600V <span aria-hidden="true">→</span>
                </Link>
                <Link href="/products" className="btn btn-outline btn-lg mag">
                  View Products <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="home-hero-blue-facet" aria-hidden="true" />
              <div className="hero-visual-img">
                <Image
                  src="/images/hero-switchgear-render.webp"
                  alt="Three CANDRON 13.8 kV outdoor switchgear enclosures, manufactured in Canada"
                  width={1434}
                  height={1078}
                  priority
                  sizes="(max-width:768px) 94vw, 58vw"
                  className="w-full h-full object-contain object-[center_bottom]"
                />
              </div>
            </div>
          </div>
          <div className="trust-logos home-hero-built-for">
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
      </section>

      {/* STAT BAR */}
      <div className="bg-[#EEF2FF] pt-8">
        <div className="container">
          <div className="home-stats responsive-override-exempt">
            {/* Inventory Availability */}
            <div className="home-stat">
              <div className="home-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
                  <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                </svg>
              </div>
              <div className="home-stat-title home-stat-number">1000+</div>
              <div className="home-stat-caption">New / Used Inventory</div>
            </div>

            {/* Made in Canada */}
            <div className="home-stat">
              <div className="home-stat-icon home-stat-flag">
                <CanadaFlag height={40} />
              </div>
              <div className="home-stat-title">Made in Canada</div>
              <div className="home-stat-caption">Toronto, Ontario</div>
            </div>

            {/* Factory Testing */}
            <div className="home-stat">
              <div className="home-stat-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/neta.svg" alt="NETA" className="h-[24px] w-auto max-w-[46px] brightness-0 invert" />
              </div>
              <div className="home-stat-title">Factory Testing</div>
              <div className="home-stat-caption">To NETA Standards</div>
            </div>

            {/* Always available */}
            <a className="home-stat home-stat-call" href="tel:+16476162595" aria-label="Call CANDRON 24/7 at +1 (647) 616-2595">
              <div className="home-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              </div>
              <div className="home-stat-title">24/7 Available</div>
              <div className="home-stat-caption">Just One Call Away</div>
            </a>
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS BAND */}
      <div className="bg-[#EEF2FF] pt-10 pb-8">
        <div className="container">
          <div className="relative pt-[1.75rem] max-md:pt-[3.75rem] px-6 pb-6">
            {/* Decorative frame */}
            <div className="absolute inset-0 border-[1.5px] border-[#93C5FD] rounded-[20px] pointer-events-none" />

            {/* Left dot */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-blue" />

            {/* Right dot */}
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-blue" />

            {/* Standards promise pill */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EEF2FF] border-[1.5px] border-[#93C5FD] rounded-full py-[.35rem] px-[1.35rem] font-mono text-[1.0625rem] max-md:text-[.875rem] tracking-[.16em] max-md:tracking-[.1em] uppercase text-blue whitespace-nowrap max-md:whitespace-normal max-md:w-[calc(100%-2rem)] text-center max-md:leading-[1.55]">
              Built to Standard. Built to Perform. Built to Last.
            </div>

            {/* Logo cards */}
            <div className="flex gap-4 justify-center flex-wrap">
              {(
                [
                  { src: "/images/ansi-logo.svg", alt: "ANSI" },
                  { src: "/images/neta.svg", alt: "NETA" },
                  { src: "/images/csa.png", alt: "CSA Group" },
                  { src: "/images/IEEE.png", alt: "IEEE" },
                  { src: "/images/ugSolutions.png", alt: "UL Solutions" },
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
                  <span className="font-mono text-[.8125rem] tracking-[.12em] uppercase text-[#6B7280] font-semibold">
                    {alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS — animated line-art showcase */}
      <FeaturedProducts />

      {false && (
      <div className="section bg-white">
        <div className="container">
          {/* ── Top split: headline + image ── */}
          <div className="split items-center gap-0 mb-14">
            <div className="rv-l pr-12 max-md:pr-0">
              <div className="label">Why CANDRON</div>
              <h2 className="leading-[1.08] mb-6">
                Power Distribution.
                <br />
                Built Different.
                <br />
                <span className="text-blue">Built Better.</span>
              </h2>
              <div className="w-12 h-[3px] bg-blue rounded-[2px] mb-7" />
              <div className="flex flex-col gap-4 text-gray text-[1.125rem] leading-[1.85]">
                <p className="m-0">
                  At CANDRON Energy, engineering, manufacturing, assembly, and
                  testing come together under one roof. This integrated approach
                  gives us greater control over quality, consistency, and lead
                  times—from initial design through final testing.
                </p>
                <p className="m-0">
                  Our products are backed by advanced engineering, decades of
                  industrial experience, detailed simulations, multi-stage
                  design reviews, and modern manufacturing processes.
                </p>
                <p className="m-0">
                  We don&rsquo;t compromise on the details. From premium-grade
                  materials and components to precision fabrication, high-build
                  coating systems, and rigorous inspection and testing, every
                  element is selected and built for reliable performance,
                  durability, and long-term value.
                </p>
                <p className="m-0 font-bold text-navy">
                  Engineered in Canada. Built for Power. Built to Perform.
                </p>
              </div>
            </div>

            <div className="rv-r relative max-md:hidden">
              <div className="rounded-[14px] overflow-hidden h-[360px] max-sm:h-[220px] relative bg-[#111827]">
                <Image
                  src="/images/switchgear.jpg"
                  alt="CANDRON power distribution equipment"
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
                    <div className="font-title text-[.8125rem] font-semibold text-white leading-[1.4]">
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
                <p className="text-gray text-[1.125rem] leading-[1.82] m-0">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* PROCESS */}
      <ProcessSection />

      {/* PROJECT HIGHLIGHTS — every completed-project case study, gathered from the product and service pages */}
      <ProjectHighlights />

      {/* INDUSTRIES — content-driven height avoids excess whitespace on large displays */}
      <div className="section bg-white home-industries-section h-auto min-h-0 flex flex-col !pt-14 !pb-10 max-md:!pb-12">
        {/* everything inside the standard container */}
        <div className="container min-h-0 flex flex-col">
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
