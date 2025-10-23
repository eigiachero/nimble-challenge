import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import { Message } from './types'

interface MessageListProps {
  messages: Message[]
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          id={message.id}
          content={message.content}
          username={message.username}
          timestamp={message.createdAt}
          isOwn={message.isOwn}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
