import { Avatar } from '../ui/avatar'
import { Badge } from '../ui/badge'
import dayjs from 'dayjs'
import { PanelUser } from './types'

interface UserPanelProps {
  users: PanelUser[]
}

const formatLastSeen = (date: Date) => {
  const diffInMinutes = Math.abs(dayjs().diff(dayjs(date), 'minutes'))

  if (diffInMinutes <= 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  const hours = Math.floor(diffInMinutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)

  return `${days}d ago`
}

const UserPanel = ({ users }: UserPanelProps) => {
  return (
    <div className="hidden lg:flex w-80 bg-white border-l border-gray-200 flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Online Users</h2>
        <p className="text-sm text-gray-500">{users.length} total users</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <p className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                  {user.username.charAt(0).toUpperCase()}
                </p>
              </Avatar>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.username}
                </p>
                {user.isOnline ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    Online
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Offline
                  </Badge>
                )}
              </div>
              {!user.isOnline && user.lastSeen && (
                <p className="text-xs text-gray-500">
                  Last seen {formatLastSeen(user.lastSeen)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPanel
