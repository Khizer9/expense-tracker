
import React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "./Dashboard";
import Expenses from "./Expenses";
import Auth from "./Auth";
import { UserProvider, useUser } from "@/context/UserContext";

// Protected route component that uses UserProvider
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  
  // If user is not authenticated, redirect to auth page with the current path as state
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // If user is authenticated, render the element
  return <>{element}</>;
};

const Index: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route 
          path="/*" 
          element={
            <ProtectedRoute 
              element={
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="expenses" element={<Expenses />} />
                  </Routes>
                </DashboardLayout>
              }
            />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  );
};

export default Index;
