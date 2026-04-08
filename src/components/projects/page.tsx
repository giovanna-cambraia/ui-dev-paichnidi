"use client";

import React, { useState } from "react";

import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import BottomTabs from "../reusable/BottomTabs";

import ProjectsCenter from "./ProjectsCenter";
import "./projects.css"
import "../reusable/reusable.css"

interface ProjectsDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = ["BEGINNING", "LOGS", "PROJECTS", "VISUALS", "ABOUT ME",  "CONTACT"];

export default function ProjectsDashboard({ activeTab, setActiveTab }: ProjectsDashboardProps) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);

  return (
    <div className="dashboard">
      {/* TOP */}
      <TopBar />

      <div className="dashboard-inner">
        {/* LEFT */}
        <SidebarLeft />

        {/* CENTER */}
        <ProjectsCenter />

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