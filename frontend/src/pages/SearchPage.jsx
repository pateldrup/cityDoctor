import React from 'react';
import TopNavbar from '../components/TopNavbar';
import SearchDoctorCard from '../components/SearchDoctorCard';
import { MOCK_DOCTORS } from '../utils/constants';

const SearchPage = () => {
  const filters = ['Distance', 'Price', 'Language', 'Rating'];

  return (
    <div className="flex flex-col h-screen bg-[#F0F4F8] overflow-hidden">
      <TopNavbar />
      
      <div className="grow flex overflow-hidden">
        {/* Left: Map Section (Desktop Only) */}
        <div className="hidden lg:flex w-[45%] relative bg-[#0D5C4A] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          {/* Map Pins */}
          <div className="absolute top-[35%] left-[40%] bg-white p-1 rounded-full shadow-2xl flex items-center gap-2 pr-4 border-2 border-slate-100 slide-up">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden border">
              <img src="https://ui-avatars.com/name/Dr+Kapoor" alt="Pin" />
            </div>
            <span className="text-[0.65rem] font-black tracking-tight text-slate-800">Dr. Kapoor</span>
          </div>

          <div className="absolute top-[60%] left-[25%] bg-white p-1 rounded-full shadow-2xl flex items-center gap-2 pr-4 border-2 border-slate-100 slide-up delay-150">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden border">
              <img src="https://ui-avatars.com/name/Dr+Sharma" alt="Pin" />
            </div>
            <span className="text-[0.65rem] font-black tracking-tight text-slate-800">Dr. Sharma</span>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-8 left-8 flex gap-3">
            <button className="bg-white/95 backdrop-blur-sm text-slate-800 px-6 py-3 rounded-full font-black text-[0.7rem] uppercase tracking-widest shadow-2xl flex items-center gap-2 hover:bg-white">
              <span className="text-sm">🔭</span> Satellite
            </button>
            <button className="bg-white/95 backdrop-blur-sm text-slate-800 px-6 py-3 rounded-full font-black text-[0.7rem] uppercase tracking-widest shadow-2xl flex items-center gap-2 hover:bg-white">
              <span className="text-sm">📍</span> Recenter
            </button>
          </div>
        </div>

        {/* Right: Results Panel */}
        <div className="grow overflow-y-auto px-6 py-8 lg:px-12 bg-white">
          <div className="max-w-3xl mx-auto">
            {/* Filter Row */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-slate-100">
              <button className="bg-[#0F172A] text-white px-5 py-2 rounded-full font-black text-[0.65rem] uppercase tracking-[0.15em] flex items-center gap-2">
                <span>⚡</span> Filters
              </button>
              {filters.map(filter => (
                <button key={filter} className="border border-slate-200 text-slate-500 px-4 py-2 rounded-full font-bold text-[0.7rem] flex items-center gap-2 hover:bg-slate-50 transition-colors">
                  {filter} <span className="text-[0.5rem]">▼</span>
                </button>
              ))}
            </div>

            <h2 className="text-3xl font-black text-[#0F172A] tracking-tighter mb-1">Specialists Nearby</h2>
            <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-10">Found 12 doctors in Colaba, Mumbai</p>

            <div className="space-y-4">
              {MOCK_DOCTORS.map(doc => (
                <SearchDoctorCard key={doc.id} {...doc} distance={`${(Math.random() * 2).toFixed(1)} KM`} fee={doc.consultationFee} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
