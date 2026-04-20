import { useState, useEffect } from 'react';
import { AppState, Page } from './types';
import { SEED_TRANSACTIONS, SEED_BUDGETS, SEED_GOALS } from './helpers';
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import AIAgent from './pages/AIAgent';

const STORAGE_KEY = 'spendify_v2_data';

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    transactions: SEED_TRANSACTIONS,
    budgets: SEED_BUDGETS,
    goals: SEED_GOALS,
    monthlyIncome: 75000,
  };
}

export default function App() {
  const [state, setState] = useState<AppState>(loadState);
  const [page, setPage] = useState<Page>('dashboard');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (partial: Partial<AppState>) =>
    setState(prev => ({ ...prev, ...partial }));

  const pages: Record<Page, JSX.Element> = {
    dashboard: <Dashboard state={state} />,
    transactions: <Transactions state={state} updateState={updateState} />,
    budget: <Budget state={state} updateState={updateState} />,
    goals: <Goals state={state} updateState={updateState} />,
    ai: <AIAgent state={state} />,
  };

  return (
    <div className="app-layout">
      <Nav current={page} onNavigate={setPage} />
      <main className="main-content">
        {pages[page]}
      </main>
    </div>
  );
}
