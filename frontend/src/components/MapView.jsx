import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { doctors } from '../data/doctors';
import { getDistance } from '../utils/distance';

// Custom Marker Icons
const doctorIcon = L.divIcon({
  className: 'custom-doctor-marker',
  html: `<div style="background-color: #1A6B3C; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; items-center; justify-center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">+</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const userIcon = L.divIcon({
  className: 'pulse-marker',
  html: `<div class="pulse-marker"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to handle map centering
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
        map.flyTo(center, zoom, {
            duration: 1.5,
            easeLinearity: 0.25
        });
    }
  }, [center, zoom, map]);
  return null;
};

const MapView = ({ doctors: filteredDoctors, selectedDoctorId, onDoctorSelect, selectedCity, userLocation }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mapCenter, setMapCenter] = useState(userLocation || [19.0760, 72.8777]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update center when selectedCity changes
  useEffect(() => {
    if (selectedCity) {
      setMapCenter([selectedCity.lat, selectedCity.lng]);
    } else if (userLocation) {
        // If city cleared or "Use My Location" clicked, return to user location
        setMapCenter(userLocation);
    }
  }, [selectedCity, userLocation]);

  // Update center when selectedDoctorId changes (priority over city)
  useEffect(() => {
    if (selectedDoctorId) {
      const selectedDoc = filteredDoctors.find(d => d.id === selectedDoctorId);
      if (selectedDoc) {
        setMapCenter([selectedDoc.lat, selectedDoc.lng]);
      }
    }
  }, [selectedDoctorId, filteredDoctors]);

  if (!isMounted) return <div className="h-[550px] w-full bg-bgLight animate-pulse rounded-3xl flex items-center justify-center font-bold text-textMuted uppercase tracking-widest">Loading Interactive Map...</div>;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-borderSoft shadow-soft group h-full">
      {/* Map Controls Overlays */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button 
          onClick={() => setMapCenter(userLocation)}
          className="bg-white p-3 rounded-xl shadow-lg hover:bg-bgLight transition-all text-xl"
          title="Use My Location"
        >
          📍
        </button>
      </div>

      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <ChangeView center={mapCenter} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Doctor Markers */}
        {filteredDoctors.map((doc) => {
          const dist = userLocation 
            ? getDistance(userLocation[0], userLocation[1], doc.lat, doc.lng).toFixed(1)
            : (Math.random() * 5 + 1).toFixed(1); // Fallback for distance display
          
          return (
            <Marker 
              key={doc.id} 
              position={[doc.lat, doc.lng]} 
              icon={doctorIcon}
              eventHandlers={{
                click: () => onDoctorSelect(doc.id),
              }}
            >
              <Popup className="custom-popup" autoPan={true}>
                <div className="p-2 min-w-[200px]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-textMain leading-tight">{doc.name}</h4>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{doc.specialty}</p>
                    </div>
                    <span className="bg-bgLight text-primary px-2 py-0.5 rounded text-[10px] font-bold">{dist} km</span>
                  </div>
                  
                  <p className="text-xs text-textSecondary mb-3">🏥 {doc.hospital}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-textMain">{doc.costRange}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-accent text-[10px]">★</span>
                      <span className="text-xs font-bold">{doc.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="w-full bg-primary text-white py-2 rounded-lg text-xs font-bold hover:bg-secondary transition-all">
                      Book Now
                    </button>
                    {userLocation && (
                        <button 
                          onClick={() => window.open(`https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${doc.lat},${doc.lng}`)}
                          className="w-full bg-white border border-borderSoft text-textSecondary py-2 rounded-lg text-[10px] font-bold hover:bg-bgLight transition-all"
                        >
                          Get Directions 🗺️
                        </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};


export default MapView;
