// src/components/ThemeToggle.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  FaSun,
  FaMoon,
  FaPalette,
  FaCloudSun,
  FaTree,
  FaNeuter,
} from 'react-icons/fa'; // Importing additional icons

const ThemeToggle = () => {
  const { currentTheme, toggleTheme, themes } = useTheme();

  // Map each theme to an icon for better UX
  const themeIcons = {
    light: <FaSun />,
    dark: <FaMoon />,
    pastel: <FaPalette />,
    sunset: <FaCloudSun />,
    forest: <FaTree />,
    neon: <FaNeuter />, // Using FaNeuter as a placeholder for neon
  };

  return (
    <div className="flex space-x-3">
      {Object.keys(themes).map((themeName) => (
        <button
          key={themeName}
          onClick={() => toggleTheme(themeName)}
          className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300
            ${
              currentTheme === themeName
                ? 'transform scale-110 border-4 border-white shadow-lg'
                : 'transform hover:scale-105'
            }
          `}
          style={{
            background: `var(--header-bg)`,
          }}
          title={`${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme`}
          aria-label={`Switch to ${themeName} theme`}
        >
          <div
            className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ${
              currentTheme === themeName ? 'opacity-50' : 'hover:opacity-25'
            }`}
            style={{
              background: `var(--primary-color)`,
            }}
          ></div>
          <span className="relative text-white text-xl">
            {themeIcons[themeName]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
