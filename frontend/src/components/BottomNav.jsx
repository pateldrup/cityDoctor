import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const items = [
    { label: 'EXPLORE', icon: '🧭', path: '/home' },
    { label: 'SEARCH', icon: '🔍', path: '/search' },
    { label: 'BOOKINGS', icon: '📅', path: '/bookings' },
    { label: 'SOS', icon: '❄️', path: '/sos' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-3 flex justify-between items-center z-50">
      {items.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/home' && location.pathname === '/dashboard');
        return (
          <Link 
            key={item.label} 
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${isActive ? 'bg-[#0F172A] text-white shadow-lg' : 'text-slate-400'}`}
          >
            <span className="text-lg">{item.icon}</span>
            {isActive && <span className="text-[0.6rem] font-black tracking-widest leading-none">{item.label}</span>}
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;

