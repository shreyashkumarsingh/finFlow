import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns'

// Format amounts (assumed to already be in INR)
export const formatCurrency = (amount, compact = false) => {
  if (compact && Math.abs(amount) >= 1000) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount)
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (dateStr) => {
  try {
    return format(parseISO(dateStr), 'MMM d, yyyy')
  } catch {
    return dateStr
  }
}

export const formatShortDate = (dateStr) => {
  try {
    return format(parseISO(dateStr), 'MMM d')
  } catch {
    return dateStr
  }
}

export const formatMonthYear = (dateStr) => {
  try {
    return format(parseISO(dateStr), 'MMM yyyy')
  } catch {
    return dateStr
  }
}

export const getTotalBalance = (transactions) => {
  return transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount
  }, 0)
}

export const getTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
}

export const getTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
}

export const getMonthlyData = (transactions) => {
  const monthly = {}

  transactions.forEach(t => {
    const month = t.date.substring(0, 7) // YYYY-MM
    if (!monthly[month]) {
      monthly[month] = { month, income: 0, expenses: 0, balance: 0 }
    }
    if (t.type === 'income') {
      monthly[month].income += t.amount
    } else {
      monthly[month].expenses += t.amount
    }
  })

  return Object.values(monthly)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((m, idx, arr) => {
      const runningBalance = arr.slice(0, idx + 1).reduce((acc, item) => {
        return acc + item.income - item.expenses
      }, 0)
      return {
        ...m,
        balance: runningBalance,
        label: format(parseISO(m.month + '-01'), 'MMM yy'),
      }
    })
}

export const getCategoryBreakdown = (transactions) => {
  const breakdown = {}
  const expenses = transactions.filter(t => t.type === 'expense')

  expenses.forEach(t => {
    if (!breakdown[t.category]) {
      breakdown[t.category] = 0
    }
    breakdown[t.category] += t.amount
  })

  return Object.entries(breakdown)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value)
}

export const getCurrentMonthTransactions = (transactions) => {
  const now = new Date()
  const start = startOfMonth(now)
  const end = endOfMonth(now)
  return transactions.filter(t => {
    try {
      const date = parseISO(t.date)
      return isWithinInterval(date, { start, end })
    } catch {
      return false
    }
  })
}

export const getLastMonthTransactions = (transactions) => {
  const now = new Date()
  const lastMonth = subMonths(now, 1)
  const start = startOfMonth(lastMonth)
  const end = endOfMonth(lastMonth)
  return transactions.filter(t => {
    try {
      const date = parseISO(t.date)
      return isWithinInterval(date, { start, end })
    } catch {
      return false
    }
  })
}

export const getInsights = (transactions) => {
  const currentMonth = getCurrentMonthTransactions(transactions)
  const lastMonth = getLastMonthTransactions(transactions)

  const currentExpenses = getTotalExpenses(currentMonth)
  const lastExpenses = getTotalExpenses(lastMonth)
  const expenseChange = lastExpenses > 0
    ? ((currentExpenses - lastExpenses) / lastExpenses) * 100
    : 0

  const currentIncome = getTotalIncome(currentMonth)
  const lastIncome = getTotalIncome(lastMonth)
  const incomeChange = lastIncome > 0
    ? ((currentIncome - lastIncome) / lastIncome) * 100
    : 0

  const categoryBreakdown = getCategoryBreakdown(transactions)
  const highestCategory = categoryBreakdown[0] || null

  const expenseTransactions = transactions.filter(t => t.type === 'expense')
  const highestExpense = expenseTransactions.reduce(
    (max, t) => t.amount > (max?.amount ?? 0) ? t : max,
    null
  )

  const savingsRate = currentIncome > 0
    ? ((currentIncome - currentExpenses) / currentIncome) * 100
    : 0

  const avgDailyExpense = currentExpenses > 0
    ? currentExpenses / new Date().getDate()
    : 0

  return {
    currentMonthExpenses: currentExpenses,
    lastMonthExpenses: lastExpenses,
    expenseChange,
    currentMonthIncome: currentIncome,
    lastMonthIncome: lastIncome,
    incomeChange,
    highestCategory,
    highestExpense,
    savingsRate,
    avgDailyExpense,
    totalTransactionsThisMonth: currentMonth.length,
  }
}

export const filterAndSortTransactions = (transactions, { search, filterType, sortBy, sortOrder }) => {
  let result = [...transactions]

  if (search) {
    const q = search.toLowerCase()
    result = result.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q)
    )
  }

  if (filterType && filterType !== 'all') {
    result = result.filter(t => t.type === filterType)
  }

  result.sort((a, b) => {
    let cmp = 0
    if (sortBy === 'date') {
      cmp = a.date.localeCompare(b.date)
    } else if (sortBy === 'amount') {
      cmp = a.amount - b.amount
    } else if (sortBy === 'category') {
      cmp = a.category.localeCompare(b.category)
    }
    return sortOrder === 'desc' ? -cmp : cmp
  })

  return result
}

export const generateId = () => {
  return 'txn_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}
