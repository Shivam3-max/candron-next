'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({name:'',company:'',email:'',phone:'',location:'',project:'',message:''})
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
        <div className="page-hero-bg" style={{background:"url('/images/oil-gas.jpg') center/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Contact</span></div>
          <div className="label label-white">Talk to Our Team</div>
          <h1>Let&rsquo;s Build Reliable<br/><em>Power Infrastructure Together</em></h1>
          <p className="lead mt-4">Ready to discuss your project? Our engineering team is available to review specifications, provide technical guidance, and develop the right power distribution solution for your requirements.</p>
        </div>
      </div>

      <div className="section bg-off">
        <div className="container">
          <div className="contact-layout">

            {/* FORM */}
            <div className="contact-form-wrap rv-l">
              <div className="label">Request a Quote</div>
              <h2 className="mb-8">Tell Us About Your Project</h2>

              {sent ? (
                <div className="p-12 bg-white rounded-[16px] border border-[#E8ECF5] text-center">
                  <div className="w-14 h-14 bg-blue/[.08] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="mb-3">Message Received</h3>
                  <p className="text-gray text-[.9rem] leading-[1.7]">Thank you for reaching out. Our engineering team will review your project details and get back to you within one business day.</p>
                  <p className="text-gray text-[.9rem] mt-4">For urgent inquiries, call us at <a href="tel:+16476162595" className="text-blue no-underline font-semibold">+1 (647) 616-2595</a></p>
                </div>
              ) : (
                <form onSubmit={submit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" id="name" name="name" required placeholder="John Smith" value={form.name} onChange={handle}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input type="text" id="company" name="company" placeholder="Acme Electric Ltd." value={form.company} onChange={handle}/>
                    </div>
                  </div>
                  <div className="form-row">
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
                    <label htmlFor="location">Project Location</label>
                    <input type="text" id="location" name="location" placeholder="City, Province / State" value={form.location} onChange={handle}/>
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
                    <div className="py-[.9rem] px-[1.1rem] bg-[rgba(220,38,38,.07)] border border-[rgba(220,38,38,.25)] rounded-lg text-[.84rem] text-[#dc2626] leading-[1.5]">{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary btn-lg mag w-full justify-center mt-2 transition-opacity${loading ? ' opacity-60' : ''}`}
                  >
                    {loading ? 'Sending…' : 'Submit Request'}
                  </button>
                  <p className="text-[.75rem] text-gray text-center mt-3 leading-[1.6]">We respond to all inquiries within one business day. For urgent needs, call us directly.</p>
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
                  <div className="contact-card-val cursor-default">Toronto, Ontario</div>
                  <div className="contact-card-sub">Canada</div>
                </div>
              </div>

              <div className="mt-8 p-8 bg-navy rounded-[14px] border border-blue/[.2]">
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">What to Include</div>
                <ul className="list-none flex flex-col gap-[.65rem]">
                  {['Product type and specifications','Voltage and current requirements','Applicable standards (CSA, UL, ANSI)','Project location and site conditions','Required delivery timeline','Witnessed FAT requirements'].map(item => (
                    <li key={item} className="flex items-start gap-[.65rem] text-[.8rem] text-white/55 leading-[1.6]">
                      <span className="w-[5px] h-[5px] min-w-[5px] bg-blue rounded-full mt-[.45rem]"></span>
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
          <h2 className="rv">We're Easy to Reach. Always.</h2>
          <p className="lead rv !text-white/[.6] !max-w-[500px]">Whether you're a contractor, consultant, utility, or project owner — you can reach our engineering team directly. No gatekeepers, no middlemen.</p>
          <div className="flex gap-4 justify-center flex-wrap rv">
            <Link href="/products" className="btn btn-primary btn-lg mag">View Products</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
