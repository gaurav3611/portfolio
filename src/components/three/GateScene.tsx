"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

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

const WEDGES = 6;
const RADIUS = 1.6;
const WEDGE_PHI = (Math.PI * 2) / WEDGES;

/* ── Procedural watermelon textures (lazy module singletons) ──── */

let rindTexture: THREE.CanvasTexture | null = null;
function getRindTexture() {
  if (rindTexture) return rindTexture;
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  // light rind base
  ctx.fillStyle = "#7cb95a";
  ctx.fillRect(0, 0, 512, 512);
  // three wavy dark stripes per wedge-width (pattern tiles per wedge)
  ctx.fillStyle = "#1d5e2c";
  for (let s = 0; s < 3; s++) {
    const cx = 512 * ((s + 0.5) / 3);
    ctx.beginPath();
    for (let y = 0; y <= 512; y += 8) {
      const w = 42 + Math.sin(y * 0.045 + s * 2) * 14;
      const x = cx + Math.sin(y * 0.02 + s) * 10 - w / 2;
      if (y === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    for (let y = 512; y >= 0; y -= 8) {
      const w = 42 + Math.sin(y * 0.045 + s * 2) * 14;
      const x = cx + Math.sin(y * 0.02 + s) * 10 + w / 2;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
  rindTexture = new THREE.CanvasTexture(c);
  rindTexture.colorSpace = THREE.SRGBColorSpace;
  return rindTexture;
}

let fleshTexture: THREE.CanvasTexture | null = null;
function getFleshTexture() {
  if (fleshTexture) return fleshTexture;
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  const cx = 256;
  const R = 250;
  ctx.clearRect(0, 0, 512, 512);
  // green skin edge
  ctx.fillStyle = "#1d5e2c";
  ctx.beginPath();
  ctx.arc(cx, cx, R, 0, Math.PI * 2);
  ctx.fill();
  // white inner rind — the pale layer behind every piece
  ctx.fillStyle = "#f4f7ee";
  ctx.beginPath();
  ctx.arc(cx, cx, R - 10, 0, Math.PI * 2);
  ctx.fill();
  // red flesh
  const g = ctx.createRadialGradient(cx, cx, 20, cx, cx, R - 44);
  g.addColorStop(0, "#fb7185");
  g.addColorStop(0.55, "#f43f5e");
  g.addColorStop(1, "#e11d48");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cx, R - 44, 0, Math.PI * 2);
  ctx.fill();
  // black seeds, pointing outward
  const rand = mulberry32(1145);
  for (let i = 0; i < 30; i++) {
    const a = rand() * Math.PI * 2;
    const r = 55 + rand() * 135;
    const x = cx + Math.cos(a) * r;
    const y = cx + Math.sin(a) * r;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a + Math.PI / 2);
    ctx.fillStyle = rand() > 0.82 ? "#f8fafc" : "#191512";
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.5, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  fleshTexture = new THREE.CanvasTexture(c);
  fleshTexture.colorSpace = THREE.SRGBColorSpace;
  return fleshTexture;
}

/* ── The melon: six wedges that fall apart as they're cut ─────── */

type WedgeState = {
  falling: boolean;
  vel: THREE.Vector3;
  ang: THREE.Vector3;
};

function Watermelon({
  slices,
  exploding,
}: {
  slices: number;
  exploding: boolean;
}) {
  const melon = useRef<THREE.Group>(null);
  const wedgeRefs = useRef<(THREE.Group | null)[]>([]);
  const prevSlices = useRef(0);
  const prevExploding = useRef(false);
  const punch = useRef(0);

  const rind = useMemo(() => getRindTexture(), []);
  const flesh = useMemo(() => getFleshTexture(), []);

  // per-wedge physics state + seeded tumble variation
  const states = useRef<WedgeState[]>(
    Array.from({ length: WEDGES }, () => ({
      falling: false,
      vel: new THREE.Vector3(),
      ang: new THREE.Vector3(),
    }))
  );
  const tumble = useMemo(() => {
    const rand = mulberry32(3611);
    return Array.from({ length: WEDGES }, () => ({
      spin: 1.5 + rand() * 2.5,
      jitter: randomDir(rand),
    }));
  }, []);

  // which wedges drop on cut 1 and cut 2 (the rest blow apart on cut 3)
  const dropPlan = [[0], [1]];

  function releaseWedge(i: number, power: number, up: number) {
    const st = states.current[i];
    if (st.falling) return;
    st.falling = true;
    const phiC = i * WEDGE_PHI + WEDGE_PHI / 2;
    // outward radial direction of this wedge (three.js sphere param)
    const dir = new THREE.Vector3(-Math.cos(phiC), 0, Math.sin(phiC));
    st.vel.copy(dir).multiplyScalar(power);
    st.vel.y += up;
    st.ang
      .copy(tumble[i].jitter)
      .multiplyScalar(tumble[i].spin * (power * 0.5));
  }

  useFrame((_, delta) => {
    // react to new cuts
    if (slices !== prevSlices.current) {
      punch.current = 1;
      const plan = dropPlan[slices - 1];
      if (plan) for (const i of plan) releaseWedge(i, 1.6, 2.3);
      prevSlices.current = slices;
    }
    if (exploding && !prevExploding.current) {
      for (let i = 0; i < WEDGES; i++) releaseWedge(i, 4.5 + (i % 3), 2.8);
      prevExploding.current = true;
    }
    punch.current = Math.max(0, punch.current - delta * 3);

    if (melon.current) {
      melon.current.scale.setScalar(1 + punch.current * 0.12);
    }

    // integrate falling wedges
    for (let i = 0; i < WEDGES; i++) {
      const st = states.current[i];
      const g = wedgeRefs.current[i];
      if (!g || !st.falling) continue;
      st.vel.y -= 7.5 * delta; // gravity
      g.position.addScaledVector(st.vel, delta);
      g.rotation.x += st.ang.x * delta;
      g.rotation.y += st.ang.y * delta;
      g.rotation.z += st.ang.z * delta;
      if (g.position.y < -12) g.visible = false; // long gone
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={melon} rotation={[0.12, 0.5, -0.08]} scale={[1, 1.12, 1]}>
        {Array.from({ length: WEDGES }).map((_, i) => {
          const phi0 = i * WEDGE_PHI;
          return (
            <group
              key={i}
              ref={(el) => {
                wedgeRefs.current[i] = el;
              }}
            >
              {/* striped rind shell */}
              <mesh castShadow>
                <sphereGeometry args={[RADIUS, 48, 32, phi0, WEDGE_PHI]} />
                <meshStandardMaterial
                  map={rind}
                  roughness={0.45}
                  metalness={0.05}
                />
              </mesh>
              {/* flat cut faces: red flesh, black seeds, white rind ring */}
              {[phi0, phi0 + WEDGE_PHI].map((phi, f) => (
                <group key={f} rotation={[0, phi + Math.PI, 0]}>
                  <mesh>
                    <circleGeometry
                      args={[RADIUS * 0.995, 48, -Math.PI / 2, Math.PI]}
                    />
                    <meshStandardMaterial
                      map={flesh}
                      roughness={0.75}
                      metalness={0}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                </group>
              ))}
            </group>
          );
        })}
      </group>
    </Float>
  );
}

/* ── Juice droplets sprayed on detonation ─────────────────────── */

function JuiceBurst({ active }: { active: boolean }) {
  const count = 160;
  const geo = useRef<THREE.BufferGeometry>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const elapsed = useRef(0);

  const [initial, dirs] = useMemo(() => {
    const rand = mulberry32(9955);
    const pos = new Float32Array(count * 3);
    const d: { v: THREE.Vector3; speed: number }[] = [];
    for (let i = 0; i < count; i++) {
      d.push({ v: randomDir(rand), speed: 3.5 + rand() * 8 });
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
      arr[i * 3 + 1] = d.v.y * d.speed * t - t * t * 3;
      arr[i * 3 + 2] = d.v.z * d.speed * t;
    }
    attr.needsUpdate = true;
    m.opacity = Math.max(0, 1 - t * 1.2);
  });

  return (
    <points>
      <bufferGeometry ref={geo}>
        <bufferAttribute attach="attributes-position" args={[initial, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.08}
        color="#e11d48"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function GateScene({
  slices,
  exploding,
}: {
  slices: number;
  exploding: boolean;
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
      {/* soft daylight: warm key, cool fill, gentle ambient */}
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[4, 7, 4]}
        intensity={1.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, -2, 3]} intensity={22} color="#fef3c7" />

      <Watermelon slices={slices} exploding={exploding} />
      <JuiceBurst active={exploding} />

      {/* soft grounding shadow; fades at the blast */}
      <ContactShadows
        position={[0, -2.7, 0]}
        opacity={exploding ? 0 : 0.32}
        scale={26}
        blur={2.8}
        far={2.6}
        resolution={512}
        color="#1c1917"
      />
    </Canvas>
  );
}
