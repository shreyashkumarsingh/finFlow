import React, { useState, useEffect } from 'react'
import { CATEGORIES } from '../../data/mockData'
import { format } from 'date-fns'

const defaultForm = {
  description: '',
  amount: '',
  category: CATEGORIES.FOOD,
  type: 'expense',
  date: format(new Date(), 'yyyy-MM-dd'),
}

const TransactionForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setForm({
        description: initialData.description || '',
        amount: String(initialData.amount || ''),
        category: initialData.category || CATEGORIES.FOOD,
        type: initialData.type || 'expense',
        date: initialData.date || format(new Date(), 'yyyy-MM-dd'),
      })
    } else {
      setForm(defaultForm)
    }
    setErrors({})
  }, [initialData])

  const validate = () => {
    const errs = {}
    if (!form.description.trim()) errs.description = 'Description is required'
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
      errs.amount = 'Enter a valid positive amount'
    }
    if (!form.date) errs.date = 'Date is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSubmit({
      ...form,
      amount: parseFloat(parseFloat(form.amount).toFixed(2)),
    })
  }

  const field = (key, value) => {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const inputCls = (key) =>
    `input-field ${errors[key] ? 'border-red-400 focus:ring-red-300 focus:border-red-400' : ''}`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type Toggle */}
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Type</label>
        <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600">
          {['expense', 'income'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => field('type', t)}
              className={`flex-1 py-2.5 text-sm font-medium capitalize transition-all duration-200 ${
                form.type === t
                  ? t === 'income'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30'
              }`}
            >
              {t === 'income' ? '↑ Income' : '↓ Expense'}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Description</label>
        <input
          type="text"
          value={form.description}
          onChange={e => field('description', e.target.value)}
          placeholder="e.g. Monthly Salary, Dinner out..."
          className={inputCls('description')}
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Amount (INR)</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">₹</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={e => field('amount', e.target.value)}
            placeholder="0.00"
            className={`${inputCls('amount')} pl-8 font-mono`}
          />
        </div>
        {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Category</label>
        <select
          value={form.category}
          onChange={e => field('category', e.target.value)}
          className="input-field"
        >
          {Object.values(CATEGORIES).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Date</label>
        <input
          type="date"
          value={form.date}
          onChange={e => field('date', e.target.value)}
          max={format(new Date(), 'yyyy-MM-dd')}
          className={inputCls('date')}
        />
        {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 justify-center">
          {initialData ? 'Save Changes' : 'Add Transaction'}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
