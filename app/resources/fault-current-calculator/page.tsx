'use client'
import { useState } from 'react'
import Link from 'next/link'

const SQRT3 = 1.7320508

function calcAFC(phase: '1' | '3', kva: number, secV: number, iz: number): number {
  if (phase === '1') return ((kva * 1000) / secV) / (iz / 100)
  return ((kva * 1000) / (SQRT3 * secV)) / (iz / 100)
}

export default function FaultCurrentCalculatorPage() {
  const [phase, setPhase] = useState<'1' | '3'>('3')
  const [kva, setKva] = useState('')
  const [secV, setSecV] = useState('')
  const [iz, setIz] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function calculate() {
    setError(''); setResult(null)
    const k = parseFloat(kva), v = parseFloat(secV), z = parseFloat(iz)
    if (isNaN(k) || k <= 0) { setError('Enter a valid kVA rating.'); return }
    if (isNaN(v) || v <= 0) { setError('Enter a valid secondary voltage.'); return }
    if (isNaN(z) || z <= 0 || z >= 100) { setError('% Impedance must be between 0 and 100.'); return }
    setResult(calcAFC(phase, k, v, z).toFixed(0))
  }

  function reset() { setKva(''); setSecV(''); setIz(''); setResult(null); setError('') }

  const faqs = [
    { q: 'What is Available Fault Current (AFC)?', a: 'Available Fault Current (also called Available Short-Circuit Current or ASCC) is the maximum current that can flow in a circuit if a bolted three-phase or single-phase fault occurs at the transformer secondary terminals. It is used to verify that downstream protective devices and equipment have adequate interrupting ratings for the installation.' },
    { q: 'What is % impedance and where do I find it?', a: 'Percent impedance (% Z or IZ) is a characteristic of the transformer that limits fault current. It is found on the transformer nameplate and in the manufacturer\'s data sheet. Standard impedance values for distribution transformers typically range from 1% to 6%. A higher % impedance limits fault current but increases voltage regulation under load.' },
    { q: 'Is this the actual fault current my equipment must handle?', a: 'The calculated value is the available fault current at the transformer secondary terminals assuming infinite available fault current on the primary (worst case). In practice, the utility supply impedance, cable impedance, and fuse resistance reduce the actual fault current seen by downstream equipment. Always consult a licensed engineer for protective device coordination and arc flash analysis.' },
    { q: 'Why does a lower % impedance produce higher fault current?', a: 'A lower impedance transformer allows more current to flow during a fault — it is \'stiffer\' and has better voltage regulation but produces higher fault levels. A higher impedance transformer limits fault current but has worse voltage regulation under heavy load. The impedance choice is a design trade-off specified for each application.' },
  ]

  const commonImpedances = [
    { kva: '25 kVA', iz: '1.8%' }, { kva: '75 kVA', iz: '2.0%' }, { kva: '167 kVA', iz: '2.0%' },
    { kva: '500 kVA', iz: '2.5%' }, { kva: '1,000 kVA', iz: '3.5%' }, { kva: '2,500 kVA', iz: '5.0%' },
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
            <Link href="/">Home</Link> / <Link href="/products/transformers">Transformers</Link> / <span>Fault Current Calculator</span>
          </div>
          <div className="label label-white">Protective Device Coordination Tool</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            Fault Current
            <br /><em>Calculator</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Calculate available short-circuit current at the transformer secondary terminals from kVA rating, secondary voltage, and percent impedance. Toggle between single-phase and three-phase.
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="section bg-off" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">

            {/* LEFT */}
            <div className="flex-1 min-w-0">
              <div className="label mb-4">How to Use</div>
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>Calculating Fault Current at the Secondary</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Gather Transformer Parameters', b: 'You need three values from the transformer nameplate: (1) kVA rating, (2) secondary voltage, and (3) percent impedance (%Z or IZ). All three are required for the calculation.' },
                  { n: '02', t: 'Select Phase Configuration', b: 'Choose 3-Phase for three-phase transformers (most commercial and industrial units) or 1-Phase for single-phase transformers. The formula differs by a factor of √3 (1.732).' },
                  { n: '03', t: 'Calculate & Apply', b: 'Enter the three values and calculate available fault current in amps. Compare this against the interrupting rating of your downstream breakers, fuses, and switchgear.' },
                  { n: '04', t: 'Account for System Impedance', b: 'This result is the worst-case (maximum) available fault current assuming an infinite bus on the primary. In practice, utility impedance and cable resistance reduce the actual fault current — consult a licensed engineer for detailed coordination studies.' },
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

              {/* FORMULA */}
              <div className="mt-8 bg-navy rounded-[16px] p-7">
                <div className="font-mono text-[.58rem] text-blue tracking-[.22em] uppercase mb-5">Fault Current Formulas</div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Single-Phase</div>
                    <div className="font-mono text-[.85rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">AFC = ((kVA × 1,000) ÷ V) ÷ (IZ ÷ 100)</div>
                  </div>
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Three-Phase</div>
                    <div className="font-mono text-[.85rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">AFC = ((kVA × 1,000) ÷ (√3 × V)) ÷ (IZ ÷ 100)</div>
                  </div>
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Where</div>
                    <div className="font-mono text-[.8rem] text-white/60 leading-[1.8]">
                      AFC = Available Fault Current (amps)<br />
                      kVA = Transformer rated capacity<br />
                      V = Secondary line-to-line voltage<br />
                      IZ = Transformer % impedance
                    </div>
                  </div>
                </div>
              </div>

              {/* Common impedances */}
              <div className="mt-8 bg-white rounded-[14px] border border-[#E8ECF5] p-6">
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">Typical % Impedance Values</div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-[.82rem]">
                    <thead>
                      <tr className="bg-[#F8FAFF]">
                        <th className="py-2 px-4 text-left font-mono text-[.62rem] text-gray tracking-[.1em] uppercase border-b border-[#E8ECF5]">Transformer Size</th>
                        <th className="py-2 px-4 text-left font-mono text-[.62rem] text-gray tracking-[.1em] uppercase border-b border-[#E8ECF5]">Typical % Z</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commonImpedances.map((row, i) => (
                        <tr key={row.kva} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFF]'}>
                          <td className="py-[.55rem] px-4 font-mono text-gray border-b border-[#E8ECF5]">{row.kva}</td>
                          <td className="py-[.55rem] px-4 font-title font-bold text-navy border-b border-[#E8ECF5]">{row.iz}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="font-mono text-[.72rem] text-gray/60 mt-3 leading-[1.6]">Values are typical ANSI/IEEE standard impedances. Actual values vary by manufacturer and specification.</p>
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
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">Fault Current Calculator</div>

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
                    { label: 'Transformer kVA', hint: 'e.g., 500', val: kva, set: setKva },
                    { label: 'Secondary Voltage (V)', hint: 'Line-to-line, e.g., 480', val: secV, set: setSecV },
                    { label: '% Impedance (IZ)', hint: 'From nameplate, e.g., 2.5', val: iz, set: setIz },
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
                    <div className="font-mono text-[.58rem] tracking-[.22em] text-white/40 uppercase mb-2">Available Fault Current</div>
                    <div className="font-display font-black text-[2.4rem] text-white tracking-[.02em] leading-none">{parseInt(result).toLocaleString()}</div>
                    <div className="font-mono text-[.8rem] text-blue/80 mt-[.4rem]">Amperes (A)</div>
                    <div className="mt-4 pt-4 border-t border-white/[.1] text-left">
                      <p className="font-mono text-[.7rem] text-white/40 leading-[1.65]">⚠ This is the maximum (infinite bus primary) fault current. Consult a licensed engineer for protective device coordination.</p>
                    </div>
                  </div>
                )}

                {/* Other calculators */}
                <div className="mt-5 pt-5 border-t border-[#E8ECF5]">
                  <div className="font-mono text-[.6rem] text-gray/60 tracking-[.12em] uppercase mb-3">Other Calculators</div>
                  <div className="flex flex-col gap-2">
                    <Link href="/resources/kva-calculator" className="flex items-center justify-between py-[.65rem] px-4 rounded-[8px] bg-[#F8FAFF] border border-[#E8ECF5] no-underline group hover:border-blue transition-[border-color] duration-150">
                      <span className="font-mono text-[.78rem] font-semibold text-navy">kVA Calculator</span>
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
            <h2 className="rv">Need a Transformer with a Specific % Impedance?</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">We specify and build transformers to custom impedance values — whether you need a lower impedance for voltage regulation or a higher impedance to limit fault current.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=transformer" className="btn btn-primary btn-lg mag">Talk to Our Engineers</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">View All Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
