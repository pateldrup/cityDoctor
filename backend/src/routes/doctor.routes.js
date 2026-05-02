const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const {
  getDoctors, getDoctorById, getAvailableSlots
} = require('../controllers/doctor.controller')

router.get('/', getDoctors)
router.get('/:id/slots', getAvailableSlots)   // ← MUST be before /:id
router.get('/:id', getDoctorById)

module.exports = router
