import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'skill-categories.json')

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    const dataDir = path.join(process.cwd(), 'data')
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
    
    const backupDir = path.join(process.cwd(), 'data', 'backups')
    try {
      await fs.access(backupDir)
    } catch {
      await fs.mkdir(backupDir, { recursive: true })
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = path.join(backupDir, `skill-categories-${timestamp}.json`)
    await fs.writeFile(backupFile, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error saving skill categories data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
