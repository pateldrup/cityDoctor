import React, { useState, useEffect, useRef } from 'react';
import { indianCities } from '../data/indianCities';

const CitySearchInput = ({ onCitySelect, initialCity = '' }) => {
  const [query, setQuery] = useState(initialCity);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCities([]);
      return;
    }

    const results = indianCities.filter(city => 
      city.name.toLowerCase().includes(query.toLowerCase()) || 
      city.state.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setFilteredCities(results);
  }, [query]);

  const handleSelect = (city) => {
    if (city === 'location') {
      onCitySelect(null);
      setQuery('Current Location');
    } else {
      onCitySelect(city);
      setQuery(city.name);
    }
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex(prev => (prev < filteredCities.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : filteredCities.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex === 0) {
        handleSelect('location');
      } else if (activeIndex > 0 && filteredCities[activeIndex - 1]) {
        handleSelect(filteredCities[activeIndex - 1]);
      } else if (activeIndex === -1 && filteredCities.length > 0) {
        // Auto-select first match if user just types and hits Enter
        handleSelect(filteredCities[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform">📍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); setActiveIndex(-1); }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for your city..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-borderSoft rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium shadow-sm hover:border-primary/50"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-borderSoft z-[2000] overflow-hidden animate-fadeIn">
          <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
            {/* Current Location Option */}
            <div
              onClick={() => handleSelect('location')}
              className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors border-b border-bgLight ${
                activeIndex === 0 ? 'bg-primary/5 text-primary' : 'hover:bg-bgLight'
              }`}
            >
              <span className="text-lg">🎯</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-textMain">Use My Current Location</span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Auto-detecting...</span>
              </div>
            </div>

            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <div
                  key={`${city.name}-${city.state}`}
                  onClick={() => handleSelect(city)}
                  className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors border-b border-bgLight last:border-0 ${
                    activeIndex === index + 1 ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-bgLight'
                  }`}
                >
                  <span className="text-lg grayscale group-hover:grayscale-0">🏙️</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-textMain">{city.name}</span>
                    <span className="text-[10px] text-textSecondary font-medium">{city.state}</span>
                  </div>
                </div>
              ))
            ) : query.trim() !== '' ? (
              <div className="px-5 py-8 text-center">
                <span className="text-3xl mb-3 block">🏜️</span>
                <p className="text-sm font-medium text-textMuted">No cities found. Try another name.</p>
              </div>
            ) : (
                <div className="px-5 py-4 text-[10px] font-bold text-textSecondary uppercase tracking-widest text-center italic bg-bgLight">
                    Start typing to see cities...
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearchInput;
