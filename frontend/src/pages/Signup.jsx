import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CitySearchInput from '../components/CitySearchInput';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { signup } = useAuth();
  const { addNotification } = useNotifications();

  // Form State - Step 1
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form State - Step 2
  const [userType, setUserType] = useState('Traveler / Tourist');
  const [languages, setLanguages] = useState(['English']);
  const [city, setCity] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Validation State
  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-3

  const languageOptions = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Kannada'];
  const userTypeOptions = [
    { label: 'Traveler / Tourist', icon: '🧳' },
    { label: 'Local Resident', icon: '🏠' },
    { label: 'Healthcare Provider', icon: '🩺' },
    { label: 'Corporate / Business', icon: '🏢' }
  ];

  // Password strength logic
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  // Step 1 Validation
  useEffect(() => {
    const isValid = 
      fullName.trim().length > 2 &&
      email.includes('@') && email.includes('.') &&
      phone.length >= 10 &&
      passwordStrength >= 2 &&
      password === confirmPassword;
    setIsStep1Valid(isValid);
  }, [fullName, email, phone, password, confirmPassword, passwordStrength]);

  // Step 2 Validation
  useEffect(() => {
    const isValid = 
      userType !== '' &&
      languages.length > 0 &&
      city !== '' &&
      emergencyName.trim().length > 2 &&
      emergencyPhone.length >= 10 &&
      agreedToTerms;
    setIsStep2Valid(isValid);
  }, [userType, languages, city, emergencyName, emergencyPhone, agreedToTerms]);

  const toggleLanguage = (lang) => {
    setLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const handleCitySelect = (selectedCity) => {
    if (selectedCity) {
      setCity(selectedCity.name);
    } else {
      setCity('Current Location');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStep2Valid) return;
    
    setIsLoading(true);
    setErrorMsg('');
    
    const userData = {
      name: fullName,
      email,
      phone,
      password,
      userType,
      preferredLanguage: languages,
      homeCity: city,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone
      }
    };
    
    const result = await signup(userData);
    setIsLoading(false);
    
    if (result.success) {
      addNotification({
        type: 'system',
        title: 'Account Created! 🎉',
        message: 'Welcome to CityDoctor! Complete your profile to get started.',
        icon: '🏥',
        actionUrl: '/profile',
        actionLabel: 'Complete Profile',
      });
      navigate('/');
    } else {
      setErrorMsg(result.message);
    }
  };

  const strengthColor = 
    passwordStrength === 0 ? 'bg-slate-200' :
    passwordStrength === 1 ? 'bg-red-500' :
    passwordStrength === 2 ? 'bg-orange-500' : 'bg-[#2ECC71]';

  const strengthLabel = 
    passwordStrength === 0 ? '' :
    passwordStrength === 1 ? 'Weak' :
    passwordStrength === 2 ? 'Medium' : 'Strong';

  return (
    <div className="min-h-screen flex animate-fade-in font-body">
      
      {/* LEFT SIDE - Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 h-screen overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <span className="text-2xl">🏥</span>
            <h1 className="text-xl font-black text-[#1A6B3C] tracking-tight">CityDoctor</h1>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Create Account</h2>
          <p className="text-slate-500 mb-6">Join the largest healthcare network</p>

          {errorMsg && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium mb-6 border border-red-100">
              {errorMsg}
            </div>
          )}

          {/* Step Indicator */}
          <div className="flex items-center mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= 1 ? 'bg-[#2ECC71] text-white' : 'border-2 border-slate-200 text-slate-400'}`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <span className={`ml-2 text-sm font-semibold ${step >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>Personal</span>
            
            <div className={`flex-1 h-[2px] mx-4 ${step > 1 ? 'bg-[#2ECC71]' : 'bg-slate-200'}`}></div>
            
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step === 2 ? 'border-2 border-[#2ECC71] text-[#2ECC71]' : 'border-2 border-slate-200 text-slate-400'}`}>
              2
            </div>
            <span className={`ml-2 text-sm font-semibold ${step === 2 ? 'text-slate-800' : 'text-slate-400'}`}>Preferences</span>
          </div>

          {/* FORM - Step 1 */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">✉️</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]"
                  />
                </div>
              </div>

              <div>
                <div className="relative flex">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10">📱</span>
                  <div className="flex items-center justify-center bg-slate-100 border border-slate-200 border-r-0 rounded-l-xl pl-10 pr-3 text-slate-600 font-medium">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-r-xl py-3.5 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]"
                  />
                </div>
                {/* Password Strength Meter */}
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5 mb-1">
                    <div className={`flex-1 rounded-full ${password.length > 0 ? strengthColor : 'bg-slate-200'}`}></div>
                    <div className={`flex-1 rounded-full ${passwordStrength >= 2 ? strengthColor : 'bg-slate-200'}`}></div>
                    <div className={`flex-1 rounded-full ${passwordStrength >= 3 ? strengthColor : 'bg-slate-200'}`}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Include uppercase, number, special char</span>
                    <span className={`text-xs font-bold ${
                      passwordStrength === 1 ? 'text-red-500' :
                      passwordStrength === 2 ? 'text-orange-500' :
                      passwordStrength === 3 ? 'text-[#2ECC71]' : 'text-slate-400'
                    }`}>{strengthLabel}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className={`w-full py-4 mt-4 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98]
                  ${isStep1Valid 
                    ? 'bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] hover:shadow-lg hover:shadow-[#2ECC71]/30 cursor-pointer' 
                    : 'bg-slate-300 cursor-not-allowed'}`}
              >
                Continue →
              </button>
            </div>
          )}

          {/* FORM - Step 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in pb-10">
              
              {/* User Type */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">I am a:</label>
                <div className="grid grid-cols-2 gap-3">
                  {userTypeOptions.map((type) => (
                    <div 
                      key={type.label}
                      onClick={() => setUserType(type.label)}
                      className={`cursor-pointer rounded-xl p-3 border-2 transition-all duration-200 flex flex-col items-center text-center gap-1
                        ${userType === type.label 
                          ? 'border-[#2ECC71] bg-[#2ECC71]/5 shadow-sm' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <span className={`text-xs font-semibold ${userType === type.label ? 'text-[#1A6B3C]' : 'text-slate-600'}`}>
                        {type.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred Languages */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Preferred Language(s)</label>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map(lang => (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all
                        ${languages.includes(lang)
                          ? 'bg-[#1A6B3C] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Home City */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Home City</label>
                <CitySearchInput onCitySelect={handleCitySelect} initialCity={city} />
              </div>

              {/* Emergency Contact */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-red-500">🚨</span> Emergency Contact
                </label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="Contact Name"
                  className="w-full bg-white border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-lg py-2.5 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]"
                />
                <div className="flex">
                  <div className="flex items-center justify-center bg-slate-100 border border-slate-200 border-r-0 rounded-l-lg px-3 text-slate-600 font-medium text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-white border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-r-lg py-2.5 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]"
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer mt-4">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="w-5 h-5 mt-0.5 rounded border-slate-300 text-[#2ECC71] focus:ring-[#2ECC71]" 
                  style={{ accentColor: '#2ECC71' }}
                />
                <span className="text-sm text-slate-600">
                  I agree to the <span className="text-[#1A6B3C] font-semibold hover:underline">Terms of Service</span> and <span className="text-[#1A6B3C] font-semibold hover:underline">Privacy Policy</span>
                </span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="py-4 px-6 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isStep2Valid || isLoading}
                  className={`flex-1 py-4 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center gap-2
                    ${isStep2Valid && !isLoading 
                      ? 'bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] hover:shadow-lg hover:shadow-[#2ECC71]/30 cursor-pointer' 
                      : 'bg-slate-300 cursor-not-allowed'}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : 'Create Account 🎉'}
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center pb-8">
            <p className="text-slate-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#1A6B3C] font-bold hover:text-[#2ECC71] transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Green Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-bl from-[#1A6B3C] to-[#2ECC71] p-12 flex-col relative overflow-hidden text-white justify-center">
        {/* Animated Background Circles */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-black/5 rounded-full blur-lg animate-bounce" style={{ animationDuration: '6s' }}></div>

        {/* Logo */}
        <div className="absolute top-12 right-12 flex items-center gap-2 z-10">
          <h1 className="text-2xl font-black tracking-tight">CityDoctor</h1>
          <span className="text-3xl">🏥</span>
        </div>

        {/* Main Content */}
        <div className="z-10 mt-10 ml-8 max-w-lg">
          <h2 className="text-5xl font-black leading-tight mb-8">
            Join 50,000+<br />
            Travelers Who<br />
            Travel Healthy.
          </h2>

          <p className="text-xl text-white/90 mb-12 font-medium leading-relaxed">
            Get instant access to verified doctors, emergency services, and healthcare facilities across 50+ cities in India.
          </p>

          {/* Testimonial preview or trust badge could go here */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-[#2ECC71] flex items-center justify-center text-lg">👩</div>
                <div className="w-10 h-10 rounded-full bg-pink-200 border-2 border-[#2ECC71] flex items-center justify-center text-lg">👨</div>
                <div className="w-10 h-10 rounded-full bg-yellow-200 border-2 border-[#2ECC71] flex items-center justify-center text-lg">👴</div>
              </div>
              <div className="text-sm font-bold">Trusted by thousands</div>
            </div>
            <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-sm text-white/80 italic">"CityDoctor saved me when I fell ill during my trip to Jaipur. Found a clinic in 5 minutes!"</p>
          </div>
        </div>
        
        {/* Floating Medical Illustration */}
        <div className="absolute -bottom-10 -left-10 text-[15rem] opacity-20 transform rotate-12 select-none">
          🧳
        </div>
      </div>

    </div>
  );
};

export default Signup;
