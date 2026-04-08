"use client";

import DecryptedText from "@/src/react-components/decrypted/DecryptedText";
import { useEffect, useState } from "react";

export default function LogsCenter({
  entries,
  olderLogs,
  expanded,
  toggleExpand,
}: any) {
  const [hoveredLog, setHoveredLog] = useState(null);

  useEffect(() => {
    // Add console log for dramatic effect
    console.log(
      "%cDATA LOG DUMP INITIALIZED",
      "color: #e84a4a; font-size: 16px; font-family: monospace;",
    );
  }, []);

  return (
    <div className="center">
      <div className="logs-dump-header">
        <div style={{ marginTop: "4rem" }}>
          <div style={{ marginTop: "4rem" }}>
            <DecryptedText
              text="DATA LOG DUMP INITIALIZED"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              onAnimationComplete={() => console.log("Decryption complete")}
            />
          </div>
        </div>
      </div>

      {entries.map((entry: any) => (
        <div
          key={entry.id}
          className="active-log-entry"
          onMouseEnter={() => setHoveredLog(entry.id)}
          onMouseLeave={() => setHoveredLog(null)}
        >
          <div className="log-entry-header">
            <span className="log-entry-title">LOG ENTRY: {entry.title}</span>
            <span className="log-entry-date">{entry.date}</span>
          </div>

          <div className="log-meta">
            <span className="log-meta-item">
              LOCATION: <span>{entry.location}</span>
            </span>
            <span className="log-meta-item">
              PROJECT STATUS: <span>{entry.status}</span>
            </span>
          </div>

          <div className="log-sections-grid">
            {entry.sections.map((section: any, i: number) => {
              const key = `${entry.id}-${i}`;
              const isExpanded = expanded[key];

              return (
                <div key={i} className="log-section">
                  <div className="log-section-heading">
                    {section.heading}
                    {isExpanded && " [EXPANDED]"}
                  </div>

                  <p className="log-section-body">
                    {isExpanded
                      ? section.body
                      : section.body.substring(0, 100) +
                        (section.body.length > 100 ? "..." : "")}
                  </p>

                  {section.expandable && (
                    <button
                      className="log-expand-btn"
                      onClick={() => toggleExpand(key)}
                    >
                      {isExpanded ? "▲ COLLAPSE" : "▼ EXPAND"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button className="log-visual-btn">
            PREVIEW VISUAL RECORDS &nbsp; ▣
          </button>
        </div>
      ))}

      <div className="older-logs-label">
        OLDER LOGS: ({olderLogs.length} ENTRIES)
      </div>

      {olderLogs.map((log: any, i: number) => (
        <div
          key={i}
          className="older-log-row"
          onClick={() => console.log(`Loading log: ${log.title}`)}
        >
          <span className="older-log-title">{log.title}</span>
          <span className="older-log-date">{log.date}</span>
        </div>
      ))}
    </div>
  );
}
