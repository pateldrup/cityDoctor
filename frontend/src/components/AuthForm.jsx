import React from 'react';

const AuthForm = ({ mode }) => {
  const isLogin = mode === 'login';
  
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>
          </>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" placeholder="email@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg active:scale-[0.98] mt-6">
          {isLogin ? 'Sign In' : 'Join MediTravel'}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <a href={isLogin ? '/signup' : '/login'} className="text-blue-600 font-semibold hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
