import Link from 'next/link'
import ProductsClient from './ProductsClient'

export const metadata = {
  title: 'Products',
  description: 'Factory-direct switchgear, switchboards & panelboards, and control panels — engineered, assembled, and tested in-house at our Toronto, Ontario facility.',
}

export default function ProductsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background: "url('/images/switchgear.jpg') center/cover" }}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Products</span></div>
          <div className="label label-white">Our Product Range</div>
          <h1>Power Distribution Solutions<br /><em>Built For Critical Infrastructure</em></h1>
          <p className="lead mt-4">Every product is engineered, manufactured, assembled, and tested in-house to ensure the highest standards of quality and performance.</p>
        </div>
      </div>

      <ProductsClient />

      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Ready to Get Started?</h2>
          <p className="lead rv !text-white/[.6] !max-w-[500px]">Work directly with our engineers to develop the right power distribution solution for your project. Every type of customer can reach our team — no middlemen, no barriers.</p>
          <div className="flex gap-4 justify-center flex-wrap rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
