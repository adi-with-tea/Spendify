<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0a1628,50:0d2d1f,100:0a1628&height=180&text=💸%20Spendify&fontSize=62&fontColor=34d399&fontAlignY=52&desc=Your%20AI-Powered%20Personal%20Finance%20Co-pilot&descColor=94a3b8&descAlignY=72&descSize=18" width="100%"/>

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-96%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Agentic AI](https://img.shields.io/badge/Agentic-AI%20Powered-34d399?style=for-the-badge&logo=openai&logoColor=white)](https://github.com/adi-with-tea/Spendify)
[![Next.js](https://img.shields.io/badge/Next.js-Framework-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Status](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge)](https://github.com/adi-with-tea/Spendify)

<br/>

![Finance](https://img.shields.io/badge/💰-Expense%20Analysis-0f766e?style=flat-square)
![Investments](https://img.shields.io/badge/📈-Investment%20Planning-0284c7?style=flat-square)
![AI Insights](https://img.shields.io/badge/🤖-Smart%20AI%20Insights-7c3aed?style=flat-square)
![Minimal UI](https://img.shields.io/badge/🎨-Minimal%20Design-db2777?style=flat-square)

<br/>

```
Analyze  →  Optimize  →  Grow
```

*A modern, minimal, and intelligent finance platform powered by Agentic AI.*
*Upload your expenses. Let the AI do the thinking.*

<br/>

</div>

---

## 📸 Screenshots

<div align="center">

| Dashboard Overview | AI Insights Panel |
|:-:|:-:|
| ![Dashboard](screenshots/dashboard.png) | ![AI Insights](screenshots/ai_insights.png) |

| Expense Breakdown | Investment Planner |
|:-:|:-:|
| ![Expenses](screenshots/expenses.png) | ![Investments](screenshots/investments.png) |

</div>

> 💡 *Add your screenshots to a `screenshots/` folder — filenames: `dashboard.png`, `ai_insights.png`, `expenses.png`, `investments.png`.*

---

## 🤖 Agentic AI — How It Works

Spendify doesn't just show you charts. It **acts** on your behalf through a pipeline of intelligent agents:

```
┌─────────────────────────────────────────────────────────────┐
│                     SPENDIFY AI PIPELINE                    │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  📥 Ingest   │  🔍 Analyze  │  💡 Optimize │  📊 Plan       │
│              │              │              │                │
│  Parse your  │  Categorize  │  Spot waste, │  Generate      │
│  financial   │  spending    │  suggest     │  investment    │
│  data        │  patterns    │  cuts        │  strategies    │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

Each stage is handled by a dedicated AI agent — no hardcoded rules, just intelligent reasoning adapted to *your* financial picture.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧠 Intelligence
- **Agentic AI Core** — multi-step reasoning, not just prediction
- **Smart Categorization** — auto-tags every transaction
- **Anomaly Detection** — flags unusual spending instantly
- **Natural Language Q&A** — ask your finances anything

</td>
<td width="50%">

### 📊 Analytics
- **Expense Breakdown** — visual spend-by-category charts
- **Month-over-Month Trends** — track your financial trajectory
- **Budget Alerts** — proactive overspend warnings
- **Net Worth Tracker** — holistic financial health view

</td>
</tr>
<tr>
<td width="50%">

### 📈 Planning
- **Investment Suggestions** — tailored to your risk appetite
- **Goal Setting** — define targets, track progress
- **Savings Forecasting** — project your financial future
- **Tax Optimization Tips** — smarter year-end planning

</td>
<td width="50%">

### 🎨 Experience
- **Minimal, Clean UI** — no clutter, just clarity
- **Fully Responsive** — desktop and mobile ready
- **Fast & Type-Safe** — built end-to-end in TypeScript
- **Privacy First** — your data stays yours

</td>
</tr>
</table>

---

## 🗂️ Project Structure

```
Spendify/
└── spendify/
    ├── app/
    │   ├── page.tsx              # Landing page
    │   ├── dashboard/
    │   │   └── page.tsx          # Main dashboard
    │   ├── expenses/
    │   │   └── page.tsx          # Expense tracker
    │   └── investments/
    │       └── page.tsx          # Investment planner
    ├── components/
    │   ├── ui/                   # Reusable UI components
    │   ├── charts/               # Data visualization
    │   └── ai/                   # AI insight panels
    ├── lib/
    │   ├── agents/               # Agentic AI logic
    │   ├── parsers/              # Financial data parsers
    │   └── utils.ts              # Shared utilities
    ├── public/                   # Static assets
    └── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** v18 or higher
- **npm** or **pnpm** *(pnpm recommended for speed)*
- An AI API key — [OpenAI](https://platform.openai.com/) or compatible provider

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/adi-with-tea/Spendify.git
cd Spendify/spendify
```

---

### Step 2 — Install Dependencies

```bash
# Using npm
npm install

# Using pnpm (faster)
pnpm install
```

---

### Step 3 — Configure Environment

Create a `.env.local` file in the `spendify/` directory:

```env
# AI Provider
OPENAI_API_KEY=your_openai_api_key_here

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Step 4 — Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

### Step 5 — Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Language | TypeScript | End-to-end type safety |
| Framework | Next.js (App Router) | Full-stack React framework |
| Styling | Tailwind CSS | Utility-first design system |
| AI Engine | Agentic AI (LLM-based) | Financial reasoning & insights |
| Charts | Recharts / Chart.js | Data visualization |
| Markup | HTML5 | Semantic structure |

---

## 🚀 Deployment

**Vercel** *(recommended — zero config for Next.js)*

```bash
npm install -g vercel
vercel --prod
```

**Netlify**
```bash
npm run build
# Publish: spendify/.next  |  Build cmd: npm run build
```

**Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🗺️ Roadmap

- [x] Core expense analysis engine
- [x] AI-powered financial insights
- [x] Investment planning module
- [ ] Bank account sync (Plaid integration)
- [ ] Mobile app (React Native)
- [ ] Multi-currency support
- [ ] Collaborative budgets (families & teams)
- [ ] Export reports to PDF / CSV

---

## 🤝 Contributing

Have an idea to make Spendify smarter?

1. Fork the repo
2. Create your branch: `git checkout -b feature/smarter-agent`
3. Commit changes: `git commit -m "Improve investment suggestion agent"`
4. Push: `git push origin feature/smarter-agent`
5. Open a Pull Request

All contributions — big or small — are appreciated.

---

## 📄 License

Released under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0a1628,50:0d2d1f,100:0a1628&height=80&text=spend%20less.%20save%20more.%20invest%20smarter.&fontSize=16&fontColor=34d399&fontAlignY=52" width="100%"/>

<br/>

Made with 🍵 by **[adi-with-tea](https://github.com/adi-with-tea)**

⭐ If Spendify helped you think about money differently — give it a star!

</div>
