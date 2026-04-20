<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0a1628,50:0d2d1f,100:0a1628&height=180&text=💸%20Spendify&fontSize=62&fontColor=34d399&fontAlignY=52&desc=Your%20AI-Powered%20Personal%20Finance%20Co-pilot&descColor=94a3b8&descAlignY=72&descSize=18" width="100%"/>

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Powered-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge)](https://adi-with-tea.github.io/Spendify/)

<br/>

![Dashboard](https://img.shields.io/badge/📊-Dashboard-0f766e?style=flat-square)
![Transactions](https://img.shields.io/badge/💳-Transactions-0284c7?style=flat-square)
![Budgets](https://img.shields.io/badge/📋-Budget%20Tracker-7c3aed?style=flat-square)
![Goals](https://img.shields.io/badge/🎯-Savings%20Goals-db2777?style=flat-square)
![AI Agent](https://img.shields.io/badge/🤖-AI%20Financial%20Advisor-f59e0b?style=flat-square)

<br/>

```
Track  →  Budget  →  Save  →  Grow
```

*A modern, minimal personal finance tracker with a built-in AI financial advisor.*  
*Add your transactions. Set budgets. Let the AI guide the rest.*

🔗 **[Live Demo →](https://adi-with-tea.github.io/Spendify/)**

<br/>

</div>

---

## 📸 Screenshots

<div align="center">

| Dashboard Overview | AI Financial Advisor |
|:-:|:-:|
| ![Dashboard](screenshots/dashboard.png) | ![AI Insights](screenshots/ai_insights.png) |

| Transaction Manager | Budget Tracker |
|:-:|:-:|
| ![Transactions](screenshots/transactions.png) | ![Budget](screenshots/budget.png) |

</div>

> 💡 *Add your screenshots to a `screenshots/` folder — filenames: `dashboard.png`, `ai_insights.png`, `transactions.png`, `budget.png`.*

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Dashboard
- **Financial Health Score** — at-a-glance score based on savings rate, budget adherence, and goals
- **Income vs Expense Summary** — monthly income, expenses, and net savings
- **Spending Donut Chart** — visual breakdown by category
- **6-Month Bar Trend** — track spending trajectory over time
- **Budget Progress Bars** — see which budgets are healthy or at risk

</td>
<td width="50%">

### 💳 Transactions
- **Add / Edit / Delete** transactions with full details
- **Income & Expense** types supported
- **10 Categories** — Food & Dining, Transport, Shopping, Entertainment, Health, Utilities, Rent, Income, Education, Other
- **Search & Filter** by category, type, or keyword
- **Persistent Storage** — data saved to localStorage automatically

</td>
</tr>
<tr>
<td width="50%">

### 📋 Budget Manager
- **Set per-category limits** with live usage tracking
- **Visual bar chart** of spend vs limit for each category
- **Colour-coded warnings** — green, amber, and red status indicators
- **AI Budget Generator** — auto-suggests limits based on your actual spending

</td>
<td width="50%">

### 🎯 Savings Goals
- **Create & track** multiple savings goals
- **Deposit funds** incrementally toward each goal
- **Progress bars** with percentage completion
- **Target date tracking** to stay on schedule
- **Colour-coded goal cards** for quick visual scanning

</td>
</tr>
<tr>
<td colspan="2">

### 🤖 AI Financial Advisor
- **Conversational chat interface** powered by Claude AI
- **Context-aware** — the AI sees your real income, expenses, budgets, goals, and recent transactions
- **Quick Actions** for instant insights: Full Financial Report, Where to Cut Spending, Investment Suggestions, Goal Planning, Monthly Budget Plan, Financial Risks
- **India-specific advice** — investment suggestions tailored for Indian users (SIP, FD, etc.)
- **No generic advice** — every response references your actual numbers

</td>
</tr>
</table>

---

## 🤖 How the AI Agent Works

The AI advisor is grounded entirely in your personal financial data — no guesswork, no generic tips.

```
┌─────────────────────────────────────────────────────────────┐
│                   SPENDIFY AI CONTEXT                       │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  💰 Income   │  📉 Expenses │  📋 Budgets  │  🎯 Goals      │
│              │              │              │                │
│  Monthly     │  Category-   │  Spend vs    │  Progress &    │
│  income &    │  wise        │  limit       │  target        │
│  savings     │  breakdown   │  status      │  dates         │
│  rate        │  + trends    │  + warnings  │                │
└──────────────┴──────────────┴──────────────┴────────────────┘
                          ↓
              Claude AI analyses your data
                          ↓
              Specific, actionable advice
```

The AI receives your complete financial snapshot with every message — savings rate, category spending percentages, budget warning flags, goal completion %, and your 10 most recent transactions.

---

## 🗂️ Project Structure

```
spendify-v2-source/
└── spendify-pro/
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    ├── package.json
    └── src/
        ├── main.tsx              # App entry point
        ├── App.tsx               # Root component + routing + localStorage state
        ├── types.ts              # TypeScript types (Transaction, Budget, Goal, AppState)
        ├── helpers.ts            # Utility functions, seed data, category colours
        ├── index.css             # Global styles
        ├── components/
        │   ├── Nav.tsx           # Sidebar navigation
        │   ├── Nav.module.css    # Nav styles
        │   └── UI.tsx            # Reusable UI components (Card, Btn, Modal, Input…)
        └── pages/
            ├── Dashboard.tsx     # Overview with charts and health score
            ├── Transactions.tsx  # Transaction CRUD + search/filter
            ├── Budget.tsx        # Budget management + AI budget generator
            ├── Goals.tsx         # Savings goals + deposit tracker
            └── AIAgent.tsx       # Chat interface with Claude AI
```

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Language | TypeScript 5 | End-to-end type safety |
| Framework | React 18 | UI & component model |
| Build Tool | Vite 4 | Fast dev server & bundler |
| Charts | Chart.js + react-chartjs-2 | Doughnut & Bar charts |
| AI | Claude (Anthropic) | Financial advisor chat |
| Storage | localStorage | Client-side data persistence |
| Styling | CSS Modules + custom CSS | Scoped, minimal design |

---

## ⚙️ Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** v18 or higher
- **npm** or **pnpm**
- An **[Anthropic API key](https://console.anthropic.com/)** for the AI advisor

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/adi-with-tea/Spendify.git
cd Spendify/spendify-pro
```

---

### Step 2 — Install Dependencies

```bash
npm install
# or
pnpm install
```

---

### Step 3 — Configure Environment

Create a `.env.local` file in the `spendify-pro/` directory:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

---

### Step 4 — Run the Development Server

```bash
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### Step 5 — Build for Production

```bash
npm run build
npm run preview
```

---

## 🚀 Deployment

**GitHub Pages** *(as used in the live demo)*

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

**Vercel**

```bash
npm install -g vercel
vercel --prod
# Set VITE_ANTHROPIC_API_KEY in Vercel environment variables
```

**Netlify**

```bash
npm run build
# Publish dir: dist  |  Build command: npm run build
# Set VITE_ANTHROPIC_API_KEY in Netlify environment variables
```

---

## 🗺️ Roadmap

- [x] Dashboard with financial health score
- [x] Transaction manager with search & filters
- [x] Budget tracker with visual alerts
- [x] Savings goals with deposit tracking
- [x] AI financial advisor (context-aware chat)
- [x] AI-generated budget suggestions
- [x] Persistent local storage
- [ ] CSV / PDF export
- [ ] Bank account sync (Plaid / Setu integration)
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Recurring transaction detection
- [ ] Collaborative budgets (families & teams)

---

## 🤝 Contributing

Have an idea to make Spendify smarter?

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-idea`
3. Commit changes: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-idea`
5. Open a Pull Request

All contributions — big or small — are appreciated.

---

## 📄 License

Released under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0a1628,50:0d2d1f,100:0a1628&height=80&text=track%20more.%20spend%20less.%20save%20smarter.&fontSize=16&fontColor=34d399&fontAlignY=52" width="100%"/>

<br/>

Made with 🍵 by **[adi-with-tea](https://github.com/adi-with-tea)**

⭐ If Spendify helped you take control of your money — give it a star!

</div>
