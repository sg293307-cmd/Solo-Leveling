import { defaultDailyHabits, defaultWeeklyHabits } from './defaultHabits';
import { getDaysInMonth, formatDateKey } from '../utils/dateUtils';

export function generateEmptyUserData(year = 2026) {
  const today = new Date();
  const currentMonth = today.getFullYear() === year ? today.getMonth() + 1 : 12;
  
  return {
    user: {
      id: 'user_001',
      name: 'Hunter',
      avatarUrl: null,
      createdAt: `${year}-01-01`,
    },
    settings: {
      theme: 'dark',
      currentYear: year,
      currentMonth: currentMonth,
    },
    dailyHabits: [],
    weeklyHabits: [],
    dailyLog: {},
    weeklyLog: {},
    healthMetrics: {},
    notes: {},
  };
}

/**
 * Generates realistic demo data for a full year.
 * This seeds the app on first load so users see a populated dashboard.
 */
export function generateSeedData(year = 2026) {
  const dailyLog = {};
  const weeklyLog = {};
  const healthMetrics = {};
  const notes = {};

  const today = new Date();
  const currentMonth = today.getFullYear() === year ? today.getMonth() + 1 : 12;
  const currentDay = today.getFullYear() === year ? today.getDate() : 31;

  // Generate daily habit data for past months
  for (let month = 1; month <= currentMonth; month++) {
    const totalDays = getDaysInMonth(year, month);
    const maxDay = month === currentMonth ? currentDay : totalDays;

    for (let day = 1; day <= maxDay; day++) {
      const key = formatDateKey(year, month, day);
      dailyLog[key] = {};

      for (const habit of defaultDailyHabits) {
        // Generate somewhat realistic completion patterns
        // Higher completion rates for easier habits, lower for harder ones
        const habitIndex = defaultDailyHabits.indexOf(habit);
        const baseRate = 0.85 - (habitIndex * 0.04); // 85% for first, decreasing
        const dayVariance = Math.sin(day * 0.7 + month) * 0.15; // Daily variance
        const weekendBonus = (new Date(year, month - 1, day).getDay() % 6 === 0) ? -0.1 : 0.05;
        const probability = Math.max(0.3, Math.min(0.95, baseRate + dayVariance + weekendBonus));

        dailyLog[key][habit.id] = Math.random() < probability;
      }

      // Generate health metrics
      healthMetrics[key] = {
        sleepHours: Math.round((6 + Math.random() * 2.5) * 10) / 10,
        moodRating: Math.round((2 + Math.random() * 3) * 10) / 10,
        energyLevel: Math.round((2 + Math.random() * 3) * 10) / 10,
      };
    }

    // Generate weekly habit completions
    for (let w = 1; w <= 5; w++) {
      const weekKey = `${year}-${String(month).padStart(2, '0')}-W${w}`;
      weeklyLog[weekKey] = {};

      for (const habit of defaultWeeklyHabits) {
        weeklyLog[weekKey][habit.id] = Math.random() < 0.75;
      }
    }

    // Generate some notes
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    const noteOptions = [
      "Mom's Birthday!\nCheck goals.\nMeeting prep.\nFriend's gift.",
      "New quarter goals set.\nGym membership renewed.\nDoctor appointment.",
      "Focus on sleep schedule.\nMeal prep on Sundays.\nRead more fiction.",
      "Project deadline approaching.\nStay hydrated!\nWeekend hiking plan.",
      "Celebrate small wins.\nJournal daily.\nLimit social media.",
      "Review yearly goals.\nPlan vacation.\nUpgrade workout routine.",
    ];
    notes[monthKey] = noteOptions[month % noteOptions.length];
  }

  return {
    user: {
      id: 'user_001',
      name: 'Hunter',
      avatarUrl: null,
      createdAt: `${year}-01-01`,
    },
    settings: {
      theme: 'dark',
      currentYear: year,
      currentMonth: currentMonth,
    },
    dailyHabits: [...defaultDailyHabits],
    weeklyHabits: [...defaultWeeklyHabits],
    dailyLog,
    weeklyLog,
    healthMetrics,
    notes,
  };
}
