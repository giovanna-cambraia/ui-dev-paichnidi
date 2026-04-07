"use client";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="level-badge">
          <span className="level-num">48</span>
          <span className="level-label">Level</span>
        </div>
        <div className="coins">
          <span className="coins-plus">+</span>
          <span className="coins-amount">1,425</span>
          <span>COINS AWARDED</span>
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
  );
}
