import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize language from localStorage or browser settings
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    
    if (storedLanguage && ['en', 'fr'].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    } else if (['en', 'fr'].includes(browserLanguage)) {
      setLanguageState(browserLanguage);
    }
    
    setIsMounted(true);
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  }, [language, isMounted]);

  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      setLanguageState(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};