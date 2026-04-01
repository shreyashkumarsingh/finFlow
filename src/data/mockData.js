import { subDays, subMonths, format } from 'date-fns'

const today = new Date()

export const CATEGORIES = {
  SALARY: 'Salary',
  FREELANCE: 'Freelance',
  INVESTMENT: 'Investment',
  FOOD: 'Food & Dining',
  TRAVEL: 'Travel',
  BILLS: 'Bills & Utilities',
  SHOPPING: 'Shopping',
  HEALTH: 'Healthcare',
  ENTERTAINMENT: 'Entertainment',
  RENT: 'Rent',
  EDUCATION: 'Education',
  SUBSCRIPTIONS: 'Subscriptions',
}

export const CATEGORY_COLORS = {
  [CATEGORIES.SALARY]:        '#10b981',
  [CATEGORIES.FREELANCE]:     '#06b6d4',
  [CATEGORIES.INVESTMENT]:    '#8b5cf6',
  [CATEGORIES.FOOD]:          '#f59e0b',
  [CATEGORIES.TRAVEL]:        '#3b82f6',
  [CATEGORIES.BILLS]:         '#ef4444',
  [CATEGORIES.SHOPPING]:      '#ec4899',
  [CATEGORIES.HEALTH]:        '#14b8a6',
  [CATEGORIES.ENTERTAINMENT]: '#f97316',
  [CATEGORIES.RENT]:          '#6366f1',
  [CATEGORIES.EDUCATION]:     '#84cc16',
  [CATEGORIES.SUBSCRIPTIONS]: '#a855f7',
}

export const CATEGORY_ICONS = {
  [CATEGORIES.SALARY]:        '💼',
  [CATEGORIES.FREELANCE]:     '💻',
  [CATEGORIES.INVESTMENT]:    '📈',
  [CATEGORIES.FOOD]:          '🍜',
  [CATEGORIES.TRAVEL]:        '✈️',
  [CATEGORIES.BILLS]:         '⚡',
  [CATEGORIES.SHOPPING]:      '🛍️',
  [CATEGORIES.HEALTH]:        '🏥',
  [CATEGORIES.ENTERTAINMENT]: '🎬',
  [CATEGORIES.RENT]:          '🏠',
  [CATEGORIES.EDUCATION]:     '📚',
  [CATEGORIES.SUBSCRIPTIONS]: '📱',
}

let idCounter = 1
const makeId = () => `txn_${String(idCounter++).padStart(4, '0')}`

const d = (daysAgo) => format(subDays(today, daysAgo), 'yyyy-MM-dd')
const m = (monthsAgo, day) => format(new Date(today.getFullYear(), today.getMonth() - monthsAgo, day), 'yyyy-MM-dd')

const USD_TO_INR = 83.5

export let initialTransactions = [
  // Current month - Income
  { id: makeId(), date: d(1),  description: 'Monthly Salary',          category: CATEGORIES.SALARY,        type: 'income',  amount: 5800 },
  { id: makeId(), date: d(3),  description: 'Freelance Project - WebApp', category: CATEGORIES.FREELANCE,   type: 'income',  amount: 1200 },
  { id: makeId(), date: d(5),  description: 'Dividend Payment',        category: CATEGORIES.INVESTMENT,     type: 'income',  amount: 340 },

  // Current month - Expenses
  { id: makeId(), date: d(2),  description: 'Apartment Rent',          category: CATEGORIES.RENT,           type: 'expense', amount: 1400 },
  { id: makeId(), date: d(2),  description: 'Electricity Bill',        category: CATEGORIES.BILLS,          type: 'expense', amount: 98 },
  { id: makeId(), date: d(3),  description: 'Grocery Shopping - BigMart', category: CATEGORIES.FOOD,        type: 'expense', amount: 187 },
  { id: makeId(), date: d(4),  description: 'Netflix Subscription',    category: CATEGORIES.SUBSCRIPTIONS,  type: 'expense', amount: 15.99 },
  { id: makeId(), date: d(4),  description: 'Spotify Premium',         category: CATEGORIES.SUBSCRIPTIONS,  type: 'expense', amount: 9.99 },
  { id: makeId(), date: d(5),  description: 'Restaurant - Dinner',     category: CATEGORIES.FOOD,           type: 'expense', amount: 64 },
  { id: makeId(), date: d(6),  description: 'Uber Ride',               category: CATEGORIES.TRAVEL,         type: 'expense', amount: 23.5 },
  { id: makeId(), date: d(7),  description: 'Pharmacy',                category: CATEGORIES.HEALTH,         type: 'expense', amount: 45 },
  { id: makeId(), date: d(8),  description: 'Amazon Shopping',         category: CATEGORIES.SHOPPING,       type: 'expense', amount: 134 },
  { id: makeId(), date: d(9),  description: 'Gym Membership',          category: CATEGORIES.HEALTH,         type: 'expense', amount: 40 },
  { id: makeId(), date: d(10), description: 'Coffee & Snacks',         category: CATEGORIES.FOOD,           type: 'expense', amount: 31 },
  { id: makeId(), date: d(11), description: 'Internet Bill',           category: CATEGORIES.BILLS,          type: 'expense', amount: 60 },
  { id: makeId(), date: d(12), description: 'Movie Tickets',           category: CATEGORIES.ENTERTAINMENT,  type: 'expense', amount: 28 },
  { id: makeId(), date: d(13), description: 'Coursera Subscription',   category: CATEGORIES.EDUCATION,      type: 'expense', amount: 49 },
  { id: makeId(), date: d(14), description: 'Lunch - Thai Kitchen',    category: CATEGORIES.FOOD,           type: 'expense', amount: 22 },

  // Last month - Income
  { id: makeId(), date: m(1, 1),  description: 'Monthly Salary',        category: CATEGORIES.SALARY,        type: 'income',  amount: 5800 },
  { id: makeId(), date: m(1, 10), description: 'Freelance Design Work', category: CATEGORIES.FREELANCE,     type: 'income',  amount: 850 },
  { id: makeId(), date: m(1, 20), description: 'Stock Dividends',       category: CATEGORIES.INVESTMENT,    type: 'income',  amount: 210 },

  // Last month - Expenses
  { id: makeId(), date: m(1, 2),  description: 'Apartment Rent',        category: CATEGORIES.RENT,          type: 'expense', amount: 1400 },
  { id: makeId(), date: m(1, 3),  description: 'Electricity Bill',      category: CATEGORIES.BILLS,         type: 'expense', amount: 112 },
  { id: makeId(), date: m(1, 4),  description: 'Weekend Groceries',     category: CATEGORIES.FOOD,          type: 'expense', amount: 210 },
  { id: makeId(), date: m(1, 5),  description: 'Flight Tickets - Goa',  category: CATEGORIES.TRAVEL,        type: 'expense', amount: 380 },
  { id: makeId(), date: m(1, 6),  description: 'Hotel Stay',            category: CATEGORIES.TRAVEL,        type: 'expense', amount: 290 },
  { id: makeId(), date: m(1, 8),  description: 'Netflix Subscription',  category: CATEGORIES.SUBSCRIPTIONS, type: 'expense', amount: 15.99 },
  { id: makeId(), date: m(1, 9),  description: 'Spotify Premium',       category: CATEGORIES.SUBSCRIPTIONS, type: 'expense', amount: 9.99 },
  { id: makeId(), date: m(1, 12), description: 'Online Shopping - Myntra', category: CATEGORIES.SHOPPING,  type: 'expense', amount: 220 },
  { id: makeId(), date: m(1, 14), description: 'Doctor Visit',          category: CATEGORIES.HEALTH,        type: 'expense', amount: 80 },
  { id: makeId(), date: m(1, 15), description: 'Dinner Out',            category: CATEGORIES.FOOD,          type: 'expense', amount: 75 },
  { id: makeId(), date: m(1, 18), description: 'Water Bill',            category: CATEGORIES.BILLS,         type: 'expense', amount: 35 },
  { id: makeId(), date: m(1, 22), description: 'Concert Tickets',       category: CATEGORIES.ENTERTAINMENT, type: 'expense', amount: 95 },
  { id: makeId(), date: m(1, 25), description: 'Gym Membership',        category: CATEGORIES.HEALTH,        type: 'expense', amount: 40 },

  // 2 months ago - Income
  { id: makeId(), date: m(2, 1),  description: 'Monthly Salary',        category: CATEGORIES.SALARY,        type: 'income',  amount: 5800 },
  { id: makeId(), date: m(2, 15), description: 'Consulting Fee',        category: CATEGORIES.FREELANCE,     type: 'income',  amount: 1500 },
  { id: makeId(), date: m(2, 22), description: 'Interest Income',       category: CATEGORIES.INVESTMENT,    type: 'income',  amount: 175 },

  // 2 months ago - Expenses
  { id: makeId(), date: m(2, 2),  description: 'Apartment Rent',        category: CATEGORIES.RENT,          type: 'expense', amount: 1400 },
  { id: makeId(), date: m(2, 3),  description: 'Monthly Groceries',     category: CATEGORIES.FOOD,          type: 'expense', amount: 195 },
  { id: makeId(), date: m(2, 5),  description: 'Electricity Bill',      category: CATEGORIES.BILLS,         type: 'expense', amount: 88 },
  { id: makeId(), date: m(2, 7),  description: 'Amazon Prime',          category: CATEGORIES.SUBSCRIPTIONS, type: 'expense', amount: 14.99 },
  { id: makeId(), date: m(2, 9),  description: 'Petrol',                category: CATEGORIES.TRAVEL,        type: 'expense', amount: 65 },
  { id: makeId(), date: m(2, 12), description: 'Zomato Orders',         category: CATEGORIES.FOOD,          type: 'expense', amount: 88 },
  { id: makeId(), date: m(2, 14), description: 'Clothing - Zara',       category: CATEGORIES.SHOPPING,      type: 'expense', amount: 175 },
  { id: makeId(), date: m(2, 16), description: 'Udemy Course',          category: CATEGORIES.EDUCATION,     type: 'expense', amount: 29.99 },
  { id: makeId(), date: m(2, 20), description: 'OTT Bundle',            category: CATEGORIES.SUBSCRIPTIONS, type: 'expense', amount: 24.99 },
  { id: makeId(), date: m(2, 25), description: 'Gym Membership',        category: CATEGORIES.HEALTH,        type: 'expense', amount: 40 },

  // 3 months ago
  { id: makeId(), date: m(3, 1),  description: 'Monthly Salary',        category: CATEGORIES.SALARY,        type: 'income',  amount: 5800 },
  { id: makeId(), date: m(3, 10), description: 'App Development Project', category: CATEGORIES.FREELANCE,   type: 'income',  amount: 2200 },
  { id: makeId(), date: m(3, 2),  description: 'Apartment Rent',        category: CATEGORIES.RENT,          type: 'expense', amount: 1400 },
  { id: makeId(), date: m(3, 3),  description: 'Groceries',             category: CATEGORIES.FOOD,          type: 'expense', amount: 168 },
  { id: makeId(), date: m(3, 5),  description: 'Electricity Bill',      category: CATEGORIES.BILLS,         type: 'expense', amount: 104 },
  { id: makeId(), date: m(3, 8),  description: 'Train Tickets',         category: CATEGORIES.TRAVEL,        type: 'expense', amount: 120 },
  { id: makeId(), date: m(3, 14), description: 'Laptop Stand',          category: CATEGORIES.SHOPPING,      type: 'expense', amount: 89 },
  { id: makeId(), date: m(3, 18), description: 'Medical Test',          category: CATEGORIES.HEALTH,        type: 'expense', amount: 110 },
  { id: makeId(), date: m(3, 22), description: 'Netflix & Spotify',     category: CATEGORIES.SUBSCRIPTIONS, type: 'expense', amount: 25.98 },
  { id: makeId(), date: m(3, 27), description: 'Restaurant Dinner',     category: CATEGORIES.FOOD,          type: 'expense', amount: 58 },

  // 4 months ago
  { id: makeId(), date: m(4, 1),  description: 'Monthly Salary',        category: CATEGORIES.SALARY,        type: 'income',  amount: 5500 },
  { id: makeId(), date: m(4, 15), description: 'Freelance Writing',     category: CATEGORIES.FREELANCE,     type: 'income',  amount: 600 },
  { id: makeId(), date: m(4, 2),  description: 'Apartment Rent',        category: CATEGORIES.RENT,          type: 'expense', amount: 1400 },
  { id: makeId(), date: m(4, 4),  description: 'Groceries & Essentials', category: CATEGORIES.FOOD,         type: 'expense', amount: 205 },
  { id: makeId(), date: m(4, 6),  description: 'Electricity Bill',      category: CATEGORIES.BILLS,         type: 'expense', amount: 95 },
  { id: makeId(), date: m(4, 10), description: 'Vacation Flight',       category: CATEGORIES.TRAVEL,        type: 'expense', amount: 450 },
  { id: makeId(), date: m(4, 12), description: 'Hotel Booking',         category: CATEGORIES.TRAVEL,        type: 'expense', amount: 320 },
  { id: makeId(), date: m(4, 18), description: 'Shopping - Electronics', category: CATEGORIES.SHOPPING,     type: 'expense', amount: 680 },
  { id: makeId(), date: m(4, 22), description: 'Gym Membership',        category: CATEGORIES.HEALTH,        type: 'expense', amount: 40 },

  // 5 months ago
  { id: makeId(), date: m(5, 1),  description: 'Monthly Salary',        category: CATEGORIES.SALARY,        type: 'income',  amount: 5500 },
  { id: makeId(), date: m(5, 2),  description: 'Apartment Rent',        category: CATEGORIES.RENT,          type: 'expense', amount: 1400 },
  { id: makeId(), date: m(5, 4),  description: 'Groceries',             category: CATEGORIES.FOOD,          type: 'expense', amount: 178 },
  { id: makeId(), date: m(5, 6),  description: 'Electricity Bill',      category: CATEGORIES.BILLS,         type: 'expense', amount: 82 },
  { id: makeId(), date: m(5, 15), description: 'Freelance Project',     category: CATEGORIES.FREELANCE,     type: 'income',  amount: 950 },
  { id: makeId(), date: m(5, 20), description: 'Online Course Bundle',  category: CATEGORIES.EDUCATION,     type: 'expense', amount: 199 },
  { id: makeId(), date: m(5, 25), description: 'Gym & Fitness',         category: CATEGORIES.HEALTH,        type: 'expense', amount: 40 },
]

// Permanently convert amounts (originally in USD) to INR rounded to 2 decimals
initialTransactions = initialTransactions.map(t => ({
  ...t,
  amount: Math.round(t.amount * USD_TO_INR * 100) / 100,
}))

export const getNextId = () => `txn_${String(idCounter++).padStart(4, '0')}`
