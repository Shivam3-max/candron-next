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
    const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
    if (dots.length < 2 || !lineRef.current || !trackRef.current || !containerRef.current) return

    const first = dots[0]
    const last  = dots[dots.length - 1]

    // getBoundingClientRect is offsetParent-independent; scrollY cancels in the diff
    const cRect       = containerRef.current.getBoundingClientRect()
    const firstCenter = first.getBoundingClientRect().top + first.offsetHeight / 2 - cRect.top
    const lastCenter  = last.getBoundingClientRect().top  + last.offsetHeight  / 2 - cRect.top
    const targetH     = lastCenter - firstCenter

    // Pin both lines precisely between first and last dot centres
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
    <div style={{ background: '#05091F', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '5rem', alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div>
            <div className="label label-white" style={{ marginBottom: '1.75rem' }}>Our Process</div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2.4rem,4vw,3.2rem)', lineHeight: 1.05, fontWeight: 900, marginBottom: '1.1rem' }}>
              From Concept<br />to Commissioning
            </h2>
            <div style={{ width: '36px', height: '3px', background: 'var(--blue)', borderRadius: '2px', marginBottom: '1.5rem' }} />
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '.95rem', lineHeight: 1.9, marginBottom: '2.75rem' }}>
              Every Candron project follows a structured five-stage process that eliminates surprises, maintains schedule, and delivers equipment that performs exactly as specified.
            </p>

            {/* 4-pillar card — single row */}
            <div style={{ border: '1px solid rgba(255,255,255,.1)', borderRadius: '16px', overflow: 'hidden', marginBottom: '2.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
                {pillars.map(({ lbl, icon }, ci) => (
                  <div key={ci} style={{
                    padding: '1.1rem .75rem',
                    textAlign: 'center',
                    borderRight: ci < 3 ? '1px solid rgba(255,255,255,.08)' : 'none',
                  }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(0,71,255,.55)', background: 'rgba(0,71,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .65rem', color: '#5B9BFF' }}>
                      <div style={{ width: '18px', height: '18px' }}>{icon}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--ft)', fontSize: '.6rem', fontWeight: 700, color: 'rgba(255,255,255,.75)', lineHeight: 1.35, whiteSpace: 'pre-line' }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/manufacturing" className="btn btn-primary btn-lg mag" style={{ width: '100%', justifyContent: 'center', letterSpacing: '.08em', textTransform: 'uppercase' }}>
              See Our Manufacturing →
            </Link>
          </div>

          {/* ── RIGHT — animated timeline ── */}
          {/* no padding here — circles sit at left:0 so center = 24px */}
          <div ref={containerRef} style={{ position: 'relative' }}>

            {/* Track — top/height set by GSAP measurement, not hardcoded */}
            <div ref={trackRef} style={{
              position: 'absolute', left: '23px', top: 0,
              width: '2px', height: 0,
              background: 'rgba(0,71,255,.15)',
              borderRadius: '2px',
            }} />

            {/* Animated fill — top/height both owned by JS */}
            <div ref={lineRef} style={{
              position: 'absolute', left: '23px', top: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #1A60FF 0%, #5B9BFF 100%)',
              borderRadius: '2px',
              boxShadow: '0 0 8px rgba(26,96,255,.7)',
            }} />

            {steps.map(({ n, title, desc, icon }, idx) => (
              <div key={n} style={{ display: 'flex', gap: '1.5rem', marginBottom: idx < 4 ? '1rem' : 0, alignItems: 'flex-start', position: 'relative' }}>

                {/* Circle */}
                <div
                  ref={el => { dotRefs.current[idx] = el }}
                  style={{
                  width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0, zIndex: 1,
                  background: 'linear-gradient(135deg,#1A60FF,#0033BB)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '.72rem', letterSpacing: '.04em',
                  color: '#fff',
                  boxShadow: '0 0 0 5px rgba(0,71,255,.2),0 4px 20px rgba(0,71,255,.35)',
                }}>{n}</div>

                {/* Card */}
                <div style={{ flex: 1, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)', borderRadius: '14px', padding: '1.1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', marginTop: '2px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,71,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B9BFF', flexShrink: 0 }}>
                    <div style={{ width: '21px', height: '21px' }}>{icon}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, color: '#fff', fontSize: '.92rem', marginBottom: '.3rem' }}>{title}</div>
                    <div style={{ fontFamily: 'var(--ft)', color: 'rgba(255,255,255,.45)', fontSize: '.8rem', lineHeight: 1.65 }}>{desc}</div>
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
