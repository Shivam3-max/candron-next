import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import JsonLd from '@/components/JsonLd'
import PostCard from '@/components/blog/PostCard'
import { CATEGORIES, getAllPosts, postsIn } from '@/lib/blog'
import { SITE, breadcrumbLd, pageMeta } from '@/lib/seo'

const meta = pageMeta({
  title: 'Electrical Engineering Blog & Guides',
  description: 'Plain-English guides from CANDRON’s engineers: sizing transformers, choosing switchgear, oil and load bank testing, CSA standards and lead times for Canadian projects.',
  path: '/blog',
})

export const metadata = {
  ...meta,
  alternates: { ...meta.alternates, types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: 'CANDRON Engineering Blog' }] } },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const [first, ...rest] = posts
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Blog', href: '/blog' }]),
        { '@context': 'https://schema.org', '@type': 'Blog', name: 'CANDRON Engineering Blog', url: `${SITE}/blog`, publisher: { '@id': `${SITE}/#organization` }, blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: p.date })) },
      ]} />
      <section className="page-hero">
        <div className="page-hero-bg" style={{ background: "linear-gradient(90deg,rgba(5,9,31,.94),rgba(5,9,31,.74)),url('/images/switchgear-facility.jpg') center/cover" }} />
        <HeroArt kind="plant" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Blog</span></div>
          <div className="label label-white">CANDRON Engineering Blog</div>
          <h1>Plain-English Guides to<br /><em>Power Equipment</em></h1>
          <p className="lead mt-4">How to size, choose, test and plan transformers, switchgear and standby power equipment on Canadian projects — written by the engineers who answer these questions every day.</p>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container">
          <nav className="bp-cats" aria-label="Blog categories">
            <span className="is-on">All articles ({posts.length})</span>
            {CATEGORIES.filter(c => postsIn(c.slug).length).map(c => (
              <Link key={c.slug} href={`/blog/category/${c.slug}`}>{c.name} ({postsIn(c.slug).length})</Link>
            ))}
          </nav>
          {first && <div className="bp-featured"><PostCard p={first} featured /></div>}
          <div className="bp-grid">{rest.map(p => <PostCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>Have a question we haven’t answered?</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">Ask a CANDRON engineer. We provide Canadian-made transformers, switchgear and switchboards, and we’re happy to help with sizing and specifications.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=blog" className="btn btn-primary btn-lg">Ask an engineer</Link>
              <Link href="/resources" className="btn btn-outline btn-lg">Free tools & calculators →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
