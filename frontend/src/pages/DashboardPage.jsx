import React from 'react';
import BottomNav from '../components/BottomNav';
import DoctorCard from '../components/DoctorCard';
import { MOCK_DOCTORS } from '../utils/constants';

const DashboardPage = () => {
  const categories = ['General Physician', 'Dentist', 'Emergency', 'Pediatric', 'ENT'];

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-24">
      {/* Header */}
      <header className="px-8 pt-8 pb-4 flex justify-between items-center">
        <div>
          <div className="text-[1rem] font-black tracking-tighter text-[#0F172A] mb-1">CITYDOCTOR</div>
          <div className="flex items-center gap-1 text-[0.65rem] font-bold text-[#10B981]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            Mumbai, India
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-slate-600">🔔</button>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-xl overflow-hidden">
            <img src="https://ui-avatars.com/name/User?background=random" alt="User" />
          </div>
        </div>
      </header>

      <main className="px-8 pt-8">
        <h1 className="text-4xl font-black text-[#0F172A] leading-[1.1] mb-2 tracking-tight">Your Digital Sanctuary in Mumbai.</h1>
        <p className="text-slate-400 font-bold text-sm mb-10">World-class care, curated for your journey.</p>

        {/* Search */}
        <div className="bg-white rounded-[1.5rem] p-4 flex items-center gap-4 shadow-xl shadow-slate-200/50 mb-8 max-w-2xl border border-white">
          <span className="text-xl">🔍</span>
          <input type="text" placeholder="Search symptoms or specialty..." className="grow bg-transparent outline-none font-bold text-slate-800 placeholder:text-slate-300" />
        </div>

        {/* Specialty Row */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-8 -mx-8 px-8">
          {categories.map((cat, i) => (
            <button key={cat} className={`whitespace-nowrap px-6 py-3 rounded-2xl font-black text-[0.7rem] uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#0F172A] text-white' : 'bg-slate-200 text-slate-500'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Nearby Section */}
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-black text-[#0F172A]">Nearby Verified Doctors</h2>
          <a href="/search" className="text-[0.65rem] font-black text-[#10B981] hover:underline uppercase tracking-widest">View All →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {MOCK_DOCTORS.slice(0, 2).map(doc => (
            <DoctorCard key={doc.id} {...doc} />
          ))}
        </div>

        {/* Cost Guide */}
        <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white mb-16 shadow-2xl slide-up overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <p className="text-[0.7rem] font-black tracking-[0.2em] mb-2 text-white/50">LOCAL COST GUIDE</p>
          <h3 className="text-lg font-bold mb-8">Average outpatient costs in Mumbai South</h3>
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
              <p className="text-[0.6rem] font-black text-white/40 uppercase tracking-widest mb-2">CONSULTATION</p>
              <p className="text-2xl font-black">₹1,200 <span className="text-sm font-medium text-white/30">/ avg</span></p>
            </div>
            <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
              <p className="text-[0.6rem] font-black text-white/40 uppercase tracking-widest mb-2">DIAGNOSTICS</p>
              <p className="text-2xl font-black">₹2,500 <span className="text-white/30 text-lg">+</span></p>
            </div>
          </div>
          <p className="mt-8 text-[0.55rem] text-white/20 italic">*Rates are estimated based on local luxury healthcare providers. Actual costs may vary.</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DashboardPage;
