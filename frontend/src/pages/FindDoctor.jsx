import React, { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import DoctorCard from '../components/DoctorCard';
import CitySearchInput from '../components/CitySearchInput';
import { doctors } from '../data/doctors';
import { getDistance } from '../utils/distance';

const FindDoctor = () => {
  const [userLocation, setUserLocation] = useState([19.0760, 72.8777]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // { name, lat, lng }
  const [specialty, setSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const listRef = useRef({});

  // Function to fetch and update location
  const fetchLocation = (shouldFly = false) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLoc = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(newLoc);
          if (shouldFly) {
            setSelectedCity(null); // This triggers MapView to center on userLocation
          }
        },
        (err) => {
          console.error("Location error:", err);
          alert("Could not access your location. Defaulting to Mumbai.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter(doc => {
        const cityMatch = !selectedCity || doc.city === selectedCity.name;
        const specialtyMatch = specialty === 'All' || doc.specialty === specialty;
        const searchMatch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
        return cityMatch && specialtyMatch && searchMatch;
      })
      .map(doc => ({
        ...doc,
        distance: getDistance(userLocation[0], userLocation[1], doc.lat, doc.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [selectedCity, specialty, searchQuery, userLocation]);

  const handleDoctorClick = (id) => {
    setSelectedDoctorId(id);
    const element = listRef.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCitySelect = (city) => {
    if (city === null) {
        // "Use My Location" was selected
        fetchLocation(true);
    } else {
        setSelectedCity(city);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-bgLight overflow-hidden">
      <Navbar />
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* LEFT SIDE: DOCTOR LIST (40%) */}
        <aside className="w-full md:w-[40%] flex flex-col border-r border-borderSoft bg-white z-10">
          <div className="p-6 border-b border-borderSoft bg-bgLight/30 backdrop-blur-md">
            <h1 className="text-2xl font-display font-bold text-textMain mb-4">Find Doctors</h1>
            
            <div className="space-y-4">
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search by name or hospital..." 
                        className="w-full pl-12 pr-4 py-3 bg-white border border-borderSoft rounded-xl outline-none focus:border-primary transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <CitySearchInput 
                        onCitySelect={handleCitySelect} 
                        initialCity={selectedCity ? selectedCity.name : ''}
                    />
                    
                    <select 
                        className="px-4 py-3 bg-white border border-borderSoft rounded-xl text-xs font-bold outline-none focus:border-primary min-w-[140px]"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    >
                        <option value="All">All Specialties</option>
                        {['General Physician', 'Dentist', 'Pediatrician', 'Dermatologist', 'Orthopedic', 'Cardiologist'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <div className="flex justify-between items-center px-2">
                <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">
                    {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Result' : 'Results'} {selectedCity ? `in ${selectedCity.name}` : 'near you'}
                </p>
                {selectedCity && (
                    <button 
                        onClick={() => setSelectedCity(null)}
                        className="text-[10px] font-bold text-primary hover:text-secondary underline"
                    >
                        Clear City
                    </button>
                )}
            </div>
            
            {filteredDoctors.map((doc, idx) => (
              <div 
                key={doc.id} 
                ref={el => listRef.current[doc.id] = el}
                onClick={() => handleDoctorClick(doc.id)}
                className={`transition-all cursor-pointer ${selectedDoctorId === doc.id ? 'ring-2 ring-primary ring-offset-2 rounded-2xl' : ''}`}
              >
                <div className="relative">
                    {idx === 0 && (
                        <div className="absolute -top-2 -right-2 z-20 bg-primary text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
                            Nearest to you 🟢
                        </div>
                    )}
                    <DoctorCard 
                        doctor={{
                            ...doc,
                            distanceBadge: `${doc.distance.toFixed(1)} km away`
                        }} 
                    />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT SIDE: MAP VIEW (60%) */}
        <main className="flex-1 relative h-[300px] md:h-full">
          <MapView 
            doctors={filteredDoctors} 
            selectedDoctorId={selectedDoctorId}
            onDoctorSelect={(id) => handleDoctorClick(id)}
            selectedCity={selectedCity}
            userLocation={userLocation}
          />
        </main>
      </div>
    </div>
  );
};

export default FindDoctor;
