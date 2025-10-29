import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { app } from '~/index.js'
import { initializeExpressResolvers } from '~/initialization.js'
import { userRepository } from '~/repositories/user.js'
import { mockUsers, mockUser, mockNewUserData, createValidToken } from './mockData.js'

vi.mock('~/repositories/user.js', () => ({
  userRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findOne: vi.fn()
  }
}))

describe('User Controller API', () => {
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

  describe('GET /users', () => {
    it('should return all users when valid token is provided', async () => {
      const token = createValidToken()
      vi.mocked(userRepository.findAll).mockResolvedValue(mockUsers)

      const res = await request(server)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(res.body.data).toHaveLength(2)
      expect(res.body.data[0]).toHaveProperty('username', 'testuser')
      expect(res.body.data[0].password).toBeUndefined()
      expect(userRepository.findAll).toHaveBeenCalledWith({})
    })

    it('should return users with query parameters', async () => {
      const token = createValidToken()
      vi.mocked(userRepository.findAll).mockResolvedValue([mockUser])

      const res = await request(server)
        .get('/users?id=1&includeAll=true')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(userRepository.findAll).toHaveBeenCalledWith({
        id: 1,
        includeAll: true
      })
    })

    it('should return 401 when no token is provided', async () => {
      const res = await request(server)
        .get('/users')

      expect(res.statusCode).toBe(401)
      expect(userRepository.findAll).not.toHaveBeenCalled()
    })

    it('should return 500 when repository fails', async () => {
      const token = createValidToken()
      // @ts-expect-error mock error
      vi.mocked(userRepository.findAll).mockResolvedValue(undefined)

      const res = await request(server)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(500)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Error while getting users')
    })
  })

  describe('GET /users/:id', () => {
    it('should return user by ID when valid token is provided', async () => {
      const token = createValidToken()
      vi.mocked(userRepository.findById).mockResolvedValue(mockUser)

      const res = await request(server)
        .get('/users/1')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.user).toHaveProperty('username', 'testuser')
      expect(res.body.user.password).toBeUndefined()
      expect(userRepository.findById).toHaveBeenCalledWith(1)
    })

    it('should return 404 when user is not found', async () => {
      const token = createValidToken()
      vi.mocked(userRepository.findById).mockResolvedValue(undefined)

      const res = await request(server)
        .get('/users/999')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(404)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('User not found')
      expect(userRepository.findById).toHaveBeenCalledWith(999)
    })

    it('should return 401 when no token is provided', async () => {
      const res = await request(server)
        .get('/users/1')

      expect(res.statusCode).toBe(401)
      expect(userRepository.findById).not.toHaveBeenCalled()
    })
  })

  describe('POST /users', () => {
    it('should create a new user when valid data is provided', async () => {
      const token = createValidToken()

      const mockCreatedUser = {
        ...mockNewUserData,
        id: 3,
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }

      vi.mocked(userRepository.create).mockResolvedValue(mockCreatedUser)

      const res = await request(server)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(mockNewUserData)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(userRepository.create).toHaveBeenCalled()
    })

    it('should return 500 when user creation fails', async () => {
      const token = createValidToken()
      vi.mocked(userRepository.create).mockResolvedValue(undefined)

      const res = await request(server)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(mockNewUserData)

      expect(res.statusCode).toBe(500)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Error while creating user')
    })

    it('should return 400 when required fields are missing', async () => {
      const token = createValidToken()

      const res = await request(server)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'newuser'
        })

      expect(res.statusCode).toBe(400)
      expect(userRepository.create).not.toHaveBeenCalled()
    })

    it('should return 401 when no token is provided', async () => {
      const res = await request(server)
        .post('/users')
        .send(mockNewUserData)

      expect(res.statusCode).toBe(401)
      expect(userRepository.create).not.toHaveBeenCalled()
    })
  })

  describe('PUT /users/:id', () => {
    it('should update user when valid data is provided', async () => {
      const token = createValidToken()
      const updateData = {
        name: 'Updated',
        lastname: 'Name'
      }

      const mockUpdatedUser = {
        ...mockUser,
        name: 'Updated',
        lastname: 'Name'
      }

      vi.mocked(userRepository.update).mockResolvedValue(mockUpdatedUser)

      const res = await request(server)
        .put('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(userRepository.update).toHaveBeenCalledWith(1, expect.objectContaining(updateData))
    })

    it('should update user with password when provided', async () => {
      const token = createValidToken()
      const updateData = {
        password: 'newpassword123',
        name: 'Updated'
      }

      const mockUpdatedUser = {
        ...mockUser,
        password: 'hashed_password',
        name: 'Updated'
      }

      vi.mocked(userRepository.update).mockResolvedValue(mockUpdatedUser)

      const res = await request(server)
        .put('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(userRepository.update).toHaveBeenCalled()
    })

    it('should return 500 when user update fails', async () => {
      const token = createValidToken()
      const updateData = {
        name: 'Updated'
      }

      vi.mocked(userRepository.update).mockResolvedValue(undefined)

      const res = await request(server)
        .put('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)

      expect(res.statusCode).toBe(500)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Error while updating user')
    })

    it('should return 401 when no token is provided', async () => {
      const res = await request(server)
        .put('/users/1')
        .send({
          name: 'Updated'
        })

      expect(res.statusCode).toBe(401)
      expect(userRepository.update).not.toHaveBeenCalled()
    })
  })

  describe('DELETE /users/:id', () => {
    it('should delete user when valid ID is provided', async () => {
      const token = createValidToken()
      vi.mocked(userRepository.delete).mockResolvedValue(true)

      const res = await request(server)
        .delete('/users/1')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('OK')
      expect(userRepository.delete).toHaveBeenCalledWith(1)
    })

    it('should return 500 when user deletion fails', async () => {
      vi.mocked(userRepository.delete).mockResolvedValue(false)

      const token = createValidToken()
      const res = await request(server)
        .delete('/users/1')
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(500)
      expect(res.body.status).toBe('ERROR')
      expect(res.body.message).toBe('Error while deleting user')
    })

    it('should return 401 when no token is provided', async () => {
      const res = await request(server)
        .delete('/users/1')

      expect(res.statusCode).toBe(401)
      expect(userRepository.delete).not.toHaveBeenCalled()
    })
  })
})