'use client'
import { useEffect, useRef, useState } from 'react'

interface Stat { num: string; lbl: string }

function CountUp({ raw, active }: { raw: string; active: boolean }) {
  const match = raw.match(/^(\d+)(\S*)$/)
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active || !match) return
    const target = parseInt(match[1])
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * target))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [active])

  if (!match) return <>{raw}</>
  return <>{count}{match[2]}</>
}

export default function StatBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="stat-grid" ref={ref}>
      {stats.map((s, i) => (
        <div key={i} className={`stat-item${active ? ' stat-in' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="stat-num">
            <CountUp raw={s.num} active={active} />
          </div>
          <div className="stat-lbl">{s.lbl}</div>
        </div>
      ))}
    </div>
  )
}
