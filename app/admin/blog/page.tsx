'use client'

import { useState, lazy, Suspense } from 'react'
import { Card, Form, Button, Row, Col, Alert, Modal, Badge, Table } from 'react-bootstrap'
import { FaSave, FaPlus, FaTrash, FaEdit, FaEye } from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'
import useSWR, { mutate } from 'swr'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const TipTapEditor = dynamic(() => import('@/components/TipTapEditor'), {
  ssr: false,
  loading: () => <div className="text-center py-3"><div className="spinner-border spinner-border-sm" /></div>
})

const fetcher = (url: string) => fetch(url).then(r => r.json())

const BlogManagementPage = () => {
  const { data: blogPosts, error } = useSWR('/api/portfolio/blog', fetcher)
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Frontend Development',
    tags: '',
    coverImage: '',
    featured: false,
    status: 'draft'
  })

  const categories = [
    'Frontend Development',
    'Backend Development',
    'AI & Machine Learning',
    'Programming',
    'DevOps',
    'Web Development'
  ]

  const handleEdit = (post: any) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      coverImage: post.coverImage,
      featured: post.featured,
      status: 'published'
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        id: editingPost?.id
      }
      
      const response = await fetch('/api/portfolio/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      
      if (!response.ok) throw new Error('Failed to save')
      
      setMessage({ type: 'success', text: editingPost ? 'Blog post updated successfully!' : 'Blog post created successfully!' })
      setShowModal(false)
      resetForm()
      mutate('/api/portfolio/blog')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save blog post. Please try again.' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    
    try {
      const response = await fetch(`/api/portfolio/blog?id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete')
      
      setMessage({ type: 'success', text: 'Blog post deleted successfully!' })
      mutate('/api/portfolio/blog')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete blog post. Please try again.' })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Frontend Development',
      tags: '',
      coverImage: '',
      featured: false,
      status: 'draft'
    })
    setEditingPost(null)
  }

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  if (error) return <AdminLayout><Alert variant="danger">Failed to load data</Alert></AdminLayout>

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">Blog Management</h2>
          <p className="text-muted mb-0">Create and manage your blog posts</p>
        </div>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          New Blog Post
        </Button>
      </div>

      {message && (
        <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Published</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts?.map((post: any) => (
                <tr key={post.id}>
                  <td>
                    <div>
                      <strong>{post.title}</strong>
                      <br />
                      <small className="text-muted">{post.excerpt.substring(0, 60)}...</small>
                    </div>
                  </td>
                  <td>
                    <Badge bg="primary">{post.category}</Badge>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag: string, i: number) => (
                        <Badge key={i} bg="secondary" className="small">{tag}</Badge>
                      ))}
                      {post.tags.length > 2 && <Badge bg="light" text="dark" className="small">+{post.tags.length - 2}</Badge>}
                    </div>
                  </td>
                  <td>{post.publishedAt}</td>
                  <td>
                    {post.featured && <Badge bg="success">Featured</Badge>}
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button size="sm" variant="outline-info">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline-primary" onClick={() => handleEdit(post)}>
                        <FaEdit />
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDelete(post.id)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        title: e.target.value,
                        slug: generateSlug(e.target.value)
                      })
                    }}
                    placeholder="Enter blog post title"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-slug"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Excerpt *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the post"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content *</Form.Label>
              <TipTapEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tags (comma-separated)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, JavaScript, Web Development"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  label="Featured Post"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={!formData.title || !formData.content}
          >
            {editingPost ? 'Update Post' : 'Create Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  )
}

export default BlogManagementPage
