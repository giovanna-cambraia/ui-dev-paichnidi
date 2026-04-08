"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./landing.css";

interface LandingPageProps {
  onEnter?: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    if (onEnter) {
      onEnter();
    }
  };

  return (
    <div className="landing">
      <div className="glow-blob" />
      <div className="scanlines" />
      <div className="grain" />

      <div className="content">
        <div className="hero-text">HI!</div>

        <div className="right-panel">
          <p className="welcome-title">Welcome to my personal website.</p>

          <div className="desc-block">
            <p>
              I have created this website to feel like a game/sci-fi interface.
              All text inside tries to reflect this.
            </p>
            <p>
              You will find 'achievements' or 'quests' that show the progress in
              my professional life and are related to what I am working on.
            </p>
          </div>

          <button className="enter-btn" onClick={handleEnter}>
            Enter the system
          </button>
        </div>
      </div>
    </div>
  );
}
