import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown on mobile
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle language selection
  const handleLanguageSelect = (lang: 'en' | 'fr') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown */}
      <div 
        className={`absolute right-10 top-6 md:top-auto bottom-0 md:bottom-6 mt-2 w-40 z-50  transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible translate-y-2'
        }`}
      >
        <div className="flex flex-col bg-white rounded-lg shadow-lg py-2">
          <button
            onClick={() => handleLanguageSelect('en')}
            className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-indigo-50 flex items-center ${
              language === 'en' ? 'text-indigo-600 font-medium' : 'text-gray-700'
            }`}
          >
            <span className="mr-2">🇺🇸</span>
            <span>English</span>
            {language === 'en' && (
              <span className="ml-auto text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </button>
          
          <button
            onClick={() => handleLanguageSelect('fr')}
            className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-indigo-50 flex items-center ${
              language === 'fr' ? 'text-indigo-600 font-medium' : 'text-gray-700'
            }`}
          >
            <span className="mr-2">🇫🇷</span>
            <span>Français</span>
            {language === 'fr' && (
              <span className="ml-auto text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Toggle Button */}
      <button 
        className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full bg-gradient-to-br from-blue-900 to-red-800 text-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Change language"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {language === 'en' ? 'EN' : 'FR'}
      </button>
    </div>
  );
};

export default LanguageSwitcher;