import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import StatBar from '@/components/StatBar'
import TimelineScroll from '@/components/TimelineScroll'

export const metadata = { title: 'About', description: '50+ years of combined engineering expertise powering North America\'s most critical facilities. Candron Energy Inc. — licensed engineers, veteran technicians, and complete in-house manufacturing from design to delivery.' }

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">



        
        <div className="page-hero-bg" style={{background:"url('/images/switchgear.jpg') center 30%/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>About</span></div>
          <div className="label label-white">Our Story</div>
          <h1>Built on Reliability.<br/><em>Grown on Trust.</em></h1>
          <p className="lead mt-4">50+ years of combined engineering expertise powering North America's most critical facilities. One promise, kept every time: when you need us, we're there.</p>
        </div>
      </div>

      {/* MISSION */}
      <div className="section bg-white">
        <div className="container">
          <div className="split rv">
            <div className="rv-l">
              <div className="label">Who We Are</div>
              <h2>Complete In-House Electrical Manufacturing — No Outsourcing, No Third Parties</h2>
            </div>
            <div className="rv-r">
              <p className="body mb-5">Candron Energy Inc. was founded on a straightforward principle: the best electrical equipment is designed, manufactured, assembled, and tested by the same team — under one roof. Most suppliers depend on fragmented networks of third-party fabricators, external wiring shops, and offshore supply chains. That introduces delays, quality gaps, and accountability problems that ultimately impact your project.</p>
              <p className="body mb-5">We built Candron differently. Every stage of production happens in our Toronto facility — electrical engineering, mechanical design, fabrication, assembly, wiring, quality inspection, and factory acceptance testing. When you work with Candron, there is one point of contact and one team accountable for the outcome.</p>
              <p className="body">Today, Candron serves clients across mining, oil and gas, power generation, data centers, healthcare, transportation, and more — delivering engineered power distribution solutions with faster lead times and uncompromising quality built to ANSI, NETA, CSA, and IEEE standards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stat-bar">
        <div className="container">
          <StatBar stats={[
            { num: '50+', lbl: 'Years Combined Expertise' },
            { num: 'C5M', lbl: 'Paint Standard' },
            { num: '11-Gauge', lbl: 'Steel Enclosures' },
            { num: 'Same-Day', lbl: 'Lead Time Quotes' },
          ]} />
        </div>
      </div>

      {/* VALUES */}
      <div className="wt-section">
        <div className="container">

          {/* Header */}
          <div className="wt-header rv">
            <div>
              <div className="label label-white">What Drives Us</div>
              <h2 className="wt-h2">Our <em>Values</em></h2>
            </div>
            <div className="wt-header-right">
              <p className="wt-intro max-w-[460px] text-left">Four principles guide every decision at Candron — from how we specify materials to how we deliver documentation on the last day of a project.</p>
            </div>
          </div>

          {/* Split: cards left, image+stats right */}
          <div className="val-split rv">

            {/* 2×2 value cards */}
            <div className="val-grid">
              {([
                {
                  n: '01', title: 'Reliability First',
                  desc: 'We never over-promise. If we commit to a schedule, we deliver on it. Our reputation is built on delivered commitments, not marketing claims.',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                },
                {
                  n: '02', title: 'Engineering Integrity',
                  desc: 'Every recommendation is made by a licensed engineer based on what\'s right for the application — not what\'s fastest to ship or highest margin.',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>,
                },
                {
                  n: '03', title: 'Material Standards',
                  desc: 'We specify 11-gauge steel where others use 13–14, and C5M painting where others use basic coatings. The right material up front costs less than a field failure.',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                },
                {
                  n: '04', title: 'Long-Term Partnership',
                  desc: 'Our relationship with your equipment doesn\'t end at delivery. We\'re your partner for the full lifecycle — testing, maintenance, repair, and eventual replacement.',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
                },
              ] as { n: string; title: string; desc: string; icon: React.ReactNode }[]).map((v) => (
                <div className="wt-card" key={v.n}>
                  <div className="wt-card-top">
                    <div className="wt-num">{v.n}</div>
                    <div className="wt-icon">{v.icon}</div>
                  </div>
                  <div className="wt-title">{v.title}</div>
                  <p className="wt-desc">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Image + stat cards */}
            <div className="val-aside">
              <div className="val-img">
                <Image src="/images/LicensedEngineers.jpeg" alt="Candron Engineering Team" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 400px"/>
                <div className="val-img-overlay"/>
                <div className="val-img-badge">
                  <div className="val-img-badge-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/></svg>
                  </div>
                  <div className="val-img-badge-text">
                    <strong>Licensed Engineers</strong>
                    <span>Deployed on every project, design to commissioning</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="wt-section">
        <div className="container">

          {/* Header */}
          <div className="wt-header rv">
            <div>
              <div className="label label-white">Founded 2022 · Toronto, Ontario</div>
              <h2 className="wt-h2">A Young Company.<br/><em>Decades of Expertise.</em></h2>
            </div>
            <div className="wt-header-right">
              <p className="wt-intro max-w-[460px] text-left">Candron was founded in 2022 — but the engineers and technicians behind it bring over 50 years of combined power systems experience. Every project benefits from that depth, on day one.</p>
            </div>
          </div>

          {/* Credential strip */}
          <div className="cred-strip-grid grid grid-cols-4 max-md:grid-cols-2 gap-px bg-blue/[.15] rounded-[14px] overflow-hidden mb-12 max-md:mb-6 rv">
            {[
              { val: '2022', lbl: 'Year Founded' },
              { val: '50+', lbl: 'Years Combined Expertise' },
              { val: 'P.Eng', lbl: 'Licensed Engineers' },
              { val: '100%', lbl: 'In-House Manufacturing' },
            ].map((s) => (
              <div key={s.lbl} className="bg-[#080E2C] py-7 px-6 text-center">
                <div className="font-display text-[1.6rem] font-black text-blue leading-none">{s.val}</div>
                <div className="font-title text-[.62rem] text-white/42 tracking-[.1em] uppercase mt-2">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Timeline + images */}
          <div className="split items-start">
            <div className="rv-l">
              <TimelineScroll />
            </div>
            <div className="rv-r flex flex-col gap-5 mt-4 max-md:hidden">
              <div className="rounded-[14px] overflow-hidden h-[260px] relative border border-blue/[.15]">
                <Image src="/images/switchgear.jpg" alt="Candron Facility" fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw"/>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"/>
              </div>
              <div className="rounded-[14px] overflow-hidden h-[260px] relative border border-blue/[.15]">
                <Image src="/images/control-panels.jpg" alt="Engineering Work" fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw"/>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"/>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MEET OUR TEAM */}
      <div className="section bg-off">
        <div className="container">
          <div className="text-center max-w-[600px] mx-auto mb-14 rv">
            <div className="label justify-center">The People Behind The Work</div>
            <h2>An Army of Experts.<br/>Built for the Field.</h2>
            <p className="lead mt-4 mx-auto">Candron is powered by a team of licensed engineers and battle-tested technicians — over 50 years of combined expertise deployed on every project.</p>
          </div>

          <div className="team-grid mb-12">
            {/* Engineers card */}
            <div className="team-card rv">
              <div className="team-img">
                <Image src="/images/LicensedEngineers.jpeg" alt="Licensed Engineers" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              </div>
              <div className="team-body">
                <div className="team-name">Licensed Engineers</div>
                <div className="team-role">M.Eng &amp; Ph.D — Power Systems</div>
                <p className="text-[.88rem] text-gray leading-[1.75] mt-3">
                  Every engineer on our team holds a professional license and an advanced degree — master's or doctorate — in electrical or power systems engineering. They design, specify, and commission every project with zero shortcuts.
                </p>
                <div className="flex gap-3 mt-5 flex-wrap">
                  {['P.Eng Licensed','M.Eng / Ph.D','Power Systems','SCADA & Controls'].map(tag => (
                    <span key={tag} className="team-tag">{tag}</span>
                  ))}
                </div>

              </div>
            </div>

            {/* Technicians card */}
            <div className="team-card rv d2">
              <div className="team-img">
                <Image src="/images/field-technicians.png" alt="Field Technicians" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              </div>
              <div className="team-body">
                <div className="team-name">Field Technicians</div>
                <div className="team-role">40+ Years on the Front Lines</div>
                <p className="text-[.88rem] text-gray leading-[1.75] mt-3">
                  Our technicians are field veterans — not career starters. Our most experienced member brings over 40 years of hands-on experience commissioning, maintaining, and troubleshooting high-voltage and medium-voltage systems under real-world conditions.
                </p>
                <div className="flex gap-3 mt-5 flex-wrap">
                  {['40+ Yrs Experience','Field Commissioning','HV / MV Systems','Emergency Response'].map(tag => (
                    <span key={tag} className="team-tag">{tag}</span>
                  ))}
                </div>

              </div>
            </div>

            {/* Combined experience card */}
            <div className="team-card rv d3">
              <div className="team-img">
                <Image src="/images/combined-expertise.png" alt="Combined Expertise" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              </div>
              <div className="team-body">
                <div className="team-name">Combined Expertise</div>
                <div className="team-role">Across Every Discipline</div>
                <p className="text-[.88rem] text-gray leading-[1.75] mt-3">
                  When you work with Candron, you're not getting one engineer — you're getting the collective weight of over 50 years of power systems engineering and field operations, applied to your project from day one. From high-voltage design to medium-voltage commissioning.
                </p>
                <div className="flex gap-3 mt-5 flex-wrap">
                  {['50+ Yrs Combined','Design to Commissioning','HV / MV Expertise','North America Wide'].map(tag => (
                    <span key={tag} className="team-tag">{tag}</span>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS — hidden until real client quotes are available
      <div className="section bg-white">
        <div className="container">
          <div className="text-center max-w-[580px] mx-auto mb-14 rv">
            <div className="label justify-center">What Clients Say</div>
            <h2>Trusted by Engineers<br/>Across North America</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {[
              { quote: 'Candron delivered our switchgear on schedule and within spec. Their team was responsive at every stage — engineering queries, FAT coordination, and commissioning support. Exactly the partner we needed.', name: 'Client Name', role: 'Project Engineer', company: 'Company Name' },
              { quote: 'What impressed us most was the ability to visit the facility mid-build and see our equipment taking shape. Full transparency, no surprises — just quality work delivered on time.', name: 'Client Name', role: 'Procurement Manager', company: 'Company Name' },
              { quote: 'We reached out not knowing if Candron worked with projects our size — they responded the same day and walked us through every option. Completely accessible from day one, and the end product spoke for itself.', name: 'Client Name', role: 'Electrical Lead', company: 'Company Name' },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-off border border-[#E8ECF5] rounded-[14px] flex flex-col gap-5 rv">
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none"><path d="M0 20V12.5C0 5.596 3.956 1.54 11.868 0l1.264 2.1C9.372 3.276 7.34 5.596 7.084 9.5H12V20H0zm16 0V12.5C16 5.596 19.956 1.54 27.868 0l1.264 2.1c-3.76 1.176-5.792 3.496-6.048 7.4H28V20H16z" fill="#0047FF" fillOpacity=".15"/></svg>
                <p className="text-[.9rem] text-gray leading-[1.8] m-0 italic">{t.quote}</p>
                <div className="border-t border-[#E8ECF5] pt-4">
                  <div className="font-bold text-navy text-[.88rem]">{t.name}</div>
                  <div className="text-[.78rem] text-gray mt-[.2rem]">{t.role} — {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      */}

      {/* FACILITY */}
      <div className="section bg-off">
        <div className="container">
          <div className="text-center max-w-[580px] mx-auto mb-14 rv">
            <div className="label justify-center">Our Facility</div>
            <h2>Toronto, Ontario</h2>
            <p className="lead mt-4 mx-auto">Our Toronto facility houses our complete manufacturing operation — electrical engineering, fabrication, assembly, wiring, testing lab, and engineering offices, all under one roof.</p>
          </div>
          <div className="facility-grid">
            <div className="facility-img rv"><Image src="/images/switchboards.jpg" alt="Transformer Storage" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
            <div className="facility-img rv d2"><Image src="/images/utilities.jpg" alt="Testing Laboratory" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
            <div className="facility-img rv d3"><Image src="/images/control-panels.jpg" alt="Engineering Office" fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
          </div>
          <div className="metrics-4col rv">
            {[
              { val: '100%', lbl: 'In-House Production' },
              { val: 'In-House', lbl: 'Testing Lab' },
              { val: '24/7', lbl: 'Engineer On Call' },
              { val: 'Full FAT', lbl: 'Before Shipment' },
            ].map((m) => (
              <div key={m.lbl} className="text-center p-6 bg-white border border-[#E8ECF5] rounded-[10px]">
                <div className="font-display text-[1.4rem] font-black text-blue mb-[.3rem]">{m.val}</div>
                <div className="font-title text-[.7rem] text-gray tracking-[.1em] uppercase">{m.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Ready to Work Together?</h2>
          <p className="lead rv !text-white/[.6] !max-w-[500px]">Whether you have an urgent need or a long-term project, our team is ready. Let's start the conversation.</p>
          <div className="flex gap-4 justify-center flex-wrap rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Contact Our Team</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
