import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initializeExpressResolvers } from './initialization.js'
import { ALLOWED_CORS_ORIGINS_REGEX, SOCKET_CORS_ORIGINS } from './constants.js'
import { logRequest } from './middleware/logRequest.js'
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'

const PORT = Number(process.env.PORT) || 3001

export const app = express()
export const server = createServer(app)
export const socketIo = new Server(server, {
  cors: {
    origin: SOCKET_CORS_ORIGINS,
    methods: ['GET', 'POST'],
    credentials: false
  }
})

const startServer = async () => {
  // Middleware
  app.use(cors({
    origin: ALLOWED_CORS_ORIGINS_REGEX,
    credentials: true
  }))
  app.use(express.json())
  app.use(logRequest)

  await initializeExpressResolvers(app)

  socketIo.on('connection', (socket: Socket) => {
    console.log('Socket connected', socket.id)
    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id)
    })
  })

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

startServer()