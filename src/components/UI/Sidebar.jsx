import React from 'react'
import {
  LayoutDashboard, CreditCard, Lightbulb, Sun, Moon,
  Shield, Eye, X, RefreshCw, ChevronDown,
} from 'lucide-react'
import useStore from '../../store/useStore'

const NAV_ITEMS = [
  { id: 'dashboard',     label: 'Overview',     icon: LayoutDashboard },
  { id: 'transactions',  label: 'Transactions', icon: CreditCard },
  { id: 'insights',      label: 'Insights',     icon: Lightbulb },
]

const Sidebar = ({ mobile = false }) => {
  const {
    activePage, setActivePage,
    role, setRole,
    darkMode, toggleDarkMode,
    sidebarOpen, setSidebarOpen,
    resetTransactions,
  } = useStore()

  const navigate = (page) => {
    setActivePage(page)
    if (mobile) setSidebarOpen(false)
  }

  return (
    <aside className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center shadow-glow-blue">
            <span className="text-white font-display font-bold text-sm">F</span>
          </div>
          <div>
            <span className="font-display font-bold text-slate-800 dark:text-slate-100 text-base leading-none">
              Fin<span className="text-gradient">Flow</span>
            </span>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Finance Dashboard</p>
          </div>
        </div>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-3 mb-3">
          Menu
        </p>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => navigate(id)}
            className={`nav-link w-full ${activePage === id ? 'nav-link-active' : ''}`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
            {activePage === id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 space-y-3">
        {/* Role Selector */}
        <div>
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2 px-1">
            Role
          </p>
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
            <button
              onClick={() => setRole('viewer')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all duration-200 ${
                role === 'viewer'
                  ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Viewer
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all duration-200 ${
                role === 'admin'
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
          {role === 'admin' && (
            <p className="text-[10px] text-brand-500 dark:text-brand-400 mt-1.5 px-1 animate-fade-in">
              ✓ Can add, edit, delete transactions
            </p>
          )}
        </div>

        {/* Dark Mode & Reset */}
        <div className="flex gap-2">
          <button
            onClick={toggleDarkMode}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-600 transition-all duration-200"
          >
            {darkMode
              ? <><Sun className="w-3.5 h-3.5 text-amber-400" /> Light</>
              : <><Moon className="w-3.5 h-3.5 text-slate-400" /> Dark</>
            }
          </button>
          <button
            onClick={resetTransactions}
            title="Reset to demo data"
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-600 transition-all duration-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
