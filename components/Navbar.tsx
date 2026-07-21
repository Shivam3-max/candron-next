'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/resources', label: 'Resources' },
  { href: '/company', label: 'Company' },
]

const companyItems = [
  {
    href: '/manufacturing',
    label: 'Manufacturing',
    desc: 'In-house fabrication, assembly, and quality control',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  },
  {
    href: '/testing',
    label: 'Testing',
    desc: 'IEEE/NETA certified high-voltage test facility',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>,
  },
  {
    href: '/commissioning',
    label: 'Commissioning',
    desc: 'Field installation, startup, and site acceptance testing',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  },
  {
    href: '/about',
    label: 'About',
    desc: 'Our story, leadership team, and company values',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
]

const productItems = [
  {
    href: '/products/mv-switchgear',
    name: 'MV Switchgear',
    sub: '1 kV to 36 kV',
    desc: 'Custom metal-clad and pad-mounted switchgear from 1 kV to 36 kV with VCBs, load break switches, and integrated protection relays.',
    image: '/images/switchgear.jpg',
    types: [
      { name: 'Metal-Clad', href: '/products/switchgear/metal-clad', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="9" y1="9" x2="9" y2="22"/></svg> },
      { name: 'Pad-Mounted', href: '/products/switchgear/load-interrupter', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M7 8V5a5 5 0 0 1 10 0v3"/></svg> },
      { name: 'Load-Interrupter', href: '/products/switchgear/load-interrupter', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg> },
      { name: 'Service-Entrance', href: '/products/switchgear/service-entrance', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 9h3M15 12h3M15 15h3"/></svg> },
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    href: '/products/lv-switchgear',
    name: 'LV Switchgear',
    sub: 'Up to 1000 V',
    desc: 'Low voltage switchgear up to 1,000 V — main breaker, main-tie-main, service entrance, and distribution configurations.',
    image: '/images/switchboards.jpg',
    types: [
      { name: 'Main Breaker', href: '/products/switchgear/low-voltage', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><circle cx="7" cy="12" r="2" fill="currentColor" stroke="none"/></svg> },
      { name: 'Main-Tie-Main', href: '/products/switchgear/low-voltage', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h6v12H4zM14 6h6v12h-6z"/><line x1="10" y1="12" x2="14" y2="12"/></svg> },
      { name: 'Service Entrance', href: '/products/switchgear/service-entrance', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 9h3M15 12h3M15 15h3"/></svg> },
      { name: 'Distribution', href: '/products/switchgear/low-voltage', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v4M12 7l-6 4M12 7l6 4M6 11v6M18 11v6"/></svg> },
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <line x1="9" y1="9" x2="9" y2="22" />
      </svg>
    ),
  },
  {
    href: '/products/junction-box-splitters',
    name: 'Junction Box & Splitters',
    sub: 'LV & MV Power Distribution',
    desc: 'Industrial junction boxes and power splitters from LV up to 1,000 V and MV up to 35 kV — NEMA-rated, weatherproof, and explosion-proof.',
    image: '/images/switchgear.jpg',
    types: [
      { name: 'LV Junction Box', href: '/products/junction-box-splitters', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
      { name: 'MV Junction Box', href: '/products/junction-box-splitters', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M7 8V5a5 5 0 0 1 10 0v3"/></svg> },
      { name: 'LV Splitter', href: '/products/junction-box-splitters', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v4M12 7l-6 4M12 7l6 4M6 11v6M18 11v6"/></svg> },
      { name: 'MV Splitter', href: '/products/junction-box-splitters', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg> },
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    href: '/products/switchboards',
    name: 'Switchboards',
    sub: 'Low Voltage Distribution',
    desc: 'Custom switchboards up to 4000 A at 600 V for commercial, industrial, and infrastructure applications.',
    image: '/images/switchboards.jpg',
    types: [
      { name: 'Main Breaker', href: '/products/switchboards/main-breaker', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><circle cx="7" cy="12" r="2" fill="currentColor" stroke="none"/></svg> },
      { name: 'Main-Tie-Main', href: '/products/switchboards/main-tie-main', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h6v12H4zM14 6h6v12h-6z"/><line x1="10" y1="12" x2="14" y2="12"/></svg> },
      { name: 'Distribution', href: '/products/switchboards/distribution', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v4M12 7l-6 4M12 7l6 4M6 11v6M18 11v6"/></svg> },
      { name: 'Utility-Approved', href: '/products/switchboards/utility-approved', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> },
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    href: '/products/transformers',
    name: 'Transformers',
    sub: '1 VA – 100+ MVA',
    desc: 'Liquid-filled and dry-type transformers from distribution to power class — padmount, substation, LV dry-type, and MV dry-type.',
    image: '/images/tx-placeholder.svg',
    types: [
      { name: 'Padmount', href: '/products/transformers/padmount', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V5a4 4 0 0 1 8 0v3"/><line x1="12" y1="11" x2="12" y2="17"/></svg> },
      { name: 'Substation', href: '/products/transformers/substation', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v18M16 3v18M2 12h20"/></svg> },
      { name: 'LV Dry-Type', href: '/products/transformers/dry-type-lv', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="21"/></svg> },
      { name: 'MV Dry-Type', href: '/products/transformers/dry-type-mv', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="3" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="21" />
        <line x1="3" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [prodOpen, setProdOpen] = useState(false)
  const [mobileProdOpen, setMobileProdOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)
  const [hoveredProd, setHoveredProd] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60)
    const t = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    return () => { cancelAnimationFrame(t); window.removeEventListener('scroll', update) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const headerClass = ['dark-nav', scrolled ? 'scrolled' : 'at-top'].join(' ')
  const isProductsActive = pathname === '/products' || pathname.startsWith('/products/')
  const isCompanyActive = companyItems.some(c => pathname === c.href || pathname.startsWith(c.href + '/'))

  const p = productItems[hoveredProd]

  return (
    <>
      <header className={headerClass}>
        <div className="nav-inner">
          <Link href="/" className="logo" aria-label="Candron Energy Inc. — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="" className="logo-img" />
          </Link>

          <nav aria-label="Main navigation">
            {links.map(l => {
              if (l.href === '/company') {
                return (
                  <div
                    key="/company"
                    className={`nav-dd-wrap${companyOpen ? ' open' : ''}`}
                    onMouseEnter={() => setCompanyOpen(true)}
                    onMouseLeave={() => setCompanyOpen(false)}
                  >
                    <a
                      href="#"
                      onClick={e => e.preventDefault()}
                      className={`nav-dd-link${isCompanyActive ? ' active' : ''}`}
                      aria-haspopup="true"
                      aria-expanded={companyOpen}
                    >
                      Company
                      <svg className="nav-dd-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <div className={`nav-company-dropdown${companyOpen ? ' open' : ''}`} role="menu">
                      {companyItems.map(c => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`nav-company-item${pathname === c.href ? ' active' : ''}`}
                          onClick={() => setCompanyOpen(false)}
                          role="menuitem"
                        >
                          <span className="nav-company-icon">{c.icon}</span>
                          <span className="flex flex-col gap-[.15rem]">
                            <span className="nav-company-label">{c.label}</span>
                            <span className="nav-company-desc">{c.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              if (l.href !== '/products') {
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={pathname === l.href ? 'active' : ''}
                    aria-current={pathname === l.href ? 'page' : undefined}
                  >
                    {l.label}
                  </Link>
                )
              }

              return (
                <div
                  key="/products"
                  className={`nav-dd-wrap${prodOpen ? ' open' : ''}`}
                  onMouseEnter={() => setProdOpen(true)}
                  onMouseLeave={() => { setProdOpen(false); setHoveredProd(0) }}
                >
                  <Link
                    href="/products"
                    className={isProductsActive ? 'active' : ''}
                    aria-current={isProductsActive ? 'page' : undefined}
                    aria-haspopup="true"
                    aria-expanded={prodOpen}
                  >
                    Products
                    <svg
                      className="nav-dd-chevron"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  {/* MEGA DROPDOWN */}
                  <div className={`nav-dropdown${prodOpen ? ' open' : ''}`} role="menu">
                    <div className="nav-mega-inner">

                      {/* Sidebar */}
                      <div className="nav-mega-sidebar">
                        {productItems.map((item, i) => {
                          const active = hoveredProd === i
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`nav-mega-item ${active ? 'bg-blue' : 'bg-transparent'}`}
                              onMouseEnter={() => setHoveredProd(i)}
                              onClick={() => { setProdOpen(false); setHoveredProd(0) }}
                              role="menuitem"
                            >
                              <span className={`nav-mega-icon ${active ? 'bg-white/[.18] text-white' : 'bg-white/[.08] text-blue'}`}>
                                {item.icon}
                              </span>
                              <span className="flex-1 text-white leading-[1.3]">{item.name}</span>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" className={`${active ? 'opacity-100' : 'opacity-0'} shrink-0`}>
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </Link>
                          )
                        })}
                        <div className="nav-mega-footer">
                          <Link href="/products" className="nav-mega-all" onClick={() => { setProdOpen(false); setHoveredProd(0) }}>
                            VIEW ALL PRODUCTS →
                          </Link>
                        </div>
                      </div>

                      {/* Preview Panel */}
                      <div className="nav-mega-preview">
                        <div key={hoveredProd} className="nav-mega-preview-inner nav-mega-preview-fade">
                          {/* Top: title + desc on left, image on right */}
                          <div className="nav-mega-preview-header">
                            <div className="nav-mega-preview-text">
                              <div className="nav-mega-preview-name">{p.name}</div>
                              <span className="nav-mega-preview-sub">{p.sub}</span>
                              <p className="nav-mega-preview-desc">{p.desc}</p>
                            </div>
                            <div className="nav-mega-img-wrap">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.image} alt={p.name} className="nav-mega-img" />
                            </div>
                          </div>
                          {/* 2×2 type link tiles */}
                          <div className="nav-mega-type-grid">
                            {p.types.map(t => (
                              <Link
                                key={t.name}
                                href={t.href}
                                className="nav-mega-type-link"
                                onClick={() => { setProdOpen(false); setHoveredProd(0) }}
                              >
                                <span className="nav-mega-type-icon">{t.icon}</span>
                                <span className="nav-mega-type-name flex-1 font-mono text-[.58rem] font-bold tracking-[.04em] uppercase">{t.name}</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
                              </Link>
                            ))}
                          </div>
                          {/* VIEW ALL button */}
                          <Link
                            href={p.href}
                            className="btn btn-primary nav-mega-btn"
                            onClick={() => { setProdOpen(false); setHoveredProd(0) }}
                          >
                            VIEW ALL →
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
            <Link href="/contact" className="nav-cta">Contact Us</Link>
          </nav>

          <button
            className="ham"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
      >
        <button className="mobile-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>✕</button>
        {links.map(l => {
          if (l.href === '/company') {
            return (
              <div key="/company" className="mobile-products-group">
                <button
                  className={`mobile-products-toggle${isCompanyActive ? ' active' : ''}`}
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  aria-expanded={mobileCompanyOpen}
                >
                  Company
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`mobile-prod-chevron${mobileCompanyOpen ? ' rotated' : ''}`} aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`mobile-products-dropdown${mobileCompanyOpen ? ' open' : ''}`}>
                  <div className="mobile-products-list">
                    {companyItems.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className={`mobile-products-item${pathname === c.href ? ' active' : ''}`}
                      >
                        <span className="mobile-products-icon">{c.icon}</span>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          if (l.href === '/products') {
            return (
              <div key="/products" className="mobile-products-group">
                <button
                  className={`mobile-products-toggle${isProductsActive ? ' active' : ''}`}
                  onClick={() => setMobileProdOpen(!mobileProdOpen)}
                  aria-expanded={mobileProdOpen}
                >
                  {l.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`mobile-prod-chevron${mobileProdOpen ? ' rotated' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`mobile-products-dropdown${mobileProdOpen ? ' open' : ''}`}>
                  <div className="mobile-products-list">
                    <Link
                      href="/products"
                      onClick={() => setMobileOpen(false)}
                      className={`mobile-products-all${pathname === '/products' ? ' active' : ''}`}
                    >
                      All Products
                    </Link>
                    {productItems.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`mobile-products-item${pathname === item.href || pathname.startsWith(item.href + '/') ? ' active' : ''}`}
                      >
                        <span className="mobile-products-icon">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={pathname === l.href ? 'active' : ''}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          )
        })}
        <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
      </div>
    </>
  )
}
