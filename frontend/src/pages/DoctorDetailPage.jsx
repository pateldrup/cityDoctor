import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentTypeTabs from '../components/AppointmentTypeTabs';
import { formatFee, getInitials, getRatingStars, AVAILABILITY_MOCK } from '../utils/helpers';

const DoctorDetailPage = () => {
  const navigate = useNavigate();
  const [visitType, setVisitType] = useState('walkin');

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Top Bar */}
      <header className="px-6 py-5 flex justify-between items-center bg-white sticky top-0 z-20 shadow-sm border-b border-slate-50">
        <button onClick={() => navigate(-1)} className="text-xl">←</button>
        <div className="text-[1rem] font-black tracking-tighter text-[#0F172A]">CITYDOCTOR</div>
        <div className="flex gap-4 text-lg">
          <button>🔔</button>
          <button>📍</button>
        </div>
      </header>

      <main className="px-6 py-10 max-w-2xl mx-auto">
        {/* Doctor Identity */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-3xl bg-[#E2F2F0] flex items-center justify-center text-5xl overflow-hidden border-4 border-white shadow-xl">
              <img src="https://ui-avatars.com/name/Arjun+Sharma?background=0D5C4A&color=fff" alt="Dr" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-lg">
              <div className="bg-[#10B981] w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white">✅</div>
            </div>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-1">Dr. Arjun Sharma</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Senior Cardiologist • 12 Yrs Exp</p>
          <div className="flex gap-2">
            {['ENGLISH', 'HINDI'].map(l => (
              <span key={l} className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[0.6rem] font-black tracking-[0.2em]">{l}</span>
            ))}
          </div>
        </div>

        <AppointmentTypeTabs selected={visitType} onChange={setVisitType} />

        {/* Stats Row */}
        <div className="flex gap-4 mb-10">
          <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-4">FEE STRUCTURE</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-400">Consultation</span>
                <span className="text-[#0F172A]">₹500</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-400">Follow-up</span>
                <span className="text-[#0F172A]">₹200</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-[#0F172A] p-6 rounded-3xl shadow-xl shadow-slate-900/10">
            <p className="text-[0.6rem] font-black text-white/40 uppercase tracking-widest mb-4">PATIENT TRUST</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-black text-white">4.9</span>
              <span className="text-[0.6rem] font-bold text-white/30 tracking-widest uppercase">/ 5.0 Rating</span>
            </div>
            <div className="flex gap-1">
              {[1,1,1,1,1].map((s, i) => (
                <div key={i} className="bg-[#10B981] w-4 h-4 rounded-sm flex items-center justify-center text-[8px] text-white">➕</div>
              ))}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-black text-[#0F172A]">Availability</h2>
            <button className="text-[0.65rem] font-black text-[#10B981] tracking-widest uppercase hover:underline">View Full Month</button>
          </div>
          <div className="flex gap-3">
            {AVAILABILITY_MOCK.map((item) => (
              <div key={item.date} className={`flex-1 p-4 rounded-2xl flex flex-col items-center text-center border transition-all ${
                item.type === 'active' ? 'bg-[#0D5C4A] border-[#0D5C4A] text-white shadow-xl scale-105' : 
                item.type === 'teal' ? 'bg-[#E2F2F0] border-transparent text-[#0D5C4A]' : 'bg-white border-slate-100 opacity-50'
              }`}>
                <p className="text-[0.55rem] font-black tracking-widest mb-1 opacity-60">{item.day}</p>
                <p className="text-2xl font-black mb-1">{item.date}</p>
                <p className={`text-[0.5rem] font-black tracking-widest uppercase ${item.status === 'FULL' ? 'text-red-500' : ''}`}>{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-10">
          <h2 className="text-xl font-black text-[#0F172A] mb-6">Recent Reviews</h2>
          <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm slide-up">
            <div className="flex gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-black text-xs">MB</div>
              <div>
                <p className="text-sm font-black text-slate-800">Marcus Bennett</p>
                <p className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-widest">2 days ago • Travel medical emergency</p>
              </div>
            </div>
            <p className="text-[0.75rem] font-medium text-slate-600 leading-relaxed italic border-l-2 border-teal-100 pl-4">
              "Dr. Sharma was incredible. As a traveler, I was stressed about my heart rate spikes. He saw me within 20 mins and explained everything clearly in English."
            </p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-40">
        <button className="w-full bg-[#0D5C4A] hover:bg-[#084839] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
          Book Appointment 📅
        </button>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
