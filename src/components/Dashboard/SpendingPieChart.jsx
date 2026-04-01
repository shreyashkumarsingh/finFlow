import React, { useMemo, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import useStore from '../../store/useStore'
import { getCategoryBreakdown, formatCurrency } from '../../utils/finance'
import { CATEGORY_COLORS } from '../../data/mockData'
import { Card, SectionHeader } from '../UI'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0].payload
  return (
    <div className="bg-white dark:bg-surface-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{name}</p>
      <p className="font-mono text-sm text-slate-500 dark:text-slate-400">{formatCurrency(value)}</p>
    </div>
  )
}

const SpendingPieChart = () => {
  const { transactions } = useStore()
  const [activeIndex, setActiveIndex] = useState(null)

  const data = useMemo(() => getCategoryBreakdown(transactions), [transactions])
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <Card className="p-6 animate-slide-up" style={{ animationDelay: '280ms' }}>
      <SectionHeader
        title="Spending Breakdown"
        subtitle="By category (all time)"
      />

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Chart */}
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={(_, i) => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name] || '#94a3b8'}
                    opacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
                    style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-slate-400 dark:text-slate-500">Total</p>
            <p className="font-mono font-bold text-base text-slate-800 dark:text-slate-100">
              {formatCurrency(total, true)}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2 max-h-[180px] overflow-y-auto scrollbar-thin">
          {data.slice(0, 8).map((item, i) => {
            const pct = total > 0 ? (item.value / total * 100).toFixed(1) : '0.0'
            const color = CATEGORY_COLORS[item.name] || '#94a3b8'
            return (
              <div
                key={item.name}
                className="flex items-center gap-2 group cursor-default"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: color,
                    opacity: activeIndex === null || activeIndex === i ? 1 : 0.4,
                  }}
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 flex-1 truncate">{item.name}</span>
                <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 flex-shrink-0">
                  {formatCurrency(item.value, true)}
                </span>
                <span
                  className="text-xs font-medium flex-shrink-0 w-10 text-right"
                  style={{ color }}
                >
                  {pct}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

export default SpendingPieChart
