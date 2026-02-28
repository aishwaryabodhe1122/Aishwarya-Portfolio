import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'about.json')

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    // Return default data if file doesn't exist
    const { initialAboutData } = await import('@/data/portfolioData')
    return NextResponse.json(initialAboutData)
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }

    // Save data
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
    
    // Create backup
    const backupDir = path.join(process.cwd(), 'data', 'backups')
    try {
      await fs.access(backupDir)
    } catch {
      await fs.mkdir(backupDir, { recursive: true })
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = path.join(backupDir, `about-${timestamp}.json`)
    await fs.writeFile(backupFile, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error saving about data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
