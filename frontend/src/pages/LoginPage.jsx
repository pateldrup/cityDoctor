import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-6 font-primary">
      <div className="text-center mb-10 slide-up">
        <h1 className="text-2xl font-black tracking-tighter text-[#0F172A] mb-1">CITYDOCTOR</h1>
        <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">Medical care, wherever you are.</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 border border-white fade-in">
        <h2 className="text-2xl font-black text-[#0F172A] mb-8">Welcome Back</h2>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <input type="email" placeholder="name@email.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">Password</label>
              <Link to="/forgot" className="text-[0.6rem] font-black text-[#10B981] uppercase tracking-widest hover:underline">Forgot password?</Link>
            </div>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all" />
          </div>
        </div>

        <button className="w-full bg-[#0D5C4A] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#074235] transition-all active:scale-95 mb-6">Sign In</button>

        <div className="flex items-center gap-4 mb-6">
          <div className="grow h-[1px] bg-slate-100"></div>
          <span className="text-[0.6rem] font-black text-slate-300 uppercase tracking-widest">or</span>
          <div className="grow h-[1px] bg-slate-100"></div>
        </div>

        <button className="w-full border-2 border-slate-100 text-slate-600 py-4 rounded-2xl font-black text-[0.65rem] tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95">
          Continue with Google
        </button>
      </div>

      <Link to="/signup" className="mt-8 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest hover:text-[#0D5C4A] transition-colors">
        New here? <span className="text-[#10B981]">Create an account →</span>
      </Link>
    </div>
  );
};

export default LoginPage;
