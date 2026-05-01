import React from 'react';
import Navbar from '../components/Navbar';
import BookingCard from '../components/BookingCard';

const BookingsPage = () => {
  return (
    <div className="min-h-screen bg-bgLight">
      <Navbar />

      <main className="px-8 pt-16 pb-32 max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl mb-8 shadow-xl shadow-primary/20">
          ✓
        </div>
        
        <h1 className="text-4xl font-display font-bold text-textMain mb-3 tracking-tight text-center">Booking Confirmed</h1>
        <p className="text-base font-medium text-textMuted text-center max-w-sm mb-12 leading-relaxed">
          Your digital concierge has secured your appointment. A specialist is ready for you in Mumbai.
        </p>

        <div className="w-full mb-10">
            <BookingCard 
                doctor={{ name: "Dr. Julian Vance", specialty: "General Practitioner" }}
                date="Oct 24, 2023"
                time="14:30 PM (GMT+1)"
                fee="145.00"
                currency="€"
                location="Clínica Médica de Lisboa, Rua da Prata 120"
            />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 mb-10">
          <button className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-sm tracking-wide uppercase shadow-soft active:scale-95 transition-all">
            📅 Add to Calendar
          </button>
          <button className="flex-1 border-2 border-borderSoft text-textMuted py-4 rounded-xl font-bold text-sm tracking-wide uppercase hover:bg-white active:scale-95 transition-all">
            ↗ Share Contact
          </button>
        </div>

        {/* Emergency Banner */}
        <div className="w-full bg-white p-8 rounded-[2rem] border border-borderSoft flex items-center justify-between shadow-soft">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emergency rounded-full flex items-center justify-center text-white text-2xl font-bold">
                *
            </div>
            <div>
              <p className="text-lg font-display font-bold text-textMain leading-tight mb-1">Emergency?</p>
              <p className="text-sm font-medium text-textMuted">SOS Helpline always active</p>
            </div>
          </div>
          <button className="bg-emergency text-white px-8 py-3 rounded-xl font-bold text-xs tracking-widest shadow-lg shadow-emergency/20 active:scale-95 transition-all">CALL NOW</button>
        </div>
      </main>
    </div>
  );
};

export default BookingsPage;

