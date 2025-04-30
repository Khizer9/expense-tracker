
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
import { useExpenses } from "@/context/ExpenseContext";

const MonthPicker: React.FC = () => {
  const { currentFilter, setFilter } = useExpenses();
  
  // Generate array of months
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Generate array of years (current year - 5 to current year + 5)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  
  const handleMonthChange = (value: string) => {
    setFilter(parseInt(value), currentFilter.year);
  };
  
  const handleYearChange = (value: string) => {
    setFilter(currentFilter.month, parseInt(value));
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-expense-purple-400" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Select value={currentFilter.month.toString()} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, idx) => (
              <SelectItem key={idx} value={idx.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={currentFilter.year.toString()} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MonthPicker;
