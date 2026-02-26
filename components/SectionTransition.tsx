'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface SectionTransitionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const SectionTransition = ({ 
  children, 
  delay = 0,
  direction = 'up'
}: SectionTransitionProps) => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  }

  return (
    <motion.div
      ref={ref}
      initial={hasAnimated ? false : {
        opacity: 0,
        ...directionOffset[direction]
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{
        duration: hasAnimated ? 0 : 0.6,
        delay: hasAnimated ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

export default SectionTransition
