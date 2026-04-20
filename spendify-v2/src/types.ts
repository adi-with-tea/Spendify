export type Category =
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Health'
  | 'Utilities'
  | 'Rent'
  | 'Income'
  | 'Education'
  | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string; // ISO string
  type: 'income' | 'expense';
  notes?: string;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  color: string;
}

export interface AppState {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  monthlyIncome: number;
}

export type Page = 'dashboard' | 'transactions' | 'budget' | 'goals' | 'ai';
