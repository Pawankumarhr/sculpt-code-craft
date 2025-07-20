import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, Rocket, Users } from 'lucide-react';

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.scroll-fade-in');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('active');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code that follows best practices and industry standards.'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces that enhance user experience.'
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Building fast, optimized applications that deliver exceptional performance across all devices.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively with cross-functional teams to deliver projects on time and exceed expectations.'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-section-bg"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="section-title mb-6">About Me</h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              I'm a passionate frontend developer with a keen eye for design and a love for creating seamless digital experiences.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Story */}
            <div className="scroll-fade-in">
              <h3 className="text-2xl font-bold mb-6 font-space-grotesk">My Story</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  My journey into web development began 5 years ago when I discovered the perfect blend of creativity and logic that coding offers. What started as curiosity quickly became a passion for building digital solutions that make a real difference.
                </p>
                <p>
                  I specialize in React, TypeScript, and modern frontend technologies, always staying up-to-date with the latest trends and best practices. My goal is to create applications that are not only functional but also beautiful and intuitive.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or mentoring aspiring developers in my community.
                </p>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 scroll-fade-in">
              {highlights.map((highlight, index) => (
                <Card key={index} className="skill-card hover:transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <highlight.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2 font-space-grotesk">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};