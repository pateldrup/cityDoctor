const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const {
  getEmergencyContacts, getEmergencyContactByCity,
  getNearbyHospitals, requestAmbulance,
  getNearbyPharmacies, submitInsuranceClaim
} = require('../controllers/emergency.controller')

router.get('/contacts', getEmergencyContacts)
router.get('/contacts/:city', getEmergencyContactByCity)
router.get('/hospitals', getNearbyHospitals)
router.post('/ambulance', requestAmbulance)
router.get('/pharmacies', getNearbyPharmacies)
router.post('/insurance-claim', protect, submitInsuranceClaim)

module.exports = router
