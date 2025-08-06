import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-glow/20 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-10 rounded-full blur-3xl animate-pulse-glow animation-delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
        <h1 className="text-6xl lg:text-8xl font-bold font-space-grotesk gradient-text animate-scale-in">
          PAWAN KUMAR
        </h1>
        <h2 className="text-2xl lg:text-3xl text-muted-foreground animate-fade-in animation-delay-300">
          Web Developer
        </h2>
        
        {/* Loading Bar */}
        <div className="w-96 max-w-md mx-auto space-y-2 animate-fade-in animation-delay-500">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Loading Experience</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};