'use client'
import dynamic from 'next/dynamic'

// The planner works from today's date and the browser's saved project, so it renders client-side only.
const LeadTimePlanner = dynamic(() => import('@/components/resources/LeadTimePlanner'), {
  ssr: false,
  loading: () => <div className="rt-card rt-loading" aria-busy="true">Loading the planner…</div>,
})

export default function LeadTimePlannerLoader() {
  return <LeadTimePlanner />
}
