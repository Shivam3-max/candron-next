'use client'
import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')!

    function rsz() { cvs!.width = cvs!.parentElement!.offsetWidth; cvs!.height = cvs!.parentElement!.offsetHeight }
    rsz()
    window.addEventListener('resize', rsz, {passive:true})

    type P = { x:number; y:number; vx:number; vy:number; r:number; a:number; life:number; ml:number }
    function newP(): P {
      return { x:Math.random()*cvs!.width, y:Math.random()*cvs!.height,
        vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
        r:Math.random()*1.5+.3, a:Math.random()*.35+.05,
        life:0, ml:Math.random()*220+80 }
    }
    let ps: P[] = Array.from({length:60},newP)
    let raf: number

    function links() {
      for(let i=0;i<ps.length;i++) for(let j=i+1;j<ps.length;j++){
        const dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y,d=Math.sqrt(dx*dx+dy*dy)
        if(d<100){ ctx.beginPath(); ctx.moveTo(ps[i].x,ps[i].y); ctx.lineTo(ps[j].x,ps[j].y)
          ctx.strokeStyle=`rgba(0,71,255,${(1-d/100)*.06})`; ctx.lineWidth=.5; ctx.stroke() }
      }
    }

    function loop() {
      ctx.clearRect(0,0,cvs!.width,cvs!.height)
      ps = ps.map(p => {
        p.x+=p.vx; p.y+=p.vy; p.life++
        if(p.life>p.ml||p.x<0||p.x>cvs!.width||p.y<0||p.y>cvs!.height) return newP()
        const a = p.a*(1-p.life/p.ml)
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(0,71,255,${a})`; ctx.fill()
        return p
      })
      links()
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', rsz) }
  }, [])

  return <canvas ref={ref} id="hero-canvas" />
}
