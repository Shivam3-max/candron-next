import Link from 'next/link'

export const metadata = { title: '404 — Page Not Found | Candron Energy Inc.' }

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,71,255,.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-[1] text-center max-w-[560px]">
        <div className="font-display text-[clamp(6rem,18vw,10rem)] font-black text-blue/[.15] leading-none mb-4 tracking-[-0.04em]">404</div>
        <div className="label label-white justify-center mb-5">Page Not Found</div>
        <h1 className="text-white text-[clamp(1.6rem,4vw,2.4rem)] mb-4">This page doesn&apos;t exist.</h1>
        <p className="text-white/50 text-[.95rem] leading-[1.8] max-w-[420px] mx-auto mb-10">
          The page you&apos;re looking for has moved or never existed. Head back home or contact our team directly.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
        <div className="mt-12 pt-8 border-t border-white/[.08] flex justify-center gap-10 flex-wrap">
          {[['Products','/products'],['Manufacturing','/manufacturing'],['Testing','/testing'],['About','/about']].map(([label,href])=>(
            <Link key={href} href={href} className="nf-nav-link">{label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
