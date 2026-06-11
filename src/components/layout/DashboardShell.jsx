import React from 'react';

export function DashboardShell({ children, isOpen }) {
  return (
    <div className={`min-h-screen transition-all duration-300 ${isOpen ? 'pl-0 md:pl-[280px]' : 'pl-[80px]'}`}>
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30 mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400 dark:text-slate-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main content wrapper */}
      <main className="relative z-10 max-w-[1600px] mx-auto p-6 md:p-8">
        <div className="animate-in">
          {children}
        </div>
      </main>
    </div>
  );
}
