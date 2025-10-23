import { Request, Response, NextFunction } from 'express'
import { ZodObject } from 'zod'

export function validateBodyData (schema: ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({ status: 'ERROR', message: 'Invalid data', expectedData: result.error.issues.map((e) => ({ [e.path.join('.')]: e.message })) })
    }

    next()
  }
}
