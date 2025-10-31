import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HeroModel from './HeroModel';

export default function HeroModelScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0.6, 3.0], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[4, 6, 4]} intensity={1.2} />
        <pointLight position={[-4, 3, -4]} intensity={0.6} />
        <Suspense fallback={null}>
          <HeroModel />
        </Suspense>
        {/* Manual rotation only; no pan/zoom, no auto-rotate, no translation */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate autoRotate={false} />
      </Canvas>
    </div>
  );
}
