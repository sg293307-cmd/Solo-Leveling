import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { HabitRow } from './HabitRow';
import { getWeekBoundaries, dayLabels } from '../../utils/dateUtils';
import { Plus, Check, X } from 'lucide-react';

export function HabitGrid({ data, settings, toggleHabit, addHabit }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const { currentYear, currentMonth } = settings;
  const { dailyHabits, dailyLog } = data;
  const activeHabits = dailyHabits.filter(h => !h.archived);
  
  const weeks = getWeekBoundaries(currentYear, currentMonth);
  const totalDaysInMonth = weeks[weeks.length - 1].endDay;

  // Week column accent colors
  const weekColors = ['#22d3ee', '#34d399', '#f472b6', '#fbbf24', '#a3e635'];

  return (
    <GlassCard className="p-0 overflow-hidden mb-6">
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-max">
          
          {/* Main Table Header */}
          <div className="flex border-b-2 border-slate-300/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-900/40">
            
            {/* Top-Left Header */}
            <div className="w-[200px] shrink-0 border-r border-slate-300/50 dark:border-slate-700/50 p-2 flex flex-col justify-center items-center">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Daily Habits</span>
              <span className="text-xs font-mono text-slate-400 mt-1">
                DAYS: {totalDaysInMonth} / {totalDaysInMonth}
              </span>
            </div>

            {/* Week Group Headers */}
            <div className="flex shrink-0">
              {weeks.map((week, wIdx) => (
                <div 
                  key={week.weekNum} 
                  className={`flex flex-col ${wIdx < weeks.length - 1 ? 'border-r border-slate-300/50 dark:border-slate-700/50' : ''}`}
                >
                  {/* Week Label */}
                  <div 
                    className="text-center text-[10px] font-bold tracking-widest py-1 border-b border-slate-300/50 dark:border-slate-700/50"
                    style={{ color: weekColors[wIdx % 5] }}
                  >
                    {week.label}
                  </div>
                  
                  {/* Day of Week Letters */}
                  <div className="flex bg-white/20 dark:bg-slate-800/20 px-1">
                    {week.days.map((day) => {
                      const dateObj = new Date(currentYear, currentMonth - 1, day);
                      const dayLetter = dayLabels[dateObj.getDay()];
                      return (
                        <div key={day} className="w-7 text-center text-[10px] font-bold text-slate-500 py-1 border-b border-slate-300/50 dark:border-slate-700/50">
                          {dayLetter}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Day Numbers */}
                  <div className="flex bg-white/10 dark:bg-slate-800/10 px-1">
                    {week.days.map((day) => (
                      <div key={day} className="w-7 text-center text-[10px] font-mono font-bold text-slate-500 py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Top-Right Header */}
            <div className="flex-1 min-w-[150px] p-2 pl-4 flex flex-col justify-center border-l-2 border-slate-300/50 dark:border-slate-700/50">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Goal Progress</span>
            </div>

          </div>

          {/* Table Body - Rows */}
          <div className="flex flex-col">
            {activeHabits.map(habit => (
              <HabitRow 
                key={habit.id}
                habit={habit}
                weeks={weeks}
                year={currentYear}
                month={currentMonth}
                dailyLog={dailyLog}
                toggleHabit={toggleHabit}
              />
            ))}
            
            {/* Add Habit Row */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 transition-colors p-2 h-10 items-center">
              {isAdding ? (
                <div className="flex items-center gap-2 w-full max-w-[200px]">
                  <input
                    type="text"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="Habit name..."
                    className="flex-1 bg-transparent text-xs text-slate-700 dark:text-slate-300 border-b border-cyan-500 focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newHabitName.trim()) {
                        addHabit(newHabitName.trim());
                        setNewHabitName('');
                        setIsAdding(false);
                      } else if (e.key === 'Escape') {
                        setIsAdding(false);
                        setNewHabitName('');
                      }
                    }}
                  />
                  <button 
                    onClick={() => {
                      if (newHabitName.trim()) {
                        addHabit(newHabitName.trim());
                      }
                      setNewHabitName('');
                      setIsAdding(false);
                    }}
                    className="text-emerald-500 hover:text-emerald-600"
                  >
                    <Check size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      setIsAdding(false);
                      setNewHabitName('');
                    }}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="flex items-center text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 w-[200px]"
                >
                  <Plus size={14} className="mr-2" /> Add Daily Habit
                </button>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </GlassCard>
  );
}
