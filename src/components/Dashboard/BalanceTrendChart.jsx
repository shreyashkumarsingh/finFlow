import React, { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, ReferenceLine,
} from 'recharts'
import useStore from '../../store/useStore'
import { getMonthlyData, formatCurrency } from '../../utils/finance'
import { Card, SectionHeader } from '../UI'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-surface-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-xl">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-500 dark:text-slate-400 capitalize">{p.dataKey}:</span>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-100">
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

const BalanceTrendChart = () => {
  const { transactions, darkMode } = useStore()

  const data = useMemo(() => getMonthlyData(transactions), [transactions])

  const axisColor = darkMode ? '#475569' : '#cbd5e1'
  const gridColor = darkMode ? '#1e293b' : '#f1f5f9'

  return (
    <Card className="p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <SectionHeader
        title="Balance Trend"
        subtitle="Running balance across all months"
      />
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            tickFormatter={v => `₹${Math.abs(v) >= 1000 ? (v / 1000).toFixed(1) + 'k' : v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#10b981', stroke: 'white', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#expenseGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#0ea5e9"
            strokeWidth={2.5}
            fill="url(#balanceGrad)"
            dot={false}
            activeDot={{ r: 6, fill: '#0ea5e9', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
        {[
          { color: '#0ea5e9', label: 'Balance' },
          { color: '#10b981', label: 'Income' },
          { color: '#ef4444', label: 'Expenses' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="w-5 h-0.5 rounded" style={{ backgroundColor: color }} />
            {label}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default BalanceTrendChart
