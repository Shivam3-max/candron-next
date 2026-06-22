"use client"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

type Step = { n: string; t: string; d: string }

const defaultSteps: Step[] = [
  { n: "01", t: "Design & Engineering", d: "Our engineering team develops customized power distribution solutions tailored to project requirements, utility standards, and site conditions." },
  { n: "02", t: "Manufacturing", d: "All products are manufactured in our Canadian facility using proven processes and strict quality controls at every stage." },
  { n: "03", t: "Assembly", d: "Equipment is assembled by experienced technicians ensuring precision and consistency throughout production." },
  { n: "04", t: "Testing", d: "Every system undergoes comprehensive factory acceptance testing before shipment to verify safety, reliability, and compliance." },
  { n: "05", t: "Commissioning Support", d: "Our team supports installation, startup, and commissioning to ensure reliable operation from day one." },
]

interface Props {
  steps?: Step[]
  variant?: "dark" | "light"
}

export default function ProcessScroll({ steps = defaultSteps, variant = "dark" }: Props) {
  const lineRef      = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRefs      = useRef<(HTMLDivElement | null)[]>([])

  const titleColor = variant === "light" ? "var(--navy)" : "var(--white)"
  const textColor  = variant === "light" ? "var(--gray)"  : "rgba(255,255,255,.45)"

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
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: `+=${lastCenter}px`,
          scrub: 0.6,
        },
      }
    )

    dots.forEach(dot => {
      ScrollTrigger.create({
        trigger: dot,
        start: "top 68%",
        onEnter:     () => dot.classList.add("active"),
        onLeaveBack: () => dot.classList.remove("active"),
      })
    })
  }, { scope: containerRef })

  return (
    <div className={`process-v${variant === 'dark' ? ' process-v--dark' : ''}`} ref={containerRef}>
      <div className="process-v-progress" ref={lineRef} />
      {steps.map((s, i) => (
        <div key={s.n} className="process-v-item">
          <div className="process-v-dot" ref={(el) => { dotRefs.current[i] = el }}>
            {s.n}
          </div>
          <div>
            <div className="process-v-title" style={{ color: titleColor }}>{s.t}</div>
            <div className="process-v-text"  style={{ color: textColor }}>{s.d}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
