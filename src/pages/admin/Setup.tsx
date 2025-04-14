
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setupDefaultAdmin } from "@/utilities/setupDefaultAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const navigate = useNavigate();

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage({ type: "error", text: "Please enter both email and password" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    if (password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long" });
      return;
    }

    setIsLoading(true);
    setMessage(null);
    
    try {
      const result = await setupDefaultAdmin(email, password);
      
      if (result.success) {
        setMessage({ 
          type: "success", 
          text: result.message || "Admin account created successfully! Check your email to confirm the account."
        });
        
        setTimeout(() => {
          navigate("/admin/login");
        }, 3000);
      } else {
        setMessage({ type: "error", text: result.message || "Failed to create admin account" });
      }
    } catch (error) {
      console.error("Setup admin error:", error);
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent">
              Sister Stories
            </span>
          </div>
          <CardTitle className="text-2xl">Admin Setup</CardTitle>
          <CardDescription>
            Create your admin account to manage content
          </CardDescription>
        </CardHeader>
        
        {message && (
          <div className="px-6">
            <Alert className={message.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
              <div className="flex items-center gap-2">
                {message.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription className={message.type === "success" ? "text-green-700" : "text-red-700"}>
                  {message.text}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}
        
        <CardContent>
          <form onSubmit={handleSetupAdmin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-brand-purple hover:bg-brand-deep-purple"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Admin Account"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>
            Already have an account? <Link to="/admin/login" className="text-brand-purple hover:underline">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSetup;
