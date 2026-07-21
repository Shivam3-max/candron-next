'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function KwKvaCalculatorPage() {
  const [kw, setKw] = useState('')
  const [pf, setPf] = useState('')
  const [kva, setKva] = useState('')
  const [result, setResult] = useState<{ field: string; value: string; unit: string } | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function calculate() {
    setError(''); setResult(null)
    const w = parseFloat(kw), p = parseFloat(pf), v = parseFloat(kva)
    const hasW = !isNaN(w) && kw.trim() !== ''
    const hasP = !isNaN(p) && pf.trim() !== ''
    const hasV = !isNaN(v) && kva.trim() !== ''
    const count = [hasW, hasP, hasV].filter(Boolean).length
    if (count < 2) { setError('Enter any two values to calculate the third.'); return }
    if (count === 3) { setError('Enter only two values — leave the one you want to calculate blank.'); return }

    if (!hasV) {
      // kVA = kW / PF
      const pfDec = hasP ? p / 100 : null
      if (!pfDec || pfDec <= 0 || pfDec > 1) { setError('Power Factor must be between 1 and 100.'); return }
      if (w <= 0) { setError('kW must be a positive value.'); return }
      setResult({ field: 'kVA', value: (w / pfDec).toFixed(3), unit: 'kVA' })
    } else if (!hasW) {
      // kW = kVA × PF
      const pfDec = hasP ? p / 100 : null
      if (!pfDec || pfDec <= 0 || pfDec > 1) { setError('Power Factor must be between 1 and 100.'); return }
      if (v <= 0) { setError('kVA must be a positive value.'); return }
      setResult({ field: 'kW', value: (v * pfDec).toFixed(3), unit: 'kW' })
    } else {
      // PF = kW / kVA
      if (w <= 0 || v <= 0) { setError('kW and kVA must be positive values.'); return }
      if (w > v) { setError('kW cannot exceed kVA (Power Factor cannot exceed 1.0).'); return }
      setResult({ field: 'Power Factor', value: ((w / v) * 100).toFixed(1), unit: '%' })
    }
  }

  function reset() { setKw(''); setPf(''); setKva(''); setResult(null); setError('') }

  const faqs = [
    { q: 'What is the difference between kW and kVA?', a: 'kW (kilowatts) measures real power — the actual energy consumed and converted to work or heat. kVA (kilovolt-amperes) measures apparent power — the total electrical power supplied, including both real and reactive components. The ratio between them is the power factor: kW = kVA × PF.' },
    { q: 'What is power factor and what is a typical value?', a: 'Power factor (PF) is a dimensionless number between 0 and 1 (or 0% to 100%) expressing the efficiency with which electrical power is converted to useful work. PF = 1.0 (100%) means all supplied power is real power. Motors, transformers, and inductive loads have lagging power factors, typically 0.80 to 0.95. Capacitive loads lead. Unity (1.0) is ideal.' },
    { q: 'Why do I need to know kVA when sizing a transformer?', a: 'Transformers are rated in kVA (apparent power), not kW (real power). This is because transformer losses and heating depend on the total current flowing through the windings, regardless of whether the load is absorbing real or reactive power. To correctly size a transformer, you must convert your kW load to kVA using the load\'s power factor.' },
    { q: 'What power factor should I assume if I don\'t know my load\'s PF?', a: 'For motor loads, a power factor of 0.85 is a commonly used conservative assumption. For data centre UPS systems, power factors of 0.90 to 0.95 are typical. For resistive heating loads, power factor is 1.0. If power factor is unknown, assume 0.80 (80%) to provide a conservative kVA estimate.' },
  ]

  const pfTable = [
    { load: 'Resistive Heating', pf: '1.00 (100%)' },
    { load: 'LED Lighting', pf: '0.90 – 0.95' },
    { load: 'Office / Commercial', pf: '0.85 – 0.90' },
    { load: 'Induction Motors (loaded)', pf: '0.80 – 0.90' },
    { load: 'Data Centre UPS', pf: '0.90 – 0.95' },
    { load: 'Variable Frequency Drives', pf: '0.95 – 0.98' },
    { load: 'Induction Motors (lightly loaded)', pf: '0.50 – 0.70' },
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
            <Link href="/">Home</Link> / <Link href="/products/transformers">Transformers</Link> / <span>kW to kVA Calculator</span>
          </div>
          <div className="label label-white">Power Factor Conversion Tool</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            kW to kVA
            <br /><em>Converter</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Convert between real power (kW), apparent power (kVA), and power factor. Enter any two values to calculate the third — essential for correctly sizing transformers to your load.
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
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>Converting Between Real and Apparent Power</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Know Your Load kW', b: 'Find the real power (kW) from your equipment nameplate, load schedule, or energy study. This is the actual energy your load consumes and converts to work or heat.' },
                  { n: '02', t: 'Determine Power Factor', b: "Use the load's nameplate power factor, or consult the typical values table below. If unknown, use 0.80 (80%) for a conservative sizing estimate. Enter power factor as a percentage (e.g., 85 for 0.85)." },
                  { n: '03', t: 'Calculate kVA', b: 'kVA = kW ÷ Power Factor. The result is the apparent power that your transformer must supply. Select the next standard transformer size above this value.' },
                  { n: '04', t: 'Apply a Safety Margin', b: 'Size your transformer at 125% of the calculated kVA minimum (divide by 0.8) to allow for load growth, starting currents, and to preserve transformer life.' },
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
                <div className="font-mono text-[.58rem] text-blue tracking-[.22em] uppercase mb-5">Conversion Formulas</div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Find kVA</div>
                    <div className="font-mono text-[.9rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">kVA = kW ÷ Power Factor</div>
                  </div>
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Find kW</div>
                    <div className="font-mono text-[.9rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">kW = kVA × Power Factor</div>
                  </div>
                  <div>
                    <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">Find Power Factor</div>
                    <div className="font-mono text-[.9rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">Power Factor = kW ÷ kVA</div>
                  </div>
                </div>
              </div>

              {/* PF Table */}
              <div className="mt-8 bg-white rounded-[14px] border border-[#E8ECF5] p-6">
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-4">Typical Power Factors by Load Type</div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-[.82rem]">
                    <thead>
                      <tr className="bg-[#F8FAFF]">
                        <th className="py-2 px-4 text-left font-mono text-[.62rem] text-gray tracking-[.1em] uppercase border-b border-[#E8ECF5]">Load Type</th>
                        <th className="py-2 px-4 text-left font-mono text-[.62rem] text-gray tracking-[.1em] uppercase border-b border-[#E8ECF5]">Typical PF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pfTable.map((row, i) => (
                        <tr key={row.load} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFF]'}>
                          <td className="py-[.55rem] px-4 font-mono text-gray border-b border-[#E8ECF5]">{row.load}</td>
                          <td className="py-[.55rem] px-4 font-title font-bold text-navy border-b border-[#E8ECF5]">{row.pf}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">kW / kVA / Power Factor</div>

                <p className="font-mono text-[.78rem] text-gray leading-[1.6] mb-6">Enter any <strong className="text-navy">two</strong> values — leave the one you want to solve blank.</p>

                {/* Fields */}
                <div className="flex flex-col gap-4 mb-5">
                  {[
                    { label: 'Kilowatts (kW)', hint: 'Real power, e.g., 400', val: kw, set: setKw },
                    { label: 'Power Factor (%)', hint: 'e.g., 85 for 0.85 PF', val: pf, set: setPf },
                    { label: 'kVA', hint: 'Apparent power, e.g., 500', val: kva, set: setKva },
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
                        <div className="font-mono text-[.62rem] text-white/40 uppercase tracking-[.1em] mb-1">Recommended Transformer Size</div>
                        <div className="font-display font-bold text-[1.3rem] text-blue/90">{(parseFloat(result.value) / 0.8).toFixed(2)} kVA</div>
                        <div className="font-mono text-[.62rem] text-white/30 mt-1">(minimum kVA ÷ 0.8 = 125% factor)</div>
                      </div>
                    )}
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
                    <Link href="/resources/fault-current-calculator" className="flex items-center justify-between py-[.65rem] px-4 rounded-[8px] bg-[#F8FAFF] border border-[#E8ECF5] no-underline group hover:border-blue transition-[border-color] duration-150">
                      <span className="font-mono text-[.78rem] font-semibold text-navy">Fault Current Calculator</span>
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
            <h2 className="rv">Know Your kVA? Let&apos;s Spec the Transformer.</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">Once you have your kVA requirement and voltage specifications, our engineers can provide a full transformer specification and lead time the same day.</p>
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
