"use client";

import { useState, useEffect } from "react";

export default function LandingPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0a;
          color: #e8e8e8;
          font-family: 'Share Tech Mono', monospace;
          overflow: hidden;
          height: 100vh;
        }

        .landing {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #080808;
        }

        /* top-right red glow blob */
        .glow-blob {
          position: absolute;
          top: -120px;
          right: -80px;
          width: 420px;
          height: 340px;
          background: radial-gradient(ellipse at 70% 30%, rgba(200, 30, 30, 0.55) 0%, rgba(140, 10, 10, 0.2) 50%, transparent 75%);
          pointer-events: none;
          z-index: 0;
        }

        /* subtle scanline overlay */
        .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.07) 2px,
            rgba(0,0,0,0.07) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 80px;
          padding: 0 10vw;
          width: 100%;
          opacity: ${visible ? 1 : 0};
          transform: ${visible ? "translateY(0)" : "translateY(18px)"};
          transition: opacity 0.9s ease, transform 0.9s ease;
        }

        /* BIG "HI!" */
        .hero-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(200px, 40vw, 300px);
          line-height: 0.99;
          color: #d42b2b;
          letter-spacing: -4px;
          user-select: none;
          flex-shrink: 0;
          /* subtle flicker animation */
          animation: flicker 8s infinite;
        }

        @keyframes flicker {
          0%, 94%, 96%, 98%, 100% { opacity: 1; }
          95% { opacity: 0.85; }
          97% { opacity: 0.92; }
          99% { opacity: 0.88; }
        }

        /* right panel */
        .right-panel {
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .welcome-title {
          font-family: 'Share Tech Mono', monospace;
          font-size: 25px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #cccccc;
        }

        .desc-block {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .desc-block p {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          line-height: 1.75;
          color: #aaaaaa;
        }

        /* CTA button */
        .enter-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          padding: 12px 28px;
          border: 1px solid #d42b2b;
          background: transparent;
          color: #e8e8e8;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease, background 0.3s ease;
          width: fit-content;
        }

        .enter-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #d42b2b;
          transform: translateX(-101%);
          transition: transform 0.3s ease;
          z-index: -1;
        }

        .enter-btn:hover::before {
          transform: translateX(0);
        }

        .enter-btn:hover {
          color: #fff;
        }

        /* corner decorations on button */
        .enter-btn::after {
          content: '';
          position: absolute;
          top: -1px; right: -1px;
          width: 6px; height: 6px;
          border-top: 2px solid #d42b2b;
          border-right: 2px solid #d42b2b;
        }

        /* bottom-left noise grain */
        .grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
      `}</style>

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
                I have created this website to feel like a game/sci-fi
                interface. All text inside tries to reflect this.
              </p>
              <p>
                You will find 'achievements' or 'quests' that show the progress
                in my professional life and are related to what I am working on.
              </p>
            </div>

            <button className="enter-btn">Enter the system</button>
          </div>
        </div>
      </div>
    </>
  );
}
