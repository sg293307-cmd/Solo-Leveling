import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { formatDateKey } from '../../utils/dateUtils';
import { calcHealthAverages } from '../../utils/statsCalculator';

export function HealthMetricsInput({ data, settings, updateHealthMetrics }) {
  const { currentYear, currentMonth } = settings;
  const { healthMetrics } = data;
  
  // Default to today if we are viewing the current month, otherwise the 1st of that month
  const today = new Date();
  const viewingCurrentMonth = today.getFullYear() === currentYear && today.getMonth() + 1 === currentMonth;
  const selectedDay = viewingCurrentMonth ? today.getDate() : 1;
  const dateKey = formatDateKey(currentYear, currentMonth, selectedDay);
  
  const currentMetrics = healthMetrics[dateKey] || {
    sleepHours: 7,
    moodRating: 3,
    energyLevel: 3
  };

  const handleChange = (field, value) => {
    updateHealthMetrics(dateKey, { [field]: Number(value) });
  };

  return (
    <GlassCard className="p-4 flex flex-col gap-4">
      <h3 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800 pb-2">
        Daily Health Log (Day {selectedDay})
      </h3>
      
      <div className="space-y-4">
        {/* Sleep Input */}
        <div>
          <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            <span>Sleep (Hours)</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{currentMetrics.sleepHours}h</span>
          </div>
          <input 
            type="range" 
            min="0" max="12" step="0.5"
            value={currentMetrics.sleepHours}
            onChange={(e) => handleChange('sleepHours', e.target.value)}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Mood Input */}
        <div>
          <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            <span>Mood Rating</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{currentMetrics.moodRating}/5</span>
          </div>
          <input 
            type="range" 
            min="1" max="5" step="0.5"
            value={currentMetrics.moodRating}
            onChange={(e) => handleChange('moodRating', e.target.value)}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Low</span>
            <span>Great</span>
          </div>
        </div>

        {/* Energy Input */}
        <div>
          <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            <span>Energy Level</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{currentMetrics.energyLevel}/5</span>
          </div>
          <input 
            type="range" 
            min="1" max="5" step="0.5"
            value={currentMetrics.energyLevel}
            onChange={(e) => handleChange('energyLevel', e.target.value)}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
