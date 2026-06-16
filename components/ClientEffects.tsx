'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ClientEffects() {
  const pathname = usePathname()

  useEffect(() => {
    // SCROLL REVEAL — re-observe on every route change
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => obs.observe(el))

    // COUNTERS
    const countEls = document.querySelectorAll('[data-count]')
    let co: IntersectionObserver | null = null
    if (countEls.length) {
      co = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const target = parseInt(el.dataset.count || '0')
          const suffix = el.dataset.suffix || ''
          const dur = 1600, start = performance.now();
          (function upd(now: number) {
            const p = Math.min((now - start) / dur, 1), ease = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.floor(ease * target) + suffix
            if (p < 1) requestAnimationFrame(upd)
          })(start)
          co!.unobserve(el)
        })
      }, { threshold: .5 })
      countEls.forEach(el => co!.observe(el))
    }

    // MAGNETIC BUTTONS — store handlers so we can clean them up
    const mags = document.querySelectorAll('.mag')
    const handlers: Array<{ el: HTMLElement; mm: EventListener; ml: EventListener }> = []
    mags.forEach(btn => {
      const b = btn as HTMLElement
      const mm = (e: Event) => {
        const me = e as MouseEvent
        const r = b.getBoundingClientRect()
        const x = (me.clientX - r.left - r.width / 2) * .15
        const y = (me.clientY - r.top - r.height / 2) * .15
        b.style.transform = `translate(${x}px,${y}px)`
        b.style.transition = 'transform .08s'
      }
      const ml = () => {
        b.style.transform = 'translate(0,0)'
        b.style.transition = 'transform .4s ease'
      }
      b.addEventListener('mousemove', mm)
      b.addEventListener('mouseleave', ml)
      handlers.push({ el: b, mm, ml })
    })

    return () => {
      obs.disconnect()
      co?.disconnect()
      handlers.forEach(({ el, mm, ml }) => {
        el.removeEventListener('mousemove', mm)
        el.removeEventListener('mouseleave', ml)
      })
    }
  }, [pathname]) // re-run on every page navigation

  return null
}
