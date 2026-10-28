import { readFile } from 'node:fs/promises'
import path from 'node:path'

// Word and Excel downloads are served from /downloads at the repo root, not /public: Hostinger's
// CDN serves public files itself and labels .docx/.xlsx as text/plain, which browsers save as
// unreadable files. PDFs stay in public/downloads, which takes priority over this route.
const ROOT = path.join(process.cwd(), 'downloads')
const TYPES: Record<string, string> = {
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

const notFound = () => new Response('Not found', { status: 404 })

export async function GET(_request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await context.params
  const file = path.resolve(ROOT, ...parts)
  const type = TYPES[path.extname(file).toLowerCase()]
  if (!type || !file.startsWith(ROOT + path.sep)) return notFound()
  try {
    const body = await readFile(file)
    return new Response(new Uint8Array(body), {
      headers: {
        'Content-Type': type,
        'Content-Disposition': `attachment; filename="${path.basename(file)}"`,
        'Content-Length': String(body.length),
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return notFound()
  }
}
