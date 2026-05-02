import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import DoctorCard from '../components/DoctorCard';
import CitySearchInput from '../components/CitySearchInput';
import { getDoctorsAPI } from '../api/doctor.api';
import { doctors as localDoctors } from '../data/doctors';

// Helper: calculate distance between two lat/lng points (km)
const calcDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Normalize a doctor from either API or local format
const normalizeDoctor = (d) => ({
  ...d,
  id: d._id || d.id,
  lat: d.location?.lat || d.lat,
  lng: d.location?.lng || d.lng,
  address: d.location?.address || d.address || '',
  costMin: d.costRange?.min || d.costValue || 0,
  distanceBadge: d.distance ? `${Number(d.distance).toFixed(1)} km away` : '',
});

const FindDoctor = () => {
  const [userLocation, setUserLocation] = useState([19.0760, 72.8777]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [specialty, setSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingLocalData, setUsingLocalData] = useState(false);

  const listRef = useRef({});

  // Get user GPS location on mount
  const fetchLocation = (shouldFly = false) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLoc = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(newLoc);
          if (shouldFly) setSelectedCity(null);
        },
        () => {
          // Stay at Mumbai default if GPS denied
        },
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // Main fetch function — tries backend first, falls back to local
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getDoctorsAPI({
        city: selectedCity?.name,
        specialty: specialty !== 'All' ? specialty : undefined,
        lat: userLocation[0],
        lng: userLocation[1],
        search: searchQuery
      });

      const apiDoctors = res.data?.data?.doctors || [];

      if (apiDoctors.length > 0) {
        // API returned data — use it
        const mapped = apiDoctors.map(d => normalizeDoctor({
          ...d,
          distance: d.distance
        }));
        setDoctors(mapped);
        setUsingLocalData(false);
      } else {
        // API returned 0 results — fall back to local
        throw new Error('Empty results');
      }
    } catch {
      // Fallback: filter & sort local doctors
      let results = localDoctors.map(d => {
        const lat = d.location?.lat || d.lat;
        const lng = d.location?.lng || d.lng;
        const distance = calcDistance(userLocation[0], userLocation[1], lat, lng);
        return normalizeDoctor({ ...d, distance });
      });

      // Apply filters on local data
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        results = results.filter(d =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.hospital.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q)
        );
      }

      if (selectedCity?.name) {
        results = results.filter(d =>
          d.city.toLowerCase() === selectedCity.name.toLowerCase()
        );
      }

      if (specialty && specialty !== 'All') {
        results = results.filter(d => d.specialty === specialty);
      }

      // Sort by distance
      results.sort((a, b) => (a.distance || 999) - (b.distance || 999));

      // Add distance badge
      results = results.map(d => ({
        ...d,
        distanceBadge: d.distance ? `${d.distance.toFixed(1)} km away` : ''
      }));

      setDoctors(results);
      setUsingLocalData(true);
    } finally {
      setLoading(false);
    }
  };

  // Debounced refetch on filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoctors();
    }, 400);
    return () => clearTimeout(timer);
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
      fetchLocation(true);
    } else {
      setSelectedCity(city);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-bgLight overflow-hidden">
      <Navbar />

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <aside className="w-full md:w-[40%] flex flex-col border-r border-borderSoft bg-white z-10">
          <div className="p-6 border-b border-borderSoft bg-bgLight/30 backdrop-blur-md">
            <h1 className="text-2xl font-display font-bold text-textMain mb-4">Find Doctors</h1>

            <div className="space-y-4">
              {/* Search */}
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

              {/* City + Specialty */}
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
                  {[...new Set(localDoctors.map(d => d.specialty))].sort().map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <div className="flex justify-between items-center px-2">
              <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">
                {loading
                  ? 'Searching...'
                  : `${doctors.length} ${doctors.length === 1 ? 'Result' : 'Results'} ${selectedCity ? `in ${selectedCity.name}` : 'near you'}`
                }
              </p>
              <div className="flex items-center gap-3">
                {usingLocalData && !loading && (
                  <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Offline mode
                  </span>
                )}
                {selectedCity && (
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="text-[10px] font-bold text-primary hover:text-secondary underline"
                  >
                    Clear City
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10 text-slate-500">
                <div className="text-3xl mb-3 animate-pulse">🔍</div>
                <p className="font-medium text-sm">Finding doctors near you...</p>
              </div>
            ) : doctors.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🏥</div>
                <p className="font-bold text-slate-700 mb-2">No doctors found</p>
                <p className="text-sm text-slate-400 mb-4">Try clearing filters or searching differently</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCity(null);
                    setSpecialty('All');
                  }}
                  className="px-5 py-2 bg-primary text-white font-bold rounded-xl text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              doctors.map((doc, idx) => (
                <div
                  key={doc.id || doc._id}
                  ref={el => listRef.current[doc.id || doc._id] = el}
                  className={`transition-all ${selectedDoctorId === (doc.id || doc._id) ? 'ring-2 ring-primary ring-offset-2 rounded-2xl' : ''}`}
                >
                  <div className="relative">
                    {idx === 0 && !selectedCity && (
                      <div className="absolute -top-2 -right-2 z-20 bg-primary text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
                        Nearest to you 🟢
                      </div>
                    )}
                    <DoctorCard
                      doctor={doc}
                      onSelect={() => handleDoctorClick(doc.id || doc._id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* RIGHT PANEL — MAP */}
        <main className="flex-1 relative h-[300px] md:h-full">
          <MapView
            doctors={doctors}
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
