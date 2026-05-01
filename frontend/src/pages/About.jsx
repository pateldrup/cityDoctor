import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialty: '',
    city: '',
    contact: ''
  });

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Our medical partnership team will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-bgLight">
      <Navbar />

      {/* 1. MISSION STATEMENT */}
      <section className="py-24 px-8 text-center bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-textMain mb-8 leading-tight">
            We believe no traveler should <br />
            <span className="text-primary italic">suffer alone</span> in an unfamiliar city.
          </h1>
          <p className="text-xl text-textSecondary font-medium leading-relaxed max-w-2xl mx-auto">
            CityDoctor was founded to eliminate the fear of falling ill abroad by providing verified, English-speaking medical assistance at transparent prices.
          </p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-50"></div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-textMain text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: '🔍', title: 'Search', desc: 'Find verified doctors in your current city who speak your language.' },
            { icon: '📱', title: 'Connect', desc: 'Book a consultation or call our 24/7 helpline for immediate assistance.' },
            { icon: '🩹', title: 'Get Care', desc: 'Receive quality medical care at fixed, local-standard rates with no hidden costs.' },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-soft group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-textMain mb-3">{step.title}</h3>
              <p className="text-textSecondary font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. STATS BAR */}
      <section className="bg-primary py-16 px-8 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Verified Doctors', value: '2000+' },
            { label: 'Active Cities', value: '50+' },
            { label: 'Satisfaction', value: '98%' },
            { label: 'Support', value: '24/7' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-display font-bold mb-1">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>


      {/* 5. PARTNERS SECTION */}
      <section className="py-16 px-8 bg-white border-y border-borderSoft">
        <div className="max-w-7xl mx-auto">
            <p className="text-center text-[0.7rem] font-bold text-textSecondary uppercase tracking-[0.3em] mb-10">Trusted By Global Health Organizations</p>
            <div className="flex flex-wrap justify-center gap-10 opacity-40 grayscale">
                {[1, 2, 3, 4, 5].map(p => (
                    <div key={p} className="h-12 w-40 border-2 border-textMuted rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-widest text-textMuted">
                        Hospital Partner {p}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 6. CTA DOCTOR FORM */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="modern-card p-12 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-textMain mb-4">Are you a doctor?</h2>
                <p className="text-textSecondary font-medium">Join our verified network and help international travelers in your city.</p>
            </div>
            
            <form onSubmit={handleDoctorSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-widest px-1">Full Name</label>
                        <input 
                            type="text" required placeholder="Dr. John Doe"
                            className="bg-bgLight border border-borderSoft px-6 py-4 rounded-xl outline-none focus:border-primary font-medium"
                            value={doctorForm.name} onChange={(e) => setDoctorForm({...doctorForm, name: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-widest px-1">Medical Specialty</label>
                        <input 
                            type="text" required placeholder="Cardiologist"
                            className="bg-bgLight border border-borderSoft px-6 py-4 rounded-xl outline-none focus:border-primary font-medium"
                            value={doctorForm.specialty} onChange={(e) => setDoctorForm({...doctorForm, specialty: e.target.value})}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-widest px-1">City</label>
                        <input 
                            type="text" required placeholder="Mumbai, India"
                            className="bg-bgLight border border-borderSoft px-6 py-4 rounded-xl outline-none focus:border-primary font-medium"
                            value={doctorForm.city} onChange={(e) => setDoctorForm({...doctorForm, city: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-widest px-1">Contact Email / Phone</label>
                        <input 
                            type="text" required placeholder="john@clinic.com"
                            className="bg-bgLight border border-borderSoft px-6 py-4 rounded-xl outline-none focus:border-primary font-medium"
                            value={doctorForm.contact} onChange={(e) => setDoctorForm({...doctorForm, contact: e.target.value})}
                        />
                    </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-secondary transition-all shadow-xl active:scale-95">
                    Join Our Network
                </button>
            </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
