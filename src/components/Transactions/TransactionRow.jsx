import React, { useState } from 'react'
import { Pencil, Trash2, MoreVertical } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/finance'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../data/mockData'
import { Badge } from '../UI'

const TransactionRow = ({ transaction, isAdmin, onEdit, onDelete }) => {
  const { description, category, type, amount, date } = transaction
  const [menuOpen, setMenuOpen] = useState(false)

  const color = CATEGORY_COLORS[category] || '#94a3b8'
  const icon = CATEGORY_ICONS[category] || '💰'

  return (
    <div id={`txn-${transaction.id}`} className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-150 group relative">
      {/* Category Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
        style={{ backgroundColor: color + '18' }}
      >
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate leading-snug">
          {description}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-xs font-medium"
            style={{ color }}
          >
            {category}
          </span>
          <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{formatDate(date)}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <p className={`font-mono font-semibold text-sm ${type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
          {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
        </p>
        <div className="mt-0.5 flex justify-end">
          <Badge type={type}>{type}</Badge>
        </div>
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-8 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-1.5 min-w-[140px] animate-slide-up">
                <button
                  onClick={() => { onEdit(transaction); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => { onDelete(transaction.id); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-150"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default TransactionRow
