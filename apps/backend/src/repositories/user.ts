// @ts-expect-error Abind does not have types
import abind from 'abind'
import { eq, SQL, and, isNull } from 'drizzle-orm'
import { isNil } from 'lodash-es'
import { User, user, UserCreate } from '../models/user.model.js'
import db from '../service_providers/drizzle/index.js'

export type FindUserFilter = {
  id?: number
  username?: string
  includeAll?: boolean
}

export default class DrizzleUserRepository {
  constructor () {
    abind(this)
  }

  async findById (id: number): Promise<User | undefined> {
    const userFound = await db.select().from(user).where(eq(user.id, id)).limit(1)

    return userFound[0]
  }

  async findAll (filter?: FindUserFilter): Promise<User[]> {
    const where: SQL[] = this.#generateUserFilter(filter)

    const users = await db
      .select()
      .from(user)
      .where(and(...where))

    return users
  }

  async findOne (filter?: FindUserFilter): Promise<User | undefined> {
    const whereClauses: SQL[] = this.#generateUserFilter(filter)

    if (whereClauses.length === 0) return undefined

    const users = await db.select()
      .from(user)
      .where(and(...whereClauses))
      .limit(1)

    return users[0]
  }

  async create (newUser: UserCreate): Promise<User | undefined> {
    const userCreated = await db
      .insert(user)
      .values(newUser)
      .returning()

    return userCreated[0]
  }

  async update (id: number, userToUpdate: Partial<UserCreate>): Promise<User | undefined> {
    const updatedUsers = await db.update(user).set(userToUpdate).where(eq(user.id, id)).returning()

    return updatedUsers[0]
  }

  async delete (id: number): Promise<void> {
    await this.update(id, { deletedAt: new Date() })
  }

  #generateUserFilter (filter?: FindUserFilter): SQL[] {
    const where: SQL[] = []
    if (!isNil(filter)) {
      if (!isNil(filter.id)) {
        where.push(eq(user.id, filter.id))
      }
      if (!isNil(filter.username)) {
        where.push(eq(user.username, filter.username))
      }
      if (isNil(filter.includeAll) || !filter.includeAll) {
        where.push(isNull(user.deletedAt))
      }
    }

    return where
  }
}

export const userRepository = new DrizzleUserRepository()