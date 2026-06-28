import { motion } from 'framer-motion'
import { useState } from 'react'
import AnimatedLabel, { AnimatedHeadline } from '../ui/AnimatedText.jsx'

const appleEase = [0.16, 1, 0.3, 1]

const opsSubTeams = ['Events & Logistics', 'Design & Media', 'Community & Outreach']
const acadSubTeams = ['Learning Tracks', 'Research Groups', 'Projects & Publications']

export default function SlideArchitecture({ isActive }) {
  const [hoveredNode, setHoveredNode] = useState(null)

  if (!isActive) return null

  const isOpsHovered = hoveredNode === 'ops' || (hoveredNode && hoveredNode.startsWith('ops-'))
  const isAcadHovered = hoveredNode === 'acad' || (hoveredNode && hoveredNode.startsWith('acad-'))

  return (
    <div className="slide">
      {/* Radar pulse background */}
      <div className="absolute inset-0 flex items-center z-0" style={{ justifyContent: 'center', paddingTop: '10%' }}>
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 1.6],
            }}
            transition={{
              duration: 4,
              delay: 3.2 + i * 0.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="slide-content">
        <AnimatedLabel text="THE NEW STRUCTURE" />

        <AnimatedHeadline className="text-[64px] font-bold leading-tight mb-10" delay={0.3}>
          AIRIS 2.0 Architecture
        </AnimatedHeadline>

        {/* Architecture SVG Diagram */}
        <div className="flex justify-center">
          <svg width="900" height="380" viewBox="0 0 900 380">
            {/* ===== AIRIS CORE NODE ===== */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: appleEase }}
              style={{ transformOrigin: '450px 40px' }}
            >
              <rect
                x={350} y={10} width={200} height={60} rx={12}
                fill="rgba(181,90,199,0.12)"
                stroke="#B55AC7"
                strokeWidth={1.5}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(181,90,199,0.15))',
                }}
              />
              <motion.rect
                x={350} y={10} width={200} height={60} rx={12}
                fill="none"
                stroke="#B55AC7"
                strokeWidth={1.5}
                strokeOpacity={0.3}
                animate={{
                  strokeOpacity: [0.15, 0.4, 0.15],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text
                x={450} y={46}
                textAnchor="middle"
                fill="white"
                fontFamily="Space Grotesk"
                fontWeight={600}
                fontSize={16}
              >
                AIRIS Core
              </text>
            </motion.g>

            {/* ===== BRANCH LINES ===== */}
            {/* Core to Operations */}
            <motion.line
              x1={400} y1={70} x2={250} y2={140}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.4, ease: appleEase }}
              style={{
                opacity: isAcadHovered ? 0.04 : isOpsHovered ? 0.25 : 0.12,
                transition: 'opacity 0.3s',
              }}
            />
            {/* Core to Academic */}
            <motion.line
              x1={500} y1={70} x2={650} y2={140}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.4, ease: appleEase }}
              style={{
                opacity: isOpsHovered ? 0.04 : isAcadHovered ? 0.25 : 0.12,
                transition: 'opacity 0.3s',
              }}
            />

            {/* ===== Animated data flow dashes ===== */}
            <motion.line
              x1={400} y1={70} x2={250} y2={140}
              stroke="#B55AC7"
              strokeWidth={1}
              strokeDasharray="4 12"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -100 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 3.4 }}
              opacity={0.15}
            />
            <motion.line
              x1={500} y1={70} x2={650} y2={140}
              stroke="#8D4AE8"
              strokeWidth={1}
              strokeDasharray="4 12"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -100 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 3.4 }}
              opacity={0.15}
            />

            {/* ===== OPERATIONS PILLAR ===== */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8, ease: appleEase }}
              style={{ transformOrigin: '250px 165px', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredNode('ops')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                x={160} y={140} width={180} height={55} rx={10}
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(163,163,163,0.2)"
                strokeWidth={1}
                style={{
                  filter: isOpsHovered ? 'drop-shadow(0 0 12px rgba(163,163,163,0.1))' : 'none',
                  transition: 'filter 0.3s',
                }}
              />
              <text x={210} y={172} fill="white" fontFamily="Space Grotesk" fontWeight={600} fontSize={14}>
                ⚙ Operations
              </text>
            </motion.g>

            {/* ===== ACADEMIC PILLAR ===== */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8, ease: appleEase }}
              style={{ transformOrigin: '650px 165px', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredNode('acad')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                x={560} y={140} width={180} height={55} rx={10}
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(141,74,232,0.3)"
                strokeWidth={1}
                style={{
                  filter: isAcadHovered ? 'drop-shadow(0 0 12px rgba(141,74,232,0.15))' : 'none',
                  transition: 'filter 0.3s',
                }}
              />
              <text x={610} y={172} fill="white" fontFamily="Space Grotesk" fontWeight={600} fontSize={14}>
                🔬 Academic
              </text>
            </motion.g>

            {/* ===== OPS SUB-BRANCHES ===== */}
            {opsSubTeams.map((team, i) => {
              const startX = 250
              const startY = 195
              const endX = 130 + i * 120
              const endY = 260

              return (
                <motion.g key={`ops-${i}`}>
                  <motion.line
                    x1={startX} y1={startY} x2={endX} y2={endY}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 + i * 0.1, ease: appleEase }}
                    style={{
                      opacity: isAcadHovered ? 0.02 : 1,
                      transition: 'opacity 0.3s',
                    }}
                  />
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.6 + i * 0.08, ease: appleEase }}
                    onMouseEnter={() => setHoveredNode(`ops-${i}`)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x={endX - 60} y={endY} width={120} height={40} rx={8}
                      fill="rgba(255,255,255,0.02)"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth={0.8}
                      style={{
                        opacity: isAcadHovered ? 0.3 : 1,
                        transition: 'opacity 0.3s',
                      }}
                    />
                    <text
                      x={endX} y={endY + 25}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.7)"
                      fontFamily="Inter"
                      fontSize={11}
                      style={{
                        opacity: isAcadHovered ? 0.3 : 1,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      {team}
                    </text>
                  </motion.g>
                </motion.g>
              )
            })}

            {/* ===== ACAD SUB-BRANCHES ===== */}
            {acadSubTeams.map((team, i) => {
              const startX = 650
              const startY = 195
              const endX = 530 + i * 120
              const endY = 260

              return (
                <motion.g key={`acad-${i}`}>
                  <motion.line
                    x1={startX} y1={startY} x2={endX} y2={endY}
                    stroke="rgba(141,74,232,0.12)"
                    strokeWidth={1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 + i * 0.1, ease: appleEase }}
                    style={{
                      opacity: isOpsHovered ? 0.02 : 1,
                      transition: 'opacity 0.3s',
                    }}
                  />
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.6 + i * 0.08, ease: appleEase }}
                    onMouseEnter={() => setHoveredNode(`acad-${i}`)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x={endX - 65} y={endY} width={130} height={40} rx={8}
                      fill="rgba(255,255,255,0.02)"
                      stroke="rgba(141,74,232,0.1)"
                      strokeWidth={0.8}
                      style={{
                        opacity: isOpsHovered ? 0.3 : 1,
                        transition: 'opacity 0.3s',
                      }}
                    />
                    <text
                      x={endX} y={endY + 25}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.7)"
                      fontFamily="Inter"
                      fontSize={11}
                      style={{
                        opacity: isOpsHovered ? 0.3 : 1,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      {team}
                    </text>
                  </motion.g>
                </motion.g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}
