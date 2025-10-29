import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '~/constants.js'

export const createValidToken = (userId: number = 1) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '8h' })
}

export const mockUser = {
  id: 1,
  username: 'testuser',
  password: '$2b$04$k2SNO.xYs7sH9ZxIqzBN8.8jMNv.AgAza9.maYJUzYkU1Zc.Nxxwi',
  name: 'Test',
  lastname: 'User',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
}

export const mockNewUserData = {
  username: 'testuser',
  password: 'password123',
  name: 'Test',
  lastname: 'User'
}

export const mockUsers = [
  mockUser,
  {
    id: 2,
    username: 'testuser2',
    password: 'hashed_password',
    name: 'Test2',
    lastname: 'User2',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  }
]

export const mockMessage = {
  id: 1,
  content: 'Hello, world!',
  userId: 1,
  createdAt: new Date()
}

export const mockFullMessage = {
  ...mockMessage,
  username: 'testuser'
}

export const mockMessages = [
  mockFullMessage,
  {
    id: 2,
    content: 'Another message',
    userId: 2,
    username: 'user2',
    createdAt: new Date()
  }
]