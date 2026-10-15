import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Substation Transformers',
  description: 'Oil-immersed power and distribution transformers for utility substations and industrial facilities. 1 MVA to 100+ MVA at primary voltages from 34.5 kV to 345 kV.',
}

const types = [
  {
    n: '01',
    name: 'Power Substation Transformer',
    sub: '1 MVA – 100+ MVA · 34.5 kV – 345 kV',
    href: '/products/transformers/substation/power',
    desc: 'Oil-immersed power transformers for utility transmission and distribution substations. ONAN, ONAF, and OFAF cooling arrangements with load tap changer options.',
    specs: [['MVA Range', '1 – 100+ MVA'], ['HV Range', '34.5 kV – 345 kV'], ['Cooling', 'ONAN / ONAF / OFAF'], ['Standard', 'IEEE C57.12 / CSA C88']],
  },
  {
    n: '02',
    name: 'Polemount Transformer',
    sub: '3 kVA – 167 kVA · 2.4 kV – 34.5 kV',
    href: '/products/transformers/substation/polemount',
    desc: 'Overhead-mounted single-phase and three-phase distribution transformers for rural and semi-urban utility distribution lines.',
    specs: [['kVA Range', '3 – 167 kVA'], ['HV Range', '2.4 kV – 34.5 kV'], ['LV Range', '120/240 V · 4-wire'], ['Standard', 'ANSI C57.12 / CSA']],
  },
]

export default function SubstationPage() {
  return (
    <>
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ background: "url('/images/projects/substation-class-transformers/substation-transformer-delivery.jpg') center 68%/cover" }}
        >
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <Link href="/products/transformers">Transformers</Link> / <span>Substation</span>
          </div>
          <div className="label label-white">Oil-Immersed · Power Transformation</div>
          <h1>Substation<br /><em>Transformers</em></h1>
          <p className="lead mt-4">
            Oil-immersed power and distribution transformers for utility substations, industrial facilities, and overhead distribution lines. Rated from 3 kVA to 100+ MVA at primary voltages up to 345 kV.
          </p>
          <div className="flex gap-[.65rem] flex-wrap mt-6">
            {['IEEE C57.12 Rated', 'CSA C88 Certified', 'ONAN / ONAF / OFAF', 'LTC Available', 'Custom Impedance'].map(b => (
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
              <h2>High-Voltage Power<br />Transformation</h2>
            </div>
            <div>
              <p className="body mb-5">
                Substation transformers are the backbone of electrical transmission and distribution infrastructure, stepping down high-voltage transmission levels to sub-transmission and distribution voltages for utility and industrial use. They operate continuously under varying load conditions and must be designed for decades of reliable service.
              </p>
              <p className="body mb-5">
                CANDRON substation transformers are built and tested to IEEE C57.12, CSA C88, and IEC 60076, with cooling arrangements matched to your load profile and site conditions. Standard and non-standard impedance values, tap changers (DETC or LTC), and a wide range of protection and monitoring accessories are available.
              </p>
              <p className="body">
                Polemount distribution transformers complete the voltage cascade from sub-transmission to end users on rural and semi-urban distribution feeders, with a range of primary voltage taps and secondary arrangements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT GALLERY */}
      <section className="section bg-white pt-0" aria-labelledby="substation-project-gallery-title">
        <div className="container">
          <div className="max-w-[650px] mb-10 rv">
            <div className="label">Substation Class Equipment</div>
            <h2 id="substation-project-gallery-title">Built for Utility-Scale Power</h2>
            <p className="lead mt-4">Oil-immersed substation transformers prepared for delivery and installation in demanding utility and industrial applications.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              {
                src: '/images/projects/substation-class-transformers/substation-transformer-delivery.jpg',
                alt: 'Substation class transformer being lifted onto a heavy transport trailer',
                label: 'Delivery & Handling',
              },
              {
                src: '/images/projects/substation-class-transformers/substation-transformer-rear-view.jpg',
                alt: 'Rear view of an oil-immersed substation transformer secured for transport',
                label: 'Cooling & Controls',
              },
              {
                src: '/images/projects/substation-class-transformers/substation-transformer-front-view.jpg',
                alt: 'Front view of a substation class transformer prepared for site delivery',
                label: 'Field-Ready Equipment',
              },
            ].map((photo, index) => (
              <figure key={photo.src} className={`rv${index ? ` d${index + 1}` : ''} group relative h-[480px] max-lg:h-[400px] max-md:h-[380px] overflow-hidden rounded-[14px] bg-navy`}>
                <Image src={photo.src} alt={photo.alt} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 p-6 font-semibold text-white">{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM REPLACEMENT TRANSFORMER */}
      <section className="bg-navy py-20 max-md:py-14" aria-labelledby="custom-transformer-title">
        <div className="container">
          <div className="grid grid-cols-[.9fr_1.1fr] gap-12 items-start max-lg:grid-cols-1">
            <div className="rv-l max-lg:max-w-[720px]">
              <div className="label label-white">Custom Design · Project Spotlight</div>
              <h2 id="custom-transformer-title" className="text-white mt-4 !leading-[1.08]">
                Identical Fit.<br /><em>Better Performance.</em>
              </h2>
              <p className="text-white/60 text-[.96rem] leading-[1.8] mt-6">
                This custom replacement transformer was engineered to match the existing unit&apos;s dimensions and electrical specifications while improving sound performance, efficiency, and overall footprint. A higher-grade Italian core was selected to minimize sound level and losses without compromising the required fit.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-8 max-sm:grid-cols-1">
                {[
                  { value: 'Italian', label: 'High-Grade Core' },
                  { value: 'Weidmann', label: 'Insulation Material' },
                  { value: '55 / 65°C', label: 'Split Temperature Rise' },
                  { value: '26 Weeks', label: 'Design to Delivery' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[12px] border border-white/[.1] bg-white/[.045] px-5 py-4">
                    <div className="font-display text-[1rem] font-black text-white">{item.value}</div>
                    <div className="font-mono text-[.52rem] uppercase tracking-[.1em] text-white/40 mt-1.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-8 p-0 list-none grid gap-3">
                {[
                  'Matched existing transformer dimensions and electrical specifications',
                  'Higher-grade core selected for lower sound level and reduced losses',
                  'Weidmann insulation materials',
                  'Qualitrol gauges and monitoring instruments',
                  'Eaton tap changer',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/65 text-[.86rem] leading-[1.6]">
                    <span className="mt-[.35rem] w-2 h-2 rounded-full bg-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/contact?product=custom-replacement-transformer" className="btn btn-primary mag mt-9 inline-flex">Discuss a Custom Replacement →</Link>
            </div>

            <div className="rv-r">
              <div className="grid grid-cols-[1.15fr_.85fr] gap-3 max-sm:grid-cols-1">
                <figure className="relative h-[570px] max-sm:h-[360px] overflow-hidden rounded-[14px] border border-white/[.12] bg-white/[.04]">
                  <Image src="/images/projects/custom-replacement-transformer/custom-transformer-side-view.jpg" alt="Custom replacement transformer with forced-air cooling and compact radiator arrangement" fill className="object-cover object-center" sizes="(max-width:640px) 100vw, 36vw" />
                </figure>
                <div className="grid grid-rows-2 gap-3 max-sm:grid-rows-none max-sm:grid-cols-2">
                  <figure className="relative min-h-[275px] max-sm:min-h-[240px] overflow-hidden rounded-[14px] border border-white/[.12] bg-white/[.04]">
                    <Image src="/images/projects/custom-replacement-transformer/custom-transformer-front-view.jpg" alt="Front view of the custom transformer cooling banks and accessories" fill className="object-cover object-center" sizes="(max-width:640px) 50vw, 27vw" />
                  </figure>
                  <figure className="relative min-h-[275px] max-sm:min-h-[240px] overflow-hidden rounded-[14px] border border-white/[.12] bg-white/[.04]">
                    <Image src="/images/projects/custom-replacement-transformer/custom-transformer-rear-view.jpg" alt="Rear view of the custom replacement transformer during factory handling" fill className="object-cover object-center" sizes="(max-width:640px) 50vw, 27vw" />
                  </figure>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <figure className="relative h-[260px] max-sm:h-[220px] overflow-hidden rounded-[14px] border border-white/[.12] bg-white/[.04]">
                  <Image src="/images/projects/custom-replacement-transformer/custom-transformer-radiator-view.jpg" alt="Radiator bank and tank assembly on the custom transformer" fill className="object-cover object-center" sizes="(max-width:640px) 50vw, 27vw" />
                </figure>
                <figure className="relative h-[260px] max-sm:h-[220px] overflow-hidden rounded-[14px] border border-white/[.12] bg-white/[.04]">
                  <Image src="/images/projects/custom-replacement-transformer/custom-transformer-three-quarter-view.jpg" alt="Three-quarter view of the completed custom replacement transformer" fill className="object-cover object-center" sizes="(max-width:640px) 50vw, 27vw" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TYPE CARDS */}
      <div className="section bg-off">
        <div className="container">
          <div className="text-center max-w-[500px] mx-auto mb-12 rv">
            <div className="label justify-center">Available Types</div>
            <h2>Select Your Configuration</h2>
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
              <h2 className="wt-h2">Deployed in <em>Critical Infrastructure</em></h2>
            </div>
          </div>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5 mt-10">
            {[
              { title: 'Utility Substations', desc: 'Step down transmission voltage (69 kV – 345 kV) to distribution voltage (4 kV – 34.5 kV) at utility owned and operated substations.' },
              { title: 'Industrial Facilities', desc: 'Supply high-voltage power to large motors, arc furnaces, and process equipment at mining, steel, petrochemical, and pulp and paper plants.' },
              { title: 'Renewable Energy', desc: 'Step up wind turbine and solar inverter output voltage for interconnection to the transmission or sub-transmission grid.' },
              { title: 'Oil & Gas', desc: 'Dedicated substation power for drilling, compression, and processing operations at upstream and midstream sites.' },
              { title: 'Rural Distribution', desc: 'Polemount transformers distribute power from overhead medium-voltage feeders to farms, rural homes, and light commercial facilities.' },
              { title: 'Data Centres', desc: 'Utility-scale substation transformers supplying high-density power delivery infrastructure for enterprise and hyperscale facilities.' },
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
            <h2 className="rv">Specify Your Substation Transformer</h2>
            <p className="lead rv !text-white/[.6] !max-w-[500px]">
              Share your MVA rating, primary and secondary voltages, cooling class, and impedance target. Our engineering team will respond the same day.
            </p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=substation-transformer" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">All Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
