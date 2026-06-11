import React from 'react';
import { HeaderStrip } from '../components/dashboard/HeaderStrip';
import { HabitGrid } from '../components/dashboard/HabitGrid';
import { WeeklyProgressStrip } from '../components/dashboard/WeeklyProgressStrip';
import { WeeklyHabitsGrid } from '../components/dashboard/WeeklyHabitsGrid';
import { NotesPanel } from '../components/dashboard/NotesPanel';
import { HealthMetricsInput } from '../components/dashboard/HealthMetricsInput';

export function MonthlyDashboard({ data, updateSettings, toggleDailyHabit, toggleWeeklyHabit, updateNotes, updateHealthMetrics, addHabit }) {
  return (
    <div className="flex flex-col h-full animate-in">
      {/* Top Header */}
      <HeaderStrip 
        data={data} 
        settings={data.settings} 
        updateSettings={updateSettings} 
      />

      {/* Main Grid */}
      <HabitGrid 
        data={data} 
        settings={data.settings} 
        toggleHabit={toggleDailyHabit} 
        addHabit={addHabit}
      />

      {/* Weekly Gauges */}
      <WeeklyProgressStrip 
        data={data} 
        settings={data.settings} 
      />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[400px]">
        
        {/* Weekly Checklist - Spans 7 cols on large screens */}
        <div className="lg:col-span-7 h-full">
          <WeeklyHabitsGrid 
            data={data} 
            settings={data.settings} 
            toggleWeeklyHabit={toggleWeeklyHabit} 
          />
        </div>
        
        {/* Notes & Health - Spans 5 cols */}
        <div className="lg:col-span-5 h-full flex flex-col gap-6">
          <div className="flex-1">
            <NotesPanel 
              data={data} 
              settings={data.settings} 
              updateNotes={updateNotes} 
            />
          </div>
          <div className="shrink-0">
            <HealthMetricsInput
              data={data}
              settings={data.settings}
              updateHealthMetrics={updateHealthMetrics}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
