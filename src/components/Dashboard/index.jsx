import React from 'react'
import SummaryCards from './SummaryCards'
import BalanceTrendChart from './BalanceTrendChart'
import SpendingPieChart from './SpendingPieChart'
import RecentTransactions from './RecentTransactions'
import { SectionHeader } from '../UI'
import { EmptyState } from '../UI'
import useStore from '../../store/useStore'

const Dashboard = () => {
  const { transactions, setActivePage, setOpenAddOnLoad } = useStore()

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title="Overview"
        subtitle="Your financial summary at a glance"
      />

      {/* First-time empty experience */}
      {transactions.length === 0 && (
        <div className="max-w-4xl mx-auto py-12">
          <EmptyState
            title="Welcome to FinFlow"
            description="Start by adding your first transaction to see insights and summaries."
            cta={{ label: 'Add your first transaction', onClick: () => { setOpenAddOnLoad(true); setActivePage('transactions') } }}
          />
        </div>
      )}

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-2">
          <SpendingPieChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  )
}

export default Dashboard
