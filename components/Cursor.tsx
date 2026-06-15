'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.querySelector('.cur') as HTMLElement
    const curR = document.querySelector('.cur-r') as HTMLElement
    if (!cur || !curR) return

    let mx=0,my=0,rx=0,ry=0
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cur.style.left = mx+'px'; cur.style.top = my+'px'
    }
    document.addEventListener('mousemove', move)

    const tick = () => {
      rx += (mx-rx)*.12; ry += (my-ry)*.12
      curR.style.left = rx+'px'; curR.style.top = ry+'px'
      requestAnimationFrame(tick)
    }
    tick()

    const hoverEls = document.querySelectorAll('a,button,input,select,textarea,.prod-card,.ind-card,.svc-item,.card,.why-card')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.width='5px'; cur.style.height='5px'
        curR.style.width='52px'; curR.style.height='52px'; curR.style.borderColor='rgba(0,71,255,.65)'
      })
      el.addEventListener('mouseleave', () => {
        cur.style.width='9px'; cur.style.height='9px'
        curR.style.width='36px'; curR.style.height='36px'; curR.style.borderColor='rgba(0,71,255,.4)'
      })
    })
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cur" />
      <div className="cur-r" />
    </>
  )
}
