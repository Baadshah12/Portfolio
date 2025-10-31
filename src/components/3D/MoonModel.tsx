import { useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export default function MoonModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Use literal URLs so Vite can statically analyze and copy these assets during build.
  const objUrl = new URL('../../Moon/base.obj', import.meta.url).href;
  const diffuseUrl = new URL('../../Moon/texture_diffuse.png', import.meta.url).href;
  const normalUrl = new URL('../../Moon/texture_normal.png', import.meta.url).href;
  const roughnessUrl = new URL('../../Moon/texture_roughness.png', import.meta.url).href;
  const metallicUrl = new URL('../../Moon/texture_metallic.png', import.meta.url).href;

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
      metalness: 0.6,
      roughness: 0.7,
    });
    if (m.map) (m.map as any).colorSpace = THREE.SRGBColorSpace;
    try {
      if (normalMap) (normalMap as any).colorSpace = (THREE as any).LinearSRGBColorSpace;
      if (roughnessMap) (roughnessMap as any).colorSpace = (THREE as any).LinearSRGBColorSpace;
      if (metalnessMap) (metalnessMap as any).colorSpace = (THREE as any).LinearSRGBColorSpace;
    } catch (e) {
      // ignore
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

  const desiredHeight = 1.6; // increased size to make the moon a bit larger in the scene
    const height = size.y > 0 ? size.y : 1;
    const scale = desiredHeight / height;

    clone.position.set(-center.x, -bbox.min.y, -center.z);
    clone.scale.setScalar(scale);
    return clone;
  }, [obj, material]);

  // tweak these to rotate the moon so its spotted face points more to the camera
  const initialRotationX = -0.08; // tilt forward slightly
  const initialRotationY = 0.22; // yaw so spots face slightly to the right

  return (
    <group ref={groupRef} dispose={null} position={[0, 0, 0]} rotation={[initialRotationX, initialRotationY, 0]}>
      <primitive object={prepared} />
    </group>
  );
}
