import Link from 'next/link'

export const metadata = { title: 'Industries | Candron Energy Inc.' }

export default function IndustriesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg ind-hero-bg"></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Industries</span></div>
          <div className="label label-white">Markets We Serve</div>
          <h1>Industries<br/>We Power</h1>
          <p className="lead" style={{marginTop:'1rem'}}>From underground mines to hyperscale data centers — Candron delivers electrical infrastructure solutions across the most demanding environments in North America.</p>
        </div>
      </div>

      <div className="ind-section bg-white" id="mining">
        <div className="container">
          <div className="ind-detail rv">
            <div className="ind-img-wrap">
              <img src="/images/Mining.jpg.jpeg" alt="Mining Operations"/>
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
              <img src="/images/Oil%20%26%20Gas.jpg.jpeg" alt="Oil and Gas Facility"/>
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
              <img src="/images/Renewable%20Energy.jpg.jpeg" alt="Wind Farm Power Plant"/>
            </div>
            <div>
              <div className="label">Industry 03</div>
              <h2>Power &amp; Renewables</h2>
              <p className="body" style={{marginTop:'.75rem'}}>The energy transition is accelerating, and electrical infrastructure is the foundation. Candron supplies grid-scale transformers and switchgear for wind, solar, and battery storage projects — with the fast-turnaround inventory model that construction schedules demand.</p>
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
              <img src="/images/Data%20Centers.jpg.jpeg" alt="AI Data Center"/>
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
              <img src="/images/Healthcare.jpg.jpeg" alt="Hospital Healthcare Facility"/>
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
              <img src="https://images.unsplash.com/photo-1567789884554-0b844b597180?w=900&q=80" alt="Transportation Rail"/>
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

      <div className="section bg-off">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 3.5rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>More Industries</div>
            <h2>We Power More</h2>
          </div>
          <div className="ind-all-grid">
            <div className="ind-card rv">
              <img src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=700&q=80" alt="Pulp and Paper"/>
              <div className="ind-overlay"></div>
              <div className="ind-content"><div className="ind-name">Pulp &amp; Paper</div><div className="ind-desc">Continuous process power for mills — no downtime, ever</div></div>
            </div>
            <div className="ind-card rv d2">
              <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=700&q=80" alt="Entertainment"/>
              <div className="ind-overlay"></div>
              <div className="ind-content"><div className="ind-name">Entertainment</div><div className="ind-desc">Temporary and permanent power for studios and live events</div></div>
            </div>
            <div className="ind-card rv d3">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80" alt="Construction"/>
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
