import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DoctorGrid from '../components/DoctorGrid';
import MapView from '../components/MapView';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { doctors } from '../data/doctors';



const FeatureCard = ({ title, description, icon }) => (
  <div className="modern-card p-8 flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-bgLight rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
        {icon}
    </div>
    <h3 className="text-2xl font-display font-bold text-textMain mb-3">{title}</h3>
    <p className="text-textMuted font-medium leading-relaxed">{description}</p>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bgLight">
      <Navbar />
      <Hero />

      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <h2 className="text-4xl font-display font-bold text-textMain mb-4">Doctors Near You Right Now</h2>
                <p className="text-textMuted font-medium italic">Showing the 5 closest verified specialists based on your current location.</p>
            </div>
            <button 
                onClick={() => navigate('/find-doctor')}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition-all shadow-xl flex items-center gap-2"
            >
                View All on Map <span className="text-xl">🗺️</span>
            </button>
        </div>
        <div className="h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white slide-up">
            <MapView 
                doctors={doctors.slice(0, 5)} 
                selectedDoctorId={null} 
                onDoctorSelect={(id) => navigate(`/find-doctor?id=${id}`)} 
            />
        </div>
      </section>

      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-4xl font-display font-bold text-textMain mb-4">Top Rated Specialists</h2>
                <p className="text-textMuted font-medium">Hand-picked doctors with consistent 5-star ratings from travelers.</p>
            </div>
            <button 
                onClick={() => navigate('/find-doctor')}
                className="text-primary font-bold hover:text-secondary flex items-center gap-2 group transition-all"
            >
                View All Doctors <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </div>
        <DoctorGrid limit={3} />
      </section>

      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-textMain mb-4">Why Travelers Trust CityDoctor</h2>
                <p className="text-textMuted max-w-2xl mx-auto font-medium">We bridge the gap between travelers and local healthcare, ensuring quality care without the language barrier.</p>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureCard 
                icon="🌿"
                title="Verified Doctors"
                description="Every practitioner in our network undergoes a rigorous 15-point verification process for your safety."
              />
              <FeatureCard 
                icon="💎"
                title="Fixed Pricing"
                description="Know exactly what you'll pay before your appointment. No tourist surcharges, ever."
              />
              <FeatureCard 
                icon="🤝"
                title="Multilingual Support"
                description="Speak your language. We prioritize bilingual doctors who can clearly communicate your diagnosis."
              />
            </div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-primary py-20 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-display font-bold text-white mb-6">Ready to find a doctor?</h2>
            <p className="text-bgLight/80 text-xl mb-10 font-medium">Join 50,000+ travelers who have found peace of mind with CityDoctor.</p>
            <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-bgLight transition-all shadow-xl">
                Get Started Now
            </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );

};


export default Home;
