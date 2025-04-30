
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ChartBar, PieChart } from "lucide-react";
import { useExpenses } from "@/context/ExpenseContext";

const AnalyticsCards: React.FC = () => {
  const { filteredExpenses, summary } = useExpenses();
  
  // Calculate month-over-month growth (dummy data for now)
  const monthOverMonthGrowth = -12.5; // Representing a 12.5% decrease
  
  // Find highest expense category
  const highestCategory = Object.entries(summary.categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
  
  // Calculate average expense per day (for days that have expenses)
  const uniqueDays = new Set(filteredExpenses.map(expense => 
    new Date(expense.date).toISOString().split('T')[0]
  )).size;
  
  const avgPerDay = uniqueDays ? (summary.totalAmount / uniqueDays).toFixed(2) : "0.00";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-purple-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Month-over-Month</p>
              <h3 className="text-2xl font-bold mt-1">{Math.abs(monthOverMonthGrowth)}%</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {monthOverMonthGrowth >= 0 ? 'Increase' : 'Decrease'} from last month
              </p>
            </div>
            <div className={`p-2 rounded-full ${monthOverMonthGrowth >= 0 ? 'bg-red-100' : 'bg-green-100'}`}>
              {monthOverMonthGrowth >= 0 ? 
                <TrendingUp className={`h-5 w-5 ${monthOverMonthGrowth >= 0 ? 'text-red-500' : 'text-green-500'}`} /> : 
                <TrendingDown className={`h-5 w-5 ${monthOverMonthGrowth >= 0 ? 'text-red-500' : 'text-green-500'}`} />
              }
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Top Category</p>
              <h3 className="text-2xl font-bold mt-1">{highestCategory}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                ${summary.categoryTotals[highestCategory as keyof typeof summary.categoryTotals]?.toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="p-2 rounded-full bg-purple-100">
              <PieChart className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Daily Average</p>
              <h3 className="text-2xl font-bold mt-1">${avgPerDay}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                On days with expenses
              </p>
            </div>
            <div className="p-2 rounded-full bg-blue-100">
              <ChartBar className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCards;
