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
    const count = Math.floor(40 * densityMultiplier)
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 2,
      speedY: -(0.1 + Math.random() * 0.3),
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: (0.05 + Math.random() * 0.05) * opacityMultiplier,
      pulseSpeed: 0.005 + Math.random() * 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      particlesRef.current.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX

        // Wrap around
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        const pulse = Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.5 + 0.5
        const alpha = p.opacity * (0.6 + pulse * 0.4)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(181, 90, 199, ${alpha})`
        ctx.fill()
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
