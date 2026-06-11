import React from 'react';
import { calcHabitMonthProgress } from '../../utils/statsCalculator';
import { formatDateKey, dayLabels } from '../../utils/dateUtils';
import { ProgressBar } from '../ui/ProgressBar';

export function HabitRow({ 
  habit, 
  weeks, 
  year, 
  month, 
  dailyLog, 
  toggleHabit 
}) {
  // Calculate progress for this specific habit
  const progress = calcHabitMonthProgress(dailyLog, habit.id, year, month);

  return (
    <div className="flex border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      
      {/* Left Column: Habit Name */}
      <div className="w-[200px] shrink-0 border-r border-slate-200 dark:border-slate-800 p-2 flex items-center">
        <span 
          className="text-xs font-medium truncate" 
          title={habit.name}
          style={{ color: habit.color }}
        >
          {habit.name}
        </span>
      </div>

      {/* Center: The Checkboxes by Week */}
      <div className="flex shrink-0">
        {weeks.map((week, wIdx) => (
          <div 
            key={week.weekNum} 
            className={`flex px-1 ${wIdx < weeks.length - 1 ? 'border-r border-slate-200 dark:border-slate-800' : ''}`}
            style={{ 
              // Very subtle background tint per week matching reference
              backgroundColor: [
                'rgba(34,211,238,0.02)', // Cyan
                'rgba(52,211,153,0.02)', // Green
                'rgba(244,114,182,0.02)', // Pink
                'rgba(251,191,36,0.02)', // Amber
                'rgba(163,230,53,0.02)', // Lime
              ][wIdx % 5]
            }}
          >
            {week.days.map((day) => {
              const dateKey = formatDateKey(year, month, day);
              const isChecked = dailyLog[dateKey]?.[habit.id] || false;
              
              return (
                <div key={day} className="w-7 h-8 flex items-center justify-center p-1">
                  <input 
                    type="checkbox" 
                    className="habit-checkbox w-full h-full"
                    checked={isChecked}
                    onChange={() => toggleHabit(dateKey, habit.id)}
                    style={{ color: habit.color }}
                    aria-label={`Mark ${habit.name} on day ${day}`}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Right Column: Progress Bar */}
      <div className="flex-1 min-w-[150px] p-2 pl-4 flex items-center border-l-2 border-slate-300 dark:border-slate-700">
        <ProgressBar 
          value={progress.completed} 
          max={progress.total} 
          color={habit.color} 
        />
        <div className="w-12 text-right text-[10px] font-mono ml-2 text-slate-500">
          {progress.completed}/{progress.total}
        </div>
      </div>
    </div>
  );
}
