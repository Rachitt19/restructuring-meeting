import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 })
  const rafRef = useRef(null)
  const targetRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const lerp = 0.08
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp
      setPosition({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: position.x - 300,
          top: position.y - 300,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(181,90,199,0.04) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
