import React from 'react';

const TopNavbar = () => {
  return (
    <nav className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="text-[1.2rem] font-black tracking-tighter text-[#0F172A]">CITYDOCTOR</div>
      
      <div className="flex items-center gap-10">
        {['Explore', 'Search', 'Bookings'].map((item) => (
          <div key={item} className={`relative cursor-pointer font-bold text-sm tracking-wide ${item === 'Search' ? 'text-[#0D5C4A]' : 'text-slate-400'}`}>
            {item}
            {item === 'Search' && <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#10B981] rounded-full"></div>}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 text-slate-400">
        <div className="bg-slate-50 flex items-center gap-3 px-4 py-2 rounded-xl border border-slate-100">
          <span className="text-sm">🔍</span>
          <input type="text" placeholder="Search specialists..." className="bg-transparent outline-none text-[0.8rem] font-medium w-40" />
        </div>
        <button className="text-lg">🔔</button>
        <button className="text-lg">📍</button>
      </div>
    </nav>
  );
};

export default TopNavbar;
