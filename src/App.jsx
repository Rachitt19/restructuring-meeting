import { useState, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
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
    direction // Need this for direction-aware transitions
  } = useSlideNavigation()

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  // Dynamic ambient layer controls
  const particleDensity = currentSlide === 12 ? 1.5 : 1
  const particleOpacity = currentSlide === 0 ? 0.6 : 1

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: '#050505' }}>
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}

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

      {isLoaded && (
        <LayoutGroup>
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              initial={(dir) => ({ 
                opacity: 0, 
                scale: dir > 0 ? 0.95 : 1.05, 
                z: dir > 0 ? -100 : 100,
                filter: 'blur(12px)'
              })}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                z: 0,
                filter: 'blur(0px)'
              }}
              exit={(dir) => ({ 
                opacity: 0, 
                scale: dir > 0 ? 1.05 : 0.95,
                z: dir > 0 ? 100 : -100,
                filter: 'blur(12px)'
              })}
              transition={{
                duration: 1.2,
                ease: appleEase,
              }}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
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
        </LayoutGroup>
      )}

      {isLoaded && (
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            layoutId="global-progress"
            animate={{ width: `${progress}%` }}
            transition={{ ease: appleEase, duration: 0.8 }}
          />
        </div>
      )}

      {isLoaded && (
        <div
          className="slide-counter"
          style={{ opacity: showCounter ? 1 : 0, transition: 'opacity 0.6s ease' }}
        >
          {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
      )}
    </div>
  )
}
