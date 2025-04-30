
import { Expense, ExpenseCategory, ExpenseSummary } from "@/types/expense";

export interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id" | "userId">) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Omit<Expense, "id" | "userId">>) => void;
  filteredExpenses: Expense[];
  setFilter: (month: number, year: number) => void;
  currentFilter: { month: number; year: number };
  summary: ExpenseSummary;
  exportToCSV: () => void;
}

export const defaultSummary: ExpenseSummary = {
  totalAmount: 0,
  categoryTotals: {
    Food: 0,
    Housing: 0,
    Transportation: 0,
    Entertainment: 0,
    Utilities: 0,
    Healthcare: 0,
    Personal: 0,
    Education: 0,
    Other: 0,
  },
  expenseCount: 0,
};
