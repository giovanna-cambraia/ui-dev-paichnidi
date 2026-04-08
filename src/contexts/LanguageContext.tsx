// contexts/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../types/en'; 
import { es } from '../types/es'; 
import { pt } from '../types/pt'; 
import { Translations } from '../types/translations'; 

type Language = 'en' | 'es' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const translations = {
  en,
  es,
  pt,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const availableLanguages = [
    { code: 'en' as const, name: 'ENGLISH', flag: '🇺🇸' },
    { code: 'es' as const, name: 'ESPAÑOL', flag: '🇪🇸' },
    { code: 'pt' as const, name: 'PORTUGUÊS', flag: '🇧🇷' },
  ];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};