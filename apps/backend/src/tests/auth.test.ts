import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { app } from '~/index.js'
import { initializeExpressResolvers } from '~/initialization.js'
import { userRepository } from '~/repositories/user.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '~/constants.js'
import { mockUser, mockNewUserData } from './mockData.js'

vi.mock('~/repositories/user.js', () => ({
  userRepository: {
    findOne: vi.fn(),
    create: vi.fn()
  }
}))

describe('Authentication API', () => {
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

  describe('POST /login', () => {
    it('should successfully login with valid credentials', async () => {
      vi.mocked(userRepository.findOne).mockResolvedValue(mockUser)

      const res = await request(server)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'password123'
        })

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(res.body).toHaveProperty('token')
      expect(res.body).toHaveProperty('user')
      expect(res.body.user).toHaveProperty('username', 'testuser')
      expect(res.body.user).toHaveProperty('name', 'Test')
      expect(res.body.user.password).toBeUndefined()
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testuser' })
    })

    it('should return 400 when username is missing', async () => {
      const res = await request(server)
        .post('/login')
        .send({
          password: 'password123'
        })

      expect(res.statusCode).toBe(400)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Username and password are required')
      expect(userRepository.findOne).not.toHaveBeenCalled()
    })

    it('should return 400 when password is missing', async () => {
      const res = await request(server)
        .post('/login')
        .send({
          username: 'testuser'
        })

      expect(res.statusCode).toBe(400)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Username and password are required')
      expect(userRepository.findOne).not.toHaveBeenCalled()
    })

    it('should return 400 when username is empty', async () => {
      const res = await request(server)
        .post('/login')
        .send({
          username: '',
          password: 'password123'
        })

      expect(res.statusCode).toBe(400)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Username and password are required')
      expect(userRepository.findOne).not.toHaveBeenCalled()
    })

    it('should return 400 when password is empty', async () => {
      const res = await request(server)
        .post('/login')
        .send({
          username: 'testuser',
          password: ''
        })

      expect(res.statusCode).toBe(400)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Username and password are required')
      expect(userRepository.findOne).not.toHaveBeenCalled()
    })

    it('should return 400 when user is not found', async () => {
      vi.mocked(userRepository.findOne).mockResolvedValue(undefined)

      const res = await request(server)
        .post('/login')
        .send({
          username: 'nonexistent',
          password: 'password123'
        })

      expect(res.statusCode).toBe(400)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Incorrect username or password')
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'nonexistent' })
    })

    it('should return 400 when password is incorrect', async () => {
      vi.mocked(userRepository.findOne).mockResolvedValue(mockUser)

      const res = await request(server)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword'
        })

      expect(res.statusCode).toBe(400)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Incorrect username or password')
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testuser' })
    })
  })

  describe('POST /register', () => {
    it('should successfully register a new user', async () => {
      vi.mocked(userRepository.findOne).mockResolvedValue(undefined)
      vi.mocked(userRepository.create).mockResolvedValue(mockUser)

      const res = await request(server)
        .post('/register')
        .send(mockNewUserData)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(res.body).toHaveProperty('token')
      expect(res.body).toHaveProperty('user')
      expect(res.body.user).toHaveProperty('username', 'testuser')
      expect(res.body.user).toHaveProperty('name', 'Test')
      expect(res.body.user.password).toBeUndefined()
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testuser' })
      expect(userRepository.create).toHaveBeenCalled()
    })

    it('should return 500 when username already exists', async () => {
      vi.mocked(userRepository.findOne).mockResolvedValue(mockUser)

      const res = await request(server)
        .post('/register')
        .send(mockNewUserData)

      expect(res.statusCode).toBe(500)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Username already exists, pick another one')
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testuser' })
      expect(userRepository.create).not.toHaveBeenCalled()
    })

    it('should return 500 when user creation fails', async () => {
      vi.mocked(userRepository.findOne).mockResolvedValue(undefined)
      vi.mocked(userRepository.create).mockResolvedValue(undefined)

      const res = await request(server)
        .post('/register')
        .send(mockNewUserData)

      expect(res.statusCode).toBe(500)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Error while creating user')
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testuser' })
      expect(userRepository.create).toHaveBeenCalled()
    })

    it('should return 400 when required fields are missing', async () => {
      const res = await request(server)
        .post('/register')
        .send({
          username: 'newuser'
        })

      expect(res.statusCode).toBe(400)
      expect(userRepository.findOne).not.toHaveBeenCalled()
      expect(userRepository.create).not.toHaveBeenCalled()
    })
  })

  describe('GET /user/whoami', () => {
    it('should return user ID when valid token is provided', async () => {
      const token = jwt.sign({ userId: 123 }, JWT_SECRET_KEY, { expiresIn: '8h' })
      const res = await request(server)
        .get('/user/whoami')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(res.body.userId).toBe(123)
    })

    it('should return 401 when no token is provided', async () => {
      const res = await request(server)
        .get('/user/whoami')

      expect(res.statusCode).toBe(401)
    })

    it('should return 401 when invalid token is provided', async () => {
      const res = await request(server)
        .get('/user/whoami')
        .set('Authorization', 'Bearer invalid-token')

      expect(res.statusCode).toBe(401)
    })
  })
})
