
import React from "react";
import AuthLayout from "../components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Register: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add the actual registration logic
    toast({
      title: "Registration successful",
      description: "Your account has been created. Welcome to AI Assistant!",
    });
    window.location.href = "/dashboard";
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Get started with your personal AI Assistant"
      linkText="Already have an account?"
      linkTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
              First name
            </label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
              Last name
            </label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              required
              className="w-full"
            />
          </div>
        </div>
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
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
            Confirm password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            className="w-full"
          />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full bg-assistant-primary hover:bg-assistant-primary/90">
            Create Account
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
