import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10 fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>
        <Link to={ctaLink} className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-extrabold py-5 px-10 rounded-2xl text-lg shadow-2xl transition-all hover:scale-105 active:scale-95">
          {ctaText}
        </Link>
      </div>
    </header>
  );
};

export default HeroSection;
