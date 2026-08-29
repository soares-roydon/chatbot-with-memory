import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
   const [isDark, setIsDark] = useState(() => {
      // Check localStorage first, then system preference
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
   });

   useEffect(() => {
      // Add or remove the 'dark' class on <html>
      const root = document.documentElement;
      if (isDark) {
         root.classList.add('dark');
      } else {
         root.classList.remove('dark');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
   }, [isDark]);

   return (
      <button
         onClick={() => setIsDark(!isDark)}
         className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
         aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
         {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>
   );
};

export default ThemeToggle;
