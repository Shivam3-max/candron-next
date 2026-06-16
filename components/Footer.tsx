'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo footer-logo" aria-label="Candron Energy Inc. — Home">
              <svg className="logo-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="27" height="27" rx="6" stroke="#0047FF" strokeWidth="1.8"/>
                <path d="M15 5.5v7l-5.5 5.5H15v6.5L20.5 18H15V5.5z" fill="#0047FF"/>
              </svg>
              <span className="logo-text">CANDRON<span>Energy Inc.</span></span>
            </Link>
            <p>Canadian-engineered power distribution equipment — designed, manufactured, assembled, and tested entirely in-house.</p>
            <div className="footer-newsletter">
              {subscribed ? (
                <p style={{color:'rgba(77,138,255,.9)',fontSize:'.82rem',fontWeight:600}}>✓ You&apos;re subscribed. Thanks!</p>
              ) : (
                <>
                  <p>Stay updated</p>
                  <form className="fnews-row" onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      aria-label="Email address for newsletter"
                    />
                    <button type="submit">Subscribe</button>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="footer-col">
            <h5>Products</h5>
            <ul>
              <li><Link href="/products#switchgear">Switchgear</Link></li>
              <li><Link href="/products#switchboards">Switchboards &amp; Panelboards</Link></li>
              <li><Link href="/products#controlpanels">Control Panels</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Capabilities</h5>
            <ul>
              <li><Link href="/manufacturing">Manufacturing</Link></li>
              <li><Link href="/testing">Testing</Link></li>
              <li><Link href="/commissioning">Commissioning</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="tel:+16476162595">+1 (647) 616-2595</a></li>
              <li><a href="mailto:sales@candron.com">sales@candron.com</a></li>
              <li><Link href="/contact">Request a Quote</Link></li>
              <li><span style={{fontSize:'.8rem',color:'var(--gray)',lineHeight:'1.5'}}>North York, Ontario<br/>Canada</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Candron Energy Inc. All rights reserved. Proudly Canadian.</p>
          <p>North York, Ontario, Canada</p>
        </div>
      </div>
    </footer>
  )
}
