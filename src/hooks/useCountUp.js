import { useState, useEffect, useRef } from 'react'

export const useCountUp = (end, duration = 2000, isDecimal = false) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      if (isDecimal) {
        countRef.current = end * easedProgress
      } else {
        countRef.current = Math.floor(end * easedProgress)
      }

      setCount(countRef.current)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [end, duration, isDecimal])

  return count
}

export default useCountUp
