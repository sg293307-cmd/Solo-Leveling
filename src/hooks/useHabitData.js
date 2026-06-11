import { useLocalStorage } from './useLocalStorage';
import { generateSeedData } from '../data/seedData';
import { formatDateKey } from '../utils/dateUtils';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'solo_leveling_data_v1';

export function useHabitData() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    if (data === null) {
      // First time using app - seed with demo data for current year
      setData(generateSeedData(new Date().getFullYear()));
    }
    setIsLoaded(true);
  }, [data, setData]);

  // Data mutations

  /** Toggle a daily habit's completion status */
  const toggleDailyHabit = (dateKey, habitId) => {
    setData((prev) => {
      const dayLog = prev.dailyLog[dateKey] || {};
      const isCompleted = !!dayLog[habitId];
      
      return {
        ...prev,
        dailyLog: {
          ...prev.dailyLog,
          [dateKey]: {
            ...dayLog,
            [habitId]: !isCompleted,
          },
        },
      };
    });
  };

  /** Toggle a weekly habit's completion status */
  const toggleWeeklyHabit = (weekKey, habitId) => {
    setData((prev) => {
      const weekLog = prev.weeklyLog[weekKey] || {};
      const isCompleted = !!weekLog[habitId];
      
      return {
        ...prev,
        weeklyLog: {
          ...prev.weeklyLog,
          [weekKey]: {
            ...weekLog,
            [habitId]: !isCompleted,
          },
        },
      };
    });
  };

  /** Update health metrics for a specific date */
  const updateHealthMetrics = (dateKey, metrics) => {
    setData((prev) => ({
      ...prev,
      healthMetrics: {
        ...prev.healthMetrics,
        [dateKey]: {
          ...prev.healthMetrics[dateKey],
          ...metrics,
        },
      },
    }));
  };

  /** Update monthly notes */
  const updateNotes = (monthKey, text) => {
    setData((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [monthKey]: text,
      },
    }));
  };

  /** Update app settings (theme, current viewing date) */
  const updateSettings = (newSettings) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }));
  };

  /** Add a new habit */
  const addHabit = (name, color = '#22d3ee', type = 'daily') => {
    setData((prev) => {
      const newHabit = {
        id: `h_${Date.now()}`,
        name,
        color,
        archived: false,
      };
      
      if (type === 'weekly') {
        return {
          ...prev,
          weeklyHabits: [...prev.weeklyHabits, newHabit],
        };
      }
      
      return {
        ...prev,
        dailyHabits: [...prev.dailyHabits, newHabit],
      };
    });
  };

  return {
    data,
    isLoaded,
    toggleDailyHabit,
    toggleWeeklyHabit,
    updateHealthMetrics,
    updateNotes,
    updateSettings,
    addHabit,
    // Provide a way to completely reset data
    resetData: () => setData(generateSeedData(new Date().getFullYear())),
  };
}
