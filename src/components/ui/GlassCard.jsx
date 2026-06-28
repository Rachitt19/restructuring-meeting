import { motion } from 'framer-motion'

const appleEase = [0.16, 1, 0.3, 1]

export default function GlassCard({
  children,
  className = '',
  purple = false,
  hoverGlow = false,
  hoverTilt = false,
  delay = 0,
  style = {},
  onClick,
}) {
  const baseClass = purple ? 'glass-card-purple' : 'glass-card'

  return (
    <motion.div
      className={`${baseClass} ${className}`}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: appleEase }}
      whileHover={
        hoverTilt
          ? {
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: hoverGlow
                ? '0 0 30px rgba(181,90,199,0.1)'
                : '0 4px 20px rgba(0,0,0,0.3)',
              rotateX: 2,
              rotateY: -2,
              transition: { duration: 0.3 },
            }
          : {
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: hoverGlow
                ? '0 0 30px rgba(181,90,199,0.1)'
                : undefined,
              transition: { duration: 0.3 },
            }
      }
      style={{
        perspective: hoverTilt ? 1000 : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
