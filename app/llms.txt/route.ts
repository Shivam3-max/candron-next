import { getAllPosts } from '@/lib/blog'
import { DRY } from '@/lib/dry-type'
import { DIST } from '@/lib/ranges/dist'
import { LIQUID } from '@/lib/ranges/liquid'
import { LOADBANKS } from '@/lib/ranges/loadbanks'
import { SITE } from '@/lib/seo'

export const dynamic = 'force-static'

/** llms.txt: a plain-text map of the site for AI assistants and answer engines. */
export function GET() {
  const ranges = [LIQUID, DRY, DIST, LOADBANKS].map(r => `- [${r.name}](${SITE}${r.hubHref}): ${r.hub.meta.description}`).join('\n')
  const posts = getAllPosts().map(p => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.description}`).join('\n')
  const body = `# CANDRON Energy Inc.

> Toronto-based providers of Canadian-made electrical equipment: transformers (dry-type and liquid-filled), switchboards, low- and medium-voltage switchgear, e-houses, PDUs and load banks, with engineering, testing and commissioning support across Canada.

CANDRON is a provider, not a manufacturer: it engineers each order, sources equipment from Canadian manufacturers, witnesses factory tests and delivers. Contact: sales@candron.com, +1 (647) 616-2595.

## Products
${ranges}
- [Control panels](${SITE}/products/control-panels): UL 508A control panels, MCCs, automation and SCADA panels.
- [In-stock inventory](${SITE}/inventory): new, surplus and remanufactured equipment ready to ship.

## Free tools
- [Transformer kVA calculator](${SITE}/resources/kva-calculator)
- [Fault current calculator](${SITE}/resources/fault-current-calculator)
- [Long-lead equipment planner](${SITE}/resources/lead-time-planner)
- [Lead-Time Index](${SITE}/resources/lead-time-index)
- [CSA C282 generator test planner](${SITE}/resources/generator-test-planner)
- [Free oil-test (DGA) read-out](${SITE}/resources/oil-test-readout)
- [Division 26 guide specifications](${SITE}/resources/division-26-specs)
- [All resources](${SITE}/resources)

## Guides
${posts}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
