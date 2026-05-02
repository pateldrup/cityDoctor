const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const connectDB = require('./config/db')
connectDB()

const app = express()

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/doctors', require('./routes/doctor.routes'))
app.use('/api/appointments', require('./routes/appointment.routes'))
app.use('/api/notifications', require('./routes/notification.routes'))
app.use('/api/emergency', require('./routes/emergency.routes'))
app.use('/api/settings', require('./routes/settings.routes'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '🏥 CityDoctor API is running',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Internal Server Error' 
  })
})

module.exports = app
