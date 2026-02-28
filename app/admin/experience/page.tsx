'use client'

import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, Alert, Modal, Badge } from 'react-bootstrap'
import { FaSave, FaPlus, FaTrash, FaEdit, FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'
import useSWR, { mutate } from 'swr'

interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  technologies: string[]
  type: 'work' | 'education'
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

const ExperienceManagementPage = () => {
  const { data: experienceData, error } = useSWR('/api/portfolio/experience', fetcher)
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [formData, setFormData] = useState<Experience>({
    id: '',
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: [''],
    technologies: [],
    type: 'work'
  })

  useEffect(() => {
    if (experienceData) {
      // If API returns empty array, initialize with hardcoded data
      if (experienceData.length === 0) {
        const defaultExperiences: Experience[] = [
          {
            id: '1',
            type: 'work',
            title: 'Full-stack Developer',
            company: 'PluginLive',
            location: 'Pune, India',
            startDate: 'Aug 2025',
            endDate: 'Feb 2026',
            description: [
              'Developing comprehensive assessment platform for student evaluation',
              'Building ATS system to streamline recruitment and placement processes',
              'Creating responsive web applications with modern React.js architecture',
              'Implementing robust backend APIs using Node.js and PostgreSQL',
              'Designing scalable database schemas for student and placement data',
              'Optimizing application performance and user experience',
              'Collaborating with cross-functional teams for feature development'
            ],
            technologies: ['React.js', 'Node.js', 'PostgreSQL', 'JavaScript', 'REST APIs', 'Git']
          },
          {
            id: '2',
            type: 'work',
            title: 'Software Engineer',
            company: 'Accenture',
            location: 'Pune, India',
            startDate: 'Dec 2022',
            endDate: 'July 2025',
            description: [
              'Developed and maintained 10+ web applications using MEAN/MERN stacks',
              'Boosted data-handling efficiency by 30% and enhanced overall performance',
              'Designed and deployed scalable, cloud-based solutions using AWS services',
              'Created responsive, dynamic UI components achieving 98% user satisfaction',
              'Led Agile development initiatives, reducing project turnaround time by 15%',
              'Enhanced application functionality with SharePoint Framework (SPFx)',
              'Improved software quality by raising unit test coverage from 60% to 85%'
            ],
            technologies: ['React.js', 'Angular', 'Node.js', 'Express.js', 'MongoDB', 'AWS', 'SPFx']
          },
          {
            id: '3',
            type: 'education',
            title: 'MBA in Artificial Intelligence & Machine Learning',
            company: 'D.Y. Patil Centre for Online Learning',
            location: 'Pune, India',
            startDate: 'July 2023',
            endDate: 'Aug 2025',
            description: [
              'Achieved overall CGPA of 8.7',
              'Focusing on AI/ML integration in software solutions',
              'Advanced coursework in machine learning algorithms and data science'
            ],
            technologies: ['Python', 'Machine Learning', 'Data Science', 'AI Algorithms']
          },
          {
            id: '4',
            type: 'education',
            title: 'Bachelor of Engineering - Information Technology',
            company: 'Bharati Vidyapeeth College of Engineering for Women',
            location: 'Pune, India',
            startDate: 'Aug 2018',
            endDate: 'July 2022',
            description: [
              'Graduated with CGPA of 8.37',
              'Demonstrated consistent academic excellence',
              'Strong foundation in programming and system design',
              'Active participation in technical projects and competitions'
            ],
            technologies: ['Java', 'C++', 'Data Structures', 'Algorithms', 'Database Systems']
          }
        ]
        setExperiences(defaultExperiences)
      } else {
        setExperiences(experienceData)
      }
    }
  }, [experienceData])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/portfolio/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experiences)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Experience updated successfully!' })
        mutate('/api/portfolio/experience')
      } else {
        setMessage({ type: 'error', text: 'Failed to save changes' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setSaving(false)
    }
  }

  const handleAddExperience = () => {
    if (editingExp) {
      setExperiences(experiences.map(e => e.id === editingExp.id ? formData : e))
    } else {
      const newExp = { ...formData, id: Date.now().toString() }
      setExperiences([...experiences, newExp])
    }
    setShowModal(false)
    resetForm()
  }

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp)
    setFormData(exp)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setExperiences(experiences.filter(e => e.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: [''],
      technologies: [],
      type: 'work'
    })
    setEditingExp(null)
  }

  const openAddModal = (type: 'work' | 'education') => {
    resetForm()
    setFormData({ ...formData, type })
    setShowModal(true)
  }

  const addDescriptionPoint = () => {
    setFormData({ ...formData, description: [...formData.description, ''] })
  }

  const updateDescription = (index: number, value: string) => {
    const newDesc = [...formData.description]
    newDesc[index] = value
    setFormData({ ...formData, description: newDesc })
  }

  const removeDescription = (index: number) => {
    setFormData({ ...formData, description: formData.description.filter((_, i) => i !== index) })
  }

  if (error) return <AdminLayout><Alert variant="danger">Failed to load data</Alert></AdminLayout>

  const workExperiences = experiences.filter(e => e.type === 'work')
  const educationExperiences = experiences.filter(e => e.type === 'education')

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">Experience & Education</h2>
          <p className="text-muted mb-0">Manage your professional journey</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="success" onClick={() => openAddModal('work')}>
            <FaBriefcase className="me-2" />
            Add Work Experience
          </Button>
          <Button variant="info" onClick={() => openAddModal('education')}>
            <FaGraduationCap className="me-2" />
            Add Education
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            <FaSave className="me-2" />
            {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      {message && (
        <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <FaBriefcase className="me-2" />
                Work Experience ({workExperiences.length})
              </h5>
            </Card.Header>
            <Card.Body>
              {workExperiences.length === 0 ? (
                <p className="text-muted text-center py-4">No work experience added yet</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {workExperiences.map(exp => (
                    <Card key={exp.id} className="border">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-1 fw-bold">{exp.title}</h6>
                            <p className="mb-1 text-primary">{exp.company}</p>
                            <small className="text-muted">{exp.location}</small>
                          </div>
                          <div className="d-flex gap-1">
                            <Button size="sm" variant="outline-primary" onClick={() => handleEdit(exp)}>
                              <FaEdit />
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(exp.id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                        <p className="mb-2 small">
                          <Badge bg="secondary">{exp.startDate} - {exp.endDate}</Badge>
                        </p>
                        <ul className="small mb-2">
                          {exp.description.slice(0, 2).map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                        {exp.technologies.length > 0 && (
                          <div className="d-flex flex-wrap gap-1">
                            {exp.technologies.map((tech, i) => (
                              <Badge key={i} bg="light" text="dark" className="small">{tech}</Badge>
                            ))}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <FaGraduationCap className="me-2" />
                Education ({educationExperiences.length})
              </h5>
            </Card.Header>
            <Card.Body>
              {educationExperiences.length === 0 ? (
                <p className="text-muted text-center py-4">No education added yet</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {educationExperiences.map(exp => (
                    <Card key={exp.id} className="border">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-1 fw-bold">{exp.title}</h6>
                            <p className="mb-1 text-primary">{exp.company}</p>
                            <small className="text-muted">{exp.location}</small>
                          </div>
                          <div className="d-flex gap-1">
                            <Button size="sm" variant="outline-primary" onClick={() => handleEdit(exp)}>
                              <FaEdit />
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(exp.id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                        <p className="mb-2 small">
                          <Badge bg="secondary">{exp.startDate} - {exp.endDate}</Badge>
                        </p>
                        <ul className="small">
                          {exp.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingExp ? 'Edit' : 'Add'} {formData.type === 'work' ? 'Work Experience' : 'Education'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title / Degree *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Software Engineer, B.E. in IT"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{formData.type === 'work' ? 'Company' : 'Institution'} *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Tech Corp, University Name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Location *</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Pune, Maharashtra"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date *</Form.Label>
                  <Form.Control
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="Present or YYYY-MM"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description Points</Form.Label>
              {formData.description.map((desc, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={desc}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    placeholder="Describe your responsibilities or achievements"
                  />
                  {formData.description.length > 1 && (
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeDescription(index)}
                    >
                      <FaTrash />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline-primary" size="sm" onClick={addDescriptionPoint}>
                <FaPlus className="me-1" /> Add Point
              </Button>
            </Form.Group>

            {formData.type === 'work' && (
              <Form.Group className="mb-3">
                <Form.Label>Technologies (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.technologies.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                  })}
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddExperience}
            disabled={!formData.title || !formData.company}
          >
            {editingExp ? 'Update' : 'Add'} {formData.type === 'work' ? 'Experience' : 'Education'}
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  )
}

export default ExperienceManagementPage
