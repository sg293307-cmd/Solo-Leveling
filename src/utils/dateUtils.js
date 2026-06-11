/**
 * Date utility functions for the habit tracker
 */

/** Returns the number of days in a given month (1-indexed month) */
export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/** Returns the day of week (0=Sun, 6=Sat) for a given date */
export function getDayOfWeek(year, month, day) {
  return new Date(year, month - 1, day).getDay();
}

/** Formats a date key as "YYYY-MM-DD" */
export function formatDateKey(year, month, day) {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

/** Formats a month key as "YYYY-MM" */
export function formatMonthKey(year, month) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

/** Returns full month name */
export function getMonthName(month) {
  const names = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return names[month] || '';
}

/** Short month name */
export function getMonthShortName(month) {
  const names = [
    '', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ];
  return names[month] || '';
}

/** Day of week short labels */
export const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Returns week boundaries for a given month.
 * Groups days into weeks (Week 1: days 1-7, Week 2: days 8-14, etc.)
 * This uses a simple fixed grouping matching the reference image.
 */
export function getWeekBoundaries(year, month) {
  const totalDays = getDaysInMonth(year, month);
  const weeks = [];

  for (let w = 0; w < 5; w++) {
    const startDay = w * 7 + 1;
    const endDay = Math.min((w + 1) * 7, totalDays);
    if (startDay <= totalDays) {
      weeks.push({
        weekNum: w + 1,
        label: `WEEK ${w + 1}`,
        startDay,
        endDay,
        days: Array.from(
          { length: endDay - startDay + 1 },
          (_, i) => startDay + i
        ),
      });
    }
  }

  return weeks;
}

/**
 * Gets the week number (1-5) for a given day within a month.
 */
export function getWeekNumber(day) {
  return Math.ceil(day / 7);
}

/**
 * Returns an array of all dates in a year as "YYYY-MM-DD" strings.
 */
export function getAllDatesInYear(year) {
  const dates = [];
  for (let month = 1; month <= 12; month++) {
    const days = getDaysInMonth(year, month);
    for (let day = 1; day <= days; day++) {
      dates.push(formatDateKey(year, month, day));
    }
  }
  return dates;
}

/**
 * Returns the first day of week for a month's calendar view (0=Sun).
 */
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month - 1, 1).getDay();
}
