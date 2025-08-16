import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  
  const handleSignOut = () => {
    signOut(auth);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            SF Manager
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/') ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/about') ? "text-primary" : "text-muted-foreground"
              )}
            >
              About
            </Link>
            {user && (
              <Link 
                to="/chat" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive('/chat') ? "text-primary" : "text-muted-foreground"
                )}
              >
                Chat
              </Link>
            )}
            <Link 
              to="/instructions" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/instructions') ? "text-primary" : "text-muted-foreground"
              )}
            >
              Instructions
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/contact') ? "text-primary" : "text-muted-foreground"
              )}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/settings">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;