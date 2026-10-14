import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Low Voltage Dry-Type Transformers',
  description: 'Canadian-made low-voltage dry-type transformers, including custom 500 kVA CSA designs and qualified one-day expedited turnaround up to 300 kVA and 600 V.',
}

const types = [
  {
    n: '01',
    name: 'Standard LV Dry-Type',
    sub: '15 kVA – 2,500 kVA · Up to 600 V Primary',
    href: '/products/transformers/dry-type-lv/standard',
    desc: 'General-purpose ventilated dry-type transformers for commercial and light industrial applications. Suitable for indoor installations in clean, dry environments.',
    specs: [['kVA Range', '15 – 2,500 kVA'], ['Primary', 'Up to 600 V'], ['Secondary', '120 V – 600 V'], ['Standard', 'UL 1561 / CSA / NEMA ST-20']],
  },
  {
    n: '02',
    name: 'Isolation Transformer',
    sub: '0.5 kVA – 1,000 kVA · Class K Available',
    href: '/products/transformers/dry-type-lv/isolation',
    desc: 'Electrostatic shielded isolation transformers for noise suppression, ground loop elimination, and sensitive equipment protection in medical, data, and laboratory environments.',
    specs: [['kVA Range', '0.5 – 1,000 kVA'], ['Shield', 'Faraday/Electrostatic'], ['Application', 'Medical / IT / Lab'], ['Standard', 'UL 1561 / CSA / NEMA']],
  },
]

export default function DryTypeLVPage() {
  return (
    <>
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ background: "url('/images/products/transformers/dry-type-lv-standard.webp') center/cover" }}
        >
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <Link href="/products/transformers">Transformers</Link> / <span>LV Dry-Type</span>
          </div>
          <div className="label label-white">Dry-Type · Indoor Distribution · UL / CSA</div>
          <h1>Low Voltage<br /><em>Dry-Type Transformers</em></h1>
          <p className="lead mt-4">
            Ventilated and encapsulated dry-type transformers for commercial buildings, data centres, hospitals, and industrial distribution. UL 1561 listed and CSA certified from 15 kVA to 2,500 kVA.
          </p>
          <div className="flex gap-[.65rem] flex-wrap mt-6">
            {['UL 1561 Listed', 'CSA Certified', 'NEMA ST-20', 'Class H Insulation', 'DOE 2016 Compliant'].map(b => (
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
              <h2>Safe for Indoor<br />Installation</h2>
            </div>
            <div>
              <p className="body mb-5">
                Low voltage dry-type transformers use air as the cooling medium rather than liquid, making them inherently safe for indoor installation in occupied buildings. They are the standard choice for commercial office towers, retail centres, hospitals, universities, and data centres where liquid-filled units would introduce fire risk or require containment systems.
              </p>
              <p className="body mb-5">
                CANDRON LV dry-type transformers are UL 1561 listed and CSA certified, meeting DOE 2016 minimum efficiency requirements and NEMA ST-20 performance standards. Class H insulation (180°C rated) provides long service life and allows operation in warm ambient environments.
              </p>
              <p className="body">
                Isolation transformer configurations with Faraday/electrostatic shielding are available for sensitive applications in healthcare facilities, laboratories, and IT environments where common-mode noise and ground loop currents must be suppressed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ONE-DAY EXPEDITED TRANSFORMER */}
      <section className="section bg-off" aria-labelledby="one-day-transformer-title">
        <div className="container">
          <div className="grid grid-cols-[.92fr_1.08fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 items-center">
            <div className="rv-l">
              <div className="label">Expedited Manufacturing · Canadian-Made</div>
              <h2 id="one-day-transformer-title" className="mt-4 !leading-[1.08]">
                When Every Hour Counts,<br />
                <em>CANDRON Delivers.</em>
              </h2>
              <p className="lead mt-6 max-w-[620px]">
                When a customer needed a transformer urgently, our team manufactured the unit within 24 hours of order confirmation and personally delivered it to help prevent system disruption.
              </p>
              <p className="body mt-4 max-w-[620px]">
                We go beyond standard production schedules to help keep critical projects moving and customer systems running. Need it fast? We make it happen.
              </p>

              <div className="mt-8 rounded-[16px] border border-blue/25 bg-white p-6 shadow-[0_8px_30px_rgba(5,9,31,.06)]">
                <div className="font-mono text-[.56rem] font-bold uppercase tracking-[.13em] text-blue mb-3">One-Day Expedited Turnaround Available</div>
                <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-3">
                  {[
                    { value: '24 Hours', label: 'Case-Study Turnaround' },
                    { value: 'Up to 300 kVA', label: 'Eligible Capacity' },
                    { value: 'Up to 600 V', label: 'Eligible Voltage' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[10px] border border-[#DCE3F2] bg-off px-4 py-4 min-w-0">
                      <div className="font-display text-[.85rem] font-black text-navy break-words">{item.value}</div>
                      <div className="font-mono text-[.48rem] uppercase tracking-[.09em] text-slate mt-1.5">{item.label}</div>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-[.55rem] leading-[1.55] text-slate mt-4 mb-0">
                  Expedited scheduling is subject to transformer configuration, engineering review, component availability, and production capacity at the time of order.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/contact?product=one-day-dry-type-transformer" className="btn btn-primary mag">Request Expedited Service →</Link>
                <Link href="/products/transformers/dry-type-lv/standard" className="btn btn-outline-blue mag">Standard LV Transformers</Link>
              </div>
            </div>

            <div className="rv-r">
              <figure className="relative aspect-[16/10] max-sm:aspect-[4/3] overflow-hidden rounded-[18px] border border-[#DCE3F2] bg-white shadow-[0_12px_35px_rgba(5,9,31,.1)]">
                <Image
                  src="/images/projects/one-day-dry-type-transformer/one-day-transformer-delivery.jpg"
                  alt="Canadian-made dry-type transformer delivered within 24 hours for an urgent customer requirement"
                  fill
                  className="object-cover object-bottom"
                  sizes="(max-width:1024px) 100vw, 54vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.58),transparent_48%)] pointer-events-none" />
                <figcaption className="absolute left-5 bottom-5 flex flex-wrap gap-2">
                  {['Manufactured in 24 Hours', 'Personally Delivered', 'Canadian-Made'].map((badge) => (
                    <span key={badge} className="rounded-full border border-white/30 bg-navy/80 px-3 py-2 font-mono text-[.52rem] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">{badge}</span>
                  ))}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 500 KVA CSA DRY-TYPE PROJECT */}
      <section className="bg-navy py-20 max-md:py-14" aria-labelledby="500kva-transformer-title">
        <div className="container">
          <div className="grid grid-cols-[.8fr_1.2fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 items-end mb-10">
            <div className="rv-l">
              <div className="label label-white">Project Showcase · Low Voltage Dry-Type</div>
              <h2 id="500kva-transformer-title" className="text-white mt-4 !leading-[1.08]">
                500 kVA Dry-Type<br />
                <em>Transformer.</em>
              </h2>
            </div>
            <div className="rv-r">
              <p className="text-white/60 text-[.96rem] leading-[1.8] max-w-[720px]">
                A CSA-compliant 500 kVA dry-type transformer configured for a 600 V Delta primary and 480 V Wye secondary, documented from its internal core-and-coil assembly through enclosure completion and shipment.
              </p>
              <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-3 mt-6">
                {[
                  { value: '500 kVA', label: 'Rated Capacity' },
                  { value: '600 V Δ', label: 'Primary' },
                  { value: '480 V Y', label: 'Secondary' },
                  { value: 'CSA', label: 'Compliance' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[12px] border border-white/[.1] bg-white/[.045] px-4 py-4 min-w-0">
                    <div className="font-display text-[.86rem] font-black text-white break-words">{item.value}</div>
                    <div className="font-mono text-[.49rem] uppercase tracking-[.09em] text-white/40 mt-1.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-4">
            {[
              {
                src: '/images/projects/500kva-csa-dry-type-transformer/500kva-delivery-front.jpg',
                alt: 'Front shipping view of a completed 500 kVA CSA dry-type transformer inside a delivery truck',
                label: 'Delivery Ready · Front',
              },
              {
                src: '/images/projects/500kva-csa-dry-type-transformer/500kva-delivery-rear.jpg',
                alt: 'Rear shipping view of a completed 500 kVA CSA dry-type transformer secured on a pallet',
                label: 'Delivery Ready · Rear',
              },
            ].map((image) => (
              <figure key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-white/[.12] bg-white/[.04] rv">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.62),transparent_45%)] pointer-events-none" />
                <figcaption className="absolute left-4 bottom-4 rounded-full border border-white/25 bg-navy/80 px-3 py-2 font-mono text-[.52rem] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">{image.label}</figcaption>
              </figure>
            ))}
          </div>

          <div className="grid grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-3">
            {[
              {
                src: '/images/projects/500kva-csa-dry-type-transformer/500kva-coil-closeup.jpg',
                alt: 'Close-up of the windings and copper terminations inside a 500 kVA dry-type transformer',
                label: 'Coil Detail',
              },
              {
                src: '/images/projects/500kva-csa-dry-type-transformer/500kva-enclosure-side.jpg',
                alt: 'Side enclosure view of a 500 kVA dry-type transformer during manufacturing',
                label: 'Enclosure',
              },
              {
                src: '/images/projects/500kva-csa-dry-type-transformer/500kva-core-coil-front.jpg',
                alt: 'Front view of the 500 kVA transformer core-and-coil assembly inside its enclosure',
                label: 'Core & Coil',
              },
              {
                src: '/images/projects/500kva-csa-dry-type-transformer/500kva-core-coil-angle.jpg',
                alt: 'Angled view of the 500 kVA dry-type transformer core, coils, and copper connections',
                label: 'Internal Assembly',
              },
              {
                src: '/images/projects/500kva-csa-dry-type-transformer/500kva-enclosure-rear.jpg',
                alt: 'Ventilated rear enclosure of the completed 500 kVA dry-type transformer',
                label: 'Ventilated Rear',
              },
            ].map((image, index) => (
              <figure key={image.src} className={`relative aspect-[3/4] overflow-hidden rounded-[14px] border border-white/[.12] bg-white/[.04] rv${index ? ` d${Math.min(index + 1, 4)}` : ''}`}>
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-500 hover:scale-[1.025]" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,9,31,.65),transparent_48%)] pointer-events-none" />
                <figcaption className="absolute left-3 bottom-3 font-mono text-[.49rem] font-bold uppercase tracking-[.07em] text-white">{image.label}</figcaption>
              </figure>
            ))}
          </div>

          <div className="flex justify-center mt-9 rv">
            <Link href="/contact?product=500kva-csa-dry-type-transformer" className="btn btn-primary mag">Discuss a Custom Dry-Type Transformer →</Link>
          </div>
        </div>
      </section>

      {/* TYPE CARDS */}
      <div className="section bg-off">
        <div className="container">
          <div className="text-center max-w-[500px] mx-auto mb-12 rv">
            <div className="label justify-center">Available Configurations</div>
            <h2>Select Your Dry-Type Configuration</h2>
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

      {/* EFFICIENCY NOTE */}
      <div className="section bg-white">
        <div className="container">
          <div className="split items-start gap-14 rv">
            <div>
              <div className="label">Efficiency & Standards</div>
              <h2 className="mb-6">DOE 2016 &amp; CSA Compliance</h2>
              <p className="body mb-5">All CANDRON LV dry-type transformers meet or exceed the U.S. Department of Energy 2016 minimum efficiency standards and CSA C802.2 requirements for distribution transformers, ensuring low life-cycle operating costs.</p>
              <ul className="check-list">
                <li>DOE 2016 minimum efficiency compliance (kVA-dependent)</li>
                <li>CSA C802.2 energy performance rating</li>
                <li>NEMA ST-20 performance standard</li>
                <li>Class 220 (H) insulation — 180°C rated</li>
                <li>150°C or 115°C temperature rise options</li>
                <li>UL 1561 listing and CSA certification</li>
              </ul>
            </div>
            <div className="bg-navy rounded-[16px] p-8 border border-blue/[.2]">
              <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">Applications</div>
              <ul className="m-0 p-0 list-none flex flex-col gap-[.7rem]">
                {['Commercial office buildings', 'Healthcare facilities & hospitals', 'Data centres & server rooms', 'Universities & institutional buildings', 'Retail centres & mixed-use', 'Light industrial distribution', 'Laboratory & research facilities', 'High-rise residential'].map(a => (
                  <li key={a} className="flex items-start gap-[.65rem] font-mono text-[.8rem] text-white/60 leading-[1.55]">
                    <span className="w-[5px] h-[5px] min-w-[5px] bg-blue rounded-full mt-[.42rem]"/>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">Specify Your LV Dry-Type Transformer</h2>
            <p className="lead rv !text-white/[.6] !max-w-[500px]">
              Share your kVA, primary voltage, secondary voltage, and any isolation or K-factor requirements. We'll respond the same day with a quote.
            </p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=lv-dry-type-transformer" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">All Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
