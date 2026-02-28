'use client'

import { useParams } from 'next/navigation'
import { Container, Row, Col, Badge, Button } from 'react-bootstrap'
import { FaCalendar, FaClock, FaTag, FaFolder, FaFacebook, FaTwitter, FaLinkedin, FaLink } from 'react-icons/fa'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const BlogPostPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const { data: blogPosts = [], error } = useSWR('/api/portfolio/blog', fetcher)
  const [copied, setCopied] = useState(false)

  const post = blogPosts.find((p: any) => p.slug === slug)

  if (error) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h1>Error Loading Post</h1>
          <p>Failed to load blog post. Please try again later.</p>
          <Link href="/blog" className="btn-primary-custom">
            Back to Blog
          </Link>
        </div>
      </Container>
    )
  }

  if (!blogPosts.length) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </Container>
    )
  }

  if (!post) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn-primary-custom">
            Back to Blog
          </Link>
        </div>
      </Container>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
  }

  return (
    <main className="blog-post-page">
      <section className="post-header bg-dark text-white py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="py-5">
                <Badge bg="primary" className="px-3 py-2 mb-3">
                  <FaFolder className="me-2" />
                  {post.category}
                </Badge>
                <h1 className="display-3 fw-bold mb-4">{post.title}</h1>
                <p className="lead mb-4">{post.excerpt}</p>
                <div className="d-flex flex-wrap gap-3 align-items-center text-white-50">
                  <div className="d-flex align-items-center gap-2">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="rounded-circle"
                      width={40}
                      height={40}
                      onError={(e) => {
                        e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name)
                      }}
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <span>•</span>
                  <span>
                    <FaCalendar className="me-2" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span>
                    <FaClock className="me-2" />
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="post-content section-padding bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div 
                className="cover-image mb-5"
                style={{
                  height: '400px',
                  backgroundImage: `url(${post.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '20px'
                }}
              />

              <div className="share-buttons mb-5 d-flex gap-2 flex-wrap">
                <span className="fw-semibold me-2">Share:</span>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => handleShare('facebook')}
                >
                  <FaFacebook className="me-1" /> Facebook
                </Button>
                <Button 
                  variant="outline-info" 
                  size="sm"
                  onClick={() => handleShare('twitter')}
                >
                  <FaTwitter className="me-1" /> Twitter
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                >
                  <FaLinkedin className="me-1" /> LinkedIn
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => handleShare('copy')}
                >
                  <FaLink className="me-1" /> {copied ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>

              <article className="markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {post.content}
                </ReactMarkdown>
              </article>

              <div className="tags-section mt-5 pt-4 border-top">
                <h5 className="fw-bold mb-3">Tags</h5>
                <div className="d-flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} bg="primary" className="px-3 py-2">
                      <FaTag className="me-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="comments-section mt-5 pt-4 border-top">
                <h3 className="fw-bold mb-4">Comments</h3>
                <div 
                  id="disqus_thread"
                  className="bg-white p-4 rounded-3"
                  style={{ minHeight: '300px' }}
                >
                  <p className="text-muted text-center py-5">
                    Comments section will be integrated with Disqus or a custom comment system.
                    <br />
                    <small>Configure your Disqus shortname or implement a custom solution.</small>
                  </p>
                </div>
              </div>

              <div className="navigation-buttons mt-5 d-flex justify-content-between">
                <Link href="/blog" className="btn-outline-custom">
                  ← Back to Blog
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx global>{`
        .post-header {
          background: var(--bg-dark);
          position: relative;
        }

        .post-header::before {
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

        .markdown-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-primary);
        }

        .markdown-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .markdown-content h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .markdown-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .markdown-content p {
          margin-bottom: 1.5rem;
        }

        .markdown-content ul,
        .markdown-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }

        .markdown-content li {
          margin-bottom: 0.5rem;
        }

        .markdown-content code {
          background: rgba(99, 102, 241, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: var(--primary-color);
        }

        .markdown-content pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 12px;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }

        .markdown-content pre code {
          background: transparent;
          padding: 0;
          color: inherit;
          font-size: 0.95rem;
        }

        .markdown-content blockquote {
          border-left: 4px solid var(--primary-color);
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          color: var(--text-secondary);
          font-style: italic;
        }

        .markdown-content a {
          color: var(--primary-color);
          text-decoration: none;
          border-bottom: 1px solid var(--primary-color);
        }

        .markdown-content a:hover {
          opacity: 0.8;
        }

        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1.5rem 0;
        }

        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .markdown-content th,
        .markdown-content td {
          padding: 0.75rem;
          border: 1px solid var(--bg-secondary);
          text-align: left;
        }

        .markdown-content th {
          background: var(--bg-secondary);
          font-weight: 600;
        }

        [data-theme="dark"] .markdown-content pre {
          background: #0f172a;
        }

        [data-theme="dark"] .markdown-content code {
          background: rgba(129, 140, 248, 0.2);
        }
      `}</style>
    </main>
  )
}

export default BlogPostPage
