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
    // lighter cool silver base
    cc.fillStyle = '#e8eef2';
    cc.fillRect(0, 0, size, size);

    // main soft basins with lighter bluish-gray tones and increased visibility
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = (Math.random() * 0.4 + 0.05) * size;
      // increased alpha for better visibility but not too dark
      const alpha = Math.random() * 0.12 + 0.04;
      const grad = cc.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(100,100,110,${alpha})`); // slightly stronger, neutral-cool tone
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      cc.fillStyle = grad;
      cc.beginPath();
      cc.arc(x, y, r, 0, Math.PI * 2);
      cc.fill();
    }

    // accent spots (cooler, more visible but not dark)
    for (let i = 0; i < 18; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = (Math.random() * 0.12 + 0.02) * size;
      const alpha = Math.random() * 0.14 + 0.05; // more visible accents
      const grad = cc.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(95,92,100,${alpha})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      cc.fillStyle = grad;
      cc.beginPath();
      cc.arc(x, y, r, 0, Math.PI * 2);
      cc.fill();
    }

    // slight cool vignette
    const vgrad = cc.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.95);
    vgrad.addColorStop(0, 'rgba(255,255,255,0)');
    vgrad.addColorStop(1, 'rgba(0,0,0,0.05)');
    cc.fillStyle = vgrad;
    cc.fillRect(0, 0, size, size);

    // Displacement canvas (grayscale height map for craters)
    const d = document.createElement('canvas');
    d.width = size;
    d.height = size;
    const dc = d.getContext('2d')!;
    dc.fillStyle = 'rgb(128,128,128)';
    dc.fillRect(0, 0, size, size);

    // more craters, larger and slightly deeper
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = (Math.random() * 0.32 + 0.05) * size;
      const depth = Math.random() * 0.28 + 0.08; // stronger depth
      const grad = dc.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(${Math.floor(80 - depth * 40)},${Math.floor(80 - depth * 40)},${Math.floor(80 - depth * 40)},${depth})`);
      grad.addColorStop(0.6, `rgba(120,120,120,${depth * 0.6})`);
      grad.addColorStop(1, 'rgba(128,128,128,0)');
      dc.fillStyle = grad;
      dc.beginPath();
      dc.arc(x, y, r, 0, Math.PI * 2);
      dc.fill();

      // rim
      const rimR = r * (Math.random() * 0.35 + 0.55);
      const rimGrad = dc.createRadialGradient(x, y, rimR * 0.8, x, y, rimR);
      rimGrad.addColorStop(0, `rgba(200,200,200,${depth * 0.6})`);
      rimGrad.addColorStop(1, 'rgba(128,128,128,0)');
      dc.fillStyle = rimGrad;
      dc.beginPath();
      dc.arc(x, y, rimR, 0, Math.PI * 2);
      dc.fill();
    }

    const colorMap = new THREE.CanvasTexture(c);
    colorMap.anisotropy = 8;
    colorMap.encoding = THREE.sRGBEncoding;
    colorMap.needsUpdate = true;

    const displacementMap = new THREE.CanvasTexture(d);
    displacementMap.anisotropy = 4;
    displacementMap.encoding = THREE.LinearEncoding;
    displacementMap.needsUpdate = true;

    return { colorMap, displacementMap };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 256, 256]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#e9eef2"
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={0.04} // slightly softer craters for lighter look
        roughness={0.86}
        metalness={0.10}
        envMapIntensity={0.6}
      />
    </Sphere>
  );
}