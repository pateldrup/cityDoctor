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
  const [errorMsg, setErrorMsg] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  // Phone modal state
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneStep, setPhoneStep] = useState('enter_phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const { login, loginWithGoogle, loginWithPhone } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  // Validation
  useEffect(() => {
    let valid = true;
    if (email && (!email.includes('@') || !email.includes('.'))) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else { setEmailError(''); }
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else { setPasswordError(''); }
    if (!email || !password) valid = false;
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
      addNotification({ type: 'system', title: 'Welcome back! 👋', message: 'Good to see you again!', icon: '👋', actionUrl: '/profile', actionLabel: 'View Profile' });
      navigate('/');
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    try {
      const mockGoogleUser = {
        googleId: 'google_' + Date.now(),
        email: 'googleuser@gmail.com',
        name: 'Google User',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser${Date.now()}`,
      };
      const result = await loginWithGoogle(mockGoogleUser);
      if (result.success) {
        addNotification({ type: 'system', title: 'Welcome! 👋', message: 'Successfully signed in with Google', icon: '🎉' });
        navigate('/');
      } else {
        setErrorMsg(result.message || 'Google login failed');
      }
    } catch {
      setErrorMsg('Google login failed. Try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const resetPhoneModal = () => {
    setShowPhoneModal(false);
    setPhoneStep('enter_phone');
    setPhoneNumber('');
    setOtp(['', '', '', '', '', '']);
    setPhoneError('');
  };

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) { setPhoneError('Please enter a valid 10-digit number'); return; }
    setPhoneLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setPhoneLoading(false);
    setPhoneStep('enter_otp');
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) { setPhoneError('Please enter the complete 6-digit OTP'); return; }
    if (enteredOtp !== '123456') { setPhoneError('Invalid OTP. Use 123456 for testing.'); return; }
    setPhoneLoading(true);
    const result = await loginWithPhone({ phone: phoneNumber, name: 'Phone User', email: `phone_${phoneNumber}@citydoctor.com` });
    setPhoneLoading(false);
    if (result.success) {
      resetPhoneModal();
      addNotification({ type: 'system', title: 'Welcome! 👋', message: 'Successfully signed in with phone number', icon: '📱' });
      navigate('/');
    } else {
      setPhoneError(result.message || 'Verification failed');
    }
  };

  const handleOtpChange = (index, val) => {
    const cleaned = val.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);
    setPhoneError('');
    if (cleaned && index < 5) {
      document.getElementById(`otp-login-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-login-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen flex animate-fade-in font-body">
      {/* LEFT SIDE - Green Gradient Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1A6B3C] to-[#2ECC71] p-12 flex-col relative overflow-hidden text-white">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-black/5 rounded-full blur-lg animate-bounce" style={{ animationDuration: '5s' }}></div>
        <div className="flex items-center gap-2 mb-20 z-10">
          <span className="text-3xl">🏥</span>
          <h1 className="text-2xl font-black tracking-tight">CityDoctor</h1>
        </div>
        <div className="z-10 mt-10">
          <h2 className="text-5xl font-black leading-tight mb-8">
            Your Health.<br />Our Priority.<br />Anywhere in India.
          </h2>
          <div className="space-y-6 mt-12">
            {['2000+ Verified Doctors', '50+ Cities Covered', '24/7 Emergency Support'].map(t => (
              <div key={t} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">✓</div>
                <span className="text-lg font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 text-[15rem] opacity-20 transform -rotate-12 select-none">🩺</div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <div className="flex lg:hidden items-center gap-2 mb-10 justify-center">
            <span className="text-2xl">🏥</span>
            <h1 className="text-xl font-black text-[#1A6B3C] tracking-tight">CityDoctor</h1>
          </div>

          <h2 className="text-4xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Welcome Back 👋</h2>
          <p className="text-slate-500 mb-6 text-lg">Sign in to find doctors near you</p>

          {errorMsg && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium mb-6 border border-red-100">{errorMsg}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">✉️</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address"
                  className={`w-full bg-slate-50 border ${emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20'} rounded-xl py-4 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]`} />
              </div>
              {emailError && <p className="text-red-500 text-sm mt-1 ml-2">{emailError}</p>}
            </div>

            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                  className={`w-full bg-slate-50 border ${passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20'} rounded-xl py-4 pl-12 pr-12 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1 ml-2">{passwordError}</p>}
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 rounded border-slate-300" style={{ accentColor: '#2ECC71' }} />
                <span className="text-sm text-slate-600 font-medium">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-[#1A6B3C] hover:text-[#2ECC71] transition-colors">Forgot Password?</Link>
            </div>

            <button type="submit" disabled={!isValid || isLoading}
              className={`w-full py-4 mt-6 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center gap-2
                ${isValid && !isLoading ? 'bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] hover:shadow-lg hover:shadow-[#2ECC71]/30 cursor-pointer' : 'bg-slate-300 cursor-not-allowed'}`}>
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

          {/* Social Buttons */}
          <div className="space-y-3">
            {/* Google Button */}
            <button
              type="button"
              id="btn-google-login"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:border-[#2ECC71] hover:bg-slate-50 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#4285F4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            {/* Phone Button */}
            <button
              type="button"
              id="btn-phone-login"
              onClick={() => setShowPhoneModal(true)}
              className="w-full py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:border-[#2ECC71] hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              <span className="text-xl">📱</span>
              Continue with Phone
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-600 font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#1A6B3C] font-bold hover:text-[#2ECC71] transition-colors">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Phone OTP Modal */}
      {showPhoneModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '400px', margin: '0 16px', boxShadow: '0 20px 60px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s ease', position: 'relative' }}>
            
            {/* Close */}
            <button onClick={resetPhoneModal} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '26px', cursor: 'pointer', color: '#999', lineHeight: 1 }}>×</button>

            {phoneStep === 'enter_phone' ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📱</div>
                  <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', color: '#0D2B1A', margin: 0 }}>Enter your phone</h2>
                  <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>We'll verify with a 6-digit OTP</p>
                </div>

                <div style={{ display: 'flex', border: '1.5px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ padding: '14px 16px', background: '#f8f8f8', borderRight: '1px solid #e0e0e0', fontWeight: '600', color: '#333', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={e => { setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10)); setPhoneError(''); }}
                    autoFocus
                    style={{ flex: 1, padding: '14px', border: 'none', outline: 'none', fontSize: '16px', background: 'transparent' }}
                  />
                </div>

                {phoneError && <p style={{ color: '#E74C3C', fontSize: '13px', marginBottom: '12px' }}>⚠️ {phoneError}</p>}

                <button
                  onClick={handleSendOtp}
                  disabled={phoneLoading || phoneNumber.length !== 10}
                  style={{ width: '100%', padding: '14px', background: phoneNumber.length === 10 ? '#1A6B3C' : '#ccc', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: phoneNumber.length === 10 ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
                >
                  {phoneLoading ? 'Sending OTP...' : 'Send OTP →'}
                </button>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔢</div>
                  <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', color: '#0D2B1A', margin: 0 }}>Enter OTP</h2>
                  <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Sent to +91 {phoneNumber.slice(0, 5)}XXXXX</p>
                  <p style={{ color: '#2ECC71', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>✓ OTP sent successfully!</p>
                  <span style={{ color: '#999', fontSize: '12px', background: '#f0faf4', padding: '3px 10px', borderRadius: '8px', display: 'inline-block', marginTop: '4px' }}>
                    Use OTP: 123456 for testing
                  </span>
                </div>

                {/* 6-digit OTP boxes */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-login-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(e, index)}
                      style={{ width: '46px', height: '54px', textAlign: 'center', fontSize: '22px', fontWeight: '700', border: digit ? '2px solid #2ECC71' : '1.5px solid #e0e0e0', borderRadius: '12px', outline: 'none', transition: 'border 0.2s', color: '#0D2B1A' }}
                    />
                  ))}
                </div>

                {phoneError && <p style={{ color: '#E74C3C', fontSize: '13px', textAlign: 'center', marginBottom: '12px' }}>⚠️ {phoneError}</p>}

                <button
                  onClick={handleVerifyOtp}
                  disabled={phoneLoading || otp.join('').length !== 6}
                  style={{ width: '100%', padding: '14px', background: otp.join('').length === 6 ? '#1A6B3C' : '#ccc', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: otp.join('').length === 6 ? 'pointer' : 'not-allowed' }}
                >
                  {phoneLoading ? 'Verifying...' : 'Verify & Login ✓'}
                </button>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <span style={{ color: '#666', fontSize: '13px' }}>Didn't receive OTP? </span>
                  <button
                    onClick={async () => { setOtp(['', '', '', '', '', '']); setPhoneError(''); setPhoneLoading(true); await new Promise(r => setTimeout(r, 1000)); setPhoneLoading(false); }}
                    style={{ background: 'none', border: 'none', color: '#1A6B3C', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Resend OTP
                  </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <button
                    onClick={() => { setPhoneStep('enter_phone'); setOtp(['', '', '', '', '', '']); setPhoneError(''); }}
                    style={{ background: 'none', border: 'none', color: '#999', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    ← Change phone number
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

