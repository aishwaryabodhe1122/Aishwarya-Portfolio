import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public')
    const filePath = path.join(uploadDir, 'resume.pdf')

    await writeFile(filePath, buffer)

    return NextResponse.json({ 
      success: true, 
      message: 'Resume uploaded successfully',
      path: '/resume.pdf'
    })
  } catch (error) {
    console.error('Error uploading resume:', error)
    return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 })
  }
}
