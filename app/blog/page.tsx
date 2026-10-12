import Link from 'next/link'

export const metadata = {
  title: 'Insights & Updates | CANDRON Energy Inc.',
  description: 'Technical guidance, industry insights, inventory updates, and company news from CANDRON Energy Inc.',
}

const topics = [
  { number: '01', title: 'Technical Guidance', text: 'Practical information for specifying and applying power distribution equipment.' },
  { number: '02', title: 'Industry Insights', text: 'Developments affecting electrical infrastructure, project teams, and equipment decisions.' },
  { number: '03', title: 'Inventory Updates', text: 'Product availability and equipment updates for time-sensitive project requirements.' },
  { number: '04', title: 'Company News', text: 'Updates from our engineering, manufacturing, testing, and field service teams.' },
]

export default function BlogPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" style={{ background: "linear-gradient(90deg,rgba(5,9,31,.94),rgba(5,9,31,.74)),url('/images/switchgear-facility.jpg') center/cover" }} />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Blogs</span></div>
          <div className="label label-white">CANDRON Insights</div>
          <h1>Technical Insight.<br /><em>Project Perspective.</em></h1>
          <p className="lead mt-4">Technical guidance, industry insights, inventory updates, and company news for the teams building critical power infrastructure.</p>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container">
          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
            {topics.map(topic => (
              <article key={topic.number} className="bg-white rounded-[16px] border border-[#E3E8F2] p-6">
                <div className="font-mono text-blue text-[.65rem] tracking-[.14em] font-bold mb-5">{topic.number}</div>
                <h2 className="font-title text-[1.05rem] mb-3">{topic.title}</h2>
                <p className="body !text-[.8rem] !leading-[1.7]">{topic.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 bg-navy rounded-[20px] p-10 max-md:p-7 text-center border border-blue/20">
            <div className="label label-white justify-center">Articles Coming Soon</div>
            <h2 className="text-white mb-4">Stay Connected With CANDRON</h2>
            <p className="text-white/55 text-[.86rem] leading-[1.75] max-w-[620px] mx-auto mb-7">Subscribe through the footer to receive inventory availability updates, industry insights, and company news as new articles are published.</p>
            <Link href="/resources" className="btn btn-outline">Explore Engineering Calculators</Link>
          </div>
        </div>
      </section>
    </>
  )
}
