import React from 'react';

const AppointmentTypeTabs = ({ selected, onChange }) => {
  const tabs = [
    { id: 'walkin', label: 'Walk-in', icon: '🚶' },
    { id: 'video', label: 'Video', icon: '📹' },
    { id: 'home', label: 'Home', icon: '🏠' }
  ];

  return (
    <div className="bg-slate-100/50 p-1 rounded-2xl flex gap-1 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
            selected === tab.id 
              ? 'bg-white text-[#0D5C4A] shadow-md border border-white' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AppointmentTypeTabs;
