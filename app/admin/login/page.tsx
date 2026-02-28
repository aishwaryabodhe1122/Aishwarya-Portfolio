'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'

const AdminLoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.ok) {
        router.push('/admin/dashboard')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="admin-icon mb-3">
                    <FaLock className="text-primary" size={48} />
                  </div>
                  <h2 className="fw-bold mb-2">Admin Login</h2>
                  <p className="text-muted">Access your dashboard</p>
                </div>

                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <div className="position-relative">
                      <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="ps-5"
                        style={{ paddingLeft: '2.5rem' }}
                        autoComplete="email"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="ps-5 pe-5"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash className="text-muted" /> : <FaEye className="text-muted" />}
                      </button>
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    Protected area - Authorized access only
                  </small>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-3 back-link-wrapper">
              <Link href="/" className="text-white text-decoration-none back-link">
                ← Back to Portfolio
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .admin-login-page {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          position: relative;
        }

        .admin-login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
          z-index: 0;
        }

        .back-link-wrapper {
          position: relative;
          z-index: 10;
        }

        .back-link {
          display: inline-block;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
        }

        .back-link:hover {
          opacity: 0.8;
          transform: translateX(-4px);
        }

        .admin-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}

export default AdminLoginPage
