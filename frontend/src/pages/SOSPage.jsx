import React from 'react';
import BottomNav from '../components/BottomNav';

const SOSPage = () => {
  return (
    <div className="min-h-screen bg-[#FFF5F5] pb-40">
      <header className="px-6 py-6 flex justify-between items-center bg-transparent">
        <div className="text-[1rem] font-black tracking-tighter text-slate-800">CITYDOCTOR</div>
        <div className="flex gap-4">
          <button className="text-lg">🔔📍</button>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden"><img src="https://ui-avatars.com/name/User" /></div>
        </div>
      </header>

      <main className="px-6 flex flex-col items-center">
        <div className="bg-[#10B981]/10 text-[#0D5C4A] px-4 py-1.5 rounded-full text-[0.6rem] font-black tracking-[0.15em] mb-8 border border-[#10B981]/20">
          ● EMERGENCY PROTOCOL ACTIVE
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight text-center">Immediate Help Required?</h1>
        <p className="text-[0.75rem] font-bold text-slate-400 text-center max-w-xs mb-16 leading-relaxed">
          Hold the button below for 3 seconds to alert local authorities and your insurance provider.
        </p>

        <div className="relative mb-20">
          <div className="absolute inset-0 bg-red-600/20 rounded-full animate-ping scale-150 opacity-20"></div>
          <button className="w-56 h-56 bg-gradient-to-br from-red-500 to-rose-700 rounded-full shadow-[0_20px_50px_rgba(225,29,72,0.4)] flex flex-col items-center justify-center text-white border-[12px] border-white/20 active:scale-95 transition-all">
            <span className="text-7xl font-bold mb-2 animate-pulse">❄️</span>
            <span className="text-2xl font-black tracking-[0.2em]">SOS</span>
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl shadow-lg border border-red-50">
            <p className="text-[0.6rem] font-black text-rose-500 tracking-widest uppercase mb-4 leading-none flex items-center gap-2">🚑 Nearest Hospital</p>
            <p className="text-[0.65rem] font-bold text-slate-500 leading-snug mb-4">Breach Candy Hospital, Mumbai</p>
            <p className="text-[0.55rem] font-black text-rose-600 tracking-widest uppercase cursor-pointer hover:underline">START NAVIGATION →</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-lg border border-teal-50">
            <p className="text-[0.6rem] font-black text-teal-600 tracking-widest uppercase mb-4 leading-none flex items-center gap-2">📞 Tourist Helpline</p>
            <p className="text-[0.65rem] font-bold text-slate-500 leading-snug mb-4">24/7 Multilingual support</p>
            <p className="text-[0.55rem] font-black text-teal-600 tracking-widest uppercase cursor-pointer hover:underline">CALL NOW ↑</p>
          </div>
        </div>

        <div className="w-full bg-[#0F172A] p-8 rounded-[2.5rem] shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h3 className="text-white text-lg font-black mb-1">Can't explain symptoms?</h3>
          <p className="text-white/40 text-[0.65rem] font-bold mb-8">We provide instant live visual translation.</p>
          <div className="flex gap-2 mb-8">
            <span className="bg-white/10 text-white px-3 py-1.5 rounded-full text-[0.6rem] font-black">English ↔ Japanese</span>
          </div>
          <button className="w-full bg-white text-[#0F172A] py-4 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">CONNECT NOW</button>
        </div>
      </main>

      <div className="fixed bottom-20 left-0 right-0 px-6 z-40">
        <div className="bg-[#10B981] p-5 rounded-[2rem] text-white flex justify-between items-center shadow-2xl shadow-teal-900/40">
          <div className="flex gap-6 grow justify-around text-center">
            <div><p className="text-[0.5rem] font-black opacity-60">BPM</p><p className="text-xl font-black leading-none">92</p></div>
            <div><p className="text-[0.5rem] font-black opacity-60">SPO2</p><p className="text-xl font-black leading-none">98%</p></div>
            <div><p className="text-[0.5rem] font-black opacity-60">TEMP</p><p className="text-xl font-black leading-none">36.5</p></div>
          </div>
          <div className="border-l border-white/20 pl-6 ml-6">
            <p className="text-[0.45rem] font-bold leading-tight opacity-50 italic">Vitals synced from<br/>MediWatch Pro. 0h ago</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default SOSPage;
