import { AuthCookie } from '~/cookie.server'
import { axiosInstance, getAuthRequestHeader } from '.'
import { Message } from '~/components/chat/types'

export class MessageService {
  private readonly client = axiosInstance

  public async getMessages (cookie: AuthCookie) {
    const response = await this.client.get<{ data: Message[] }>('/messages', { ...getAuthRequestHeader(cookie) })

    return response.data.data
  }

  public async sendMessage (message: string, cookie: AuthCookie) {
    const response = await this.client.post('/messages', { content: message }, { ...getAuthRequestHeader(cookie) })

    return response.data
  }
}

export const  messageService = new MessageService()
