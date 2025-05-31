
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  linkText,
  linkTo,
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 gradient-bg flex flex-col justify-center items-center p-8 text-white animate-fade-in">
        <div className="max-w-md text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Assistant</h1>
          <p className="text-xl opacity-90">Your personal AI companion that helps you stay organized, remember important information, and achieve your goals.</p>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-slate-500 mt-2">{subtitle}</p>
          </div>

          {children}

          <div className="text-center mt-6 text-slate-600">
            {linkText}{" "}
            <Link to={linkTo} className="text-assistant-primary font-semibold hover:underline">
              {linkTo === "/login" ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
