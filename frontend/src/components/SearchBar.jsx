import React, { useState } from 'react';
import { CITIES, SPECIALTIES } from '../utils/helpers';

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({ city: '', specialty: '', language: '' });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 -mt-10 mx-auto max-w-5xl relative z-10 slide-up">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location</label>
          <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
            onChange={(e) => setFilters({...filters, city: e.target.value})}>
            <option value="">Select City</option>
            {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Specialty</label>
          <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            onChange={(e) => setFilters({...filters, specialty: e.target.value})}>
            <option value="">All Specialties</option>
            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Language</label>
          <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            onChange={(e) => setFilters({...filters, language: e.target.value})}>
            <option value="">Any Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={() => onSearch(filters)} className="w-full btn-primary h-[52px]">Search Doctors</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
