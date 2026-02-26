'use client'

import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="spinner-dot"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.p
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Loading...
      </motion.p>

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: var(--bg-primary);
          transition: background-color 0.3s ease;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid var(--bg-secondary);
          border-top-color: var(--primary-color);
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .spinner-dot {
          width: 100%;
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 50%;
        }

        .loading-text {
          font-size: 1.2rem;
          color: var(--text-primary);
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner
