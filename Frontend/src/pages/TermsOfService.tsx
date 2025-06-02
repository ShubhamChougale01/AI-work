import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert">
          <p className="text-lg mb-6">
            Welcome to AI Assistant. By using our service, you agree to these terms. Please read them carefully.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing or using AI Assistant, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-6">
            AI Assistant provides AI-powered assistance for memory management, goal tracking, and reminders. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must notify us immediately of any unauthorized use of your account</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. User Conduct</h2>
          <p className="mb-6">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Use the service for any unlawful purpose</li>
            <li>Upload or transmit malicious code</li>
            <li>Attempt to gain unauthorized access to the service</li>
            <li>Interfere with other users' use of the service</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
          <p className="mb-6">
            All content and functionality on AI Assistant is the exclusive property of AI Assistant and its licensors.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Privacy</h2>
          <p className="mb-6">
            Your use of AI Assistant is also governed by our{' '}
            <Link to="/privacy" className="text-assistant-primary hover:text-assistant-secondary">
              Privacy Policy
            </Link>.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
          <p className="mb-6">
            The service is provided "as is" without any warranties, expressed or implied.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact</h2>
          <p className="mb-6">
            For any questions about these Terms, please{' '}
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

export default TermsOfService; 