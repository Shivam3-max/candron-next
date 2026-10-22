import type { Metadata } from 'next'
import Link from 'next/link'
import LineArt, { HeroArt } from '@/components/LineArt'
import RangeNav from '@/components/drytype/RangeNav'
import { DRY_GUIDE, DRY_HUB, bySlug, findProduct, productHref } from '@/lib/dry-type'
import { PHONE } from '@/lib/inventory'

export const metadata: Metadata = {
  title: 'Dry-Type Transformers Explained — A Plain-English Guide',
  description: 'A plain-English guide to dry-type transformers: how they work, dry vs oil-filled, VPI vs cast coil vs encapsulated, insulation class and temperature rise, K-factor, enclosure types, efficiency rules, taps and sizing.',
  alternates: { canonical: DRY_GUIDE },
}

const TOC: [string, string][] = [
  ['what-is', 'What is a dry-type transformer?'],
  ['dry-vs-liquid', 'Dry-type vs oil-filled'],
  ['construction', 'Four ways to build a coil'],
  ['temperature', 'Insulation class & temperature rise'],
  ['harmonics', 'K-factor & harmonics'],
  ['enclosures', 'Enclosure types'],
  ['efficiency', 'Efficiency rules'],
  ['sizing', 'Sizing in four steps'],
  ['taps', 'Taps, explained'],
  ['install', 'Installation checklist'],
  ['glossary', 'Glossary'],
]

const link = (slug: string, label?: string, family?: 'lv' | 'mv') => {
  const p = family ? findProduct(family, slug) : bySlug(slug)
  return p ? <Link href={productHref(p)}>{label ?? p.short}</Link> : label ?? slug
}

const GLOSSARY: [string, string][] = [
  ['AN / AF', 'Air Natural / Air Forced — cooled by natural air flow, or with fans helping.'],
  ['BIL', 'Basic Impulse Level: the size of lightning or switching surge the insulation can withstand.'],
  ['Delta (Δ)', 'A three-wire connection with no neutral point. Common on primaries.'],
  ['Wye (Y)', 'A connection with a centre point that becomes the neutral. Gives 208Y/120 V or 600Y/347 V.'],
  ['kVA', 'Kilovolt-amperes: the transformer’s size. Roughly, how much load it can carry.'],
  ['Impedance (%Z)', 'How much the transformer resists current. Affects voltage drop and fault current.'],
  ['K-factor', 'A number describing how much harmonic heating a transformer can handle.'],
  ['Primary / secondary', 'The input side and the output side.'],
  ['Separately derived system', 'A new electrical system with its own neutral and ground, created by a two-winding transformer.'],
  ['Temperature rise', 'How much hotter than the surrounding air the windings get at full load.'],
  ['Taps', 'Small adjustments on the primary that raise or lower the output voltage a few percent.'],
  ['VPI / VPE', 'Vacuum-Pressure Impregnation / Encapsulation — ways to seal coils with resin.'],
]

export default function DryTypeGuide() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="dt-encap" figure="FIG. 01 · 3D" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products/transformers">Transformers</Link> / <Link href={DRY_HUB}>Dry-Type</Link> / <span>Guide</span>
          </div>
          <div className="label label-white">Plain-English Guide · 10-minute read</div>
          <h1>Dry-Type Transformers,<br /><em>Explained</em></h1>
          <p className="lead mt-4">Everything you’ll meet on a drawing or spec sheet — insulation class, temperature rise, K-factor, VPI, enclosure types — explained without the jargon.</p>
          <div className="dt-hero-cta">
            <a href="#what-is" className="btn btn-primary">Start reading</a>
            <Link href={`${DRY_HUB}#finder`} className="btn btn-outline">Skip to the product finder</Link>
          </div>
        </div>
      </div>

      <div className="section bg-white">
        <div className="container dt-guide">
          <aside className="dt-toc" aria-label="On this page">
            <div className="dt-toc-inner">
              <strong>On this page</strong>
              <ol>{TOC.map(([id, t]) => <li key={id}><a href={`#${id}`}>{t}</a></li>)}</ol>
              <a href={PHONE.href} className="dt-toc-call">Questions? Call {PHONE.label}</a>
            </div>
          </aside>

          <article className="dt-article">
            <section id="what-is">
              <h2>What is a dry-type transformer?</h2>
              <p>A transformer changes one AC voltage into another using two (or more) coils of wire wound around a steel core. Power flows into the <b>primary</b> coil, creates a magnetic field in the core, and that field produces a new voltage in the <b>secondary</b> coil. The ratio of turns sets the ratio of voltages.</p>
              <p>All transformers lose a little energy as heat. Large outdoor units use oil to carry that heat away. A <b>dry-type</b> transformer uses air instead — and solid insulation such as resin, epoxy or a resin-and-sand compound to protect the coils. No oil means nothing to leak or burn, which is why dry-type transformers are the normal choice inside buildings.</p>
              <div className="dt-callout"><strong>In one line:</strong> a dry-type transformer is an air-cooled, oil-free transformer that’s safe to put inside a building, close to the equipment it feeds.</div>
            </section>

            <section id="dry-vs-liquid">
              <h2>Dry-type vs oil-filled</h2>
              <div className="dt-table-wrap">
                <table className="dt-table dt-table-plain dt-table-stack">
                  <thead><tr><th scope="col"></th><th scope="col">Dry-type</th><th scope="col">Oil-filled (liquid)</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">Cooling</th><td data-label="Dry-type">Air (natural or fans)</td><td data-label="Oil-filled">Mineral oil or natural ester fluid</td></tr>
                    <tr><th scope="row">Fire &amp; spill risk</th><td data-label="Dry-type">Very low — no liquid</td><td data-label="Oil-filled">Needs containment and clearances, sometimes a vault</td></tr>
                    <tr><th scope="row">Best location</th><td data-label="Dry-type">Indoors, close to the load</td><td data-label="Oil-filled">Outdoors on a pad or pole</td></tr>
                    <tr><th scope="row">Maintenance</th><td data-label="Dry-type">Inspect, vacuum, check connections</td><td data-label="Oil-filled">Plus oil sampling and gasket care</td></tr>
                    <tr><th scope="row">Size &amp; weight</th><td data-label="Dry-type">Larger for the same kVA</td><td data-label="Oil-filled">More compact at high ratings</td></tr>
                    <tr><th scope="row">Upfront cost</th><td data-label="Dry-type">Higher at large ratings</td><td data-label="Oil-filled">Lower at large ratings</td></tr>
                  </tbody>
                </table>
              </div>
              <p>Rule of thumb: if it goes <b>inside</b>, choose dry-type. If it sits <b>outside on a pad</b>, look at our <Link href="/products/transformers/padmount">padmount transformers</Link> too.</p>
            </section>

            <section id="construction">
              <h2>Four ways to build a coil</h2>
              <p>The difference between dry-type designs is mostly in how the coils are sealed against moisture and dirt.</p>
              <div className="dt-cons">
                <div><h3>Dip &amp; bake</h3><p>Coils are dipped in polyester resin and oven-baked. Economical and proven. Used across our low-voltage range.</p><span>{link('standard', 'General-purpose', 'lv')}</span></div>
                <div><h3>VPI / VPE</h3><p>Resin is forced into the coil under vacuum, then pressure, then baked. VPE adds extra coats. The standard for medium voltage.</p><span>{link('standard', 'VPI / VPE power', 'mv')}</span></div>
                <div><h3>Cast coil</h3><p>Each winding is cast in solid epoxy in a mould. Fully sealed — the toughest choice for damp, dusty or salty sites.</p><span>{link('cast-coil')}</span></div>
                <div><h3>Encapsulated</h3><p>The whole core and coil is potted in a resin-and-sand compound inside a sealed box. Ideal for small outdoor units.</p><span>{link('encapsulated')}</span></div>
              </div>
              <div className="dt-guide-art"><LineArt kind="dt-vpi" views={['process', 'iso']} tone="light" figure="FIG. 02" /></div>
            </section>

            <section id="temperature">
              <h2>Insulation class &amp; temperature rise</h2>
              <p>You’ll often see a line like <b>“220 °C insulation, 150 °C rise.”</b> Here’s what it means.</p>
              <ul className="dt-steps">
                <li><b>Insulation class (220 °C)</b> is the hottest temperature the insulation materials are rated to handle for a long life.</li>
                <li><b>Temperature rise (150 °C)</b> is how much hotter than the room the windings get at full load. On a 40 °C day: 40 + 150 = 190 °C, plus a hot-spot allowance, still inside the 220 °C limit.</li>
                <li><b>Lower rise options (115 °C or 80 °C)</b> use more copper or aluminum and steel. The transformer runs cooler, wastes less energy at heavy load, handles overloads better and lasts longer.</li>
              </ul>
              <div className="dt-callout"><strong>When to pay for a lower rise:</strong> when the transformer runs heavily loaded most of the day, sits in a warm room, or feeds critical loads.</div>
            </section>

            <section id="harmonics">
              <h2>K-factor &amp; harmonics</h2>
              <p>Computers, LED drivers, UPS systems, chargers and drives draw current in sharp pulses. Those pulses contain <b>harmonics</b> — extra currents at multiples of 60 Hz. Harmonics heat a transformer more than ordinary current, and some of them (the 3rd, 9th, 15th…) add up in the neutral.</p>
              <ul className="dt-steps">
                <li><b>Ordinary loads</b> (lighting, heaters, motors): a {link('standard', 'general-purpose', 'lv')} transformer is fine.</li>
                <li><b>Some electronics</b>: choose a {link('k-factor', 'K-4 or K-9 rated')} transformer.</li>
                <li><b>Mostly electronics</b> (data rooms, LED-heavy floors): K-13 / K-20, or a {link('harmonic-mitigating')} transformer that cancels harmonics instead of just tolerating them.</li>
                <li><b>Drives</b>: a {link('drive-isolation')} transformer or a {link('line-load-reactor', 'line reactor')}.</li>
              </ul>
              <div className="dt-guide-art"><LineArt kind="dt-kfactor" views={['neutral', 'wave']} tone="light" figure="FIG. 03" /></div>
              <p>Want numbers? Try the <Link href="/resources/harmonic-calculator">harmonic calculator</Link>.</p>
            </section>

            <section id="enclosures">
              <h2>Enclosure types</h2>
              <p>The enclosure “Type” tells you what the box keeps out.</p>
              <div className="dt-table-wrap">
                <table className="dt-table dt-table-plain dt-table-stack">
                  <thead><tr><th scope="col">Type</th><th scope="col">Where</th><th scope="col">Keeps out</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">Type 1</th><td data-label="Where">Indoors</td><td data-label="Keeps out">Fingers and falling dirt</td></tr>
                    <tr><th scope="row">Type 2</th><td data-label="Where">Indoors</td><td data-label="Keeps out">Dripping water</td></tr>
                    <tr><th scope="row">Type 3R</th><td data-label="Where">Outdoors</td><td data-label="Keeps out">Rain, snow and ice on the box</td></tr>
                    <tr><th scope="row">Type 4</th><td data-label="Where">In or out</td><td data-label="Keeps out">Hose-directed water, wind-blown dust</td></tr>
                    <tr><th scope="row">Type 4X</th><td data-label="Where">In or out</td><td data-label="Keeps out">Same as 4, plus corrosion (stainless)</td></tr>
                    <tr><th scope="row">Type 12</th><td data-label="Where">Indoors (industrial)</td><td data-label="Keeps out">Dust, lint, dripping oil and water</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="efficiency">
              <h2>Efficiency rules</h2>
              <p>In North America, low-voltage dry-type distribution transformers must meet minimum efficiency levels: <b>DOE 2016</b> (10 CFR Part 431) in the United States and the <b>NRCan 2019</b> Energy Efficiency Regulations in Canada. Medium-voltage dry-type units have their own DOE levels. Every CANDRON distribution and power transformer is designed to meet them.</p>
              <p>Efficiency matters because a transformer is on 24 hours a day. A small loss difference adds up over 25+ years. The <Link href="/resources/efficiency-calculator">efficiency calculator</Link> and <Link href="/resources/savings-payback-calculator">savings &amp; payback calculator</Link> show the effect on your bill.</p>
            </section>

            <section id="sizing">
              <h2>Sizing in four steps</h2>
              <ol className="dt-numbered">
                <li><b>List the loads</b> the transformer will feed — from panel schedules or nameplates.</li>
                <li><b>Add them up in kVA.</b> For three-phase: kVA = volts × amps × 1.732 ÷ 1,000. Our <Link href="/resources/kva-calculator">kVA calculator</Link> does it for you.</li>
                <li><b>Add room to grow</b> — typically 20 – 25% — and pick the next standard size up.</li>
                <li><b>Check the load type.</b> Electronics → K-factor. Drives → drive isolation. Outdoors → encapsulated or 3R.</li>
              </ol>
              <div className="dt-callout"><strong>Standard three-phase sizes:</strong> 15, 30, 45, 75, 112.5, 150, 225, 300, 500, 750 and 1,000 kVA. Medium-voltage units go much higher.</div>
            </section>

            <section id="taps">
              <h2>Taps, explained</h2>
              <p>The voltage arriving at a building is rarely exactly nominal. <b>Taps</b> are extra connection points on the primary winding that let an electrician raise or lower the output by about 2.5% per step — usually two steps up and two down. If the building’s supply runs a little low, move to a lower tap and the output comes back up to where it should be. Taps are changed with the transformer switched off.</p>
            </section>

            <section id="install">
              <h2>Installation checklist</h2>
              <ul className="dt-checks">
                <li>Keep the clearances on the nameplate and drawing — vents need free air.</li>
                <li>Make sure the room can get rid of the heat the transformer gives off.</li>
                <li>Mount on a level, solid surface; use the vibration pads supplied.</li>
                <li>Bond the enclosure and, for a separately derived system, the secondary neutral.</li>
                <li>Torque all connections to the values on the label.</li>
                <li>Before energising: remove shipping braces, check taps, test insulation.</li>
                <li>Keep vents clear of storage, and vacuum the coils once a year.</li>
              </ul>
              <p>Our <Link href="/commissioning">field team</Link> can install, test and commission any CANDRON transformer.</p>
            </section>

            <section id="glossary">
              <h2>Glossary</h2>
              <dl className="dt-glossary">
                {GLOSSARY.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
              </dl>
            </section>
          </article>
        </div>
      </div>

      <RangeNav />

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>Rather talk to an engineer?</h2>
            <p className="lead !text-white/[.6] !max-w-[540px]">Tell us what you’re powering. We’ll recommend the right dry-type transformer and quote it the same business day.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=Dry-Type%20Transformer" className="btn btn-primary btn-lg">Request a Quote</Link>
              <a href={PHONE.href} className="btn btn-outline btn-lg">Call {PHONE.label}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
