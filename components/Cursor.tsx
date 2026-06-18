'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.querySelector('.cur') as HTMLElement
    const curR = document.querySelector('.cur-r') as HTMLElement
    if (!cur || !curR) return

    let mx=0,my=0,rx=0,ry=0,rafId=0
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cur.style.left = mx+'px'; cur.style.top = my+'px'
    }
    document.addEventListener('mousemove', move)

    const tick = () => {
      rx += (mx-rx)*.12; ry += (my-ry)*.12
      curR.style.left = rx+'px'; curR.style.top = ry+'px'
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const hoverEls = document.querySelectorAll('a,button,input,select,textarea,.prod-card,.ind-card,.svc-item,.card,.why-card')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.width='4px'; cur.style.height='4px'
        curR.style.width='48px'; curR.style.height='48px'; curR.style.borderColor='rgba(0,71,255,.75)'
      })
      el.addEventListener('mouseleave', () => {
        cur.style.width='7px'; cur.style.height='7px'
        curR.style.width='36px'; curR.style.height='36px'; curR.style.borderColor='rgba(0,71,255,.55)'
      })
    })
    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cur" />
      <div className="cur-r" />
    </>
  )
}
