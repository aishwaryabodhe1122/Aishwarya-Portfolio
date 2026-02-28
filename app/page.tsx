'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import SectionTransition from '@/components/SectionTransition'
import AdminAccessShortcut from '@/components/AdminAccessShortcut'

export default function Home() {
  return (
    <PageTransition>
      <AdminAccessShortcut />
      <main>
        <Navigation />
        <Hero />
        <SectionTransition direction="up" delay={0.1}>
          <About />
        </SectionTransition>
        <SectionTransition direction="up" delay={0.1}>
          <Skills />
        </SectionTransition>
        <SectionTransition direction="up" delay={0.1}>
          <Experience />
        </SectionTransition>
        <SectionTransition direction="up" delay={0.1}>
          <Projects />
        </SectionTransition>
        <SectionTransition direction="up" delay={0.1}>
          <Contact />
        </SectionTransition>
        <SectionTransition direction="up" delay={0.1}>
          <Footer />
        </SectionTransition>
      </main>
    </PageTransition>
  )
}