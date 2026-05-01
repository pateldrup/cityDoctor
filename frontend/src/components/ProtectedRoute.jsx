import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  // If auth state is still loading from localStorage, we could show a spinner here
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-bgLight">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-[#2ECC71] rounded-full animate-spin"></div>
    </div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
