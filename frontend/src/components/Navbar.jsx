import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold tracking-tight">🏥 MediTravel</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="/" className="hover:text-blue-100 px-3 py-2 font-medium">Home</a>
              <a href="/doctors" className="hover:text-blue-100 px-3 py-2 font-medium">Find Doctor</a>
              <a href="/login" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold">Login</a>
              <a href="/signup" className="border border-white hover:bg-white/10 px-4 py-2 rounded-lg font-medium">Sign Up</a>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> 
                       : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block px-3 py-2 rounded-md font-medium hover:bg-blue-800">Home</a>
          <a href="/doctors" className="block px-3 py-2 rounded-md font-medium hover:bg-blue-800">Find Doctor</a>
          <a href="/login" className="block px-3 py-2 rounded-md font-medium hover:bg-blue-800">Login</a>
          <a href="/signup" className="block px-3 py-2 rounded-md font-medium hover:bg-blue-800">Sign Up</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
