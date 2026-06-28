import { motion } from 'framer-motion'
import AnimatedLabel, { AnimatedHeadline, AnimatedText } from '../ui/AnimatedText.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import { Calendar, PenTool, Users } from 'lucide-react'

const appleEase = [0.16, 1, 0.3, 1]

const departments = [
  {
    Icon: Calendar,
    title: 'Events & Logistics',
    items: ['Plan & scope events', 'Execute with checklists', 'Post-event review & data'],
  },
  {
    Icon: PenTool,
    title: 'Design & Media',
    items: ['Brand consistency', 'Content creation', 'Asset management'],
  },
  {
    Icon: Users,
    title: 'Community & Outreach',
    items: ['Social media presence', 'Recruitment campaigns', 'External partnerships'],
  },
]

export default function SlideOperations({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Gear pattern — bottom right */}
      <div className="absolute bottom-10 right-10 z-0" style={{ opacity: 0.02 }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <motion.circle
            cx={100} cy={100} r={60}
            fill="none" stroke="white" strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.circle
            cx={100} cy={100} r={30}
            fill="none" stroke="white" strokeWidth={0.8}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
          />
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (Math.PI / 4) * i
            return (
              <line
                key={i}
                x1={100 + 55 * Math.cos(angle)}
                y1={100 + 55 * Math.sin(angle)}
                x2={100 + 75 * Math.cos(angle)}
                y2={100 + 75 * Math.sin(angle)}
                stroke="white"
                strokeWidth={3}
                strokeLinecap="round"
              />
            )
          })}
        </svg>
      </div>

      {/* Faint ledger lines */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.01) 39px, rgba(255,255,255,0.01) 40px)',
        }}
      />

      <div className="slide-content">
        <AnimatedLabel text="PILLAR 01" />

        <motion.h2
          layoutId="node-ops-pillar"
          className="font-space font-bold text-[72px] leading-none mb-3"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
        >
          Operations
        </motion.h2>

        <AnimatedText
          className="text-[22px] italic mb-14"
          style={{ color: '#A3A3A3' }}
          delay={0.5}
        >
          "Keep the machine running."
        </AnimatedText>

        {/* Department cards */}
        <div className="flex gap-6 mb-12">
          {departments.map((dept, i) => (
            <GlassCard
              key={i}
              layoutId={`dept-card-${i}`}
              className="p-6 w-[300px] relative overflow-hidden"
              delay={0.9 + i * 0.15}
              hoverGlow
              style={{ minHeight: 260 }}
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 h-[2px]"
                style={{ backgroundColor: 'rgba(163,163,163,0.3)' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.15, ease: appleEase }}
              />

              <dept.Icon
                size={32}
                strokeWidth={1.5}
                className="mb-4"
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
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#A3A3A3', opacity: 0.4 }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        {/* Connection note */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <motion.div
            className="h-[1px]"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 2.2, duration: 0.6, ease: appleEase }}
          />
          <span className="text-[14px] font-inter" style={{ color: '#A3A3A3' }}>
            ↔ Operations supports and enables the Academic Pillar
          </span>
          <motion.div
            className="h-[1px]"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 2.2, duration: 0.6, ease: appleEase }}
          />
        </motion.div>
      </div>
    </div>
  )
}
