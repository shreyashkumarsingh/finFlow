import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import useStore from '../../store/useStore'
import {
  getInsights, getCategoryBreakdown, getMonthlyData,
  formatCurrency, formatDate,
} from '../../utils/finance'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../data/mockData'
import { Card, SectionHeader, ChangeIndicator } from '../UI'
import {
  TrendingUp, TrendingDown, Award, Calendar,
  Zap, PiggyBank, BarChart2, ArrowUpCircle,
} from 'lucide-react'

const InsightCard = ({ icon: Icon, iconBg, iconColor, title, value, subtitle, change, delay = 0 }) => (
  <Card
    className="p-5 card-hover animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="font-display font-bold text-xl text-slate-800 dark:text-slate-100 truncate">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate">{subtitle}</p>}
        {change !== undefined && (
          <div className="mt-1.5">
            <ChangeIndicator value={change} inverted={title.toLowerCase().includes('expense')} />
          </div>
        )}
      </div>
    </div>
  </Card>
)

const MonthlyBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-surface-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 shadow-xl text-sm">
      <p className="font-semibold text-slate-600 dark:text-slate-300 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
          <span className="text-slate-500 dark:text-slate-400 capitalize">{p.dataKey}:</span>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

const Insights = () => {
  const { transactions, darkMode } = useStore()

  const insights = useMemo(() => getInsights(transactions), [transactions])
  const categoryData = useMemo(() => getCategoryBreakdown(transactions).slice(0, 6), [transactions])
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions])

  const axisColor = darkMode ? '#475569' : '#cbd5e1'
  const gridColor = darkMode ? '#1e293b' : '#f1f5f9'

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title="Insights"
        subtitle="Smart analytics derived from your transactions"
      />

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <InsightCard
          icon={TrendingDown}
          iconBg="bg-red-50 dark:bg-red-900/30"
          iconColor="text-red-500 dark:text-red-400"
          title="This Month Expenses"
          value={formatCurrency(insights.currentMonthExpenses, true)}
          change={insights.expenseChange}
          delay={0}
        />
        <InsightCard
          icon={TrendingUp}
          iconBg="bg-emerald-50 dark:bg-emerald-900/30"
          iconColor="text-emerald-600 dark:text-emerald-400"
          title="This Month Income"
          value={formatCurrency(insights.currentMonthIncome, true)}
          change={insights.incomeChange}
          delay={80}
        />
        <InsightCard
          icon={PiggyBank}
          iconBg="bg-brand-50 dark:bg-brand-900/30"
          iconColor="text-brand-600 dark:text-brand-400"
          title="Savings Rate"
          value={`${insights.savingsRate.toFixed(1)}%`}
          subtitle="Income kept this month"
          delay={160}
        />
        <InsightCard
          icon={Calendar}
          iconBg="bg-violet-50 dark:bg-violet-900/30"
          iconColor="text-violet-600 dark:text-violet-400"
          title="Avg Daily Spend"
          value={formatCurrency(insights.avgDailyExpense, true)}
          subtitle={`${insights.totalTransactionsThisMonth} txns this month`}
          delay={240}
        />
      </div>

      {/* Highlights Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Highest Spending Category */}
        {insights.highestCategory && (
          <Card className="p-5 animate-slide-up" style={{ animationDelay: '320ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="font-display font-semibold text-sm text-slate-700 dark:text-slate-200">
                Top Spending Category
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: (CATEGORY_COLORS[insights.highestCategory.name] || '#94a3b8') + '20' }}
              >
                {CATEGORY_ICONS[insights.highestCategory.name] || '💰'}
              </div>
              <div>
                <p className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">
                  {insights.highestCategory.name}
                </p>
                <p className="font-mono font-semibold text-base text-red-500 dark:text-red-400">
                  {formatCurrency(insights.highestCategory.value)}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Total spent across all time</p>
              </div>
            </div>
          </Card>
        )}

        {/* Highest Transaction */}
        {insights.highestExpense && (
          <Card className="p-5 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="font-display font-semibold text-sm text-slate-700 dark:text-slate-200">
                Largest Single Expense
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: (CATEGORY_COLORS[insights.highestExpense.category] || '#94a3b8') + '20' }}
              >
                {CATEGORY_ICONS[insights.highestExpense.category] || '💰'}
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-xl text-slate-800 dark:text-slate-100 truncate">
                  {formatCurrency(insights.highestExpense.amount)}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {insights.highestExpense.description}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {formatDate(insights.highestExpense.date)} · {insights.highestExpense.category}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Monthly Comparison Bar Chart */}
      <Card className="p-6 animate-slide-up" style={{ animationDelay: '480ms' }}>
        <SectionHeader
          title="Monthly Income vs Expenses"
          subtitle="Side-by-side comparison per month"
        />
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: axisColor, fontFamily: 'DM Sans' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: axisColor, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `₹${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
            />
            <Tooltip content={<MonthlyBarTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
            <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
          {[
            { color: '#10b981', label: 'Income' },
            { color: '#ef4444', label: 'Expenses' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
              {label}
            </div>
          ))}
        </div>
      </Card>

      {/* Category Spending Bar */}
      <Card className="p-6 animate-slide-up" style={{ animationDelay: '560ms' }}>
        <SectionHeader
          title="Top Spending Categories"
          subtitle="Ranked by total amount"
        />
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={categoryData}
            layout="vertical"
            margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: axisColor, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `₹${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: axisColor, fontFamily: 'DM Sans' }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<MonthlyBarTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} label={{ position: 'right', fontSize: 11, fontFamily: 'JetBrains Mono', fill: axisColor, formatter: v => `₹${v >= 1000 ? (v/1000).toFixed(1)+'k' : v}` }}>
              {categoryData.map(entry => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default Insights
