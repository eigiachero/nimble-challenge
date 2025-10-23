import { pgTable, serial, varchar, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: serial().primaryKey().notNull(),
  username: varchar().notNull(),
  password: varchar().notNull(),
  name: varchar(),
  lastname: varchar(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()).notNull(),
  deletedAt: timestamp('deleted_at', { mode: 'date' })
}, (table) => [
  uniqueIndex('user_username_unique').on(table.username)
])

export type User = typeof user.$inferSelect
export type UserCreate = typeof user.$inferInsert
