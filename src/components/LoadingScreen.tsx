import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Spiderweb-like animated background used during loading
const SpiderWeb = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += 0.0006;
  });

  const nodes = Array.from({ length: 100 }, () => ({
    x: (Math.random() - 0.5) * 30,
    y: (Math.random() - 0.5) * 20,
    z: (Math.random() - 0.5) * 10
  }));

  return (
    <group ref={groupRef}>
      {/* nodes */}
      {nodes.map((n, i) => (
        <mesh key={`n-${i}`} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color="#88ccff" transparent opacity={0.9} />
        </mesh>
      ))}
      {/* connective threads */}
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => {
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dz = n.z - m.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 6) {
            return (
              <Line
                key={`l-${i}-${j}`}
                points={[new THREE.Vector3(n.x, n.y, n.z), new THREE.Vector3(m.x, m.y, m.z)]}
                color="#88ccff"
                transparent
                opacity={Math.max(0.15, 0.6 - dist / 10)}
                lineWidth={0.6}
              />
            );
          }
          return null;
        })
      )}
    </group>
  );
};

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
      {/* Animated spiderweb background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 22], fov: 70 }} className="w-full h-full opacity-80">
          <ambientLight intensity={0.25} />
          <pointLight position={[10, 10, 10]} intensity={0.7} color={0x88ccff} />
          <SpiderWeb />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
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