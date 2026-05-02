import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor, onSelect }) => {
  const navigate = useNavigate();

  // Support both API data (_id) and local mock data (id)
  const doctorId = doctor._id || doctor.id;

  // Support both API format {min, max} and mock string format '₹800 - ₹1200'
  const costDisplay = typeof doctor.costRange === 'object' && doctor.costRange !== null
    ? `₹${doctor.costRange.min} - ₹${doctor.costRange.max}`
    : doctor.costRange || '–';

  // Support both mock (available) and API (isAvailable) field names
  const isUnavailable = doctor.available === false || doctor.isAvailable === false;

  return (
    <div className="modern-card p-6 flex flex-col group relative overflow-hidden">
      {/* Availability Status */}
      {isUnavailable && (
        <div className="absolute top-0 left-0 w-full py-1 bg-textMuted/10 text-textSecondary text-[0.6rem] font-bold text-center uppercase tracking-widest z-10 backdrop-blur-sm">
          Currently Unavailable
        </div>
      )}

      {/* Header: Photo + Info — clicking this area selects doctor on map */}
      <div
        className="flex items-start gap-5 mb-6 cursor-pointer"
        onClick={() => onSelect && onSelect()}
      >
        <div className="doctor-avatar-wrapper">
          <img
            src={doctor.photo}
            alt={doctor.name}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            className="doctor-avatar group-hover:scale-105 transition-transform duration-300"
          />
          {/* Fallback initials circle */}
          <div style={{
            display: 'none',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: '#1A6B3C',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            border: '3px solid #e8f5e9'
          }}>
            {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          {/* Verified badge */}
          {doctor.isVerified && (
            <div className="verified-badge">✓</div>
          )}
        </div>

        <div className="grow">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-xl font-display font-bold text-textMain leading-tight mb-1 group-hover:text-primary transition-colors">
              {doctor.name}
            </h3>
            {doctor.distanceBadge && (
              <span className="shrink-0 bg-bgLight text-textSecondary text-[9px] font-bold px-2 py-1 rounded-lg border border-borderSoft whitespace-nowrap">
                {doctor.distanceBadge}
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-primary mb-1">{doctor.specialty}</p>
          <p className="text-xs font-medium text-textSecondary flex items-center gap-1">
            <span>🏥</span> {doctor.hospital} • {doctor.city}
          </p>
        </div>
      </div>

      {/* Experience & Languages */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[0.6rem] font-bold text-textSecondary uppercase tracking-widest bg-bgLight px-2 py-0.5 rounded border border-borderSoft">
            {doctor.experience} Yrs Exp
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(doctor.languages || []).map(lang => (
              <span key={lang} className="text-[0.6rem] font-bold text-secondary uppercase tracking-tighter bg-secondary/5 px-2 py-0.5 rounded">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-textMain">{costDisplay}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-bgLight px-2 py-1 rounded-lg">
            <span className="text-accent text-xs">★</span>
            <span className="text-sm font-bold text-textMain">{doctor.rating}</span>
            <span className="text-[0.65rem] font-medium text-textSecondary">({doctor.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (!doctorId) {
              console.error('Doctor ID missing!')
              return
            }
            navigate(`/book/${doctorId}`)
          }}
          className="bg-primary hover:bg-secondary text-white text-xs font-bold py-3 rounded-xl transition-all shadow-soft active:scale-95"
        >
          Book Now
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (!doctorId) {
              console.error('Doctor ID missing!')
              return
            }
            navigate(`/doctor/${doctorId}`)
          }}
          className="border-2 border-borderSoft hover:border-secondary text-textSecondary hover:text-primary text-xs font-bold py-3 rounded-xl transition-all active:scale-95"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
