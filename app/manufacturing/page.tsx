import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: 'Manufacturing', description: 'Candron\'s Canadian manufacturing facility handles every stage in-house — electrical design, fabrication, assembly, wiring, and factory acceptance testing. No outsourcing, one point of accountability.' }

export default function ManufacturingPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{background:"url('/images/manufacturing.jpg') center/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Manufacturing</span></div>
          <div className="label label-white">Our Facility</div>
          <h1>Designed, Built &amp;<br/>Tested Under One Roof</h1>
          <p className="lead" style={{marginTop:'1rem'}}>Candron Energy provides complete in-house manufacturing capabilities that eliminate unnecessary delays and ensure total quality control — from first engineering drawing to final factory test.</p>
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
              <p className="body" style={{marginBottom:'1.25rem'}}>Most electrical equipment suppliers depend on a network of third-party fabricators, outsourced wiring shops, and external testing facilities. This introduces delays, communication gaps, and quality inconsistencies that inevitably impact your project timeline.</p>
              <p className="body" style={{marginBottom:'1.25rem'}}>Candron operates differently. Our Canadian manufacturing facility handles every stage of production under one roof — electrical design, mechanical design, fabrication, assembly, wiring, and quality assurance. When you work with Candron, you have a single point of accountability for the entire manufacturing process.</p>
              <p className="body">The result is faster project execution, greater reliability, and equipment built to perform in the most demanding environments — backed by rigorous in-house testing before it ever leaves our facility.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CAPABILITIES */}
      <div className="bg-navy-section">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 4rem'}} className="rv">
            <div className="label label-white" style={{justifyContent:'center'}}>Capabilities</div>
            <h2 style={{color:'var(--white)'}}>Everything In-House.<br/><span style={{color:'var(--blue-l)'}}>Nothing Outsourced.</span></h2>
          </div>
          <div className="capability-grid">
            <div className="capability-card rv">
              <div className="capability-num">01</div>
              <div className="capability-title">Electrical Design Engineering</div>
              <div className="capability-text">Complete electrical engineering from concept through detailed design drawings. Single-line diagrams, schematic development, and specification compliance review.</div>
            </div>
            <div className="capability-card rv d2">
              <div className="capability-num">02</div>
              <div className="capability-title">Mechanical Design</div>
              <div className="capability-text">Enclosure and structural design engineered for your application. Layout optimization, thermal management, and compliance with applicable standards.</div>
            </div>
            <div className="capability-card rv d3">
              <div className="capability-num">03</div>
              <div className="capability-title">Fabrication</div>
              <div className="capability-text">In-house metal fabrication of enclosures, bus structures, and mounting assemblies. Precision cuts and forming to exact engineering specifications.</div>
            </div>
            <div className="capability-card rv d4">
              <div className="capability-num">04</div>
              <div className="capability-title">Assembly</div>
              <div className="capability-text">Skilled technicians assemble every unit with precision and consistency. Component installation, bus assembly, and hardware mounting all performed in-house.</div>
            </div>
            <div className="capability-card rv d5">
              <div className="capability-num">05</div>
              <div className="capability-title">Wiring</div>
              <div className="capability-text">Complete wiring by experienced craftsmen following detailed IEC and NFPA wiring standards. Color coding, labeling, and documentation to project specifications.</div>
            </div>
            <div className="capability-card rv d6">
              <div className="capability-num">06</div>
              <div className="capability-title">Quality Assurance</div>
              <div className="capability-text">Structured quality checkpoints throughout production. ITP (Inspection and Test Plans) maintained for every project with full documentation traceability.</div>
            </div>
            <div className="capability-card rv">
              <div className="capability-num">07</div>
              <div className="capability-title">Functional Testing</div>
              <div className="capability-text">Control logic verification, protection scheme testing, and equipment functional validation performed in our dedicated testing area before shipment.</div>
            </div>
            <div className="capability-card rv d2">
              <div className="capability-num">08</div>
              <div className="capability-title">Documentation</div>
              <div className="capability-text">Comprehensive engineering documentation package delivered with every unit — as-built drawings, test reports, wiring schedules, and O&amp;M manuals.</div>
            </div>
            <div className="capability-card rv d3">
              <div className="capability-num">09</div>
              <div className="capability-title">Factory Acceptance Testing</div>
              <div className="capability-text">Full FAT performed to applicable ANSI, IEEE, NETA, CSA, and UL standards. Witnessed FAT available for your project team or third-party inspector.</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="section bg-off">
        <div className="container">
          <div className="mfg-process-grid">
            <div className="rv-l">
              <div className="label">Manufacturing Process</div>
              <h2 style={{marginBottom:'1.5rem'}}>A Structured Process That<br/>Eliminates Surprises</h2>
              <p className="body" style={{marginBottom:'2rem'}}>Every Candron project follows a documented manufacturing process with defined milestones and quality gates. This structured approach ensures nothing is missed, every standard is met, and your project stays on schedule.</p>
              <div style={{padding:'2rem',background:'var(--white)',borderRadius:'14px',border:'1px solid #E8ECF5'}}>
                <div style={{fontFamily:'var(--fm)',fontSize:'.6rem',color:'var(--blue)',letterSpacing:'.22em',textTransform:'uppercase',marginBottom:'1.25rem'}}>Project Flow</div>
                <ul className="check-list">
                  <li>Project kickoff and engineering review</li>
                  <li>Drawing approval and specification sign-off</li>
                  <li>Material procurement and incoming inspection</li>
                  <li>Fabrication and sub-assembly</li>
                  <li>Wiring and final assembly</li>
                  <li>In-process quality inspection</li>
                  <li>Factory acceptance testing (FAT)</li>
                  <li>Documentation compilation and delivery</li>
                  <li>Packing and shipping coordination</li>
                </ul>
              </div>
            </div>
            <div className="rv-r">
              <div style={{borderRadius:'14px',overflow:'hidden',height:'420px',marginBottom:'1.5rem',position:'relative'}}>
                <Image src="/images/switchgear-facility.jpg" alt="Manufacturing Facility" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
              </div>
              <div className="metric-showcase" style={{gridTemplateColumns:'1fr 1fr',marginTop:0}}>
                <div className="metric-card">
                  <div className="metric-val">100%</div>
                  <div className="metric-lbl">In-House Production</div>
                </div>
                <div className="metric-card">
                  <div className="metric-val">Single</div>
                  <div className="metric-lbl">Point of Accountability</div>
                </div>
                <div className="metric-card">
                  <div className="metric-val">Faster</div>
                  <div className="metric-lbl">Lead Times</div>
                </div>
                <div className="metric-card">
                  <div className="metric-val">Full FAT</div>
                  <div className="metric-lbl">Before Shipment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CANADIAN ADVANTAGE */}
      <div className="section bg-white">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 3.5rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>Canadian Manufacturing</div>
            <h2>Built in Canada.<br/>For Canadian Projects.</h2>
            <p className="lead" style={{margin:'1rem auto 0'}}>Proudly engineered and manufactured in Canada. Candron's North York, Ontario facility serves utilities, contractors, industrial facilities, and infrastructure projects across North America.</p>
          </div>
          <div className="facility-grid">
            <div className="facility-img rv"><Image src="/images/manufacturing.jpg" alt="Production Floor" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
            <div className="facility-img rv d2"><Image src="/images/switchgear-facility.jpg" alt="Assembly Area" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
            <div className="facility-img rv d3"><Image src="/images/control-panels.jpg" alt="Engineering Office" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">See What We Can Build For You</h2>
          <p className="lead rv" style={{color:'rgba(255,255,255,.6)',maxWidth:'500px'}}>Talk to our engineering team about your project requirements. Factory-direct pricing with complete in-house manufacturing control.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}} className="rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
            <Link href="/testing" className="btn btn-outline btn-lg mag">Our Testing Capabilities →</Link>
          </div>
        </div></div>
      </div>
    </>
  )
}
