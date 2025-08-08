import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  suffix?: string;
  isVisible?: boolean;
}

export const AnimatedCounter = ({ 
  targetValue, 
  duration = 2000, 
  suffix = '', 
  isVisible = false 
}: AnimatedCounterProps) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(targetValue * easeOutCubic);
      
      setCurrentValue(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, isVisible]);

  return (
    <span className="tabular-nums">
      {currentValue}{suffix}
    </span>
  );
};