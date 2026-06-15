import Link from 'next/link'

export const metadata = { title: 'About | Candron Energy Inc.' }

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{background:"url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1800&q=80') center 30%/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>About</span></div>
          <div className="label label-white">Our Story</div>
          <h1>Built on Reliability.<br/>Grown on Trust.</h1>
          <p className="lead" style={{marginTop:'1rem'}}>15+ years powering North America's most critical facilities. One promise, kept every time: when you need us, we're there.</p>
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
          <div className="stat-grid">
            <div className="stat-item"><div className="stat-num">15+</div><div className="stat-lbl">Years in Business</div></div>
            <div className="stat-item"><div className="stat-num">650+</div><div className="stat-lbl">Machines in Stock</div></div>
            <div className="stat-item"><div className="stat-num">9</div><div className="stat-lbl">Industries Served</div></div>
            <div className="stat-item"><div className="stat-num">24/7</div><div className="stat-lbl">Emergency Response</div></div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="section bg-off">
        <div className="container">
          <div className="split" style={{gap:'5rem',alignItems:'start'}}>
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
            <div className="rv-r" style={{position:'sticky',top:'100px'}}>
              <div style={{borderRadius:'14px',overflow:'hidden',height:'500px',position:'relative'}}>
                <img src="https://images.unsplash.com/photo-1581093196867-ca0a5a0cf98f?w=800&q=80" alt="Candron Engineering Team" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,9,31,.5),transparent 50%)'}}></div>
                <div style={{position:'absolute',bottom:'2rem',left:'2rem',right:'2rem'}}>
                  <div style={{fontFamily:'var(--fd)',fontSize:'1rem',fontWeight:700,color:'#fff',marginBottom:'.3rem'}}>Licensed Engineers</div>
                  <div style={{fontSize:'.82rem',color:'rgba(255,255,255,.65)'}}>On call 24/7, every day of the year</div>
                </div>
              </div>
              <div style={{marginTop:'1.5rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
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
          <div className="split" style={{gap:'5rem',alignItems:'start'}}>
            <div className="rv-l">
              <div className="label">Our Journey</div>
              <h2 style={{marginBottom:'2.5rem'}}>15 Years of Keeping<br/>the Lights On</h2>
              <div className="timeline">
                <div className="tl-item rv">
                  <div className="tl-dot"></div>
                  <div className="tl-year">2009</div>
                  <div className="tl-title">Founded in North York, Ontario</div>
                  <div className="tl-text">Candron Energy Inc. is established with a focus on transformer sales and service for the Ontario industrial market. First facility at 4801 Keele St.</div>
                </div>
                <div className="tl-item rv">
                  <div className="tl-dot"></div>
                  <div className="tl-year">2012</div>
                  <div className="tl-title">Expanded into Switchgear &amp; Load Banks</div>
                  <div className="tl-text">Growing client demand drives expansion into medium-voltage switchgear sales and load bank rentals. First emergency response contracts signed with mining operators.</div>
                </div>
                <div className="tl-item rv">
                  <div className="tl-dot"></div>
                  <div className="tl-year">2015</div>
                  <div className="tl-title">Launched 24/7 Emergency Response Program</div>
                  <div className="tl-text">Formalized our sub-30-minute emergency response guarantee with dedicated on-call engineers. First cross-border USA deployments begin.</div>
                </div>
                <div className="tl-item rv">
                  <div className="tl-dot"></div>
                  <div className="tl-year">2018</div>
                  <div className="tl-title">Engineering Services Division Opens</div>
                  <div className="tl-text">Candron hires its first team of licensed power systems engineers to offer in-house design, SCADA integration, and commissioning services.</div>
                </div>
                <div className="tl-item rv">
                  <div className="tl-dot"></div>
                  <div className="tl-year">2021</div>
                  <div className="tl-title">Expanded Inventory to 500+ Units</div>
                  <div className="tl-text">Major inventory investment brings our stocked unit count past 500, enabling same-day or next-day shipment on most transformer and switchgear requests.</div>
                </div>
                <div className="tl-item rv">
                  <div className="tl-dot"></div>
                  <div className="tl-year">2024</div>
                  <div className="tl-title">650+ Machines. 9 Industries. Still Growing.</div>
                  <div className="tl-text">Candron now operates with 650+ machines in stock, serves 9 major industrial sectors, and maintains emergency response capabilities across all of North America.</div>
                </div>
              </div>
            </div>
            <div className="rv-r" style={{display:'flex',flexDirection:'column',gap:'1.5rem',marginTop:'5rem'}}>
              <div style={{borderRadius:'12px',overflow:'hidden',height:'280px'}}>
                <img src="https://images.unsplash.com/photo-1565008576549-57d5f0af0d37?w=700&q=80" alt="Candron Facility" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              </div>
              <div style={{borderRadius:'12px',overflow:'hidden',height:'280px'}}>
                <img src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=700&q=80" alt="Engineering Work" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
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
            <div className="facility-img rv"><img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80" alt="Transformer Storage"/></div>
            <div className="facility-img rv d2"><img src="https://images.unsplash.com/photo-1581093196867-ca0a5a0cf98f?w=700&q=80" alt="Testing Laboratory"/></div>
            <div className="facility-img rv d3"><img src="https://images.unsplash.com/photo-1565008576549-57d5f0af0d37?w=700&q=80" alt="Engineering Office"/></div>
          </div>
          <div style={{marginTop:'3rem',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1.5rem'}} className="rv">
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
