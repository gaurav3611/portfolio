"use client";

import { Edges, Line, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  ShaderMaterial,
  Vector3,
  type Group,
  type Mesh,
  type Object3D,
  type PerspectiveCamera,
} from "three";
import type { Line2 } from "three-stdlib";

const INK = "#0b0b0b";
const PAPER = "#f3f0e8";

/* ── Swing timeline (seconds). Deterministic and illustrative — not sensor data. ── */
const T_BACK = 0.3; // ready → backswing starts
const T_TOP = 1.0; // top of backswing
const T_DOWN = 1.1; // short hold, then the forward swing
const T_FINISH = 2.0; // balanced finish
const T_CONTACT = (T_DOWN + T_FINISH) / 2; // peak speed of the forward swing
const T_END = 2.5; // trail has faded

type Pose = { angle: number; twist: number; x: number; y: number };
// angle: rotation in the swing plane about the grip (0 = bat hanging straight down).
// twist: wrist roll about the bat's long axis. x/y: where the hands are.
const READY: Pose = { angle: -0.35, twist: 0.15, x: -0.25, y: 0.55 };
const TOP: Pose = { angle: -1.95, twist: -0.3, x: -0.5, y: 0.7 };
const FINISH: Pose = { angle: 1.95, twist: 0.85, x: 0.4, y: 0.6 };

const easeInOutSine = (u: number) => -(Math.cos(Math.PI * u) - 1) / 2;
// Quartic in-out: slow start, very fast through the middle (contact), soft finish.
const easeInOutQuart = (u: number) => (u < 0.5 ? 8 * u ** 4 : 1 - (-2 * u + 2) ** 4 / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const mix = (a: Pose, b: Pose, u: number): Pose => ({
  angle: a.angle + (b.angle - a.angle) * u,
  twist: a.twist + (b.twist - a.twist) * u,
  x: a.x + (b.x - a.x) * u,
  y: a.y + (b.y - a.y) * u,
});

function poseAt(t: number): Pose {
  if (t < T_BACK) return READY;
  if (t < T_TOP) return mix(READY, TOP, easeInOutSine((t - T_BACK) / (T_TOP - T_BACK)));
  if (t < T_DOWN) return TOP;
  return mix(TOP, FINISH, easeInOutQuart(clamp01((t - T_DOWN) / (T_FINISH - T_DOWN))));
}

/* Bat geometry (local units, grip at y = 0, toe at y = -3.05). */
const SWEET_Y = -2.45;
const TOE_Y = -3.05;
const MID_Y = -1.75;

/* Framing box covering every pose above; the camera is fitted to it for any aspect ratio. */
const FRAME = { cx: -0.05, cy: -0.42, hw: 3.45, hh: 2.4 };
const FOV = 30;

/* Ink smear trail: a short ribbon behind the toe, tapering with age. Time-based so slow
   devices get the same length of smear as fast ones. */
const MAX_SAMPLES = 40;
const TRAIL_LIFE = 0.14; // seconds of motion kept in the smear
const TRAIL_WIDTH = 0.42; // fraction of toe→mid-blade at the newest sample
const SUB_STEP = 0.008;

/* Speed arcs drawn in the swing plane around the mean grip position. */
const ARC_CENTER = { x: -0.05, y: 0.62 };
const ARCS = [
  { r: 2.7, a0: -1.25, a1: 0.35, w: 2 },
  { r: 2.95, a0: -1.5, a1: 0.15, w: 3.5 },
  { r: 3.2, a0: -1.05, a1: 0.45, w: 2 },
  { r: 3.45, a0: -1.35, a1: 0.05, w: 1.2 },
].map((a) => ({
  ...a,
  points: Array.from({ length: 24 }, (_, i) => {
    const ang = a.a0 + ((a.a1 - a.a0) * i) / 23;
    return [ARC_CENTER.x + a.r * Math.sin(ang), ARC_CENTER.y - a.r * Math.cos(ang), -0.3] as [number, number, number];
  }),
}));
// Arcs flash in during the forward swing and are gone shortly after contact.
const arcOpacity = (t: number) =>
  t < 1.3 || t > 1.8 ? 0 : t < T_CONTACT ? (t - 1.3) / (T_CONTACT - 1.3) : 1 - (t - T_CONTACT) / (1.8 - T_CONTACT);

const tmpA = new Vector3();
const tmpB = new Vector3();

/** Screen-space halftone: paper where lit, growing ink dots into shadow. Monochrome only. */
function makeHalftone(dpr: number) {
  return new ShaderMaterial({
    uniforms: { uScale: { value: 5 * dpr } },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uScale;
      varying vec3 vNormal;
      void main() {
        vec3 light = normalize(vec3(-0.45, 0.65, 0.6));
        float shade = 1.0 - clamp(dot(normalize(vNormal), light), 0.0, 1.0);
        vec2 p = gl_FragCoord.xy / uScale;
        p = mat2(0.7071, -0.7071, 0.7071, 0.7071) * p;
        vec2 g = fract(p) - 0.5;
        float radius = smoothstep(0.25, 0.95, shade) * 0.72;
        float ink = 1.0 - step(radius, length(g));
        vec3 paper = vec3(0.953, 0.941, 0.910);
        gl_FragColor = vec4(mix(paper, vec3(0.043), ink), 1.0);
      }`,
  });
}

type Props = {
  replay: number;
  autoplay: boolean;
  still: boolean;
  burst: RefObject<HTMLDivElement | null>;
  onStart: () => void;
  onEnd: () => void;
};

function Rig({ replay, autoplay, still, burst, onStart, onEnd }: Props) {
  const hands = useRef<Group>(null);
  const swing = useRef<Group>(null);
  const roll = useRef<Group>(null);
  const toe = useRef<Object3D>(null);
  const mid = useRef<Object3D>(null);
  const sweet = useRef<Object3D>(null);
  const arcs = useRef<(Line2 | null)[]>([]);

  const start = useRef<number | null>(null);
  const seen = useRef<number | null>(null);
  const lastT = useRef(0);
  const samples = useRef<{ toe: Vector3; mid: Vector3; t: number }[]>([]);
  const idleT = useRef(0); // ready pose until the first swing, then hold the finish
  const frameAspect = useRef(0);
  // Props are read through refs so the frame loop can drive them imperatively.
  const callbacks = useRef({ onStart, onEnd, burst });
  useEffect(() => {
    callbacks.current = { onStart, onEnd, burst };
  }, [onStart, onEnd, burst]);
  const trailMesh = useRef<Mesh>(null);

  const invalidate = useThree((s) => s.invalidate);
  const dpr = useThree((s) => s.viewport.dpr);
  const halftone = useMemo(() => makeHalftone(dpr), [dpr]);
  const trail = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(MAX_SAMPLES * 2 * 3), 3));
    const idx: number[] = [];
    for (let k = 0; k < MAX_SAMPLES - 1; k++) idx.push(2 * k, 2 * k + 1, 2 * k + 2, 2 * k + 1, 2 * k + 3, 2 * k + 2);
    g.setIndex(idx);
    g.setDrawRange(0, 0);
    return g;
  }, []);

  useEffect(() => () => halftone.dispose(), [halftone]);
  useEffect(() => () => trail.dispose(), [trail]);
  useEffect(() => invalidate(), [replay, invalidate]);
  // Unmounting mid-swing must not leave the parent's replay button disabled.
  useEffect(() => () => callbacks.current.onEnd(), []);

  const applyPose = (p: Pose) => {
    hands.current!.position.set(p.x, p.y, 0);
    swing.current!.rotation.z = p.angle;
    roll.current!.rotation.y = p.twist;
    hands.current!.updateMatrixWorld(true);
  };

  const pushSample = (t: number) => {
    const s = samples.current;
    s.push({ toe: toe.current!.getWorldPosition(new Vector3()), mid: mid.current!.getWorldPosition(new Vector3()), t });
    if (s.length > MAX_SAMPLES) s.shift();
  };
  const expireSamples = (t: number) => {
    const s = samples.current;
    while (s.length && t - s[0].t > TRAIL_LIFE) s.shift();
  };

  const writeTrail = () => {
    const s = samples.current;
    const geo = trailMesh.current!.geometry;
    const pos = geo.getAttribute("position") as BufferAttribute;
    const n = s.length;
    for (let i = 0; i < n; i++) {
      // newest sample is widest; oldest collapses onto the toe → a tapered smear
      const age = n > 1 ? 1 - i / (n - 1) : 0;
      tmpA.copy(s[i].toe);
      tmpB.copy(s[i].toe).lerp(s[i].mid, (1 - age) ** 1.5 * TRAIL_WIDTH);
      pos.setXYZ(2 * i, tmpA.x, tmpA.y, -0.15);
      pos.setXYZ(2 * i + 1, tmpB.x, tmpB.y, -0.15);
    }
    pos.needsUpdate = true;
    geo.setDrawRange(0, n > 1 ? (n - 1) * 6 : 0);
  };

  const showBurst = (camera: PerspectiveCamera, w: number, h: number, animate: boolean) => {
    const el = callbacks.current.burst.current;
    if (!el) return;
    sweet.current!.getWorldPosition(tmpA).project(camera);
    el.style.left = `${((tmpA.x + 1) / 2) * w}px`;
    el.style.top = `${((1 - tmpA.y) / 2) * h}px`;
    el.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    if (!animate) {
      el.style.opacity = "1";
      return;
    }
    el.style.opacity = "0";
    el.animate(
      [
        // Full ink on the contact frame itself — manga impact frames don't fade in.
        { opacity: 1, transform: "translate(-50%,-50%) scale(0.7) rotate(-8deg)" },
        { opacity: 1, transform: "translate(-50%,-50%) scale(1.1) rotate(0deg)", offset: 0.12 },
        { opacity: 1, transform: "translate(-50%,-50%) scale(1) rotate(2deg)", offset: 0.65 },
        { opacity: 0, transform: "translate(-50%,-50%) scale(1.15) rotate(4deg)" },
      ],
      { duration: 560, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
    el.querySelectorAll<SVGGElement>("[data-drop]").forEach((d) => {
      const [dx, dy] = (d.dataset.drop ?? "0,0").split(",").map(Number);
      d.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${dx}px,${dy}px)`, opacity: 0 }], {
        duration: 480,
        easing: "cubic-bezier(.1,.7,.3,1)",
      });
    });
  };

  useFrame((state) => {
    const camera = state.camera as PerspectiveCamera;
    const { width, height } = state.size;

    // Fit the camera so every pose stays in frame at this aspect ratio (no zooms mid-swing).
    const aspect = width / height;
    if (aspect !== frameAspect.current) {
      frameAspect.current = aspect;
      const tan = Math.tan((FOV * Math.PI) / 360);
      const dist = Math.max(FRAME.hh / tan, FRAME.hw / (tan * aspect)) * 1.06;
      camera.position.set(FRAME.cx, FRAME.cy, dist);
      camera.lookAt(FRAME.cx, FRAME.cy, 0);
      camera.updateMatrixWorld(); // the burst projection below needs current matrices
    }

    // A new swing request: restart from the ready pose with a clean trail.
    if (seen.current !== replay) {
      const first = seen.current === null;
      seen.current = replay;
      samples.current = [];
      lastT.current = 0;
      idleT.current = 0;
      const el = callbacks.current.burst.current;
      if (el) {
        el.getAnimations({ subtree: true }).forEach((a) => a.cancel());
        el.style.opacity = "0";
      }
      if (still) {
        // Reduced motion: a composed still of the contact frame, smear included.
        for (let t = T_CONTACT - TRAIL_LIFE; t <= T_CONTACT; t += 0.01) {
          applyPose(poseAt(t));
          pushSample(t);
        }
        applyPose(poseAt(T_CONTACT));
        writeTrail();
        arcs.current.forEach((l) => l && (l.material.opacity = 0.55));
        showBurst(camera, width, height, false);
        start.current = null;
        return;
      }
      start.current = first && !autoplay ? null : state.clock.elapsedTime;
      if (start.current !== null) callbacks.current.onStart();
    }
    if (still) return;

    const t = start.current === null ? idleT.current : Math.min(state.clock.elapsedTime - start.current, T_END);

    // Trail: the pose is deterministic, so sub-sample it between frames for a smooth smear
    // even when frames drop. Old samples expire so the smear shrinks away after the swing.
    for (let tt = Math.max(lastT.current, T_DOWN) + SUB_STEP; tt <= Math.min(t, T_FINISH); tt += SUB_STEP) {
      applyPose(poseAt(tt));
      pushSample(tt);
    }
    expireSamples(t);
    writeTrail();

    // Contact: place the burst from the exact contact pose, even if this frame overshot it.
    if (lastT.current < T_CONTACT && t >= T_CONTACT) {
      applyPose(poseAt(T_CONTACT));
      showBurst(camera, width, height, true);
    }
    applyPose(poseAt(t));

    const o = arcOpacity(t);
    arcs.current.forEach((l) => l && (l.material.opacity = o));

    lastT.current = t;

    if (start.current !== null) {
      if (t < T_END) invalidate();
      else {
        start.current = null;
        idleT.current = T_END;
        callbacks.current.onEnd();
      }
    }
  });

  return (
    <>
      {/* Pitch crease — one reference line so the swing reads against the ground */}
      <Line points={[[-4.2, -2.72, -0.4], [4.2, -2.72, -0.4]]} color={INK} lineWidth={1.5} />

      {ARCS.map((a, i) => (
        <Line
          key={i}
          ref={(l) => {
            arcs.current[i] = l as Line2 | null;
          }}
          points={a.points}
          color={INK}
          lineWidth={a.w}
          transparent
          opacity={0}
          depthWrite={false}
        />
      ))}

      <mesh ref={trailMesh} geometry={trail} renderOrder={-1}>
        <meshBasicMaterial color={INK} side={DoubleSide} transparent opacity={0.88} depthWrite={false} />
      </mesh>

      <group ref={hands}>
        <group ref={swing}>
          <group ref={roll}>
            {/* handle: inverted-hull ink outline + halftone body + grip wraps */}
            <mesh position={[0, -0.5, 0]} scale={[1.35, 1.02, 1.35]}>
              <cylinderGeometry args={[0.055, 0.065, 1, 16]} />
              <meshBasicMaterial color={INK} side={BackSide} />
            </mesh>
            <mesh position={[0, -0.5, 0]} material={halftone}>
              <cylinderGeometry args={[0.055, 0.065, 1, 16]} />
            </mesh>
            {[0.12, 0.26, 0.4, 0.54, 0.68].map((y) => (
              <mesh key={y} position={[0, -y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.064, 0.01, 6, 20]} />
                <meshBasicMaterial color={INK} />
              </mesh>
            ))}
            {/* sensor module (ESP32 + MPU6050) strapped below the grip */}
            <mesh position={[0, -0.86, 0.075]}>
              <boxGeometry args={[0.17, 0.2, 0.06]} />
              <meshBasicMaterial color={INK} />
            </mesh>
            <mesh position={[0, -0.86, 0.107]}>
              <planeGeometry args={[0.1, 0.05]} />
              <meshBasicMaterial color={PAPER} />
            </mesh>
            {/* blade: outline hull, halftone face with crisp ink edges, ridge on the back */}
            <RoundedBox args={[0.42, 2.0, 0.12]} radius={0.05} smoothness={3} position={[0, -2.05, 0]} scale={[1.13, 1.025, 1.5]}>
              <meshBasicMaterial color={INK} side={BackSide} />
            </RoundedBox>
            <RoundedBox args={[0.42, 2.0, 0.12]} radius={0.05} smoothness={3} position={[0, -2.05, 0]} material={halftone}>
              <Edges color={INK} threshold={30} />
            </RoundedBox>
            <mesh position={[0, -2.1, -0.06]} scale={[1, 1, 0.55]} material={halftone}>
              <cylinderGeometry args={[0.14, 0.17, 1.8, 20, 1, false, Math.PI / 2, Math.PI]} />
            </mesh>
            {/* reference points for the trail and the impact burst */}
            <object3D ref={toe} position={[0, TOE_Y, 0]} />
            <object3D ref={mid} position={[0, MID_Y, 0]} />
            <object3D ref={sweet} position={[0, SWEET_Y, 0.1]} />
          </group>
        </group>
      </group>
    </>
  );
}

/** A12: illustrative 3D cricket swing. Never connects to hardware or requests Bluetooth. */
export default function SwingScene(props: Props) {
  return (
    <Canvas
      role="img"
      aria-label="Illustrative 3D animation of a cricket bat swing: ready stance, backswing, forward swing with an ink impact burst at contact, and follow-through. Not live sensor data."
      dpr={[1, 1.75]}
      frameloop="demand"
      camera={{ fov: FOV, position: [0, 0, 12] }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <Rig {...props} />
    </Canvas>
  );
}
