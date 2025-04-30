import React, { createContext, useState, useEffect, useContext } from "react";
import { Expense } from "@/types/expense";
import { toast } from "sonner";
import { useUser } from "./UserContext";
import { ExpenseContextType, defaultSummary } from "./ExpenseContextTypes";
import { filterExpensesByDate, generateExpenseSummary, exportExpensesToCSV } from "@/utils/expenseUtils";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client using environment variables
const supabaseUrl = "https://jobeevifnmnyfvqztxhv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYmVldmlmbm1ueWZ2cXp0eGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTQwNjQsImV4cCI6MjA2MTU3MDA2NH0.in0-CC1F576SLhFLtFm1h_GEWAA7qgbYZRvllXgPeB8";
const supabase = createClient(supabaseUrl, supabaseKey);

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentFilter, setCurrentFilter] = useState(() => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  });
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState(defaultSummary);

  // Fetch expenses from Supabase
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!currentUser || !currentUser.id) return; // Ensure currentUser and id exist
      const { data, error } = await supabase
        .from("expense") // Updated table name
        .select("*")
        .eq("userId", currentUser.id);
      if (error) {
        console.error("Error fetching expenses:", error);
        return;
      }
      setExpenses(data || []);
    };
    fetchExpenses();
  }, [currentUser]);

  // Apply filters when expenses or filter change
  useEffect(() => {
    const filtered = filterExpensesByDate(
      expenses,
      currentUser?.id,
      currentFilter.month,
      currentFilter.year
    );
    setFilteredExpenses(filtered);
    setSummary(generateExpenseSummary(filtered));
  }, [expenses, currentFilter, currentUser]);

  // Add a new expense
  const addExpense = async (expense: Omit<Expense, "id" | "userId">) => {
    if (!currentUser || !currentUser.id) {
      console.error("User is not authenticated:", currentUser); // Debugging log
      toast.error("You must be logged in to add expenses");
      return;
    }
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
      userId: currentUser.id,
    };
    const { error } = await supabase.from("expense").insert(newExpense);
    if (error) {
      console.error("Error adding expense:", error); // Debugging log
      toast.error("Failed to add expense");
      return;
    }
    setExpenses(prev => [...prev, newExpense]);
    toast.success("Expense added successfully");
  };

  // Delete an expense
  const deleteExpense = async (id: string) => {
    if (!currentUser || !currentUser.id) { // Ensure currentUser and id exist
      toast.error("You must be logged in to delete expenses");
      return;
    }
    const { error } = await supabase
      .from("expense") // Updated table name
      .delete()
      .eq("id", id)
      .eq("userId", currentUser.id);
    if (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
      return;
    }
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.info("Expense deleted");
  };

  // Update an expense
  const updateExpense = async (id: string, updatedData: Partial<Omit<Expense, "id" | "userId">>) => {
    if (!currentUser || !currentUser.id) { // Ensure currentUser and id exist
      toast.error("You must be logged in to update expenses");
      return;
    }
    const { error } = await supabase
      .from("expense") // Updated table name
      .update(updatedData)
      .eq("id", id)
      .eq("userId", currentUser.id);
    if (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense");
      return;
    }
    setExpenses(prev =>
      prev.map(expense =>
        expense.id === id ? { ...expense, ...updatedData } : expense
      )
    );
    toast.success("Expense updated");
  };

  // Set filter for month and year
  const setFilter = (month: number, year: number) => {
    setCurrentFilter({ month, year });
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!currentUser) {
      toast.error("You must be logged in to export expenses");
      return;
    }
    exportExpensesToCSV(filteredExpenses, currentFilter.month, currentFilter.year);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        filteredExpenses,
        setFilter,
        currentFilter,
        summary,
        exportToCSV,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within ExpenseProvider");
  }
  return context;
};
