import React, { useEffect } from 'react'
import useStore from '../../store/useStore'

const Toast = ({ toast }) => {
  const removeToast = useStore(state => state.removeToast)

  useEffect(() => {
    const t = setTimeout(() => removeToast(toast.id), toast.duration || 3000)
    return () => clearTimeout(t)
  }, [toast, removeToast])

  return (
    <div className={`max-w-sm w-full bg-white dark:bg-surface-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-3 mb-3`}> 
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{toast.title}</p>
          {toast.message && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{toast.message}</p>}
        </div>
        <div className="flex-shrink-0 text-slate-400">{toast.type === 'success' ? '✅' : 'ℹ️'}</div>
      </div>
    </div>
  )
}

const ToastContainer = () => {
  const toasts = useStore(state => state.toasts)

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end">
      {toasts.map(t => <Toast key={t.id} toast={t} />)}
    </div>
  )
}

export default ToastContainer
