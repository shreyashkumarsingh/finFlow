import React, { useMemo } from 'react'
import useStore from '../../store/useStore'
import { formatCurrency, formatDate } from '../../utils/finance'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../data/mockData'
import { Card, SectionHeader, EmptyState } from '../UI'
import { ArrowRight } from 'lucide-react'

const RecentTransactions = () => {
  const { transactions, setActivePage } = useStore()

  const recent = useMemo(() =>
    [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6),
    [transactions]
  )

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '360ms' }}>
      <div className="p-6 pb-3">
        <SectionHeader
          title="Recent Transactions"
          subtitle="Latest activity"
          action={
            <button
              onClick={() => setActivePage('transactions')}
              className="flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        />
      </div>

      {recent.length === 0 ? (
        <EmptyState title="No transactions yet" description="Add your first transaction to get started." />
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {recent.map(txn => {
            const color = CATEGORY_COLORS[txn.category] || '#94a3b8'
            const icon = CATEGORY_ICONS[txn.category] || '💰'
            return (
              <div
                key={txn.id}
                id={`txn-${txn.id}`}
                onClick={() => { setActivePage('transactions'); setSelectedTransactionId(txn.id) }}
                className="flex items-center gap-3 px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors duration-150 cursor-pointer"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                  style={{ backgroundColor: color + '18' }}
                >
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{txn.description}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{formatDate(txn.date)}</p>
                </div>
                <p className={`font-mono text-sm font-semibold flex-shrink-0 ${txn.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                  {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

export default RecentTransactions
