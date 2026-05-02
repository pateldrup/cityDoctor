const User = require('../models/User')
const Doctor = require('../models/Doctor')
const { successResponse, errorResponse } = require('../utils/responseHelper')

// @GET /api/users/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedDoctors', 'name specialty city photo rating')
    return successResponse(res, user, 'User fetched')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @PUT /api/users/profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true })
    return successResponse(res, user, 'Profile updated successfully')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @POST /api/users/save-doctor/:doctorId (toggle)
exports.saveDoctor = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const doctorId = req.params.doctorId

    const alreadySaved = user.savedDoctors.includes(doctorId)
    if (alreadySaved) {
      user.savedDoctors = user.savedDoctors.filter(id => id.toString() !== doctorId)
      await user.save({ validateBeforeSave: false })
      return successResponse(res, { saved: false, doctorId }, 'Doctor removed from saved list')
    } else {
      user.savedDoctors.push(doctorId)
      await user.save({ validateBeforeSave: false })
      return successResponse(res, { saved: true, doctorId }, 'Doctor saved successfully')
    }
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/users/saved-doctors
exports.getSavedDoctors = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedDoctors', 'name specialty city photo rating isVerified hospital')
    return successResponse(res, user.savedDoctors, 'Saved doctors fetched')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @DELETE /api/users/account
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id)
    return successResponse(res, null, 'Account deleted successfully')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}
