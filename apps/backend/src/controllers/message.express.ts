import { Application } from 'express'
import { messageRepository } from '~/repositories/message.js'
import { isNil } from 'lodash-es'
import { verifyToken } from '~/middleware/verifyToken.js'
import z from 'zod'
import { validateBodyData } from '~/middleware/validateBodyData.js'
import { io } from '~/index.js'
import { userRepository } from '~/repositories/user.js'

export const messageCreateSchema = z.object({
  content: z.string().min(1, 'Content is required')
})

export default async function configureMessageExpressRoutes (app: Application): Promise<void> {
  app.get('/messages', verifyToken, async (req, res) => {
    const messages = await messageRepository.findAll()
    if (isNil(messages)) { return res.status(500).json({ status: 'ERROR', message: 'Error while getting messages' }) }

    return res.status(200).json({ status: 'OK', data: messages })
  })

  app.post('/messages', verifyToken, validateBodyData(messageCreateSchema), async (req, res) => {
    // @ts-expect-error req extends not working correctly
    const userId = req.userId
    const { content } = req.body

    const user = await userRepository.findOne({ id: userId })
    if (isNil(user)) { return res.status(404).json({ status: 'ERROR', message: 'User not found' }) }

    const created = await messageRepository.create({ content, userId })
    if (isNil(created)) { return res.status(500).json({ status: 'ERROR', message: 'Error creating message' }) }

    const message = { ...created, username: user.username }
    io.emit('newMessage', message)

    return res.status(201).json({ status: 'OK', message })
  })

}

