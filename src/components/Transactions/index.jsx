import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, Plus, ArrowUp, ArrowDown, X } from 'lucide-react'
import useStore from '../../store/useStore'
import { filterAndSortTransactions } from '../../utils/finance'
import { EmptyState, SectionHeader, Card } from '../UI'
import TransactionRow from './TransactionRow'
import TransactionForm from './TransactionForm'
import Modal from '../UI/Modal'

const Transactions = () => {
  const {
    transactions, role,
    selectedTransactionId, setSelectedTransactionId,
    search, filterType, sortBy, sortOrder,
    setSearch, setFilterType, setSortBy, setSortOrder,
    addTransaction, updateTransaction, deleteTransaction,
  } = useStore()

  const isAdmin = role === 'admin'

  const [addOpen, setAddOpen] = useState(false)
  const [editTxn, setEditTxn] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [highlightId, setHighlightId] = useState(null)
  const openAddOnLoad = useStore(state => state.openAddOnLoad)
  const setOpenAddOnLoad = useStore(state => state.setOpenAddOnLoad)
  const addToast = useStore(state => state.addToast)

  const filtered = useMemo(() =>
    filterAndSortTransactions(transactions, { search, filterType, sortBy, sortOrder }),
    [transactions, search, filterType, sortBy, sortOrder]
  )

  const exportCSV = (rows) => {
    if (!rows || rows.length === 0) {
      addToast({ title: 'No data to export', type: 'info' })
      return
    }
    const headers = ['id','date','description','category','type','amount']
    const csv = [headers.join(',')]
    rows.forEach(r => {
      const line = headers.map(h => `"${String(r[h] ?? '')}"`).join(',')
      csv.push(line)
    })
    const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions_${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    addToast({ title: 'CSV exported', message: 'Transactions downloaded', type: 'success' })
  }

  // If navigation requested from another page, scroll to and open edit for that txn
  React.useEffect(() => {
    if (!selectedTransactionId) return
    const el = document.getElementById(`txn-${selectedTransactionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      const target = transactions.find(t => t.id === selectedTransactionId)
      if (isAdmin && target) {
        setEditTxn(target)
      }
      // trigger highlight
      setHighlightId(selectedTransactionId)
      setTimeout(() => setHighlightId(null), 1000)
    }
    // clear the selection after handling
    setSelectedTransactionId(null)
  }, [selectedTransactionId])

  // handle openAddOnLoad flag (from CTA)
  React.useEffect(() => {
    if (openAddOnLoad) {
      setAddOpen(true)
      setOpenAddOnLoad(false)
    }
  }, [openAddOnLoad])

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(col)
      setSortOrder('desc')
    }
  }

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />
    return sortOrder === 'desc'
      ? <ArrowDown className="w-3.5 h-3.5 text-brand-500" />
      : <ArrowUp className="w-3.5 h-3.5 text-brand-500" />
  }

  return (
    <div className="animate-fade-in space-y-8">
      <SectionHeader
        title="Transactions"
        subtitle={`${filtered.length} of ${transactions.length} transactions`}
        action={
          <div className="flex items-center gap-2">
            <button onClick={() => exportCSV(filtered)} className="btn-secondary">
              Export CSV
            </button>
            {isAdmin && (
              <button onClick={() => setAddOpen(true)} className="btn-primary">
                <Plus className="w-4 h-4" /> Add Transaction
              </button>
            )}
          </div>
        }
      />

      {/* Filters Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by description or category..."
              className="input-field pl-10 pr-9"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden flex-shrink-0">
            {[
              { key: 'all', label: 'All' },
              { key: 'income', label: '↑ Income' },
              { key: 'expense', label: '↓ Expense' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilterType(key)}
                className={`px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  filterType === key
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex-wrap">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Sort by:
          </span>
          {[
            { key: 'date', label: 'Date' },
            { key: 'amount', label: 'Amount' },
            { key: 'category', label: 'Category' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSort(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                sortBy === key
                  ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
            >
              {label} <SortIcon col={key} />
            </button>
          ))}
        </div>
      </Card>

      {/* Transaction List */}
      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="No transactions found"
            description="Try changing your search or filter criteria."
          />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {filtered.map(txn => (
              <TransactionRow
                key={txn.id}
                transaction={txn}
                isAdmin={isAdmin}
                onEdit={setEditTxn}
                onDelete={(id) => setDeleteConfirm(id)}
                flash={highlightId === txn.id}
              />
            ))}
          </div>
        )}
      </Card>

      {/* Add Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add Transaction">
        <TransactionForm
          onSubmit={(data) => { addTransaction(data); setAddOpen(false); addToast({ title: 'Transaction added', type: 'success' }) }}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editTxn} onClose={() => setEditTxn(null)} title="Edit Transaction">
        <TransactionForm
          initialData={editTxn}
          onSubmit={(data) => { updateTransaction(editTxn.id, data); setEditTxn(null); addToast({ title: 'Transaction updated', type: 'success' }) }}
          onCancel={() => setEditTxn(null)}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Transaction" size="sm">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🗑️</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
            <button
              onClick={() => { deleteTransaction(deleteConfirm); setDeleteConfirm(null); addToast({ title: 'Transaction deleted', type: 'success' }) }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Transactions
