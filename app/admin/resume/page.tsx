'use client'

import { useState } from 'react'
import { Card, Form, Button, Alert, Row, Col, Modal, Badge } from 'react-bootstrap'
import { FaUpload, FaDownload, FaEye, FaTrash, FaPlus, FaEdit, FaSave } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'
import useSWR, { mutate } from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const ResumeManagementPage = () => {
  const { data: resumeData, error } = useSWR('/api/portfolio/resume', fetcher)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    summary: '',
    template: 'modern'
  })
  const [saving, setSaving] = useState(false)

  // Load data when available
  useState(() => {
    if (resumeData) {
      setFormData({
        personalInfo: resumeData.personalInfo || formData.personalInfo,
        summary: resumeData.summary || '',
        template: resumeData.template || 'modern'
      })
    }
  })

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      // Merge with existing data (experience, education, skills from API)
      const dataToSave = {
        ...resumeData,
        ...formData
      }

      const response = await fetch('/api/portfolio/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Resume data saved successfully!' })
        mutate('/api/portfolio/resume')
      } else {
        setMessage({ type: 'error', text: 'Failed to save resume data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">Resume Management</h2>
          <p className="text-muted mb-0">Manage your resume data and templates</p>
        </div>
        <Link href="/resume" target="_blank">
          <Button variant="outline-primary">
            <FaEye className="me-2" />
            Preview Resume
          </Button>
        </Link>
      </div>

      {message && (
        <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="mb-0 fw-bold">Personal Information</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, name: e.target.value }
                    })}
                    placeholder="John Doe"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Professional Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.personalInfo.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, title: e.target.value }
                    })}
                    placeholder="Full-Stack Developer"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, email: e.target.value }
                    })}
                    placeholder="john@example.com"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, phone: e.target.value }
                    })}
                    placeholder="+1 234 567 8900"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.personalInfo.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, location: e.target.value }
                    })}
                    placeholder="City, Country"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.personalInfo.linkedin}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, linkedin: e.target.value }
                    })}
                    placeholder="linkedin.com/in/username"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>GitHub</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.personalInfo.github}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, github: e.target.value }
                    })}
                    placeholder="github.com/username"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.personalInfo.website}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, website: e.target.value }
                    })}
                    placeholder="yourwebsite.com"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="mb-0 fw-bold">Professional Summary</h5>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Write a compelling professional summary highlighting your key achievements and expertise..."
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="mb-0 fw-bold">Resume Template</h5>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Select Template</Form.Label>
            <Form.Select
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="mb-0 fw-bold">Data Source</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="info">
            <strong>Note:</strong> Experience, Education, and Skills are automatically pulled from your portfolio data.
            Manage them in their respective sections:
          </Alert>
          <div className="d-flex gap-2 flex-wrap">
            <Link href="/admin/experience">
              <Button variant="outline-primary" size="sm">
                Manage Experience & Education
              </Button>
            </Link>
            <Link href="/admin/skills">
              <Button variant="outline-primary" size="sm">
                Manage Skills
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>

      <div className="d-flex gap-2">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving || !formData.personalInfo.name}
        >
          <FaSave className="me-2" />
          {saving ? 'Saving...' : 'Save Resume Data'}
        </Button>
        <Link href="/resume" target="_blank">
          <Button variant="outline-success">
            <FaEye className="me-2" />
            Preview Resume
          </Button>
        </Link>
      </div>
    </AdminLayout>
  )
}

export default ResumeManagementPage
