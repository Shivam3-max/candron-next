import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/seo'

export const metadata = { alternates: { canonical: '/warranty' },
  title: 'Warranty Support',
  description: 'Get warranty document guidance and support for CANDRON power distribution equipment.',
}

const details = ['Equipment nameplate or serial number', 'Purchase order or project reference', 'Site contact information', 'Description of the issue', 'Photos, drawings, or test information']

export default function WarrantyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Warranty', href: '/warranty' }])} />
      <section className="page-hero">
        <div className="page-hero-bg" style={{ background: "linear-gradient(90deg,rgba(5,9,31,.92),rgba(5,9,31,.72)),url('/images/testing.jpg') center/cover" }} />
        <HeroArt kind="padmount" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Warranty</span></div>
          <div className="label label-white">Equipment Support</div>
          <h1>Warranty<br /><em>Support</em></h1>
          <p className="lead mt-4">Connect directly with our team for warranty documentation, equipment identification, and next-step support.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-12 items-start">
            <div>
              <div className="label">Before You Contact Us</div>
              <h2 className="mb-5">Information That Helps Us Respond Faster</h2>
              <p className="body mb-7">Warranty coverage and procedures are governed by the documents supplied with the applicable quotation, order, or equipment. Providing the following information helps our team identify the equipment and review your request efficiently.</p>
              <ul className="list-none flex flex-col gap-3">
                {details.map(item => <li key={item} className="flex items-start gap-3 p-4 rounded-[10px] bg-off border border-[#E8ECF5] text-[1.0625rem] text-navy"><span className="text-blue font-bold">✓</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-navy rounded-[20px] p-10 max-md:p-7 border border-blue/20">
              <div className="font-mono text-[.875rem] text-blue-l tracking-[.16em] uppercase mb-4">Direct Assistance</div>
              <h3 className="text-white text-[1.76rem] mb-4">Start a Warranty Inquiry</h3>
              <p className="text-white/[.68] text-[1.0625rem] leading-[1.75] mb-7">Use the project inquiry form to describe the issue and upload available photos, drawings, test reports, or other supporting documents.</p>
              <Link href="/contact" className="btn btn-primary w-full justify-center mb-3">Contact Warranty Support</Link>
              <a href="tel:+16476162595" className="btn btn-outline w-full justify-center">+1 (647) 616-2595</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
