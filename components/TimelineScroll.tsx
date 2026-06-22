'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '2022', title: 'Founded in Toronto, Ontario', text: 'Candron Energy Inc. is established by a team of veteran power engineers — each bringing decades of field experience. From day one, the mandate was complete in-house design, fabrication, assembly, and testing under one roof.' },
  { year: '2023', title: 'First Major Project Deliveries', text: 'Candron completes its first major custom switchgear, switchboard, and control panel projects across mining, oil & gas, and industrial sectors — delivered on time, tested in-house, and meeting ANSI, CSA, and IEEE standards.' },
  { year: '2024', title: 'Material & Finishing Standards Formalized', text: 'Candron formalizes its premium build standard: 11-gauge steel enclosures, C5M corrosion protection coating, and German-manufactured laser and water-jet cutting equipment — setting a manufacturing bar well above the industry norm.' },
  { year: '2025', title: 'Expanded Across New Sectors', text: 'Product range expands to serve data centers, healthcare, transportation, renewable energy, and port electrification — with every project still designed, built, and tested entirely at our Toronto facility.' },
  { year: '2026', title: '50+ Years of Combined Expertise. Still Growing.', text: 'Candron\'s team brings over 50 years of combined power systems engineering and field operations expertise to every project — with licensed engineers, M.Eng and Ph.D credentials, and field technicians with 40+ years of hands-on experience.' },
]

export default function TimelineScroll() {
  const lineRef      = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRefs      = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
    if (dots.length < 2 || !lineRef.current || !containerRef.current) return

    const first = dots[0]
    const last  = dots[dots.length - 1]

    const cRect       = containerRef.current.getBoundingClientRect()
    const firstCenter = first.getBoundingClientRect().top + first.offsetHeight / 2 - cRect.top
    const lastCenter  = last.getBoundingClientRect().top  + last.offsetHeight  / 2 - cRect.top
    const targetH     = lastCenter - firstCenter

    lineRef.current.style.top = `${firstCenter}px`

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

    dots.forEach(dot => {
      ScrollTrigger.create({
        trigger: dot,
        start: 'top 72%',
        onEnter:     () => dot.classList.add('tl-dot-active'),
        onLeaveBack: () => dot.classList.remove('tl-dot-active'),
      })
    })
  }, { scope: containerRef })

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
