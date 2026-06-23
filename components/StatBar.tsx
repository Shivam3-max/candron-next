'use client'
import React from 'react'
import { useEffect, useRef, useState } from 'react'

interface Stat { num: string; lbl: string; icon?: React.ReactNode }

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
    <div ref={ref} className="grid grid-cols-4 max-md:grid-cols-2 gap-0">
      {stats.map((s, i) => (
        <div
          key={i}
          className={[
            'relative text-center py-4 px-8 max-sm:py-[.85rem] max-sm:px-4',
            active ? 'animate-stat-fade-up' : 'opacity-0',
          ].join(' ')}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {/* Vertical divider — hidden at end of each row in responsive layouts */}
          {i < stats.length - 1 && (
            <div className={[
              'absolute right-0 top-[20%] h-[60%] w-px bg-white/20',
              (i + 1) % 2 === 0 ? 'max-md:hidden' : '',
            ].join(' ')} />
          )}
          <div className="font-display text-[clamp(2rem,3.5vw,2.8rem)] font-black text-white leading-none mb-[.4rem] max-sm:text-[1.2rem] max-sm:break-words">
            {s.icon ? s.icon : <CountUp raw={s.num} active={active} />}
          </div>
          <div className="font-title text-[.72rem] text-white/70 tracking-[.12em] uppercase max-sm:text-[.62rem]">
            {s.lbl}
          </div>
        </div>
      ))}
    </div>
  )
}
