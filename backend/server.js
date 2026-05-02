const app = require('./src/app')
const http = require('http')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 5000
const server = http.createServer(app)

// Socket.io for real-time notifications
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

// Socket connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  socket.on('join', (userId) => {
    socket.join(userId)
    console.log(`User ${userId} joined their room`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Make io accessible in controllers
app.set('io', io)

server.listen(PORT, () => {
  console.log(`🏥 CityDoctor Backend running on port ${PORT}`)
})
