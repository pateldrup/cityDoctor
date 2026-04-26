import React from 'react';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="text-4xl mb-2">🏥</div>
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
          MediTravel
        </h1>
        <p className="text-gray-500 mt-2">Find trusted care, anywhere in the world.</p>
      </div>
      
      <AuthForm mode="login" />
      
      <footer className="mt-12 text-gray-400 text-xs">
        &copy; 2026 MediTravel Assistance. Secure & Confidential.
      </footer>
    </div>
  );
};

export default LoginPage;
