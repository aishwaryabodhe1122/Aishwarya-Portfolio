'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
  zIndex?: number
}

const ParallaxLayer = ({ 
  children, 
  speed = 0.5, 
  className = '',
  zIndex = 1
}: ParallaxLayerProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <motion.div 
      ref={ref} 
      style={{ y, opacity, zIndex, position: 'relative' }} 
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxLayer
