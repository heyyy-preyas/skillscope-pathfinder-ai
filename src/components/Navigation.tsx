import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="glass-card sticky top-0 z-50 border-x-0 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold gradient-text">SkillScope</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/careers" className="nav-link">Careers</Link>
              <Link to="/quiz" className="nav-link">Assessment</Link>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card">
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" onClick={() => navigate("/auth")} className="glass">Sign In</Button>
                  <Button onClick={() => navigate("/auth")} className="shadow-glow hover:shadow-primary">Get Started</Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-card border-t border-x-0 rounded-none">
            <Link to="/" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/dashboard" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link to="/careers" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>Careers</Link>
            <Link to="/quiz" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>Assessment</Link>
            <div className="pt-2 space-y-2">
              {user ? (
                <Button variant="outline" className="w-full glass" onClick={handleSignOut}>
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="w-full glass" onClick={() => navigate("/auth")}>Sign In</Button>
                  <Button className="w-full shadow-glow" onClick={() => navigate("/auth")}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};