import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0D1117] text-white pt-24 pb-12 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emergency rounded-lg flex items-center justify-center text-white font-bold text-xl">
                +
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">CityDoctor</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Empowering international travelers with verified medical care and transparent pricing. Your health, our priority — anywhere.
            </p>
            <div className="flex gap-4">
              {['𝕏', 'f', 'in', '📸'].map((icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-sm">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/find-doctor" className="hover:text-white transition-colors">Find a Doctor</Link></li>
              <li><Link to="/emergency" className="hover:text-white transition-colors text-emergency font-bold">Emergency Help</Link></li>
              <li><Link to="/cost-estimator" className="hover:text-white transition-colors">Cost Estimator</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Travel Health Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Cities */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Service Cities</h4>
            <ul className="grid grid-cols-2 gap-4 text-slate-400 text-sm">
              <li><Link to="/find-doctor?city=Mumbai" className="hover:text-white transition-colors">Mumbai</Link></li>
              <li><Link to="/find-doctor?city=Delhi" className="hover:text-white transition-colors">Delhi</Link></li>
              <li><Link to="/find-doctor?city=Bangalore" className="hover:text-white transition-colors">Bangalore</Link></li>
              <li><Link to="/find-doctor?city=Jaipur" className="hover:text-white transition-colors">Jaipur</Link></li>
              <li><Link to="/find-doctor?city=Goa" className="hover:text-white transition-colors">Goa</Link></li>
              <li><Link to="/find-doctor?city=Chennai" className="hover:text-white transition-colors">Chennai</Link></li>
              <li><Link to="/find-doctor?city=Hyderabad" className="hover:text-white transition-colors">Hyderabad</Link></li>
            </ul>

          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-lg">📞</span> +91 1800-MED-HELP
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">📧</span> support@citydoctor.com
              </li>
              <li className="pt-4">
                <a 
                    href="https://wa.me/9118006334357" 
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:brightness-105 transition-all w-fit"
                >
                    <span>💬</span> WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <p>© 2025 CityDoctor Medical Assistance. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms" className="hover:text-white">Terms of Service</a>
            <span className="text-slate-600">|</span>
            <p>Made with ❤️ for Global Travelers</p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/9118006334357" 
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-all z-[100] animate-bounce"
        title="Chat with us on WhatsApp"
      >
        💬
      </a>
    </footer>
  );
};

export default Footer;
