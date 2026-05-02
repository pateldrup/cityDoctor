const Settings = require('../models/Settings')
const User = require('../models/User')
const { successResponse, errorResponse } = require('../utils/responseHelper')

// @GET /api/settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user.id })
    if (!settings) {
      // Create default settings if not exist
      settings = await Settings.create({ user: req.user.id })
    }
    return successResponse(res, settings)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @PUT /api/settings
exports.updateSettings = async (req, res) => {
  try {
    const { language, notifications, privacy, theme } = req.body
    const updateData = {}
    if (language !== undefined) updateData.language = language
    if (theme !== undefined) updateData.theme = theme
    if (notifications !== undefined) updateData.notifications = notifications
    if (privacy !== undefined) updateData.privacy = privacy

    let settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    )
    return successResponse(res, settings, 'Settings updated successfully')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @PUT /api/settings/change-password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword || !confirmPassword) {
      return errorResponse(res, 'All password fields are required', 400)
    }
    if (newPassword !== confirmPassword) {
      return errorResponse(res, 'New passwords do not match', 400)
    }
    if (newPassword.length < 6) {
      return errorResponse(res, 'Password must be at least 6 characters', 400)
    }

    const user = await User.findById(req.user.id).select('+password')
    if (!user.password) {
      return errorResponse(res, 'Cannot change password for Google-authenticated accounts', 400)
    }
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return errorResponse(res, 'Current password is incorrect', 400)
    }

    user.password = newPassword
    await user.save()

    return successResponse(res, { updatedAt: new Date().toISOString() }, 'Password changed successfully')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}
