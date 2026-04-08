"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import BottomTabs from "../reusable/BottomTabs";
import "../reusable/reusable.css";
import "./aboutme.css";

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

// ─── Section content ───────────────────────────────────────────────────────────
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

// ─── Component ─────────────────────────────────────────────────────────────────
export default function AboutMe({ activeTab, setActiveTab }: AboutMeProps) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);

  // step: 0 = entry gate, 1-3 = sections, 4 = end (return gate)
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [exiting, setExiting] = useState(false);

  const lockRef = useRef(false);

  const canGoForward = step < 4;
  const canGoBack = step > 0;

  const advance = useCallback(
    (dir: "forward" | "back") => {
      if (lockRef.current) return;
      if (dir === "forward" && !canGoForward) return;
      if (dir === "back" && !canGoBack) return;

      lockRef.current = true;
      setDirection(dir);
      setExiting(true);
      setAnimating(true);

      setTimeout(() => {
        setStep((s) => (dir === "forward" ? s + 1 : s - 1));
        setExiting(false);
      }, 320);

      setTimeout(() => {
        setAnimating(false);
        lockRef.current = false;
      }, 700);
    },
    [canGoForward, canGoBack],
  );

  // Wheel handler
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) advance("forward");
      else advance("back");
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [advance]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") advance("forward");
      if (e.key === "ArrowDown") advance("back");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  // ── Render helpers ──────────────────────────────────────────────────────────
  const currentSection = step >= 1 && step <= 3 ? SECTIONS[step - 1] : null;

  const frameClass = [
    "tunnel-frame",
    animating ? "animating" : "",
    exiting ? `exit-${direction}` : `enter-${direction}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="dashboard">
      <TopBar />

      <div className="dashboard-inner">
        <SidebarLeft />

        {/* ── CENTER STAGE ── */}
        <div className="center about-center">
          <div className="image-area tunnel-stage">
            {/* Corner brackets */}
            <div className="img-corner tl" />
            <div className="img-corner tr" />
            <div className="img-corner bl" />
            <div className="img-corner br" />

            {/* Depth fog layers — always visible, intensity changes per step */}
            <div className="tunnel-fog" data-step={step} />

            {/* Perspective corridor rings */}
            <div className="tunnel-rings" data-step={step}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  className="tunnel-ring"
                  key={i}
                  style={{ "--i": i } as React.CSSProperties}
                />
              ))}
            </div>

            {/* ── STATE 0: ENTRY GATE ── */}
            {step === 0 && (
              <div className={`${frameClass} gate-frame`}>
                <div className="gate-content">
                  <div className="gate-label">// ABOUT_ME.EXE</div>
                  <div className="gate-prompt">
                    <span className="gate-arrow">↑</span>
                    <span className="gate-text">SCROLL UP TO ENTER</span>
                    <span className="gate-cursor blink">_</span>
                  </div>
                  <div className="gate-hint">
                    SCROLL DOWN TO EXIT AT ANY POINT
                  </div>
                </div>
              </div>
            )}

            {/* ── STATES 1–3: SECTIONS ── */}
            {currentSection && (
              <div className={`${frameClass} section-frame`}>
                {/* Header bar */}
                <div className="section-header">
                  <span className="section-label">{currentSection.label}</span>
                  <span className="section-depth">{currentSection.depth}</span>
                </div>

                {/* Body */}
                <div className="section-body-wrap">
                  {currentSection.content}
                </div>

                {/* Footer nav */}
                <div className="section-footer">
                  {step < 3 && (
                    <span className="footer-hint">↑ CONTINUE DEEPER</span>
                  )}
                  {step === 3 && (
                    <button
                      className="return-btn"
                      onClick={() => {
                        // Fast rewind all the way back
                        lockRef.current = true;
                        setDirection("back");
                        setExiting(true);
                        setAnimating(true);
                        setTimeout(() => {
                          setStep(0);
                          setExiting(false);
                        }, 320);
                        setTimeout(() => {
                          setAnimating(false);
                          lockRef.current = false;
                        }, 700);
                      }}
                    >
                      ← RETURN TO SURFACE
                    </button>
                  )}
                  <span className="footer-hint right">↓ STEP BACK</span>
                </div>

                {/* Depth indicator dots */}
                <div className="depth-dots">
                  {[1, 2, 3].map((d) => (
                    <div
                      key={d}
                      className={`depth-dot ${d === step ? "active" : ""} ${d < step ? "past" : ""}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Scanline overlay */}
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

      <BottomTabs
        tabs={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
