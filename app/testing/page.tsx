import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Testing",
  description:
    "Every Candron system undergoes comprehensive factory acceptance testing — functional, protection, control logic, and equipment validation — to ANSI, IEEE, NETA, CSA, and UL standards before shipment.",
};

export default function TestingPage() {
  return (
    <>
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ background: "url('/images/switchgear.jpg') center/cover" }}
        ></div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Testing</span>
          </div>
          <div className="label label-white">Quality Assurance</div>
          <h1>
            Comprehensive
            <br />
            <em>Factory Testing</em>
          </h1>
          <p className="lead" style={{ marginTop: "1rem" }}>
            Every system is tested before shipment to verify safety,
            reliability, and compliance. No equipment leaves our facility
            without passing a rigorous in-house factory acceptance test.
          </p>
        </div>
      </div>

      {/* INTRO */}
      <div className="section bg-white">
        <div className="container">
          <div className="intro-split rv">
            <div>
              <div className="label">Why Testing Matters</div>
              <h2>
                Tested Equipment.
                <br />
                Trusted Performance.
              </h2>
            </div>
            <div>
              <p className="body" style={{ marginBottom: "1.25rem" }}>
                Field failures cost more than just money — they cost downtime,
                project delays, safety incidents, and damaged relationships.
                Comprehensive factory testing is the only reliable way to verify
                that equipment will perform as designed once it reaches your
                site.
              </p>
              <p className="body" style={{ marginBottom: "1.25rem" }}>
                At Candron Energy, every system undergoes structured factory
                testing before shipment. Our in-house testing capability means
                we control the process, maintain the documentation, and can
                accommodate witnessed FAT for your project team or third-party
                inspector — without scheduling delays from an external test
                facility.
              </p>
              <p className="body">
                Testing is not an add-on at Candron. It is a fundamental part of
                every project, performed to the same rigorous standards
                regardless of project size or scope.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TESTING CAPABILITIES */}
      <div className="wt-section">
        <div className="container">

          {/* Header */}
          <div className="wt-header rv">
            <div>
              <div className="label label-white">Testing Capabilities</div>
              <h2 className="wt-h2">What We <em>Test</em></h2>
            </div>
            <div className="wt-header-right">
              <p className="wt-intro" style={{ maxWidth: '460px', textAlign: 'left' }}>Every system undergoes structured testing before it leaves our facility. We control the process, maintain full documentation, and can accommodate witnessed FAT for your team or third-party inspector.</p>
              <Link href="/contact" className="btn btn-primary mag" style={{ flexShrink: 0 }}>Request a Witnessed FAT →</Link>
            </div>
          </div>

          {/* Test cards */}
          <div className="wt-grid">
            {([
              {
                n: '01',
                title: 'Functional Testing',
                desc: 'Verification of all control circuits, protection functions, interlocks, and operational sequences against the approved design documentation.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              },
              {
                n: '02',
                title: 'Protection Verification',
                desc: 'Testing of all protection relay functions, overcurrent settings, trip timing, and alarm functions to confirm correct operation.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
              },
              {
                n: '03',
                title: 'Control Logic Testing',
                desc: 'PLC program verification, HMI functionality testing, and sequence of operations validation against the approved control philosophy.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h2m2 0h2m2 0h2M7 12h.01M10 12h.01"/></svg>,
              },
              {
                n: '04',
                title: 'Equipment Validation',
                desc: 'Physical inspection and verification of all components, ratings, labels, and documentation against project specifications and applicable standards.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
              },
              {
                n: '05',
                title: 'Factory Acceptance Testing',
                desc: 'Comprehensive witnessed or unwitnessed FAT performed to applicable ANSI, IEEE, NETA, CSA, and UL requirements with full test reports.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
              },
              {
                n: '06',
                title: 'Documentation Review',
                desc: 'Complete review of as-built drawings, test records, equipment data sheets, and O&M manuals against project requirements before shipment.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
              },
            ] as { n: string; title: string; desc: string; icon: React.ReactNode }[]).map((item) => (
              <div className="wt-card rv" key={item.n}>
                <div className="wt-card-top">
                  <div className="wt-num">{item.n}</div>
                  <div className="wt-icon">{item.icon}</div>
                </div>
                <div className="wt-title">{item.title}</div>
                <p className="wt-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Witnessed FAT strip */}
          <div className="wt-fat-strip rv">
            <div className="wt-fat-img">
              <Image
                src="/images/testing.jpg"
                alt="Factory Testing"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="wt-fat-img-overlay" />
            </div>
            <div className="wt-fat-content">
              <div className="label label-white">Witnessed FAT Available</div>
              <h3 style={{ color: 'white', marginTop: '.5rem', letterSpacing: '-.01em' }}>Your Team Can<br/>Be Present</h3>
              <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.92rem', lineHeight: 1.72, margin: '1rem 0 1.5rem' }}>Candron accommodates witnessed factory acceptance tests for project owners, engineers of record, and third-party inspectors. Schedule your FAT visit during project kickoff to align with your timeline.</p>
              <Link href="/contact" className="btn btn-primary mag">Schedule a Visit →</Link>
            </div>
          </div>

        </div>
      </div>

      {/* STANDARDS */}
      <div className="section bg-white">
        <div className="container">
          <div
            style={{
              textAlign: "center",
              maxWidth: "560px",
              margin: "0 auto 4rem",
            }}
            className="rv"
          >
            <div className="label" style={{ justifyContent: "center" }}>
              Standards &amp; Compliance
            </div>
            <h2>Built to the Highest Standards</h2>
            <p className="lead" style={{ margin: "1rem auto 0" }}>
              Candron's testing programs are aligned with applicable national
              and international standards governing power distribution
              equipment.
            </p>
          </div>
          <div className="standard-grid">
            {([
              { src: '/images/ansi.png',        alt: 'ANSI',        name: 'ANSI',  desc: 'American National Standards Institute requirements for electrical equipment' },
              { src: '/images/IEEE.png',         alt: 'IEEE',        name: 'IEEE',  desc: 'Institute of Electrical and Electronics Engineers testing standards' },
              { src: '/images/neta.svg',         alt: 'NETA',        name: 'NETA',  desc: 'InterNational Electrical Testing Association acceptance testing specifications' },
              { src: '/images/csa.png',          alt: 'CSA Group',   name: 'CSA',   desc: 'Canadian Standards Association — full compliance for Canadian projects' },
              { src: '/images/ugSolutions.png',  alt: 'UL Solutions',name: 'UL',    desc: 'Underwriters Laboratories listing and certification requirements' },
            ] as { src: string; alt: string; name: string; desc: string }[]).map(({ src, alt, name, desc }, i) => (
              <div key={name} className={`standard-card rv${i > 0 ? ` d${i + 1}` : ''}`}>
                <div className="standard-logo-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={alt} style={{ height: '32px', width: 'auto', maxWidth: '56px', display: 'block', objectFit: 'contain' }} />
                </div>
                <div className="standard-name">{name}</div>
                <div className="standard-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY IN-HOUSE */}
      <div className="bg-navy-section">
        <div className="container">
          <div
            style={{
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto 4rem",
            }}
            className="rv"
          >
            <div
              className="label label-white"
              style={{ justifyContent: "center" }}
            >
              The Advantage
            </div>
            <h2 style={{ color: "var(--white)" }}>
              Why In-House Testing
              <br />
              Makes a Difference
            </h2>
          </div>
          <div className="why-grid">
            <div
              className="why-card-v2 rv"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                className="why-card-icon"
                style={{ background: "rgba(0,71,255,.2)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.6"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="why-card-title" style={{ color: "var(--white)" }}>
                No Scheduling Delays
              </div>
              <div
                className="why-card-text"
                style={{ color: "rgba(255,255,255,.45)" }}
              >
                In-house testing means no waiting for an external test lab. Your
                FAT is scheduled to align with your project timeline — not an
                external facility's availability.
              </div>
            </div>
            <div
              className="why-card-v2 rv d2"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                className="why-card-icon"
                style={{ background: "rgba(0,71,255,.2)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.6"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="why-card-title" style={{ color: "var(--white)" }}>
                Issues Resolved Immediately
              </div>
              <div
                className="why-card-text"
                style={{ color: "rgba(255,255,255,.45)" }}
              >
                When testing identifies an issue, our engineering and assembly
                team is on-site to resolve it immediately. No shipping equipment
                back and forth between facilities.
              </div>
            </div>
            <div
              className="why-card-v2 rv d3"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                className="why-card-icon"
                style={{ background: "rgba(0,71,255,.2)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.6"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                </svg>
              </div>
              <div className="why-card-title" style={{ color: "var(--white)" }}>
                Complete Documentation
              </div>
              <div
                className="why-card-text"
                style={{ color: "rgba(255,255,255,.45)" }}
              >
                Detailed test reports generated and reviewed internally before
                delivery. Full traceability from test results to as-built
                drawings and equipment data sheets.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">Every Unit Tested Before It Ships</h2>
            <p
              className="lead rv"
              style={{ color: "rgba(255,255,255,.6)", maxWidth: "500px" }}
            >
              Quality you can verify. Request a quote and ask about witnessed
              FAT availability for your project.
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
              <Link
                href="/commissioning"
                className="btn btn-outline btn-lg mag"
              >
                Commissioning Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
