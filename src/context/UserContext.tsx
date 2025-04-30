import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types/expense";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://jobeevifnmnyfvqztxhv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYmVldmlmbm1ueWZ2cXp0eGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTQwNjQsImV4cCI6MjA2MTU3MDA2NH0.in0-CC1F576SLhFLtFm1h_GEWAA7qgbYZRvllXgPeB8";
const supabase = createClient(supabaseUrl, supabaseKey);

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const isAuthenticated = !!currentUser;

  // Fetch user session from Supabase on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      if (session && session.user) {
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || "",
          email: session.user.email,
        });
      }
    };

    fetchUser();

    // Listen for auth state changes to keep the user session updated
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || "",
          email: session.user.email,
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.subscription.unsubscribe(); // Fixed cleanup logic
    };
  }, []);

  // Login functionality
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        if (error.message === "Email not confirmed") {
          toast.error("Your email is not confirmed. Please check your inbox.");
        } else {
          toast.error("Login failed: " + error.message);
        }
        console.error("Login error:", error.message);
        return false;
      }
      toast.success("Login successful");
      if (data.user) {
        setCurrentUser({
          id: data.user.id,
          name: data.user.user_metadata?.name || "",
          email: data.user.email,
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Unexpected error during login:", err);
      toast.error("An unexpected error occurred");
      return false;
    }
  };

  // Logout functionality
  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    toast.info("You have been logged out");
  };

  // Register functionality
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email, 
        password,
        options: {
          data: { name },
        }, 
      });
      if (error) {
        toast.error(error.message);    
        return false;
      }
      if (data.user) {
        toast.success("Registration successful! Please confirm your email.");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
