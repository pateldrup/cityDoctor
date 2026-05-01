import React from 'react';
import { useNavigate } from 'react-router-dom';

const SOSFab = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/sos')}
      className="fixed bottom-24 right-6 w-14 h-14 bg-[#C5281C] text-white rounded-full flex items-center justify-center text-3xl shadow-2xl shadow-red-900/40 z-40 active:scale-90 transition-transform cursor-pointer"
      aria-label="Emergency SOS"
    >
      <span className="mb-1">*</span>
    </button>
  );
};

export default SOSFab;
