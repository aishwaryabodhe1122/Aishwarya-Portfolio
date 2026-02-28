'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useInView } from 'react-intersection-observer'
import { 
  FaReact, 
  FaNodeJs, 
  FaAws, 
  FaPython, 
  FaGitAlt, 
  FaDatabase,
  FaJs,
  FaAngular
} from 'react-icons/fa'
import { 
  SiMongodb, 
  SiExpress, 
  SiMysql, 
  SiTypescript,
  SiNextdotjs,
  SiGooglecloud
} from 'react-icons/si'

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [animatedSkills, setAnimatedSkills] = useState(false)

  // Default hardcoded data
  const defaultTechnicalSkills = [
    { name: 'JavaScript', level: 90, icon: FaJs, color: '#f7df1e' },
    { name: 'React.js', level: 88, icon: FaReact, color: '#61dafb' },
    { name: 'Node.js', level: 85, icon: FaNodeJs, color: '#339933' },
    { name: 'Python', level: 82, icon: FaPython, color: '#3776ab' },
    { name: 'Angular', level: 80, icon: FaAngular, color: '#dd0031' },
    { name: 'MongoDB', level: 85, icon: SiMongodb, color: '#47a248' },
    { name: 'MySQL', level: 83, icon: SiMysql, color: '#4479a1' },
    { name: 'AWS', level: 78, icon: FaAws, color: '#ff9900' },
    { name: 'GCP', level: 85, icon: SiGooglecloud, color: '#4285f4' },
    { name: 'Express.js', level: 87, icon: SiExpress, color: '#000000' },
    { name: 'TypeScript', level: 80, icon: SiTypescript, color: '#3178c6' },
    { name: 'Next.js', level: 82, icon: SiNextdotjs, color: '#000000' },
    { name: 'Git', level: 88, icon: FaGitAlt, color: '#f05032' },
  ]

  const defaultSoftSkills = [
    { name: 'Leadership', level: 85 },
    { name: 'Communication', level: 90 },
    { name: 'Problem Solving', level: 92 },
    { name: 'Team Collaboration', level: 88 },
    { name: 'Project Management', level: 80 },
    { name: 'Agile Methodologies', level: 85 },
  ]

  // Default categories
  const defaultCategories = [
    {
      title: 'Frontend Development',
      skills: ['React.js', 'Next.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
      icon: FaReact,
      color: '#61dafb'
    },
    {
      title: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Python', 'RESTful APIs', 'Microservices'],
      icon: FaNodeJs,
      color: '#339933'
    },
    {
      title: 'Database & Cloud',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'AWS', 'GCP', 'Cloud Architecture', 'CI/CD'],
      icon: FaDatabase,
      color: '#47a248'
    },
    {
      title: 'Tools & Methodologies',
      skills: ['Git', 'GitHub', 'Docker', 'Agile', 'Unit Testing', 'Code Reviews', 'System Design'],
      icon: FaGitAlt,
      color: '#f05032'
    },
  ]

  // State for dynamic data
  const [technicalSkills, setTechnicalSkills] = useState(defaultTechnicalSkills)
  const [softSkills, setSoftSkills] = useState(defaultSoftSkills)
  const [categories, setCategories] = useState(defaultCategories)

  useEffect(() => {
    if (inView && !animatedSkills) {
      setTimeout(() => setAnimatedSkills(true), 500)
    }
  }, [inView, animatedSkills])

  useEffect(() => {
    // Fetch skills from admin API
    fetch('/api/portfolio/skills')
      .then(res => res.json())
      .then(data => {
        // Only update if we have actual data from admin
        if (data && Array.isArray(data) && data.length > 0) {
          const technical = data.filter((skill: any) => skill.category === 'technical')
          const soft = data.filter((skill: any) => skill.category === 'soft')
          
          if (technical.length > 0) {
            const updatedTechnical = technical.map((skill: any) => {
              // Find matching default skill for icon
              const defaultSkill = defaultTechnicalSkills.find(s => 
                s.name.toLowerCase() === skill.name.toLowerCase()
              )
              return {
                name: skill.name,
                level: skill.proficiency || 80,
                icon: defaultSkill?.icon || FaDatabase,
                color: skill.color || defaultSkill?.color || '#6366f1'
              }
            })
            setTechnicalSkills(updatedTechnical)
          }
          
          if (soft.length > 0) {
            const updatedSoft = soft.map((skill: any) => ({
              name: skill.name,
              level: skill.proficiency || 80
            }))
            setSoftSkills(updatedSoft)
          }
        }
        // If empty array or no data, keep using default hardcoded skills
      })
      .catch(err => {
        console.log('Using default skills data', err)
        // Keep using default hardcoded skills on error
      })
  }, [])

  useEffect(() => {
    // Fetch skill categories from admin API
    fetch('/api/portfolio/skill-categories')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          // Map icon names to actual icon components
          const iconMap: any = {
            FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaAws, FaPython, FaJs, FaAngular
          }
          const updatedCategories = data.map((cat: any) => ({
            title: cat.title,
            skills: cat.skills,
            icon: iconMap[cat.icon] || FaDatabase,
            color: cat.color
          }))
          setCategories(updatedCategories)
        }
      })
      .catch(err => {
        console.log('Using default skill categories', err)
      })
  }, [])

  return (
    <section id="skills" className="section-padding bg-pattern">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="display-2 fw-bold mb-3">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="lead text-muted">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </Col>
        </Row>

        {/* Skill Categories */}
        <Row className="g-4 mb-5">
          {categories.map((category, index) => (
            <Col lg={6} key={index}>
              <Card className={`card-custom h-100 hover-lift ${inView ? 'animate-fadeInUp' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="skill-category-icon me-3" style={{ color: category.color }}>
                      <category.icon className="fs-2" />
                    </div>
                    <h4 className="h5 fw-bold mb-0">{category.title}</h4>
                  </div>
                  <div className="skill-tags">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Technical & Soft Skills Combined */}
        <Row className="justify-content-center">
          <Col lg={12}>
            <div ref={ref}>
              <h3 className="h2 fw-bold mb-5 text-center">
                <span className="gradient-text">Technical Proficiency</span>
              </h3>
              
              {/* Staggered Grid Layout */}
              <div className="skills-masonry">
                {technicalSkills.map((skill, index) => (
                  <div 
                    key={index}
                    className={`skill-hexagon ${inView ? 'skill-visible' : ''}`}
                    style={{ 
                      animationDelay: `${index * 0.08}s`,
                      '--skill-color': skill.color
                    } as any}
                  >
                    <div className="hexagon-inner">
                      <div className="skill-glow" style={{ background: skill.color }}></div>
                      <skill.icon 
                        className="skill-icon-new" 
                        style={{ color: skill.color }}
                      />
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="h2 fw-bold mb-5 mt-5 text-center">
                <span className="gradient-text">Soft Skills</span>
              </h3>
              
              {/* Soft Skills - Animated Pills */}
              <div className="soft-skills-container">
                {softSkills.map((skill, index) => (
                  <div 
                    key={index}
                    className={`soft-skill-pill ${inView ? 'pill-visible' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="pill-shine"></div>
                    <span className="pill-text">{skill.name}</span>
                    <div className="pill-dot"></div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .skill-category-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
          color: #6366f1;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 0.875rem;
          font-weight: 600;
          border: 1px solid rgba(99, 102, 241, 0.2);
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.25));
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        /* New Masonry Grid Layout */
        .skills-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 25px;
          padding: 20px 0;
        }

        /* Hexagon/Circular Skill Cards */
        .skill-hexagon {
          opacity: 0;
          transform: scale(0.5) rotate(-180deg);
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .skill-hexagon.skill-visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        .hexagon-inner {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s ease;
          border: 3px solid rgba(99, 102, 241, 0.3);
        }

        .hexagon-inner:hover {
          transform: translateY(-10px) scale(1.05);
          border-color: var(--skill-color);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4),
                      0 0 60px var(--skill-color);
        }

        /* Glow Effect */
        .skill-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;
          filter: blur(20px);
          transition: opacity 0.4s ease;
        }

        .hexagon-inner:hover .skill-glow {
          opacity: 0.4;
        }

        /* Pulse Animation */
        .skill-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid var(--skill-color);
          opacity: 0;
          animation: pulse 2s infinite;
        }

        .hexagon-inner:hover .skill-pulse {
          opacity: 1;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        /* Icon Styling */
        .skill-icon-new {
          font-size: 2.5rem;
          margin-bottom: 8px;
          filter: drop-shadow(0 0 10px currentColor);
          transition: all 0.3s ease;
          z-index: 1;
        }

        .hexagon-inner:hover .skill-icon-new {
          transform: scale(1.2) rotate(360deg);
          filter: drop-shadow(0 0 20px currentColor);
        }

        /* Skill Name */
        .skill-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          text-align: center;
          z-index: 1;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        /* Soft Skills Container */
        .soft-skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
          padding: 20px 0;
        }

        /* Animated Pills */
        .soft-skill-pill {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 15px 30px;
          border-radius: 50px;
          cursor: pointer;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .soft-skill-pill.pill-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .soft-skill-pill:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6),
                      0 0 40px rgba(118, 75, 162, 0.5);
        }

        /* Shine Effect */
        .pill-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .soft-skill-pill:hover .pill-shine {
          left: 100%;
        }

        /* Pill Text */
        .pill-text {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        /* Animated Dot */
        .pill-dot {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 0.3;
            transform: translateY(-50%) scale(0.8);
          }
        }

        @media (max-width: 768px) {
          .skills-masonry {
            grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
            gap: 15px;
          }

          .hexagon-inner {
            width: 110px;
            height: 110px;
          }

          .skill-icon-new {
            font-size: 2rem;
          }

          .skill-name {
            font-size: 0.75rem;
          }

          .soft-skill-pill {
            padding: 12px 24px;
          }

          .pill-text {
            font-size: 0.9rem;
          }

          .skill-category-icon {
            width: 50px;
            height: 50px;
          }
          
          .skill-tag {
            font-size: 0.75rem;
            padding: 6px 12px;
          }
        }
      `}</style>
    </section>
  )
}

export default Skills
