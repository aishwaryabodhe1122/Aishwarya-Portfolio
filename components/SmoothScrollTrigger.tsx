'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface SmoothScrollTriggerProps {
  children: ReactNode
  start?: string
  end?: string
  className?: string
}

const SmoothScrollTrigger = ({ 
  children, 
  start = 'top bottom',
  end = 'bottom top',
  className = '' 
}: SmoothScrollTriggerProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [start, end] as any
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default SmoothScrollTrigger
