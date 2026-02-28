'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AdminAccessShortcut = () => {
  const router = useRouter()

  useEffect(() => {
    let keySequence: string[] = []
    const secretCode = ['Control', 'Shift', 'A'] // Ctrl+Shift+A to access admin

    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence.push(e.key)
      
      // Keep only last 3 keys
      if (keySequence.length > 3) {
        keySequence.shift()
      }

      // Check if the sequence matches
      const isMatch = secretCode.every((key, index) => {
        return keySequence[index] === key
      })

      if (isMatch) {
        keySequence = []
        router.push('/admin/login')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [router])

  return null
}

export default AdminAccessShortcut
