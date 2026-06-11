// Default daily habits pre-populated for new users
export const defaultDailyHabits = [
  {
    id: 'habit_001',
    name: 'Hydrate 2.5L of water',
    icon: 'Droplets',
    color: '#22d3ee',
    createdAt: '2025-01-01',
    archived: false,
  },
  {
    id: 'habit_002',
    name: '30 minute workout',
    icon: 'Dumbbell',
    color: '#a78bfa',
    createdAt: '2025-01-01',
    archived: false,
  },
  {
    id: 'habit_003',
    name: '8-hour nightly sleep',
    icon: 'Moon',
    color: '#60a5fa',
    createdAt: '2025-01-01',
    archived: false,
  },
  {
    id: 'habit_004',
    name: '5 servings fruits & veggies',
    icon: 'Apple',
    color: '#34d399',
    createdAt: '2025-01-01',
    archived: false,
  },
  {
    id: 'habit_005',
    name: '15 minute meditation',
    icon: 'Brain',
    color: '#f472b6',
    createdAt: '2025-01-01',
    archived: false,
  },
  {
    id: 'habit_006',
    name: 'Read 20 pages',
    icon: 'BookOpen',
    color: '#fbbf24',
    createdAt: '2025-01-01',
    archived: false,
  },
  {
    id: 'habit_007',
    name: '2 hour focused work',
    icon: 'Target',
    color: '#f87171',
    createdAt: '2025-01-01',
    archived: false,
  },
  {
    id: 'habit_008',
    name: '10 min daily walk',
    icon: 'Footprints',
    color: '#2dd4bf',
    createdAt: '2025-01-01',
    archived: false,
  },
  {
    id: 'habit_009',
    name: '1-hour tech detox',
    icon: 'MonitorOff',
    color: '#c084fc',
    createdAt: '2025-01-01',
    archived: false,
  },
];

// Default weekly habits
export const defaultWeeklyHabits = [
  { id: 'weekly_001', name: 'Meal planning', createdAt: '2025-01-01' },
  { id: 'weekly_002', name: 'Schedule workouts', createdAt: '2025-01-01' },
  { id: 'weekly_003', name: 'Weekly To-do list', createdAt: '2025-01-01' },
  { id: 'weekly_004', name: 'Try new recipes', createdAt: '2025-01-01' },
  { id: 'weekly_005', name: 'Declutter a space', createdAt: '2025-01-01' },
  { id: 'weekly_006', name: 'Creative time', createdAt: '2025-01-01' },
  { id: 'weekly_007', name: 'Gratitude Journal', createdAt: '2025-01-01' },
  { id: 'weekly_008', name: 'Learn new skills', createdAt: '2025-01-01' },
  { id: 'weekly_009', name: 'Tech-free evenings', createdAt: '2025-01-01' },
  { id: 'weekly_010', name: 'Set Monthly goals', createdAt: '2025-01-01' },
  { id: 'weekly_011', name: 'Home cleaning', createdAt: '2025-01-01' },
];

// Weekly habit assignments — which habits belong to which week
export const defaultWeeklyHabitAssignments = {
  W1: ['weekly_001', 'weekly_002', 'weekly_003'],
  W2: ['weekly_004', 'weekly_005', 'weekly_006'],
  W3: ['weekly_007', 'weekly_008'],
  W4: ['weekly_009', 'weekly_010'],
  W5: ['weekly_011'],
};
