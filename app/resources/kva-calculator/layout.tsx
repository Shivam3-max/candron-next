import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Transformer kVA Calculator',
  description: 'Calculate transformer size from load voltage and current, or solve for any of the three values, for single-phase and three-phase systems.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
