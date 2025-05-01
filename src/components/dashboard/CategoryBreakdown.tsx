import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/context/ExpenseContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CategoryBreakdown: React.FC = () => {
  const { summary } = useExpenses();
  
  // Transform category totals into chart data
  const chartData = Object.entries(summary.categoryTotals)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      name: category,
      amount: value,
    }))
    .sort((a, b) => b.amount - a.amount); // Sort by highest amount first
  
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`PKR ${Number(value).toFixed(2)}`, 'Amount']}
                labelStyle={{ fontWeight: 'bold', color: '#000' }} // Ensure label text is visible
                itemStyle={{ color: '#000' }} // Ensure value text is visible
              />
              <Bar dataKey="amount" fill="#9b87f5" radius={[0, 4, 4, 0]} />
            </BarChart>
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

export default CategoryBreakdown;
