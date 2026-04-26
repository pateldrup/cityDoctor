import React from 'react';
import Navbar from '../components/Navbar';

const FeatureCard = ({ title, description, icon }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <header className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Find Trusted Doctors Anywhere
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Quality healthcare for travelers. Access verified practitioners in unfamiliar cities with transparent pricing.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-transform active:scale-95">
            Find a Doctor Now
          </button>
        </div>
      </header>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
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
    </div>
  );
};

export default HomePage;
