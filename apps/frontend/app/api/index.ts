import axios from 'axios'
import { io } from 'socket.io-client'

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:3001'

export const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const socket = io(BACKEND_BASE_URL)

export const getAuthRequestHeader = ({ token }: { token: string }) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

