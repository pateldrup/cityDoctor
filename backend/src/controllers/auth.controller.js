const User = require('../models/User')
const { generateToken } = require('../middleware/auth.middleware')
const { successResponse, errorResponse } = require('../utils/responseHelper')

// @POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, userType, preferredLanguages } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return errorResponse(res, 'Email already registered', 400)
    }

    const user = await User.create({
      name, email, phone, password,
      userType: userType || 'traveler',
      preferredLanguages: preferredLanguages || ['English']
    })

    const token = generateToken(user._id)

    return successResponse(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        avatar: user.avatar,
      }
    }, 'Registration successful', 201)

  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return errorResponse(res, 'Please provide email and password', 400)
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return errorResponse(res, 'Invalid email or password', 401)
    }

    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    const token = generateToken(user._id)

    return successResponse(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        avatar: user.avatar,
        preferredLanguages: user.preferredLanguages,
      }
    }, 'Login successful')

  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    return successResponse(res, null, 'Logged out successfully')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('savedDoctors', 'name specialty city photo rating')
    return successResponse(res, user, 'User fetched')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return errorResponse(res, 'No account found with that email', 404)
    }
    const resetToken = Math.random().toString(36).slice(-8).toUpperCase()
    user.resetPasswordToken = resetToken
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000 // 10 mins
    await user.save({ validateBeforeSave: false })

    // TODO: Send email with reset token
    return successResponse(res, { resetToken }, 'Reset token sent to email')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
      return errorResponse(res, 'Invalid or expired reset token', 400)
    }
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    const jwtToken = generateToken(user._id)
    return successResponse(res, { token: jwtToken }, 'Password reset successful')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @POST /api/auth/google
exports.googleAuth = async (req, res) => {
  try {
    const { googleId, email, name, avatar } = req.body
    let user = await User.findOne({ email })
    if (user) {
      if (!user.googleId) {
        user.googleId = googleId
        await user.save({ validateBeforeSave: false })
      }
    } else {
      user = await User.create({
        name, email, googleId, avatar,
        isEmailVerified: true,
        userType: 'traveler'
      })
    }
    const token = generateToken(user._id)
    return successResponse(res, { token, user: {
      id: user._id, name: user.name, email: user.email,
      avatar: user.avatar, userType: user.userType
    }}, 'Google login successful')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}
