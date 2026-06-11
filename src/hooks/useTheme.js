import { useState, useEffect } from 'react';

/**
 * Hook to manage dark/light mode toggle.
 * Uses the modern color-scheme approach combined with a generic dataset toggle.
 */
export function useTheme(initialTheme = 'light') {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('solo_leveling_theme');
      if (stored) return stored;
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return initialTheme;
  });

  useEffect(() => {
    // Apply to html element
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Set for modern CSS light-dark() function support
    root.style.colorScheme = theme;
    
    // Persist
    window.localStorage.setItem('solo_leveling_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
