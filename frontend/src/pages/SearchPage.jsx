import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DoctorCard from '../components/DoctorCard';

const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Rohan Kapoor", specialty: "General Practitioner", costINR: 500, costUSD: 6, languages: ["ENGLISH", "MARATHI"], rating: 4.7, distance: 0.8, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Dr. Meera Iyer", specialty: "Pediatric Specialist", costINR: 600, costUSD: 7.2, languages: ["ENGLISH", "TAMIL"], rating: 5.0, distance: 2.4, avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
];

const SearchPage = () => {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />
      
      <div className="grow flex overflow-hidden">
        {/* Left Section: Map View */}
        <div className="hidden lg:flex w-[45%] relative bg-[#4D8081]">
          {/* Stylized Map Placeholder */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
          
          {/* Map Marker Placeholder */}
          <div className="absolute top-[30%] left-[35%]">
            <div className="bg-[#006B5E] text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 border-2 border-white/20">
              <span className="bg-white/20 p-1 rounded-md">➕</span>
              Dr. Sharma
            </div>
            <div className="w-4 h-4 bg-white rounded-full mx-auto -mt-1 shadow-md border-2 border-[#006B5E]"></div>
          </div>

          <div className="absolute bottom-[20%] left-[50%] w-4 h-4 bg-white rounded-full shadow-lg border-2 border-slate-200"></div>

          {/* Map Controls */}
          <div className="absolute bottom-8 left-8 flex gap-3">
            <button className="bg-white text-slate-800 px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-slate-50 transition-all">
              <span className="text-xl">🗺️</span> Satellite
            </button>
            <button className="bg-white text-slate-800 px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-slate-50 transition-all">
              <span className="text-xl">📍</span> Recenter
            </button>
          </div>
        </div>

        {/* Right Section: Results List */}
        <div className="grow overflow-y-auto px-6 py-10 lg:px-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8 px-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Specialists Nearby</h2>
              <button className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              </button>
            </div>

            <div className="space-y-4">
              {MOCK_DOCTORS.map(doc => (
                <DoctorCard key={doc.id} {...doc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
