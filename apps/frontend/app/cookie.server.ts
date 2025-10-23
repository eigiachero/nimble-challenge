import { createCookie } from 'react-router'
import { User } from './api/interfaces/user'

export const authCookie = createCookie('jwt-token', {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60,
  secrets: ['s3cure_s3cret']
})

export type AuthCookie = {
  token: string
  refresh_token: string
  userId: string
  userData: User
}

export const getAuthCookie = async (request: Request) => {
  const cookie = request.headers.get('Cookie')
  const parsedCookie: AuthCookie = await authCookie.parse(cookie)

  return parsedCookie ?? {}
}
