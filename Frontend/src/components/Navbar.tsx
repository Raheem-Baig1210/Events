import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, LogOut, User, Shield } from "lucide-react";
import { isAuthenticated, getCurrentUser, logout, isAdmin } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [adminUser, setAdminUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setUser(getCurrentUser());
    setAdminUser(isAdmin());
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setUser(null);
    setAdminUser(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Calendar className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            EventHub
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuth && user ? (
            <>
              {adminUser && (
                <Button asChild variant="outline" size="sm" className="border-destructive/50 hover:bg-destructive/10">
                  <Link to="/admin">
                    <Shield className="w-4 h-4 mr-2 text-destructive" />
                    Admin Panel
                  </Link>
                </Button>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{user.name}</span>
                {adminUser && (
                  <Badge variant="destructive" className="ml-1 text-xs px-2 py-0">Admin</Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/login">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link to="/auth">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
