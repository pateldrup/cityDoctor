import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doctors } from '../data/doctors'

const DoctorProfile = () => {
  const { doctorId } = useParams()
  const navigate = useNavigate()

  // FIX: Convert both to string for comparison
  const doctor = doctors.find(d => String(d.id) === String(doctorId))

  // If doctor not found
  if (!doctor) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}>
        <div style={{ fontSize: '64px' }}>🏥</div>
        <h2 style={{ fontFamily: 'Playfair Display', color: '#0D2B1A' }}>
          Doctor Not Found
        </h2>
        <p style={{ color: '#888' }}>
          Doctor ID "{doctorId}" does not exist
        </p>
        <button
          onClick={() => navigate('/find-doctor')}
          style={{
            padding: '12px 24px',
            background: '#1A6B3C',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Back to Find Doctor
        </button>
      </div>
    )
  }

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      patientName: "R***a S.",
      rating: 5,
      review: "Excellent doctor! Very professional and explained everything clearly. Highly recommend!",
      date: "April 20, 2025",
      helpful: 12
    },
    {
      id: 2,
      patientName: "A***y M.",
      rating: 5,
      review: "Very thorough examination. Wait time was minimal. Will definitely visit again.",
      date: "April 15, 2025",
      helpful: 8
    },
    {
      id: 3,
      patientName: "P***i K.",
      rating: 4,
      review: "Good doctor, explains treatment well. Clinic is clean and staff is helpful.",
      date: "April 10, 2025",
      helpful: 5
    },
    {
      id: 4,
      patientName: "S***h R.",
      rating: 5,
      review: "Best doctor I have visited. Very knowledgeable and patient with questions.",
      date: "April 5, 2025",
      helpful: 19
    },
    {
      id: 5,
      patientName: "M***a T.",
      rating: 4,
      review: "Professional and caring. Appointment was on time. Good experience overall.",
      date: "March 28, 2025",
      helpful: 7
    }
  ]

  // Mock working hours
  const workingHours = [
    { day: 'Monday', open: '09:00 AM', close: '06:00 PM', isOff: false },
    { day: 'Tuesday', open: '09:00 AM', close: '06:00 PM', isOff: false },
    { day: 'Wednesday', open: '09:00 AM', close: '06:00 PM', isOff: false },
    { day: 'Thursday', open: '09:00 AM', close: '06:00 PM', isOff: false },
    { day: 'Friday', open: '09:00 AM', close: '06:00 PM', isOff: false },
    { day: 'Saturday', open: '10:00 AM', close: '02:00 PM', isOff: false },
    { day: 'Sunday', open: null, close: null, isOff: true },
  ]

  // Mock education
  const education = [
    { degree: 'MBBS', institution: 'AIIMS Delhi', year: 2005 },
    { degree: 'MD', institution: 'Mumbai University', year: 2009 },
    { degree: 'Fellowship', institution: 'Apollo Hospital', year: 2011 },
  ]

  // Mock specializations
  const specializations = [
    'General Checkup', 'Fever & Flu', 'Vaccinations',
    'Chronic Disease Management', 'Preventive Care'
  ]

  // Tab state
  const [activeTab, setActiveTab] = useState('about')

  // Booking state (right sticky card)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [consultType, setConsultType] = useState('in-person')

  // Next 7 days
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return {
      dateStr: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en', { month: 'short' })
    }
  })

  // Time slots
  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '05:00 PM', available: true },
    { time: '05:30 PM', available: true },
  ]

  const consultFee = doctor.costRange.min
  const platformFee = 50
  const totalAmount = consultFee + platformFee

  // NOW RENDER with real doctor data:
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>

      {/* BACK BUTTON */}
      <div style={{ padding: '12px 24px', background: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none',
            color: '#1A6B3C', cursor: 'pointer',
            fontSize: '14px', fontWeight: '600',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          ← Back
        </button>
      </div>

      {/* HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #1A6B3C, #2ECC71)',
        padding: '40px 48px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        flexWrap: 'wrap'
      }}>
        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <img
            src={doctor.photo}
            alt={doctor.name}
            onError={e => {
              e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`
            }}
            style={{
              width: '120px', height: '120px',
              borderRadius: '50%', objectFit: 'cover',
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          />
          {doctor.isVerified && (
            <div style={{
              position: 'absolute', bottom: '4px', right: '4px',
              background: '#2ECC71', borderRadius: '50%',
              width: '28px', height: '28px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '3px solid white', color: 'white',
              fontSize: '14px', fontWeight: 'bold'
            }}>✓</div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            color: 'white', fontFamily: 'Playfair Display',
            fontSize: '32px', fontWeight: '700', margin: '0 0 6px'
          }}>
            {doctor.name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', margin: '0 0 4px' }}>
            {doctor.specialty} · {doctor.hospital}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: '0 0 12px' }}>
            📍 {doctor.city} · {doctor.experience} years experience
          </p>
          {/* Languages */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {doctor.languages.map(lang => (
              <span key={lang} style={{
                border: '1.5px solid rgba(255,255,255,0.6)',
                borderRadius: '20px', padding: '4px 12px',
                color: 'white', fontSize: '12px', fontWeight: '600'
              }}>
                {lang}
              </span>
            ))}
          </div>
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#FFD700', fontSize: '18px' }}>★</span>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
              {doctor.rating}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
              ({doctor.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate(`/book/${doctor.id}`)}
            style={{
              padding: '12px 28px',
              background: 'white', color: '#1A6B3C',
              border: 'none', borderRadius: '12px',
              fontWeight: '700', fontSize: '15px',
              cursor: 'pointer'
            }}
          >
            📅 Book Appointment
          </button>
          <button style={{
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1.5px solid rgba(255,255,255,0.5)',
            borderRadius: '12px',
            fontWeight: '600', fontSize: '15px',
            cursor: 'pointer'
          }}>
            💬 Chat Now
          </button>
        </div>
      </div>

      {/* STAT BOXES */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        background: 'white', borderBottom: '1px solid #f0f0f0'
      }}>
        {[
          { icon: '🏥', label: 'Hospital', value: doctor.hospital },
          { icon: '💰', label: 'Fee Range', value: `₹${doctor.costRange.min} - ₹${doctor.costRange.max}` },
          { icon: '⏱️', label: 'Avg Wait', value: '~15 mins' },
          { icon: '📅', label: 'Next Available', value: 'Tomorrow' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '20px 24px', textAlign: 'center',
            borderRight: i < 3 ? '1px solid #f0f0f0' : 'none'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.icon}</div>
            <div style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#0D2B1A', marginTop: '2px' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT - 2 column */}
      <div style={{
        display: 'flex', gap: '24px',
        padding: '32px 48px', maxWidth: '1200px', margin: '0 auto'
      }}>

        {/* LEFT - Tabs */}
        <div style={{ flex: '0 0 60%' }}>

          {/* Tab buttons */}
          <div style={{
            display: 'flex', borderBottom: '2px solid #f0f0f0',
            marginBottom: '24px'
          }}>
            {['about', 'reviews', 'location'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  background: 'none',
                  borderBottom: activeTab === tab ? '2px solid #1A6B3C' : '2px solid transparent',
                  color: activeTab === tab ? '#1A6B3C' : '#888',
                  fontWeight: activeTab === tab ? '700' : '500',
                  fontSize: '15px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  marginBottom: '-2px'
                }}
              >
                {tab === 'about' ? '👤 About' : tab === 'reviews' ? '⭐ Reviews' : '📍 Location'}
              </button>
            ))}
          </div>

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Bio */}
              <div>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '18px', marginBottom: '10px', color: '#0D2B1A' }}>
                  About {doctor.name}
                </h3>
                <p style={{ color: '#555', lineHeight: '1.7', fontSize: '14px' }}>
                  {doctor.name} is a highly experienced {doctor.specialty} with over {doctor.experience} years 
                  of practice in {doctor.city}. Known for patient-centered care and clear communication, 
                  they specialize in providing quality healthcare to both local and international travelers. 
                  Fluent in {doctor.languages.join(', ')}, ensuring clear diagnosis and treatment.
                </p>
              </div>

              {/* Education */}
              <div>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '18px', marginBottom: '12px', color: '#0D2B1A' }}>
                  📚 Education & Qualifications
                </h3>
                {education.map((edu, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '16px',
                    padding: '12px 0',
                    borderBottom: i < education.length - 1 ? '1px solid #f5f5f5' : 'none'
                  }}>
                    <div style={{
                      width: '40px', height: '40px',
                      background: '#f0faf4', borderRadius: '10px',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0, fontSize: '18px'
                    }}>🎓</div>
                    <div>
                      <p style={{ fontWeight: '700', color: '#0D2B1A', margin: 0 }}>{edu.degree}</p>
                      <p style={{ color: '#666', fontSize: '13px', margin: '2px 0 0' }}>
                        {edu.institution} · {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specializations */}
              <div>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '18px', marginBottom: '12px', color: '#0D2B1A' }}>
                  🩺 Specializations
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {specializations.map(s => (
                    <span key={s} style={{
                      background: '#f0faf4', color: '#1A6B3C',
                      border: '1px solid #c3e6d0',
                      borderRadius: '20px', padding: '6px 14px',
                      fontSize: '13px', fontWeight: '500'
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '18px', marginBottom: '12px', color: '#0D2B1A' }}>
                  🕐 Working Hours
                </h3>
                <div style={{
                  border: '1px solid #f0f0f0',
                  borderRadius: '12px', overflow: 'hidden'
                }}>
                  {workingHours.map((wh, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '12px 16px', alignItems: 'center',
                      background: i % 2 === 0 ? 'white' : '#fafafa',
                      borderBottom: i < 6 ? '1px solid #f5f5f5' : 'none'
                    }}>
                      <span style={{ fontWeight: '600', color: '#0D2B1A', fontSize: '14px' }}>
                        {wh.day}
                      </span>
                      {wh.isOff ? (
                        <span style={{ color: '#E74C3C', fontWeight: '600', fontSize: '13px' }}>
                          Closed
                        </span>
                      ) : (
                        <span style={{ color: '#2ECC71', fontWeight: '600', fontSize: '13px' }}>
                          {wh.open} – {wh.close}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div>
              {/* Overall rating */}
              <div style={{
                background: '#f0faf4', borderRadius: '16px',
                padding: '24px', marginBottom: '24px',
                display: 'flex', alignItems: 'center', gap: '32px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '48px', fontWeight: '800',
                    color: '#1A6B3C', fontFamily: 'Playfair Display'
                  }}>
                    {doctor.rating}
                  </div>
                  <div style={{ color: '#FFD700', fontSize: '20px' }}>
                    {'★'.repeat(Math.floor(doctor.rating))}
                  </div>
                  <div style={{ color: '#888', fontSize: '12px' }}>
                    {doctor.reviewCount} reviews
                  </div>
                </div>
                {/* Rating bars */}
                <div style={{ flex: 1 }}>
                  {[5,4,3,2,1].map(star => {
                    const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 2 : 0
                    return (
                      <div key={star} style={{
                        display: 'flex', alignItems: 'center',
                        gap: '8px', marginBottom: '6px'
                      }}>
                        <span style={{ fontSize: '12px', color: '#888', minWidth: '16px' }}>{star}★</span>
                        <div style={{
                          flex: 1, height: '8px',
                          background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${pct}%`, height: '100%',
                            background: '#2ECC71', borderRadius: '4px'
                          }}/>
                        </div>
                        <span style={{ fontSize: '12px', color: '#888', minWidth: '30px' }}>{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Review cards */}
              {reviews.map(review => (
                <div key={review.id} style={{
                  border: '1px solid #f0f0f0',
                  borderRadius: '14px', padding: '20px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <div>
                      <span style={{ fontWeight: '700', color: '#0D2B1A' }}>
                        {review.patientName}
                      </span>
                      <span style={{ color: '#FFD700', marginLeft: '8px' }}>
                        {'★'.repeat(review.rating)}
                      </span>
                    </div>
                    <span style={{ color: '#aaa', fontSize: '12px' }}>{review.date}</span>
                  </div>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', margin: '0 0 10px' }}>
                    {review.review}
                  </p>
                  <button style={{
                    background: 'none', border: '1px solid #e0e0e0',
                    borderRadius: '8px', padding: '4px 12px',
                    fontSize: '12px', color: '#888', cursor: 'pointer'
                  }}>
                    👍 Helpful ({review.helpful})
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* LOCATION TAB */}
          {activeTab === 'location' && (
            <div>
              <div style={{
                border: '1px solid #f0f0f0',
                borderRadius: '16px', padding: '20px',
                marginBottom: '16px'
              }}>
                <h3 style={{ fontFamily: 'Playfair Display', marginBottom: '8px', color: '#0D2B1A' }}>
                  📍 {doctor.hospital}
                </h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                  {doctor.location?.address || doctor.city}
                </p>
                <button
                  onClick={() => window.open(
                    `https://www.google.com/maps/search/${encodeURIComponent(doctor.hospital + ' ' + doctor.city)}`,
                    '_blank'
                  )}
                  style={{
                    padding: '10px 20px',
                    background: '#1A6B3C', color: 'white',
                    border: 'none', borderRadius: '10px',
                    cursor: 'pointer', fontWeight: '600', fontSize: '14px'
                  }}
                >
                  🗺️ Open in Google Maps
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT - Sticky Booking Card */}
        <div style={{ flex: '0 0 36%' }}>
          <div style={{
            position: 'sticky', top: '90px',
            background: 'white', borderRadius: '20px',
            border: '2px solid #e8f5e9',
            padding: '24px',
            boxShadow: '0 4px 24px rgba(26,107,60,0.08)'
          }}>
            <h3 style={{
              fontFamily: 'Playfair Display', fontSize: '18px',
              color: '#0D2B1A', marginBottom: '16px'
            }}>
              📅 Book Appointment
            </h3>

            {/* Consult type toggle */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '8px', marginBottom: '16px'
            }}>
              {[
                { value: 'in-person', label: '🏥 In-Person', fee: doctor.costRange.min },
                { value: 'video', label: '💻 Video Call', fee: Math.round(doctor.costRange.min * 0.7) }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setConsultType(opt.value)}
                  style={{
                    padding: '10px',
                    background: consultType === opt.value ? '#f0faf4' : 'white',
                    border: consultType === opt.value ? '2px solid #2ECC71' : '1.5px solid #e0e0e0',
                    borderRadius: '10px', cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#0D2B1A' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A6B3C', fontWeight: '700' }}>
                    ₹{opt.fee}
                  </div>
                </button>
              ))}
            </div>

            {/* Date chips */}
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', fontWeight: '600' }}>
              SELECT DATE
            </p>
            <div style={{
              display: 'flex', gap: '8px', overflowX: 'auto',
              paddingBottom: '8px', marginBottom: '16px'
            }}>
              {next7Days.map(d => (
                <button
                  key={d.dateStr}
                  onClick={() => setSelectedDate(d.dateStr)}
                  style={{
                    minWidth: '56px', padding: '8px 4px',
                    textAlign: 'center',
                    background: selectedDate === d.dateStr ? '#1A6B3C' : 'white',
                    color: selectedDate === d.dateStr ? 'white' : '#333',
                    border: selectedDate === d.dateStr ? 'none' : '1.5px solid #e0e0e0',
                    borderRadius: '10px', cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: '600' }}>{d.day}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>{d.date}</div>
                  <div style={{ fontSize: '10px' }}>{d.month}</div>
                </button>
              ))}
            </div>

            {/* Time slots */}
            {selectedDate && (
              <>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', fontWeight: '600' }}>
                  SELECT TIME
                </p>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '6px', marginBottom: '16px'
                }}>
                  {timeSlots.map(slot => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => slot.available && setSelectedSlot(slot.time)}
                      style={{
                        padding: '8px 4px', fontSize: '11px', fontWeight: '600',
                        textAlign: 'center',
                        background: !slot.available ? '#f5f5f5'
                          : selectedSlot === slot.time ? '#1A6B3C' : 'white',
                        color: !slot.available ? '#ccc'
                          : selectedSlot === slot.time ? 'white' : '#333',
                        border: !slot.available ? '1px solid #f0f0f0'
                          : selectedSlot === slot.time ? 'none' : '1.5px solid #e0e0e0',
                        borderRadius: '8px',
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        textDecoration: !slot.available ? 'line-through' : 'none'
                      }}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Fee */}
            <div style={{
              background: '#f9f9f9', borderRadius: '10px',
              padding: '12px', marginBottom: '16px', fontSize: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#888' }}>Consultation Fee</span>
                <span style={{ fontWeight: '600' }}>₹{consultFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#888' }}>Platform Fee</span>
                <span style={{ fontWeight: '600' }}>₹{platformFee}</span>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                borderTop: '1px solid #e0e0e0', paddingTop: '8px'
              }}>
                <span style={{ fontWeight: '700', color: '#0D2B1A' }}>Total</span>
                <span style={{ fontWeight: '800', color: '#1A6B3C', fontSize: '16px' }}>
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            {/* Book button */}
            <button
              onClick={() => navigate(
                `/book/${doctor.id}?date=${selectedDate}&slot=${encodeURIComponent(selectedSlot)}&type=${consultType}`
              )}
              disabled={!selectedDate || !selectedSlot}
              style={{
                width: '100%', padding: '14px',
                background: (!selectedDate || !selectedSlot)
                  ? '#ccc'
                  : 'linear-gradient(135deg, #1A6B3C, #2ECC71)',
                color: 'white', border: 'none',
                borderRadius: '12px', fontSize: '15px',
                fontWeight: '700', cursor: (!selectedDate || !selectedSlot) ? 'not-allowed' : 'pointer',
                marginBottom: '10px'
              }}
            >
              Confirm Booking →
            </button>

            <p style={{
              textAlign: 'center', fontSize: '12px', color: '#888'
            }}>
              🔒 Free cancellation up to 2 hrs before
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
