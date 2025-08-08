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
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Futuristic Digital Room Background */}
      <div className="absolute inset-0">
        {/* Base Room Structure */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/60 to-blue-950/80"></div>
        
        {/* Grid Floor */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 perspective-1000">
          <div className="grid-floor transform-gpu rotate-x-60 scale-y-200">
            {Array.from({ length: 20 }).map((_, row) => (
              <div key={row} className="flex">
                {Array.from({ length: 20 }).map((_, col) => (
                  <div
                    key={col}
                    className="w-16 h-16 border border-cyan-400/30 relative"
                    style={{
                      animationDelay: `${(row + col) * 0.1}s`
                    }}
                  >
                    <div className="absolute inset-0 bg-cyan-400/10 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Data Streams */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${100 + Math.random() * 200}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Holographic Panels */}
        <div className="absolute top-10 left-10 w-64 h-40 bg-cyan-400/10 border border-cyan-400/50 backdrop-blur-sm animate-pulse">
          <div className="p-4 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-2 bg-cyan-400/30 rounded animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>

        <div className="absolute top-10 right-10 w-64 h-40 bg-blue-400/10 border border-blue-400/50 backdrop-blur-sm animate-pulse animation-delay-1000">
          <div className="p-4 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-2 bg-blue-400/30 rounded animate-pulse" style={{ animationDelay: `${i * 0.2 + 1}s` }}></div>
            ))}
          </div>
        </div>

        {/* Central Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-gradient-radial from-cyan-400/20 via-blue-500/10 to-transparent rounded-full animate-pulse"></div>
        </div>
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