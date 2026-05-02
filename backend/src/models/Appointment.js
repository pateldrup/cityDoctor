const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  bookingId: {
    type: String,
    unique: true,
  },
  consultationType: {
    type: String,
    enum: ['in-person', 'video', 'phone'],
    required: true
  },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  patientDetails: {
    name: String,
    age: Number,
    gender: String,
    phone: String,
    email: String,
    reason: String,
    symptoms: [String],
  },
  paymentDetails: {
    method: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'pay-at-clinic', 'clinic']
    },
    amount: Number,
    platformFee: Number,
    totalAmount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
  },
  insuranceDetails: {
    hasInsurance: Boolean,
    provider: String,
    policyNumber: String,
  },
  notes: String,
  cancelReason: String,
  reminderSent: { type: Boolean, default: false },
  hasReview: { type: Boolean, default: false },
}, { timestamps: true })

// Auto-generate booking ID (Mongoose v7+ async style)
appointmentSchema.pre('save', async function() {
  if (!this.bookingId) {
    this.bookingId = 'MR-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
  }
})

module.exports = mongoose.model('Appointment', appointmentSchema)
