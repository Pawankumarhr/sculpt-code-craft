import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye } from 'lucide-react';

// Import project images
import projectEcommerce from '@/assets/project-ecommerce.jpg';
import projectTasks from '@/assets/project-tasks.jpg';
import projectPortfolio from '@/assets/project-portfolio.jpg';
import projectWeather from '@/assets/project-weather.jpg';
import projectApi from '@/assets/project-api.jpg';
import projectAnalytics from '@/assets/project-analytics.jpg';

export const Projects = () => {
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

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      image: projectEcommerce,
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      category: 'Full Stack'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: projectTasks,
      technologies: ['React', 'TypeScript', 'Socket.io', 'Redux', 'Material-UI'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      category: 'Frontend'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and Three.js. Features smooth animations and interactive 3D elements.',
      image: projectPortfolio,
      technologies: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      category: 'Frontend'
    },
    {
      title: 'Weather Dashboard',
      description: 'A comprehensive weather application with location-based forecasts, interactive maps, and historical weather data visualization.',
      image: projectWeather,
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Leaflet'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      category: 'Frontend'
    },
    {
      title: 'Social Media API',
      description: 'RESTful API for a social media platform with user authentication, post management, and real-time messaging capabilities.',
      image: projectApi,
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Socket.io'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      category: 'Backend'
    },
    {
      title: 'Data Visualization Tool',
      description: 'An interactive data visualization dashboard for analyzing business metrics with customizable charts and real-time updates.',
      image: projectAnalytics,
      technologies: ['React', 'D3.js', 'Python', 'Flask', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      category: 'Full Stack'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-section-bg"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="section-title mb-6">Featured Projects</h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              A selection of my recent work that showcases my skills and passion for creating exceptional digital experiences.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="project-card scroll-fade-in group bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                      <Button size="sm" variant="secondary" className="flex-1 bg-primary/20 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground">
                        <Eye className="w-4 h-4 mr-2" />
                        Live
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl font-space-grotesk text-foreground">{project.title}</h3>
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 scroll-fade-in">
            <h3 className="text-2xl font-bold mb-4 font-space-grotesk">Want to see more?</h3>
            <p className="text-muted-foreground mb-6">
              Check out my GitHub for more projects and contributions to the open-source community.
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="hero-button"
            >
              <Github className="w-5 h-5 mr-2" />
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};