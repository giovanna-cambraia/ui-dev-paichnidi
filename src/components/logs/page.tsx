"use client";

import ASCIIText from "@/src/react-bits/ascii/ASCIIText";
import React, { useState } from "react";

// components
import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import BottomTabs from "../reusable/BottomTabs";
import LogsCenter from "./LogsCenter";
import "./logs.css";
import "../reusable/reusable.css";

interface LogsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = ["BEGINNING", "LOGS", "PROJECTS", "VISUALS", "ABOUT ME",  "CONTACT"];

const LOG_ENTRIES = [
  {
    id: 1,
    title: "PROJECT DEVELOPMENT UPDATE",
    date: "DATE: 2097.04.25",
    location: "RESEARCH FACILITY, PLANET X-37",
    status: "IN DEVELOPMENT",
    sections: [
      {
        heading: "PROJECT UPDATE",
        body: "THE DEVELOPMENT TEAM HAS BEEN WORKING TIRELESSLY...",
        expandable: false,
      },
      {
        heading: "CHALLENGES",
        body: "THE TEAM HAS ENCOUNTERED SEVERAL CHALLENGES...",
        expandable: true,
      },
      {
        heading: "NEXT STEPS",
        body: "THE DEVELOPMENT TEAM HAS BEEN WORKING...",
        expandable: false,
      },
      {
        heading: "CONCLUSION",
        body: "DESPITE THE CHALLENGES...",
        expandable: true,
      },
    ],
  },
];

const OLDER_LOGS = [
  { title: "LOG ENTRY: PROJECT DEVELOPMENT UPDATE", date: "DATE: 2097.04.25" },
  { title: "LOG ENTRY: NEW PROJECT STARTED", date: "DATE: 2097.04.25" },
  { title: "LOG ENTRY: RELEASE STORY", date: "DATE: 2097.04.25" },
  { title: "LOG ENTRY: VISUAL UPDATES", date: "DATE: 2097.04.25" },
  { title: "LOG ENTRY: GOING PUBLIC", date: "DATE: 2097.04.25" },
  { title: "LOG ENTRY: BETA PROGRAM", date: "DATE: 2097.04.25" },
];

export default function LogsDashboard({ activeTab, setActiveTab }: LogsProps) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (sectionKey: string) => {
    setExpanded((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <div className="dashboard">
      {/* TOP */}
      <TopBar />

      <div className="dashboard-inner">
        {/* LEFT */}
        <SidebarLeft />

        {/* CENTER */}
        <LogsCenter
          entries={LOG_ENTRIES}
          olderLogs={OLDER_LOGS}
          expanded={expanded}
          toggleExpand={toggleExpand}
        />

        {/* RIGHT */}
        <SidebarRight
          soundEffects={soundEffects}
          setSoundEffects={setSoundEffects}
          music={music}
          setMusic={setMusic}
        />
      </div>

      {/* BOTTOM */}
      <BottomTabs
        tabs={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
