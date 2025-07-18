import { useState, useEffect } from 'react';
import { Navigation } from './layout/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { ThemeProvider } from './ui/theme-provider';

export const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('portfolio-theme', newMode ? 'dark' : 'light');
    
    // Update the document class
    if (newMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground">
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="py-8 border-t border-border bg-section-bg">
          <div className="section-container">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">© 2024 John Doe. All rights reserved.</p>
              <p className="text-sm">
                Built with React, TypeScript, and Three.js
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};