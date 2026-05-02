const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  photo: { type: String, default: null },
  specialty: { 
    type: String, 
    required: true,
    enum: [
      'General Physician', 'Cardiologist', 'Dermatologist',
      'ENT Specialist', 'Orthopedic', 'Gynecologist',
      'Pediatrician', 'Neurologist', 'Psychiatrist',
      'Dentist', 'Ophthalmologist', 'Urologist',
      'Gastroenterologist', 'Pulmonologist', 'Endocrinologist'
    ]
  },
  hospital: { type: String, required: true },
  city: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: String,
    area: String
  },
  languages: [{ 
    type: String,
    enum: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 
           'Bengali', 'Gujarati', 'Kannada', 'Punjabi', 'Italian', 'Spanish',
           'French', 'Portuguese', 'Konkani', 'Mandarin', 'Rajasthani']
  }],
  costRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  experience: { type: Number, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  consultationTypes: [{
    type: String,
    enum: ['in-person', 'video', 'phone']
  }],
  workingHours: {
    monday: { open: String, close: String, isOff: Boolean },
    tuesday: { open: String, close: String, isOff: Boolean },
    wednesday: { open: String, close: String, isOff: Boolean },
    thursday: { open: String, close: String, isOff: Boolean },
    friday: { open: String, close: String, isOff: Boolean },
    saturday: { open: String, close: String, isOff: Boolean },
    sunday: { open: String, close: String, isOff: Boolean },
  },
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  specializations: [String],
  bio: String,
  totalAppointments: { type: Number, default: 0 },
}, { timestamps: true })

// Index for geo-queries
doctorSchema.index({ 'location.lat': 1, 'location.lng': 1 })
doctorSchema.index({ city: 1, specialty: 1 })
doctorSchema.index({ rating: -1 })

module.exports = mongoose.model('Doctor', doctorSchema)
