import React, { useMemo } from 'react'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import useStore from '../../store/useStore'
import { getTotalBalance, getTotalIncome, getTotalExpenses, formatCurrency } from '../../utils/finance'
import { Card } from '../UI'

const StatCard = ({ title, value, subtitle, icon: Icon, color, glowClass, delay = 0 }) => (
  <Card
    className="p-5 card-hover animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <p className={`font-display font-bold text-3xl tracking-tight ${color} number-pop`}>
          {value}
        </p>
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${glowClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    {subtitle && (
      <div className="mt-1">
        {subtitle}
      </div>
    )}
  </Card>
)

const SummaryCards = () => {
  const { transactions } = useStore()

  const { balance, income, expenses } = useMemo(() => ({
    balance: getTotalBalance(transactions),
    income: getTotalIncome(transactions),
    expenses: getTotalExpenses(transactions),
  }), [transactions])

  const savingsRate = income > 0 ? ((income - expenses) / income * 100).toFixed(1) : '0.0'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <StatCard
        title="Total Balance"
        value={formatCurrency(balance, true)}
        icon={Wallet}
        color={balance >= 0 ? 'text-indigo-700 dark:text-indigo-200' : 'text-red-500'}
        glowClass="bg-gradient-to-br from-indigo-500 to-blue-500 text-white"
        subtitle={
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Savings rate: <span className="font-semibold text-emerald-500">{savingsRate}%</span>
          </p>
        }
        delay={0}
      />
      <StatCard
        title="Total Income"
        value={formatCurrency(income, true)}
        icon={TrendingUp}
        color="text-emerald-600 dark:text-emerald-400"
        glowClass="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        subtitle={
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {transactions.filter(t => t.type === 'income').length} income transactions
          </p>
        }
        delay={80}
      />
      <StatCard
        title="Total Expenses"
        value={formatCurrency(expenses, true)}
        icon={TrendingDown}
        color="text-red-500 dark:text-red-400"
        glowClass="bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400"
        subtitle={
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {transactions.filter(t => t.type === 'expense').length} expense transactions
          </p>
        }
        delay={160}
      />
    </div>
  )
}

export default SummaryCards
