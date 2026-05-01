import React from 'react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-bgLight py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-borderSoft p-8">
        <h1 className="text-3xl font-display font-bold text-textMain mb-6">Settings</h1>
        <p className="text-textMuted mb-8">Manage your account settings and preferences here.</p>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-bgLight rounded-xl border border-borderSoft">
            <div>
              <p className="font-bold text-textMain">Email Notifications</p>
              <p className="text-sm text-textMuted">Receive updates about your bookings</p>
            </div>
            <div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-bgLight rounded-xl border border-borderSoft">
            <div>
              <p className="font-bold text-textMain">SMS Alerts</p>
              <p className="text-sm text-textMuted">Get SMS for emergencies and appointments</p>
            </div>
            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
