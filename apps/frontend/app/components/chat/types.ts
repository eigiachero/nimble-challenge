export interface Message {
  id: string
  content: string
  userId: number
  username: string
  createdAt: string
  isOwn: boolean
}

export interface User {
  id: string
  username: string
  isOnline: boolean
  lastSeen?: Date
}
