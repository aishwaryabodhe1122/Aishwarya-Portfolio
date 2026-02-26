import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aishwarya Bodhe - Full Stack Developer',
  description: 'Software Engineer with 2.8 years of experience in designing and developing robust applications. Skilled in MEAN/MERN stack, AWS, and modern web technologies.',
  keywords: 'Full Stack Developer, Software Engineer, React, Node.js, AWS, MEAN Stack, MERN Stack',
  authors: [{ name: 'Aishwarya Bodhe' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
