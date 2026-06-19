import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { CircularProgress } from '../ui/CircularProgress';
import { ProgressBar } from '../ui/ProgressBar';
import { defaultWeeklyHabitAssignments, defaultWeeklyHabits } from '../../data/defaultHabits';
import { calcWeeklyHabitsCompletion } from '../../utils/statsCalculator';
import { Plus, Check, X } from 'lucide-react';

export function WeeklyHabitsGrid({ data, settings, toggleWeeklyHabit, addHabit }) {
  const [addingWeek, setAddingWeek] = useState(null);
  const [newHabitName, setNewHabitName] = useState('');
  const { currentYear, currentMonth } = settings;
  const { weeklyHabits, weeklyLog } = data;

  const monthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
  const overallStats = calcWeeklyHabitsCompletion(weeklyLog, weeklyHabits, currentYear, currentMonth);

  const weekColors = ['#22d3ee', '#34d399', '#f472b6', '#fbbf24', '#a3e635'];

  return (
    <GlassCard className="flex flex-col md:flex-row p-0 overflow-hidden h-full">
      
      {/* Left Area: Overall Weekly Habits Progress */}
      <div className="md:w-[200px] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/40">
        <h3 className="text-sm font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase text-center mb-6">
          Weekly Habits
        </h3>
        
        <CircularProgress 
          percentage={overallStats.percentage} 
          size={120} 
          strokeWidth={12} 
          color="#a855f7" 
        />
        
        <div className="mt-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider text-center">
          <div>Completed</div>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {overallStats.completed} / {overallStats.total}
          </div>
        </div>
      </div>

      {/* Right Area: Columns for Each Week */}
      <div className="flex-1 overflow-x-auto custom-scrollbar">
        <div className="flex min-w-max h-full">
          {[1, 2, 3, 4, 5].map((w) => {
            const weekKey = `${monthKey}-W${w}`;
            // Get habits assigned to this week
            const assignedIds = defaultWeeklyHabitAssignments[`W${w}`] || [];
            const assignedFromDefaults = assignedIds.map(id => weeklyHabits.find(h => h.id === id)).filter(Boolean);
            const customHabits = weeklyHabits.filter(h => {
              if (defaultWeeklyHabits.find(dh => dh.id === h.id)) return false;
              return h.assignedWeek === `W${w}` || !h.assignedWeek;
            });
            const assignedHabits = [...assignedFromDefaults, ...customHabits];
            
            // Calculate progress for this week column
            const weekCompleted = assignedHabits.filter(h => weeklyLog[weekKey]?.[h.id]).length;
            const weekTotal = assignedHabits.length;
            const weekProgress = weekTotal > 0 ? (weekCompleted / weekTotal) * 100 : 0;
            const color = weekColors[(w - 1) % 5];

            return (
              <div 
                key={w} 
                className={`flex-1 min-w-[160px] flex flex-col border-r border-slate-200/50 dark:border-slate-800/50 last:border-r-0`}
              >
                {/* Column Header */}
                <div 
                  className="py-2 px-2 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50 bg-white/10 dark:bg-transparent"
                  style={{ color }}
                >
                  <span className="text-xs font-bold tracking-widest uppercase">WEEK {w}</span>
                  <button 
                    onClick={() => setAddingWeek(w)}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                {/* Tasks List */}
                <div className="flex-1 p-3 flex flex-col gap-3">
                  {assignedHabits.map((habit) => {
                    const isChecked = weeklyLog[weekKey]?.[habit.id] || false;
                    return (
                      <label 
                        key={habit.id} 
                        className="flex items-start gap-2 cursor-pointer group"
                      >
                        <input 
                          type="checkbox"
                          className="habit-checkbox w-4 h-4 mt-0.5 shrink-0"
                          checked={isChecked}
                          onChange={() => toggleWeeklyHabit(weekKey, habit.id)}
                          style={{ color }}
                        />
                        <span className={`text-xs font-medium leading-tight transition-colors ${isChecked ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                          {habit.name}
                        </span>
                      </label>
                    );
                  })}
                  
                  {addingWeek === w && (
                    <div className="flex items-center gap-1 mt-2">
                      <input
                        type="text"
                        value={newHabitName}
                        onChange={(e) => setNewHabitName(e.target.value)}
                        placeholder="Goal..."
                        className="flex-1 bg-transparent text-xs text-slate-700 dark:text-slate-300 border-b border-cyan-500 focus:outline-none w-full min-w-0"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newHabitName.trim()) {
                            addHabit(newHabitName.trim(), color, 'weekly', `W${w}`);
                            setNewHabitName('');
                            setAddingWeek(null);
                          } else if (e.key === 'Escape') {
                            setAddingWeek(null);
                            setNewHabitName('');
                          }
                        }}
                      />
                      <button 
                        onClick={() => {
                          if (newHabitName.trim()) {
                            addHabit(newHabitName.trim(), color, 'weekly', `W${w}`);
                          }
                          setNewHabitName('');
                          setAddingWeek(null);
                        }}
                        className="text-emerald-500 hover:text-emerald-600 shrink-0 p-1"
                      >
                        <Check size={12} />
                      </button>
                      <button 
                        onClick={() => {
                          setAddingWeek(null);
                          setNewHabitName('');
                        }}
                        className="text-slate-400 hover:text-red-500 shrink-0 p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Bottom Progress Bar */}
                <div className="mt-auto p-3 bg-white/20 dark:bg-slate-900/30 border-t border-slate-200/50 dark:border-slate-800/50">
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${weekProgress}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
