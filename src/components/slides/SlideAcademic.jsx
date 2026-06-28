import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline, AnimatedText } from '../ui/AnimatedText.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import { GraduationCap, Atom, FileText } from 'lucide-react'

const appleEase = [0.16, 1, 0.3, 1]

const departments = [
  {
    Icon: GraduationCap,
    title: 'Learning Tracks',
    items: ['Structured ML/DL curriculum', 'Paper reading groups', 'Weekly study sessions'],
  },
  {
    Icon: Atom,
    title: 'Research Groups',
    items: ['NLP, Computer Vision, AI Ethics', 'Guided research projects', 'Faculty mentorship'],
  },
  {
    Icon: FileText,
    title: 'Projects & Publications',
    items: ['Research paper writing', 'Open-source contributions', 'Conference submissions'],
  },
]

const milestones = [
  { label: 'Learner', x: 15 },
  { label: 'Practitioner', x: 50 },
  { label: 'Researcher', x: 85 },
]

// Connected neural network background
function ConnectedNodes() {
  const nodes = [
    { x: 50, y: 80 }, { x: 120, y: 40 }, { x: 90, y: 150 },
    { x: 40, y: 220 }, { x: 110, y: 200 }, { x: 70, y: 300 },
    { x: 130, y: 280 }, { x: 30, y: 370 }, { x: 100, y: 350 },
    { x: 60, y: 430 }, { x: 140, y: 400 },
  ]
  const connections = [
    [0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 5],
    [4, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10],
  ]

  return (
    <motion.svg
      className="absolute right-0 top-0 h-full"
      width="160"
      viewBox="0 0 160 500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 3 }}
      style={{ opacity: 0.02 }}
    >
      {connections.map(([a, b], i) => (
        <line
          key={`c-${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#8D4AE8"
          strokeWidth={0.8}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`n-${i}`} cx={n.x} cy={n.y} r={3} fill="#8D4AE8" />
      ))}
    </motion.svg>
  )
}

export default function SlideAcademic({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      <ConnectedNodes />

      {/* Purple glow behind headline */}
      <div
        className="absolute z-0"
        style={{
          top: '10%',
          left: '15%',
          width: 400,
          height: 200,
          background: 'radial-gradient(ellipse, rgba(141,74,232,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="slide-content">
        <AnimatedLabel text="PILLAR 02" />

        <motion.h2
          layoutId="node-acad-pillar"
          className="font-space font-bold text-[72px] leading-none mb-3"
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
        >
          <motion.span
            initial={{ textShadow: '0 0 0px rgba(141,74,232,0)' }}
            animate={{
              textShadow: [
                '0 0 0px rgba(141,74,232,0)',
                '0 0 40px rgba(141,74,232,0.4)',
                '0 0 20px rgba(141,74,232,0.2)',
              ],
            }}
            transition={{ duration: 1.5, delay: 0.3, times: [0, 0.4, 1] }}
          >
            Academic
          </motion.span>
        </motion.h2>

        <AnimatedText className="text-[22px] italic mb-14" delay={0.5}>
          <span style={{ color: '#A3A3A3' }}>"The reason AIRIS exists."</span>
        </AnimatedText>

        {/* Department cards with purple accents */}
        <div className="flex gap-6 mb-14">
          {departments.map((dept, i) => (
            <GlassCard
              key={i}
              layoutId={`dept-card-${i}`}
              className="p-6 w-[300px] relative overflow-hidden group"
              delay={0.9 + i * 0.15}
              hoverGlow
              style={{ minHeight: 260 }}
            >
              {/* Purple top accent */}
              <motion.div
                className="absolute top-0 left-0 h-[2px]"
                style={{ backgroundColor: '#8D4AE8' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.15, ease: appleEase }}
              />

              <dept.Icon
                size={32}
                strokeWidth={1.5}
                className="mb-4 transition-colors duration-300 group-hover:text-[#8D4AE8]"
                style={{ color: '#A3A3A3' }}
              />

              <h3 className="font-space font-semibold text-[18px] text-white mb-4">
                {dept.title}
              </h3>

              <ul className="space-y-2.5">
                {dept.items.map((item, j) => (
                  <motion.li
                    key={j}
                    className="font-inter text-[15px] flex items-start gap-2"
                    style={{ color: '#A3A3A3' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 + (i * 3 + j) * 0.06 }}
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#8D4AE8', opacity: 0.6 }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        {/* Journey arrow: Learner → Practitioner → Researcher */}
        <div className="relative w-[70%] mx-auto h-[60px]">
          {/* Dotted arrow line */}
          <motion.div
            className="absolute top-[30px] left-0 right-0 h-[1px]"
            style={{
              background: 'repeating-linear-gradient(90deg, rgba(141,74,232,0.4) 0px, rgba(141,74,232,0.4) 4px, transparent 4px, transparent 12px)',
            }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 2.0, ease: appleEase }}
          />

          {/* Milestone dots and labels */}
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: `${m.x}%`, transform: 'translateX(-50%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3 + i * 0.2, duration: 0.6, ease: appleEase }}
            >
              <span
                className="font-inter font-medium text-[14px] mb-2"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {m.label}
              </span>
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#B55AC7' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.3 + i * 0.2, type: 'spring', stiffness: 300 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
