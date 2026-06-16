import Link from 'next/link'

export const metadata = { title: 'Testing | Candron Energy Inc.' }

export default function TestingPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{background:"url('/images/Switchgear.jpg.jpeg') center/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Testing</span></div>
          <div className="label label-white">Quality Assurance</div>
          <h1>Comprehensive<br/>Factory Testing</h1>
          <p className="lead" style={{marginTop:'1rem'}}>Every system is tested before shipment to verify safety, reliability, and compliance. No equipment leaves our facility without passing a rigorous in-house factory acceptance test.</p>
        </div>
      </div>

      {/* INTRO */}
      <div className="section bg-white">
        <div className="container">
          <div className="intro-split rv">
            <div>
              <div className="label">Why Testing Matters</div>
              <h2>Tested Equipment.<br/>Trusted Performance.</h2>
            </div>
            <div>
              <p className="body" style={{marginBottom:'1.25rem'}}>Field failures cost more than just money — they cost downtime, project delays, safety incidents, and damaged relationships. Comprehensive factory testing is the only reliable way to verify that equipment will perform as designed once it reaches your site.</p>
              <p className="body" style={{marginBottom:'1.25rem'}}>At Candron Energy, every system undergoes structured factory testing before shipment. Our in-house testing capability means we control the process, maintain the documentation, and can accommodate witnessed FAT for your project team or third-party inspector — without scheduling delays from an external test facility.</p>
              <p className="body">Testing is not an add-on at Candron. It is a fundamental part of every project, performed to the same rigorous standards regardless of project size or scope.</p>
            </div>
          </div>
        </div>
      </div>

      {/* TESTING CAPABILITIES */}
      <div className="section bg-off">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 4rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>Testing Capabilities</div>
            <h2>What We Test</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5rem',alignItems:'start'}}>
            <div className="rv-l">
              <div className="process-v">
                {[
                  {n:'01',t:'Functional Testing',d:'Verification of all control circuits, protection functions, interlocks, and operational sequences against the approved design documentation.'},
                  {n:'02',t:'Protection Verification',d:'Testing of all protection relay functions, overcurrent settings, trip timing, and alarm functions to confirm correct operation.'},
                  {n:'03',t:'Control Logic Testing',d:'PLC program verification, HMI functionality testing, and sequence of operations validation against the approved control philosophy.'},
                  {n:'04',t:'Equipment Validation',d:'Physical inspection and verification of all components, ratings, labels, and documentation against project specifications and applicable standards.'},
                  {n:'05',t:'Factory Acceptance Testing',d:'Comprehensive witnessed or unwitnessed FAT performed to applicable ANSI, IEEE, NETA, CSA, and UL requirements with full test reports.'},
                  {n:'06',t:'Documentation Review',d:'Complete review of as-built drawings, test records, equipment data sheets, and O&M manuals against project requirements before shipment.'},
                ].map(s => (
                  <div key={s.n} className="process-v-item">
                    <div className="process-v-dot">{s.n}</div>
                    <div>
                      <div className="process-v-title">{s.t}</div>
                      <div className="process-v-text">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rv-r">
              <div className="sticky-cta">
                <h4>Request a Witnessed FAT</h4>
                <p>Candron accommodates witnessed factory acceptance tests for project owners, engineers of record, and third-party inspectors. Schedule your FAT visit during the project kickoff to ensure alignment with your project timeline.</p>
                <Link href="/contact" className="btn btn-primary mag" style={{width:'100%',justifyContent:'center'}}>Contact Our Team</Link>
              </div>
              <div style={{marginTop:'1.5rem',borderRadius:'14px',overflow:'hidden',height:'280px'}}>
                <img src="/images/Utilities.jpg.jpeg" alt="Factory Testing" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STANDARDS */}
      <div className="section bg-white">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 4rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>Standards &amp; Compliance</div>
            <h2>Built to the Highest Standards</h2>
            <p className="lead" style={{margin:'1rem auto 0'}}>Candron's testing programs are aligned with applicable national and international standards governing power distribution equipment.</p>
          </div>
          <div className="standard-grid">
            <div className="standard-card rv">
              <div className="standard-name">ANSI</div>
              <div className="standard-desc">American National Standards Institute requirements for electrical equipment</div>
            </div>
            <div className="standard-card rv d2">
              <div className="standard-name">IEEE</div>
              <div className="standard-desc">Institute of Electrical and Electronics Engineers testing standards</div>
            </div>
            <div className="standard-card rv d3">
              <div className="standard-name">NETA</div>
              <div className="standard-desc">InterNational Electrical Testing Association acceptance testing specifications</div>
            </div>
            <div className="standard-card rv d4">
              <div className="standard-name">CSA</div>
              <div className="standard-desc">Canadian Standards Association — full compliance for Canadian projects</div>
            </div>
            <div className="standard-card rv d5">
              <div className="standard-name">UL</div>
              <div className="standard-desc">Underwriters Laboratories listing and certification requirements</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY IN-HOUSE */}
      <div className="bg-navy-section">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'600px',margin:'0 auto 4rem'}} className="rv">
            <div className="label label-white" style={{justifyContent:'center'}}>The Advantage</div>
            <h2 style={{color:'var(--white)'}}>Why In-House Testing<br/>Makes a Difference</h2>
          </div>
          <div className="why-grid">
            <div className="why-card-v2 rv" style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)'}}>
              <div className="why-card-icon" style={{background:'rgba(0,71,255,.2)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="why-card-title" style={{color:'var(--white)'}}>No Scheduling Delays</div>
              <div className="why-card-text" style={{color:'rgba(255,255,255,.45)'}}>In-house testing means no waiting for an external test lab. Your FAT is scheduled to align with your project timeline — not an external facility's availability.</div>
            </div>
            <div className="why-card-v2 rv d2" style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)'}}>
              <div className="why-card-icon" style={{background:'rgba(0,71,255,.2)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div className="why-card-title" style={{color:'var(--white)'}}>Issues Resolved Immediately</div>
              <div className="why-card-text" style={{color:'rgba(255,255,255,.45)'}}>When testing identifies an issue, our engineering and assembly team is on-site to resolve it immediately. No shipping equipment back and forth between facilities.</div>
            </div>
            <div className="why-card-v2 rv d3" style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)'}}>
              <div className="why-card-icon" style={{background:'rgba(0,71,255,.2)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
              </div>
              <div className="why-card-title" style={{color:'var(--white)'}}>Complete Documentation</div>
              <div className="why-card-text" style={{color:'rgba(255,255,255,.45)'}}>Detailed test reports generated and reviewed internally before delivery. Full traceability from test results to as-built drawings and equipment data sheets.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Every Unit Tested Before It Ships</h2>
          <p className="lead rv" style={{color:'rgba(255,255,255,.6)',maxWidth:'500px'}}>Quality you can verify. Request a quote and ask about witnessed FAT availability for your project.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}} className="rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
            <Link href="/commissioning" className="btn btn-outline btn-lg mag">Commissioning Support →</Link>
          </div>
        </div></div>
      </div>
    </>
  )
}
