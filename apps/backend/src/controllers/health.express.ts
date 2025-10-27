import { Application } from 'express'

export default async function configureHealthExpressRoutes (app: Application): Promise<void> {

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running!' })
  })
}
