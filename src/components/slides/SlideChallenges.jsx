import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'

const appleEase = [0.16, 1, 0.3, 1]

const challenges = [
  { num: '01', main: 'Undefined research goals', sub: 'no north star' },
  { num: '02', main: 'Event-heavy, learning-light', sub: 'busy without depth' },
  { num: '03', main: 'No accountability framework', sub: 'effort without tracking' },
  { num: '04', main: 'Unclear member journey', sub: 'join, then what?' },
  { num: '05', main: 'Leadership without structure', sub: 'titles without systems' },
  { num: '06', main: 'No semester-level planning', sub: 'week-to-week improvisation' },
]

// Disconnected nodes SVG for right side
function DisconnectedNodes() {
  const nodes = [
    { x: 40, y: 60 }, { x: 90, y: 30 }, { x: 70, y: 120 },
    { x: 30, y: 180 }, { x: 80, y: 200 }, { x: 50, y: 270 },
    { x: 90, y: 310 }, { x: 20, y: 350 }, { x: 70, y: 390 },
    { x: 40, y: 450 },
  ]

  return (
    <motion.svg
      className="absolute right-0 top-0 h-full"
      width="120"
      viewBox="0 0 120 500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 2.0 }}
    >
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={3}
          fill="rgba(163,163,163,0.04)"
        />
      ))}
      {/* Dashed, incomplete connections */}
      {nodes.slice(0, -1).map((node, i) => {
        const next = nodes[i + 1]
        return (
          <line
            key={`l-${i}`}
            x1={node.x} y1={node.y}
            x2={(node.x + next.x) / 2} y2={(node.y + next.y) / 2}
            stroke="rgba(163,163,163,0.03)"
            strokeWidth={0.8}
            strokeDasharray="3 6"
          />
        )
      })}
    </motion.svg>
  )
}

function ChallengeRow({ item, index }) {
  const delay = 0.8 + index * 0.15

  return (
    <motion.div
      className="group flex items-center gap-0 py-3.5 relative cursor-default"
      style={{ width: '70%' }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay, ease: appleEase }}
    >
      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, rgba(181,90,199,0.04), transparent)',
        }}
      />

      {/* Number */}
      <motion.span
        className="font-mono text-[14px] w-[40px] shrink-0 transition-opacity duration-300"
        style={{ color: '#B55AC7', opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
      >
        {item.num}
      </motion.span>

      {/* Line */}
      <motion.div
        className="h-[1px] shrink-0 transition-all duration-500 group-hover:w-[80px]"
        style={{
          width: 40,
          backgroundColor: 'rgba(255,255,255,0.08)',
        }}
        initial={{ width: 0 }}
        animate={{ width: 40 }}
        transition={{ duration: 0.4, delay: delay + 0.1, ease: appleEase }}
      />

      {/* Text */}
      <motion.div
        className="ml-4 flex items-baseline gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: appleEase }}
      >
        <span className="font-inter text-[22px]" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {item.main}
        </span>
        <span className="font-inter text-[22px]" style={{ color: 'rgba(163,163,163,0.5)' }}>
          — {item.sub}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function SlideChallenges({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      <DisconnectedNodes />

      <div className="slide-content">
        <AnimatedLabel text="WHAT WENT WRONG" />

        <AnimatedHeadline className="text-[56px] font-semibold leading-tight mb-12" delay={0.3}>
          The challenges we faced.
        </AnimatedHeadline>

        <div className="flex flex-col">
          {challenges.map((item, i) => (
            <ChallengeRow key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
