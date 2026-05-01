import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { doctors } from '../data/doctors';
import { useNotifications } from '../context/NotificationContext';

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === doctorId);

  const [activeTab, setActiveTab] = useState('about');
  const [visitType, setVisitType] = useState('in-person');
  const [selectedDate, setSelectedDate] = useState('Wed 30');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const { addNotification } = useNotifications();
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveDoctor = () => {
    setIsSaved(true);
    addNotification({
      type: 'system',
      title: 'Doctor Saved ❤️',
      message: `${doctor.name} added to your saved doctors list.`,
      icon: '❤️',
      actionUrl: '/profile',
      actionLabel: 'View Saved',
    });
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Doctor not found</h2>
          <p className="text-slate-500 mb-6">We couldn't find the doctor profile you're looking for.</p>
          <button onClick={() => navigate('/find-doctor')} className="px-6 py-3 bg-[#1A6B3C] text-white font-bold rounded-xl hover:bg-[#2ECC71] transition-colors">
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const dates = ['Mon 28', 'Tue 29', 'Wed 30', 'Thu 1', 'Fri 2', 'Sat 3', 'Sun 4'];
  const times = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      
      {/* Breadcrumb & Back */}
      <div className="bg-[#1A6B3C] border-b border-white/10 pt-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
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
            <span className="text-white">{doctor.name}</span>
          </div>
        </div>
      </div>
      
      {/* SECTION 1 - Hero Banner */}
      <div className="bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] pt-6 pb-24 px-4 sm:px-8 relative overflow-hidden">
        {/* Background decorative elements could go here */}
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={doctor.photo}
              alt={doctor.name}
              style={{
                width: '120px',
                height: '120px', 
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center top',
                border: '4px solid white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
            />
            {doctor.isVerified && (
              <div className="absolute bottom-0 right-0 bg-[#2ECC71] text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md text-sm" title="Verified Specialist">
                ✓
              </div>
            )}
          </div>
          
          {/* Info */}
          <div className="flex-1 text-center md:text-left text-white">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>{doctor.name}</h1>
            <p className="text-lg font-medium text-white/90 mb-1">{doctor.specialty} at {doctor.hospital}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4 text-sm font-medium">
              <span className="flex items-center gap-1">📍 {doctor.city}</span>
              <span className="bg-white/20 px-2 py-1 rounded">🎓 {doctor.experience} Yrs Exp</span>
              <span className="flex items-center gap-1 text-yellow-300">★ <span className="text-white font-bold">{doctor.rating}</span> <span className="text-white/80 text-xs">({doctor.reviewCount} reviews)</span></span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
              {doctor.languages.map(lang => (
                <span key={lang} className="border border-white/40 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                  {lang}
                </span>
              ))}
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button 
                onClick={() => navigate(`/book/${doctor.id}`)}
                className="bg-white text-[#1A6B3C] font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-slate-50 transition-colors active:scale-95"
              >
                Book Appointment
              </button>
              <button className="border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors active:scale-95">
                💬 Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        {/* SECTION 2 - Info Grid */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 mb-8">
          <div className="flex flex-col items-center md:items-start p-4">
            <span className="text-2xl mb-2">🏥</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Hospital</span>
            <span className="font-bold text-slate-800 text-center md:text-left">{doctor.hospital}</span>
          </div>
          <div className="flex flex-col items-center md:items-start p-4">
            <span className="text-2xl mb-2">💰</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Consultation</span>
            <span className="font-bold text-[#1A6B3C]">{doctor.costRange}</span>
          </div>
          <div className="flex flex-col items-center md:items-start p-4">
            <span className="text-2xl mb-2">⏱️</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Avg Wait Time</span>
            <span className="font-bold text-slate-800">~15 mins</span>
          </div>
          <div className="flex flex-col items-center md:items-start p-4">
            <span className="text-2xl mb-2">📅</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Next Available</span>
            <span className="font-bold text-slate-800">Today 4:00 PM</span>
          </div>
        </div>

        {/* SECTION 3 - Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 pb-12">
          
          {/* LEFT COLUMN (65%) */}
          <div className="w-full lg:w-[65%]">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
              {['about', 'reviews', 'location'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-bold text-sm capitalize transition-colors border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-[#1A6B3C] text-[#1A6B3C]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[400px]">
              
              {activeTab === 'about' && (
                <div className="space-y-8 animate-fade-in">
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">About {doctor.name}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {doctor.name} is a highly respected {doctor.specialty} with over {doctor.experience} years of clinical experience. Known for a patient-centric approach and clear communication, the doctor specializes in providing comprehensive care for international travelers and local residents alike, ensuring international medical standards are met.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Education & Qualifications</h3>
                    <ul className="space-y-4 border-l-2 border-slate-100 ml-2 pl-4">
                      <li className="relative">
                        <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#2ECC71]"></span>
                        <div className="font-bold text-slate-800">MBBS</div>
                        <div className="text-sm text-slate-500">AIIMS Delhi (2005)</div>
                      </li>
                      <li className="relative">
                        <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#2ECC71]"></span>
                        <div className="font-bold text-slate-800">MD / MS</div>
                        <div className="text-sm text-slate-500">Mumbai University (2008)</div>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {['General Checkup', 'Fever & Flu', 'Vaccinations', 'Travel Medicine'].map(spec => (
                        <span key={spec} className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Languages Spoken</h3>
                    <div className="flex flex-wrap gap-3">
                      {doctor.languages.map(lang => (
                        <span key={lang} className="bg-[#1A6B3C]/5 text-[#1A6B3C] font-bold px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                          {lang === 'English' ? '🇬🇧' : lang === 'Hindi' ? '🇮🇳' : lang === 'French' ? '🇫🇷' : '🌐'} {lang}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Working Hours</h3>
                    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                      <div className="grid grid-cols-2 p-4 border-b border-slate-200 font-medium text-slate-700">
                        <span>Mon - Fri</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="grid grid-cols-2 p-4 border-b border-slate-200 font-medium text-slate-700">
                        <span>Saturday</span>
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="grid grid-cols-2 p-4 font-bold text-red-500">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-slate-800 mb-2">{doctor.rating}</div>
                      <div className="text-yellow-400 text-xl tracking-widest mb-1">★★★★★</div>
                      <div className="text-sm text-slate-500 font-medium">Based on {doctor.reviewCount} reviews</div>
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      {[
                        { stars: 5, pct: 78 },
                        { stars: 4, pct: 15 },
                        { stars: 3, pct: 5 },
                        { stars: 2, pct: 2 },
                        { stars: 1, pct: 0 },
                      ].map(bar => (
                        <div key={bar.stars} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                          <span className="w-4">{bar.stars}★</span>
                          <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${bar.pct}%` }}></div>
                          </div>
                          <span className="w-8 text-right">{bar.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { name: 'R***a S.', date: 'Oct 20, 2026', rating: 5, text: 'Very attentive and professional. The doctor listened to all my concerns and explained the treatment clearly in English.' },
                      { name: 'M***l T.', date: 'Oct 15, 2026', rating: 4, text: 'Great experience overall. The clinic was clean, though I had to wait about 15 minutes past my appointment time.' },
                      { name: 'J***n D.', date: 'Sep 28, 2026', rating: 5, text: 'Lifesaver during my trip! Highly recommend to any traveler needing quick, reliable medical help.' },
                      { name: 'A***i M.', date: 'Sep 10, 2026', rating: 5, text: 'Exceptional care. The diagnosis was accurate and the prescribed medication worked perfectly.' },
                      { name: 'P***l K.', date: 'Aug 22, 2026', rating: 4, text: 'Good doctor, very knowledgeable. Fee was reasonable.' },
                    ].map((review, i) => (
                      <div key={i} className="border-b border-slate-100 pb-6 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-bold text-slate-800">{review.name}</div>
                            <div className="text-xs text-slate-500">{review.date}</div>
                          </div>
                          <div className="text-yellow-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">{review.text}</p>
                        <button className="text-xs font-bold text-slate-500 hover:text-[#1A6B3C] flex items-center gap-1 transition-colors">
                          👍 Helpful? ({Math.floor(Math.random() * 20) + 1})
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300">
                    {/* Fake Map */}
                    <img src="https://maps.googleapis.com/maps/api/staticmap?center=19.0760,72.8777&zoom=13&size=800x400&maptype=roadmap&markers=color:red%7Clabel:H%7C19.0760,72.8777&key=YOUR_API_KEY" alt="Map" className="w-full h-full object-cover opacity-60" onError={(e) => { e.target.style.display='none' }} />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                       <div className="text-center">
                          <span className="text-4xl text-red-500 drop-shadow-md">📍</span>
                          <p className="font-bold text-slate-700 mt-2 text-sm uppercase tracking-wider">{doctor.hospital}</p>
                       </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{doctor.hospital}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      123 Health Avenue, Medical District,<br />
                      Near Central Metro Station,<br />
                      {doctor.city}, India - 400001
                    </p>
                    <p className="text-sm font-medium text-slate-500 mb-6 flex items-center gap-2">
                      <span className="text-lg">🏢</span> Nearby Landmarks: Grand City Mall, Central Park
                    </p>
                    <a href={`https://maps.google.com/?q=${doctor.lat},${doctor.lng}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-[#1A6B3C] hover:text-[#1A6B3C] transition-colors">
                      🗺️ Get Directions
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN (35%) - Sticky Booking Card */}
          <div className="w-full lg:w-[35%] relative">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border-2 border-[#2ECC71] p-6 mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Book Appointment</h2>
              
              {/* Visit Type Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                <button
                  onClick={() => setVisitType('in-person')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${visitType === 'in-person' ? 'bg-white text-[#1A6B3C] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  🏥 In-Person
                </button>
                <button
                  onClick={() => setVisitType('video')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${visitType === 'video' ? 'bg-white text-[#1A6B3C] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  💻 Video Call
                </button>
              </div>

              {/* Date Picker */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Select Date</h3>
                  <span className="text-xs font-bold text-[#1A6B3C]">Oct 2026</span>
                </div>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                  {dates.map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-colors border-2
                        ${selectedDate === date 
                          ? 'border-[#2ECC71] bg-[#2ECC71]/10 text-[#1A6B3C]' 
                          : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}
                    >
                      <span className="text-xs font-bold uppercase">{date.split(' ')[0]}</span>
                      <span className="text-lg font-black">{date.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-3">Select Time</h3>
                <div className="grid grid-cols-3 gap-2">
                  {times.map((slot, i) => (
                    <button
                      key={i}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all border
                        ${!slot.available 
                          ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed' 
                          : selectedTime === slot.time
                            ? 'bg-[#1A6B3C] border-[#1A6B3C] text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-[#2ECC71] hover:text-[#1A6B3C]'}`}
                    >
                      {slot.time} {!slot.available && '✗'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 mb-6 flex justify-between items-end">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Consultation Fee</div>
                  <div className="text-2xl font-black text-[#1A6B3C]">₹{doctor.costValue || doctor.costRange.split(' ')[0].replace('₹', '')}</div>
                </div>
                {visitType === 'video' && <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">20% OFF</span>}
              </div>

              <button 
                onClick={() => navigate(`/book/${doctor.id}?date=${selectedDate}&slot=${selectedTime}`)}
                className="w-full py-4 bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] text-white font-bold rounded-xl shadow-lg shadow-[#2ECC71]/30 hover:shadow-[#2ECC71]/50 transition-all active:scale-95 mb-4"
              >
                Confirm Booking →
              </button>
              
              <div className="text-center">
                <p className="text-xs font-medium text-slate-500 mb-4 flex justify-center items-center gap-1">
                  🔒 Free cancellation up to 2 hrs before
                </p>
                <button onClick={handleSaveDoctor} className={`w-full py-3 bg-white border-2 text-slate-600 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${isSaved ? 'border-red-500 text-red-500' : 'border-slate-200 hover:border-red-500 hover:text-red-500'}`}>
                  {isSaved ? '❤️ Saved' : '🤍 Save Doctor'}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
