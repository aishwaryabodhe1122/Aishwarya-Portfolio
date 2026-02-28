'use client'

import { ReactNode } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap'
import { 
  FaHome, FaUser, FaBriefcase, FaGraduationCap, FaBlog, 
  FaFileAlt, FaImages, FaSearch, FaEnvelope, FaCog, 
  FaSignOutAlt, FaChartBar, FaLightbulb, FaTags
} from 'react-icons/fa'
import Link from 'next/link'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  const menuItems = [
    { href: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
    { href: '/admin/about', icon: FaUser, label: 'About Me' },
    { href: '/admin/skills', icon: FaLightbulb, label: 'Skills' },
    { href: '/admin/skill-categories', icon: FaTags, label: 'Skill Categories' },
    { href: '/admin/experience', icon: FaBriefcase, label: 'Experience & Education' },
    { href: '/admin/blog', icon: FaBlog, label: 'Blog Posts' },
    { href: '/admin/resume', icon: FaFileAlt, label: 'Resume' },
    { href: '/admin/media', icon: FaImages, label: 'Media Library' },
    { href: '/admin/seo', icon: FaSearch, label: 'SEO' },
    { href: '/admin/contacts', icon: FaEnvelope, label: 'Contact Forms' },
  ]

  return (
    <div className="admin-layout">
      <Navbar bg="dark" variant="dark" className="admin-navbar shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/admin/dashboard" className="fw-bold">
            <FaChartBar className="me-2" />
            Admin Dashboard
          </Navbar.Brand>
          
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/" target="_blank" className="me-3">
              View Portfolio
            </Nav.Link>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="user-dropdown">
                {session?.user?.name || 'Admin'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/admin/settings">
                  <FaCog className="me-2" />
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>
                  <FaSignOutAlt className="me-2" />
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <div className="admin-container">
        <div className="admin-sidebar">
          <Nav className="flex-column">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`nav-link admin-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon className="me-2" />
                  {item.label}
                </Link>
              )
            })}
          </Nav>
        </div>

        <div className="admin-content">
          <Container fluid className="py-4">
            {children}
          </Container>
        </div>
      </div>

      <style jsx global>{`
        .admin-layout {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .admin-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-container {
          display: flex;
          min-height: calc(100vh - 56px);
        }

        .admin-sidebar {
          width: 250px;
          background: #fff;
          border-right: 1px solid #dee2e6;
          padding: 1rem 0;
          position: sticky;
          top: 56px;
          height: calc(100vh - 56px);
          overflow-y: auto;
        }

        .admin-content {
          flex: 1;
          overflow-y: auto;
        }

        .admin-nav-link {
          padding: 0.75rem 1.5rem;
          color: #495057;
          text-decoration: none;
          display: flex;
          align-items: center;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }

        .admin-nav-link:hover {
          background: #f8f9fa;
          color: #6366f1;
        }

        .admin-nav-link.active {
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent);
          color: #6366f1;
          border-left-color: #6366f1;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            left: -250px;
            transition: left 0.3s;
            z-index: 999;
          }

          .admin-sidebar.show {
            left: 0;
          }

          .admin-content {
            margin-left: 0;
          }
        }

        [data-theme="dark"] .admin-sidebar {
          background: #1e293b;
          border-right-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .admin-nav-link {
          color: #cbd5e1;
        }

        [data-theme="dark"] .admin-nav-link:hover {
          background: rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </div>
  )
}

export default AdminLayout
