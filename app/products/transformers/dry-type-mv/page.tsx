import Link from 'next/link'

export const metadata = {
  title: 'Medium Voltage Dry-Type Transformers',
  description: 'VPI and resin-encapsulated medium voltage dry-type transformers from 2.4 kV to 35 kV. Cast coil designs for harsh industrial, coastal, and high-humidity environments.',
}

const types = [
  {
    n: '01',
    name: 'Standard MV Dry-Type',
    sub: '300 kVA – 20 MVA · 2.4 kV – 35 kV',
    href: '/products/transformers/dry-type-mv/standard',
    desc: 'Vacuum pressure impregnated (VPI) dry-type transformers for industrial plants, substations, and commercial facilities where liquid-filled units are not permitted.',
    specs: [['kVA Range', '300 kVA – 20 MVA'], ['HV Range', '2.4 kV – 35 kV'], ['LV Range', '120 V – 15 kV'], ['Standard', 'IEEE C57.12.01 / CSA']],
  },
  {
    n: '02',
    name: 'Cast Coil Transformer',
    sub: '300 kVA – 30 MVA · Epoxy Resin Encapsulated',
    href: '/products/transformers/dry-type-mv/cast-coil',
    desc: 'Epoxy resin cast coil transformers for demanding environments — coastal, chemical, mining, and high-humidity installations where maximum moisture and contamination resistance is required.',
    specs: [['kVA Range', '300 kVA – 30 MVA'], ['Protection', 'IP34 standard, IP54 option'], ['Encapsulation', 'Epoxy Resin (Class F/H)'], ['Standard', 'IEC 60076-11 / IEEE C57.12']],
  },
]

export default function DryTypeMVPage() {
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
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <Link href="/products/transformers">Transformers</Link> / <span>MV Dry-Type</span>
          </div>
          <div className="label label-white">Dry-Type · Industrial · 2.4 kV – 35 kV</div>
          <h1>Medium Voltage<br /><em>Dry-Type Transformers</em></h1>
          <p className="lead mt-4">
            VPI and epoxy resin cast coil dry-type transformers for industrial and utility applications from 2.4 kV to 35 kV. Designed for environments where oil-filled units cannot be installed and maximum reliability is required.
          </p>
          <div className="flex gap-[.65rem] flex-wrap mt-6">
            {['IEEE C57.12.01', 'IEC 60076-11', 'CSA Certified', 'VPI & Cast Coil', 'IP34 / IP54 Rated'].map(b => (
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
              <h2>Industrial-Grade<br />Without the Oil</h2>
            </div>
            <div>
              <p className="body mb-5">
                Medium voltage dry-type transformers eliminate the fire risk and environmental concerns of liquid-filled units while handling voltages from 2.4 kV to 35 kV. They are the standard solution for transformer installations inside buildings, in close proximity to process equipment, or in locations where oil spill containment would be impractical.
              </p>
              <p className="body mb-5">
                VPI (vacuum pressure impregnated) construction offers solid, reliable insulation suitable for most industrial environments. For applications in coastal, chemical processing, mining, or tropical climates, epoxy resin cast coil construction provides total encapsulation of the windings, preventing moisture ingress and contaminant penetration.
              </p>
              <p className="body">
                Both configurations are available with Class F (155°C) and Class H (180°C) insulation systems, a wide range of secondary voltages, and multiple high-voltage taps for voltage regulation.
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
            <h2>VPI or Cast Coil — Choose Your Application</h2>
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

      {/* COMPARISON */}
      <div className="wt-section">
        <div className="container">
          <div className="text-center max-w-[520px] mx-auto mb-12 rv">
            <div className="label label-white justify-center">Selection Guide</div>
            <h2 className="text-white">VPI vs. Cast Coil — Which Do You Need?</h2>
          </div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
            {[
              { title: 'Choose VPI When…', items: ['Indoor or sheltered installation', 'Clean to moderately dusty environment', 'Standard industrial application', 'Cost-sensitive project', 'Class F or H temperature rise available'], color: 'bg-blue' },
              { title: 'Choose Cast Coil When…', items: ['Coastal or marine environment', 'Chemical plant or process facility', 'High-humidity tropical climate', 'Mining or underground installation', 'Maximum contamination resistance required'], color: 'bg-[#059669]' },
            ].map(col => (
              <div key={col.title} className="rv bg-white/[.05] border border-white/[.1] rounded-[16px] p-8">
                <div className={`inline-flex items-center font-mono text-[.62rem] font-bold tracking-[.14em] text-white uppercase mb-5 px-3 py-[.35rem] rounded-[6px] ${col.color}`}>{col.title}</div>
                <ul className="m-0 p-0 list-none flex flex-col gap-[.65rem]">
                  {col.items.map(item => (
                    <li key={item} className="flex items-start gap-[.65rem] font-mono text-[.82rem] text-white/60 leading-[1.55]">
                      <span className="w-[5px] h-[5px] min-w-[5px] bg-blue rounded-full mt-[.45rem]"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">Specify Your MV Dry-Type Transformer</h2>
            <p className="lead rv !text-white/[.6] !max-w-[500px]">
              Share your kVA, primary and secondary voltages, environment, and installation requirements. Our engineers will recommend the right configuration and respond with a quote the same day.
            </p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=mv-dry-type-transformer" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">All Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
