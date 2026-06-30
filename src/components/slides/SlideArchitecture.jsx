import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'

const appleEase = [0.16, 1, 0.3, 1]
const slowAppleEase = [0.16, 1, 0.2, 1]

const opsSubTeams = ['Events & Logistics', 'Design & Media', 'Community & Outreach']
const acadSubTeams = ['Learning Tracks', 'Research Groups', 'Projects & Publications']

// Executive node positions (diamond layout)
const PRESIDENT = { x: 450, y: 30 }
const VP_OPS = { x: 200, y: 140 }
const ACAD_DIR = { x: 700, y: 140 }
const SECRETARY = { x: 450, y: 210 }

// Secretary connection endpoints
const secConnections = [
  { from: SECRETARY, to: PRESIDENT, color: '#B55AC7', label: 'sec-pres' },
  { from: SECRETARY, to: VP_OPS, color: '#A3A3A3', label: 'sec-vp' },
  { from: SECRETARY, to: ACAD_DIR, color: '#8D4AE8', label: 'sec-acad' },
]

export default function SlideArchitecture({ isActive }) {
  const [phase, setPhase] = useState(0)
  const [hoveredNode, setHoveredNode] = useState(null)

  useEffect(() => {
    if (!isActive) {
      setPhase(0)
      return
    }

    const t1 = setTimeout(() => setPhase(1), 3000)
    const t2 = setTimeout(() => setPhase(2), 5000)
    const t3 = setTimeout(() => setPhase(3), 8500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [isActive])

  if (!isActive) return null

  const isOpsHovered = hoveredNode === 'ops' || (hoveredNode && hoveredNode.startsWith('ops-'))
  const isAcadHovered = hoveredNode === 'acad' || (hoveredNode && hoveredNode.startsWith('acad-'))
  const isSecHovered = hoveredNode === 'sec'

  return (
    <div className="slide">
      <AnimatePresence>
        {phase === 3 && (
          <motion.div 
            className="absolute inset-0 flex items-center z-0 pointer-events-none" 
            style={{ justifyContent: 'center', paddingTop: '10%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 200 * i,
                  height: 200 * i,
                  border: '1px solid rgba(181,90,199,0.015)',
                  top: '22%',
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.2, 1.6],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="slide-content relative z-10">
        <AnimatedLabel text="THE NEW STRUCTURE" />

        <div className="h-[90px] mb-4">
          <AnimatePresence mode="wait">
            {phase < 3 ? (
              <motion.div
                key="old-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: appleEase }}
              >
                <h2 className="font-space font-bold text-[64px] leading-tight text-[#A3A3A3] opacity-50">
                  Legacy Structure
                </h2>
              </motion.div>
            ) : (
              <motion.div
                key="new-title"
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: appleEase }}
              >
                <h2 className="font-space font-bold text-[64px] leading-tight text-white" style={{ textShadow: '0 0 40px rgba(181,90,199,0.2)' }}>
                  AIRIS 2.0 Architecture
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Architecture Canvas */}
        <div className="flex justify-center relative h-[420px] w-[950px] mx-auto">
          
          {/* PHASE 2: Analysis overlay */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: appleEase }}
              >
                <motion.div 
                  className="font-mono text-[14px] text-[#B55AC7] mb-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  SYSTEM_OPTIMIZATION_IN_PROGRESS
                </motion.div>
                <div className="flex flex-col items-center space-y-2">
                  <motion.div 
                    className="font-space font-semibold text-[24px] text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Analyzing Organizational Structure...
                  </motion.div>
                  <motion.div 
                    className="font-inter text-[16px] text-[#A3A3A3]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Consolidating fragmented nodes...
                  </motion.div>
                  <motion.div 
                    className="font-inter text-[16px] text-[#A3A3A3]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.1 }}
                  >
                    Generating AIRIS 2.0 Blueprint...
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG CONNECTION LINES */}
          <svg width="950" height="420" viewBox="0 0 950 420" className="absolute inset-0 z-10 pointer-events-none">
            {/* PHASE 0-1: Legacy chaotic lines */}
            <AnimatePresence>
              {phase < 2 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase === 1 ? 0 : 1 }}
                  exit={{ opacity: 0, filter: 'blur(12px)' }}
                  transition={{ duration: phase === 1 ? 2 : 1.5, ease: slowAppleEase }}
                >
                  {[
                    [150, 67, 300, 97], [350, 115, 250, 160], [550, 57, 450, 180],
                    [750, 125, 650, 200], [250, 195, 200, 280], [500, 215, 400, 300],
                    [700, 235, 650, 320], [300, 97, 700, 107], [250, 160, 650, 200]
                  ].map((line, i) => (
                    <motion.line
                      key={`legacy-line-${i}`}
                      x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth={1}
                      animate={{
                        opacity: phase === 1 ? 0 : 1,
                        strokeDasharray: phase === 1 ? "5 10" : "none",
                        strokeDashoffset: phase === 1 ? 50 : 0
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  ))}
                </motion.g>
              )}
            </AnimatePresence>

            {/* PHASE 3: RECONSTRUCTED AIRIS 2.0 LINES */}
            <AnimatePresence>
              {phase === 3 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                  
                  {/* === EXECUTIVE HIERARCHY LINES === */}
                  {/* President → VP Operations */}
                  <motion.line
                    x1={PRESIDENT.x} y1={PRESIDENT.y + 30} x2={VP_OPS.x + 90} y2={VP_OPS.y}
                    stroke="rgba(255,255,255,0.12)" strokeWidth={1.5}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: appleEase }}
                    style={{ opacity: isAcadHovered ? 0.04 : isOpsHovered ? 0.25 : 0.12, transition: 'opacity 0.3s' }}
                  />
                  {/* President → Academic Director */}
                  <motion.line
                    x1={PRESIDENT.x} y1={PRESIDENT.y + 30} x2={ACAD_DIR.x - 90} y2={ACAD_DIR.y}
                    stroke="rgba(255,255,255,0.12)" strokeWidth={1.5}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: appleEase }}
                    style={{ opacity: isOpsHovered ? 0.04 : isAcadHovered ? 0.25 : 0.12, transition: 'opacity 0.3s' }}
                  />

                  {/* === SECRETARY COMMUNICATION CHANNELS (dashed, subtle) === */}
                  {secConnections.map((conn, i) => {
                    const fromX = conn.from.x
                    const fromY = conn.from.y
                    const toX = conn.to.x
                    const toY = conn.to.y + (conn.to === PRESIDENT ? 30 : 27)
                    const pathD = `M ${fromX} ${fromY} L ${toX} ${toY}`
                    
                    return (
                      <motion.g key={`sec-conn-${i}`}>
                        {/* Base connection line */}
                        <motion.line
                          x1={fromX} y1={fromY}
                          x2={toX} y2={toY}
                          stroke={conn.color}
                          strokeWidth={1}
                          strokeOpacity={0.08}
                          strokeDasharray="3 6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 1.0 + i * 0.15, ease: appleEase }}
                          style={{ opacity: isSecHovered ? 1 : 0.5, transition: 'opacity 0.3s' }}
                        />
                        {/* Flowing particle along the line */}
                        <motion.circle
                          r={2} fill={conn.color}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.6, 0], offsetDistance: ['0%', '100%'] }}
                          transition={{ duration: 2.5, delay: 2.0 + i * 0.6, repeat: Infinity, ease: 'linear' }}
                          style={{ offsetPath: `path("${pathD}")` }}
                        />
                        {/* Second particle (return direction) */}
                        <motion.circle
                          r={1.5} fill={conn.color}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.4, 0], offsetDistance: ['100%', '0%'] }}
                          transition={{ duration: 3, delay: 3.0 + i * 0.5, repeat: Infinity, ease: 'linear' }}
                          style={{ offsetPath: `path("${pathD}")` }}
                        />
                      </motion.g>
                    )
                  })}

                  {/* === FLOW DASHES on hierarchy lines === */}
                  <motion.line
                    x1={PRESIDENT.x} y1={PRESIDENT.y + 30} x2={VP_OPS.x + 90} y2={VP_OPS.y}
                    stroke="#B55AC7" strokeWidth={1.5} strokeDasharray="4 16"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ strokeDashoffset: -100, opacity: 0.3 }}
                    transition={{ opacity: { delay: 2, duration: 1 }, strokeDashoffset: { duration: 3, repeat: Infinity, ease: 'linear'} }}
                  />
                  <motion.line
                    x1={PRESIDENT.x} y1={PRESIDENT.y + 30} x2={ACAD_DIR.x - 90} y2={ACAD_DIR.y}
                    stroke="#8D4AE8" strokeWidth={1.5} strokeDasharray="4 16"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ strokeDashoffset: -100, opacity: 0.3 }}
                    transition={{ opacity: { delay: 2, duration: 1 }, strokeDashoffset: { duration: 3, repeat: Infinity, ease: 'linear'} }}
                  />

                  {/* === OPS SUB-TEAM LINES === */}
                  {opsSubTeams.map((_, i) => {
                    const startX = VP_OPS.x + 90; const startY = VP_OPS.y + 55;
                    const endX = 80 + i * 130; const endY = 310;
                    return (
                      <motion.g key={`ops-line-${i}`}>
                        <motion.line
                          x1={startX} y1={startY} x2={endX} y2={endY}
                          stroke="rgba(255,255,255,0.08)" strokeWidth={1}
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 1.4 + i * 0.1, ease: appleEase }}
                          style={{ opacity: isAcadHovered ? 0.02 : 1, transition: 'opacity 0.3s' }}
                        />
                        <motion.circle
                          r={2} fill="#A3A3A3"
                          initial={{ opacity: 0, offsetDistance: '0%' }}
                          animate={{ opacity: [0, 1, 0], offsetDistance: '100%' }}
                          transition={{ duration: 2, delay: 2.5 + i * 0.4, repeat: Infinity, ease: 'linear' }}
                          style={{ offsetPath: `path("M ${startX} ${startY} L ${endX} ${endY}")`, opacity: isAcadHovered ? 0 : 1 }}
                        />
                      </motion.g>
                    )
                  })}

                  {/* === ACAD SUB-TEAM LINES === */}
                  {acadSubTeams.map((_, i) => {
                    const startX = ACAD_DIR.x - 90; const startY = ACAD_DIR.y + 55;
                    const endX = 560 + i * 130; const endY = 310;
                    return (
                      <motion.g key={`acad-line-${i}`}>
                        <motion.line
                          x1={startX} y1={startY} x2={endX} y2={endY}
                          stroke="rgba(141,74,232,0.15)" strokeWidth={1}
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 1.4 + i * 0.1, ease: appleEase }}
                          style={{ opacity: isOpsHovered ? 0.02 : 1, transition: 'opacity 0.3s' }}
                        />
                        <motion.circle
                          r={2} fill="#8D4AE8"
                          initial={{ opacity: 0, offsetDistance: '0%' }}
                          animate={{ opacity: [0, 1, 0], offsetDistance: '100%' }}
                          transition={{ duration: 2, delay: 2.7 + i * 0.4, repeat: Infinity, ease: 'linear' }}
                          style={{ offsetPath: `path("M ${startX} ${startY} L ${endX} ${endY}")`, opacity: isOpsHovered ? 0 : 1 }}
                        />
                      </motion.g>
                    )
                  })}
                </motion.g>
              )}
            </AnimatePresence>
          </svg>

          {/* HTML NODES OVERLAY */}
          <div className="absolute inset-0 z-20">
            {/* PHASE 0-1: Legacy nodes */}
            <AnimatePresence>
              {phase < 2 && (
                [
                  {x: 100, y: 50, label: 'Events'}, {x: 300, y: 80, label: 'Projects'}, {x: 500, y: 40, label: 'PR'},
                  {x: 700, y: 90, label: 'Marketing'}, {x: 200, y: 160, label: 'Workshops'}, {x: 450, y: 180, label: 'Admin'},
                  {x: 650, y: 200, label: 'Social'}, {x: 150, y: 280, label: 'Web'}, {x: 350, y: 300, label: 'Logistics'},
                  {x: 600, y: 320, label: 'Research?'}
                ].map((node, i) => {
                  const driftX = phase === 1 ? (Math.random() - 0.5) * 100 : 0;
                  const driftY = phase === 1 ? (Math.random() - 0.5) * 100 + 50 : 0;
                  const rot = phase === 1 ? (Math.random() - 0.5) * 20 : 0;

                  return (
                    <motion.div 
                      key={`legacy-html-${i}`}
                      className="absolute flex items-center justify-center rounded-md pointer-events-none"
                      style={{
                        left: node.x, top: node.y, width: 100, height: 35,
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                      animate={{ 
                        x: driftX, y: driftY, rotate: rot,
                        opacity: phase === 1 ? [1, 0] : 0.4
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      <span className="text-[12px] text-white/30 font-inter">{node.label}</span>
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>

            {/* PHASE 3: AIRIS 2.0 Nodes */}
            <AnimatePresence>
              {phase === 3 && (
                <>
                  {/* ═══ EXECUTIVE CORE ═══ */}

                  {/* President */}
                  <motion.div
                    layoutId="node-core"
                    className="absolute rounded-xl flex flex-col items-center justify-center"
                    style={{
                      left: PRESIDENT.x - 100, top: PRESIDENT.y, width: 200, height: 60,
                      background: 'rgba(181,90,199,0.12)',
                      border: '1.5px solid #B55AC7',
                      boxShadow: '0 0 20px rgba(181,90,199,0.15)',
                    }}
                    initial={{ opacity: 0, y: -40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: appleEase }}
                  >
                    <span className="font-space font-semibold text-[16px] text-white">President</span>
                    <span className="font-inter text-[11px] text-[#B55AC7] uppercase tracking-wider mt-0.5">AIRIS Core</span>
                  </motion.div>

                  {/* Vice President */}
                  <motion.div
                    layoutId="node-ops-pillar"
                    className="absolute rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                    style={{
                      left: VP_OPS.x, top: VP_OPS.y, width: 180, height: 55,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(163,163,163,0.3)',
                      boxShadow: isOpsHovered ? '0 0 16px rgba(163,163,163,0.15)' : 'none',
                    }}
                    initial={{ opacity: 0, x: 60, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
                    onMouseEnter={() => setHoveredNode('ops')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <span className="font-space font-semibold text-[14px] text-white">Vice President</span>
                    <span className="font-inter text-[11px] text-[#A3A3A3] mt-0.5">Operations Pillar</span>
                  </motion.div>

                  {/* Academic Director */}
                  <motion.div
                    layoutId="node-acad-pillar"
                    className="absolute rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                    style={{
                      left: ACAD_DIR.x - 180, top: ACAD_DIR.y, width: 180, height: 55,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(141,74,232,0.4)',
                      boxShadow: isAcadHovered ? '0 0 16px rgba(141,74,232,0.25)' : 'none',
                    }}
                    initial={{ opacity: 0, x: -60, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
                    onMouseEnter={() => setHoveredNode('acad')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <span className="font-space font-semibold text-[14px] text-white">Academic Director</span>
                    <span className="font-inter text-[11px] text-[#8D4AE8] opacity-80 mt-0.5">Academic Pillar</span>
                  </motion.div>

                  {/* Secretary — Communication Hub */}
                  <motion.div
                    className="absolute rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                    style={{
                      left: SECRETARY.x - 95, top: SECRETARY.y, width: 190, height: 50,
                      background: isSecHovered ? 'rgba(181,90,199,0.06)' : 'rgba(181,90,199,0.025)',
                      border: '1px solid rgba(181,90,199,0.2)',
                      boxShadow: isSecHovered ? '0 0 20px rgba(181,90,199,0.12)' : 'none',
                      borderStyle: 'dashed',
                    }}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
                    onMouseEnter={() => setHoveredNode('sec')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <span className="font-space font-semibold text-[13px] text-white">Secretary</span>
                    <span className="font-inter text-[10px] text-[#B55AC7] opacity-70 mt-0.5">Executive Coordination</span>
                  </motion.div>

                  {/* ═══ OPS SUB-TEAMS ═══ */}
                  {opsSubTeams.map((team, i) => {
                    const endX = 80 + i * 130
                    const endY = 310
                    return (
                      <motion.div
                        key={`ops-div-${i}`}
                        layoutId={`morph-card-ops-${i}`}
                        className="absolute rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300"
                        style={{
                          left: endX - 55, top: endY, width: 110, height: 44,
                          background: hoveredNode === `ops-${i}` ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          opacity: isAcadHovered ? 0.3 : 1
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isAcadHovered ? 0.3 : 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 + i * 0.1, ease: appleEase }}
                        onMouseEnter={() => setHoveredNode(`ops-${i}`)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <span className="font-inter text-[11px] text-white/80 text-center px-2">{team}</span>
                      </motion.div>
                    )
                  })}

                  {/* ═══ ACAD SUB-TEAMS ═══ */}
                  {acadSubTeams.map((team, i) => {
                    const endX = 560 + i * 130
                    const endY = 310
                    return (
                      <motion.div
                        key={`acad-div-${i}`}
                        layoutId={`morph-card-acad-${i}`}
                        className="absolute rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300"
                        style={{
                          left: endX - 60, top: endY, width: 120, height: 44,
                          background: hoveredNode === `acad-${i}` ? 'rgba(141,74,232,0.08)' : 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(141,74,232,0.15)',
                          opacity: isOpsHovered ? 0.3 : 1
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isOpsHovered ? 0.3 : 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 + i * 0.1, ease: appleEase }}
                        onMouseEnter={() => setHoveredNode(`acad-${i}`)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <span className="font-inter text-[11px] text-white/80 text-center px-2">{team}</span>
                      </motion.div>
                    )
                  })}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
