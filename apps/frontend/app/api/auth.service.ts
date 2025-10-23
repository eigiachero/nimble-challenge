import { redirect } from 'react-router'
import { authCookie } from '~/cookie.server'
import { axiosInstance } from '.'
import { User } from './interfaces/user'

export class AuthService {
  private readonly client = axiosInstance

  public async login (username: string, password: string) {
    const response = await this.client.post('/login', {
      username,
      password
    })

    return response.data
  }

  public async register (user: Partial<User>) {
    const response = await this.client.post('/register', { ...user })

    return response.data
  }

  public async logout () {
    return redirect('/', {
      headers: {
        'Set-Cookie': await authCookie.serialize({}, {
          expires: new Date(0)
        })
      }
    })
  }
}

export const  authService = new AuthService()
