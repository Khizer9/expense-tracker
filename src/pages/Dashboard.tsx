
import React from "react";
import ExpenseSummary from "@/components/dashboard/ExpenseSummary";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import RecentExpenses from "@/components/dashboard/RecentExpenses";
import AnalyticsCards from "@/components/dashboard/AnalyticsCards";
import MonthPicker from "@/components/expenses/MonthPicker";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>
        <MonthPicker />
      </div>
      
      <ExpenseSummary />
      
      <AnalyticsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart />
        <CategoryBreakdown />
      </div>
      
      <RecentExpenses />
    </div>
  );
};

export default Dashboard;
