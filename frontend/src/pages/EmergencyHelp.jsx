import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import EmergencyModal from '../components/EmergencyModal';

const mockERs = [
  { name: "Lilavati Hospital", area: "Bandra", distance: "1.2 km", phone: "022-2675-1000", beds: 8 },
  { name: "Kokilaben Hospital", area: "Andheri", distance: "3.4 km", phone: "022-3066-0000", beds: 14 },
  { name: "Hinduja Hospital", area: "Mahim", distance: "2.1 km", phone: "022-2445-2222", beds: 5 },
  { name: "Breach Candy Hospital", area: "Breach Candy", distance: "4.2 km", phone: "022-2367-4888", beds: 3 },
  { name: "Nanavati Hospital", area: "Vile Parle", distance: "5.1 km", phone: "022-2626-7500", beds: 11 },
];

const mockPharmacies = [
  { name: "Apollo Pharmacy", area: "Bandra West", distance: "0.8 km", phone: "1800-180-8080", delivers: true },
  { name: "MedPlus", area: "Linking Road", distance: "1.3 km", phone: "040-6700-6700", delivers: true },
  { name: "Wellness Forever", area: "Khar", distance: "1.9 km", phone: "022-4897-0000", delivers: false },
  { name: "Noble Chemist", area: "Santacruz", distance: "2.4 km", phone: "022-2649-0022", delivers: true },
  { name: "Sahakari Bhandar Pharmacy", area: "Mahim", distance: "3.1 km", phone: "022-2444-3311", delivers: false },
];

const EmergencyHelp = () => {
  const [insuranceForm, setInsuranceForm] = useState({ name: '', provider: '', policyNumber: '', issue: '' });

  // Modal States
  const [ambulanceModal, setAmbulanceModal] = useState({ open: false, status: 'confirming', lat: null, lng: null });
  const [erModalOpen, setErModalOpen] = useState(false);
  const [pharmacyModalOpen, setPharmacyModalOpen] = useState(false);
  const [videoModal, setVideoModal] = useState({ open: false, step: 1, selectedIssues: [] });
  const [locatingBtn, setLocatingBtn] = useState(null); 
  const [ambulanceProgress, setAmbulanceProgress] = useState(0);

  useEffect(() => {
    if (ambulanceModal.status === 'dispatching') {
      setAmbulanceProgress(0);
      const interval = setInterval(() => {
        setAmbulanceProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setAmbulanceModal(prev => ({ ...prev, status: 'confirmed' }));
            return 100;
          }
          return p + 5;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [ambulanceModal.status]);

  const handleDispatchAmbulance = () => {
    setLocatingBtn('ambulance');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocatingBtn(null);
          setAmbulanceModal({ open: true, lat: position.coords.latitude, lng: position.coords.longitude, status: 'confirming' });
        },
        () => {
          setLocatingBtn(null);
          setAmbulanceModal({ open: true, status: 'manual' });
        }
      );
    } else {
      setLocatingBtn(null);
      setAmbulanceModal({ open: true, status: 'manual' });
    }
  };

  const handleLocateER = () => {
    setLocatingBtn('er');
    setTimeout(() => {
      setLocatingBtn(null);
      setErModalOpen(true);
    }, 600);
  };

  const handleFindPharmacy = () => {
    setLocatingBtn('pharmacy');
    setTimeout(() => {
      setLocatingBtn(null);
      setPharmacyModalOpen(true);
    }, 600);
  };

  const handleVideoConsult = () => {
    setVideoModal({ open: true, step: 1, selectedIssues: [] });
  };

  const toggleIssue = (issue) => {
    setVideoModal(prev => {
      const issues = prev.selectedIssues.includes(issue) 
        ? prev.selectedIssues.filter(i => i !== issue)
        : [...prev.selectedIssues, issue];
      return { ...prev, selectedIssues: issues };
    });
  };

  const handleInsuranceSubmit = (e) => {
    e.preventDefault();
    alert('Insurance claim assistance request submitted. Our team will contact you shortly.');
  };

  const cityContacts = [
    { city: 'Mumbai', number: '102 / 108', hospital: 'Lilavati Hospital' },
    { city: 'Delhi', number: '102 / 108', hospital: 'AIIMS Emergency' },
    { city: 'Bangalore', number: '108', hospital: 'Manipal Hospital' },
    { city: 'Jaipur', number: '108', hospital: 'Fortis Escorts' },
    { city: 'Goa', number: '108', hospital: 'GMC Emergency' },
  ];

  const quickActions = [
    { 
      id: 'ambulance', icon: '🚑', title: 'Call Ambulance', desc: 'Instant dispatch to your location.', 
      btn: 'Dispatch Now', handler: handleDispatchAmbulance, 
      bgColor: 'bg-[#E74C3C]', hoverBg: 'hover:bg-[#C0392B]' 
    },
    { 
      id: 'er', icon: '🏥', title: 'Find Nearest ER', desc: 'Real-time navigation to closest ER.', 
      btn: 'Locate ER', handler: handleLocateER, 
      bgColor: 'bg-[#E67E22]', hoverBg: 'hover:bg-[#D35400]' 
    },
    { 
      id: 'pharmacy', icon: '💊', title: '24/7 Pharmacy', desc: 'Open late night pharmacies near you.', 
      btn: 'Find Open Now', handler: handleFindPharmacy, 
      bgColor: 'bg-[#3498DB]', hoverBg: 'hover:bg-[#2980B9]' 
    },
    { 
      id: 'video', icon: '🩺', title: 'Video Consult', desc: 'Talk to a doctor in 60 seconds.', 
      btn: 'Start Call', handler: handleVideoConsult, 
      bgColor: 'bg-[#1A6B3C]', hoverBg: 'hover:bg-[#14522D]' 
    },
  ];

  return (
    <div className="min-h-screen bg-bgLight">
      <Navbar />

      {/* Top Banner */}
      <section className="bg-emergency py-16 px-8 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Are you in a medical emergency?</h1>
          <p className="text-xl opacity-80 mb-10 font-medium italic">Our global response team is available 24/7 to assist you.</p>
          <button className="bg-white text-emergency px-12 py-5 rounded-2xl font-bold text-xl md:text-2xl pulse-red shadow-2xl transition-all">
            Call Now: 1800-MED-HELP
          </button>
        </div>
        <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
      </section>

      <main className="max-w-7xl mx-auto px-8 py-20">
        
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 relative">
          
          {/* Pulsing Dot when Modal Open */}
          {(ambulanceModal.open || erModalOpen || pharmacyModalOpen || videoModal.open) && (
            <div className="absolute -top-12 right-0 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live Connect Active</span>
            </div>
          )}

          {quickActions.map((item) => (
            <div key={item.id} className="modern-card p-8 flex flex-col items-center text-center group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-display font-bold text-textMain mb-3">{item.title}</h3>
              <p className="text-textSecondary text-sm font-medium mb-8 leading-relaxed">{item.desc}</p>
              <button 
                onClick={item.handler}
                disabled={locatingBtn === item.id}
                className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide text-white transition-all shadow-md active:scale-98 hover:-translate-y-1 ${item.bgColor} ${item.hoverBg} ${item.id === 'ambulance' ? 'hover:shadow-red-500/30' : ''}`}
              >
                {locatingBtn === item.id ? '📍 Locating...' : item.btn}
              </button>
            </div>
          ))}
        </div>

        {/* ... Rest of existing layout ... */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <section>
            <h2 className="text-3xl font-display font-bold text-textMain mb-8 flex items-center gap-3">
                <span className="text-primary text-2xl">📍</span> Local Emergency Contacts
            </h2>
            <div className="modern-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-bgLight">
                        <tr>
                            <th className="px-6 py-4 text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest">City</th>
                            <th className="px-6 py-4 text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest">Emergency #</th>
                            <th className="px-6 py-4 text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest">Key Hospital</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-borderSoft">
                        {cityContacts.map((contact, i) => (
                            <tr key={i} className="hover:bg-bgLight transition-colors">
                                <td className="px-6 py-5 text-sm font-bold text-textMain">{contact.city}</td>
                                <td className="px-6 py-5 text-sm font-bold text-emergency">{contact.number}</td>
                                <td className="px-6 py-5 text-sm font-medium text-textSecondary">{contact.hospital}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-display font-bold text-textMain mb-8 flex items-center gap-3">
                <span className="text-primary text-2xl">📋</span> Insurance Claim Support
            </h2>
            <div className="modern-card p-8">
                <p className="text-textSecondary font-medium mb-8">Traveling with insurance? We'll help you file claims and coordinate with your provider for direct billing.</p>
                <form onSubmit={handleInsuranceSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            type="text" placeholder="Full Name" required
                            className="bg-bgLight border border-borderSoft px-6 py-4 rounded-xl outline-none focus:border-primary font-medium text-sm"
                            value={insuranceForm.name} onChange={(e) => setInsuranceForm({...insuranceForm, name: e.target.value})}
                        />
                        <input 
                            type="text" placeholder="Insurance Provider" required
                            className="bg-bgLight border border-borderSoft px-6 py-4 rounded-xl outline-none focus:border-primary font-medium text-sm"
                            value={insuranceForm.provider} onChange={(e) => setInsuranceForm({...insuranceForm, provider: e.target.value})}
                        />
                    </div>
                    <input 
                        type="text" placeholder="Policy Number" required
                        className="w-full bg-bgLight border border-borderSoft px-6 py-4 rounded-xl outline-none focus:border-primary font-medium text-sm"
                        value={insuranceForm.policyNumber} onChange={(e) => setInsuranceForm({...insuranceForm, policyNumber: e.target.value})}
                    />
                    <textarea 
                        placeholder="Briefly describe the medical issue..." rows="3" required
                        className="w-full bg-bgLight border border-borderSoft px-6 py-4 rounded-xl outline-none focus:border-primary font-medium text-sm"
                        value={insuranceForm.issue} onChange={(e) => setInsuranceForm({...insuranceForm, issue: e.target.value})}
                    ></textarea>
                    <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-secondary transition-all shadow-md">
                        Request Assistance
                    </button>
                </form>
            </div>
          </section>
        </div>

        <section className="bg-white p-12 rounded-[2.5rem] border border-borderSoft shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h2 className="text-3xl font-display font-bold text-textMain mb-12 text-center">What to do in an Emergency</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { step: '01', title: 'Stay Calm', desc: 'Take a deep breath. CityDoctor is here. Check your surroundings for safety.', icon: '🧘' },
                    { step: '02', title: 'Call for Help', desc: 'Use the SOS button or local numbers above to request immediate assistance.', icon: '📞' },
                    { step: '03', title: 'Keep Documents', desc: 'Have your passport and insurance details ready for hospital admission.', icon: '🆔' },
                ].map((item, idx) => (
                    <div key={idx} className="relative">
                        <div className="text-5xl font-display font-bold text-primary/10 absolute -top-8 -left-4 z-0">{item.step}</div>
                        <div className="relative z-10">
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h4 className="text-xl font-display font-bold text-textMain mb-3">{item.title}</h4>
                            <p className="text-textSecondary text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>

      {/* ================= MODALS ================= */}

      {/* 1. Ambulance Modal */}
      <EmergencyModal 
        isOpen={ambulanceModal.open} 
        onClose={() => setAmbulanceModal({ open: false, status: 'confirming', lat: null, lng: null })} 
        title={<span className="text-red-600 flex items-center gap-2">🚑 Request Ambulance</span>}
      >
        {ambulanceModal.status === 'confirming' && (
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bold mb-6 border border-green-200">
              ✓ Your location detected
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Dispatching To:</span>
              <span className="font-bold text-slate-800">Bandra West, Mumbai, Maharashtra</span>
            </div>
            <button 
              onClick={() => setAmbulanceModal(prev => ({ ...prev, status: 'dispatching' }))}
              className="w-full bg-[#E74C3C] hover:bg-[#C0392B] text-white py-4 rounded-xl font-bold text-lg transition-colors active:scale-95 shadow-lg shadow-red-500/20"
            >
              CONFIRM & DISPATCH
            </button>
          </div>
        )}

        {ambulanceModal.status === 'dispatching' && (
          <div className="text-center py-8 animate-fade-in">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-red-500 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Contacting nearest ambulance...</h3>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 transition-all duration-150" style={{ width: `${ambulanceProgress}%` }}></div>
            </div>
          </div>
        )}

        {ambulanceModal.status === 'confirmed' && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-500 text-4xl text-green-500 scale-in">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">Ambulance Dispatched! 🚑</h3>
            <p className="text-lg font-black text-[#1A6B3C] mb-6">ETA: 8-12 minutes</p>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left mb-6 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-sm font-bold text-slate-500">Driver</span>
                <span className="font-bold text-slate-800">Rajesh Kumar</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-sm font-bold text-slate-500">Phone</span>
                <span className="font-bold text-slate-800">+91 98765 43210</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-500">Vehicle</span>
                <span className="font-bold text-slate-800 bg-yellow-100 px-2 py-1 rounded">MH-02-AB-1234</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => window.open(`https://maps.google.com/?q=${ambulanceModal.lat || 19.076},${ambulanceModal.lng || 72.877}`, '_blank')}
                className="w-full bg-[#1A6B3C] text-white py-3 rounded-xl font-bold transition-colors hover:bg-[#14522D] flex justify-center items-center gap-2"
              >
                🗺️ Live Tracking
              </button>
              <a href="tel:+919876543210" className="w-full block bg-slate-100 text-slate-700 py-3 rounded-xl font-bold transition-colors hover:bg-slate-200">
                📞 Call Driver
              </a>
              <button 
                onClick={() => setAmbulanceModal({ open: false, status: 'confirming', lat: null, lng: null })}
                className="w-full bg-white border-2 border-red-100 text-red-500 py-3 rounded-xl font-bold transition-colors hover:bg-red-50"
              >
                Cancel Request
              </button>
            </div>
          </div>
        )}

        {ambulanceModal.status === 'manual' && (
          <div className="animate-fade-in">
            <p className="text-sm text-slate-500 font-medium mb-6">Location access denied. Please enter your address manually to dispatch.</p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">City</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-red-500">
                  <option>Mumbai</option><option>Delhi</option><option>Bangalore</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Address</label>
                <textarea rows="3" placeholder="Enter street, area..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-red-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Landmark</label>
                <input type="text" placeholder="Near..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-red-500" />
              </div>
            </div>
            <button 
              onClick={() => setAmbulanceModal(prev => ({ ...prev, status: 'dispatching' }))}
              className="w-full bg-[#E74C3C] hover:bg-[#C0392B] text-white py-4 rounded-xl font-bold transition-colors active:scale-95"
            >
              Dispatch to this address
            </button>
          </div>
        )}
      </EmergencyModal>

      {/* 2. ER Locator Modal */}
      <EmergencyModal 
        isOpen={erModalOpen} 
        onClose={() => setErModalOpen(false)} 
        title="Nearest Emergency Rooms"
      >
        <div className="space-y-4 mb-6">
          {mockERs.map((er, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-[#E67E22] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-800">{er.name}</h4>
                  <p className="text-xs text-slate-500">{er.area}</p>
                </div>
                <span className="bg-[#E67E22]/10 text-[#E67E22] text-xs font-bold px-2 py-1 rounded">
                  {er.distance}
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Open 24/7</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{er.beds} Beds Avail.</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(er.name + ' ' + er.area)}`, '_blank')}
                  className="bg-[#E67E22] hover:bg-[#D35400] text-white text-xs font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-1"
                >
                  📍 Directions
                </button>
                <a href={`tel:${er.phone}`} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-1">
                  📞 Call ER
                </a>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (pos) => window.open(`https://www.google.com/maps/search/emergency+hospital+near+me/@${pos.coords.latitude},${pos.coords.longitude},14z`, '_blank'),
                () => window.open('https://www.google.com/maps/search/nearest+emergency+hospital', '_blank')
              );
            }
          }}
          className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-900 transition-colors"
        >
          View All on Map 🗺️
        </button>
      </EmergencyModal>

      {/* 3. Pharmacy Locator Modal */}
      <EmergencyModal 
        isOpen={pharmacyModalOpen} 
        onClose={() => setPharmacyModalOpen(false)} 
        title={<span className="text-[#3498DB]">24/7 Open Pharmacies 💊</span>}
      >
        <div className="space-y-4 mb-6">
          {mockPharmacies.map((pharm, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-[#3498DB] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-800">{pharm.name}</h4>
                  <p className="text-xs text-slate-500">{pharm.area}</p>
                </div>
                <span className="bg-[#3498DB]/10 text-[#3498DB] text-xs font-bold px-2 py-1 rounded">
                  {pharm.distance}
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">OPEN NOW 🟢</span>
                {pharm.delivers && <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Delivers 🛵</span>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharm.name + ' ' + pharm.area)}`, '_blank')}
                  className="bg-[#3498DB] hover:bg-[#2980B9] text-white text-xs font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-1"
                >
                  📍 Directions
                </button>
                <a href={`tel:${pharm.phone}`} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-1">
                  📞 Call
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-slate-200 pt-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">Order Medicine Online</h4>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => window.open('https://pharmeasy.in/', '_blank')} className="bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 text-xs font-bold py-2 rounded-lg transition-colors">
              PharmEasy
            </button>
            <button onClick={() => window.open('https://www.1mg.com/', '_blank')} className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold py-2 rounded-lg transition-colors">
              1mg
            </button>
            <button onClick={() => window.open('https://www.netmeds.com/', '_blank')} className="bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-600 text-xs font-bold py-2 rounded-lg transition-colors">
              Netmeds
            </button>
          </div>
        </div>
      </EmergencyModal>

      {/* 4. Video Consult Modal */}
      <EmergencyModal 
        isOpen={videoModal.open} 
        onClose={() => setVideoModal({ open: false, step: 1, selectedIssues: [] })} 
        title={<span className="text-[#1A6B3C]">Start Video Consultation 💻</span>}
      >
        {videoModal.step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-slate-800 font-bold mb-4">What's your emergency?</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {['🤒 Fever', '😷 Cold/Flu', '🤢 Nausea', '😵 Headache', '🩹 Injury', '💊 Medication', '🫁 Breathing', 'Other'].map(issue => (
                <button
                  key={issue}
                  onClick={() => toggleIssue(issue)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors border-2 
                    ${videoModal.selectedIssues.includes(issue) ? 'bg-[#1A6B3C] border-[#1A6B3C] text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#2ECC71]'}`}
                >
                  {issue}
                </button>
              ))}
            </div>
            <button 
              disabled={videoModal.selectedIssues.length === 0}
              onClick={() => setVideoModal(prev => ({ ...prev, step: 2 }))}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all 
                ${videoModal.selectedIssues.length > 0 ? 'bg-[#1A6B3C] hover:bg-[#14522D] shadow-lg shadow-[#1A6B3C]/20' : 'bg-slate-300 cursor-not-allowed'}`}
            >
              Next →
            </button>
          </div>
        )}

        {videoModal.step === 2 && (
          <div className="animate-fade-in text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-slate-100 mb-4 relative">
              <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face" alt="Doctor" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">Dr. Priya Nair</h3>
            <p className="text-sm font-medium text-slate-500 mb-2">General Physician</p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Available Now
              </span>
              <span className="text-yellow-400 text-sm font-bold">⭐ 4.9</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-600 text-sm">Consultation Fee</span>
                <span className="font-black text-xl text-[#1A6B3C]">₹299</span>
              </div>
              <p className="text-xs text-slate-400 text-left mt-2">Average wait time: 2 minutes</p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setVideoModal(prev => ({ ...prev, step: 3 }))}
                className="w-full bg-[#1A6B3C] hover:bg-[#14522D] text-white py-4 rounded-xl font-bold transition-colors shadow-lg active:scale-95"
              >
                💳 Pay & Start Call
              </button>
              <button className="w-full bg-white border-2 border-slate-200 text-slate-600 hover:border-[#1A6B3C] hover:text-[#1A6B3C] py-3 rounded-xl font-bold transition-colors">
                📅 Schedule for Later
              </button>
            </div>
          </div>
        )}

        {videoModal.step === 3 && (
          <div className="animate-fade-in text-center py-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Connecting...</h3>
            <div className="w-16 h-16 border-4 border-slate-100 border-t-[#1A6B3C] rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-slate-500 font-medium">Please wait while we connect you to Dr. Priya Nair.</p>
            {setTimeout(() => setVideoModal(prev => prev.step === 3 ? { ...prev, step: 4 } : prev), 2000) && null}
          </div>
        )}

        {videoModal.step === 4 && (
          <div className="animate-fade-in bg-slate-900 rounded-xl overflow-hidden relative -mx-2 -mt-2">
            <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 text-center uppercase tracking-widest absolute top-0 left-0 w-full z-10">
              Video Call Active
            </div>
            <div className="relative w-full h-80 bg-slate-800">
              <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop&crop=face" alt="Doctor Video" className="w-full h-full object-cover opacity-80" />
              {/* Picture in picture self view */}
              <div className="absolute bottom-16 right-4 w-24 h-32 bg-slate-700 rounded-lg border-2 border-white overflow-hidden">
                 <div className="w-full h-full flex items-center justify-center text-slate-500">You</div>
              </div>
            </div>
            <div className="flex justify-center gap-4 p-4 bg-slate-900">
              <button className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex justify-center items-center text-xl transition-colors">🎤</button>
              <button className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex justify-center items-center text-xl transition-colors">📷</button>
              <button 
                onClick={() => setVideoModal({ open: false, step: 1, selectedIssues: [] })}
                className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex justify-center items-center text-xl transition-colors shadow-lg shadow-red-500/20"
              >
                📞
              </button>
            </div>
          </div>
        )}
      </EmergencyModal>

    </div>
  );
};

export default EmergencyHelp;
