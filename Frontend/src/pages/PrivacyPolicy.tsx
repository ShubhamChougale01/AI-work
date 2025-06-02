import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-assistant-primary">AI Assistant</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert">
          <p className="text-lg mb-6">
            At AI Assistant, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Account information (name, email, password)</li>
            <li>Usage data and interactions with our AI agents</li>
            <li>Device and browser information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>To provide and improve our AI assistant services</li>
            <li>To personalize your experience</li>
            <li>To communicate with you about your account</li>
            <li>To ensure the security of our services</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
          <p className="mb-6">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p className="mb-6">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please{' '}
            <Link to="/contact" className="text-assistant-primary hover:text-assistant-secondary">
              contact us
            </Link>.
          </p>

          <p className="text-sm text-slate-500 mt-12">
            Last updated: June 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 