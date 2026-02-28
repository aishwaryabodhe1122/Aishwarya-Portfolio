import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyPassword, adminUser } from '@/utils/auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password')
        }

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

        if (!adminEmail || !adminPasswordHash) {
          throw new Error('Admin credentials not configured')
        }

        if (credentials.email !== adminEmail) {
          throw new Error('Invalid credentials')
        }

        let isValid = await verifyPassword(credentials.password, adminPasswordHash)

        // Fallback: check plain password if hash fails
        if (!isValid && process.env.ADMIN_PASSWORD) {
          isValid = credentials.password === process.env.ADMIN_PASSWORD
        }

        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        return {
          id: '1',
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
