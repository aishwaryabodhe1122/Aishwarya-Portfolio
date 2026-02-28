'use client'

import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, Alert, Modal, ListGroup } from 'react-bootstrap'
import { FaSave, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'
import useSWR, { mutate } from 'swr'

interface SkillCategory {
  id: string
  title: string
  skills: string[]
  icon: string
  color: string
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

const SkillCategoriesPage = () => {
  const { data: categoriesData, error } = useSWR('/api/portfolio/skill-categories', fetcher)
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [formData, setFormData] = useState<SkillCategory>({
    id: '',
    title: '',
    skills: [],
    icon: 'FaReact',
    color: '#6366f1'
  })

  const [newSkillTag, setNewSkillTag] = useState('')

  useEffect(() => {
    if (categoriesData) {
      if (categoriesData.length === 0) {
        // Initialize with default categories
        const defaultCategories: SkillCategory[] = [
          {
            id: '1',
            title: 'Frontend Development',
            skills: ['React.js', 'Next.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
            icon: 'FaReact',
            color: '#61dafb'
          },
          {
            id: '2',
            title: 'Backend Development',
            skills: ['Node.js', 'Express.js', 'Python', 'RESTful APIs', 'Microservices'],
            icon: 'FaNodeJs',
            color: '#339933'
          },
          {
            id: '3',
            title: 'Database & Cloud',
            skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'AWS', 'GCP', 'Cloud Architecture', 'CI/CD'],
            icon: 'FaDatabase',
            color: '#47a248'
          },
          {
            id: '4',
            title: 'Tools & Methodologies',
            skills: ['Git', 'GitHub', 'Docker', 'Agile', 'Unit Testing', 'Code Reviews', 'System Design'],
            icon: 'FaGitAlt',
            color: '#f05032'
          }
        ]
        setCategories(defaultCategories)
      } else {
        setCategories(categoriesData)
      }
    }
  }, [categoriesData])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/portfolio/skill-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categories)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Skill categories updated successfully!' })
        mutate('/api/portfolio/skill-categories')
      } else {
        setMessage({ type: 'error', text: 'Failed to save changes' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setSaving(false)
    }
  }

  const handleAddCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? formData : c))
    } else {
      const newCategory = { ...formData, id: Date.now().toString() }
      setCategories([...categories, newCategory])
    }
    setShowModal(false)
    resetForm()
  }

  const handleEdit = (category: SkillCategory) => {
    setEditingCategory(category)
    setFormData(category)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  const handleAddSkillTag = () => {
    if (newSkillTag.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkillTag.trim()]
      })
      setNewSkillTag('')
    }
  }

  const handleRemoveSkillTag = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    })
  }

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      skills: [],
      icon: 'FaReact',
      color: '#6366f1'
    })
    setEditingCategory(null)
    setNewSkillTag('')
  }

  return (
    <AdminLayout>
      <div className="skill-categories-management">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 fw-bold mb-0">Skill Categories Management</h2>
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              onClick={() => {
                resetForm()
                setShowModal(true)
              }}
            >
              <FaPlus className="me-2" />
              Add Category
            </Button>
            <Button
              variant="success"
              onClick={handleSave}
              disabled={saving}
            >
              <FaSave className="me-2" />
              {saving ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        </div>

        {message && (
          <Alert variant={message.type === 'success' ? 'success' : 'danger'} dismissible onClose={() => setMessage(null)}>
            {message.text}
          </Alert>
        )}

        <Row className="g-4">
          {categories.map((category) => (
            <Col lg={6} key={category.id}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">{category.title}</h5>
                      <small className="text-muted">
                        {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge"
                        style={{
                          backgroundColor: `${category.color}20`,
                          color: category.color,
                          border: `1px solid ${category.color}40`,
                          padding: '6px 12px',
                          borderRadius: '20px'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{editingCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Frontend Development"
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Icon Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="e.g., FaReact"
                    />
                    <Form.Text className="text-muted">
                      React Icons name (e.g., FaReact, FaNodeJs, FaDatabase)
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Skill Tags</Form.Label>
                <div className="d-flex gap-2 mb-2">
                  <Form.Control
                    type="text"
                    value={newSkillTag}
                    onChange={(e) => setNewSkillTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkillTag())}
                    placeholder="Add a skill tag"
                  />
                  <Button variant="primary" onClick={handleAddSkillTag}>
                    <FaPlus />
                  </Button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge bg-primary d-flex align-items-center gap-2"
                      style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                    >
                      {skill}
                      <FaTrash
                        size={12}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveSkillTag(index)}
                      />
                    </span>
                  ))}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCategory}>
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  )
}

export default SkillCategoriesPage
