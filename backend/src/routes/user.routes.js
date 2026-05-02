const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const {
  getProfile, updateProfile,
  saveDoctor, getSavedDoctors, deleteAccount
} = require('../controllers/user.controller')

router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.post('/save-doctor/:doctorId', protect, saveDoctor)
router.get('/saved-doctors', protect, getSavedDoctors)
router.delete('/account', protect, deleteAccount)

module.exports = router
