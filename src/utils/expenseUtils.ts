
import { Expense, ExpenseCategory, ExpenseSummary } from "@/types/expense";
import { defaultSummary } from "@/context/ExpenseContextTypes";
import { toast } from "sonner";

/**
 * Filter expenses by user ID and date (month/year)
 */
export const filterExpensesByDate = (
  expenses: Expense[],
  userId: string | undefined,
  month: number, 
  year: number
): Expense[] => {
  const userExpenses = userId 
    ? expenses.filter(expense => expense.userId === userId)
    : [];
    
  return userExpenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === month &&
      expenseDate.getFullYear() === year
    );
  });
};

/**
 * Generate expense summary from filtered expenses
 */
export const generateExpenseSummary = (filteredExpenses: Expense[]): ExpenseSummary => {
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = {...defaultSummary.categoryTotals};
  
  filteredExpenses.forEach(expense => {
    categoryTotals[expense.category] += expense.amount;
  });
  
  return {
    totalAmount,
    categoryTotals,
    expenseCount: filteredExpenses.length
  };
};

/**
 * Generate and download CSV from expenses
 */
export const exportExpensesToCSV = (
  filteredExpenses: Expense[], 
  month: number, 
  year: number
): void => {
  if (filteredExpenses.length === 0) {
    toast.error("No expenses to export");
    return;
  }

  // CSV header
  const headers = ["Date", "Category", "Description", "Amount"];
  
  // Format expenses for CSV
  const csvContent = filteredExpenses.map(expense => {
    const date = new Date(expense.date).toLocaleDateString();
    return `"${date}","${expense.category}","${expense.description}",${expense.amount}`;
  });
  
  // Combine header and rows
  const csv = [headers.join(","), ...csvContent].join("\n");
  
  // Create download link
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  // Setup download link
  const monthName = new Date(0, month).toLocaleString('default', { month: 'long' });
  link.setAttribute("href", url);
  link.setAttribute("download", `expenses_${monthName}_${year}.csv`);
  link.style.visibility = "hidden";
  
  // Trigger download and cleanup
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("Expenses exported to CSV");
};
