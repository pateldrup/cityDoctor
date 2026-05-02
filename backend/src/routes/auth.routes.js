const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const {
  register, login, logout, getMe,
  forgotPassword, resetPassword, googleAuth
} = require('../controllers/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', protect, logout)
router.get('/me', protect, getMe)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/google', googleAuth)

module.exports = router
