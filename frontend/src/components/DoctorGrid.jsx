import React, { useState, useMemo, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import DoctorSkeleton from './DoctorSkeleton';
import { doctors } from '../data/doctors';

const DoctorGrid = ({ limit }) => {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('All');
  const [specialty, setSpecialty] = useState('All');
  const [language, setLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('Rating');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [city, specialty, language, sortBy]);

  // Derive unique filter options
  const cities = ['All', ...new Set(doctors.map(d => d.city))];
  const specialties = ['All', ...new Set(doctors.map(d => d.specialty))];
  const languages = ['All', 'English', 'Hindi', 'Spanish', 'French', 'Tamil', 'Marathi'];

  const filteredDoctors = useMemo(() => {
    let result = doctors
      .filter(doc => {
        const cityMatch = city === 'All' || doc.city === city;
        const specialtyMatch = specialty === 'All' || doc.specialty === specialty;
        const langMatch = language === 'All' || doc.languages.includes(language);
        return cityMatch && specialtyMatch && langMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'Rating') return b.rating - a.rating;
        if (sortBy === 'Cost') return a.costValue - b.costValue;
        return 0;
      });
    
    if (limit) return result.slice(0, limit);
    return result;
  }, [city, specialty, language, sortBy, limit]);

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-soft border border-borderSoft mb-10 flex flex-wrap gap-4 items-center justify-between slide-up stagger-1">
        <div className="flex flex-wrap gap-4 grow">
          {/* City Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.6rem] font-bold text-textSecondary uppercase tracking-widest px-1">City</label>
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className="bg-bgLight border-none outline-none px-4 py-2 rounded-xl text-sm font-bold text-textMain cursor-pointer hover:bg-borderSoft transition-colors"
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Specialty Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.6rem] font-bold text-textSecondary uppercase tracking-widest px-1">Specialty</label>
            <select 
              value={specialty} 
              onChange={(e) => setSpecialty(e.target.value)}
              className="bg-bgLight border-none outline-none px-4 py-2 rounded-xl text-sm font-bold text-textMain cursor-pointer hover:bg-borderSoft transition-colors"
            >
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.6rem] font-bold text-textSecondary uppercase tracking-widest px-1">Language</label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-bgLight border-none outline-none px-4 py-2 rounded-xl text-sm font-bold text-textMain cursor-pointer hover:bg-borderSoft transition-colors"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Sort By */}
        <div className="flex flex-col gap-1">
            <label className="text-[0.6rem] font-bold text-textSecondary uppercase tracking-widest px-1">Sort By</label>
            <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-primary text-white border-none outline-none px-6 py-2 rounded-xl text-sm font-bold cursor-pointer hover:bg-secondary transition-all shadow-md"
            >
                <option value="Rating">Top Rated</option>
                <option value="Cost">Lowest Cost</option>
            </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-end mb-8 px-2 slide-up stagger-2">
        <h2 className="text-2xl font-display font-bold text-textMain">
            {loading ? 'Searching...' : `${filteredDoctors.length} ${filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found`}
        </h2>
        {!loading && filteredDoctors.length > 0 && (
            <button 
                onClick={() => { setCity('All'); setSpecialty('All'); setLanguage('All'); setSortBy('Rating'); }}
                className="text-xs font-bold text-primary hover:text-secondary uppercase tracking-widest transition-colors"
            >
                Clear Filters
            </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <DoctorSkeleton key={i} />)}
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc, idx) => (
            <div key={doc.id} className="slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <DoctorCard doctor={doc} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-borderSoft">
          <div className="text-5xl mb-6">🔍</div>
          <h3 className="text-2xl font-display font-bold text-textMain mb-2">No Specialists Found</h3>
          <p className="text-textSecondary font-medium max-w-sm mx-auto mb-8">
            Try adjusting your filters or location to find available doctors in our network.
          </p>
          <button 
            onClick={() => { setCity('All'); setSpecialty('All'); setLanguage('All'); }}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorGrid;
