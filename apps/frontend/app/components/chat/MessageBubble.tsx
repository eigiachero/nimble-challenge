import dayjs from 'dayjs'
import { cn } from '~/lib/utils'

interface MessageBubbleProps {
  id: string
  content: string
  username: string
  timestamp: string
  isOwn: boolean
}

const formatTime = (date: string) => {
  return dayjs(date).format('HH:mm A')
}

const MessageBubble = ({ content, username, timestamp, isOwn }: MessageBubbleProps) => {
  return (
    <div className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-xs lg:max-w-md px-4 py-2 rounded-lg', isOwn ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border border-gray-200')}>
        {!isOwn && (
          <p className="text-xs font-medium text-gray-500 mb-1" data-testid="message-username">
            {username}
          </p>
        )}
        <span className="text-sm whitespace-pre-wrap" data-testid="message-content">{content}</span>
        <p className={cn('text-xs mt-1', isOwn ? 'text-blue-100' : 'text-gray-500')}>
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  )
}

export default MessageBubble
