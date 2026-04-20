import { useState } from 'react';
import { AppState, Transaction, Category } from '../types';
import { CATEGORIES, CATEGORY_COLORS, formatCurrency, formatDate, generateId } from '../helpers';
import { PageHeader, Btn, Card, Input, Select, Modal, Tag } from '../components/UI';

interface Props { state: AppState; updateState: (p: Partial<AppState>) => void; }

const empty = (): Omit<Transaction, 'id'> => ({
  amount: 0, category: 'Food & Dining', description: '',
  date: new Date().toISOString().split('T')[0], type: 'expense', notes: '',
});

export default function Transactions({ state, updateState }: Props) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [form, setForm] = useState(empty());

  const filtered = state.transactions
    .filter(t =>
      (filterCat === 'All' || t.category === filterCat) &&
      (filterType === 'All' || t.type === filterType) &&
      (t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const openAdd = () => { setEditing(null); setForm(empty()); setShowModal(true); };
  const openEdit = (t: Transaction) => {
    setEditing(t);
    setForm({ amount: t.amount, category: t.category, description: t.description, date: t.date.split('T')[0], type: t.type, notes: t.notes });
    setShowModal(true);
  };

  const save = () => {
    if (!form.description || !form.amount) return;
    if (editing) {
      updateState({ transactions: state.transactions.map(t => t.id === editing.id ? { ...t, ...form, date: new Date(form.date as string).toISOString() } : t) });
    } else {
      updateState({ transactions: [...state.transactions, { id: generateId(), ...form, date: new Date(form.date as string).toISOString() }] });
    }
    setShowModal(false);
  };

  const del = (id: string) => updateState({ transactions: state.transactions.filter(t => t.id !== id) });

  return (
    <div>
      <PageHeader
        title="Transactions"
        sub={`${filtered.length} records`}
        action={<Btn onClick={openAdd}>+ Add Transaction</Btn>}
      />

      {/* Filters */}
      <Card style={{ marginBottom: 20, padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '9px 14px', color: 'var(--text)', outline: 'none', flex: 1, minWidth: 180 }}
          />
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '9px 14px', color: 'var(--text)' }}>
            <option>All</option><option value="income">Income</option><option value="expense">Expense</option>
          </select>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '9px 14px', color: 'var(--text)' }}>
            <option>All</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Date', 'Description', 'Category', 'Type', 'Amount', ''].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text2)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: 'var(--text2)' }}>No transactions found</td></tr>
            )}
            {filtered.map((t, i) => (
              <tr key={t.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '14px 20px', fontSize: '0.85rem', color: 'var(--text2)' }}>{formatDate(t.date)}</td>
                <td style={{ padding: '14px 20px', fontSize: '0.9rem', fontWeight: 500 }}>
                  {t.description}
                  {t.notes && <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: 2 }}>{t.notes}</div>}
                </td>
                <td style={{ padding: '14px 20px' }}><Tag color={CATEGORY_COLORS[t.category]}>{t.category}</Tag></td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: t.type === 'income' ? 'var(--green)' : 'var(--text2)' }}>
                    {t.type === 'income' ? '↑' : '↓'} {t.type}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', fontFamily: 'Syne', fontWeight: 700, color: t.type === 'income' ? 'var(--green)' : 'var(--red)' }}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Btn variant="ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => openEdit(t)}>Edit</Btn>
                    <Btn variant="danger" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => del(t.id)}>Del</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {showModal && (
        <Modal title={editing ? 'Edit Transaction' : 'Add Transaction'} onClose={() => setShowModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn variant={form.type === 'expense' ? 'primary' : 'secondary'} onClick={() => setForm(f => ({ ...f, type: 'expense' }))} style={{ flex: 1 }}>Expense</Btn>
              <Btn variant={form.type === 'income' ? 'primary' : 'secondary'} onClick={() => setForm(f => ({ ...f, type: 'income' }))} style={{ flex: 1 }}>Income</Btn>
            </div>
            <Input label="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Grocery shopping" />
            <Input label="Amount (₹)" type="number" value={form.amount || ''} onChange={e => setForm(f => ({ ...f, amount: parseFloat(e.target.value) || 0 }))} placeholder="0" />
            <Select label="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Date" type="date" value={form.date as string} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            <Input label="Notes (optional)" value={form.notes || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any additional details..." />
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
