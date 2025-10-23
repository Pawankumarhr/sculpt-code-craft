import { useState, useEffect } from 'react';
import { Component as BalatroBg } from '@/components/ui/balatro';
import BoxLoader from '@/components/ui/box-loader';

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
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Balatro animated background */}
      <div className="absolute inset-0 opacity-60">
        <BalatroBg
          isRotate={true}
          mouseInteraction={false}
          pixelFilter={600}
          color1="#a78bfa"
          color2="#38bdf8"
          color3="#1e293b"
          contrast={3.0}
          lighting={0.3}
          spinSpeed={3.0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Box Loader Animation */}
        <div className="flex justify-center mb-8">
          <BoxLoader />
        </div>

        <h1 className="text-6xl lg:text-8xl font-bold font-space-grotesk gradient-text animate-scale-in">
          PAWAN KUMAR
        </h1>
        <h2 className="text-2xl lg:text-3xl text-muted-foreground animate-fade-in animation-delay-300">
          Full Stack Developer
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