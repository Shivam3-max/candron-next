import Link from 'next/link'

export const metadata = { title: 'Services | Candron Energy Inc.' }

export default function ServicesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg svc-hero-bg"></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Services</span></div>
          <div className="label label-white">What We Do</div>
          <h1>Full-Spectrum<br/>Electrical Services</h1>
          <p className="lead" style={{marginTop:'1rem'}}>From first-principles design through ongoing maintenance — Candron's licensed engineers support every phase of your electrical infrastructure lifecycle.</p>
        </div>
      </div>

      <div className="bg-blue" style={{padding:'1.5rem 0'}}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <div style={{width:'10px',height:'10px',background:'#fff',borderRadius:'50%',animation:'pulse-dot 2s infinite',flexShrink:0}}></div>
            <span style={{fontFamily:'var(--ft)',fontSize:'.88rem',fontWeight:700,color:'#fff',letterSpacing:'.04em'}}>24/7 Emergency Response — Sub-30-Minute Dispatch Guaranteed</span>
          </div>
          <a href="tel:+17059144444" style={{fontFamily:'var(--fd)',fontSize:'.88rem',fontWeight:700,color:'#fff',textDecoration:'none',letterSpacing:'.06em'}}>+1(705)914-4444 →</a>
        </div>
      </div>

      <div className="section bg-white">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'640px',margin:'0 auto 5rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>Our Services</div>
            <h2>Engineering Expertise.<br/>On-Site Execution.</h2>
            <p className="lead" style={{margin:'1rem auto 0'}}>Six core service areas, all delivered by Candron's own licensed engineers — no subcontractors, no delays.</p>
          </div>

          <div className="svc-big-card rv">
            <div className="svc-big-img">
              <img src="/images/Control%20Panels.jpg.jpeg" alt="Engineering Design"/>
            </div>
            <div className="svc-big-body">
              <div className="svc-num">01</div>
              <div className="svc-big-title">Design &amp; Engineering Studies</div>
              <div className="svc-big-text">Our engineering team brings decades of power systems experience to every project — from greenfield facility design to brownfield expansion. We model your system, find the risks, and design solutions that last.</div>
              <ul className="svc-points">
                <li>Load flow analysis and short-circuit studies</li>
                <li>Protection coordination and relay settings</li>
                <li>Arc-flash hazard analysis (IEEE 1584)</li>
                <li>Power quality assessments and harmonic studies</li>
                <li>Grounding and shielding design</li>
                <li>Single-line diagrams and detailed engineering packages</li>
              </ul>
              <Link href="/contact" className="btn btn-primary btn-sm mag" style={{alignSelf:'flex-start'}}>Request a Study →</Link>
            </div>
          </div>

          <div className="svc-big-card flip rv">
            <div className="svc-big-img">
              <img src="/images/Switchgear.jpg.jpeg" alt="SCADA Controls"/>
            </div>
            <div className="svc-big-body dark">
              <div className="svc-num">02</div>
              <div className="svc-big-title">SCADA &amp; Controls Systems</div>
              <div className="svc-big-text">Modern industrial facilities demand real-time visibility and automated control. Candron designs, supplies, and integrates SCADA and control systems that give operators full situational awareness and remote operability.</div>
              <ul className="svc-points">
                <li>PLC and DCS programming and integration</li>
                <li>HMI design for intuitive operator interfaces</li>
                <li>Remote monitoring and alarm management systems</li>
                <li>Communications: DNP3, Modbus, IEC 61850, PROFINET</li>
                <li>Cybersecurity hardening for industrial control systems</li>
                <li>Legacy system upgrades and migration</li>
              </ul>
              <Link href="/contact" className="btn btn-outline btn-sm mag" style={{alignSelf:'flex-start'}}>Discuss Your Controls →</Link>
            </div>
          </div>

          <div className="svc-big-card rv">
            <div className="svc-big-img">
              <img src="/images/Utilities.jpg.jpeg" alt="Electrical Testing"/>
            </div>
            <div className="svc-big-body">
              <div className="svc-num">03</div>
              <div className="svc-big-title">Testing &amp; Troubleshooting</div>
              <div className="svc-big-text">Whether you need commissioning of new equipment, diagnostic testing of aging assets, or root-cause investigation of a failure — our NETA-certified technicians deploy with a full suite of diagnostic equipment.</div>
              <ul className="svc-points">
                <li>Factory acceptance testing (FAT) and site acceptance testing (SAT)</li>
                <li>Transformer tests: turns ratio, insulation resistance, dissolved gas analysis</li>
                <li>Circuit breaker timing and contact resistance tests</li>
                <li>High-potential and hipot testing up to 200kV</li>
                <li>Power factor and insulation dielectric loss tests</li>
                <li>Relay functional testing and calibration</li>
              </ul>
              <Link href="/contact" className="btn btn-primary btn-sm mag" style={{alignSelf:'flex-start'}}>Book a Test →</Link>
            </div>
          </div>

          <div className="svc-big-card flip rv">
            <div className="svc-big-img">
              <img src="/images/Oil%20%26%20Gas.jpg.jpeg" alt="High Voltage Installation"/>
            </div>
            <div className="svc-big-body dark">
              <div className="svc-num">04</div>
              <div className="svc-big-title">High Voltage Installation</div>
              <div className="svc-big-text">Installation of high-voltage equipment demands certified expertise and zero margin for error. Candron's licensed HV technicians handle the full installation lifecycle — from rigging and placement to energization.</div>
              <ul className="svc-points">
                <li>Transformer removal, transport, and installation</li>
                <li>Cable termination and splicing up to 138kV</li>
                <li>Bus duct and GIB installation</li>
                <li>Ground switch and disconnect installation</li>
                <li>Energization and commissioning oversight</li>
                <li>Post-installation testing and documentation</li>
              </ul>
              <Link href="/contact" className="btn btn-outline btn-sm mag" style={{alignSelf:'flex-start'}}>Plan Your Installation →</Link>
            </div>
          </div>

          <div className="svc-big-card rv">
            <div className="svc-big-img">
              <img src="/images/Switchboards%20%26%20Panelboards.jpg.jpeg" alt="Equipment Rental"/>
            </div>
            <div className="svc-big-body">
              <div className="svc-num">05</div>
              <div className="svc-big-title">Equipment Rentals</div>
              <div className="svc-big-text">When you need equipment now — for commissioning, maintenance bypass, or emergency replacement — Candron's rental fleet deploys fast. All rental units are fully tested and come with on-site support.</div>
              <ul className="svc-points">
                <li>Transformer rentals: distribution and power class, any voltage</li>
                <li>Load bank rentals: resistive and reactive, 1kW to 30MW</li>
                <li>Switchgear rental for maintenance bypass and emergency replacement</li>
                <li>Flexible terms: day, week, month, or project-based contracts</li>
                <li>Delivery, commissioning, and de-commissioning included</li>
                <li>24/7 on-call technical support throughout rental period</li>
              </ul>
              <Link href="/contact" className="btn btn-primary btn-sm mag" style={{alignSelf:'flex-start'}}>Rental Inquiry →</Link>
            </div>
          </div>

          <div className="svc-big-card flip rv">
            <div className="svc-big-img">
              <img src="/images/Control%20Panels.jpg.jpeg" alt="Repair and Maintenance"/>
            </div>
            <div className="svc-big-body dark">
              <div className="svc-num">06</div>
              <div className="svc-big-title">Repair &amp; Maintenance</div>
              <div className="svc-big-text">Extending equipment life is almost always more cost-effective than replacement. Candron's repair facility and field crews handle everything from routine preventive maintenance to emergency rewind and rebuild.</div>
              <ul className="svc-points">
                <li>In-shop transformer repair: rewind, oil processing, bushing replacement</li>
                <li>Field repair and emergency response for failed equipment</li>
                <li>Switchgear refurbishment: breaker, bus, and control upgrades</li>
                <li>Preventive maintenance programs with documented inspection reports</li>
                <li>Oil sampling and dissolved gas analysis (DGA) monitoring</li>
                <li>Thermal imaging surveys and predictive maintenance programs</li>
              </ul>
              <Link href="/contact" className="btn btn-outline btn-sm mag" style={{alignSelf:'flex-start'}}>Request Repair →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg-off">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'600px',margin:'0 auto 4rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>How We Work</div>
            <h2>Our Process</h2>
            <p className="lead" style={{margin:'1rem auto 0'}}>Every engagement follows a structured process that eliminates surprises and keeps your project on schedule.</p>
          </div>
          <div className="process-steps">
            <div className="process-step rv"><div className="ps-dot">01</div><div className="ps-title">Assess</div><div className="ps-desc">Site walk and requirements definition with your operations team</div></div>
            <div className="process-step rv d2"><div className="ps-dot">02</div><div className="ps-title">Design</div><div className="ps-desc">Engineering study and solution design by licensed engineers</div></div>
            <div className="process-step rv d3"><div className="ps-dot">03</div><div className="ps-title">Supply</div><div className="ps-desc">Equipment sourced from our in-stock inventory or custom-built to spec</div></div>
            <div className="process-step rv d4"><div className="ps-dot">04</div><div className="ps-title">Install</div><div className="ps-desc">On-site installation by our certified HV crew</div></div>
            <div className="process-step rv d5"><div className="ps-dot">05</div><div className="ps-title">Commission</div><div className="ps-desc">Full testing and commissioning with documented test reports</div></div>
          </div>
        </div>
      </div>

      <div className="section bg-white">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 3.5rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>Standards &amp; Certifications</div>
            <h2>Built to the Highest Standards</h2>
          </div>
          <div className="cert-grid">
            <div className="cert-item rv"><div className="cert-name">IEEE C57</div><div className="cert-desc">Transformer testing and performance standards</div></div>
            <div className="cert-item rv d2"><div className="cert-name">NETA</div><div className="cert-desc">Acceptance Testing Specifications for electrical installations</div></div>
            <div className="cert-item rv d3"><div className="cert-name">IEEE 1584</div><div className="cert-desc">Arc-flash hazard analysis and PPE calculations</div></div>
            <div className="cert-item rv d4"><div className="cert-name">ANSI / UL</div><div className="cert-desc">American National and Underwriters Laboratories standards</div></div>
            <div className="cert-item rv"><div className="cert-name">IEC 61850</div><div className="cert-desc">Communication standard for electrical substations</div></div>
            <div className="cert-item rv d2"><div className="cert-name">IEEE 519</div><div className="cert-desc">Harmonic control in electric power systems</div></div>
            <div className="cert-item rv d3"><div className="cert-name">CSA C22</div><div className="cert-desc">Canadian Electrical Code — full compliance</div></div>
            <div className="cert-item rv d4"><div className="cert-name">NERC CIP</div><div className="cert-desc">Critical infrastructure protection for utility clients</div></div>
          </div>
        </div>
      </div>

      <div className="section bg-navy">
        <div className="container">
          <div className="emergency-bar rv">
            <div>
              <h3>&lt; 30 Minute Emergency Response</h3>
              <p>Licensed engineers dispatched immediately — anywhere in North America. Call our 24/7 emergency line now.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'.75rem',flexShrink:0}}>
              <a href="tel:+17059144444" className="btn btn-primary btn-lg mag">+1(705)914-4444</a>
              <a href="mailto:sales@candron.com" className="btn btn-outline mag">sales@candron.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
