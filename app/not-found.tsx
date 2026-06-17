import Link from 'next/link'

export const metadata = { title: '404 — Page Not Found | Candron Energy Inc.' }

export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',background:'var(--navy)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'600px',height:'600px',background:'radial-gradient(circle,rgba(0,71,255,.12) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:'560px'}}>
        <div style={{fontFamily:'var(--fd)',fontSize:'clamp(6rem,18vw,10rem)',fontWeight:900,color:'rgba(0,71,255,.15)',lineHeight:1,marginBottom:'1rem',letterSpacing:'-.04em'}}>404</div>
        <div className="label label-white" style={{justifyContent:'center',marginBottom:'1.25rem'}}>Page Not Found</div>
        <h1 style={{color:'var(--white)',fontSize:'clamp(1.6rem,4vw,2.4rem)',marginBottom:'1rem'}}>This page doesn't exist.</h1>
        <p style={{color:'rgba(255,255,255,.5)',fontSize:'.95rem',lineHeight:'1.8',marginBottom:'2.5rem',maxWidth:'420px',margin:'0 auto 2.5rem'}}>
          The page you're looking for has moved or never existed. Head back home or contact our team directly.
        </p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
        <div style={{marginTop:'3rem',paddingTop:'2rem',borderTop:'1px solid rgba(255,255,255,.08)',display:'flex',justifyContent:'center',gap:'2.5rem',flexWrap:'wrap'}}>
          {[['Products','/products'],['Manufacturing','/manufacturing'],['Testing','/testing'],['About','/about']].map(([label,href])=>(
            <Link key={href} href={href} className="nf-nav-link">{label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
