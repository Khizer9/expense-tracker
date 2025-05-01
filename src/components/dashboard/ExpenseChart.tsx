import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/context/ExpenseContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ExpenseCategory } from "@/types/expense";

// Colors for different categories
const COLORS = [
  "#9b87f5", // Primary Purple
  "#7E69AB", // Secondary Purple
  "#F97316", // Orange
  "#33C3F0", // Blue
  "#8E9196", // Neutral Gray
  "#B9A8FA", // Light Purple
  "#5D4F9F", // Dark Purple
  "#D3E4FD", // Soft Blue
  "#1A1F2C", // Dark Purple
];

const ExpenseChart: React.FC = () => {
  const { summary } = useExpenses();
  
  // Transform category totals into chart data
  const chartData = Object.entries(summary.categoryTotals)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      name: category,
      value,
    }));
  
  // Calculate percentage formatter
  const percentageFormatter = (value: number) => {
    if (summary.totalAmount === 0) return "0 PKR";
    return `${((value / summary.totalAmount) * 100).toFixed(0)} PKR`;
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow-sm">
          <p className="font-semibold text-black dark:text-white">{payload[0].name}</p>
          <p className="text-sm text-black dark:text-white">PKR {payload[0].value.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground dark:text-gray-400">
            {percentageFormatter(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Expense Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => 
                  name
                }
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No data to display for the selected month
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
