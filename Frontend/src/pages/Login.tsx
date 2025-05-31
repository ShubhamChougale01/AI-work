
import React from "react";
import AuthLayout from "../components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add the actual login logic
    toast({
      title: "Login successful",
      description: "Welcome back to your AI Assistant!",
    });
    window.location.href = "/dashboard";
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue using your AI Assistant"
      linkText="Don't have an account?"
      linkTo="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <a href="#" className="text-sm text-assistant-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full"
          />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full bg-assistant-primary hover:bg-assistant-primary/90">
            Sign In
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
