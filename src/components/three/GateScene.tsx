"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

const PALETTE = ["#3b82f6", "#06b6d4", "#10b981"];

/** Deterministic PRNG — keeps render-time data generation pure. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Uniform random unit vector from two seeded samples. */
function randomDir(rand: () => number) {
  const z = rand() * 2 - 1;
  const phi = rand() * Math.PI * 2;
  const r = Math.sqrt(1 - z * z);
  return new THREE.Vector3(Math.cos(phi) * r, Math.sin(phi) * r, z);
}

// scratch object for per-frame matrix math — module scope, never re-created
const tmpObject = new THREE.Object3D();

/**
 * The sliceable core: a faceted solid gem inside a wireframe cage.
 * Every cut leaves a glowing ring at the slash angle, spreads cracks
 * (emissive wireframe) and lets more inner light leak out.
 */
function Core({
  slices,
  exploding,
  cutAngles,
}: {
  slices: number;
  exploding: boolean;
  cutAngles: number[];
}) {
  const group = useRef<THREE.Group>(null);
  const punch = useRef(0);
  const prevHits = useRef(0);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (slices !== prevHits.current) {
      punch.current = 1; // scale kick on every cut
      prevHits.current = slices;
    }
    punch.current = Math.max(0, punch.current - delta * 3);

    if (exploding) {
      g.scale.setScalar(Math.max(0.001, g.scale.x - delta * 8));
      g.visible = g.scale.x > 0.01;
      return;
    }
    const t = state.clock.elapsedTime;
    g.rotation.y += delta * (0.2 + slices * 0.3);
    g.rotation.x = Math.sin(t * (1 + slices * 1.3)) * (0.05 + slices * 0.05);
    g.scale.setScalar(1 + punch.current * 0.16 + slices * 0.02);
  });

  const color = PALETTE[Math.min(slices, 2)];
  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={group}>
        {/* faceted gem — the "real" object catching light and casting shadow */}
        <mesh castShadow>
          <icosahedronGeometry args={[1.45, 0]} />
          <meshStandardMaterial
            color={color}
            flatShading
            roughness={0.22}
            metalness={0.45}
            emissive={color}
            emissiveIntensity={0.06 + slices * 0.28}
          />
        </mesh>
        {/* cracks: bright wireframe spreading as the core takes damage */}
        {slices > 0 && (
          <mesh rotation={[0.9, 0.3, 0.5]}>
            <icosahedronGeometry args={[1.47, 1]} />
            <meshBasicMaterial
              color="#a5f3fc"
              wireframe
              transparent
              opacity={slices * 0.2}
            />
          </mesh>
        )}
        {/* glowing cut ring left by each slash, oriented to the stroke */}
        {cutAngles.map((angle, i) => (
          <group key={i} rotation={[0, 0, -angle]}>
            <mesh rotation={[1.35, 0, 0]}>
              <torusGeometry args={[1.58, 0.016, 8, 96]} />
              <meshBasicMaterial color="#22d3ee" transparent opacity={0.9} />
            </mesh>
          </group>
        ))}
        {/* wireframe cage around it */}
        <mesh rotation={[0.4, 0.8, 0]}>
          <icosahedronGeometry args={[2.05, 1]} />
          <meshBasicMaterial
            color={PALETTE[(slices + 1) % 3]}
            wireframe
            transparent
            opacity={0.22 + slices * 0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Solid faceted shards flung outward when the core finally gives. */
function Shards({ active }: { active: boolean }) {
  const count = 90;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const elapsed = useRef(0);

  const shards = useMemo(() => {
    const rand = mulberry32(3611);
    return Array.from({ length: count }, () => ({
      dir: randomDir(rand),
      speed: 2.6 + rand() * 3.6,
      spin: 2 + rand() * 5,
      scale: 0.09 + rand() * 0.18,
    }));
  }, []);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      c.set(PALETTE[i % PALETTE.length]);
      m.setColorAt(i, c);
    }
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, []);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    if (!active) {
      m.visible = false;
      elapsed.current = 0;
      return;
    }
    m.visible = true;
    elapsed.current += delta;
    const t = elapsed.current;
    for (let i = 0; i < count; i++) {
      const s = shards[i];
      const dist = 1.4 + s.speed * t;
      tmpObject.position.copy(s.dir).multiplyScalar(dist);
      tmpObject.position.y -= t * t * 1.4; // slight gravity
      tmpObject.rotation.set(s.spin * t, s.spin * t * 1.3, s.spin * t * 0.7);
      tmpObject.scale.setScalar(s.scale * Math.max(0, 1 - t * 0.75));
      tmpObject.updateMatrix();
      m.setMatrixAt(i, tmpObject.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    (m.material as THREE.MeshStandardMaterial).opacity = Math.max(
      0,
      1 - t * 0.8
    );
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count]}
      visible={false}
      castShadow
    >
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        flatShading
        roughness={0.3}
        metalness={0.35}
        transparent
        opacity={1}
      />
    </instancedMesh>
  );
}

/** Fast bright fragments thrown out the instant the core detonates. */
function BurstSparks({ active }: { active: boolean }) {
  const count = 140;
  const geo = useRef<THREE.BufferGeometry>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const elapsed = useRef(0);

  const [initial, dirs] = useMemo(() => {
    const rand = mulberry32(9955);
    const pos = new Float32Array(count * 3); // all zeros — burst origin
    const d: { v: THREE.Vector3; speed: number }[] = [];
    for (let i = 0; i < count; i++) {
      d.push({ v: randomDir(rand), speed: 4 + rand() * 9 });
    }
    return [pos, d] as const;
  }, []);

  useFrame((_, delta) => {
    const g = geo.current;
    const m = mat.current;
    if (!g || !m) return;
    if (!active) {
      elapsed.current = 0;
      m.opacity = 0;
      return;
    }
    elapsed.current += delta;
    const t = elapsed.current;
    const attr = g.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const d = dirs[i];
      arr[i * 3] = d.v.x * d.speed * t;
      arr[i * 3 + 1] = d.v.y * d.speed * t - t * t * 2.2;
      arr[i * 3 + 2] = d.v.z * d.speed * t;
    }
    attr.needsUpdate = true;
    m.opacity = Math.max(0, 1 - t * 1.4);
  });

  return (
    <points>
      <bufferGeometry ref={geo}>
        <bufferAttribute attach="attributes-position" args={[initial, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.07}
        color="#22d3ee"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Sparse points shell for depth behind the core. */
function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(1145);
    const pos = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      const v = randomDir(rand).multiplyScalar(4 + rand() * 6);
      pos[i * 3] = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#0891b2"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function GateScene({
  slices,
  exploding,
  cutAngles,
}: {
  slices: number;
  exploding: boolean;
  cutAngles: number[];
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.7, 7], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="absolute inset-0"
      aria-hidden
    >
      {/* studio-ish lighting: warm key, cool fill, soft ambient */}
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[4, 7, 4]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, -2, 3]} intensity={40} color="#06b6d4" />

      <Dust />
      <Core slices={slices} exploding={exploding} cutAngles={cutAngles} />
      <Shards active={exploding} />
      <BurstSparks active={exploding} />

      {/* soft grounding shadow under the floating core; fades at the break
          so the shard swarm doesn't darken the whole plane */}
      <ContactShadows
        position={[0, -2.7, 0]}
        opacity={exploding ? 0 : 0.3}
        scale={26}
        blur={2.8}
        far={2.6}
        resolution={512}
        color="#0f172a"
      />
    </Canvas>
  );
}
