import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Harmonic Reactor Calculator',
  description: 'Size a line reactor for a VFD or non-linear load: rated current, inductance in mH, and estimated THD reduction.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
