
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/context/ExpenseContext";
import { CalendarDays, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExpenseSummary: React.FC = () => {
  const { summary, currentFilter, exportToCSV } = useExpenses();
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const monthName = monthNames[currentFilter.month];
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {monthName} {currentFilter.year} Summary
        </CardTitle>
        <Button
          onClick={exportToCSV}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export CSV</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stat-card">
            <span className="stat-value">PKR{summary.totalAmount.toFixed(2)}</span>
            <span className="stat-label">Total Expenses</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{summary.expenseCount}</span>
            <span className="stat-label">Expense Count</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              PKR{summary.expenseCount > 0 
                ? (summary.totalAmount / summary.expenseCount).toFixed(2) 
                : "0.00"}
            </span>
            <span className="stat-label">Average Expense</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
