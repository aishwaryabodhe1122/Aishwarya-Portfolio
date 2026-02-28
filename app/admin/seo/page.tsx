'use client'

import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'

const SEOManagementPage = () => {
  const [formData, setFormData] = useState({
    title: 'Aishwarya Bodhe - Full Stack Developer & AI/ML Enthusiast',
    description: 'Portfolio of Aishwarya Bodhe - Software Engineer specializing in MEAN/MERN stack, cloud solutions, and AI/ML',
    keywords: 'Full Stack Developer, MEAN Stack, MERN Stack, AI ML, Software Engineer, React, Node.js',
    ogImage: '/og-image.jpg',
    twitterCard: 'summary_large_image',
    author: 'Aishwarya Bodhe',
    siteUrl: 'https://your-domain.vercel.app'
  })

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSave = () => {
    setSaving(true)
    setMessage(null)

    setTimeout(() => {
      setMessage({ type: 'success', text: 'SEO settings saved successfully!' })
      setSaving(false)
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">SEO Management</h2>
          <p className="text-muted mb-0">Optimize your portfolio for search engines</p>
        </div>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          <FaSave className="me-2" />
          {saving ? 'Saving...' : 'Save SEO Settings'}
        </Button>
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
              <h5 className="mb-0 fw-bold">
                <FaSearch className="me-2" />
                Basic SEO
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Page Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Your Name - Job Title"
                    maxLength={60}
                  />
                  <Form.Text className="text-muted">
                    {formData.title.length}/60 characters (Recommended: 50-60)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Meta Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of your portfolio"
                    maxLength={160}
                  />
                  <Form.Text className="text-muted">
                    {formData.description.length}/160 characters (Recommended: 150-160)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Keywords</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <Form.Text className="text-muted">
                    Comma-separated keywords relevant to your skills and expertise
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Your Name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Site URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={formData.siteUrl}
                    onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                    placeholder="https://your-domain.vercel.app"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Social Media (Open Graph & Twitter)</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Open Graph Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={formData.ogImage}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    placeholder="/og-image.jpg or full URL"
                  />
                  <Form.Text className="text-muted">
                    Recommended size: 1200x630px. This image appears when sharing on social media.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Twitter Card Type</Form.Label>
                  <Form.Select
                    value={formData.twitterCard}
                    onChange={(e) => setFormData({ ...formData, twitterCard: e.target.value })}
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary with Large Image</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">SEO Preview</h5>
            </Card.Header>
            <Card.Body>
              <div className="seo-preview p-3 bg-light rounded">
                <div className="mb-3">
                  <small className="text-muted">{formData.siteUrl}</small>
                  <h6 className="text-primary mb-1">{formData.title}</h6>
                  <p className="mb-0 small text-muted">{formData.description}</p>
                </div>
                <hr />
                <div className="social-preview">
                  <div className="border rounded p-3 bg-white">
                    {formData.ogImage && (
                      <div className="mb-2 bg-secondary" style={{ height: '150px', borderRadius: '4px' }}>
                        <div className="d-flex align-items-center justify-content-center h-100 text-white">
                          OG Image Preview
                        </div>
                      </div>
                    )}
                    <strong className="d-block mb-1">{formData.title}</strong>
                    <small className="text-muted">{formData.description.substring(0, 100)}...</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default SEOManagementPage
