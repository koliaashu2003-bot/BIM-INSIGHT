'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const GOLD = '#d4af37';

function CoreObject() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += delta * 0.05;
    // gentle mouse parallax
    const { x, y } = state.pointer;
    group.current.rotation.y += x * delta * 0.4;
    group.current.rotation.x += -y * delta * 0.2;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Faceted metallic core */}
        <Icosahedron args={[1.6, 0]}>
          <meshStandardMaterial
            color={GOLD}
            metalness={1}
            roughness={0.22}
            emissive={GOLD}
            emissiveIntensity={0.08}
            flatShading
          />
        </Icosahedron>
        {/* Orbiting rings */}
        <Torus args={[2.6, 0.012, 16, 120]} rotation={[Math.PI / 2.2, 0, 0]}>
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.3} />
        </Torus>
        <Torus args={[3.1, 0.008, 16, 120]} rotation={[Math.PI / 1.7, 0.5, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.6}
            roughness={0.4}
            transparent
            opacity={0.35}
          />
        </Torus>
      </Float>
    </group>
  );
}

function Particles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={GOLD} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={2.2} color="#fff4d0" />
        <pointLight position={[-6, -2, -4]} intensity={30} color={GOLD} />
        <pointLight position={[6, 4, 2]} intensity={12} color="#ffffff" />
        <CoreObject />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
