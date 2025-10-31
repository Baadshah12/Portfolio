import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export interface HeroModelHandle {
  getGroup: () => THREE.Group | null;
}

const HeroModel = forwardRef<HeroModelHandle>((_, ref) => {
  const groupRef = useRef<THREE.Group>(null);

  useImperativeHandle(ref, () => ({
    getGroup: () => groupRef.current
  }));

  // Use literal URLs so Vite can statically analyze and copy these assets during build.
  // Avoid concatenating a variable into `new URL(...)` because it prevents static analysis
  // and can lead to runtime 404 (asset not copied to the final build).
  const diffuseUrl = new URL('../../astronaut/texture_diffuse.png', import.meta.url).href;
  const normalUrl = new URL('../../astronaut/texture_normal.png', import.meta.url).href;
  const roughnessUrl = new URL('../../astronaut/texture_roughness.png', import.meta.url).href;
  const metallicUrl = new URL('../../astronaut/texture_metallic.png', import.meta.url).href;
  const objUrl = new URL('../../astronaut/base.obj', import.meta.url).href;

  const obj = useLoader(OBJLoader, objUrl);
  const [map, normalMap, roughnessMap, metalnessMap] = useLoader(THREE.TextureLoader, [
    diffuseUrl,
    normalUrl,
    roughnessUrl,
    metallicUrl,
  ]);

  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      map,
      normalMap,
      roughnessMap,
      metalnessMap,
      metalness: 0.4,
      roughness: 0.6,
    });
    // color (albedo) texture should be sRGB
    if (m.map) (m.map as any).colorSpace = THREE.SRGBColorSpace;
    // non-color maps (normal/roughness/metalness) should be linear
    try {
      if (normalMap) (normalMap as any).colorSpace = (THREE as any).LinearSRGBColorSpace;
      if (roughnessMap) (roughnessMap as any).colorSpace = (THREE as any).LinearSRGBColorSpace;
      if (metalnessMap) (metalnessMap as any).colorSpace = (THREE as any).LinearSRGBColorSpace;
    } catch (e) {
      // if the runtime doesn't expose LinearSRGBColorSpace for any reason, ignore
    }
    return m;
  }, [map, normalMap, roughnessMap, metalnessMap]);

  const prepared = useMemo(() => {
    const clone = obj.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = material;
      }
    });

    const bbox = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    const desiredHeight = 1.8;
    const height = size.y > 0 ? size.y : 1;
    const scale = desiredHeight / height;

    clone.position.set(-center.x, -bbox.min.y, -center.z);
    clone.scale.setScalar(scale);
    return clone;
  }, [obj, material]);


  // initial placement + floating parameters
  const initialOffsetX = 0.15; // optional horizontal offset (positive = right)
  const initialRotationY = 0.35; // radians (base rotation)
  const baseY = -0.95; // base vertical offset for the whole model
  const floatAmplitude = 0.06; // how much to move up/down (meters)
  const floatFrequency = 0.9; // speed multiplier for the float

  // Idle float when not interacted externally — gentle up/down and slight Y rocking
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = baseY + Math.sin(t * floatFrequency) * floatAmplitude;
    // subtle rotation bob to make motion feel natural
    groupRef.current.rotation.y = initialRotationY + Math.sin(t * floatFrequency * 0.5) * 0.04;
  });

  return (
    <group ref={groupRef} dispose={null} position={[initialOffsetX, baseY, 0]} rotation={[0, initialRotationY, 0]}>
      <primitive object={prepared} />
      <Environment preset="studio" />
    </group>
  );
});

export default HeroModel;

