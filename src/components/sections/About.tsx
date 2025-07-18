import { useEffect, useRef } from 'react';
import { Code, Palette, Zap, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
      description: 'Writing maintainable, scalable code that stands the test of time.'
    },
    {
      icon: Palette,
      title: 'Design Focus',
      description: 'Creating beautiful interfaces that users love to interact with.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing every aspect for lightning-fast user experiences.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Genuinely passionate about creating meaningful digital experiences.'
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
              I'm a passionate developer with a love for creating beautiful and functional digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 scroll-fade-in">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-space-grotesk">My Story</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With over 5 years of experience in web development, I've had the privilege of working 
                  with diverse clients and projects. My journey began with a simple curiosity about how 
                  websites work, which evolved into a deep passion for creating digital experiences that 
                  matter.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in React, TypeScript, and modern web technologies. When I'm not coding, 
                  you can find me exploring new design trends, contributing to open-source projects, 
                  or enjoying a good cup of coffee while sketching new ideas.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-3xl font-bold gradient-text">50+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-3xl font-bold gradient-text">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-3xl font-bold gradient-text">20+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-3xl font-bold gradient-text">∞</div>
                  <div className="text-sm text-muted-foreground">Coffee Cups</div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4 scroll-fade-in">
              {highlights.map((highlight, index) => (
                <Card key={index} className="skill-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <highlight.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{highlight.title}</h4>
                        <p className="text-muted-foreground text-sm">{highlight.description}</p>
                      </div>
                    </div>
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