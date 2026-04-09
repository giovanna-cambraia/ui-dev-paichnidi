"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function CubeModel() {
  const { scene } = useGLTF("/cube_fracture.glb");
  const modelRef = useRef();

  useEffect(() => {
    if (scene) {
      console.log("Model loaded:", scene);

      // Enhance materials for better visual appeal
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];

            materials.forEach((material) => {
              // Create metallic, shiny appearance
              material.roughness = 0.2;
              material.metalness = 0.9;
              material.emissive = new THREE.Color(0x4c1d95);
              material.emissiveIntensity = 0.1;

              // Add subtle animation to materials
              if (material.color) {
                material.color.setHex(0x8b5cf6);
              }

              material.needsUpdate = true;
            });
          }
        }
      });
    }
  }, [scene]);

  // Animate rotation
  useEffect(() => {
    let time = 0;
    const animate = () => {
      time += 0.01;
      if (scene) {
        scene.rotation.y = time * 0.5;
      }
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [scene]);

  return <primitive object={scene} ref={modelRef} scale={0.3} />;
}

export default function SidebarLeft() {
  return (
    <div className="sidebar-left">
      <div
        className="avatar-frame"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Canvas
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.3,
            outputColorSpace: THREE.SRGBColorSpace,
            antialias: true,
          }}
          camera={{ position: [2, 1.5, 4], fov: 45 }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Suspense
            fallback={
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#8b5cf6" wireframe />
              </mesh>
            }
          >
            {/* Ambient light for base illumination */}
            <ambientLight intensity={0.5} />

            {/* Main directional light */}
            <directionalLight
              position={[3, 4, 2]}
              intensity={1}
              color="#ffffff"
              castShadow
            />

            {/* Colored fill lights */}
            <directionalLight
              position={[-2, 1, 3]}
              intensity={0.7}
              color="#a78bfa"
            />

            {/* Rim light for edge highlighting */}
            <directionalLight
              position={[1, 2, -3]}
              intensity={0.6}
              color="#38bdf8"
            />

            {/* Warm backlight */}
            <pointLight
              position={[-1, 1, -2]}
              intensity={0.5}
              color="#f472b6"
            />

            {/* Cool fill from below */}
            <pointLight position={[0, -2, 0]} intensity={0.4} color="#4ecdc4" />

            <CubeModel />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={1.5}
              enableDamping={true}
              dampingFactor={0.05}
              zoomSpeed={0.5}
            />
          </Suspense>
        </Canvas>

        {/* Glass reflection effect overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>

      <div className="info-group">
        <span className="info-label">Name</span>
        <span className="info-value">YOUR NAME</span>
      </div>

      <div className="info-group">
        <span className="info-label">Occupation</span>
        <span className="info-value red">Web Developer</span>
      </div>

      <div className="info-group">
        <span className="info-label">Corporation</span>
        <span className="info-value red">Company.io</span>
      </div>

      <div className="info-group">
        <span className="info-label">Availability</span>
        <div className="pill">
          <span>Open for hire</span>
          <span className="x-icon">✕</span>
        </div>
      </div>

      <div className="info-group">
        <span className="info-label">Social</span>
        <div className="pill blue">
          <span>Open Connection</span>
          <span className="bt-icon">⌘</span>
        </div>
      </div>

      <div className="info-group motto">
        <span className="info-motto">Motto:</span>
        <span className="info-value">
          SAEBE OMNIS NEQUE
          <br />
          NUMQUAM RECUSANDAE
          <br />
          LAUDANTIUM
        </span>
      </div>
    </div>
  );
}
