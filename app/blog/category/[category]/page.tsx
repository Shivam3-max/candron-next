import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import PostCard from '@/components/blog/PostCard'
import { CATEGORIES, postsIn } from '@/lib/blog'
import { breadcrumbLd, pageMeta } from '@/lib/seo'

type Props = { params: Promise<{ category: string }> }

export const dynamicParams = false
export const generateStaticParams = () => CATEGORIES.filter(c => postsIn(c.slug).length).map(c => ({ category: c.slug }))

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  const c = CATEGORIES.find(x => x.slug === category)
  return c ? pageMeta({ title: `${c.name} Articles`, description: `${c.blurb} Practical guides from CANDRON’s engineers for Canadian electrical projects.`, path: `/blog/category/${c.slug}` }) : {}
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const c = CATEGORIES.find(x => x.slug === category)
  if (!c) notFound()
  const posts = postsIn(c.slug)
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Blog', href: '/blog' }, { name: c.name, href: `/blog/category/${c.slug}` }])} />
      <section className="page-hero bp-cat-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>{c.name}</span></div>
          <div className="label label-white">Blog category</div>
          <h1>{c.name}</h1>
          <p className="lead mt-4">{c.blurb}</p>
        </div>
      </section>
      <section className="section bg-off">
        <div className="container">
          <nav className="bp-cats" aria-label="Blog categories">
            <Link href="/blog">All articles</Link>
            {CATEGORIES.filter(x => postsIn(x.slug).length).map(x => x.slug === c.slug
              ? <span key={x.slug} className="is-on">{x.name} ({posts.length})</span>
              : <Link key={x.slug} href={`/blog/category/${x.slug}`}>{x.name} ({postsIn(x.slug).length})</Link>)}
          </nav>
          <div className="bp-grid">{posts.map(p => <PostCard key={p.slug} p={p} />)}</div>
        </div>
      </section>
    </>
  )
}
