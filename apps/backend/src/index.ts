import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initializeExpressResolvers } from './initialization.js'
import { ALLOWED_CORS_ORIGINS_REGEX } from './constants.js'
import { logRequest } from './middleware/logRequest.js'

(async () => {
  const app = express()
  const PORT = process.env.PORT || 3001

  // Middleware
  app.use(cors({
    origin: ALLOWED_CORS_ORIGINS_REGEX,
    credentials: true
  }))
  app.use(express.json())
  app.use(logRequest)

  await initializeExpressResolvers(app)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})()