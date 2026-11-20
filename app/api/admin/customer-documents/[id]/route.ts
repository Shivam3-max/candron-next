import { getCurrentAdmin } from '@/lib/admin-auth'
import { adminGetDocument } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'

/** Admin-only download of a customer's tax-exemption certificate. */
export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentAdmin())) return new Response('Unauthorized', { status: 401 })
  const doc = await adminGetDocument(Number((await ctx.params).id))
  if (!doc) return new Response('Not found', { status: 404 })
  return new Response(new Uint8Array(doc.data), {
    headers: {
      'Content-Type': doc.mime_type,
      'Content-Disposition': `attachment; filename="${doc.file_name.replace(/"/g, '')}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
