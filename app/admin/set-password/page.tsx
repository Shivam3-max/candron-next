import type { Metadata } from 'next'
import { Suspense } from 'react'
import SetPassword from './SetPassword'

export const metadata: Metadata = { title: 'Set your admin password', robots: { index: false, follow: false } }

export default function SetPasswordPage() {
  return <div className="admin-dark"><Suspense><SetPassword /></Suspense></div>
}
