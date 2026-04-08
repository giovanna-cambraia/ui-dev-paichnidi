"use client";

import React, { useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface FileItem {
  name: string;
  size: string;
}

interface Technology {
  icon: string;
  label: string;
}

interface Project {
  id: number;
  name: string;
  brief: string;
  about: string;
  technologies: Technology[];
  files: FileItem[];
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "LEGACY.AI",
    brief: "ONE SENTENCE EXPLANATION FOR WHAT THE PROJECT IS.",
    about:
      "THE TEAM HAS ENCOUNTERED SEVERAL CHALLENGES DURING THE DEVELOPMENT PROCESS, INCLUDING UNEXPECTED SYSTEM CRASHES, HARDWARE MALFUNCTIONS, AND UNANTICIPATED COMPATIBILITY ISSUES. THE TEAM HAS ENCOUNTERED SEVERAL CHALLENGES DURING THE DEVELOPMENT PROCESS, INCLUDING UNEXPECTED SYSTEM CRASHES, HARDWARE MALFUNCTIONS, AND UNANTICIPATED COMPATIBILITY ISSUES. THE TEAM HAS ENCOUNTERED SEVERAL CHALLENGES DURING THE DEVELOPMENT PROCESS, INCLUDING UNEXPECTED SYSTEM CRASHES, HARDWARE MALFUNCTIONS, AND UNANTICIPATED COMPATIBILITY ISSUES.",
    technologies: [
      { icon: "⚛", label: "REACT" },
      { icon: "◈", label: "NODE" },
      { icon: "⬡", label: "NEXT" },
      { icon: "▣", label: "TS" },
      { icon: "⌬", label: "GIT" },
    ],
    files: [
      { name: "HOMEPAGE.JPG", size: "23KB" },
      { name: "USER-FACING PAR1.JPG", size: "23KB" },
      { name: "ARCHIVE VIEW.JPG", size: "23KB" },
      { name: "DASHBOARD HOME VIEW.JPG", size: "23KB" },
      { name: "USER-FACING PAR2.JPG", size: "23KB" },
      { name: "DASHBOARD HOME VIEW.JPG", size: "23KB" },
      { name: "DASHBOARD HOME VIEW.JPG", size: "23KB" },
      { name: "HOMEPAGE.JPG", size: "23KB" },
      { name: "ARCHIVE VIEW.JPG", size: "23KB" },
    ],
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function FileExplorer({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [hoveredFile, setHoveredFile] = useState<number | null>(null);

  return (
    <div className="file-explorer-overlay">
      <div className="file-explorer">
        <div className="fe-header">
          <span className="fe-title">FILE EXPLORER</span>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="fe-location">
          <span className="fe-loc-label">LOCATION:</span>
          <span className="fe-loc-path">/PROJECTS/IMG.NAME</span>
        </div>
        <div className="fe-grid">
          {project.files.map((f, i) => (
            <div
              key={i}
              className="fe-item"
              onMouseEnter={() => setHoveredFile(i)}
              onMouseLeave={() => setHoveredFile(null)}
              onClick={() => console.log(`Opening file: ${f.name}`)}
            >
              <div className="fe-thumb">
                <div className="fe-thumb-inner">
                  <span className="fe-img-icon">
                    {hoveredFile === i ? "📄" : "🖼"}
                  </span>
                </div>
              </div>
              <div className="fe-item-info">
                <span className="fe-item-name">{f.name}</span>
                <span className="fe-item-size">{f.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectDetails({
  project,
  onOpenFiles,
}: {
  project: Project;
  onOpenFiles: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const shortAbout = project.about.slice(0, 220);

  return (
    <div className="project-details">
      <div className="section-header">
        <span>DETAILS</span>
        <button className="close-btn" onClick={onOpenFiles}>
          ✕
        </button>
      </div>

      <div className="detail-block">
        <div className="detail-label">PROJECT NAME</div>
        <div className="detail-value project-name">{project.name}</div>
      </div>

      <div className="detail-block">
        <div className="detail-label">BRIEF</div>
        <div className="detail-brief-text">{project.brief}</div>
      </div>

      <div className="section-header mt-section">
        <span>TECHNOLOGIES</span>
        <button className="close-btn">✕</button>
      </div>
      <div className="tech-icons">
        {project.technologies.map((t, i) => (
          <div key={i} className="tech-hex" title={t.label}>
            <span>{t.icon}</span>
          </div>
        ))}
      </div>

      <div className="detail-block mt-section">
        <div className="detail-label">ABOUT:</div>
        <div className="detail-about-text">
          {expanded ? project.about : shortAbout + "..."}
        </div>
        <button className="expand-btn" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "▲ COLLAPSE" : "▼ EXPAND"}
        </button>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function ProjectsCenter() {
  const [fileExplorerOpen, setFileExplorerOpen] = useState(true);
  const project = PROJECTS[0];

  useEffect(() => {
    console.log(
      "%cCREATIONS MODULE LOADED",
      "color: #c0392b; font-size: 14px; font-family: monospace;",
    );
  }, []);

  const handleViewDemo = () => {
    console.log("Launching project demo...");
    // Add your demo viewing logic here
  };

  const handleBackToAll = () => {
    console.log("Returning to all projects...");
    // Add your back to all projects logic here
  };

  return (
    <div className="creations-center">
      <div className="creations-title">CREATIONS</div>

      <div className="creations-body">
        <ProjectDetails
          project={project}
          onOpenFiles={() => setFileExplorerOpen(true)}
        />

        {fileExplorerOpen ? (
          <div className="file-explorer-container">
            <FileExplorer
              project={project}
              onClose={() => setFileExplorerOpen(false)}
            />
            <div className="external-buttons">
              <button
                className="external-btn external-btn-primary"
                onClick={handleViewDemo}
              >
                VIEW PROJECT DEMO
              </button>
              <button
                className="external-btn external-btn-secondary"
                onClick={handleBackToAll}
              >
                BACK TO ALL PROJECTS
              </button>
            </div>
          </div>
        ) : (
          <div
            className="no-explorer-placeholder"
            onClick={() => setFileExplorerOpen(true)}
          >
            [ OPEN FILE EXPLORER ]
          </div>
        )}
      </div>
    </div>
  );
}
