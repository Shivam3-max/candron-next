'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const pillars: { lbl: string; icon: React.ReactNode }[] = [
  {
    lbl: 'Built to Your\nRequirements',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/></svg>,
  },
  {
    lbl: 'Quality at\nEvery Stage',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  },
  {
    lbl: 'On Schedule.\nEvery Time.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="14" width="2" height="2" rx=".5" fill="currentColor"/><rect x="11" y="14" width="2" height="2" rx=".5" fill="currentColor"/><rect x="15" y="14" width="2" height="2" rx=".5" fill="currentColor"/></svg>,
  },
  {
    lbl: 'Support Beyond\nDelivery',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>,
  },
]

const steps: { n: string; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    n: '01', title: 'Design & Engineering',
    desc: 'Our engineering team develops customized power distribution solutions tailored to project requirements, utility standards, and site conditions.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20"/><path d="M4 20V10l4-4 4 4V4l4-4v20"/></svg>,
  },
  {
    n: '02', title: 'Manufacturing',
    desc: 'All products are manufactured in our Canadian facility using proven processes and strict quality controls at every stage.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>,
  },
  {
    n: '03', title: 'Assembly',
    desc: 'Equipment is assembled by experienced technicians ensuring precision and consistency throughout production.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    n: '04', title: 'Testing',
    desc: 'Every system undergoes comprehensive factory acceptance testing before shipment to verify safety, reliability, and compliance.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>,
  },
  {
    n: '05', title: 'Commissioning Support',
    desc: 'Our team supports installation, startup, and commissioning to ensure reliable operation from day one.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 3v1m0 6v1m-4-4h1m6 0h1"/></svg>,
  },
]

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    // Respect reduced-motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (lineRef.current && trackRef.current) {
        lineRef.current.style.height = trackRef.current.style.height || '100%'
      }
      return
    }

    const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
    if (dots.length < 2 || !lineRef.current || !trackRef.current || !containerRef.current) return

    const first = dots[0]
    const last  = dots[dots.length - 1]

    const cRect       = containerRef.current.getBoundingClientRect()
    const firstCenter = first.getBoundingClientRect().top + first.offsetHeight / 2 - cRect.top
    const lastCenter  = last.getBoundingClientRect().top  + last.offsetHeight  / 2 - cRect.top
    const targetH     = lastCenter - firstCenter

    trackRef.current.style.top    = `${firstCenter}px`
    trackRef.current.style.height = `${targetH}px`
    lineRef.current.style.top     = `${firstCenter}px`

    gsap.fromTo(lineRef.current,
      { height: 0 },
      {
        height: targetH,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: `+=${lastCenter}px`,
          scrub: 0.6,
        },
      }
    )
  }, { scope: containerRef })

  return (
    <div className="bg-navy py-20">
      <div className="container">
        <div className="grid grid-cols-[5fr_7fr] max-md:grid-cols-1 gap-[5rem] max-md:gap-12 items-start">

          {/* ── LEFT ── */}
          <div>
            <div className="label label-white mb-7">Our Process</div>
            <h2 className="text-white text-[clamp(1.9rem,3.5vw,3.2rem)] leading-[1.05] font-black mb-[1.1rem]">
              From Concept<br />to Commissioning
            </h2>
            <div className="w-9 h-[3px] bg-blue rounded-[2px] mb-6" />
            <p className="text-white/50 text-[.95rem] leading-[1.9] mb-11">
              Every Candron project follows a structured five-stage process that eliminates surprises, maintains schedule, and delivers equipment that performs exactly as specified.
            </p>

            {/* 4-pillar card */}
            <div className="border border-white/[.1] rounded-[16px] overflow-hidden mb-10">
              <div className="responsive-override-exempt grid grid-cols-4 max-md:grid-cols-2">
                {pillars.map(({ lbl, icon }, ci) => (
                  <div key={ci} className="py-[1.1rem] px-3 text-center border-r border-white/[.08] last:border-r-0 max-md:[&:nth-child(2)]:border-r-0">
                    <div className="w-10 h-10 rounded-full border-[1.5px] border-blue/55 bg-[rgba(0,71,255,.08)] flex items-center justify-center mx-auto mb-[.65rem] text-[#5B9BFF]">
                      <div className="w-[18px] h-[18px]">{icon}</div>
                    </div>
                    <div className="font-title text-[.6rem] font-bold text-white/75 leading-[1.35] whitespace-pre-line">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/manufacturing" className="btn btn-primary btn-lg mag w-full justify-center tracking-[.08em] uppercase">
              See Our Manufacturing →
            </Link>
          </div>

          {/* ── RIGHT — animated timeline ── */}
          <div ref={containerRef} className="relative">

            {/* Track — top/height set by GSAP */}
            <div ref={trackRef} className="absolute left-[23px] max-md:left-[17px] w-[2px] bg-[rgba(0,71,255,.15)] rounded-[2px]" style={{ top: 0, height: 0 }} />

            {/* Animated fill — top/height owned by GSAP */}
            <div ref={lineRef} className="absolute left-[23px] max-md:left-[17px] w-[2px] bg-[linear-gradient(to_bottom,#1A60FF_0%,#5B9BFF_100%)] rounded-[2px] shadow-[0_0_8px_rgba(26,96,255,.7)]" style={{ top: 0 }} />

            {steps.map(({ n, title, desc, icon }, idx) => (
              <div key={n} className={`flex gap-6 max-md:gap-3 items-start relative ${idx < 4 ? 'mb-4 max-md:mb-2' : ''}`}>

                {/* Circle */}
                <div
                  ref={el => { dotRefs.current[idx] = el }}
                  className="w-12 h-12 max-md:w-9 max-md:h-9 rounded-full shrink-0 z-[1] bg-[linear-gradient(135deg,#1A60FF,#0033BB)] flex items-center justify-center font-display font-black text-[.72rem] max-md:text-[.55rem] tracking-[.04em] text-white shadow-[0_0_0_5px_rgba(0,71,255,.2),0_4px_20px_rgba(0,71,255,.35)]"
                >{n}</div>

                {/* Card */}
                <div className="flex-1 bg-white/[.04] border border-white/[.09] rounded-[14px] max-md:rounded-[10px] py-[1.1rem] px-5 max-md:py-3 max-md:px-3 flex gap-4 max-md:gap-2 items-start mt-[2px]">
                  <div className="w-10 h-10 max-md:w-7 max-md:h-7 rounded-[10px] max-md:rounded-[6px] bg-[rgba(0,71,255,.2)] flex items-center justify-center text-[#5B9BFF] shrink-0">
                    <div className="w-[21px] h-[21px] max-md:w-[14px] max-md:h-[14px]">{icon}</div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-[.92rem] max-md:text-[.78rem] mb-[.3rem] max-md:mb-1">{title}</div>
                    <div className="font-title text-white/45 text-[.8rem] max-md:text-[.7rem] leading-[1.65] max-md:leading-[1.5]">{desc}</div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
