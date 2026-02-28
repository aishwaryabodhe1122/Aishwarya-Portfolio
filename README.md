# Aishwarya Bodhe - Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Python FastAPI backend. Features beautiful animations, interactive components, and a foundation for future AI integrations.

## 🚀 Features

### Frontend
- **Modern Design**: Clean, professional design with smooth animations
- **Dark/Light Mode**: Toggle between dark and light themes with persistent preference
- **Micro-interactions**: Ripple button effects, card flip animations, smooth icon transitions, and loading skeletons
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Components**: Animated progress bars, hover effects, and transitions
- **Performance Optimized**: Fast loading with Next.js optimization
- **SEO Friendly**: Proper meta tags and structured data

### Sections
- **Hero Section**: Dynamic typing animation and floating elements
- **About Me**: Professional summary with statistics and highlights
- **Skills**: Animated progress bars and categorized skill sets
- **Experience**: Timeline view of work experience and education
- **Projects**: Interactive project cards with detailed modals
- **Blog**: Full-featured blog with markdown support, categories, tags, and search
- **Resume**: Interactive resume viewer with multiple templates and export options
- **Contact**: Functional contact form with validation

### Admin Dashboard
- **Secure Authentication**: NextAuth.js with credential-based login
- **Content Management**: Full CRUD operations for all portfolio sections
- **About Me Management**: Edit bio, stats, highlights, and badges
- **Skills Management**: Add/edit/delete technical and soft skills with categories
- **Experience & Education**: Manage work experience and educational background
- **Blog Management**: Create, edit, and delete blog posts with rich text editor (TipTap)
- **Resume Management**: Edit personal info, summary, and select resume templates
- **Dynamic Data**: All changes reflect immediately on the portfolio
- **File-based Storage**: JSON file storage with automatic backups
- **Optimized Performance**: Dynamic imports and SWR caching for fast navigation

### Resume Builder/Viewer
- **Interactive Resume Viewer**: Professional resume display with real-time data integration
- **Multiple Templates**: Choose from Modern, Classic, and Minimal resume designs
- **Template Customization**: Switch between templates instantly to find the perfect style
- **Export Options**: Download resume in multiple formats (PDF, DOCX)
- **Print-Friendly**: Optimized layout for printing with proper page breaks
- **Data Integration**: Automatically pulls experience, education, and skills from portfolio
- **Theme Support**: Consistent appearance in both light and dark modes
- **Responsive Design**: Looks great on all devices

### Backend (Future AI Features)
- **FastAPI Backend**: RESTful API with automatic documentation
- **Contact Form Handling**: Message submission and storage
- **Analytics Tracking**: Project views and user interactions
- **AI Endpoints**: Placeholder for future AI features
- **Career Insights**: AI-powered career analysis (coming soon)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks and context
- **TypeScript** - Type-safe JavaScript
- **NextAuth.js** - Authentication for Next.js
- **Bootstrap 5** - CSS framework for responsive design
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **SWR** - React Hooks for data fetching
- **TipTap** - Rich text editor for blog posts
- **bcryptjs** - Password hashing for authentication
- **jsPDF** - PDF generation for resume export
- **docx** - DOCX generation for resume export
- **file-saver** - File download functionality

### Backend
- **Python FastAPI** - Modern, fast web framework
- **Pydantic** - Data validation using Python type hints
- **Uvicorn** - ASGI server for production
- **SQLAlchemy** - SQL toolkit and ORM (future database integration)

### Styling
- **Custom CSS** - Modern CSS with CSS variables
- **Bootstrap Components** - Pre-built responsive components
- **Animations** - CSS animations and transitions

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+ and pip
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aishwaryabodhe/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Admin Dashboard Setup

1. **Configure environment variables**
   
   Edit `.env.local` with your admin credentials:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD_HASH=your-bcrypt-hash
   ```

2. **Generate password hash**
   
   Use bcrypt to hash your password:
   ```bash
   # Using Node.js
   node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
   ```

3. **Access admin dashboard**
   
   Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
   - Login with your configured email and password
   - Manage all portfolio content from the dashboard

4. **Admin features**
   - `/admin/dashboard` - Overview and quick actions
   - `/admin/about` - Edit About Me section
   - `/admin/skills` - Manage skills
   - `/admin/skill-categories` - Manage skill categories
   - `/admin/experience` - Manage experience and education
   - `/admin/blog` - Create and manage blog posts
   - `/admin/resume` - Manage resume personal info and template

### Backend Setup (Optional)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the FastAPI server**
   ```bash
   python main.py
   ```

5. **API Documentation**
   Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for interactive API docs

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `components/Hero.tsx` - Name, title, and description
- `components/About.tsx` - Professional summary and stats
- `components/Experience.tsx` - Work experience and education
- `components/Projects.tsx` - Your projects and achievements
- `components/Contact.tsx` - Contact information
- `.env.local` - Environment variables

### Styling
- `app/globals.css` - Global styles and CSS variables
- Component-specific styles are included in each component file
- Modify CSS variables in `:root` to change the color scheme

### Content
- Replace placeholder images with your actual photos
- Update project descriptions and links
- Modify skill levels and technologies
- Add your resume PDF to the `public` folder

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `python main.py` - Start FastAPI development server
- `uvicorn main:app --reload` - Alternative way to start server

## 🚀 Deployment

### Frontend (Vercel - Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables

### Backend (Railway/Render)
1. Create a new service
2. Connect your GitHub repository
3. Set Python version and install command
4. Configure environment variables

## 🎯 Future Enhancements

### Planned Features
- **AI Resume Analysis** - AI-powered resume optimization
- **Project Recommendations** - AI-suggested projects based on skills
- **Career Insights** - Market analysis and career guidance
- **Blog Section** - Technical articles and tutorials
- **Admin Dashboard** - Content management system
- **Analytics Dashboard** - Visitor and engagement analytics

### Technical Improvements
- Database integration (PostgreSQL/MongoDB)
- User authentication system
- Content Management System (CMS)
- Advanced SEO optimization
- Performance monitoring
- Automated testing

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Loading Speed**: < 2s on 3G networks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Aishwarya Bodhe**
- Email: aishwaryabodhe1122@gmail.com
- LinkedIn: [linkedin.com/in/aishwarya-bodhe](https://linkedin.com/in/aishwarya-bodhe)
- GitHub: [github.com/aishwaryabodhe](https://github.com/aishwaryabodhe)
- Phone: +91 8317206235
- Location: Pune, Maharashtra, India

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from React Icons library
- Images from Unsplash (replace with your own)
- Animations powered by CSS and Framer Motion
- Built with love using Next.js and React

---

**Made with ❤️ by Aishwarya Bodhe**
