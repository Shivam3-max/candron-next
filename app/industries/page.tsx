import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: 'Industries', description: 'Candron powers mining, oil & gas, data centers, healthcare, utilities, renewables, traction power, transit substations, EV charging infrastructure, port electrification, and more — delivering electrical equipment built for the most demanding environments in North America.' }

export default function IndustriesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg ind-hero-bg"></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Industries</span></div>
          <div className="label label-white">Markets We Serve</div>
          <h1>Industries<br/><em>We Power</em></h1>
          <p className="lead" style={{marginTop:'1rem'}}>From underground mines to hyperscale data centers — Candron delivers electrical infrastructure solutions across the most demanding environments in North America.</p>
        </div>
      </div>

      <div className="ind-section bg-white" id="mining">
        <div className="container">
          <div className="ind-detail rv">
            <div className="ind-img-wrap">
              <Image src="/images/mining.jpg" alt="Mining Operations" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw" priority/>
            </div>
            <div>
              <div className="label">Industry 01</div>
              <h2>Mining</h2>
              <p className="body" style={{marginTop:'.75rem'}}>Mining operations run 24/7 in the harshest conditions on earth — dusty, wet, vibrating, and often miles underground. Electrical failures don't just cost money; they cost lives. Candron engineers and supplies electrical infrastructure that's built for the mine, not the office.</p>
              <div className="ind-kpi-row">
                <div className="ind-kpi"><strong>138kV</strong><span>Max Substation Voltage</span></div>
                <div className="ind-kpi"><strong>ATEX</strong><span>Hazardous Area Rated</span></div>
                <div className="ind-kpi"><strong>IP65+</strong><span>Enclosure Protection</span></div>
              </div>
              <div className="equip-list">
                <span className="equip-tag">Mine Substations</span><span className="equip-tag">Hoist Transformers</span>
                <span className="equip-tag">MV Drive Transformers</span><span className="equip-tag">Trailing Cable Systems</span>
                <span className="equip-tag">Load Banks</span><span className="equip-tag">Motor Control Centers</span>
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
              <Image src="/images/oil-gas.jpg" alt="Oil and Gas Facility" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 02</div>
              <h2>Oil &amp; Gas</h2>
              <p className="body" style={{marginTop:'.75rem'}}>Upstream, midstream, or downstream — the oil and gas sector demands electrical equipment that performs flawlessly in classified hazardous locations. Candron supplies and services transformers, switchgear, and load banks rated for Class I, Division 1 and 2 environments.</p>
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
              <Image src="/images/renewable-energy.jpg" alt="Wind Farm Power Plant" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 03</div>
              <h2>Power &amp; Renewables</h2>
              <p className="body" style={{marginTop:'.75rem'}}>The energy transition is accelerating, and electrical infrastructure is the foundation. Candron designs, manufactures, and delivers grid-scale switchgear, control systems, and power distribution equipment for wind, solar, and battery storage projects — with expedited lead times built for construction schedules.</p>
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
              <Image src="/images/data-centers.jpg" alt="AI Data Center" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 04</div>
              <h2>AI Data Centers</h2>
              <p className="body" style={{marginTop:'.75rem'}}>The AI boom is driving unprecedented data center power demand. Hyperscalers and colocation operators need electrical infrastructure that can scale as fast as their compute capacity — and withstand zero-downtime requirements. Candron delivers.</p>
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
              <Image src="/images/healthcare.jpg" alt="Hospital Healthcare Facility" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 05</div>
              <h2>Healthcare</h2>
              <p className="body" style={{marginTop:'.75rem'}}>Hospitals and medical facilities operate in a life-safety environment where power interruption is simply not an option. Candron designs and supplies electrical infrastructure that meets NFPA 99 and CSA Z32 standards for essential electrical systems.</p>
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
              <Image src="/images/mining.jpg" alt="Transportation Infrastructure" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 06</div>
              <h2>Transportation</h2>
              <p className="body" style={{marginTop:'.75rem'}}>The electrification of transportation infrastructure — rail, transit, EV charging, ports — creates massive demand for custom electrical solutions. Candron supplies traction power transformers, rectifier transformers, and the supporting infrastructure to keep North America moving.</p>
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
            {/* TODO: replace with dedicated traction power image */}
            <div className="ind-img-wrap">
              <Image src="/images/utilities.jpg" alt="Traction Power Substation" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 07</div>
              <h2>Traction Power</h2>
              <p className="body" style={{marginTop:'.75rem'}}>Railway electrification operates at specialized voltages and frequencies — 25 Hz, 50 Hz, and 60 Hz AC traction systems — that demand purpose-engineered transformers and substations. Candron designs and manufactures traction power equipment built to IEEE, CSA, and railway authority standards for mainline and commuter rail applications.</p>
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
            {/* TODO: replace with dedicated transit image */}
            <div className="ind-img-wrap">
              <Image src="/images/renewable-energy.jpg" alt="Transit Substation" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 08</div>
              <h2>Transit Substations</h2>
              <p className="body" style={{marginTop:'.75rem'}}>Urban rail, LRT, and metro systems rely on a network of traction substations to convert and distribute power along the route. Candron builds compact, reliable traction substations for both new-build transit projects and substation upgrades — designed for ESA compliance and transit authority acceptance.</p>
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
            {/* TODO: replace with dedicated EV charging image */}
            <div className="ind-img-wrap">
              <Image src="/images/data-centers.jpg" alt="EV Charging Infrastructure" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 09</div>
              <h2>EV Charging Infrastructure</h2>
              <p className="body" style={{marginTop:'.75rem'}}>Fleet electrification and public EV charging depots require engineered electrical infrastructure — from medium voltage service entry through LV distribution switchboards and control systems. Candron supplies and integrates the full electrical backbone for EV charging hubs, transit depots, and fleet yards.</p>
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
            {/* TODO: replace with dedicated port image */}
            <div className="ind-img-wrap">
              <Image src="/images/oil-gas.jpg" alt="Port Electrification" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
            </div>
            <div>
              <div className="label">Industry 10</div>
              <h2>Port Electrification</h2>
              <p className="body" style={{marginTop:'.75rem'}}>Modern ports and marine terminals are transitioning from diesel to shore power — supplying vessels, cranes, and terminal equipment with reliable grid power. Candron engineers and supplies the switchgear, transformers, and control infrastructure for shore power systems, cold-ironing installations, and port crane electrification.</p>
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
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 3.5rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>More Industries</div>
            <h2>We Power More</h2>
          </div>
          <div className="ind-all-grid">
            <div className="ind-card rv">
              <Image src="/images/utilities.jpg" alt="Pulp and Paper Mill" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              <div className="ind-overlay"></div>
              <div className="ind-content"><div className="ind-name">Pulp &amp; Paper</div><div className="ind-desc">Continuous process power for mills — no downtime, ever</div></div>
            </div>
            <div className="ind-card rv d2">
              <Image src="/images/data-centers.jpg" alt="Entertainment and Studios" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              <div className="ind-overlay"></div>
              <div className="ind-content"><div className="ind-name">Entertainment</div><div className="ind-desc">Temporary and permanent power for studios and live events</div></div>
            </div>
            <div className="ind-card rv d3">
              <Image src="/images/switchgear.jpg" alt="Construction Projects" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              <div className="ind-overlay"></div>
              <div className="ind-content"><div className="ind-name">Construction</div><div className="ind-desc">Temporary power for large-scale commercial and industrial builds</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <div className="label label-white rv" style={{justifyContent:'center'}}>Your Industry</div>
          <h2 className="rv">Don't See Your Industry?</h2>
          <p className="lead rv" style={{color:'rgba(255,255,255,.6)',maxWidth:'520px'}}>If it runs on electricity, we can help. Our engineers have experience across virtually every industrial sector. Let's talk about your specific requirements.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}} className="rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Start a Conversation</Link>
            <a href="tel:+17059144444" className="btn btn-outline btn-lg mag">+1(705)914-4444</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
