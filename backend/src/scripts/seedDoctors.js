require('dotenv').config()
const mongoose = require('mongoose')
const Doctor = require('../models/Doctor')

const doctors = [
  {
    name: 'Dr. Ananya Sharma',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    specialty: 'General Physician',
    hospital: 'City Care Hospital',
    city: 'Mumbai',
    location: { lat: 19.0596, lng: 72.8295, address: 'Bandra West', area: 'Bandra' },
    languages: ['English', 'Hindi'],
    costRange: { min: 800, max: 1200 },
    experience: 12,
    rating: 4.8,
    reviewCount: 156,
    isVerified: true,
    consultationTypes: ['in-person', 'video'],
  },
  {
    name: 'Dr. Rahul Verma',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    specialty: 'Cardiologist',
    hospital: 'Fortis Hospital',
    city: 'Delhi',
    location: { lat: 28.6139, lng: 77.2090, address: 'Vasant Kunj', area: 'South Delhi' },
    languages: ['English', 'Hindi', 'Punjabi'],
    costRange: { min: 1500, max: 2500 },
    experience: 18,
    rating: 4.9,
    reviewCount: 342,
    isVerified: true,
    consultationTypes: ['in-person'],
  }
]

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Doctor.deleteMany({})
  await Doctor.insertMany(doctors)
  console.log('✅ Doctors seeded!')
  process.exit()
})
