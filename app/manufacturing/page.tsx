import Link from "next/link";
import Image from "next/image";
import CanadaFlag from "@/components/CanadaFlag";
import CapabilitiesFlow from "@/components/CapabilitiesFlow";
import { HeroArt } from '@/components/LineArt'

export const metadata = {
  title: "Canadian-Made Equipment",
  description:
    "CANDRON is a provider of Canadian-made electrical equipment. We engineer the scope, source switchgear, switchboards and transformers from Canadian manufacturers, inspect, witness factory tests and deliver.",
};

export default function CanadianMadePage() {
  return (
    <>
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ background: "url('/images/manufacturing.jpg') center/cover" }}
        ></div>
        <HeroArt kind="cap-mfg" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Canadian-Made</span>
          </div>
          <div className="label label-white">Providers of Canadian-Made Equipment</div>
          <h1>
            Made in Canada.
            <br />
            <em>Provided by CANDRON.</em>
          </h1>
          <p className="lead mt-4">
            We are providers of Canadian-made electrical equipment. We engineer
            the scope, source it from Canadian manufacturers, inspect it, witness
            the factory test and deliver it — one accountable team from drawing
            to energization.
          </p>
        </div>
      </div>

      {/* INTRO */}
      <div className="section bg-white">
        <div className="container">
          <div className="intro-split rv">
            <div>
              <div className="label">The CANDRON Difference</div>
              <h2>Canadian-Made, Managed for You</h2>
            </div>
            <div>
              <p className="body mb-5">
                CANDRON is not a manufacturer. We are a provider: we supply
                switchgear, switchboards, transformers, control panels and
                integrated power equipment made in Canada, and we manage
                everything between your specification and a working installation.
              </p>
              <p className="body mb-5">
                Our engineers review drawings and specifications before an order
                is placed, match each item to the Canadian manufacturer best
                suited to it, and follow production through to the factory
                test — so conflicts are found on paper, not on site.
              </p>
              <p className="body">
                You get Canadian-made equipment to CSA standards, local support,
                realistic lead times and one point of contact who answers for
                quality, schedule and paperwork.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CAPABILITIES — animated flow */}
      <CapabilitiesFlow />

      {/* WHY CANADIAN-MADE */}
      <div className="mq-section">
        <div className="container">
          <div className="mq-header rv">
            <div>
              <div className="label label-white">Why Canadian-Made</div>
              <h2 className="mq-heading">
                Made Closer to Your Site,
                <br />
                <em>Supported Closer to Home</em>
              </h2>
            </div>
            <p className="mq-lead">
              Equipment made in Canada is built to the codes, climates and
              utility rules it will live under — and CANDRON stays involved
              from the order to the day it is energized.
            </p>
          </div>
          <div className="capability-grid">
            <div className="capability-card rv">
              <div className="capability-num">CSA</div>
              <div className="capability-title">Canadian Standards</div>
              <div className="capability-text">
                Equipment is made to CSA standards and the Canadian Electrical
                Code, with cUL or field evaluation where your project needs it.
              </div>
            </div>
            <div className="capability-card rv d2">
              <div className="capability-num">QA</div>
              <div className="capability-title">Qualified Manufacturers</div>
              <div className="capability-text">
                We work with Canadian manufacturers whose quality systems,
                test capability and track record we know.
              </div>
            </div>
            <div className="capability-card rv d3">
              <div className="capability-num">FAT</div>
              <div className="capability-title">Witnessed Testing</div>
              <div className="capability-text">
                We attend factory acceptance tests and check the reports, and
                your team or inspector is welcome to witness them too.
              </div>
            </div>
            <div className="capability-card rv d4">
              <div className="capability-num">°C</div>
              <div className="capability-title">Made for Canadian Climates</div>
              <div className="capability-text">
                Enclosures, heaters, coatings and ratings chosen for cold,
                snow, salt and northern sites, not adapted after the fact.
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
                Shorter Supply Chains
              </div>
              <div className="capability-text">
                Domestic production and freight mean fewer border delays,
                easier factory visits and faster answers when things change.
              </div>
            </div>
            <div className="capability-card rv d6">
              <div className="capability-num">TEAM</div>
              <div className="capability-title">One Accountable Provider</div>
              <div className="capability-text">
                Engineers, project coordinators and field technicians at CANDRON
                own the order from quote to commissioning, whoever made it.
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
              <div className="label label-white">How We Provide</div>
              <h2 className="proc-h2">
                A Structured Process
                <br />
                <em>That Eliminates Surprises</em>
              </h2>
            </div>
            <p className="proc-intro">
              Every CANDRON order follows a documented supply process with
              defined milestones, reviews and quality gates — from the first
              conversation to equipment energized on site.
            </p>
          </div>

          {/* Image + Steps */}
          <div className="proc-content">
            <div className="proc-img-wrap rv-l">
              <Image
                src="/images/switchgear-facility.jpg"
                alt="Canadian-made switchgear supplied by CANDRON"
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
                  <div className="font-bold text-white text-[1.0625rem] mb-[.2rem]">
                    Your Project, Your Visibility
                  </div>
                  <div className="text-[1rem] text-white/[.58] leading-[1.55]">
                    Ask for an update at any stage, or visit the factory with
                    us. Full transparency, no surprises.
                  </div>
                </div>
              </div>
            </div>

            <div className="proc-steps rv-r">
              {[
                "Project kickoff and requirements review",
                "Application engineering and equipment scope",
                "Specification and drawing review",
                "Selection of the right Canadian manufacturer",
                "Quotation with lead time from approved drawings",
                "Submittal drawings and approval",
                "Production follow-up and expediting",
                "In-plant quality inspection",
                "Witnessed factory acceptance testing",
                "Document review and compilation",
                "Delivery to site",
                "Commissioning support",
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
                lbl: "Canadian-Made",
                sub: "Equipment made by manufacturers in Canada.",
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
                sub: "Coordinated by one accountable project team.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                val: "Expedited",
                lbl: "Lead Times",
                sub: "Production tracked by us, so dates hold.",
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
                sub: "Factory acceptance testing on every unit.",
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
          <div className="canada-made">
            <div className="canada-made-photos rv-l">
              <div className="canada-made-photo canada-made-photo--main">
                <Image
                  src="/images/switchgear-facility.jpg"
                  alt="Canadian-made switchgear line-up supplied by CANDRON"
                  fill
                  className="object-cover"
                  sizes="(max-width:900px) 100vw, 34vw"
                />
              </div>
              <div className="canada-made-photo">
                <Image
                  src="/images/manufacturing.jpg"
                  alt="Completed Canadian-made switchgear enclosures"
                  fill
                  className="object-cover"
                  sizes="(max-width:900px) 50vw, 17vw"
                />
              </div>
              <div className="canada-made-photo">
                <Image
                  src="/images/control-panels.jpg"
                  alt="Canadian-made control panel wiring"
                  fill
                  className="object-cover"
                  sizes="(max-width:900px) 50vw, 17vw"
                />
              </div>
            </div>
            <div className="canada-made-copy rv-r">
              <div className="label">Canadian-Made Electrical Equipment</div>
              <h2 className="mt-3">
                Made in Canada.
                <br />
                For Canadian Projects.
              </h2>
              <div className="inline-flex items-center gap-[.4rem] py-[.28rem] px-[.8rem] bg-[rgba(213,43,30,.07)] border border-[rgba(213,43,30,.2)] rounded-[20px] mt-[.85rem] mb-4 text-[.875rem] font-mono tracking-[.1em] text-[#C41E30] uppercase">
                <CanadaFlag height={18} /> Proudly Made in Canada
              </div>
              <p className="lead m-0">
                We are providers of Canadian-made electrical equipment. From our
                base in Toronto, Ontario, CANDRON supplies utilities, contractors,
                industrial facilities and infrastructure projects across North
                America.
              </p>
              <p className="body mt-4 text-gray">
                Buying Canadian-made keeps your supply chain short, your
                equipment on Canadian standards and your support local — with
                CANDRON answering for the order from start to finish.
              </p>
              <ul className="canada-made-points">
                <li><strong>Toronto, Ontario</strong><span>Engineering, sales and field support</span></li>
                <li><strong>Made in Canada</strong><span>Sourced from Canadian manufacturers</span></li>
                <li><strong>North America</strong><span>Utilities, contractors and industry served</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">See What We Can Provide For You</h2>
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
