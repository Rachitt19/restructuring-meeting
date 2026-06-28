import { motion } from 'framer-motion'

const appleEase = [0.16, 1, 0.3, 1]

/**
 * Typewriter label tag used at the top of most slides.
 * Renders text character by character with a cursor blink.
 */
export default function AnimatedLabel({ text, delay = 0 }) {
  const chars = text.split('')

  return (
    <div className="label-tag mb-6 flex items-center gap-0 overflow-hidden">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.02,
            delay: delay + i * 0.04,
            ease: 'linear',
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[14px] ml-0.5"
        style={{ backgroundColor: '#B55AC7' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: 3,
          delay: delay + chars.length * 0.04,
        }}
      />
    </div>
  )
}

/**
 * Headline text that fades in from blur.
 */
export function AnimatedHeadline({
  children,
  className = '',
  delay = 0.3,
  as: Tag = 'h2',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(16px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: appleEase }}
    >
      <Tag className={`font-space ${className}`}>{children}</Tag>
    </motion.div>
  )
}

/**
 * Body text that fades in softly.
 */
export function AnimatedText({
  children,
  className = '',
  delay = 0.5,
}) {
  return (
    <motion.p
      className={`font-inter ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: appleEase }}
    >
      {children}
    </motion.p>
  )
}

/**
 * Staggered container for child animations.
 */
export function StaggerContainer({ children, delay = 0, stagger = 0.12, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Child of StaggerContainer.
 */
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease: appleEase },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
