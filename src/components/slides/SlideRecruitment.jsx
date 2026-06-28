import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'
import GlassCard from '../ui/GlassCard.jsx'

const appleEase = [0.16, 1, 0.3, 1]

const qualities = [
  { title: 'Curiosity', sub: "You ask questions others don't" },
  { title: 'Commitment', sub: 'You show up. Consistently.' },
  { title: 'Rigor', sub: 'You care about doing it right' },
  { title: 'Humility', sub: "You know what you don't know" },
]

const steps = [
  { num: '01', label: 'Application Form' },
  { num: '02', label: 'Task or Essay Submission' },
  { num: '03', label: 'Interview' },
  { num: '04', label: 'Onboarding & Track Assignment' },
]

export default function SlideRecruitment({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Faint form-field pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ opacity: 0.015 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-lg border"
            style={{
              width: 120 + Math.random() * 80,
              height: 32,
              top: `${10 + i * 12}%`,
              left: `${60 + Math.random() * 30}%`,
              borderColor: 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Purple glow */}
      <div
        className="absolute z-0"
        style={{
          top: '12%',
          left: '20%',
          width: 400,
          height: 200,
          background: 'radial-gradient(ellipse, rgba(181,90,199,0.025) 0%, transparent 70%)',
        }}
      />

      <div className="slide-content">
        <AnimatedLabel text="JOIN AIRIS" />

        <div className="mb-12">
          <motion.h2
            className="font-space font-bold text-[72px] leading-none"
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.3, ease: appleEase }}
          >
            We're recruiting.
          </motion.h2>
          <motion.h2
            className="font-space font-bold text-[72px] leading-none"
            style={{ color: '#A3A3A3' }}
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.7, ease: appleEase }}
          >
            Selectively.
          </motion.h2>
        </div>

        {/* Two cards side by side */}
        <div className="flex gap-8 mb-12">
          {/* Left card — What We Seek */}
          <GlassCard
            className="p-8 flex-1 max-w-[400px]"
            delay={1.2}
            hoverGlow
          >
            <h3 className="font-space font-semibold text-[20px] text-white mb-4">
              What We Seek
            </h3>
            <div className="w-full h-[1px] mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

            <div className="space-y-5">
              {qualities.map((q, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + i * 0.12, duration: 0.5, ease: appleEase }}
                >
                  <span className="text-[8px] mt-2 shrink-0" style={{ color: '#B55AC7' }}>
                    ◆
                  </span>
                  <div>
                    <span className="font-inter font-medium text-[17px] text-white block">
                      {q.title}
                    </span>
                    <span className="font-inter text-[14px]" style={{ color: '#A3A3A3' }}>
                      {q.sub}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Right card — The Process */}
          <GlassCard
            className="p-8 flex-1 max-w-[400px]"
            delay={1.2}
            hoverGlow
          >
            <h3 className="font-space font-semibold text-[20px] text-white mb-4">
              The Process
            </h3>
            <div className="w-full h-[1px] mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

            <div className="relative ml-3">
              {/* Vertical progress line */}
              <motion.div
                className="absolute left-[3px] top-[4px] w-[1px]"
                style={{
                  backgroundColor: 'rgba(181,90,199,0.2)',
                  height: 0,
                }}
                animate={{ height: '90%' }}
                transition={{ duration: 0.8, delay: 1.6, ease: appleEase }}
              />

              <div className="space-y-6">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 relative"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 + i * 0.15, duration: 0.5, ease: appleEase }}
                  >
                    {/* Node dot */}
                    <motion.div
                      className="w-[8px] h-[8px] rounded-full shrink-0 z-10"
                      style={{ backgroundColor: 'rgba(181,90,199,0.4)' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.8 + i * 0.15, type: 'spring', stiffness: 300 }}
                    />

                    {/* Number */}
                    <span className="font-mono text-[14px] shrink-0" style={{ color: '#B55AC7' }}>
                      {step.num}
                    </span>

                    {/* Label */}
                    <span className="font-inter text-[17px]" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* CTA Date */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <p className="font-inter font-medium text-[18px] text-white">
            Applications open:{' '}
            <motion.span
              className="font-mono"
              style={{ color: '#B55AC7' }}
              initial={{ textShadow: '0 0 0px rgba(181,90,199,0)' }}
              animate={{ textShadow: '0 0 20px rgba(181,90,199,0.3)' }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              July 2026
            </motion.span>
          </p>

          {/* Pulsing arrow */}
          <motion.span
            className="text-[20px] mt-3"
            style={{ color: 'rgba(163,163,163,0.4)' }}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 2.8 }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}
