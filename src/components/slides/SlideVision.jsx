import { motion } from 'framer-motion'

const appleEase = [0.16, 1, 0.3, 1]

const milestones = [
  {
    timeline: 'Now',
    vision: 'Foundation',
    desc: 'Structure, teams, first tracks',
    borderColor: 'rgba(163,163,163,0.15)',
  },
  {
    timeline: '6 Months',
    vision: 'Recognition',
    desc: 'University-known, published work',
    borderColor: 'rgba(141,74,232,0.25)',
  },
  {
    timeline: '1 Year',
    vision: 'Presence',
    desc: 'Inter-university network, conference presence',
    borderColor: 'rgba(181,90,199,0.35)',
    glow: true,
  },
]

export default function SlideVision({ isActive }) {
  if (!isActive) return null

  return (
    <div className="slide">
      {/* Aurora ribbon at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[20%] z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(141,74,232,0.02), rgba(181,90,199,0.02), transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ opacity: { delay: 5.5, duration: 2 } }}
      />

      {/* Radial glow behind quote */}
      <div className="absolute inset-0 flex items-end justify-center z-0" style={{ paddingBottom: '15%' }}>
        <motion.div
          style={{
            width: 800,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(181,90,199,0.04) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 2 }}
        />
      </div>

      <div className="slide-content">
        {/* No label — this slide is different */}

        <motion.h2
          className="font-space font-semibold text-[64px] leading-tight mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: appleEase }}
        >
          Where AIRIS is going.
        </motion.h2>

        {/* Vision timeline — 3 milestones */}
        <div className="flex items-center justify-center gap-0 mb-20">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.0 + i * 0.3, ease: appleEase }}
              >
                {/* Timeline label */}
                <span className="font-mono text-[13px] mb-3" style={{ color: '#B55AC7' }}>
                  {m.timeline}
                </span>

                {/* Milestone card */}
                <motion.div
                  className="rounded-xl p-5 flex flex-col items-center justify-center"
                  style={{
                    width: 170,
                    height: 120,
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${m.borderColor}`,
                    boxShadow: m.glow ? '0 0 30px rgba(181,90,199,0.1)' : 'none',
                  }}
                  whileHover={{
                    borderColor: 'rgba(181,90,199,0.4)',
                    boxShadow: '0 0 25px rgba(181,90,199,0.12)',
                  }}
                >
                  <span className="font-space font-semibold text-[18px] text-white mb-2">
                    {m.vision}
                  </span>
                  <span className="font-inter text-[14px] text-center" style={{ color: '#A3A3A3' }}>
                    {m.desc}
                  </span>
                </motion.div>
              </motion.div>

              {/* Connecting gradient line */}
              {i < milestones.length - 1 && (
                <motion.div
                  className="h-[1px] mx-4"
                  style={{
                    width: 80,
                    background: i === 0
                      ? 'linear-gradient(90deg, rgba(163,163,163,0.15), rgba(141,74,232,0.25))'
                      : 'linear-gradient(90deg, rgba(141,74,232,0.25), rgba(181,90,199,0.35))',
                    marginTop: 20,
                  }}
                  initial={{ scaleX: 0, transformOrigin: 'left' }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 2.2 + i * 0.3, ease: appleEase }}
                />
              )}

              {/* Dashed future line after last milestone */}
              {i === milestones.length - 1 && (
                <motion.div
                  className="flex items-center ml-4"
                  style={{ marginTop: 20 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.3, duration: 1 }}
                >
                  <div
                    className="h-[1px] w-[60px]"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, rgba(181,90,199,0.2) 0px, rgba(181,90,199,0.2) 6px, transparent 6px, transparent 14px)',
                    }}
                  />
                  <span className="ml-2 font-inter text-[16px]" style={{ color: 'rgba(163,163,163,0.2)' }}>
                    ?
                  </span>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Closing quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 4.0, ease: appleEase }}
        >
          <p
            className="font-space font-medium text-[32px] leading-relaxed text-glow-purple-subtle"
            style={{ color: '#FFFFFF' }}
          >
            "We're building something
            <br />
            that outlasts all of us."
          </p>
        </motion.div>
      </div>
    </div>
  )
}
