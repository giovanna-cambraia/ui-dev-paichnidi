"use client";

import DecryptedText from "@/src/react-bits/decrypted/DecryptedText";

export default function LogsCenter({
  ASCIIText,
  entries,
  olderLogs,
  expanded,
  toggleExpand,
}: any) {
  return (
    <div className="center">
      <p className="logs-dump-header">
        <div style={{ marginTop: "4rem" }}>
          <div style={{ marginTop: "4rem" }}>
            <DecryptedText
              text="DATA LOG DUMP INITIALIZED"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
            />
          </div>
        </div>
      </p>

      {entries.map((entry: any) => (
        <div key={entry.id} className="active-log-entry">
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

              return (
                <div key={i} className="log-section">
                  <div className="log-section-heading">{section.heading}</div>

                  <p className="log-section-body">{section.body}</p>

                  {section.expandable && (
                    <button
                      className="log-expand-btn"
                      onClick={() => toggleExpand(key)}
                    >
                      {expanded[key] ? "▲ COLLAPSE" : "▼ EXPAND"}
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

      <p className="older-logs-label">OLDER LOGS:</p>

      {olderLogs.map((log: any, i: number) => (
        <div key={i} className="older-log-row">
          <span className="older-log-title">{log.title}</span>
          <span className="older-log-date">{log.date}</span>
        </div>
      ))}
    </div>
  );
}
