"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

/** Trio of slowly tumbling wireframe solids — background depth for sections. */
function Shapes({ dark }: { dark: boolean }) {
  const ico = useRef<THREE.Mesh>(null);
  const knot = useRef<THREE.Mesh>(null);
  const octa = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ico.current) {
      ico.current.rotation.x += delta * 0.1;
      ico.current.rotation.y += delta * 0.14;
    }
    if (knot.current) {
      knot.current.rotation.y -= delta * 0.12;
    }
    if (octa.current) {
      octa.current.rotation.x -= delta * 0.08;
      octa.current.rotation.z += delta * 0.1;
    }
    // whole-scene parallax toward the pointer
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      state.pointer.x * 0.4,
      2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={ico} position={[0.4, 2.3, 0]}>
          <icosahedronGeometry args={[1.05, 0]} />
          <meshBasicMaterial
            color={dark ? "#3b82f6" : "#2563eb"}
            wireframe
            transparent
            opacity={dark ? 0.35 : 0.4}
          />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
        <mesh ref={knot} position={[-0.6, -0.2, -0.5]}>
          <torusKnotGeometry args={[0.62, 0.2, 72, 10]} />
          <meshBasicMaterial
            color={dark ? "#06b6d4" : "#0891b2"}
            wireframe
            transparent
            opacity={dark ? 0.28 : 0.32}
          />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.4}>
        <mesh ref={octa} position={[0.7, -2.5, -0.2]}>
          <octahedronGeometry args={[0.85, 0]} />
          <meshBasicMaterial
            color={dark ? "#10b981" : "#059669"}
            wireframe
            transparent
            opacity={dark ? 0.35 : 0.4}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function FloatingShapes({ dark = false }: { dark?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="absolute inset-0"
      aria-hidden
    >
      <Shapes dark={dark} />
    </Canvas>
  );
}
