import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { ExpenseProvider } from "@/context/ExpenseContext";
import UserProfileButton from "./UserProfileButton";
import { useTheme } from "../../context/ThemeContext"; // Removed ThemeProvider import
import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="ml-4 p-2"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <MdOutlineDarkMode className="h-5 w-5" /> : <MdLightMode className="h-5 w-5" />}
    </button>
  );  
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ExpenseProvider>
      <SidebarProvider>
        <div className={`min-h-screen flex w-full bg-background ${theme}`}>
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <div className="p-4 flex justify-end border-b">
              <ThemeToggleButton />
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
