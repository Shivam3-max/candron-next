'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/testing', label: 'Testing' },
  { href: '/commissioning', label: 'Commissioning' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const headerClass = ['dark-nav', scrolled ? 'scrolled' : 'at-top'].join(' ')
  const mobileNavId = 'mobile-nav'

  return (
    <>
      <header className={headerClass}>
        <div className="nav-inner">
          <Link href="/" className="logo" aria-label="Candron Energy Inc. — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="" className="logo-img" />
          </Link>

          <nav aria-label="Main navigation">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''} aria-current={pathname === l.href ? 'page' : undefined}>{l.label}</Link>
            ))}
            <Link href="/contact" className="nav-cta">Contact Us</Link>
          </nav>

          <button
            className="ham"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls={mobileNavId}
            onClick={() => setMobileOpen(true)}
          >
            <span/><span/><span/>
          </button>
        </div>
      </header>

      <div
        id={mobileNavId}
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
      >
        <button className="mobile-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>✕</button>
        {links.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
            className={pathname === l.href ? 'active' : ''}
            aria-current={pathname === l.href ? 'page' : undefined}
          >{l.label}</Link>
        ))}
        <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
      </div>
    </>
  )
}
