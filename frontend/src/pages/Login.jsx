import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { login, loginWithGoogle, user } = useAuth(); // getting user
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const { addNotification } = useNotifications();

  // Validation logic
  useEffect(() => {
    let valid = true;
    
    // Email validation
    if (email && (!email.includes('@') || !email.includes('.'))) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!email || !password) {
      valid = false;
    }

    setIsValid(valid);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    
    setIsLoading(true);
    setErrorMsg('');
    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success) {
      addNotification({
        type: 'system',
        title: 'Welcome back! 👋',
        message: `Good to see you again!`, // In Login, user state updates might be delayed, so fallback to generic
        icon: '👋',
        actionUrl: '/profile',
        actionLabel: 'View Profile',
      });
      navigate('/');
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const result = await loginWithGoogle();
    setIsLoading(false);
    if (result.success) {
      addNotification({
        type: 'system',
        title: 'Welcome back! 👋',
        message: `Good to see you again!`,
        icon: '👋',
        actionUrl: '/profile',
        actionLabel: 'View Profile',
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex animate-fade-in font-body">
      {/* LEFT SIDE - Green Gradient Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1A6B3C] to-[#2ECC71] p-12 flex-col relative overflow-hidden text-white">
        {/* Animated Background Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-black/5 rounded-full blur-lg animate-bounce" style={{ animationDuration: '5s' }}></div>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-20 z-10">
          <span className="text-3xl">🏥</span>
          <h1 className="text-2xl font-black tracking-tight">CityDoctor</h1>
        </div>

        {/* Main Content */}
        <div className="z-10 mt-10">
          <h2 className="text-5xl font-black leading-tight mb-8">
            Your Health.<br />
            Our Priority.<br />
            Anywhere in India.
          </h2>

          {/* Trust Points */}
          <div className="space-y-6 mt-12">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">✓</div>
              <span className="text-lg font-medium">2000+ Verified Doctors</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">✓</div>
              <span className="text-lg font-medium">50+ Cities Covered</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">✓</div>
              <span className="text-lg font-medium">24/7 Emergency Support</span>
            </div>
          </div>
        </div>
        
        {/* Floating Medical Illustration */}
        <div className="absolute -bottom-10 -right-10 text-[15rem] opacity-20 transform -rotate-12 select-none">
          🩺
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="flex lg:hidden items-center gap-2 mb-10 justify-center">
            <span className="text-2xl">🏥</span>
            <h1 className="text-xl font-black text-[#1A6B3C] tracking-tight">CityDoctor</h1>
          </div>

          <h2 className="text-4xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Welcome Back 👋</h2>
          <p className="text-slate-500 mb-6 text-lg">Sign in to find doctors near you</p>
          
          {errorMsg && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium mb-6 border border-red-100">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className={`w-full bg-slate-50 border ${emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20'} rounded-xl py-4 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]`}
                />
              </div>
              {emailError && <p className="text-red-500 text-sm mt-1 ml-2">{emailError}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full bg-slate-50 border ${passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20'} rounded-xl py-4 pl-12 pr-12 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1 ml-2">{passwordError}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border-slate-300 text-[#2ECC71] focus:ring-[#2ECC71]" 
                  style={{ accentColor: '#2ECC71' }}
                />
                <span className="text-sm text-slate-600 font-medium">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-[#1A6B3C] hover:text-[#2ECC71] transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full py-4 mt-6 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center gap-2
                ${isValid && !isLoading 
                  ? 'bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] hover:shadow-lg hover:shadow-[#2ECC71]/30 cursor-pointer' 
                  : 'bg-slate-300 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Continue with Google
            </button>
            
            <button className="w-full py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-3">
              <span className="text-xl">📱</span>
              Continue with Phone
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-600 font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#1A6B3C] font-bold hover:text-[#2ECC71] transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
