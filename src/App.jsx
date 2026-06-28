import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSlideNavigation } from './hooks/useSlideNavigation.js'

import ParticleCanvas from './components/ambient/ParticleCanvas.jsx'
import CursorGlow from './components/ambient/CursorGlow.jsx'
import LoadingScreen from './components/ui/LoadingScreen.jsx'

import SlideWelcome from './components/slides/SlideWelcome.jsx'
import SlideWhyRestructure from './components/slides/SlideWhyRestructure.jsx'
import SlideChallenges from './components/slides/SlideChallenges.jsx'
import SlideLessons from './components/slides/SlideLessons.jsx'
import SlidePrinciples from './components/slides/SlidePrinciples.jsx'
import SlideArchitecture from './components/slides/SlideArchitecture.jsx'
import SlideOperations from './components/slides/SlideOperations.jsx'
import SlideAcademic from './components/slides/SlideAcademic.jsx'
import SlideAccountability from './components/slides/SlideAccountability.jsx'
import SlideRoadmap from './components/slides/SlideRoadmap.jsx'
import SlideResearch from './components/slides/SlideResearch.jsx'
import SlideRecruitment from './components/slides/SlideRecruitment.jsx'
import SlideVision from './components/slides/SlideVision.jsx'
import SlideClosing from './components/slides/SlideClosing.jsx'

const appleEase = [0.16, 1, 0.3, 1]

const slides = [
  SlideWelcome,
  SlideWhyRestructure,
  SlideChallenges,
  SlideLessons,
  SlidePrinciples,
  SlideArchitecture,
  SlideOperations,
  SlideAcademic,
  SlideAccountability,
  SlideRoadmap,
  SlideResearch,
  SlideRecruitment,
  SlideVision,
  SlideClosing,
]

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const {
    currentSlide,
    totalSlides,
    showCounter,
    progress,
  } = useSlideNavigation()

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  // Determine particle density/opacity per slide
  const particleDensity = currentSlide === 12 ? 1.5 : 1 // Vision slide = denser
  const particleOpacity = currentSlide === 0 ? 0.6 : 1 // Welcome = dimmer initially

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: '#050505' }}>
      {/* Loading screen */}
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Ambient layers (always present) */}
      {isLoaded && (
        <>
          <ParticleCanvas
            densityMultiplier={particleDensity}
            opacityMultiplier={particleOpacity}
          />
          <CursorGlow />
          <div className="noise-overlay" />
        </>
      )}

      {/* Slide content */}
      {isLoaded && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{
              enter: { duration: 0.8, ease: appleEase },
              exit: { duration: 0.6, ease: appleEase },
              duration: 0.8,
              ease: appleEase,
            }}
          >
            {slides.map((SlideComponent, index) => (
              <SlideComponent
                key={index}
                isActive={index === currentSlide}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Progress bar */}
      {isLoaded && (
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Slide counter */}
      {isLoaded && (
        <div
          className="slide-counter"
          style={{ opacity: showCounter ? 1 : 0 }}
        >
          {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
      )}
    </div>
  )
}
