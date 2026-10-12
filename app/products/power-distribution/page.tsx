import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Critical Power Distribution Equipment',
  description: 'Load banks, remote power panels, and power distribution units engineered for generators, UPS systems, data centres, and other critical facilities.',
}

const products = [
  {
    name: 'Load Banks',
    eyebrow: 'Resistive, Reactive & Combined',
    description: 'Portable and permanently installed systems for generator, UPS, battery, and commissioning load tests.',
    image: '/images/products/power-distribution/load-bank.webp',
    href: '/products/load-banks',
    specs: ['1 kW to 30 MW', 'Up to 15 kV', 'Manual or automated control'],
  },
  {
    name: 'Remote Power Panels',
    eyebrow: 'Data Centre Branch Distribution',
    description: 'Compact, monitored branch-circuit distribution placed close to racks and other critical loads.',
    image: '/images/products/power-distribution/remote-power-panel.webp',
    href: '/products/remote-power-panels',
    specs: ['Up to 600 V', 'Up to 225 kVA', 'Per-circuit monitoring'],
  },
  {
    name: 'Power Distribution Units',
    eyebrow: 'Critical Power Distribution',
    description: 'Transformer-based floor-standing PDUs for safe voltage transformation, isolation, monitoring, and branch distribution.',
    image: '/images/products/power-distribution/power-distribution-unit.webp',
    href: '/products/power-distribution-units',
    specs: ['15 to 500 kVA', 'Up to 600 V input', 'Integrated monitoring'],
  },
]

export default function PowerDistributionPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background: "url('/images/products/power-distribution/power-distribution-unit.webp') center/cover" }} />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span>Critical Power Distribution</span></div>
          <div className="label label-white">Critical Power Equipment</div>
          <h1>Power Distribution<br /><em>Where Reliability Matters</em></h1>
          <p className="lead mt-4">Purpose-built load testing and downstream distribution equipment for data centres, healthcare, industrial plants, and resilient infrastructure.</p>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container">
          <div className="label rv">Product Range</div>
          <h2 className="rv mb-4">Choose Your Equipment</h2>
          <p className="body rv mb-10 max-w-[720px]">Each system is engineered around your one-line diagram, load profile, available space, monitoring requirements, and applicable electrical standards.</p>
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
            {products.map((product) => (
              <Link key={product.href} href={product.href} className="group no-underline rounded-[14px] overflow-hidden border border-[#E8ECF5] bg-white shadow-[0_3px_16px_rgba(5,9,31,.06)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-blue hover:shadow-[0_10px_30px_rgba(0,71,255,.12)]">
                <div className="relative h-[240px]">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw" />
                </div>
                <div className="p-6">
                  <div className="font-mono text-[.58rem] text-blue tracking-[.16em] uppercase font-bold mb-2">{product.eyebrow}</div>
                  <h3 className="mb-3">{product.name}</h3>
                  <p className="body mb-5">{product.description}</p>
                  <ul className="check-list mb-5">
                    {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
                  </ul>
                  <span className="font-mono text-[.68rem] font-bold text-blue tracking-[.08em] uppercase">View product details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Need a Custom Configuration?</h2>
          <p className="lead rv !text-white/[.6] !max-w-[620px]">Send us your one-line diagram, load schedule, or performance requirements. Our engineers will help define the right equipment and options.</p>
          <Link href="/contact?product=Critical%20Power%20Distribution" className="btn btn-primary btn-lg mag">Request a Quote</Link>
        </div></div>
      </div>
    </>
  )
}
