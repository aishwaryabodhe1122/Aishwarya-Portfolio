'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useInView } from 'react-intersection-observer'
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa'

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Default hardcoded data
  const defaultExperiences = [
    {
      type: 'work',
      title: 'Full-stack Developer',
      company: 'PluginLive',
      location: 'Pune, India',
      period: 'Aug 2025 - Feb 2026',
      description: 'Building and maintaining Assessment and ATS (Applicant Tracking System) for student onboarding and placement management',
      achievements: [
        'Developing comprehensive assessment platform for student evaluation',
        'Building ATS system to streamline recruitment and placement processes',
        'Creating responsive web applications with modern React.js architecture',
        'Implementing robust backend APIs using Node.js and PostgreSQL',
        'Designing scalable database schemas for student and placement data',
        'Optimizing application performance and user experience',
        'Collaborating with cross-functional teams for feature development'
      ],
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'JavaScript', 'REST APIs', 'Git'],
      icon: FaBriefcase,
      color: '#10b981'
    },
    {
      type: 'work',
      title: 'Software Engineer',
      company: 'Accenture',
      location: 'Pune, India',
      period: 'Dec 2022 - July 2025',
      description: 'Led full-stack development initiatives and cloud-based solutions',
      achievements: [
        'Developed and maintained 10+ web applications using MEAN/MERN stacks',
        'Boosted data-handling efficiency by 30% and enhanced overall performance',
        'Designed and deployed scalable, cloud-based solutions using AWS services',
        'Created responsive, dynamic UI components achieving 98% user satisfaction',
        'Led Agile development initiatives, reducing project turnaround time by 15%',
        'Enhanced application functionality with SharePoint Framework (SPFx)',
        'Improved software quality by raising unit test coverage from 60% to 85%'
      ],
      technologies: ['React.js', 'Angular', 'Node.js', 'Express.js', 'MongoDB', 'AWS', 'SPFx'],
      icon: FaBriefcase,
      color: '#6366f1'
    }
  ]

  const defaultEducation = [
    {
      type: 'education',
      title: 'MBA in Artificial Intelligence & Machine Learning',
      company: 'D.Y. Patil Centre for Online Learning',
      location: 'Pune, India',
      period: 'July 2023 - Aug 2025',
      description: 'Specializing in AI/ML with focus on practical applications in software development',
      achievements: [
        'Achieved overall CGPA of 8.7',
        'Focusing on AI/ML integration in software solutions',
        'Advanced coursework in machine learning algorithms and data science'
      ],
      technologies: ['Python', 'Machine Learning', 'Data Science', 'AI Algorithms'],
      icon: FaGraduationCap,
      color: '#8b5cf6'
    },
    {
      type: 'education',
      title: 'Bachelor of Engineering - Information Technology',
      company: 'Bharati Vidyapeeth College of Engineering for Women',
      location: 'Pune, India',
      period: 'Aug 2018 - July 2022',
      description: 'Strong foundation in computer science and software engineering principles',
      achievements: [
        'Graduated with CGPA of 8.37',
        'Demonstrated consistent academic excellence',
        'Strong foundation in programming and system design',
        'Active participation in technical projects and competitions'
      ],
      technologies: ['Java', 'C++', 'Data Structures', 'Algorithms', 'Database Systems'],
      icon: FaGraduationCap,
      color: '#06b6d4'
    }
  ]

  // State for dynamic data
  const [experiences, setExperiences] = useState(defaultExperiences)
  const [education, setEducation] = useState(defaultEducation)

  useEffect(() => {
    // Fetch experience and education from admin API
    fetch('/api/portfolio/experience')
      .then(res => res.json())
      .then(data => {
        // Only update if we have actual admin data
        if (data && Array.isArray(data) && data.length > 0) {
          const workExp = data.filter((item: any) => item.type === 'work')
          const eduExp = data.filter((item: any) => item.type === 'education')

          if (workExp.length > 0) {
            // Helper function to normalize any date format to YYYY-MM
            const normalizeToYYYYMM = (dateStr: string | null) => {
              if (!dateStr || dateStr === 'Present') return null
              
              // Already in YYYY-MM format
              if (/^\d{4}-\d{2}$/.test(dateStr)) {
                return dateStr
              }
              
              // Parse "Month YYYY" or "Month Year" format
              const date = new Date(dateStr)
              if (!isNaN(date.getTime())) {
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                return `${year}-${month}`
              }
              
              return null // Invalid format
            }
            
            // Helper function to format YYYY-MM to "Month YYYY"
            const formatDate = (dateStr: string) => {
              if (!dateStr) return ''
              const [year, month] = dateStr.split('-')
              const date = new Date(parseInt(year), parseInt(month) - 1)
              return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            }

            const updatedWork = workExp.map((item: any) => {
              const normalizedStart = normalizeToYYYYMM(item.startDate)
              const normalizedEnd = normalizeToYYYYMM(item.endDate)
              
              return {
                type: 'work',
                title: item.title,
                company: item.company,
                location: item.location,
                period: `${formatDate(normalizedStart || item.startDate)} - ${normalizedEnd ? formatDate(normalizedEnd) : 'Present'}`,
                description: item.description,
                achievements: item.achievements || [],
                technologies: item.technologies || [],
                icon: FaBriefcase,
                color: '#6366f1',
                rawStartDate: normalizedStart, // Normalized YYYY-MM for sorting
                rawEndDate: normalizedEnd      // Normalized YYYY-MM for sorting
              }
            })
            // Sort by end date (latest first), then by start date
            const sortedWork = updatedWork.sort((a: any, b: any) => {
              // Handle Present items first (using raw dates)
              const aIsPresent = !a.rawEndDate || a.rawEndDate === ''
              const bIsPresent = !b.rawEndDate || b.rawEndDate === ''
              
              if (aIsPresent && !bIsPresent) return -1 // a is Present, comes first
              if (!aIsPresent && bIsPresent) return 1  // b is Present, comes first
              if (aIsPresent && bIsPresent) {
                // Both Present, sort by start date (latest first)
                const aStart = a.rawStartDate.replace('-', '')
                const bStart = b.rawStartDate.replace('-', '')
                return bStart.localeCompare(aStart)
              }
              
              // Both have end dates, compare them (latest first)
              if (a.rawEndDate !== b.rawEndDate) {
                // Convert YYYY-MM to comparable number (e.g., "2025-08" -> "202508")
                const aEnd = a.rawEndDate.replace('-', '')
                const bEnd = b.rawEndDate.replace('-', '')
                return bEnd.localeCompare(aEnd)
              }
              
              // Same end date, compare start dates (latest first)
              const aStart = a.rawStartDate.replace('-', '')
              const bStart = b.rawStartDate.replace('-', '')
              return bStart.localeCompare(aStart)
            })
            setExperiences(sortedWork)
          }

          if (eduExp.length > 0) {
            // Helper function to normalize any date format to YYYY-MM
            const normalizeToYYYYMM = (dateStr: string | null) => {
              if (!dateStr || dateStr === 'Present') return null
              
              // Already in YYYY-MM format
              if (/^\d{4}-\d{2}$/.test(dateStr)) {
                return dateStr
              }
              
              // Parse "Month YYYY" or "Month Year" format
              const date = new Date(dateStr)
              if (!isNaN(date.getTime())) {
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                return `${year}-${month}`
              }
              
              return null // Invalid format
            }
            
            // Helper function to format YYYY-MM to "Month YYYY"
            const formatDate = (dateStr: string) => {
              if (!dateStr) return ''
              
              // Check if already formatted (contains space or non-numeric characters)
              if (dateStr.includes(' ') || !/^\d{4}-\d{2}$/.test(dateStr)) {
                return dateStr
              }
              
              // Parse YYYY-MM format
              const [year, month] = dateStr.split('-')
              const yearNum = parseInt(year)
              const monthNum = parseInt(month)
              
              // Validate
              if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
                return dateStr // Return as-is if invalid
              }
              
              const date = new Date(yearNum, monthNum - 1, 1)
              return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            }

            const updatedEdu = eduExp.map((item: any) => {
              const normalizedStart = normalizeToYYYYMM(item.startDate)
              const normalizedEnd = normalizeToYYYYMM(item.endDate)
              
              return {
                type: 'education',
                title: item.title,
                company: item.company,
                location: item.location,
                period: `${formatDate(normalizedStart || item.startDate)} - ${normalizedEnd ? formatDate(normalizedEnd) : 'Present'}`,
                description: item.description,
                achievements: item.achievements || [],
                technologies: item.technologies || [],
                icon: FaGraduationCap,
                color: '#8b5cf6',
                rawStartDate: normalizedStart, // Normalized YYYY-MM for sorting
                rawEndDate: normalizedEnd      // Normalized YYYY-MM for sorting
              }
            })
            // Sort by end date (latest first), then by start date
            const sortedEdu = updatedEdu.sort((a: any, b: any) => {
              console.log('=== Comparing ===')
              console.log('A:', a.title, '| rawEndDate:', a.rawEndDate, '| rawStartDate:', a.rawStartDate)
              console.log('B:', b.title, '| rawEndDate:', b.rawEndDate, '| rawStartDate:', b.rawStartDate)
              
              // Handle Present items first (using raw dates)
              const aIsPresent = !a.rawEndDate || a.rawEndDate === ''
              const bIsPresent = !b.rawEndDate || b.rawEndDate === ''
              
              if (aIsPresent && !bIsPresent) {
                console.log('→ A is Present, comes first (-1)')
                return -1
              }
              if (!aIsPresent && bIsPresent) {
                console.log('→ B is Present, comes first (1)')
                return 1
              }
              if (aIsPresent && bIsPresent) {
                const aStart = a.rawStartDate.replace('-', '')
                const bStart = b.rawStartDate.replace('-', '')
                console.log('→ Both Present, comparing starts:', bStart, 'vs', aStart)
                return bStart.localeCompare(aStart)
              }
              
              // Both have end dates, compare them (latest first)
              if (a.rawEndDate !== b.rawEndDate) {
                const aEnd = a.rawEndDate.replace('-', '')
                const bEnd = b.rawEndDate.replace('-', '')
                console.log('→ Comparing end dates:', bEnd, '(', b.rawEndDate, ') vs', aEnd, '(', a.rawEndDate, ')')
                console.log('→ Result:', bEnd.localeCompare(aEnd))
                return bEnd.localeCompare(aEnd)
              }
              
              // Same end date, compare start dates (latest first)
              const aStart = a.rawStartDate.replace('-', '')
              const bStart = b.rawStartDate.replace('-', '')
              console.log('→ Same end date, comparing starts:', bStart, 'vs', aStart)
              return bStart.localeCompare(aStart)
            })
            console.log('Final order:', sortedEdu.map(e => e.title))
            setEducation(sortedEdu)
          }
        }
        // Otherwise keep using default hardcoded data
      })
      .catch(err => {
        console.log('Using default experience data', err)
        // Keep using default hardcoded data on error
      })
  }, [])

  return (
    <section id="experience" className="section-padding bg-light">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="display-2 fw-bold mb-3">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="lead text-muted">
              Professional experience and educational background that shaped my expertise
            </p>
          </Col>
        </Row>

        {/* Side by Side Layout for Large Screens */}
        <Row className="justify-content-center" ref={ref}>
          {/* Experience Section */}
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="section-header mb-4">
              <h3 className="h3 fw-bold text-center mb-2">
                <FaBriefcase className="me-2 text-primary" />
                Professional Experience
              </h3>
              <div className="section-divider mx-auto"></div>
            </div>
            <div className="timeline experience-timeline">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`timeline-item ${inView ? 'animate-fadeInLeft' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Card className="card-custom hover-lift">
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-start">
                        <div className="timeline-icon-small me-3 flex-shrink-0">
                          <exp.icon className="fs-4" style={{ color: exp.color }} />
                        </div>

                        <div className="flex-grow-1">
                          <div className="mb-2">
                            <h5 className="h5 fw-bold mb-1">{exp.title}</h5>
                            <h6 className="h6 text-primary mb-1">{exp.company}</h6>
                            <div className="d-flex flex-column text-muted small mb-2">
                              <span className="d-flex align-items-center mb-1">
                                <FaCalendarAlt className="me-2" />
                                {exp.period}
                              </span>
                              <span className="d-flex align-items-center">
                                <FaMapMarkerAlt className="me-2" />
                                {exp.location}
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <ul className="achievement-list-compact">
                              {Array.isArray(exp.description) ? (
                                exp.description.map((desc, descIndex) => (
                                  <li key={descIndex} className="text-muted small mb-1">
                                    {desc}
                                  </li>
                                ))
                              ) : (
                                <li className="text-muted small mb-1">{exp.description}</li>
                              )}
                            </ul>
                          </div>

                          <h6 className="fw-semibold small mb-2 d-flex align-items-center">
                            <FaTrophy className="me-1 text-warning" />
                            Key Achievements
                          </h6>
                          <div className="achievements mb-2">
                            <ul className="achievement-list-compact">
                              {exp.achievements.slice(0, 4).map((achievement, achIndex) => (
                                <li key={achIndex} className="text-muted small mb-1">
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="technologies">
                            <div className="d-flex flex-wrap gap-1">
                              {exp.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="tech-badge-small"
                                  style={{
                                    background: `${exp.color}15`,
                                    color: exp.color,
                                    border: `1px solid ${exp.color}30`
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </Col>

          {/* Education Section */}
          <Col lg={6}>
            <div className="section-header mb-4">
              <h3 className="h3 fw-bold text-center mb-2">
                <FaGraduationCap className="me-2 text-primary" />
                Educational Background
              </h3>
              <div className="section-divider mx-auto"></div>
            </div>
            <div className="timeline education-timeline">
              {education.map((exp, index) => (
                <div
                  key={index}
                  className={`timeline-item ${inView ? 'animate-fadeInRight' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Card className="card-custom hover-lift">
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-start">
                        <div className="timeline-icon-small me-3 flex-shrink-0">
                          <exp.icon className="fs-4" style={{ color: exp.color }} />
                        </div>

                        <div className="flex-grow-1">
                          <div className="mb-2">
                            <h5 className="h5 fw-bold mb-1">{exp.title}</h5>
                            <h6 className="h6 text-primary mb-1">{exp.company}</h6>
                            <div className="d-flex flex-column text-muted small mb-2">
                              <span className="d-flex align-items-center mb-1">
                                <FaCalendarAlt className="me-2" />
                                {exp.period}
                              </span>
                              <span className="d-flex align-items-center">
                                <FaMapMarkerAlt className="me-2" />
                                {exp.location}
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <ul className="achievement-list-compact">
                              {Array.isArray(exp.description) ? (
                                exp.description.map((desc, descIndex) => (
                                  <li key={descIndex} className="text-muted small mb-1">
                                    {desc}
                                  </li>
                                ))
                              ) : (
                                <li className="text-muted small mb-1">{exp.description}</li>
                              )}
                            </ul>
                          </div>

                          <h6 className="fw-semibold small mb-2 d-flex align-items-center">
                            <FaTrophy className="me-1 text-warning" />
                            Key Highlights
                          </h6>
                          <div className="achievements mb-2">
                            <ul className="achievement-list-compact">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="text-muted small mb-1">
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="technologies">
                            <div className="d-flex flex-wrap gap-1">
                              {exp.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="tech-badge-small"
                                  style={{
                                    background: `${exp.color}15`,
                                    color: exp.color,
                                    border: `1px solid ${exp.color}30`
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .section-header {
          margin-bottom: 2rem;
        }

        .section-divider {
          width: 60px;
          height: 3px;
          background: var(--gradient-primary);
          border-radius: 2px;
        }

        .timeline {
          position: relative;
          padding-left: 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 30px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--gradient-primary);
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 2rem;
          padding-left: 80px;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: 18px;
          top: 20px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 4px solid var(--primary-color);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
          z-index: 2;
        }

        .timeline-icon {
          position: absolute;
          left: -65px;
          top: 15px;
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          z-index: 3;
        }

        .timeline-icon-small {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
        }

        .achievement-list {
          list-style: none;
          padding-left: 0;
        }

        .achievement-list li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 8px;
        }

        .achievement-list li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-weight: bold;
        }

        .achievement-list-compact {
          list-style: none;
          padding-left: 0;
        }

        .achievement-list-compact li {
          position: relative;
          padding-left: 15px;
          margin-bottom: 4px;
        }

        .achievement-list-compact li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-weight: bold;
          font-size: 0.8rem;
        }

        .tech-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tech-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .tech-badge-small {
          padding: 4px 8px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tech-badge-small:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 991px) {
          /* Stack columns on tablets and below */
          .timeline::before {
            left: 20px;
            width: 2px;
          }

          .timeline-item {
            padding-left: 60px;
          }

          .timeline-item::before {
            left: 12px;
            width: 16px;
            height: 16px;
            top: 15px;
          }

          .timeline-icon-small {
            position: absolute;
            left: -45px;
            top: 10px;
            width: 35px;
            height: 35px;
          }

          .tech-badge-small {
            font-size: 0.7rem;
            padding: 3px 6px;
          }
        }

        @media (max-width: 768px) {
          .timeline {
            padding-left: 0;
          }

          .timeline::before {
            left: 15px;
            width: 2px;
          }

          .timeline-item {
            padding-left: 50px;
            margin-bottom: 1.5rem;
          }

          .timeline-item::before {
            left: 8px;
            width: 14px;
            height: 14px;
            top: 12px;
          }

          .timeline-icon {
            position: absolute;
            left: -35px;
            top: 8px;
            width: 30px;
            height: 30px;
          }

          .timeline-icon-small {
            position: absolute;
            left: -35px;
            top: 8px;
            width: 30px;
            height: 30px;
          }

          .tech-badge {
            font-size: 0.75rem;
            padding: 4px 8px;
          }

          .tech-badge-small {
            font-size: 0.65rem;
            padding: 2px 5px;
          }

          .display-2 {
            font-size: 2rem;
          }

          .section-header h3 {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 576px) {
          .d-flex.justify-content-between {
            flex-direction: column;
          }

          .text-end {
            text-align: left !important;
            margin-top: 10px;
          }

          .timeline-icon-small {
            width: 28px;
            height: 28px;
          }

          .achievement-list-compact li {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Experience
