import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initializeExpressResolvers } from './initialization.js'
import { CORS_ORIGINS } from './constants.js'
import { logRequest } from './middleware/logRequest.js'
import { Server } from 'socket.io'
import { createServer } from 'http'

export let io: Server

(async () => {
  const app = express()
  const server = createServer(app)

  const PORT = process.env.PORT || 3001

  // Configure Socket.IO with CORS
  io = new Server(server, {
    cors: {
      origin: CORS_ORIGINS,
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  // Middleware
  app.use(cors({
    origin: CORS_ORIGINS,
    credentials: true
  }))
  app.use(express.json())
  app.use(logRequest)

  await initializeExpressResolvers(app)

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {})
  })

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})()