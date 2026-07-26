'use client'
import { useState } from 'react'
import Link from 'next/link'

const HP_TO_KW = 0.7457

export default function HpKvaCalculatorPage() {
  const [hp, setHp] = useState('')
  const [kva, setKva] = useState('')
  const [efficiency, setEfficiency] = useState('90')
  const [pf, setPf] = useState('0.85')
  const [result, setResult] = useState<{ kw: string; kva: string; amps480: string; amps208: string } | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function calculate() {
    setError(''); setResult(null)
    const hpVal = parseFloat(hp)
    const kvaVal = parseFloat(kva)
    const eta = parseFloat(efficiency) / 100
    const pfVal = parseFloat(pf)
    if (isNaN(eta) || eta <= 0 || eta > 1) { setError('Enter a valid motor efficiency (1–100%).'); return }
    if (isNaN(pfVal) || pfVal <= 0 || pfVal > 1) { setError('Enter a valid power factor (0.01–1.00).'); return }
    const hasHp = !isNaN(hpVal) && hp.trim() !== '' && hpVal > 0
    const hasKva = !isNaN(kvaVal) && kva.trim() !== '' && kvaVal > 0
    if (!hasHp && !hasKva) { setError('Enter Horsepower or kVA to calculate.'); return }
    if (hasHp && hasKva) { setError('Enter only one value — HP or kVA — and leave the other blank.'); return }

    let kwResult: number, kvaResult: number
    if (hasHp) {
      kwResult = (hpVal * HP_TO_KW) / eta
      kvaResult = kwResult / pfVal
    } else {
      kvaResult = kvaVal
      kwResult = kvaResult * pfVal
    }
    setResult({
      kw: kwResult.toFixed(2),
      kva: kvaResult.toFixed(2),
      amps480: ((kvaResult * 1000) / (Math.sqrt(3) * 480)).toFixed(1),
      amps208: ((kvaResult * 1000) / (Math.sqrt(3) * 208)).toFixed(1),
    })
  }

  function reset() { setHp(''); setKva(''); setResult(null); setError('') }

  const faqs = [
    { q: 'Why does motor horsepower not equal kVA directly?', a: 'HP is a unit of mechanical output power. To find the electrical power drawn, you must account for motor efficiency (heat loss in the motor) and power factor (reactive vs real power). A typical 90% efficient motor at 0.85 PF requires about 0.976 kVA per horsepower.' },
    { q: 'What efficiency and power factor should I use?', a: 'For NEMA Premium Efficiency motors, efficiency ranges from 88% (small motors) to 96% (large motors). Power factor is typically 0.82–0.90 at full load and drops significantly at partial loads. Check the motor nameplate or use 90% efficiency and 0.85 PF as conservative estimates.' },
    { q: 'How do I size a transformer for a motor?', a: 'Calculate the motor kVA, then size the transformer to at least 125% of that value (divide kVA by 0.8) to allow for motor starting inrush current, which can be 6–8× full-load current for direct-on-line starts. For VFD applications, the starting surge is eliminated and a smaller transformer may be acceptable.' },
    { q: 'Can I run multiple motors on one transformer?', a: 'Yes — add the kVA of all running motors, plus typically 1–1.5× the largest motor kVA for starting the largest motor at the same time as the others are running. This is called the "largest motor starting" scenario. Use our kVA Calculator for the final transformer sizing.' },
  ]

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>HP to kVA Calculator</span>
          </div>
          <div className="label label-white">Motor & Transformer Sizing</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            HP to kVA
            <br /><em>Calculator</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Convert motor horsepower to transformer kVA. Accounts for motor efficiency and power factor to give you the true electrical demand.
          </p>
        </div>
      </div>

      <div className="section bg-off" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">

            <div className="flex-1 min-w-0">
              <div className="label mb-4">How It Works</div>
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>From Motor Nameplate to Transformer kVA</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Find Motor HP & Nameplate Data', b: 'Locate the motor nameplate for horsepower rating, efficiency (%), and power factor. If unlisted, use NEMA Premium values: 90% efficiency and 0.85 PF are typical for motors 5–100 HP.' },
                  { n: '02', t: 'Convert HP to Real Power (kW)', b: 'One mechanical horsepower equals 0.7457 kW of output. Divide by motor efficiency to get the electrical input: kW = HP × 0.7457 ÷ η. This accounts for heat losses in the motor windings.' },
                  { n: '03', t: 'Apply Power Factor for kVA', b: 'kVA = kW ÷ Power Factor. The difference between kW and kVA is reactive power drawn by the motor\'s magnetic field — real work the transformer must supply but that does no mechanical work.' },
                  { n: '04', t: 'Size the Transformer', b: 'The calculated kVA is for steady-state running. For direct-on-line starts, multiply by 1.25–1.5 to handle inrush. For VFD-driven motors the drive limits inrush, so a tighter margin is acceptable.' },
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
                <div className="font-mono text-[.58rem] text-blue tracking-[.22em] uppercase mb-5">Conversion Formulas</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Real Power (kW)', formula: 'kW = HP × 0.7457 ÷ Motor Efficiency' },
                    { label: 'Apparent Power (kVA)', formula: 'kVA = kW ÷ Power Factor' },
                    { label: 'Combined', formula: 'kVA = (HP × 0.7457) ÷ (η × PF)' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">{row.label}</div>
                      <div className="font-mono text-[.88rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">{row.formula}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/[.08]">
                  <div className="font-mono text-[.6rem] text-white/40 tracking-[.12em] uppercase mb-3">Typical NEMA Premium Efficiency (Full Load)</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[['5 HP','89.5%','0.83'],['15 HP','91.7%','0.86'],['50 HP','93.6%','0.88'],['100 HP','95.0%','0.89'],['200 HP','95.4%','0.90'],['500 HP','96.2%','0.91']].map(([hp, eff, pf]) => (
                      <div key={hp} className="bg-white/[.05] rounded-[8px] px-3 py-2 text-center">
                        <div className="font-display font-bold text-white text-[.78rem]">{hp}</div>
                        <div className="font-mono text-[.62rem] text-white/50 mt-[.2rem]">η {eff} · PF {pf}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

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

            <div className="w-full lg:w-[420px] shrink-0 lg:sticky lg:top-[100px]">
              <div className="bg-white rounded-[20px] border border-[#E8ECF5] p-7 shadow-[0_4px_32px_rgba(5,9,31,.08)]">
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">HP → kVA Calculator</div>

                <div className="flex flex-col gap-4 mb-5">
                  <div>
                    <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">Horsepower (HP)</label>
                    <input type="number" min="0" value={hp} onChange={e => { setHp(e.target.value); setKva(''); setResult(null); setError('') }} placeholder="e.g. 50" className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none transition-[border-color] duration-200 focus:border-blue box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#E8ECF5]" />
                    <span className="font-mono text-[.65rem] text-gray/60 tracking-[.1em]">OR SOLVE FROM</span>
                    <div className="flex-1 h-px bg-[#E8ECF5]" />
                  </div>
                  <div>
                    <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">Known kVA</label>
                    <input type="number" min="0" value={kva} onChange={e => { setKva(e.target.value); setHp(''); setResult(null); setError('') }} placeholder="Leave blank if solving" className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none transition-[border-color] duration-200 focus:border-blue box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                  </div>
                  <div className="h-px bg-[#E8ECF5]" />
                  <div>
                    <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">Motor Efficiency (%)</label>
                    <input type="number" min="1" max="100" value={efficiency} onChange={e => { setEfficiency(e.target.value); setResult(null) }} placeholder="90" className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none transition-[border-color] duration-200 focus:border-blue box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                  </div>
                  <div>
                    <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">Power Factor (0.01 – 1.00)</label>
                    <input type="number" min="0.01" max="1" step="0.01" value={pf} onChange={e => { setPf(e.target.value); setResult(null) }} placeholder="0.85" className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none transition-[border-color] duration-200 focus:border-blue box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                  </div>
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
                        <div className="font-mono text-[.58rem] tracking-[.22em] text-white/40 uppercase mb-1">Real Power</div>
                        <div className="font-display font-black text-[1.8rem] text-white leading-none">{result.kw}</div>
                        <div className="font-mono text-[.75rem] text-blue/80 mt-[.3rem]">kW</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-[.58rem] tracking-[.22em] text-white/40 uppercase mb-1">Apparent Power</div>
                        <div className="font-display font-black text-[1.8rem] text-white leading-none">{result.kva}</div>
                        <div className="font-mono text-[.75rem] text-blue/80 mt-[.3rem]">kVA</div>
                      </div>
                    </div>
                    <div className="border-t border-white/[.1] pt-4 mt-2">
                      <div className="font-mono text-[.6rem] text-white/40 uppercase tracking-[.1em] mb-3">Full-Load Current (3-Phase)</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/[.06] rounded-[8px] p-3 text-center">
                          <div className="font-mono text-[.62rem] text-white/40 mb-1">@ 480 V</div>
                          <div className="font-display font-bold text-white text-[1.1rem]">{result.amps480} A</div>
                        </div>
                        <div className="bg-white/[.06] rounded-[8px] p-3 text-center">
                          <div className="font-mono text-[.62rem] text-white/40 mb-1">@ 208 V</div>
                          <div className="font-display font-bold text-white text-[1.1rem]">{result.amps208} A</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-[#E8ECF5]">
                  <div className="font-mono text-[.6rem] text-gray/60 tracking-[.12em] uppercase mb-3">Other Calculators</div>
                  <div className="flex flex-col gap-2">
                    {[
                      { href: '/resources/kva-calculator', label: 'kVA Calculator' },
                      { href: '/resources/kw-kva-calculator', label: 'kW to kVA Converter' },
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
            <h2 className="rv">Need a Transformer for Your Motor Load?</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">Our team can specify a transformer matched to your exact motor configuration — single motor, multi-motor bus, or VFD-driven loads.</p>
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
