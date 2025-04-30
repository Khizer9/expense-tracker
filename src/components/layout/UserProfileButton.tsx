
import React from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const UserProfileButton: React.FC = () => {
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };
  
  if (!currentUser) return null;
  
  return (
    <div className="px-3 py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-full justify-start hover:bg-muted px-2">
            <User className="mr-2 h-4 w-4" />
            <span className="truncate">{currentUser.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={10} className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-500 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfileButton;
