import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { CircularProgress } from '../ui/CircularProgress';
import { Sparkline } from '../ui/Sparkline';
import { getMonthName } from '../../utils/dateUtils';
import { calcMonthlyOverall, calcDailySparkline } from '../../utils/statsCalculator';

export function HeaderStrip({ data, settings, updateSettings }) {
  const { currentYear, currentMonth } = settings;
  const { dailyLog, dailyHabits } = data;

  // Compute stats for current view
  const overall = calcMonthlyOverall(dailyLog, dailyHabits, currentYear, currentMonth);
  const sparklineData = calcDailySparkline(dailyLog, dailyHabits, currentYear, currentMonth);

  // Generate years for dropdown
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);
  // Generate months
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <GlassCard className="mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
      
      {/* Left: Title & Selectors */}
      <div className="flex flex-col gap-4 min-w-[200px]">
        <h2 className="text-xl font-bold tracking-widest text-slate-800 dark:text-slate-100 uppercase border-b border-slate-300 dark:border-slate-700 pb-2">
          Habit Tracker
        </h2>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col border border-slate-300 dark:border-slate-700 rounded overflow-hidden">
            <span className="text-[10px] text-center font-bold bg-slate-100 dark:bg-slate-800 py-1 border-b border-slate-300 dark:border-slate-700">
              MONTH
            </span>
            <select 
              value={currentMonth}
              onChange={(e) => updateSettings({ currentMonth: Number(e.target.value) })}
              className="bg-transparent text-sm font-bold text-center py-1.5 focus:outline-none appearance-none"
            >
              {months.map(m => (
                <option key={m} value={m} className="dark:bg-slate-900">{getMonthName(m)}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col border border-slate-300 dark:border-slate-700 rounded overflow-hidden">
            <span className="text-[10px] text-center font-bold bg-slate-100 dark:bg-slate-800 py-1 border-b border-slate-300 dark:border-slate-700">
              YEAR
            </span>
            <select 
              value={currentYear}
              onChange={(e) => updateSettings({ currentYear: Number(e.target.value) })}
              className="bg-transparent text-sm font-bold text-center py-1.5 focus:outline-none appearance-none"
            >
              {years.map(y => (
                <option key={y} value={y} className="dark:bg-slate-900">{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Middle: Sparkline Activity */}
      <div className="flex-1 flex flex-col items-center border-l border-r border-slate-300 dark:border-slate-700 px-6 py-2 border-dashed hidden md:flex">
        <span className="text-xs font-bold text-slate-500 tracking-widest mb-2 uppercase">Daily Progress Trend</span>
        <div className="w-full flex justify-center">
          <Sparkline data={sparklineData} width={300} height={60} color="#2dd4bf" />
        </div>
      </div>

      {/* Right: Overall Completion */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overall</span>
          <span className="text-sm font-mono text-slate-600 dark:text-slate-400">
            {overall.completed} / {overall.total}
          </span>
        </div>
        
        <CircularProgress 
          percentage={overall.percentage} 
          size={100} 
          strokeWidth={8}
          color="#a855f7" // Purple accent
        />
      </div>

    </GlassCard>
  );
}
