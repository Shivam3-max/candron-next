'use client'
import { useState } from 'react'
import Link from 'next/link'

const HARMONICS = [
  { n: 2, label: '2nd' },
  { n: 3, label: '3rd' },
  { n: 5, label: '5th' },
  { n: 7, label: '7th' },
  { n: 9, label: '9th' },
  { n: 11, label: '11th' },
  { n: 13, label: '13th' },
  { n: 17, label: '17th' },
  { n: 19, label: '19th' },
  { n: 23, label: '23rd' },
  { n: 25, label: '25th' },
]

const PRESETS: Record<string, Record<number, string>> = {
  '6pulse': { 5: '35', 7: '14', 11: '8', 13: '5', 17: '2', 19: '1' },
  '12pulse': { 11: '10', 13: '8', 23: '4', 25: '3' },
  'computer': { 3: '72', 5: '43', 7: '28', 9: '10', 11: '5', 13: '4' },
  'ups': { 5: '29', 7: '11', 11: '7', 13: '5', 17: '2', 19: '1' },
  'lighting': { 3: '55', 5: '20', 7: '8', 9: '4' },
}

function kRating(k: number): string {
  if (k <= 1.1) return 'K-1'
  if (k <= 4) return 'K-4'
  if (k <= 7) return 'K-7'
  if (k <= 13) return 'K-13'
  return 'K-20'
}

export default function HarmonicCalculatorPage() {
  const [values, setValues] = useState<Record<number, string>>({})
  const [result, setResult] = useState<{ thd: string; kFactor: string; kRating: string; derating: string } | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function applyPreset(key: string) {
    setValues(PRESETS[key] || {})
    setResult(null); setError('')
  }

  function calculate() {
    setError(''); setResult(null)
    // harmonics as fraction of fundamental
    const ih: Record<number, number> = {}
    for (const h of HARMONICS) {
      const v = parseFloat(values[h.n] || '0')
      if (isNaN(v) || v < 0) { setError(`Invalid value for harmonic ${h.label}.`); return }
      ih[h.n] = v / 100
    }
    // THD = sqrt(sum of squares of harmonics ≥ 2) / fundamental × 100
    const sumSq = HARMONICS.reduce((acc, h) => acc + ih[h.n] ** 2, 0)
    const thd = Math.sqrt(sumSq) * 100

    // K-factor = sum(Ih² × h²) including fundamental / sum(Ih²) including fundamental
    const numerator = 1 * 1 + HARMONICS.reduce((acc, h) => acc + ih[h.n] ** 2 * h.n ** 2, 0)
    const denominator = 1 + sumSq
    const kFactor = numerator / denominator

    // Derating for K-1 transformer: approximate factor
    const derating = Math.max(0, (1 - (kFactor - 1) * 0.025) * 100)

    setResult({
      thd: thd.toFixed(1),
      kFactor: kFactor.toFixed(2),
      kRating: kRating(kFactor),
      derating: derating > 100 ? '100.0' : derating.toFixed(1),
    })
  }

  function reset() { setValues({}); setResult(null); setError('') }

  const faqs = [
    { q: 'What is THD and why does it matter?', a: 'Total Harmonic Distortion (THD) is the ratio of all harmonic currents to the fundamental (60 Hz) current, expressed as a percentage. High THD causes transformer overheating, nuisance tripping of breakers, neutral conductor overloading (especially with triplen harmonics), and reduced equipment life. IEEE 519-2022 recommends THD below 5% at the point of common coupling.' },
    { q: 'What is K-factor and how is it used?', a: 'K-factor quantifies how much harmonic content a transformer must handle. K-1 transformers are designed for purely linear loads. K-4 through K-20 are specifically designed with oversized neutral conductors, electrostatic shielding, and special core materials. Specifying the correct K-rating prevents premature transformer failure from eddy-current losses and hot spots caused by harmonics.' },
    { q: 'Which harmonics does a VFD (variable frequency drive) produce?', a: '6-pulse VFDs (most common) produce predominantly 5th and 7th harmonics, with smaller amounts of 11th, 13th, 17th, and 19th. The 5th harmonic is typically 20–40% of fundamental. 12-pulse VFDs cancel the 5th and 7th through phase-shifting, leaving 11th, 13th, 23rd, and 25th as dominant harmonics — resulting in much lower THD.' },
    { q: 'What K-factor should I specify for a VFD installation?', a: 'For a single 6-pulse VFD serving less than 30% of a transformer\'s load, K-4 or K-7 is typically adequate. When VFD loads dominate (>50% of transformer capacity), specify K-13. For heavy VFD or UPS installations exceeding 75% of capacity, use K-20. In practice, K-13 is the most commonly specified rating for industrial facilities with multiple drives.' },
  ]

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Harmonic Calculator</span>
          </div>
          <div className="label label-white">Power Quality Tool</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            Harmonic
            <br /><em>Calculator</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Calculate Total Harmonic Distortion (THD) and K-factor from individual harmonic currents. Determine the correct K-rated transformer for your non-linear loads.
          </p>
        </div>
      </div>

      <div className="section bg-off" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">

            <div className="flex-1 min-w-0">
              <div className="label mb-4">Background</div>
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>THD, K-Factor & Transformer Selection</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Identify Your Non-Linear Loads', b: 'VFDs, UPS systems, switch-mode power supplies, and electronic ballasts all draw non-sinusoidal current. These loads inject harmonic currents back onto the electrical system, distorting the voltage waveform.' },
                  { n: '02', t: 'Enter or Measure Harmonic Spectrum', b: 'Use a power quality analyser to measure individual harmonic currents as a percentage of fundamental. Alternatively, use the presets below for typical load types — or ask your drive manufacturer for a harmonic spectrum datasheet.' },
                  { n: '03', t: 'Calculate THD and K-Factor', b: 'THD summarises total distortion as a percentage. K-factor weighs each harmonic by its order squared, reflecting the extra heat it causes in transformer windings — higher-order harmonics are disproportionately damaging.' },
                  { n: '04', t: 'Select the Correct K-Rated Transformer', b: 'Match or exceed the calculated K-factor with a standard K-rated transformer (K-1, K-4, K-7, K-13, K-20). K-rated transformers include oversized neutral conductors, electrostatic shielding, and special core designs to handle harmonic loads without overheating.' },
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
                    { label: 'Total Harmonic Distortion', formula: 'THD = √(I₂² + I₃² + I₅² + ... + Iₙ²) / I₁ × 100%' },
                    { label: 'K-Factor', formula: 'K = (I₁² × 1 + I₂² × 4 + I₃² × 9 + ... + Iₙ² × n²) / (I₁² + I₂² + ... + Iₙ²)' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">{row.label}</div>
                      <div className="font-mono text-[.82rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3 leading-[1.6]">{row.formula}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/[.08]">
                  <div className="font-mono text-[.6rem] text-white/40 tracking-[.12em] uppercase mb-3">K-Rating Selection Guide</div>
                  <div className="flex flex-col gap-2">
                    {[
                      ['K-1', 'Linear loads — resistive heating, motors with no VFD'],
                      ['K-4', 'Discharge lighting, UPS (<25% non-linear load)'],
                      ['K-7', 'Telecom equipment, welders, UPS (<50% non-linear)'],
                      ['K-13', 'VFDs, computer room PDUs (6-pulse)'],
                      ['K-20', 'Mainframes, SCR drives, data centers (heavy non-linear)'],
                    ].map(([k, desc]) => (
                      <div key={k} className="flex gap-3 items-start">
                        <span className="font-mono text-[.7rem] font-bold text-blue w-10 shrink-0 mt-[.05rem]">{k}</span>
                        <span className="font-mono text-[.78rem] text-white/65 leading-[1.5]">{desc}</span>
                      </div>
                    ))}
                  </div>
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
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">Harmonic Calculator</div>

                <div className="font-mono text-[.6rem] text-gray/60 tracking-[.08em] uppercase mb-2">Load Presets</div>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { key: '6pulse', label: 'VFD 6-Pulse' },
                    { key: '12pulse', label: 'VFD 12-Pulse' },
                    { key: 'computer', label: 'PC / Servers' },
                    { key: 'ups', label: 'UPS System' },
                    { key: 'lighting', label: 'Fluorescent' },
                  ].map(p => (
                    <button key={p.key} onClick={() => applyPreset(p.key)} className="py-[.6rem] px-3 border border-[#E8ECF5] rounded-[8px] bg-[#F8FAFF] font-mono text-[.68rem] font-semibold text-navy hover:border-blue hover:text-blue transition-[border-color,color] duration-150 cursor-pointer text-left">
                      {p.label}
                    </button>
                  ))}
                  <button onClick={reset} className="py-[.6rem] px-3 border border-[#E8ECF5] rounded-[8px] bg-[#F8FAFF] font-mono text-[.68rem] font-semibold text-gray hover:border-[#C8CDD9] transition-[border-color] duration-150 cursor-pointer text-left">
                    Clear All
                  </button>
                </div>

                <div className="font-mono text-[.6rem] text-gray/60 tracking-[.08em] uppercase mb-2">Harmonic Currents (% of Fundamental)</div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-3 mb-5">
                  {HARMONICS.map(h => (
                    <div key={h.n}>
                      <label className="block font-mono text-[.6rem] text-gray tracking-[.08em] mb-[.3rem]">{h.label} Harmonic</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="200"
                          value={values[h.n] || ''}
                          onChange={e => { setValues(v => ({ ...v, [h.n]: e.target.value })); setResult(null); setError('') }}
                          placeholder="0"
                          className="w-full pl-3 pr-7 py-[.6rem] border-[1.5px] border-[#E8ECF5] rounded-[8px] font-title text-[.88rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 placeholder:text-[#C8CDD9] placeholder:font-normal"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[.65rem] text-gray/50">%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={calculate} className="btn btn-primary w-full justify-center mb-4">Calculate THD & K-Factor</button>

                {error && <p className="font-mono text-[.78rem] text-[#dc2626] text-center mb-3 mt-[-0.5rem]">{error}</p>}

                {result && (
                  <div className="bg-navy rounded-[14px] p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="font-mono text-[.55rem] tracking-[.2em] text-white/40 uppercase mb-1">THD</div>
                        <div className="font-display font-black text-[2rem] text-white leading-none">{result.thd}</div>
                        <div className="font-mono text-[.75rem] text-blue/80 mt-[.3rem]">%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-[.55rem] tracking-[.2em] text-white/40 uppercase mb-1">K-Factor</div>
                        <div className="font-display font-black text-[2rem] text-white leading-none">{result.kFactor}</div>
                        <div className="font-mono text-[.75rem] text-blue/80 mt-[.3rem]">IEEE</div>
                      </div>
                    </div>
                    <div className="border-t border-white/[.1] pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[.65rem] text-white/40 uppercase tracking-[.1em]">Recommended K-Rating</span>
                        <span className="font-display font-black text-blue text-[1.3rem]">{result.kRating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[.65rem] text-white/40 uppercase tracking-[.1em]">K-1 Derating Factor</span>
                        <span className="font-mono font-bold text-white/80 text-[.9rem]">{result.derating}%</span>
                      </div>
                      <p className="font-mono text-[.7rem] text-white/35 mt-3 leading-[1.55] m-0">
                        {parseFloat(result.thd) > 5 ? 'THD exceeds IEEE 519 5% limit — mitigation recommended.' : 'THD within IEEE 519 guidelines.'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-[#E8ECF5]">
                  <div className="font-mono text-[.6rem] text-gray/60 tracking-[.12em] uppercase mb-3">Other Calculators</div>
                  <div className="flex flex-col gap-2">
                    {[
                      { href: '/resources/harmonic-reactor-calculator', label: 'Harmonic Reactor Calculator' },
                      { href: '/resources/fault-current-calculator', label: 'Fault Current Calculator' },
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
            <h2 className="rv">Need a K-Rated Transformer?</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">We supply K-4 through K-20 transformers in stock and custom configurations. Our engineers can review your harmonic profile and confirm the correct rating.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=k-rated-transformer" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">View Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
