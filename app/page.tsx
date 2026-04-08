"use client";

import { useState } from "react";
import LandingPage from "@/src/components/landing/page";
import HeroDashboard from "@/src/components/hero/page";
import LogsDashboard from "@/src/components/logs/page";
import ProjectsDashboard from "@/src/components/projects/page";
import VisualsDashboard from "@/src/components/visuals/page";
import AboutMePage from "@/src/components/about-me/page";

export default function Page() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState("BEGINNING");

  const handleEnterDashboard = () => {
    setShowLanding(false);
  };

  const renderDashboard = () => {
    switch (activeTab) {
      case "BEGINNING":
        return <HeroDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      case "LOGS":
        return <LogsDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      case "PROJECTS":
        return <ProjectsDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      case "VISUALS":
        return <VisualsDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      case "ABOUT ME":
        return <AboutMePage activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <HeroDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };

  if (showLanding) {
    return <LandingPage onEnter={handleEnterDashboard} />;
  }

  return renderDashboard();
}