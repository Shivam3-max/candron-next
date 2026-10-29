import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import PostCard from '@/components/blog/PostCard'
import { categoryOf, formatDate, getAllPosts, getPost, relatedPosts } from '@/lib/blog'
import { articleLd, breadcrumbLd, faqLd, pageMeta } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => getAllPosts().map(p => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props) {
  const p = getPost((await params).slug)
  if (!p) return {}
  const meta = pageMeta({ title: p.seoTitle, description: p.description, path: `/blog/${p.slug}`, image: p.image })
  return {
    ...meta,
    keywords: p.keywords,
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: p.date, modifiedTime: p.updated ?? p.date, section: categoryOf(p.category).name },
  }
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug)
  if (!p) notFound()
  const cat = categoryOf(p.category)
  const path = `/blog/${p.slug}`
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Blog', href: '/blog' }, { name: cat.name, href: `/blog/category/${cat.slug}` }, { name: p.title, href: path }]),
        articleLd({ title: p.title, description: p.description, path, published: p.date, updated: p.updated, image: p.image, keywords: p.keywords }),
        ...(p.faqs.length ? [faqLd(p.faqs)] : []),
      ]} />
      <section className="page-hero bp-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <Link href={`/blog/category/${cat.slug}`}>{cat.name}</Link></div>
          <div className="label label-white">{cat.name}</div>
          <h1>{p.title}</h1>
          <p className="lead mt-4">{p.description}</p>
          <p className="bp-byline">By the CANDRON Engineering Team · {formatDate(p.date)}{p.updated ? ` · Updated ${formatDate(p.updated)}` : ''} · {p.minutes} min read</p>
        </div>
      </section>

      <section className="section bg-white bp-body-section">
        <div className="container bp-layout">
          <aside className="bp-aside">
            {p.headings.length > 2 && (
              <nav className="bp-toc" aria-label="On this page">
                <div className="rt-eyebrow">On this page</div>
                <ol>{p.headings.map(h => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
              </nav>
            )}
            {p.related.length > 0 && (
              <div className="bp-aside-links">
                <div className="rt-eyebrow">Related</div>
                <ul>{p.related.map(r => <li key={r.href}><Link href={r.href}>{r.label} →</Link></li>)}</ul>
              </div>
            )}
          </aside>
          <article className="bp-article">
            <div className="bp-prose" dangerouslySetInnerHTML={{ __html: p.html }} />
            <div className="bp-cta">
              <div>
                <strong>Need help with your project?</strong>
                <p>CANDRON provides Canadian-made transformers, switchgear and switchboards, with engineers who answer the same business day.</p>
              </div>
              <div className="bp-cta-btns">
                {p.cta && <Link href={p.cta.href} className="btn btn-primary">{p.cta.label}</Link>}
                <Link href={`/contact?product=blog-${p.slug}`} className="btn btn-outline-blue">Ask an engineer</Link>
              </div>
            </div>
            <p className="bp-disclaimer">General guidance only. Always follow the Canadian Electrical Code, the applicable CSA standards, the manufacturer’s instructions and the authority having jurisdiction.</p>
          </article>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container">
          <div className="label">Read Next</div>
          <h2 className="mb-6">More from the blog</h2>
          <div className="bp-grid">{relatedPosts(p).map(r => <PostCard key={r.slug} p={r} />)}</div>
        </div>
      </section>
    </>
  )
}
