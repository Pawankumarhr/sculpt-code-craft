import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ChevronDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LetterByLetterText } from './LetterByLetterText';
import { AnimatedBackground } from './AnimatedBackground';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#a855f7"
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.scroll-fade-in');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('active');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <AnimatedBackground />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-glow/20 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-10 rounded-full blur-3xl animate-pulse-glow animation-delay-500"></div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Greeting */}
            <div className="scroll-fade-in">
              <p className="text-primary font-medium text-2xl lg:text-3xl mb-4 animate-fade-in">
                Hello, I'm
              </p>
              <h1 className="text-6xl lg:text-7xl font-bold font-space-grotesk mb-6 gradient-text animate-scale-in">
                <LetterByLetterText 
                  text="PAWAN KUMAR" 
                  startDelay={800}
                  delay={150}
                />
              </h1>
              <h2 className="text-3xl lg:text-4xl font-bold text-muted-foreground mb-6 animate-slide-up">
                Full Stack Developer & Designer
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 scroll-fade-in animate-fade-in animation-delay-300">
              I create beautiful, functional, and user-centered digital experiences that solve real-world problems with clean code and thoughtful design.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start scroll-fade-in animate-slide-up animation-delay-500">
              <Button size="lg" className="hero-button group">
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download CV
              </Button>
              <Button size="lg" variant="outline" className="hero-button">
                View My Work
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 justify-center lg:justify-start scroll-fade-in animate-fade-in animation-delay-700">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="mailto:pk2806@srmist.edu.in"
                className="social-link"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* 3D Animation */}
          <div className="relative h-96 lg:h-[500px] animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary-glow/20 rounded-full blur-3xl"></div>
            <div className="w-full h-full">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                className="w-full h-full"
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-primary rounded-full animate-pulse"></div>
                  </div>
                }
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce scroll-fade-in animation-delay-1000"
        onClick={scrollToAbout}
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
      </div>
    </section>
  );
};