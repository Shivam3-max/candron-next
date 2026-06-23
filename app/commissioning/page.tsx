import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProcessScroll from '@/components/ProcessScroll'

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
          <p className="lead mt-4">Candron provides commissioning support to ensure systems perform as designed once installed. Our engagement with your project doesn't end at the shipping dock.</p>
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
              <p className="body mb-5">The transition from factory-tested equipment to an operational installation introduces variables that can only be resolved in the field — site conditions, installation practices, integration with existing systems, and startup sequencing all require engineering knowledge and hands-on experience.</p>
              <p className="body mb-5">Candron's commissioning support extends our project engagement beyond manufacturing. Our engineering team provides startup assistance, site testing, and performance validation to ensure your equipment operates reliably from day one.</p>
              <p className="body">Because we designed and built your equipment, no one is better positioned to support its commissioning. Our engineers understand every circuit, every protection setting, and every aspect of the system we delivered — and we bring that knowledge directly to your site.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="wt-section">
        <div className="container">

          {/* Header */}
          <div className="wt-header rv">
            <div>
              <div className="label label-white">What We Provide</div>
              <h2 className="wt-h2">Commissioning <em>Services</em></h2>
            </div>
            <div className="wt-header-right">
              <p className="wt-intro max-w-[460px] text-left">End-to-end commissioning support to ensure your systems are installed correctly, tested thoroughly, and ready to perform.</p>
              <Link href="/contact" className="btn btn-primary mag shrink-0">Request Commissioning Support →</Link>
            </div>
          </div>

          {/* Service cards */}
          <div className="wt-grid">
            {([
              {
                n: '01',
                title: 'Startup Assistance',
                desc: 'On-site engineering support during initial equipment energization and system startup. Candron engineers guide the commissioning sequence and verify correct operation of all systems and functions.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              },
              {
                n: '02',
                title: 'Site Testing',
                desc: 'Field verification testing of installed equipment to confirm correct installation, proper connections, and alignment with factory test results. Identifies site-specific issues before operational handover.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
              },
              {
                n: '03',
                title: 'Equipment Verification',
                desc: 'Physical verification of installed equipment condition, settings, and configuration against as-built documentation. Confirms that equipment was installed correctly and is ready for service.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
              },
              {
                n: '04',
                title: 'Documentation Review',
                desc: 'Review of all as-built drawings, test reports, and O&M documentation with your operations team to ensure they have everything needed for long-term system operation and maintenance.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
              },
              {
                n: '05',
                title: 'Troubleshooting Support',
                desc: 'Rapid response troubleshooting during commissioning. Because Candron designed and built your equipment, we can diagnose and resolve field issues faster than any third-party technician.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
              },
              {
                n: '06',
                title: 'Performance Validation',
                desc: 'Validation of system performance against specified design parameters. Confirms that the installed system delivers the reliability and performance your project requires under actual operating conditions.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
              },
            ] as { n: string; title: string; desc: string; icon: React.ReactNode }[]).map((item) => (
              <div className="wt-card rv" key={item.n}>
                <div className="wt-card-top">
                  <div className="wt-num">{item.n}</div>
                  <div className="wt-icon">{item.icon}</div>
                </div>
                <div className="wt-title">{item.title}</div>
                <p className="wt-desc">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* WHY */}
      <div className="section bg-white">
        <div className="container">
          <div className="split">
            <div className="rv-l max-md:hidden">
              <div className="rounded-[14px] overflow-hidden h-[480px] relative">
                <Image src="/images/utilities.jpg" alt="Commissioning Support" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw"/>
              </div>
            </div>
            <div className="rv-r">
              <div className="label">The Candron Advantage</div>
              <h2 className="mb-6">We Know Your Equipment<br/>Better Than Anyone</h2>
              <p className="body mb-6">When a third-party commissioning firm arrives on site, they're reading the same documentation you are. When Candron engineers arrive, they designed the system, built the equipment, and tested it in our facility.</p>
              <p className="body mb-8">That difference matters when an issue arises during startup. Our engineers can trace every circuit, understand every protection setting, and resolve issues with authority — not guesswork.</p>
              <ul className="check-list">
                <li>Engineers who designed and built your equipment</li>
                <li>Direct access to as-built documentation and test records</li>
                <li>Faster issue resolution — no learning curve</li>
                <li>Single point of accountability through project close-out</li>
                <li>Coordination with your site team and electrical contractor</li>
              </ul>
              <div className="mt-8 flex justify-center">
                <Link href="/contact" className="btn btn-primary mag">Request Commissioning Support</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-navy-section">
        <div className="container">
          <div className="commission-process-grid grid grid-cols-2 gap-[5rem] items-start">

            {/* Sticky heading */}
            <div className="commission-process-sticky rv-l sticky top-[8rem]">
              <div className="label label-white">How It Works</div>
              <h2 className="text-white mt-2 tracking-[-.01em]">
                Commissioning<br/><em className="not-italic text-blue">Engagement</em>
              </h2>
              <p className="text-white/48 text-[.9rem] leading-[1.78] mt-6 max-w-[360px]">
                A structured five-step process — by the same engineers who designed and built your equipment — from first plan to final handover.
              </p>
              <Link href="/contact" className="btn btn-primary mag mt-8 inline-flex">
                Request Commissioning Support →
              </Link>
            </div>

            {/* Scroll timeline */}
            <div className="rv-r">
              <ProcessScroll variant="dark" steps={[
                { n: '01', t: 'Pre-Commissioning Plan', d: 'Candron develops a site-specific commissioning plan aligned with your project schedule and energization sequence.' },
                { n: '02', t: 'Site Mobilization', d: 'Our engineers arrive on site with complete project documentation and test equipment for field verification.' },
                { n: '03', t: 'Pre-Energization Checks', d: 'Physical verification of installation, connections, settings, and configuration prior to initial energization.' },
                { n: '04', t: 'Startup & Verification', d: 'Supervised energization and functional verification of all systems, protection, and control sequences.' },
                { n: '05', t: 'Handover & Documentation', d: 'Commissioning report issued and documentation package transferred to your operations team.' },
              ]} />
            </div>

          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Reliable Operation From Day One</h2>
          <p className="lead rv !text-white/[.6] !max-w-[500px]">Add commissioning support to your Candron project and ensure your equipment performs as designed from the first day of operation.</p>
          <div className="flex gap-4 justify-center flex-wrap rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
