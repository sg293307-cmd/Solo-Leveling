import {
  getDaysInMonth,
  formatDateKey,
  getWeekBoundaries,
  formatMonthKey,
} from './dateUtils';

/**
 * Calculate per-habit completion for a specific month.
 * Returns { completed, total, percentage } for each habit.
 */
export function calcHabitMonthProgress(dailyLog, habitId, year, month) {
  const totalDays = getDaysInMonth(year, month);
  let completed = 0;

  for (let day = 1; day <= totalDays; day++) {
    const key = formatDateKey(year, month, day);
    if (dailyLog[key] && dailyLog[key][habitId]) {
      completed++;
    }
  }

  return {
    completed,
    total: totalDays,
    percentage: totalDays > 0 ? Math.round((completed / totalDays) * 1000) / 10 : 0,
  };
}

/**
 * Calculate weekly completion rates for a month.
 * Returns an array of { weekNum, completed, total, percentage } per week.
 */
export function calcWeeklyCompletion(dailyLog, habits, year, month) {
  const weeks = getWeekBoundaries(year, month);
  const activeHabits = habits.filter(h => !h.archived);

  return weeks.map(week => {
    let completed = 0;
    let total = 0;

    for (const day of week.days) {
      const key = formatDateKey(year, month, day);
      for (const habit of activeHabits) {
        total++;
        if (dailyLog[key] && dailyLog[key][habit.id]) {
          completed++;
        }
      }
    }

    return {
      weekNum: week.weekNum,
      label: week.label,
      completed,
      incomplete: total - completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 1000) / 10 : 0,
    };
  });
}

/**
 * Calculate overall monthly completion (all habits × all days).
 */
export function calcMonthlyOverall(dailyLog, habits, year, month) {
  const totalDays = getDaysInMonth(year, month);
  const activeHabits = habits.filter(h => !h.archived);
  let completed = 0;
  let total = 0;

  for (let day = 1; day <= totalDays; day++) {
    const key = formatDateKey(year, month, day);
    for (const habit of activeHabits) {
      total++;
      if (dailyLog[key] && dailyLog[key][habit.id]) {
        completed++;
      }
    }
  }

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 1000) / 10 : 0,
  };
}

/**
 * Generate sparkline data (daily completion percentages).
 */
export function calcDailySparkline(dailyLog, habits, year, month) {
  const totalDays = getDaysInMonth(year, month);
  const activeHabits = habits.filter(h => !h.archived);
  const data = [];

  for (let day = 1; day <= totalDays; day++) {
    const key = formatDateKey(year, month, day);
    let completed = 0;
    for (const habit of activeHabits) {
      if (dailyLog[key] && dailyLog[key][habit.id]) {
        completed++;
      }
    }
    const percentage = activeHabits.length > 0
      ? Math.round((completed / activeHabits.length) * 100)
      : 0;
    data.push({ day, percentage });
  }

  return data;
}

/**
 * Calculate monthly completion rates for the entire year (for bar chart).
 */
export function calcAnnualMonthlyRates(dailyLog, habits, year) {
  const rates = {};
  for (let month = 1; month <= 12; month++) {
    const result = calcMonthlyOverall(dailyLog, habits, year, month);
    rates[month] = result.percentage;
  }
  return rates;
}

/**
 * Calculate quarterly completion rates.
 */
export function calcQuarterlyRates(monthlyRates) {
  const quarters = {
    Q1: [1, 2, 3],
    Q2: [4, 5, 6],
    Q3: [7, 8, 9],
    Q4: [10, 11, 12],
  };

  const result = {};
  for (const [q, months] of Object.entries(quarters)) {
    const values = months.map(m => monthlyRates[m] || 0);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    result[q] = Math.round(avg * 10) / 10;
  }
  return result;
}

/**
 * Calculate annual heatmap — whether each day has 100% completion.
 */
export function calcAnnualHeatmap(dailyLog, habits, year) {
  const heatmap = {};
  const activeHabits = habits.filter(h => !h.archived);

  for (let month = 1; month <= 12; month++) {
    const totalDays = getDaysInMonth(year, month);
    for (let day = 1; day <= totalDays; day++) {
      const key = formatDateKey(year, month, day);
      let completed = 0;
      for (const habit of activeHabits) {
        if (dailyLog[key] && dailyLog[key][habit.id]) {
          completed++;
        }
      }
      // Store completion level: 0 = none, 0.X = partial, 1 = full
      heatmap[key] = activeHabits.length > 0
        ? completed / activeHabits.length
        : 0;
    }
  }

  return heatmap;
}

/**
 * Calculate health metric monthly averages.
 */
export function calcHealthAverages(healthMetrics, year) {
  const averages = {};

  for (let month = 1; month <= 12; month++) {
    const totalDays = getDaysInMonth(year, month);
    let sleepSum = 0, moodSum = 0, energySum = 0, count = 0;

    for (let day = 1; day <= totalDays; day++) {
      const key = formatDateKey(year, month, day);
      if (healthMetrics[key]) {
        sleepSum += healthMetrics[key].sleepHours || 0;
        moodSum += healthMetrics[key].moodRating || 0;
        energySum += healthMetrics[key].energyLevel || 0;
        count++;
      }
    }

    averages[month] = {
      sleepHours: count > 0 ? Math.round((sleepSum / count) * 10) / 10 : 0,
      moodRating: count > 0 ? Math.round((moodSum / count) * 10) / 10 : 0,
      energyLevel: count > 0 ? Math.round((energySum / count) * 10) / 10 : 0,
      dataPoints: count,
    };
  }

  // Calculate yearly averages
  const months = Object.values(averages).filter(a => a.dataPoints > 0);
  averages.average = {
    sleepHours: months.length > 0
      ? Math.round((months.reduce((s, a) => s + a.sleepHours, 0) / months.length) * 10) / 10
      : 0,
    moodRating: months.length > 0
      ? Math.round((months.reduce((s, a) => s + a.moodRating, 0) / months.length) * 10) / 10
      : 0,
    energyLevel: months.length > 0
      ? Math.round((months.reduce((s, a) => s + a.energyLevel, 0) / months.length) * 10) / 10
      : 0,
  };

  return averages;
}

/**
 * Calculate weekly habits completion stats.
 */
export function calcWeeklyHabitsCompletion(weeklyLog, weeklyHabits, year, month) {
  let completed = 0;
  let total = 0;

  for (let w = 1; w <= 5; w++) {
    const weekKey = `${year}-${String(month).padStart(2, '0')}-W${w}`;
    const logEntry = weeklyLog[weekKey] || {};

    for (const habit of weeklyHabits) {
      total++;
      if (logEntry[habit.id]) {
        completed++;
      }
    }
  }

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 1000) / 10 : 0,
  };
}

/**
 * Calculate year-to-date overall completion for rank.
 */
export function calcYearToDateCompletion(dailyLog, habits, year) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const activeHabits = habits.filter(h => !h.archived);
  let completed = 0;
  let total = 0;

  const maxMonth = year === currentYear ? today.getMonth() + 1 : 12;

  for (let month = 1; month <= maxMonth; month++) {
    const totalDays = getDaysInMonth(year, month);
    const maxDay = (year === currentYear && month === maxMonth)
      ? today.getDate()
      : totalDays;

    for (let day = 1; day <= maxDay; day++) {
      const key = formatDateKey(year, month, day);
      for (const habit of activeHabits) {
        total++;
        if (dailyLog[key] && dailyLog[key][habit.id]) {
          completed++;
        }
      }
    }
  }

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 1000) / 10 : 0,
  };
}
