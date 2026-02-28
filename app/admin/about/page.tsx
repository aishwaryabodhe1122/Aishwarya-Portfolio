'use client'

import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { FaSave, FaUndo } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'
import useSWR, { mutate } from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const AboutManagementPage = () => {
  const { data: aboutData, error } = useSWR('/api/portfolio/about', fetcher)
  const [formData, setFormData] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (aboutData) {
      setFormData(aboutData)
    }
  }, [aboutData])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/portfolio/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'About section updated successfully!' })
        mutate('/api/portfolio/about')
      } else {
        setMessage({ type: 'error', text: 'Failed to save changes' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setFormData(aboutData)
    setMessage(null)
  }

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setFormData({ ...formData, stats: newStats })
  }

  const updateHighlight = (index: number, field: string, value: string) => {
    const newHighlights = [...formData.highlights]
    newHighlights[index] = { ...newHighlights[index], [field]: value }
    setFormData({ ...formData, highlights: newHighlights })
  }

  const updateBadge = (index: number, value: string) => {
    const newBadges = [...formData.badges]
    newBadges[index] = value
    setFormData({ ...formData, badges: newBadges })
  }

  if (error) return <AdminLayout><Alert variant="danger">Failed to load data</Alert></AdminLayout>
  if (!formData) return <AdminLayout><div>Loading...</div></AdminLayout>

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">About Me Section</h2>
          <p className="text-muted mb-0">Manage your professional bio and highlights</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={handleReset}>
            <FaUndo className="me-2" />
            Reset
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            <FaSave className="me-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {message && (
        <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Professional Bio</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Biography</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Write your professional bio..."
                />
                <Form.Text className="text-muted">
                  This will appear in the About Me section
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Statistics</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                {formData.stats.map((stat: any, index: number) => (
                  <Col md={6} key={index}>
                    <Card className="border">
                      <Card.Body>
                        <Form.Group className="mb-2">
                          <Form.Label className="small">Icon (React Icons name)</Form.Label>
                          <Form.Control
                            size="sm"
                            value={stat.icon}
                            onChange={(e) => updateStat(index, 'icon', e.target.value)}
                            placeholder="e.g., FaBriefcase"
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label className="small">Number</Form.Label>
                          <Form.Control
                            size="sm"
                            value={stat.number}
                            onChange={(e) => updateStat(index, 'number', e.target.value)}
                            placeholder="e.g., 3+"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className="small">Label</Form.Label>
                          <Form.Control
                            size="sm"
                            value={stat.label}
                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                            placeholder="e.g., Years Experience"
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Highlights</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                {formData.highlights.map((highlight: any, index: number) => (
                  <Col md={6} key={index}>
                    <Card className="border">
                      <Card.Body>
                        <Form.Group className="mb-2">
                          <Form.Label className="small">Icon</Form.Label>
                          <Form.Control
                            size="sm"
                            value={highlight.icon}
                            onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                            placeholder="e.g., FaGraduationCap"
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label className="small">Title</Form.Label>
                          <Form.Control
                            size="sm"
                            value={highlight.title}
                            onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className="small">Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            size="sm"
                            value={highlight.description}
                            onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Skill Badges</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-2">
                {formData.badges.map((badge: string, index: number) => (
                  <Col md={6} key={index}>
                    <Form.Control
                      value={badge}
                      onChange={(e) => updateBadge(index, e.target.value)}
                      placeholder="Badge name"
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default AboutManagementPage
