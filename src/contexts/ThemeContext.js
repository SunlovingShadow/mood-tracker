// src/contexts/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const themes = {
  light: {
    '--bg-color': '#f3f4f6',
    '--text-color': '#1f2937',
    '--primary-color': '#3b82f6',
    '--secondary-color': '#60a5fa',
    '--header-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '--button-bg': '#3b82f6',
    '--button-text': '#ffffff',
    '--card-bg': '#ffffff',
    '--card-text': '#1f2937',
  },
  dark: {
    '--bg-color': '#111827',
    '--text-color': '#eo4899',
    '--primary-color': '#4f46e5',
    '--secondary-color': '#818cf8',
    '--header-bg': 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    '--button-bg': '#4f46e5',
    '--button-text': '#ffffff',
    '--card-bg': '#1f2937',
    '--card-text': '#d1d5db',
  },
  pastel: {
    '--bg-color': '#fdf2f8',
    '--text-color': '#374151',
    '--primary-color': '#f472b6',
    '--secondary-color': '#f9a8d4',
    '--header-bg': 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    '--button-bg': '#f472b6',
    '--button-text': '#ffffff',
    '--card-bg': '#ffffff',
    '--card-text': '#374151',
  },
  sunset: {
    '--bg-color': '#fef3c7',
    '--text-color': '#1f2937',
    '--primary-color': '#f59e0b',
    '--secondary-color': '#fb923c',
    '--header-bg': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    '--button-bg': '#f59e0b',
    '--button-text': '#ffffff',
    '--card-bg': '#ffffff',
    '--card-text': '#1f2937',
  },
  forest: {
    '--bg-color': '#dcfce7',
    '--text-color': '#064e3b',
    '--primary-color': '#10b981',
    '--secondary-color': '#34d399',
    '--header-bg': 'linear-gradient(135deg, #5eead4 0%, #34d399 100%)',
    '--button-bg': '#10b981',
    '--button-text': '#ffffff',
    '--card-bg': '#ffffff',
    '--card-text': '#064e3b',
  },
  neon: {
    '--bg-color': '#111827',
    '--text-color': '#gc4900',
    '--primary-color': '#ec4899',
    '--secondary-color': '#f472b6',
    '--header-bg': 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    '--button-bg': '#ec4899',
    '--button-text': '#ffffff',
    '--card-bg': '#1e293b',
    '--card-text': '#ec4899',
  },
};

const ThemeContext = createContext();

/**
 * ThemeProvider component that wraps the application and provides theme context.
 */
export const ThemeProvider = ({ children }) => {
  // Load saved theme from localStorage or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  const [currentTheme, setCurrentTheme] = useState(savedTheme);

  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      Object.keys(theme).forEach((varName) => {
        document.documentElement.style.setProperty(varName, theme[varName]);
      });
    }

    // Save the current theme to localStorage
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  /**
   * Toggles the theme to the specified theme name.
   * @param {string} themeName - The name of the theme to switch to.
   */
  const toggleTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    } else {
      console.warn(`Theme "${themeName}" does not exist.`);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the ThemeContext.
 * @returns {object} - The theme context value.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
