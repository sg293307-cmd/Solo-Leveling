import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { getDaysInMonth, getFirstDayOfMonth, getMonthName, formatDateKey } from '../../utils/dateUtils';

export function AnnualHeatmap({ heatmapData, year }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <GlassCard className="p-6">
      <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-6 text-center">
        Daily Habits Completed
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map(month => {
          const daysInMonth = getDaysInMonth(year, month);
          const firstDay = getFirstDayOfMonth(year, month); // 0 = Sun, 6 = Sat
          
          // Create array for empty cells before start of month
          const emptyCells = Array.from({ length: firstDay }, (_, i) => i);
          
          // Create array for days in month
          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

          return (
            <div key={month} className="flex flex-col">
              {/* Month Header */}
              <div className="text-center font-bold text-xs tracking-widest uppercase text-slate-600 dark:text-slate-300 mb-2 p-1 bg-slate-100 dark:bg-slate-800/50 rounded">
                {getMonthName(month)}
              </div>
              
              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-center text-[8px] font-bold text-slate-400">
                    {d}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Adjusting firstDay because calendar starts on Monday but getDay() is Sunday-based */}
                {/* Note: getFirstDayOfMonth returns 0 for Sunday. If we want Mon-Sun calendar: */}
                {/* Sunday (0) becomes 6 empty cells. Mon (1) -> 0, Tue (2) -> 1... */}
                {Array.from({ length: (firstDay + 6) % 7 }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                
                {days.map(day => {
                  const key = formatDateKey(year, month, day);
                  const completionRatio = heatmapData[key] || 0;
                  
                  // Color intensity based on completion ratio
                  let bgClass = "bg-slate-100 dark:bg-slate-800"; // 0%
                  let textClass = "text-slate-400";
                  let shadowStyle = "none";
                  
                  if (completionRatio === 1) {
                    bgClass = "bg-cyan-400 text-slate-900 font-bold";
                    shadowStyle = "0 0 8px rgba(34, 211, 238, 0.6)"; // Neon glow for 100%
                  } else if (completionRatio >= 0.75) {
                    bgClass = "bg-cyan-500/60 text-slate-900 dark:text-slate-100";
                  } else if (completionRatio >= 0.5) {
                    bgClass = "bg-cyan-500/40 text-slate-700 dark:text-slate-300";
                  } else if (completionRatio > 0) {
                    bgClass = "bg-cyan-500/20 text-slate-600 dark:text-slate-400";
                  }

                  return (
                    <div 
                      key={day} 
                      className={`aspect-square flex items-center justify-center text-[9px] rounded-sm transition-all duration-300 ${bgClass} ${textClass}`}
                      style={{ boxShadow: shadowStyle }}
                      title={`${completionRatio * 100}% completed on ${key}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
