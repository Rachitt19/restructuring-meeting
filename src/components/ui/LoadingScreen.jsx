import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const steps = [
      { target: 30, delay: 200 },
      { target: 60, delay: 600 },
      { target: 85, delay: 1000 },
      { target: 100, delay: 1400 },
    ]

    steps.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay)
    })

    setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 600)
    }, 2000)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Pentagon of nodes */}
              {[
                [24, 8],
                [38, 18],
                [34, 36],
                [14, 36],
                [10, 18],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={2.5}
                  fill="#fff"
                  fillOpacity={0.6}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                />
              ))}
              {/* Center node */}
              <motion.circle
                cx={24}
                cy={24}
                r={3}
                fill="#B55AC7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              />
              {/* Connection lines */}
              {[
                [24, 8, 24, 24],
                [38, 18, 24, 24],
                [34, 36, 24, 24],
                [14, 36, 24, 24],
                [10, 18, 24, 24],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={`l${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={0.8}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                />
              ))}
            </motion.svg>

            {/* Loading bar */}
            <div className="loading-bar">
              <div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <motion.p
              className="font-mono text-[11px] tracking-wider"
              style={{ color: 'rgba(163,163,163,0.4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              AIRIS 2.0
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
