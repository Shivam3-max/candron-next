'use client'
import { useEffect, useRef } from 'react'

interface Step { n: string; title: string; desc: string }
interface Props { steps: Step[]; variant?: 'light' | 'dark' }

export default function ProcessStepsAnimate({ steps, variant = 'light' }: Props) {
  const lineRef      = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRefs      = useRef<(HTMLDivElement | null)[]>([])

  const dotBase = variant === 'dark'
    ? { background: 'rgba(255,255,255,.06)', borderColor: 'rgba(0,71,255,.6)', color: 'var(--blue-l)' }
    : {}

  useEffect(() => {
    const container = containerRef.current
    const line      = lineRef.current
    if (!container || !line) return

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (!window.matchMedia('(max-width:640px)').matches) {
        line.style.width = 'calc(80% - 56px)'
      }
      dotRefs.current.forEach((dot, i) => {
        setTimeout(() => dot?.classList.add('ps-active'), i * 180)
      })
      obs.disconnect()
    }, { threshold: 0.35 })

    obs.observe(container)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="process-steps" ref={containerRef}>
      <div className="process-steps-progress" ref={lineRef} />
      {steps.map((s, i) => (
        <div key={s.n} className={`process-step rv${i > 0 ? ` d${i + 1}` : ''}`}>
          <div
            className="ps-dot"
            style={dotBase}
            ref={el => { dotRefs.current[i] = el }}
          >
            {s.n}
          </div>
          <div className={`ps-title${variant === 'dark' ? ' ps-title-dark' : ''}`}>{s.title}</div>
          <div className={`ps-desc${variant === 'dark' ? ' ps-desc-dark' : ''}`}>{s.desc}</div>
        </div>
      ))}
    </div>
  )
}
