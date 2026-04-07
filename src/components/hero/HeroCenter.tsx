"use client";

import { useState } from "react";

import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import HeroCenter from "./HeroCenter";
import BottomTabs from "../reusable/BottomTabs";

export default function HeroDashboard() {
  const [activeTab, setActiveTab] = useState("BEGINNING");
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);

  return (
    <div className="dashboard">
      <TopBar />

      <div className="dashboard-inner">
        <SidebarLeft />
        <HeroCenter />
        <SidebarRight
          soundEffects={soundEffects}
          setSoundEffects={setSoundEffects}
          music={music}
          setMusic={setMusic}
        />
      </div>

      <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={[]} />
    </div>
  );
}
