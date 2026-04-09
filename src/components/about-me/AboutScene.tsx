"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

const PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 12),
  new THREE.Vector3(3, 1.5, 6),
  new THREE.Vector3(-2, -1.5, 2),
  new THREE.Vector3(2, 2.5, -3),
  new THREE.Vector3(-1.5, -1, -7),
  new THREE.Vector3(0, 0, -12),
]);

const STATIONS = [0.2, 0.4, 0.6, 0.8];

// Realistic circular particle texture with glow
function createRealisticParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  const centerX = 32,
    centerY = 32;

  // Clear canvas
  ctx.clearRect(0, 0, 64, 64);

  // Create radial gradient for soft realistic glow
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    32,
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.4, "rgba(200, 150, 255, 0.6)");
  gradient.addColorStop(0.6, "rgba(150, 100, 200, 0.3)");
  gradient.addColorStop(0.8, "rgba(100, 50, 150, 0.1)");
  gradient.addColorStop(1, "rgba(50, 25, 100, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  // Add subtle noise for realism
  const imageData = ctx.getImageData(0, 0, 64, 64);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (Math.random() > 0.95) {
      data[i] = Math.min(255, data[i] + 20);
      data[i + 1] = Math.min(255, data[i + 1] + 20);
      data[i + 2] = Math.min(255, data[i + 2] + 40);
    }
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Star texture with sharp core
function createStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;

  const centerX = 16,
    centerY = 16;

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    16,
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.3, "rgba(255, 255, 200, 0.8)");
  gradient.addColorStop(0.6, "rgba(200, 200, 255, 0.3)");
  gradient.addColorStop(1, "rgba(100, 100, 150, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  // Add cross-shaped spike for stars
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

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function PathTube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    return new THREE.TubeGeometry(PATH, 300, 0.04, 16, false);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * 0.5;
      (
        meshRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = 0.6 + Math.sin(t) * 0.3;
    }
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

function SpeedStreaks({
  scrollSpeed,
}: {
  scrollSpeed: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Points>(null!);
  const count = 400;
  const particleTexture = useMemo(() => createRealisticParticleTexture(), []);

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
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

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 2] += velocities[i] * speed * delta * 50;
      if (pos[i * 3 + 2] > 20) {
        pos[i * 3 + 2] = -35;
        pos[i * 3] = (Math.random() - 0.5) * 24;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    const material = ref.current.material as THREE.PointsMaterial;
    material.size = 0.08 + speed * 0.3;
    material.opacity = Math.min(speed * 1.2, 0.9);
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
      // Distribute stars in a sphere for more realism
      const radius = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 20;

      // Random star colors (white to slight blue/orange)
      const colorTemp = Math.random();
      if (colorTemp < 0.7) {
        colors[i * 3] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 1;
      } else if (colorTemp < 0.85) {
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
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.01;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.03;
    }
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
  const count = 1200;
  const particleTexture = useMemo(() => createRealisticParticleTexture(), []);

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const point = PATH.getPointAt(t);
      // Distribute particles in a tube-like shape around the path
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.5;
      positions[i * 3] = point.x + Math.cos(angle) * radius;
      positions[i * 3 + 1] = point.y + Math.sin(angle) * radius;
      positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.6;

      velocities[i] = 0.3 + Math.random() * 1.5;

      // Purple to pink color variation
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
    if (ref.current) {
      const t = clock.getElapsedTime() * 2;
      const material = ref.current.material as THREE.PointsMaterial;
      material.size = 0.06 + Math.sin(t) * 0.02;

      // Animate particles along the path
      const positions = ref.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 2] += velocities[i] * 0.01;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
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

function Station({
  position,
  shape,
  index,
}: {
  position: THREE.Vector3;
  shape: number;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mainMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  const geo = useMemo(() => {
    if (shape === 0) return new THREE.IcosahedronGeometry(1.4, 1);
    if (shape === 1) return new THREE.OctahedronGeometry(1.5, 0);
    if (shape === 2) return new THREE.TetrahedronGeometry(1.6, 0);
    return new THREE.DodecahedronGeometry(1.3, 0);
  }, [shape]);

  const ringGeo = useMemo(
    () => new THREE.TorusGeometry(1.8, 0.04, 128, 200),
    [],
  );

  const innerRingGeo = useMemo(
    () => new THREE.TorusGeometry(1.4, 0.03, 128, 200),
    [],
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.4) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.4;
      ringRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    }
    if (pulseRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.08;
      pulseRef.current.scale.set(scale, scale, scale);
      (
        pulseRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = 0.3 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
    }
    if (mainMeshRef.current) {
      (
        mainMeshRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity =
        0.25 + Math.sin(clock.getElapsedTime() * 2 + index) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.intensity =
        0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <pointLight
        ref={glowRef}
        color="#a855f7"
        intensity={0.5}
        distance={8}
        decay={2}
      />

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

      <mesh geometry={innerRingGeo}>
        <meshStandardMaterial
          color="#e9d5ff"
          emissive="#c084fc"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={mainMeshRef} geometry={geo}>
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
    if (!progress || progress.current === undefined) return;
    let t = progress.current ?? 0;
    t = Math.min(t, 0.9999);

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

    const speedShake = {
      x: (Math.random() - 0.5) * velocityRef.current * 0.25,
      y: (Math.random() - 0.5) * velocityRef.current * 0.25,
    };

    camera.position.x +=
      (mainPos.x + drift.x + speedShake.x - camera.position.x) * 0.12;
    camera.position.y +=
      (mainPos.y + drift.y + speedShake.y - camera.position.y) * 0.12;
    camera.position.z += (mainPos.z + drift.z - camera.position.z) * 0.12;

    const targetLook = ahead.clone();
    targetLook.x += drift.x * 0.4;
    targetLook.y += drift.y * 0.4;
    camera.lookAt(targetLook);
  });

  return null;
}

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

export default function AboutScene({
  progress,
}: {
  progress: React.MutableRefObject<number>;
}) {
  const stationPositions = STATIONS.map((t) => PATH.getPointAt(t));
  const scrollSpeedRef = useRef<number>(0);

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 65 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#030008"]} />
      <FogEffect />

      <ambientLight intensity={0.2} />
      <pointLight position={[8, 6, 5]} intensity={1.0} color="#a855f7" />
      <pointLight position={[-6, -4, 5]} intensity={0.6} color="#7e22ce" />
      <pointLight position={[0, 5, 8]} intensity={0.7} color="#c084fc" />
      <pointLight position={[3, -2, 10]} intensity={0.5} color="#e9d5ff" />
      <directionalLight position={[2, 3, 4]} intensity={0.4} color="#ffffff" />

      <Starfield />
      <PathTube />
      <GlowParticles />
      <SpeedStreaks scrollSpeed={scrollSpeedRef} />

      {stationPositions.map((pos, i) => (
        <Station key={i} position={pos} shape={i} index={i} />
      ))}

      <CameraRig progress={progress} scrollSpeed={scrollSpeedRef} />
    </Canvas>
  );
}
