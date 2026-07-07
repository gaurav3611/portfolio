"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const PALETTE = ["#3b82f6", "#06b6d4", "#10b981"];

/** Deterministic PRNG (mulberry32) — stable particle layout across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A flat galaxy of ~2600 points in the brand palette. */
function Particles({ count = 2600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const rand = mulberry32(1145);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.pow(rand(), 0.7) * 9;
      const angle = rand() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (rand() - 0.5) * (radius * 0.42);
      pos[i * 3 + 2] = Math.sin(angle) * radius - 2;

      c.set(PALETTE[i % PALETTE.length]);
      c.multiplyScalar(0.55 + rand() * 0.4);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.025;
  });

  return (
    <points ref={ref} rotation={[0.35, 0, 0.12]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

/** Wireframe icosahedron core with a tilted orbit ring. */
function Core() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y += delta * 0.12;
      outer.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.2;
      const s = 1 + Math.sin(t * 0.8) * 0.04;
      inner.current.scale.setScalar(s);
    }
    if (ring.current) ring.current.rotation.z += delta * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9}>
      <group position={[2.6, 0.4, 0]}>
        <mesh ref={outer}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial
            color="#2563eb"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.15, 0]} />
          <meshBasicMaterial
            color="#0891b2"
            wireframe
            transparent
            opacity={0.42}
          />
        </mesh>
        <mesh ref={ring} rotation={[1.15, 0.3, 0]}>
          <torusGeometry args={[3.1, 0.008, 8, 128]} />
          <meshBasicMaterial
            color="#059669"
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Eases the camera toward the pointer for a subtle parallax. */
function Rig() {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      pointer.x * 0.7,
      2,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      pointer.y * 0.45,
      2,
      delta
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="absolute inset-0"
      aria-hidden
    >
      <fog attach="fog" args={["#f7f7f9", 9, 22]} />
      <Particles />
      <Core />
      <Rig />
    </Canvas>
  );
}
