import React from 'react';
import AuthForm from '../components/AuthForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-8 text-center px-4">
        <div className="text-4xl mb-2">🏥</div>
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
          MediTravel
        </h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          Join thousands of travelers getting trusted medical care worldwide.
        </p>
      </div>
      
      <AuthForm mode="signup" />
      
      <footer className="mt-12 text-gray-400 text-xs">
        Your safety is our priority. Terms & Privacy Apply.
      </footer>
    </div>
  );
};

export default SignupPage;
