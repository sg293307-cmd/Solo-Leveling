import React from 'react';

export function ProgressBar({ value, max = 100, color = '#22d3ee', showLabel = false }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="flex flex-col w-full gap-1">
      {showLabel && (
        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span>{value} / {max}</span>
        </div>
      )}
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 transition-colors duration-300">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}80`
          }}
        />
      </div>
    </div>
  );
}
