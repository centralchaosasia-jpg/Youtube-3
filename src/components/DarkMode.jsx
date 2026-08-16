import React from 'react';

const DarkMode = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-50 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-lg"
      title="Toggle dark mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkMode;
