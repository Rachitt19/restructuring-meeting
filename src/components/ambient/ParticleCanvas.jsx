import { useEffect, useRef } from 'react'

export default function ParticleCanvas({ densityMultiplier = 1, opacityMultiplier = 1 }) {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const count = Math.floor(60 * densityMultiplier)
    const mathSymbols = ['∑', '∫', '∆', '∏', 'µ', 'α', 'β', 'γ', '∞', '∇', '∂']
    
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 2,
      speedY: -(0.05 + Math.random() * 0.2), // slower movement
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: (0.05 + Math.random() * 0.08) * opacityMultiplier,
      pulseSpeed: 0.002 + Math.random() * 0.008,
      pulseOffset: Math.random() * Math.PI * 2,
      isSymbol: Math.random() > 0.85, // 15% chance to be a symbol
      symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
      symbolSize: 8 + Math.random() * 6
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      particlesRef.current.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX

        // Wrap around
        if (p.y < -20) {
          p.y = canvas.height + 20
          p.x = Math.random() * canvas.width
        }
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20

        const pulse = Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.5 + 0.5
        const alpha = p.opacity * (0.6 + pulse * 0.4)

        if (p.isSymbol) {
          ctx.font = `${p.symbolSize}px 'Space Grotesk'`
          ctx.fillStyle = `rgba(181, 90, 199, ${alpha * 0.8})` // slightly dimmer symbols
          ctx.fillText(p.symbol, p.x, p.y)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(181, 90, 199, ${alpha})`
          ctx.fill()
        }
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [densityMultiplier, opacityMultiplier])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
