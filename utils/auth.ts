import { compareSync } from 'bcryptjs'

export interface AdminUser {
  email: string
  name: string
  role: 'admin'
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const result = compareSync(password, hashedPassword)
    return result
  } catch (error) {
    return false
  }
}

export function isAdmin(email: string): boolean {
  return email === process.env.ADMIN_EMAIL
}

export const adminUser: AdminUser = {
  email: process.env.ADMIN_EMAIL || '',
  name: 'Aishwarya Bodhe',
  role: 'admin'
}
