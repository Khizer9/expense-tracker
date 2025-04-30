
import { Expense, ExpenseCategory } from "@/types/expense";
import { v4 as uuidv4 } from "uuid";

// Get current month and year
const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

// Helper function to create a date within the current month
const createDate = (day: number): string => {
  const date = new Date(currentYear, currentMonth, day);
  return date.toISOString();
};

// Helper function to create a date for previous month
const createPreviousMonthDate = (day: number): string => {
  const date = new Date(currentYear, currentMonth - 1, day);
  return date.toISOString();
};

// Create a default admin user ID for demo data
const demoUserId = "demo-user-001";

export const dummyExpenses: Expense[] = [
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 45.99,
    category: "Food",
    description: "Grocery shopping at Whole Foods",
    date: createDate(3)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 12.50,
    category: "Food",
    description: "Lunch at local cafe",
    date: createDate(5)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 1200,
    category: "Housing",
    description: "Monthly rent payment",
    date: createDate(1)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 65.40,
    category: "Transportation",
    description: "Gas fill-up",
    date: createDate(8)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 45.00,
    category: "Entertainment",
    description: "Movie tickets",
    date: createDate(12)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 129.99,
    category: "Utilities",
    description: "Internet bill",
    date: createDate(15)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 89.99,
    category: "Utilities",
    description: "Electricity bill",
    date: createDate(15)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 120.00,
    category: "Healthcare",
    description: "Doctor's appointment",
    date: createDate(18)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 35.50,
    category: "Personal",
    description: "Haircut",
    date: createDate(20)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 299.99,
    category: "Education",
    description: "Online course",
    date: createDate(22)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 19.99,
    category: "Entertainment",
    description: "Streaming service",
    date: createDate(2)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 50.00,
    category: "Other",
    description: "Gift for friend",
    date: createDate(25)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 32.45,
    category: "Food",
    description: "Takeout dinner",
    date: createDate(26)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 15.99,
    category: "Personal",
    description: "Toiletries",
    date: createDate(27)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 42.00,
    category: "Transportation",
    description: "Ride share",
    date: createDate(28)
  },
  // Previous month expenses
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 48.50,
    category: "Food",
    description: "Grocery shopping",
    date: createPreviousMonthDate(5)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 1200,
    category: "Housing",
    description: "Monthly rent payment",
    date: createPreviousMonthDate(1)
  },
  {
    id: uuidv4(),
    userId: demoUserId,
    amount: 75.40,
    category: "Transportation",
    description: "Gas fill-up",
    date: createPreviousMonthDate(10)
  }
];

export default dummyExpenses;
