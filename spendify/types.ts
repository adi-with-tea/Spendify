
export interface SavingsGoal {
  name: string;
  target: number;
  current: number;
}

export interface BudgetItem {
  category: string;
  allocated: number;
  spent: number;
}
