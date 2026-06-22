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
                    ].flatMap((item, i, arr) => [
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
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', opacity: 0.92 }}
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
      <div style={{ background: "#EEF2FF", padding: "2rem 0 0" }}>
        <div className="container">
          <div
            className="home-stat-bar"
            style={{
              background: "linear-gradient(135deg,#1252FF 0%,#0038CC 100%)",
              borderRadius: "20px",
              padding: "2.5rem 1rem",
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr auto 1fr",
              alignItems: "center",
            }}
          >
            {/* 100% In-House Engineering */}
            <div style={{ textAlign: "center", padding: "0 1.5rem" }}>
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  background: "rgba(255,255,255,.13)",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.1rem",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  style={{ width: "32px", height: "32px" }}
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: "var(--fd)",
                  fontSize: "2.6rem",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: ".45rem",
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: ".58rem",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.6)",
                }}
              >
                In-House Engineering
              </div>
            </div>

            {/* Divider */}
            <div
              className="home-stat-divider"
              style={{
                width: "1px",
                height: "90px",
                background: "rgba(255,255,255,.18)",
              }}
            />

            {/* Canadian Manufacturing */}
            <div style={{ textAlign: "center", padding: "0 1.5rem" }}>
              <div
                style={{
                  width: "76px",
                  height: "68px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.1rem",
                  overflow: "hidden",
                }}
              >
                <CanadaFlag height={68} />
              </div>
              <div
                style={{
                  fontFamily: "var(--fd)",
                  fontSize: "1.15rem",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.25,
                  letterSpacing: ".01em",
                  marginBottom: ".45rem",
                }}
              >
                Canadian
                <br />
                Manufacturing
              </div>
              <div
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: ".58rem",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.6)",
                }}
              >
                Toronto, Ontario
              </div>
            </div>

            {/* Divider */}
            <div
              className="home-stat-divider"
              style={{
                width: "1px",
                height: "90px",
                background: "rgba(255,255,255,.18)",
              }}
            />

            {/* Factory Testing */}
            <div style={{ textAlign: "center", padding: "0 1.5rem" }}>
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  background: "rgba(255,255,255,.13)",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.1rem",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/neta.svg"
                  alt="NETA"
                  style={{
                    height: "30px",
                    width: "auto",
                    maxWidth: "56px",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--fd)",
                  fontSize: "1.15rem",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.25,
                  letterSpacing: ".01em",
                  marginBottom: ".45rem",
                }}
              >
                Factory Testing
              </div>
              <div
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: ".58rem",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.6)",
                }}
              >
                To NETA Standards
              </div>
            </div>
          </div>
        </div>
      </div>
 {/* CERTIFICATIONS BAND */}
      <div style={{ background: "#EEF2FF", padding: "2.5rem 0 2rem" }}>
        <div className="container">
          <div
            style={{ position: "relative", padding: "1.75rem 1.5rem 1.5rem" }}
          >
            {/* Decorative frame */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1.5px solid #93C5FD",
                borderRadius: "20px",
                pointerEvents: "none",
              }}
            />

            {/* Left dot */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translate(-50%,-50%)",
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "var(--blue)",
              }}
            />

            {/* Right dot */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(50%,-50%)",
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "var(--blue)",
              }}
            />

            {/* "BUILT TO STANDARD" pill */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translate(-50%,-50%)",
                background: "#EEF2FF",
                border: "1.5px solid #93C5FD",
                borderRadius: "999px",
                padding: ".28rem 1.1rem",
                fontFamily: "var(--fm)",
                fontSize: ".8rem",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "var(--blue)",
                whiteSpace: "nowrap",
              }}
            >
              Built to Standard
            </div>

            {/* Logo cards */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
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
                <div
                  key={alt}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ".55rem",
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #E0E7FF",
                      borderRadius: "14px",
                      padding: ".65rem 1.3rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "64px",
                      minWidth: "96px",
                      boxShadow: "0 2px 8px rgba(0,47,255,.07)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={alt}
                      style={{
                        height: "28px",
                        width: "auto",
                        maxWidth: "90px",
                        display: "block",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: ".58rem",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "#6B7280",
                      fontWeight: 600,
                    }}
                  >
                    {alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* WHY CANDRON */}
      <div className="section bg-white">
        <div className="container">
          {/* ── Top split: headline + image ── */}
          <div
            className="split"
            style={{ alignItems: "center", gap: 0, marginBottom: "3.5rem" }}
          >
            <div className="rv-l" style={{ paddingRight: "3rem" }}>
              <div className="label">Why Candron</div>
              <h2 style={{ lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Power Distribution.
                <br />
                Built Different.
                <br />
                <span style={{ color: "var(--blue)" }}>Built Better.</span>
              </h2>
              <div
                style={{
                  width: "48px",
                  height: "3px",
                  background: "var(--blue)",
                  borderRadius: "2px",
                  marginBottom: "1.75rem",
                }}
              />
              <p
                style={{
                  color: "var(--gray)",
                  fontSize: ".95rem",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
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

            <div className="rv-r" style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  height: "360px",
                  position: "relative",
                  background: "#111827",
                }}
              >
                <Image
                  src="/images/switchgear.jpg"
                  alt="Candron power distribution equipment"
                  fill
                  style={{ objectFit: "cover", opacity: 0.88 }}
                  sizes="50vw"
                />
                {/* gradient scrim so text is legible over the light image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, transparent 45%, rgba(5,9,31,.72) 100%)",
                    borderRadius: "14px",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div
                className="hero-img-grid"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  background: "transparent",
                  borderRadius: "0 0 14px 14px",
                  borderTop: "1px solid rgba(255,255,255,.12)",
                }}
              >
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
                    style={{
                      padding: "1rem .6rem",
                      textAlign: "center",
                      borderRight:
                        i < 3 ? "1px solid rgba(255,255,255,.12)" : "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ".4rem",
                      color: "var(--blue)",
                    }}
                  >
                    {item.icon}
                    <div
                      style={{
                        fontFamily: "var(--ft)",
                        fontSize: ".58rem",
                        fontWeight: 600,
                        color: "#fff",
                        lineHeight: 1.4,
                      }}
                    >
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
          <div className="why-grid" style={{ marginBottom: "2rem" }}>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div className="wc-icon">
                    {card.rawIcon
                      ? card.rawIcon
                      : React.cloneElement(
                          card.icon as React.ReactElement<{
                            style?: React.CSSProperties;
                          }>,
                          {
                            style: {
                              width: "22px",
                              height: "22px",
                              display: "block",
                            },
                          },
                        )}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--ft)",
                      fontWeight: 700,
                      color: "var(--navy)",
                      fontSize: "1rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {card.title}
                  </div>
                </div>
                <div
                  style={{
                    width: "28px",
                    height: "2.5px",
                    background: "var(--blue)",
                    borderRadius: "2px",
                    marginBottom: "1.1rem",
                  }}
                />
                <p
                  style={{
                    color: "var(--gray)",
                    fontSize: ".88rem",
                    lineHeight: 1.82,
                    margin: 0,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <ProcessSection />

      {/* PRODUCTS */}
      <div className="section bg-off">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "3.5rem",
            }}
          >
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
                  style={{ objectFit: "cover" }}
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
                  style={{ objectFit: "cover" }}
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
                  style={{ objectFit: "cover" }}
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

      {/* INDUSTRIES — full viewport height */}
      <div
        className="section bg-white home-industries-section"
        style={{
          height: "100vh",
          minHeight: "fit-content",
          display: "flex",
          flexDirection: "column",
          padding: "3.5rem 0 0",
        }}
      >
        {/* everything inside the standard container */}
        <div
          className="container"
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            paddingBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
              flexShrink: 0,
              marginBottom: "2rem",
            }}
          >
            <div className="rv">
              <div className="label">Industries Served</div>
              <h2>
                Critical Infrastructure
                <br />
                Across{" "}
                <span style={{ color: "var(--blue)" }}>North America</span>
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
            <div
              className="label label-white rv"
              style={{ justifyContent: "center" }}
            >
              Get In Touch
            </div>
            <h2 className="rv">
              Need a Reliable Electrical
              <br />
              Manufacturing Partner?
            </h2>
            <p
              className="lead rv"
              style={{
                color: "rgba(255,255,255,.6)",
                maxWidth: "560px",
                margin: "0 auto 2.5rem",
              }}
            >
              Work directly with the engineers building your equipment. Get
              factory-direct pricing, faster turnaround times, and tested
              solutions you can trust.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
              className="rv"
            >
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
