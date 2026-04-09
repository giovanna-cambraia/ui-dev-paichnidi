"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import * as THREE from "three";

// ─── Path & Config ───────────────────────────────────────────────────────────

const PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 12),
  new THREE.Vector3(3, 1.5, 6),
  new THREE.Vector3(-2, -1.5, 2),
  new THREE.Vector3(2, 2.5, -3),
  new THREE.Vector3(-1.5, -1, -7),
  new THREE.Vector3(0, 0, -12),
]);

const STATION_CONFIGS = [
  {
    t: 0.2,
    name: "NEXUS PRIME",
    tag: "Fuel Station",
    icon: "◈",
    body: "Primary refueling hub. Home to 12,000 crew across 3 rotating rings. Plasma cores replenished here.",
  },
  {
    t: 0.4,
    name: "AURORA GATE",
    tag: "Jump Point",
    icon: "◉",
    body: "Quantum fold singularity. Transit time to core sectors reduced by 94%. Gravitational lensing creates spectacular light shows.",
  },
  {
    t: 0.6,
    name: "VEGA HOLLOW",
    tag: "Research Post",
    icon: "⬡",
    body: "Dark matter research facility. Scientists study exotic particles that bend spacetime at this deep void waypoint.",
  },
  {
    t: 0.8,
    name: "OMEGA DRIFT",
    tag: "Final Beacon",
    icon: "◆",
    body: "Last known beacon before the terminus. Ancient relay station, operational for 2,000 years.",
  },
];

const STATION_SHAPES = [
  () => new THREE.IcosahedronGeometry(1.4, 1),
  () => new THREE.OctahedronGeometry(1.5, 0),
  () => new THREE.TetrahedronGeometry(1.6, 0),
  () => new THREE.DodecahedronGeometry(1.3, 0),
];

// ─── Texture Factories ───────────────────────────────────────────────────────

function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.2, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.4, "rgba(200,150,255,0.6)");
  grad.addColorStop(0.6, "rgba(150,100,200,0.3)");
  grad.addColorStop(0.8, "rgba(100,50,150,0.1)");
  grad.addColorStop(1, "rgba(50,25,100,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  // Subtle noise
  const imgData = ctx.getImageData(0, 0, 64, 64);
  for (let i = 0; i < imgData.data.length; i += 4) {
    if (Math.random() > 0.95) {
      imgData.data[i] = Math.min(255, imgData.data[i] + 20);
      imgData.data[i + 1] = Math.min(255, imgData.data[i + 1] + 20);
      imgData.data[i + 2] = Math.min(255, imgData.data[i + 2] + 40);
    }
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.3, "rgba(255,255,200,0.8)");
  grad.addColorStop(0.6, "rgba(200,200,255,0.3)");
  grad.addColorStop(1, "rgba(100,100,150,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  // Star spike
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.lineTo(18, 14);
  ctx.lineTo(32, 16);
  ctx.lineTo(18, 18);
  ctx.lineTo(16, 32);
  ctx.lineTo(14, 18);
  ctx.lineTo(0, 16);
  ctx.lineTo(14, 14);
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ─── Scene Sub-components ────────────────────────────────────────────────────

function FogEffect() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x030008, 0.006);
    return () => {
      scene.fog = null;
    };
  }, [scene]);
  return null;
}

function PathTube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(
    () => new THREE.TubeGeometry(PATH, 300, 0.04, 16, false),
    [],
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.6 + Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial
        color="#a855f7"
        emissive="#c084fc"
        emissiveIntensity={0.8}
        transparent
        opacity={0.35}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

function Starfield() {
  const ref = useRef<THREE.Points>(null!);
  const starTexture = useMemo(() => createStarTexture(), []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 20;

      const ct = Math.random();
      if (ct < 0.7) {
        colors[i * 3] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 1;
      } else if (ct < 0.85) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.5 + Math.random() * 0.2;
      } else {
        colors[i * 3] = 0.6 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 2] = 1;
      }
      sizes[i] = 0.04 + Math.random() * 0.08;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.01;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.03;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        vertexColors
        map={starTexture}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowParticles() {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 1200;
  const particleTexture = useMemo(() => createParticleTexture(), []);

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random();
      const point = PATH.getPointAt(t);
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.5;
      positions[i * 3] = point.x + Math.cos(angle) * radius;
      positions[i * 3 + 1] = point.y + Math.sin(angle) * radius;
      positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.6;
      velocities[i] = 0.3 + Math.random() * 1.5;
      colors[i * 3] = 0.7 + Math.random() * 0.3;
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    return { positions, velocities, colors };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.size = 0.06 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) pos[i * 3 + 2] += velocities[i] * 0.01;
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        vertexColors
        map={particleTexture}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SpeedStreaks({
  scrollSpeed,
}: {
  scrollSpeed: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 400;
  const particleTexture = useMemo(() => createParticleTexture(), []);

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      velocities[i] = 0.15 + Math.random() * 1.2;
      colors[i * 3] = 0.6 + Math.random() * 0.4;
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.5;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    return { positions, velocities, colors };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const speed = Math.min(Math.abs(scrollSpeed.current) * 1.5, 2.5);
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 2] += velocities[i] * speed * delta * 50;
      if (pos[i * 3 + 2] > 20) {
        pos[i * 3 + 2] = -35;
        pos[i * 3] = (Math.random() - 0.5) * 24;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.size = 0.08 + speed * 0.3;
    mat.opacity = Math.min(speed * 1.2, 0.9);
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        vertexColors
        map={particleTexture}
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Station ─────────────────────────────────────────────────────────────────

interface StationProps {
  position: THREE.Vector3;
  shapeIndex: number;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function Station({
  position,
  shapeIndex,
  index,
  isActive,
  onClick,
}: StationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mainRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  const geo = useMemo(() => STATION_SHAPES[shapeIndex](), [shapeIndex]);
  const ringGeo = useMemo(
    () => new THREE.TorusGeometry(1.8, 0.04, 128, 200),
    [],
  );
  const innerRing = useMemo(
    () => new THREE.TorusGeometry(1.4, 0.03, 128, 200),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = t * 0.2;
    }
    if (pulseRef.current) {
      const s = 1 + Math.sin(t * 3) * (isActive ? 0.15 : 0.08);
      pulseRef.current.scale.set(s, s, s);
      (
        pulseRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = 0.3 + Math.sin(t * 4) * 0.15;
    }
    if (mainRef.current) {
      (
        mainRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = 0.25 + Math.sin(t * 2 + index) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.intensity =
        (isActive ? 1.2 : 0.5) + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      <pointLight
        ref={glowRef}
        color="#a855f7"
        intensity={0.5}
        distance={8}
        decay={2}
      />

      {/* Proximity aura — only visible when active */}
      {isActive && (
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#a855f7"
            emissiveIntensity={0.4}
            transparent
            opacity={0.06}
          />
        </mesh>
      )}

      <mesh ref={pulseRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7e22ce"
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>

      <mesh ref={ringRef} geometry={ringGeo}>
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.4}
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      <mesh geometry={innerRing}>
        <meshStandardMaterial
          color="#e9d5ff"
          emissive="#c084fc"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={mainRef} geometry={geo}>
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          metalness={0.75}
          roughness={0.25}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

// ─── Camera Rig ───────────────────────────────────────────────────────────────

function CameraRig({
  progress,
  scrollSpeed,
}: {
  progress: React.MutableRefObject<number>;
  scrollSpeed: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();
  const lastT = useRef(0);
  const velocityRef = useRef(0);

  useFrame(() => {
    const t = Math.min(progress.current ?? 0, 0.9999);

    scrollSpeed.current += (t - lastT.current - scrollSpeed.current) * 0.2;
    velocityRef.current =
      velocityRef.current * 0.95 + Math.abs(scrollSpeed.current) * 0.05;
    lastT.current = t;

    const mainPos = PATH.getPointAt(t);
    const ahead = PATH.getPointAt(Math.min(t + 0.015, 0.9999));

    const drift = {
      x: Math.sin(t * Math.PI * 4) * 0.35,
      y: Math.cos(t * Math.PI * 3.5) * 0.25,
      z: Math.sin(t * Math.PI * 2.5) * 0.15,
    };
    const shake = {
      x: (Math.random() - 0.5) * velocityRef.current * 0.25,
      y: (Math.random() - 0.5) * velocityRef.current * 0.25,
    };

    camera.position.x +=
      (mainPos.x + drift.x + shake.x - camera.position.x) * 0.12;
    camera.position.y +=
      (mainPos.y + drift.y + shake.y - camera.position.y) * 0.12;
    camera.position.z += (mainPos.z + drift.z - camera.position.z) * 0.12;

    const lookAt = ahead.clone();
    lookAt.x += drift.x * 0.4;
    lookAt.y += drift.y * 0.4;
    camera.lookAt(lookAt);
  });

  return null;
}

// ─── HUD Overlay ─────────────────────────────────────────────────────────────

interface ModalState {
  open: boolean;
  index: number;
}

interface HUDProps {
  progress: number;
  speed: number;
  activeStation: number | null;
  onStationClick: (i: number) => void;
}

function HUD({ progress, speed, activeStation, onStationClick }: HUDProps) {
  const [modal, setModal] = useState<ModalState>({ open: false, index: 0 });

  const handleDotClick = useCallback(
    (i: number) => {
      onStationClick(i);
      setModal({ open: true, index: i });
    },
    [onStationClick],
  );

  const st = STATION_CONFIGS[modal.index];

  return (
    <>
      {/* ── Scanlines + Vignette ─────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(168,85,247,0.012) 3px,rgba(168,85,247,0.012) 4px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center,transparent 50%,rgba(3,0,8,0.55) 100%)",
          }}
        />
      </div>

      {/* ── Header ───────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 11,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(14px,2.5vw,22px)",
            fontWeight: 300,
            letterSpacing: "0.22em",
            color: "rgba(200,150,255,0.9)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Deep Space Transit
        </h1>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.4em",
            color: "rgba(150,100,200,0.55)",
            marginTop: 4,
            textTransform: "uppercase",
          }}
        >
          Sector 7-G · Hyperspace Corridor
        </p>
      </div>

      {/* ── Corner Telemetry ─────────────────────────────────── */}
      <CornerData side="tl">
        <TelRow label="Velocity" value={`${(speed * 0.95).toFixed(2)} c`} />
        <TelRow label="Heading" value={`${Math.round(270 + progress * 45)}°`} />
      </CornerData>
      <CornerData side="tr">
        <TelRow
          label="Distance"
          value={`${Math.round(progress * 847)} AU`}
          right
        />
        <TelRow
          label="Progress"
          value={`${Math.round(progress * 100)}%`}
          right
        />
      </CornerData>
      <CornerData side="bl">
        <TelRow
          label="Reactor"
          value={speed > 0.3 ? "ACTIVE" : speed > 0.05 ? "WARMING" : "IDLE"}
        />
        <TelRow label="Shields" value="100%" />
      </CornerData>
      <CornerData side="br">
        <TelRow
          label="Particles"
          value={Math.round(speed * 2847).toLocaleString()}
          right
        />
        <TelRow label="Hull" value="NOMINAL" right />
      </CornerData>

      {/* ── Speed Bar ────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          pointerEvents: "none",
          zIndex: 11,
        }}
      >
        <div
          style={{
            width: 2,
            height: 60,
            background: "rgba(168,85,247,0.12)",
            borderRadius: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: `${Math.min(speed * 200, 100)}%`,
              background: "linear-gradient(0deg,#7c3aed,#e9d5ff)",
              borderRadius: 1,
              transition: "height 0.2s",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 8,
            letterSpacing: "0.15em",
            color: "rgba(168,85,247,0.4)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          SPD
        </span>
      </div>

      {/* ── Progress Track ───────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(480px,80vw)",
          zIndex: 11,
        }}
      >
        <div
          style={{
            height: 1,
            background: "rgba(168,85,247,0.15)",
            borderRadius: 1,
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg,#7c3aed,#c084fc,#e9d5ff)",
              borderRadius: 1,
              transition: "width 0.3s",
            }}
          />
          {/* Station dots */}
          {STATION_CONFIGS.map((cfg, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              title={cfg.name}
              style={{
                position: "absolute",
                top: "50%",
                left: `${cfg.t * 100}%`,
                transform: "translate(-50%,-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: activeStation === i ? "#e9d5ff" : "#a855f7",
                boxShadow:
                  activeStation === i
                    ? "0 0 12px #e9d5ff,0 0 24px rgba(233,213,255,0.5)"
                    : "0 0 6px #a855f7",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s",
                zIndex: 1,
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            fontSize: 9,
            letterSpacing: "0.25em",
            color: "rgba(168,85,247,0.45)",
            textTransform: "uppercase",
          }}
        >
          <span>Origin</span>
          <span>
            {STATION_CONFIGS.find((c) => Math.abs(progress - c.t) < 0.06)
              ?.name ?? "Drifting"}
          </span>
          <span>Terminus</span>
        </div>
      </div>

      {/* ── Station Modal ─────────────────────────────────────── */}
      <div
        onClick={() => setModal((m) => ({ ...m, open: false }))}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 20,
          display: modal.open ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "rgba(3,0,8,0.92)",
            border: "1px solid rgba(168,85,247,0.3)",
            borderRadius: 12,
            padding: "32px 36px",
            maxWidth: 360,
            width: "90%",
            backdropFilter: "blur(12px)",
            transform: modal.open ? "scale(1)" : "scale(0.9)",
            opacity: modal.open ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <button
            onClick={() => setModal((m) => ({ ...m, open: false }))}
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              background: "none",
              border: "none",
              color: "rgba(168,85,247,0.5)",
              fontSize: 18,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <div style={{ fontSize: 28, marginBottom: 12 }}>{st.icon}</div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "rgba(233,213,255,0.9)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {st.name}
          </div>
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.8,
              color: "rgba(168,85,247,0.7)",
            }}
          >
            {st.body}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "3px 10px",
              border: "1px solid rgba(168,85,247,0.3)",
              borderRadius: 20,
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "rgba(168,85,247,0.6)",
              textTransform: "uppercase",
            }}
          >
            {st.tag}
          </div>
        </div>
      </div>

      {/* ── Scroll Hint (fades at progress > 5%) ─────────────── */}
      {progress < 0.05 && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 11,
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              color: "rgba(168,85,247,0.4)",
              textTransform: "uppercase",
            }}
          >
            Scroll to fly
          </p>
          <div
            style={{
              width: 10,
              height: 10,
              margin: "6px auto 0",
              borderRight: "1px solid rgba(168,85,247,0.4)",
              borderBottom: "1px solid rgba(168,85,247,0.4)",
              transform: "rotate(45deg)",
              animation: "bounce 1.5s ease-in-out infinite",
            }}
          />
        </div>
      )}

      <style>{`@keyframes bounce{0%,100%{transform:rotate(45deg) translate(0,0);opacity:.4}50%{transform:rotate(45deg) translate(3px,3px);opacity:.8}}`}</style>
    </>
  );
}

// ─── HUD Helpers ─────────────────────────────────────────────────────────────

function CornerData({
  side,
  children,
}: {
  side: "tl" | "tr" | "bl" | "br";
  children: React.ReactNode;
}) {
  const pos: React.CSSProperties = {
    position: "fixed",
    ...(side.includes("t") ? { top: 24 } : { bottom: 80 }),
    ...(side.includes("l") ? { left: 24 } : { right: 24 }),
    textAlign: side.includes("r") ? "right" : "left",
    fontSize: 9,
    letterSpacing: "0.2em",
    color: "rgba(168,85,247,0.35)",
    textTransform: "uppercase",
    pointerEvents: "none",
    zIndex: 11,
  };
  return <div style={pos}>{children}</div>;
}

function TelRow({
  label,
  value,
  right,
}: {
  label: string;
  value: string;
  right?: boolean;
}) {
  return (
    <div style={{ lineHeight: 1.8, textAlign: right ? "right" : "left" }}>
      <span style={{ display: "block" }}>{label}</span>
      <span
        style={{
          display: "block",
          color: "rgba(192,132,252,0.75)",
          fontWeight: 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function AboutScene({
  progress,
}: {
  progress: React.MutableRefObject<number>;
}) {
  const stationPositions = useMemo(
    () => STATION_CONFIGS.map((cfg) => PATH.getPointAt(cfg.t)),
    [],
  );
  const scrollSpeedRef = useRef<number>(0);
  const [hudProgress, setHudProgress] = useState(0);
  const [hudSpeed, setHudSpeed] = useState(0);
  const [activeStation, setActiveStation] = useState<number | null>(null);

  // Sync progress ref → React state for HUD (throttled via RAF)
  useEffect(() => {
    let raf: number;
    let last = 0;
    const tick = () => {
      const p = progress.current ?? 0;
      const s = Math.abs(scrollSpeedRef.current);
      if (Math.abs(p - last) > 0.001 || s > 0.001) {
        setHudProgress(p);
        setHudSpeed(s);
        // Active station proximity
        let nearest: number | null = null;
        let minD = 0.06;
        STATION_CONFIGS.forEach((cfg, i) => {
          const d = Math.abs(p - cfg.t);
          if (d < minD) {
            minD = d;
            nearest = i;
          }
        });
        setActiveStation(nearest);
        last = p;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 65 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{
          background: "transparent",
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <color attach="background" args={["#030008"]} />
        <FogEffect />

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[8, 6, 5]} intensity={1.0} color="#a855f7" />
        <pointLight position={[-6, -4, 5]} intensity={0.6} color="#7e22ce" />
        <pointLight position={[0, 5, 8]} intensity={0.7} color="#c084fc" />
        <pointLight position={[3, -2, 10]} intensity={0.5} color="#e9d5ff" />
        <directionalLight
          position={[2, 3, 4]}
          intensity={0.4}
          color="#ffffff"
        />

        {/* Scene */}
        <Starfield />
        <PathTube />
        <GlowParticles />
        <SpeedStreaks scrollSpeed={scrollSpeedRef} />

        {stationPositions.map((pos, i) => (
          <Station
            key={i}
            position={pos}
            shapeIndex={i}
            index={i}
            isActive={activeStation === i}
            onClick={() => setActiveStation(i)}
          />
        ))}

        <CameraRig progress={progress} scrollSpeed={scrollSpeedRef} />
      </Canvas>

      <HUD
        progress={hudProgress}
        speed={hudSpeed}
        activeStation={activeStation}
        onStationClick={setActiveStation}
      />
    </>
  );
}
