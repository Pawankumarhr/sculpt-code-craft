import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

// Starburst Effect Component
const StarburstParticles = () => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z += 0.002;
      
      // Animate particles radiating outward
      particlesRef.current.children.forEach((child, index) => {
        const time = state.clock.getElapsedTime();
        const speed = 0.01 + (index % 3) * 0.005;
        const radius = 5 + Math.sin(time * speed + index) * 2;
        const angle = (index / particlesRef.current!.children.length) * Math.PI * 2;
        
        child.position.x = Math.cos(angle + time * 0.1) * radius;
        child.position.y = Math.sin(angle + time * 0.1) * radius;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {/* Radiating particles for starburst effect */}
      {Array.from({ length: 60 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0, (Math.random() - 0.5) * 10]}
        >
          <sphereGeometry args={[0.02 + Math.random() * 0.05, 6, 6]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#0088ff" : "#ffffff"} 
            transparent 
            opacity={0.7}
          />
        </mesh>
      ))}
      
      {/* Central bright core */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

// Network Lines Component
const NetworkLines = () => {
  const networkRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.y += 0.001;
      networkRef.current.rotation.x += 0.0005;
    }
  });

  // Create network nodes
  const nodes = Array.from({ length: 25 }, (_, i) => ({
    x: (Math.random() - 0.5) * 20,
    y: (Math.random() - 0.5) * 20,
    z: (Math.random() - 0.5) * 10,
    id: i
  }));

  return (
    <group ref={networkRef}>
      {/* Network nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Connection lines between nearby nodes */}
      {nodes.map((node, i) => 
        nodes.slice(i + 1).map((otherNode, j) => {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + 
            Math.pow(node.y - otherNode.y, 2) + 
            Math.pow(node.z - otherNode.z, 2)
          );
          
          if (distance < 8) {
            const points = [
              new THREE.Vector3(node.x, node.y, node.z),
              new THREE.Vector3(otherNode.x, otherNode.y, otherNode.z)
            ];
            
            return (
              <Line 
                key={`${i}-${j}`}
                points={points}
                color="#00ffff"
                transparent
                opacity={0.3}
                lineWidth={1}
              />
            );
          }
          return null;
        })
      )}
    </group>
  );
};

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        className="w-full h-full opacity-60"
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color={0x00ffff} />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color={0x0088ff} />
        
        {/* Starburst effect in background */}
        <group position={[0, 0, -10]}>
          <StarburstParticles />
        </group>
        
        {/* Network lines in foreground */}
        <group position={[0, 0, 0]}>
          <NetworkLines />
        </group>
      </Canvas>
      
      {/* Enhanced CSS-based effects */}
      <div className="absolute inset-0">
        {/* Border glow effects */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-glow to-transparent animate-pulse animation-delay-1000"></div>
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse animation-delay-500"></div>
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-secondary-glow to-transparent animate-pulse animation-delay-1500"></div>
        
        {/* Floating light orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${10 + (i * 8)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random()}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};