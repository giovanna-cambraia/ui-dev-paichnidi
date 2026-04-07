"use client";

import React from "react";
import { useState } from "react";

const TABS = ["BEGINNING", "LOGS", "ACHIEVEMENTS", "CREATIONS", "GAMES"];

export default function HeroDashboard() {
  const [activeTab, setActiveTab] = useState("BEGINNING");
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,100..900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #000000;
          color: #c8c8c8;
          font-family: 'Big Shoulders', sans-serif;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
        }

        /* ── ROOT LAYOUT ───────────────────────────────────────── */
        .dashboard {
          height: 100vh;
          width: 100vw;
          background: #000000;
          position: relative;
        }

        /* scanlines */
        .dashboard::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px
          );
          pointer-events: none;
          z-index: 100;
        }

        /* ── INNER CONTAINER WITH BREATHING ROOM ───────────────── */
        .dashboard-inner {
          margin: 80px 60px 40px 60px;
          height: calc(100vh - 120px);
          display: grid;
          background: #000000;
          grid-template-columns: 250px 1fr 250px;
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        /* ── TOP BAR ── */
        .topbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 60px 20px 60px;
          background: transparent;
          z-index: 10;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .level-badge {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .level-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 25px;
          color: #7DFF68;
          letter-spacing: 1px;
        }

        .level-label {
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #fff;
          text-transform: uppercase;
        }

        .coins {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          letter-spacing: 0.15em;
          color: #fff;
        }

        .coins-plus {
          color: #E84A4A;
          font-size: 30px;
          font-weight: bold;
        }

        .coins-amount {
          color: #7DFF68;
          font-size: 25px;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #666;
          text-transform: uppercase;
        }

        .time-block {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .time-val {
          color: #bbb;
          font-weight: 700;
        }

        /* ── LEFT SIDEBAR ── */
        .sidebar-left {
          grid-column: 1;
          grid-row: 1;
          background: #000000;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow: hidden;
        }

        /* avatar */
        .avatar-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border: 1px solid #2a2a2a;
          overflow: hidden;
          background: #111;
        }

        /* bracket corners */
        .avatar-frame::before,
        .avatar-frame::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          z-index: 2;
        }

        .avatar-frame::before {
          top: 0; left: 0;
          border-top: 2px solid #E84A4A;
          border-left: 2px solid #E84A4A;
        }

        .avatar-frame::after {
          bottom: 0; right: 0;
          border-bottom: 2px solid #E84A4A;
          border-right: 2px solid #E84A4A;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: hue-rotate(0deg) saturate(1.2);
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a0a0a 0%, #2d0d1a 50%, #0a0a1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: #E84A4A;
          font-family: 'Bebas Neue', sans-serif;
        }

        /* info rows */
        .info-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .info-label {
          font-size: 10px;
          letter-spacing: 0.25em;
          color: #e8e8e8;
          text-transform: uppercase;
        }

        .info-value {
          font-size: 12px;
          letter-spacing: 0.1em;
          color: #e8e8e8;
          text-transform: uppercase;
        }

        .info-value.red { 
          color: #E84A4A;
          font-weight: 700; 
          font-size: 12px
        }

        /* pill tags */
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #080808;
          background: #E84A4A;
          padding: 3px 7px;
          font-size: 12px;
          letter-spacing: 7.5%;
          color: #080808;
          font-weight: 900;
          text-transform: uppercase;
          width: fit-content;
        }

        .pill .x-icon {
          font-size: 8px;
          color: #E84A4A;
        }

        .pill.blue {
          border-color: #E84A4A;
          background: transparent;
          color: #fff
        }

        .pill .bt-icon {
          font-size: 9px;
          color: #E84A4A;
        }

        /* motto */
        .motto {
          font-style: italic;
          margin-top: auto;
          color: #E84A4A;
          text-transform: uppercase;
        }

        .motto .info-value {
          font-size: 8px;
          color: #fff;
          line-height: 1.6;
          font-style: italic;
        }

        /* ── CENTER ── */
        .center {
          grid-column: 2;
          grid-row: 1;
          background: #000000;
          padding: 16px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* image area */
        .image-area {
          flex: 1;
          position: relative;
          overflow: hidden;
          border: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
        }

        /* quote inside the square */
        .image-quote {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 20px 24px;
          text-align: center;
          z-index: 3;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
        }

        .image-quote p {
          font-size: 14px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.6;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        /* placeholder for user's future animal image */
        .image-placeholder {
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 50% 70%, #2d0020 0%, #100015 40%, #080808 80%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;
          position: relative;
        }

        .image-placeholder .ph-icon {
          font-size: 64px;
          opacity: 0.4;
        }

        .image-placeholder .ph-text {
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        /* bracket decorations on image corners */
        .img-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          z-index: 4;
        }

        .img-corner.tl { top: 8px; left: 8px; border-top: 2px solid #E84A4A; border-left: 2px solid #E84A4A; }
        .img-corner.tr { top: 8px; right: 8px; border-top: 2px solid #E84A4A; border-right: 2px solid #E84A4A; }
        .img-corner.bl { bottom: 8px; left: 8px; border-bottom: 2px solid #E84A4A; border-left: 2px solid #E84A4A; }
        .img-corner.br { bottom: 8px; right: 8px; border-bottom: 2px solid #E84A4A; border-right: 2px solid #E84A4A; }

        /* ── RIGHT SIDEBAR ── */
        .sidebar-right {
          grid-column: 3;
          grid-row: 1;
          background: #000000;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }

        .quest-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .quest-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .quest-title-label {
          font-size: 15px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #fff;
          border: 1px solid #E84A4A;
          margin-top: 18px;
          padding: 4px;
          background: #E84A4A;
        }

        .quest-x {
          font-size: 10px;
          color: #E84A4A;
          cursor: pointer;
        }

        .quest-skill-line {
          font-size: 12px;
          letter-spacing: 0.15em;
          color: #7A7A7A;
          text-transform: uppercase;
        }

        .quest-name-label {
          font-size: 14px;
          letter-spacing: 0.25em;
          color: #fff;
          text-transform: uppercase;
        }

        .quest-name {
          font-size: 12px;
          letter-spacing: 0.15em;
          color: #E84A4A;
          text-transform: uppercase;
          font-family: 'Bebas Neue', sans-serif;
        }

        .quest-goal-label {
          font-size: 12px;
          letter-spacing: 0.25em;
          color: #fff;
          text-transform: uppercase;
        }

        .quest-goal-text {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #7A7A7A;
          text-transform: uppercase;
          line-height: 1.7;
        }

        .quest-rewards-label {
          font-size: 12px;
          letter-spacing: 0.25em;
          color: #fff;
          text-transform: uppercase;
        }

        .rewards-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .reward-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .reward-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #b8860b, #ffd700);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .reward-pts {
          font-size: 7px;
          color: #666;
          letter-spacing: 0.1em;
        }

        /* settings panel */
        .settings-panel {
          border-top: 1px solid #1a1a1a;
          padding: 10px 0 0;
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .setting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .setting-name {
          font-size: 14px;
          letter-spacing: 0.2em;
          color: #E84A4A;
          text-transform: uppercase;
        }

        .toggle-btn {
          width: 16px;
          height: 16px;
          border: 1px solid #333;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 9px;
          color: #E84A4A;
          transition: background 0.2s;
        }

        .toggle-btn.on {
          border-color: #444;
          color: #6aff6a;
        }

        .toggle-btn.gear {
          color: #888;
          font-size: 11px;
        }

        /* ── BOTTOM BAR (TABS CUTTING INTO LAYOUT) ── */
        .bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 8px;
          padding: 0 60px;
          z-index: 20;
        }

        .tab {
          flex: 0 0 auto;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 10px 12px;
          cursor: pointer;
          gap: 5px;
          position: relative;
          bottom: -1px;
          overflow: hidden;
          border: 1px solid #E84A4A;
          border-bottom: none;
          background: #0a0a0a;
          transition: color 0.3s ease;
        }

        .tab::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #E84A4A;
          transform: translateX(-101%);
          transition: transform 0.3s ease;
          z-index: 0;
        }

        .tab:hover::before {
          transform: translateX(0);
        }

        .tab.active::before {
          transform: translateX(0);
        }

        .tab-name,
        .tab-preview {
          position: relative;
          z-index: 1;
        }

        .tab-name {
          color: #fff;
        }

        .tab:hover { 
          background: #111; 
        }

        .tab-name {
          font-size: 15px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #fff;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tab-x {
          font-size: 8px;
          color: #E84A4A;
        }

        .tab-preview {
          margin-top: 10px;  
          font-size: 8px;
          letter-spacing: 0.1em;
          color: #FFFFFF;
          text-transform: uppercase;
          line-height: 1.6;
        }
      `}</style>

      <div className="dashboard">
        {/* ── TOP BAR ── */}
        <div className="topbar">
          <div className="topbar-left">
            <div className="level-badge">
              <span className="level-num">48</span>
              <span className="level-label">Level</span>
            </div>
            <div className="coins">
              <span className="coins-plus">+</span>
              <span className="coins-amount">1,425</span>
              <span className="awarded-coins">COINS AWARDED</span>
            </div>
          </div>
          <div className="topbar-right">
            <span>CREDITS</span>
            <div className="time-block">
              <span>SERVER TIME</span>
              <span className="time-val">8:42</span>
            </div>
            <div className="time-block">
              <span>LOCAL TIME</span>
              <span className="time-val">15:42</span>
            </div>
          </div>
        </div>

        {/* ── INNER CONTAINER WITH ALL CONTENT ── */}
        <div className="dashboard-inner">
          {/* LEFT SIDEBAR */}
          <div className="sidebar-left">
            <div className="avatar-frame">
              <div className="avatar-placeholder">ME</div>
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

          {/* CENTER */}
          <div className="center">
            <div className="image-area">
              <div className="img-corner tl" />
              <div className="img-corner tr" />
              <div className="img-corner bl" />
              <div className="img-corner br" />

              {/* Quote now inside the image square */}
              <div className="image-quote">
                <p>
                  SWIMMING THROUGH A VAST NETWORK OF INTERCONNECTED DEVICES AND
                  SERVERS, SPREADING JOY AND WHIMSY TO USERS ACROSS THE GLOBE
                </p>
              </div>

              <div className="image-placeholder">
                <span className="ph-icon">🐋</span>
                <span className="ph-text">IMAGE AREA</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="sidebar-right">
            <div className="quest-panel">
              <div className="quest-header">
                <span className="quest-title-label">Active Quest</span>
                <span className="quest-x">✕</span>
              </div>

              <div>
                <span className="quest-skill-line">
                  THE REACT SKILL-UP LINE
                </span>
              </div>

              <div className="info-group">
                <span className="quest-name-label">Quest Name</span>
                <span className="quest-name">React Website</span>
              </div>

              <div className="info-group">
                <span className="quest-goal-label">Goal</span>
                <p className="quest-goal-text">
                  BUILD THIS WEBSITE. IMPLEMENT A FULL REACT WEBSITE WITH
                  MULTIPLE ROUTES, UI ELEMENTS AND TRICKY STYLING. MAKE IT ALL
                  WORK. GOSH!!
                </p>
              </div>

              <div className="info-group">
                <span className="quest-rewards-label">Rewards</span>
                <div className="rewards-row">
                  <div className="reward-badge">
                    <div className="reward-icon">🏆</div>
                    <span className="reward-pts">+5</span>
                  </div>
                  <div className="reward-badge">
                    <div className="reward-icon">⭐</div>
                    <span className="reward-pts">+25</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-panel">
              <div className="setting-row">
                <span className="setting-name">Sound Effects</span>
                <button
                  className={`toggle-btn ${soundEffects ? "on" : ""}`}
                  onClick={() => setSoundEffects((v) => !v)}
                >
                  {soundEffects ? "✓" : "✕"}
                </button>
              </div>
              <div className="setting-row">
                <span className="setting-name">Music</span>
                <button
                  className={`toggle-btn ${music ? "on" : ""}`}
                  onClick={() => setMusic((v) => !v)}
                >
                  {music ? "✓" : "✕"}
                </button>
              </div>
              <div className="setting-row">
                <span className="setting-name">Visual Settings</span>
                <button className="toggle-btn gear">⚙</button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TABS */}
        <div className="bottom-bar">
          {TABS.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <div className="tab-name">
                {tab}
                {activeTab === tab && <span className="tab-x">✕</span>}
              </div>
              <div className="tab-preview">
                HOLD ALT 323 CONA:USHK ORUN
                <br />
                SHNO CON ORUN LUNE INF UT
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
