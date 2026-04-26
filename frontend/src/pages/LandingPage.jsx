import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const FeatureBadge = ({ icon, label, subtext }) => (
// ... existing FeatureBadge
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAutoDetect = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Simulate a delay for a premium feel
        setTimeout(() => {
          setLoading(false);
          navigate('/home');
        }, 1500);
      },
      (error) => {
        alert("Unable to retrieve your location. Please check your permissions.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4F8] relative overflow-hidden">
      {/* Background Map Overlay */}
// ... rest of background

      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 -mt-20 z-10">
// ... titles

        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={handleAutoDetect}
            disabled={loading}
            className={`bg-[#0D5C4A] hover:bg-[#084839] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Detecting...
              </span>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                Auto-detect location
              </>
            )}
          </button>
          
          <a href="/search" className="text-slate-400 font-bold text-xs hover:text-[#0D5C4A] transition-colors">
            Or select your destination manually →
          </a>
        </div>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-4 pb-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureBadge icon="✅" label="VERIFIED DOCTORS" subtext="Board-certified specialists only" />
          <FeatureBadge icon="💰" label="TRANSPARENT PRICING" subtext="No hidden fees, local rates" />
          <FeatureBadge icon="📞" label="24/7 SUPPORT" subtext="Global medical assistance team" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
