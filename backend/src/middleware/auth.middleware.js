const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { errorResponse } = require('../utils/responseHelper')

exports.protect = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return errorResponse(res, 'Not authorized. Please login.', 401)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) {
      return errorResponse(res, 'User not found', 401)
    }
    next()
  } catch (error) {
    return errorResponse(res, 'Invalid token', 401)
  }
}

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}
