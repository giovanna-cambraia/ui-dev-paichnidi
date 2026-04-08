"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import "./languageswitcher.css"

interface Props {
  soundEffects: boolean;
  setSoundEffects: (v: boolean) => void;
  music: boolean;
  setMusic: (v: boolean) => void;
}


const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = availableLanguages.find(
    (lang) => lang.code === language,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className="language-flag">{currentLanguage?.flag}</span>
        <span className="language-code">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <span className={`language-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? "active" : ""}`}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
              {language === lang.code && (
                <span className="language-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SidebarRight({
  soundEffects,
  setSoundEffects,
  music,
  setMusic,
}: Props) {
  const { t } = useLanguage();

  return (
    <div className="sidebar-right">
      {/* Quest Panel */}
      <div className="quest-panel">
        <div className="quest-header">
          <span className="quest-title-label">ACTIVE QUEST</span>
          <button className="quest-close" aria-label="Close quest panel">
            <span className="quest-x">✕</span>
          </button>
        </div>

        <div className="quest-skill-line">THE REACT SKILL-UP LINE</div>

        <div className="info-group">
          <span className="quest-name-label">QUEST NAME</span>
          <span className="quest-name">React Website</span>
        </div>

        <div className="info-group">
          <span className="quest-goal-label">GOAL</span>
          <p className="quest-goal-text">BUILD THIS WEBSITE...</p>
        </div>

        <div className="info-group">
          <span className="quest-rewards-label">REWARDS</span>
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

      {/* Settings Panel */}
      <div className="settings-panel">
        <div className="settings-header">
          <span className="settings-title">{t.settings.title}</span>
        </div>

        {/* Language Selector */}
        <div className="setting-row">
          <span className="setting-name">{t.settings.language}</span>
          <LanguageSelector />
        </div>

        {/* Sound Effects Toggle */}
        <div className="setting-row">
          <span className="setting-name">{t.settings.soundEffects}</span>
          <button
            className={`toggle-switch ${soundEffects ? "active" : ""}`}
            onClick={() => setSoundEffects(!soundEffects)}
            aria-label="Toggle sound effects"
          >
            <span className="toggle-slider" />
          </button>
        </div>

        {/* Music Toggle */}
        <div className="setting-row">
          <span className="setting-name">{t.settings.music}</span>
          <button
            className={`toggle-switch ${music ? "active" : ""}`}
            onClick={() => setMusic(!music)}
            aria-label="Toggle music"
          >
            <span className="toggle-slider" />
          </button>
        </div>

        {/* Visual Settings (placeholder) */}
        <div className="setting-row">
          <span className="setting-name">VISUAL SETTINGS</span>
          <button className="icon-btn gear" aria-label="Visual settings">
            ⚙
          </button>
        </div>
      </div>
    </div>
  );
}
