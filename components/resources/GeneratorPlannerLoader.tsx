'use client'
import dynamic from 'next/dynamic'

// The planner works from today's date and the browser's saved generator, so it renders client-side only.
const GeneratorPlanner = dynamic(() => import('@/components/resources/GeneratorPlanner'), {
  ssr: false,
  loading: () => <div className="rt-card rt-loading" aria-busy="true">Loading the planner…</div>,
})

export default function GeneratorPlannerLoader() {
  return <GeneratorPlanner />
}
