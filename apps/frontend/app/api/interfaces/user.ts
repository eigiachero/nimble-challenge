export interface User {
  id: number
  username: string
  password: string
  name: string
  lastname: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string | null
}
