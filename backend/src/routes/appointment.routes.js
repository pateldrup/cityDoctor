const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  rescheduleAppointment
} = require('../controllers/appointment.controller')

router.post('/', protect, createAppointment)
router.get('/my', protect, getMyAppointments)
router.get('/:id', protect, getAppointmentById)
router.patch('/:id/cancel', protect, cancelAppointment)
router.patch('/:id/reschedule', protect, rescheduleAppointment)

module.exports = router
