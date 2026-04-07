"use client";

import { useState } from "react";
import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import BottomTabs from "../reusable/BottomTabs";

import "./projects.css";

const TABS = ["Beginning", "Logs", "Achievements", "Creations", "Games"];

const FILES = [
  { name: "HOMEPAGE.JPG", size: "23KB" },
  { name: "USER-FACING PART.JPG", size: "23KB" },
  { name: "ARCHIVE VIEW.JPG", size: "23KB" },
  { name: "DASHBOARD HOME VIEW.JPG", size: "23KB" },
  { name: "USER-FACING PART.JPG", size: "23KB" },
  { name: "DASHBOARD HOME VIEW.JPG", size: "23KB" },
  { name: "HOMEPAGE.JPG", size: "23KB" },
  { name: "ARCHIVE VIEW.JPG", size: "23KB" },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("Creations");
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const aboutShort =
    "The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions and unanticipated compatibility issues...";

  const aboutFull =
    "The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions and unanticipated compatibility issues. The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions, and unanticipated compatibility issues. The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions, and unanticipated compatibility issues.";

  return (
    <div className="cyber-root">
      <TopBar />

      <div className="cyber-body">
        <SidebarLeft />

        {/* ── MAIN CONTENT ── */}
        <div className="main-content">
          <div className="page-title">Creations</div>

          <div className="content-area">
            {/* ── LEFT COLUMN: Details / Technologies / About ── */}
            <div className="details-panel">
              {/* Details */}
              <div className="cyber-panel">
                <div className="panel-header">
                  DETAILS <span className="panel-x">✕</span>
                </div>
                <div className="panel-body">
                  <p className="panel-field-label">Project Name</p>
                  <p className="panel-field-value">Legacy.AI</p>
                  <p className="panel-field-label">Brief</p>
                  <p className="panel-field-placeholder">
                    One sentence explanation for what the project is.
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="cyber-panel">
                <div className="panel-header">
                  TECHNOLOGIES <span className="panel-x">✕</span>
                </div>
                <div className="tech-icons">
                  {["⚛", "N", "#", "T", "G"].map((icon, i) => (
                    <div key={i} className="tech-hex" title="Tech">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="cyber-panel about-panel">
                <div className="about-label">About:</div>
                <div className="about-text">
                  {expanded ? aboutFull : aboutShort}
                  <button
                    className="expand-btn"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "- COLLAPSE" : "+ EXPAND"}
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: File Explorer ── */}
            <div className="file-explorer">
              <div className="cyber-panel file-panel">
                <div className="file-explorer-header">
                  FILE XPLORER <span className="panel-x">✕</span>
                </div>
                <div className="file-location">
                  LOCATION: /PROJECTS/THE-NAME
                </div>
                <div className="file-grid">
                  {FILES.map((file, i) => (
                    <div key={i} className="file-item">
                      <div className="file-icon">⬜</div>
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">{file.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button className="action-btn">View Project Demo</button>
                <button className="action-btn">Back to All Projects</button>
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
