// Animation utilities for the portfolio

export const observeScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation class
  const elements = document.querySelectorAll('.scroll-animate');
  elements.forEach((el) => observer.observe(el));

  return observer;
};

export const initializeScrollAnimations = () => {
  // Initialize scroll animations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeScrollAnimations);
  } else {
    observeScrollAnimations();
  }
};

// Smooth scroll to element
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Parallax effect for background elements
export const initializeParallax = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.transform = `translateY(${rate}px)`;
    });
  };

  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Cursor following effect
export const initializeCursorEffect = () => {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
  `;
  document.body.appendChild(cursor);

  const handleMouseMove = (e: MouseEvent) => {
    cursor.style.left = `${e.clientX - 10}px`;
    cursor.style.top = `${e.clientY - 10}px`;
  };

  document.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    cursor.remove();
  };
};

// Typing animation effect
export const typeWriter = (
  element: HTMLElement,
  text: string,
  speed: number = 100
) => {
  let i = 0;
  element.innerHTML = '';
  
  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Stagger animation for lists
export const staggerAnimation = (
  elements: NodeListOf<Element>,
  delay: number = 200
) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animate-fade-in-up');
    }, index * delay);
  });
};