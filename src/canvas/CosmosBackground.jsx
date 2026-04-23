import React from 'react'
import { useAnimationLoop } from './useAnimationLoop'

const CosmosBackground = () => {
  const canvasRef = useAnimationLoop((canvas, frameCount) => {
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = '#00000a'
    ctx.fillRect(0, 0, width, height)

    // Draw stars
    drawStars(ctx, width, height, frameCount)
    
    // Draw nebula clouds
    drawNebulae(ctx, width, height, frameCount)
    
    // Draw orbital rings
    drawOrbitalRings(ctx, width, height, frameCount)
    
    // Draw shooting stars
    drawShootingStars(ctx, width, height, frameCount)
    
    // Draw gravity field at mouse position
    drawGravityField(ctx, width, height, frameCount)
  })

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

// Star system
const stars = []
const initStars = (width, height) => {
  if (stars.length === 0) {
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      })
    }
  }
}

const drawStars = (ctx, width, height, frameCount) => {
  initStars(width, height)
  
  stars.forEach(star => {
    const twinkle = Math.sin(frameCount * star.twinkleSpeed + star.twinklePhase)
    const opacity = 0.3 + twinkle * 0.7
    
    ctx.fillStyle = `rgba(226, 232, 255, ${opacity})`
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fill()
  })
}

// Nebula clouds
const nebulae = [
  { x: 0.2, y: 0.3, color: '123, 47, 255', scale: 1.2 },
  { x: 0.7, y: 0.2, color: '0, 201, 255', scale: 1.0 },
  { x: 0.8, y: 0.7, color: '255, 107, 157', scale: 0.8 },
  { x: 0.3, y: 0.8, color: '123, 47, 255', scale: 1.5 }
]

const drawNebulae = (ctx, width, height, frameCount) => {
  nebulae.forEach(nebula => {
    const pulse = Math.sin(frameCount * 0.005) * 0.1 + 1
    const x = nebula.x * width
    const y = nebula.y * height
    const radius = 200 * nebula.scale * pulse
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, `rgba(${nebula.color}, 0.3)`)
    gradient.addColorStop(0.5, `rgba(${nebula.color}, 0.1)`)
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  })
}

// Orbital rings
const orbitalRings = [
  { centerX: 0.5, centerY: 0.5, radiusX: 150, radiusY: 100, rotation: 0, speed: 0.01 },
  { centerX: 0.5, centerY: 0.5, radiusX: 250, radiusY: 180, rotation: Math.PI / 3, speed: 0.008 },
  { centerX: 0.5, centerY: 0.5, radiusX: 350, radiusY: 250, rotation: Math.PI / 6, speed: 0.005 }
]

const drawOrbitalRings = (ctx, width, height, frameCount) => {
  orbitalRings.forEach((ring, ringIndex) => {
    const centerX = ring.centerX * width
    const centerY = ring.centerY * height
    const rotation = ring.rotation + frameCount * ring.speed
    
    // Draw ring path
    ctx.strokeStyle = 'rgba(123, 47, 255, 0.2)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, ring.radiusX, ring.radiusY, rotation, 0, Math.PI * 2)
    ctx.stroke()
    
    // Draw particles on ring
    const particleCount = 8
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + frameCount * 0.02 * (ringIndex + 1)
      const x = centerX + Math.cos(angle) * ring.radiusX * Math.cos(rotation) - Math.sin(angle) * ring.radiusY * Math.sin(rotation)
      const y = centerY + Math.cos(angle) * ring.radiusX * Math.sin(rotation) + Math.sin(angle) * ring.radiusY * Math.cos(rotation)
      
      // Particle glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
      glowGradient.addColorStop(0, 'rgba(0, 201, 255, 0.8)')
      glowGradient.addColorStop(0.5, 'rgba(0, 201, 255, 0.3)')
      glowGradient.addColorStop(1, 'rgba(0, 201, 255, 0)')
      
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()
      
      // Particle core
      ctx.fillStyle = '#e2e8ff'
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  })
}

// Shooting stars
const shootingStars = []

const drawShootingStars = (ctx, width, height, frameCount) => {
  // Add new shooting star every ~3 seconds (180 frames at 60fps)
  if (frameCount % 180 === 0) {
    shootingStars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      vx: (Math.random() - 0.5) * 15,
      vy: Math.random() * 5 + 2,
      life: 60,
      maxLife: 60
    })
  }
  
  // Update and draw shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const star = shootingStars[i]
    star.x += star.vx
    star.y += star.vy
    star.life--
    
    if (star.life <= 0) {
      shootingStars.splice(i, 1)
      continue
    }
    
    const opacity = star.life / star.maxLife
    
    // Trail
    const gradient = ctx.createLinearGradient(
      star.x - star.vx * 10, star.y - star.vy * 10,
      star.x, star.y
    )
    gradient.addColorStop(0, 'rgba(226, 232, 255, 0)')
    gradient.addColorStop(1, `rgba(226, 232, 255, ${opacity})`)
    
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(star.x - star.vx * 10, star.y - star.vy * 10)
    ctx.lineTo(star.x, star.y)
    ctx.stroke()
  }
}

// Mouse gravity field
let mouseX = 0
let mouseY = 0

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })
}

const drawGravityField = (ctx, width, height, frameCount) => {
  const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100)
  gradient.addColorStop(0, 'rgba(0, 201, 255, 0.3)')
  gradient.addColorStop(0.5, 'rgba(0, 201, 255, 0.1)')
  gradient.addColorStop(1, 'rgba(0, 201, 255, 0)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(mouseX - 100, mouseY - 100, 200, 200)
}

export default CosmosBackground
