import React from 'react';
import { LayoutDashboard, LineChart, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { ThemeToggle } from '../ui/ThemeToggle';
import { RankBadge } from '../ui/RankBadge';
import { getRank } from '../../utils/rankCalculator';
import { calcYearToDateCompletion } from '../../utils/statsCalculator';

export function Sidebar({
  currentPage,
  setCurrentPage,
  onLogout,
  user,
  theme,
  toggleTheme,
  data,
  isOpen,
  setIsOpen
}) {
  // Calculate dynamic rank based on year-to-date performance
  const ytdStats = calcYearToDateCompletion(data.dailyLog, data.dailyHabits, data.settings.currentYear);
  const currentRank = getRank(ytdStats.percentage);

  // Initials for avatar
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  return (
    <aside className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300
                      ${isOpen ? 'w-[280px]' : 'w-[80px]'}
                      bg-white/40 dark:bg-[#2a2536]/90 backdrop-blur-xl 
                      border-r border-slate-200/50 dark:border-slate-800/50 
                      flex flex-col shadow-xl`}>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 z-50 shadow-sm"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Brand Header */}
      <div className={`p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-center h-[97px] ${!isOpen && 'px-2'}`}>
        {isOpen ? (
          <>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic
                           text-slate-900 dark:text-[#59e1f6ff] text-center drop-shadow-sm">
              Solo Leveling
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-widest mt-1 text-center">
              SYSTEM DASHBOARD
            </p>
          </>
        ) : (
          <h1 className="text-xl font-black tracking-tighter uppercase italic
                           text-slate-900 dark:text-[#59e1f6ff] text-center drop-shadow-sm">
            SL
          </h1>
        )}
      </div>

      {/* User Profile Info */}
      <div className={`p-6 flex flex-col items-center border-b border-slate-200/50 dark:border-slate-800/50 ${!isOpen && 'px-2'}`}>
        <div className={`relative ${isOpen ? 'mb-4' : 'mb-2'}`}>
          <div className={`${isOpen ? 'w-20 h-20 text-2xl' : 'w-10 h-10 text-sm'} rounded-full flex items-center justify-center font-bold
                          bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300
                          border-2 shadow-lg transition-all duration-300`}
            style={{ borderColor: currentRank.color }}>
            {initials}
          </div>
          {/* Status dot */}
          <div className={`absolute bottom-0 right-0 ${isOpen ? 'w-5 h-5' : 'w-3 h-3'} rounded-full border-2 border-slate-50 dark:border-slate-900 bg-emerald-500 shadow-[0_0_8px_#10b981] transition-all duration-300`} />
        </div>

        {isOpen && (
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center truncate w-full">
            {user?.name || 'Hunter'}
          </h2>
        )}

        <RankBadge rank={currentRank} size={isOpen ? "sm" : "xs"} showLabel={isOpen} />
      </div>

      {/* Navigation */}
      <nav className={`flex-1 p-4 space-y-2 overflow-y-auto ${!isOpen && 'px-2'}`}>
        <SidebarMenuItem
          label="Monthly Dashboard"
          icon={LayoutDashboard}
          active={currentPage === 'dashboard'}
          onClick={() => setCurrentPage('dashboard')}
          isOpen={isOpen}
        />
        <SidebarMenuItem
          label="Annual Analytics"
          icon={LineChart}
          active={currentPage === 'analytics'}
          onClick={() => setCurrentPage('analytics')}
          isOpen={isOpen}
        />
      </nav>

      {/* Footer Utilities */}
      <div className={`p-4 border-t border-slate-200/50 dark:border-slate-800/50 flex ${isOpen ? 'flex-row items-center justify-between' : 'flex-col items-center justify-center gap-4'}`}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} isOpen={isOpen} />

        <button
          onClick={onLogout}
          title={!isOpen ? "Log out" : ""}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                     text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 
                     hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors ${!isOpen ? 'w-10 h-10 p-0' : ''}`}
        >
          <LogOut size={16} />
          {isOpen && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
