import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialTransactions } from '../data/mockData'
import { generateId } from '../utils/finance'

const useStore = create(
  persist(
    (set, get) => ({
      // ─── Auth / Role ───────────────────────────────────────────────
      role: 'viewer', // 'viewer' | 'admin'
      setRole: (role) => set({ role }),

      // ─── Theme ────────────────────────────────────────────────────
      darkMode: true,
      toggleDarkMode: () => {
        const next = !get().darkMode
        set({ darkMode: next })
        if (next) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      // ─── Navigation ───────────────────────────────────────────────
      activePage: 'dashboard', // 'dashboard' | 'transactions' | 'insights'
      setActivePage: (page) => set({ activePage: page }),

      // ─── Transactions ──────────────────────────────────────────────
      transactions: initialTransactions,

      addTransaction: (txn) => set((state) => ({
        transactions: [
          { ...txn, id: generateId() },
          ...state.transactions,
        ],
      })),

      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map(t =>
          t.id === id ? { ...t, ...updates } : t
        ),
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id),
      })),

      resetTransactions: () => set({ transactions: initialTransactions }),

      // ─── UI helpers ───────────────────────────────────────────────
      // For opening add modal when navigating from elsewhere (demo/CTA)
      openAddOnLoad: false,
      setOpenAddOnLoad: (v) => set({ openAddOnLoad: v }),

      // Toasts
      toasts: [],
      addToast: (toast) => set((state) => ({ toasts: [...state.toasts, { id: Date.now(), ...toast }] })),
      removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),
      // Derived selectors
      getTotalBalance: () => {
        const tx = get().transactions || []
        return tx.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0)
      },
      getTotalIncome: () => {
        const tx = get().transactions || []
        return tx.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
      },
      getTotalExpenses: () => {
        const tx = get().transactions || []
        return tx.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
      },

      // ─── Filters ──────────────────────────────────────────────────
      search: '',
      filterType: 'all', // 'all' | 'income' | 'expense'
      sortBy: 'date',    // 'date' | 'amount' | 'category'
      sortOrder: 'desc', // 'asc' | 'desc'

      setSearch: (search) => set({ search }),
      setFilterType: (filterType) => set({ filterType }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      toggleSortOrder: () => set((state) => ({
        sortOrder: state.sortOrder === 'desc' ? 'asc' : 'desc',
      })),

      // ─── UI State ─────────────────────────────────────────────────
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      // Selected transaction navigation (transient)
      selectedTransactionId: null,
      setSelectedTransactionId: (id) => set({ selectedTransactionId: id }),
    }),
    {
      name: 'finflow-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.classList.add('dark')
        }
      },
    }
  )
)

export default useStore

// Ensure `dark` class is present on initial load when darkMode is true
if (typeof document !== 'undefined' && useStore.getState().darkMode) {
  document.documentElement.classList.add('dark')
}
