'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({name:'',company:'',email:'',phone:'',project:'',message:''})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm(p => ({...p, [e.target.name]: e.target.value}))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send.')
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{background:"url('/images/Oil%20%26%20Gas.jpg.jpeg') center/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Contact</span></div>
          <div className="label label-white">Talk to Our Team</div>
          <h1>Let&rsquo;s Build Reliable<br/>Power Infrastructure Together</h1>
          <p className="lead" style={{marginTop:'1rem'}}>Ready to discuss your project? Our engineering team is available to review specifications, provide technical guidance, and develop the right power distribution solution for your requirements.</p>
        </div>
      </div>

      <div className="section bg-off">
        <div className="container">
          <div className="contact-layout">

            {/* FORM */}
            <div className="contact-form-wrap rv-l">
              <div className="label">Request a Quote</div>
              <h2 style={{marginBottom:'2rem'}}>Tell Us About Your Project</h2>

              {sent ? (
                <div style={{padding:'3rem',background:'var(--white)',borderRadius:'16px',border:'1px solid #E8ECF5',textAlign:'center'}}>
                  <div style={{width:'56px',height:'56px',background:'rgba(0,71,255,.08)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1.5rem'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{marginBottom:'.75rem'}}>Message Received</h3>
                  <p style={{color:'var(--gray)',fontSize:'.9rem',lineHeight:'1.7'}}>Thank you for reaching out. Our engineering team will review your project details and get back to you within one business day.</p>
                  <p style={{color:'var(--gray)',fontSize:'.9rem',marginTop:'1rem'}}>For urgent inquiries, call us at <a href="tel:+16476162595" style={{color:'var(--blue)',textDecoration:'none',fontWeight:600}}>+1 (647) 616-2595</a></p>
                </div>
              ) : (
                <form onSubmit={submit} className="contact-form">
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem'}}>
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" id="name" name="name" required placeholder="John Smith" value={form.name} onChange={handle}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input type="text" id="company" name="company" placeholder="Acme Electric Ltd." value={form.company} onChange={handle}/>
                    </div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem'}}>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input type="email" id="email" name="email" required placeholder="john@company.com" value={form.email} onChange={handle}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handle}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="project">Project Type</label>
                    <select id="project" name="project" value={form.project} onChange={handle}>
                      <option value="">Select a product or service</option>
                      <option>Switchgear</option>
                      <option>Switchboards &amp; Panelboards</option>
                      <option>Control Panels</option>
                      <option>Manufacturing &amp; Fabrication</option>
                      <option>Factory Acceptance Testing</option>
                      <option>Commissioning Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Project Details *</label>
                    <textarea id="message" name="message" required rows={5} placeholder="Describe your project requirements, specifications, timeline, or any questions you have for our engineering team..." value={form.message} onChange={handle}></textarea>
                  </div>
                  {error && (
                    <div style={{padding:'.9rem 1.1rem',background:'rgba(220,38,38,.07)',border:'1px solid rgba(220,38,38,.25)',borderRadius:'8px',fontSize:'.84rem',color:'#dc2626',lineHeight:'1.5'}}>{error}</div>
                  )}
                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg mag" style={{width:'100%',justifyContent:'center',marginTop:'.5rem',opacity:loading?.6:1}}>
                    {loading ? 'Sending…' : 'Submit Request'}
                  </button>
                  <p style={{fontSize:'.75rem',color:'var(--gray)',textAlign:'center',marginTop:'.75rem',lineHeight:'1.6'}}>We respond to all inquiries within one business day. For urgent needs, call us directly.</p>
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="contact-info rv-r">
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <div className="contact-card-label">Phone</div>
                  <a href="tel:+16476162595" className="contact-card-val">+1 (647) 616-2595</a>
                  <div className="contact-card-sub">Monday–Friday, 8am–6pm EST</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <div className="contact-card-label">Email</div>
                  <a href="mailto:sales@candron.com" className="contact-card-val">sales@candron.com</a>
                  <div className="contact-card-sub">We respond within one business day</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <div className="contact-card-label">Location</div>
                  <div className="contact-card-val" style={{cursor:'default'}}>North York, Ontario</div>
                  <div className="contact-card-sub">Canada</div>
                </div>
              </div>

              <div style={{marginTop:'2rem',padding:'2rem',background:'var(--navy)',borderRadius:'14px',border:'1px solid rgba(0,71,255,.2)'}}>
                <div style={{fontFamily:'var(--fm)',fontSize:'.6rem',color:'var(--blue)',letterSpacing:'.22em',textTransform:'uppercase',marginBottom:'1rem'}}>What to Include</div>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'.65rem'}}>
                  {['Product type and specifications','Voltage and current requirements','Applicable standards (CSA, UL, ANSI)','Project location and site conditions','Required delivery timeline','Witnessed FAT requirements'].map(item => (
                    <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'.65rem',fontSize:'.8rem',color:'rgba(255,255,255,.55)',lineHeight:'1.6'}}>
                      <span style={{width:'5px',height:'5px',minWidth:'5px',background:'var(--blue)',borderRadius:'50%',marginTop:'.45rem'}}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Factory-Direct. Engineer-Backed.</h2>
          <p className="lead rv" style={{color:'rgba(255,255,255,.6)',maxWidth:'500px'}}>Get the right equipment at the right price — built to your exact specification by the engineers who designed it.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}} className="rv">
            <Link href="/products" className="btn btn-primary btn-lg mag">View Products</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
