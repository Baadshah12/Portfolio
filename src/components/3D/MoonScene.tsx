import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Moon from './Moon';

interface MoonSceneProps {
  className?: string;
}

export default function MoonScene({ className }: MoonSceneProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
        <Moon />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={15}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}