"use client";

import React, { useState } from "react";
import TopBar from "../reusable/TopBar";
import SidebarLeft from "../reusable/SidebarLeft";
import SidebarRight from "../reusable/SidebarRight";
import BottomTabs from "../reusable/BottomTabs";
import "../reusable/reusable.css";
import "./hero.css";
import { GridScan } from "@/src/react-bits/grid-scan/GridScan";

interface HeroDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  "BEGINNING",
  "LOGS",
  "PROJECTS",
  "VISUALS",
  "ABOUT ME",
  "CONTACT",
];

export default function HeroDashboard({
  activeTab,
  setActiveTab,
}: HeroDashboardProps) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [music, setMusic] = useState(false);

  return (
    <div className="dashboard">
      {/* TOP BAR - Using reusable component */}
      <TopBar />

      {/* INNER CONTAINER WITH ALL CONTENT */}
      <div className="dashboard-inner">
        {/* LEFT SIDEBAR - Using reusable component */}
        <SidebarLeft />

        {/* CENTER - Hero content */}
        <div className="center hero-center">
          <div className="image-area">
            <div className="img-corner tl" />
            <div className="img-corner tr" />
            <div className="img-corner bl" />
            <div className="img-corner br" />

            {/* GridScan directly inside - no extra wrapper div */}
            <GridScan
              sensitivity={0.55}
              lineThickness={1}
              linesColor="#aa8ae5"
              gridScale={0.1}
              scanColor="#781fc1"
              scanOpacity={0.4}
              enablePost
              bloomIntensity={0.6}
              chromaticAberration={0.002}
              noiseIntensity={0.01}
            />

            {/* Quote overlay on top */}
            <div className="image-quote">
              <p>
                SWIMMING THROUGH A VAST NETWORK OF INTERCONNECTED DEVICES AND
                SERVERS, SPREADING JOY AND WHIMSY TO USERS ACROSS THE GLOBE
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - Using reusable component */}
        <SidebarRight
          soundEffects={soundEffects}
          setSoundEffects={setSoundEffects}
          music={music}
          setMusic={setMusic}
        />
      </div>

      {/* BOTTOM TABS - Using reusable component */}
      <BottomTabs
        tabs={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
