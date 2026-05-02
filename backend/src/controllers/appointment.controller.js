const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')
const Notification = require('../models/Notification')
const { successResponse, errorResponse } = require('../utils/responseHelper')

// @POST /api/appointments
exports.createAppointment = async (req, res) => {
  try {
    const {
      doctorId, consultationType, date, timeSlot,
      patientDetails, paymentDetails, insuranceDetails
    } = req.body

    const doctor = await Doctor.findById(doctorId)
    if (!doctor) return errorResponse(res, 'Doctor not found', 404)

    // Check slot availability
    const existing = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    })
    if (existing) {
      return errorResponse(res, 'This slot is already booked', 400)
    }

    const platformFee = 50
    const baseFee = doctor.costRange.min || 800
    const consultFee = consultationType === 'video' ? Math.floor(baseFee * 0.8) : baseFee
    const totalAmount = consultFee + platformFee

    // Normalize 'clinic' → 'pay-at-clinic' for DB
    const normalizedMethod = paymentDetails.method === 'clinic' ? 'pay-at-clinic' : paymentDetails.method

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      consultationType,
      date: new Date(date),
      timeSlot,
      status: 'confirmed',
      patientDetails,
      paymentDetails: {
        ...paymentDetails,
        method: normalizedMethod,
        amount: consultFee,
        platformFee,
        totalAmount,
        status: (normalizedMethod === 'pay-at-clinic') ? 'pending' : 'paid'
      },
      insuranceDetails
    })

    // Update doctor appointment count
    await Doctor.findByIdAndUpdate(doctorId, {
      $inc: { totalAppointments: 1 }
    })

    // Create notification
    const notification = await Notification.create({
      user: req.user.id,
      type: 'appointment',
      title: 'Booking Confirmed! 🎉',
      message: `Your appointment with ${doctor.name} is confirmed for ${timeSlot} on ${new Date(date).toDateString()}`,
      icon: '📅',
      actionUrl: '/bookings',
      actionLabel: 'View Booking',
      metadata: { appointmentId: appointment._id }
    })

    // Emit real-time notification
    const io = req.app.get('io')
    io.to(req.user.id.toString()).emit('notification', notification)

    const populated = await appointment.populate('doctor', 'name specialty hospital photo')

    return successResponse(res, {
      appointment: populated,
      bookingId: appointment.bookingId
    }, 'Appointment booked successfully', 201)

  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/appointments/my
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate('doctor', 'name specialty hospital photo city rating')
      .sort({ date: -1 })
    return successResponse(res, appointments)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @PATCH /api/appointments/:id/cancel
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user.id
    })
    if (!appointment) return errorResponse(res, 'Appointment not found', 404)
    if (appointment.status === 'cancelled') {
      return errorResponse(res, 'Already cancelled', 400)
    }
    appointment.status = 'cancelled'
    appointment.cancelReason = req.body.reason || 'Cancelled by patient'
    await appointment.save()
    return successResponse(res, appointment, 'Appointment cancelled')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/appointments/:id
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user.id
    }).populate('doctor', 'name specialty hospital photo city rating')
    if (!appointment) return errorResponse(res, 'Appointment not found', 404)
    return successResponse(res, appointment)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @PATCH /api/appointments/:id/reschedule
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { newDate, newTimeSlot } = req.body
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user.id
    })
    if (!appointment) return errorResponse(res, 'Appointment not found', 404)
    if (appointment.status === 'cancelled') {
      return errorResponse(res, 'Cannot reschedule a cancelled appointment', 400)
    }

    // Check if new slot is available
    const conflict = await Appointment.findOne({
      doctor: appointment.doctor,
      date: new Date(newDate),
      timeSlot: newTimeSlot,
      status: { $in: ['pending', 'confirmed'] },
      _id: { $ne: appointment._id }
    })
    if (conflict) return errorResponse(res, 'This slot is already booked', 400)

    appointment.date = new Date(newDate)
    appointment.timeSlot = newTimeSlot
    appointment.status = 'confirmed'
    await appointment.save()
    return successResponse(res, appointment, 'Appointment rescheduled successfully')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}
