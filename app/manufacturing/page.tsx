import Link from "next/link";
import Image from "next/image";
import CanadaFlag from "@/components/CanadaFlag";
import CapabilitiesFlow from "@/components/CapabilitiesFlow";

export const metadata = {
  title: "Manufacturing",
  description:
    "Candron's Canadian manufacturing facility handles every stage in-house — electrical design, fabrication, assembly, wiring, and factory acceptance testing. No outsourcing, one point of accountability.",
};

export default function ManufacturingPage() {
  return (
    <>
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ background: "url('/images/manufacturing.jpg') center/cover" }}
        ></div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Manufacturing</span>
          </div>
          <div className="label label-white">Our Facility</div>
          <h1>
            Designed, Built &amp;
            <br />
            <em>Tested Under One Roof</em>
          </h1>
          <p className="lead mt-4">
            Candron Energy provides complete in-house manufacturing capabilities
            that eliminate unnecessary delays and ensure total quality control —
            from first engineering drawing to final factory test.
          </p>
        </div>
      </div>

      {/* INTRO */}
      <div className="section bg-white">
        <div className="container">
          <div className="intro-split rv">
            <div>
              <div className="label">The Candron Difference</div>
              <h2>Complete Manufacturing Control</h2>
            </div>
            <div>
              <p className="body mb-5">
                Most electrical equipment suppliers depend on a network of
                third-party fabricators, outsourced wiring shops, and external
                testing facilities. This introduces delays, communication gaps,
                and quality inconsistencies that inevitably impact your project
                timeline.
              </p>
              <p className="body mb-5">
                Candron operates differently. Our Canadian manufacturing
                facility handles every stage of production under one roof —
                electrical design, mechanical design, fabrication, assembly,
                wiring, and quality assurance. When you work with Candron, you
                have a single point of accountability for the entire
                manufacturing process.
              </p>
              <p className="body">
                The result is faster project execution, greater reliability, and
                equipment built to perform in the most demanding environments —
                backed by rigorous in-house testing before it ever leaves our
                facility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CAPABILITIES — animated flow */}
      <CapabilitiesFlow />

      {/* MATERIAL QUALITY */}
      <div className="mq-section">
        <div className="container">
          <div className="mq-header rv">
            <div>
              <div className="label label-white">Built to Last</div>
              <h2 className="mq-heading">
                Materials Built to
                <br />
                <em>Outlast the Competition</em>
              </h2>
            </div>
            <p className="mq-lead">
              While most suppliers use 13–14 gauge steel and standard coatings,
              Candron specifies heavier materials and higher finishing standards
              — because equipment that lasts 30–40 years costs less over its
              lifetime.
            </p>
          </div>
          <div className="capability-grid">
            <div className="capability-card rv">
              <div className="capability-num">11G</div>
              <div className="capability-title">11-Gauge Steel Enclosures</div>
              <div className="capability-text">
                Competitors use 13–14 gauge. We use 11 gauge — heavier, more
                rigid, and built for a 30–40 year structural lifecycle. The
                difference is visible and measurable.
              </div>
            </div>
            <div className="capability-card rv d2">
              <div className="capability-num">C5M</div>
              <div className="capability-title">C5M Paint Standard</div>
              <div className="capability-text">
                C5M is the highest corrosion protection classification for
                outdoor industrial environments. Our paint standard is at least
                10× higher than typical suppliers, with 6–8 mm outdoor coating
                thickness.
              </div>
            </div>
            <div className="capability-card rv d3">
              <div className="capability-num">CRS</div>
              <div className="capability-title">Cold-Rolled Steel</div>
              <div className="capability-text">
                Cold-rolled steel provides the highest corrosion resistance of
                any carbon steel grade. Combined with our finishing standard, it
                delivers 30–40 years of reliable service life.
              </div>
            </div>
            <div className="capability-card rv d4">
              <div className="capability-num">304 / 316L</div>
              <div className="capability-title">Stainless Steel Options</div>
              <div className="capability-text">
                For demanding environments, we offer enclosures in Type 304 and
                Type 316 L stainless steel — the right material for coastal,
                chemical, and high-humidity installations.
              </div>
            </div>
            <div className="capability-card rv d5">
              <div className="capability-num">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--blue)"
                  strokeWidth="1.8"
                  className="w-[2.4rem] h-[2.4rem]"
                >
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="capability-title">
                Laser Cutting &amp; Water Jet
              </div>
              <div className="capability-text">
                State-of-the-art German-manufactured laser cutting and water jet
                cutting machines ensure precise fabrication with tight
                tolerances — no hand grinding, no rework.
              </div>
            </div>
            <div className="capability-card rv d6">
              <div className="capability-num">99.5%</div>
              <div className="capability-title">Exceeding Standards</div>
              <div className="capability-text">
                Where a standard requires 99.37% efficiency, we target 99.5%.
                Minimum compliance is the floor — not the goal. Every system
                ships exceeding the specified requirement.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="proc-section">
        <div className="container">
          {/* Header */}
          <div className="proc-header-row rv">
            <div>
              <div className="label label-white">Manufacturing Process</div>
              <h2 className="proc-h2">
                A Structured Process
                <br />
                <em>That Eliminates Surprises</em>
              </h2>
            </div>
            <p className="proc-intro">
              Every Candron project follows a documented manufacturing process
              with defined milestones and quality gates — ensuring nothing is
              missed, every standard is met, and your project stays on schedule.
            </p>
          </div>

          {/* Image + Steps */}
          <div className="proc-content">
            <div className="proc-img-wrap rv-l">
              <Image
                src="/images/switchgear-facility.jpg"
                alt="Manufacturing Facility"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 45vw"
              />
              <div className="proc-img-overlay">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--blue)"
                  strokeWidth="2"
                  className="shrink-0"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <div>
                  <div className="font-bold text-white text-[.85rem] mb-[.2rem]">
                    Your Project, Your Visibility
                  </div>
                  <div className="text-[.75rem] text-white/[.58] leading-[1.55]">
                    Visit at any stage — including mid-build. Full transparency,
                    no surprises.
                  </div>
                </div>
              </div>
            </div>

            <div className="proc-steps rv-r">
              {[
                "Project kickoff and engineering review",
                "Drawing approval and specification sign-off",
                "Material procurement",
                "Incoming inspection",
                "Fabrication",
                "Assembly",
                "Wiring",
                "Final assembly",
                "In-process quality inspection",
                "Document compilation",
                "Delivery",
              ].map((step, i) => (
                <div className="proc-step" key={i}>
                  <div className="proc-step-num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="proc-step-text">{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics row */}
          <div className="proc-metrics rv">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                ),
                val: "100%",
                lbl: "In-House Production",
                sub: "Everything built inside our Toronto facility.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                ),
                val: "Single",
                lbl: "Point of Accountability",
                sub: "One team. One commitment. Zero hand-offs.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                val: "Expedited",
                lbl: "Lead Times",
                sub: "Streamlined in-house process, on-time delivery.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
                val: "Full FAT",
                lbl: "Before Shipment",
                sub: "Factory Acceptance Testing on every unit.",
              },
            ].map((m, i) => (
              <div className="proc-metric" key={i}>
                <div className="proc-metric-icon">{m.icon}</div>
                <div className="proc-metric-val">{m.val}</div>
                <div className="proc-metric-lbl">{m.lbl}</div>
                <p className="proc-metric-sub">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CANADIAN ADVANTAGE */}
      <div className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-12 max-w-[960px] mx-auto mb-14">
            <div className="rv-l flex justify-center items-center">
              <Image
                src="/images/Flag_of_Canada.svg"
                alt="Flag of Canada"
                width={340}
                height={170}
                className="canada-flag w-full max-w-[340px] h-auto rounded-[10px] shadow-[0_16px_56px_rgba(0,0,0,0.22)] block"
                priority
              />
            </div>
            <div className="rv-r">
              <div className="label">Canadian Manufacturing</div>
              <h2 className="mt-3">
                Built in Canada.
                <br />
                For Canadian Projects.
              </h2>
              <div className="inline-flex items-center gap-[.4rem] py-[.28rem] px-[.8rem] bg-[rgba(213,43,30,.07)] border border-[rgba(213,43,30,.2)] rounded-[20px] mt-[.85rem] mb-4 text-[.65rem] font-mono tracking-[.1em] text-[#C41E30] uppercase">
                <CanadaFlag height={18} /> Proudly Made in Canada
              </div>
              <p className="lead m-0">
                Proudly engineered and manufactured in Canada. Candron's
                Toronto, Ontario facility serves utilities, contractors,
                industrial facilities, and infrastructure projects across North
                America.
              </p>
              <p className="body mt-4 text-gray">
                Our factory can operate up to 24 hours when project schedules
                demand it — standard shifts are 10–12 hours, but we flex when
                you need us to.
              </p>
            </div>
          </div>
          <div className="facility-grid">
            <div className="facility-img rv">
              <Image
                src="/images/manufacturing.jpg"
                alt="Production Floor"
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
            <div className="facility-img rv d2">
              <Image
                src="/images/switchgear-facility.jpg"
                alt="Assembly Area"
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
            <div className="facility-img rv d3">
              <Image
                src="/images/control-panels.jpg"
                alt="Engineering Office"
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">See What We Can Build For You</h2>
            <p className="lead rv !text-white/[.6] !max-w-[500px]">
              Talk to our engineering team about your project requirements.
              Every customer — contractor, consultant, or project owner — can
              reach us directly.
            </p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact" className="btn btn-primary btn-lg mag">
                Request a Quote
              </Link>
              <Link href="/testing" className="btn btn-outline btn-lg mag">
                Our Testing Capabilities →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
