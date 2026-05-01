import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

const FeatureCard = ({ title, description, icon }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow fade-in">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="Find Trusted Doctors Anywhere"
        subtitle="Quality healthcare for travelers. Access verified practitioners in unfamiliar cities with transparent pricing."
        ctaText="Find a Doctor Now"
        ctaLink="/search"
      />

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="💬"
            title="English Speaking Doctors"
            description="Bridge the language barrier with verified bilingual medical professionals worldwide."
          />
          <FeatureCard 
            icon="💰"
            title="Transparent Costs"
            description="Know the price before you visit. No hidden fees or tourist surcharges."
          />
          <FeatureCard 
            icon="☎️"
            title="24/7 Helpline"
            description="Our dedicated support team is always available to assist with your medical emergencies."
          />
        </div>
      </section>
      
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center mt-auto">
        <p className="text-white font-bold mb-2">🏥 MediTravel</p>
        <p className="text-sm italic mb-4">Your Health, Our Priority — Anywhere in the World</p>
        <div className="text-xs border-t border-slate-800 pt-8">
          &copy; 2026 MediTravel Assistance. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
