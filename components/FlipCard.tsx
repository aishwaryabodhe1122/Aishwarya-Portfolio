'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
}

const FlipCard = ({ front, back, className = '' }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`flip-card-container ${className}`}>
      <motion.div
        className="flip-card"
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flip-card-front" style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <div 
          className="flip-card-back" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </motion.div>

      <style jsx>{`
        .flip-card-container {
          perspective: 1000px;
          cursor: pointer;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}

export default FlipCard
