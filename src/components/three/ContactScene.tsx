"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const PALETTE = ["#3b82f6", "#06b6d4", "#10b981"];

/** Points distributed on a fibonacci sphere — a minimal wire "globe". */
function Globe() {
  const group = useRef<THREE.Group>(null);
  const count = 900;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    const golden = Math.PI * (3 - Math.sqrt(5));
    const R = 2.7;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pos[i * 3] = Math.cos(theta) * r * R;
      pos[i * 3 + 1] = y * R;
      pos[i * 3 + 2] = Math.sin(theta) * r * R;
      c.set(PALETTE[i % PALETTE.length]);
      c.multiplyScalar(0.5 + (i % 5) * 0.06);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    // ease toward the pointer for a gentle parallax
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * 0.25 + 0.2,
      2,
      delta
    );
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
      {/* orbit rings */}
      <mesh rotation={[1.35, 0.2, 0]}>
        <torusGeometry args={[3.4, 0.006, 8, 128]} />
        <meshBasicMaterial
          color="#0891b2"
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh rotation={[1.1, -0.4, 0.5]}>
        <torusGeometry args={[3.8, 0.004, 8, 128]} />
        <meshBasicMaterial
          color="#059669"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="absolute inset-0"
      aria-hidden
    >
      <Globe />
    </Canvas>
  );
}
