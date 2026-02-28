export interface AboutData {
  bio: string
  stats: {
    icon: string
    number: string
    label: string
  }[]
  highlights: {
    icon: string
    title: string
    description: string
  }[]
  badges: string[]
}

export interface Skill {
  id: string
  name: string
  level: number
  category: 'technical' | 'soft'
  icon?: string
  color?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | 'Present'
  description: string[]
  technologies: string[]
  type: 'work' | 'education'
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage: string
  twitterCard: string
}

export interface ContactForm {
  id: string
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
  status: 'unread' | 'read' | 'replied'
}

// Initial data
export const initialAboutData: AboutData = {
  bio: "I'm a dedicated Software Engineer with 3.3 years of industry experience, specializing in designing and developing robust, scalable applications. My journey combines technical expertise with continuous learning, and I hold an MBA in Artificial Intelligence and Machine Learning plus bachelor's of Engineering in Information Technology.",
  stats: [
    { icon: 'FaBriefcase', number: '3+', label: 'Years Experience' },
    { icon: 'FaCode', number: '10+', label: 'Web Applications' },
    { icon: 'FaUsers', number: '98%', label: 'User Satisfaction' },
    { icon: 'FaRocket', number: '30%', label: 'Performance Boost' },
  ],
  highlights: [
    {
      icon: 'FaGraduationCap',
      title: 'Education Excellence',
      description: 'BE in Information Technology (CGPA: 8.37) and MBA in AI & ML (CGPA: 8.7)',
    },
    {
      icon: 'FaBriefcase',
      title: 'Professional Growth',
      description: 'Software Engineer with expertise in MEAN/MERN stack development',
    },
    {
      icon: 'FaCode',
      title: 'Technical Expertise',
      description: 'Full-stack development with modern frameworks, cloud solutions, and Agile methodologies',
    },
    {
      icon: 'FaAward',
      title: 'Proven Results',
      description: 'Improved data-handling efficiency by 30% and increased user engagement by 20%',
    },
  ],
  badges: ['Full Stack Development', 'Cloud Architecture', 'Agile Leadership', 'AI/ML Enthusiast']
}

export const initialSEOData: SEOData = {
  title: 'Aishwarya Bodhe - Full Stack Developer & AI/ML Enthusiast',
  description: 'Portfolio of Aishwarya Bodhe - Software Engineer specializing in MEAN/MERN stack, cloud solutions, and AI/ML',
  keywords: ['Full Stack Developer', 'MEAN Stack', 'MERN Stack', 'AI ML', 'Software Engineer', 'React', 'Node.js'],
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
}
