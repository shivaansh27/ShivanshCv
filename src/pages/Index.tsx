import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollProgress from '@/components/ScrollProgress';

const SectionDivider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent my-16" />
);

const Index = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';  // defaults to LIGHT if null
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = isDark ? 'dark' : 'light';

    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <ScrollProgress />
      <AnimatedBackground />

      <Navbar isDark={isDark} toggleTheme={() => setIsDark(prev => !prev)} />

      <Hero />
      <SectionDivider />

      <Education />
      <SectionDivider />

      <Projects />
      <SectionDivider />

      <Skills />
      <SectionDivider />

      <Contact />
    </div>
  );
};

export default Index;
