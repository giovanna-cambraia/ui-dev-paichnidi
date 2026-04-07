"use client";

export default function SidebarLeft() {
  return (
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
  );
}
