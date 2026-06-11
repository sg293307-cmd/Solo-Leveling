import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { CircularProgress } from '../ui/CircularProgress';
import { calcWeeklyCompletion } from '../../utils/statsCalculator';

export function WeeklyProgressStrip({ data, settings }) {
  const { currentYear, currentMonth } = settings;
  const { dailyLog, dailyHabits } = data;

  const weeklyStats = calcWeeklyCompletion(dailyLog, dailyHabits, currentYear, currentMonth);
  const weekColors = ['#22d3ee', '#34d399', '#f472b6', '#fbbf24', '#a3e635'];

  return (
    <GlassCard className="mb-6 p-0 overflow-hidden flex flex-col md:flex-row">
      
      {/* Title Area */}
      <div className="md:w-[200px] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/40">
        <h3 className="text-sm font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase text-center">
          Weekly Progress
        </h3>
      </div>

      {/* Gauges */}
      <div className="flex-1 flex overflow-x-auto custom-scrollbar p-6 justify-between gap-6">
        {weeklyStats.map((week, idx) => (
          <div key={week.weekNum} className="flex flex-col items-center min-w-[120px]">
            {/* Gauge */}
            <CircularProgress 
              percentage={week.percentage} 
              size={110} 
              strokeWidth={10} 
              color={weekColors[idx % 5]} 
            />
            
            {/* Stats Breakdown */}
            <div className="w-full mt-4 flex flex-col gap-1 border-t border-slate-200 dark:border-slate-800 pt-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500">Completed:</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">{week.completed}</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500">Incomplete:</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">{week.incomplete}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </GlassCard>
  );
}
