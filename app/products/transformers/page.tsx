import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Custom Power Transformers',
  description: 'Explore CANDRON custom power transformer projects, including matched replacement units, Arctic mining transformers, and a 6 MVA FR3-filled medium-voltage transformer.',
}

const customTransformerImages = [
  {
    src: '/images/projects/custom-power-transformers/transformer-ready-to-ship.jpg',
    alt: 'Custom CANDRON power transformer prepared for shipment',
  },
  {
    src: '/images/projects/custom-power-transformers/transformer-radiator-bank.jpg',
    alt: 'Radiator bank and cooling assembly on a custom power transformer',
  },
  {
    src: '/images/projects/custom-power-transformers/transformer-front-view.jpg',
    alt: 'Front view of a custom-built power transformer in the manufacturing facility',
  },
  {
    src: '/images/projects/custom-power-transformers/transformer-side-view.jpg',
    alt: 'Side view of a completed custom power transformer before shipment',
  },
  {
    src: '/images/projects/custom-power-transformers/transformer-final-inspection.jpg',
    alt: 'Custom power transformer undergoing final inspection before delivery',
  },
]

const categories = [
  {
    num: '01',
    name: 'Padmount Transformers',
    sub: 'Liquid-Filled · Underground Distribution',
    desc: 'Tamper-resistant, compartmentalized liquid-filled units for pad-mount underground cable systems. Three-phase and single-phase configurations from 15 kVA to 3,000 kVA.',
    href: '/products/transformers/padmount',
    specs: ['15 kVA – 3,000 kVA', '5 kV – 34.5 kV Primary', 'ANSI C57 / IEEE / CSA'],
    types: ['Three-Phase Padmount', 'Single-Phase Padmount'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="8" width="18" height="12" rx="2"/>
        <path d="M7 8V5a5 5 0 0 1 10 0v3"/>
        <circle cx="8.5" cy="14" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="15.5" cy="14" r="1.5" fill="currentColor" stroke="none"/>
        <line x1="8.5" y1="12.5" x2="15.5" y2="12.5" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    num: '02',
    name: 'Substation Transformers',
    sub: 'Liquid-Filled · Power Transformation',
    desc: 'Oil-immersed power transformers for utility substations and industrial facilities. High-voltage primaries from 34.5 kV to 345 kV with ONAN, ONAF, and OFAF cooling options.',
    href: '/products/transformers/substation',
    specs: ['1 MVA – 100+ MVA', '34.5 kV – 345 kV Primary', 'IEEE C57.12 / CSA C88'],
    types: ['Power Substation Transformer', 'Polemount Transformer'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="6" width="20" height="14" rx="2"/>
        <path d="M7 6V4M12 6V2M17 6V4"/>
        <line x1="7" y1="12" x2="17" y2="12"/>
        <line x1="7" y1="15" x2="17" y2="15"/>
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Low Voltage Dry-Type',
    sub: 'Dry-Type · Indoor Distribution',
    desc: 'Ventilated and encapsulated dry-type units for commercial buildings, data centres, and industrial distribution systems. UL 1561 listed and CSA certified for indoor installations.',
    href: '/products/transformers/dry-type-lv',
    specs: ['15 kVA – 2,500 kVA', 'Primary to 600 V', 'UL 1561 / CSA / NEMA ST-20'],
    types: ['Standard LV Dry-Type', 'Isolation Transformer'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2 Q7 7 7 12 Q7 17 12 22 Q17 17 17 12 Q17 7 12 2"/>
        <line x1="7" y1="12" x2="3" y2="12"/>
        <line x1="17" y1="12" x2="21" y2="12"/>
      </svg>
    ),
  },
  {
    num: '04',
    name: 'Medium Voltage Dry-Type',
    sub: 'Dry-Type · Industrial / Utility',
    desc: 'VPI and resin-encapsulated dry-type transformers rated from 2.4 kV to 35 kV. Cast coil designs available for demanding chemical, coastal, and high-humidity environments.',
    href: '/products/transformers/dry-type-mv',
    specs: ['300 kVA – 30 MVA', '2.4 kV – 35 kV Primary', 'IEEE C57.12.01 / IEC 60076'],
    types: ['Standard MV Dry-Type', 'Cast Coil Transformer'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 12 C2 7 7 4 12 4 C17 4 22 7 22 12 C22 17 17 20 12 20 C7 20 2 17 2 12"/>
        <path d="M6 12 C6 9 9 7 12 7 C15 7 18 9 18 12"/>
        <line x1="12" y1="4" x2="12" y2="2"/>
        <line x1="12" y1="22" x2="12" y2="20"/>
      </svg>
    ),
  },
]

const transformerFamilies = [
  { name: 'Padmount', detail: 'Single- and three-phase underground distribution', href: '/products/transformers/padmount' },
  { name: 'Pole', detail: 'Overhead utility and rural distribution', href: '/products/transformers/substation/polemount' },
  { name: 'Station Class', detail: 'Industrial and utility substation applications', href: '/products/transformers/substation' },
  { name: 'EHV', detail: 'Extra-high-voltage project consultation', href: '/contact?product=ehv-transformer' },
  { name: 'Dry-Type', detail: 'Low- and medium-voltage dry-type configurations', href: '/products/transformers/dry-type-lv' },
  { name: 'Solid-State Transformers', detail: 'Application review and engineered solutions', href: '/contact?product=solid-state-transformer' },
]

const transformerApplications = [
  { name: 'Control & Lighting', detail: 'Low-voltage dry-type, general-purpose step-up/step-down, isolation, and autotransformers' },
  { name: 'Distribution', detail: 'Utility, commercial, and industrial power distribution' },
  { name: 'Solar, Renewable & Inverter Duty', detail: 'Renewable generation and power-electronic loads' },
  { name: 'Traction', detail: 'Rail and transit power systems' },
  { name: 'Grounding', detail: 'System grounding and neutral-reference applications' },
  { name: 'Residential', detail: 'Underground and overhead residential distribution' },
  { name: 'Rural', detail: 'Long-feeder and remote-service applications' },
  { name: 'Generation', detail: 'Generator step-up and station-service applications' },
  { name: 'Transmission', detail: 'Grid and high-voltage power transfer applications' },
]

export default function TransformersPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background: "url('/images/projects/custom-power-transformers/transformer-ready-to-ship.jpg') center/cover" }}>
          <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span>Transformers</span>
          </div>
          <div className="label label-white">ANSI · IEEE · CSA · IEC</div>
          <h1>
            Transformer Solutions
            <br />
            <em>for Critical Infrastructure</em>
          </h1>
          <p className="lead mt-4">
            Padmount, substation, and dry-type transformers specified, manufactured, and tested in-house. Every unit built to the voltage, kVA, and environmental requirements of your project.
          </p>
          <div className="flex gap-[.65rem] flex-wrap mt-6">
            {['Padmount', 'Substation', 'LV Dry-Type', 'MV Dry-Type', 'Cast Coil', 'Custom Configurations'].map(b => (
              <span key={b} className="py-[.38rem] px-[.9rem] bg-white/[.1] border border-white/20 rounded-full text-[.72rem] font-bold text-white font-mono tracking-[.04em]">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="bg-navy border-b border-white/[.08]">
        <div className="container">
          <div className="transformer-kpi-grid grid grid-cols-4 max-sm:grid-cols-2">
            {[
              { v: '4', l: 'Transformer Categories' },
              { v: 'CSA / ANSI', l: 'Certified Standards' },
              { v: '100+ MVA', l: 'Max Substation Rating' },
              { v: 'In-House', l: 'FAT & Testing' },
            ].map((k, i) => (
              <div key={k.l} className={`py-[1.1rem] px-4 text-center min-w-0 ${i < 3 ? 'border-r border-white/[.08]' : ''} max-sm:${i === 1 ? 'border-r-0' : ''}`}>
                <div className="font-display font-black text-[1.05rem] text-white tracking-[.03em] mb-[.2rem] break-words [overflow-wrap:anywhere]">{k.v}</div>
                <div className="font-mono text-[.52rem] text-white/[.4] tracking-[.14em] uppercase break-words [overflow-wrap:anywhere]">{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CUSTOM POWER TRANSFORMER PROJECT */}
      <section className="section bg-white" id="custom-transformer-project" aria-labelledby="custom-transformer-project-title">
        <div className="container">
          <div className="grid grid-cols-[.88fr_1.12fr] max-lg:grid-cols-1 gap-12 max-lg:gap-9 items-start">
            <div className="rv-l lg:sticky lg:top-[7rem]">
              <div className="label">Project Spotlight</div>
              <h2 id="custom-transformer-project-title" className="mt-4 !leading-[1.08]">
                Custom Engineered.<br />
                <em>Precision Built.</em><br />
                Delivered at Scale.
              </h2>
              <p className="body mt-6">
                When replacement equipment needs to match existing infrastructure, precision matters. CANDRON delivered seven identical custom-built power transformers engineered around the customer&apos;s existing specifications and integration requirements.
              </p>

              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-3 mt-7">
                {[
                  { value: '7', label: 'Identical Units' },
                  { value: '28 Weeks', label: 'Manufacturing Release to Shipment' },
                  { value: '55/65°C', label: 'Temperature Rise Design' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[12px] border border-blue/[.16] bg-off px-4 py-4 min-w-0">
                    <div className="font-display text-[1rem] font-black text-blue break-words">{item.value}</div>
                    <div className="font-mono text-[.52rem] uppercase tracking-[.1em] text-gray mt-1.5 leading-[1.45]">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="font-mono text-[.58rem] font-bold tracking-[.18em] text-blue uppercase mb-4">Key Highlights</div>
                <ul className="check-list">
                  <li>Custom engineered to match the existing transformer specifications</li>
                  <li>Seven identical units manufactured and shipped within 28 weeks of manufacturing release</li>
                  <li>High-grade magnetic core engineered to optimize the overall transformer footprint</li>
                  <li>55/65°C temperature-rise design</li>
                </ul>
              </div>

              <p className="body mt-7">
                Application-specific engineering and manufacturing expertise deliver consistent, space-efficient power solutions for demanding replacement and expansion projects.
              </p>
              <Link href="/contact?product=custom-power-transformer" className="btn btn-primary mag mt-8">Discuss a Custom Transformer →</Link>
            </div>

            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 rv-r">
              {customTransformerImages.map((image, index) => (
                <figure
                  key={image.src}
                  className={`relative overflow-hidden rounded-[16px] bg-off border border-[#E8ECF5] ${index === 0 ? 'col-span-2 max-sm:col-span-1 aspect-[16/10]' : 'aspect-[4/3]'}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.025]"
                    sizes={index === 0 ? '(max-width:1024px) 100vw, 58vw' : '(max-width:640px) 50vw, 29vw'}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ARCTIC MINING POWER TRANSFORMER */}
      <section className="bg-navy py-20 max-md:py-14" aria-labelledby="arctic-transformer-title">
        <div className="container">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-12 max-lg:gap-8 items-center">
            <div className="relative min-h-[560px] max-lg:min-h-0 max-lg:aspect-[4/3] max-sm:aspect-[1/1] overflow-hidden rounded-[20px] border border-white/[.12] rv-l">
              <Image
                src="/images/projects/arctic-mining-transformer/arctic-mining-power-transformer.jpg"
                alt="15/20 MVA 69 kV to 13.8 kV power transformer engineered for an Arctic mining project"
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.55),transparent_45%)] pointer-events-none" />
              <div className="absolute left-5 bottom-5 flex flex-wrap gap-2">
                {['15/20 MVA', '69 kV → 13.8 kV', 'Arctic Mining'].map((badge) => (
                  <span key={badge} className="rounded-full border border-white/25 bg-navy/75 px-3 py-2 font-mono text-[.58rem] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">{badge}</span>
                ))}
              </div>
            </div>

            <div className="rv-r">
              <div className="label label-white">Project Spotlight · Arctic Mining</div>
              <h2 id="arctic-transformer-title" className="text-white mt-4 !leading-[1.08]">
                Engineered for the Extreme.<br />
                <em>Built for the Arctic.</em>
              </h2>
              <p className="text-white/60 text-[.96rem] leading-[1.8] mt-6 max-w-[620px]">
                This 15/20 MVA power transformer steps 69 kV down to 13.8 kV for critical infrastructure in a demanding Arctic mining environment, where dependable operation and environmental performance are essential.
              </p>

              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mt-8">
                {[
                  { value: '15/20 MVA', label: 'Rated Capacity' },
                  { value: '69 / 13.8 kV', label: 'Voltage Transformation' },
                  { value: 'CTs Included', label: 'Protection & Metering' },
                  { value: 'Fully Instrumented', label: 'Gauges & Accessories' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[12px] border border-white/[.1] bg-white/[.045] px-5 py-4 min-w-0">
                    <div className="font-display text-[.92rem] font-black text-white break-words">{item.value}</div>
                    <div className="font-mono text-[.52rem] uppercase tracking-[.1em] text-white/40 mt-1.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-8 p-0 list-none grid gap-3">
                {[
                  'Engineered specifically for remote Arctic mining applications',
                  'Current transformers integrated for protection and metering',
                  'Complete instrumentation package with monitoring gauges and accessories',
                  'Application-specific configuration for demanding industrial service',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/65 text-[.86rem] leading-[1.6]">
                    <span className="mt-[.35rem] w-2 h-2 rounded-full bg-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-9">
                <Link href="/contact?product=arctic-power-transformer" className="btn btn-primary mag">Discuss Your Application →</Link>
                <Link href="/products/transformers/substation/power" className="btn btn-outline mag">Power Transformers</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 MVA FR3 MEDIUM-VOLTAGE TRANSFORMER */}
      <section className="section bg-off" aria-labelledby="fr3-transformer-title">
        <div className="container">
          <div className="grid grid-cols-[.95fr_1.05fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 items-center">
            <div className="rv-l">
              <div className="label">Project Spotlight · Medium Voltage</div>
              <h2 id="fr3-transformer-title" className="mt-4 !leading-[1.08]">
                A Big Beast.<br />
                <em>Built for Serious Power.</em>
              </h2>
              <p className="lead mt-6 max-w-[620px]">
                A 6 MVA power transformer engineered for demanding medium-voltage applications, stepping 44 kV down to 15 kV with copper windings, FR3 natural ester insulating fluid, and fan-assisted cooling.
              </p>

              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-3 mt-8">
                {[
                  { value: '6 MVA', label: 'Rated Capacity' },
                  { value: '44 → 15 kV', label: 'Voltage Transformation' },
                  { value: '36 Months', label: 'Warranty' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[12px] border border-[#DCE3F2] bg-white px-4 py-4 min-w-0">
                    <div className="font-display text-[.9rem] font-black text-navy break-words">{item.value}</div>
                    <div className="font-mono text-[.5rem] uppercase tracking-[.1em] text-slate mt-1.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-8 p-0 list-none grid gap-3">
                {[
                  'Copper-wound construction',
                  'FR3 natural ester insulating fluid',
                  'Fan-assisted cooling',
                  'Monitoring gauges and complete instrumentation',
                  'cULus Listed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate text-[.86rem] leading-[1.6]">
                    <span className="mt-[.35rem] w-2 h-2 rounded-full bg-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-9">
                <Link href="/contact?product=6mva-fr3-transformer" className="btn btn-primary mag">Discuss Your Application →</Link>
                <Link href="/products/transformers/substation/power" className="btn btn-outline mag">Power Transformers</Link>
              </div>
            </div>

            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 rv-r">
              {[
                {
                  src: '/images/projects/6mva-fr3-transformer/6mva-transformer-front.jpg',
                  alt: 'Front view of a 6 MVA 44 kV to 15 kV CANDRON power transformer prepared for transport',
                  label: '6 MVA · 44/15 kV',
                },
                {
                  src: '/images/projects/6mva-fr3-transformer/6mva-transformer-side.jpg',
                  alt: 'Side view of a copper-wound 6 MVA transformer with FR3 fluid and fan-assisted cooling',
                  label: 'FR3 · Fan Cooled',
                },
              ].map((image) => (
                <figure key={image.src} className="relative aspect-[3/4] overflow-hidden rounded-[18px] border border-[#DCE3F2] bg-white shadow-[0_12px_35px_rgba(5,9,31,.1)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.025]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 27vw"
                  />
                  <figcaption className="absolute left-4 bottom-4 rounded-full border border-white/35 bg-navy/80 px-3 py-2 font-mono text-[.56rem] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">
                    {image.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <div className="section bg-off">
        <div className="container">
          <div className="text-center max-w-[580px] mx-auto mb-14 rv">
            <div className="label justify-center">Product Range</div>
            <h2>Four Transformer Categories.<br />One Manufacturing Source.</h2>
            <p className="lead mt-4">Every category is engineered and built in-house at our Toronto, Ontario facility — no third-party fabricators, no communication gaps.</p>
          </div>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`rv no-underline group flex flex-col gap-5 p-8 rounded-[20px] bg-white border border-[#E8ECF5] shadow-[0_2px_20px_rgba(5,9,31,.05)] transition-[border-color,box-shadow,transform] duration-200 hover:border-blue hover:shadow-[0_8px_40px_rgba(0,71,255,.12)] hover:-translate-y-[2px]${i === 1 ? ' d2' : i === 2 ? ' d3' : i === 3 ? ' d4' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-[12px] bg-blue/[.08] text-blue flex items-center justify-center shrink-0 transition-[background] duration-200 group-hover:bg-blue group-hover:text-white">
                    <div className="w-6 h-6">{cat.icon}</div>
                  </div>
                  <span className="font-mono text-[.58rem] font-bold tracking-[.18em] text-blue/60 uppercase pt-[.2rem]">{cat.num}</span>
                </div>
                <div>
                  <div className="font-display font-extrabold text-[1.1rem] text-navy leading-[1.2] mb-[.35rem]">{cat.name}</div>
                  <div className="font-mono text-[.62rem] text-blue tracking-[.06em] mb-3">{cat.sub}</div>
                  <p className="font-mono text-[.82rem] text-gray leading-[1.65] m-0">{cat.desc}</p>
                </div>
                <div className="flex flex-wrap gap-[.45rem]">
                  {cat.specs.map(s => (
                    <span key={s} className="font-mono text-[.6rem] font-bold tracking-[.04em] text-navy/70 bg-[#F4F6FA] px-[.7rem] py-[.3rem] rounded-[6px] border border-[#E8ECF5]">{s}</span>
                  ))}
                </div>
                <div className="border-t border-[#E8ECF5] pt-4">
                  <div className="font-mono text-[.58rem] text-gray/60 uppercase tracking-[.12em] mb-2">Types Available</div>
                  <div className="flex gap-3 flex-wrap">
                    {cat.types.map(t => (
                      <span key={t} className="flex items-center gap-[.4rem] font-mono text-[.7rem] text-navy font-semibold">
                        <span className="w-[5px] h-[5px] rounded-full bg-blue shrink-0"/>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="font-mono text-[.65rem] font-bold text-blue tracking-[.08em] uppercase mt-auto flex items-center gap-[.4rem] group-hover:gap-[.65rem] transition-[gap] duration-200">
                  Explore {cat.name} <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* TRANSFORMER FAMILIES & APPLICATIONS */}
      <div className="section bg-white">
        <div className="container">
          <div className="max-w-[720px] mb-12 rv">
            <div className="label">Transformer Portfolio</div>
            <h2>Transformer Types and Applications</h2>
            <p className="lead mt-4">
              Explore transformer solutions by construction or by the application they serve. Our engineering team can help translate project requirements into the right configuration.
            </p>
          </div>

          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
            <section className="rounded-[20px] bg-off border border-[#E8ECF5] p-8 max-sm:p-5 rv" aria-labelledby="transformer-families-heading">
              <div className="font-mono text-[.58rem] font-bold tracking-[.18em] text-blue uppercase mb-3">By Construction</div>
              <h3 id="transformer-families-heading" className="font-display text-[1.25rem] font-black text-navy mb-6">Transformer Families</h3>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                {transformerFamilies.map((family, index) => (
                  <Link
                    key={family.name}
                    href={family.href}
                    className="min-w-0 no-underline group rounded-[14px] bg-white border border-[#E8ECF5] p-4 transition-[border-color,box-shadow] duration-200 hover:border-blue hover:shadow-[0_5px_22px_rgba(0,71,255,.1)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[.55rem] font-bold tracking-[.12em] text-blue bg-blue/[.08] rounded-[6px] px-2 py-1 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                      <div className="min-w-0">
                        <div className="font-display text-[.9rem] font-extrabold text-navy leading-[1.3] break-words">{family.name}</div>
                        <p className="font-mono text-[.68rem] text-gray leading-[1.55] mt-2 mb-0 break-words">{family.detail}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[20px] bg-navy border border-blue/[.18] p-8 max-sm:p-5 rv d2" aria-labelledby="transformer-applications-heading">
              <div className="font-mono text-[.58rem] font-bold tracking-[.18em] text-blue uppercase mb-3">By Use Case</div>
              <h3 id="transformer-applications-heading" className="font-display text-[1.25rem] font-black text-white mb-6">Applications</h3>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-5 gap-y-4">
                {transformerApplications.map((application, index) => (
                  <div key={application.name} className="min-w-0 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue/[.16] text-blue flex items-center justify-center font-mono text-[.5rem] font-bold shrink-0">{index + 1}</span>
                    <div className="min-w-0">
                      <div className="font-display text-[.82rem] font-bold text-white leading-[1.35] break-words">{application.name}</div>
                      <p className="font-mono text-[.65rem] text-white/45 leading-[1.5] mt-1 mb-0 break-words">{application.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* WHY CANDRON TRANSFORMERS */}
      <div className="wt-section">
        <div className="container">
          <div className="wt-header rv">
            <div>
              <div className="label label-white">The CANDRON Difference</div>
              <h2 className="wt-h2">Why Specify <em>CANDRON</em></h2>
            </div>
            <div className="wt-header-right">
              <p className="wt-intro max-w-[440px] text-left">Every transformer we build is specified, engineered, manufactured, and tested under one roof — giving you faster delivery, better documentation, and a single point of accountability.</p>
              <Link href="/contact" className="btn btn-primary mag shrink-0">Request a Quote →</Link>
            </div>
          </div>
          <div className="wt-grid">
            {[
              {
                n: '01', title: 'Specified to Your Project',
                desc: 'We work from your one-line, utility requirements, and site conditions — not a catalogue. Every transformer is specified to match your exact kVA, voltage, and impedance requirements.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
              },
              {
                n: '02', title: 'In-House Factory Testing',
                desc: 'Every unit undergoes applied potential, induced voltage, resistance, ratio, and impedance tests before shipment. Witnessed FAT is available for your team or third-party inspector.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              },
              {
                n: '03', title: 'ANSI, IEEE & CSA Compliance',
                desc: 'Our transformers are built and tested to the applicable standards for your project — including ANSI C57, IEEE C57.12, CSA C88, IEC 60076, and UL 1561 for listed dry-type units.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
              },
              {
                n: '04', title: 'Full Documentation Package',
                desc: 'As-built drawings, test reports, nameplate data, connection diagrams, and O&M manuals delivered with every transformer — ready for your commissioning team and project records.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
              },
              {
                n: '05', title: 'Direct Engineering Access',
                desc: 'Reach our engineering team directly — no distributors, no sales layers. Technical questions, specification review, and project coordination are handled by the people who build your equipment.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
              },
              {
                n: '06', title: 'Canadian Manufacturing',
                desc: 'Built at our Toronto, Ontario facility with full in-house capability — electrical design, fabrication, assembly, and testing. No subcontracting, no overseas sourcing of critical components.',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
              },
            ].map((item, i) => (
              <div className={`wt-card rv${i > 0 ? ` d${Math.min(i + 1, 6)}` : ''}`} key={item.n}>
                <div className="wt-card-top">
                  <div className="wt-num">{item.n}</div>
                  <div className="wt-icon">{item.icon}</div>
                </div>
                <div className="wt-title">{item.title}</div>
                <p className="wt-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CALCULATOR CTA BAND */}
      <div className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5">
            {[
              { title: 'kVA Calculator', desc: 'Calculate transformer size from load voltage and current.', href: '/resources/kva-calculator', label: 'kVA' },
              { title: 'Fault Current Calculator', desc: 'Determine available short-circuit current from transformer parameters.', href: '/resources/fault-current-calculator', label: 'AFC' },
              { title: 'kW to kVA Converter', desc: 'Convert between real power and apparent power using power factor.', href: '/resources/kw-kva-calculator', label: 'PF' },
            ].map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className={`rv no-underline flex flex-col gap-4 p-7 rounded-[16px] bg-navy border border-blue/[.18] transition-[border-color,box-shadow] duration-200 hover:border-blue hover:shadow-[0_6px_30px_rgba(0,71,255,.2)]${i > 0 ? ` d${i + 1}` : ''}`}
              >
                <div className="w-11 h-11 rounded-[10px] bg-blue/[.15] flex items-center justify-center">
                  <span className="font-display font-black text-[.75rem] text-blue tracking-[.04em]">{c.label}</span>
                </div>
                <div>
                  <div className="font-display font-extrabold text-[.95rem] text-white mb-2">{c.title}</div>
                  <p className="font-mono text-[.78rem] text-white/50 leading-[1.65] m-0">{c.desc}</p>
                </div>
                <div className="font-mono text-[.62rem] font-bold text-blue tracking-[.1em] uppercase mt-auto">Open Calculator →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">Built for Your Specification</h2>
            <p className="lead rv !text-white/[.6] !max-w-[500px]">
              Tell us your voltage, kVA, and site requirements. Our engineering team will respond with a specification, lead time, and price — typically the same day.
            </p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
