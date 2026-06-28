import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import { Microscope, LayoutGrid, CheckCircle, ArrowDownToLine, Code2, Infinity } from 'lucide-react'

const appleEase = [0.16, 1, 0.3, 1]

const principles = [
  {
    Icon: Microscope,
    title: 'Research First',
    desc: 'Every initiative begins with a question',
  },
  {
    Icon: LayoutGrid,
    title: 'Structure Over Chaos',
    desc: 'Systems, not spontaneity',
  },
  {
    Icon: CheckCircle,
    title: 'Accountability',
    desc: 'Measure what matters',
  },
  {
    Icon: ArrowDownToLine,
    title: 'Depth Over Breadth',
    desc: 'Master one thing, not ten',
  },
  {
    Icon: Code2,
    title: 'Open Source Mindset',
    desc: 'Build in public, share knowledge',
  },
  {
    Icon: Infinity,
    title: 'Long-Term Thinking',
    desc: "Plant trees we won't sit under",
  },
]

export default function SlidePrinciples({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Hexagonal grid background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <HexGrid />
      </div>

      <div className="slide-content">
        <AnimatedLabel text="PHILOSOPHY" />

        <AnimatedHeadline className="text-[72px] font-bold leading-tight mb-14" delay={0.3}>
          <span>Principles that guide</span>
          <br />
          <motion.span
            initial={{ textShadow: '0 0 0px rgba(181,90,199,0)' }}
            animate={{ textShadow: '0 0 40px rgba(181,90,199,0.3)' }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            AIRIS 2.0
          </motion.span>
        </AnimatedHeadline>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-3 gap-5 max-w-[860px]">
          {principles.map((p, i) => (
            <GlassCard
              key={i}
              className="p-7 group cursor-default"
              delay={0.8 + i * 0.12}
              hoverGlow
              style={{ minHeight: 180 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <p.Icon
                  size={28}
                  className="mb-4 transition-colors duration-400"
                  style={{ color: '#A3A3A3' }}
                  strokeWidth={1.5}
                />
              </motion.div>
              <h3 className="font-space font-semibold text-[20px] text-white mb-2">
                {p.title}
              </h3>
              <p className="font-inter text-[14px]" style={{ color: '#A3A3A3' }}>
                {p.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}

function HexGrid() {
  // Generate a faint hexagonal grid pattern
  const hexSize = 40
  const rows = 12
  const cols = 20

  return (
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0"
      style={{ opacity: 0.015 }}
    >
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = col * hexSize * 1.5
          const y = row * hexSize * Math.sqrt(3) + (col % 2 ? hexSize * Math.sqrt(3) / 2 : 0)
          const points = Array.from({ length: 6 }, (_, i) => {
            const angle = (Math.PI / 3) * i + Math.PI / 6
            return `${x + hexSize * 0.4 * Math.cos(angle)},${y + hexSize * 0.4 * Math.sin(angle)}`
          }).join(' ')

          return (
            <polygon
              key={`${row}-${col}`}
              points={points}
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          )
        })
      )}
    </svg>
  )
}
