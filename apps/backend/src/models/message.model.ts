import { foreignKey, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user.model.js'
import { relations } from 'drizzle-orm'

export const message = pgTable('message', {
  id: serial().primaryKey().notNull(),
  content: text().notNull(),
  userId: integer('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull()
}, (table) => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [user.id],
    name: 'message_user_id_fk'
  })
])

export const messageRelations = relations(message, ({ one }) => ({
  message_userId: one(user, {
    fields: [message.userId],
    references: [user.id],
    relationName: 'message_user_id_user_id'
  })
}))

export type Message = typeof message.$inferSelect
export type MessageCreate = typeof message.$inferInsert
