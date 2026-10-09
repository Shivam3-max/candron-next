'use client'
import { useState } from 'react'
import Link from 'next/link'

const SQRT3 = Math.sqrt(3)
const TWO_PI = 2 * Math.PI

export default function InductanceCalculatorPage() {
  const [phase, setPhase] = useState<'1' | '3'>('3')
  const [kva, setKva] = useState('')
  const [voltage, setVoltage] = useState('')
  const [impedance, setImpedance] = useState('')
  const [freq, setFreq] = useState<'60' | '50'>('60')
  const [result, setResult] = useState<{
    zBase: string; xL: string; lMh: string; iRated: string; isc: string
  } | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function calculate() {
    setError(''); setResult(null)
    const S = parseFloat(kva)
    const V = parseFloat(voltage)
    const Z = parseFloat(impedance)
    const f = parseFloat(freq)
    if ([S, V, Z, f].some(isNaN) || S <= 0 || V <= 0 || Z <= 0) {
      setError('Enter positive values for all fields.'); return
    }
    // Base impedance: for 3-phase Zbase = V_LL² / (S × 1000)
    // For 1-phase: Zbase = V² / (S × 1000)
    const zBase = (V * V) / (S * 1000)
    const xL = (Z / 100) * zBase
    const lMh = (xL / (TWO_PI * f)) * 1000

    // Rated current
    const iRated = phase === '3'
      ? (S * 1000) / (SQRT3 * V)
      : (S * 1000) / V

    // Short-circuit current (rated current / per-unit impedance)
    const isc = iRated / (Z / 100)

    setResult({
      zBase: zBase.toFixed(4),
      xL: xL.toFixed(4),
      lMh: lMh.toFixed(3),
      iRated: iRated.toFixed(1),
      isc: isc.toFixed(0),
    })
  }

  function reset() { setKva(''); setVoltage(''); setImpedance(''); setResult(null); setError('') }

  const faqs = [
    { q: 'What is transformer leakage inductance?', a: 'Leakage inductance (also called leakage reactance when expressed in ohms) represents magnetic flux that links only one winding and does not transfer energy to the other. It acts as a series impedance that limits fault current, causes voltage regulation under load, and determines the transformer\'s short-circuit impedance (%Z).' },
    { q: 'Why does %Z matter for protection?', a: '%Z determines the maximum available fault current at the transformer\'s secondary terminals. Lower %Z means higher fault current, requiring protective devices (breakers, fuses) with higher interrupting ratings. Higher %Z limits fault current but increases voltage regulation at load. Typical values: 2–4% for distribution, 5–7% for power transformers.' },
    { q: 'How do I use inductance in circuit calculations?', a: 'Leakage reactance XL = (Z%/100) × (V²/kVA×1000) in ohms. Inductance L = XL / (2π × f) in henries. These values are used in harmonic filter design, reactor sizing, cable impedance calculations, and short-circuit studies per IEC 60909 or ANSI C37.' },
    { q: 'What voltage should I enter for three-phase?', a: 'Enter the secondary line-to-line voltage (e.g. 480 V, 600 V, 4160 V). The base impedance formula V²/(kVA×1000) uses line-to-line voltage for three-phase systems and gives per-phase results on a per-unit base. The short-circuit current uses line current (= kVA/(√3×V)).' },
  ]

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Inductance Calculator</span>
          </div>
          <div className="label label-white">Impedance & Inductance Tool</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            Transformer Inductance
            <br /><em>Calculator</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Calculate transformer leakage reactance and inductance from kVA, voltage, and % impedance. Also computes rated current and available short-circuit current.
          </p>
        </div>
      </div>

      <div className="section bg-off" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">

            <div className="flex-1 min-w-0">
              <div className="label mb-4">Background</div>
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>Leakage Reactance & Fault Current</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Base Impedance', b: 'The base impedance relates per-unit values to ohms. For any transformer: Z_base = V² / (kVA × 1000). This normalises the transformer\'s rated voltage and capacity into a reference impedance from which all actual values are derived.' },
                  { n: '02', t: 'Leakage Reactance', b: '%Z (percentage impedance) is the fraction of rated voltage needed to circulate rated current through the short-circuited transformer. Leakage reactance XL = (%Z/100) × Z_base in ohms. Most of the transformer impedance is inductive, so %Z ≈ %XL for design purposes.' },
                  { n: '03', t: 'Inductance in mH', b: 'Inductance L = XL / (2π × f). For a 500 kVA, 480 V transformer at 5% impedance, this is approximately 2.9 mH. This value is used in filter design, drive input reactor sizing, and harmonic current calculations.' },
                  { n: '04', t: 'Short-Circuit Current', b: 'The maximum available fault current at the transformer secondary is: Isc = I_rated / (%Z/100). For a 500 kVA / 480 V unit at 5% impedance, rated current ≈ 601 A and Isc ≈ 12,000 A. Protective devices must have an interrupting rating exceeding this value.' },
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
                    { label: 'Base Impedance (Ω)', formula: 'Z_base = V² / (kVA × 1,000)' },
                    { label: 'Leakage Reactance (Ω)', formula: 'X_L = (%Z / 100) × Z_base' },
                    { label: 'Inductance (mH)', formula: 'L = X_L / (2π × f) × 1,000' },
                    { label: 'Short-Circuit Current (A)', formula: 'I_sc = I_rated / (%Z / 100)' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">{row.label}</div>
                      <div className="font-mono text-[.88rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">{row.formula}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/[.08]">
                  <div className="font-mono text-[.6rem] text-white/40 tracking-[.12em] uppercase mb-3">Typical %Z by Size & Application</div>
                  <div className="flex flex-col gap-2">
                    {[
                      ['< 300 kVA', '2.0 – 4.0%', 'Distribution, LV Dry-Type'],
                      ['300 – 1000 kVA', '4.0 – 5.5%', 'Medium Distribution'],
                      ['1 – 10 MVA', '5.5 – 7.0%', 'Substation / Power'],
                      ['> 10 MVA', '7.0 – 12%', 'HV Power Transformers'],
                    ].map(([size, z, desc]) => (
                      <div key={size} className="flex gap-3 items-start">
                        <span className="font-mono text-[.7rem] text-blue w-28 shrink-0">{size}</span>
                        <span className="font-mono text-[.7rem] font-bold text-white w-20 shrink-0">{z}</span>
                        <span className="font-mono text-[.7rem] text-white/50">{desc}</span>
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
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">Inductance Calculator</div>

                {/* Phase toggle */}
                <div className="flex bg-[#F4F6FA] rounded-[10px] p-1 mb-4 gap-1">
                  {(['3', '1'] as const).map(p => (
                    <button key={p} onClick={() => { setPhase(p); setResult(null) }} className={`flex-1 py-[.55rem] rounded-[8px] border-0 cursor-pointer font-mono text-[.7rem] font-bold tracking-[.06em] uppercase transition-all duration-200 ${phase === p ? 'bg-white text-navy shadow-[0_1px_6px_rgba(5,9,31,.12)]' : 'bg-transparent text-gray'}`}>
                      {p === '3' ? '3-Phase' : '1-Phase'}
                    </button>
                  ))}
                </div>

                {/* Frequency toggle */}
                <div className="flex bg-[#F4F6FA] rounded-[10px] p-1 mb-5 gap-1">
                  {(['60', '50'] as const).map(f => (
                    <button key={f} onClick={() => { setFreq(f); setResult(null) }} className={`flex-1 py-[.55rem] rounded-[8px] border-0 cursor-pointer font-mono text-[.7rem] font-bold tracking-[.06em] uppercase transition-all duration-200 ${freq === f ? 'bg-white text-navy shadow-[0_1px_6px_rgba(5,9,31,.12)]' : 'bg-transparent text-gray'}`}>
                      {f} Hz
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-4 mb-5">
                  {[
                    { label: 'Transformer kVA', val: kva, set: setKva, ph: 'e.g. 500' },
                    { label: phase === '3' ? 'Secondary Voltage — Line-to-Line (V)' : 'Secondary Voltage (V)', val: voltage, set: setVoltage, ph: phase === '3' ? 'e.g. 480' : 'e.g. 240' },
                    { label: '% Impedance (%Z)', val: impedance, set: setImpedance, ph: 'e.g. 5.0' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">{f.label}</label>
                      <input type="number" min="0" value={f.val} onChange={e => { f.set(e.target.value); setResult(null); setError('') }} placeholder={f.ph} className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
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
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center">
                        <div className="font-mono text-[.52rem] tracking-[.18em] text-white/40 uppercase mb-1">Reactance X_L</div>
                        <div className="font-display font-black text-[1.6rem] text-white leading-none">{result.xL}</div>
                        <div className="font-mono text-[.72rem] text-blue/80 mt-[.3rem]">Ω</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-[.52rem] tracking-[.18em] text-white/40 uppercase mb-1">Inductance</div>
                        <div className="font-display font-black text-[1.6rem] text-white leading-none">{result.lMh}</div>
                        <div className="font-mono text-[.72rem] text-blue/80 mt-[.3rem]">mH</div>
                      </div>
                    </div>
                    <div className="border-t border-white/[.1] pt-4 flex flex-col gap-2">
                      {[
                        { label: 'Base Impedance Z_base', val: result.zBase + ' Ω' },
                        { label: 'Rated Secondary Current', val: result.iRated + ' A' },
                        { label: 'Short-Circuit Current', val: Number(result.isc).toLocaleString() + ' A' },
                      ].map(r => (
                        <div key={r.label} className="flex items-center justify-between">
                          <span className="font-mono text-[.62rem] text-white/40 tracking-[.06em] uppercase">{r.label}</span>
                          <span className="font-mono font-bold text-white text-[.9rem]">{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-[#E8ECF5]">
                  <div className="font-mono text-[.6rem] text-gray/60 tracking-[.12em] uppercase mb-3">Related Calculators</div>
                  <div className="flex flex-col gap-2">
                    {[
                      { href: '/resources/fault-current-calculator', label: 'Fault Current Calculator' },
                      { href: '/resources/harmonic-reactor-calculator', label: 'Harmonic Reactor Calculator' },
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
            <h2 className="rv">Need %Z or Loss Data for a Specific Unit?</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">Our engineering team can provide factory test reports, nameplate data, and impedance certificates for any CANDRON transformer, including custom-wound units.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact" className="btn btn-primary btn-lg mag">Talk to an Engineer</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">View Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
