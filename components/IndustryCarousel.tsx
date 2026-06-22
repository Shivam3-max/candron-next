'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const INDUSTRIES = [
  {
    n: '01', name: 'Oil & Gas',
    img: '/images/oil-gas.jpg',
    desc: 'Class I, Div 1 & 2 rated equipment for upstream, midstream, and downstream facilities.',
    href: '/industries#oilgas',
  },
  {
    n: '02', name: 'Mining',
    img: '/images/mining.jpg',
    desc: 'Ruggedized electrical infrastructure for underground and surface mine environments.',
    href: '/industries#mining',
  },
  {
    n: '03', name: 'Power & Renewables',
    img: '/images/renewable-energy.jpg',
    desc: 'Grid-scale switchgear and distribution for wind, solar, and battery storage projects.',
    href: '/industries#power',
  },
  {
    n: '04', name: 'AI Data Centers',
    img: '/images/data-centers.jpg',
    desc: 'Zero-downtime power distribution for hyperscale and colocation data center facilities.',
    href: '/industries#datacenters',
  },
  {
    n: '05', name: 'Healthcare',
    img: '/images/healthcare.jpg',
    desc: 'Life-safety critical power infrastructure to NFPA 99 and CSA Z32 standards.',
    href: '/industries#healthcare',
  },
  {
    n: '06', name: 'Utilities',
    img: '/images/utilities.jpg',
    desc: 'Grid-scale switchgear and distribution infrastructure for power utilities and substations.',
    href: '/industries#power',
  },
  {
    n: '07', name: 'Transportation',
    img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80&auto=format&fit=crop',
    desc: 'Traction power, transit substations, and EV charging infrastructure for modern transit.',
    href: '/industries#transportation',
  },
  {
    n: '08', name: 'Traction Power',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80&auto=format&fit=crop',
    desc: 'Railway electrification at 25 Hz and 50 Hz for mainline and commuter rail systems.',
    href: '/industries#traction-power',
  },
  {
    n: '09', name: 'Transit Substations',
    img: 'https://images.pexels.com/photos/2031758/pexels-photo-2031758.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'LRT, metro, and urban rail DC traction substations for transit authorities.',
    href: '/industries#transit-substations',
  },
  {
    n: '10', name: 'EV Charging',
    img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80&auto=format&fit=crop',
    desc: 'MW-scale electrical infrastructure for EV charging hubs and fleet electrification depots.',
    href: '/industries#ev-charging',
  },
  {
    n: '11', name: 'Port Electrification',
    img: 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Shore power and cold-ironing infrastructure for marine terminals and port facilities.',
    href: '/industries#port-electrification',
  },
  {
    n: '12', name: 'Industrial Manufacturing',
    img: 'https://images.pexels.com/photos/11958381/pexels-photo-11958381.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Motor control centres, drive panels, and power distribution for production facilities.',
    href: '/industries',
  },
  {
    n: '13', name: 'Commercial Buildings',
    img: 'https://images.pexels.com/photos/332966/pexels-photo-332966.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Main switchboards, sub-distribution, and metering for office towers and mixed-use developments.',
    href: '/industries',
  },
  {
    n: '14', name: 'Water & Wastewater',
    img: 'https://images.pexels.com/photos/3808769/pexels-photo-3808769.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Control panels, pump motor starters, and SCADA-integrated switchgear for municipal water infrastructure.',
    href: '/industries',
  },
  {
    n: '15', name: 'Government & Defence',
    img: 'https://images.pexels.com/photos/959570/bundestag-dome-reichstag-bundestagswahl-959570.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Mission-critical power distribution for federal facilities, military bases, and secure installations.',
    href: '/industries',
  },
  {
    n: '16', name: 'Pulp & Paper',
    img: 'https://images.pexels.com/photos/14450964/pexels-photo-14450964.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Heavy-duty switchgear, MCC, and drive systems for pulp mills and paper processing plants.',
    href: '/industries',
  },
  {
    n: '17', name: 'Chemical Processing',
    img: 'https://images.pexels.com/photos/5884386/pexels-photo-5884386.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Hazardous-location rated electrical equipment for refineries and chemical plant environments.',
    href: '/industries',
  },
]

const AUTO_INTERVAL = 3200

export default function IndustryCarousel() {
  const trackRef     = useRef<HTMLDivElement>(null)
  const firstCardRef = useRef<HTMLAnchorElement | null>(null)
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null)
  const paused       = useRef(false)

  const [progress, setProgress] = useState(0)
  const [canPrev, setCanPrev]   = useState(false)
  const [canNext, setCanNext]   = useState(true)

  const dragging     = useRef(false)
  const startX       = useRef(0)
  const scrollOrigin = useRef(0)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setCanPrev(el.scrollLeft > 2)
    setCanNext(el.scrollLeft < max - 2)
  }, [])

  const cardStep = useCallback(() => {
    const el   = trackRef.current
    const card = firstCardRef.current
    if (!el) return
    const w   = card ? card.offsetWidth + 20 : 340
    const max = el.scrollWidth - el.clientWidth
    if (el.scrollLeft >= max - 2) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: w, behavior: 'smooth' })
    }
  }, [])

  // Auto-scroll loop
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!paused.current) cardStep()
    }, AUTO_INTERVAL)
  }, [cardStep])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', sync, { passive: true })
    const t = requestAnimationFrame(() => sync())
    startTimer()
    return () => {
      cancelAnimationFrame(t)
      el.removeEventListener('scroll', sync)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [sync, startTimer])

  const step = (dir: 1 | -1) => {
    const el   = trackRef.current
    const card = firstCardRef.current
    if (!el) return
    const w = card ? card.offsetWidth + 20 : 340
    el.scrollBy({ left: dir * w, behavior: 'smooth' })
    // Reset timer so auto-scroll doesn't fire right after manual nav
    startTimer()
  }

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    startX.current   = e.clientX
    scrollOrigin.current = trackRef.current?.scrollLeft ?? 0
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing'
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !trackRef.current) return
    trackRef.current.scrollLeft = scrollOrigin.current - (e.clientX - startX.current)
  }

  const stopDrag = () => {
    if (dragging.current) startTimer() // reset timer after drag
    dragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  const pause  = () => { paused.current = true }
  const resume = () => { paused.current = false }

  return (
    <div
      style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="ind-carousel-track"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '1.25rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          cursor: 'grab',
          userSelect: 'none',
          flex: 1,
          minHeight: 0,
        }}
      >
        {INDUSTRIES.map((ind, i) => (
          <Link
            key={ind.n}
            ref={i === 0 ? firstCardRef : undefined}
            href={ind.href}
            className="ind-carousel-card"
            style={{
              flexShrink: 0,
              width: 'clamp(240px, calc(85vw - 1.25rem), 300px)',
              height: '100%',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              scrollSnapAlign: 'start',
              display: 'block',
              textDecoration: 'none',
            }}
          >
            <Image
              src={ind.img}
              alt={ind.name}
              fill
              className="ind-carousel-img"
              style={{ objectFit: 'cover' }}
              sizes="(max-width:640px) 85vw, 300px"
              draggable={false}
            />

            {/* Gradient scrim */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(5,9,31,.08) 0%, transparent 30%, rgba(5,9,31,.9) 100%)',
            }} />

            {/* Number badge */}
            <div style={{
              position: 'absolute',
              top: '1.1rem',
              left: '1.1rem',
              fontFamily: 'var(--fd)',
              fontWeight: 900,
              fontSize: '.52rem',
              letterSpacing: '.2em',
              color: 'rgba(255,255,255,.75)',
              textTransform: 'uppercase',
              padding: '.28rem .7rem',
              border: '1px solid rgba(255,255,255,.22)',
              borderRadius: '999px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(5,9,31,.25)',
            }}>
              {ind.n}
            </div>

            {/* Bottom content */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.4rem' }}>
              <div style={{
                fontFamily: 'var(--fd)',
                fontWeight: 800,
                color: '#fff',
                fontSize: '1.08rem',
                lineHeight: 1.22,
                marginBottom: '.5rem',
              }}>
                {ind.name}
              </div>
              <div style={{
                color: 'rgba(255,255,255,.6)',
                fontSize: '.78rem',
                lineHeight: 1.65,
                marginBottom: '.85rem',
              }}>
                {ind.desc}
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.35rem',
                color: 'var(--blue)',
                fontSize: '.7rem',
                fontFamily: 'var(--fm)',
                fontWeight: 700,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
              }}>
                Explore
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Controls row */}
      <div style={{ flexShrink: 0, paddingTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Prev */}
        <button
          onClick={() => step(-1)}
          aria-label="Previous industry"
          style={{
            width: '42px', height: '42px', borderRadius: '50%',
            border: `1.5px solid ${canPrev ? 'var(--blue)' : '#D1D9F0'}`,
            background: canPrev ? 'var(--blue)' : 'transparent',
            color: canPrev ? '#fff' : '#C7D2FE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: canPrev ? 'pointer' : 'default',
            transition: 'background .2s, border-color .2s, color .2s',
            flexShrink: 0, padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={() => step(1)}
          aria-label="Next industry"
          style={{
            width: '42px', height: '42px', borderRadius: '50%',
            border: `1.5px solid ${canNext ? 'var(--blue)' : '#D1D9F0'}`,
            background: canNext ? 'var(--blue)' : 'transparent',
            color: canNext ? '#fff' : '#C7D2FE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: canNext ? 'pointer' : 'default',
            transition: 'background .2s, border-color .2s, color .2s',
            flexShrink: 0, padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Progress bar */}
        <div style={{ flex: 1, height: '3px', background: '#E0E7FF', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            background: 'var(--blue)',
            borderRadius: '999px',
            width: `${(progress * 100).toFixed(2)}%`,
            transition: 'width .12s linear',
          }} />
        </div>

        {/* Count */}
        <div style={{
          fontFamily: 'var(--fm)',
          fontSize: '.62rem',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: '#9CA3AF',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          {INDUSTRIES.length} Sectors
        </div>
      </div>
    </div>
  )
}
