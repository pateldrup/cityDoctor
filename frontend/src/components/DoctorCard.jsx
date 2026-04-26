import React from 'react';

const DoctorCard = ({ name, specialty, costINR, costUSD, languages, rating, distance, avatar }) => {
  return (
    <div className="bg-[#F3F6F9] rounded-[32px] p-8 mb-6 shadow-sm border border-transparent hover:border-teal-100 transition-all slide-up">
      {/* Top Header Section: Fee and Book Now */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Consultation Fee</p>
          <p className="text-2xl font-black text-slate-900">
            ₹{costINR} <span className="text-slate-400 font-medium text-lg">/ ${costUSD}</span>
          </p>
        </div>
        <button className="bg-[#006B5E] text-white px-8 py-3 rounded-2xl font-bold text-sm tracking-wide hover:bg-[#005a4f] transition-colors shadow-lg shadow-teal-900/10">
          Book Now
        </button>
      </div>

      {/* Middle Section: Avatar and Info */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img src={avatar || `https://ui-avatars.com/name/${name}?background=0D8ABC&color=fff`} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-1 bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          </div>
        </div>
        
        <div className="grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-2xl font-bold text-slate-900 leading-tight">{name}</h3>
            <div className="bg-[#E2F2F0] text-[#006B5E] px-2 py-1 rounded-md text-[10px] font-black flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-4V6a2 2 0 00-4 0v4H6a2 2 0 000 4h4v4a2 2 0 004 0v-4h4a2 2 0 000-4z"/></svg>
              {rating}
            </div>
          </div>
          <p className="text-[#64748B] font-medium mb-4">{specialty}</p>
          
          <div className="flex flex-wrap gap-2">
            {languages.map(lang => (
              <span key={lang} className="bg-[#E0E7FF] text-[#4338CA] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {lang}
              </span>
            ))}
            <span className="bg-[#E0E7FF] text-[#4338CA] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <svg className="w-3 h-3 rotate-45" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              {distance} KM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
