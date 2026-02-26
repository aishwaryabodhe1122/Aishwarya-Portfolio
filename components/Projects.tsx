'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt, FaEye, FaCode, FaRocket, FaChartLine } from 'react-icons/fa'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  technologies: string[]
  category: string
  features: string[]
  achievements: string[]
  githubUrl: string
  liveUrl: string
  status: string
  impact: string
  developmentProgress?: number
  isFromGitHub?: boolean
}

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  topics: string[]
  language: string
  created_at: string
  updated_at: string
  stargazers_count: number
  forks_count: number
  private: boolean
  fork: boolean
}

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showDevModal, setShowDevModal] = useState(false)
  const [githubProjects, setGithubProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // In-development projects (hardcoded)
  const inDevelopmentProjects: Project[] = [
    {
      id: 1001,
      title: 'Personalized Content Aggregator',
      shortDescription: 'MERN stack platform for personalized content recommendations',
      fullDescription: 'An intelligent content aggregation platform that curates articles, videos, and social media feeds from multiple sources, delivering personalized recommendations to enhance user engagement.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Machine Learning', 'APIs'],
      category: 'Full Stack',
      features: [
        'Multi-source content aggregation from external APIs',
        'Custom recommendation algorithm implementation',
        'Dynamic React UI with minimal load times',
        'User preference learning and adaptation',
        'Social media feed integration',
        'Personalized content delivery system'
      ],
      achievements: [
        '25% increase in user engagement',
        'Intelligent content filtering and categorization',
        'Optimized performance with React optimization techniques',
        'Scalable recommendation engine'
      ],
      githubUrl: 'https://github.com/aishwaryabodhe1122/content-aggregator',
      liveUrl: 'https://content-aggregator-demo.netlify.app',
      status: 'In Development',
      impact: 'Enhanced user experience through personalized content',
      developmentProgress: 75
    },
    {
      id: 1002,
      title: 'Task Management System',
      shortDescription: 'Collaborative project management with real-time updates',
      fullDescription: 'A modern task management system designed for teams to collaborate effectively with real-time updates, file sharing, and comprehensive project tracking capabilities.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.IO', 'Tailwind CSS'],
      category: 'Productivity',
      features: [
        'Real-time collaborative editing',
        'Drag-and-drop task management',
        'Team member assignment and notifications',
        'File attachment and sharing',
        'Progress tracking and reporting',
        'Integration with popular tools'
      ],
      achievements: [
        'Improved team productivity by 40%',
        'Real-time synchronization across devices',
        'Intuitive user interface design',
        'Scalable architecture for growing teams'
      ],
      githubUrl: 'https://github.com/aishwaryabodhe1122/task-management',
      liveUrl: 'https://task-manager-demo.netlify.app',
      status: 'In Development',
      impact: 'Enhanced team collaboration and productivity',
      developmentProgress: 30
    }
  ]

  const categories = ['All', 'Full Stack', 'Data Visualization', 'Productivity', 'Web Development']
  const statusFilters = ['All', 'Completed', 'In Development']
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeStatus, setActiveStatus] = useState('All')
  const [expandedFilter, setExpandedFilter] = useState<'category' | 'status' | null>(null)

  // Combine GitHub projects (completed) with in-development projects
  const allProjects = [...githubProjects, ...inDevelopmentProjects]

  const filteredProjects = allProjects.filter(project => {
    const categoryMatch = activeCategory === 'All' || project.category === activeCategory
    const statusMatch = activeStatus === 'All' || project.status === activeStatus
    return categoryMatch && statusMatch
  })

  const handleProjectClick = (project: Project) => {
    if (project.status === 'Completed') {
      // Redirect to GitHub repo for completed projects
      window.open(project.githubUrl, '_blank')
    } else {
      // Show development popup for in-development projects
      setSelectedProject(project)
      setShowDevModal(true)
    }
  }

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProject(null)
  }

  const handleCloseDevModal = () => {
    setShowDevModal(false)
    setSelectedProject(null)
  }

  const toggleFilterExpansion = (filterType: 'category' | 'status') => {
    setExpandedFilter(expandedFilter === filterType ? null : filterType)
  }

  // Fetch all public repositories as project cards
  const fetchGitHubProjects = async () => {
    try {
      setLoading(true)
      
      // First, show fallback data for immediate loading
      const fallbackProjects = getFallbackCompletedProjects()
      setGithubProjects(fallbackProjects)
      
      // Then try to fetch all public repos in the background
      setTimeout(async () => {
        try {          
          const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App'
          }
          
          const response = await fetch('https://api.github.com/users/aishwaryabodhe1122/repos?sort=updated&per_page=100&type=public', {
            headers,
            signal: AbortSignal.timeout(10000) // 10 second timeout
          })
          
          if (response.ok) {
            const repos: GitHubRepo[] = await response.json()
            
            if (Array.isArray(repos) && repos.length > 0) {              
              // Filter out forked repos and include only your original projects
              const originalRepos = repos.filter(repo => 
                !repo.fork && 
                repo.name !== 'aishwaryabodhe1122' && // Exclude profile repo
                repo.name !== '.github' // Exclude .github repo
              )
              
              // Convert all repos to project format
              const allProjects = originalRepos.map((repo, index) => ({
                id: repo.id,
                title: formatTitle(repo.name),
                shortDescription: repo.description || 'A modern web application built with cutting-edge technologies',
                fullDescription: getDetailedDescription(repo.name) || repo.description || 'A comprehensive project showcasing modern development practices and innovative solutions.',
                image: getCuratedImageByTopics(repo.name, repo.topics || [], repo.language),
                technologies: getTechnologiesFromRepo(repo.name, repo.language, repo.topics || []),
                category: categorizeProject(repo.topics || [], repo.language),
                features: getFeatures(repo.name),
                achievements: getAchievements(repo.name),
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || '',
                status: 'Completed', // All public repos are considered completed
                impact: generateImpact(repo.name),
                isFromGitHub: true
              }))
              
              setGithubProjects(allProjects)
            }
          } else {
            console.warn('GitHub API request failed:', response.status)
          }
        } catch (error) {
        }
      }, 500) // Small delay to not block initial render
      
      // Optional: Try GitHub API in background (non-blocking)
      // This can be enabled later when rate limits are resolved
      /*
      setTimeout(async () => {
        try {
          const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App'
          }
          
          const response = await fetch('https://api.github.com/users/aishwaryabodhe1122/repos?sort=updated&per_page=100', {
            headers,
            signal: AbortSignal.timeout(5000) // 5 second timeout
          })
          
          if (response.ok) {
            const repos: GitHubRepo[] = await response.json()
            if (Array.isArray(repos)) {
              const completedRepoNames = ['binance-futures-tracker', 'customer-sentiment']
              const completedRepos = repos.filter(repo => 
                completedRepoNames.includes(repo.name) && !repo.private
              )
              
              if (completedRepos.length > 0) {
                // Update with live GitHub data if available
                const projects = completedRepos.map(repo => ({
                  id: repo.id,
                  title: formatTitle(repo.name),
                  shortDescription: repo.description || 'No description available',
                  fullDescription: getDetailedDescription(repo.name),
                  image: getCuratedImage(repo.name),
                  technologies: getTechnologies(repo.name),
                  category: categorizeProject(repo.topics, repo.language),
                  features: getFeatures(repo.name),
                  achievements: getAchievements(repo.name),
                  githubUrl: repo.html_url,
                  liveUrl: repo.homepage || '',
                  status: 'Completed',
                  impact: generateImpact(repo.name),
                  isFromGitHub: true
                }))
                
                setGithubProjects(projects)
                console.log('Updated with live GitHub data')
              }
            }
          }
        } catch (error) {
          console.log('Background GitHub fetch failed, using fallback data')
        }
      }, 100) // Small delay to not block initial render
      */
      
    } catch (error) {
      console.error('Error in fetchGitHubProjects:', error)
      const fallbackProjects = getFallbackCompletedProjects()
      setGithubProjects(fallbackProjects)
    } finally {
      setLoading(false)
    }
  }

  // Optimized fallback completed projects data (fast loading)
  const getFallbackCompletedProjects = (): Project[] => {
    const completedRepoNames = ['binance-futures-tracker', 'customer-sentiment']
    
    return completedRepoNames.map((repoName, index) => ({
      id: 2001 + index,
      title: formatTitle(repoName),
      shortDescription: repoName === 'binance-futures-tracker' 
        ? 'Real-time cryptocurrency futures tracking with sentiment analysis'
        : 'Advanced analytics dashboard for e-commerce insights',
      fullDescription: getDetailedDescription(repoName),
      image: getCuratedImage(repoName),
      technologies: getTechnologies(repoName),
      category: repoName === 'customer-sentiment' ? 'Data Visualization' : 'Full Stack',
      features: getFeatures(repoName),
      achievements: getAchievements(repoName),
      githubUrl: `https://github.com/aishwaryabodhe1122/${repoName}`,
      liveUrl: repoName === 'binance-futures-tracker' 
        ? 'https://binance-tracker-demo.netlify.app'
        : 'https://ecommerce-analytics-demo.netlify.app',
      status: 'Completed',
      impact: generateImpact(repoName),
      isFromGitHub: false // Indicates this is optimized fallback data
    }))
  }

  // Helper functions
  const formatTitle = (repoName: string): string => {
    return repoName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Enhanced description fetching with multiple sources
  const getDetailedDescription = (repoName: string): string => {
    // Specific detailed descriptions for known projects
    const descriptions: { [key: string]: string } = {
      'binance-futures-tracker': 'A comprehensive cryptocurrency tracking application that provides real-time price monitoring, delta changes, and market sentiment analysis. Built with modern web technologies to deliver instant market insights.',
      'customer-sentiment': 'A comprehensive analytics dashboard providing deep insights into e-commerce performance, customer behavior, and sales trends with interactive visualizations and real-time data processing.'
    }
    
    return descriptions[repoName] || 'A modern web application built with cutting-edge technologies.'
  }

  // Function to fetch README description (can be enhanced for future use)
  const getReadmeDescription = async (repoName: string): Promise<string | null> => {
    try {
      const response = await fetch(`https://api.github.com/repos/aishwaryabodhe1122/${repoName}/readme`)
      if (response.ok) {
        const data = await response.json()
        const content = atob(data.content)
        
        // Extract description from README (first paragraph after title)
        const lines = content.split('\n')
        let description = ''
        let foundTitle = false
        
        for (const line of lines) {
          if (line.startsWith('# ') && !foundTitle) {
            foundTitle = true
            continue
          }
          if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('##')) {
            description = line.trim()
            break
          }
        }
        
        return description || null
      }
    } catch (error) {
      console.log(`Could not fetch README for ${repoName}`)
    }
    return null
  }

  const fetchProjectImage = async (repoName: string, topics: string[]): Promise<string> => {
    try {
      // Due to GitHub's rate limiting on both API and OpenGraph service,
      // let's use a more reliable approach with direct fallback to curated images      
      // For now, use curated high-quality images that match each project
      // This ensures reliability and fast loading
      const curatedImages: { [key: string]: string } = {
        'customer-sentiment': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80', // Analytics dashboard
        'binance-futures-tracker': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&q=80' // Crypto trading
      }
      
      if (curatedImages[repoName]) {
        return curatedImages[repoName]
      }
      
      // Alternative: Try GitHub social preview with your custom images
      // Uncomment this section when you want to use your uploaded GitHub social previews
      // and when GitHub rate limits are resolved
      
      /*
      try {
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
        
        const response = await fetch(`https://api.github.com/repos/aishwaryabodhe1122/${repoName}`, { headers })
        
        if (response.ok) {
          const repoData = await response.json()
          if (repoData.open_graph_image_url) {
            // Test if the image loads without rate limit error
            const testResponse = await fetch(repoData.open_graph_image_url, { method: 'HEAD' })
            if (testResponse.ok) {
              return repoData.open_graph_image_url
            }
          }
        }
      } catch (error) {
        console.log(`GitHub social preview not available for ${repoName}, using curated image`)
      }
      */
      
      // For now, fall back to topic-based images
      return getFallbackImage(repoName, topics)
      
    } catch (error) {
      console.error(`Error fetching image for ${repoName}:`, error)
      return getFallbackImage(repoName, topics)
    }
  }

  const getFallbackImage = (repoName: string, topics: string[]): string => {
    // Fallback images based on project type/topics
    const topicImageMap: { [key: string]: string } = {
      'cryptocurrency': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      'trading': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      'analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'dashboard': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'ecommerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      'react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
      'nodejs': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop'
    }

    // Check if any topic matches our image map
    for (const topic of topics) {
      if (topicImageMap[topic.toLowerCase()]) {
        return topicImageMap[topic.toLowerCase()]
      }
    }

    // Project-specific fallbacks
    const projectImageMap: { [key: string]: string } = {
      'binance-futures-tracker': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      'customer-sentiment': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    }

    return projectImageMap[repoName] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop'
  }

  const getCuratedImage = (repoName: string): string => {
    // GitHub's OpenGraph service is showing the auto-generated card instead of your custom image
    // This is a known GitHub caching issue. Let's try alternative approaches:
    
    // Option 1: Try different OpenGraph URL patterns
    const baseUrl = `https://opengraph.githubassets.com`
    const repoPath = `aishwaryabodhe1122/${repoName}`
    
    // Try different GitHub OpenGraph URL formats
    const possibleUrls = [
      `${baseUrl}/1/${repoPath}`,                    // Standard format
      `${baseUrl}/0/${repoPath}`,                    // Alternative format
      `${baseUrl}/${repoPath}`,                      // Direct format
      `${baseUrl}/1/${repoPath}?t=${Date.now()}`,    // With cache busting
    ]
    
    // For now, let's use a more reliable approach with your uploaded image
    // Since GitHub's cache is showing the auto-generated card, let's use a direct approach
    
    // Since GitHub's OpenGraph cache is showing auto-generated cards instead of your custom images,
    // let's use your actual uploaded images directly from a reliable source
    
    // Strategy: Try direct GitHub repository images first
    // This is more reliable than OpenGraph service
    
    // Try both main and master branches, and multiple file locations
    const directImageUrls = [
      // Main branch attempts
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/banner.jpg`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/banner.png`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/preview.jpg`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/preview.png`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/screenshot.jpg`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/screenshot.png`,
      // Master branch attempts (for older repos)
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/master/banner.jpg`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/master/banner.png`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/master/preview.jpg`,
      // Folder locations
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/assets/banner.jpg`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/public/banner.jpg`,
      `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/docs/banner.jpg`
    ]
    
    // Fallback to curated images if direct images don't exist
    const fallbackImages: { [key: string]: string } = {
      'customer-sentiment': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=90',
      'binance-futures-tracker': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&q=90'
    }
    
    return directImageUrls[0]
  }

  const getTechnologies = (repoName: string): string[] => {
    const techMap: { [key: string]: string[] } = {
      'binance-futures-tracker': ['React.js', 'Node.js', 'Express', 'Socket.IO', 'WebSocket', 'RSS-Parser'],
      'customer-sentiment': ['React.js', 'D3.js', 'Node.js', 'PostgreSQL', 'Chart.js', 'AWS']
    }
    
    return techMap[repoName] || ['React.js', 'Node.js', 'JavaScript']
  }

  // Enhanced function to get technologies from repository data
  const getTechnologiesFromRepo = (repoName: string, language: string, topics: string[]): string[] => {
    // First check if we have specific tech mapping
    const specificTech = getTechnologies(repoName)
    if (specificTech.length > 1) return specificTech
    
    // Generate technologies based on language and topics
    const technologies: string[] = []
    
    // Add primary language
    if (language) {
      const languageMap: { [key: string]: string } = {
        'JavaScript': 'JavaScript',
        'TypeScript': 'TypeScript', 
        'Python': 'Python',
        'Java': 'Java',
        'HTML': 'HTML/CSS',
        'CSS': 'HTML/CSS',
        'C++': 'C++',
        'C': 'C',
        'Go': 'Go',
        'Rust': 'Rust',
        'PHP': 'PHP'
      }
      technologies.push(languageMap[language] || language)
    }
    
    // Add technologies based on topics
    const topicTechMap: { [key: string]: string[] } = {
      'react': ['React.js'],
      'nextjs': ['Next.js'],
      'nodejs': ['Node.js'],
      'express': ['Express.js'],
      'mongodb': ['MongoDB'],
      'postgresql': ['PostgreSQL'],
      'mysql': ['MySQL'],
      'docker': ['Docker'],
      'aws': ['AWS'],
      'firebase': ['Firebase'],
      'tailwindcss': ['Tailwind CSS'],
      'bootstrap': ['Bootstrap'],
      'vue': ['Vue.js'],
      'angular': ['Angular'],
      'django': ['Django'],
      'flask': ['Flask'],
      'spring': ['Spring Boot'],
      'laravel': ['Laravel']
    }
    
    topics.forEach(topic => {
      const topicLower = topic.toLowerCase()
      if (topicTechMap[topicLower]) {
        technologies.push(...topicTechMap[topicLower])
      }
    })
    
    // Remove duplicates and limit to 6 technologies
    const uniqueTech = Array.from(new Set(technologies))
    return uniqueTech.slice(0, 6)
  }

  // Smart image selection based on repository topics and language
  const getCuratedImageByTopics = (repoName: string, topics: string[], language: string): string => {
    // First check for specific project images
    const specificImages = getCuratedImage(repoName)
    if (specificImages && !specificImages.includes('opengraph.githubassets.com')) {
      return specificImages
    }
    
    // Generate image based on topics and language
    const topicImageMap: { [key: string]: string } = {
      'web': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop&q=90',
      'mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop&q=90',
      'ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&q=90',
      'machine-learning': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&q=90',
      'data': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=90',
      'analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=90',
      'dashboard': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=90',
      'api': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&q=90',
      'backend': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&q=90',
      'database': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop&q=90',
      'blockchain': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&q=90',
      'cryptocurrency': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&q=90',
      'game': 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop&q=90',
      'ecommerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&q=90',
      'social': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop&q=90'
    }
    
    // Check topics for matching images
    for (const topic of topics) {
      const topicLower = topic.toLowerCase()
      if (topicImageMap[topicLower]) {
        return topicImageMap[topicLower]
      }
    }
    
    // Language-based images
    const languageImageMap: { [key: string]: string } = {
      'JavaScript': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop&q=90',
      'TypeScript': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop&q=90',
      'Python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop&q=90',
      'Java': 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop&q=90',
      'HTML': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop&q=90',
      'CSS': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop&q=90'
    }
    
    if (language && languageImageMap[language]) {
      return languageImageMap[language]
    }
    
    // Default tech image
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=90'
  }

  const getFeatures = (repoName: string): string[] => {
    const featuresMap: { [key: string]: string[] } = {
      'binance-futures-tracker': [
        'Custom WebSocket service for real-time price streaming',
        'Responsive React UI with color-coded tables',
        'Google News RSS integration with sentiment analysis',
        'Real-time broadcasting of top 50 Binance futures',
        'Predictive market trend analysis',
        'Production-ready deployment on Render.com and Netlify'
      ],
      'customer-sentiment': [
        'Interactive data visualizations with D3.js',
        'Real-time sales and performance metrics',
        'Customer behavior analysis and segmentation',
        'Predictive analytics for inventory management',
        'Responsive dashboard design',
        'Export functionality for reports'
      ]
    }
    
    return featuresMap[repoName] || ['Modern web application', 'Responsive design', 'Clean code architecture']
  }

  const getAchievements = (repoName: string): string[] => {
    const achievementsMap: { [key: string]: string[] } = {
      'binance-futures-tracker': [
        'Zero client-side polling for optimal performance',
        'Real-time sentiment analysis for market predictions',
        'Scalable WebSocket architecture',
        'Environment-driven configuration'
      ],
      'customer-sentiment': [
        'Improved decision-making with data-driven insights',
        'Real-time performance monitoring',
        'Advanced filtering and drill-down capabilities',
        'Mobile-responsive design'
      ]
    }
    
    return achievementsMap[repoName] || ['High performance', 'Scalable architecture', 'User-friendly interface']
  }

  const categorizeProject = (topics: string[], language: string): string => {
    // Check topics for specific categories
    const topicLower = topics.map(t => t.toLowerCase())
    
    if (topicLower.some(t => ['dashboard', 'analytics', 'data', 'visualization', 'chart'].includes(t))) {
      return 'Data Visualization'
    }
    
    if (topicLower.some(t => ['productivity', 'management', 'task', 'todo', 'calendar'].includes(t))) {
      return 'Productivity'
    }
    
    if (topicLower.some(t => ['mobile', 'android', 'ios', 'react-native', 'flutter'].includes(t))) {
      return 'Mobile'
    }
    
    if (topicLower.some(t => ['ai', 'ml', 'machine-learning', 'artificial-intelligence', 'neural', 'deep-learning'].includes(t))) {
      return 'AI/ML'
    }
    
    if (topicLower.some(t => ['api', 'backend', 'server', 'database', 'microservice'].includes(t))) {
      return 'Backend'
    }
    
    if (topicLower.some(t => ['frontend', 'ui', 'ux', 'css', 'html', 'design'].includes(t))) {
      return 'Frontend'
    }
    
    if (topicLower.some(t => ['web', 'website', 'webapp', 'react', 'vue', 'angular'].includes(t))) {
      return 'Web Development'
    }
    
    // Language-based categorization
    if (language) {
      const langLower = language.toLowerCase()
      if (['python'].includes(langLower) && topicLower.some(t => ['ai', 'ml', 'data'].includes(t))) {
        return 'AI/ML'
      }
      if (['javascript', 'typescript'].includes(langLower)) {
        return 'Web Development'
      }
      if (['java', 'kotlin'].includes(langLower) && topicLower.some(t => ['android', 'mobile'].includes(t))) {
        return 'Mobile'
      }
    }
    
    // Default to Full Stack for comprehensive projects
    return 'Full Stack'
  }

  const generateImpact = (repoName: string): string => {
    const impactMap: { [key: string]: string } = {
      'binance-futures-tracker': 'Improved trading decision-making with real-time data',
      'customer-sentiment': 'Streamlined business intelligence and reporting'
    }
    
    return impactMap[repoName] || 'Enhanced user experience and productivity'
  }

  // Fetch GitHub projects on component mount
  useEffect(() => {
    fetchGitHubProjects()
  }, [])

  return (
    <section id="projects" className="section-padding bg-pattern">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="display-2 fw-bold mb-3">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="lead text-muted">
              Showcasing innovative solutions and technical expertise through real-world applications
            </p>
          </Col>
        </Row>

        {/* Filter System */}
        <Row className="justify-content-center mb-5">
          <Col lg={8}>
            <div className="filter-system text-center">
              {/* Main Filter Buttons */}
              <div className="main-filter-buttons mb-4">
                <button
                  className={`main-filter-btn ${expandedFilter === 'category' ? 'active' : ''}`}
                  onClick={() => toggleFilterExpansion('category')}
                >
                  🏷️ Filter by Category
                  <span className={`arrow ${expandedFilter === 'category' ? 'expanded' : ''}`}>▼</span>
                </button>
                <button
                  className={`main-filter-btn ${expandedFilter === 'status' ? 'active' : ''}`}
                  onClick={() => toggleFilterExpansion('status')}
                >
                  📊 Filter by Status
                  <span className={`arrow ${expandedFilter === 'status' ? 'expanded' : ''}`}>▼</span>
                </button>
              </div>

              {/* Category Filter - Expandable */}
              {expandedFilter === 'category' && (
                <div className="expandable-filter category-filter animate-slideDown">
                  <h6 className="filter-subtitle mb-3">Select Category</h6>
                  <div className="filter-buttons">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Filter - Expandable */}
              {expandedFilter === 'status' && (
                <div className="expandable-filter status-filter animate-slideDown">
                  <h6 className="filter-subtitle mb-3">Select Status</h6>
                  <div className="filter-buttons">
                    {statusFilters.map((status) => (
                      <button
                        key={status}
                        className={`status-btn ${activeStatus === status ? 'active' : ''}`}
                        onClick={() => setActiveStatus(status)}
                      >
                        {status === 'Completed' && '✅ '}
                        {status === 'In Development' && '🚧 '}
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Projects Grid */}
        <Row className="g-4" ref={ref}>
          {loading && githubProjects.length === 0 && (
            <Col xs={12} className="text-center py-5">
              <div className="loading-spinner">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading GitHub projects...</span>
                </div>
                <p className="mt-3 text-muted">Fetching projects from GitHub...</p>
              </div>
            </Col>
          )}
          {filteredProjects.map((project: Project, index: number) => (
            <Col lg={6} key={project.id}>
              <Card 
                className={`project-card card-custom h-100 hover-lift ${inView ? 'animate-fadeInUp' : ''}`}
                style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-image-container">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="project-image"
                    onError={(e) => {
                      // Multi-level fallback system for GitHub images
                      const target = e.target as HTMLImageElement
                      const currentSrc = target.src
                      
                      // Find the repo name from the project title
                      const repoName = project.title.toLowerCase().replace(/\s+/g, '-')
                      
                      // Try alternative GitHub image paths first
                      const alternativeUrls = [
                        `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/banner.png`,
                        `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/preview.jpg`,
                        `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/screenshot.jpg`,
                        `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/master/banner.jpg`,
                        `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/master/banner.png`,
                        `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/assets/banner.jpg`,
                        `https://raw.githubusercontent.com/aishwaryabodhe1122/${repoName}/main/public/banner.jpg`
                      ]
                      
                      // Check if we haven't tried these alternatives yet
                      const notTriedYet = alternativeUrls.find(url => url !== currentSrc)
                      
                      if (notTriedYet) {
                        target.src = notTriedYet
                        return
                      }
                      
                      // Final fallback to curated images
                      const fallbackImages: { [key: string]: string } = {
                        'customer-sentiment': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=90',
                        'binance-futures-tracker': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&q=90'
                      }
                      
                      target.src = fallbackImages[repoName] || getCuratedImageByTopics(repoName, project.technologies, project.technologies[0] || 'JavaScript')
                    }}
                  />
                  <div className="project-overlay">
                    <div className="project-actions">
                      {project.status === 'Completed' ? (
                        <>
                          <button 
                            className="action-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewDetails(project)
                            }}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="action-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(project.githubUrl, '_blank')
                            }}
                            title="View Code"
                          >
                            <FaGithub />
                          </button>
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn"
                            title="Live Demo"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt />
                          </a>
                        </>
                      ) : (
                        <button 
                          className="action-btn dev-project"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProjectClick(project)
                          }}
                          title="Coming Soon"
                        >
                          <FaRocket />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="project-status">
                    <Badge 
                      bg={project.status === 'Completed' ? 'success' : 'warning'}
                      className="status-badge"
                    >
                      {project.status}
                    </Badge>
                    {project.isFromGitHub && (
                      <Badge 
                        bg="info" 
                        className="github-badge ms-1"
                        title="Fetched from GitHub"
                      >
                        <FaGithub className="me-1" />
                        Live
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="h5 fw-bold mb-0">{project.title}</h4>
                    <Badge bg="primary" className="category-badge">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <p className="text-muted mb-3">{project.shortDescription}</p>
                  
                  <div className="project-tech mb-3">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-tag more">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <div className="project-impact">
                    <small className="text-muted d-flex align-items-center">
                      <FaRocket className="me-2" />
                      {project.impact}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Project Detail Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        {selectedProject && (
          <>
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="h4 fw-bold">
                {selectedProject.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div className="mb-4">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={600}
                  height={300}
                  className="w-100 rounded"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <p className="text-muted mb-4">{selectedProject.fullDescription}</p>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-2 d-flex align-items-center">
                  <FaCode className="me-2 text-primary" />
                  Key Features
                </h6>
                <ul className="feature-list">
                  {selectedProject.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-2 d-flex align-items-center">
                  <FaChartLine className="me-2 text-success" />
                  Achievements
                </h6>
                <ul className="achievement-list">
                  {selectedProject.achievements.map((achievement: string, index: number) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-2">Technologies Used</h6>
                <div className="d-flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="d-flex gap-3">
                <a 
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-custom"
                >
                  <FaGithub className="me-2" />
                  View Code
                </a>
                <a 
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-custom"
                >
                  <FaExternalLinkAlt className="me-2" />
                  Live Demo
                </a>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* Development Project Modal */}
      <Modal show={showDevModal} onHide={handleCloseDevModal} size="lg" centered>
        {selectedProject && (
          <>
            <Modal.Header closeButton className="border-0 dev-modal-header">
              <Modal.Title className="h4 fw-bold d-flex align-items-center">
                <FaRocket className="me-2 text-warning" />
                {selectedProject.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 text-center">
              <div className="mb-4">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={600}
                  height={300}
                  className="w-100 rounded"
                  style={{ objectFit: 'cover', filter: 'grayscale(20%)' }}
                />
              </div>
              
              <div className="development-badge mb-3">
                <Badge bg="warning" className="px-3 py-2 fs-6">
                  🚧 In Development
                </Badge>
              </div>
              
              <h5 className="fw-bold mb-3 text-primary">Coming Soon!</h5>
              <p className="text-muted mb-4">{selectedProject.fullDescription}</p>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Tech Stack</h6>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <span key={index} className="tech-tag-dev">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="development-status mb-4">
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${selectedProject.developmentProgress || 50}%` }}></div>
                  </div>
                  <small className="text-muted mt-2 d-block">Development Progress: {selectedProject.developmentProgress || 50}%</small>
                </div>
              </div>
              
              <div className="coming-soon-message">
                <div className="icon-container mb-3">
                  <FaCode className="text-primary fs-1" />
                </div>
                <h6 className="fw-bold text-dark">This project is currently under development</h6>
                <p className="text-muted mb-4">
                  I'm working hard to bring you an amazing experience. Stay tuned for the launch!
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button 
                    className="btn-outline-custom"
                    onClick={handleCloseDevModal}
                  >
                    Close
                  </button>
                  <button 
                    className="btn-primary-custom"
                    onClick={() => {
                      handleCloseDevModal()
                      const contactSection = document.getElementById('contact')
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    Get Notified
                  </button>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

      <style jsx>{`
        .category-filter {
          margin-bottom: 2rem;
        }

        .category-btn {
          background: transparent;
          border: 2px solid rgba(99, 102, 241, 0.2);
          color: #6b7280;
          padding: 10px 20px;
          border-radius: 25px;
          margin: 0 8px 8px 0;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .category-btn:hover,
        .category-btn.active {
          background: var(--gradient-primary);
          border-color: transparent;
          color: white;
          transform: translateY(-2px);
        }

        .filter-system {
          margin-bottom: 2rem;
        }

        .main-filter-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .main-filter-btn {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 2px solid rgba(99, 102, 241, 0.3);
          color: #374151;
          padding: 15px 30px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 200px;
          justify-content: space-between;
        }

        .main-filter-btn:hover,
        .main-filter-btn.active {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-color: transparent;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .arrow {
          transition: transform 0.3s ease;
          font-size: 0.8rem;
        }

        .arrow.expanded {
          transform: rotate(180deg);
        }

        .expandable-filter {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 25px;
          margin-top: 20px;
          border: 1px solid rgba(99, 102, 241, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .filter-subtitle {
          color: #374151;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .status-btn {
          background: transparent;
          border: 2px solid rgba(139, 92, 246, 0.2);
          color: #6b7280;
          padding: 10px 20px;
          border-radius: 25px;
          margin: 0 8px 8px 0;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .status-btn:hover,
        .status-btn.active {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          border-color: transparent;
          color: white;
          transform: translateY(-2px);
        }

        .project-card {
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .project-image-container {
          position: relative;
          overflow: hidden;
        }

        .project-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-actions {
          display: flex;
          gap: 15px;
        }

        .action-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          color: #1f2937;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          text-decoration: none;
          transition: all 0.3s ease;
          transform: translateY(20px);
        }

        .project-card:hover .action-btn {
          transform: translateY(0);
        }

        .action-btn:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-5px) scale(1.1);
        }

        .project-status {
          position: absolute;
          top: 15px;
          right: 15px;
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 6px 12px;
        }

        .github-badge {
          font-size: 0.7rem;
          padding: 4px 8px;
          display: inline-flex;
          align-items: center;
        }

        .category-badge {
          font-size: 0.75rem;
          padding: 4px 8px;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-tag {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .tech-tag.more {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .feature-list,
        .achievement-list {
          list-style: none;
          padding-left: 0;
        }

        .feature-list li,
        .achievement-list li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 8px;
          color: #6b7280;
        }

        .feature-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #22c55e;
          font-weight: bold;
        }

        .achievement-list li::before {
          content: '★';
          position: absolute;
          left: 0;
          color: #f59e0b;
          font-weight: bold;
        }

        .dev-modal-header {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        }

        .development-badge {
          display: inline-block;
        }

        .tech-tag-dev {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          color: #6366f1;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .progress-container {
          max-width: 300px;
          margin: 0 auto;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .coming-soon-message {
          background: rgba(99, 102, 241, 0.05);
          border-radius: 15px;
          padding: 2rem;
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        .icon-container {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .dev-project {
          background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
          color: white;
        }

        .dev-project:hover {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          transform: translateY(-5px) scale(1.1);
        }

        @media (max-width: 768px) {
          .project-image {
            height: 200px;
          }
          
          .category-btn {
            padding: 8px 16px;
            font-size: 0.875rem;
          }

          .status-btn {
            padding: 8px 16px;
            font-size: 0.875rem;
            margin: 0 6px 6px 0;
          }

          .main-filter-btn {
            padding: 12px 20px;
            font-size: 0.875rem;
            min-width: 160px;
          }

          .expandable-filter {
            padding: 20px 15px;
          }

          .filter-subtitle {
            font-size: 0.875rem;
          }
          
          .action-btn {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
          
          .display-2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Projects