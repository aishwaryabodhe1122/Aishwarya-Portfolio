'use client'

import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowDown } from 'react-icons/fa'
import Image from 'next/image'

const Hero = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = [
    'Full Stack Developer',
    'MEAN/MERN Stack Expert',
    'AI/ML Enthusiast'
  ]

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const currentFullText = texts[currentIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
      } else {
        setCurrentText(
          isDeleting
            ? currentFullText.substring(0, currentText.length - 1)
            : currentFullText.substring(0, currentText.length + 1)
        )
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero-section position-relative overflow-hidden">
      {/* Animated Background */}
      <div className="hero-bg position-absolute w-100 h-100">
        <div className="floating-shapes">
          <div className="code-element code-brackets animate-move1">&lt;/&gt;</div>
          <div className="code-element terminal-symbol animate-move2">$</div>
          <div className="code-element database-icon animate-move3">⚡</div>
          <div className="code-element function-symbol animate-move4">{ }</div>
          <div className="code-element api-symbol animate-zigzag">API</div>
          <div className="code-element git-symbol animate-move1" style={{ animationDelay: '3s' }}>⚙</div>
          <div className="code-element react-symbol animate-move2" style={{ animationDelay: '1s' }}>⚛</div>
          <div className="code-element node-symbol animate-move3" style={{ animationDelay: '4s' }}>JS</div>
          <div className="code-element cloud-symbol animate-move4" style={{ animationDelay: '2s' }}>☁</div>
          <div className="code-element bug-symbol animate-zigzag" style={{ animationDelay: '5s' }}>🐛</div>
        </div>
      </div>

      <Container fluid className="position-relative z-index-2">
        <Row className="min-vh-100 align-items-center justify-content-start">
          <Col lg={10} xl={8} className="text-start ps-4 ps-lg-5">
            <div className="hero-content animate-fadeInUp">
              <div className="mb-3">
                <span className="badge-custom px-4 py-2 rounded-pill">
                  👋 Know About Me
                </span>
              </div>

              <h1 className="display-1 fw-bold mb-3 text-white">
                Hi, I'm{' '}
                <span className="gradient-text">Aishwarya</span>
              </h1>

              <div className="typing-container mb-4">
                <h2 className="display-2 text-white-50 mb-0">
                  I'm a{' '}
                  <span className="gradient-text-secondary">
                    {currentText}
                    <span className="typing-cursor">|</span>
                  </span>
                </h2>
              </div>

              <p className="lead text-white-75 mb-4 pe-lg-5">
                Software Engineer expert in JS/TS frameworks. AI Enthusiast working on AI/ML projects with modern high end technologies. Skilled in MEAN/MERN stack, AWS, and modern web technologies.
              </p>

              <div className="hero-buttons mb-4 d-flex flex-column flex-sm-row gap-3 justify-content-start align-items-start">
                <a href="#projects" className="btn-primary-custom">
                  View My Work
                </a>
                <a href="#contact" className="btn-outline-custom">
                  Let's Talk
                </a>
              </div>
              <div className="social-links d-flex justify-content-start gap-3">
                <a
                  href="https://github.com/aishwaryabodhe1122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/aishwarya-bodhe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=aishwaryabodhe1122@gmail.com&su=Portfolio%20Contact&body=Hi%20Aishwarya,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link email"
                >
                  <FaEnvelope />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link resume"
                >
                  <FaDownload />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Scroll Indicator */}
      <div className="scroll-indicator position-absolute bottom-0 start-50 translate-middle-x mb-4">
        <button
          onClick={scrollToAbout}
          className="scroll-btn bg-transparent border-0 text-white animate-bounce"
        >
          <FaArrowDown className="fs-4" />
        </button>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          background: var(--bg-dark);
          position: relative;
          padding-left: 0;
          margin-left: 0;
        }

        .hero-content {
          padding-left: 0;
          margin-left: 0;
        }

        .hero-section .container-fluid {
          padding-left: 0;
        }

        .hero-section .row {
          margin-left: 0;
        }

        .hero-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.2) 0%, transparent 50%);
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .code-element {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          font-family: 'Courier New', monospace;
          text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
        }

        .code-brackets {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          font-size: 24px;
        }

        .terminal-symbol {
          width: 60px;
          height: 60px;
          top: 60%;
          right: 10%;
          font-size: 28px;
          color: #00ff41;
        }

        .database-icon {
          width: 70px;
          height: 70px;
          top: 10%;
          right: 30%;
          font-size: 32px;
          color: #ffd700;
        }

        .function-symbol {
          width: 90px;
          height: 90px;
          bottom: 20%;
          left: 20%;
          font-size: 20px;
        }

        .api-symbol {
          width: 65px;
          height: 65px;
          top: 40%;
          left: 50%;
          font-size: 14px;
          font-weight: 700;
          color: #ff6b6b;
        }

        .git-symbol {
          width: 55px;
          height: 55px;
          bottom: 30%;
          right: 25%;
          font-size: 24px;
          color: #4ecdc4;
        }

        .react-symbol {
          width: 75px;
          height: 75px;
          top: 15%;
          left: 70%;
          font-size: 30px;
          color: #61dafb;
        }

        .node-symbol {
          width: 50px;
          height: 50px;
          bottom: 10%;
          right: 40%;
          font-size: 16px;
          font-weight: 700;
          color: #68a063;
        }

        .cloud-symbol {
          width: 85px;
          height: 85px;
          top: 70%;
          left: 30%;
          font-size: 28px;
          color: #87ceeb;
        }

        .bug-symbol {
          width: 45px;
          height: 45px;
          top: 35%;
          right: 15%;
          font-size: 20px;
        }

        .z-index-2 {
          z-index: 2;
        }

        .text-white-75 {
          color: rgba(255, 255, 255, 0.75);
        }

        .text-white-50 {
          color: rgba(255, 255, 255, 0.5);
        }

        .typing-container {
          white-space: nowrap;
          width: 100%;
          display: flex;
          justify-content: flex-start;
        }

        .typing-container h2 {
          white-space: nowrap;
          width: auto;
          min-width: fit-content;
          text-align: left;
        }

        .typing-cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes moveAround1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(200px, -100px) rotate(90deg); }
          50% { transform: translate(100px, 150px) rotate(180deg); }
          75% { transform: translate(-150px, 50px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        @keyframes moveAround2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-180px, 120px) rotate(-90deg); }
          50% { transform: translate(150px, -80px) rotate(-180deg); }
          75% { transform: translate(80px, 200px) rotate(-270deg); }
          100% { transform: translate(0, 0) rotate(-360deg); }
        }

        @keyframes moveAround3 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(250px, 100px) scale(1.2); }
          66% { transform: translate(-100px, -150px) scale(0.8); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes moveAround4 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          20% { transform: translate(120px, -200px) rotate(72deg) scale(1.1); }
          40% { transform: translate(-200px, -50px) rotate(144deg) scale(0.9); }
          60% { transform: translate(180px, 180px) rotate(216deg) scale(1.2); }
          80% { transform: translate(-80px, 100px) rotate(288deg) scale(0.8); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }

        @keyframes zigzag {
          0% { transform: translate(0, 0); }
          25% { transform: translate(300px, -50px); }
          50% { transform: translate(150px, 200px); }
          75% { transform: translate(-200px, 100px); }
          100% { transform: translate(0, 0); }
        }

        .animate-move1 {
          animation: moveAround1 25s ease-in-out infinite;
        }

        .animate-move2 {
          animation: moveAround2 30s ease-in-out infinite;
        }

        .animate-move3 {
          animation: moveAround3 22s ease-in-out infinite;
        }

        .animate-move4 {
          animation: moveAround4 35s ease-in-out infinite;
        }

        .animate-zigzag {
          animation: zigzag 28s ease-in-out infinite;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 50%;
          text-decoration: none;
          font-size: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 2px solid;
        }

        .social-link.github {
          border-color: white;
          color: white;
        }

        .social-link.linkedin {
          border-color: #0077b5;
          color: #0077b5;
        }

        .social-link.email {
          border-color: #ea4335;
          color: #ea4335;
        }

        .social-link.resume {
          border-color: #28a745;
          color: #28a745;
        }

        .social-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        .social-link.github:hover {
          background: #333;
          color: white;
        }

        .social-link.linkedin:hover {
          background: #0077b5;
          color: white;
        }

        .social-link.email:hover {
          background: #ea4335;
          color: white;
        }

        .social-link.resume:hover {
          background: #28a745;
          color: white;
        }

        .badge-custom {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border: 2px solid;
          border-image: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) 1;
          color: #ffffff;
          font-weight: 500;
          font-size: 0.9rem;
          display: inline-block;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          transition: all 0.3s ease;
        }

        .badge-custom:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        .image-container {
          max-width: 400px;
          margin: 0 auto;
        }

        .image-bg {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: var(--gradient-primary);
          border-radius: 50%;
          z-index: -1;
          opacity: 0.3;
        }

        .profile-image {
          border-radius: 50%;
          border: 5px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .profile-image:hover {
          transform: scale(1.05);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border-radius: 50%;
          pointer-events: none;
        }

        .scroll-btn {
          transition: all 0.3s ease;
        }

        .scroll-btn:hover {
          color: var(--primary-color) !important;
          transform: translateY(-3px);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 80px;
          }
          
          .display-1 {
            font-size: 2.5rem;
          }
          
          .display-2 {
            font-size: 1.8rem;
          }
          
          .typing-container {
            justify-content: flex-start;
          }
          
          .typing-container h2 {
            white-space: normal;
            word-break: keep-all;
            hyphens: none;
            text-align: left;
          }
          
          .profile-image {
            width: 300px;
            height: 300px;
          }
          
          .hero-buttons {
            text-align: left;
          }
          
          .social-links {
            text-align: left;
          }
        }

        @media (max-width: 480px) {
          .display-2 {
            font-size: 1.5rem;
          }
          
          .typing-container h2 {
            line-height: 1.2;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
