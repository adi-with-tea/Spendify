import { Transaction, Budget, Goal, Category } from './types';

export const CATEGORIES: Category[] = [
  'Food & Dining','Transport','Shopping','Entertainment',
  'Health','Utilities','Rent','Income','Education','Other'
];

export const CATEGORY_COLORS: Record<Category, string> = {
  'Food & Dining': '#ff6b6b',
  'Transport': '#7c6aff',
  'Shopping': '#ffd166',
  'Entertainment': '#06d6a0',
  'Health': '#00d4aa',
  'Utilities': '#4ecdc4',
  'Rent': '#f72585',
  'Income': '#00d4aa',
  'Education': '#4361ee',
  'Other': '#8888aa',
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

export function getCurrentMonthTransactions(transactions: Transaction[]): Transaction[] {
  const now = new Date();
  return transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
}

export function getExpensesByCategory(transactions: Transaction[]): Record<string, number> {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
}

export function getBudgetUsage(transactions: Transaction[], budgets: Budget[]) {
  const expenses = getExpensesByCategory(getCurrentMonthTransactions(transactions));
  return budgets.map(b => ({
    ...b,
    spent: expenses[b.category] || 0,
    percentage: Math.min(((expenses[b.category] || 0) / b.limit) * 100, 100),
  }));
}

export function getLast6MonthsData(transactions: Transaction[]) {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString('en-IN', { month: 'short' });
    const monthTx = transactions.filter(t => {
      const td = new Date(t.date);
      return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
    });
    months.push({
      label,
      income: getTotalIncome(monthTx),
      expenses: getTotalExpenses(monthTx),
    });
  }
  return months;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const SEED_TRANSACTIONS: Transaction[] = [
  { id: '1', amount: 75000, category: 'Income', description: 'Monthly Salary', date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(), type: 'income' },
  { id: '2', amount: 22000, category: 'Rent', description: 'Apartment Rent', date: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString(), type: 'expense' },
  { id: '3', amount: 4200, category: 'Food & Dining', description: 'Groceries - DMart', date: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(), type: 'expense' },
  { id: '4', amount: 899, category: 'Entertainment', description: 'Netflix + Hotstar', date: new Date(new Date().getFullYear(), new Date().getMonth(), 6).toISOString(), type: 'expense' },
  { id: '5', amount: 1500, category: 'Transport', description: 'Ola/Uber + Metro', date: new Date(new Date().getFullYear(), new Date().getMonth(), 8).toISOString(), type: 'expense' },
  { id: '6', amount: 2800, category: 'Food & Dining', description: 'Zomato orders', date: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString(), type: 'expense' },
  { id: '7', amount: 3500, category: 'Shopping', description: 'Clothes - Myntra', date: new Date(new Date().getFullYear(), new Date().getMonth(), 12).toISOString(), type: 'expense' },
  { id: '8', amount: 1200, category: 'Health', description: 'Gym Membership', date: new Date(new Date().getFullYear(), new Date().getMonth(), 14).toISOString(), type: 'expense' },
  { id: '9', amount: 2200, category: 'Utilities', description: 'Electricity + Internet', date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(), type: 'expense' },
  { id: '10', amount: 5000, category: 'Income', description: 'Freelance Project', date: new Date(new Date().getFullYear(), new Date().getMonth(), 16).toISOString(), type: 'income' },
];

export const SEED_BUDGETS = [
  { category: 'Food & Dining' as Category, limit: 8000 },
  { category: 'Transport' as Category, limit: 3000 },
  { category: 'Shopping' as Category, limit: 5000 },
  { category: 'Entertainment' as Category, limit: 2000 },
  { category: 'Health' as Category, limit: 2500 },
  { category: 'Utilities' as Category, limit: 3000 },
];

export const SEED_GOALS: Goal[] = [
  { id: 'g1', name: 'Emergency Fund', targetAmount: 150000, currentAmount: 45000, targetDate: new Date(new Date().getFullYear() + 1, 5, 1).toISOString(), color: '#7c6aff' },
  { id: 'g2', name: 'Europe Trip', targetAmount: 200000, currentAmount: 32000, targetDate: new Date(new Date().getFullYear() + 1, 11, 1).toISOString(), color: '#00d4aa' },
  { id: 'g3', name: 'MacBook Pro', targetAmount: 180000, currentAmount: 60000, targetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 8, 1).toISOString(), color: '#ffd166' },
];
