'use client'

import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, Alert, Badge, Modal } from 'react-bootstrap'
import { FaSave, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'
import useSWR, { mutate } from 'swr'

interface Skill {
  id: string
  name: string
  level: number
  category: 'technical' | 'soft'
  icon?: string
  color?: string
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

const SkillsManagementPage = () => {
  const { data: skillsData, error } = useSWR('/api/portfolio/skills', fetcher)
  const [skills, setSkills] = useState<Skill[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [formData, setFormData] = useState<Skill>({
    id: '',
    name: '',
    level: 50,
    category: 'technical',
    icon: '',
    color: '#6366f1'
  })

  useEffect(() => {
    if (skillsData) {
      // If API returns empty array, initialize with hardcoded data
      if (skillsData.length === 0) {
        const defaultSkills: Skill[] = [
          { id: '1', name: 'JavaScript', level: 90, category: 'technical', icon: 'FaJs', color: '#f7df1e' },
          { id: '2', name: 'React.js', level: 88, category: 'technical', icon: 'FaReact', color: '#61dafb' },
          { id: '3', name: 'Node.js', level: 85, category: 'technical', icon: 'FaNodeJs', color: '#339933' },
          { id: '4', name: 'Python', level: 82, category: 'technical', icon: 'FaPython', color: '#3776ab' },
          { id: '5', name: 'Angular', level: 80, category: 'technical', icon: 'FaAngular', color: '#dd0031' },
          { id: '6', name: 'MongoDB', level: 85, category: 'technical', icon: 'SiMongodb', color: '#47a248' },
          { id: '7', name: 'MySQL', level: 83, category: 'technical', icon: 'SiMysql', color: '#4479a1' },
          { id: '8', name: 'AWS', level: 78, category: 'technical', icon: 'FaAws', color: '#ff9900' },
          { id: '9', name: 'GCP', level: 85, category: 'technical', icon: 'SiGooglecloud', color: '#4285f4' },
          { id: '10', name: 'Express.js', level: 87, category: 'technical', icon: 'SiExpress', color: '#000000' },
          { id: '11', name: 'TypeScript', level: 80, category: 'technical', icon: 'SiTypescript', color: '#3178c6' },
          { id: '12', name: 'Next.js', level: 82, category: 'technical', icon: 'SiNextdotjs', color: '#000000' },
          { id: '13', name: 'Git', level: 88, category: 'technical', icon: 'FaGitAlt', color: '#f05032' },
          { id: '14', name: 'Leadership', level: 85, category: 'soft' },
          { id: '15', name: 'Communication', level: 90, category: 'soft' },
          { id: '16', name: 'Problem Solving', level: 92, category: 'soft' },
          { id: '17', name: 'Team Collaboration', level: 88, category: 'soft' },
          { id: '18', name: 'Project Management', level: 80, category: 'soft' },
          { id: '19', name: 'Agile Methodologies', level: 85, category: 'soft' },
        ]
        setSkills(defaultSkills)
      } else {
        setSkills(skillsData)
      }
    }
  }, [skillsData])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/portfolio/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skills)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Skills updated successfully!' })
        mutate('/api/portfolio/skills')
      } else {
        setMessage({ type: 'error', text: 'Failed to save changes' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setSaving(false)
    }
  }

  const handleAddSkill = () => {
    if (editingSkill) {
      setSkills(skills.map(s => s.id === editingSkill.id ? formData : s))
    } else {
      const newSkill = { ...formData, id: Date.now().toString() }
      setSkills([...skills, newSkill])
    }
    setShowModal(false)
    resetForm()
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData(skill)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(s => s.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      level: 50,
      category: 'technical',
      icon: '',
      color: '#6366f1'
    })
    setEditingSkill(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  if (error) return <AdminLayout><Alert variant="danger">Failed to load data</Alert></AdminLayout>

  const technicalSkills = skills.filter(s => s.category === 'technical')
  const softSkills = skills.filter(s => s.category === 'soft')

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">Skills Management</h2>
          <p className="text-muted mb-0">Manage your technical and soft skills with icons and colors</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="success" onClick={openAddModal}>
            <FaPlus className="me-2" />
            Add Skill
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            <FaSave className="me-2" />
            {saving ? 'Saving...' : 'Save All Changes'}
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
              <h5 className="mb-0 fw-bold">Technical Skills ({technicalSkills.length})</h5>
            </Card.Header>
            <Card.Body>
              {technicalSkills.length === 0 ? (
                <p className="text-muted text-center py-4">No technical skills added yet</p>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {technicalSkills.map(skill => (
                    <Card key={skill.id} className="border">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex align-items-center gap-2">
                            {skill.icon && (
                              <div 
                                className="skill-icon"
                                style={{ 
                                  backgroundColor: `${skill.color}20`,
                                  color: skill.color 
                                }}
                              >
                                {skill.icon}
                              </div>
                            )}
                            <div>
                              <h6 className="mb-0">{skill.name}</h6>
                              <small className="text-muted">{skill.level}% proficiency</small>
                            </div>
                          </div>
                          <div className="d-flex gap-1">
                            <Button size="sm" variant="outline-primary" onClick={() => handleEdit(skill)}>
                              <FaEdit />
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(skill.id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div 
                            className="progress-bar" 
                            style={{ 
                              width: `${skill.level}%`,
                              backgroundColor: skill.color 
                            }}
                          />
                        </div>
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
              <h5 className="mb-0 fw-bold">Soft Skills ({softSkills.length})</h5>
            </Card.Header>
            <Card.Body>
              {softSkills.length === 0 ? (
                <p className="text-muted text-center py-4">No soft skills added yet</p>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {softSkills.map(skill => (
                    <Card key={skill.id} className="border">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex align-items-center gap-2">
                            {skill.icon && (
                              <div 
                                className="skill-icon"
                                style={{ 
                                  backgroundColor: `${skill.color}20`,
                                  color: skill.color 
                                }}
                              >
                                {skill.icon}
                              </div>
                            )}
                            <div>
                              <h6 className="mb-0">{skill.name}</h6>
                              <small className="text-muted">{skill.level}% proficiency</small>
                            </div>
                          </div>
                          <div className="d-flex gap-1">
                            <Button size="sm" variant="outline-primary" onClick={() => handleEdit(skill)}>
                              <FaEdit />
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(skill.id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div 
                            className="progress-bar" 
                            style={{ 
                              width: `${skill.level}%`,
                              backgroundColor: skill.color 
                            }}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Skill Name *</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., AWS, React, Leadership"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category *</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'technical' | 'soft' })}
              >
                <option value="technical">Technical</option>
                <option value="soft">Soft Skills</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Proficiency Level: {formData.level}%</Form.Label>
              <Form.Range
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                min={0}
                max={100}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Icon Name (React Icons)</Form.Label>
              <Form.Control
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., FaAws, FaReact, FaUsers"
              />
              <Form.Text className="text-muted">
                Use React Icons names like FaAws, FaReact, FaNode, etc.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Color (Hex Code)</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  style={{ width: '60px' }}
                />
                <Form.Control
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#6366f1"
                />
              </div>
              <Form.Text className="text-muted">
                Brand colors: AWS #FF9900, React #61DAFB, Node #339933
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddSkill}
            disabled={!formData.name}
          >
            {editingSkill ? 'Update Skill' : 'Add Skill'}
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .skill-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.75rem;
        }
      `}</style>
    </AdminLayout>
  )
}

export default SkillsManagementPage
