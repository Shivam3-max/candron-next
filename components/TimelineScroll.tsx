'use client'
import { useEffect, useRef } from 'react'

const milestones = [
  { year: '2009', title: 'Founded in North York, Ontario', text: 'Candron Energy Inc. is established with a focus on transformer sales and service for the Ontario industrial market. First facility at 4801 Keele St.' },
  { year: '2012', title: 'Expanded into Switchgear & Load Banks', text: 'Growing client demand drives expansion into medium-voltage switchgear sales and load bank rentals. First emergency response contracts signed with mining operators.' },
  { year: '2015', title: 'Launched 24/7 Emergency Response Program', text: 'Formalized our sub-30-minute emergency response guarantee with dedicated on-call engineers. First cross-border USA deployments begin.' },
  { year: '2018', title: 'Engineering Services Division Opens', text: 'Candron hires its first team of licensed power systems engineers to offer in-house design, SCADA integration, and commissioning services.' },
  { year: '2021', title: 'Expanded Inventory to 500+ Units', text: 'Major inventory investment brings our stocked unit count past 500, enabling same-day or next-day shipment on most transformer and switchgear requests.' },
  { year: '2024', title: '650+ Machines. 9 Industries. Still Growing.', text: 'Candron now operates with 650+ machines in stock, serves 9 major industrial sectors, and maintains emergency response capabilities across all of North America.' },
]

export default function TimelineScroll() {
  const lineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    const line = lineRef.current
    if (!container || !line) return

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const startY = window.innerHeight * 0.8
      const totalTravel = container.offsetHeight + startY - window.innerHeight * 0.2
      const progress = Math.min(Math.max((startY - rect.top) / totalTravel, 0), 1)
      line.style.height = `${progress * 100}%`

      dotRefs.current.forEach(dot => {
        if (!dot) return
        const top = dot.getBoundingClientRect().top
        dot.classList.toggle('tl-dot-active', top < window.innerHeight * 0.72)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="timeline" ref={containerRef}>
      <div className="timeline-progress" ref={lineRef} />
      {milestones.map((m, i) => (
        <div key={m.year} className="tl-item rv">
          <div className="tl-dot" ref={el => { dotRefs.current[i] = el }} />
          <div className="tl-year">{m.year}</div>
          <div className="tl-title">{m.title}</div>
          <div className="tl-text">{m.text}</div>
        </div>
      ))}
    </div>
  )
}
