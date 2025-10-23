import bcrypt from 'bcrypt'
import { Application, Request } from 'express'
import { isEmpty, isNil, omit } from 'lodash-es'
import { verifyToken } from '~/middleware/verifyToken.js'
import { UserCreate } from '~/models/user.model.js'
import { userRepository } from '~/repositories/user.js'
import { validateBodyData } from '../middleware/validateBodyData.js'
import { z } from 'zod'

export const userCreateSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be 6 characters long at least')
})

export const USER_OMIT = ['password', 'updatedAt']

export default async function configureUserExpressRoutes (app: Application): Promise<void> {
  app.get('/users', verifyToken, async (req: Request, res) => {
    const { id, includeAll } = req.query
    const query = {
      ...req.query,
      id: id ? Number(id) : undefined,
      includeAll: includeAll ? Boolean(includeAll) : undefined
    }

    const users = await userRepository.findAll(query)
    if (isNil(users)) { return res.status(500).json({ status: 'ERROR', message: 'Error while getting users' }) }

    return res.status(200).json({ status: 'OK', data: users.map(user => omit(user, USER_OMIT)) })
  })

  app.get('/users/:id', verifyToken, async (req, res) => {
    const id = req.params.id
    if (isEmpty(id)) { return res.status(400).json({ status: 'ERROR', message: 'ID is required' }) }

    const user = await userRepository.findById(Number(id))
    if (isNil(user)) { return res.status(404).json({ status: 'ERROR', message: 'User not found' }) }

    return res.status(200).json({ user: omit(user, USER_OMIT) })
  })

  app.post('/users', verifyToken, validateBodyData(userCreateSchema), async (req, res) => {
    const userToCreate: UserCreate = {
      ...req.body,
      companyId: isEmpty(req.body.companyId) ? null : req.body.companyId
    }

    userToCreate.password = await bcrypt.hash(userToCreate.password, 2)
    const userCreated = await userRepository.create(userToCreate)
    if (isNil(userCreated)) { return res.status(500).json({ status: 'ERROR', message: 'Error while creating user' }) }

    return res.status(200).json({ status: 'OK' })
  })

  app.put('/users/:id', verifyToken, validateBodyData(userCreateSchema.partial()), async (req, res) => {
    const userToCreate: UserCreate = {
      ...req.body,
      companyId: isEmpty(req.body.companyId) ? null : req.body.companyId
    }
    const id = Number(req.params.id)

    if (!isNil(userToCreate.password)) { userToCreate.password = await bcrypt.hash(userToCreate.password, 2) }

    const userCreated = await userRepository.update(id, userToCreate)
    if (isNil(userCreated)) { return res.status(500).json({ status: 'ERROR', message: 'Error while updating user' }) }

    return res.status(200).json({ status: 'OK' })
  })

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    if (isNil(id)) { return res.status(400).json({ status: 'ERROR', message: 'ID is required' }) }

    const result = await userRepository.delete(Number(id))
    if (isNil(result)) { return res.status(500).json({ status: 'ERROR', message: 'Error while deleting user' }) }

    return res.status(200).json({ status: 'OK' })
  })
}

