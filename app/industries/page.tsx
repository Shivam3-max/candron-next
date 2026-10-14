import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: 'Sectors We Serve', description: 'CANDRON supports electrical contractors, engineering consultants, utilities, and project owners with power distribution equipment, engineering, testing, commissioning, and technical support.' }

const sectors = [
  {
    id: 'electrical-contractors',
    number: '01',
    title: 'Electrical Contractors',
    headline: 'The Equipment, Engineering, and Technical Support You Need to Deliver.',
    description: 'We help electrical contractors execute projects efficiently with reliable equipment, practical engineering support, and responsive technical service.',
    capabilities: [
      { title: 'Equipment Manufacturing & Supply', text: 'Low- and medium-voltage switchboards, switchgear, transformers, and other power distribution equipment.' },
      { title: 'Testing & Verification', text: 'Certified test reports, factory acceptance testing (FAT), site acceptance testing (SAT), and equipment testing support.' },
      { title: 'On-Site Commissioning', text: 'Field technical support for equipment installation, commissioning, troubleshooting, and verification.' },
      { title: 'Electrical Engineering Studies', text: 'Ground potential rise (GPR), arc flash, short-circuit, harmonic analysis, and other project-specific studies through Delta Wye Engineering.', href: 'https://deltawyeeng.com' },
      { title: 'Engineering Drawings & Submittals', text: 'Equipment drawings, technical documentation, and submittal packages to support utility reviews, ESA inspections, and applicable authority approvals.' },
    ],
    closing: 'Your project partner from procurement through commissioning.',
  },
  {
    id: 'engineering-consultants',
    number: '02',
    title: 'Engineering Consultants',
    headline: 'Practical Engineering. Realistic Specifications. Buildable Solutions.',
    description: 'We collaborate with consulting engineers to develop equipment specifications and designs that align with project requirements, applicable standards, manufacturing capabilities, and actual supply-chain conditions.',
    capabilities: [
      { title: 'Equipment Specification & Selection', text: 'Assistance with equipment ratings, configurations, technical requirements, and manufacturer-specific considerations.' },
      { title: 'Design Coordination', text: 'Practical input during design development to align electrical requirements with available equipment solutions.' },
      { title: 'Standards & Compliance Support', text: 'Familiarity with applicable IEEE, CSA, CEC, and NEC standards, along with ESA/AHJ requirements and utility-specific criteria.' },
      { title: 'Lead-Time & Procurement Planning', text: 'Recommendations that consider project schedules, manufacturing capacity, production loading, component availability, and supply-chain constraints.' },
      { title: 'Technical Submittal Review', text: 'Coordination of equipment drawings, technical data, deviations, and documentation to support consultant reviews and project approvals.' },
    ],
    detail: 'We bridge the gap between engineering intent and manufacturing reality — helping consultants specify equipment that is technically appropriate, commercially practical, and achievable within project timelines.',
    closing: 'Better specifications. Fewer surprises. More predictable project delivery.',
  },
]

export default function IndustriesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg ind-hero-bg"></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Sectors We Serve</span></div>
          <div className="label label-white">Sectors We Serve</div>
          <h1 className="!max-w-[1100px] !text-[clamp(2.7rem,6vw,6.4rem)]">Powering Projects.<br/><em>Supporting People.</em><br/>Delivering Solutions.</h1>
          <p className="lead mt-4 !max-w-[920px]">CANDRON works alongside electrical contractors, engineering consultants, utilities, and project owners to simplify power distribution projects — from equipment specification and procurement to testing, commissioning, and ongoing technical support.</p>
        </div>
      </div>

      <section className="bg-[#f3f5fa] py-16 sm:py-20 lg:py-28" id="sectors">
        <div className="container">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <div className="label">How We Support Your Team</div>
            <h2 className="mt-4">Built Around the People<br/><em>Delivering the Project.</em></h2>
          </div>

          <nav aria-label="Sector links" className="mb-8 flex flex-wrap gap-3">
            {sectors.map((sector) => (
              <a key={sector.id} href={`#${sector.id}`} className="rounded-full border border-[#cfd5e2] bg-white px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#050b2a] transition hover:border-[#0755ff] hover:text-[#0755ff]">
                {sector.title}
              </a>
            ))}
            <a href="#industry-markets" className="rounded-full border border-[#cfd5e2] bg-white px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#050b2a] transition hover:border-[#0755ff] hover:text-[#0755ff]">Industry Markets</a>
          </nav>

          <div className="space-y-8 lg:space-y-12">
            {sectors.map((sector, sectorIndex) => (
              <article key={sector.id} id={sector.id} className={`scroll-mt-28 overflow-hidden rounded-[24px] border ${sectorIndex === 0 ? 'border-[#16265c] bg-[#050b2a] text-white' : 'border-[#dce1eb] bg-white text-[#050b2a]'}`}>
                <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                  <div className={`p-7 sm:p-10 lg:p-14 ${sectorIndex === 0 ? 'border-white/10' : 'border-[#e3e7ef]'} border-b lg:border-b-0 lg:border-r`}>
                    <div className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${sectorIndex === 0 ? 'text-[#6591ff]' : 'text-[#0755ff]'}`}>Sector {sector.number}</div>
                    <h2 className="mt-5 !text-[clamp(2rem,4vw,4.3rem)]">{sector.title}</h2>
                    <h3 className={`mt-7 text-xl font-semibold leading-snug sm:text-2xl ${sectorIndex === 0 ? 'text-white' : 'text-[#050b2a]'}`}>{sector.headline}</h3>
                    <p className={`mt-5 text-base leading-8 sm:text-lg ${sectorIndex === 0 ? 'text-[#aeb8d0]' : 'text-[#5d6680]'}`}>{sector.description}</p>
                    <Link href={`/contact?sector=${encodeURIComponent(sector.title)}`} className="btn btn-primary mag mt-8">Discuss Your Project →</Link>
                  </div>

                  <div className="p-7 sm:p-10 lg:p-14">
                    <div className={`mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] ${sectorIndex === 0 ? 'text-[#8fa5d5]' : 'text-[#6c7590]'}`}>Our capabilities include</div>
                    <ul className="space-y-3">
                      {sector.capabilities.map((capability, capabilityIndex) => (
                        <li key={capability.title} className={`grid grid-cols-[34px_1fr] gap-3 rounded-xl border p-4 sm:grid-cols-[42px_1fr] sm:gap-4 sm:p-5 ${sectorIndex === 0 ? 'border-white/10 bg-white/[0.035]' : 'border-[#e4e8f0] bg-[#f8f9fc]'}`}>
                          <span className="font-mono text-xs font-bold text-[#0755ff]">{String(capabilityIndex + 1).padStart(2, '0')}</span>
                          <div>
                            <h4 className={`text-base font-bold leading-snug ${sectorIndex === 0 ? 'text-white' : 'text-[#050b2a]'}`}>
                              {'href' in capability && capability.href ? (
                                <a href={capability.href} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline transition-colors hover:text-[#6591ff]">
                                  {capability.title} ↗
                                </a>
                              ) : capability.title}
                            </h4>
                            <p className={`mt-2 text-sm leading-6 sm:text-base sm:leading-7 ${sectorIndex === 0 ? 'text-[#aeb8d0]' : 'text-[#69728b]'}`}>{capability.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {'detail' in sector && sector.detail && <p className={`mt-7 text-base leading-7 ${sectorIndex === 0 ? 'text-[#aeb8d0]' : 'text-[#59627a]'}`}>{sector.detail}</p>}
                    <p className={`mt-7 border-l-2 border-[#0755ff] pl-5 text-lg font-bold leading-7 sm:text-xl ${sectorIndex === 0 ? 'text-white' : 'text-[#050b2a]'}`}>{sector.closing}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-10 pt-16 sm:pt-20" id="industry-markets">
        <div className="container">
          <div className="max-w-3xl">
            <div className="label">Industry Markets</div>
            <h2 className="mt-4">Powering Critical Infrastructure<br/><em>Across North America.</em></h2>
            <p className="body mt-5">Our equipment, engineering, and field support serve demanding projects across the following industries.</p>
          </div>
        </div>
      </section>

      <div className="ind-section bg-white" id="mining">
        <div className="container">
          <div className="ind-detail rv">
            <div className="ind-img-wrap">
              <Image src="/images/field-services/mine-transformer-field-testing.jpg" alt="CANDRON technician conducting transformer field testing at a mine" fill className="object-cover object-center" sizes="(max-width:1024px) 100vw, 50vw" priority/>
            </div>
            <div>
              <div className="label">Industry 01</div>
              <h2>Mining</h2>
              <p className="body mt-3">Mining operations run 24/7 in demanding conditions where electrical reliability directly affects safety and production. CANDRON supplies power equipment and responsive field support—including a recent transformer-testing assignment where our crew mobilized within 24 hours of order confirmation.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>138kV</strong><span>Max Substation Voltage</span></div>
                <div className="ind-kpi"><strong>ATEX</strong><span>Hazardous Area Rated</span></div>
                <div className="ind-kpi"><strong>IP65+</strong><span>Enclosure Protection</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Mine Substations</span><span className="equip-tag">Hoist Transformers</span>
                <span className="equip-tag">MV Drive Transformers</span><span className="equip-tag">Trailing Cable Systems</span>
                <span className="equip-tag">Transformer Field Testing</span><span className="equip-tag">DGA &amp; SFRA</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to a Mining Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="ind-section" id="oilgas">
        <div className="container">
          <div className="ind-detail flip rv">
            <div className="ind-img-wrap">
              <Image src="/images/oil-gas.jpg" alt="Oil and Gas Facility" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 02</div>
              <h2>Oil &amp; Gas</h2>
              <p className="body mt-3">Upstream, midstream, or downstream — the oil and gas sector demands electrical equipment that performs flawlessly in classified hazardous locations. CANDRON supplies and services transformers, switchgear, and load banks rated for Class I, Division 1 and 2 environments.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>Class I</strong><span>Div 1 &amp; 2 Rated</span></div>
                <div className="ind-kpi"><strong>NEMA 7</strong><span>Explosion Proof</span></div>
                <div className="ind-kpi"><strong>CSA</strong><span>Canadian Certification</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">LACT Unit Transformers</span><span className="equip-tag">Wellpad Substations</span>
                <span className="equip-tag">ESP Transformers</span><span className="equip-tag">Pipeline Compressor Power</span>
                <span className="equip-tag">Refinery MV Switchgear</span><span className="equip-tag">Emergency Load Banks</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to an Oil &amp; Gas Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="ind-section bg-white" id="power">
        <div className="container">
          <div className="ind-detail rv">
            <div className="ind-img-wrap">
              <Image src="/images/renewable-energy.jpg" alt="Wind Farm Power Plant" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 03</div>
              <h2>Power &amp; Renewables</h2>
              <p className="body mt-3">The energy transition is accelerating, and electrical infrastructure is the foundation. CANDRON designs, manufactures, and delivers grid-scale switchgear, control systems, and power distribution equipment for wind, solar, and battery storage projects — with expedited lead times built for construction schedules.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>345kV</strong><span>Max Transmission Voltage</span></div>
                <div className="ind-kpi"><strong>300MVA</strong><span>Max Transformer Rating</span></div>
                <div className="ind-kpi"><strong>NERC</strong><span>CIP Compliant</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Wind Turbine Transformers</span><span className="equip-tag">Solar Inverter Pads</span>
                <span className="equip-tag">Battery Storage Substations</span><span className="equip-tag">Collector System MV</span>
                <span className="equip-tag">Interconnection Switchgear</span><span className="equip-tag">Gen-Tie Transformers</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to a Renewables Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="ind-section" id="datacenters">
        <div className="container">
          <div className="ind-detail flip rv">
            <div className="ind-img-wrap">
              <Image src="/images/data-centers.jpg" alt="AI Data Center" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 04</div>
              <h2>AI Data Centers</h2>
              <p className="body mt-3">The AI boom is driving unprecedented data center power demand. Hyperscalers and colocation operators need electrical infrastructure that can scale as fast as their compute capacity — and withstand zero-downtime requirements. CANDRON delivers.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>99.9999%</strong><span>Uptime Requirement</span></div>
                <div className="ind-kpi"><strong>N+1</strong><span>Redundancy Design</span></div>
                <div className="ind-kpi"><strong>Tier IV</strong><span>Facility Support</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Utility Service Transformers</span><span className="equip-tag">UPS Bypass Switchgear</span>
                <span className="equip-tag">PDUs</span><span className="equip-tag">Generator Load Banks</span>
                <span className="equip-tag">LV Distribution Boards</span><span className="equip-tag">MV Ring Main Units</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to a Data Center Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="ind-section bg-white" id="healthcare">
        <div className="container">
          <div className="ind-detail rv">
            <div className="ind-img-wrap">
              <Image src="/images/healthcare.jpg" alt="Hospital Healthcare Facility" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 05</div>
              <h2>Healthcare</h2>
              <p className="body mt-3">Hospitals and medical facilities operate in a life-safety environment where power interruption is simply not an option. CANDRON designs and supplies electrical infrastructure that meets NFPA 99 and CSA Z32 standards for essential electrical systems.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>NFPA 99</strong><span>Healthcare Standard</span></div>
                <div className="ind-kpi"><strong>CSA Z32</strong><span>Canadian Standard</span></div>
                <div className="ind-kpi"><strong>ATS</strong><span>Automatic Transfer</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Hospital Essential Systems</span><span className="equip-tag">Isolation Transformers</span>
                <span className="equip-tag">Medical Grade UPS</span><span className="equip-tag">Generator Testing Load Banks</span>
                <span className="equip-tag">ATS &amp; Transfer Switches</span><span className="equip-tag">Emergency Switchgear</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to a Healthcare Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="ind-section" id="transportation">
        <div className="container">
          <div className="ind-detail flip rv">
            <div className="ind-img-wrap">
              <Image src="/images/mining.jpg" alt="Transportation Infrastructure" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 06</div>
              <h2>Transportation</h2>
              <p className="body mt-3">The electrification of transportation infrastructure — rail, transit, EV charging, ports — creates massive demand for custom electrical solutions. CANDRON supplies traction power transformers, rectifier transformers, and the supporting infrastructure to keep North America moving.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>25kV AC</strong><span>Rail Traction</span></div>
                <div className="ind-kpi"><strong>1500V DC</strong><span>Transit Systems</span></div>
                <div className="ind-kpi"><strong>MW-Scale</strong><span>EV Charging Hubs</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Traction Power Transformers</span><span className="equip-tag">Rectifier Transformers</span>
                <span className="equip-tag">Transit Substations</span><span className="equip-tag">EV Charging Infrastructure</span>
                <span className="equip-tag">Port Electrification</span><span className="equip-tag">Airport Ground Power</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to a Transportation Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* TRACTION POWER */}
      <div className="ind-section bg-white" id="traction-power">
        <div className="container">
          <div className="ind-detail rv">
            <div className="ind-img-wrap">
              <Image src="/images/industries/traction-power.jpg" alt="Traction Power Substation" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 07</div>
              <h2>Traction Power</h2>
              <p className="body mt-3">Railway electrification operates at specialized voltages and frequencies — 25 Hz, 50 Hz, and 60 Hz AC traction systems — that demand purpose-engineered transformers and substations. CANDRON designs and manufactures traction power equipment built to IEEE, CSA, and railway authority standards for mainline and commuter rail applications.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>25 Hz / 50 Hz</strong><span>AC Traction Frequency</span></div>
                <div className="ind-kpi"><strong>25 kV AC</strong><span>Rail Traction Voltage</span></div>
                <div className="ind-kpi"><strong>IEEE / CSA</strong><span>Railway Standards</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Traction Power Transformers</span><span className="equip-tag">Autotransformers</span>
                <span className="equip-tag">Scott-T Configurations</span><span className="equip-tag">Traction Substations</span>
                <span className="equip-tag">Switchgear for Railway</span><span className="equip-tag">Neutral Section Equipment</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to a Traction Power Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSIT SUBSTATIONS */}
      <div className="ind-section" id="transit-substations">
        <div className="container">
          <div className="ind-detail flip rv">
            <div className="ind-img-wrap">
              <Image src="/images/industries/transit-substations.jpg" alt="Transit Substation" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 08</div>
              <h2>Transit Substations</h2>
              <p className="body mt-3">Urban rail, LRT, and metro systems rely on a network of traction substations to convert and distribute power along the route. CANDRON builds compact, reliable traction substations for both new-build transit projects and substation upgrades — designed for ESA compliance and transit authority acceptance.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>1500V DC</strong><span>Metro Traction</span></div>
                <div className="ind-kpi"><strong>750V DC</strong><span>LRT Systems</span></div>
                <div className="ind-kpi"><strong>ESA</strong><span>Ontario Compliance</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Rectifier Transformers</span><span className="equip-tag">Traction Rectifiers</span>
                <span className="equip-tag">DC Switchgear</span><span className="equip-tag">Transit Control Panels</span>
                <span className="equip-tag">LRT Substations</span><span className="equip-tag">Metro Substations</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to a Transit Power Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* EV CHARGING INFRASTRUCTURE */}
      <div className="ind-section bg-white" id="ev-charging">
        <div className="container">
          <div className="ind-detail rv">
            <div className="ind-img-wrap">
              <Image src="/images/industries/ev-charging.jpg" alt="EV Charging Infrastructure" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 09</div>
              <h2>EV Charging Infrastructure</h2>
              <p className="body mt-3">Fleet electrification and public EV charging depots require engineered electrical infrastructure — from medium voltage service entry through LV distribution switchboards and control systems. CANDRON supplies and integrates the full electrical backbone for EV charging hubs, transit depots, and fleet yards.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>MW-Scale</strong><span>Charging Hub Capacity</span></div>
                <div className="ind-kpi"><strong>MV / LV</strong><span>Distribution Systems</span></div>
                <div className="ind-kpi"><strong>Grid Integration</strong><span>Demand Management</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">MV Service Entry Switchgear</span><span className="equip-tag">LV Distribution Switchboards</span>
                <span className="equip-tag">EV Fleet Control Panels</span><span className="equip-tag">Metering &amp; Monitoring</span>
                <span className="equip-tag">Grid Demand Management</span><span className="equip-tag">Transit Depot Electrification</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to an EV Infrastructure Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* PORT ELECTRIFICATION */}
      <div className="ind-section" id="port-electrification">
        <div className="container">
          <div className="ind-detail flip rv">
            <div className="ind-img-wrap">
              <Image src="/images/industries/port-electrification.jpg" alt="Port Electrification" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 10</div>
              <h2>Port Electrification</h2>
              <p className="body mt-3">Modern ports and marine terminals are transitioning from diesel to shore power — supplying vessels, cranes, and terminal equipment with reliable grid power. CANDRON engineers and supplies the switchgear, transformers, and control infrastructure for shore power systems, cold-ironing installations, and port crane electrification.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>6.6 / 11 kV</strong><span>Shore Power Voltage</span></div>
                <div className="ind-kpi"><strong>IEC 80005</strong><span>Shore Connection Standard</span></div>
                <div className="ind-kpi"><strong>NEMA 4X</strong><span>Marine Enclosures</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Shore Power Systems</span><span className="equip-tag">Frequency Converters</span>
                <span className="equip-tag">Port Crane Switchgear</span><span className="equip-tag">Marine Switchboards</span>
                <span className="equip-tag">Cold-Ironing Infrastructure</span><span className="equip-tag">Terminal Control Panels</span>
              </div>
              <Link href="/contact" className="btn btn-primary mag">Talk to a Port Electrification Specialist →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg-off">
        <div className="container">
          <div className="text-center max-w-[560px] mx-auto mb-14 rv">
            <div className="label justify-center">More Industries</div>
            <h2>We Power More</h2>
          </div>
          <div className="ind-all-grid">
            <div className="ind-card rv">
              <Image src="/images/utilities.jpg" alt="Pulp and Paper Mill" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              <div className="ind-overlay"></div>
              <div className="ind-content"><div className="ind-name">Pulp &amp; Paper</div><div className="ind-desc">Continuous process power for mills — no downtime, ever</div></div>
            </div>
            <div className="ind-card rv d2">
              <Image src="/images/data-centers.jpg" alt="Entertainment and Studios" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              <div className="ind-overlay"></div>
              <div className="ind-content"><div className="ind-name">Entertainment</div><div className="ind-desc">Temporary and permanent power for studios and live events</div></div>
            </div>
            <div className="ind-card rv d3">
              <Image src="/images/switchgear.jpg" alt="Construction Projects" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              <div className="ind-overlay"></div>
              <div className="ind-content"><div className="ind-name">Construction</div><div className="ind-desc">Temporary power for large-scale commercial and industrial builds</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <div className="label label-white justify-center rv">Your Industry</div>
          <h2 className="rv">Don't See Your Industry?</h2>
          <p className="lead rv !text-white/[.6] !max-w-[520px]">If it runs on electricity, we can help. Our engineers have experience across virtually every industrial sector. Let's talk about your specific requirements.</p>
          <div className="flex gap-4 justify-center flex-wrap rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Start a Conversation</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
