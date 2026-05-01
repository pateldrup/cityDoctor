import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full px-8 py-6 flex justify-between items-center bg-transparent">
      <div className="text-[1.2rem] font-black tracking-tighter text-[#0F172A]">
        CITYDOCTOR
      </div>
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-5 h-5 flex items-center justify-center bg-slate-200 rounded-full group-hover:bg-teal-100 transition-colors">
          <svg className="w-3 h-3 text-slate-600 group-hover:text-[#0D5C4A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        </div>
        <span className="text-[0.7rem] font-bold text-slate-500 tracking-widest uppercase flex items-center gap-1 group-hover:text-[#0D5C4A] transition-colors">
          English <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
