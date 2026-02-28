'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Badge } from 'react-bootstrap'
import { FaSearch, FaClock, FaCalendar, FaTag, FaFolder } from 'react-icons/fa'
import Link from 'next/link'
import SectionTransition from '@/components/SectionTransition'
import ParallaxSection from '@/components/ParallaxSection'
import Navigation from '@/components/Navigation'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const BlogPage = () => {
  const { data: blogPosts = [], error } = useSWR('/api/portfolio/blog', fetcher)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Extract unique categories from blog posts
  const categories: string[] = ['All', ...Array.from(new Set(blogPosts.map((post: any) => post.category as string))) as any]
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post: any) => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter((post: any) => post.featured)

  return (
    <>
      <Navigation />
      <main className="blog-page">
      <section className="blog-hero bg-dark text-white py-5">
        <Container>
          <SectionTransition direction="up">
            <div className="text-center py-5">
              <h1 className="display-1 fw-bold mb-3">
                <span className="gradient-text">Blog</span>
              </h1>
              <p className="lead mb-4">
                Insights on web development, AI/ML, and software engineering
              </p>
            </div>
          </SectionTransition>
        </Container>
      </section>

      <section className="section-padding bg-light">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto">
              <div className="search-bar mb-4">
                <Form.Group className="position-relative">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-5 py-3 rounded-pill"
                    style={{ fontSize: '1.1rem' }}
                  />
                </Form.Group>
              </div>

              <div className="categories-filter d-flex flex-wrap gap-2 justify-content-center">
                {categories.map((category: string) => (
                  <Badge
                    key={category}
                    bg={selectedCategory === category ? 'primary' : 'secondary'}
                    className="px-3 py-2 cursor-pointer"
                    style={{ cursor: 'pointer', fontSize: '0.9rem' }}
                    onClick={() => {
                      setSelectedCategory(category)
                      setSearchQuery('')
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>

          {featuredPosts.length > 0 && !searchQuery && selectedCategory === 'All' && (
            <Row className="mb-5">
              <Col>
                <h2 className="h3 fw-bold mb-4">Featured Posts</h2>
                <Row className="g-4">
                  {featuredPosts.map((post: any, index: number) => (
                    <Col md={6} key={post.id}>
                      <ParallaxSection offset={20 + index * 10}>
                        <Link href={`/blog/${post.slug}`} className="text-decoration-none">
                          <Card className="card-custom h-100 hover-lift-smooth">
                            <div 
                              className="card-img-top"
                              style={{
                                height: '250px',
                                backgroundImage: `url(${post.coverImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            />
                            <Card.Body className="p-4">
                              <div className="d-flex align-items-center gap-2 mb-3">
                                <Badge bg="primary" className="px-2 py-1">
                                  <FaFolder className="me-1" />
                                  {post.category}
                                </Badge>
                                <small className="text-muted">
                                  <FaClock className="me-1" />
                                  {post.readingTime} min read
                                </small>
                              </div>
                              <h3 className="h4 fw-bold mb-3">{post.title}</h3>
                              <p className="text-muted mb-3">{post.excerpt}</p>
                              <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                  <FaCalendar className="me-1" />
                                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </small>
                                <span className="text-primary fw-semibold">Read More →</span>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </ParallaxSection>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          )}

          <Row>
            <Col>
              <h2 className="h3 fw-bold mb-4">
                {searchQuery ? `Search Results (${filteredPosts.length})` : 'All Posts'}
              </h2>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No posts found. Try a different search or category.</p>
                </div>
              ) : (
                <Row className="g-4">
                  {filteredPosts.map((post: any, index: number) => (
                    <Col md={6} lg={4} key={post.id}>
                      <ParallaxSection offset={15 + index * 5}>
                        <Link href={`/blog/${post.slug}`} className="text-decoration-none">
                          <Card className="card-custom h-100 hover-lift">
                            <div 
                              className="card-img-top"
                              style={{
                                height: '200px',
                                backgroundImage: `url(${post.coverImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            />
                            <Card.Body className="p-3">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <Badge bg="primary" className="px-2 py-1" style={{ fontSize: '0.75rem' }}>
                                  {post.category}
                                </Badge>
                                <small className="text-muted">
                                  <FaClock className="me-1" />
                                  {post.readingTime} min
                                </small>
                              </div>
                              <h3 className="h5 fw-bold mb-2">{post.title}</h3>
                              <p className="text-muted small mb-3" style={{ 
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}>
                                {post.excerpt}
                              </p>
                              <div className="d-flex flex-wrap gap-1 mb-2">
                                {post.tags.slice(0, 3).map((tag: string) => (
                                  <Badge key={tag} bg="secondary" className="px-2 py-1" style={{ fontSize: '0.7rem' }}>
                                    <FaTag className="me-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <small className="text-muted">
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </small>
                            </Card.Body>
                          </Card>
                        </Link>
                      </ParallaxSection>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .blog-hero {
          background: var(--bg-dark);
          position: relative;
        }

        .blog-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%);
        }

        .card-img-top {
          border-radius: 20px 20px 0 0;
        }
      `}</style>
    </main>
    </>
  )
}

export default BlogPage
