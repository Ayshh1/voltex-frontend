import { useEffect, useRef, useCallback } from 'react'

export const useAnimationLoop = (draw, dependencies = []) => {
  const animationRef = useRef()
  const canvasRef = useRef()
  const frameCountRef = useRef(0)

  const animate = useCallback(() => {
    if (canvasRef.current && draw) {
      draw(canvasRef.current, frameCountRef.current)
      frameCountRef.current++
    }
    animationRef.current = requestAnimationFrame(animate)
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, ...dependencies])

  return canvasRef
}
