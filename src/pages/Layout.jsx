import React, { useEffect } from 'react'
import useStore from '../store/useStore'
import Sidebar from '../components/UI/Sidebar'
import Header from '../components/UI/Header'
import Dashboard from '../components/Dashboard'
import Transactions from '../components/Transactions'
import Insights from '../components/Insights'
import ToastContainer from '../components/UI/Toast'

const PAGES = {
  dashboard:    Dashboard,
  transactions: Transactions,
  insights:     Insights,
}

const Layout = () => {
  const { activePage, sidebarOpen, setSidebarOpen, darkMode } = useStore()

  // Apply dark mode class on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const PageComponent = PAGES[activePage] || Dashboard

  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-950 mesh-bg transition-colors duration-300">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 bg-white dark:bg-surface-900 border-r border-slate-100 dark:border-slate-700/50 h-screen sticky top-0 transition-colors duration-300">
        <Sidebar />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="fixed left-0 top-0 bottom-0 w-72 z-50 bg-white dark:bg-surface-900 border-r border-slate-100 dark:border-slate-700/50 flex flex-col lg:hidden animate-slide-in-right">
            <Sidebar mobile />
          </aside>
        </>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <PageComponent key={activePage} />
          </div>
        </main>
        <ToastContainer />
        <footer className="py-3 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/50 bg-white/0">
          Made in India • © 2026
        </footer>
      </div>
    </div>
  )
}

export default Layout
