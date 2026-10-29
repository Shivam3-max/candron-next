import Link from 'next/link'
import PostCard from '@/components/blog/PostCard'
import { getAllPosts, postsForPath } from '@/lib/blog'

/** "From the blog" strip: articles that link to this page, or the newest ones when none do. */
export default function RelatedArticles({ path, title = 'From the blog', fallback = false }: { path?: string; title?: string; fallback?: boolean }) {
  const posts = path ? postsForPath(path) : []
  const list = posts.length ? posts : fallback ? getAllPosts().slice(0, 3) : []
  if (!list.length) return null
  return (
    <section className="section bg-white bp-related">
      <div className="container">
        <div className="bp-related-head">
          <div>
            <div className="label">Guides & Articles</div>
            <h2>{title}</h2>
          </div>
          <Link href="/blog" className="btn btn-outline-blue">All articles →</Link>
        </div>
        <div className="bp-grid">{list.map(p => <PostCard key={p.slug} p={p} />)}</div>
      </div>
    </section>
  )
}
