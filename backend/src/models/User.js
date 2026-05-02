const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Invalid Indian phone number']
  },
  password: {
    type: String,
    minlength: 6,
    select: false  // Never return password in queries
  },
  avatar: {
    type: String,
    default: null
  },
  userType: {
    type: String,
    enum: ['traveler', 'local', 'doctor', 'corporate'],
    default: 'traveler'
  },
  preferredLanguages: [{
    type: String,
    enum: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 
           'Gujarati', 'Kannada', 'Punjabi', 'Italian', 'Spanish',
           'French', 'Portuguese', 'Konkani', 'Mandarin', 'Rajasthani']
  }],
  homeCity: {
    name: String,
    lat: Number,
    lng: Number
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  medicalInfo: {
    bloodGroup: String,
    allergies: [String],
    chronicConditions: [String],
    currentMedications: [String]
  },
  travelInsurance: {
    hasInsurance: { type: Boolean, default: false },
    provider: String,
    policyNumber: String
  },
  savedDoctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  isEmailVerified: { type: Boolean, default: false },
  emailVerifyToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  googleId: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
}, { timestamps: true })

// Hash password before save (Mongoose v7+ async style — no next())
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
