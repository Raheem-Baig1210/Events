import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Mail, AlertTriangle } from "lucide-react";
import { adminLogin, isAuthenticated, isAdmin } from "@/utils/auth";
import { toast } from "sonner";
import { dummyAdmin } from "@/data/mockData";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAdmin()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await adminLogin(email, password);

    if (result.success) {
      toast.success("Welcome Admin! Access granted.");
      navigate("/admin");
    } else {
      toast.error(result.error || "Admin login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur-lg border-border relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-destructive to-primary mb-4 shadow-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent mb-2">
            Admin Portal
          </h1>
          <p className="text-muted-foreground">Secure access for administrators</p>
        </div>

        {/* <Alert className="mb-6 border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-sm text-foreground">
            <strong>Demo Only:</strong> This uses localStorage for authentication. Production apps require proper backend validation.
          </AlertDescription>
        </Alert> */}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-background border-border"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-background border-border"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-destructive to-primary hover:opacity-90 text-lg font-semibold"
          >
            <Shield className="w-5 h-5 mr-2" />
            Admin Login
          </Button>
        </form>

        {/* <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm font-semibold text-foreground mb-2">Admin Credentials:</p>
          <p className="text-sm text-muted-foreground">Email: {dummyAdmin.email}</p>
          <p className="text-sm text-muted-foreground">Password: {dummyAdmin.password}</p>
        </div> */}

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
