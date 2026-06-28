import { motion } from 'framer-motion'

const appleEase = [0.16, 1, 0.3, 1]

// Same node positions as SlideWelcome
const nodes = [
  { cx: 200, cy: 60 },
  { cx: 330, cy: 150 },
  { cx: 290, cy: 310 },
  { cx: 110, cy: 310 },
  { cx: 70, cy: 150 },
]
const center = { cx: 200, cy: 200 }

export default function SlideClosing({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <motion.div
          style={{
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(181,90,199,0.03) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2, ease: appleEase }}
        />
      </div>

      {/* Faint aurora at top — continuity from Vision slide */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[12%] z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(141,74,232,0.015), rgba(181,90,199,0.015), transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 2 }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Logo — all nodes appear simultaneously */}
        <motion.svg
          width="160"
          height="160"
          viewBox="0 0 400 400"
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: appleEase }}
        >
          {/* All connections at once */}
          {nodes.map((node, i) => (
            <motion.line
              key={`line-${i}`}
              x1={node.cx} y1={node.cy}
              x2={center.cx} y2={center.cy}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 2.0, ease: appleEase }}
            />
          ))}

          {/* Perimeter connections */}
          {nodes.map((node, i) => {
            const next = nodes[(i + 1) % nodes.length]
            return (
              <motion.line
                key={`p-${i}`}
                x1={node.cx} y1={node.cy}
                x2={next.cx} y2={next.cy}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.8}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 2.0, ease: appleEase }}
              />
            )
          })}

          {/* All outer nodes simultaneously */}
          {nodes.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.cx} cy={node.cy} r={6}
              fill="#ffffff"
              fillOpacity={0.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 1.5, ease: appleEase }}
            />
          ))}

          {/* Center node */}
          <motion.circle
            cx={center.cx} cy={center.cy} r={8}
            fill="#B55AC7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5, ease: appleEase }}
          />
          {/* Steady glow */}
          <motion.circle
            cx={center.cx} cy={center.cy} r={20}
            fill="none"
            stroke="#B55AC7"
            strokeWidth={1}
            strokeOpacity={0}
            animate={{ strokeOpacity: [0, 0.15, 0.1] }}
            transition={{ duration: 2, delay: 2.5, ease: 'easeOut' }}
          />
        </motion.svg>

        {/* Mission statement */}
        <motion.div
          className="relative text-center max-w-[600px] mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.0, ease: appleEase }}
        >
          {/* Decorative quotation marks */}
          <span
            className="font-space text-[60px] font-bold absolute -top-8 -left-6 select-none"
            style={{ color: 'rgba(181,90,199,0.1)' }}
          >
            "
          </span>
          <span
            className="font-space text-[60px] font-bold absolute -bottom-12 -right-6 select-none leading-none"
            style={{ color: 'rgba(181,90,199,0.1)' }}
          >
            "
          </span>

          <p
            className="font-inter text-[24px] leading-[1.8]"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Building future AI researchers
            <br />
            through structured learning,
            <br />
            research, innovation
            <br />
            and collaboration.
          </p>
        </motion.div>

        {/* Thank you */}
        <motion.p
          className="font-space font-medium text-[20px]"
          style={{ color: 'rgba(163,163,163,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.5, ease: appleEase }}
        >
          Thank you.
        </motion.p>
      </div>
    </div>
  )
}
