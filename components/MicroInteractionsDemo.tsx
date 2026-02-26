'use client'

import { useState } from 'react'
import RippleButton from './RippleButton'
import AnimatedIcon from './AnimatedIcon'
import SkeletonLoader from './SkeletonLoader'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

const MicroInteractionsDemo = () => {
  const [showSkeleton, setShowSkeleton] = useState(false)

  return (
    <div className="micro-interactions-demo p-5">
      <div className="container">
        <h2 className="gradient-text mb-4">Micro-interactions Demo</h2>
        
        <div className="row g-4">
          {/* Ripple Buttons */}
          <div className="col-md-6">
            <h4 className="mb-3">Ripple Buttons</h4>
            <div className="d-flex gap-3 flex-wrap">
              <RippleButton variant="primary">
                Primary Button
              </RippleButton>
              <RippleButton variant="outline">
                Outline Button
              </RippleButton>
              <RippleButton>
                Default Button
              </RippleButton>
            </div>
          </div>

          {/* Animated Icons */}
          <div className="col-md-6">
            <h4 className="mb-3">Animated Icons</h4>
            <div className="d-flex gap-4">
              <AnimatedIcon hoverScale={1.3} hoverRotate={15}>
                <FaGithub size={40} className="text-primary" />
              </AnimatedIcon>
              <AnimatedIcon hoverScale={1.3} hoverRotate={-15}>
                <FaLinkedin size={40} className="text-primary" />
              </AnimatedIcon>
              <AnimatedIcon hoverScale={1.4}>
                <FaEnvelope size={40} className="text-primary" />
              </AnimatedIcon>
              <AnimatedIcon hoverScale={1.5} hoverRotate={360}>
                <FaHeart size={40} className="text-danger" />
              </AnimatedIcon>
            </div>
          </div>

          {/* Skeleton Loaders */}
          <div className="col-12">
            <h4 className="mb-3">Loading Skeletons</h4>
            <RippleButton 
              variant="primary" 
              onClick={() => setShowSkeleton(!showSkeleton)}
            >
              {showSkeleton ? 'Hide' : 'Show'} Skeleton Loaders
            </RippleButton>
            
            {showSkeleton && (
              <div className="mt-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <SkeletonLoader variant="card" height={200} />
                  </div>
                  <div className="col-md-4">
                    <SkeletonLoader variant="circular" width={100} />
                    <SkeletonLoader variant="text" count={3} className="mt-3" />
                  </div>
                  <div className="col-md-4">
                    <SkeletonLoader variant="rectangular" height={150} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MicroInteractionsDemo
