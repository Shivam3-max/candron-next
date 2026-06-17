"use client";
import { useEffect, useRef } from "react";

type Step = { n: string; t: string; d: string }

const defaultSteps: Step[] = [
  { n: "01", t: "Design & Engineering", d: "Our engineering team develops customized power distribution solutions tailored to project requirements, utility standards, and site conditions." },
  { n: "02", t: "Manufacturing", d: "All products are manufactured in our Canadian facility using proven processes and strict quality controls at every stage." },
  { n: "03", t: "Assembly", d: "Equipment is assembled by experienced technicians ensuring precision and consistency throughout production." },
  { n: "04", t: "Testing", d: "Every system undergoes comprehensive factory acceptance testing before shipment to verify safety, reliability, and compliance." },
  { n: "05", t: "Commissioning Support", d: "Our team supports installation, startup, and commissioning to ensure reliable operation from day one." },
];

interface Props {
  steps?: Step[]
  variant?: "dark" | "light"
}

export default function ProcessScroll({ steps = defaultSteps, variant = "dark" }: Props) {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const titleColor = variant === "light" ? "var(--navy)" : "var(--white)";
  const textColor  = variant === "light" ? "var(--gray)"  : "rgba(255,255,255,.45)";

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const startY = window.innerHeight * 0.75;
      const totalTravel = container.offsetHeight + startY - window.innerHeight * 0.25;
      const progress = Math.min(Math.max((startY - rect.top) / totalTravel, 0), 1);
      const firstDot = dotRefs.current[0];
      const lastDot = dotRefs.current[dotRefs.current.length - 1];
      const maxLineHeight =
        firstDot && lastDot
          ? lastDot.getBoundingClientRect().top + lastDot.offsetHeight / 2 -
            (firstDot.getBoundingClientRect().top + firstDot.offsetHeight / 2)
          : container.offsetHeight;
      line.style.height = `${progress * maxLineHeight}px`;

      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        dot.getBoundingClientRect().top < window.innerHeight * 0.68
          ? dot.classList.add("active")
          : dot.classList.remove("active");
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="process-v" ref={containerRef}>
      <div className="process-v-progress" ref={lineRef} />
      {steps.map((s, i) => (
        <div key={s.n} className="process-v-item">
          <div className="process-v-dot" ref={(el) => { dotRefs.current[i] = el; }}>
            {s.n}
          </div>
          <div>
            <div className="process-v-title" style={{ color: titleColor }}>{s.t}</div>
            <div className="process-v-text"  style={{ color: textColor }}>{s.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
