// THIS IS FOR DRIZZLE-KIT COMMANDS https://orm.drizzle.team/docs/drizzle-config-file
// ITS NOT FOR DEFINE THE DB CONNECTION FOR THE APP, IS FOR RUN MIGRATIONS AND OTHERS DRIZZLE-KIT COMMANDS
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
const {
  BACKEND_DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env

export default defineConfig({
  dialect: 'postgresql',
  schema: './**/*.model.js',
  out: './src/service_providers/drizzle/migrations',
  dbCredentials: {
    host: BACKEND_DB_HOST!,
    port: Number(DB_PORT ?? 5432),
    user: DB_USER,
    password: DB_PASSWORD!,
    database: DB_NAME!,
    ssl: false
  },
  migrations: {
    prefix: 'timestamp',
    table: '__migrations__',
    schema: 'public'
  }
})
