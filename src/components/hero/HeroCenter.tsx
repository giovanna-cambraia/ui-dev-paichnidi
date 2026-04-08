"use client";

import { useState } from "react";

import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import HeroCenter from "./HeroCenter";
import BottomTabs from "../reusable/BottomTabs";

import "./hero.css";
import "../reusable/reusable.css";

interface DashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function HeroDashboard({ activeTab, setActiveTab }: DashboardProps) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);

  return (
    <div className="dashboard">
      <TopBar />

      <div className="dashboard-inner">
        <SidebarLeft />
        <HeroCenter activeTab={""} setActiveTab={function (tab: string): void {
          throw new Error("Function not implemented.");
        } } />
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
