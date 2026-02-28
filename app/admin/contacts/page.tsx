'use client'

import { useState } from 'react'
import { Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap'
import { FaEnvelope, FaEye, FaTrash, FaDownload, FaCheckCircle } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'

interface ContactForm {
  id: string
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
  status: 'unread' | 'read' | 'replied'
}

const ContactFormsPage = () => {
  const [contacts, setContacts] = useState<ContactForm[]>([
    {
      id: '1',
      name: 'Demo Contact',
      email: 'demo@example.com',
      subject: 'Inquiry about services',
      message: 'This is a demo contact form submission. Real submissions will appear here.',
      submittedAt: new Date().toISOString(),
      status: 'unread'
    }
  ])
  const [selectedContact, setSelectedContact] = useState<ContactForm | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleView = (contact: ContactForm) => {
    setSelectedContact(contact)
    setShowModal(true)
    if (contact.status === 'unread') {
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, status: 'read' } : c
      ))
    }
  }

  const handleMarkReplied = (id: string) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, status: 'replied' } : c
    ))
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact form?')) {
      setContacts(contacts.filter(c => c.id !== id))
    }
  }

  const exportToCSV = () => {
    const csv = [
      ['Name', 'Email', 'Subject', 'Message', 'Submitted At', 'Status'],
      ...contacts.map(c => [c.name, c.email, c.subject, c.message, c.submittedAt, c.status])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contact-forms-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge bg="danger">Unread</Badge>
      case 'read':
        return <Badge bg="warning">Read</Badge>
      case 'replied':
        return <Badge bg="success">Replied</Badge>
      default:
        return <Badge bg="secondary">{status}</Badge>
    }
  }

  const unreadCount = contacts.filter(c => c.status === 'unread').length

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">Contact Forms</h2>
          <p className="text-muted mb-0">
            Manage contact form submissions {unreadCount > 0 && `(${unreadCount} unread)`}
          </p>
        </div>
        <Button variant="outline-primary" onClick={exportToCSV} disabled={contacts.length === 0}>
          <FaDownload className="me-2" />
          Export to CSV
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {contacts.length === 0 ? (
            <div className="text-center py-5">
              <FaEnvelope size={64} className="text-muted mb-3" />
              <h5>No Contact Forms Yet</h5>
              <p className="text-muted">
                Contact form submissions will appear here.
                <br />
                Integrate with your contact form to start receiving messages.
              </p>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact.id} className={contact.status === 'unread' ? 'fw-bold' : ''}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.subject}</td>
                    <td>{new Date(contact.submittedAt).toLocaleDateString()}</td>
                    <td>{getStatusBadge(contact.status)}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline-primary"
                          onClick={() => handleView(contact)}
                        >
                          <FaEye />
                        </Button>
                        {contact.status !== 'replied' && (
                          <Button 
                            size="sm" 
                            variant="outline-success"
                            onClick={() => handleMarkReplied(contact.id)}
                          >
                            <FaCheckCircle />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline-danger"
                          onClick={() => handleDelete(contact.id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Form Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <div>
              <div className="mb-3">
                <strong>From:</strong> {selectedContact.name} ({selectedContact.email})
              </div>
              <div className="mb-3">
                <strong>Subject:</strong> {selectedContact.subject}
              </div>
              <div className="mb-3">
                <strong>Date:</strong> {new Date(selectedContact.submittedAt).toLocaleString()}
              </div>
              <div className="mb-3">
                <strong>Status:</strong> {getStatusBadge(selectedContact.status)}
              </div>
              <div className="mb-3">
                <strong>Message:</strong>
                <div className="p-3 bg-light rounded mt-2">
                  {selectedContact.message}
                </div>
              </div>
              <div className="d-flex gap-2">
                <a 
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="btn btn-primary"
                >
                  <FaEnvelope className="me-2" />
                  Reply via Email
                </a>
                {selectedContact.status !== 'replied' && (
                  <Button 
                    variant="success"
                    onClick={() => {
                      handleMarkReplied(selectedContact.id)
                      setShowModal(false)
                    }}
                  >
                    <FaCheckCircle className="me-2" />
                    Mark as Replied
                  </Button>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </AdminLayout>
  )
}

export default ContactFormsPage
