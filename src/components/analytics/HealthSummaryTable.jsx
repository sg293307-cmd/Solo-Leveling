import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { getMonthShortName } from '../../utils/dateUtils';

export function HealthSummaryTable({ averages }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // Helper to color-code metrics
  const getSleepColor = (val) => {
    if (!val) return '';
    if (val >= 7) return 'text-green-500';
    if (val >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getRatingColor = (val) => {
    if (!val) return '';
    if (val >= 4) return 'text-green-500';
    if (val >= 3) return 'text-blue-500';
    if (val >= 2) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <GlassCard className="p-0 overflow-hidden mb-6">
      <div className="bg-slate-200/50 dark:bg-slate-800/50 p-3 border-b border-slate-300 dark:border-slate-700">
        <h3 className="text-sm font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase text-center">
          Health Summary
        </h3>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-2 font-bold text-slate-500 w-32 border-r border-slate-200 dark:border-slate-800">METRIC</th>
              {months.map(m => (
                <th key={m} className="px-2 py-2 text-center font-bold text-[10px] tracking-widest text-slate-500 border-r border-slate-200 dark:border-slate-800">
                  {getMonthShortName(m)}
                </th>
              ))}
              <th className="px-4 py-2 text-center font-bold text-[10px] tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20">
                AVG
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Sleep Row */}
            <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
              <td className="px-4 py-2 font-medium text-xs text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                Hours of sleep
              </td>
              {months.map(m => (
                <td key={m} className={`px-2 py-2 text-center font-mono text-xs border-r border-slate-200 dark:border-slate-800 ${getSleepColor(averages[m]?.sleepHours)}`}>
                  {averages[m]?.sleepHours ? averages[m].sleepHours.toFixed(1) : '-'}
                </td>
              ))}
              <td className={`px-4 py-2 text-center font-mono font-bold text-xs bg-cyan-50/50 dark:bg-cyan-900/10 ${getSleepColor(averages.average?.sleepHours)}`}>
                {averages.average?.sleepHours ? averages.average.sleepHours.toFixed(1) : '-'}
              </td>
            </tr>
            
            {/* Mood Row */}
            <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
              <td className="px-4 py-2 font-medium text-xs text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                Daily mood
              </td>
              {months.map(m => (
                <td key={m} className={`px-2 py-2 text-center font-mono text-xs border-r border-slate-200 dark:border-slate-800 ${getRatingColor(averages[m]?.moodRating)}`}>
                  {averages[m]?.moodRating ? averages[m].moodRating.toFixed(1) : '-'}
                </td>
              ))}
              <td className={`px-4 py-2 text-center font-mono font-bold text-xs bg-cyan-50/50 dark:bg-cyan-900/10 ${getRatingColor(averages.average?.moodRating)}`}>
                {averages.average?.moodRating ? averages.average.moodRating.toFixed(1) : '-'}
              </td>
            </tr>
            
            {/* Energy Row */}
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
              <td className="px-4 py-2 font-medium text-xs text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                Daily energy levels
              </td>
              {months.map(m => (
                <td key={m} className={`px-2 py-2 text-center font-mono text-xs border-r border-slate-200 dark:border-slate-800 ${getRatingColor(averages[m]?.energyLevel)}`}>
                  {averages[m]?.energyLevel ? averages[m].energyLevel.toFixed(1) : '-'}
                </td>
              ))}
              <td className={`px-4 py-2 text-center font-mono font-bold text-xs bg-cyan-50/50 dark:bg-cyan-900/10 ${getRatingColor(averages.average?.energyLevel)}`}>
                {averages.average?.energyLevel ? averages.average.energyLevel.toFixed(1) : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
