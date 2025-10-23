import { isNil } from 'lodash-es'
import { axiosInstance, getAuthRequestHeader } from '.'
import { AuthCookie } from '~/cookie.server'
import { User } from './interfaces/user'

type FindUserFilter = {
  id?: number
  username?: string
  includeAll?: boolean
}

export class UserService {
  private readonly client = axiosInstance

  public async getUsers (cookie: AuthCookie, params?: FindUserFilter): Promise<User[]> {
    const urlParams = new URLSearchParams()

    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (!isNil(value)) {
        urlParams.append(key, value.toString())
      }
    })

    const response = await this.client.get<{ data: User[] }>('/users', { params: urlParams, ...getAuthRequestHeader(cookie) })

    return response?.data?.data ?? []
  }

  public async getUserById (id: string, cookie: AuthCookie) {
    const response = await this.client.get<{ user: User }>(`/users/${id}`, { ...getAuthRequestHeader(cookie) })

    return response.data
  }

  public async createUser (user: Partial<User>, cookie: AuthCookie) {
    const response = await this.client.post<{ user: User }>('/users', user, { ...getAuthRequestHeader(cookie) })

    return response.data
  }

  public async updateUser (user: Partial<User>, cookie: AuthCookie) {
    const response = await this.client.put<{ user: User }>(`/users/${user.id}`, user,  { ...getAuthRequestHeader(cookie) })

    return response.data
  }

  public async deleteUser (id: string, cookie: AuthCookie) {
    const response = await this.client.delete<{ status: string }>(`/users/${id}`, { ...getAuthRequestHeader(cookie) })

    return response.data
  }
}

export const  userService = new UserService()
