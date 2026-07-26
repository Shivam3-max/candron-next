'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SavingsPaybackCalculatorPage() {
  // Shared inputs
  const [loadFactor, setLoadFactor] = useState('75')
  const [hoursYear, setHoursYear] = useState('8760')
  const [costKwh, setCostKwh] = useState('0.12')
  const [co2Factor, setCo2Factor] = useState('0.4')

  // Transformer A
  const [aCoreW, setACoreW] = useState('')
  const [aCopperW, setACopperW] = useState('')
  const [aPrice, setAPrice] = useState('')

  // Transformer B
  const [bCoreW, setBCoreW] = useState('')
  const [bCopperW, setBCopperW] = useState('')
  const [bPrice, setBPrice] = useState('')

  const [result, setResult] = useState<{
    annualLossA: string; annualLossB: string;
    energySaving: string; costSaving: string;
    co2Saving: string; payback: string
  } | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function calculate() {
    setError(''); setResult(null)
    const L = parseFloat(loadFactor) / 100
    const H = parseFloat(hoursYear)
    const C = parseFloat(costKwh)
    const co2 = parseFloat(co2Factor)
    const ac = parseFloat(aCoreW)
    const acu = parseFloat(aCopperW)
    const ap = parseFloat(aPrice)
    const bc = parseFloat(bCoreW)
    const bcu = parseFloat(bCopperW)
    const bp = parseFloat(bPrice)
    if ([L, H, C, ac, acu, bc, bcu].some(isNaN)) { setError('Fill in all loss fields and operating parameters.'); return }
    if (L <= 0 || H <= 0 || C <= 0) { setError('Load factor, hours/year, and cost/kWh must be positive.'); return }
    // Annual losses in kWh: no-load losses run all year (8760 h), copper losses run during loaded hours
    const annualLossA = (ac / 1000) * 8760 + L * L * (acu / 1000) * H
    const annualLossB = (bc / 1000) * 8760 + L * L * (bcu / 1000) * H
    const energySaving = annualLossA - annualLossB
    const costSaving = energySaving * C
    const co2Saving = energySaving * co2
    const priceDiff = !isNaN(ap) && !isNaN(bp) ? bp - ap : NaN
    const payback = !isNaN(priceDiff) && costSaving > 0 ? priceDiff / costSaving : NaN

    setResult({
      annualLossA: annualLossA.toFixed(0),
      annualLossB: annualLossB.toFixed(0),
      energySaving: Math.abs(energySaving).toFixed(0),
      costSaving: Math.abs(costSaving).toFixed(0),
      co2Saving: Math.abs(co2Saving).toFixed(0),
      payback: !isNaN(payback) && isFinite(payback) && payback > 0 ? payback.toFixed(1) : '—',
    })
  }

  function reset() {
    setACoreW(''); setACopperW(''); setAPrice('')
    setBCoreW(''); setBCopperW(''); setBPrice('')
    setResult(null); setError('')
  }

  const faqs = [
    { q: 'What data do I need for each transformer?', a: 'You need the no-load (core/iron) losses in watts and the full-load copper losses in watts. These are available on the transformer nameplate, in the test report, or in the manufacturer\'s data sheet. For DOE 2016-compliant units, typical values are published in NEMA TP-1 and DOE efficiency tables.' },
    { q: 'Why does load factor matter so much?', a: 'Copper losses scale with the square of the load current. A transformer running at 50% load has only 25% of the copper losses it would have at full load. No-load losses, however, run 24/7 at constant levels. So for lightly loaded transformers, the no-load loss difference between two units dominates the annual energy savings calculation.' },
    { q: 'How is the payback period calculated?', a: 'Simple payback = (Price of B − Price of A) / Annual cost savings. It tells you how many years of energy savings it takes to recover the premium paid for a more efficient transformer. This is a pre-tax, undiscounted figure — consult a financial model for a more rigorous lifecycle cost analysis.' },
    { q: 'What CO₂ factor should I use?', a: 'The default 0.4 kg CO₂/kWh is a rough average for a mixed North American grid. Actual values vary significantly: Ontario\'s nuclear-heavy grid is around 0.04–0.10 kg/kWh, while Alberta\'s gas-heavy grid is 0.55–0.65 kg/kWh. Use the actual grid emissions factor for your region for an accurate carbon calculation.' },
  ]

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Savings & Payback Calculator</span>
          </div>
          <div className="label label-white">Energy Economics Tool</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            Savings & Payback
            <br /><em>Calculator</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Compare the annual energy losses of two transformers and calculate how quickly a more efficient unit pays back the price premium through energy savings.
          </p>
        </div>
      </div>

      <div className="section bg-off" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">

            <div className="flex-1 min-w-0">
              <div className="label mb-4">How It Works</div>
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>Transformer Energy Cost Comparison</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Get Loss Data for Both Transformers', b: 'Pull no-load (core) and full-load copper losses in watts from each transformer\'s nameplate or test report. Manufacturers must provide this under DOE 2016 regulations. The difference between standard and premium-efficiency units can be 20–40% lower losses.' },
                  { n: '02', t: 'Set Your Operating Parameters', b: 'Enter your average load factor (typically 50–80% for most facilities), hours per year in service, and electricity cost. Use your actual blended electricity rate including demand charges if possible — even $0.01/kWh difference changes the payback period significantly.' },
                  { n: '03', t: 'Calculate Annual Losses', b: 'No-load losses accumulate 8,760 hours/year regardless of loading. Copper losses scale with load-factor squared and only during hours in service. The tool calculates total annual energy lost to heat for each transformer.' },
                  { n: '04', t: 'Review Payback Period', b: 'If Transformer B costs more but loses less energy, the annual savings eventually pay back the price premium. A well-engineered premium transformer typically pays back in 2–5 years — with 20–25 years of remaining service life delivering pure savings thereafter.' },
                ].map(s => (
                  <div key={s.n} className="flex gap-5 bg-white p-5 rounded-[14px] border border-[#E8ECF5]">
                    <div className="w-10 h-10 min-w-[2.5rem] rounded-[10px] bg-blue/[.08] flex items-center justify-center font-mono text-[.6rem] font-bold text-blue tracking-[.1em]">{s.n}</div>
                    <div>
                      <div className="font-title font-bold text-navy text-[.92rem] mb-[.35rem]">{s.t}</div>
                      <p className="font-mono text-[.8rem] text-gray leading-[1.65] m-0">{s.b}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-navy rounded-[16px] p-7">
                <div className="font-mono text-[.58rem] text-blue tracking-[.22em] uppercase mb-5">Formulas</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Annual Losses (kWh)', formula: 'Pcore(W)/1000 × 8760 + L² × Pcu(W)/1000 × H_year' },
                    { label: 'Annual Cost Savings ($/yr)', formula: '(Losses_A − Losses_B) kWh × $/kWh' },
                    { label: 'Simple Payback (years)', formula: '(Price_B − Price_A) / Annual Cost Savings' },
                    { label: 'CO₂ Reduction (kg/yr)', formula: '(Losses_A − Losses_B) kWh × CO₂ factor (kg/kWh)' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">{row.label}</div>
                      <div className="font-mono text-[.82rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3 leading-[1.6]">{row.formula}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">FAQ</div>
                <div className="flex flex-col gap-2">
                  {faqs.map((f, i) => (
                    <div key={i} className={`bg-white rounded-[12px] border border-[#E8ECF5] overflow-hidden ${openFaq === i ? 'shadow-[0_4px_20px_rgba(5,9,31,.08)]' : ''}`}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left bg-transparent border-0 py-[1rem] px-5 flex items-center justify-between gap-3 cursor-pointer">
                        <span className="font-title font-bold text-navy text-[.85rem] leading-[1.4]">{f.q}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 text-gray transition-[transform] duration-[.25s] ${openFaq === i ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                      <div className={`overflow-hidden transition-[max-height] duration-[.3s] ease-[ease] ${openFaq === i ? 'max-h-[400px]' : 'max-h-0'}`}>
                        <p className="py-0 px-5 pb-4 font-mono text-[.82rem] text-gray leading-[1.7] m-0">{f.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[420px] shrink-0 lg:sticky lg:top-[100px]">
              <div className="bg-white rounded-[20px] border border-[#E8ECF5] p-7 shadow-[0_4px_32px_rgba(5,9,31,.08)]">
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">Savings & Payback Calculator</div>

                {/* Operating Parameters */}
                <div className="font-mono text-[.6rem] text-gray/60 tracking-[.1em] uppercase mb-3">Operating Parameters</div>
                <div className="flex flex-col gap-4 mb-5">
                  {[
                    { label: 'Load Factor (%)', val: loadFactor, set: setLoadFactor, ph: '75' },
                    { label: 'Hours in Service / Year', val: hoursYear, set: setHoursYear, ph: '8760' },
                    { label: 'Electricity Cost ($/kWh)', val: costKwh, set: setCostKwh, ph: '0.12' },
                    { label: 'CO₂ Factor (kg/kWh)', val: co2Factor, set: setCo2Factor, ph: '0.40' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">{f.label}</label>
                      <input type="number" min="0" value={f.val} onChange={e => { f.set(e.target.value); setResult(null) }} placeholder={f.ph} className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                    </div>
                  ))}
                </div>

                {/* Side-by-side transformer inputs */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { title: 'Transformer A', labelColor: 'text-gray', fields: [{ label: 'Core Loss (W)', val: aCoreW, set: setACoreW }, { label: 'Copper Loss (W)', val: aCopperW, set: setACopperW }, { label: 'Price ($)', val: aPrice, set: setAPrice }] },
                    { title: 'Transformer B', labelColor: 'text-blue', fields: [{ label: 'Core Loss (W)', val: bCoreW, set: setBCoreW }, { label: 'Copper Loss (W)', val: bCopperW, set: setBCopperW }, { label: 'Price ($)', val: bPrice, set: setBPrice }] },
                  ].map(tx => (
                    <div key={tx.title}>
                      <div className={`font-mono text-[.62rem] font-bold tracking-[.1em] uppercase mb-3 ${tx.labelColor}`}>{tx.title}</div>
                      <div className="flex flex-col gap-3">
                        {tx.fields.map(f => (
                          <div key={f.label}>
                            <label className="block font-mono text-[.6rem] text-gray tracking-[.06em] mb-[.3rem]">{f.label}</label>
                            <input type="number" min="0" value={f.val} onChange={e => { f.set(e.target.value); setResult(null); setError('') }} placeholder="0" className="w-full px-3 py-[.75rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.88rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mb-4">
                  <button onClick={calculate} className="btn btn-primary flex-1 justify-center">Calculate</button>
                  <button onClick={reset} className="btn btn-outline-blue px-5">Clear</button>
                </div>

                {error && <p className="font-mono text-[.78rem] text-[#dc2626] text-center mb-3 mt-[-0.5rem]">{error}</p>}

                {result && (
                  <div className="bg-navy rounded-[14px] p-6">
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/[.06] rounded-[10px] p-3 text-center">
                          <div className="font-mono text-[.55rem] text-white/40 uppercase tracking-[.1em] mb-1">Losses A / yr</div>
                          <div className="font-display font-bold text-white text-[1.1rem]">{Number(result.annualLossA).toLocaleString()}</div>
                          <div className="font-mono text-[.6rem] text-blue/70 mt-[.2rem]">kWh</div>
                        </div>
                        <div className="bg-white/[.06] rounded-[10px] p-3 text-center">
                          <div className="font-mono text-[.55rem] text-white/40 uppercase tracking-[.1em] mb-1">Losses B / yr</div>
                          <div className="font-display font-bold text-white text-[1.1rem]">{Number(result.annualLossB).toLocaleString()}</div>
                          <div className="font-mono text-[.6rem] text-blue/70 mt-[.2rem]">kWh</div>
                        </div>
                      </div>
                      <div className="border-t border-white/[.1] pt-3 flex flex-col gap-2">
                        {[
                          { label: 'Annual Energy Saved', val: Number(result.energySaving).toLocaleString() + ' kWh' },
                          { label: 'Annual Cost Savings', val: '$' + Number(result.costSaving).toLocaleString() + ' / yr' },
                          { label: 'CO₂ Reduction', val: Number(result.co2Saving).toLocaleString() + ' kg / yr' },
                          { label: 'Simple Payback', val: result.payback !== '—' ? result.payback + ' years' : '— (enter prices)' },
                        ].map(r => (
                          <div key={r.label} className="flex items-center justify-between">
                            <span className="font-mono text-[.62rem] text-white/40 uppercase tracking-[.08em]">{r.label}</span>
                            <span className="font-mono font-bold text-white text-[.9rem]">{r.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-[#E8ECF5]">
                  <div className="font-mono text-[.6rem] text-gray/60 tracking-[.12em] uppercase mb-3">Related Calculators</div>
                  <div className="flex flex-col gap-2">
                    {[
                      { href: '/resources/efficiency-calculator', label: 'Efficiency Calculator' },
                      { href: '/resources/kva-calculator', label: 'kVA Calculator' },
                    ].map(l => (
                      <Link key={l.href} href={l.href} className="flex items-center justify-between py-[.65rem] px-4 rounded-[8px] bg-[#F8FAFF] border border-[#E8ECF5] no-underline group hover:border-blue transition-[border-color] duration-150">
                        <span className="font-mono text-[.78rem] font-semibold text-navy">{l.label}</span>
                        <span className="font-mono text-[.65rem] text-blue group-hover:translate-x-[2px] transition-transform duration-150">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">Need Loss Data for a Candron Transformer?</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">Our engineering team can provide complete test reports including no-load and full-load loss data for any transformer in our inventory or custom-built to your specification.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=transformer" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">View Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
