import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ChartBar, PieChart } from "lucide-react";
import { useExpenses } from "@/context/ExpenseContext";

const AnalyticsCards: React.FC = () => {
  const { filteredExpenses, summary } = useExpenses();

  // Calculate month-over-month growth dynamically
  const currentMonth = new Date().getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const currentMonthExpenses = filteredExpenses.filter(
    (expense) => new Date(expense.date).getMonth() === currentMonth
  ).reduce((sum, expense) => sum + expense.amount, 0);

  const previousMonthExpenses = filteredExpenses.filter(
    (expense) => new Date(expense.date).getMonth() === previousMonth
  ).reduce((sum, expense) => sum + expense.amount, 0);

  const monthOverMonthGrowth = previousMonthExpenses
    ? ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100
    : 0;

  // Find highest expense category dynamically
  const highestCategory = Object.entries(summary.categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  // Calculate average expense per day dynamically
  const uniqueDays = new Set(filteredExpenses.map(expense =>
    new Date(expense.date).toISOString().split('T')[0]
  )).size;

  const avgPerDay = uniqueDays ? (summary.totalAmount / uniqueDays).toFixed(2) : "0.00";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Month-over-Month Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Month-over-Month</p>
              <h3 className="text-2xl font-bold mt-1 dark:text-white">{Math.abs(parseFloat(monthOverMonthGrowth.toFixed(2)))}%</h3>
              <p className="text-sm text-muted-foreground mt-1 dark:text-gray-400">
                {monthOverMonthGrowth >= 0 ? 'Increase' : 'Decrease'} from last month
              </p>
            </div>
            <div className={`p-2 rounded-full ${monthOverMonthGrowth >= 0 ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'}`}>
              {monthOverMonthGrowth >= 0 ? 
                <TrendingUp className="h-5 w-5 text-red-500 dark:text-red-400" /> : 
                <TrendingDown className="h-5 w-5 text-green-500 dark:text-green-400" />
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Category Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Top Category</p>
              <h3 className="text-2xl font-bold mt-1 dark:text-white">{highestCategory}</h3>
              <p className="text-sm text-muted-foreground mt-1 dark:text-gray-400">
                PKR {summary.categoryTotals[highestCategory as keyof typeof summary.categoryTotals]?.toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
              <PieChart className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Average Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Daily Average</p>
              <h3 className="text-2xl font-bold mt-1 dark:text-white">PKR {avgPerDay}</h3>
              <p className="text-sm text-muted-foreground mt-1 dark:text-gray-400">
                On days with expenses
              </p>
            </div>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
              <ChartBar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCards;
