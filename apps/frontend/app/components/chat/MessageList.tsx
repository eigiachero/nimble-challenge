import { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import { Message } from './types'
import { socket } from '~/api'

interface MessageListProps {
  initialMessages: Message[]
  userId: number
}

const MessageList = ({ initialMessages, userId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const onNewMessage = (message: Message) => {
    setMessages(prev => [...prev, { ...message, isOwn: userId === message.userId }])
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    socket.on('newMessage', onNewMessage)

    return () => {
      socket.off('newMessage', onNewMessage)
    }
  }, [])

  return (
    <div className="flex-1 max-h-[calc(100dvh-240px)] overflow-y-auto px-6 py-4 space-y-4">
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
