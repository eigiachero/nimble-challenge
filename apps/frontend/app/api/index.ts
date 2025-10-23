import axios from 'axios'

export const BACKEND_BASE_URL = process.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:3001'

export const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getAuthRequestHeader = ({ token }: { token: string }) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

