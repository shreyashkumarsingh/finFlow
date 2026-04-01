# FinFlow — A Modern Fintech Dashboard for Smart Financial Tracking

A modern, production-quality finance dashboard built with React, Tailwind CSS, Recharts, and Zustand.


Live demo : https://finflow-weld.vercel.app

Respository : https://github.com/shreyashkumarsingh/finFlow
---

## 🎯 How This Meets Assignment Requirements

- **Dashboard Overview** → Summary cards + charts
- **Transactions** → Full CRUD + filters + sorting
- **Role-Based UI** → Admin/Viewer simulation
- **Insights** → Dynamic analytics
- **State Management** → Zustand with persistence
- **UX** → Empty states, toasts, navigation highlights


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

## ⬆️ Deploying to Vercel (one-click)

This project is configured to deploy to Vercel as a static site. Vercel will run the `build` script and serve the `dist` directory.

1. Push your repository to GitHub (if not already).
2. Import the repository in Vercel (https://vercel.com/new).
3. Vercel will detect a static site. If asked, set the build command to `npm run build` and the output directory to `dist`.

Files added to support Vercel:
- `vercel.json` — build config and SPA routing
- `.vercelignore` — excludes node_modules, dist, and env files

After configuring, Vercel will build and provide a production URL automatically.


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

### Why these choices
- **Zustand**: lightweight, minimal boilerplate, easy to persist slice of state (good for demo apps and small products).
- **Role-based UI**: simple role switcher (Viewer/Admin) implemented to demonstrate permissioned flows without backend — Admin enables add/edit/delete controls.
- **Mock data**: Enables deterministic charts and easy reset for reviewers; initial data converted to INR for the target audience.

## ✅ Rubric Mapping (what this submission addresses)

- **Design & Creativity**: improved visual hierarchy, gradient accents, icons across UI, and grouped cards for clearer information scent.
- **User Experience**: added first-time empty state CTA, toast feedback on CRUD actions, row highlight when navigating from dashboard.
- **Attention to Detail**: currency consistency (INR/₹), chart tooltip/axis formatting, handling of no-data and edge cases.
- **Functionality**: CRUD for transactions (admin), CSV export, role-switching, dark mode, persistent state.
- **State Management**: Zustand with persisted storage for transactions, role, and theme. Derived selectors and helper utilities centralize logic.

## 📸 Screenshots

<img width="1894" height="877" alt="image" src="https://github.com/user-attachments/assets/c9494234-2708-4964-b2ac-04f37febb919" />

<img width="1896" height="880" alt="image" src="https://github.com/user-attachments/assets/6e4285df-0cf3-4c2e-bb09-df0341d5e338" />

<img width="1885" height="869" alt="image" src="https://github.com/user-attachments/assets/95cf504e-a81c-4eed-8904-688949a8c94c" />

- Dashboard (Dark mode): ![Dashboard Dark](public/screenshot-dashboard-dark.png)
- Transactions: ![Transactions](public/screenshot-transactions.png)
- Edit modal: ![Edit Transaction](public/screenshot-edit.png)

## 📌 Feature notes

- **Implements role-based UI**: `Viewer` sees read-only UI; `Admin` can add/edit/delete transactions. Role persisted in localStorage.
- **Empty states**: Dashboard shows a clear CTA for first-time users that navigates to Transactions and opens the Add form.
- **Export CSV**: Transactions page includes `Export CSV` button to download current filtered rows.

## 🙋 Demo Mode & Product Tagline

The app includes a demo-first experience and clear branding:

- **Title**: FinFlow — Your personal finance insights, simplified
- **Demo CTA**: a demo-mode flow is available (use the `Continue as Demo User` button on first load) — this seeds the store with mock data and demonstrates the full feature set.

## ✅ How to contribute or evaluate

1. Clone the repo and run the dev server (see Quick Start above).
2. Use the role switcher in the header to toggle Admin features.
3. Add / edit / delete transactions to see toasts and chart updates.
4. Use "Export CSV" to download the current table.


---

## 📊 Mock Data

60+ transactions across 6 months covering:

**Income categories:** Salary, Freelance, Investment  
**Expense categories:** Rent, Food & Dining, Bills & Utilities, Travel, Shopping, Healthcare, Entertainment, Education, Subscriptions

Data spans from 5 months ago to today, providing realistic monthly trends for all charts.
