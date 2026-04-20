import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title,
} from 'chart.js';
import { AppState } from '../types';
import {
  getCurrentMonthTransactions, getTotalExpenses, getTotalIncome,
  getExpensesByCategory, getLast6MonthsData, getBudgetUsage,
  formatCurrency, CATEGORY_COLORS,
} from '../helpers';
import { StatCard, Card, PageHeader, ProgressBar } from '../components/UI';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Dashboard({ state }: { state: AppState }) {
  const monthTx = getCurrentMonthTransactions(state.transactions);
  const income = getTotalIncome(monthTx);
  const expenses = getTotalExpenses(monthTx);
  const savings = income - expenses;
  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
  const catExpenses = getExpensesByCategory(monthTx);
  const trend = getLast6MonthsData(state.transactions);
  const budgetUsage = getBudgetUsage(state.transactions, state.budgets);

  const healthScore = Math.min(100, Math.max(0,
    (savingsRate >= 20 ? 30 : savingsRate * 1.5) +
    (budgetUsage.filter(b => b.percentage < 80).length / Math.max(budgetUsage.length, 1)) * 40 +
    (state.goals.length > 0 ? 20 : 0) +
    10
  ));

  const donutData = {
    labels: Object.keys(catExpenses),
    datasets: [{
      data: Object.values(catExpenses),
      backgroundColor: Object.keys(catExpenses).map(c => CATEGORY_COLORS[c as keyof typeof CATEGORY_COLORS] || '#8888aa'),
      borderWidth: 0,
    }],
  };

  const barData = {
    labels: trend.map(t => t.label),
    datasets: [
      { label: 'Income', data: trend.map(t => t.income), backgroundColor: 'rgba(0,212,170,0.7)', borderRadius: 6 },
      { label: 'Expenses', data: trend.map(t => t.expenses), backgroundColor: 'rgba(255,107,107,0.7)', borderRadius: 6 },
    ],
  };

  const chartOpts = {
    responsive: true,
    plugins: { legend: { labels: { color: '#8888aa', font: { family: 'DM Sans' } } } },
    scales: {
      x: { ticks: { color: '#8888aa' }, grid: { color: '#2a2a3a' } },
      y: { ticks: { color: '#8888aa', callback: (v: number | string) => `₹${Number(v)/1000}k` }, grid: { color: '#2a2a3a' } },
    },
  };

  return (
    <div>
      <PageHeader title="Dashboard" sub={`Financial overview · ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Monthly Income" value={formatCurrency(income)} color="var(--green)" />
        <StatCard label="Expenses" value={formatCurrency(expenses)} color="var(--red)" />
        <StatCard label="Savings" value={formatCurrency(savings)} color={savings >= 0 ? 'var(--green)' : 'var(--red)'} />
        <StatCard label="Savings Rate" value={`${savingsRate}%`} sub={savingsRate >= 20 ? '✓ On track' : 'Aim for 20%+'} color="var(--accent)" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 24 }}>
        <Card>
          <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Spending by Category</h3>
          {Object.keys(catExpenses).length > 0 ? (
            <Doughnut data={donutData} options={{ responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#8888aa', font: { family: 'DM Sans' }, boxWidth: 12 } } }, cutout: '65%' }} />
          ) : <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>No expenses this month</p>}
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>6-Month Trend</h3>
          <Bar data={barData} options={chartOpts as any} />
        </Card>
      </div>

      {/* Health score + Budget */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        <Card>
          <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 20, fontSize: '0.95rem' }}>Financial Health</h3>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface2)" strokeWidth="12" />
                <circle cx="60" cy="60" r="50" fill="none"
                  stroke={healthScore >= 70 ? 'var(--green)' : healthScore >= 40 ? 'var(--yellow)' : 'var(--red)'}
                  strokeWidth="12"
                  strokeDasharray={`${(healthScore / 100) * 314} 314`}
                  strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.5rem' }}>{Math.round(healthScore)}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>/ 100</span>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: healthScore >= 70 ? 'var(--green)' : healthScore >= 40 ? 'var(--yellow)' : 'var(--red)', fontWeight: 600 }}>
            {healthScore >= 70 ? '✓ Healthy' : healthScore >= 40 ? '⚠ Needs Attention' : '✗ At Risk'}
          </p>
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Budget Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {budgetUsage.slice(0, 5).map(b => (
              <div key={b.category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem' }}>
                  <span>{b.category}</span>
                  <span style={{ color: 'var(--text2)' }}>{formatCurrency(b.spent)} / {formatCurrency(b.limit)}</span>
                </div>
                <ProgressBar value={b.percentage} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
