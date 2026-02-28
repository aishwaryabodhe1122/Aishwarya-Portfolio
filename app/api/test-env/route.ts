import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
    hasAdminPasswordHash: !!process.env.ADMIN_PASSWORD_HASH,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    nextAuthUrl: process.env.NEXTAUTH_URL
  })
}
