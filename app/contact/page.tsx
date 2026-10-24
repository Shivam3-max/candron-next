'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HeroArt } from '@/components/LineArt'

export default function ContactPage() {
  const [form, setForm] = useState({name:'',company:'',email:'',phone:'',message:''})
  const [files, setFiles] = useState<File[]>([])
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Product pages link here with ?product=…&sku=…; carry that into the inquiry
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const product = query.get('product')?.trim().slice(0, 200)
    if (!product) return
    const sku = query.get('sku')?.trim().slice(0, 100)
    const label = sku ? `${product} (SKU ${sku})` : product.replace(/-/g, ' ')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL after hydration
    setForm(p => p.message ? p : { ...p, message: `I'm interested in: ${label}\n\n` })
  }, [])

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm(p => ({...p, [e.target.name]: e.target.value}))
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? [])
    const totalSize = selected.reduce((sum, file) => sum + file.size, 0)
    if (selected.length > 3) {
      setError('Please attach no more than 3 files.')
      e.target.value = ''
      return
    }
    if (totalSize > 4 * 1024 * 1024) {
      setError('Attachments must be 4 MB or less in total.')
      e.target.value = ''
      return
    }
    setError('')
    setFiles(selected)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = new FormData()
      Object.entries(form).forEach(([key, value]) => payload.append(key, value))
      files.forEach(file => payload.append('attachments', file))

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
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
        <HeroArt kind="plant" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Contact</span></div>
          <div className="label label-white">Talk to Our Team</div>
          <h1>Let&rsquo;s Build Reliable<br/><em>Power Infrastructure Together</em></h1>
          <p className="lead mt-4">Ready to discuss your project? Our team works directly with contractors, consultants, utilities, and project owners to review specifications, provide technical guidance, and identify the right power distribution solution.</p>
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
                <div className="p-12 max-md:p-6 bg-white rounded-[16px] border border-[#E8ECF5] text-center">
                  <div className="w-14 h-14 bg-blue/[.08] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="mb-3">Thank You. We&apos;ve Received Your Inquiry.</h3>
                  <p className="text-gray text-[1.125rem] leading-[1.7] max-w-[520px] mx-auto">Our team will review your project requirements and get back to you to discuss the next steps.</p>

                  <div className="mt-7 py-6 px-5 max-md:px-4 rounded-[12px] bg-off border border-[#E8ECF5]">
                    <p className="font-title font-bold text-navy text-[1.125rem] mb-2">Need immediate assistance with your project?</p>
                    <a href="tel:+16476162595" className="inline-block text-blue no-underline font-display font-black text-[1.25rem] max-sm:text-[1.125rem]">+1 (647) 616-2595</a>
                    <p className="font-mono text-gray text-[.9375rem] mt-2 mb-0">Available 24/7, 365 days a year</p>
                  </div>

                  <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 mt-7">
                    <Link href="/" className="btn btn-outline-blue justify-center">Homepage</Link>
                    <Link href="/products" className="btn btn-primary justify-center">Discover Our Products &amp; Inventory</Link>
                  </div>
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
                    <label htmlFor="message">Project Details *</label>
                    <textarea id="message" name="message" required rows={5} placeholder="Describe your project requirements, specifications, timeline, or any questions you have for our engineering team..." value={form.message} onChange={handle}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="attachments">Project Files</label>
                    <input
                      id="attachments"
                      name="attachments"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.jpg,.jpeg,.png"
                      onChange={handleFiles}
                      className="sr-only"
                    />
                    <label htmlFor="attachments" className="!normal-case !tracking-normal cursor-pointer rounded-[10px] border-2 border-dashed border-[#C9D2E5] bg-white px-5 py-5 transition-[border-color,background] duration-200 hover:border-blue hover:bg-blue/[.025]">
                      <span className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-[9px] bg-blue/[.08] text-blue flex items-center justify-center shrink-0">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 14v5a1 1 0 001 1h12a1 1 0 001-1v-5"/></svg>
                        </span>
                        <span className="min-w-0">
                          <span className="block font-title font-bold text-navy text-[1.0625rem]">Add or upload files</span>
                          <span className="block font-mono text-gray text-[.9375rem] leading-[1.5] mt-1">PDF, Word, Excel, CAD, JPG or PNG · Up to 3 files · 4 MB total</span>
                        </span>
                      </span>
                    </label>
                    {files.length > 0 && (
                      <ul className="list-none flex flex-col gap-1 mt-1">
                        {files.map(file => (
                          <li key={`${file.name}-${file.size}`} className="font-mono text-[.9375rem] text-gray truncate">✓ {file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {error && (
                    <div className="py-[.9rem] px-[1.1rem] bg-[rgba(220,38,38,.07)] border border-[rgba(220,38,38,.25)] rounded-lg text-[1.0625rem] text-[#dc2626] leading-[1.5]">{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary btn-lg mag w-full justify-center mt-2 transition-opacity${loading ? ' opacity-60' : ''}`}
                  >
                    {loading ? 'Sending…' : 'Submit Request'}
                  </button>
                  <p className="text-[1rem] text-gray text-center mt-3 leading-[1.6]">Available 24/7, 365 days a year. We respond to inquiries within 4 hours.</p>
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
                  <div className="contact-card-sub">Available 24/7, 365 days a year</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <div className="contact-card-label">Email</div>
                  <a href="mailto:sales@candron.com" className="contact-card-val">sales@candron.com</a>
                  <div className="contact-card-sub">We respond within 4 hours</div>
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

              <div className="mt-8 p-8 max-sm:p-6 bg-white rounded-[14px] border border-[#DCE3F0] border-l-4 border-l-blue shadow-[0_10px_30px_rgba(6,11,36,.06)]">
                <h3 className="text-navy text-[1.25rem] m-0 mb-1">What to include in your inquiry</h3>
                <p className="text-gray text-[1rem] leading-[1.6] m-0 mb-4">These details help us quote accurately the first time.</p>
                <ul className="list-none flex flex-col gap-[.7rem] m-0 p-0">
                  {['Equipment specifications','Voltage and current requirements','Applicable standards (CSA, UL, ANSI)','Required delivery timeline','Witnessed FAT requirements'].map(item => (
                    <li key={item} className="flex items-start gap-[.7rem] text-[1.0625rem] text-navy leading-[1.5]">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="mt-[.15rem] min-w-[18px]"><circle cx="9" cy="9" r="9" fill="#E8EEFF" /><path d="M5.2 9.2l2.5 2.5 5-5.4" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
          <h2 className="rv">We&rsquo;re Easy to Reach. Always.</h2>
          <p className="lead rv !text-white/[.6] !max-w-[680px]">Whether you&rsquo;re a contractor, consultant, utility, or project owner, you&rsquo;ll have direct access to our team — from initial inquiry through engineering and delivery.</p>
          <p className="lead rv !text-white/[.6] !max-w-[680px] !mt-0">No gatekeepers. No middlemen. Just direct access to the people who know your project.</p>
          <div className="flex gap-4 justify-center flex-wrap rv">
            <Link href="/products" className="btn btn-primary btn-lg mag">View Products</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
