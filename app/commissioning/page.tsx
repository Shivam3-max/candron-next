import Link from 'next/link'
import Image from 'next/image'
import ProcessStepsAnimate from '@/components/ProcessStepsAnimate'

export const metadata = { title: 'Commissioning', description: 'Candron provides on-site commissioning support — startup assistance, site testing, equipment verification, and performance validation — by the same engineers who designed and built your equipment.' }

export default function CommissioningPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{background:"url('/images/oil-gas.jpg') center/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Commissioning</span></div>
          <div className="label label-white">Field Support</div>
          <h1>Support Beyond<br/>Manufacturing</h1>
          <p className="lead" style={{marginTop:'1rem'}}>Candron provides commissioning support to ensure systems perform as designed once installed. Our engagement with your project doesn't end at the shipping dock.</p>
        </div>
      </div>

      {/* INTRO */}
      <div className="section bg-white">
        <div className="container">
          <div className="intro-split rv">
            <div>
              <div className="label">Commissioning Support</div>
              <h2>From the Factory<br/>to the Field</h2>
            </div>
            <div>
              <p className="body" style={{marginBottom:'1.25rem'}}>The transition from factory-tested equipment to an operational installation introduces variables that can only be resolved in the field — site conditions, installation practices, integration with existing systems, and startup sequencing all require engineering knowledge and hands-on experience.</p>
              <p className="body" style={{marginBottom:'1.25rem'}}>Candron's commissioning support extends our project engagement beyond manufacturing. Our engineering team provides startup assistance, site testing, and performance validation to ensure your equipment operates reliably from day one.</p>
              <p className="body">Because we designed and built your equipment, no one is better positioned to support its commissioning. Our engineers understand every circuit, every protection setting, and every aspect of the system we delivered — and we bring that knowledge directly to your site.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="section bg-off">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 4rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>What We Provide</div>
            <h2>Commissioning Services</h2>
          </div>
          <div className="commission-grid">
            <div className="commission-card rv">
              <div className="commission-title">Startup Assistance</div>
              <div className="commission-text">On-site engineering support during initial equipment energization and system startup. Candron engineers guide the commissioning sequence and verify correct operation of all systems and functions.</div>
            </div>
            <div className="commission-card rv d2">
              <div className="commission-title">Site Testing</div>
              <div className="commission-text">Field verification testing of installed equipment to confirm correct installation, proper connections, and alignment with factory test results. Identifies any site-specific issues before operational handover.</div>
            </div>
            <div className="commission-card rv d3">
              <div className="commission-title">Equipment Verification</div>
              <div className="commission-text">Physical verification of installed equipment condition, settings, and configuration against as-built documentation. Confirms that equipment was installed correctly and is ready for service.</div>
            </div>
            <div className="commission-card rv d4">
              <div className="commission-title">Documentation Review</div>
              <div className="commission-text">Review of all as-built drawings, test reports, and O&amp;M documentation with your operations team to ensure they have everything needed for long-term system operation and maintenance.</div>
            </div>
            <div className="commission-card rv d5">
              <div className="commission-title">Troubleshooting Support</div>
              <div className="commission-text">Rapid response troubleshooting support during commissioning. Because Candron designed and built your equipment, we can diagnose and resolve field issues faster than any third-party technician.</div>
            </div>
            <div className="commission-card rv d6">
              <div className="commission-title">Performance Validation</div>
              <div className="commission-text">Validation of system performance against specified design parameters. Confirms that the installed system delivers the reliability and performance your project requires under actual operating conditions.</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY */}
      <div className="section bg-white">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5rem',alignItems:'center'}}>
            <div className="rv-l">
              <div style={{borderRadius:'14px',overflow:'hidden',height:'480px',position:'relative'}}>
                <Image src="/images/utilities.jpg" alt="Commissioning Support" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 50vw"/>
              </div>
            </div>
            <div className="rv-r">
              <div className="label">The Candron Advantage</div>
              <h2 style={{marginBottom:'1.5rem'}}>We Know Your Equipment<br/>Better Than Anyone</h2>
              <p className="body" style={{marginBottom:'1.5rem'}}>When a third-party commissioning firm arrives on site, they're reading the same documentation you are. When Candron engineers arrive, they designed the system, built the equipment, and tested it in our facility.</p>
              <p className="body" style={{marginBottom:'2rem'}}>That difference matters when an issue arises during startup. Our engineers can trace every circuit, understand every protection setting, and resolve issues with authority — not guesswork.</p>
              <ul className="check-list">
                <li>Engineers who designed and built your equipment</li>
                <li>Direct access to as-built documentation and test records</li>
                <li>Faster issue resolution — no learning curve</li>
                <li>Single point of accountability through project close-out</li>
                <li>Coordination with your site team and electrical contractor</li>
              </ul>
              <Link href="/contact" className="btn btn-primary mag" style={{marginTop:'2rem',display:'inline-flex'}}>Request Commissioning Support</Link>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-navy-section">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 4rem'}} className="rv">
            <div className="label label-white" style={{justifyContent:'center'}}>How It Works</div>
            <h2 style={{color:'var(--white)'}}>Commissioning Engagement</h2>
          </div>
          <ProcessStepsAnimate variant="dark" steps={[
            { n: '01', title: 'Pre-Commissioning Plan', desc: 'Candron develops a site-specific commissioning plan aligned with your project schedule and energization sequence' },
            { n: '02', title: 'Site Mobilization', desc: 'Our engineers arrive on site with complete project documentation and test equipment for field verification' },
            { n: '03', title: 'Pre-Energization Checks', desc: 'Physical verification of installation, connections, settings, and configuration prior to initial energization' },
            { n: '04', title: 'Startup & Verification', desc: 'Supervised energization and functional verification of all systems, protection, and control sequences' },
            { n: '05', title: 'Handover & Documentation', desc: 'Commissioning report issued and documentation package transferred to your operations team' },
          ]} />
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Reliable Operation From Day One</h2>
          <p className="lead rv" style={{color:'rgba(255,255,255,.6)',maxWidth:'500px'}}>Add commissioning support to your Candron project and ensure your equipment performs as designed from the first day of operation.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}} className="rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
