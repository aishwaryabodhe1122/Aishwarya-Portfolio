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

  useEffect(() => {
    if (inView && !animatedSkills) {
      setTimeout(() => setAnimatedSkills(true), 500)
    }
  }, [inView, animatedSkills])

  const technicalSkills = [
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

  const softSkills = [
    { name: 'Leadership', level: 85 },
    { name: 'Communication', level: 90 },
    { name: 'Problem Solving', level: 92 },
    { name: 'Team Collaboration', level: 88 },
    { name: 'Project Management', level: 80 },
    { name: 'Agile Methodologies', level: 85 },
  ]

  const categories = [
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

        <Row>
          {/* Technical Skills */}
          <Col lg={8} className="mb-5 mb-lg-0">
            <div ref={ref}>
              <h3 className="h3 fw-bold mb-4">Technical Proficiency</h3>
              <Row className="g-4">
                {technicalSkills.map((skill, index) => (
                  <Col md={6} key={index}>
                    <div className={`skill-item ${inView ? 'animate-fadeInLeft' : ''}`}
                         style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="d-flex align-items-center mb-2">
                        <skill.icon 
                          className="me-2 fs-5" 
                          style={{ color: skill.color }}
                        />
                        <span className="fw-semibold">{skill.name}</span>
                        <span className="ms-auto text-muted">{skill.level}%</span>
                      </div>
                      <div className="progress-custom">
                        <div 
                          className="progress-bar-custom"
                          style={{ 
                            width: animatedSkills ? `${skill.level}%` : '0%',
                            background: `linear-gradient(90deg, ${skill.color}20, ${skill.color})`
                          }}
                        ></div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          {/* Soft Skills */}
          <Col lg={4}>
            <h3 className="h3 fw-bold mb-4">Soft Skills</h3>
            <div className="soft-skills">
              {softSkills.map((skill, index) => (
                <div key={index} className={`soft-skill-item ${inView ? 'animate-fadeInRight' : ''}`}
                     style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">{skill.name}</span>
                    <span className="text-muted">{skill.level}%</span>
                  </div>
                  <div className="progress-custom">
                    <div 
                      className="progress-bar-custom"
                      style={{ 
                        width: animatedSkills ? `${skill.level}%` : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .skill-category-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .skill-item {
          margin-bottom: 1.5rem;
        }

        .soft-skill-item {
          margin-bottom: 1.5rem;
        }

        .progress-custom {
          height: 8px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.1);
          overflow: hidden;
        }

        .progress-bar-custom {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 10px;
          transition: width 1.5s ease-in-out;
          position: relative;
        }

        .progress-bar-custom::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @media (max-width: 768px) {
          .skill-category-icon {
            width: 50px;
            height: 50px;
          }
          
          .skill-tag {
            font-size: 0.75rem;
            padding: 4px 8px;
          }
          
          .display-2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Skills