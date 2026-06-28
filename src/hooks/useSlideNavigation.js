import { useState, useEffect, useCallback, useRef } from 'react'

const TOTAL_SLIDES = 14

export function useSlideNavigation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCounter, setShowCounter] = useState(false)
  const counterTimeout = useRef(null)
  const lastScrollTime = useRef(0)

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return
    if (index < 0 || index >= TOTAL_SLIDES) return
    if (index === currentSlide) return

    setDirection(index > currentSlide ? 1 : -1)
    setIsTransitioning(true)
    setCurrentSlide(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 1200)
  }, [currentSlide, isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false))
    }
  }, [])

  const flashCounter = useCallback(() => {
    setShowCounter(true)
    if (counterTimeout.current) clearTimeout(counterTimeout.current)
    counterTimeout.current = setTimeout(() => setShowCounter(false), 2000)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          nextSlide()
          flashCounter()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevSlide()
          flashCounter()
          break
        case 'ArrowDown':
          e.preventDefault()
          nextSlide()
          flashCounter()
          break
        case 'ArrowUp':
          e.preventDefault()
          prevSlide()
          flashCounter()
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, toggleFullscreen, flashCounter])

  // Scroll/wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime.current < 1000) return
      lastScrollTime.current = now

      if (e.deltaY > 0) {
        nextSlide()
      } else if (e.deltaY < 0) {
        prevSlide()
      }
      flashCounter()
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [nextSlide, prevSlide, flashCounter])

  // Mouse movement shows counter
  useEffect(() => {
    const handleMouseMove = () => flashCounter()
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [flashCounter])

  return {
    currentSlide,
    totalSlides: TOTAL_SLIDES,
    isTransitioning,
    isFullscreen,
    showCounter,
    nextSlide,
    prevSlide,
    goToSlide,
    toggleFullscreen,
    progress: ((currentSlide + 1) / TOTAL_SLIDES) * 100,
    direction
  }
}
