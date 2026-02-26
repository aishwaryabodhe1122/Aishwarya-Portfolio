'use client'

import { motion } from 'framer-motion'
import { ReactNode, MouseEvent, useState } from 'react'

interface RippleButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'outline' | 'default'
  type?: 'button' | 'submit' | 'reset'
}

interface Ripple {
  x: number
  y: number
  id: number
}

const RippleButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'default',
  type = 'button'
}: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      x,
      y,
      id: Date.now()
    }

    setRipples([...ripples, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) {
      onClick()
    }
  }

  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary-custom'
      case 'outline':
        return 'btn-outline-custom'
      default:
        return ''
    }
  }

  return (
    <motion.button
      type={type}
      className={`ripple-button ${getVariantClass()} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      <style jsx>{`
        .ripple-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          width: 20px;
          height: 20px;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        .ripple-button:active {
          transform: scale(0.95);
        }
      `}</style>
    </motion.button>
  )
}

export default RippleButton
