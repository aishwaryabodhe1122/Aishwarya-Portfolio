'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ParallaxHeroProps {
  children: ReactNode
}

const ParallaxHero = ({ children }: ParallaxHeroProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <div ref={ref} className="parallax-hero-container">
      {/* Background Layer - Slowest */}
      <motion.div
        className="parallax-background"
        style={{
          y: backgroundY,
          scale: scale,
        }}
      />

      {/* Content Layer - Fastest */}
      <motion.div
        className="parallax-content"
        style={{
          y: textY,
          opacity: opacity,
        }}
      >
        {children}
      </motion.div>

      <style jsx>{`
        .parallax-hero-container {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }

        .parallax-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .parallax-content {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  )
}

export default ParallaxHero
