import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'
import GlassCard from '../ui/GlassCard.jsx'

const appleEase = [0.16, 1, 0.3, 1]

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.circle
          cx="16" cy="16" r="10"
          stroke="#B55AC7"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.text
          x="16" y="21"
          textAnchor="middle"
          fill="#B55AC7"
          fontSize="16"
          fontFamily="Space Grotesk"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          ?
        </motion.text>
      </svg>
    ),
    title: 'No Clear Research Identity',
    subtext: 'Events without direction',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.path
          d="M16 6 A10 10 0 1 1 6 16"
          stroke="#8D4AE8"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M16 6 L13 3 M16 6 L19 3"
          stroke="#8D4AE8"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        />
      </svg>
    ),
    title: 'Reactive, Not Proactive',
    subtext: 'Responding, never leading',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <motion.path
          d="M8 16 L12 16 M20 16 L24 16"
          stroke="#A3A3A3"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M12 12 L16 16 L12 20 M20 12 L16 16 L20 20"
          stroke="#A3A3A3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    ),
    title: 'No Academic Backbone',
    subtext: 'Activity without structure',
  },
]

export default function SlideWhyRestructure({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Scan-line background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)',
          opacity: 1,
        }}
      />

      {/* Subtle glow behind headline */}
      <div
        className="absolute z-0"
        style={{
          top: '15%',
          left: '20%',
          width: 500,
          height: 300,
          background: 'radial-gradient(ellipse, rgba(181,90,199,0.02) 0%, transparent 70%)',
        }}
      />

      <div className="slide-content">
        <AnimatedLabel text="THE QUESTION" />

        <AnimatedHeadline className="text-[72px] md:text-[80px] font-bold leading-[1.05] mb-12 max-w-[70%]" delay={0.4}>
          <span>Why does AIRIS need</span>
          <br />
          <motion.span
            className="text-glow-purple"
            initial={{ textShadow: '0 0 0px rgba(181,90,199,0)' }}
            animate={{ textShadow: '0 0 40px rgba(181,90,199,0.4)' }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            to restructure?
          </motion.span>
        </AnimatedHeadline>

        {/* Three glass cards */}
        <div className="flex gap-6 mb-16">
          {cards.map((card, i) => (
            <GlassCard
              key={i}
              className="p-6 w-[280px] h-[160px]"
              delay={1.2 + i * 0.15}
              hoverTilt
              hoverGlow
            >
              <div className="mb-3">{card.icon}</div>
              <h3 className="font-inter font-medium text-[16px] text-white mb-1">
                {card.title}
              </h3>
              <p className="font-inter text-[14px]" style={{ color: '#A3A3A3' }}>
                {card.subtext}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Pull quote */}
        <motion.p
          className="font-inter text-[20px] italic text-center w-full"
          style={{ color: 'rgba(163,163,163,0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2, ease: appleEase }}
        >
          "A club that does everything does nothing."
        </motion.p>
      </div>
    </div>
  )
}
