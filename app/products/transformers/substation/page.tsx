import Link from 'next/link'

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
          style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}
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
                Candron substation transformers are built and tested to IEEE C57.12, CSA C88, and IEC 60076, with cooling arrangements matched to your load profile and site conditions. Standard and non-standard impedance values, tap changers (DETC or LTC), and a wide range of protection and monitoring accessories are available.
              </p>
              <p className="body">
                Polemount distribution transformers complete the voltage cascade from sub-transmission to end users on rural and semi-urban distribution feeders, with a range of primary voltage taps and secondary arrangements.
              </p>
            </div>
          </div>
        </div>
      </div>

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
