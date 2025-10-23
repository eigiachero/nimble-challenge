import { drizzle } from 'drizzle-orm/node-postgres'
import { BACKEND_DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../../constants.js'
import * as schema from './schema.js'

export const db = drizzle({
  connection: {
    host: BACKEND_DB_HOST,
    port: Number(DB_PORT ?? 5432),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  },
  casing: 'snake_case',
  schema
})
export type db = typeof db

export default db
