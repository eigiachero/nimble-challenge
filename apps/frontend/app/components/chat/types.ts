export interface Message {
  id: string
  content: string
  userId: number
  username: string
  createdAt: string
  isOwn: boolean
}

export interface PanelUser {
  id: number
  username: string
  isOnline: boolean
  lastSeen?: Date
}
