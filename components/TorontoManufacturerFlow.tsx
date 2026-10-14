import Link from 'next/link'
import CanadaFlag from '@/components/CanadaFlag'

const steps = [
  {
    number: '01',
    title: 'Engineering',
    text: 'Electrical and mechanical designs move through multi-level review.',
  },
  {
    number: '02',
    title: 'Fabrication',
    text: 'Precision metalwork is produced with advanced German robotic machinery.',
  },
  {
    number: '03',
    title: 'Assembly',
    text: 'Experienced Toronto technicians assemble and wire each system in-house.',
  },
  {
    number: '04',
    title: 'Testing',
    text: 'Omicron and Phenix systems verify performance before shipment.',
  },
  {
    number: '05',
    title: 'Delivery',
    text: 'Finished equipment ships with test reports and project documentation.',
  },
]

export default function TorontoManufacturerFlow() {
  return (
    <section className="section bg-white" aria-labelledby="toronto-manufacturer-title">
      <div className="container">
        <div className="mx-auto max-w-[980px] text-center rv">
          <div className="label justify-center">Toronto Power Equipment Manufacturer</div>
          <h2 id="toronto-manufacturer-title" className="mt-4 !leading-[1.08]">
            A Leading Local Manufacturer.<br />
            <em>One Connected Process.</em>
          </h2>
          <p className="lead mx-auto mt-5 !max-w-[850px]">
            CANDRON is a Toronto-based manufacturer of switchgear, switchboards,
            and dry-type transformers. Engineering, precision manufacturing,
            assembly, testing, and delivery are coordinated under one roof for
            reliable quality and shorter lead times.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d7deeb] bg-[#f7f9fd] px-4 py-2 font-mono text-[.62rem] font-bold uppercase tracking-[.1em] text-navy">
              <CanadaFlag height={17} /> Toronto, Ontario, Canada
            </span>
            <span className="rounded-full border border-[#d7deeb] bg-[#f7f9fd] px-4 py-2 font-mono text-[.62rem] font-bold uppercase tracking-[.1em] text-navy">
              Local Engineering &amp; Manufacturing
            </span>
          </div>
        </div>

        <ol className="manufacturer-flow mt-12 lg:mt-16" aria-label="CANDRON manufacturing flow">
          {steps.map((step) => (
            <li key={step.number} className="manufacturer-flow-step rv">
              <div className="manufacturer-flow-number">{step.number}</div>
              <div className="manufacturer-flow-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="manufacturer-project-cta mt-10 flex flex-col items-center justify-between gap-5 rounded-[16px] border border-blue/15 bg-navy px-6 py-6 text-center sm:flex-row sm:text-left lg:px-9">
          <div className="manufacturer-project-copy">
            <div className="font-title text-[1rem] font-bold text-white sm:text-[1.1rem]">
              Switchgear · Switchboards · Dry-Type Transformers
            </div>
            <p className="mt-1.5 text-[.82rem] leading-6 text-white/55">
              Engineered and manufactured locally in Toronto for projects across North America.
            </p>
          </div>
          <Link href="/contact" className="manufacturer-project-button btn btn-primary shrink-0">Discuss Your Project →</Link>
        </div>
      </div>
    </section>
  )
}
