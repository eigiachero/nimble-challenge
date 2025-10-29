import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { app, socketIo } from '~/index.js'
import { initializeExpressResolvers } from '~/initialization.js'
import { messageRepository } from '~/repositories/message.js'
import { createValidToken, mockMessage, mockMessages, mockUser } from './mockData.js'
import { userRepository } from '~/repositories/user.js'

vi.mock('~/repositories/user.js', () => ({
  userRepository: {
    findOne: vi.fn()
  }
}))

const messageData = { content: 'New message content' }

describe('Message Controller API', () => {
  let server: any

  beforeAll(async () => {
    server = app.listen()
    await initializeExpressResolvers(app)
  })

  afterAll(() => {
    server.close()
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /messages', () => {
    it('should return all messages when valid token is provided', async () => { // MARK
      const token = createValidToken()

      const findAllSpy = vi.spyOn(messageRepository, 'findAll').mockResolvedValue(mockMessages)

      const res = await request(server)
        .get('/messages')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(res.body.data).toHaveLength(2)
      expect(res.body.data[0]).toHaveProperty('content', 'Hello, world!')
      expect(res.body.data[0]).toHaveProperty('username', 'testuser')
      expect(findAllSpy).toHaveBeenCalled()
    })

    it('should return 500 when repository fails', async () => {
      const token = createValidToken()

      // @ts-expect-error mock type error
      vi.spyOn(messageRepository, 'findAll').mockResolvedValue(undefined)

      const res = await request(server)
        .get('/messages')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(500)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Error while getting messages')
    })

    it('should return 401 when no token is provided', async () => {
      const findAllSpy = vi.spyOn(messageRepository, 'findAll')

      const res = await request(server)
        .get('/messages')

      expect(res.statusCode).toBe(401)
      expect(findAllSpy).not.toHaveBeenCalled()
    })

    it('should return 401 when invalid token is provided', async () => {
      const findAllSpy = vi.spyOn(messageRepository, 'findAll')

      const res = await request(server)
        .get('/messages')
        .set('Authorization', 'Bearer invalid-token')

      expect(res.statusCode).toBe(401)
      expect(findAllSpy).not.toHaveBeenCalled()
    })
  })

  describe('POST /messages', () => {
    it('should create a new message when valid data is provided', async () => { // MARK
      const token = createValidToken(1)

      vi.mocked(userRepository.findOne).mockResolvedValue(mockUser)
      const createSpy = vi.spyOn(messageRepository, 'create').mockResolvedValue({
        ...mockMessage,
        content: 'New message content'
      })
      // @ts-expect-error mock type error
      const emitSpy = vi.spyOn(socketIo, 'emit').mockImplementation(() => {})

      const res = await request(server)
        .post('/messages')
        .set('Authorization', `Bearer ${token}`)
        .send(messageData)

      expect(res.statusCode).toBe(201)
      expect(res.body.status).toBe('OK')
      expect(res.body.message).toHaveProperty('content', 'New message content')
      expect(res.body.message).toHaveProperty('username', 'testuser')
      expect(userRepository.findOne).toHaveBeenCalledWith({ id: 1 })
      expect(createSpy).toHaveBeenCalledWith({
        content: 'New message content',
        userId: 1
      })
      expect(emitSpy).toHaveBeenCalledWith('newMessage', {
        ...mockMessage,
        content: 'New message content',
        username: 'testuser'
      })
    })

    it('should return 404 when user is not found', async () => {
      const token = createValidToken(999)

      vi.mocked(userRepository.findOne).mockResolvedValue(undefined)
      const createSpy = vi.spyOn(messageRepository, 'create')

      const res = await request(server)
        .post('/messages')
        .set('Authorization', `Bearer ${token}`)
        .send(messageData)

      expect(res.statusCode).toBe(404)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('User not found')
      expect(userRepository.findOne).toHaveBeenCalledWith({ id: 999 })
      expect(createSpy).not.toHaveBeenCalled()
    })

    it('should return 500 when message creation fails', async () => { // MARK
      const token = createValidToken(1)

      vi.mocked(userRepository.findOne).mockResolvedValue(mockUser)
      const createSpy = vi.spyOn(messageRepository, 'create').mockResolvedValue(undefined)

      const res = await request(server)
        .post('/messages')
        .set('Authorization', `Bearer ${token}`)
        .send(messageData)

      expect(res.statusCode).toBe(500)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Error creating message')
      expect(userRepository.findOne).toHaveBeenCalledWith({ id: 1 })
      expect(createSpy).toHaveBeenCalled()
    })

    it('should return 400 when content is missing', async () => {
      const token = createValidToken(1)
      const createSpy = vi.spyOn(messageRepository, 'create')

      const res = await request(server)
        .post('/messages')
        .set('Authorization', `Bearer ${token}`)
        .send({})

      expect(res.statusCode).toBe(400)
      expect(userRepository.findOne).not.toHaveBeenCalled()
      expect(createSpy).not.toHaveBeenCalled()
    })

    it('should return 400 when content is empty', async () => {
      const token = createValidToken(1)
      const createSpy = vi.spyOn(messageRepository, 'create')

      const res = await request(server)
        .post('/messages')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: ''
        })

      expect(res.statusCode).toBe(400)
      expect(userRepository.findOne).not.toHaveBeenCalled()
      expect(createSpy).not.toHaveBeenCalled()
    })

    it('should return 401 when no token is provided', async () => {
      const createSpy = vi.spyOn(messageRepository, 'create')

      const res = await request(server)
        .post('/messages')
        .send({
          content: 'New message content'
        })

      expect(res.statusCode).toBe(401)
      expect(userRepository.findOne).not.toHaveBeenCalled()
      expect(createSpy).not.toHaveBeenCalled()
    })

    it('should return 401 when invalid token is provided', async () => {
      const createSpy = vi.spyOn(messageRepository, 'create')

      const res = await request(server)
        .post('/messages')
        .set('Authorization', 'Bearer invalid-token')
        .send({
          content: 'New message content'
        })

      expect(res.statusCode).toBe(401)
      expect(userRepository.findOne).not.toHaveBeenCalled()
      expect(createSpy).not.toHaveBeenCalled()
    })
  })
})