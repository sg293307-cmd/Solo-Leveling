import React from 'react';

export function SidebarMenuItem({ label, icon: Icon, active, onClick, isOpen = true }) {
  return (
    <button
      onClick={onClick}
      title={!isOpen ? label : undefined}
      className={`
        flex items-center transition-all duration-300 relative
        ${isOpen ? 'w-full gap-3 px-4 py-3 rounded-xl' : 'w-12 h-12 justify-center rounded-xl mx-auto'}
        ${active 
          ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'}
      `}
    >
      <Icon size={isOpen ? 20 : 24} className={active ? 'animate-pulse-glow' : ''} />
      {isOpen && <span className="font-medium tracking-wide">{label}</span>}
      
      {/* Active Indicator line */}
      {active && (
        <div className={`absolute left-0 bg-cyan-400 rounded-r-full shadow-[0_0_10px_#22d3ee]
                        ${isOpen ? 'w-1 h-8 -ml-4' : 'w-1 h-8'}`} />
      )}
    </button>
  );
}
