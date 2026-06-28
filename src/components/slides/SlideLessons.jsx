import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline, StaggerContainer, StaggerItem } from '../ui/AnimatedText.jsx'

const appleEase = [0.16, 1, 0.3, 1]

const lessons = [
  'Research needs a runway, not a stage',
  'Accountability is care, not control',
  'Learning must precede building',
  'Small teams outperform large crowds',
]

export default function SlideLessons({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Background glow behind quote */}
      <div
        className="absolute inset-0 flex items-center justify-center z-0"
      >
        <div
          style={{
            width: 600,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(181,90,199,0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="slide-content">
        <AnimatedLabel text="REFLECTIONS" />

        <AnimatedHeadline className="text-[56px] font-semibold leading-tight mb-14" delay={0.3}>
          What we learned.
        </AnimatedHeadline>

        {/* Featured quote card — border draws itself */}
        <div className="flex justify-center mb-14">
          <motion.div
            className="relative"
            style={{ width: '60%', maxWidth: 700 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            {/* SVG border draw */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ overflow: 'visible' }}
            >
              <motion.rect
                x="0.5" y="0.5"
                width="calc(100% - 1px)"
                height="calc(100% - 1px)"
                rx="20"
                fill="none"
                stroke="rgba(181,90,199,0.12)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: appleEase }}
              />
            </svg>

            {/* Card content */}
            <motion.div
              className="glass-card-purple relative p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{
                boxShadow: 'inset 0 0 80px rgba(181,90,199,0.03)',
              }}
            >
              {/* Decorative quotation marks */}
              <span
                className="font-space text-[80px] font-bold absolute top-4 left-6 select-none"
                style={{ color: 'rgba(181,90,199,0.15)' }}
              >
                "
              </span>
              <span
                className="font-space text-[80px] font-bold absolute bottom-0 right-6 select-none leading-none"
                style={{ color: 'rgba(181,90,199,0.15)' }}
              >
                "
              </span>

              {/* Quote text — word by word */}
              <motion.p
                className="font-space font-medium text-[28px] text-white text-center relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <WordByWord
                  text="Structure enables creativity. Chaos only feels like freedom."
                  delay={1.4}
                />
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Lesson bullets */}
        <StaggerContainer delay={2.4} stagger={0.15} className="ml-[20%]">
          {lessons.map((lesson, i) => (
            <StaggerItem key={i} className="flex items-start gap-3 mb-6">
              <motion.span
                className="text-[8px] mt-2 shrink-0"
                style={{ color: '#B55AC7' }}
              >
                ◆
              </motion.span>
              <span
                className="font-inter text-[20px]"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {lesson}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  )
}

function WordByWord({ text, delay = 0 }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.06,
            ease: appleEase,
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}
