import React, { useRef, useEffect } from 'react'

const AllocationDonut = ({ data = [] }) => {
  const canvasRef = useRef()
  const animationRef = useRef()
  const progressRef = useRef(0)

  // Default allocation data
  const allocationData = data.length > 0 ? data : [
    { label: 'Bitcoin', value: 45, color: '#f7931a' },
    { label: 'Ethereum', value: 30, color: '#627eea' },
    { label: 'Solana', value: 15, color: '#00d4aa' },
    { label: 'Stocks', value: 10, color: '#7b2fff' }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const outerRadius = 80
    const innerRadius = 50

    // Set canvas size
    canvas.width = 200
    canvas.height = 200

    const drawDonut = (progress) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let currentAngle = -Math.PI / 2 // Start from top

      allocationData.forEach((segment, index) => {
        const segmentAngle = (segment.value / 100) * 2 * Math.PI * progress
        
        // Draw segment
        ctx.beginPath()
        ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + segmentAngle)
        ctx.arc(centerX, centerY, innerRadius, currentAngle + segmentAngle, currentAngle, true)
        ctx.closePath()
        
        ctx.fillStyle = segment.color
        ctx.fill()

        // Draw segment border
        ctx.strokeStyle = '#00000a'
        ctx.lineWidth = 2
        ctx.stroke()

        currentAngle += segmentAngle
      })

      // Draw center text
      ctx.fillStyle = '#e2e8ff'
      ctx.font = 'bold 12px Orbitron'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('ALLOCATION', centerX, centerY - 8)
      
      ctx.font = '10px Orbitron'
      ctx.fillStyle = 'rgba(226, 232, 255, 0.6)'
      ctx.fillText('/ 2024', centerX, centerY + 8)
    }

    const animate = () => {
      progressRef.current += 0.02
      if (progressRef.current > 1) progressRef.current = 1

      drawDonut(progressRef.current)

      if (progressRef.current < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [allocationData])

  return (
    <div className="glass-card p-6">
      <h3 className="font-orbitron text-xl font-bold text-star-white mb-6">
        Allocation Nebula
      </h3>
      
      <div className="flex flex-col items-center">
        <canvas 
          ref={canvasRef}
          className="mb-6"
        />
        
        <div className="grid grid-cols-2 gap-4 w-full">
          {allocationData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-star-white/80 font-syne text-sm">
                {item.label}
              </span>
              <span className="text-star-white font-orbitron text-sm ml-auto">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllocationDonut
