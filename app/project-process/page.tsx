import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'CANDRON Processes | From Inception to Commissioning',
  description: 'See how CANDRON guides power distribution projects through consultation, engineering, simulation, manufacturing, testing, delivery, and commissioning.',
}

const steps = [
  {
    number: '01',
    title: 'Consultation & Requirements',
    description: 'Understand project objectives, specifications, site conditions, and schedule.',
  },
  {
    number: '02',
    title: 'Engineering & Design',
    description: 'Develop equipment designs, drawings, and technical documentation.',
  },
  {
    number: '03',
    title: 'Simulation & Validation',
    description: 'Validate designs against applicable requirements and project-specific operating conditions.',
  },
  {
    number: '04',
    title: 'Manufacturing & Assembly',
    description: 'Fabricate, assemble, and integrate equipment using controlled manufacturing processes.',
  },
  {
    number: '05',
    title: 'Testing & Quality Assurance',
    description: 'Verify workmanship, functionality, and compliance with applicable project specifications.',
  },
  {
    number: '06',
    title: 'Delivery & Logistics',
    description: 'Coordinate packaging, shipping, and delivery to the project site.',
  },
  {
    number: '07',
    title: 'Commissioning & Support',
    description: 'Support installation, commissioning, and the transition into service.',
  },
]

export default function ProjectProcessPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" style={{ background: "url('/images/manufacturing.jpg') center/cover" }} />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>CANDRON Processes</span></div>
          <div className="label label-white">The Full Project Cycle</div>
          <h1>From Inception to<br /><em>Commissioning.</em></h1>
          <p className="lead mt-4">One connected process for discussions, design, simulation, manufacturing, testing, shipping, and commissioning—from the first conversation through delivery and support.</p>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container">
          <div className="grid grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] max-lg:grid-cols-1 gap-14 max-md:gap-9 items-start">
            <div className="lg:sticky lg:top-[140px] rv-l">
              <div className="label">How We Work</div>
              <h2 className="mb-5">A Clear Path Through Every Project Stage</h2>
              <p className="body">Our process keeps project teams connected to the people responsible for the work. Each phase builds on the last, creating continuity from requirements and engineering through manufacturing, delivery, and field support.</p>
              <Link href="/contact" className="btn btn-primary mt-8">Discuss Your Project →</Link>
            </div>

            <ol className="list-none relative before:absolute before:left-[27px] before:top-7 before:bottom-7 before:w-px before:bg-blue/20 max-sm:before:left-[21px]">
              {steps.map((step, index) => (
                <li key={step.number} className={`relative grid grid-cols-[56px_1fr] max-sm:grid-cols-[44px_1fr] gap-5 max-sm:gap-3 pb-6 last:pb-0 rv${index ? ` d${Math.min(index + 1, 4)}` : ''}`}>
                  <div className="relative z-[1] w-14 h-14 max-sm:w-11 max-sm:h-11 rounded-full bg-navy border border-blue/40 text-blue-l flex items-center justify-center font-mono font-bold text-[.72rem] max-sm:text-[.64rem] tracking-[.08em] shadow-[0_0_0_7px_#F4F6FA]">
                    {step.number}
                  </div>
                  <article className="bg-white border border-[#E3E8F2] rounded-[16px] px-7 py-6 max-sm:px-5 max-sm:py-5 shadow-[0_10px_35px_rgba(5,9,31,.05)]">
                    <h3 className="text-[1.12rem] max-sm:text-[1rem] mb-2">{step.title}</h3>
                    <p className="body !text-[.88rem] max-sm:!text-[.8rem] !leading-[1.7]">{step.description}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 max-md:py-14" aria-labelledby="panelboard-design-title">
        <div className="container">
          <div className="grid grid-cols-[.82fr_1.18fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 items-center">
            <div className="rv-l">
              <div className="label label-white">Engineering &amp; Design · Stage 02</div>
              <h2 id="panelboard-design-title" className="text-white mt-4 !leading-[1.08]">
                Panelboard<br />
                <em>Design Stage.</em>
              </h2>
              <p className="text-white/60 text-[.96rem] leading-[1.8] mt-6 max-w-[620px]">
                Detailed equipment models allow the engineering team to review the panelboard&apos;s internal arrangement before drawings are approved and the assembly is released for manufacturing.
              </p>

              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mt-8">
                {[
                  { number: '01', title: 'Equipment Layout', text: 'Position major devices and structural members within the available footprint.' },
                  { number: '02', title: 'Breaker Arrangement', text: 'Coordinate main and branch devices around project distribution requirements.' },
                  { number: '03', title: 'Bus & Cable Routing', text: 'Review connection paths, entry points, and internal working clearances.' },
                  { number: '04', title: 'Design Review', text: 'Verify the model and drawings before the manufacturing release.' },
                ].map((item) => (
                  <article key={item.number} className="rounded-[12px] border border-white/[.1] bg-white/[.045] p-5">
                    <div className="font-mono text-[.53rem] font-bold tracking-[.14em] text-blue mb-3">{item.number}</div>
                    <div className="font-display text-[.83rem] font-black text-white mb-2">{item.title}</div>
                    <p className="font-mono text-[.7rem] leading-[1.6] text-white/45 m-0">{item.text}</p>
                  </article>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/contact?product=custom-panelboard" className="btn btn-primary mag">Discuss a Panelboard Project →</Link>
                <Link href="/products/remote-power-panels" className="btn btn-outline mag">Panelboard Solutions</Link>
              </div>
            </div>

            <figure className="relative aspect-square max-lg:aspect-[4/3] max-sm:aspect-square overflow-hidden rounded-[18px] border border-white/[.12] bg-[#CBECEF] rv-r">
              <Image
                src="/images/projects/panelboard-design-stage/panelboard-design-stage.png"
                alt="Engineering model showing a panelboard internal frame, main breaker, branch breakers, and bus connections during the design stage"
                fill
                className="object-contain p-4 max-sm:p-2"
                sizes="(max-width:1024px) 100vw, 57vw"
              />
              <figcaption className="absolute left-4 bottom-4 rounded-full border border-white/35 bg-navy/80 px-3 py-2 font-mono text-[.52rem] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">
                Engineering Visualization · Pre-Manufacturing
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <div className="label label-white rv">Start the Conversation</div>
            <h2 className="rv">Bring Us In From the Beginning.</h2>
            <p className="lead rv !text-white/[.6] !max-w-[650px]">Share your objectives, specifications, site conditions, and schedule. Our team will help identify the right path from initial requirements through commissioning.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact" className="btn btn-primary btn-lg mag">Discuss Your Project</Link>
              <Link href="/products" className="btn btn-outline btn-lg mag">Explore Products</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
