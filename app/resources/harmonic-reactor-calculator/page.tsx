'use client'
import { useState } from 'react'
import Link from 'next/link'

const SQRT3 = Math.sqrt(3)
const TWO_PI = 2 * Math.PI

// Approximate THD reduction % for a 6-pulse drive with reactor
function estimateThdReduction(zPct: number): string {
  if (zPct < 2) return '15–20'
  if (zPct < 3.5) return '30–38'
  if (zPct < 4.5) return '36–44'
  return '40–48'
}

export default function HarmonicReactorCalculatorPage() {
  const [phase, setPhase] = useState<'3' | '1'>('3')
  const [voltage, setVoltage] = useState('')
  const [kva, setKva] = useState('')
  const [hp, setHp] = useState('')
  const [freq, setFreq] = useState<'60' | '50'>('60')
  const [reactorZ, setReactorZ] = useState('3')
  const [result, setResult] = useState<{
    iRated: string; xReactor: string; lMh: string; thdReduction: string; voltDrop: string
  } | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function calculate() {
    setError(''); setResult(null)
    const V = parseFloat(voltage)
    const Z = parseFloat(reactorZ)
    const f = parseFloat(freq)
    const kvaVal = parseFloat(kva)
    const hpVal = parseFloat(hp)
    if (isNaN(V) || V <= 0) { setError('Enter a valid voltage.'); return }
    if (isNaN(Z) || Z <= 0 || Z > 20) { setError('Reactor impedance must be 0.1–20%.'); return }
    if (isNaN(kvaVal) && isNaN(hpVal)) { setError('Enter load in kVA or HP.'); return }

    // Determine kVA
    const loadKva = !isNaN(kvaVal) && kvaVal > 0 ? kvaVal
      : (hpVal * 0.7457) / (0.90 * 0.85) // typical motor defaults

    // Rated current
    const iRated = phase === '3'
      ? (loadKva * 1000) / (SQRT3 * V)
      : (loadKva * 1000) / V

    // Base impedance
    const zBase = (V * V) / (loadKva * 1000)

    // Reactor impedance in ohms
    const xReactor = (Z / 100) * zBase

    // Inductance in mH
    const lMh = (xReactor / (TWO_PI * f)) * 1000

    // Voltage drop across reactor at rated current (for display, useful for engineers)
    const voltDrop = xReactor * iRated

    setResult({
      iRated: iRated.toFixed(1),
      xReactor: xReactor.toFixed(4),
      lMh: lMh.toFixed(3),
      thdReduction: estimateThdReduction(Z),
      voltDrop: voltDrop.toFixed(1),
    })
  }

  function reset() { setVoltage(''); setKva(''); setHp(''); setResult(null); setError('') }

  const faqs = [
    { q: 'What is a harmonic reactor (line reactor)?', a: 'A harmonic reactor (also called a line reactor or AC line choke) is an inductor connected in series with a variable frequency drive (VFD), rectifier, or other non-linear load. It limits the rate of current change during rectifier switching, reducing peak current, lowering harmonic distortion (THD), and protecting against voltage spikes and transients from the supply.' },
    { q: 'What reactor impedance should I specify?', a: '3% reactance is the most common specification for VFD applications — it reduces THD from a typical 80–100% (no reactor) to approximately 35–45%, while causing only a small voltage drop. 5% reactors provide better harmonic reduction but a larger voltage drop. Values above 5% are used for very sensitive applications or where utility harmonic limits are strict.' },
    { q: 'Should I use an AC line reactor or a DC bus choke?', a: 'Both perform similar functions. An AC line reactor is installed on the AC input side of the drive — it is simpler to specify and protects against supply-side transients. A DC bus choke is internal to the drive and acts between the rectifier and capacitor bank — it is typically more effective per unit of inductance. Many modern VFDs include a DC choke; add an AC reactor in addition if the supply has significant harmonic distortion or voltage unbalance.' },
    { q: 'Can a reactor eliminate harmonics completely?', a: 'No — a passive line reactor reduces harmonics but does not eliminate them. A 3% reactor on a 6-pulse drive reduces THD from ~80% to ~35–45%. To achieve IEEE 519 limits (< 5% THD at the PCC), active harmonic filters or 12-pulse / 18-pulse rectifier topologies are required. Reactors are cost-effective first-step mitigation and should always be installed when using VFDs.' },
  ]

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F 0%,#060d35 60%,#040818 100%)' }}>
          <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0047FF 39px,#0047FF 40px)' }} />
        </div>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Harmonic Reactor Calculator</span>
          </div>
          <div className="label label-white">Power Quality Tool</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
            Harmonic Reactor
            <br /><em>Calculator</em>
          </h1>
          <p className="lead mt-4" style={{ maxWidth: '520px' }}>
            Size a line reactor (AC choke) for a VFD or non-linear load. Calculates rated current, reactor inductance in mH, and estimated THD reduction for 3% or 5% impedance reactors.
          </p>
        </div>
      </div>

      <div className="section bg-off" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">

            <div className="flex-1 min-w-0">
              <div className="label mb-4">How It Works</div>
              <h2 className="mb-6" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>Sizing a Line Reactor for a VFD</h2>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', t: 'Know Your Drive Rating', b: 'Enter the drive\'s input kVA rating (from the drive spec sheet) or the motor horsepower. The rated current is the basis for reactor sizing — the reactor must carry the drive\'s rated input current continuously without overheating or saturating.' },
                  { n: '02', t: 'Choose Reactor Impedance %', b: '3% is standard for most VFD installations and is the minimum recommended by IEEE 519. It provides a good balance between harmonic reduction and voltage drop. Use 5% where utility harmonic limits are strict or the system has high background THD.' },
                  { n: '03', t: 'Verify Inductance Value', b: 'The calculated inductance in mH is the value to specify on the reactor nameplate. At 60 Hz, a 3% reactor on a 100 kVA, 480 V load is approximately 0.44 mH. Reactor manufacturers rate their products in mH at a specific frequency and rated current.' },
                  { n: '04', t: 'Check Voltage Drop', b: 'The reactor causes a voltage drop at rated load. For a 3% reactor, the drop is 3% of line voltage (≈ 14.4 V on a 480 V system). Ensure the voltage reaching the drive input is within its specified input voltage tolerance, typically ±10%.' },
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
                    { label: 'Rated Current (3-Phase)', formula: 'I = (kVA × 1000) / (√3 × V_LL)' },
                    { label: 'Reactor Reactance (Ω)', formula: 'X_r = (Z% / 100) × V² / (kVA × 1000)' },
                    { label: 'Inductance (mH)', formula: 'L = X_r / (2π × f) × 1000' },
                    { label: 'Voltage Drop (V)', formula: 'ΔV = X_r × I_rated' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="font-mono text-[.65rem] text-white/45 tracking-[.1em] uppercase mb-2">{row.label}</div>
                      <div className="font-mono text-[.88rem] text-white bg-white/[.06] rounded-[8px] px-4 py-3">{row.formula}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/[.08]">
                  <div className="font-mono text-[.6rem] text-white/40 tracking-[.12em] uppercase mb-3">Typical THD Reduction (6-Pulse Drive)</div>
                  <div className="flex flex-col gap-2">
                    {[
                      ['No Reactor', '80 – 100%', 'Not recommended'],
                      ['3% Reactor', '~35 – 45%', 'Standard — recommended minimum'],
                      ['5% Reactor', '~30 – 38%', 'Better — for strict utility limits'],
                      ['Active Filter', '< 5%', 'IEEE 519 compliant at PCC'],
                    ].map(([setup, thd, note]) => (
                      <div key={setup} className="flex gap-2 items-start">
                        <span className="font-mono text-[.7rem] text-blue w-24 shrink-0">{setup}</span>
                        <span className="font-mono text-[.7rem] font-bold text-white w-20 shrink-0">{thd}</span>
                        <span className="font-mono text-[.68rem] text-white/50">{note}</span>
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
                <div className="font-mono text-[.6rem] text-blue tracking-[.22em] uppercase mb-5">Harmonic Reactor Calculator</div>

                <div className="flex bg-[#F4F6FA] rounded-[10px] p-1 mb-4 gap-1">
                  {(['3', '1'] as const).map(p => (
                    <button key={p} onClick={() => { setPhase(p); setResult(null) }} className={`flex-1 py-[.55rem] rounded-[8px] border-0 cursor-pointer font-mono text-[.7rem] font-bold tracking-[.06em] uppercase transition-all duration-200 ${phase === p ? 'bg-white text-navy shadow-[0_1px_6px_rgba(5,9,31,.12)]' : 'bg-transparent text-gray'}`}>
                      {p === '3' ? '3-Phase' : '1-Phase'}
                    </button>
                  ))}
                </div>

                <div className="flex bg-[#F4F6FA] rounded-[10px] p-1 mb-5 gap-1">
                  {(['60', '50'] as const).map(f => (
                    <button key={f} onClick={() => { setFreq(f); setResult(null) }} className={`flex-1 py-[.55rem] rounded-[8px] border-0 cursor-pointer font-mono text-[.7rem] font-bold tracking-[.06em] uppercase transition-all duration-200 ${freq === f ? 'bg-white text-navy shadow-[0_1px_6px_rgba(5,9,31,.12)]' : 'bg-transparent text-gray'}`}>
                      {f} Hz
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-4 mb-5">
                  <div>
                    <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">{phase === '3' ? 'Line-to-Line Voltage (V)' : 'Supply Voltage (V)'}</label>
                    <input type="number" min="0" value={voltage} onChange={e => { setVoltage(e.target.value); setResult(null); setError('') }} placeholder={phase === '3' ? 'e.g. 480' : 'e.g. 240'} className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                  </div>
                  <div>
                    <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">Drive / Load kVA</label>
                    <input type="number" min="0" value={kva} onChange={e => { setKva(e.target.value); setHp(''); setResult(null); setError('') }} placeholder="e.g. 75" className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#E8ECF5]" />
                    <span className="font-mono text-[.62rem] text-gray/50 tracking-[.08em]">OR</span>
                    <div className="flex-1 h-px bg-[#E8ECF5]" />
                  </div>
                  <div>
                    <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">Motor HP (uses 90% η, 0.85 PF)</label>
                    <input type="number" min="0" value={hp} onChange={e => { setHp(e.target.value); setKva(''); setResult(null); setError('') }} placeholder="e.g. 100" className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                  </div>

                  <div>
                    <label className="block font-mono text-[.65rem] font-bold tracking-[.12em] uppercase text-gray mb-[.45rem]">Reactor Impedance (%)</label>
                    <div className="flex gap-2 mb-2">
                      {['3', '5'].map(z => (
                        <button key={z} onClick={() => { setReactorZ(z); setResult(null) }} className={`flex-1 py-[.55rem] rounded-[8px] border font-mono text-[.7rem] font-bold cursor-pointer transition-all duration-200 ${reactorZ === z ? 'bg-blue text-white border-blue' : 'bg-[#F8FAFF] text-navy border-[#E8ECF5] hover:border-blue hover:text-blue'}`}>
                          {z}%
                        </button>
                      ))}
                    </div>
                    <input type="number" min="0.1" max="20" step="0.5" value={reactorZ} onChange={e => { setReactorZ(e.target.value); setResult(null) }} placeholder="Custom %" className="w-full px-4 py-[.85rem] border-[1.5px] border-[#E8ECF5] rounded-[10px] font-title text-[.95rem] font-semibold text-navy bg-white outline-none focus:border-blue transition-[border-color] duration-200 box-border placeholder:text-[#C8CDD9] placeholder:font-normal" />
                  </div>
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
                        <div className="font-mono text-[.52rem] tracking-[.18em] text-white/40 uppercase mb-1">Inductance</div>
                        <div className="font-display font-black text-[1.7rem] text-white leading-none">{result.lMh}</div>
                        <div className="font-mono text-[.72rem] text-blue/80 mt-[.3rem]">mH</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-[.52rem] tracking-[.18em] text-white/40 uppercase mb-1">Rated Current</div>
                        <div className="font-display font-black text-[1.7rem] text-white leading-none">{result.iRated}</div>
                        <div className="font-mono text-[.72rem] text-blue/80 mt-[.3rem]">A</div>
                      </div>
                    </div>
                    <div className="border-t border-white/[.1] pt-4 flex flex-col gap-2">
                      {[
                        { label: 'Reactor Reactance', val: result.xReactor + ' Ω' },
                        { label: 'Voltage Drop @ Full Load', val: result.voltDrop + ' V' },
                        { label: 'Est. THD Reduction (6-pulse)', val: result.thdReduction + '%' },
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
                      { href: '/resources/harmonic-calculator', label: 'Harmonic Calculator (THD + K-Factor)' },
                      { href: '/resources/inductance-calculator', label: 'Inductance Calculator' },
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
            <h2 className="rv">Need a Line Reactor or K-Rated Transformer?</h2>
            <p className="lead rv !text-white/[.6] !max-w-[480px]">We supply line reactors, K-rated transformers, and active harmonic filters for VFD and power quality applications. Same-day quotes on stocked units.</p>
            <div className="flex gap-4 justify-center flex-wrap rv">
              <Link href="/contact?product=reactor" className="btn btn-primary btn-lg mag">Request a Quote</Link>
              <Link href="/products/transformers" className="btn btn-outline btn-lg mag">View Transformers →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
