import { useState } from 'react';
import { AppState, Goal } from '../types';
import { formatCurrency, generateId } from '../helpers';
import { PageHeader, Btn, Card, Input, Modal, ProgressBar } from '../components/UI';

interface Props { state: AppState; updateState: (p: Partial<AppState>) => void; }

const COLORS = ['#7c6aff', '#00d4aa', '#ffd166', '#ff6b6b', '#4361ee', '#06d6a0'];

const emptyGoal = (): Omit<Goal, 'id'> => ({
  name: '', targetAmount: 0, currentAmount: 0,
  targetDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
  color: COLORS[0],
});

export default function Goals({ state, updateState }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Goal | null>(null);
  const [form, setForm] = useState(emptyGoal());
  const [deposit, setDeposit] = useState<{ id: string; amount: number } | null>(null);

  const openAdd = () => { setEditing(null); setForm(emptyGoal()); setShowModal(true); };
  const openEdit = (g: Goal) => { setEditing(g); setForm({ name: g.name, targetAmount: g.targetAmount, currentAmount: g.currentAmount, targetDate: g.targetDate.split('T')[0], color: g.color }); setShowModal(true); };

  const save = () => {
    if (!form.name || !form.targetAmount) return;
    if (editing) {
      updateState({ goals: state.goals.map(g => g.id === editing.id ? { ...g, ...form, targetDate: new Date(form.targetDate as string).toISOString() } : g) });
    } else {
      updateState({ goals: [...state.goals, { id: generateId(), ...form, targetDate: new Date(form.targetDate as string).toISOString() }] });
    }
    setShowModal(false);
  };

  const del = (id: string) => updateState({ goals: state.goals.filter(g => g.id !== id) });

  const addDeposit = () => {
    if (!deposit) return;
    updateState({
      goals: state.goals.map(g => g.id === deposit.id
        ? { ...g, currentAmount: Math.min(g.currentAmount + deposit.amount, g.targetAmount) }
        : g)
    });
    setDeposit(null);
  };

  const daysLeft = (iso: string) => Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));
  const monthsLeft = (iso: string) => Math.max(1, Math.ceil(daysLeft(iso) / 30));

  return (
    <div>
      <PageHeader
        title="Savings Goals"
        sub="Track progress toward your goals"
        action={<Btn onClick={openAdd}>+ New Goal</Btn>}
      />

      {state.goals.length === 0 && (
        <Card style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>◈</div>
          <p style={{ color: 'var(--text2)', marginBottom: 16 }}>No goals yet. Create your first savings goal!</p>
          <Btn onClick={openAdd}>Create Goal</Btn>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {state.goals.map(g => {
          const pct = Math.round((g.currentAmount / g.targetAmount) * 100);
          const remaining = g.targetAmount - g.currentAmount;
          const monthlyNeeded = remaining / monthsLeft(g.targetDate);
          return (
            <Card key={g.id} style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${g.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  ◈
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem' }}>{g.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{daysLeft(g.targetDate)} days left</div>
                </div>
                <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.25rem', color: g.color }}>{pct}%</div>
              </div>

              <ProgressBar value={pct} color={g.color} />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Saved</div>
                  <div style={{ fontFamily: 'Syne', fontWeight: 700 }}>{formatCurrency(g.currentAmount)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Target</div>
                  <div style={{ fontFamily: 'Syne', fontWeight: 700 }}>{formatCurrency(g.targetAmount)}</div>
                </div>
              </div>

              <div style={{ background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 16, fontSize: '0.82rem', color: 'var(--text2)' }}>
                Save <strong style={{ color: g.color }}>{formatCurrency(monthlyNeeded)}/month</strong> to reach goal on time
              </div>

              {deposit?.id === g.id ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="number" placeholder="Amount ₹"
                    value={deposit.amount || ''}
                    onChange={e => setDeposit({ id: g.id, amount: parseFloat(e.target.value) || 0 })}
                    style={{ flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '9px 12px', color: 'var(--text)', outline: 'none' }}
                  />
                  <Btn onClick={addDeposit}>Add</Btn>
                  <Btn variant="ghost" onClick={() => setDeposit(null)}>✕</Btn>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn style={{ flex: 1, background: `${g.color}22`, color: g.color, border: `1px solid ${g.color}`, padding: '8px' }} onClick={() => setDeposit({ id: g.id, amount: 0 })}>+ Deposit</Btn>
                  <Btn variant="ghost" style={{ padding: '8px 14px' }} onClick={() => openEdit(g)}>Edit</Btn>
                  <Btn variant="danger" style={{ padding: '8px 14px' }} onClick={() => del(g.id)}>Del</Btn>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {showModal && (
        <Modal title={editing ? 'Edit Goal' : 'New Goal'} onClose={() => setShowModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Goal Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Europe Trip" />
            <Input label="Target Amount (₹)" type="number" value={form.targetAmount || ''} onChange={e => setForm(f => ({ ...f, targetAmount: parseFloat(e.target.value) || 0 }))} placeholder="e.g. 200000" />
            <Input label="Already Saved (₹)" type="number" value={form.currentAmount || ''} onChange={e => setForm(f => ({ ...f, currentAmount: parseFloat(e.target.value) || 0 }))} placeholder="0" />
            <Input label="Target Date" type="date" value={form.targetDate as string} onChange={e => setForm(f => ({ ...f, targetDate: e.target.value }))} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text2)', fontWeight: 600, marginBottom: 8 }}>Color</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: form.color === c ? '3px solid white' : '3px solid transparent', cursor: 'pointer' }} />
                ))}
              </div>
            </div>
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
