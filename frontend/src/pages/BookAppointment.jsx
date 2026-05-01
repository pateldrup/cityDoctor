import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { doctors } from '../data/doctors';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const TagsInput = ({ tags, setTags, placeholder }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full bg-slate-50 border border-slate-200 focus-within:border-[#2ECC71] focus-within:ring-[3px] focus-within:ring-[#2ECC71]/20 rounded-xl p-2 flex flex-wrap gap-2 transition-all duration-200">
      {tags.map((tag, index) => (
        <span key={index} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2 shadow-sm">
          {tag}
          <button type="button" onClick={() => removeTag(index)} className="text-slate-400 hover:text-red-500 font-bold">×</button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent outline-none py-1.5 px-2 text-slate-700 text-sm"
      />
    </div>
  );
};

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { addNotification } = useNotifications();
  const doctor = doctors.find(d => d.id === doctorId);

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  const [searchParams] = useSearchParams();
  const prefilledDate = searchParams.get('date');
  const prefilledSlot = searchParams.get('slot');

  const [bookingData, setBookingData] = useState({
    doctorId: doctorId || '',
    consultationType: 'in-person',
    date: '',
    timeSlot: prefilledSlot || '',
    patientName: user?.name || '',
    age: '',
    gender: user?.gender || '',
    phone: user?.phone || '',
    email: user?.email || '',
    reason: '',
    symptoms: [],
    uploadedFile: null,
    forSomeoneElse: false,
    relation: '',
    hasInsurance: user?.hasInsurance || false,
    insuranceProvider: user?.insuranceProvider || '',
    policyNumber: '',
    paymentMethod: 'card',
    cardDetails: { number: '', expiry: '', cvv: '' },
    upiId: ''
  });

  // Generate 14 days
  const [availableDates, setAvailableDates] = useState([]);
  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: d.toDateString()
      });
    }
    setAvailableDates(dates);
    
    let initialDate = dates[0].fullDate;
    if (prefilledDate) {
      const match = dates.find(d => `${d.dayName} ${d.dateNum}` === prefilledDate || d.fullDate === prefilledDate);
      if (match) initialDate = match.fullDate;
    }
    
    if (!bookingData.date) {
      handleDataChange('date', initialDate);
    }
  }, []);

  const timeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
    afternoon: ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'],
    evening: ['5:00 PM', '5:30 PM', '6:00 PM']
  };

  // Mock booked slots based on doctorId and date just to show some disabled
  const isSlotBooked = (time) => {
    const hash = (doctorId + bookingData.date + time).split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    return Math.abs(hash) % 5 === 0; // 20% chance of being booked
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Doctor not found</h2>
          <button onClick={() => navigate('/find-doctor')} className="px-6 py-3 mt-4 bg-[#1A6B3C] text-white font-bold rounded-xl hover:bg-[#2ECC71] transition-colors">
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const handleDataChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev - 1);
  };

  const handleConfirmBooking = () => {
    // Simulate API call
    setTimeout(() => {
      setBookingId(`#MR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSuccess(true);
      window.scrollTo(0, 0);

      addNotification({
        type: 'appointment',
        title: 'Booking Confirmed! 🎉',
        message: `Your appointment with ${doctor.name} is confirmed for ${bookingData.date} at ${bookingData.timeSlot}`,
        icon: '📅',
        actionUrl: '/bookings',
        actionLabel: 'View Booking',
      });
    }, 1000);
  };

  const baseCost = doctor.costValue || parseInt(doctor.costRange.replace(/\D/g, '').slice(0, 4)) || 800;
  const consultationFee = bookingData.consultationType === 'video' ? Math.floor(baseCost * 0.8) : baseCost;
  const platformFee = 50;
  const totalAmount = consultationFee + platformFee;

  // Render Success Page
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center relative overflow-hidden">
            
            {/* Success Animation */}
            <div className="mx-auto w-24 h-24 mb-6">
              <svg className="checkmark w-full h-full text-[#2ECC71]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle fill-none stroke-current stroke-[4]" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check fill-none stroke-current stroke-[4]" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <style>{`
                .checkmark__circle { stroke-dasharray: 166; stroke-dashoffset: 166; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
                .checkmark__check { stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
                @keyframes stroke { 100% { stroke-dashoffset: 0; } }
              `}</style>
            </div>

            <h1 className="text-3xl font-black text-slate-800 mb-2">Booking Confirmed! 🎉</h1>
            <p className="text-slate-500 mb-6 font-medium">Your appointment has been successfully scheduled.</p>
            
            <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-100">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Booking ID</span>
                <span className="font-black text-[#1A6B3C] text-lg">{bookingId}</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{doctor.name}</div>
                    <div className="text-sm text-slate-500">{doctor.specialty}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 bg-white p-3 rounded-xl border border-slate-100">
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase mb-1">Date & Time</div>
                    <div className="font-bold text-slate-700 text-sm">{bookingData.date.split(' ').slice(0,3).join(' ')} <br/> {bookingData.timeSlot}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase mb-1">Type</div>
                    <div className="font-bold text-slate-700 text-sm">{bookingData.consultationType === 'video' ? '💻 Video Call' : '🏥 In-Person'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full py-4 bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] text-white font-bold rounded-xl shadow-lg hover:shadow-[#2ECC71]/30 transition-all active:scale-95 flex items-center justify-center gap-2">
                <span>📥</span> Download Confirmation
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 text-sm">
                  <span>📅</span> Add to Calendar
                </button>
                <button className="py-3 bg-[#25D366]/10 text-[#25D366] font-bold rounded-xl hover:bg-[#25D366]/20 transition-colors flex items-center justify-center gap-2 text-sm">
                  <span className="text-lg">💬</span> Share
                </button>
              </div>
              <Link to="/" className="mt-4 text-slate-500 font-bold hover:text-[#1A6B3C] transition-colors text-sm">
                🏠 Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if Step 1 is valid
  const isStep1Valid = bookingData.date !== '' && bookingData.timeSlot !== '';
  
  // Check if Step 2 is valid
  const isStep2Valid = 
    bookingData.patientName.trim().length > 2 &&
    bookingData.age !== '' &&
    bookingData.gender !== '' &&
    bookingData.phone.length >= 10 &&
    bookingData.email.includes('@') &&
    bookingData.reason.trim().length > 5;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-body pb-24 md:pb-12">
      <Navbar />
      
      {/* Breadcrumb & Back */}
      <div className="bg-[#1A6B3C] border-b border-white/10 pt-4 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="text-white/80 hover:text-white font-bold flex items-center gap-2 text-sm transition-colors w-fit"
          >
            ← Back
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-white/60">
            <span onClick={() => navigate('/')} className="hover:text-[#2ECC71] cursor-pointer transition-colors">Home</span>
            <span>&gt;</span>
            <span onClick={() => navigate('/find-doctor')} className="hover:text-[#2ECC71] cursor-pointer transition-colors">Find Doctor</span>
            <span>&gt;</span>
            <span onClick={() => navigate(`/doctor/${doctor.id}`)} className="hover:text-[#2ECC71] cursor-pointer transition-colors">{doctor.name}</span>
            <span>&gt;</span>
            <span className="text-white">Book Appointment</span>
          </div>
        </div>
      </div>
      
      {/* Progress Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#2ECC71] z-0 rounded-full transition-all duration-500"
              style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
            ></div>
            
            {[
              { num: 1, label: 'Select Slot' },
              { num: 2, label: 'Your Details' },
              { num: 3, label: 'Confirm' }
            ].map(s => (
              <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors duration-300
                  ${step > s.num ? 'bg-[#2ECC71] text-white border-2 border-[#2ECC71]' : 
                    step === s.num ? 'bg-white border-4 border-[#2ECC71] text-[#1A6B3C]' : 
                    'bg-white border-2 border-slate-200 text-slate-400'}`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:block
                  ${step >= s.num ? 'text-slate-800' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        
        {/* Doctor Summary Header (Always visible) */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-200 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-slate-100">
            <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-800">{doctor.name}</h2>
            <p className="text-sm font-medium text-slate-500">{doctor.specialty} • {doctor.hospital}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 overflow-hidden">
          
          {/* ================= STEP 1: SELECT SLOT ================= */}
          {step === 1 && (
            <div className="animate-fade-in space-y-8">
              
              {/* Consultation Type */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Consultation Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleDataChange('consultationType', 'in-person')}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${bookingData.consultationType === 'in-person' ? 'border-[#2ECC71] bg-[#2ECC71]/5 ring-4 ring-[#2ECC71]/10' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <div className="text-3xl mb-3">🏥</div>
                    <h4 className="font-bold text-slate-800 mb-1">In-Person Visit</h4>
                    <p className="text-sm text-slate-500 font-medium mb-3">Visit doctor at the clinic</p>
                    <div className="text-lg font-black text-[#1A6B3C]">₹{baseCost}</div>
                  </button>
                  <button
                    onClick={() => handleDataChange('consultationType', 'video')}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${bookingData.consultationType === 'video' ? 'border-[#2ECC71] bg-[#2ECC71]/5 ring-4 ring-[#2ECC71]/10' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <div className="text-3xl mb-3">💻</div>
                    <h4 className="font-bold text-slate-800 mb-1">Video Consultation</h4>
                    <p className="text-sm text-slate-500 font-medium mb-3">Consult from anywhere</p>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-black text-[#1A6B3C]">₹{Math.floor(baseCost * 0.8)}</div>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded uppercase">20% OFF</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Select Date</h3>
                  <span className="text-sm font-bold text-[#1A6B3C]">{availableDates.length > 0 ? availableDates[0].month + ' ' + new Date().getFullYear() : ''}</span>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x">
                  {availableDates.map(d => (
                    <button
                      key={d.fullDate}
                      onClick={() => { handleDataChange('date', d.fullDate); handleDataChange('timeSlot', ''); }}
                      className={`shrink-0 w-20 py-3 rounded-2xl flex flex-col items-center justify-center transition-all border-2 snap-start
                        ${bookingData.date === d.fullDate 
                          ? 'border-[#2ECC71] bg-[#1A6B3C] text-white shadow-lg' 
                          : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      <span className={`text-xs font-bold uppercase mb-1 ${bookingData.date === d.fullDate ? 'text-white/80' : 'text-slate-400'}`}>{d.dayName}</span>
                      <span className="text-2xl font-black">{d.dateNum}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6">Select Time</h3>
                
                <div className="space-y-6">
                  {Object.entries(timeSlots).map(([period, slots]) => (
                    <div key={period}>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        {period === 'morning' ? '🌅 Morning' : period === 'afternoon' ? '☀️ Afternoon' : '🌆 Evening'}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {slots.map(time => {
                          const booked = isSlotBooked(time);
                          const isSelected = bookingData.timeSlot === time;
                          return (
                            <button
                              key={time}
                              disabled={booked}
                              onClick={() => handleDataChange('timeSlot', time)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border-2
                                ${booked 
                                  ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed line-through' 
                                  : isSelected
                                    ? 'bg-white border-[#2ECC71] text-[#1A6B3C] shadow-sm ring-2 ring-[#2ECC71]/20'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-[#2ECC71] hover:text-[#1A6B3C]'}`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 2: PATIENT DETAILS ================= */}
          {step === 2 && (
            <div className="animate-fade-in space-y-8">
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-800">Patient Details</h3>
                {!isLoggedIn && (
                  <Link to="/login" className="text-sm font-bold text-[#1A6B3C] hover:text-[#2ECC71] flex items-center gap-1 bg-[#1A6B3C]/5 px-3 py-1.5 rounded-lg">
                    <span>👤</span> Login to autofill
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Patient Name *</label>
                  <input type="text" value={bookingData.patientName} onChange={e => handleDataChange('patientName', e.target.value)} placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Age *</label>
                  <input type="number" min="1" max="120" value={bookingData.age} onChange={e => handleDataChange('age', e.target.value)} placeholder="e.g. 32" className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gender *</label>
                  <div className="flex gap-4">
                    {['Male', 'Female', 'Other'].map(g => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={bookingData.gender === g} onChange={() => handleDataChange('gender', g)} className="w-4 h-4 text-[#2ECC71] focus:ring-[#2ECC71] accent-[#2ECC71]" />
                        <span className="text-sm font-medium text-slate-700">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number *</label>
                  <div className="relative flex">
                    <div className="flex items-center justify-center bg-slate-100 border border-slate-200 border-r-0 rounded-l-xl px-3 text-slate-600 font-medium text-sm">+91</div>
                    <input type="tel" value={bookingData.phone.replace('+91', '')} onChange={e => handleDataChange('phone', '+91' + e.target.value)} placeholder="10-digit number" className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-r-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                  <input type="email" value={bookingData.email} onChange={e => handleDataChange('email', e.target.value)} placeholder="For appointment updates" className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Reason for Visit *</label>
                    <span className="text-xs text-slate-400 font-medium">{bookingData.reason.length}/200</span>
                  </div>
                  <textarea maxLength="200" rows="3" value={bookingData.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Briefly describe your medical issue..." className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px] resize-none"></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Symptoms (Optional)</label>
                  <TagsInput tags={bookingData.symptoms} setTags={(t) => handleDataChange('symptoms', t)} placeholder="e.g. fever, headache (Press Enter)" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Upload Reports (Optional)</label>
                  <div className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => {
                      if(e.target.files[0]) handleDataChange('uploadedFile', e.target.files[0].name);
                    }} accept=".pdf,.jpg,.jpeg,.png" />
                    <div className="text-3xl mb-2 text-slate-400">📄</div>
                    <div className="text-sm font-bold text-slate-700">Click to upload or drag and drop</div>
                    <div className="text-xs text-slate-500 mt-1">PDF, JPG, PNG (Max. 5MB)</div>
                    {bookingData.uploadedFile && (
                      <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100">
                        ✓ {bookingData.uploadedFile}
                      </div>
                    )}
                  </div>
                </div>

                {/* For someone else */}
                <div className="md:col-span-2 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="flex justify-between items-center cursor-pointer">
                    <span className="font-bold text-slate-800">Booking for someone else?</span>
                    <input type="checkbox" checked={bookingData.forSomeoneElse} onChange={() => handleDataChange('forSomeoneElse', !bookingData.forSomeoneElse)} className="w-5 h-5 text-[#2ECC71] rounded focus:ring-[#2ECC71] accent-[#2ECC71] cursor-pointer" />
                  </label>
                  {bookingData.forSomeoneElse && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Relation to Patient</label>
                      <select value={bookingData.relation} onChange={e => handleDataChange('relation', e.target.value)} className="w-full bg-white border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px] appearance-none">
                        <option value="">Select...</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Parent">Parent</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Insurance */}
                <div className="md:col-span-2 p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-slate-800 flex items-center gap-2">🛡️ Travel / Health Insurance</h4>
                      <p className="text-xs text-slate-500 font-medium">Do you want to apply insurance for this booking?</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-blue-100">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={bookingData.hasInsurance} onChange={() => handleDataChange('hasInsurance', true)} className="w-4 h-4 text-[#2ECC71] focus:ring-[#2ECC71] accent-[#2ECC71]" />
                        <span className="text-sm font-bold text-slate-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={!bookingData.hasInsurance} onChange={() => handleDataChange('hasInsurance', false)} className="w-4 h-4 text-[#2ECC71] focus:ring-[#2ECC71] accent-[#2ECC71]" />
                        <span className="text-sm font-bold text-slate-700">No</span>
                      </label>
                    </div>
                  </div>
                  {bookingData.hasInsurance && (
                    <div className="mt-4 pt-4 border-t border-blue-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Provider Name</label>
                        <input type="text" value={bookingData.insuranceProvider} onChange={e => handleDataChange('insuranceProvider', e.target.value)} placeholder="e.g. Allianz" className="w-full bg-white border border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Policy Number</label>
                        <input type="text" value={bookingData.policyNumber} onChange={e => handleDataChange('policyNumber', e.target.value)} placeholder="Policy ID" className="w-full bg-white border border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200" />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ================= STEP 3: REVIEW & CONFIRM ================= */}
          {step === 3 && (
            <div className="animate-fade-in space-y-8">
              
              <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Review & Confirm</h3>

              {/* Summary Card */}
              <div className="bg-white rounded-2xl border-2 border-[#2ECC71] overflow-hidden shadow-lg shadow-[#2ECC71]/10">
                <div className="p-5 sm:p-6 bg-[#2ECC71]/5 border-b border-[#2ECC71]/20 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{doctor.name}</h4>
                    <p className="text-sm text-[#1A6B3C] font-medium">{doctor.specialty} • {doctor.hospital}</p>
                  </div>
                </div>
                
                <div className="p-5 sm:p-6 space-y-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-3">
                      <div className="text-xl">📅</div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date & Time</div>
                        <div className="font-bold text-slate-800 text-sm">{bookingData.date.split(' ').slice(0,3).join(' ')}, {bookingData.timeSlot}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-xl">💻</div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Consultation Type</div>
                        <div className="font-bold text-slate-800 text-sm">{bookingData.consultationType === 'video' ? 'Video Call' : 'In-Person'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3 border-b border-slate-100">
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-bold text-slate-500 w-24 shrink-0">Patient:</div>
                    <div className="text-sm font-bold text-slate-800 text-right">{bookingData.patientName} ({bookingData.age}{bookingData.gender.charAt(0)})</div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-bold text-slate-500 w-24 shrink-0">Contact:</div>
                    <div className="text-sm font-bold text-slate-800 text-right">{bookingData.phone}</div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-bold text-slate-500 w-24 shrink-0">Reason:</div>
                    <div className="text-sm font-medium text-slate-800 text-right line-clamp-2">{bookingData.reason}</div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-slate-50">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-slate-500">Consultation Fee</span>
                    <span className="font-bold text-slate-800">₹{consultationFee}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-slate-500">Platform Fee</span>
                    <span className="font-bold text-slate-800">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <span className="font-black text-slate-800 uppercase tracking-wider">Total Amount</span>
                    <span className="text-2xl font-black text-[#1A6B3C]">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { id: 'card', label: 'Card', icon: '💳' },
                    { id: 'upi', label: 'UPI', icon: '📱' },
                    { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                    { id: 'clinic', label: 'Pay at Clinic', icon: '💵' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleDataChange('paymentMethod', m.id)}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all
                        ${bookingData.paymentMethod === m.id 
                          ? 'border-[#2ECC71] bg-[#2ECC71]/5 text-[#1A6B3C] shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      <span className="text-xs font-bold">{m.label}</span>
                    </button>
                  ))}
                </div>

                {/* Conditional Payment Fields */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
                  {bookingData.paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Enter UPI ID</label>
                      <input type="text" value={bookingData.upiId} onChange={e => handleDataChange('upiId', e.target.value)} placeholder="username@upi" className="w-full bg-white border border-slate-200 focus:border-[#2ECC71] rounded-xl py-3 px-4 text-slate-700 outline-none transition-all" />
                      <p className="text-xs text-slate-500 mt-2">A payment request will be sent to your UPI app.</p>
                    </div>
                  )}
                  {bookingData.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Card Number</label>
                        <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-slate-200 focus:border-[#2ECC71] rounded-xl py-3 pl-10 pr-4 text-slate-700 outline-none transition-all tracking-widest font-mono text-sm" />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">💳</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expiry</label>
                          <input type="text" placeholder="MM/YY" className="w-full bg-white border border-slate-200 focus:border-[#2ECC71] rounded-xl py-3 px-4 text-slate-700 outline-none transition-all text-center font-mono text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CVV</label>
                          <input type="password" placeholder="•••" maxLength="3" className="w-full bg-white border border-slate-200 focus:border-[#2ECC71] rounded-xl py-3 px-4 text-slate-700 outline-none transition-all text-center font-mono text-sm tracking-widest" />
                        </div>
                      </div>
                    </div>
                  )}
                  {bookingData.paymentMethod === 'netbanking' && (
                    <div className="text-center py-4">
                      <p className="text-sm font-bold text-slate-600 mb-4">You will be redirected to your bank's secure portal.</p>
                      <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-700 outline-none">
                        <option>Select your bank...</option>
                        <option>HDFC Bank</option>
                        <option>SBI</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>
                  )}
                  {bookingData.paymentMethod === 'clinic' && (
                    <div className="text-center py-4 flex flex-col items-center gap-2">
                      <span className="text-4xl">🏥</span>
                      <p className="text-sm font-bold text-[#1A6B3C]">Your appointment will be confirmed immediately.</p>
                      <p className="text-xs font-medium text-slate-500">Please pay ₹{totalAmount} at the reception desk.</p>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 text-sm font-medium text-yellow-800">
                  <span className="text-xl leading-none">⚠️</span>
                  <p>Free cancellation if cancelled 2 hours before the scheduled appointment time. Later cancellations may incur a fee.</p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Sticky Action Bar (Mobile & Desktop) */}
        <div className="fixed md:static bottom-0 left-0 w-full bg-white md:bg-transparent border-t md:border-0 border-slate-200 p-4 md:p-0 md:mt-8 flex justify-between items-center gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:shadow-none z-30">
          {step > 1 ? (
            <button 
              onClick={handlePrevStep}
              className="px-6 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
            >
              ← Back
            </button>
          ) : <div></div>}
          
          {step === 1 && (
            <button 
              onClick={handleNextStep}
              disabled={!isStep1Valid}
              className={`flex-1 md:flex-none md:w-64 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg active:scale-95
                ${isStep1Valid ? 'bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] hover:shadow-[#2ECC71]/30 cursor-pointer' : 'bg-slate-300 shadow-none cursor-not-allowed'}`}
            >
              Next: Your Details →
            </button>
          )}

          {step === 2 && (
            <button 
              onClick={handleNextStep}
              disabled={!isStep2Valid}
              className={`flex-1 md:flex-none md:w-64 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg active:scale-95
                ${isStep2Valid ? 'bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] hover:shadow-[#2ECC71]/30 cursor-pointer' : 'bg-slate-300 shadow-none cursor-not-allowed'}`}
            >
              Next: Review →
            </button>
          )}

          {step === 3 && (
            <div className="flex-1 md:flex-none md:w-80 flex flex-col items-center">
              <button 
                onClick={handleConfirmBooking}
                className="w-full py-4 bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] text-white font-bold rounded-xl shadow-lg shadow-[#2ECC71]/30 hover:shadow-[#2ECC71]/50 transition-all active:scale-95 mb-2"
              >
                ✅ Confirm & Pay ₹{bookingData.paymentMethod === 'clinic' ? 0 : totalAmount}
              </button>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest hidden md:flex">
                🔒 Secured by 256-bit encryption
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookAppointment;
