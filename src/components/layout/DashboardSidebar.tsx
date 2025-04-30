import React, { useState } from "react";
import { 
  SidebarRail,
  SidebarContent, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger 
} from "@/components/ui/sidebar";

import { ChartPie, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      style={{
        transition: "width 0.3s ease, padding 0.3s ease",
        width: isCollapsed ? "4rem" : "16rem",
        overflow: "hidden",
      }}
    >
      <SidebarRail />
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2 overflow-hidden">
          <ChartPie className="h-6 w-6 text-expense-purple-400 shrink-0" />
          <span className={`font-bold text-lg truncate ${isCollapsed ? "hidden" : ""}`}>
            ExpenseTracker
          </span>
        </div>
        <SidebarTrigger onClick={handleCollapseToggle} />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={`${isCollapsed ? "hidden" : ""}`}>
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Dashboard"
                  isActive={location.pathname === "/"}
                >
                  <Link to="/" className="flex items-center space-x-2">
                    <ChartPie className="h-5 w-5 shrink-0" />
                    <span className={`${isCollapsed ? "hidden" : ""}`}>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Expenses"
                  isActive={location.pathname === "/expenses"}
                >
                  <Link to="/expenses" className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 shrink-0" />
                    <span className={`${isCollapsed ? "hidden" : ""}`}>Expenses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className={`text-xs text-muted-foreground ${isCollapsed ? "hidden" : ""}`}>
          Your Financial Dashboard
        </div>
      </SidebarFooter>
    </div>
  );
};

export default DashboardSidebar;
