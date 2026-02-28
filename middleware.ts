import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login',
    },
  }
)

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/about/:path*',
    '/admin/skills/:path*',
    '/admin/experience/:path*',
    '/admin/education/:path*',
    '/admin/blog/:path*',
    '/admin/resume/:path*',
    '/admin/media/:path*',
    '/admin/seo/:path*',
    '/admin/contacts/:path*',
    '/admin/settings/:path*',
  ]
}
