import React, { useState, useRef, useEffect } from 'react'
import { Menu, Bell, Search } from 'lucide-react'
import useStore from '../../store/useStore'

const PAGE_TITLES = {
  dashboard:    { title: 'Overview',     sub: 'Your financial summary' },
  transactions: { title: 'Transactions', sub: 'Manage your money flow' },
  insights:     { title: 'Insights',     sub: 'Smart analytics' },
}

const Header = () => {
  const { activePage, toggleSidebar, role, setRole } = useStore()
  const { title, sub } = PAGE_TITLES[activePage] || PAGE_TITLES.dashboard
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const onDocClick = (e) => {
      if (!buttonRef.current) return
      if (buttonRef.current.contains(e.target)) return
      setMenuOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-100 dark:border-slate-700/50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm sticky top-0 z-30">
      {/* Left: hamburger + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <h1 className="font-display font-semibold text-base text-slate-800 dark:text-slate-100 leading-none">
            {title}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
        </div>
      </div>

      {/* Right: role badge + notification bell */}
      <div className="flex items-center gap-2 relative">
        {/* Role badge (click to open menu) */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(v => !v)}
            ref={buttonRef}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none ${
              role === 'admin'
                ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400'
                : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${role === 'admin' ? 'bg-brand-500 animate-pulse-soft' : 'bg-slate-400'}`} />
            {role === 'admin' ? 'Admin' : 'Viewer'}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-surface-900 border border-slate-100 dark:border-slate-700/50 rounded-md shadow-lg z-50">
              <button
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 ${role === 'admin' ? 'opacity-60' : ''}`}
                onClick={() => { setRole('admin'); setMenuOpen(false) }}
                disabled={role === 'admin'}
              >
                Switch to Admin
              </button>
              <button
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 ${role === 'viewer' ? 'opacity-60' : ''}`}
                onClick={() => { setRole('viewer'); setMenuOpen(false) }}
                disabled={role === 'viewer'}
              >
                Switch to Viewer
              </button>
            </div>
          )}
        </div>

        {/* Avatar placeholder */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-400 to-brand-500 flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200">
          <span className="text-white text-xs font-bold font-display">U</span>
        </div>
      </div>
    </header>
  )
}

export default Header
