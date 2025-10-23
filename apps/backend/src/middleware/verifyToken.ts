import { NextFunction, Request, Response } from 'express'
import { isEmpty } from 'lodash-es'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '~/constants.js'

export function verifyToken (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization') || ''
  const accessToken = authHeader.split(' ')[1]
  if (isEmpty(accessToken)) {
    return res.status(401).json({ status: 'ERROR', message: 'Token not provided' })
  }

  try {
    const payload = jwt.verify(accessToken, JWT_SECRET_KEY) as { userId: number, userType: string }
    // @ts-expect-error user field does not exist in request
    req.userId = payload.userId
    // @ts-expect-error user field does not exist in request
    req.userType = payload.type
    next()
  } catch (_error) {
    return res.status(401).json({ status: 'ERROR', message: 'Unauthorized' })
  }
}
