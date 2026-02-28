'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, ButtonGroup, Card } from 'react-bootstrap'
import { FaDownload, FaPrint, FaFileAlt, FaFilePdf, FaFileWord } from 'react-icons/fa'
import Navigation from '@/components/Navigation'
import { useTheme } from '@/context/ThemeContext'
import useSWR from 'swr'
import jsPDF from 'jspdf'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const ResumePage = () => {
  const { theme } = useTheme()
  const { data: resumeData, error } = useSWR('/api/portfolio/resume', fetcher)
  const { data: experienceData } = useSWR('/api/portfolio/experience', fetcher)
  const { data: skillsData } = useSWR('/api/portfolio/skills', fetcher)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  // Add class to body to force navbar background on resume page
  useEffect(() => {
    document.body.classList.add('resume-page-active')
    return () => {
      document.body.classList.remove('resume-page-active')
    }
  }, [])

  // Merge resume data with portfolio data
  const mergedData = {
    ...resumeData,
    experience: experienceData?.filter((item: any) => item.type === 'work') || [],
    education: experienceData?.filter((item: any) => item.type === 'education') || [],
    skills: {
      technical: skillsData?.filter((skill: any) => skill.category !== 'Soft Skills').map((s: any) => s.name) || [],
      soft: skillsData?.filter((skill: any) => skill.category === 'Soft Skills').map((s: any) => s.name) || []
    }
  }

  const templates = [
    { id: 'modern', name: 'Modern', color: '#6366f1' },
    { id: 'classic', name: 'Classic', color: '#22c55e' },
    { id: 'minimal', name: 'Minimal', color: '#8b5cf6' }
  ]

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000') => {
      pdf.setFontSize(fontSize)
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
      pdf.setTextColor(color)
      const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin)
      
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }
        pdf.text(line, margin, yPosition)
        yPosition += fontSize * 0.5
      })
      yPosition += 3
    }

    // Header
    addText(mergedData.personalInfo?.name || '', 24, true)
    addText(mergedData.personalInfo?.title || '', 14, false, '#6366f1')
    addText(`${mergedData.personalInfo?.email || ''} | ${mergedData.personalInfo?.phone || ''} | ${mergedData.personalInfo?.location || ''}`, 10)
    yPosition += 5

    // Summary
    if (mergedData.summary) {
      addText('PROFESSIONAL SUMMARY', 14, true, '#6366f1')
      addText(mergedData.summary, 10)
      yPosition += 3
    }

    // Experience
    if (mergedData.experience && mergedData.experience.length > 0) {
      addText('EXPERIENCE', 14, true, '#6366f1')
      mergedData.experience.forEach((exp: any) => {
        addText(exp.title, 12, true)
        addText(`${exp.company} | ${exp.period}`, 10)
        addText(exp.location, 10)
        if (exp.achievements) {
          exp.achievements.forEach((achievement: string) => {
            addText(`• ${achievement}`, 9)
          })
        }
        yPosition += 2
      })
    }

    // Education
    if (mergedData.education && mergedData.education.length > 0) {
      addText('EDUCATION', 14, true, '#6366f1')
      mergedData.education.forEach((edu: any) => {
        addText(edu.title, 12, true)
        addText(`${edu.company} | ${edu.period}`, 10)
        addText(edu.location, 10)
        yPosition += 2
      })
    }

    // Skills
    if (mergedData.skills) {
      addText('SKILLS', 14, true, '#6366f1')
      if (mergedData.skills.technical && mergedData.skills.technical.length > 0) {
        addText('Technical Skills:', 11, true)
        addText(mergedData.skills.technical.join(', '), 10)
      }
      if (mergedData.skills.soft && mergedData.skills.soft.length > 0) {
        addText('Soft Skills:', 11, true)
        addText(mergedData.skills.soft.join(', '), 10)
      }
    }

    pdf.save(`${mergedData.personalInfo?.name || 'Resume'}_Resume.pdf`)
  }

  const handleDownloadDOCX = async () => {
    const children: any[] = []

    // Header
    children.push(
      new Paragraph({
        text: mergedData.personalInfo?.name || '',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: mergedData.personalInfo?.title || '',
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `${mergedData.personalInfo?.email || ''} | ${mergedData.personalInfo?.phone || ''} | ${mergedData.personalInfo?.location || ''}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      })
    )

    // Summary
    if (mergedData.summary) {
      children.push(
        new Paragraph({
          text: 'PROFESSIONAL SUMMARY',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: mergedData.summary,
          spacing: { after: 300 },
        })
      )
    }

    // Experience
    if (mergedData.experience && mergedData.experience.length > 0) {
      children.push(
        new Paragraph({
          text: 'EXPERIENCE',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        })
      )
      mergedData.experience.forEach((exp: any) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: exp.title, bold: true }),
            ],
            spacing: { before: 100 },
          }),
          new Paragraph({
            text: `${exp.company} | ${exp.period}`,
          }),
          new Paragraph({
            text: exp.location,
            spacing: { after: 100 },
          })
        )
        if (exp.achievements) {
          exp.achievements.forEach((achievement: string) => {
            children.push(
              new Paragraph({
                text: `• ${achievement}`,
                spacing: { before: 50 },
              })
            )
          })
        }
      })
    }

    // Education
    if (mergedData.education && mergedData.education.length > 0) {
      children.push(
        new Paragraph({
          text: 'EDUCATION',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 100 },
        })
      )
      mergedData.education.forEach((edu: any) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: edu.title, bold: true }),
            ],
            spacing: { before: 100 },
          }),
          new Paragraph({
            text: `${edu.company} | ${edu.period}`,
          }),
          new Paragraph({
            text: edu.location,
            spacing: { after: 100 },
          })
        )
      })
    }

    // Skills
    if (mergedData.skills) {
      children.push(
        new Paragraph({
          text: 'SKILLS',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 100 },
        })
      )
      if (mergedData.skills.technical && mergedData.skills.technical.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Technical Skills: ', bold: true }),
              new TextRun({ text: mergedData.skills.technical.join(', ') }),
            ],
            spacing: { after: 100 },
          })
        )
      }
      if (mergedData.skills.soft && mergedData.skills.soft.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Soft Skills: ', bold: true }),
              new TextRun({ text: mergedData.skills.soft.join(', ') }),
            ],
          })
        )
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `${mergedData.personalInfo?.name || 'Resume'}_Resume.docx`)
  }

  if (error) return <div>Error loading resume</div>
  if (!resumeData || !experienceData || !skillsData) return <div>Loading...</div>

  return (
    <>
      <Navigation />
      <main className="resume-page">
        {/* Controls - Hidden in print */}
        <section className={`resume-controls no-print py-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ marginTop: '80px' }}>
          <Container style={{ maxWidth: '1190px' }}>
            <Row className="align-items-center g-3">
              <Col lg={6}>
                <div className="template-selector">
                  <h5 className="mb-3 fw-bold">Select Template:</h5>
                  <ButtonGroup>
                    {templates.map(template => (
                      <Button
                        key={template.id}
                        variant={selectedTemplate === template.id ? 'primary' : 'outline-primary'}
                        onClick={() => setSelectedTemplate(template.id)}
                        className="px-4"
                      >
                        {template.name}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </Col>
              <Col lg={6} className="text-lg-end">
                <div className="download-buttons">
                  <h5 className="mb-3 fw-bold">Download:</h5>
                  <ButtonGroup>
                    <Button variant="success" onClick={handlePrint} className="px-3">
                      <FaPrint className="me-2" />
                      Print
                    </Button>
                    <Button variant="danger" onClick={handleDownloadPDF} className="px-3">
                      <FaFilePdf className="me-2" />
                      PDF
                    </Button>
                    <Button variant="primary" onClick={handleDownloadDOCX} className="px-3">
                      <FaFileWord className="me-2" />
                      DOCX
                    </Button>
                  </ButtonGroup>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Resume Content */}
        <section className="resume-content py-5">
          <Container style={{ maxWidth: '1190px' }}>
            <div className={`resume-template resume-${selectedTemplate}`}>
              {/* Modern Template */}
              {selectedTemplate === 'modern' && (
                <div className="resume-modern">
                  {/* Header */}
                  <div className="resume-header text-center mb-4 pb-4 border-bottom">
                    <h1 className="display-4 fw-bold mb-2">{mergedData.personalInfo?.name}</h1>
                    <h2 className="h4 text-primary mb-3">{mergedData.personalInfo?.title}</h2>
                    <div className="contact-info d-flex flex-wrap justify-content-center gap-3">
                      {mergedData.personalInfo?.email && (
                        <span><strong>Email:</strong> {mergedData.personalInfo.email}</span>
                      )}
                      {mergedData.personalInfo?.phone && (
                        <span><strong>Phone:</strong> {mergedData.personalInfo.phone}</span>
                      )}
                      {mergedData.personalInfo?.location && (
                        <span><strong>Location:</strong> {mergedData.personalInfo.location}</span>
                      )}
                    </div>
                    <div className="social-links mt-2">
                      {mergedData.personalInfo?.linkedin && (
                        <span className="me-3">{mergedData.personalInfo.linkedin}</span>
                      )}
                      {mergedData.personalInfo?.github && (
                        <span>{mergedData.personalInfo.github}</span>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {mergedData.summary && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title">Professional Summary</h3>
                      <p className="text-justify">{mergedData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {mergedData.experience && mergedData.experience.length > 0 && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title">Experience</h3>
                      {mergedData.experience.map((exp: any, index: number) => (
                        <div key={index} className="experience-item mb-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h4 className="h5 fw-bold mb-1">{exp.title}</h4>
                              <p className="text-primary mb-0">{exp.company}</p>
                            </div>
                            <span className="text-muted">{exp.period}</span>
                          </div>
                          <p className="mb-2">{exp.location}</p>
                          {exp.achievements && (
                            <ul className="achievements-list">
                              {exp.achievements.map((achievement: string, i: number) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {mergedData.education && mergedData.education.length > 0 && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title">Education</h3>
                      {mergedData.education.map((edu: any, index: number) => (
                        <div key={index} className="education-item mb-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h4 className="h5 fw-bold mb-1">{edu.title}</h4>
                              <p className="text-primary mb-0">{edu.company}</p>
                            </div>
                            <span className="text-muted">{edu.period}</span>
                          </div>
                          <p className="mb-0">{edu.location}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {mergedData.skills && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title">Skills</h3>
                      <Row>
                        {mergedData.skills.technical && mergedData.skills.technical.length > 0 && (
                          <Col md={6}>
                            <h5 className="h6 fw-bold mb-2">Technical Skills</h5>
                            <div className="d-flex flex-wrap gap-2">
                              {mergedData.skills.technical.map((skill: string, index: number) => (
                                <span key={index} className="badge bg-primary">{skill}</span>
                              ))}
                            </div>
                          </Col>
                        )}
                        {mergedData.skills.soft && mergedData.skills.soft.length > 0 && (
                          <Col md={6}>
                            <h5 className="h6 fw-bold mb-2">Soft Skills</h5>
                            <div className="d-flex flex-wrap gap-2">
                              {mergedData.skills.soft.map((skill: string, index: number) => (
                                <span key={index} className="badge bg-secondary">{skill}</span>
                              ))}
                            </div>
                          </Col>
                        )}
                      </Row>
                    </div>
                  )}
                </div>
              )}

              {/* Classic Template */}
              {selectedTemplate === 'classic' && (
                <div className="resume-classic">
                  <div className="resume-header mb-4 pb-3 border-bottom">
                    <h1 className="fw-bold mb-1">{mergedData.personalInfo?.name}</h1>
                    <h2 className="h5 mb-3">{mergedData.personalInfo?.title}</h2>
                    <div className="contact-info small">
                      {mergedData.personalInfo?.email} | {mergedData.personalInfo?.phone} | {mergedData.personalInfo?.location}
                    </div>
                  </div>

                  {/* Summary */}
                  {mergedData.summary && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title">Professional Summary</h3>
                      <p>{mergedData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {mergedData.experience && mergedData.experience.length > 0 && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title">Experience</h3>
                      {mergedData.experience.map((exp: any, index: number) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <h4 className="h6 fw-bold mb-0">{exp.title}</h4>
                            <span className="small text-muted">{exp.period}</span>
                          </div>
                          <p className="mb-1 fw-semibold">{exp.company}</p>
                          <p className="small text-muted mb-2">{exp.location}</p>
                          {exp.achievements && (
                            <ul className="small">
                              {exp.achievements.map((achievement: string, i: number) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {mergedData.education && mergedData.education.length > 0 && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title">Education</h3>
                      {mergedData.education.map((edu: any, index: number) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <h4 className="h6 fw-bold mb-0">{edu.title}</h4>
                            <span className="small text-muted">{edu.period}</span>
                          </div>
                          <p className="mb-1 fw-semibold">{edu.company}</p>
                          <p className="small text-muted mb-0">{edu.location}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {mergedData.skills && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title">Skills</h3>
                      {mergedData.skills.technical && mergedData.skills.technical.length > 0 && (
                        <div className="mb-2">
                          <strong>Technical Skills:</strong> {mergedData.skills.technical.join(', ')}
                        </div>
                      )}
                      {mergedData.skills.soft && mergedData.skills.soft.length > 0 && (
                        <div>
                          <strong>Soft Skills:</strong> {mergedData.skills.soft.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Minimal Template */}
              {selectedTemplate === 'minimal' && (
                <div className="resume-minimal">
                  <div className="resume-header mb-4 pb-2 border-bottom border-dark">
                    <h1 className="h2 mb-1">{mergedData.personalInfo?.name}</h1>
                    <p className="mb-2">{mergedData.personalInfo?.title}</p>
                    <p className="small mb-0">
                      {mergedData.personalInfo?.email} · {mergedData.personalInfo?.phone} · {mergedData.personalInfo?.location}
                    </p>
                  </div>

                  {/* Summary */}
                  {mergedData.summary && (
                    <div className="mb-4">
                      <h3 className="h6 fw-bold mb-2 text-uppercase">Summary</h3>
                      <p className="small">{mergedData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {mergedData.experience && mergedData.experience.length > 0 && (
                    <div className="mb-4">
                      <h3 className="h6 fw-bold mb-2 text-uppercase">Experience</h3>
                      {mergedData.experience.map((exp: any, index: number) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex justify-content-between">
                            <strong className="small">{exp.title}</strong>
                            <span className="small">{exp.period}</span>
                          </div>
                          <div className="small">{exp.company} · {exp.location}</div>
                          {exp.achievements && (
                            <ul className="small mt-1 mb-0">
                              {exp.achievements.map((achievement: string, i: number) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {mergedData.education && mergedData.education.length > 0 && (
                    <div className="mb-4">
                      <h3 className="h6 fw-bold mb-2 text-uppercase">Education</h3>
                      {mergedData.education.map((edu: any, index: number) => (
                        <div key={index} className="mb-2">
                          <div className="d-flex justify-content-between">
                            <strong className="small">{edu.title}</strong>
                            <span className="small">{edu.period}</span>
                          </div>
                          <div className="small">{edu.company} · {edu.location}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {mergedData.skills && (
                    <div className="mb-4">
                      <h3 className="h6 fw-bold mb-2 text-uppercase">Skills</h3>
                      {mergedData.skills.technical && mergedData.skills.technical.length > 0 && (
                        <div className="small mb-1">
                          <strong>Technical:</strong> {mergedData.skills.technical.join(' · ')}
                        </div>
                      )}
                      {mergedData.skills.soft && mergedData.skills.soft.length > 0 && (
                        <div className="small">
                          <strong>Soft:</strong> {mergedData.skills.soft.join(' · ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>
        </section>

        <style jsx global>{`
          /* Resume Page Styles */
          .resume-page {
            min-height: 100vh;
            background: var(--bg-primary);
          }

          .resume-controls {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .resume-controls.bg-dark {
            background: #1a1a1a !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .resume-controls.bg-light {
            background: #f8f9fa !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          /* Print Styles */
          @media print {
            .no-print {
              display: none !important;
            }

            .resume-page {
              background: white !important;
            }

            .resume-content {
              padding: 0 !important;
            }

            .resume-template {
              box-shadow: none !important;
              border: none !important;
              page-break-after: avoid;
            }

            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }

          @media (max-width: 991px) {
            .resume-controls {
              margin-top: 70px !important;
            }

            .text-lg-end {
              text-align: left !important;
            }
          }

          /* Resume Template Styles */
          .resume-template {
            background: white;
            padding: 3rem;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            max-width: 900px;
            margin: 0 auto;
          }

          /* Fix all text colors to not change with theme */
          .resume-template,
          .resume-template * {
            color: #212529 !important;
          }

          .resume-template .text-muted {
            color: #6c757d !important;
          }

          .resume-template .small {
            color: #6c757d !important;
          }

          .resume-template .contact-info {
            color: #212529 !important;
          }

          .resume-template h1,
          .resume-template h2,
          .resume-template h3,
          .resume-template h4,
          .resume-template h5,
          .resume-template h6 {
            color: #212529 !important;
          }

          .resume-template .text-primary {
            color: #6366f1 !important;
          }

          .resume-template .section-title {
            color: #6366f1 !important;
          }

          .resume-template p,
          .resume-template span,
          .resume-template div,
          .resume-template li {
            color: #212529 !important;
          }

          .resume-template .social-links,
          .resume-template .social-links * {
            color: #6366f1 !important;
          }

          /* Fix badge backgrounds to be visible in both themes */
          .resume-template .badge {
            background-color: #6366f1 !important;
            color: white !important;
          }

          .resume-template .bg-primary {
            background-color: #6366f1 !important;
            color: white !important;
          }

          .resume-template .bg-secondary {
            background-color: #6c757d !important;
            color: white !important;
          }

          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #6366f1;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #6366f1;
          }

          .achievements-list {
            margin-left: 1.5rem;
            margin-bottom: 0;
          }

          .achievements-list li {
            margin-bottom: 0.5rem;
          }

          .contact-info {
            font-size: 0.95rem;
          }

          .social-links {
            font-size: 0.9rem;
            color: #6366f1;
          }

          /* Modern Template */
          .resume-modern .section-title {
            color: #6366f1;
            border-bottom-color: #6366f1;
          }

          /* Classic Template */
          .resume-classic .section-title {
            color: #22c55e;
            border-bottom: 2px solid #22c55e;
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
          }

          .resume-classic ul {
            margin-left: 1.5rem;
          }

          .resume-classic ul li {
            margin-bottom: 0.25rem;
          }

          /* Minimal Template */
          .resume-minimal {
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
          }

          .resume-minimal h1,
          .resume-minimal h2,
          .resume-minimal h3 {
            letter-spacing: 0.5px;
          }

          .resume-minimal ul {
            margin-left: 1.2rem;
            padding-left: 0;
          }

          .resume-minimal ul li {
            margin-bottom: 0.15rem;
          }

          @media (max-width: 768px) {
            .resume-template {
              padding: 1.5rem;
            }

            .section-title {
              font-size: 1.25rem;
            }
          }
        `}</style>
      </main>
    </>
  )
}

export default ResumePage
