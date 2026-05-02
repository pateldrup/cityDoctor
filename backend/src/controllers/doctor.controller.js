const Doctor = require('../models/Doctor')
const Review = require('../models/Review')
const { successResponse, errorResponse } = require('../utils/responseHelper')

// @GET /api/doctors - Get all doctors with filters
exports.getDoctors = async (req, res) => {
  try {
    const {
      city, specialty, language, minCost, maxCost,
      rating, sort, page = 1, limit = 12,
      lat, lng, search
    } = req.query

    let query = { isAvailable: true }

    if (city && city !== 'All') query.city = city
    if (specialty && specialty !== 'All') query.specialty = specialty
    if (language && language !== 'All') {
      query.languages = { $in: [language] }
    }
    if (minCost || maxCost) {
      query['costRange.min'] = {}
      if (minCost) query['costRange.min'].$gte = Number(minCost)
      if (maxCost) query['costRange.max'] = { $lte: Number(maxCost) }
    }
    if (rating) query.rating = { $gte: Number(rating) }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { hospital: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } }
      ]
    }

    let sortObj = {}
    if (sort === 'rating') sortObj = { rating: -1 }
    else if (sort === 'cost') sortObj = { 'costRange.min': 1 }
    else if (sort === 'experience') sortObj = { experience: -1 }
    else sortObj = { rating: -1 }

    const skip = (Number(page) - 1) * Number(limit)
    const total = await Doctor.countDocuments(query)
    let doctors = await Doctor.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit))

    // Calculate distance if user location provided
    if (lat && lng) {
      doctors = doctors.map(doc => {
        const d = doc.toObject()
        const R = 6371
        const dLat = (d.location.lat - lat) * Math.PI / 180
        const dLng = (d.location.lng - lng) * Math.PI / 180
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat * Math.PI/180) * Math.cos(d.location.lat * Math.PI/180) *
          Math.sin(dLng/2) * Math.sin(dLng/2)
        d.distance = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 10) / 10
        return d
      }).sort((a, b) => a.distance - b.distance)
    }

    return successResponse(res, {
      doctors,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit)
      }
    })
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/doctors/:id
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor) return errorResponse(res, 'Doctor not found', 404)
    const reviews = await Review.find({ doctor: doctor._id })
      .populate('patient', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(10)
    return successResponse(res, { doctor, reviews })
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/doctors/:id/slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query
    const Appointment = require('../models/Appointment')

    const bookedSlots = await Appointment.find({
      doctor: req.params.id,
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] }
    }).select('timeSlot')

    const bookedTimes = bookedSlots.map(a => a.timeSlot)

    const allSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
      '05:00 PM', '05:30 PM', '06:00 PM'
    ]

    const slots = allSlots.map(slot => ({
      time: slot,
      isAvailable: !bookedTimes.includes(slot)
    }))

    return successResponse(res, { slots, date })
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}
