const Notification = require('../models/Notification')
const { successResponse, errorResponse } = require('../utils/responseHelper')

// @GET /api/notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 })
    return successResponse(res, notifications, 'Notifications fetched')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/notifications/unread-count
exports.getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({ user: req.user.id, isRead: false })
    return successResponse(res, { unreadCount })
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @PATCH /api/notifications/:id/read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isRead: true },
      { new: true }
    )
    if (!notification) return errorResponse(res, 'Notification not found', 404)
    return successResponse(res, notification, 'Notification marked as read')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @PATCH /api/notifications/mark-all-read
exports.markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true }
    )
    return successResponse(res, { updatedCount: result.modifiedCount }, 'All notifications marked as read')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @DELETE /api/notifications/:id
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!notification) return errorResponse(res, 'Notification not found', 404)
    return successResponse(res, null, 'Notification deleted')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @DELETE /api/notifications/clear-all
exports.clearAllNotifications = async (req, res) => {
  try {
    const result = await Notification.deleteMany({ user: req.user.id })
    return successResponse(res, { deletedCount: result.deletedCount }, 'All notifications cleared')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}
