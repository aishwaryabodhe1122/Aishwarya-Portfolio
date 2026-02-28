'use client'

import { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { FaUpload, FaDownload, FaEye, FaTrash } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'

const ResumeManagementPage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setMessage(null)
      } else {
        setMessage({ type: 'error', text: 'Please select a PDF file' })
        setFile(null)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/resume', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Resume uploaded successfully!' })
        setFile(null)
      } else {
        setMessage({ type: 'error', text: 'Failed to upload resume' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while uploading' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-4">
        <h2 className="h3 fw-bold mb-1">Resume Management</h2>
        <p className="text-muted mb-0">Upload and manage your resume PDF</p>
      </div>

      {message && (
        <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="mb-0 fw-bold">Upload New Resume</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select PDF File</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <Form.Text className="text-muted">
                Only PDF files are accepted. Maximum file size: 5MB
              </Form.Text>
            </Form.Group>

            {file && (
              <div className="mb-3 p-3 bg-light rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{file.name}</strong>
                    <br />
                    <small className="text-muted">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </small>
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            )}

            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              <FaUpload className="me-2" />
              {uploading ? 'Uploading...' : 'Upload Resume'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="mb-0 fw-bold">Current Resume</h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex gap-2">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline-primary">
                <FaEye className="me-2" />
                View Current Resume
              </Button>
            </a>
            <a href="/resume.pdf" download>
              <Button variant="outline-success">
                <FaDownload className="me-2" />
                Download Resume
              </Button>
            </a>
          </div>
          <p className="text-muted mt-3 mb-0 small">
            The resume is stored at <code>/public/resume.pdf</code> and is accessible at <code>/resume.pdf</code>
          </p>
        </Card.Body>
      </Card>
    </AdminLayout>
  )
}

export default ResumeManagementPage
