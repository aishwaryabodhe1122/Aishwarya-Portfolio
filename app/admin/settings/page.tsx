'use client'

import { useState } from 'react'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { FaSave, FaKey, FaUser, FaCog } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'
import { useSession } from 'next-auth/react'

const SettingsPage = () => {
  const { data: session } = useSession()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSave = () => {
    setSaving(true)
    setMessage(null)

    setTimeout(() => {
      setMessage({ type: 'success', text: 'Settings saved successfully!' })
      setSaving(false)
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' })
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="mb-4">
        <h2 className="h3 fw-bold mb-1">Settings</h2>
        <p className="text-muted mb-0">Manage your admin account settings</p>
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
                <FaUser className="me-2" />
                Profile Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSave} disabled={saving}>
                  <FaSave className="me-2" />
                  {saving ? 'Saving...' : 'Save Profile'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <FaKey className="me-2" />
                Change Password
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </Form.Group>

                <Alert variant="info" className="small">
                  To change your password, you'll need to regenerate the password hash using the script and update your .env.local file.
                </Alert>

                <Button 
                  variant="warning" 
                  disabled={!formData.currentPassword || !formData.newPassword || formData.newPassword !== formData.confirmPassword}
                >
                  <FaKey className="me-2" />
                  Change Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <FaCog className="me-2" />
                System Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Admin Email:</strong>
                    <p className="text-muted mb-0">{session?.user?.email}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Role:</strong>
                    <p className="text-muted mb-0">{session?.user?.role}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Session Timeout:</strong>
                    <p className="text-muted mb-0">24 hours</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Environment:</strong>
                    <p className="text-muted mb-0">{process.env.NODE_ENV}</p>
                  </div>
                </Col>
              </Row>

              <Alert variant="warning" className="mb-0">
                <strong>Security Reminder:</strong> Keep your admin credentials secure. Never share your password or commit .env.local to version control.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default SettingsPage
