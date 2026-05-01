import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Soft Teal Gradient Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#F0FAF4]"></div>
        <div className="absolute -top-1/2 -left-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-[#1A6B3C]/10 via-[#2ECC71]/5 to-transparent blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[100%] h-[100%] bg-gradient-to-bl from-[#A8E063]/10 via-transparent to-transparent blur-[100px]"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10 text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-display font-bold text-textMain mb-6 leading-[1.1] tracking-tight fade-in stagger-1">
          Find Trusted Doctors. <br />
          <span className="text-primary italic">Anywhere. Anytime.</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg md:text-2xl text-textSecondary font-medium mb-12 max-w-3xl mx-auto leading-relaxed fade-in stagger-2">
          Verified English-speaking doctors in 50+ cities <br className="hidden md:block" /> with transparent costs for international travelers.
        </p>

        {/* Search Bar with 3 Fields */}
        <div className="bg-white/80 backdrop-blur-xl p-3 rounded-[2rem] border border-white shadow-[0_20px_60px_rgba(26,107,60,0.15)] max-w-5xl mx-auto flex flex-col lg:flex-row gap-2 fade-in stagger-3">
          {/* City Dropdown */}
          <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-bgLight rounded-2xl border border-transparent hover:border-secondary transition-all">
            <span className="text-xl">📍</span>
            <div className="text-left grow">
                <p className="text-[0.6rem] font-bold text-textSecondary uppercase tracking-widest leading-none mb-1">Location</p>
                <select className="w-full bg-transparent outline-none font-bold text-textMain text-sm appearance-none cursor-pointer">
                    <option>Select City...</option>
                    <option>Mumbai, India</option>
                    <option>Delhi, India</option>
                    <option>Lisbon, Portugal</option>
                </select>
            </div>
          </div>

          {/* Specialty Dropdown */}
          <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-bgLight rounded-2xl border border-transparent hover:border-secondary transition-all">
            <span className="text-xl">🩺</span>
            <div className="text-left grow">
                <p className="text-[0.6rem] font-bold text-textSecondary uppercase tracking-widest leading-none mb-1">Specialty</p>
                <select className="w-full bg-transparent outline-none font-bold text-textMain text-sm appearance-none cursor-pointer">
                    <option>All Specialists</option>
                    <option>General Physician</option>
                    <option>Cardiologist</option>
                    <option>Dentist</option>
                </select>
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-bgLight rounded-2xl border border-transparent hover:border-secondary transition-all">
            <span className="text-xl">💬</span>
            <div className="text-left grow">
                <p className="text-[0.6rem] font-bold text-textSecondary uppercase tracking-widest leading-none mb-1">Language</p>
                <select className="w-full bg-transparent outline-none font-bold text-textMain text-sm appearance-none cursor-pointer">
                    <option>Any Language</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                </select>
            </div>
          </div>

          <button className="bg-primary hover:bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95">
            Search
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-textMuted fade-in stagger-4">
            <div className="flex items-center gap-2 font-bold text-sm">
                <span className="text-secondary text-lg">✓</span> 2000+ Verified Doctors
            </div>
            <div className="flex items-center gap-2 font-bold text-sm">
                <span className="text-secondary text-lg">✓</span> 50+ Cities
            </div>
            <div className="flex items-center gap-2 font-bold text-sm">
                <span className="text-secondary text-lg">✓</span> 24/7 Emergency
            </div>
            <div className="flex items-center gap-2 font-bold text-sm">
                <span className="text-secondary text-lg">✓</span> Price Transparency
            </div>
        </div>
      </div>

      {/* Decorative Hero Elements */}
      <div className="absolute top-20 right-[10%] text-6xl opacity-5 animate-bounce hidden lg:block">+</div>
      <div className="absolute bottom-20 left-[10%] text-6xl opacity-5 animate-bounce delay-700 hidden lg:block">+</div>
    </section>
  );
};

export default Hero;
