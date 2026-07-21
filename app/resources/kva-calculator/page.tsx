'use client'
import { useState } from 'react'
import Link from 'next/link'

const SQRT3 = 1.7320508

function calcKva(phase: '1' | '3', volts: number, amps: number): number {
  return phase === '3' ? (volts * amps * SQRT3) / 1000 : (volts * amps) / 1000
}
function calcAmps(phase: '1' | '3', kva: number, volts: number): number {
  return phase === '3' ? (kva * 1000) / (volts * SQRT3) : (kva * 1000) / volts
}
function calcVolts(phase: '1' | '3', kva: number, amps: number): number {
  return phase === '3' ? (kva * 1000) / (amps * SQRT3) : (kva * 1000) / amps
}

export default function KvaCalculatorPage() {
  const [phase, setPhase] = useState<'1' | '3'>('3')
  const [volts, setVolts] = useState('')
  const [amps, setAmps] = useState('')
  const [kva, setKva] = useState('')
  const [result, setResult] = useState<{ field: string; value: string; unit: string } | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function calculate() {
    setError(''); setResult(null)
    const v = parseFloat(volts), a = parseFloat(amps), k = parseFloat(kva)
    const hasV = !isNaN(v) && volts.trim() !== ''
    const hasA = !isNaN(a) && amps.trim() !== ''
    const hasK = !isNaN(k) && kva.trim() !== ''
    const count = [hasV, hasA, hasK].filter(Boolean).length
    if (count < 2) { setError('Enter any two values to calculate the third.'); return }
    if (count === 3) { setError('Enter only two values — leave the one you want to calculate blank.'); return }
    if (!hasK) {
      if (v <= 0 || a <= 0) { setError('Volts and Amps must be positive values.'); return }
      setResult({ field: 'kVA', value: calcKva(phase, v, a).toFixed(2), unit: 'kVA' })
    } else if (!hasV) {
      if (k <= 0 || a <= 0) { setError('kVA and Amps must be positive values.'); return }
      setResult({ field: 'Volts', value: calcVolts(phase, k, a).toFixed(1), unit: 'V' })
    } else {
      if (v <= 0 || k <= 0) { setError('Volts and kVA must be positive values.'); return }
      setResult({ field: 'Amps', value: calcAmps(phase, k, v).toFixed(2), unit: 'A' })
    }
  }

  function reset() { setVolts(''); setAmps(''); setKva(''); setResult(null); setError('') }

  const faqs = [
    { q: 'How do I use this calculator?', a: 'Enter any two of the three values (Volts, Amps, or kVA) and leave the third field blank. Click Calculate to solve for the missing value. Works for both single-phase and three-phase systems.' },
    { q: 'What kVA rating should I actually order?', a: 'The calculated kVA is the minimum rating at your load conditions. We recommend specifying a transformer at approximately 125% of the calculated minimum (divide by 0.8) to prevent overloading and preserve service life. Standard transformer sizes are discrete (15, 25, 37.5, 50, 75, 100, 167, 250, 333, 500 kVA, etc.) — choose the next standard size above your calculated value.' },
    { q: 'Does this calculator account for power factor?', a: 'No — this calculator computes apparent power (kVA), which is the product of voltage and current. Power factor affects how much of this apparent power is real power (kW). Use our kW to kVA Calculator to convert between real and apparent power when you know your load\'s power factor.' },
    { q: 'What is the difference between single-phase and three-phase kVA?', a: 'For a single-phase system: kVA = (V × A) / 1,000. For a three-phase system, the current flows in three conductors at different phase angles, so the formula includes √3 (≈ 1.732): kVA = (V × A × √3) / 1,000. The three-phase voltage used in this calculator is the line-to-line voltage, not the phase voltage.' },
  ]

  return (
    <>
      {/* HERO */}
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products/transformers">Transformers</Link> / <span>kVA Calculator</span>
          </div>
          <div className="label label-white">Transformer Sizing Tool</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            Transformer kVA
            <br /><em>Calculator</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Calculate transformer size from load voltage and current — or solve for any of the three values. Toggle between single-phase and three-phase formulas.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="section bg-off" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">

            {/* LEFT: How it works */}
            <div className="flex-1 min-w-0">
              <div className="label mb-4">How to Use</div>
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>Sizing a Transformer in 4 Steps</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Identify Load Voltage & Amps', b: "Check your equipment's nameplate or engineering drawings. The required voltage and full-load current are the two inputs needed to calculate transformer kVA." },
                  { n: '02', t: 'Select Phase Type', b: 'Toggle between 1-Phase (single-phase) and 3-Phase (three-phase) to apply the correct formula. Three-phase calculations include the √3 (≈ 1.732) multiplier.' },
                  { n: '03', t: 'Calculate Minimum kVA', b: 'Enter any two known values and calculate the third. The result is the minimum kVA rating for your load at those conditions.' },
                  { n: '04', t: 'Apply Safety Factor', b: 'Size up to the next standard transformer rating above your minimum. We recommend specifying 125% of minimum kVA (÷ 0.8) to provide headroom and preserve transformer life.' },
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

              {/* FORMULA BLOCK */}
              <div className="mt-8 bg-navy rounded-[16px] p-7">
                <div className="font-mono text-[.58rem] text-blue tracking-[.22em] uppercase mb-5">Transformer Sizing Formulas</div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Single-Phase</div>
                    <div className="font-mono text-[.92rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">kVA = (Amps × Volts) ÷ 1,000</div>
                  </div>
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Three-Phase</div>
                    <div className="font-mono text-[.92rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">kVA = (Amps × Volts × √3) ÷ 1,000</div>
                  </div>
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Recommended Size</div>
                    <div className="font-mono text-[.92rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">Min kVA ÷ 0.8 = Recommended Size</div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-8">
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">FAQ</div>
                <div className="flex flex-col gap-2">
                  {faqs.map((f, i) => (
                    <div key={i} className={`bg-white rounded-[12px] border border-[#E8ECF5] overflow-hidden transition-[box-shadow] duration-200 ${openFaq === i ? 'shadow-[0_4px_20px_rgba(5,9,31,.08)]' : ''}`}>
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

            {/* RIGHT: Calculator */}
            <div className="w-full lg:w-[420px] shrink-0 lg:sticky lg:top-[100px]">
              <div className="bg-white rounded-[20px] border border-[#E8ECF5] p-7 shadow-[0_4px_32px_rgba(5,9,31,.08)]">
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">kVA Calculator</div>

                {/* Phase Toggle */}
                <div className="flex bg-[#F4F6FA] rounded-[10px] p-1 mb-6 gap-1">
                  {(['3', '1'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => { setPhase(p); reset() }}
                      className={`flex-1 py-[.55rem] rounded-[8px] border-0 cursor-pointer font-mono text-[.7rem] font-bold tracking-[.06em] uppercase transition-all duration-200 ${phase === p ? 'bg-white text-navy shadow-[0_1px_6px_rgba(5,9,31,.12)]' : 'bg-transparent text-gray'}`}
                    >
                      {p === '3' ? '3-Phase' : '1-Phase'}
                    </button>
                  ))}
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4 mb-5">
                  {[
                    { label: 'Volts (V)', hint: 'Line-to-line voltage', val: volts, set: setVolts },
                    { label: 'Amps (A)', hint: 'Full-load current', val: amps, set: setAmps },
                    { label: 'kVA', hint: 'Apparent power', val: kva, set: setKva },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">{f.label}</label>
                      <input
                        type="number"
                        min="0"
                        value={f.val}
                        onChange={e => { f.set(e.target.value); setResult(null); setError('') }}
                        placeholder={f.hint}
                        className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none transition-[border-color] duration-200 focus:border-blue box-border placeholder:text-[#C8CDD9] placeholder:font-normal"
                      />
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mb-4">
                  <button onClick={calculate} className="btn btn-primary flex-1 justify-center">Calculate</button>
                  <button onClick={reset} className="btn btn-outline-blue px-5">Clear</button>
                </div>

                {/* Error */}
                {error && <p className="font-mono text-[.78rem] text-[#dc2626] text-center mb-3 mt-[-0.5rem]">{error}</p>}

                {/* Result */}
                {result && (
                  <div className="bg-navy rounded-[14px] p-6 text-center">
                    <div className="font-mono text-[.58rem] tracking-[.22em] text-white/40 uppercase mb-2">{result.field}</div>
                    <div className="font-display font-black text-[2.4rem] text-white tracking-[.02em] leading-none">{result.value}</div>
                    <div className="font-mono text-[.8rem] text-blue/80 mt-[.4rem]">{result.unit}</div>
                    {result.field === 'kVA' && (
                      <div className="mt-4 pt-4 border-t border-white/[.1]">
                        <div className="font-mono text-[.62rem] text-white/40 uppercase tracking-[.1em] mb-1">Recommended Size (125%)</div>
                        <div className="font-display font-bold text-[1.3rem] text-blue/90">{(parseFloat(result.value) / 0.8).toFixed(2)} kVA</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Other calculators */}
                <div className="mt-5 pt-5 border-t border-[#E8ECF5]">
                  <div className="font-mono text-[.6rem] text-gray/60 tracking-[.12em] uppercase mb-3">Other Calculators</div>
                  <div className="flex flex-col gap-2">
                    <Link href="/resources/fault-current-calculator" className="flex items-center justify-between py-[.65rem] px-4 rounded-[8px] bg-[#F8FAFF] border border-[#E8ECF5] no-underline group hover:border-blue transition-[border-color] duration-150">
                      <span className="font-mono text-[.78rem] font-semibold text-navy">Fault Current Calculator</span>
                      <span className="font-mono text-[.65rem] text-blue group-hover:translate-x-[2px] transition-transform duration-150">→</span>
                    </Link>
                    <Link href="/resources/kw-kva-calculator" className="flex items-center justify-between py-[.65rem] px-4 rounded-[8px] bg-[#F8FAFF] border border-[#E8ECF5] no-underline group hover:border-blue transition-[border-color] duration-150">
                      <span className="font-mono text-[.78rem] font-semibold text-navy">kW to kVA Converter</span>
                      <span className="font-mono text-[.65rem] text-blue group-hover:translate-x-[2px] transition-transform duration-150">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2 className="rv">Ready to Order Your Transformer?</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">Once you have your kVA and voltage requirements, our engineering team can provide a specification, lead time, and price the same day.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=transformer" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">View All Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
