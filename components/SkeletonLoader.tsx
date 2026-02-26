'use client'

import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  className?: string
  count?: number
}

const SkeletonLoader = ({ 
  variant = 'rectangular',
  width = '100%',
  height = 20,
  className = '',
  count = 1
}: SkeletonLoaderProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return {
          width: width,
          height: height,
          borderRadius: '4px'
        }
      case 'circular':
        return {
          width: width,
          height: width,
          borderRadius: '50%'
        }
      case 'rectangular':
        return {
          width: width,
          height: height,
          borderRadius: '8px'
        }
      case 'card':
        return {
          width: width,
          height: height || 300,
          borderRadius: '20px'
        }
      default:
        return {
          width: width,
          height: height,
          borderRadius: '4px'
        }
    }
  }

  const skeletons = Array.from({ length: count }, (_, i) => i)

  return (
    <>
      {skeletons.map((index) => (
        <motion.div
          key={index}
          className={`skeleton ${className}`}
          style={getVariantStyles()}
          animate={{
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--bg-secondary) 25%,
            var(--bg-primary) 50%,
            var(--bg-secondary) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          margin-bottom: 10px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        [data-theme="dark"] .skeleton {
          background: linear-gradient(
            90deg,
            rgba(30, 41, 59, 0.8) 25%,
            rgba(51, 65, 85, 0.8) 50%,
            rgba(30, 41, 59, 0.8) 75%
          );
          background-size: 200% 100%;
        }
      `}</style>
    </>
  )
}

export default SkeletonLoader
