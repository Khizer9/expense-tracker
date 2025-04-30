
import React from "react";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";

const Expenses: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Expenses</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpenseForm />
        </div>
        <div className="lg:col-span-2">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
