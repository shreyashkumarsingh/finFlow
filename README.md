# FinFlow — Finance Dashboard

A modern, production-quality finance dashboard built with React, Tailwind CSS, Recharts, and Zustand.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# 1. Navigate into the project folder
cd finance-dashboard

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## ✨ Features

### Dashboard Overview
- **Summary cards** — Total Balance, Total Income, Total Expenses with savings rate
- **Balance Trend Chart** — Area chart showing income, expenses, and running balance by month
- **Spending Breakdown** — Interactive donut chart with category legend
- **Recent Transactions** — Quick view of the latest 6 transactions

### Transactions
- Full searchable, filterable, sortable transaction table
- Filter by type: All / Income / Expense
- Sort by: Date / Amount / Category (asc/desc)
- **Admin only:** Add, Edit, Delete transactions with form validation

### Insights
- This month vs last month expense and income comparison
- Savings rate and average daily spend
- Top spending category highlight
- Largest single expense
- Monthly income vs expense bar chart
- Top category horizontal bar chart

### Role-Based UI
| Feature | Viewer | Admin |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transactions | ❌ | ✅ |
| Edit transactions | ❌ | ✅ |
| Delete transactions | ❌ | ✅ |

### Bonus Features
- 🌙 **Dark mode** — Full dark theme toggle persisted to localStorage
- 💾 **LocalStorage persistence** — Transactions and settings survive page refresh
- ✨ **Animations** — Staggered card entrances, hover transitions, modal animations
- 📱 **Fully responsive** — Mobile drawer sidebar, tablet and desktop layouts
- 🔄 **Reset button** — Restore demo data at any time

---

## 🗂 Project Structure

```
finance-dashboard/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css                    # Tailwind + custom utilities
    ├── data/
    │   └── mockData.js              # 60+ mock transactions, categories, colors
    ├── store/
    │   └── useStore.js              # Zustand store (transactions, role, theme, filters)
    ├── utils/
    │   └── finance.js               # Formatting, filtering, insight calculations
    ├── components/
    │   ├── UI/
    │   │   ├── index.jsx            # Shared: Card, Badge, EmptyState, Skeleton…
    │   │   ├── Modal.jsx            # Accessible modal dialog
    │   │   ├── Sidebar.jsx          # Nav + role switcher + dark mode
    │   │   └── Header.jsx           # Sticky top bar
    │   ├── Dashboard/
    │   │   ├── index.jsx
    │   │   ├── SummaryCards.jsx
    │   │   ├── BalanceTrendChart.jsx
    │   │   ├── SpendingPieChart.jsx
    │   │   └── RecentTransactions.jsx
    │   ├── Transactions/
    │   │   ├── index.jsx
    │   │   ├── TransactionRow.jsx
    │   │   └── TransactionForm.jsx
    │   └── Insights/
    │       └── index.jsx
    └── pages/
        └── Layout.jsx               # Responsive shell
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Recharts** | Charts (Area, Pie, Bar) |
| **Zustand** | State management |
| **date-fns** | Date formatting & math |
| **lucide-react** | Icons |

---

## 🎨 Design Decisions

- **Font pairing:** Sora (display/headings) + DM Sans (body) + JetBrains Mono (numbers)
- **Color system:** Brand blue (`#0ea5e9`), Emerald for income, Red for expenses
- **Card design:** Soft shadows, 2xl border radius, hover lift effect
- **Dark mode:** CSS class strategy (`dark:` variants), stored in Zustand + localStorage
- **Animations:** CSS keyframes via Tailwind config — `fade-in`, `slide-up`, staggered delays

---

## 📊 Mock Data

60+ transactions across 6 months covering:

**Income categories:** Salary, Freelance, Investment  
**Expense categories:** Rent, Food & Dining, Bills & Utilities, Travel, Shopping, Healthcare, Entertainment, Education, Subscriptions

Data spans from 5 months ago to today, providing realistic monthly trends for all charts.
