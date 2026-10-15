import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Padmount Transformers',
  description: 'Tamper-resistant liquid-filled padmount transformers for underground distribution, including custom three-phase inverter-duty designs up to 3 MVA.',
}

const types = [
  {
    n: '01',
    name: 'Three-Phase Padmount',
    sub: '15 kVA – 3,000 kVA · 5 kV – 34.5 kV',
    href: '/products/transformers/padmount/three-phase',
    desc: 'Three-phase liquid-filled padmount transformers for commercial, industrial, and utility underground distribution networks.',
    specs: [['kVA Range', '15 – 3,000 kVA'], ['HV Range', '5 kV – 34.5 kV'], ['LV Range', '208 V – 15 kV'], ['Standard', 'ANSI C57.12.26']],
  },
  {
    n: '02',
    name: 'Single-Phase Padmount',
    sub: '10 kVA – 500 kVA · 2.4 kV – 34.5 kV',
    href: '/products/transformers/padmount/single-phase',
    desc: 'Single-phase padmount units for residential subdivision loops, streetlighting, and light commercial underground distribution.',
    specs: [['kVA Range', '10 – 500 kVA'], ['HV Range', '2.4 kV – 34.5 kV'], ['LV Range', '120/240 V'], ['Standard', 'ANSI C57.12.25']],
  },
]

export default function PadmountPage() {
  return (
    <>
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ background: "url('/images/products/transformers/padmount-three-phase.webp') center/cover" }}
        >
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <Link href="/products/transformers">Transformers</Link> / <span>Padmount</span>
          </div>
          <div className="label label-white">Liquid-Filled · Underground Distribution</div>
          <h1>Padmount<br /><em>Transformers</em></h1>
          <p className="lead mt-4">
            Tamper-resistant, compartmentalized liquid-filled padmount transformers for single-phase and three-phase underground cable systems. Rated from 10 kVA to 3,000 kVA at primary voltages from 2.4 kV to 34.5 kV.
          </p>
          <div className="flex gap-[.65rem] flex-wrap mt-6">
            {['ANSI C57 Rated', 'CSA Certified', 'Oil-Immersed', 'Tamper-Resistant', 'Custom Configurations'].map(b => (
              <span key={b} className="py-[.38rem] px-[.9rem] bg-white/[.1] border border-white/20 rounded-full text-[.72rem] font-bold text-white font-mono tracking-[.04em]">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="section bg-white">
        <div className="container">
          <div className="intro-split rv">
            <div>
              <div className="label">Overview</div>
              <h2>Compact, Secure<br />Underground Power</h2>
            </div>
            <div>
              <p className="body mb-5">
                Padmount transformers serve as the final voltage step-down stage in underground distribution systems, converting medium-voltage supply to the utilization voltage required by residential, commercial, and industrial loads. Their tamper-resistant enclosures and locked compartments make them the standard choice wherever public access is a concern.
              </p>
              <p className="body mb-5">
                CANDRON padmount transformers are built to ANSI C57.12.25 (single-phase) and ANSI C57.12.26 (three-phase) with CSA certification for Canadian installations. Standard features include radial or loop configurations, integral overcurrent protection options, and oil-immersed construction for thermal efficiency and long service life.
              </p>
              <p className="body">
                Both single-phase and three-phase configurations are available with customized tank dimensions, high-voltage arrangements (radial, loop, or multi-tap), low-voltage termination options, and a range of protective accessories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 MVA INVERTER-DUTY LOOP-FEED PADMOUNT PROJECT */}
      <section className="bg-navy py-20 max-md:py-14" aria-labelledby="inverter-padmount-title">
        <div className="container">
          <div className="grid grid-cols-[1.08fr_.92fr] max-lg:grid-cols-1 gap-12 max-lg:gap-9 items-center">
            <div className="grid grid-cols-2 gap-3 rv-l">
              {[
                {
                  src: '/images/projects/3mva-inverter-duty-padmount/3mva-padmount-front.jpg',
                  alt: 'Front view of a wrapped 3 MVA inverter-duty pad-mounted transformer prepared for delivery',
                  label: 'Loop Feed · Delivery Ready',
                },
                {
                  src: '/images/projects/3mva-inverter-duty-padmount/3mva-padmount-three-quarter.jpg',
                  alt: 'Three-quarter view of a 27.6 kV Delta to 600Y/347 V pad-mounted transformer',
                  label: '27.6 kV → 600Y/347 V',
                },
                {
                  src: '/images/projects/3mva-inverter-duty-padmount/3mva-padmount-side.jpg',
                  alt: 'Side view of the corrosion-resistant enclosure on a 3 MVA inverter-duty pad-mounted transformer',
                  label: '27.6 kV · Inverter Duty',
                },
              ].map((image, index) => (
                <figure key={image.src} className={`relative overflow-hidden rounded-[14px] border border-white/[.12] bg-white/[.04] ${index === 0 ? 'row-span-2 aspect-[3/4] max-sm:row-span-1' : 'aspect-[3/2] max-sm:aspect-[3/4]'}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.025]"
                    sizes={index === 0 ? '(max-width:640px) 50vw, (max-width:1024px) 50vw, 31vw' : '(max-width:640px) 50vw, (max-width:1024px) 50vw, 25vw'}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.58),transparent_45%)] pointer-events-none" />
                  <figcaption className="absolute left-3 right-3 bottom-3 font-mono text-[.5rem] font-bold uppercase tracking-[.07em] text-white">
                    {image.label}
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="rv-r">
              <div className="label label-white">Project Spotlight · Inverter Duty · Loop Feed</div>
              <h2 id="inverter-padmount-title" className="text-white mt-4 !leading-[1.08]">
                Engineered for Performance.<br />
                <em>Built for Demanding Applications.</em>
              </h2>
              <p className="text-white/60 text-[.96rem] leading-[1.8] mt-6 max-w-[620px]">
                This 3 MVA, 27.6 kV loop-feed pad-mounted transformer steps 27.6 kV Delta down to 600Y/347 V for inverter-duty service. Manufactured at our partner facility in Texas, USA, it combines precision engineering with robust, efficiency-focused construction.
              </p>

              <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-3 mt-8">
                {[
                  { value: '3 MVA', label: 'Rated Capacity' },
                  { value: '27.6 kV Δ', label: 'Primary Voltage' },
                  { value: '600Y/347 V', label: 'Secondary Voltage' },
                  { value: 'Loop Feed', label: 'HV Configuration' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[12px] border border-white/[.1] bg-white/[.045] px-4 py-4 min-w-0">
                    <div className="font-display text-[.86rem] font-black text-white break-words">{item.value}</div>
                    <div className="font-mono text-[.5rem] uppercase tracking-[.1em] text-white/40 mt-1.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-8 p-0 list-none grid gap-3">
                {[
                  'Precision-engineered for inverter-duty applications',
                  'Loop-feed high-voltage configuration for distribution continuity',
                  'High-grade magnetic core for lower sound levels and improved efficiency',
                  'Heavy-duty active parts and internal assembly components',
                  'Generously sized tank interior for convenient field maintenance',
                  'Corrosion-resistant base construction',
                  'Three-year warranty',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/65 text-[.84rem] leading-[1.55]">
                    <span className="mt-[.35rem] w-2 h-2 rounded-full bg-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-9">
                <Link href="/contact?product=3mva-inverter-duty-padmount" className="btn btn-primary mag">Discuss Your Application →</Link>
                <Link href="/products/transformers/padmount/three-phase" className="btn btn-outline mag">Three-Phase Padmounts</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TYPE CARDS */}
      <div className="section bg-off">
        <div className="container">
          <div className="text-center max-w-[500px] mx-auto mb-12 rv">
            <div className="label justify-center">Available Configurations</div>
            <h2>Select Your Padmount Type</h2>
          </div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
            {types.map((t, i) => (
              <Link
                key={t.href}
                href={t.href}
                className={`rv no-underline group flex flex-col gap-6 p-8 rounded-[20px] bg-white border border-[#E8ECF5] shadow-[0_2px_16px_rgba(5,9,31,.05)] transition-[border-color,box-shadow,transform] duration-200 hover:border-blue hover:shadow-[0_8px_40px_rgba(0,71,255,.11)] hover:-translate-y-[2px]${i > 0 ? ' d2' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[.6rem] font-bold tracking-[.18em] text-blue uppercase">{t.n}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-30 group-hover:opacity-70 transition-opacity duration-200"><path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="font-display font-extrabold text-[1.2rem] text-navy leading-[1.2] mb-[.3rem]">{t.name}</div>
                  <div className="font-mono text-[.64rem] text-blue tracking-[.06em] mb-4">{t.sub}</div>
                  <p className="font-mono text-[.82rem] text-gray leading-[1.65] m-0">{t.desc}</p>
                </div>
                {/* Mini spec table */}
                <div className="border border-[#E8ECF5] rounded-[10px] overflow-hidden">
                  {t.specs.map(([label, val], si) => (
                    <div key={label} className={`flex justify-between py-[.55rem] px-4 text-[.78rem] ${si % 2 === 0 ? 'bg-[#F8FAFF]' : 'bg-white'} border-b border-[#E8ECF5] last:border-0`}>
                      <span className="font-mono text-gray">{label}</span>
                      <span className="font-title font-bold text-navy">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[.65rem] font-bold text-blue tracking-[.1em] uppercase flex items-center gap-[.4rem] mt-auto group-hover:gap-[.65rem] transition-[gap] duration-200">
                  View Full Specifications →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* APPLICATIONS */}
      <div className="wt-section">
        <div className="container">
          <div className="wt-header rv">
            <div>
              <div className="label label-white">Applications</div>
              <h2 className="wt-h2">Where Padmounts <em>Are Used</em></h2>
            </div>
          </div>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5 mt-10">
            {[
              { title: 'Residential Subdivisions', desc: 'Step down utility distribution voltage to 120/240 V for single-family and multi-unit residential developments with underground services.' },
              { title: 'Commercial Buildings', desc: 'Supply three-phase power to shopping centres, office buildings, and mixed-use developments from underground distribution feeders.' },
              { title: 'Industrial Facilities', desc: 'Connect plant equipment to the utility distribution system where overhead lines are restricted or aesthetics require underground routing.' },
              { title: 'Solar & Renewable Energy', desc: 'Step up generation voltage for interconnection to the utility distribution network in ground-mount and rooftop solar installations.' },
              { title: 'Data Centres', desc: 'Provide reliable, efficient primary power transformation with low-loss designs and custom secondary voltage arrangements for critical facilities.' },
              { title: 'Transit & Public Infrastructure', desc: 'Power transit stations, EV charging infrastructure, and public facilities from underground utility distribution loops.' },
            ].map((a, i) => (
              <div key={a.title} className={`rv bg-white/[.05] border border-white/[.1] rounded-[14px] p-6${i > 0 ? ` d${Math.min(i + 1, 6)}` : ''}`}>
                <div className="w-[6px] h-[6px] rounded-full bg-blue mb-4"/>
                <div className="font-display font-extrabold text-[.9rem] text-white mb-2">{a.title}</div>
                <p className="font-mono text-[.78rem] text-white/50 leading-[1.65] m-0">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">Specify Your Padmount Transformer</h2>
            <p className="lead rv !text-white/[.6] !max-w-[500px]">
              Send us your kVA, primary voltage, secondary voltage, and connection requirements. We'll respond with a specification and lead time the same day.
            </p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=padmount-transformer" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">All Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
