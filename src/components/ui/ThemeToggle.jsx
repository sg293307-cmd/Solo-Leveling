import React from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full overflow-hidden group transition-all duration-300
                 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300
                 hover:bg-slate-300 dark:hover:bg-slate-700
                 border border-slate-300 dark:border-slate-700
                 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 transition-all duration-500 transform ${
            isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
          size={20}
        />
        <Moon 
          className={`absolute inset-0 transition-all duration-500 transform ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
          }`}
          size={20}
        />
      </div>
      
      {/* Subtle glow effect on hover in dark mode */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                    dark:bg-gradient-to-tr dark:from-cyan-500/20 dark:to-purple-500/20" />
    </button>
  );
}
