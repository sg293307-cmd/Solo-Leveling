import { useState, useEffect } from 'react';
import { generateEmptyUserData, generateSeedData } from '../data/seedData';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export function useHabitData(userId) {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data on mount or when userId changes
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!userId) {
        if (isMounted) {
          setData(null);
          setIsLoaded(false);
        }
        return;
      }

      try {
        const docRef = doc(db, 'user_data', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (isMounted) {
            setData(docSnap.data());
            setIsLoaded(true);
          }
        } else {
          // First time using app - start with empty data
          const seedData = generateEmptyUserData(new Date().getFullYear());
          await setDoc(docRef, seedData);
          if (isMounted) {
            setData(seedData);
            setIsLoaded(true);
          }
        }
      } catch (error) {
        console.error("Error loading habit data:", error);
        if (isMounted) {
          setIsLoaded(true); // Prevent infinite loading state
        }
      }
    }

    setIsLoaded(false);
    loadData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Helper function to update state and firestore simultaneously
  const updateData = async (newData) => {
    setData(newData); // Optimistic UI update
    if (userId) {
      try {
        await setDoc(doc(db, 'user_data', userId), newData);
      } catch (error) {
        console.error("Error saving data to Firestore:", error);
      }
    }
  };

  // Data mutations

  /** Toggle a daily habit's completion status */
  const toggleDailyHabit = (dateKey, habitId) => {
    if (!data) return;
    const dayLog = data.dailyLog[dateKey] || {};
    const isCompleted = !!dayLog[habitId];
    
    const newData = {
      ...data,
      dailyLog: {
        ...data.dailyLog,
        [dateKey]: {
          ...dayLog,
          [habitId]: !isCompleted,
        },
      },
    };
    updateData(newData);
  };

  /** Toggle a weekly habit's completion status */
  const toggleWeeklyHabit = (weekKey, habitId) => {
    if (!data) return;
    const weekLog = data.weeklyLog[weekKey] || {};
    const isCompleted = !!weekLog[habitId];
    
    const newData = {
      ...data,
      weeklyLog: {
        ...data.weeklyLog,
        [weekKey]: {
          ...weekLog,
          [habitId]: !isCompleted,
        },
      },
    };
    updateData(newData);
  };

  /** Update health metrics for a specific date */
  const updateHealthMetrics = (dateKey, metrics) => {
    if (!data) return;
    const newData = {
      ...data,
      healthMetrics: {
        ...data.healthMetrics,
        [dateKey]: {
          ...data.healthMetrics[dateKey],
          ...metrics,
        },
      },
    };
    updateData(newData);
  };

  /** Update monthly notes */
  const updateNotes = (monthKey, text) => {
    if (!data) return;
    const newData = {
      ...data,
      notes: {
        ...data.notes,
        [monthKey]: text,
      },
    };
    updateData(newData);
  };

  /** Update app settings (theme, current viewing date) */
  const updateSettings = (newSettings) => {
    if (!data) return;
    const newData = {
      ...data,
      settings: {
        ...data.settings,
        ...newSettings,
      },
    };
    updateData(newData);
  };

  /** Add a new habit */
  const addHabit = (name, color = '#22d3ee', type = 'daily', assignedWeek = null) => {
    if (!data) return;
    const newHabit = {
      id: `h_${Date.now()}`,
      name,
      color,
      archived: false,
    };
    
    let newData;
    if (type === 'weekly') {
      if (assignedWeek) {
        newHabit.assignedWeek = assignedWeek;
      }
      newData = {
        ...data,
        weeklyHabits: [...data.weeklyHabits, newHabit],
      };
    } else {
      newData = {
        ...data,
        dailyHabits: [...data.dailyHabits, newHabit],
      };
    }
    updateData(newData);
  };

  const resetData = async () => {
    if (!userId) return;
    const seedData = generateEmptyUserData(new Date().getFullYear());
    await updateData(seedData);
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
    resetData,
  };
}
