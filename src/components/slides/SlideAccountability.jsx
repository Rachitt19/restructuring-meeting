import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'

const appleEase = [0.16, 1, 0.3, 1]

const stages = [
  { label: 'Weekly', sublabel: 'Standups', borderColor: 'rgba(163,163,163,0.15)' },
  { label: 'Bi-Weekly', sublabel: 'Reviews', borderColor: 'rgba(163,163,163,0.25)' },
  { label: 'Mid-Semester', sublabel: 'Audits', borderColor: 'rgba(141,74,232,0.3)' },
  { label: 'End-of-Semester', sublabel: 'Reports', borderColor: 'rgba(181,90,199,0.4)' },
]

const values = ['Transparent', 'Consistent', 'Fair']

export default function SlideAccountability({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Gantt-like horizontal lines */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.015) 49px, rgba(255,255,255,0.015) 50px)',
        }}
      />

      <div className="slide-content">
        <AnimatedLabel text="ACCOUNTABILITY" />

        <AnimatedHeadline className="text-[64px] font-bold leading-tight mb-16" delay={0.3}>
          <span>How we hold ourselves</span>
          <br />
          <span>accountable.</span>
        </AnimatedHeadline>

        {/* Pipeline container */}
        <motion.div
          className="glass-card p-10 mx-auto mb-12"
          style={{ maxWidth: '85%' }}
          initial={{ opacity: 0, borderColor: 'rgba(255,255,255,0)' }}
          animate={{ opacity: 1, borderColor: 'rgba(255,255,255,0.08)' }}
          transition={{ duration: 0.8, delay: 0.7, ease: appleEase }}
        >
          <div className="flex items-center justify-center gap-4">
            {stages.map((stage, i) => (
              <motion.div key={i} className="flex items-center gap-4">
                {/* Stage node */}
                <motion.div
                  className="flex flex-col items-center justify-center rounded-xl p-4"
                  style={{
                    width: 140,
                    height: 90,
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${stage.borderColor}`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.0 + i * 0.2,
                    ease: appleEase,
                  }}
                >
                  <span className="font-space font-semibold text-[15px] text-white mb-1">
                    {stage.label}
                  </span>
                  <span className="font-inter text-[13px]" style={{ color: '#A3A3A3' }}>
                    {stage.sublabel}
                  </span>
                </motion.div>

                {/* Arrow between stages */}
                {i < stages.length - 1 && (
                  <motion.svg
                    width="32" height="16" viewBox="0 0 32 16"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.3, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.2, duration: 0.4, ease: appleEase }}
                  >
                    <line x1="0" y1="8" x2="24" y2="8" stroke="#A3A3A3" strokeWidth="1" />
                    <path d="M20 4 L28 8 L20 12" fill="none" stroke="#A3A3A3" strokeWidth="1" />
                  </motion.svg>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values footer */}
        <div className="flex items-center justify-center gap-6">
          {values.map((value, i) => (
            <motion.div key={i} className="flex items-center gap-6">
              <motion.span
                className="font-inter font-medium text-[16px]"
                style={{ color: '#A3A3A3' }}
                initial={{ opacity: 0, color: '#A3A3A3' }}
                animate={{
                  opacity: 1,
                  color: ['#A3A3A3', '#FFFFFF', '#A3A3A3'],
                }}
                transition={{
                  opacity: { delay: 3.0, duration: 0.5 },
                  color: {
                    delay: 3.0 + i * 0.2,
                    duration: 0.8,
                    times: [0, 0.3, 1],
                  },
                }}
              >
                {value}
              </motion.span>
              {i < values.length - 1 && (
                <motion.span
                  className="text-[16px]"
                  style={{ color: 'rgba(163,163,163,0.4)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.0 }}
                >
                  ·
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
