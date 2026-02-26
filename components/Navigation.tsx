'use client'

import { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaCode, FaBars, FaTimes } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '@/context/ThemeContext'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (target: string) => {
    setExpanded(false)
    const element = document.getElementById(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`transition-all duration-300 ${
        scrolled 
          ? (theme === 'dark' ? 'navbar-scrolled-dark' : 'navbar-scrolled-light')
          : 'bg-transparent'
      }`}
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand 
          href="#home" 
          className="d-flex align-items-center fw-bold fs-4"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('home')
          }}
        >
          {/* <FaCode className="me-2 gradient-text" /> */}
          <span className={scrolled ? (theme === 'dark' ? 'text-white' : 'text-dark') : 'text-white'}>
            Aishwarya Bodhe
          </span>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          className="border-0"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <FaTimes className={scrolled ? (theme === 'dark' ? 'text-white' : 'text-dark') : 'text-white'} />
          ) : (
            <FaBars className={scrolled ? (theme === 'dark' ? 'text-white' : 'text-dark') : 'text-white'} />
          )}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {[
              { href: 'home', label: 'Home' },
              { href: 'about', label: 'About' },
              { href: 'skills', label: 'Skills' },
              { href: 'experience', label: 'Experience' },
              { href: 'projects', label: 'Projects' },
              { href: 'contact', label: 'Contact' },
            ].map((item) => (
              <Nav.Link
                key={item.href}
                href={`#${item.href}`}
                className={`mx-2 fw-500 position-relative nav-link-custom ${
                  scrolled ? (theme === 'dark' ? 'text-white' : 'text-dark') : 'text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
              >
                {item.label}
              </Nav.Link>
            ))}
            <div className="d-flex align-items-center gap-3">
              <ThemeToggle />
              <Nav.Link
                href="/resume.pdf"
                target="_blank"
                className="d-flex align-items-center"
              >
                <button className="btn-primary-custom">
                  Download CV
                </button>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        .navbar {
          padding: 1rem 0;
          transition: all 0.3s ease;
        }

        .navbar-scrolled-light {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .navbar-scrolled-dark {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .navbar-brand {
          display: flex;
          align-items: center;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          height: 40px;
        }

        .nav-link-custom {
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          height: 40px;
        }

        .navbar-nav .nav-link {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
        }

        .btn-primary-custom {
          margin: 0;
          padding: 0.5rem 1rem;
          line-height: 1;
        }

        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link-custom:hover::after {
          width: 100%;
        }

        .nav-link-custom:hover {
          color: #6366f1 !important;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            background: ${theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
            backdrop-filter: blur(10px);
            border-radius: 15px;
            margin-top: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, ${theme === 'dark' ? '0.5' : '0.1'});
          }

          .nav-link-custom {
            color: ${theme === 'dark' ? '#f1f5f9' : '#1f2937'} !important;
            padding: 10px 0;
            border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          }

          .nav-link-custom:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </Navbar>
  )
}

export default Navigation