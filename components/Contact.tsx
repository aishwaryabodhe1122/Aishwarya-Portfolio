'use client'

import { Container, Row, Col, Card } from 'react-bootstrap'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaClock, FaDownload } from 'react-icons/fa'
import { SiGmail, SiGithub, SiLinkedin } from 'react-icons/si'
import AnimatedIcon from './AnimatedIcon'

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'aishwaryabodhe1122@gmail.com',
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=aishwaryabodhe1122@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Aishwarya,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards',
      color: '#6366f1'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+91 8317206235',
      link: 'tel:+918317206235',
      color: '#22c55e'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Hinjewadi Phase-1, Pune, Maharashtra',
      link: 'https://maps.google.com/?q=Hinjewadi+Phase-1,+Pune,+Maharashtra,+India+411057',
      color: '#f59e0b'
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/aishwarya-bodhe',
      link: 'https://linkedin.com/in/aishwarya-bodhe',
      color: '#0077b5'
    }
  ]


  return (
    <section id="contact" className="section-padding bg-light">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="display-2 fw-bold mb-3">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="lead text-muted">
              Ready to collaborate on your next project? Let's discuss how we can work together
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center" ref={ref}>
          <Col lg={10}>
            <Row className="g-4">
              {/* Contact Information Cards */}
              {contactInfo.map((info, index) => (
                <Col md={6} lg={3} key={index}>
                  <a 
                    href={info.link}
                    target={info.title === 'LinkedIn' || info.title === 'Location' || info.title === 'Email' ? '_blank' : undefined}
                    rel={info.title === 'LinkedIn' || info.title === 'Location' || info.title === 'Email' ? 'noopener noreferrer' : undefined}
                    className="contact-card-link"
                  >
                    <Card className={`contact-card h-100 ${inView ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <Card.Body className="text-center p-4 d-flex flex-column h-100">
                        <div className="contact-content flex-grow-1 d-flex flex-column justify-content-center">
                          <AnimatedIcon hoverScale={1.2} hoverRotate={10}>
                            <div className="contact-icon-large mb-3" style={{ color: info.color }}>
                              <info.icon />
                            </div>
                          </AnimatedIcon>
                          <h5 className="fw-bold mb-2">{info.title}</h5>
                          <p className="text-muted mb-0 contact-value">{info.value}</p>
                        </div>
                        <div className="contact-action-hint mt-auto">
                          <small className="text-primary fw-semibold">
                            {info.title === 'Email' ? 'Click to send email' : 
                             info.title === 'Phone' ? 'Click to call' :
                             info.title === 'Location' ? 'Click to view map' : 'Click to connect'}
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>

            {/* Professional Summary & CTA */}
            <Row className="mt-5">
              <Col lg={8} className="mx-auto">
                <Card className={`professional-summary ${inView ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.4s' }}>
                  <Card.Body className="p-4 p-lg-5 text-center">
                    <div className="availability-badge mb-4">
                      <FaClock className="me-2" />
                      Currently Available for New Projects
                    </div>
                    <h3 className="fw-bold mb-3">Ready to Collaborate?</h3>
                    <p className="lead text-muted mb-4">
                      I'm always interested in hearing about new opportunities, 
                      innovative projects, and ways to contribute to meaningful solutions. 
                      Whether you're looking for a full-stack developer or want to discuss 
                      a potential collaboration, I'd love to connect.
                    </p>
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                      <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=aishwaryabodhe1122@gmail.com&su=Let's%20Collaborate%20-%20Portfolio%20Inquiry&body=Hi%20Aishwarya,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20potential%20opportunity.%0D%0A%0D%0AProject%20Details:%0D%0A-%20%0D%0A%0D%0ABest%20regards"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-lg"
                      >
                        <FaEnvelope className="me-2" />
                        Start a Conversation
                      </a>
                      <a 
                        href="/resume.pdf"
                        target="_blank"
                        className="btn btn-outline-primary btn-lg"
                      >
                        <FaDownload className="me-2" />
                        Download Resume
                      </a>
                    </div>
                    
                    {/* Social Links */}
                    <div className="social-section mt-4">
                      <p className="text-muted mb-3">Connect with me on</p>
                      <div className="d-flex gap-3 justify-content-center">
                        <a 
                          href="https://github.com/aishwaryabodhe1122"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link-large github-link"
                          title="GitHub"
                        >
                          <SiGithub />
                        </a>
                        <a 
                          href="https://linkedin.com/in/aishwarya-bodhe"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link-large linkedin-link"
                          title="LinkedIn"
                        >
                          <SiLinkedin />
                        </a>
                        <a 
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=aishwaryabodhe1122@gmail.com&su=Let's%20Collaborate&body=Hi%20Aishwarya,%0D%0A%0D%0AI'd%20like%20to%20discuss%20a%20potential%20opportunity..."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link-large gmail-link"
                          title="Gmail"
                        >
                          <SiGmail />
                        </a>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .contact-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .contact-card-link:hover {
          text-decoration: none;
          color: inherit;
        }

        .contact-card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: white;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          min-height: 280px;
          display: flex;
          flex-direction: column;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .contact-card-link:hover .contact-card {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .contact-card-link:hover .contact-card::before {
          opacity: 1;
        }

        .contact-card-link:active .contact-card {
          transform: translateY(-4px) scale(1.01);
        }

        .contact-icon-large {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: rgba(99, 102, 241, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .contact-card-link:hover .contact-icon-large {
          background: var(--gradient-primary);
          color: white !important;
          transform: scale(1.15);
        }

        .contact-action-hint {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .contact-card-link:hover .contact-action-hint {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-content {
          min-height: 180px;
        }

        .contact-value {
          font-size: 0.85rem;
          line-height: 1.4;
          min-height: 2.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          word-break: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          padding: 0 8px;
        }

        .contact-action-hint {
          min-height: 20px;
        }

        .professional-summary {
          border: none;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .professional-summary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }

        .professional-summary .card-body {
          position: relative;
          z-index: 1;
        }

        .availability-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .social-link-large {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link-large:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .github-link {
          background: rgba(51, 51, 51, 0.1);
          color: #333;
        }

        .github-link:hover {
          background: #333;
          color: white;
        }

        .linkedin-link {
          background: rgba(0, 119, 181, 0.1);
          color: #0077b5;
        }

        .linkedin-link:hover {
          background: #0077b5;
          color: white;
        }

        .gmail-link {
          background: rgba(234, 67, 53, 0.1);
          color: #ea4335;
        }

        .gmail-link:hover {
          background: #ea4335;
          color: white;
        }

        .social-section {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 1.5rem;
        }

        @media (max-width: 768px) {
          .contact-icon-large {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }
          
          .social-link-large {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          
          .display-2 {
            font-size: 2rem;
          }
          
          .professional-summary .card-body {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact
