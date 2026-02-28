import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { blogPosts } from '@/data/blogPosts'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'blog.json')

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    // If file doesn't exist, return default blog posts
    return NextResponse.json(blogPosts)
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const newPost = await request.json()
    
    // Read existing posts
    let posts = blogPosts
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8')
      posts = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, use default
    }
    
    // Check if updating existing post or creating new
    const existingIndex = posts.findIndex((p: any) => p.id === newPost.id)
    
    if (existingIndex >= 0) {
      // Update existing post
      posts[existingIndex] = {
        ...posts[existingIndex],
        ...newPost,
        updatedAt: new Date().toISOString().split('T')[0]
      }
    } else {
      // Create new post
      const newId = posts.length > 0 ? Math.max(...posts.map((p: any) => parseInt(p.id))) + 1 : 1
      posts.push({
        ...newPost,
        id: newId.toString(),
        publishedAt: new Date().toISOString().split('T')[0],
        readTime: Math.ceil(newPost.content.split(' ').length / 200) + ' min read'
      })
    }
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2))
    
    // Create backup
    const backupDir = path.join(process.cwd(), 'data', 'backups')
    try {
      await fs.access(backupDir)
    } catch {
      await fs.mkdir(backupDir, { recursive: true })
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = path.join(backupDir, `blog-${timestamp}.json`)
    await fs.writeFile(backupFile, JSON.stringify(posts, null, 2))
    
    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error('Error saving blog data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
    }
    
    // Read existing posts
    let posts = blogPosts
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8')
      posts = JSON.parse(data)
    } catch (error) {
      // File doesn't exist
    }
    
    // Filter out the post to delete
    const filteredPosts = posts.filter((p: any) => p.id !== id)
    
    if (filteredPosts.length === posts.length) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    // Save updated posts
    await fs.writeFile(DATA_FILE, JSON.stringify(filteredPosts, null, 2))
    
    // Create backup
    const backupDir = path.join(process.cwd(), 'data', 'backups')
    try {
      await fs.access(backupDir)
    } catch {
      await fs.mkdir(backupDir, { recursive: true })
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = path.join(backupDir, `blog-${timestamp}.json`)
    await fs.writeFile(backupFile, JSON.stringify(filteredPosts, null, 2))
    
    return NextResponse.json({ success: true, data: filteredPosts })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
