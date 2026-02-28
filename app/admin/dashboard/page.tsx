'use client'

import { useSession } from 'next-auth/react'
import { Card, Row, Col, Badge } from 'react-bootstrap'
import { 
  FaUser, FaBriefcase, FaGraduationCap, FaBlog, 
  FaEnvelope, FaEye, FaEdit, FaChartLine 
} from 'react-icons/fa'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'

const AdminDashboard = () => {
  const { data: session } = useSession()

  const stats = [
    { 
      title: 'Total Blog Posts', 
      value: '4', 
      icon: FaBlog, 
      color: '#6366f1',
      link: '/admin/blog'
    },
    { 
      title: 'Contact Forms', 
      value: '0', 
      icon: FaEnvelope, 
      color: '#22c55e',
      link: '/admin/contacts'
    },
    { 
      title: 'Media Files', 
      value: '0', 
      icon: FaEye, 
      color: '#f59e0b',
      link: '/admin/media'
    },
    { 
      title: 'Page Views', 
      value: '-', 
      icon: FaChartLine, 
      color: '#8b5cf6',
      link: '/admin/dashboard'
    },
  ]

  const quickActions = [
    { title: 'Edit About Me', icon: FaUser, link: '/admin/about', color: '#6366f1' },
    { title: 'Manage Skills', icon: FaEdit, link: '/admin/skills', color: '#22c55e' },
    { title: 'Update Experience', icon: FaBriefcase, link: '/admin/experience', color: '#f59e0b' },
    { title: 'Add Education', icon: FaGraduationCap, link: '/admin/education', color: '#8b5cf6' },
    { title: 'Create Blog Post', icon: FaBlog, link: '/admin/blog/new', color: '#ec4899' },
    { title: 'Upload Resume', icon: FaEdit, link: '/admin/resume', color: '#06b6d4' },
  ]

  const recentActivity = [
    { action: 'System initialized', time: 'Just now', type: 'info' },
  ]

  return (
    <AdminLayout>
      <div className="dashboard-header mb-4">
        <h1 className="h2 fw-bold mb-2">Welcome back, {session?.user?.name}! 👋</h1>
        <p className="text-muted">Here's what's happening with your portfolio today.</p>
      </div>

      <Row className="g-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Col md={6} lg={3} key={index}>
              <Link href={stat.link} className="text-decoration-none">
                <Card className="stat-card h-100 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className="text-muted mb-1 small">{stat.title}</p>
                        <h3 className="h2 fw-bold mb-0">{stat.value}</h3>
                      </div>
                      <div 
                        className="stat-icon"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <Icon style={{ color: stat.color }} />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Col md={6} lg={4} key={index}>
                      <Link href={action.link} className="text-decoration-none">
                        <Card className="quick-action-card h-100 border">
                          <Card.Body className="text-center p-3">
                            <div 
                              className="action-icon mb-2"
                              style={{ backgroundColor: `${action.color}20` }}
                            >
                              <Icon style={{ color: action.color }} size={24} />
                            </div>
                            <p className="mb-0 small fw-semibold">{action.title}</p>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  )
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-start">
                    <Badge bg="primary" className="me-2 mt-1">
                      {activity.type}
                    </Badge>
                    <div className="flex-grow-1">
                      <p className="mb-1 small">{activity.action}</p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <small className="text-muted">More activity will appear here as you make changes</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .stat-card {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quick-action-card {
          transition: all 0.2s;
          cursor: pointer;
        }

        .quick-action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: var(--bs-primary) !important;
        }

        .action-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .activity-item:last-child {
          border-bottom: none !important;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
      `}</style>
    </AdminLayout>
  )
}

export default AdminDashboard
