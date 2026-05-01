import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-body animate-fade-in relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#1A6B3C]/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1A6B3C]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative z-10 border border-slate-100">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <span className="text-3xl">🏥</span>
          <h1 className="text-2xl font-black text-[#1A6B3C] tracking-tight">CityDoctor</h1>
        </div>

        {!isSubmitted ? (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
              Forgot Password?
            </h2>
            <p className="text-slate-500 text-center mb-8 text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">✉️</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Email Address"
                    className={`w-full bg-slate-50 border ${emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20'} rounded-xl py-3.5 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]`}
                  />
                </div>
                {emailError && <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{emailError}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center gap-2
                  ${!isLoading 
                    ? 'bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] hover:shadow-lg hover:shadow-[#2ECC71]/30 cursor-pointer' 
                    : 'bg-slate-300 cursor-not-allowed'}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Reset Link'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center animate-fade-in py-4">
            <div className="w-20 h-20 bg-[#2ECC71]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-[#2ECC71] rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-[#2ECC71]/30 animate-bounce" style={{ animationIterationCount: 1, animationDuration: '0.5s' }}>
                ✓
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
              Check your email!
            </h2>
            <p className="text-slate-500 text-sm mb-8 px-4 leading-relaxed">
              We've sent a password reset link to <br/>
              <span className="font-bold text-slate-700">{email}</span>
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-sm font-bold text-[#1A6B3C] hover:text-[#2ECC71] transition-colors"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        )}

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <Link to="/login" className="text-slate-500 font-semibold hover:text-[#1A6B3C] transition-colors flex items-center justify-center gap-2">
            <span>←</span> Back to Login
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default ForgotPassword;
