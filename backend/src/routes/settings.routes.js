const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const { getSettings, updateSettings, changePassword } = require('../controllers/settings.controller')

router.get('/', protect, getSettings)
router.put('/', protect, updateSettings)
router.put('/change-password', protect, changePassword)

module.exports = router
