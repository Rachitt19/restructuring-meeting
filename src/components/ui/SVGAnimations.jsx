import { motion } from 'framer-motion'

/**
 * SVG line that draws itself from left to right.
 */
export function DrawLine({
  x1, y1, x2, y2,
  stroke = 'rgba(255,255,255,0.15)',
  strokeWidth = 1.5,
  delay = 0,
  duration = 0.6,
}) {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={length}
      strokeDashoffset={length}
      initial={{ strokeDashoffset: length }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

/**
 * SVG path that draws itself.
 */
export function DrawPath({
  d,
  stroke = 'rgba(255,255,255,0.15)',
  strokeWidth = 1.5,
  delay = 0,
  duration = 0.8,
  fill = 'none',
  pathLength: customLength,
}) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

/**
 * SVG rectangle that draws its border.
 */
export function DrawRect({
  x, y, width, height, rx = 16,
  stroke = 'rgba(181,90,199,0.12)',
  strokeWidth = 1,
  delay = 0,
  duration = 1,
  fill = 'none',
}) {
  const perimeter = 2 * (width + height) + (rx ? -8 * rx + 2 * Math.PI * rx : 0)

  return (
    <motion.rect
      x={x} y={y} width={width} height={height} rx={rx}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeDasharray={perimeter}
      strokeDashoffset={perimeter}
      initial={{ strokeDashoffset: perimeter, opacity: 0 }}
      animate={{ strokeDashoffset: 0, opacity: 1 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

/**
 * SVG circle that draws itself.
 */
export function DrawCircle({
  cx, cy, r,
  stroke = 'rgba(255,255,255,0.15)',
  strokeWidth = 1.5,
  delay = 0,
  duration = 0.6,
  fill = 'none',
}) {
  const circumference = 2 * Math.PI * r

  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeDasharray={circumference}
      strokeDashoffset={circumference}
      initial={{ strokeDashoffset: circumference, opacity: 0 }}
      animate={{ strokeDashoffset: 0, opacity: 1 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

/**
 * Animated flowing dots along an SVG path (data flow effect).
 */
export function FlowingDot({
  path,
  delay = 0,
  duration = 3,
  size = 3,
  color = 'rgba(181,90,199,0.3)',
}) {
  return (
    <motion.circle
      r={size}
      fill={color}
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: '100%' }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        offsetPath: `path("${path}")`,
        willChange: 'offset-distance',
      }}
    />
  )
}
