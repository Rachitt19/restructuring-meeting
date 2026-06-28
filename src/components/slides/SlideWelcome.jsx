import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const appleEase = [0.16, 1, 0.3, 1]

// Pentagon node positions (centered at 50%, 50% of a 400x400 viewBox)
const nodes = [
  { cx: 200, cy: 60 },   // top
  { cx: 330, cy: 150 },  // top-right
  { cx: 290, cy: 310 },  // bottom-right
  { cx: 110, cy: 310 },  // bottom-left
  { cx: 70, cy: 150 },   // top-left
]
const center = { cx: 200, cy: 200 }

export default function SlideWelcome({ isActive }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const svgRef = useRef(null)

  useEffect(() => {
    if (!isActive) return
    const handleMove = (e) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 400,
          y: ((e.clientY - rect.top) / rect.height) * 400,
        })
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="slide">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 0 }}
      >
        <motion.div
          className="rounded-full"
          style={{
            width: 800,
            height: 800,
            background: 'radial-gradient(circle, rgba(181,90,199,0.03) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 3.5, ease: appleEase }}
        />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Animated SVG Logo */}
        <motion.svg
          ref={svgRef}
          width="200"
          height="200"
          viewBox="0 0 400 400"
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        >
          {/* Connection lines from outer nodes to center */}
          {nodes.map((node, i) => {
            const lineLength = Math.sqrt(
              (center.cx - node.cx) ** 2 + (center.cy - node.cy) ** 2
            )
            return (
              <motion.line
                key={`line-${i}`}
                x1={node.cx}
                y1={node.cy}
                x2={center.cx}
                y2={center.cy}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
                strokeDasharray={lineLength}
                initial={{ strokeDashoffset: lineLength }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 2.5 + i * 0.2,
                  ease: appleEase,
                }}
              />
            )
          })}

          {/* Outer perimeter connections */}
          {nodes.map((node, i) => {
            const next = nodes[(i + 1) % nodes.length]
            const lineLength = Math.sqrt(
              (next.cx - node.cx) ** 2 + (next.cy - node.cy) ** 2
            )
            return (
              <motion.line
                key={`perim-${i}`}
                x1={node.cx}
                y1={node.cy}
                x2={next.cx}
                y2={next.cy}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.8}
                strokeDasharray={lineLength}
                initial={{ strokeDashoffset: lineLength }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 2.5 + i * 0.2,
                  ease: appleEase,
                }}
              />
            )
          })}

          {/* Outer nodes */}
          {nodes.map((node, i) => {
            const dist = Math.sqrt(
              (mousePos.x - node.cx) ** 2 + (mousePos.y - node.cy) ** 2
            )
            const proximity = Math.max(0, 1 - dist / 200)

            return (
              <motion.circle
                key={`node-${i}`}
                cx={node.cx}
                cy={node.cy}
                r={6}
                fill="#ffffff"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 0.5 + proximity * 0.5,
                  scale: 1,
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: {
                    duration: 0.5,
                    delay: 1.5 + i * 0.15,
                    ease: appleEase,
                  },
                }}
                style={{
                  filter: proximity > 0.3 ? `drop-shadow(0 0 ${8 * proximity}px rgba(181,90,199,${proximity * 0.5}))` : 'none',
                }}
              />
            )
          })}

          {/* Center node — glowing purple */}
          <motion.circle
            cx={center.cx}
            cy={center.cy}
            r={8}
            fill="#B55AC7"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 3.0,
              ease: appleEase,
            }}
          />
          {/* Center glow pulse */}
          <motion.circle
            cx={center.cx}
            cy={center.cy}
            r={8}
            fill="none"
            stroke="#B55AC7"
            strokeWidth={2}
            initial={{ opacity: 0, r: 8 }}
            animate={{
              opacity: [0, 0.4, 0],
              r: [8, 30, 50],
            }}
            transition={{
              duration: 2,
              delay: 3.5,
              ease: 'easeOut',
            }}
          />
        </motion.svg>

        {/* Organization name */}
        <motion.p
          className="font-inter text-[24px] tracking-normal mb-2"
          style={{ color: '#A3A3A3' }}
          initial={{ opacity: 0, y: 15, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 4.0, ease: appleEase }}
        >
          AI Research & Innovation Society
        </motion.p>

        {/* Restructuring Meeting label with flanking lines */}
        <motion.div
          className="flex items-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 5.0, ease: appleEase }}
        >
          <motion.div
            className="h-[1px]"
            style={{ backgroundColor: 'rgba(163,163,163,0.3)', width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.6, delay: 5.0, ease: appleEase }}
          />
          <span
            className="font-inter text-[14px] uppercase tracking-[0.08em]"
            style={{ color: 'rgba(163,163,163,0.5)' }}
          >
            Restructuring Meeting
          </span>
          <motion.div
            className="h-[1px]"
            style={{ backgroundColor: 'rgba(163,163,163,0.3)', width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.6, delay: 5.0, ease: appleEase }}
          />
        </motion.div>
      </div>
    </div>
  )
}
