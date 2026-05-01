import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../translations';
import { useNotifications } from '../context/NotificationContext';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { t } = useTranslation(lang);
  const { unreadCount } = useNotifications();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navLinks = [
    { label: t?.common?.home || "Home", path: "/", icon: "🏠" },
    { label: t?.nav?.findDoctor || "Find Doctor", path: "/find-doctor", icon: "🔍" },
    { label: t?.nav?.emergency || "Emergency", path: "/emergency", icon: "🚨" },
    { label: t?.nav?.costEstimator || "Cost Estimator", path: "/cost-estimator", icon: "💰" },
    { label: t?.nav?.about || "About", path: "/about", icon: "ℹ️" },
  ];

  return (
    <>
      {/* Emergency Top Banner */}
      <div className="bg-emergency text-white text-center py-2 px-4 text-xs font-bold tracking-widest uppercase relative z-[60]">
        🚨 Medical Emergency? Call 1800-MED-HELP (24/7 Support)
      </div>

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-borderSoft nav-slide-down">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" end className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emergency rounded-lg flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:rotate-12">
              +
            </div>
            <span className="text-2xl font-display font-bold text-primary tracking-tight">CityDoctor</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 font-semibold border-b-2 border-green-600 pb-1"
                    : "text-gray-700 hover:text-green-700 transition-colors duration-200"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Tools */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-sm font-bold text-textMain px-3 py-1.5 rounded-lg border border-borderSoft bg-bgLight cursor-default">
                <span>🌐</span> EN
              </button>
            </div>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: '1px solid #e0e0e0',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  transition: 'all 0.2s',
                }}
              >
                🔔
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#E74C3C',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid white',
                    animation: 'badgePulse 2s infinite',
                  }}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown Panel */}
              {isNotifOpen && <NotificationDropdown isOpen={isNotifOpen} setIsOpen={setIsNotifOpen} />}
            </div>

            {isLoggedIn && user ? (
              <div className="relative group/profile">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-lg shadow-sm hover:shadow-md transition-all border-2 border-white ring-2 ring-transparent hover:ring-secondary/30"
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </button>
                
                {/* Profile Dropdown */}
                <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-borderSoft transition-all py-2 origin-top-right z-50 ${isProfileOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                  <div className="px-4 py-2 border-b border-borderSoft mb-1">
                    <p className="text-sm font-bold text-textMain truncate">{user.name}</p>
                    <p className="text-xs text-textMuted truncate">{user.email}</p>
                  </div>
                  <Link to="/profile" className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-bgLight text-textMain flex items-center gap-2"><span>👤</span> My Profile</Link>
                  <Link to="/bookings" className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-bgLight text-textMain flex items-center gap-2"><span>📅</span> My Bookings</Link>
                  <Link to="/settings" className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-bgLight text-textMain flex items-center gap-2"><span>⚙️</span> Settings</Link>
                  <div className="h-px bg-borderSoft my-1"></div>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm font-bold hover:bg-red-50 text-emergency flex items-center gap-2"><span>🚪</span> Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-5 py-2.5 rounded-xl font-bold text-sm text-primary border border-primary hover:bg-primary/5 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="bg-secondary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#27ae60] transition-all shadow-soft active:scale-95">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-borderSoft p-6 flex flex-col gap-6 animate-fadeIn">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-lg font-display font-bold ${isActive ? 'text-green-700' : 'text-textMain'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon} {link.label}
              </NavLink>
            ))}
            <div className="h-px bg-borderSoft my-2"></div>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="w-full bg-bgLight text-primary py-3 rounded-xl font-bold flex justify-center items-center gap-2"><span>👤</span> My Profile</Link>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full border border-emergency text-emergency py-3 rounded-xl font-bold flex justify-center items-center gap-2"><span>🚪</span> Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full border border-primary text-primary py-3 rounded-xl font-bold text-center">Login</Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full bg-secondary text-white py-3 rounded-xl font-bold text-center">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
