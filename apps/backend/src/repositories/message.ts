// @ts-expect-error Abind does not have types
import abind from 'abind'
import db from '../service_providers/drizzle/index.js'
import { Message, message, MessageCreate } from '~/models/message.model.js'
import { eq, getTableColumns } from 'drizzle-orm'
import { user } from '../models/user.model.js'

export interface FullMessage extends Message {
  username: string
}

export default class DrizzleMessageRepository {
  constructor () {
    abind(this)
  }

  async findAll (): Promise<FullMessage[]> {
    const messages = await db
      .select({
        ...getTableColumns(message),
        username: user.username
      })
      .from(message)
      .leftJoin(user, eq(message.userId, user.id))

    return messages as FullMessage[]
  }

  async create (newMessage: MessageCreate): Promise<Message | undefined> {
    const messageCreated = await db
      .insert(message)
      .values(newMessage)
      .returning()

    return messageCreated[0]
  }

  async delete (id: number): Promise<void> {
    await db.delete(message).where(eq(message.id, id))
  }

}

export const messageRepository = new DrizzleMessageRepository()