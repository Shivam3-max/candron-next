'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CanadaFlag from '@/components/CanadaFlag'

// Header nav boxes, left to right. `menu` marks the boxes that open a dropdown.
const links = [
  { href: '/products', label: 'Products', caption: 'Full catalogue', menu: 'products' },
  { href: '/capabilities', label: 'Capabilities', caption: 'What we do', menu: 'capabilities' },
  { href: '/industries', label: 'Industries', caption: 'Sectors we serve' },
  { href: '/about', label: 'About', caption: 'Company & team' },
  { href: '/resources', label: 'Resources', caption: 'Calculators & tools' },
  { href: '/contact', label: 'Contact', caption: 'Talk to our team' },
] as const

const PHONE_HREF = 'tel:+16476162595'
const PHONE_LABEL = '+1 (647) 616-2595'

const mobileNavIcons = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5M9 21v-7h6v7"/></svg>,
  products: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z"/><path d="m4 12 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5"/></svg>,
  services: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-8.4 8.4-2.1-2.1a4 4 0 0 0 5 5l8.4-8.4Z"/><path d="m13 11 8 8-2 2-8-8"/></svg>,
  resources: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h7"/></svg>,
  industries: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 21V9l6 4V9l6 4V3h6v18H3z"/></svg>,
  contact: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 5h16v12H8l-4 4V5Z"/><path d="M8 10h8M8 13h5"/></svg>,
  company: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-4 2.7-7 6-7s6 3 6 7M15 14c3.2 0 5 2.3 5 5.5"/></svg>,
}

const mobileChevron = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const capabilitiesItems = [
  {
    href: '/services',
    label: 'Electrical Engineering Services',
    desc: 'Studies, coordination, equipment design, and documentation',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>,
  },
  {
    href: '/commissioning',
    label: 'Field Service & Commissioning',
    desc: 'Installation support, field testing, and commissioning',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-8.4 8.4-2.1-2.1a4 4 0 0 0 5 5l8.4-8.4z"/><path d="M13 11l8 8-2 2-8-8"/></svg>,
  },
  {
    href: '/manufacturing',
    label: 'Manufacturing',
    desc: 'Canadian production, assembly, and quality control',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21V9l6 4V9l6 4V3h6v18H3z"/></svg>,
  },
  {
    href: '/testing',
    label: 'Testing',
    desc: 'Factory verification and documented test results',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2v6l-5 9a3 3 0 0 0 2.6 5h10.8a3 3 0 0 0 2.6-5l-5-9V2"/><path d="M7 14h10"/></svg>,
  },
  {
    href: '/project-process',
    label: 'CANDRON Processes',
    desc: 'The complete project cycle from design to delivery',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5h10a4 4 0 0 1 4 4v1"/><path d="M16 7l3 3 3-3M19 19H9a4 4 0 0 1-4-4v-1"/><path d="M8 17l-3-3-3 3"/></svg>,
  },
]

const productItems = [
  {
    href: '/products/switchgear',
    name: 'MV Switchgear',
    sub: '2.4 kV to 38 kV • 2000 A',
    desc: 'Custom metal-clad and pad-mounted switchgear from 2.4 kV to 38 kV, rated up to 2000 A, with VCBs, load break switches, and integrated protection relays.',
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
    image: '/images/products/transformers/padmount-three-phase.webp',
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
  {
    href: '/products/power-distribution',
    name: 'Critical Power',
    sub: 'Load Testing & Distribution',
    desc: 'Load banks, remote power panels, and transformer-based power distribution units for data centres, generators, UPS systems, and critical facilities.',
    image: '/images/products/power-distribution/power-distribution-unit.webp',
    types: [
      { name: 'Load Banks', href: '/products/load-banks', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg> },
      { name: 'Remote Power Panels', href: '/products/remote-power-panels', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
      { name: 'Power Distribution Units', href: '/products/power-distribution-units', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="12" r="4"/><circle cx="16" cy="12" r="4"/><path d="M2 12h2M20 12h2"/></svg> },
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
]


// Phrases complete the sentence "We are …" in the header tagline.
const TAGLINES = [
  'fast at our service.',
  'engineered & manufactured in Canada.',
  'on call 24/7 for emergency response.',
  'ready with in-stock equipment in Toronto.',
  'building to CSA, UL & IEEE standards.',
  'testing every unit before it ships.',
  'quoting the same day you ask.',
]

function TaglineTicker() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(TAGLINES[0])
  const [phase, setPhase] = useState<'hold' | 'erase' | 'type'>('hold')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = TAGLINES[index]
    let t: ReturnType<typeof setTimeout>
    if (reduced) {
      t = setTimeout(() => { const n = (index + 1) % TAGLINES.length; setIndex(n); setText(TAGLINES[n]) }, 3600)
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('erase'), 2600)
    } else if (phase === 'erase') {
      t = text.length
        ? setTimeout(() => setText(text.slice(0, -1)), 22)
        : setTimeout(() => { setIndex((index + 1) % TAGLINES.length); setPhase('type') }, 180)
    } else {
      t = text.length < target.length
        ? setTimeout(() => setText(target.slice(0, text.length + 1)), 42)
        : setTimeout(() => setPhase('hold'), 60)
    }
    return () => clearTimeout(t)
  }, [index, text, phase])

  return (
    <p className="hdr-tagline">
      <span className="sr-only">We are fast at our service, engineered and manufactured in Canada, and on call 24/7.</span>
      <span aria-hidden="true">
        <span className="hdr-tagline-lead">We are</span>{' '}
        <span className="hdr-tagline-word">{text}</span>
        <span className="hdr-tagline-caret" />
      </span>
    </p>
  )
}

const phoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
  </svg>
)

const chevronDown = (
  <svg className="hdr-box-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Navbar() {
  const [compact, setCompact] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<'products' | 'capabilities' | null>(null)
  const [mobileMenu, setMobileMenu] = useState<'products' | 'capabilities' | null>(null)
  const [hoveredProd, setHoveredProd] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 80)
    const t = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    return () => { cancelAnimationFrame(t); window.removeEventListener('scroll', update) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMobileOpen(false); setOpenMenu(null) }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === '/products') return pathname === '/products' || pathname.startsWith('/products/') || pathname.startsWith('/inventory')
    if (href === '/capabilities') return capabilitiesItems.some(c => pathname === c.href || pathname.startsWith(c.href + '/'))
    return pathname === href || pathname.startsWith(href + '/')
  }
  const closeMenus = () => { setOpenMenu(null); setHoveredProd(0) }
  const p = productItems[hoveredProd]

  const productsMenu = (
    <div className={`nav-dropdown hdr-dropdown${openMenu === 'products' ? ' open' : ''}`} role="menu">
      <div className="nav-mega-inner">
        <div className="nav-mega-sidebar">
          {productItems.map((item, i) => {
            const active = hoveredProd === i
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-mega-item ${active ? 'bg-blue' : 'bg-transparent'}`}
                onMouseEnter={() => setHoveredProd(i)}
                onFocus={() => setHoveredProd(i)}
                onClick={closeMenus}
                role="menuitem"
              >
                <span className={`nav-mega-icon ${active ? 'bg-white/[.18] text-white' : 'bg-white/[.08] text-blue'}`}>{item.icon}</span>
                <span className="flex-1 text-white leading-[1.3]">{item.name}</span>
              </Link>
            )
          })}
          <div className="nav-mega-footer">
            <Link href="/products" className="nav-mega-all" onClick={closeMenus}>VIEW ALL PRODUCTS →</Link>
            <Link href="/inventory" className="nav-mega-all nav-mega-stock" onClick={closeMenus}>IN-STOCK INVENTORY →</Link>
          </div>
        </div>
        <div className="nav-mega-preview">
          <div key={hoveredProd} className="nav-mega-preview-inner nav-mega-preview-fade">
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
            <div className="nav-mega-type-grid">
              {p.types.map(t => (
                <Link key={t.name} href={t.href} className="nav-mega-type-link" onClick={closeMenus}>
                  <span className="nav-mega-type-icon">{t.icon}</span>
                  <span className="nav-mega-type-name flex-1">{t.name}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
                </Link>
              ))}
            </div>
            <Link href={p.href} className="btn btn-primary nav-mega-btn" onClick={closeMenus}>VIEW ALL →</Link>
          </div>
        </div>
      </div>
    </div>
  )

  const capabilitiesMenu = (
    <div className={`nav-company-dropdown hdr-dropdown${openMenu === 'capabilities' ? ' open' : ''}`} role="menu">
      {capabilitiesItems.map(c => (
        <Link
          key={c.href}
          href={c.href}
          className={`nav-company-item${pathname === c.href ? ' active' : ''}`}
          onClick={closeMenus}
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
  )

  return (
    <>
      <header className={`site-hdr${compact ? ' is-compact' : ''}`}>
        <div className="hdr-shell">
          <Link href="/" className="hdr-logo" aria-label="CANDRON Energy Inc. — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="" />
          </Link>

          <div className="hdr-main">
            <div className="hdr-top">
              <TaglineTicker />
              <div className="hdr-top-actions">
                <a className="hdr-call" href={PHONE_HREF} aria-label={`Call CANDRON at ${PHONE_LABEL}`}>
                  <span className="hdr-call-icon">{phoneIcon}</span>
                  <span className="hdr-call-text"><small>Call us now · 24/7</small><strong>{PHONE_LABEL}</strong></span>
                </a>
                <Link href="/contact" className="hdr-quote">Request a Quote</Link>
              </div>
            </div>

            <nav className="hdr-nav" aria-label="Main navigation">
              {links.map((l, i) => {
                const active = isActive(l.href)
                const num = String(i + 1).padStart(2, '0')
                const body = (
                  <>
                    <span className="hdr-box-num">{num}</span>
                    <span className="hdr-box-text">
                      <span className="hdr-box-label">{l.label}</span>
                      <span className="hdr-box-caption">{l.caption}</span>
                    </span>
                  </>
                )
                if ('menu' in l) {
                  const open = openMenu === l.menu
                  return (
                    <div
                      key={l.href}
                      className={`hdr-box-wrap${open ? ' open' : ''}`}
                      onMouseEnter={() => setOpenMenu(l.menu)}
                      onMouseLeave={closeMenus}
                    >
                      {l.menu === 'products' ? (
                        <Link
                          href="/products"
                          className={`hdr-box${active ? ' active' : ''}`}
                          aria-current={pathname === '/products' ? 'page' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open}
                          onFocus={() => setOpenMenu('products')}
                        >
                          {body}{chevronDown}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className={`hdr-box${active ? ' active' : ''}`}
                          aria-haspopup="true"
                          aria-expanded={open}
                          onClick={() => setOpenMenu(open ? null : 'capabilities')}
                        >
                          {body}{chevronDown}
                        </button>
                      )}
                      {l.menu === 'products' ? productsMenu : capabilitiesMenu}
                    </div>
                  )
                }
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`hdr-box${active ? ' active' : ''}${l.href === '/contact' ? ' hdr-box-contact' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {body}
                  </Link>
                )
              })}
              <a className="hdr-nav-call" href={PHONE_HREF} aria-label={`Call CANDRON at ${PHONE_LABEL}`}>{phoneIcon}</a>
            </nav>
          </div>

          <div className="hdr-mobile-actions">
            <a className="hdr-mobile-call" href={PHONE_HREF} aria-label={`Call CANDRON at ${PHONE_LABEL}`}>{phoneIcon}<span>Call</span></a>
            <button
              className="hdr-ham"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => { setMobileOpen(true); setMobileMenu(isActive('/capabilities') ? 'capabilities' : null) }}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className="hdr-mobile-tagline"><TaglineTicker /></div>
      </header>

      <button
        className={`mobile-nav-backdrop${mobileOpen ? ' open' : ''}`}
        aria-label="Close navigation menu"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        id="mobile-nav"
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav-header">
          <Link href="/" className="mobile-nav-logo" aria-label="CANDRON Energy Inc. — Home" onClick={() => setMobileOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="CANDRON Energy Inc." />
          </Link>
          <button className="mobile-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </div>

        <div className="mobile-nav-kicker">Navigation</div>
        <div className="mobile-nav-menu">
          <Link href="/" onClick={() => setMobileOpen(false)} className={`mobile-nav-main-item${pathname === '/' ? ' active' : ''}`} aria-current={pathname === '/' ? 'page' : undefined}>
            <span className="mobile-nav-main-icon">{mobileNavIcons.home}</span>
            <span>Home</span>
            <span className="mobile-nav-link-chevron">{mobileChevron}</span>
          </Link>
          {links.map(l => {
            if ('menu' in l) {
              const open = mobileMenu === l.menu
              const items = l.menu === 'products'
                ? productItems.map(item => ({ href: item.href, label: item.name, icon: item.icon }))
                : capabilitiesItems.map(c => ({ href: c.href, label: c.label, icon: c.icon }))
              return (
                <div key={l.href} className="mobile-products-group">
                  <button
                    className={`mobile-products-toggle${isActive(l.href) ? ' active' : ''}${open ? ' expanded' : ''}`}
                    onClick={() => setMobileMenu(open ? null : l.menu)}
                    aria-expanded={open}
                  >
                    <span className="mobile-nav-main-icon">{l.menu === 'products' ? mobileNavIcons.products : mobileNavIcons.services}</span>
                    <span>{l.label}</span>
                    <span className={`mobile-prod-chevron${open ? ' rotated' : ''}`}>{mobileChevron}</span>
                  </button>
                  <div className={`mobile-products-dropdown${open ? ' open' : ''}`}>
                    <div className="mobile-products-list">
                      {l.menu === 'products' && (
                        <>
                          <Link href="/products" onClick={() => setMobileOpen(false)} className={`mobile-products-all${pathname === '/products' ? ' active' : ''}`}>
                            All Products
                          </Link>
                          <Link href="/inventory" onClick={() => setMobileOpen(false)} className={`mobile-products-all${pathname.startsWith('/inventory') ? ' active' : ''}`}>
                            In-Stock Inventory
                          </Link>
                        </>
                      )}
                      {items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`mobile-products-item${pathname === item.href || pathname.startsWith(item.href + '/') ? ' active' : ''}`}
                        >
                          <span className="mobile-products-icon">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
            const icon = l.href === '/industries' ? mobileNavIcons.industries
              : l.href === '/about' ? mobileNavIcons.company
              : l.href === '/contact' ? mobileNavIcons.contact
              : mobileNavIcons.resources
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`mobile-nav-main-item${isActive(l.href) ? ' active' : ''}`}
                aria-current={isActive(l.href) ? 'page' : undefined}
              >
                <span className="mobile-nav-main-icon">{icon}</span>
                <span>{l.label}</span>
                <span className="mobile-nav-link-chevron">{mobileChevron}</span>
              </Link>
            )
          })}
        </div>

        <div className="mobile-nav-footer">
          <Link href="/inventory" className="mobile-nav-contact" onClick={() => setMobileOpen(false)}>Shop 600V</Link>
          <a className="mobile-nav-emergency" href={PHONE_HREF}>
            <span className="mobile-nav-emergency-icon">{phoneIcon}</span>
            <span><small>24/7 Emergency Response</small><strong>{PHONE_LABEL}</strong></span>
          </a>
          <div className="mobile-nav-canada">
            <CanadaFlag height={24} />
            <span>Engineered &amp; Manufactured<br />in Canada</span>
          </div>
        </div>
      </aside>
    </>
  )
}
