import { LINEART_META, type LineArtKind } from '@/lib/lineart-meta'
import LineArtStage, { type LineArtView } from '@/components/LineArtStage'

export type { LineArtKind }
type ViewKey = string

const VIEW_LABEL: Record<string, string> = { iso: 'Isometric', ga: 'Elevation', sld: 'Single-Line' }
const VIEW_SUFFIX: Record<string, string> = { iso: 'ISO', ga: 'GA', sld: 'SL' }

interface Props {
  kind: LineArtKind
  /** Order of the views; the first one draws first. Defaults to the kind's own views. */
  views?: ViewKey[]
  tone?: 'dark' | 'light'
  figure?: string
  title?: string
  className?: string
}

/**
 * Animated technical drawing for a product family, generated from the CANDRON brochure
 * drawing engine. The SVGs live in /public/lineart and load only when the sheet is on screen.
 */
export default function LineArt({ kind, views, tone = 'dark', figure = 'FIG. 01', title, className }: Props) {
  const meta = LINEART_META[kind]
  // Capability scenes name their own views; product kinds use iso / ga / sld.
  const custom = 'views' in meta ? meta.views : undefined
  const keys = views ?? custom?.map(v => v.key) ?? ['iso', 'ga', 'sld']
  const stageViews: LineArtView[] = keys.map((v, i) => ({
    key: v,
    label: custom?.find(c => c.key === v)?.label ?? VIEW_LABEL[v] ?? v,
    code: `${meta.code}-${VIEW_SUFFIX[v] ?? String(i + 1).padStart(2, '0')}`,
    src: `/lineart/${kind}-${v}.svg`,
  }))
  return (
    <LineArtStage
      title={title ?? meta.title}
      figure={figure}
      legend={keys.includes('iso') ? meta.legend : []}
      views={stageViews}
      tone={tone}
      className={className}
    />
  )
}

/** Hero slot: a drawing sheet that fills the empty right half of a page hero. */
export function HeroArt(props: Props) {
  return (
    <div className="la-hero-slot">
      <LineArt {...props} />
    </div>
  )
}
