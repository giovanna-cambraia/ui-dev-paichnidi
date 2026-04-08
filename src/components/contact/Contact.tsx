"use client";

import React, { useState, useEffect, useRef } from "react";
import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import BottomTabs from "../reusable/BottomTabs";
import "../reusable/reusable.css";
import "./contact.css";

interface ContactProps {
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

const LINKS = [
  {
    id: "email",
    label: "EMAIL",
    value: "giovannacamnbraia8@gmail.com",
    href: "mailto:giovannacamnbraia8@gmail.com",
    icon: "✉",
  },
  {
    id: "github",
    label: "GITHUB",
    value: "https://github.com/giovanna-cambraia",
    href: "https://github.com/giovanna-cambraia",
    icon: "◈",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/giovanna-cambraia",
    href: "https://linkedin.com/in/giovanna-cambraia",
    icon: "▣",
  },
  {
    id: "resume",
    label: "RESUME",
    value: "DOWNLOAD PDF",
    href: "/resume.pdf",
    icon: "↓",
  },
];

export default function ContactPage({ activeTab, setActiveTab }: ContactProps) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [linesDone, setLinesDone] = useState(false);

  const HEADLINE = "LET'S BUILD\nSOMETHING.";

  // Typewriter on mount
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(HEADLINE.slice(0, i + 1));
      i++;
      if (i >= HEADLINE.length) {
        clearInterval(interval);
        setTimeout(() => setLinesDone(true), 200);
      }
    }, 38);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <TopBar />

      <div className="dashboard-inner">
        <SidebarLeft />

        {/* ── CENTER ── */}
        <div className="center contact-center">
          <div className="image-area contact-stage">
            {/* Corner brackets */}
            <div className="img-corner tl" />
            <div className="img-corner tr" />
            <div className="img-corner bl" />
            <div className="img-corner br" />

            {/* Scanlines */}
            <div className="contact-scanlines" />

            {/* ── LAYOUT: LEFT CTA + RIGHT SLOT ── */}
            <div className="contact-layout">
              {/* ── LEFT: CTA BLOCK ── */}
              <div className="cta-block">
                {/* System tag */}
                <div className="cta-sys-tag">// CONTACT.INIT</div>

                {/* Headline typewriter */}
                <div className="cta-headline">
                  {typed.split("\n").map((line, i) => (
                    <div key={i} className="cta-headline-line">
                      {line}
                      {i === typed.split("\n").length - 1 && (
                        <span className="cta-cursor blink">_</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Subline */}
                <p className={`cta-sub ${linesDone ? "visible" : ""}`}>
                  AVAILABLE FOR FREELANCE
                  AND INTERESTING PROBLEMS.
                </p>

                {/* Divider */}
                <div className={`cta-divider ${linesDone ? "visible" : ""}`} />

                {/* Link rows */}
                <div className={`cta-links ${linesDone ? "visible" : ""}`}>
                  {LINKS.map((link, i) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target={link.id !== "email" ? "_blank" : undefined}
                      rel="noreferrer"
                      className={`cta-link-row ${hoveredLink === link.id ? "hovered" : ""}`}
                      style={
                        { "--delay": `${i * 0.07}s` } as React.CSSProperties
                      }
                      onMouseEnter={() => setHoveredLink(link.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className="cta-link-icon">{link.icon}</span>
                      <div className="cta-link-info">
                        <span className="cta-link-label">{link.label}</span>
                        <span className="cta-link-value">{link.value}</span>
                      </div>
                      <span className="cta-link-arrow">→</span>
                    </a>
                  ))}
                </div>

                {/* Status indicator */}
                <div className={`cta-status ${linesDone ? "visible" : ""}`}>
                  <span className="status-dot pulse-green" />
                  <span className="status-text">
                    AVAILABLE FOR NEW PROJECTS
                  </span>
                </div>
              </div>

              {/* ── RIGHT: EMPTY SLOT ── */}
              <div className="cta-right-slot">
                <div className="slot-corner tl" />
                <div className="slot-corner tr" />
                <div className="slot-corner bl" />
                <div className="slot-corner br" />
                <div className="slot-label">// YOUR_WIDGET.HERE</div>
              </div>
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
