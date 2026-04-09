"use client";

import React, { useState, useEffect, useRef } from "react";
import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import BottomTabs from "../reusable/BottomTabs";
import "../reusable/reusable.css";
import "./aboutme.css";
import AboutScene from "./AboutScene";
import gsap from "gsap";

interface AboutMeProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  "BEGINNING",
  "LOGS",
  "PROJECTS",
  "VISUALS",
  "ABOUT ME",
  "CONTACT",
];

const SECTIONS = [
  {
    id: "about",
    label: "01 // ABOUT ME",
    depth: "DEPTH: 01",
    content: (
      <div className="tunnel-section-body">
        <div className="tunnel-tag">INITIALIZING PROFILE...</div>
        <h2 className="tunnel-name">YOUR NAME</h2>
        <p className="tunnel-role">FULL STACK DEVELOPER // CREATIVE ENGINEER</p>
        <div className="tunnel-divider" />
        <p className="tunnel-bio">
          I build things that live at the intersection of logic and craft. Five
          years shipping products across fintech, SaaS, and experimental
          interfaces. I care about the details that most people skip.
        </p>
        <div className="tunnel-stats">
          <div className="t-stat">
            <span className="t-stat-num">5+</span>
            <span className="t-stat-label">YRS EXP</span>
          </div>
          <div className="t-stat">
            <span className="t-stat-num">32</span>
            <span className="t-stat-label">PROJECTS</span>
          </div>
          <div className="t-stat">
            <span className="t-stat-num">12</span>
            <span className="t-stat-label">CLIENTS</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "skills",
    label: "02 // SKILLS MATRIX",
    depth: "DEPTH: 02",
    content: (
      <div className="tunnel-section-body">
        <div className="tunnel-tag">SCANNING CAPABILITIES...</div>
        <div className="skills-grid">
          {[
            {
              cat: "FRONTEND",
              items: ["React", "Next.js", "TypeScript", "CSS / GLSL"],
            },
            {
              cat: "BACKEND",
              items: ["Node.js", "PostgreSQL", "Redis", "REST / GraphQL"],
            },
            { cat: "TOOLS", items: ["Git", "Docker", "Figma", "Three.js"] },
            {
              cat: "SOFT SKILLS",
              items: [
                "Systems Thinking",
                "Code Review",
                "Mentoring",
                "Documentation",
              ],
            },
          ].map((group) => (
            <div className="skill-group" key={group.cat}>
              <div className="skill-cat">{group.cat}</div>
              {group.items.map((item) => (
                <div className="skill-row" key={item}>
                  <span className="skill-bullet">▸</span>
                  <span className="skill-item">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "certs",
    label: "03 // CERTIFICATES",
    depth: "DEPTH: 03",
    content: (
      <div className="tunnel-section-body">
        <div className="tunnel-tag">LOADING CREDENTIALS...</div>
        <div className="certs-list">
          {[
            {
              title: "AWS CERTIFIED DEVELOPER",
              org: "AMAZON WEB SERVICES",
              year: "2024",
              badge: "★",
            },
            {
              title: "PROFESSIONAL SCRUM MASTER I",
              org: "SCRUM.ORG",
              year: "2023",
              badge: "◆",
            },
            {
              title: "GOOGLE UX DESIGN",
              org: "GOOGLE / COURSERA",
              year: "2023",
              badge: "●",
            },
            {
              title: "META FRONT-END DEVELOPER",
              org: "META / COURSERA",
              year: "2022",
              badge: "▲",
            },
          ].map((cert) => (
            <div className="cert-row" key={cert.title}>
              <span className="cert-badge">{cert.badge}</span>
              <div className="cert-info">
                <div className="cert-title">{cert.title}</div>
                <div className="cert-org">
                  {cert.org} — {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function AboutMe({ activeTab, setActiveTab }: AboutMeProps) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);
  const [activeStation, setActiveStation] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false); 
  const scrollSpeedRef = useRef<number>(0);

  const progressRef = useRef<number>(0);
  const scrollYRef = useRef<number>(0);

  // Scroll → progress
  useEffect(() => {
    const maxScroll = window.innerHeight * 3;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollYRef.current = Math.min(
        Math.max(scrollYRef.current + e.deltaY, 0),
        maxScroll,
      );
      const target = scrollYRef.current / maxScroll;

      // Activate 3D mode on first scroll up
      if (target > 0.01) setIsActive(true);
      else setIsActive(false);

      gsap.to(progressRef, {
        current: target,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Station detection
  useEffect(() => {
    const interval = setInterval(() => {
      const t = progressRef.current;
      if (t >= 0.2 && t <= 0.38) setActiveStation(0);
      else if (t >= 0.45 && t <= 0.63) setActiveStation(1);
      else if (t >= 0.7 && t <= 0.88) setActiveStation(2);
      else setActiveStation(null);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`dashboard ${isActive ? "immersive" : ""}`}>
      <TopBar />
      <div className="dashboard-inner">
        <SidebarLeft />

        <div className="center about-center">
          <div className="image-area tunnel-stage">
            {/* 3D Layer — always mounted, always rendering */}
            <div className={`tunnel-3d-layer ${isActive ? "active" : ""}`}>
              <AboutScene progress={progressRef} />
            </div>

            {/* Corner brackets */}
            <div className="img-corner tl" />
            <div className="img-corner tr" />
            <div className="img-corner bl" />
            <div className="img-corner br" />

            <div className="tunnel-fog" />
            <div className="tunnel-rings">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  className="tunnel-ring"
                  key={i}
                  style={{ "--i": i } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Entry gate — only when not active */}
            {!isActive && (
              <div className="tunnel-frame gate-frame enter-forward">
                <div className="gate-content">
                  <div className="gate-label">// ABOUT_ME.EXE</div>
                  <div className="gate-prompt">
                    <span className="gate-arrow">↑</span>
                    <span className="gate-text">SCROLL DOWN TO ENTER</span>
                    <span className="gate-cursor blink">_</span>
                  </div>
                  <div className="gate-hint">
                    SCROLL UP TO EXIT AT ANY POINT
                  </div>
                </div>
              </div>
            )}

            {/* Station overlay */}
            {activeStation !== null && (
              <div className="station-overlay" key={activeStation}>
                <div className="section-header">
                  <span className="section-label">
                    {SECTIONS[activeStation].label}
                  </span>
                  <span className="section-depth">
                    {SECTIONS[activeStation].depth}
                  </span>
                </div>
                <div className="section-body-wrap">
                  {SECTIONS[activeStation].content}
                </div>
              </div>
            )}

            <div className="tunnel-scanlines" />
          </div>
        </div>

        <SidebarRight
          soundEffects={soundEffects}
          setSoundEffects={setSoundEffects}
          music={music}
          setMusic={setMusic}
        />
      </div>

      <div className="bottom-tabs-wrapper">
        <BottomTabs
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
