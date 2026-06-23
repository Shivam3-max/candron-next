"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const caps = [
  {
    n: "01",
    title: "Electrical Design Engineering",
    desc: "Single-line diagrams, schematics, and specification compliance from concept to drawing approval.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Mechanical Design",
    desc: "Enclosure layout, thermal management, and structural design engineered to your specs.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Fabrication",
    desc: "In-house metal fabrication — enclosures, bus structures, and assemblies cut to exact tolerances.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Assembly",
    desc: "Component installation, bus assembly, and hardware mounting — all by our trained technicians.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    n: "05",
    title: "Wiring",
    desc: "IEC and NFPA wiring by experienced craftsmen. Color coding, labeling, and documentation included.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
  },
  {
    n: "06",
    title: "Quality Assurance",
    desc: "ITP checkpoints at every production stage with full traceability and documentation.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    n: "07",
    title: "Functional Testing",
    desc: "Control logic, protection scheme, and equipment validation in our dedicated test area.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    n: "08",
    title: "Documentation",
    desc: "As-built drawings, test reports, wiring schedules, and O&M manuals — delivered with every unit.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    n: "09",
    title: "Factory Acceptance Testing",
    desc: "Full FAT to ANSI, IEEE, NETA, CSA, and UL standards. Witnessed FAT available on request.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

// Row 0 L→R (0,1,2), drop right, row 1 R→L (5,4,3), drop left, row 2 L→R (6,7,8)
const SNAKE = [0, 1, 2, 5, 4, 3, 6, 7, 8];

const bullets = [
  "9 in-house capabilities — no outsourcing",
  "Full documentation traceability on every project",
  "Witnessed FAT available for your team or inspector",
];

export default function CapabilitiesFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>(Array(9).fill(null));

  useGSAP(
    () => {
      const path = pathRef.current;
      const glow = glowRef.current;
      const sect = sectionRef.current;
      if (!path || !sect) return;
      const dots = dotRefs.current;
      if (dots.some((d) => !d)) return;

      const targets = [path, glow].filter(Boolean) as SVGPathElement[];
      let cumDist: number[] = [];
      let totalD = 1;

      const buildPath = () => {
        const sRect = sect.getBoundingClientRect();
        const pts = SNAKE.map((i) => {
          const r = (dots[i] as HTMLDivElement).getBoundingClientRect();
          return {
            x: r.left - sRect.left + r.width / 2,
            y: r.top - sRect.top + r.height / 2,
          };
        });

        const R = 24;
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const prev = pts[i - 1],
            curr = pts[i],
            next = i < pts.length - 1 ? pts[i + 1] : null;
          if (!next) { d += ` L ${curr.x} ${curr.y}`; continue; }
          const dx1 = curr.x - prev.x, dy1 = curr.y - prev.y, len1 = Math.hypot(dx1, dy1);
          const dx2 = next.x - curr.x, dy2 = next.y - curr.y, len2 = Math.hypot(dx2, dy2);
          const rr = Math.min(R, len1 / 2, len2 / 2);
          const bx = curr.x - (dx1 / len1) * rr, by = curr.y - (dy1 / len1) * rr;
          const ax = curr.x + (dx2 / len2) * rr, ay = curr.y + (dy2 / len2) * rr;
          d += ` L ${bx} ${by} Q ${curr.x} ${curr.y} ${ax} ${ay}`;
        }

        path.setAttribute("d", d);
        glow?.setAttribute("d", d);

        const L = path.getTotalLength();
        gsap.set(targets, { strokeDasharray: L, strokeDashoffset: L });

        cumDist = [0];
        for (let i = 1; i < pts.length; i++) {
          cumDist.push(
            cumDist[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y),
          );
        }
        totalD = cumDist[cumDist.length - 1] || 1;
      };

      buildPath();

      gsap.to(targets, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sect,
          start: "top 80%",
          end: "+=650",
          scrub: 0.3,
          invalidateOnRefresh: true,
          onRefresh: buildPath,
          onUpdate: (self) => {
            cumDist.forEach((dist, si) => {
              const dot = dots[SNAKE[si]];
              if (!dot) return;
              if (self.progress >= dist / totalD)
                dot.classList.add("cap-dot-lit");
              else dot.classList.remove("cap-dot-lit");
            });
          },
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="cap-section">
      <svg className="cap-svg">
        <path
          ref={glowRef}
          fill="none"
          stroke="rgba(26,96,255,.15)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={pathRef}
          fill="none"
          stroke="rgba(40,110,255,.7)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="container cap-container">
        {/* ── LEFT: heading column ── */}
        <div className="cap-left rv-l">
          <div className="label label-white">Capabilities</div>
          <h2 className="cap-heading">
            Everything
            <br />
            In&#8209;House.
            <br />
            <span className="text-blue">
              Nothing
              <br />
              Outsourced.
            </span>
          </h2>
          <p className="cap-sub">
            End&#8209;to&#8209;end control — from engineering drawings to
            witnessed FAT — all under one roof in Toronto.
          </p>
          <ul className="cap-bullets">
            {bullets.map((b) => (
              <li key={b}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7l4 4 6-7"
                    stroke="var(--blue)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          {/* <Link href="/manufacturing" className="btn btn-primary">See How We Build →</Link> */}
        </div>

        {/* ── RIGHT: 3×3 compact grid ── */}
        <div className="cap-grid">
          {caps.map((c, i) => (
            <div key={c.n} className="cap-card">
              <div className="cap-card-top">
                <div
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="cap-dot relative z-[2]"
                >
                  {c.n}
                </div>
                <div className="cap-icon" aria-hidden="true">
                  {c.icon}
                </div>
              </div>
              <div className="cap-title">{c.title}</div>
              <div className="cap-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA STRIP ── */}
      <div className="container">
        <div className="cap-cta-strip rv">
          <div className="cap-cta-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4zM5 21V10.85" />
              <path d="M19 21V10.85M9 21v-5a3 3 0 013-3v0a3 3 0 013 3v5" />
            </svg>
          </div>
          <div className="cap-cta-text">
            <div className="cap-cta-title">
              One Facility. One Team. Total Accountability.
            </div>
            <div className="cap-cta-sub">
              By keeping everything in-house, we deliver greater control over
              quality, schedules, and performance — from start to finish.
            </div>
          </div>
          <Link href="/contact" className="btn btn-primary cap-cta-btn">
            Talk to Our Experts →
          </Link>
        </div>
      </div>
    </div>
  );
}
