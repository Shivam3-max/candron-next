import Link from "next/link";
import Image from "next/image";
import CanadaFlag from "@/components/CanadaFlag";
import CapabilitiesFlow from "@/components/CapabilitiesFlow";

export const metadata = {
  title: "Manufacturing",
  description:
    "CANDRON's Toronto manufacturing facility combines multi-level engineering review, precision fabrication, skilled assembly, quality assurance, and final testing under one roof.",
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
            World-class facilities, precision machinery, experienced people,
            and structured quality controls support every stage — from the
            first engineering drawing to final factory testing.
          </p>
        </div>
      </div>

      {/* INTRO */}
      <div className="section bg-white">
        <div className="container">
          <div className="intro-split rv">
            <div>
              <div className="label">The CANDRON Difference</div>
              <h2>Complete Manufacturing Control</h2>
            </div>
            <div>
              <p className="body mb-5">
                CANDRON brings electrical and mechanical engineering,
                fabrication, assembly, wiring, quality assurance, and final
                testing together in one coordinated manufacturing environment.
                This gives every project a clear path from approved drawings to
                finished equipment.
              </p>
              <p className="body mb-5">
                Four to six electrical and mechanical engineers can collaborate
                on a single project. Drawings and specifications move through a
                multi-level review process before release, helping the team
                identify conflicts early and manufacture with confidence.
              </p>
              <p className="body">
                High-quality German robotic fabrication machinery, advanced
                assembly tools, experienced technicians, and dedicated Omicron
                and Phenix test equipment allow us to deliver precise,
                dependable power distribution equipment with efficient lead
                times.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CAPABILITIES — animated flow */}
      <CapabilitiesFlow />

      {/* TRANSFORMER CORE & COIL ASSEMBLY */}
      <section className="section bg-off" aria-labelledby="core-coil-assembly-title">
        <div className="container">
          <div className="grid grid-cols-[1.15fr_.85fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 items-center">
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 rv-l">
              {[
                {
                  src: '/images/projects/transformer-core-coil-assembly/core-coil-assembly-front.jpg',
                  alt: 'Front view of a three-phase transformer core and coil assembly during production',
                  label: 'Coil & Lead Assembly',
                },
                {
                  src: '/images/projects/transformer-core-coil-assembly/core-coil-assembly-rear.jpg',
                  alt: 'Rear view of a three-phase transformer core and coil assembly showing copper bus connections',
                  label: 'Bus & Connection Layout',
                },
              ].map((image) => (
                <figure key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-[#DCE3F2] bg-white shadow-[0_10px_30px_rgba(5,9,31,.08)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.025]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 29vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.58),transparent_45%)] pointer-events-none" />
                  <figcaption className="absolute left-4 bottom-4 font-mono text-[.52rem] font-bold uppercase tracking-[.08em] text-white">{image.label}</figcaption>
                </figure>
              ))}
            </div>

            <div className="rv-r">
              <div className="label">Transformer Manufacturing · Assembly Stage</div>
              <h2 id="core-coil-assembly-title" className="mt-4 !leading-[1.08]">
                Transformer Core &amp;<br />
                <em>Coil Assembly.</em>
              </h2>
              <p className="lead mt-6">
                At this stage, the transformer&apos;s three-phase core, windings, internal leads, structural supports, and connection points come together as one coordinated active assembly.
              </p>

              <div className="grid gap-3 mt-8">
                {[
                  { number: '01', title: 'Core & Coil Alignment', text: 'Position the phase assemblies and structural members around the engineered layout.' },
                  { number: '02', title: 'Lead & Bus Connections', text: 'Route and secure internal leads, terminals, and copper connection points.' },
                  { number: '03', title: 'Mechanical Bracing', text: 'Support the active assembly for safe handling and dependable operation.' },
                  { number: '04', title: 'In-Process Inspection', text: 'Review workmanship and assembly details before the next manufacturing stage.' },
                ].map((item) => (
                  <article key={item.number} className="grid grid-cols-[42px_1fr] gap-4 rounded-[12px] border border-[#DCE3F2] bg-white px-5 py-4">
                    <div className="w-[42px] h-[42px] rounded-[10px] bg-blue/[.08] text-blue flex items-center justify-center font-mono text-[.58rem] font-bold tracking-[.08em]">{item.number}</div>
                    <div>
                      <div className="font-display text-[.82rem] font-black text-navy mb-1">{item.title}</div>
                      <p className="font-mono text-[.7rem] leading-[1.55] text-slate m-0">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>

              <Link href="/contact?product=custom-transformer" className="btn btn-primary mag mt-8">Discuss a Transformer Project →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING ENVIRONMENT */}
      <div className="mq-section">
        <div className="container">
          <div className="mq-header rv">
            <div>
              <div className="label label-white">World-Class Manufacturing</div>
              <h2 className="mq-heading">
                Facilities, People &amp;
                <br />
                <em>Precision in Every Stage</em>
              </h2>
            </div>
            <p className="mq-lead">
              Stable production conditions, regularly audited equipment,
              advanced machinery, and a skilled team working behind the scenes
              give CANDRON the control required for precision manufacturing.
            </p>
          </div>
          <div className="capability-grid">
            <div className="capability-card rv">
              <div className="capability-num">24/7</div>
              <div className="capability-title">Around-the-Clock Capability</div>
              <div className="capability-text">
                Our production facility can run around the clock when project
                requirements and delivery schedules demand it.
              </div>
            </div>
            <div className="capability-card rv d2">
              <div className="capability-num">ISO</div>
              <div className="capability-title">Certified Operations</div>
              <div className="capability-text">
                ISO-certified factory processes support consistent production,
                documented controls, and disciplined quality management.
              </div>
            </div>
            <div className="capability-card rv d3">
              <div className="capability-num">6 MO</div>
              <div className="capability-title">Machine Auditing</div>
              <div className="capability-text">
                Fabrication and production machines undergo six-month auditing
                and quality-assurance reviews to maintain reliable performance.
              </div>
            </div>
            <div className="capability-card rv d4">
              <div className="capability-num">°C</div>
              <div className="capability-title">Temperature Control</div>
              <div className="capability-text">
                Controlled manufacturing conditions help protect dimensional
                consistency, material handling, assembly, and testing accuracy.
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
                German Robotic Fabrication
              </div>
              <div className="capability-text">
                High-quality German robotic machinery supports precise metal
                cutting, forming, and fabrication with repeatable results.
              </div>
            </div>
            <div className="capability-card rv d6">
              <div className="capability-num">TEAM</div>
              <div className="capability-title">People Behind Production</div>
              <div className="capability-text">
                Engineers, fabricators, assemblers, wire technicians, quality
                specialists, and test personnel work together behind the scenes
                to move every project forward.
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
              Every CANDRON project follows a documented manufacturing process
              with defined milestones, multi-level reviews, and quality gates —
              supporting accurate execution and predictable project delivery.
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
                "Project kickoff and requirements review",
                "Electrical and mechanical design collaboration",
                "Multi-level drawing and specification review",
                "Material procurement",
                "Incoming inspection",
                "Precision robotic metal fabrication",
                "Assembly with high-end production tools",
                "Wiring",
                "In-process quality inspection",
                "Final testing on Omicron and Phenix systems",
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
                Proudly engineered and manufactured in Canada. CANDRON's
                Toronto, Ontario facility serves utilities, contractors,
                industrial facilities, and infrastructure projects across North
                America.
              </p>
              <p className="body mt-4 text-gray">
                Our facility is equipped for 24/7 production when project
                schedules require it, supported by controlled manufacturing
                conditions, regularly audited machinery, and coordinated teams.
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
