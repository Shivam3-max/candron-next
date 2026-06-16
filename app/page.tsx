import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

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
                times and factory-direct pricing.
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
                <div className="trust-items">
                  <span className="trust-item">Utilities</span>
                  <span className="trust-item">Data Centers</span>
                  <span className="trust-item">Oil &amp; Gas</span>
                  <span className="trust-item">Manufacturing</span>
                  <span className="trust-item">Healthcare</span>
                </div>
              </div>
            </div>
            <div className="hero-visual rv-r">
              <div className="hero-stat-float top">
                <strong>100%</strong>
                <span>In-House Built</span>
              </div>
              <div className="hero-visual-img">
                <img
                  src="/images/hero.jpg.jpeg"
                  alt="Candron In-House Manufacturing"
                />
              </div>
              <div className="hero-stat-float bot">
                <strong>Factory Direct</strong>
                <span>No Middlemen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT BAR */}
      <div className="stat-bar">
        <div className="container">
          <div className="stat-grid">
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-lbl">In-House Engineering</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">Factory Direct</div>
              <div className="stat-lbl">Pricing — No Markup</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">Canadian</div>
              <div className="stat-lbl">Manufacturing</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">NETA &amp; ANSI</div>
              <div className="stat-lbl">Factory Testing</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CANDRON */}
      <div className="section bg-white">
        <div className="container">
          <div
            style={{
              textAlign: "center",
              maxWidth: "640px",
              margin: "0 auto 4rem",
            }}
            className="rv"
          >
            <div className="label" style={{ justifyContent: "center" }}>
              Why Candron
            </div>
            <h2>Power Distribution Without Compromise</h2>
            <p className="lead" style={{ margin: "1rem auto 0" }}>
              At Candron Energy, every product is engineered, manufactured,
              assembled, and tested under one roof. Unlike traditional suppliers
              that depend on multiple vendors, we maintain complete control —
              over quality, schedules, communication, and performance.
            </p>
          </div>
          <div className="why-grid">
            <div className="why-card-v2 rv">
              <div className="why-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="why-card-title">Complete In-House Control</div>
              <div className="why-card-text">
                Engineering, manufacturing, assembly, and testing performed
                under one roof. No outsourced production, no third-party delays,
                no accountability gaps.
              </div>
            </div>
            <div className="why-card-v2 rv d2">
              <div className="why-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="why-card-title">Rapid Lead Times</div>
              <div className="why-card-text">
                Direct project management and in-house manufacturing control
                means faster delivery. No waiting on third-party fabricators or
                offshore supply chains.
              </div>
            </div>
            <div className="why-card-v2 rv d3">
              <div className="why-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="why-card-title">Factory Direct Pricing</div>
              <div className="why-card-text">
                No distributors. No middlemen. No unnecessary markups. Work
                directly with the engineers and manufacturers building your
                equipment.
              </div>
            </div>
            <div className="why-card-v2 rv d4">
              <div className="why-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M8 21V10h8v11" />
                </svg>
              </div>
              <div className="why-card-title">Canadian Manufacturing</div>
              <div className="why-card-text">
                Proudly engineered and manufactured in Canada for Canadian
                utilities, contractors, industrial facilities, and
                infrastructure projects.
              </div>
            </div>
            <div className="why-card-v2 rv d5">
              <div className="why-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
              <div className="why-card-title">Proven Quality</div>
              <div className="why-card-text">
                Every system undergoes comprehensive factory acceptance testing
                against ANSI, IEEE, NETA, CSA, and UL requirements before
                shipment.
              </div>
            </div>
            <div className="why-card-v2 rv d6">
              <div className="why-card-icon">
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
              </div>
              <div className="why-card-title">Technical Expertise</div>
              <div className="why-card-text">
                Experienced engineering and commissioning support throughout
                your project lifecycle — from initial design through field
                startup.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-navy-section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6rem",
              alignItems: "start",
            }}
          >
            <div className="rv-l">
              <div className="label label-white">Our Process</div>
              <h2 style={{ color: "var(--white)", marginBottom: "1.5rem" }}>
                From Concept
                <br />
                to Commissioning
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.55)",
                  fontSize: ".95rem",
                  lineHeight: "1.85",
                  marginBottom: "2.5rem",
                }}
              >
                Every Candron project follows a structured five-stage process
                that eliminates surprises, maintains schedule, and delivers
                equipment that performs exactly as specified.
              </p>
              <Link href="/manufacturing" className="btn btn-outline mag">
                See Our Manufacturing →
              </Link>
            </div>
            <div className="rv-r">
              <div className="process-v">
                {[
                  {
                    n: "01",
                    t: "Design & Engineering",
                    d: "Our engineering team develops customized power distribution solutions tailored to project requirements, utility standards, and site conditions.",
                  },
                  {
                    n: "02",
                    t: "Manufacturing",
                    d: "All products are manufactured in our Canadian facility using proven processes and strict quality controls at every stage.",
                  },
                  {
                    n: "03",
                    t: "Assembly",
                    d: "Equipment is assembled by experienced technicians ensuring precision and consistency throughout production.",
                  },
                  {
                    n: "04",
                    t: "Testing",
                    d: "Every system undergoes comprehensive factory acceptance testing before shipment to verify safety, reliability, and compliance.",
                  },
                  {
                    n: "05",
                    t: "Commissioning Support",
                    d: "Our team supports installation, startup, and commissioning to ensure reliable operation from day one.",
                  },
                ].map((s) => (
                  <div key={s.n} className="process-v-item">
                    <div className="process-v-dot">{s.n}</div>
                    <div>
                      <div
                        className="process-v-title"
                        style={{ color: "var(--white)" }}
                      >
                        {s.t}
                      </div>
                      <div
                        className="process-v-text"
                        style={{ color: "rgba(255,255,255,.45)" }}
                      >
                        {s.d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <img
                  src="/images/Switchgear.jpg.jpeg"
                  alt="Electrical Switchgear"
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
                <Link href="/products#switchgear" className="card-link">
                  View Details →
                </Link>
              </div>
            </div>
            <div className="prod-card rv d2">
              <div className="prod-card-img">
                <img
                  src="/images/Switchboards%20%26%20Panelboards.jpg.jpeg"
                  alt="Switchboards and Panelboards"
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
                <Link href="/products#switchboards" className="card-link">
                  View Details →
                </Link>
              </div>
            </div>
            <div className="prod-card rv d3">
              <div className="prod-card-img">
                <img
                  src="/images/Control%20Panels.jpg.jpeg"
                  alt="Control Panels"
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
                <Link href="/products#controlpanels" className="card-link">
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INDUSTRIES */}
      <div className="section bg-white">
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
              <div className="label">Industries Served</div>
              <h2>
                Critical Infrastructure
                <br />
                Across North America
              </h2>
            </div>
            <Link href="/industries" className="btn btn-outline-blue rv">
              All Industries →
            </Link>
          </div>
          <div className="ind-grid-home">
            {[
              {
                img: "/images/Oil%20%26%20Gas.jpg.jpeg",
                name: "Oil & Gas",
                desc: "Hazardous location rated equipment for upstream & downstream",
                cls: "rv",
              },
              {
                img: "/images/Data%20Centers.jpg.jpeg",
                name: "Data Centers",
                desc: "High-density power distribution for hyperscale compute",
                cls: "rv d2",
              },
              {
                img: "/images/Utilities.jpg.jpeg",
                name: "Utilities",
                desc: "Grid-scale switchgear and distribution infrastructure",
                cls: "rv d3",
              },
              {
                img: "/images/Mining.jpg.jpeg",
                name: "Mining",
                desc: "Ruggedized equipment for demanding mine environments",
                cls: "rv d4",
              },
              {
                img: "/images/Healthcare.jpg.jpeg",
                name: "Healthcare",
                desc: "Life-safety critical power for hospitals and facilities",
                cls: "rv d5",
              },
              {
                img: "/images/Renewable%20Energy.jpg.jpeg",
                name: "Renewable Energy",
                desc: "Power conversion infrastructure for wind, solar & storage",
                cls: "rv d6",
              },
            ].map((ind) => (
              <div key={ind.name} className={`ind-card ${ind.cls}`}>
                <img src={ind.img} alt={ind.name} />
                <div className="ind-overlay"></div>
                <div className="ind-content">
                  <div className="ind-name">{ind.name}</div>
                  <div className="ind-desc">{ind.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <div
              className="label label-white rv"
              style={{ justifyContent: "center" }}
            >
              Factory Direct
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
              Work directly with the engineers and manufacturers building your
              equipment. Get factory-direct pricing, faster turnaround times,
              and tested solutions you can trust.
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
