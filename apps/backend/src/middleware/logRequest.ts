import { NextFunction, Request, Response } from 'express'
import { isEmpty, isNil } from 'lodash-es'

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log('REQUEST', req.method, req.url, !isEmpty(req.body) ? JSON.stringify(req.body) : '')

  const oldJson = res.json
  res.json = (body) => {
    res.locals.body = body

    try {
      const response = oldJson.call(res, body)
      if (res.statusCode >= 300) {
        console.log('RESPONSE', res.statusCode, res.statusMessage, !isEmpty(res.locals.body) ? JSON.stringify(res.locals.body) : '')
        if (!isNil(res.locals.error)) {
          console.log('ERROR', res.locals.error)
        }
      }

      return response
    } catch (error: any) {
      console.error('Error while logging response', error)

      return res.status(500).json({ status: 'ERROR', message: error.message, stack: error.stack })
    }
  }

  next()
}