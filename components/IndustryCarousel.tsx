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
    img: '/images/industries/transportation.jpg',
    desc: 'Traction power, transit substations, and EV charging infrastructure for modern transit.',
    href: '/industries#transportation',
  },
  {
    n: '08', name: 'Traction Power',
    img: '/images/industries/traction-power.jpg',
    desc: 'Railway electrification at 25 Hz and 50 Hz for mainline and commuter rail systems.',
    href: '/industries#traction-power',
  },
  {
    n: '09', name: 'Transit Substations',
    img: '/images/industries/transit-substations.jpg',
    desc: 'LRT, metro, and urban rail DC traction substations for transit authorities.',
    href: '/industries#transit-substations',
  },
  {
    n: '10', name: 'EV Charging',
    img: '/images/industries/ev-charging.jpg',
    desc: 'MW-scale electrical infrastructure for EV charging hubs and fleet electrification depots.',
    href: '/industries#ev-charging',
  },
  {
    n: '11', name: 'Port Electrification',
    img: '/images/industries/port-electrification.jpg',
    desc: 'Shore power and cold-ironing infrastructure for marine terminals and port facilities.',
    href: '/industries#port-electrification',
  },
  {
    n: '12', name: 'Industrial Manufacturing',
    img: '/images/industries/industrial-manufacturing.jpg',
    desc: 'Motor control centres, drive panels, and power distribution for production facilities.',
    href: '/industries',
  },
  {
    n: '13', name: 'Commercial Buildings',
    img: '/images/industries/commercial-buildings.jpg',
    desc: 'Main switchboards, sub-distribution, and metering for office towers and mixed-use developments.',
    href: '/industries',
  },
  {
    n: '14', name: 'Water & Wastewater',
    img: '/images/industries/water-wastewater.jpg',
    desc: 'Control panels, pump motor starters, and SCADA-integrated switchgear for municipal water infrastructure.',
    href: '/industries',
  },
  {
    n: '15', name: 'Government & Defence',
    img: '/images/industries/government-defence.jpg',
    desc: 'Mission-critical power distribution for federal facilities, military bases, and secure installations.',
    href: '/industries',
  },
  {
    n: '16', name: 'Pulp & Paper',
    img: '/images/industries/pulp-paper.jpg',
    desc: 'Heavy-duty switchgear, MCC, and drive systems for pulp mills and paper processing plants.',
    href: '/industries',
  },
  {
    n: '17', name: 'Chemical Processing',
    img: '/images/industries/chemical-processing.jpg',
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
    if (dragging.current) startTimer()
    dragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  const pause  = () => { paused.current = true }
  const resume = () => { paused.current = false }

  return (
    <div
      className="flex-1 min-h-0 flex flex-col overflow-hidden w-full"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="ind-carousel-track flex items-stretch gap-5 overflow-x-auto [scroll-snap-type:x_mandatory] cursor-grab select-none flex-1 min-h-[300px] max-sm:min-h-[250px]"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {INDUSTRIES.map((ind, i) => (
          <Link
            key={ind.n}
            ref={i === 0 ? firstCardRef : undefined}
            href={ind.href}
            className="ind-carousel-card shrink-0 w-[clamp(240px,calc(85vw-1.25rem),300px)] max-sm:w-[clamp(200px,82vw,260px)] h-[300px] max-sm:h-[250px] rounded-[18px] overflow-hidden relative [scroll-snap-align:start] block no-underline"
          >
            <Image
              src={ind.img}
              alt={ind.name}
              fill
              className="ind-carousel-img object-cover"
              sizes="(max-width:640px) 85vw, 300px"
              draggable={false}
            />

            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,9,31,.08)_0%,transparent_30%,rgba(5,9,31,.9)_100%)]" />

            {/* Number badge */}
            <div className="absolute top-[1.1rem] left-[1.1rem] font-display font-black text-[.52rem] tracking-[.2em] text-white/75 uppercase py-[.28rem] px-[.7rem] border border-white/[.22] rounded-full backdrop-blur-[8px] bg-[rgba(5,9,31,.25)]">
              {ind.n}
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-[1.4rem]">
              <div className="font-display font-extrabold text-white text-[1.08rem] leading-[1.22] mb-2">
                {ind.name}
              </div>
              <div className="text-white/60 text-[.78rem] leading-[1.65] mb-[.85rem]">
                {ind.desc}
              </div>
              <div className="inline-flex items-center gap-[.35rem] text-blue text-[.7rem] font-mono font-bold tracking-[.06em] uppercase">
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
      <div className="shrink-0 pt-5 flex items-center gap-4">
        {/* Prev */}
        <button
          onClick={() => step(-1)}
          aria-label="Previous industry"
          className={`w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 p-0 transition-[background,border-color,color] duration-200 ${canPrev ? 'border-[1.5px] border-blue bg-blue text-white cursor-pointer' : 'border-[1.5px] border-[#D1D9F0] bg-transparent text-[#C7D2FE] cursor-default'}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={() => step(1)}
          aria-label="Next industry"
          className={`w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 p-0 transition-[background,border-color,color] duration-200 ${canNext ? 'border-[1.5px] border-blue bg-blue text-white cursor-pointer' : 'border-[1.5px] border-[#D1D9F0] bg-transparent text-[#C7D2FE] cursor-default'}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-[3px] bg-[#E0E7FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-blue rounded-full transition-[width] duration-[.12s] linear"
            style={{ width: `${(progress * 100).toFixed(2)}%` }}
          />
        </div>

        {/* Count */}
        <div className="font-mono text-[.62rem] tracking-[.12em] uppercase text-[#9CA3AF] shrink-0 whitespace-nowrap">
          {INDUSTRIES.length} Sectors
        </div>
      </div>
    </div>
  )
}
