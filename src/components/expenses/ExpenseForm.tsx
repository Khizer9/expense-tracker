
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ExpenseCategory } from "@/types/expense";
import { useExpenses } from "@/context/ExpenseContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories: ExpenseCategory[] = [
  "Food",
  "Housing",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Personal",
  "Education",
  "Other"
];

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  category: z.enum(categories as [ExpenseCategory, ...ExpenseCategory[]]),
  description: z.string().min(1, { message: "Description is required" }).max(100),
  date: z.date({
    required_error: "Please select a date",
  }),
});

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: "Other",
      description: "",
      date: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addExpense({
      amount: data.amount,
      category: data.category,
      description: data.description,
      date: data.date.toISOString(),
    });
    form.reset({
      amount: 0,
      category: "Other",
      description: "",
      date: new Date(),
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Add New Expense</CardTitle>
        <CardDescription>Enter your expense details below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter the expense amount</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select an expense category</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="What was this expense for?" {...field} />
                  </FormControl>
                  <FormDescription>
                    Brief description of the expense
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date when the expense occurred
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-expense-purple-400 hover:bg-expense-purple-500">
              Add Expense
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
