import Link from 'next/link'

export const metadata = {
  title: 'Low Voltage Dry-Type Transformers',
  description: 'UL listed and CSA certified low voltage dry-type transformers for commercial buildings, data centres, and industrial distribution. 15 kVA to 2,500 kVA.',
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
          style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}
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
                Candron LV dry-type transformers are UL 1561 listed and CSA certified, meeting DOE 2016 minimum efficiency requirements and NEMA ST-20 performance standards. Class H insulation (180°C rated) provides long service life and allows operation in warm ambient environments.
              </p>
              <p className="body">
                Isolation transformer configurations with Faraday/electrostatic shielding are available for sensitive applications in healthcare facilities, laboratories, and IT environments where common-mode noise and ground loop currents must be suppressed.
              </p>
            </div>
          </div>
        </div>
      </div>

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
              <p className="body mb-5">All Candron LV dry-type transformers meet or exceed the U.S. Department of Energy 2016 minimum efficiency standards and CSA C802.2 requirements for distribution transformers, ensuring low life-cycle operating costs.</p>
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
