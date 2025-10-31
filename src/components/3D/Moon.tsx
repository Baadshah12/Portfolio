import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function Moon() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Procedurally generate a color map and a displacement map so the component
  // doesn't crash when external textures are missing.
  const { colorMap, displacementMap } = useMemo(() => {
    const size = 2048;


    // Color canvas (cool silver albedo)
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const cc = c.getContext('2d')!;

    // cool silver base
    cc.fillStyle = '#e9eef2';
    cc.fillRect(0, 0, size, size);

    // draw softer, faded maria (large subtle dark patches)
    for (let m = 0; m < 8; m++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const rx = (Math.random() * 0.25 + 0.08) * size;
      const ry = rx * (0.6 + Math.random() * 0.6);
      cc.save();
      cc.translate(x, y);
      cc.rotate((Math.random() - 0.5) * 0.6);
      const grad = cc.createRadialGradient(0, 0, rx * 0.2, 0, 0, rx);
      // lighter, lower-contrast maria
      grad.addColorStop(0, 'rgba(110,115,120,0.45)');
      grad.addColorStop(1, 'rgba(235,236,237,0)');
      cc.fillStyle = grad;
      cc.beginPath();
      cc.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      cc.fill();
      cc.restore();
    }


    // craters (more subtle/faded)
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = (Math.random() * 0.035 + 0.002) * size;
      const alpha = Math.random() * 0.18 + 0.02; // lower alpha for faded look
      const grad = cc.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(100,100,105,${alpha})`);
      grad.addColorStop(0.6, `rgba(220,220,220,${alpha * 0.3})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      cc.fillStyle = grad;
      cc.beginPath();
      cc.arc(x, y, r, 0, Math.PI * 2);
      cc.fill();
    }

    // subtle highlights (reduced)
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = (Math.random() * 0.01 + 0.002) * size;
      const alpha = Math.random() * 0.15 + 0.03;
      const grad = cc.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      cc.fillStyle = grad;
      cc.beginPath();
      cc.arc(x, y, r, 0, Math.PI * 2);
      cc.fill();
    }

    // slight vignette
    const vgrad = cc.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.95);
    vgrad.addColorStop(0, 'rgba(255,255,255,0)');
    vgrad.addColorStop(1, 'rgba(0,0,0,0.06)');
    cc.fillStyle = vgrad;
    cc.fillRect(0, 0, size, size);

    // Displacement canvas (grayscale height map for craters)
    const d = document.createElement('canvas');
    d.width = size;
    d.height = size;
    const dc = d.getContext('2d')!;
    dc.fillStyle = 'rgb(128,128,128)';
    dc.fillRect(0, 0, size, size);

    for (let i = 0; i < 120; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = (Math.random() * 0.035 + 0.002) * size;
      const depth = Math.random() * 0.12 + 0.02; // shallower displacement for faded craters
      const grad = dc.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(${Math.floor(128 - depth * 80)},${Math.floor(128 - depth * 80)},${Math.floor(128 - depth * 80)},${depth})`);
      grad.addColorStop(0.6, `rgba(120,120,120,${depth * 0.5})`);
      grad.addColorStop(1, 'rgba(128,128,128,0)');
      dc.fillStyle = grad;
      dc.beginPath();
      dc.arc(x, y, r, 0, Math.PI * 2);
      dc.fill();
    }

    const colorMap = new THREE.CanvasTexture(c);
    colorMap.anisotropy = 8;
    (colorMap as any).colorSpace = THREE.SRGBColorSpace;
    colorMap.needsUpdate = true;

    const displacementMap = new THREE.CanvasTexture(d);
    displacementMap.anisotropy = 4;
    (displacementMap as any).colorSpace = (THREE as any).LinearSRGBColorSpace || (THREE as any).LinearSRGBColorSpace;
  displacementMap.needsUpdate = true;

    return { colorMap, displacementMap };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0008;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.05, 256, 256]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#dcd6d1"
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={0.03} /* reduced for subtler craters */
        roughness={0.82}
        metalness={0.03}
        envMapIntensity={0.45}
      />
    </Sphere>
  );
}
