import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { AppState, Budget, Category } from '../types';
import { CATEGORIES, CATEGORY_COLORS, formatCurrency, getBudgetUsage } from '../helpers';
import { PageHeader, Btn, Card, Input, Select, Modal, ProgressBar } from '../components/UI';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props { state: AppState; updateState: (p: Partial<AppState>) => void; }

export default function Budget({ state, updateState }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editBudget, setEditBudget] = useState<Budget | null>(null);
  const [form, setForm] = useState<Budget>({ category: 'Food & Dining', limit: 0 });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const usage = getBudgetUsage(state.transactions, state.budgets);

  const openEdit = (b: Budget) => { setEditBudget(b); setForm({ ...b }); setShowModal(true); };
  const openAdd = () => { setEditBudget(null); setForm({ category: 'Food & Dining', limit: 0 }); setShowModal(true); };

  const save = () => {
    if (!form.limit) return;
    if (editBudget) {
      updateState({ budgets: state.budgets.map(b => b.category === editBudget.category ? form : b) });
    } else {
      if (state.budgets.find(b => b.category === form.category)) return;
      updateState({ budgets: [...state.budgets, form] });
    }
    setShowModal(false);
  };

  const del = (cat: Category) => updateState({ budgets: state.budgets.filter(b => b.category !== cat) });

  const generateWithAI = async () => {
    setAiLoading(true); setAiError('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: 'You are a financial advisor. Respond ONLY with a valid JSON array of budget objects. No explanation, no markdown, just raw JSON.',
          messages: [{
            role: 'user',
            content: `Monthly income: ₹${state.monthlyIncome}. Create realistic budget limits for these categories as a JSON array: ${CATEGORIES.filter(c => c !== 'Income').join(', ')}. Format: [{"category":"...","limit":number}, ...]. Make them practical for Indian urban living.`,
          }],
        }),
      });
      const data = await res.json();
      const text = data.content[0].text.replace(/```json|```/g, '').trim();
      const budgets: Budget[] = JSON.parse(text);
      updateState({ budgets });
    } catch {
      setAiError('AI generation failed. Please check your API key in the code.');
    }
    setAiLoading(false);
  };

  const barData = {
    labels: usage.map(b => b.category),
    datasets: [
      { label: 'Budget', data: usage.map(b => b.limit), backgroundColor: 'rgba(124,106,255,0.3)', borderRadius: 6 },
      { label: 'Spent', data: usage.map(b => b.spent), backgroundColor: usage.map(b => b.percentage >= 90 ? 'rgba(255,107,107,0.8)' : b.percentage >= 70 ? 'rgba(255,209,102,0.8)' : 'rgba(0,212,170,0.7)'), borderRadius: 6 },
    ],
  };

  return (
    <div>
      <PageHeader
        title="Budget Planner"
        sub="Set limits, track spending"
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="secondary" onClick={generateWithAI} disabled={aiLoading}>
              {aiLoading ? '⟳ Generating...' : '✦ AI Generate'}
            </Btn>
            <Btn onClick={openAdd}>+ Add Budget</Btn>
          </div>
        }
      />

      {aiError && <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid var(--red)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 20, color: 'var(--red)', fontSize: '0.875rem' }}>{aiError}</div>}

      <Card style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Budget vs Actual</h3>
        <Bar data={barData} options={{
          responsive: true,
          plugins: { legend: { labels: { color: '#8888aa', font: { family: 'DM Sans' } } } },
          scales: {
            x: { ticks: { color: '#8888aa', maxRotation: 30 }, grid: { color: '#2a2a3a' } },
            y: { ticks: { color: '#8888aa', callback: (v: number | string) => `₹${Number(v)/1000}k` }, grid: { color: '#2a2a3a' } },
          },
        } as any} />
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {usage.map(b => (
          <Card key={b.category} style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 3 }}>{b.category}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>{formatCurrency(b.spent)} of {formatCurrency(b.limit)}</div>
              </div>
              <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem', color: b.percentage >= 90 ? 'var(--red)' : b.percentage >= 70 ? 'var(--yellow)' : 'var(--green)' }}>
                {Math.round(b.percentage)}%
              </div>
            </div>
            <ProgressBar value={b.percentage} color={CATEGORY_COLORS[b.category as Category]} />
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <Btn variant="ghost" style={{ flex: 1, padding: '7px', fontSize: '0.8rem' }} onClick={() => openEdit(b)}>Edit</Btn>
              <Btn variant="danger" style={{ flex: 1, padding: '7px', fontSize: '0.8rem' }} onClick={() => del(b.category as Category)}>Remove</Btn>
            </div>
          </Card>
        ))}
      </div>

      {showModal && (
        <Modal title={editBudget ? 'Edit Budget' : 'Add Budget'} onClose={() => setShowModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Select label="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}>
              {CATEGORIES.filter(c => c !== 'Income').map(c => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Monthly Limit (₹)" type="number" value={form.limit || ''} onChange={e => setForm(f => ({ ...f, limit: parseFloat(e.target.value) || 0 }))} placeholder="e.g. 8000" />
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <Btn onClick={save} style={{ flex: 1 }}>Save</Btn>
              <Btn variant="secondary" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
