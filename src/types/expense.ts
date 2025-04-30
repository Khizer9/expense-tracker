
export type ExpenseCategory = 
  | "Food" 
  | "Housing" 
  | "Transportation" 
  | "Entertainment" 
  | "Utilities" 
  | "Healthcare" 
  | "Personal" 
  | "Education" 
  | "Other";

export interface Expense {
  id: string;
  userId: string; // Added userId to associate expenses with users
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string; // ISO date string
}

export interface ExpenseSummary {
  totalAmount: number;
  categoryTotals: Record<ExpenseCategory, number>;
  expenseCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
