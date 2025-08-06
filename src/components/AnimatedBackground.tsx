import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AnimatedGrid = () => {
  const meshRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
    }
    if (linesRef.current) {
      linesRef.current.rotation.z += 0.002;
    }
  });

  // Create grid lines
  const GridLines = () => {
    const lines = [];

    // Horizontal lines
    for (let i = -20; i <= 20; i += 2) {
      const points = [
        new THREE.Vector3(-20, i, 0),
        new THREE.Vector3(20, i, 0),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      lines.push(
        <line key={`h-${i}`}>
          <bufferGeometry attach="geometry" {...geometry} />
          <lineBasicMaterial attach="material" color={0x00ffff} transparent opacity={0.3} />
        </line>
      );
    }

    // Vertical lines
    for (let i = -20; i <= 20; i += 2) {
      const points = [
        new THREE.Vector3(i, -20, 0),
        new THREE.Vector3(i, 20, 0),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      lines.push(
        <line key={`v-${i}`}>
          <bufferGeometry attach="geometry" {...geometry} />
          <lineBasicMaterial attach="material" color={0x00ffff} transparent opacity={0.3} />
        </line>
      );
    }

    return <>{lines}</>;
  };

  return (
    <>
      <group ref={linesRef} position={[0, 0, -10]}>
        <GridLines />
      </group>
      
      <group ref={meshRef}>
        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 20,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial 
              color={0x00ffff} 
              transparent 
              opacity={0.6}
            />
          </mesh>
        ))}
        
        {/* Central flowing shape */}
        <mesh>
          <torusGeometry args={[5, 0.1, 16, 100]} />
          <meshBasicMaterial 
            color={0x00ffff} 
            transparent 
            opacity={0.4}
            wireframe
          />
        </mesh>
      </group>
    </>
  );
};

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={0x00ffff} />
        <AnimatedGrid />
      </Canvas>
      
      {/* Additional CSS-based effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-glow to-transparent animate-pulse animation-delay-1000"></div>
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse animation-delay-500"></div>
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-secondary-glow to-transparent animate-pulse animation-delay-1500"></div>
      </div>
    </div>
  );
};