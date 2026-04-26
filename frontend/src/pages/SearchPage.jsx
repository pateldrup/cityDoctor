import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import DoctorCard from '../components/DoctorCard';

const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Julian Smith", specialty: "General Practitioner", city: "Paris", costRange: "$50 - $80", languages: ["English", "French"], rating: 4.9 },
  { id: 2, name: "Dr. Elena Rodriguez", specialty: "Pediatrician", city: "Barcelona", costRange: "$60 - $100", languages: ["Spanish", "English"], rating: 4.8 },
  { id: 3, name: "Dr. Hiroshi Tanaka", specialty: "Dentist", city: "Tokyo", costRange: "$40 - $150", languages: ["Japanese", "English"], rating: 4.7 }
];

const SearchPage = () => {
  const [results, setResults] = useState(MOCK_DOCTORS);

  const handleSearch = (filters) => {
    // Basic filter logic for demonstration
    const filtered = MOCK_DOCTORS.filter(doc => 
      (!filters.city || doc.city === filters.city) &&
      (!filters.specialty || doc.specialty === filters.specialty) &&
      (!filters.language || doc.languages.includes(filters.language))
    );
    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="bg-blue-600 h-48 w-full flex items-center justify-center">
        <h2 className="text-white text-3xl font-bold mt-[-20px]">Find Your Local Specialist</h2>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <SearchBar onSearch={handleSearch} />
        
        <div className="mt-16 space-y-6 fade-in">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800">{results.length} Doctors Found</h3>
            <span className="text-slate-500">Sorted by Rating</span>
          </div>
          
          {results.length > 0 ? (
            results.map(doc => <DoctorCard key={doc.id} {...doc} />)
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-500 text-xl">No doctors match your search. Try different filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
