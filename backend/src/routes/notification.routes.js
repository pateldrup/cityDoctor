const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const {
  getNotifications, getUnreadCount,
  markAsRead, markAllAsRead,
  deleteNotification, clearAllNotifications
} = require('../controllers/notification.controller')

router.get('/', protect, getNotifications)
router.get('/unread-count', protect, getUnreadCount)
router.patch('/mark-all-read', protect, markAllAsRead)
router.patch('/:id/read', protect, markAsRead)
router.delete('/clear-all', protect, clearAllNotifications)
router.delete('/:id', protect, deleteNotification)

module.exports = router
