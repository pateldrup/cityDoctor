import React from 'react';

const DoctorCard = ({ name, specialty, city, costRange, languages, rating }) => {
  return (
    <div className="glass-card p-6 flex flex-col md:flex-row gap-6 hover:border-blue-200 transition-all group">
      <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">👨‍⚕️</div>
      <div className="grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{name}</h3>
            <p className="text-blue-600 font-medium">{specialty} • {city}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
            ⭐ {rating}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map(lang => (
            <span key={lang} className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
              {lang}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <span className="text-slate-500 font-medium">Fee: <span className="text-slate-900 font-bold">{costRange}</span></span>
          <button className="text-blue-600 font-bold hover:text-blue-700">View Profile →</button>
        </div>
      </div>
      <div className="md:border-l border-slate-100 md:pl-6 flex items-center">
        <button className="btn-primary w-full md:w-auto whitespace-nowrap">Book Now</button>
      </div>
    </div>
  );
};

export default DoctorCard;
