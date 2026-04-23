import React, { useEffect, useRef } from 'react'

const CosmicCursor = () => {
  const cursorDot = useRef(null)
  const cursorOrb = useRef(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const orbX = useRef(0)
  const orbY = useRef(0)

  useEffect(() => {
    const dot = cursorDot.current
    const orb = cursorOrb.current

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      
      if (dot) {
        dot.style.left = `${mouseX.current - 4}px`
        dot.style.top = `${mouseY.current - 4}px`
      }
    }

    const animateOrb = () => {
      orbX.current += (mouseX.current - orbX.current) * 0.1
      orbY.current += (mouseY.current - orbY.current) * 0.1
      
      if (orb) {
        orb.style.left = `${orbX.current - 20}px`
        orb.style.top = `${orbY.current - 20}px`
      }
      
      requestAnimationFrame(animateOrb)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animateOrb()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorDot} className="cursor-dot" />
      <div ref={cursorOrb} className="cursor-orb" />
    </>
  )
}

export default CosmicCursor
