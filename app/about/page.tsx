import Link from 'next/link'
import Image from 'next/image'
import StatBar from '@/components/StatBar'
import TimelineScroll from '@/components/TimelineScroll'

export const metadata = { title: 'About', description: '50+ years of combined engineering expertise powering North America\'s most critical facilities. Candron Energy Inc. — licensed engineers, veteran technicians, and 650+ machines in stock.' }

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{background:"url('/images/switchgear.jpg') center 30%/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>About</span></div>
          <div className="label label-white">Our Story</div>
          <h1>Built on Reliability.<br/>Grown on Trust.</h1>
          <p className="lead" style={{marginTop:'1rem'}}>50+ years of combined engineering expertise powering North America's most critical facilities. One promise, kept every time: when you need us, we're there.</p>
        </div>
      </div>

      {/* MISSION */}
      <div className="section bg-white">
        <div className="container">
          <div className="split rv">
            <div className="rv-l">
              <div className="label">Who We Are</div>
              <h2>North America's Most Responsive Electrical Infrastructure Partner</h2>
            </div>
            <div className="rv-r">
              <p className="body" style={{marginBottom:'1.25rem'}}>Candron Energy Inc. was founded on a simple observation: when industrial facilities experience electrical failures, the existing supply chain is too slow, too fragmented, and too unreliable. Operators waited weeks for transformers. Engineers flew in from distant offices. Critical production was lost.</p>
              <p className="body" style={{marginBottom:'1.25rem'}}>We built Candron to fix that. Starting with a deep inventory of transformers, switchgear, and load banks at our North York facility, combined with a team of licensed engineers available 24 hours a day, 7 days a week — we became the partner operators turn to when every minute matters.</p>
              <p className="body">Today, Candron serves clients across mining, oil and gas, power generation, data centers, healthcare, transportation, and more — delivering electrical infrastructure solutions from design through commissioning, with sub-30-minute emergency response anywhere in North America.</p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stat-bar">
        <div className="container">
          <StatBar stats={[
            { num: '50+', lbl: 'Years Combined Expertise' },
            { num: '650+', lbl: 'Machines in Stock' },
            { num: '9', lbl: 'Industries Served' },
            { num: '24/7', lbl: 'Emergency Response' },
          ]} />
        </div>
      </div>

      {/* VALUES */}
      <div className="section bg-off">
        <div className="container">
          <div className="split" style={{alignItems:'start'}}>
            <div className="rv-l">
              <div className="label">What Drives Us</div>
              <h2 style={{marginBottom:'1.5rem'}}>Our Values</h2>
              <p className="body" style={{marginBottom:'2.5rem'}}>Four principles guide every decision at Candron — from how we stock our inventory to how we answer the phone at 3am.</p>
              <div className="value-grid">
                <div className="value-item rv">
                  <div className="value-num">01</div>
                  <div className="value-title">Reliability First</div>
                  <div className="value-text">We never over-promise. If we say we'll be there in 30 minutes, we're there in 30 minutes. Our reputation is built on delivered commitments, not marketing claims.</div>
                </div>
                <div className="value-item rv d2">
                  <div className="value-num">02</div>
                  <div className="value-title">Engineering Integrity</div>
                  <div className="value-text">Every recommendation is made by a licensed engineer based on what's right for the application — not what's fastest to ship or highest margin.</div>
                </div>
                <div className="value-item rv d3">
                  <div className="value-num">03</div>
                  <div className="value-title">Inventory Discipline</div>
                  <div className="value-text">We invest heavily in stock so our clients never pay the price of lead times. 650+ units on hand means same-day or next-day delivery — always.</div>
                </div>
                <div className="value-item rv d4">
                  <div className="value-num">04</div>
                  <div className="value-title">Long-Term Partnership</div>
                  <div className="value-text">Our relationship with your equipment doesn't end at delivery. We're your partner for the full lifecycle — testing, maintenance, repair, and eventual replacement.</div>
                </div>
              </div>
            </div>
            <div className="rv-r sticky-col">
              <div style={{borderRadius:'14px',overflow:'hidden',height:'500px',position:'relative'}}>
                <Image src="/images/utilities.jpg" alt="Candron Engineering Team" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 40vw"/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,9,31,.5),transparent 50%)'}}></div>
                <div style={{position:'absolute',bottom:'2rem',left:'2rem',right:'2rem'}}>
                  <div style={{fontFamily:'var(--fd)',fontSize:'1rem',fontWeight:700,color:'#fff',marginBottom:'.3rem'}}>Licensed Engineers</div>
                  <div style={{fontSize:'.82rem',color:'rgba(255,255,255,.65)'}}>On call 24/7, every day of the year</div>
                </div>
              </div>
              <div className="about-mini-stats">
                <div style={{padding:'1.5rem',background:'var(--white)',border:'1px solid #E8ECF5',borderRadius:'10px',textAlign:'center'}}>
                  <div style={{fontFamily:'var(--fd)',fontSize:'1.5rem',fontWeight:900,color:'var(--blue)'}}>&lt;30 Min</div>
                  <div style={{fontFamily:'var(--ft)',fontSize:'.68rem',color:'var(--gray)',letterSpacing:'.1em',textTransform:'uppercase',marginTop:'.25rem'}}>Emergency Response</div>
                </div>
                <div style={{padding:'1.5rem',background:'var(--white)',border:'1px solid #E8ECF5',borderRadius:'10px',textAlign:'center'}}>
                  <div style={{fontFamily:'var(--fd)',fontSize:'1.5rem',fontWeight:900,color:'var(--blue)'}}>2–5 Yr</div>
                  <div style={{fontFamily:'var(--ft)',fontSize:'.68rem',color:'var(--gray)',letterSpacing:'.1em',textTransform:'uppercase',marginTop:'.25rem'}}>Standard Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="section bg-white">
        <div className="container">
          <div className="split" style={{alignItems:'start'}}>
            <div className="rv-l">
              <div className="label">Our Journey</div>
              <h2 style={{marginBottom:'2.5rem'}}>50+ Years of Combined<br/>Engineering Excellence</h2>
              <TimelineScroll />
            </div>
            <div className="rv-r" style={{display:'flex',flexDirection:'column',gap:'1.5rem',marginTop:'5rem'}}>
              <div style={{borderRadius:'12px',overflow:'hidden',height:'280px',position:'relative'}}>
                <Image src="/images/switchgear.jpg" alt="Candron Facility" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 40vw"/>
              </div>
              <div style={{borderRadius:'12px',overflow:'hidden',height:'280px',position:'relative'}}>
                <Image src="/images/control-panels.jpg" alt="Engineering Work" fill style={{objectFit:'cover'}} sizes="(max-width:1024px) 100vw, 40vw"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEET OUR TEAM */}
      <div className="section bg-off">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'600px',margin:'0 auto 3.5rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>The People Behind The Work</div>
            <h2>An Army of Experts.<br/>Built for the Field.</h2>
            <p className="lead" style={{margin:'1rem auto 0'}}>Candron is powered by a team of licensed engineers and battle-tested technicians — over 50 years of combined expertise deployed on every project.</p>
          </div>

          <div className="team-grid" style={{marginBottom:'3rem'}}>
            {/* Engineers card */}
            <div className="team-card rv">
              <div className="team-img">
                <Image src="/images/LicensedEngineers.jpeg" alt="Licensed Engineers" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              </div>
              <div className="team-body">
                <div className="team-name">Licensed Engineers</div>
                <div className="team-role">M.Eng &amp; Ph.D — Power Systems</div>
                <p style={{fontSize:'.88rem',color:'var(--gray)',lineHeight:1.75,marginTop:'.75rem'}}>
                  Every engineer on our team holds a professional license and an advanced degree — master's or doctorate — in electrical or power systems engineering. They design, specify, and commission every project with zero shortcuts.
                </p>
                <div style={{display:'flex',gap:'0.75rem',marginTop:'1.25rem',flexWrap:'wrap'}}>
                  {['P.Eng Licensed','M.Eng / Ph.D','Power Systems','SCADA & Controls'].map(tag => (
                    <span key={tag} className="team-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technicians card */}
            <div className="team-card rv d2">
              <div className="team-img">
                <Image src="/images/FieldTechnicians (1).png" alt="Field Technicians" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              </div>
              <div className="team-body">
                <div className="team-name">Field Technicians</div>
                <div className="team-role">30+ Years on the Front Lines</div>
                <p style={{fontSize:'.88rem',color:'var(--gray)',lineHeight:1.75,marginTop:'.75rem'}}>
                  Our technicians are field veterans — not career starters. Each brings more than 30 years of hands-on experience commissioning, maintaining, and troubleshooting industrial electrical systems under real-world conditions.
                </p>
                <div style={{display:'flex',gap:'0.75rem',marginTop:'1.25rem',flexWrap:'wrap'}}>
                  {['30+ Yrs Experience','Field Commissioning','HV / MV Systems','Emergency Response'].map(tag => (
                    <span key={tag} className="team-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Combined experience card */}
            <div className="team-card rv d3">
              <div className="team-img">
                <Image src="/images/CombinedExpertise (1).png" alt="Combined Expertise" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/>
              </div>
              <div className="team-body">
                <div className="team-name">Combined Expertise</div>
                <div className="team-role">Across Every Discipline</div>
                <p style={{fontSize:'.88rem',color:'var(--gray)',lineHeight:1.75,marginTop:'.75rem'}}>
                  When you work with Candron, you're not getting one engineer — you're getting the collective weight of over 50 years of power systems engineering and field operations, applied to your project from day one.
                </p>
                <div style={{display:'flex',gap:'0.75rem',marginTop:'1.25rem',flexWrap:'wrap'}}>
                  {['50+ Yrs Combined','Design to Commissioning','24/7 On-Call','North America Wide'].map(tag => (
                    <span key={tag} className="team-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FACILITY */}
      <div className="section bg-off">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:'580px',margin:'0 auto 3.5rem'}} className="rv">
            <div className="label" style={{justifyContent:'center'}}>Our Facility</div>
            <h2>North York, Ontario</h2>
            <p className="lead" style={{margin:'1rem auto 0'}}>Our 4801 Keele St facility houses our full inventory, in-house repair workshop, testing lab, and engineering offices — all under one roof.</p>
          </div>
          <div className="facility-grid">
            <div className="facility-img rv"><Image src="/images/switchboards.jpg" alt="Transformer Storage" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
            <div className="facility-img rv d2"><Image src="/images/utilities.jpg" alt="Testing Laboratory" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
            <div className="facility-img rv d3"><Image src="/images/control-panels.jpg" alt="Engineering Office" fill style={{objectFit:'cover'}} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"/></div>
          </div>
          <div className="metrics-4col rv">
            <div style={{textAlign:'center',padding:'1.5rem',background:'var(--white)',border:'1px solid #E8ECF5',borderRadius:'10px'}}>
              <div style={{fontFamily:'var(--fd)',fontSize:'1.4rem',fontWeight:900,color:'var(--blue)',marginBottom:'.3rem'}}>650+</div>
              <div style={{fontFamily:'var(--ft)',fontSize:'.7rem',color:'var(--gray)',letterSpacing:'.1em',textTransform:'uppercase'}}>Units In Stock</div>
            </div>
            <div style={{textAlign:'center',padding:'1.5rem',background:'var(--white)',border:'1px solid #E8ECF5',borderRadius:'10px'}}>
              <div style={{fontFamily:'var(--fd)',fontSize:'1.4rem',fontWeight:900,color:'var(--blue)',marginBottom:'.3rem'}}>In-House</div>
              <div style={{fontFamily:'var(--ft)',fontSize:'.7rem',color:'var(--gray)',letterSpacing:'.1em',textTransform:'uppercase'}}>Testing Lab</div>
            </div>
            <div style={{textAlign:'center',padding:'1.5rem',background:'var(--white)',border:'1px solid #E8ECF5',borderRadius:'10px'}}>
              <div style={{fontFamily:'var(--fd)',fontSize:'1.4rem',fontWeight:900,color:'var(--blue)',marginBottom:'.3rem'}}>24/7</div>
              <div style={{fontFamily:'var(--ft)',fontSize:'.7rem',color:'var(--gray)',letterSpacing:'.1em',textTransform:'uppercase'}}>Engineer On Call</div>
            </div>
            <div style={{textAlign:'center',padding:'1.5rem',background:'var(--white)',border:'1px solid #E8ECF5',borderRadius:'10px'}}>
              <div style={{fontFamily:'var(--fd)',fontSize:'1.4rem',fontWeight:900,color:'var(--blue)',marginBottom:'.3rem'}}>Same Day</div>
              <div style={{fontFamily:'var(--ft)',fontSize:'.7rem',color:'var(--gray)',letterSpacing:'.1em',textTransform:'uppercase'}}>Shipping Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Ready to Work Together?</h2>
          <p className="lead rv" style={{color:'rgba(255,255,255,.6)',maxWidth:'500px'}}>Whether you have an urgent need or a long-term project, our team is ready. Let's start the conversation.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}} className="rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Contact Our Team</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
