import React from 'react';
import Navbar from '../components/BottomNav';

const SOSPage = () => {
  return (
    <div className="min-h-screen bg-bgLight pb-48">
      <header className="px-8 py-6 flex justify-between items-center bg-white border-b border-borderSoft sticky top-0 z-50">
        <div className="text-2xl font-display font-bold tracking-tight text-primary">CityDoctor</div>
        <div className="flex items-center gap-5">
          <button className="text-textMuted text-lg">🔔</button>
          <button className="text-textMuted text-lg">📍</button>
          <div className="w-10 h-10 rounded-full border-2 border-borderSoft shadow-sm overflow-hidden bg-white">
            <img src="https://ui-avatars.com/name/User?background=A8E063&color=1A6B3C" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="px-8 pt-12 flex flex-col items-center max-w-5xl mx-auto">
        {/* Emergency Badge */}
        <div className="bg-[#FFE5E5] text-emergency px-6 py-2 rounded-full text-xs font-bold tracking-widest mb-10 border border-emergency/10 uppercase flex items-center gap-3">
          <span className="w-2 h-2 bg-emergency rounded-full animate-pulse"></span>
          Emergency Protocol Active
        </div>

        <h1 className="text-5xl font-display font-bold text-textMain mb-4 tracking-tight text-center max-w-xl leading-tight">
          Immediate Help Required?
        </h1>
        <p className="text-base font-medium text-textMuted text-center max-w-md mb-16 leading-relaxed">
          Hold the button below for 3 seconds to alert local authorities and your insurance provider.
        </p>

        {/* Big SOS Button */}
        <div className="relative mb-24 group">
          <div className="absolute inset-0 bg-emergency/20 rounded-full blur-3xl scale-125 opacity-30 group-active:scale-150 transition-all duration-500"></div>
          <button className="w-72 h-72 bg-emergency rounded-full shadow-[0_30px_70px_rgba(231,76,60,0.4)] flex flex-col items-center justify-center text-white border-[12px] border-white active:scale-95 transition-all cursor-pointer relative z-10">
            <span className="text-8xl font-bold mb-0 leading-none">*</span>
            <span className="text-3xl font-bold tracking-widest uppercase -mt-2">sos</span>
          </button>
        </div>

        {/* Info Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="modern-card p-8 flex flex-col items-start">
            <div className="w-14 h-14 bg-[#FFE5E5] rounded-2xl flex items-center justify-center text-2xl mb-6">
                <span className="text-emergency">➕</span>
            </div>
            <p className="text-xl font-display font-bold text-textMain mb-2">Nearest Hospital</p>
            <p className="text-sm font-medium text-textMuted mb-8 leading-relaxed">St. Jude Medical Center • 1.2km away from your current location.</p>
            <button className="text-sm font-bold text-emergency uppercase tracking-widest hover:underline">
                Start Navigation →
            </button>
          </div>

          <div className="modern-card p-8 flex flex-col items-start">
            <div className="w-14 h-14 bg-bgLight rounded-2xl flex items-center justify-center text-2xl mb-6">
                <span className="text-primary">📞</span>
            </div>
            <p className="text-xl font-display font-bold text-textMain mb-2">Tourist Helpline</p>
            <p className="text-sm font-medium text-textMuted mb-8 leading-relaxed">24/7 Multilingual support available for all international travelers.</p>
            <button className="text-sm font-bold text-primary uppercase tracking-widest hover:underline">
                Call Now 📱
            </button>
          </div>
        </div>

        {/* Location Section */}
        <div className="w-full mb-16">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-display font-bold text-textMain">Your Current Location</h3>
                <button className="w-12 h-12 modern-card flex items-center justify-center text-textMuted">
                    <span className="text-xl">↗</span>
                </button>
            </div>
            <p className="text-sm font-bold text-textMuted mb-8 tracking-wide italic">40.7128° N, 74.0060° W • Colaba, Mumbai</p>
            
            <div className="w-full h-64 bg-white rounded-3xl overflow-hidden relative shadow-inner border border-borderSoft">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-emergency/5"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[24px] border-emergency/10 rounded-full"></div>
            </div>

            <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-bgLight shadow-sm">
                            <img src={`https://ui-avatars.com/name/Responders+${i}?background=A8E063&color=1A6B3C`} alt="Avatar" />
                        </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-bgLight flex items-center justify-center text-xs font-bold text-primary">
                        +4
                    </div>
                </div>
                <p className="text-sm font-medium text-textMuted italic">Nearby verified responders have been notified of your proximity.</p>
            </div>
        </div>

        {/* Translator Banner */}
        <div className="w-full bg-primary p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h3 className="text-white text-3xl font-display font-bold mb-2">Can't explain symptoms?</h3>
            <p className="text-bgLight/60 text-base font-medium mb-12 max-w-sm">
                Connect instantly with a live medical translator in your native language.
            </p>
            
            <div className="flex items-center gap-6 mb-12">
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest border border-white/20 px-6 py-2.5 rounded-full">English</span>
                <span className="text-white/30 text-xl">↔</span>
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest border border-white/20 px-6 py-2.5 rounded-full">Japanese</span>
            </div>

            <button className="w-full bg-white text-primary py-5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-bgLight transition-all flex items-center justify-center gap-3">
                <span className="text-2xl">文</span> Connect Now
            </button>
        </div>
      </main>

      {/* Vitals Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-40">
        <div className="glass-card p-6 flex justify-between items-center border-white shadow-2xl">
          <div className="flex gap-12 grow justify-around px-4">
            <div className="text-center">
                <p className="text-[0.6rem] font-bold text-textMuted uppercase mb-1 tracking-widest">BPM</p>
                <p className="text-2xl font-bold text-emergency leading-none">92</p>
            </div>
            <div className="text-center">
                <p className="text-[0.6rem] font-bold text-textMuted uppercase mb-1 tracking-widest">SPO2</p>
                <p className="text-2xl font-bold text-primary leading-none">98%</p>
            </div>
            <div className="text-center">
                <p className="text-[0.6rem] font-bold text-textMuted uppercase mb-1 tracking-widest">TEMP</p>
                <p className="text-2xl font-bold text-textMain leading-none">36.5°</p>
            </div>
          </div>
          <div className="border-l border-borderSoft pl-8 ml-6 mr-4 hidden md:block">
            <p className="text-[0.6rem] font-bold text-textMuted italic leading-tight uppercase tracking-tight">
                Vitals synced from <br /> MediWatch Pro 12s ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;


