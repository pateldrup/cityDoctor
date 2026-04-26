import React from 'react';

const BookingCard = ({ doctor, date, time, fee, currency, location }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-50 mb-8 slide-up">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center text-3xl shrink-0 overflow-hidden border-2 border-white shadow-sm">
          <img src={`https://ui-avatars.com/name/${doctor.name}?background=E2F2F0&color=0D5C4A`} alt="Doc" />
        </div>
        <div>
          <p className="text-[0.6rem] font-black text-[#10B981] uppercase tracking-[0.2em] mb-1">ASSIGNED SPECIALIST</p>
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            {doctor.name} <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
          </h3>
          <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">{doctor.specialty} • Travel Health</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-4 rounded-2xl border border-white">
          <p className="text-[0.55rem] font-black text-slate-400 tracking-widest uppercase mb-2">DATE</p>
          <div className="flex items-center gap-2 text-sm font-black text-slate-800">📅 {date}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-white">
          <p className="text-[0.55rem] font-black text-slate-400 tracking-widest uppercase mb-2">TIME</p>
          <div className="flex items-center gap-2 text-sm font-black text-slate-800">🕒 {time} (GMT+1)</div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-3xl border border-white mb-6 flex justify-between items-center">
        <div>
          <p className="text-[0.55rem] font-black text-slate-400 tracking-widest uppercase mb-1">TOTAL SERVICE FEE</p>
          <p className="text-2xl font-black text-slate-900">{currency}{fee} <span className="text-[0.6rem] text-slate-400">/ Incl. VAT</span></p>
        </div>
        <span className="bg-teal-50 text-teal-600 px-4 py-2 rounded-xl text-[0.6rem] font-black tracking-widest border border-teal-100">PAID</span>
      </div>

      <div className="px-2 mb-6">
        <div className="flex items-start gap-3 text-[0.7rem] font-bold text-slate-500 leading-relaxed">
          <span className="text-red-500 text-lg">📍</span>
          <div>
            <p className="text-slate-800 font-extrabold uppercase tracking-widest text-[0.6rem] mb-1">LOCATION</p>
            {location}
          </div>
        </div>
      </div>

      <div className="w-full h-32 bg-[#0D5C4A]/20 rounded-2xl overflow-hidden relative border-2 border-white shadow-inner">
        <div className="absolute inset-0 bg-[#0D5C4A]/10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle, #0D5C4A 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-1/2 left-1/2 -ml-3 -mt-3 w-6 h-6 bg-[#0D5C4A] rounded-full shadow-2xl border-4 border-white flex items-center justify-center animate-bounce"></div>
      </div>
    </div>
  );
};

export default BookingCard;
