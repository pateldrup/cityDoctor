import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-bgLight">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-8 py-24">
        <h1 className="text-5xl font-display font-bold text-textMain mb-10 text-center">About CityDoctor</h1>
        
        <div className="space-y-12">
          <section className="modern-card p-10">
            <h2 className="text-2xl font-display font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-textSecondary font-medium leading-relaxed">
                CityDoctor was born out of a simple observation: international travelers often feel vulnerable when they fall ill in a foreign city. 
                Our mission is to bridge the gap between global travelers and trusted local healthcare, providing peace of mind through transparency, 
                verification, and multilingual support.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="modern-card p-8">
                <h3 className="text-xl font-display font-bold text-textMain mb-4">Verified Experts</h3>
                <p className="text-sm text-textSecondary font-medium leading-relaxed">
                    We don't just list doctors; we verify them. Every doctor in our network undergoes a 15-point check for credentials, 
                    language proficiency, and quality of facility.
                </p>
            </div>
            <div className="modern-card p-8">
                <h3 className="text-xl font-display font-bold text-textMain mb-4">Fixed Pricing</h3>
                <p className="text-sm text-textSecondary font-medium leading-relaxed">
                    Say goodbye to tourist surcharges. We negotiate fixed rates with clinics to ensure you pay exactly what a local would, 
                    with no hidden fees.
                </p>
            </div>
          </div>

          <section className="text-center py-10">
            <h2 className="text-3xl font-display font-bold text-textMain mb-6">Want to Join Our Network?</h2>
            <p className="text-textSecondary font-medium mb-10">We are always looking for verified, English-speaking clinics to partner with.</p>
            <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-secondary transition-all shadow-xl">
                Partner With Us
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
