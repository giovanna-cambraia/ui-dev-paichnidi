"use client";

import React, { useState, useEffect, useCallback } from "react";
import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import BottomTabs from "../reusable/BottomTabs";
import "../reusable/reusable.css";
import "./visuals.css";

// ── Types ──────────────────────────────────────────────────────────────────
interface VisualCard {
  id: number;
  publishedAgo: string;
  projectName: string;
  subtitle: string;
  description: string;
  imgSrc?: string;
}

interface VisualsDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// ── Data ───────────────────────────────────────────────────────────────────
const CARDS: VisualCard[] = [
  {
    id: 1,
    publishedAgo: "PUBLISHED 2 MONTHS AGO",
    projectName: "LEGACY.AI - REACT MASTERPIECE",
    subtitle: "REACT WEBSITE",
    description:
      "BUILD THIS WEBSITE. IMPLEMENT A FULL REACT WEBSITE WITH MULTIPLE ROUTERS, UI ELEMENTS AND TRICKY STYLING. MAKE IT ALL WORK GREAT.",
  },
  {
    id: 2,
    publishedAgo: "PUBLISHED 3 MONTHS AGO",
    projectName: "CYBERPUNK DASHBOARD",
    subtitle: "REACT WEBSITE",
    description:
      "A FULLY INTERACTIVE DASHBOARD WITH REAL-TIME DATA VISUALIZATION, DARK MODE, AND CUSTOMIZABLE WIDGETS.",
  },
  {
    id: 3,
    publishedAgo: "PUBLISHED 4 MONTHS AGO",
    projectName: "NEXT.JS OPTIMIZATION SUITE",
    subtitle: "NEXT.JS APP",
    description:
      "BUILD THIS WEBSITE. IMPLEMENT A FULL NEXT.JS APPLICATION WITH SERVER SIDE RENDERING AND OPTIMIZED PERFORMANCE.",
  },
  {
    id: 4,
    publishedAgo: "PUBLISHED 5 MONTHS AGO",
    projectName: "REST API ARCHITECTURE",
    subtitle: "NODE API",
    description:
      "DESIGN AND IMPLEMENT A REST API WITH AUTHENTICATION, RATE LIMITING AND FULL DOCUMENTATION.",
  },
  {
    id: 5,
    publishedAgo: "PUBLISHED 6 MONTHS AGO",
    projectName: "TYPESCRIPT COMPONENT LIBRARY",
    subtitle: "TYPESCRIPT LIB",
    description:
      "BUILD A REUSABLE COMPONENT LIBRARY WITH FULL TYPESCRIPT SUPPORT, STORYBOOK AND UNIT TESTS.",
  },
];

const TABS = ["BEGINNING", "LOGS", "PROJECTS", "VISUALS", "ABOUT ME",  "CONTACT"];

// ── Helpers ────────────────────────────────────────────────────────────────
function getSlotStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  if (abs > 2) return { display: "none" };

  // Adjusted for bigger cards
  const translateX = offset * 380;
  const translateZ = abs === 0 ? 0 : abs === 1 ? -200 : -350;
  const rotateY = offset === 0 ? 0 : offset < 0 ? 35 : -35;
  const scale = abs === 0 ? 1 : abs === 1 ? 0.75 : 0.55;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : 0.3;
  const zIndex = abs === 0 ? 10 : abs === 1 ? 5 : 1;

  return {
    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: abs === 0 ? "auto" : "none",
    transition: "all 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
  };
}

// ── Component ──────────────────────────────────────────────────────────────
export default function VisualsDashboard({
  activeTab,
  setActiveTab,
}: VisualsDashboardProps) {
  const [active, setActive] = useState(0);
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    console.log(
      "%cVISUALS CAROUSEL INITIALIZED",
      "color: #c0392b; font-size: 14px; font-family: monospace;",
    );
  }, []);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((a) => (a - 1 + CARDS.length) % CARDS.length);
    setTimeout(() => setIsAnimating(false), 550);
  }, [isAnimating]);

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((a) => (a + 1) % CARDS.length);
    setTimeout(() => setIsAnimating(false), 550);
  }, [isAnimating]);

  const current = CARDS[active];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    },
    [prev, next],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="dashboard">
      <TopBar />

      <div className="dashboard-inner">
        <SidebarLeft />

        {/* CENTER */}
        <div className="visuals-center">
          <div className="visuals-title">VISUAL SHOWCASE</div>

          <div className="visuals-carousel-area">
            {/* Stage */}
            <div className="carousel-stage-wrap">
              <button
                className="carousel-arrow carousel-arrow-left"
                onClick={prev}
                disabled={isAnimating}
              >
                ‹
              </button>

              <div className="carousel-stage">
                {CARDS.map((card, i) => {
                  let offset = i - active;
                  if (offset > CARDS.length / 2) offset -= CARDS.length;
                  if (offset < -CARDS.length / 2) offset += CARDS.length;

                  return (
                    <div
                      key={card.id}
                      className="vis-card"
                      style={getSlotStyle(offset)}
                      onClick={() => {
                        if (offset === 0) {
                          console.log(`Opening project: ${card.projectName}`);
                        }
                      }}
                    >
                      <div className="vis-card-published">
                        {card.publishedAgo}
                      </div>
                      <div className="vis-card-img">
                        {card.imgSrc ? (
                          <img src={card.imgSrc} alt={card.projectName} />
                        ) : (
                          <div className="vis-card-img-placeholder">
                            <span className="vis-card-img-placeholder-icon">
                              
                            </span>
                            <span>VISUAL PREVIEW</span>
                          </div>
                        )}
                        <button
                          className="vis-card-view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Viewing project: ${card.projectName}`);
                          }}
                        >
                          VIEW LIVE →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="carousel-arrow carousel-arrow-right"
                onClick={next}
                disabled={isAnimating}
              >
                ›
              </button>
            </div>

            {/* Info block */}
            <div className="visuals-info">
              <div className="visuals-info-name">{current.projectName}</div>
              <div className="visuals-info-subtitle">{current.subtitle}</div>
              <div className="visuals-info-desc">{current.description}</div>
            </div>

            {/* Progress bar */}
            <div className="visuals-progress">
              <div
                className="visuals-progress-fill"
                style={{ width: `${((active + 1) / CARDS.length) * 100}%` }}
              />
            </div>

            {/* Counter */}
            <div className="visuals-counter">
              {String(active + 1).padStart(2, "0")}/
              {String(CARDS.length).padStart(2, "0")}
            </div>
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
