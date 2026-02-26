'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedIconProps {
  children: ReactNode
  className?: string
  hoverScale?: number
  hoverRotate?: number
  tapScale?: number
}

const AnimatedIcon = ({ 
  children, 
  className = '',
  hoverScale = 1.2,
  hoverRotate = 0,
  tapScale = 0.9
}: AnimatedIconProps) => {
  return (
    <motion.div
      className={`animated-icon ${className}`}
      whileHover={{ 
        scale: hoverScale,
        rotate: hoverRotate,
        transition: { type: 'spring', stiffness: 300, damping: 10 }
      }}
      whileTap={{ scale: tapScale }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedIcon
