import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'

const appleEase = [0.16, 1, 0.3, 1]

const phases = [
  {
    weeks: 'W1–2',
    title: 'Foundation',
    activities: ['Team formation', 'Onboarding', 'Goal setting'],
    bgOpacity: 0.01,
  },
  {
    weeks: 'W3–5',
    title: 'Build',
    activities: ['Track kickoff', 'Curriculum launch', 'Tool setup'],
    bgOpacity: 0.015,
  },
  {
    weeks: 'W6–8',
    title: 'Launch',
    activities: ['Research groups active', 'Mentorship begins', 'First outputs'],
    bgOpacity: 0.02,
  },
  {
    weeks: 'W9–12',
    title: 'Run',
    activities: ['Publications in progress', 'Showcases', 'Community events'],
    bgOpacity: 0.025,
  },
  {
    weeks: 'W13–16',
    title: 'Review',
    activities: ['Retrospectives', 'Reports', 'Awards & planning'],
    bgOpacity: 0.03,
  },
]

export default function SlideRoadmap({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Faint vertical time-grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 19%, rgba(255,255,255,0.01) 19%, rgba(255,255,255,0.01) 20%)',
        }}
      />

      <div className="slide-content">
        <AnimatedLabel text="ROADMAP" />

        <AnimatedHeadline className="text-[56px] font-semibold leading-tight mb-12" delay={0.3}>
          Semester at a glance.
        </AnimatedHeadline>

        {/* Timeline container */}
        <motion.div
          className="glass-card overflow-hidden mx-auto mb-12"
          style={{ maxWidth: '90%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
        >
          <div className="flex">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                className="flex-1 p-5 relative"
                style={{
                  background: `rgba(181,90,199,${phase.bgOpacity})`,
                  borderRight: i < phases.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.2, ease: appleEase }}
              >
                {/* Week range */}
                <span
                  className="font-mono text-[12px] block mb-2"
                  style={{ color: '#B55AC7' }}
                >
                  {phase.weeks}
                </span>

                {/* Phase title */}
                <h3 className="font-space font-semibold text-[16px] text-white mb-3">
                  {phase.title}
                </h3>

                {/* Activities */}
                <ul className="space-y-1.5">
                  {phase.activities.map((act, j) => (
                    <motion.li
                      key={j}
                      className="font-inter text-[13px]"
                      style={{ color: '#A3A3A3' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + i * 0.2 + j * 0.08 }}
                    >
                      {act}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Vertical divider draw animations */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {[1, 2, 3, 4].map((i) => (
              <motion.line
                key={i}
                x1={`${i * 20}%`} y1="0"
                x2={`${i * 20}%`} y2="100%"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 2.0, ease: appleEase }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Progress bar */}
        <div className="relative w-[80%] mx-auto h-[40px]">
          {/* Background line */}
          <motion.div
            className="absolute top-[18px] left-0 right-0 h-[2px]"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 2.4, ease: appleEase }}
          />

          {/* Filled portion (gradient) */}
          <motion.div
            className="absolute top-[18px] left-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, #8D4AE8, #B55AC7)',
              width: '12%', // ~ Week 2 of 16
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.6, ease: appleEase }}
          />

          {/* Start dot */}
          <motion.div
            className="absolute left-0 top-[14px] flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#B55AC7' }} />
            <span className="font-inter text-[12px] mt-2" style={{ color: '#A3A3A3' }}>
              Now
            </span>
          </motion.div>

          {/* End dot */}
          <motion.div
            className="absolute right-0 top-[14px] flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ border: '1.5px solid #A3A3A3', backgroundColor: 'transparent' }}
            />
            <span className="font-inter text-[12px] mt-2" style={{ color: '#A3A3A3' }}>
              Semester End
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
