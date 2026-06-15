'use client'
import { useEffect } from 'react'

export default function ClientEffects() {
  useEffect(() => {
    // SCROLL REVEAL
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target) }})
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => obs.observe(el))

    // COUNTERS
    const countEls = document.querySelectorAll('[data-count]')
    if (countEls.length) {
      const co = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const target = parseInt(el.dataset.count || '0')
          const suffix = el.dataset.suffix || ''
          const dur = 1600, start = performance.now();
          (function upd(now: number){
            const p = Math.min((now-start)/dur,1), ease = 1-Math.pow(1-p,3)
            el.textContent = Math.floor(ease*target)+suffix
            if(p<1) requestAnimationFrame(upd)
          })(start)
          co.unobserve(el)
        })
      }, {threshold:.5})
      countEls.forEach(el => co.observe(el))
    }

    // MAGNETIC BUTTONS
    const mags = document.querySelectorAll('.mag')
    mags.forEach(btn => {
      const b = btn as HTMLElement
      b.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent
        const r = b.getBoundingClientRect()
        const x=(me.clientX-r.left-r.width/2)*.15, y=(me.clientY-r.top-r.height/2)*.15
        b.style.transform=`translate(${x}px,${y}px)`; b.style.transition='transform .08s'
      })
      b.addEventListener('mouseleave', () => { b.style.transform='translate(0,0)'; b.style.transition='transform .4s ease' })
    })

    return () => obs.disconnect()
  }, [])

  return null
}
