export { default } from 'next-auth/middleware'

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
