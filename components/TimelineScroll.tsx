'use client'
import { useEffect, useRef } from 'react'

const milestones = [
  { year: '2009', title: 'Founded in North York, Ontario', text: 'Candron Energy Inc. is established by a team of veteran power engineers — each bringing decades of field experience. From day one, our focus was transformer sales and emergency response for Ontario\'s industrial market.' },
  { year: '2012', title: 'Expanded into Switchgear & Load Banks', text: 'Client demand drives rapid expansion into medium-voltage switchgear and load bank rentals. Our licensed engineers begin signing long-term emergency response contracts with mining and oil & gas operators.' },
  { year: '2015', title: 'Launched 24/7 Emergency Response Program', text: 'We formalize our sub-30-minute emergency response guarantee, backed by a dedicated team of on-call licensed engineers. First cross-border USA deployments demonstrate our coast-to-coast reach.' },
  { year: '2018', title: 'In-House Engineering & Manufacturing Division', text: 'Candron establishes a full in-house engineering division — staffed by licensed engineers holding master\'s and doctoral degrees in power systems. Design, fabrication, SCADA integration, and commissioning all under one roof.' },
  { year: '2021', title: 'Expanded Inventory to 500+ Units', text: 'A major inventory investment brings our stocked unit count past 500, enabling same-day or next-day shipment across North America. Our field technicians — averaging 30+ years of experience each — oversee every unit.' },
  { year: '2024', title: '650+ Machines. 50+ Years Combined Expertise. Still Growing.', text: 'Candron operates with 650+ machines in stock, serves 9 major industries, and carries over 50 years of combined engineering and field expertise. The most prepared team in Canadian power distribution — bar none.' },
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
