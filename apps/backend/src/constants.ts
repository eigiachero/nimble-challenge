export const {
  BACKEND_DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_USER = 'backend',
  DB_PASSWORD = 'backend',
  DB_NAME = 'backend',
  JWT_SECRET_KEY = 'test_key',
  ALLOWED_CORS_ORIGINS_REGEX = '*',
  NODE_ENV = 'development',
  SOCKET_CORS_ORIGINS_REGEX = ''
} = process.env

// CORS origins for development
export const SOCKET_CORS_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://nimble-challenge-87797879963.us-central1.run.app'
]
