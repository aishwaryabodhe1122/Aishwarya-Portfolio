'use client'

import { useState } from 'react'
import { Card, Form, Button, Row, Col, Alert, Modal } from 'react-bootstrap'
import { FaUpload, FaTrash, FaCopy, FaImage } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'

const MediaLibraryPage = () => {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    setMessage({ type: 'success', text: 'Media upload feature ready! Integrate with your storage solution (AWS S3, Cloudinary, etc.)' })
    setShowUploadModal(false)
    setSelectedFile(null)
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setMessage({ type: 'success', text: 'URL copied to clipboard!' })
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">Media Library</h2>
          <p className="text-muted mb-0">Upload and manage images for your portfolio</p>
        </div>
        <Button variant="success" onClick={() => setShowUploadModal(true)}>
          <FaUpload className="me-2" />
          Upload Media
        </Button>
      </div>

      {message && (
        <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="mb-0 fw-bold">Media Files</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={12}>
              <div className="text-center py-5">
                <FaImage size={64} className="text-muted mb-3" />
                <h5>Media Library</h5>
                <p className="text-muted">
                  Upload images for blog posts, projects, and portfolio content.
                  <br />
                  Integrate with cloud storage services like AWS S3, Cloudinary, or Uploadcare.
                </p>
                <Button variant="primary" onClick={() => setShowUploadModal(true)}>
                  <FaUpload className="me-2" />
                  Upload Your First Image
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <Form.Text className="text-muted">
                Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
              </Form.Text>
            </Form.Group>

            {selectedFile && (
              <div className="mb-3 p-3 bg-light rounded">
                <strong>{selectedFile.name}</strong>
                <br />
                <small className="text-muted">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </small>
              </div>
            )}

            <Alert variant="info">
              <strong>Integration Required:</strong> Connect to a cloud storage service:
              <ul className="mb-0 mt-2">
                <li>AWS S3</li>
                <li>Cloudinary</li>
                <li>Uploadcare</li>
                <li>Vercel Blob Storage</li>
              </ul>
            </Alert>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  )
}

export default MediaLibraryPage
