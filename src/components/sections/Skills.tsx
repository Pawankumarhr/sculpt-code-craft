import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Skills = () => {
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
              }, index * 150);
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

  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 95, color: 'text-blue-400' },
        { name: 'TypeScript', level: 90, color: 'text-blue-500' },
        { name: 'Next.js', level: 85, color: 'text-gray-400' },
        { name: 'Tailwind CSS', level: 92, color: 'text-cyan-400' },
        { name: 'Vue.js', level: 80, color: 'text-green-400' },
        { name: 'JavaScript', level: 95, color: 'text-yellow-400' }
      ]
    },
    {
      title: 'Backend & Tools',
      skills: [
        { name: 'Node.js', level: 85, color: 'text-green-500' },
        { name: 'Python', level: 80, color: 'text-yellow-500' },
        { name: 'MongoDB', level: 75, color: 'text-green-600' },
        { name: 'PostgreSQL', level: 78, color: 'text-blue-600' },
        { name: 'Docker', level: 70, color: 'text-blue-400' },
        { name: 'AWS', level: 72, color: 'text-orange-400' }
      ]
    },
    {
      title: 'Design & UI/UX',
      skills: [
        { name: 'Figma', level: 90, color: 'text-purple-400' },
        { name: 'Adobe XD', level: 85, color: 'text-pink-400' },
        { name: 'Photoshop', level: 80, color: 'text-blue-400' },
        { name: 'Illustrator', level: 75, color: 'text-orange-400' },
        { name: 'Blender', level: 70, color: 'text-orange-500' },
        { name: 'After Effects', level: 65, color: 'text-purple-500' }
      ]
    }
  ];

  const technologies = [
    'React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'MongoDB', 
    'PostgreSQL', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Docker', 
    'AWS', 'Figma', 'Git', 'GraphQL', 'Jest', 'Webpack', 'Vite'
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-background"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="section-title mb-6">Skills & Expertise</h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical skills and the tools I use to bring ideas to life.
            </p>
          </div>

          {/* Skill Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="skill-card scroll-fade-in">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 font-space-grotesk">{category.title}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technologies */}
          <div className="text-center scroll-fade-in">
            <h3 className="text-2xl font-bold mb-8 font-space-grotesk">Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Floating Skills Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-50"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-secondary-glow rounded-full animate-pulse opacity-30 animation-delay-500"></div>
            <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
            <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-secondary-glow rounded-full animate-pulse opacity-20 animation-delay-1500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};