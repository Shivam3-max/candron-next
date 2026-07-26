'use client'
import { useState } from 'react'
import Link from 'next/link'

// Typical DOE 2016 losses (W) for distribution transformers at full load
const TYPICAL_LOSSES: { kva: number; core: number; copper: number }[] = [
  { kva: 15,   core: 80,   copper: 395 },
  { kva: 25,   core: 115,  copper: 575 },
  { kva: 37.5, core: 155,  copper: 820 },
  { kva: 50,   core: 195,  copper: 1000 },
  { kva: 75,   core: 270,  copper: 1420 },
  { kva: 112,  core: 360,  copper: 1975 },
  { kva: 150,  core: 460,  copper: 2440 },
  { kva: 225,  core: 630,  copper: 3550 },
  { kva: 300,  core: 800,  copper: 4420 },
  { kva: 500,  core: 1200, copper: 6720 },
  { kva: 750,  core: 1700, copper: 9600 },
  { kva: 1000, core: 2200, copper: 12000 },
  { kva: 1500, core: 3000, copper: 17000 },
  { kva: 2000, core: 3800, copper: 21000 },
  { kva: 2500, core: 4500, copper: 25000 },
]

export default function EfficiencyCalculatorPage() {
  const [kva, setKva] = useState('')
  const [coreLoss, setCoreLoss] = useState('')
  const [copperLoss, setCopperLoss] = useState('')
  const [loadPct, setLoadPct] = useState('75')
  const [pf, setPf] = useState('0.90')
  const [hoursDay, setHoursDay] = useState('24')
  const [result, setResult] = useState<{
    eta: string; etaAllDay: string; totalLoss: string; outputKw: string; inputKw: string
  } | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function autofill(kvaNum: number) {
    const row = TYPICAL_LOSSES.find(r => r.kva === kvaNum)
    if (row) { setCoreLoss(String(row.core)); setCopperLoss(String(row.copper)) }
    setKva(String(kvaNum))
    setResult(null)
  }

  function calculate() {
    setError(''); setResult(null)
    const S = parseFloat(kva)
    const Pcore = parseFloat(coreLoss)
    const Pcu = parseFloat(copperLoss)
    const L = parseFloat(loadPct) / 100
    const pfVal = parseFloat(pf)
    const H = parseFloat(hoursDay)
    if ([S, Pcore, Pcu, L, pfVal, H].some(isNaN)) { setError('Fill in all fields to calculate.'); return }
    if (S <= 0 || Pcore < 0 || Pcu < 0) { setError('kVA and losses must be positive.'); return }
    if (L <= 0 || L > 1) { setError('Load factor must be 1–100%.'); return }
    if (pfVal <= 0 || pfVal > 1) { setError('Power factor must be 0.01–1.00.'); return }
    if (H < 0 || H > 24) { setError('Hours at load must be 0–24.'); return }

    // Output kW
    const outputKw = S * L * pfVal
    // Losses at load L
    const losses = (Pcore + L * L * Pcu) / 1000 // kW
    const inputKw = outputKw + losses
    const eta = (outputKw / inputKw) * 100

    // All-day efficiency
    const energyOut = outputKw * H + 0 * (24 - H) // kWh output (no load when idle)
    const energyLoss = (Pcore / 1000) * 24 + (L * L * Pcu / 1000) * H
    const etaAllDay = (energyOut / (energyOut + energyLoss)) * 100

    setResult({
      eta: eta.toFixed(3),
      etaAllDay: etaAllDay.toFixed(3),
      totalLoss: (losses * 1000).toFixed(0),
      outputKw: outputKw.toFixed(2),
      inputKw: inputKw.toFixed(2),
    })
  }

  function reset() { setKva(''); setCoreLoss(''); setCopperLoss(''); setResult(null); setError('') }

  const faqs = [
    { q: 'What are no-load (core) losses?', a: 'No-load losses (also called iron or core losses) occur continuously whenever the transformer is energized, even at zero load. They result from hysteresis and eddy currents in the magnetic core. Under DOE 2016 standards, no-load losses for a 75 kVA unit are approximately 270 W.' },
    { q: 'What are full-load (copper) losses?', a: 'Copper losses (also called load losses or I²R losses) occur in the transformer windings due to current flow. They scale with the square of the load: at 50% load, copper losses are 25% of full-load copper losses. At 100% load, they equal the rated copper loss in watts.' },
    { q: 'At what load is a transformer most efficient?', a: 'Maximum efficiency occurs when no-load losses equal the copper losses at that load level: L_opt = √(Pcore / Pcu). For most distribution transformers this is around 50–70% of rated load. Operating a transformer at or near this point minimises total losses per unit of output power.' },
    { q: 'What is all-day efficiency?', a: 'All-day efficiency accounts for the fact that transformers are energized 24 hours but may not carry load for all of them. Because core losses are constant, a lightly loaded transformer over a long period has worse all-day efficiency than one running at a higher load factor for fewer hours. It is the ratio of total daily energy output to total daily energy input.' },
  ]

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Efficiency Calculator</span>
          </div>
          <div className="label label-white">Transformer Performance</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            Transformer Efficiency
            <br /><em>Calculator</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Calculate transformer efficiency at any load level and all-day efficiency. Enter the transformer kVA and loss data or select a standard size to auto-fill typical values.
          </p>
        </div>
      </div>

      <div className="section bg-off" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">

            <div className="flex-1 min-w-0">
              <div className="label mb-4">How It Works</div>
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>Understanding Transformer Efficiency</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Two Types of Losses', b: 'No-load (core) losses occur continuously regardless of loading. Load-dependent (copper) losses scale with the square of the load current. Both must be minimised for an efficient transformer — DOE 2016 mandates minimum efficiency standards for distribution transformers.' },
                  { n: '02', t: 'Load-Dependent Copper Losses', b: 'At 50% load, copper losses are 25% of their full-load value (0.5² = 0.25). At 75% load, they are 56%. This quadratic relationship means lightly loaded transformers lose proportionally less to copper losses but proportionally more to no-load losses.' },
                  { n: '03', t: 'Point of Maximum Efficiency', b: 'Maximum efficiency occurs when no-load losses equal copper losses at that operating point: optimal load = √(core losses / copper losses). For most units this is 50–70% of rated capacity. Choosing transformer size to match this is ideal for base-load applications.' },
                  { n: '04', t: 'All-Day Efficiency', b: 'If a transformer carries load for only part of the day, the idle core losses hurt its 24-hour efficiency. All-day efficiency captures this: a 100 kVA unit energized 24 h but loaded for only 8 h will have a lower all-day efficiency than one carrying steady 75% load around the clock.' },
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
                    { label: 'Efficiency at Load L', formula: 'η = (S × PF × L) / (S × PF × L + Pcore/1000 + L² × Pcu/1000) × 100' },
                    { label: 'All-Day Efficiency', formula: 'η_AD = (S × PF × L × H) / (S × PF × L × H + Pcore/1000 × 24 + L² × Pcu/1000 × H) × 100' },
                    { label: 'Optimal Load Factor', formula: 'L_opt = √(Pcore / Pcu)' },
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
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">Efficiency Calculator</div>

                <div className="font-mono text-[.6rem] text-gray/60 tracking-[.08em] uppercase mb-2">Quick-Fill by Size</div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[75, 150, 300, 500, 1000, 1500].map(s => (
                    <button key={s} onClick={() => autofill(s)} className={`py-[.45rem] px-3 border rounded-[7px] font-mono text-[.68rem] font-semibold cursor-pointer transition-[border-color,color,background] duration-150 ${kva === String(s) ? 'bg-blue text-white border-blue' : 'bg-[#F8FAFF] border-[#E8ECF5] text-navy hover:border-blue hover:text-blue'}`}>
                      {s} kVA
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-4 mb-5">
                  {[
                    { label: 'Transformer kVA', val: kva, set: setKva, placeholder: 'e.g. 500' },
                    { label: 'No-Load (Core) Losses (W)', val: coreLoss, set: setCoreLoss, placeholder: 'e.g. 1200' },
                    { label: 'Full-Load Copper Losses (W)', val: copperLoss, set: setCopperLoss, placeholder: 'e.g. 6720' },
                    { label: 'Load Factor (%)', val: loadPct, set: setLoadPct, placeholder: '75' },
                    { label: 'Power Factor (0.01–1.00)', val: pf, set: setPf, placeholder: '0.90' },
                    { label: 'Hours at Load per Day', val: hoursDay, set: setHoursDay, placeholder: '24' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">{f.label}</label>
                      <input type="number" min="0" value={f.val} onChange={e => { f.set(e.target.value); setResult(null); setError('') }} placeholder={f.placeholder} className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
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
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="font-mono text-[.55rem] tracking-[.2em] text-white/40 uppercase mb-1">Efficiency</div>
                        <div className="font-display font-black text-[2rem] text-white leading-none">{result.eta}</div>
                        <div className="font-mono text-[.75rem] text-blue/80 mt-[.3rem]">%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-[.55rem] tracking-[.2em] text-white/40 uppercase mb-1">All-Day η</div>
                        <div className="font-display font-black text-[2rem] text-white leading-none">{result.etaAllDay}</div>
                        <div className="font-mono text-[.75rem] text-blue/80 mt-[.3rem]">%</div>
                      </div>
                    </div>
                    <div className="border-t border-white/[.1] pt-4 flex flex-col gap-2">
                      {[
                        { label: 'Output Power', val: result.outputKw + ' kW' },
                        { label: 'Input Power', val: result.inputKw + ' kW' },
                        { label: 'Total Losses', val: result.totalLoss + ' W' },
                      ].map(r => (
                        <div key={r.label} className="flex items-center justify-between">
                          <span className="font-mono text-[.65rem] text-white/40 tracking-[.08em] uppercase">{r.label}</span>
                          <span className="font-mono font-bold text-white text-[.88rem]">{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-[#E8ECF5]">
                  <div className="font-mono text-[.6rem] text-gray/60 tracking-[.12em] uppercase mb-3">Other Calculators</div>
                  <div className="flex flex-col gap-2">
                    {[
                      { href: '/resources/savings-payback-calculator', label: 'Savings & Payback Calculator' },
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
            <h2 className="rv">Comparing Transformer Efficiencies?</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">Use our Savings & Payback Calculator to see the annual energy cost difference between two transformers — and calculate how quickly a premium-efficiency unit pays for itself.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/resources/savings-payback-calculator" className="btn btn-primary btn-lg mag">Open Savings Calculator</Link>
              <Link href="/contact" className="btn btn-outline btn-lg mag">Talk to an Engineer →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
