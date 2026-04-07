"use client";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomTabs({ tabs, activeTab, setActiveTab }: Props) {
  return (
    <div className="bottom-bar">
      {tabs.map((tab) => (
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
  );
}
