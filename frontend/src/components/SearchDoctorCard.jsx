import React from 'react';

const SearchDoctorCard = ({ name, specialty, languages, distance, rating, fee, currency }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-6 hover:shadow-md transition-shadow mb-4 slide-up">
      <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-3xl shrink-0 overflow-hidden border border-teal-100">
        <img src={`https://ui-avatars.com/name/${name}?background=E2F2F0&color=0D5C4A`} alt={name} />
      </div>
      
      <div className="grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">{name}</h3>
            <p className="text-sm font-medium text-slate-400">{specialty}</p>
          </div>
          <div className="bg-[#10B981] text-white px-2 py-1 rounded-md text-[0.65rem] font-black flex items-center gap-1 shadow-md">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {languages.map(lang => (
            <span key={lang} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-[0.6rem] font-black tracking-widest uppercase border border-slate-100 italic">{lang}</span>
          ))}
          <span className="bg-[#10B981]/10 text-[#0D5C4A] px-3 py-1 rounded-full text-[0.6rem] font-black tracking-widest uppercase flex items-center gap-1">
            <svg className="w-3 h-3 rotate-45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            {distance}
          </span>
        </div>

        <div className="flex justify-between items-center bg-slate-50 -mx-6 -mb-6 px-6 py-4 border-t border-slate-100 rounded-b-2xl mt-4">
          <div>
            <p className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">Consultation Fee</p>
            <p className="text-xl font-black text-slate-900 leading-none">₹{fee} <span className="text-slate-400 font-medium text-[0.9rem]">/ $6</span></p>
          </div>
          <button className="bg-[#0D5C4A] text-white px-8 py-3 rounded-xl font-black text-[0.7rem] uppercase tracking-widest hover:bg-[#074235] transition-colors shadow-lg shadow-teal-900/10 active:scale-95">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default SearchDoctorCard;
