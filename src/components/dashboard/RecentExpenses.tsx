
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/context/ExpenseContext";
import { format } from "date-fns";

const RecentExpenses: React.FC = () => {
  const { filteredExpenses } = useExpenses();
  
  // Get the 5 most recent expenses
  const recentExpenses = [...filteredExpenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {recentExpenses.length > 0 ? (
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <div className="font-medium">{expense.description}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>{expense.category}</span>
                    <span>•</span>
                    <span>{format(new Date(expense.date), "MMM d")}</span>
                  </div>
                </div>
                <div className="text-lg font-semibold">PKR {expense.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No expenses found for the selected month
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
