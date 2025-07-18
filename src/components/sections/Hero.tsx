import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { ChevronDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <Sphere ref={meshRef} visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#a855f7"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
      />
    </Sphere>
  );
};

export const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-hero-bg via-section-bg to-hero-bg"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-glow/20 rounded-full blur-3xl animate-pulse-glow animation-delay-300"></div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-hero font-space-grotesk font-bold leading-tight">
                <span className="block">Hi, I'm</span>
                <span className="block gradient-text">John Doe</span>
              </h1>
              <p className="text-2xl md:text-3xl font-light text-muted-foreground">
                Creative Developer & Designer
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                I craft digital experiences that blend creativity with functionality. 
                Passionate about creating beautiful, user-friendly interfaces that make a difference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="hero-button text-lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                className="text-lg border-primary/50 hover:bg-primary/10"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>

            <div className="flex space-x-6">
              <Button variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-all">
                <Github className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-all">
                <Linkedin className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-all">
                <Mail className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* 3D Animation */}
          <div className="relative h-96 lg:h-[500px] animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary-glow/20 rounded-full blur-3xl"></div>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              className="w-full h-full"
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <AnimatedSphere />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToAbout}
            className="hover:text-primary"
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};