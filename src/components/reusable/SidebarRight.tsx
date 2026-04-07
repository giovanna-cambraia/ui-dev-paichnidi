"use client";

interface Props {
  soundEffects: boolean;
  setSoundEffects: (v: boolean) => void;
  music: boolean;
  setMusic: (v: boolean) => void;
}

export default function SidebarRight({
  soundEffects,
  setSoundEffects,
  music,
  setMusic,
}: Props) {
  return (
    <div className="sidebar-right">
      <div className="quest-panel">
        <div className="quest-header">
          <span className="quest-title-label">Active Quest</span>
          <span className="quest-x">✕</span>
        </div>

        <span className="quest-skill-line">THE REACT SKILL-UP LINE</span>

        <div className="info-group">
          <span className="quest-name-label">Quest Name</span>
          <span className="quest-name">React Website</span>
        </div>

        <div className="info-group">
          <span className="quest-goal-label">Goal</span>
          <p className="quest-goal-text">BUILD THIS WEBSITE...</p>
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
            onClick={() => setSoundEffects(!soundEffects)}
          >
            {soundEffects ? "✓" : "✕"}
          </button>
        </div>

        <div className="setting-row">
          <span className="setting-name">Music</span>
          <button
            className={`toggle-btn ${music ? "on" : ""}`}
            onClick={() => setMusic(!music)}
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
  );
}
