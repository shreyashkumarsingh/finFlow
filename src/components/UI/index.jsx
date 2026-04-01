import React from 'react'
import { Inbox } from 'lucide-react'

// ─── Card ──────────────────────────────────────────────────────────────────
export const Card = ({ children, className = '', hover = false, onClick }) => (
  <div
    className={`card ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

// ─── Badge ─────────────────────────────────────────────────────────────────
export const Badge = ({ type, children }) => (
  <span className={type === 'income' ? 'badge-income' : 'badge-expense'}>
    {type === 'income' ? '↑' : '↓'} {children}
  </span>
)

// ─── EmptyState ────────────────────────────────────────────────────────────
export const EmptyState = ({ title = 'No data found', description = 'Try adjusting your filters.' }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-4">
      <Inbox className="w-8 h-8 text-slate-400" />
    </div>
    <p className="font-display font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</p>
    <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">{description}</p>
  </div>
)

// ─── LoadingSpinner ────────────────────────────────────────────────────────
export const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }
  return (
    <div className={`${sizes[size]} border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin`} />
  )
}

// ─── Skeleton ──────────────────────────────────────────────────────────────
export const Skeleton = ({ className = '' }) => (
  <div className={`bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse ${className}`} />
)

// ─── Divider ──────────────────────────────────────────────────────────────
export const Divider = ({ className = '' }) => (
  <hr className={`border-slate-100 dark:border-slate-700/50 ${className}`} />
)

// ─── SectionHeader ────────────────────────────────────────────────────────
export const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h2 className="font-display font-semibold text-lg text-slate-800 dark:text-slate-100">{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
)

// ─── Tooltip Wrapper ──────────────────────────────────────────────────────
export const Tooltip = ({ children, label }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 dark:bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 shadow-lg">
      {label}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-900" />
    </div>
  </div>
)

// ─── ChangeIndicator ──────────────────────────────────────────────────────
export const ChangeIndicator = ({ value, prefix = '', inverted = false }) => {
  const isPositive = inverted ? value < 0 : value > 0
  const absVal = Math.abs(value).toFixed(1)

  if (value === 0) {
    return <span className="text-xs text-slate-400 font-medium">No change</span>
  }

  return (
    <span className={`text-xs font-medium flex items-center gap-0.5 ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
      {value > 0 ? '↑' : '↓'} {prefix}{absVal}% vs last month
    </span>
  )
}
