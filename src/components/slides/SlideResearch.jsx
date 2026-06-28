import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'
import { Search, BookOpen, Compass, FlaskConical, PenLine, Rocket } from 'lucide-react'

const appleEase = [0.16, 1, 0.3, 1]

const stages = [
  { Icon: Search, label: 'Identify', desc: 'Find a research question', color: '#A3A3A3' },
  { Icon: BookOpen, label: 'Learn', desc: 'Study existing literature', color: '#A3A3A3' },
  { Icon: Compass, label: 'Explore', desc: 'Survey approaches', color: '#8D4AE8' },
  { Icon: FlaskConical, label: 'Experiment', desc: 'Build and test', color: '#8D4AE8' },
  { Icon: PenLine, label: 'Write', desc: 'Document findings', color: '#B55AC7' },
  { Icon: Rocket, label: 'Publish', desc: 'Submit and share', color: '#B55AC7' },
]

// Layout: 3 on top row, 3 on bottom row
const topRow = stages.slice(0, 3)
const bottomRow = stages.slice(3, 6)

export default function SlideResearch({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Ripples from publish node */}
      <div className="absolute z-0" style={{ right: '18%', bottom: '30%' }}>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 0,
              height: 0,
              border: '1px solid rgba(181,90,199,0.015)',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              width: [0, 300 * i],
              height: [0, 300 * i],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 10,
              delay: 3.2 + i * 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="slide-content">
        <AnimatedLabel text="RESEARCH" />

        <AnimatedHeadline className="text-[56px] font-semibold leading-tight mb-16" delay={0.3}>
          From question to paper.
        </AnimatedHeadline>

        {/* Pipeline diagram */}
        <div className="flex flex-col items-center gap-0 mb-12">
          {/* Top row */}
          <div className="flex items-center gap-0">
            {topRow.map((stage, i) => (
              <div key={i} className="flex items-center">
                <StageNode stage={stage} index={i} />
                {i < 2 && <Arrow delay={0.9 + i * 0.2} />}
              </div>
            ))}
          </div>

          {/* Curved return path (visual) */}
          <div className="flex justify-end w-[620px]">
            <motion.svg
              width="80" height="80" viewBox="0 0 80 80"
              className="mr-[-10px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <motion.path
                d="M 10 0 C 70 0 70 80 10 80"
                fill="none"
                stroke="rgba(181,90,199,0.3)"
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.7, ease: appleEase }}
              />
              {/* Small arrow head at bottom */}
              <motion.path
                d="M 14 76 L 6 80 L 14 84"
                fill="none"
                stroke="rgba(181,90,199,0.3)"
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              />
            </motion.svg>
          </div>

          {/* Bottom row */}
          <div className="flex items-center gap-0 mt-[-10px]">
            {bottomRow.map((stage, i) => (
              <div key={i} className="flex items-center">
                <StageNode stage={stage} index={i + 3} />
                {i < 2 && <Arrow delay={2.2 + i * 0.2} />}
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <motion.p
          className="font-inter text-[18px] text-center"
          style={{ color: '#A3A3A3' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 0.8, ease: appleEase }}
        >
          <span className="text-white font-medium">Every</span> member follows this pipeline.
        </motion.p>

        {/* Flowing dots animation along path */}
        <svg className="absolute inset-0 pointer-events-none z-0" width="100%" height="100%">
          {/* Flowing dot top row */}
          <motion.circle
            r={3}
            fill="rgba(181,90,199,0.3)"
            animate={{
              cx: [380, 480, 580, 680],
              cy: [400, 400, 400, 400],
            }}
            transition={{
              duration: 3,
              delay: 3.4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>
      </div>
    </div>
  )
}

function StageNode({ stage, index }) {
  const delay = 0.7 + index * 0.2

  return (
    <motion.div
      className="flex flex-col items-center w-[160px]"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: appleEase }}
    >
      {/* Circle */}
      <motion.div
        className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-3 relative"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: `1.5px solid ${stage.color}`,
        }}
        whileHover={{
          boxShadow: `0 0 20px ${stage.color}33`,
          transition: { duration: 0.3 },
        }}
      >
        <stage.Icon size={24} style={{ color: stage.color }} strokeWidth={1.5} />

        {/* Glow on last node */}
        {index === 5 && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 0px rgba(181,90,199,0)',
                '0 0 20px rgba(181,90,199,0.2)',
                '0 0 0px rgba(181,90,199,0)',
              ],
            }}
            transition={{ duration: 2, delay: 2.8, repeat: 2 }}
          />
        )}
      </motion.div>

      {/* Label */}
      <span className="font-space font-medium text-[16px] text-white mb-1">
        {stage.label}
      </span>
      <span className="font-inter text-[13px] text-center" style={{ color: '#A3A3A3' }}>
        {stage.desc}
      </span>
    </motion.div>
  )
}

function Arrow({ delay }) {
  return (
    <motion.svg
      width="40" height="16" viewBox="0 0 40 16"
      className="mx-1 mt-[-40px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.line
        x1="0" y1="8" x2="30" y2="8"
        stroke="#A3A3A3"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.4, ease: appleEase }}
      />
      <motion.path
        d="M26 4 L34 8 L26 12"
        fill="none"
        stroke="#A3A3A3"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      />
    </motion.svg>
  )
}
