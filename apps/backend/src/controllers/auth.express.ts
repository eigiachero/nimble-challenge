import bcrypt from 'bcrypt'
import { Application, Request } from 'express'
import jwt from 'jsonwebtoken'
import { isEmpty, isNil, omit } from 'lodash-es'
import { JWT_SECRET_KEY } from '~/constants.js'
import { verifyToken } from '~/middleware/verifyToken.js'
import { userRepository } from '~/repositories/user.js'
import { validateBodyData } from '../middleware/validateBodyData.js'
import { USER_OMIT, userCreateSchema } from './user.express.js'

export default async function configureUserExpressRoutes (app: Application): Promise<void> {
  app.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (isEmpty(username) || isEmpty(password)) {
      return res.status(400).json({ status: 'ERROR', message: 'Username and password are required' })
    }

    const user = await userRepository.findOne({ username })
    if (isNil(user)) { return res.status(404).json({ status: 'ERROR', message: 'User not found' }) }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) { return res.status(400).json({ status: 'ERROR', message: 'Incorrect username or password' }) }

    const access_token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '8h' })

    return res.status(200).json({ status: 'OK', user: omit(user, USER_OMIT), token: access_token })
  })

  app.post('/register', validateBodyData(userCreateSchema), async (req, res) => {
    const user = req.body

    const userFound = await userRepository.findOne({ username: user.username })
    if (!isNil(userFound)) { return res.status(500).json({ status: 'ERROR', message: 'Username already exists, pick another one' }) }

    user.password = await bcrypt.hash(user.password, 2)
    const userCreated = await userRepository.create(user)
    if (isNil(userCreated)) { return res.status(500).json({ status: 'ERROR', message: 'Error while creating user' }) }

    const access_token = jwt.sign({ userId: userCreated.id }, JWT_SECRET_KEY, { expiresIn: '8h' })

    return res.status(200).json({ status: 'OK', user: omit(userCreated, USER_OMIT), token: access_token })
  })

  // @ts-expect-error req extends not working correctly
  app.get('/user/whoami', verifyToken, (req: Request & { userId: number }, res) => {
    const { userId } = req
    console.log('User logged: ', userId)

    return res.status(200).json({ status: 'OK', userId })
  })
}

