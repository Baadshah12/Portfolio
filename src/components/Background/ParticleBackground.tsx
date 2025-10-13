import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Twinkling stars
function Stars() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    const sizes = new Float32Array(3000);
    
    for (let i = 0; i < 3000; i++) {
      // Spread stars across the sky
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
      
      // Mix of white, blue-white, and yellow-white stars
      const colorVariant = Math.random();
      if (colorVariant > 0.7) {
        // Blue-white stars
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 1.0;
      } else if (colorVariant > 0.4) {
        // Pure white stars
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      } else {
        // Warm white/yellow stars
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.95 + Math.random() * 0.05;
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
      }
      
      // Uniform star sizes
      sizes[i] = 1.0;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  }, []);

  const particlesMaterial = useMemo(() => {
    // Create a star-shaped texture with transparent background
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    // Clear canvas to transparent
    ctx.clearRect(0, 0, 64, 64);
    
    // Draw a star shape
    const centerX = 32;
    const centerY = 32;
    const spikes = 5;
    const outerRadius = 30;
    const innerRadius = 12;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Create star path
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    
    // Fill with glow effect - white center
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fill();
    
    // Add bright core
    ctx.shadowBlur = 8;
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fill();
    
    ctx.restore();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return new THREE.PointsMaterial({
      size: 9.5,
      map: texture,
      sizeAttenuation: false,
      transparent: true,
      opacity: 1,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      alphaTest: 0.01,
    });
  }, []);

  // Slow rotation with sequential glowing effect
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      
      // Sequential glowing effect - one star at a time
      const geometry = ref.current.geometry;
      const colorAttr = geometry.getAttribute('color');
      const baseColors = geometry.getAttribute('color').array;
      
      for (let i = 0; i < 3000; i++) {
        // Create a wave effect where stars glow sequentially
        const wave = Math.sin(state.clock.elapsedTime * 3 - i * 0.01) * 0.5 + 0.5;
        const glow = Math.pow(wave, 8); // Sharp peaks for individual star glow
        
        // Get original color
        const baseR = baseColors[i * 3];
        const baseG = baseColors[i * 3 + 1];
        const baseB = baseColors[i * 3 + 2];
        
        // Add glow (brighten the star)
        const glowIntensity = 1 + glow * 1.5;
        colorAttr.setXYZ(
          i,
          Math.min(baseR * glowIntensity, 1),
          Math.min(baseG * glowIntensity, 1),
          Math.min(baseB * glowIntensity, 1)
        );
      }
      
      colorAttr.needsUpdate = true;
    }
  });

  return <points ref={ref} geometry={particlesGeometry} material={particlesMaterial} />;
}

// Shooting stars - fast and clearly visible with streak/line shape
function ShootingStars() {
  const starsRef = useRef<THREE.Group>(null);
  
  const shootingStarsData = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      startPosition: new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        25 + Math.random() * 35,
        (Math.random() - 0.5) * 100
      ),
      direction: new THREE.Vector3(
        Math.random() * 2 - 1,
        -1.8 - Math.random(),
        Math.random() * 2 - 1
      ).normalize(),
      speed: 60 + Math.random() * 50,
      delay: Math.random() * 5,
    }));
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.children.forEach((mesh, i) => {
        const config = shootingStarsData[i];
        const time = (state.clock.elapsedTime + config.delay) % 7;
        
        if (time < 2) {
          const opacity = time < 0.15 ? time * 6.67 : (2 - time) / 2;
          
          // Update position
          mesh.position.copy(config.startPosition);
          mesh.position.addScaledVector(config.direction, time * config.speed);
          
          // Orient the streak along the direction of movement
          const quaternion = new THREE.Quaternion();
          const up = new THREE.Vector3(0, 1, 0);
          quaternion.setFromUnitVectors(up, config.direction);
          mesh.quaternion.copy(quaternion);
          
          // Update opacity
          const material = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial;
          material.opacity = opacity;
          
          mesh.visible = true;
        } else {
          mesh.visible = false;
        }
      });
    }
  });

  return (
    <group ref={starsRef}>
      {shootingStarsData.map((star) => (
        <mesh key={star.id}>
          {/* Elongated cylinder/cone shape for streak effect */}
          <cylinderGeometry args={[0.15, 0.02, 8, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0a0e27] via-[#141852] to-[#1a1f4d] w-full h-screen">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <Stars />
        <ShootingStars />
      </Canvas>
    </div>
  );
}