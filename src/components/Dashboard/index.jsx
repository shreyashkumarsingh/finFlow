import React from 'react'
import SummaryCards from './SummaryCards'
import BalanceTrendChart from './BalanceTrendChart'
import SpendingPieChart from './SpendingPieChart'
import RecentTransactions from './RecentTransactions'
import { SectionHeader } from '../UI'

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Overview"
        subtitle="Your financial summary at a glance"
      />

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
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
