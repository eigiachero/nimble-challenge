export const {
  BACKEND_DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_USER = 'backend',
  DB_PASSWORD = 'backend',
  DB_NAME = 'backend',
  JWT_SECRET_KEY = 'test_key',
  ALLOWED_CORS_ORIGINS_REGEX = '*',
  NODE_ENV = 'development'
} = process.env

// CORS origins for development
export const CORS_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite default port
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
]
