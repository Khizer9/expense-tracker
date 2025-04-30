
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { ExpenseProvider } from "@/context/ExpenseContext";
import UserProfileButton from "./UserProfileButton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <ExpenseProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <div className="p-4 flex justify-end border-b">
              <UserProfileButton />
            </div>
            <main className="flex-1 p-4 md:p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ExpenseProvider>
  );
};

export default DashboardLayout;
