import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  confirmed: { bg: '#e8f5e9', text: '#1A6B3C', label: '✅ Confirmed' },
  completed: { bg: '#e3f2fd', text: '#1565C0', label: '✔ Completed' },
  cancelled: { bg: '#ffebee', text: '#C62828', label: '✖ Cancelled' },
  pending:   { bg: '#fff8e1', text: '#F57F17', label: '⏳ Pending' },
};

const BookingsPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('citydoctor_bookings') || '[]');
    // Sort newest first
    saved.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBookings(saved);
  }, []);

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const handleCancel = (bookingId) => {
    const updated = bookings.map(b =>
      b.bookingId === bookingId ? { ...b, status: 'cancelled' } : b
    );
    setBookings(updated);
    localStorage.setItem('citydoctor_bookings', JSON.stringify(updated));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafb' }}>
      <Navbar />

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 16px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '32px',
            fontWeight: '800',
            color: '#0D2B1A',
            marginBottom: '4px'
          }}>
            📅 My Bookings
          </h1>
          <p style={{ color: '#666', fontSize: '15px' }}>
            {bookings.length} appointment{bookings.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {['all', 'confirmed', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: '1.5px solid',
                borderColor: filter === f ? '#1A6B3C' : '#e0e0e0',
                background: filter === f ? '#1A6B3C' : 'white',
                color: filter === f ? 'white' : '#555',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        {filtered.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '60px 32px',
            textAlign: 'center',
            border: '1px solid #e8e8e8'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📋</div>
            <h3 style={{ color: '#0D2B1A', marginBottom: '8px', fontSize: '20px', fontWeight: '700' }}>
              No bookings found
            </h3>
            <p style={{ color: '#888', marginBottom: '24px' }}>
              {filter === 'all'
                ? "You haven't made any appointments yet."
                : `No ${filter} appointments.`}
            </p>
            <button
              onClick={() => navigate('/find-doctor')}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #1A6B3C, #2ECC71)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              🔍 Find a Doctor
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map((booking) => {
              const status = statusColors[booking.status] || statusColors.confirmed;
              return (
                <div
                  key={booking.bookingId}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #e8f5e9',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'box-shadow 0.2s'
                  }}
                >
                  {/* Top bar: status */}
                  <div style={{
                    background: status.bg,
                    padding: '8px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: status.text, fontWeight: '700', fontSize: '13px' }}>
                      {status.label}
                    </span>
                    <span style={{ color: '#888', fontSize: '12px', fontFamily: 'monospace' }}>
                      {booking.bookingId}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '20px' }}>
                    {/* Doctor info */}
                    <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', alignItems: 'center' }}>
                      {booking.doctorPhoto ? (
                        <img
                          src={booking.doctorPhoto}
                          alt={booking.doctorName}
                          style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e8f5e9' }}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                          👨‍⚕️
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: '800', color: '#0D2B1A', fontSize: '16px' }}>
                          {booking.doctorName || 'Doctor'}
                        </div>
                        <div style={{ color: '#1A6B3C', fontSize: '13px', fontWeight: '600' }}>
                          {booking.doctorSpecialty}
                          {booking.doctorHospital && ` • ${booking.doctorHospital}`}
                        </div>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      padding: '14px',
                      background: '#f9fafb',
                      borderRadius: '12px',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '2px' }}>Date</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#0D2B1A' }}>
                          📅 {booking.date ? booking.date.split(' ').slice(0, 3).join(' ') : '—'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '2px' }}>Time</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#0D2B1A' }}>⏰ {booking.timeSlot || '—'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '2px' }}>Type</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#0D2B1A' }}>
                          {booking.consultationType === 'video' ? '💻 Video' : '🏥 In-Person'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '2px' }}>Amount</div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#1A6B3C' }}>
                          ₹{booking.totalAmount || 0}
                          <span style={{ fontSize: '11px', color: '#888', fontWeight: '500', marginLeft: '4px' }}>
                            ({booking.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pay at clinic'})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Patient info */}
                    {booking.patientName && (
                      <div style={{ fontSize: '13px', color: '#555', marginBottom: '16px' }}>
                        👤 <strong>{booking.patientName}</strong>
                        {booking.age && `, ${booking.age} yrs`}
                        {booking.gender && ` (${booking.gender})`}
                        {booking.reason && <> — {booking.reason}</>}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => navigate('/find-doctor')}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: 'linear-gradient(135deg, #1A6B3C, #2ECC71)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer',
                          minWidth: '120px'
                        }}
                      >
                        🔁 Book Again
                      </button>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancel(booking.bookingId)}
                          style={{
                            padding: '10px 16px',
                            background: '#ffebee',
                            color: '#C62828',
                            border: '1.5px solid #ffcdd2',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          ✖ Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Book new appointment CTA */}
        {bookings.length > 0 && (
          <div style={{
            marginTop: '32px',
            textAlign: 'center',
            padding: '28px',
            background: 'white',
            borderRadius: '20px',
            border: '1px solid #e8f5e9'
          }}>
            <p style={{ color: '#555', marginBottom: '16px', fontWeight: '500' }}>
              Need another appointment?
            </p>
            <button
              onClick={() => navigate('/find-doctor')}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #1A6B3C, #2ECC71)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              🔍 Find a Doctor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
