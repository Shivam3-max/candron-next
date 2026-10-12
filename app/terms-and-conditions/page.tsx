import Link from 'next/link'

export const metadata = {
  title: 'Terms & Conditions | CANDRON Energy Inc.',
  description: 'Information about obtaining the current CANDRON terms and conditions applicable to quotations, orders, and projects.',
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" style={{ background: 'linear-gradient(135deg,#05091F,#071342)' }} />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Terms &amp; Conditions</span></div>
          <div className="label label-white">Project Documents</div>
          <h1>Terms &amp;<br /><em>Conditions</em></h1>
          <p className="lead mt-4">Access the terms that apply to your specific quotation, order, service engagement, or project.</p>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(300px,.65fr)] max-lg:grid-cols-1 gap-10 items-start">
            <div className="bg-white border border-[#E3E8F2] rounded-[18px] p-10 max-md:p-6">
              <div className="label">Current Documents</div>
              <h2 className="mb-5">Terms Specific to Your Transaction</h2>
              <p className="body mb-5">The governing terms are the terms supplied with the applicable CANDRON quotation, order acknowledgement, purchase order acceptance, or executed agreement. Because requirements can differ by equipment, service, jurisdiction, and project, this page does not replace those documents.</p>
              <p className="body">For a current copy or help identifying the document that applies to your project, contact our team and include your quotation, purchase order, or project reference number when available.</p>
            </div>
            <aside className="bg-navy rounded-[18px] p-8 border border-blue/20">
              <div className="font-mono text-[.62rem] text-blue-l tracking-[.16em] uppercase mb-4">Request a Copy</div>
              <h3 className="text-white mb-3">Need the Applicable Terms?</h3>
              <p className="text-white/55 text-[.84rem] leading-[1.75] mb-6">Our team can locate the correct document for your quotation, order, or service engagement.</p>
              <Link href="/contact" className="btn btn-primary w-full justify-center">Contact Our Team</Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
