import React from 'react';
import BookingCard from '../components/BookingCard';
import BottomNav from '../components/BottomNav';

const BookingConfirmedPage = () => {
  return (
    <div className="min-h-screen bg-[#FFFDFD] pb-32">
      <header className="px-6 py-6 flex justify-between items-center bg-white border-b border-rose-50 sticky top-0 z-20">
        <div className="text-[1rem] font-black tracking-tighter text-slate-800">CITYDOCTOR</div>
        <div className="flex gap-4 items-center">
          <div className="text-[#10B981] font-black text-[0.6rem] tracking-widest flex items-center gap-1">📍 Mumbai, India</div>
          <button className="text-lg">🔔</button>
        </div>
      </header>

      <main className="px-6 pt-12 max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-24 h-24 bg-[#0D5C4A] rounded-full flex items-center justify-center text-4xl text-white shadow-2xl shadow-teal-900/30 mb-8 border-[6px] border-teal-50 fade-in">
          ✓
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight text-center">Booking Confirmed</h1>
        <p className="text-[0.8rem] font-bold text-slate-400 text-center max-w-xs mb-12">
          Your digital concierge has secured your appointment. A specialist is ready for you.
        </p>

        <BookingCard 
          doctor={{ name: "Dr. Julian Vance", specialty: "General Practitioner" }}
          date="Oct 24, 2023"
          time="14:30 PM"
          fee="145.00"
          currency="€"
          location="Clínica Médica de Lisboa, Rua da Prata 120"
        />

        <div className="w-full flex gap-3 mb-10">
          <button className="flex-1 bg-[#0F172A] text-white py-4 rounded-2xl font-black text-[0.65rem] tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
            📅 Add to Calendar
          </button>
          <button className="flex-1 border-2 border-slate-200 text-slate-600 py-4 rounded-2xl font-black text-[0.65rem] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all">
            ↗ Share with Contacts
          </button>
        </div>

        <div className="w-full bg-rose-50 p-6 rounded-[2rem] border border-rose-100 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white text-xl font-bold">❄️</div>
            <div>
              <p className="text-[0.7rem] font-black text-rose-900 leading-tight">Emergency?</p>
              <p className="text-[0.6rem] font-bold text-rose-500 tracking-wide">SOS Helpline always active</p>
            </div>
          </div>
          <button className="bg-rose-600 text-white px-6 py-3 rounded-full font-black text-[0.65rem] tracking-widest shadow-lg shadow-rose-900/20 active:scale-95 transition-all">CALL NOW</button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default BookingConfirmedPage;
