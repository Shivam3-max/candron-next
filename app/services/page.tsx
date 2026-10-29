import Link from 'next/link'
import Image from 'next/image'
import { HeroArt } from '@/components/LineArt'
import DesignGallery, { type DesignShot } from '@/components/DesignGallery'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/seo'

export const metadata = { alternates: { canonical: '/services' },
  title: 'Electrical Engineering Services',
  description: 'Electrical engineering from CANDRON: power-system studies, protection coordination, equipment design, documentation and field support for your project.',
}

const services = [
  { number: '01', title: 'Power System Studies', text: 'Short-circuit, load-flow, arc-flash, grounding, harmonic, and equipment-duty assessments aligned with the project operating conditions.' },
  { number: '02', title: 'Protection & Coordination', text: 'Protection philosophies, time-current coordination, relay settings, and selective coordination for dependable system operation.' },
  { number: '03', title: 'Equipment Engineering', text: 'Application engineering for transformers, switchgear, switchboards, control panels, and integrated power-distribution assemblies.' },
  { number: '04', title: 'Custom Replacement Design', text: 'Fit-for-purpose replacement equipment engineered around existing footprints, connection points, electrical ratings, and site constraints.' },
  { number: '05', title: 'Drawings & Documentation', text: 'Single-line diagrams, schematics, layouts, bills of material, settings documentation, test records, and final as-built packages.' },
  { number: '06', title: 'Field & Commissioning Support', text: 'Installation review, startup planning, energization support, troubleshooting, and verification from the engineers behind the design.' },
]

const process = [
  { n: '01', title: 'Define', text: 'Review objectives, existing conditions, electrical data, site constraints, schedule, and applicable standards.' },
  { n: '02', title: 'Analyze', text: 'Develop the system model, complete required studies, and establish the equipment and protection basis.' },
  { n: '03', title: 'Design', text: 'Prepare coordinated electrical and mechanical designs, drawings, specifications, and review packages.' },
  { n: '04', title: 'Deliver', text: 'Manage Canadian-made supply, factory testing, documentation, installation, and commissioning through one accountable team.' },
]

const VPI = '/images/engineering/mv-vpi'
const vpiShots: DesignShot[] = [
  { src: `${VPI}/01-core-coil.jpg`, w: 601, h: 757, chapter: 'Core & Coil', title: 'Core and VPI windings', text: 'Three vacuum-pressure-impregnated coils on a step-lap core, held by the top and bottom clamping frames and mounted on the base channels.' },
  { src: `${VPI}/02-bus-connections.jpg`, w: 601, h: 671, chapter: 'Core & Coil', title: 'HV and LV bus connections', text: 'Copper links form the high-voltage delta across the coils, while the low-voltage bus is routed out to the side for the secondary terminations.' },
  { src: `${VPI}/03-barriers-guard.jpg`, w: 808, h: 727, chapter: 'Core & Coil', title: 'Phase barriers and guard frame', text: 'Insulating barriers sit between the phases and a guard frame surrounds the live parts, keeping clearances consistent and the unit safe to service.' },
  { src: `${VPI}/04-rear-view.jpg`, w: 674, h: 712, chapter: 'Core & Coil', title: 'Rear view of the active part', text: 'The same assembly from the other side: the LV bus take-off, tap connections and the full extent of the guard frame.' },
  { src: `${VPI}/05-assembled-in-frame.jpg`, w: 777, h: 754, chapter: 'Assembly', title: 'Active part inside the enclosure frame', text: 'The core and coil set into the enclosure structure, with removable roof panels and the HV bushing plate positioned for cable entry.' },
  { src: `${VPI}/06-lv-termination.jpg`, w: 681, h: 655, chapter: 'Assembly', title: 'Low-voltage termination plate', text: 'LV bus bars pass through an insulated termination plate, ready for cable or bus duct connection on site.' },
  { src: `${VPI}/07-frame-layout.jpg`, w: 603, h: 696, chapter: 'Assembly', title: 'Frame and coil layout', text: 'Section framing is arranged around the coils so that airflow, lifting and service access are all resolved before the order is released.' },
  { src: `${VPI}/08-termination-panel.jpg`, w: 604, h: 697, chapter: 'Assembly', title: 'Cable termination panel', text: 'High- and low-voltage terminations grouped on one side panel, with bracing across the coils for transport and short-circuit strength.' },
  { src: `${VPI}/09-cable-compartment.jpg`, w: 563, h: 649, chapter: 'Assembly', title: 'Termination compartment', text: 'A dedicated compartment with separate HV bushings and LV bus bars, giving installers clear working space for the incoming and outgoing cables.' },
  { src: `${VPI}/10-clearances.jpg`, w: 606, h: 636, chapter: 'Assembly', title: 'Clearances checked in the model', text: 'Electrical clearances between the coils, bus and enclosure are verified in 3D before any steel is cut.' },
  { src: `${VPI}/11-finished-enclosure.jpg`, w: 762, h: 712, chapter: 'Enclosure', title: 'Finished ventilated enclosure', text: 'The completed unit: a three-section enclosure with louvred panels top and bottom for natural air cooling, ready for indoor installation.' },
]

export default function ElectricalEngineeringServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Engineering Services', href: '/services' }])} />
      <section className="page-hero">
        <div className="page-hero-bg" style={{ background: "linear-gradient(90deg,rgba(5,9,31,.9),rgba(5,9,31,.48)),url('/images/projects/2500a-switchboard-production/2500a-switchboard-production.jpg') center 48%/cover" }} />
        <HeroArt kind="cap-eng" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Electrical Engineering Services</span></div>
          <div className="label label-white">Power Systems · Equipment · Field Support</div>
          <h1>Electrical Engineering<br /><em>Built Around Your Project.</em></h1>
          <p className="lead mt-4">From system studies and protection coordination to equipment design, documentation, and commissioning support—CANDRON connects engineering decisions directly to the Canadian-made equipment we provide and to field execution.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact?service=electrical-engineering" className="btn btn-primary btn-lg mag">Discuss Your Requirements →</Link>
            <Link href="/project-process" className="btn btn-outline btn-lg mag">View Our Process</Link>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-[.82fr_1.18fr] max-lg:grid-cols-1 gap-14 items-start">
            <div className="rv-l lg:sticky lg:top-[140px]">
              <div className="label">Engineering With Accountability</div>
              <h2>One Team From Analysis to Energization</h2>
              <p className="body mt-5">CANDRON&apos;s engineers work together across system analysis, equipment design, Canadian-made supply, factory testing, and field commissioning. That continuity reduces handoffs and keeps technical decisions connected to the equipment that will ultimately be installed.</p>
              <p className="body mt-5">Whether the requirement is a new distribution system, a custom replacement transformer, a protection review, or support for an urgent field condition, our work begins with the application—not a standard catalogue configuration.</p>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mt-8">
                {[
                  { value: 'P.Eng', label: 'Engineering Oversight' },
                  { value: 'One Team', label: 'Design to Testing' },
                  { value: '24/7', label: 'Emergency Response' },
                  { value: 'North America', label: 'Project Support' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[12px] border border-[#DCE3F2] bg-off px-5 py-4">
                    <div className="font-display text-[1.125rem] font-black text-navy">{item.value}</div>
                    <div className="font-mono text-[.8125rem] uppercase tracking-[.09em] text-slate mt-1.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
              {services.map((service, index) => (
                <article key={service.number} className={`rv${index ? ` d${Math.min(index + 1, 4)}` : ''} rounded-[16px] border border-[#E3E8F2] bg-off p-7 min-h-[220px]`}>
                  <div className="font-mono text-[.8125rem] font-bold tracking-[.14em] text-blue mb-5">{service.number}</div>
                  <h3 className="text-[1.125rem] mb-3">{service.title}</h3>
                  <p className="body !text-[1.0625rem] !leading-[1.72]">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 max-md:py-14" aria-labelledby="engineering-design-title">
        <div className="container">
          <div className="grid grid-cols-[.88fr_1.12fr] max-lg:grid-cols-1 gap-12 items-center">
            <div className="rv-l">
              <div className="label label-white">From Model to Canadian-Made Equipment</div>
              <h2 id="engineering-design-title" className="text-white mt-4 !leading-[1.08]">Designed to Fit.<br /><em>Engineered to Perform.</em></h2>
              <p className="text-white/[.68] text-[1.125rem] leading-[1.8] mt-6">Detailed engineering models coordinate equipment layout, device arrangement, bus and cable routing, working clearances, and connection points before a design is released to the manufacturer.</p>
              <ul className="mt-8 p-0 list-none grid gap-3">
                {[
                  'Electrical and mechanical design developed together',
                  'Existing footprints and site interfaces incorporated early',
                  'Design reviews completed before the order is released',
                  'Factory testing tied back to approved project requirements',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/[.68] text-[1.0625rem] leading-[1.6]">
                    <span className="mt-[.35rem] w-2 h-2 rounded-full bg-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact?service=electrical-engineering" className="btn btn-primary mag mt-9">Start an Engineering Review →</Link>
            </div>
            <div className="grid grid-cols-2 gap-4 rv-r max-sm:grid-cols-1">
              <figure className="relative min-h-[510px] max-sm:min-h-[340px] overflow-hidden rounded-[16px] border border-white/15 bg-[#CBECEF]">
                <Image src="/images/projects/panelboard-design-stage/panelboard-design-stage.png" alt="Detailed engineering model of a custom panelboard before order release" fill className="object-contain p-4" sizes="(max-width:640px) 100vw, 28vw" />
                <figcaption className="absolute left-4 bottom-4 rounded-full bg-navy/85 px-3 py-2 font-mono text-[.8125rem] font-bold uppercase tracking-[.08em] text-white">Engineering Model</figcaption>
              </figure>
              <figure className="relative min-h-[510px] max-sm:min-h-[340px] overflow-hidden rounded-[16px] border border-white/15 bg-white/[.04]">
                <Image src="/images/projects/2500a-switchboard-production/2500a-switchboard-production.jpg" alt="Custom 2500 amp Canadian-made switchboard in production for CANDRON" fill className="object-cover object-center" sizes="(max-width:640px) 100vw, 28vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <figcaption className="absolute left-4 bottom-4 rounded-full bg-navy/85 px-3 py-2 font-mono text-[.8125rem] font-bold uppercase tracking-[.08em] text-white">Canadian-Made Supply</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-off vpi-showcase" aria-labelledby="vpi-showcase-title">
        <div className="container">
          <div className="vpi-grid">
            <div className="vpi-copy rv-l">
              <div className="label">Engineering Showcase</div>
              <h2 id="vpi-showcase-title">Medium-Voltage Dry-Type VPI Transformer<br /><em>Modelled Before It&rsquo;s Built.</em></h2>
              <p className="body mt-5">Every transformer CANDRON provides can be modelled in 3D before it is released to the factory. This medium-voltage dry-type VPI unit shows how our engineers resolve the core and coil, connections, barriers, terminations and enclosure as one coordinated design.</p>
              <ul className="vpi-points">
                <li><strong>Core &amp; coil</strong><span>Step-lap core, VPI windings and clamping structure</span></li>
                <li><strong>Connections</strong><span>HV delta links and LV bus take-off in copper</span></li>
                <li><strong>Safety</strong><span>Phase barriers, guard frame and verified clearances</span></li>
                <li><strong>Enclosure</strong><span>Termination compartments and louvred natural cooling</span></li>
              </ul>
              <div className="vpi-cta">
                <Link href="/products/transformers/dry-type-mv/standard" className="btn btn-primary mag">See the VPI Transformer →</Link>
                <Link href="/contact?service=electrical-engineering" className="vpi-link">Discuss your design →</Link>
              </div>
            </div>
            <div className="vpi-gallery rv-r">
              <DesignGallery shots={vpiShots} label="Medium-voltage dry-type VPI transformer — 3D engineering model views" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="engineering-process-title">
        <div className="container">
          <div className="text-center max-w-[720px] mx-auto mb-12 rv">
            <div className="label justify-center">A Connected Engineering Process</div>
            <h2 id="engineering-process-title">Define. Analyze. Design. Deliver.</h2>
            <p className="lead mt-4 mx-auto">A structured path that keeps the project requirements, engineering decisions, supplied equipment, and field results connected.</p>
          </div>
          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {process.map((step, index) => (
              <article key={step.n} className={`rv${index ? ` d${index + 1}` : ''} relative rounded-[16px] border border-[#E3E8F2] bg-off p-7 min-h-[240px]`}>
                <div className="font-mono text-[.8125rem] font-bold tracking-[.14em] text-blue mb-8">{step.n}</div>
                <h3 className="text-[1.1875rem] mb-3">{step.title}</h3>
                <p className="body !text-[1.0625rem] !leading-[1.72]">{step.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-[16px] border border-[#DCE3F2] bg-navy px-8 py-7 rv">
            <div className="grid grid-cols-[.65fr_1.35fr] max-md:grid-cols-1 gap-6 items-center">
              <div>
                <div className="label label-white">Standards &amp; Deliverables</div>
                <h3 className="text-white text-[1.265rem] mt-3 mb-0">Engineering that is ready to review, build, test, and maintain.</h3>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                {['ANSI', 'IEEE', 'CSA', 'NETA', 'Single-Line Diagrams', 'As-Built Documentation'].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/[.06] px-4 py-2 font-mono text-[.8125rem] font-bold uppercase tracking-[.08em] text-white/70">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <div className="label label-white rv">Bring Engineering In Early</div>
            <h2 className="rv">Start With the Right Technical Foundation.</h2>
            <p className="lead rv !text-white/[.6] !max-w-[680px]">Share your system information, existing drawings, equipment specifications, site constraints, and schedule. Our engineering team will help define the next step.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?service=electrical-engineering" className="btn btn-primary btn-lg mag">Request Engineering Support</Link>
              <Link href="/commissioning" className="btn btn-outline btn-lg mag">Field &amp; Commissioning Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
